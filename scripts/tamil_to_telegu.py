#!/usr/bin/env python3
"""
Generate Telugu text for the Divya Prabandham marker files from:

  * the Tamil file   (marker_xxx_ta.js)  -> authority for LETTERS, word spacing, punctuation
  * the English file (marker_xxx_en.js)  -> authority for VOICING (k/g, ch/j, t/d ...),
                                            Grantha letters and Sanskrit aspirates

Usage:
  python tamil_en_to_telugu.py ta.js en.js out_te.js
         [--nasal conjunct|anusvara] [--final-m virama|anusvara]
         [--simple-letters]   # use ళ for ழ and ర for ற instead of ೞ / ఱ
         [--overrides extra.json]
         [--report report.txt]
"""
import argparse
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path

VIRAMA = "\u0C4D"  # Telugu virama (్)

# --------------------------------------------------------------------------
# Tamil side: letter -> (canonical sound, default Telugu letter)
# --------------------------------------------------------------------------
T_CONS = {
    "க": ("k", "క"), "ங": ("G", "ఙ"), "ச": ("c", "చ"), "ஜ": ("c", "జ"),
    "ஞ": ("Y", "ఞ"), "ட": ("T", "ట"), "ண": ("N", "ణ"), "த": ("t", "త"),
    "ந": ("n", "న"), "ன": ("n", "న"), "ப": ("p", "ప"), "ம": ("m", "మ"),
    "ய": ("y", "య"), "ர": ("r", "ర"), "ற": ("R", "ఱ"), "ல": ("l", "ల"),
    "ள": ("L", "ళ"), "ழ": ("Z", "ೞ"), "வ": ("v", "వ"), "ஶ": ("c", "శ"),
    "ஷ": ("S", "ష"), "ஸ": ("c", "స"), "ஹ": ("h", "హ"),
}
T_VOWELS = {
    "அ": "a", "ஆ": "A", "இ": "i", "ஈ": "I", "உ": "u", "ஊ": "U",
    "எ": "e", "ஏ": "E", "ஐ": "W", "ஒ": "o", "ஓ": "O", "ஔ": "X",
}
T_MATRAS = {
    "ா": "A", "ி": "i", "ீ": "I", "ு": "u", "ூ": "U",
    "ெ": "e", "ே": "E", "ை": "W", "ொ": "o", "ோ": "O", "ௌ": "X",
}
PULLI = "\u0BCD"
AYTHAM, ANUSVARA = "\u0B83", "\u0B82"

TE_VOWEL_INDEP = {
    "a": "అ", "A": "ఆ", "i": "ఇ", "I": "ఈ", "u": "ఉ", "U": "ఊ",
    "e": "ఎ", "E": "ఏ", "W": "ఐ", "o": "ఒ", "O": "ఓ", "X": "ఔ",
}
TE_MATRA = {
    "a": "", "A": "ా", "i": "ి", "I": "ీ", "u": "ు", "U": "ూ",
    "e": "ె", "E": "ే", "W": "ై", "o": "ొ", "O": "ో", "X": "ౌ",
}

# --------------------------------------------------------------------------
# English side (the scheme used in marker_*_en.js)
# --------------------------------------------------------------------------
E_VOW = {
    "ai": "W", "au": "X", "a": "a", "A": "A", "i": "i", "I": "I",
    "u": "u", "U": "U", "e": "e", "E": "E", "o": "o", "O": "O",
}

# token -> list of (canonical, Telugu letter)
E_CONS = {
    # extended tokens, used in OVERRIDES for Sanskrit words
    "~dh": [("t", "ధ")], "~th": [("t", "థ")], "~kh": [("k", "ఖ")],
    "~gh": [("k", "ఘ")], "~S": [("c", "శ")],
    # clusters written as one token in the English files
    "ng": [("G", "ఙ"), ("k", "గ")],
    "nj": [("Y", "ఞ"), ("c", "జ")],
    "zh": [("Z", "ೞ")], "ch": [("c", "చ")], "sh": [("S", "ష")],
    "th": [("t", "త")], "dh": [("t", "ద")],
    "kh": [("k", "ఖ")], "gh": [("k", "ఘ")], "bh": [("p", "భ")], "ph": [("p", "ఫ")],
    "k": [("k", "క")], "g": [("k", "గ")], "j": [("c", "జ")],
    "T": [("T", "ట")], "t": [("T", "ట")], "D": [("T", "డ")], "d": [("T", "డ")],
    "N": [("N", "ణ")], "n": [("n", "న")],
    "p": [("p", "ప")], "b": [("p", "బ")], "m": [("m", "మ")],
    "y": [("y", "య")], "r": [("r", "ర")], "R": [("R", "ఱ")],
    "l": [("l", "ల")], "L": [("L", "ళ")], "v": [("v", "వ")],
    "s": [("c", "స")], "h": [("h", "హ")],
}
E_TOKENS = sorted(list(E_VOW) + list(E_CONS), key=len, reverse=True)

