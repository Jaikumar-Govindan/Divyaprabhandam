#!/usr/bin/env python3
"""
Smoke tests for Divya Prabandham Anusandhanam (Sandhai).

Static checks (syntax, config, HTML markers, asset layout) plus HTTP checks
against a short-lived local server. Adapted for the aruLicheyal/ asset root.

Usage:
    python3 scripts/smoke_test.py
"""

from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = ROOT / "aruLicheyal"

RUNTIME_JS = [
    "sync_engine.js",
    "config.js",
    "navigation.js",
    "markerProcessor.js",
    "playerEngine.js",
    "learningEngine.js",
]

# Script tags must appear in this order in index.html
SCRIPT_ORDER = [
    "sync_engine.js",
    "config.js",
    "navigation.js",
    "markerProcessor.js",
    "playerEngine.js",
    "learningEngine.js",
]

HTTP_PATHS = [
    "/index.html",
    "/config.js",
    "/navigation.js",
    "/playerEngine.js",
    "/learningEngine.js",
    "/sync-check.json",
    "/splitter.html",
    "/content-status.html",
    "/content-status.json",
]

INDEX_MARKERS = [
    'id="prefix"',
    'id="number"',
    'id="pasuramPickers"',
    'id="pasPart"',
    'id="pasSub"',
    'id="pasVerse"',
    'id="pasuramHint"',
    'id="learningStep"',
    'id="pasuramDisplay"',
    'id="toggleBtn"',
    'id="copyLinkBtn"',
    'src="config.js"',
    'src="playerEngine.js"',
    'src="learningEngine.js"',
]

PASURAM_PICKER_HELPERS = (
    "rebuildPasuramPickers",
    "syncNumberFromPickers",
    "syncPickersFromNumber",
    "setPasuramValue",
    "onPasuramPickerChange",
    "initPasuramPickers",
)

# Books that should exist under aruLicheyal/ with at least markers or audio
SAMPLE_BOOKS = ("PMT", "NAT", "TPL", "RN", "TVM")


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def ok(msg: str) -> None:
    print(f"  OK  {msg}")


def fail(msg: str) -> None:
    print(f"FAIL  {msg}", file=sys.stderr)


def check_js_syntax(errors: list[str]) -> None:
    for name in RUNTIME_JS:
        path = ROOT / name
        if not path.is_file():
            errors.append(f"Missing runtime JS: {name}")
            continue
        result = subprocess.run(
            ["node", "--check", str(path)],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            errors.append(f"Syntax error in {name}: {result.stderr.strip()}")
        else:
            ok(f"JS syntax: {name}")


def check_sync_check(errors: list[str]) -> None:
    path = ROOT / "sync-check.json"
    if not path.is_file():
        errors.append("Missing sync-check.json")
        return
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict) or not data:
            errors.append("sync-check.json is empty or not an object")
            return
        ok(f"JSON valid: sync-check.json ({len(data)} keys)")
    except json.JSONDecodeError as exc:
        errors.append(f"Invalid JSON in sync-check.json: {exc}")


def check_config(errors: list[str]) -> None:
    path = ROOT / "config.js"
    if not path.is_file():
        errors.append("Missing config.js")
        return
    text = path.read_text(encoding="utf-8")
    if "ROOT = 'aruLicheyal'" not in text and 'ROOT = "aruLicheyal"' not in text:
        errors.append("config.js missing ROOT = 'aruLicheyal'")
    else:
        ok("config.js uses aruLicheyal ROOT")

    for key in ("TVM", "PAT", "PMT", "RN", "1TA"):
        if f"'{key}'" not in text and f'"{key}"' not in text:
            errors.append(f"config.js missing book key: {key}")
        else:
            ok(f"config.js has book: {key}")

    for helper in ("makeSimpleBook", "makeGroupedBook", "makeSubChapterBook", "loadMarkerOnDemand"):
        if helper not in text:
            errors.append(f"config.js missing helper: {helper}")
        else:
            ok(f"config.js has: {helper}")


def check_deep_links(errors: list[str]) -> None:
    path = ROOT / "playerEngine.js"
    if not path.is_file():
        errors.append("Missing playerEngine.js")
        return
    text = path.read_text(encoding="utf-8")
    for name in (
        "applyDeepLinkFromUrl",
        "syncUrlToPrefs",
        "copyShareLink",
        "getShareUrl",
        "hasDeepLinkParams",
        "shouldAutoPlayFromUrl",
    ):
        if f"function {name}" not in text:
            errors.append(f"playerEngine.js missing deep-link helper: {name}")
        else:
            ok(f"deep link: {name}")


def check_pasuram_pickers(errors: list[str]) -> None:
    """Hierarchical Chapter/Decad/No. pickers wiring."""
    engine = ROOT / "playerEngine.js"
    if not engine.is_file():
        errors.append("Missing playerEngine.js")
        return
    text = engine.read_text(encoding="utf-8")
    for name in PASURAM_PICKER_HELPERS:
        if f"function {name}" not in text:
            errors.append(f"playerEngine.js missing pasuram picker helper: {name}")
        else:
            ok(f"pasuram picker: {name}")

    sync = ROOT / "sync_engine.js"
    if not sync.is_file():
        errors.append("Missing sync_engine.js")
        return
    sync_text = sync.read_text(encoding="utf-8")
    if "initPasuramPickers" not in sync_text:
        errors.append("sync_engine.js does not re-init pasuram pickers after hot-swap")
    else:
        ok("sync_engine.js re-inits pasuram pickers after hot-swap")


