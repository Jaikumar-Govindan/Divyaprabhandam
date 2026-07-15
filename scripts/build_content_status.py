#!/usr/bin/env python3
"""Generate content-status.json — pasuram-level coverage for each Prabandam.

Usage:
    python3 scripts/build_content_status.py
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = ROOT / "aruLicheyal"
CONFIG_JS = ROOT / "config.js"
INDEX_HTML = ROOT / "index.html"
OUT = ROOT / "content-status.json"


# ---------------------------------------------------------------------------
# CONFIG + UI parsing
# ---------------------------------------------------------------------------


def _parse_object_literal(src: str, start: int) -> tuple[str, int]:
    """Return (object_text, end_index) for `{...}` starting at start."""
    if start >= len(src) or src[start] != "{":
        raise ValueError("Expected '{' at start of object literal")
    depth = 0
    in_str = False
    quote = ""
    escape = False
    for i in range(start, len(src)):
        ch = src[i]
        if in_str:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == quote:
                in_str = False
            continue
        if ch in ("'", '"'):
            in_str = True
            quote = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return src[start : i + 1], i + 1
    raise ValueError("Unbalanced object literal")


def _parse_js_value(raw: str):
    raw = raw.strip()
    if raw.startswith("{") and raw.endswith("}"):
        out: dict = {}
        body = raw[1:-1].strip()
        if not body:
            return out
        for m in re.finditer(
            r"['\"]([^'\"]+)['\"]\s*:\s*(\d+|true|false|\[[^\]]*\]|'[^']*'|\"[^\"]*\")",
            body,
        ):
            key, val = m.group(1), m.group(2)
            if val in ("true", "false"):
                out[key] = val == "true"
            elif val.isdigit():
                out[key] = int(val)
            elif val.startswith("["):
                out[key] = [
                    x.strip().strip("'\"")
                    for x in val[1:-1].split(",")
                    if x.strip()
                ]
            else:
                out[key] = val.strip("'\"")
        # availableContent may span multiple lines with only strings
        if "availableContent" not in out and "availableContent" in body:
            items = re.findall(r"['\"]([^'\"]+)['\"]", body.split("availableContent", 1)[1])
            # Filter keys that look like ch_sub
            ac = [x for x in items if re.match(r"^\d+_\d+$", x)]
            if ac:
                out["availableContent"] = ac
        return out
    if raw.isdigit():
        return int(raw)
    if raw in ("true", "false"):
        return raw == "true"
    if raw.startswith("[") and raw.endswith("]"):
        return [x.strip().strip("'\"") for x in raw[1:-1].split(",") if x.strip()]
    return raw.strip("'\"")


def _parse_factory_opts(obj_text: str) -> dict:
    """Parse a make*Book({ ... }) options object into a Python dict."""
    opts: dict = {}
    # Simple scalar / nested fields
    for key in (
        "key",
        "remotePrefix",
        "structure",
        "hasSub",
        "maxCh",
        "maxSub",
        "defPas",
        "minCh",
        "ex",
        "availableContent",
    ):
        m = re.search(rf"\b{key}\s*:", obj_text)
        if not m:
            continue
        rest = obj_text[m.end() :].lstrip()
        if rest.startswith("{"):
            nested, _ = _parse_object_literal(rest, 0)
            opts[key] = _parse_js_value(nested)
        elif rest.startswith("["):
            depth = 0
            in_str = False
            quote = ""
            escape = False
            end = 0
            for i, ch in enumerate(rest):
                if in_str:
                    if escape:
                        escape = False
                    elif ch == "\\":
                        escape = True
                    elif ch == quote:
                        in_str = False
                    continue
                if ch in ("'", '"'):
                    in_str = True
                    quote = ch
                    continue
                if ch == "[":
                    depth += 1
                elif ch == "]":
                    depth -= 1
                    if depth == 0:
                        end = i + 1
                        break
            opts[key] = _parse_js_value(rest[:end])
        else:
            m2 = re.match(r"([^,}\n]+)", rest)
            if m2:
                opts[key] = _parse_js_value(m2.group(1))
    # Normalize ex keys to str and values to int
    if "ex" in opts and isinstance(opts["ex"], dict):
        opts["ex"] = {str(k): int(v) for k, v in opts["ex"].items()}
    return opts


def parse_config_books() -> list[dict]:
    text = CONFIG_JS.read_text(encoding="utf-8")
    # Strip // line comments so commented-out books (e.g. STM) are ignored
    cleaned_lines = []
    for line in text.splitlines():
        # Keep URLs / strings; only strip full-line or trailing // outside strings roughly
        if re.match(r"^\s*//", line):
            continue
        cleaned_lines.append(line)
    text = "\n".join(cleaned_lines)

    books: list[dict] = []
    for m in re.finditer(
        r"make(Simple|Grouped|SubChapter)Book\(\s*\{",
        text,
    ):
        kind = m.group(1)
        brace_start = text.find("{", m.start())
        obj_text, _ = _parse_object_literal(text, brace_start)
        opts = _parse_factory_opts(obj_text)
        key = opts.get("key")
        if not key:
            continue
        if kind == "SubChapter":
            book = {
                "prefix": key,
                "factory": "sub",
                "structure": opts.get("structure", "chapter_sub_pasuram"),
                "hasSub": True,
                "minCh": 1,
                "maxCh": int(opts.get("maxCh", 10)),
                "maxSub": int(opts.get("maxSub", 10)),
                "defPas": int(opts.get("defPas", 10)),
                "ex": opts.get("ex", {}),
                "availableContent": opts.get("availableContent", []),
                "remotePrefix": opts.get("remotePrefix", key),
            }
        else:
            book = {
                "prefix": key,
                "factory": "simple" if kind == "Simple" else "grouped",
                "structure": "chapter_pasuram",
                "hasSub": False,
                "minCh": int(opts.get("minCh", 0)),
                "maxCh": int(opts.get("maxCh", 1)),
                "maxSub": 0,
                "defPas": int(opts.get("defPas", 10)),
                "ex": opts.get("ex", {}),
                "availableContent": [],
                "remotePrefix": None,
            }
        books.append(book)
    return books


def parse_ui_books() -> set[str]:
    html = INDEX_HTML.read_text(encoding="utf-8")
    # Restrict to the prefix <select> block
    m = re.search(
        r'<select[^>]*id=["\']prefix["\'][^>]*>(.*?)</select>',
        html,
        re.DOTALL | re.IGNORECASE,
    )
    block = m.group(1) if m else html
    return set(re.findall(r'<option\s+value=["\']([^"\']+)["\']', block, re.IGNORECASE))


# ---------------------------------------------------------------------------
# Expected sections / pasurams
# ---------------------------------------------------------------------------


def section_pasuram_count(book: dict, section_id: str) -> int:
    ex = book.get("ex") or {}
    if section_id in ex:
        return int(ex[section_id])
    return int(book["defPas"])


def enumerate_sections(book: dict) -> list[dict]:
    """Return [{id, expected, pasurams}] for each audio/marker section."""
    sections: list[dict] = []
    if book["hasSub"]:
        for ch in range(1, book["maxCh"] + 1):
            for sub in range(1, book["maxSub"] + 1):
                sid = f"{ch}.{sub}"
                n = section_pasuram_count(book, sid)
                sections.append(
                    {
                        "id": sid,
                        "expected": n,
                        "pasurams": list(range(1, n + 1)),
                        "chapter": ch,
                        "sub": sub,
                    }
                )
    else:
        for ch in range(book["minCh"], book["maxCh"] + 1):
            sid = str(ch)
            n = section_pasuram_count(book, sid)
            sections.append(
                {
                    "id": sid,
                    "expected": n,
                    "pasurams": list(range(1, n + 1)),
                    "chapter": ch,
                    "sub": None,
                }
            )
    return sections


def marker_db_key(prefix: str, section_id: str) -> str:
    return f"{prefix}.{section_id}.steps"


# ---------------------------------------------------------------------------
# Marker / text JS parsing
# ---------------------------------------------------------------------------


def _extract_assignments(js_text: str) -> dict[str, str]:
    """Map MARKER_DATABASE key -> array body text."""
    out: dict[str, str] = {}
    for m in re.finditer(
        r"MARKER_DATABASE\s*\[\s*['\"]([^'\"]+)['\"]\s*\]\s*=\s*\[",
        js_text,
    ):
        key = m.group(1)
        start = m.end()  # after opening [
        depth = 1
        in_str = False
        quote = ""
        escape = False
        i = start
        while i < len(js_text) and depth > 0:
            ch = js_text[i]
            if in_str:
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == quote:
                    in_str = False
            else:
                if ch in ("'", '"'):
                    in_str = True
                    quote = ch
                elif ch == "[":
                    depth += 1
                elif ch == "]":
                    depth -= 1
            i += 1
        out[key] = js_text[start : i - 1]
    return out


def _iter_top_level_objects(body: str):
    """Yield top-level `{...}` object strings from a JS array body."""
    i = 0
    while i < len(body):
        if body[i] == "{":
            try:
                obj, end = _parse_object_literal(body, i)
            except ValueError:
                i += 1
                continue
            yield obj
            i = end
        else:
            i += 1


def _parse_step1_pairs(step1_raw: str) -> list[list[float]]:
    return [
        [float(a), float(b)]
        for a, b in re.findall(r"\[\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\]", step1_raw)
    ]


def _extract_array_after_key(obj: str, key: str) -> str | None:
    m = re.search(rf"['\"]{re.escape(key)}['\"]\s*:\s*\[", obj)
    if not m:
        return None
    start = m.end() - 1  # at [
    depth = 0
    in_str = False
    quote = ""
    escape = False
    for i in range(start, len(obj)):
        ch = obj[i]
        if in_str:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == quote:
                in_str = False
            continue
        if ch in ("'", '"'):
            in_str = True
            quote = ch
            continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return obj[start : i + 1]
    return None


def _parse_meta(obj: str) -> dict | None:
    m = re.search(r"['\"]meta['\"]\s*:", obj)
    if not m:
        return None
    rest = obj[m.end() :].lstrip()
    if not rest.startswith("{"):
        return None
    try:
        meta_text, _ = _parse_object_literal(rest, 0)
    except ValueError:
        return None
    meta: dict = {}
    rm = re.search(r"['\"]reviewed['\"]\s*:\s*(true|false)", meta_text)
    if rm:
        meta["reviewed"] = rm.group(1) == "true"
    sm = re.search(r"['\"]source['\"]\s*:\s*['\"]([^'\"]+)['\"]", meta_text)
    if sm:
        meta["source"] = sm.group(1)
    am = re.search(r"['\"]reviewedAt['\"]\s*:\s*['\"]([^'\"]+)['\"]", meta_text)
    if am:
        meta["reviewedAt"] = am.group(1)
    tm = re.search(r"['\"]tool['\"]\s*:\s*['\"]([^'\"]+)['\"]", meta_text)
    if tm:
        meta["tool"] = tm.group(1)
    return meta or None


def parse_marker_details(js_text: str) -> dict[str, dict[int, dict]]:
    """Return {section_key: {p: {step1, step4, meta}}} for marked pasurams."""
    result: dict[str, dict[int, dict]] = {}
    for key, body in _extract_assignments(js_text).items():
        entries: dict[int, dict] = {}
        for obj in _iter_top_level_objects(body):
            pm = re.search(r"['\"]p['\"]\s*:\s*(\d+)", obj)
            if not pm:
                continue
            p = int(pm.group(1))
            step1_raw = _extract_array_after_key(obj, "step1")
            if not step1_raw:
                continue
            step1 = _parse_step1_pairs(step1_raw)
            if not step1:
                continue
            step4_raw = _extract_array_after_key(obj, "step4")
            step4: list[float] | None = None
            if step4_raw:
                nums = re.findall(r"[-\d.]+", step4_raw)
                if len(nums) >= 2:
                    step4 = [float(nums[0]), float(nums[1])]
            entries[p] = {
                "step1": step1,
                "step4": step4,
                "meta": _parse_meta(obj),
            }
        if entries:
            result[key] = entries
    return result


def parse_marked_pasurams(js_text: str) -> dict[str, set[int]]:
    """Return {section_key: set of p with non-empty step1}."""
    details = parse_marker_details(js_text)
    return {key: set(entries.keys()) for key, entries in details.items()}


def _extract_text_bundle(js_text: str, bundle_name: str) -> dict[str, set[int]]:
    """Parse text_bundle_ta / text_bundle_en into {section_key: set of p}."""
    content = _extract_text_content(js_text, bundle_name)
    return {key: set(texts.keys()) for key, texts in content.items()}


def _extract_text_content(js_text: str, bundle_name: str) -> dict[str, dict[int, str]]:
    """Parse text_bundle_* into {section_key: {p: text}}."""
    result: dict[str, dict[int, str]] = {}
    m = re.search(rf"(?:const|let|var)\s+{bundle_name}\s*=\s*{{", js_text)
    if not m:
        return result
    obj_text, _ = _parse_object_literal(js_text, m.end() - 1)
    for key_m in re.finditer(
        r"['\"]([^'\"]+\.steps)['\"]\s*:\s*\{",
        obj_text,
    ):
        section_key = key_m.group(1)
        nested, _ = _parse_object_literal(obj_text, key_m.end() - 1)
        texts: dict[int, str] = {}
        # Match `N: "..."` / `N: '...'` including multiline strings poorly —
        # use quote-aware scan for each `digits:`
        for pm in re.finditer(r"(?:^|[,{\s])(\d+)\s*:\s*", nested):
            p = int(pm.group(1))
            rest = nested[pm.end() :]
            if not rest or rest[0] not in ("'", '"'):
                continue
            quote = rest[0]
            i = 1
            escape = False
            chars: list[str] = []
            while i < len(rest):
                ch = rest[i]
                if escape:
                    chars.append(ch)
                    escape = False
                elif ch == "\\":
                    escape = True
                    chars.append(ch)
                elif ch == quote:
                    break
                else:
                    chars.append(ch)
                i += 1
            raw = "".join(chars)
            texts[p] = (
                raw.replace("\\n", "\n")
                .replace("\\t", "\t")
                .replace('\\"', '"')
                .replace("\\'", "'")
                .replace("\\\\", "\\")
            )
        if texts:
            result[section_key] = texts
    return result


def phrase_count(text: str) -> int:
    """Match playerEngine: split on ' *', drop trailing empty."""
    if not text:
        return 0
    parts = text.split(" *")
    if parts and parts[-1].strip() == "":
        parts.pop()
    return len(parts)


def load_book_markers(book: dict) -> dict[str, set[int]]:
    details = load_book_marker_details(book)
    return {key: set(entries.keys()) for key, entries in details.items()}


def load_book_marker_details(book: dict) -> dict[str, dict[int, dict]]:
    prefix = book["prefix"]
    markers_dir = ASSET_ROOT / prefix / "markers"
    combined: dict[str, dict[int, dict]] = {}
    if not markers_dir.is_dir():
        return combined
    for path in sorted(markers_dir.glob("*.js")):
        text = path.read_text(encoding="utf-8", errors="replace")
        for key, entries in parse_marker_details(text).items():
            bucket = combined.setdefault(key, {})
            bucket.update(entries)
    return combined


def load_book_lyrics(book: dict) -> tuple[dict[str, set[int]], dict[str, set[int]]]:
    ta_content, en_content = load_book_lyric_texts(book)
    return (
        {k: set(v.keys()) for k, v in ta_content.items()},
        {k: set(v.keys()) for k, v in en_content.items()},
    )


def load_book_lyric_texts(
    book: dict,
) -> tuple[dict[str, dict[int, str]], dict[str, dict[int, str]]]:
    prefix = book["prefix"]
    text_dir = ASSET_ROOT / prefix / "text"
    ta: dict[str, dict[int, str]] = {}
    en: dict[str, dict[int, str]] = {}
    if not text_dir.is_dir():
        return ta, en
    for path in sorted(text_dir.glob("*.js")):
        content = path.read_text(encoding="utf-8", errors="replace")
        for key, texts in _extract_text_content(content, "text_bundle_ta").items():
            ta.setdefault(key, {}).update(texts)
        for key, texts in _extract_text_content(content, "text_bundle_en").items():
            en.setdefault(key, {}).update(texts)
    return ta, en


# ---------------------------------------------------------------------------
# Marker quality heuristics
# ---------------------------------------------------------------------------

CONTIG_TOL = 0.15
EVEN_CV_THRESHOLD = 0.01  # true Even Distribute leftovers; not steady chanting


def analyze_marker_quality(
    step1: list[list[float]],
    step4: list[float] | None,
    ta_text: str | None,
    meta: dict | None,
) -> dict:
    """Return quality flags for one pasuram with non-empty step1."""
    issues: list[str] = []
    integrity_ok = True

    for start, end in step1:
        if end < start - 1e-9:
            integrity_ok = False
            issues.append("inverted")
            break

    for i in range(len(step1) - 1):
        if abs(step1[i][1] - step1[i + 1][0]) > CONTIG_TOL:
            integrity_ok = False
            issues.append("gapOrOverlap")
            break

    if step4 and len(step4) >= 2:
        if abs(step4[0] - step1[0][0]) > CONTIG_TOL or abs(
            step4[1] - step1[-1][1]
        ) > CONTIG_TOL:
            integrity_ok = False
            issues.append("step4Mismatch")

    phrase_aligned = True
    if ta_text is not None and ta_text.strip():
        pc = phrase_count(ta_text)
        if pc != len(step1):
            phrase_aligned = False
            issues.append("phraseMismatch")

    durs = [end - start for start, end in step1]
    even_suspect = False
    duration_cv = 0.0
    if len(durs) >= 3:
        mean = sum(durs) / len(durs)
        if mean > 0:
            variance = sum((d - mean) ** 2 for d in durs) / len(durs)
            duration_cv = (variance ** 0.5) / mean
            if duration_cv < EVEN_CV_THRESHOLD:
                even_suspect = True
                issues.append("evenScaffoldSuspect")

    reviewed: bool | None = None
    source = None
    if meta:
        if "reviewed" in meta:
            reviewed = bool(meta["reviewed"])
        source = meta.get("source")

    if reviewed is True:
        review_status = "reviewed"
    elif reviewed is False:
        review_status = "unreviewed"
    else:
        review_status = "unknown"

    if not integrity_ok or not phrase_aligned:
        badge = "broken"
    elif even_suspect and review_status != "reviewed":
        badge = "suspect"
    elif review_status == "reviewed":
        badge = "reviewed"
    else:
        badge = "ok" if integrity_ok and phrase_aligned else "unknown"

    return {
        "integrityOk": integrity_ok,
        "phraseAligned": phrase_aligned,
        "evenScaffoldSuspect": even_suspect,
        "durationCv": round(duration_cv, 4),
        "reviewStatus": review_status,
        "source": source,
        "badge": badge,
        "issues": issues,
    }


# ---------------------------------------------------------------------------
# Audio resolution
# ---------------------------------------------------------------------------


def _file_exists(rel: str) -> bool:
    return (ROOT / rel).is_file()


def batch_audio_path(prefix: str, pasuram: int, max_pas: int) -> str:
    start = ((pasuram - 1) // 10) * 10 + 1
    end = min(start + 9, max_pas)
    return f"aruLicheyal/{prefix}/audiofiles/{prefix}_{start}_{end}.ogg"


def _audio_result(files: list[dict]) -> dict:
    """Build section audio payload from per-file entries."""
    statuses = {f["status"] for f in files}
    if statuses == {"local"}:
        overall = "local"
    elif statuses == {"remote"}:
        overall = "remote"
    elif statuses == {"missing"}:
        overall = "missing"
    elif "remote" in statuses and statuses <= {"remote", "local"}:
        overall = "partial"
    elif "missing" in statuses and "local" in statuses:
        overall = "partial"
    elif "missing" in statuses:
        overall = "missing"
    else:
        overall = "partial"
    return {
        "status": overall,
        "files": files,
        # Keep a single path for older consumers; prefer first local, else first entry
        "audioPath": next(
            (f["path"] for f in files if f["status"] == "local"),
            files[0]["path"] if files else "",
        ),
    }


def resolve_section_audio(book: dict, section: dict) -> dict:
    """Return {status, files[{path,status,label}], audioPath}."""
    prefix = book["prefix"]
    factory = book["factory"]
    ch = section["chapter"]
    sub = section["sub"]

    if factory == "simple":
        path = f"aruLicheyal/{prefix}/audiofiles/{prefix}_{ch}.ogg"
        status = "local" if _file_exists(path) else "missing"
        return _audio_result(
            [{"path": path, "status": status, "label": f"ch {ch}"}]
        )

    if factory == "grouped":
        if ch == 0:
            path = f"aruLicheyal/{prefix}/audiofiles/{prefix}_0.ogg"
            status = "local" if _file_exists(path) else "missing"
            return _audio_result(
                [{"path": path, "status": status, "label": "thaniyan"}]
            )
        # Chapter 1: one .ogg per batch of 10 pasurams
        max_pas = section["expected"]
        files = []
        for start in range(1, max_pas + 1, 10):
            end = min(start + 9, max_pas)
            path = batch_audio_path(prefix, start, max_pas)
            files.append(
                {
                    "path": path,
                    "status": "local" if _file_exists(path) else "missing",
                    "label": f"{start}–{end}",
                }
            )
        return _audio_result(files)

    # Sub-chapter
    ac_key = f"{ch}_{sub}"
    local_path = f"aruLicheyal/{prefix}/audiofiles/{prefix}_{ch}.{sub}.ogg"
    if ac_key in book.get("availableContent", []):
        status = "local" if _file_exists(local_path) else "missing"
        return _audio_result(
            [{"path": local_path, "status": status, "label": section["id"]}]
        )
    remote = (
        f"https://www.uveda.org/media/recitation/"
        f"{book.get('remotePrefix', prefix)}.{ch}.{sub}.mp3"
    )
    return _audio_result(
        [{"path": remote, "status": "remote", "label": section["id"]}]
    )


# ---------------------------------------------------------------------------
# Build report
# ---------------------------------------------------------------------------


def build_book_report(book: dict, in_ui: bool) -> dict:
    sections_meta = enumerate_sections(book)
    marker_details = load_book_marker_details(book)
    ta_texts, en_texts = load_book_lyric_texts(book)
    ta_map = {k: set(v.keys()) for k, v in ta_texts.items()}
    en_map = {k: set(v.keys()) for k, v in en_texts.items()}

    sections_out = []
    sum_expected = 0
    sum_marked = 0
    sum_ta = 0
    sum_en = 0
    audio_local_sections = 0
    audio_remote_sections = 0
    audio_missing_sections = 0
    audio_partial_sections = 0
    audio_local_files = 0
    audio_remote_files = 0
    audio_missing_files = 0

    q_integrity_fail = 0
    q_phrase_mismatch = 0
    q_even_suspect = 0
    q_reviewed = 0
    q_unreviewed = 0
    q_unknown = 0
    q_broken = 0
    q_suspect = 0
    q_ok = 0

    for sec in sections_meta:
        key = marker_db_key(book["prefix"], sec["id"])
        expected_list = sec["pasurams"]
        expected_set = set(expected_list)
        details = marker_details.get(key, {})

        marked = sorted(p for p in details if p in expected_set)
        missing_marked = sorted(expected_set - set(marked))

        lyrics_ta = sorted(p for p in ta_map.get(key, set()) if p in expected_set)
        missing_ta = sorted(expected_set - set(lyrics_ta))

        lyrics_en = sorted(p for p in en_map.get(key, set()) if p in expected_set)
        missing_en = sorted(expected_set - set(lyrics_en))

        integrity_fail: list[int] = []
        phrase_mismatch: list[int] = []
        even_scaffold_suspect: list[int] = []
        reviewed_ps: list[int] = []
        unreviewed_ps: list[int] = []
        unknown_review_ps: list[int] = []
        quality_by_p: dict[str, dict] = {}

        for p in marked:
            entry = details[p]
            q = analyze_marker_quality(
                entry["step1"],
                entry.get("step4"),
                ta_texts.get(key, {}).get(p),
                entry.get("meta"),
            )
            quality_by_p[str(p)] = q
            if not q["integrityOk"]:
                integrity_fail.append(p)
                q_integrity_fail += 1
            if not q["phraseAligned"]:
                phrase_mismatch.append(p)
                q_phrase_mismatch += 1
            if q["evenScaffoldSuspect"]:
                even_scaffold_suspect.append(p)
                q_even_suspect += 1
            if q["reviewStatus"] == "reviewed":
                reviewed_ps.append(p)
                q_reviewed += 1
            elif q["reviewStatus"] == "unreviewed":
                unreviewed_ps.append(p)
                q_unreviewed += 1
            else:
                unknown_review_ps.append(p)
                q_unknown += 1
            if q["badge"] == "broken":
                q_broken += 1
            elif q["badge"] == "suspect":
                q_suspect += 1
            elif q["badge"] in ("ok", "reviewed"):
                q_ok += 1

        audio = resolve_section_audio(book, sec)
        audio_status = audio["status"]
        if audio_status == "local":
            audio_local_sections += 1
        elif audio_status == "remote":
            audio_remote_sections += 1
        elif audio_status == "partial":
            audio_partial_sections += 1
        else:
            audio_missing_sections += 1

        for f in audio["files"]:
            if f["status"] == "local":
                audio_local_files += 1
            elif f["status"] == "remote":
                audio_remote_files += 1
            else:
                audio_missing_files += 1

        n = sec["expected"]
        sum_expected += n
        sum_marked += len(marked)
        sum_ta += len(lyrics_ta)
        sum_en += len(lyrics_en)

        sections_out.append(
            {
                "id": sec["id"],
                "expected": n,
                "marked": marked,
                "missingMarked": missing_marked,
                "lyricsTa": lyrics_ta,
                "missingLyricsTa": missing_ta,
                "lyricsEn": lyrics_en,
                "missingLyricsEn": missing_en,
                "audio": audio_status,
                "audioPath": audio["audioPath"],
                "audioFiles": audio["files"],
                "integrityFail": integrity_fail,
                "phraseMismatch": phrase_mismatch,
                "evenScaffoldSuspect": even_scaffold_suspect,
                "reviewed": reviewed_ps,
                "unreviewed": unreviewed_ps,
                "reviewUnknown": unknown_review_ps,
                "qualityByPasuram": quality_by_p,
            }
        )

    return {
        "prefix": book["prefix"],
        "inUi": in_ui,
        "structure": book["structure"],
        "factory": book["factory"],
        "summary": {
            "expected": sum_expected,
            "marked": sum_marked,
            "lyricsTa": sum_ta,
            "lyricsEn": sum_en,
            "audioLocalSections": audio_local_sections,
            "audioRemoteSections": audio_remote_sections,
            "audioMissingSections": audio_missing_sections,
            "audioPartialSections": audio_partial_sections,
            "audioLocalFiles": audio_local_files,
            "audioRemoteFiles": audio_remote_files,
            "audioMissingFiles": audio_missing_files,
            "sections": len(sections_out),
            "integrityFail": q_integrity_fail,
            "phraseMismatch": q_phrase_mismatch,
            "evenScaffoldSuspect": q_even_suspect,
            "reviewed": q_reviewed,
            "unreviewed": q_unreviewed,
            "reviewUnknown": q_unknown,
            "qualityBroken": q_broken,
            "qualitySuspect": q_suspect,
            "qualityOk": q_ok,
        },
        "sections": sections_out,
    }


def main() -> None:
    books = parse_config_books()
    if not books:
        raise SystemExit("No books parsed from config.js")
    ui_books = parse_ui_books()

    reports = []
    totals = {
        "books": 0,
        "expected": 0,
        "marked": 0,
        "ta": 0,
        "en": 0,
        "audioLocal": 0,
        "audioRemote": 0,
        "audioMissing": 0,
        "audioLocalFiles": 0,
        "audioRemoteFiles": 0,
        "audioMissingFiles": 0,
        "integrityFail": 0,
        "phraseMismatch": 0,
        "evenScaffoldSuspect": 0,
        "reviewed": 0,
        "unreviewed": 0,
        "reviewUnknown": 0,
        "qualityBroken": 0,
        "qualitySuspect": 0,
        "qualityOk": 0,
    }

    for book in books:
        report = build_book_report(book, book["prefix"] in ui_books)
        reports.append(report)
        s = report["summary"]
        totals["books"] += 1
        totals["expected"] += s["expected"]
        totals["marked"] += s["marked"]
        totals["ta"] += s["lyricsTa"]
        totals["en"] += s["lyricsEn"]
        totals["audioLocal"] += s["audioLocalSections"]
        totals["audioRemote"] += s["audioRemoteSections"]
        totals["audioMissing"] += s["audioMissingSections"]
        totals["audioLocalFiles"] += s["audioLocalFiles"]
        totals["audioRemoteFiles"] += s["audioRemoteFiles"]
        totals["audioMissingFiles"] += s["audioMissingFiles"]
        totals["integrityFail"] += s["integrityFail"]
        totals["phraseMismatch"] += s["phraseMismatch"]
        totals["evenScaffoldSuspect"] += s["evenScaffoldSuspect"]
        totals["reviewed"] += s["reviewed"]
        totals["unreviewed"] += s["unreviewed"]
        totals["reviewUnknown"] += s["reviewUnknown"]
        totals["qualityBroken"] += s["qualityBroken"]
        totals["qualitySuspect"] += s["qualitySuspect"]
        totals["qualityOk"] += s["qualityOk"]

    payload = {
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "totals": totals,
        "books": reports,
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(
        f"Wrote {OUT} ({totals['books']} books, "
        f"{totals['marked']}/{totals['expected']} marked, "
        f"broken {totals['qualityBroken']}, suspect {totals['qualitySuspect']}, "
        f"reviewed {totals['reviewed']})"
    )


if __name__ == "__main__":
    main()