DEFAULT_OVERRIDES = {
    "gurumukamanadhIthya": "gurumu~khamana~dhIthya",
    "asEshAn": "a~SEshAn",
    "sulkam": "~Sulkam",
    "svasuram": "~Sva~Suram",
    "nAthamunigaL": "nA~thamunigaL",
    "ranganAthasya": "ranganA~thasya",
    "baTTar": "bhaTTar",
    "vEdhAN": "vEdhAn",
    "arLich": "aruLich",
}


def nfc(s: str) -> str:
    return unicodedata.normalize("NFC", s)


# --------------------------------------------------------------------------
# Tamil parsing
# --------------------------------------------------------------------------
def parse_tamil(text: str):
    """-> list of tokens: ('C', canon, letter) ('V', canon, attached) ('X', text)"""
    toks, i, n = [], 0, len(text)
    while i < n:
        ch = text[i]
        if ch in T_CONS:
            canon, letter = T_CONS[ch]
            toks.append(["C", canon, letter])
            i += 1
            if i < n and text[i] == PULLI:
                i += 1
            elif i < n and text[i] in T_MATRAS:
                toks.append(["V", T_MATRAS[text[i]], True])
                i += 1
            else:
                toks.append(["V", "a", True])
        elif ch in T_VOWELS:
            toks.append(["V", T_VOWELS[ch], False])
            i += 1
        elif ch == AYTHAM:
            toks.append(["X", "ః"])
            i += 1
        elif ch == ANUSVARA:
            toks.append(["X", "ం"])
            i += 1
        elif ch in (PULLI, "\u200c", "\u200d"):
            i += 1
        else:
            toks.append(["X", ch])
            i += 1
    return toks


# --------------------------------------------------------------------------
# English parsing
# --------------------------------------------------------------------------
def english_stream(text: str, overrides: dict, unknown: set):
    stream = []
    for w in re.findall(r"[A-Za-z~]+", text):
        w = overrides.get(w, w)
        i = 0
        while i < len(w):
            for tok in E_TOKENS:
                if w.startswith(tok, i):
                    if tok in E_VOW:
                        stream.append(("V", E_VOW[tok], None))
                    else:
                        for canon, letter in E_CONS[tok]:
                            stream.append(("C", canon, letter))
                    i += len(tok)
                    break
            else:
                unknown.add(w[i])
                i += 1
    return stream


