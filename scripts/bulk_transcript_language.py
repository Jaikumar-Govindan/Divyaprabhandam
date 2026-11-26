#!/usr/bin/env python3
"""
Bulk wrapper for converting marker_<code>_ta.js (+ optional marker_<code>_en.js)
into marker_<code>_<lang>.js for a chosen target language.

Supported --lang values:
  te  -> Telugu    (tamil_to_telegu.py)
  ka  -> Kannada   (tamil_to_kananda.py)
  sa  -> Sanskrit  (tamil_to_sanskrit.py)

Put the selected converter script(s) in the same folder as this wrapper.

Examples:
  python bulk_transcript_language.py --lang ka --root ./Divyaprabhandam
  python bulk_transcript_language.py --lang te --root ./Divyaprabhandam --dry-run
  python bulk_transcript_language.py --lang sa --root . --only TPL PTM --backup
"""
import argparse
import importlib
import json
import re
import shutil
import sys
import traceback
from datetime import datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

LANG_CONFIG = {
    "te": {
        "name": "Telugu",
        "module": "tamil_to_telegu",
        "default_report": "telegu_conversion_report.txt",
    },
    "ka": {
        "name": "Kannada",
        "module": "tamil_to_kananda",
        "default_report": "kannada_conversion_report.txt",
    },
    "sa": {
        "name": "Sanskrit",
        "module": "tamil_to_sanskrit",
        "default_report": "sanskrit_conversion_report.txt",
    },
}

TA_RE = re.compile(r"^marker_(?P<code>.+)_ta\.js$", re.IGNORECASE)


def load_converter(lang: str):
    cfg = LANG_CONFIG[lang]
    mod_name = cfg["module"]
    if not (SCRIPT_DIR / f"{mod_name}.py").exists():
        raise ImportError(
            f"Converter module '{mod_name}.py' not found for '{lang}' ({cfg['name']}) in {SCRIPT_DIR}."
        )
    return importlib.import_module(mod_name), mod_name


def find_jobs(root: Path, lang: str, only: set[str], exclude_dirs: set[str]):
    jobs = []
    for ta in sorted(root.rglob("marker_*_ta.js")):
        if any(part in exclude_dirs for part in ta.parts):
            continue
        m = TA_RE.match(ta.name)
        if not m:
            continue
        code = m.group("code")
        if only and code.lower() not in only and ta.parent.parent.name.lower() not in only:
            continue
        jobs.append({
            "code": code,
            "ta": ta,
            "en": ta.with_name(f"marker_{code}_en.js"),
            "out": ta.with_name(f"marker_{code}_{lang}.js"),
        })
    return jobs


def convert_with_module(conv, job, opts, overrides: dict, dry_run: bool):
    """
    Supports converters that expose `convert_file(ta_path, en_path, out_path, opts, overrides)`
    as well as simpler converters that expose `convert_verse` + `read_entries`.
    """
    out_target = None if dry_run else job["out"]

    if hasattr(conv, "convert_file"):
        return conv.convert_file(job["ta"], job["en"], out_target, opts, overrides)

    if hasattr(conv, "convert_verse") and hasattr(conv, "read_entries"):
        ta_text = job["ta"].read_text(encoding="utf-8")
        en_entries = conv.read_entries(job["en"].read_text(encoding="utf-8")) if job["en"].exists() else {}
        report, review = [], []
        key, out_lines, verses = None, [], 0
        for line in ta_text.splitlines():
            km = getattr(conv, "KEY_RE", re.compile(r"^\s*'([^']+)'\s*:\s*\{")).match(line)
            if km:
                key = km.group(1)
            em = getattr(conv, "ENTRY_RE", re.compile(r'^(\s*)(\d+):\s*"((?:[^"\\]|\\.)*)"(,?)\s*$')).match(line)
            if em and key:
                verses += 1
                indent, num, ta_str, comma = em.group(1), int(em.group(2)), em.group(3), em.group(4)
                en_str = en_entries.get((key, num), "")
                ctx = f"{key}[{num}]"
                if not en_str:
                    report.append(f"{ctx}: no English text, used plain Tamil mapping")
                converted = conv.convert_verse(ta_str, en_str, opts, overrides, report, ctx)
                out_lines.append(f'{indent}{num}: "{converted}"{comma}')
            else:
                line = (
                    line.replace("text_bundle_ta", f"text_bundle_{opts.lang}")
                    .replace("['ta']", f"['{opts.lang}']")
                    .replace('["ta"]', f'["{opts.lang}"]')
                )
                out_lines.append(line)
        if not dry_run:
            job["out"].write_text("\n".join(out_lines) + "\n", encoding="utf-8")
        return {"verses": verses, "report": report, "review": review}

    raise AttributeError(f"{conv.__name__} does not expose a compatible conversion entry point.")


