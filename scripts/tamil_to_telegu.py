import argparse
import re
from pathlib import Path

TAMIL_VOWELS = {
    "அ": "అ", "ஆ": "ఆ", "இ": "ఇ", "ஈ": "ఈ",
    "உ": "ఉ", "ஊ": "ఊ", "எ": "ఎ", "ஏ": "ఏ",
    "ஐ": "ఐ", "ஒ": "ఒ", "ஓ": "ఓ", "ஔ": "ఔ",
}

TAMIL_CONSONANTS = {
    "க": "క", "ங": "ఙ", "ச": "చ", "ஜ": "జ",
    "ஞ": "ఞ", "ட": "ట", "ண": "ణ", "த": "త",
    "ந": "న", "ன": "న", "ப": "ప", "ம": "మ",
    "ய": "య", "ர": "ర", "ற": "ఱ", "ல": "ల",
    "ள": "ళ", "ழ": "ೞ", "வ": "వ", "ஶ": "శ",
    "ஷ": "ష", "ஸ": "స", "ஹ": "హ",
}

TAMIL_MATRAS = {
    "ா": "ా", "ி": "ి", "ீ": "ీ", "ு": "ు",
    "ூ": "ూ", "ெ": "ె", "ே": "ే", "ை": "ై",
    "ொ": "ొ", "ோ": "ో", "ௌ": "ౌ",
}

TAMIL_VIRAMA = "్"
TAMIL_VIRAMA_SRC = "்"
TAMIL_CHAR_RE = re.compile(r"[\u0B80-\u0BFF]")


def transliterate_tamil_segment(text: str) -> str:
    """Transliterate Tamil characters into Telugu while preserving non-Tamil text."""
    out = []
    i = 0
    n = len(text)

    while i < n:
        ch = text[i]

        if ch in TAMIL_CONSONANTS:
            base = TAMIL_CONSONANTS[ch]
            # Handle split two-part Tamil matras if present
            if i + 2 < n and text[i + 1] == "ெ" and text[i + 2] == "ா":
                out.append(base + "ొ")
                i += 3
            elif i + 2 < n and text[i + 1] == "ே" and text[i + 2] == "ா":
                out.append(base + "ో")
                i += 3
            elif i + 2 < n and text[i + 1] == "ெ" and text[i + 2] == "ௌ":
                out.append(base + "ౌ")
                i += 3
            elif i + 1 < n and text[i + 1] == TAMIL_VIRAMA_SRC:
                out.append(base + TAMIL_VIRAMA)
                i += 2
            elif i + 1 < n and text[i + 1] in TAMIL_MATRAS:
                out.append(base + TAMIL_MATRAS[text[i + 1]])
                i += 2
            else:
                out.append(base)
                i += 1
        elif ch in TAMIL_VOWELS:
            out.append(TAMIL_VOWELS[ch])
            i += 1
        elif ch in TAMIL_MATRAS:
            out.append(TAMIL_MATRAS[ch])
            i += 1
        elif ch == TAMIL_VIRAMA_SRC:
            out.append(TAMIL_VIRAMA)
            i += 1
        elif ch == "ஃ":  # Visarga fallback for aytham
            out.append("ః")
            i += 1
        else:
            out.append(ch)
            i += 1

    return "".join(out)


