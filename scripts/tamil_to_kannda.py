import re
import sys
from pathlib import Path

TAMIL_VOWELS = {
    "\u0B85": "ಅ",  # அ
    "\u0B86": "ಆ",  # ஆ
    "\u0B87": "ಇ",  # இ
    "\u0B88": "ಈ",  # ஈ
    "\u0B89": "ಉ",  # உ
    "\u0B8A": "ಊ",  # ஊ
    "\u0B8E": "ಎ",  # எ
    "\u0B8F": "ಏ",  # ஏ
    "\u0B90": "ಐ",  # ஐ
    "\u0B92": "ಒ",  # ஒ
    "\u0B93": "ಓ",  # ஓ
    "\u0B94": "ಔ",  # ஔ
}

TAMIL_CONSONANTS = {
    "\u0B95": "ಕ",  # க
    "\u0B99": "ಙ",  # ங
    "\u0B9A": "ಚ",  # ச
    "\u0B9C": "ಜ",  # ஜ
    "\u0B9E": "ಞ",  # ஞ
    "\u0B9F": "ಟ",  # ட
    "\u0BA3": "ಣ",  # ண
    "\u0BA4": "ತ",  # த
    "\u0BA8": "ನ",  # ந
    "\u0BA9": "ನ",  # ன
    "\u0BAA": "ಪ",  # ப
    "\u0BAE": "ಮ",  # ம
    "\u0BAF": "ಯ",  # ய
    "\u0BB0": "ರ",  # ர
    "\u0BB1": "ರ",  # ற
    "\u0BB2": "ಲ",  # ல
    "\u0BB3": "ಳ",  # ள
    "\u0BB4": "ಳ",  # ழ
    "\u0BB5": "ವ",  # வ
    "\u0BB6": "ಶ",  # ஶ
    "\u0BB7": "ಷ",  # ஷ
    "\u0BB8": "ಸ",  # ஸ
    "\u0BB9": "ಹ",  # ஹ
}

TAMIL_MATRAS = {
    "\u0BBE": "\u0CBE",  # ா -> ಾ
    "\u0BBF": "\u0CBF",  # ி -> ಿ
    "\u0BC0": "\u0CC0",  # ீ -> ೀ
    "\u0BC1": "\u0CC1",  # ு -> ು
    "\u0BC2": "\u0CC2",  # ூ -> ೂ
    "\u0BC6": "\u0CC6",  # ெ -> ೆ
    "\u0BC7": "\u0CC7",  # ே -> ೇ
    "\u0BC8": "\u0CC8",  # ை -> ೈ
    "\u0BCA": "\u0CCA",  # ொ -> ೊ
    "\u0BCB": "\u0CCB",  # ோ -> ோ
    "\u0BCC": "\u0CCC",  # ௌ -> ೌ
}

TAMIL_PULLI = "\u0BCD"      # ்
KANNADA_VIRAMA = "\u0CCD"   # ್

TAMIL_RUN_RE = re.compile(
    r"[\u0B82\u0B83\u0B85-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BCD]+"
)


def transliterate_tamil_segment(segment: str) -> str:
    """Transliterate a Tamil script run into Kannada script."""
    segment = segment.replace("\u200C", "").replace("\u200D", "")
    out = []
    i = 0
    n = len(segment)

    while i < n:
        ch = segment[i]

        if ch == "\u0B83":  # ஃ -> ಃ
            out.append("\u0C83")
            i += 1
        elif ch == "\u0B82":  # Anusvara -> ಂ
            out.append("\u0C82")
            i += 1
        elif ch in TAMIL_VOWELS:
            out.append(TAMIL_VOWELS[ch])
            i += 1
        elif ch in TAMIL_CONSONANTS:
            out.append(TAMIL_CONSONANTS[ch])
            i += 1
            if i < n and segment[i] == TAMIL_PULLI:
                out.append(KANNADA_VIRAMA)
                i += 1
            elif i < n and segment[i] in TAMIL_MATRAS:
                out.append(TAMIL_MATRAS[segment[i]])
                i += 1
        elif ch in TAMIL_MATRAS:
            out.append(TAMIL_MATRAS[ch])
            i += 1
        elif ch == TAMIL_PULLI:
            out.append(KANNADA_VIRAMA)
            i += 1
        else:
            out.append(ch)
            i += 1

    result = "".join(out)
    result = result.replace("\u0CCA\u0CC6", "\u0CCB")
    result = result.replace("\u0CC6\u0CC6", "\u0CC7")
    return result