def check_index_html(errors: list[str]) -> None:
    path = ROOT / "index.html"
    if not path.is_file():
        errors.append("Missing index.html")
        return
    html = path.read_text(encoding="utf-8")
    for marker in INDEX_MARKERS:
        if marker not in html:
            errors.append(f"index.html missing expected marker: {marker}")
        else:
            ok(f"index.html contains: {marker}")

    positions = []
    for name in SCRIPT_ORDER:
        needle = f'src="{name}"'
        idx = html.find(needle)
        if idx < 0:
            errors.append(f"index.html missing script tag for {name}")
            return
        positions.append((idx, name))
    if positions != sorted(positions):
        errors.append(
            "index.html script order wrong; expected: " + ", ".join(SCRIPT_ORDER)
        )
    else:
        ok("index.html script load order")


def check_arulicheyal_layout(errors: list[str]) -> None:
    if not ASSET_ROOT.is_dir():
        errors.append("Missing aruLicheyal/ asset root")
        return
    ok("aruLicheyal/ asset root exists")

    for book in SAMPLE_BOOKS:
        book_dir = ASSET_ROOT / book
        if not book_dir.is_dir():
            errors.append(f"Missing book folder: aruLicheyal/{book}")
            continue
        markers = book_dir / "markers"
        text = book_dir / "text"
        audio = book_dir / "audiofiles"
        has_markers = markers.is_dir() and any(markers.glob("*.js"))
        has_text = text.is_dir() and any(text.glob("*.js"))
        has_audio = audio.is_dir() and any(audio.glob("*.ogg"))
        if not (has_markers or has_text or has_audio):
            errors.append(f"aruLicheyal/{book} has no markers/text/audio assets")
            continue
        parts = []
        if has_markers:
            parts.append("markers")
        if has_text:
            parts.append("text")
        if has_audio:
            parts.append("audio")
        ok(f"aruLicheyal/{book}: {', '.join(parts)}")


