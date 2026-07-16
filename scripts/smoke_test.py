#!/usr/bin/env python3
"""
Smoke tests for Divya Prabandham Anusandhanam (Sandhai).

Static checks (syntax, config, HTML markers, asset layout) plus HTTP checks
against a short-lived local server. Adapted for the aruLicheyal/ asset root.

Writes smoke-test-status.json for smoke-test-status.html after every run.

Usage:
    python3 scripts/smoke_test.py
    python3 scripts/smoke_test.py --no-http   # static only (status page Re-run)
"""

from __future__ import annotations

import argparse
import json
import os
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = ROOT / "aruLicheyal"
STATUS_JSON = ROOT / "smoke-test-status.json"
STATUS_HTML = ROOT / "smoke-test-status.html"

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
    "/smoke-test-status.html",
    "/smoke-test-status.json",
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
    'id="prevPhraseBtn"',
    'id="nextPhraseBtn"',
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
    "ensureMarkersForCurrentSelection",
    "updatePhraseNavButtons",
)

# Books that should exist under aruLicheyal/ with at least markers or audio
SAMPLE_BOOKS = ("PMT", "NAT", "TPL", "RN", "TVM")

# Chapter pasuram counts that must stay aligned with marker files (adivaravu).
# Format: (book, chapter, expected_count)
ADIVARAVU_LIMIT_CASES = (
    ("NAT", 0, 2),
    ("NAT", 1, 11),
    ("NAT", 3, 11),
    ("NAT", 4, 12),
    ("NAT", 5, 12),
    ("NAT", 6, 12),
    ("NAT", 14, 11),
    ("PMT", 0, 2),
    ("PMT", 1, 12),
    ("PMT", 2, 10),
    ("PMT", 3, 10),
    ("PMT", 5, 11),
    ("PMT", 6, 11),
    ("PMT", 7, 12),
    ("KCT", 0, 2),
    ("KCT", 1, 11),
)

# Auto-next rolls used by navigate() + picker sync for chapter_pasuram books
AUTO_NEXT_ROLL_CASES = (
    # (book, from_value, expected_next)
    ("NAT", "3.10", "3.11"),
    ("NAT", "3.11", "4.1"),
    ("NAT", "4.12", "5.1"),
    ("NAT", "6.12", "7.1"),
    ("NAT", "14.11", "0.1"),  # wrap to taniyans when maxCh reached
    ("PMT", "2.10", "3.1"),
    ("PMT", "1.12", "2.1"),
    ("PMT", "5.11", "6.1"),
    ("PMT", "3.10", "4.1"),
    ("KCT", "1.11", "0.1"),
)

# ---------------------------------------------------------------------------
# Result collection → smoke-test-status.json
# ---------------------------------------------------------------------------

_CURRENT_SUITE = "general"
_CHECK_RESULTS: list[dict] = []


def set_suite(name: str) -> None:
    global _CURRENT_SUITE
    _CURRENT_SUITE = name


def _record(status: str, message: str) -> None:
    _CHECK_RESULTS.append(
        {
            "suite": _CURRENT_SUITE,
            "status": status,
            "message": message,
        }
    )


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def ok(msg: str) -> None:
    _record("pass", msg)
    print(f"  OK  {msg}")


def fail(msg: str) -> None:
    print(f"FAIL  {msg}", file=sys.stderr)


class ErrorList(list):
    """errors.append() also records a failed check for the status report."""

    def append(self, message: object) -> None:  # type: ignore[override]
        msg = str(message)
        super().append(msg)
        _record("fail", msg)


def write_status_report(errors: list[str], elapsed_ms: int, mode: str) -> Path:
    """Persist machine-readable results for smoke-test-status.html."""
    passed = sum(1 for r in _CHECK_RESULTS if r["status"] == "pass")
    failed = sum(1 for r in _CHECK_RESULTS if r["status"] == "fail")
    suites: dict[str, dict] = {}
    for row in _CHECK_RESULTS:
        suite = row["suite"]
        bucket = suites.setdefault(
            suite,
            {"name": suite, "passed": 0, "failed": 0, "checks": []},
        )
        bucket["checks"].append(
            {"status": row["status"], "message": row["message"]}
        )
        if row["status"] == "pass":
            bucket["passed"] += 1
        else:
            bucket["failed"] += 1

    payload = {
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "ok": failed == 0 and len(errors) == 0,
        "mode": mode,
        "elapsedMs": elapsed_ms,
        "totals": {
            "checks": len(_CHECK_RESULTS),
            "passed": passed,
            "failed": failed,
            "suites": len(suites),
        },
        "suites": list(suites.values()),
        "errors": list(errors),
    }
    STATUS_JSON.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    return STATUS_JSON


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

    # Phrase nav must preload markers on selection change (not only on Play)
    for name in ("onPasuramPickerChange", "resetToStart", "initPasuramPickers"):
        needle = f"function {name}"
        idx = text.find(needle)
        if idx < 0:
            continue
        # Bound the body by the next top-level function (or EOF)
        next_fn = text.find("\nfunction ", idx + len(needle))
        chunk = text[idx : next_fn if next_fn > 0 else idx + 4000]
        if "ensureMarkersForCurrentSelection" not in chunk:
            errors.append(
                f"{name} must call ensureMarkersForCurrentSelection "
                "(phrase ◂ ▸ before Play)"
            )
        else:
            ok(f"{name} preloads markers for phrase nav")

    sync = ROOT / "sync_engine.js"
    if not sync.is_file():
        errors.append("Missing sync_engine.js")
        return
    sync_text = sync.read_text(encoding="utf-8")
    if "initPasuramPickers" not in sync_text:
        errors.append("sync_engine.js does not re-init pasuram pickers after hot-swap")
    else:
        ok("sync_engine.js re-inits pasuram pickers after hot-swap")