def transliterate_js_file(js_content: str) -> str:
    """
    Transliterate Tamil runs inside string literals to Kannada, keep English/code/comments intact,
    rename text_bundle_ta -> text_bundle_ka, and change MARKER_DATABASE...['text']['ta'] -> ['text']['ka'].
    """
    result = []
    i = 0
    n = len(js_content)

    in_single_quote = False
    in_double_quote = False
    in_template_literal = False
    in_line_comment = False
    in_block_comment = False

    # Tracks whether we are inside a MARKER_DATABASE...['text'][<here>] expression
    marker_db_active = False
    saw_text_key = False
    expecting_lang_key = False
    recent_code = ""

    while i < n:
        ch = js_content[i]
        nxt = js_content[i + 1] if i + 1 < n else ""

        if in_line_comment:
            result.append(ch)
            if ch == "\n":
                in_line_comment = False
            i += 1
            continue

        if in_block_comment:
            result.append(ch)
            if ch == "*" and nxt == "/":
                result.append(nxt)
                in_block_comment = False
                i += 2
                continue
            i += 1
            continue

        if not (in_single_quote or in_double_quote or in_template_literal):
            if ch == "/" and nxt == "/":
                result.append("//")
                in_line_comment = True
                i += 2
                continue
            if ch == "/" and nxt == "*":
                result.append("/*")
                in_block_comment = True
                i += 2
                continue

        # Handle quote transitions
        quote_char = None
        if ch == "'" and not in_double_quote and not in_template_literal:
            backslashes = 0
            k = i - 1
            while k >= 0 and js_content[k] == "\\":
                backslashes += 1
                k -= 1
            if backslashes % 2 == 0:
                in_single_quote = not in_single_quote
                quote_char = "'"
        elif ch == '"' and not in_single_quote and not in_template_literal:
            backslashes = 0
            k = i - 1
            while k >= 0 and js_content[k] == "\\":
                backslashes += 1
                k -= 1
            if backslashes % 2 == 0:
                in_double_quote = not in_double_quote
                quote_char = '"'
        elif ch == "`" and not in_single_quote and not in_double_quote:
            backslashes = 0
            k = i - 1
            while k >= 0 and js_content[k] == "\\":
                backslashes += 1
                k -= 1
            if backslashes % 2 == 0:
                in_template_literal = not in_template_literal
                quote_char = "`"

        if quote_char is not None:
            is_opening = (
                (quote_char == "'" and in_single_quote)
                or (quote_char == '"' and in_double_quote)
                or (quote_char == "`" and in_template_literal)
            )
            if is_opening and marker_db_active and saw_text_key and expecting_lang_key:
                # Check if the literal inside quotes is literally 'ta' or "ta"
                end_quote_idx = js_content.find(quote_char, i + 1)
                if end_quote_idx != -1 and js_content[i + 1 : end_quote_idx] == "ta":
                    result.append(quote_char + "ka" + quote_char)
                    # Close the string state since we consumed the closing quote
                    if quote_char == "'":
                        in_single_quote = False
                    elif quote_char == '"':
                        in_double_quote = False
                    else:
                        in_template_literal = False
                    saw_text_key = False
                    expecting_lang_key = False
                    i = end_quote_idx + 1
                    continue
            result.append(ch)
            i += 1
            continue

        # Inside string literals: transliterate Tamil runs, keep English/escapes/ASCII intact
        if in_single_quote or in_double_quote or in_template_literal:
            if marker_db_active and not saw_text_key:
                # Detect ['text'] or ["text"] while inside the quote
                prev_two = "".join(result[-2:]) if len(result) >= 2 else ""
                if prev_two == "['" or prev_two == '["':
                    # Look ahead for text'<quote>
                    close_q = js_content.find("'" if "'" in prev_two else '"', i)
                    if close_q != -1 and js_content[i:close_q] == "text":
                        saw_text_key = True

            if ch == "\\" and nxt:
                result.append(ch + nxt)
                i += 2
                continue

            match = TAMIL_RUN_RE.match(js_content, i)
            if match:
                result.append(transliterate_tamil_segment(match.group(0)))
                i = match.end()
                continue

            result.append(ch)
            i += 1
            continue

        # Outside strings and comments: track identifiers & MARKER_DATABASE['text']['ta'] chain
        if ch in ";\n{}":
            if ch in ";\n":
                marker_db_active = False
                saw_text_key = False
                expecting_lang_key = False

        recent_code = (recent_code + ch)[-64:]
        if re.search(r"\bMARKER_DATABASE\s*$", recent_code):
            marker_db_active = True
            saw_text_key = False
            expecting_lang_key = False

        if marker_db_active and saw_text_key and ch == "[":
            expecting_lang_key = True

        # Replace text_bundle_ta identifier at word boundary
        if ch == "t" and js_content.startswith("text_bundle_ta", i):
            before_ok = i == 0 or not (js_content[i - 1].isalnum() or js_content[i - 1] == "_")
            after_idx = i + len("text_bundle_ta")
            after_ok = after_idx >= n or not (js_content[after_idx].isalnum() or js_content[after_idx] == "_")
            if before_ok and after_ok:
                result.append("text_bundle_ka")
                recent_code = (recent_code + "ext_bundle_ka")[-64:]
                i = after_idx
                continue

        result.append(ch)
        i += 1

    return "".join(result)


def main():
    if len(sys.argv) < 3:
        print("Usage: python js_tamil_to_kannada.py <input.js> <output.js>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    if not input_path.exists():
        print(f"File not found: {input_path}")
        sys.exit(1)

    js_text = input_path.read_text(encoding="utf-8")
    converted_text = transliterate_js_file(js_text)
    output_path.write_text(converted_text, encoding="utf-8")
    print(f"Done. Wrote Kannada JS file to: {output_path}")


if __name__ == "__main__":
    main()