def check_offline_manifest_tool(errors: list[str]) -> None:
    """If the builder exists, run it and validate output shape."""
    builder = ROOT / "scripts" / "build_offline_manifest.py"
    out = ROOT / "offline-manifest.json"
    if not builder.is_file():
        return

    result = subprocess.run(
        [sys.executable, str(builder)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        errors.append(
            f"build_offline_manifest.py failed: {result.stderr.strip() or result.stdout.strip()}"
        )
        return
    ok("build_offline_manifest.py ran")

    if not out.is_file():
        errors.append("build_offline_manifest.py did not write offline-manifest.json")
        return
    try:
        data = json.loads(out.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        errors.append(f"Invalid offline-manifest.json: {exc}")
        return

    for prefix in ("PMT", "NAT", "TPL"):
        if prefix not in data:
            errors.append(f"offline-manifest.json missing book: {prefix}")
            return
        entry = data[prefix]
        if not isinstance(entry.get("assets"), list):
            errors.append(f"offline-manifest.json {prefix} missing assets list")
            return
        # Paths should use aruLicheyal root
        bad = [a for a in entry["assets"] if not str(a).startswith("/aruLicheyal/")]
        if bad:
            errors.append(
                f"offline-manifest.json {prefix} has non-aruLicheyal paths: {bad[:3]}"
            )
            return
    ok("offline-manifest.json has PMT, NAT, TPL under aruLicheyal/")


def check_content_status_tool(errors: list[str]) -> None:
    """Run content-status builder and validate report shape."""
    builder = ROOT / "scripts" / "build_content_status.py"
    out = ROOT / "content-status.json"
    page = ROOT / "content-status.html"
    if not builder.is_file():
        errors.append("Missing scripts/build_content_status.py")
        return
    if not page.is_file():
        errors.append("Missing content-status.html")
        return
    ok("content-status.html exists")

    result = subprocess.run(
        [sys.executable, str(builder)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        errors.append(
            f"build_content_status.py failed: {result.stderr.strip() or result.stdout.strip()}"
        )
        return
    ok("build_content_status.py ran")

    if not out.is_file():
        errors.append("build_content_status.py did not write content-status.json")
        return
    try:
        data = json.loads(out.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        errors.append(f"Invalid content-status.json: {exc}")
        return

    if not isinstance(data.get("totals"), dict) or not isinstance(data.get("books"), list):
        errors.append("content-status.json missing totals/books")
        return
    if not data["books"]:
        errors.append("content-status.json has no books")
        return

    by_prefix = {b.get("prefix"): b for b in data["books"] if isinstance(b, dict)}
    for prefix in ("PMT", "NAT", "TPL"):
        if prefix not in by_prefix:
            errors.append(f"content-status.json missing book: {prefix}")
            return
        entry = by_prefix[prefix]
        summary = entry.get("summary") or {}
        if not isinstance(entry.get("sections"), list):
            errors.append(f"content-status.json {prefix} missing sections list")
            return
        if int(summary.get("expected", 0)) <= 0:
            errors.append(f"content-status.json {prefix} expected count is 0")
            return
        for field in (
            "integrityFail",
            "phraseMismatch",
            "evenScaffoldSuspect",
            "reviewed",
            "reviewUnknown",
            "qualityBroken",
            "qualitySuspect",
            "qualityOk",
        ):
            if field not in summary:
                errors.append(f"content-status.json {prefix} missing quality field: {field}")
                return
        # Spot-check first section quality keys when marked
        for sec in entry["sections"][:3]:
            if not isinstance(sec, dict):
                continue
            for field in (
                "integrityFail",
                "phraseMismatch",
                "evenScaffoldSuspect",
                "reviewed",
                "reviewUnknown",
            ):
                if field not in sec:
                    errors.append(f"content-status.json {prefix} section missing {field}")
                    return
            break
    if "STM" in by_prefix:
        errors.append("content-status.json should not include commented-out STM")
        return
    totals = data.get("totals") or {}
    for field in ("qualityBroken", "phraseMismatch", "evenScaffoldSuspect", "reviewed"):
        if field not in totals:
            errors.append(f"content-status.json totals missing {field}")
            return
    ok(
        f"content-status.json has {len(data['books'])} books "
        f"(marked {data['totals'].get('marked')}/{data['totals'].get('expected')}; "
        f"broken {totals.get('qualityBroken')}, suspect {totals.get('qualitySuspect')})"
    )


def wait_for_server(port: int, timeout: float = 10.0) -> bool:
    deadline = time.time() + timeout
    url = f"http://127.0.0.1:{port}/index.html"
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=1) as resp:
                if resp.status == 200:
                    return True
        except (urllib.error.URLError, TimeoutError):
            time.sleep(0.15)
    return False


def check_http(port: int, errors: list[str]) -> None:
    base = f"http://127.0.0.1:{port}"
    # Prefer a real local audio/marker sample when present
    sample_candidates = [
        "/aruLicheyal/PMT/markers/marker_pmt_timelines.js",
        "/aruLicheyal/TPL/markers/marker_tpl_timelines.js",
        "/aruLicheyal/RN/markers/marker_rn_timelines.js",
    ]
    extra = [p for p in sample_candidates if (ROOT / p.lstrip("/")).is_file()]
    for path in HTTP_PATHS + extra[:1]:
        url = base + path
        try:
            with urllib.request.urlopen(url, timeout=10) as resp:
                if resp.status != 200:
                    errors.append(f"HTTP {resp.status} for {path}")
                    continue
                body = resp.read(512)
                if path.endswith((".js", ".json")):
                    snippet = body.decode("utf-8", errors="ignore")
                    tokens = ("function", "const", "var", "window", "{", "[")
                    if not any(tok in snippet for tok in tokens):
                        errors.append(f"Unexpected body for {path}")
                        continue
                ok(f"HTTP 200: {path}")
        except urllib.error.URLError as exc:
            errors.append(f"HTTP failed for {path}: {exc}")

    # Rebuild API used by content-status.html Update button
    rebuild_url = base + "/api/rebuild-content-status"
    try:
        req = urllib.request.Request(rebuild_url, data=b"", method="POST")
        with urllib.request.urlopen(req, timeout=120) as resp:
            if resp.status != 200:
                errors.append(f"HTTP {resp.status} for POST /api/rebuild-content-status")
            else:
                body = json.loads(resp.read().decode("utf-8"))
                if not body.get("ok"):
                    errors.append(f"rebuild API returned not ok: {body}")
                else:
                    ok("POST /api/rebuild-content-status")
    except urllib.error.URLError as exc:
        errors.append(f"HTTP failed for POST /api/rebuild-content-status: {exc}")
    except json.JSONDecodeError as exc:
        errors.append(f"Invalid JSON from rebuild API: {exc}")


def main() -> int:
    print("Sandhai smoke test (aruLicheyal layout)\n")
    errors: list[str] = []

    print("Static checks:")
    check_js_syntax(errors)
    check_sync_check(errors)
    check_config(errors)
    check_deep_links(errors)
    check_pasuram_pickers(errors)
    check_index_html(errors)
    check_arulicheyal_layout(errors)
    check_offline_manifest_tool(errors)
    check_content_status_tool(errors)

    port = free_port()
    print(f"\nHTTP checks (server on port {port}):")
    env = os.environ.copy()
    env["PORT"] = str(port)
    server = subprocess.Popen(
        [sys.executable, str(ROOT / "scripts" / "server.py")],
        cwd=str(ROOT),
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
    )
    try:
        if not wait_for_server(port):
            stderr = server.stderr.read() if server.stderr else ""
            errors.append(f"Server did not start on port {port}. {stderr}".strip())
        else:
            check_http(port, errors)
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()

    print()
    if errors:
        print(f"Smoke test failed ({len(errors)} issue(s)):", file=sys.stderr)
        for err in errors:
            fail(err)
        return 1

    print("All smoke checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