def main() -> int:
    ap = argparse.ArgumentParser(description="Bulk Tamil(+English) -> te/ka/sa converter")
    ap.add_argument("--lang", required=True, choices=["te", "ka", "sa"],
                    help="Target language code: te (Telugu), ka (Kannada), sa (Sanskrit)")
    ap.add_argument("--root", default=".", help="folder to search (default: current folder)")
    ap.add_argument("--only", nargs="*", default=[],
                    help="only these codes / section folders, e.g. tpl ptm (case-insensitive)")
    ap.add_argument("--exclude-dir", nargs="*", default=[".git", "node_modules"],
                    help="folder names to skip")
    ap.add_argument("--dry-run", action="store_true", help="show what would be converted, write nothing")
    ap.add_argument("--skip-existing", action="store_true", help="do not overwrite an existing output file")
    ap.add_argument("--backup", action="store_true", help="copy an existing output file to <out>.bak first")
    ap.add_argument("--require-english", action="store_true",
                    help="skip files that have no _en.js (default: convert with Tamil rules only)")
    ap.add_argument("--report", default=None,
                    help="combined report file (default: <root>/<default_report>)")
    ap.add_argument("--fail-on-mismatch", action="store_true",
                    help="exit with code 1 if any Tamil/English MISMATCH is reported")
    ap.add_argument("--nasal", choices=["conjunct", "anusvara"], default="anusvara")
    ap.add_argument("--final-m", choices=["virama", "anusvara"], default="anusvara")
    ap.add_argument("--simple-letters", action="store_true", help="use simpler regional letter forms where supported")
    ap.add_argument("--overrides", help="JSON file with extra English-word overrides")
    ap.add_argument("--selftest", action="store_true", help="run the selected converter's self-test and exit")
    opts = ap.parse_args()

    try:
        conv, mod_name = load_converter(opts.lang)
    except ImportError as exc:
        sys.exit(str(exc))

    if opts.selftest:
        if hasattr(conv, "selftest"):
            return 1 if conv.selftest(opts) else 0
        sys.exit(f"{mod_name}.py does not implement selftest().")

    root = Path(opts.root).resolve()
    if not root.is_dir():
        sys.exit(f"Not a folder: {root}")

    overrides = dict(getattr(conv, "DEFAULT_OVERRIDES", {}))
    if opts.overrides:
        overrides.update(json.loads(Path(opts.overrides).read_text(encoding="utf-8")))

    only = {o.lower() for o in opts.only}
    jobs = find_jobs(root, opts.lang, only, set(opts.exclude_dir))
    if not jobs:
        print(f"No marker_*_ta.js files found under {root}")
        return 1

    lang_name = LANG_CONFIG[opts.lang]["name"]
    print(f"[{opts.lang} / {lang_name}] Using {mod_name}.py — found {len(jobs)} Tamil file(s) under {root}\n")

    lines = [
        f"{lang_name} ({opts.lang}) conversion report - {datetime.now():%Y-%m-%d %H:%M}",
        f"converter: {mod_name}.py",
        f"root: {root}",
        f"dry run: {opts.dry_run}",
        "",
    ]
    summary, failed, mismatches = [], 0, 0

    for job in jobs:
        rel = job["ta"].relative_to(root)
        has_en = job["en"].exists()
        label = f"[{job['code']}] {rel}"

        if opts.require_english and not has_en:
            print(f"SKIP  {label}  (no English file)")
            summary.append((job["code"], "skipped", "no English file"))
            continue
        if opts.skip_existing and job["out"].exists():
            print(f"SKIP  {label}  (output exists)")
            summary.append((job["code"], "skipped", "output exists"))
            continue

        try:
            if not opts.dry_run and opts.backup and job["out"].exists():
                shutil.copy2(job["out"], job["out"].with_name(job["out"].name + ".bak"))
            res = convert_with_module(conv, job, opts, overrides, dry_run=opts.dry_run)
            action = "would write" if opts.dry_run else "wrote"
        except Exception as exc:
            failed += 1
            print(f"FAIL  {label}: {exc}")
            lines += [f"== {rel}: FAILED ==", traceback.format_exc(), ""]
            summary.append((job["code"], "FAILED", str(exc)))
            continue

        n_mis = sum("MISMATCH" in r for r in res["report"])
        n_sandhi = sum("sandhi" in r for r in res["report"])
        n_noen = sum("no English" in r for r in res["report"])
        mismatches += n_mis
        note = "" if has_en else "  (no English file: Tamil rules only)"
        print(f"OK    {label}: {res['verses']} verses, {n_mis} mismatches, {n_sandhi} sandhi{note}")
        summary.append((job["code"], action, f"{res['verses']} verses, {n_mis} mismatches"))

        lines.append(f"== {rel} -> {job['out'].name}  ({res['verses']} verses) ==")
        lines.append(f"mismatches: {n_mis}   sandhi/elision: {n_sandhi}   verses without English: {n_noen}")
        lines += ["  " + r for r in res["report"]] or ["  none"]
        if res.get("review"):
            lines += ["  Sanskrit-looking words to review:"] + ["    " + r for r in res["review"]]
        lines.append("")

    ok = sum(1 for _, st, _ in summary if st in ("wrote", "would write"))
    lines += [
        "== Summary ==",
        f"converted: {ok}   skipped: {sum(1 for _, st, _ in summary if st == 'skipped')}"
        f"   failed: {failed}   total mismatches: {mismatches}",
    ]
    default_report_name = LANG_CONFIG[opts.lang]["default_report"]
    report_path = Path(opts.report) if opts.report else root / default_report_name
    if not opts.dry_run:
        report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"\nReport: {report_path}")
    print(f"Done: {ok} converted, {failed} failed, {mismatches} Tamil/English mismatches.")
    if failed or (opts.fail_on_mismatch and mismatches):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())