# --------------------------------------------------------------------------
# One verse
# --------------------------------------------------------------------------
def convert_verse(ta: str, en: str, opts, overrides: dict, report: list, ctx: str) -> str:
    toks = parse_tamil(nfc(ta))
    unknown = set()
    est = english_stream(nfc(en), overrides, unknown)
    if unknown:
        report.append(f"{ctx}: unknown English characters {sorted(unknown)}")

    t_idx = [k for k, t in enumerate(toks) if t[0] in "CV"]
    tcan = [toks[k][1] for k in t_idx]
    ecan = [e[1] for e in est]

    sm = difflib.SequenceMatcher(None, tcan, ecan, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for d in range(i2 - i1):
                tk = toks[t_idx[i1 + d]]
                if tk[0] == "C":
                    tk[2] = est[j1 + d][2]
        else:
            tctx = "".join(tcan[max(0, i1 - 4):min(len(tcan), i2 + 4)])
            ectx = "".join(ecan[max(0, j1 - 4):min(len(ecan), j2 + 4)])
            kind = (
                "sandhi/elision"
                if (tag == "delete" and all(c in "aAiIuUeEWoOX" for c in tcan[i1:i2]))
                else "MISMATCH"
            )
            report.append(
                f"{ctx}: {kind}  Tamil[{''.join(tcan[i1:i2])}] vs English[{''.join(ecan[j1:j2])}]"
                f"   (context T:{tctx}  E:{ectx})"
            )

    out, i = [], 0
    while i < len(toks):
        t = toks[i]
        if t[0] == "C":
            letter = t[2]
            if opts.simple_letters:
                letter = {"ೞ": "ళ", "ఱ": "ర"}.get(letter, letter)
            nxt = toks[i + 1] if i + 1 < len(toks) else None
            if nxt and nxt[0] == "V" and nxt[2]:
                out.append(letter + TE_MATRA[nxt[1]])
                i += 2
            else:
                out.append(letter + VIRAMA)
                i += 1
        elif t[0] == "V":
            out.append(TE_VOWEL_INDEP[t[1]])
            i += 1
        else:
            ch = t[1]
            if ch == ":" and i > 0 and toks[i - 1][0] in "CV":
                ch = "ః"
            out.append(ch)
            i += 1
    result = "".join(out)

    if opts.nasal == "anusvara":
        for nas, rng in (("ఙ", "క-ఘ"), ("ఞ", "చ-ఝ"), ("ణ", "ట-ఢ"), ("న", "త-ధ"), ("మ", "ప-భ")):
            result = re.sub(f"{nas}{VIRAMA}(?=[{rng}])", "ం", result)
    if opts.final_m == "anusvara":
        result = re.sub(f"మ{VIRAMA}(?![\u0C00-\u0C7F])", "ం", result)
    return result


# --------------------------------------------------------------------------
# JS file handling
# --------------------------------------------------------------------------
KEY_RE = re.compile(r"^\s*'([^']+)'\s*:\s*\{")
ENTRY_RE = re.compile(r'^(\s*)(\d+):\s*"((?:[^"\\]|\\.)*)"(,?)\s*$')


def read_entries(text: str):
    entries, key = {}, None
    for line in text.splitlines():
        m = KEY_RE.match(line)
        if m:
            key = m.group(1)
            continue
        m = ENTRY_RE.match(line)
        if m and key:
            entries[(key, int(m.group(2)))] = m.group(3)
    return entries


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("tamil")
    ap.add_argument("english")
    ap.add_argument("output")
    ap.add_argument("--nasal", choices=["conjunct", "anusvara"], default="conjunct")
    ap.add_argument("--final-m", choices=["virama", "anusvara"], default="virama")
    ap.add_argument("--simple-letters", action="store_true")
    ap.add_argument("--overrides")
    ap.add_argument("--report", default=None)
    opts = ap.parse_args()

    overrides = dict(DEFAULT_OVERRIDES)
    if opts.overrides:
        overrides.update(json.loads(Path(opts.overrides).read_text(encoding="utf-8")))

    ta_text = Path(opts.tamil).read_text(encoding="utf-8")
    en_entries = read_entries(Path(opts.english).read_text(encoding="utf-8"))

    report, review = [], []
    key, out_lines = None, []
    for line in ta_text.splitlines():
        m = KEY_RE.match(line)
        if m:
            key = m.group(1)
        m = ENTRY_RE.match(line)
        if m and key:
            indent, num, ta, comma = m.group(1), int(m.group(2)), m.group(3), m.group(4)
            en = en_entries.get((key, num))
            ctx = f"{key}[{num}]"
            if en is None:
                report.append(f"{ctx}: no English text, used plain Tamil mapping")
                en = ""
            te = convert_verse(ta, en, opts, overrides, report, ctx)
            for w in re.findall(r"[A-Za-z~]+", en):
                if "dh" in w or "sh" in w or w in overrides:
                    review.append(f"{ctx}: {w}")
            out_lines.append(f'{indent}{num}: "{te}"{comma}')
        else:
            line = line.replace("text_bundle_ta", "text_bundle_te").replace("['ta']", "['te']").replace('["ta"]', '["te"]')
            out_lines.append(line)

    Path(opts.output).write_text("\n".join(out_lines) + "\n", encoding="utf-8")
    rep = ["Differences between Tamil and English (Tamil letter was used):"] + (report or ["  none"])
    rep += ["", "Sanskrit-looking words to review (aspirates / ś ṣ s):"] + sorted(set(review))
    text = "\n".join(rep)
    if opts.report:
        Path(opts.report).write_text(text + "\n", encoding="utf-8")
    print(text)
    print(f"\nWrote {opts.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())