def check_navigation_limits(errors: list[str]) -> None:
    """
    CONFIG + marker-aware sectionPasuramCount / getLimit, auto-next rolls,
    picker clamp parity, and on-disk NAT/PMT marker length alignment.
    """
    config_path = ROOT / "config.js"
    nav_path = ROOT / "navigation.js"
    if not config_path.is_file() or not nav_path.is_file():
        errors.append("Missing config.js or navigation.js for navigation limit checks")
        return

    nav_text = nav_path.read_text(encoding="utf-8")
    # Pickers and navigate must share sectionPasuramCount; markers may extend it
    # after load (old-main getLimit behavior) so auto-next cannot diverge from UI.
    for name in (
        "sectionPasuramCount",
        "configPasuramCount",
        "markerSectionArray",
        "getLimit",
    ):
        if f"{name}:" not in nav_text and f"{name} :" not in nav_text:
            # methods are "name: function"
            if f"{name}: function" not in nav_text:
                errors.append(f"navigation.js missing {name}")
                return
    if "markerSectionArray" not in nav_text or "configPasuramCount" not in nav_text:
        errors.append("navigation.js must resolve markers then CONFIG for section length")
        return
    # getLimit must delegate to sectionPasuramCount (single source with pickers)
    get_limit_idx = nav_text.find("getLimit:")
    if get_limit_idx < 0:
        errors.append("navigation.js missing getLimit")
        return
    get_limit_body = nav_text[get_limit_idx : get_limit_idx + 800]
    if "sectionPasuramCount" not in get_limit_body:
        errors.append("getLimit must call sectionPasuramCount (shared with pickers)")
        return
    ok("getLimit shares sectionPasuramCount with pickers (markers when loaded)")

    checker = ROOT / "scripts" / "check_navigation_limits.js"
    if not checker.is_file():
        errors.append("Missing scripts/check_navigation_limits.js")
        return

    result = subprocess.run(
        [
            "node",
            str(checker),
            json.dumps([[b, c, n] for b, c, n in ADIVARAVU_LIMIT_CASES]),
            json.dumps([[b, f, t] for b, f, t in AUTO_NEXT_ROLL_CASES]),
        ],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "").strip()
        errors.append(f"navigation limit / auto-next checks failed: {detail}")
        return
    for book, ch, expected in ADIVARAVU_LIMIT_CASES:
        ok(f"limit {book}.{ch} = {expected}")
    for book, from_val, to_val in AUTO_NEXT_ROLL_CASES:
        ok(f"auto-next {book} {from_val} → {to_val}")
    ok("listPasuramOptions includes NAT adivaravu (3.11, 4.12)")
    ok("on-disk NAT/PMT marker lengths match getLimit + last-verse chapter roll")
    ok("navigate+picker sync cannot recreate the 3.10 auto-next loop")