def convert_js_ta_to_te(js_content: str) -> str:
    """Convert Tamil text/bundle/marker references in a JS file to Telugu."""
    n = len(js_content)
    i = 0
    out = []

    in_single = False
    in_double = False
    in_template = False
    in_line_comment = False
    in_block_comment = False

    marker_db_active = False
    saw_text_key = False
    expecting_lang_key = False

    def is_ident_char(ch: str) -> bool:
        return bool(ch) and (ch.isalnum() or ch in ("_", "$"))

    while i < n:
        ch = js_content[i]
        nxt = js_content[i + 1] if i + 1 < n else ""

        if in_line_comment:
            out.append(ch)
            if ch == "\n":
                in_line_comment = False
            i += 1
            continue

        if in_block_comment:
            out.append(ch)
            if ch == "*" and nxt == "/":
                out.append(nxt)
                in_block_comment = False
                i += 2
                continue
            i += 1
            continue

        if in_single or in_double or in_template:
            quote_char = "'" if in_single else ('"' if in_double else "`")

            if ch == quote_char:
                prev_non_space = "".join(out).rstrip()
                if in_single or in_double:
                    if prev_non_space.endswith(f"[{quote_char}text"):
                        saw_text_key = True
                    elif expecting_lang_key and prev_non_space.endswith(f"[{quote_char}ta"):
                        out.pop()  # remove 'a'
                        out.pop()  # remove 't'
                        out.append("te" + quote_char)
                        expecting_lang_key = False
                        saw_text_key = False
                        in_single = in_double = in_template = False
                        i += 1
                        continue

                out.append(ch)
                in_single = in_double = in_template = False
                i += 1
                continue

            if ch == "\\" and nxt:
                out.append(ch + nxt)
                i += 2
                continue

            if TAMIL_CHAR_RE.search(ch):
                out.append(transliterate_tamil_segment(ch))
            else:
                out.append(ch)
            i += 1
            continue

        if ch == "/" and nxt == "/":
            out.append("//")
            in_line_comment = True
            i += 2
            continue

        if ch == "/" and nxt == "*":
            out.append("/*")
            in_block_comment = True
            i += 2
            continue

        if ch == "'":
            out.append(ch)
            in_single = True
            i += 1
            continue

        if ch == '"':
            out.append(ch)
            in_double = True
            i += 1
            continue

        if ch == "`":
            out.append(ch)
            in_template = True
            i += 1
            continue

        # Rename text_bundle_ta -> text_bundle_te on exact identifier boundary
        if js_content.startswith("text_bundle_ta", i):
            prev_ok = (i == 0) or not is_ident_char(js_content[i - 1])
            next_ok = (i + len("text_bundle_ta") >= n) or not is_ident_char(js_content[i + len("text_bundle_ta")])
            if prev_ok and next_ok:
                out.append("text_bundle_te")
                i += len("text_bundle_ta")
                continue

        # Track MARKER_DATABASE references
        if js_content.startswith("MARKER_DATABASE", i):
            prev_ok = (i == 0) or not is_ident_char(js_content[i - 1])
            next_ok = (i + len("MARKER_DATABASE") >= n) or not is_ident_char(js_content[i + len("MARKER_DATABASE")])
            if prev_ok and next_ok:
                marker_db_active = True
                saw_text_key = False
                expecting_lang_key = False
                out.append("MARKER_DATABASE")
                i += len("MARKER_DATABASE")
                continue

        if marker_db_active:
            if ch == ";":
                marker_db_active = False
                saw_text_key = False
                expecting_lang_key = False
            elif saw_text_key and ch == "]":
                expecting_lang_key = True
                saw_text_key = False

        out.append(ch)
        i += 1

    return "".join(out)


def scan_and_convert(target_dir: Path, overwrite: bool = False) -> None:
    if not target_dir.exists() or not target_dir.is_dir():
        print(f"Error: Directory not found: {target_dir}")
        return

    ta_files = sorted(target_dir.rglob("*_ta.js"))
    print(f"Scanning '{target_dir}' -> found {len(ta_files)} '*_ta.js' file(s).")

    converted_count = 0
    for src_path in ta_files:
        dst_path = src_path.with_name(src_path.name[:-6] + "_te.js")
        if dst_path.exists() and not overwrite:
            print(f"  [SKIP] {dst_path} already exists (use --overwrite to replace).")
            continue

        content = src_path.read_text(encoding="utf-8")
        converted = convert_js_ta_to_te(content)
        dst_path.write_text(converted, encoding="utf-8")
        converted_count += 1
        print(f"  [OK]   {src_path} -> {dst_path}")

    print(f"Done. Generated {converted_count} '_te.js' file(s).")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scan a text folder for *_ta.js and generate *_te.js.")
    parser.add_argument("text_dir", type=Path, help="Path to the text folder to scan recursively.")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing *_te.js files.")
    args = parser.parse_args()

    scan_and_convert(args.text_dir, overwrite=args.overwrite)