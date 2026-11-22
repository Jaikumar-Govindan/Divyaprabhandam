import argparse
import re
import subprocess
import sys
from pathlib import Path

TA_FILE_RE = re.compile(r"_ta\.js$", re.IGNORECASE)


def find_text_folders(root: Path) -> list[Path]:
    """Find all directories named 'text' under root."""
    if not root.exists() or not root.is_dir():
        return []

    text_dirs: list[Path] = []
    if root.name.lower() == "text":
        text_dirs.append(root)

    for path in root.rglob("*"):
        if path.is_dir() and path.name.lower() == "text" and path not in text_dirs:
            text_dirs.append(path)

    return sorted(text_dirs)


def target_ka_path(ta_file: Path) -> Path:
    """Replace trailing _ta.js with _ka.js."""
    return ta_file.with_name(TA_FILE_RE.sub("_ka.js", ta_file.name))


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Scan 'text' subfolders under aruLicheyal for *_ta.js files and create *_ka.js only if missing."
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("aruLicheyal"),
        help="Root folder to scan (default: aruLicheyal)",
    )
    parser.add_argument(
        "--script",
        type=Path,
        default=Path("scripts/convert_ta_to_ka.py"),
        help="Path to the conversion script accepting <input_ta.js> <output_ka.js>",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned commands without running the converter script",
    )
    parser.add_argument(
        "extra_args",
        nargs=argparse.REMAINDER,
        help="Optional extra arguments forwarded to the conversion script",
    )

    args = parser.parse_args()

    if not args.root.exists() or not args.root.is_dir():
        print(f"Error: Root directory not found: {args.root}", file=sys.stderr)
        sys.exit(1)

    if not args.dry_run and (not args.script.exists() or not args.script.is_file()):
        print(f"Error: Converter script not found: {args.script}", file=sys.stderr)
        sys.exit(1)

    forwarded = args.extra_args
    if forwarded and forwarded[0] == "--":
        forwarded = forwarded[1:]

    text_dirs = find_text_folders(args.root)
    if not text_dirs:
        print(f"No 'text' folders found under '{args.root}'.")
        return

    found_count = 0
    converted_count = 0
    skipped_count = 0
    failed_count = 0

    for text_dir in text_dirs:
        ta_files = sorted(
            f for f in text_dir.rglob("*.js") if f.is_file() and TA_FILE_RE.search(f.name)
        )
        if not ta_files:
            continue

        for ta_file in ta_files:
            found_count += 1
            ka_file = target_ka_path(ta_file)

            # Only generate *_ka.js if it does not already exist
            if ka_file.exists():
                print(f"[SKIP] {ka_file} already exists")
                skipped_count += 1
                continue

            cmd = [sys.executable, str(args.script), str(ta_file), str(ka_file), *forwarded]

            if args.dry_run:
                print("[DRY-RUN]", " ".join(str(part) for part in cmd))
                converted_count += 1
                continue

            result = subprocess.run(cmd, check=False)
            if result.returncode == 0:
                print(f"[OK]   {ta_file} -> {ka_file}")
                converted_count += 1
            else:
                print(f"[FAIL] {ta_file} (exit code {result.returncode})", file=sys.stderr)
                failed_count += 1

    print(
        f"\nSummary: found={found_count}, converted={converted_count}, "
        f"skipped={skipped_count}, failed={failed_count}"
    )

    if failed_count > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()