def check_navigate_picker_contract(errors: list[str]) -> None:
    """
    Structural contracts that prevented the post-picker regression:
    navigate clamps via shared sectionPasuramCount; markers preload refreshes pickers.
    """
    engine = ROOT / "playerEngine.js"
    if not engine.is_file():
        errors.append("Missing playerEngine.js")
        return
    text = engine.read_text(encoding="utf-8")

    nav_idx = text.find("function navigate(")
    if nav_idx < 0:
        errors.append("playerEngine.js missing navigate()")
        return
    next_fn = text.find("\nfunction ", nav_idx + 10)
    nav_body = text[nav_idx : next_fn if next_fn > 0 else nav_idx + 2500]
    if "syncPickersFromNumber" not in nav_body:
        errors.append("navigate() must call syncPickersFromNumber after advancing")
    else:
        ok("navigate() syncs pickers after advance")
    if "getLimit" not in nav_body:
        errors.append("navigate() must use Navigation.getLimit for chapter bounds")
    else:
        ok("navigate() uses getLimit for chapter bounds")

    safe_idx = text.find("function sectionPasuramCountSafe")
    if safe_idx < 0:
        errors.append("playerEngine.js missing sectionPasuramCountSafe")
        return
    safe_body = text[safe_idx : safe_idx + 500]
    if "Navigation.sectionPasuramCount" not in safe_body:
        errors.append(
            "sectionPasuramCountSafe must call Navigation.sectionPasuramCount "
            "(CONFIG-only clamp recreates the 3.10 loop when markers are longer)"
        )
    else:
        ok("sectionPasuramCountSafe delegates to Navigation.sectionPasuramCount")

    ensure_idx = text.find("function ensureMarkersForCurrentSelection")
    if ensure_idx < 0:
        errors.append("playerEngine.js missing ensureMarkersForCurrentSelection")
        return
    ensure_body = text[ensure_idx : ensure_idx + 1200]
    if "rebuildPasuramPickers" not in ensure_body:
        errors.append(
            "ensureMarkersForCurrentSelection must rebuildPasuramPickers after load "
            "(so No. max tracks marker length)"
        )
    else:
        ok("ensureMarkers rebuilds pickers after marker load")
    if "updatePhraseNavButtons" not in ensure_body:
        errors.append("ensureMarkersForCurrentSelection must updatePhraseNavButtons")
    else:
        ok("ensureMarkers updates phrase nav buttons after load")

    phrase_idx = text.find("function updatePhraseNavButtons")
    if phrase_idx < 0:
        errors.append("playerEngine.js missing updatePhraseNavButtons")
        return
    phrase_body = text[phrase_idx : phrase_idx + 600]
    if "step4" not in phrase_body:
        errors.append("updatePhraseNavButtons must disable phrase nav in Full (step4) mode")
    else:
        ok("phrase nav disabled for step4 (Full)")
    if "prevPhraseBtn" not in phrase_body or "nextPhraseBtn" not in phrase_body:
        errors.append("updatePhraseNavButtons must toggle prevPhraseBtn/nextPhraseBtn")
    else:
        ok("phrase nav toggles prevPhraseBtn/nextPhraseBtn")

    # learning-track-ended must call navigate(1) when auto-next is on
    if "learning-track-ended" not in text:
        errors.append("playerEngine.js missing learning-track-ended handler")
    elif "navigate(1)" not in text:
        errors.append("auto-next path must call navigate(1)")
    else:
        ok("learning-track-ended can auto-next via navigate(1)")


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
    parser = argparse.ArgumentParser(description="Sandhai smoke tests")
    parser.add_argument(
        "--no-http",
        action="store_true",
        help="Skip local-server HTTP checks (used by smoke-test-status.html Re-run)",
    )
    args = parser.parse_args()
    mode = "static" if args.no_http else "full"

    started = time.time()
    global _CHECK_RESULTS, _CURRENT_SUITE
    _CHECK_RESULTS = []
    _CURRENT_SUITE = "general"

    print("Sandhai smoke test (aruLicheyal layout)\n")
    errors: ErrorList = ErrorList()

    print("Static checks:")
    set_suite("js_syntax")
    check_js_syntax(errors)
    set_suite("sync_check")
    check_sync_check(errors)
    set_suite("config")
    check_config(errors)
    set_suite("deep_links")
    check_deep_links(errors)
    set_suite("pasuram_pickers")
    check_pasuram_pickers(errors)
    set_suite("navigation_limits")
    check_navigation_limits(errors)
    set_suite("navigate_picker_contract")
    check_navigate_picker_contract(errors)
    set_suite("index_html")
    check_index_html(errors)
    set_suite("arulicheyal_layout")
    check_arulicheyal_layout(errors)
    set_suite("offline_manifest")
    check_offline_manifest_tool(errors)
    set_suite("content_status")
    check_content_status_tool(errors)
    set_suite("smoke_status_page")
    if not STATUS_HTML.is_file():
        errors.append("Missing smoke-test-status.html")
    else:
        ok("smoke-test-status.html exists")

    if not args.no_http:
        # Ensure status JSON exists so HTTP_PATHS check can fetch it on first run
        if not STATUS_JSON.is_file():
            write_status_report(errors, 0, mode)
        port = free_port()
        print(f"\nHTTP checks (server on port {port}):")
        set_suite("http")
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
    else:
        print("\nHTTP checks: skipped (--no-http)")

    elapsed_ms = int((time.time() - started) * 1000)
    out = write_status_report(errors, elapsed_ms, mode)

    print()
    if errors:
        print(f"Smoke test failed ({len(errors)} issue(s)):", file=sys.stderr)
        for err in errors:
            fail(err)
        print(f"Status report: {out.relative_to(ROOT)}", file=sys.stderr)
        return 1

    print("All smoke checks passed.")
    print(f"Status report: {out.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
