#!/usr/bin/env python3
"""Generate offline-manifest.json from aruLicheyal/<BOOK>/{audiofiles,markers,text}."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = ROOT / "aruLicheyal"
OUT = ROOT / "offline-manifest.json"

# Books that are expected to be mostly remote / thin on local audio
REMOTE_HEAVY = {"TVM", "PTM", "PAT"}


def collect_assets(book_dir: Path) -> list[str]:
    found: set[str] = set()
    for sub in ("audiofiles", "markers", "text"):
        folder = book_dir / sub
        if not folder.is_dir():
            continue
        for path in folder.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() not in {".ogg", ".js", ".mp3", ".json"}:
                continue
            found.add("/" + str(path.relative_to(ROOT)).replace("\\", "/"))
    return sorted(found)


def estimate_bytes(paths: list[str]) -> int:
    total = 0
    for p in paths:
        fp = ROOT / p.lstrip("/")
        if fp.is_file():
            total += fp.stat().st_size
    return total


def main() -> None:
    if not ASSET_ROOT.is_dir():
        raise SystemExit(f"Missing asset root: {ASSET_ROOT}")

    books = sorted(d.name for d in ASSET_ROOT.iterdir() if d.is_dir())
    manifest: dict = {}

    for prefix in books:
        book_dir = ASSET_ROOT / prefix
        assets = collect_assets(book_dir)
        audio = [a for a in assets if a.endswith(".ogg") or a.endswith(".mp3")]
        size = estimate_bytes(assets)

        if not assets:
            manifest[prefix] = {
                "fullyLocal": False,
                "assets": [],
                "sizeBytes": 0,
                "note": "No local assets under aruLicheyal/",
            }
            continue

        if not audio:
            manifest[prefix] = {
                "fullyLocal": False,
                "assets": assets,
                "sizeBytes": size,
                "note": "Markers/text only — no local audio files",
            }
            continue

        partial = prefix in REMOTE_HEAVY
        entry = {
            "fullyLocal": not partial,
            "assets": assets,
            "sizeBytes": size,
        }
        if partial:
            entry["note"] = "Partial — only hosted audio and markers included"
        manifest[prefix] = entry

    OUT.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT} ({len(manifest)} books)")


if __name__ == "__main__":
    main()
