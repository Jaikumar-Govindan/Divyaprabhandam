#!/usr/bin/env python3
"""
Tamil (+ optional English transliteration) -> Kannada for the Divya Prabandham marker files.

Conventions follow the printed/online Kannada editions (e.g. prapatti.com):

  * nasal + homorganic stop is written with anusvara:  ಪಲ್ಲಾಂಡು, ಮಂಗೈ, ವಂದು, ವರಂಬು
  * word-final ம் is written ಂ:                         ನೂಱಾಯಿರಂ, ಮನಂ
  * ழ -> ೞ, ற -> ಱ, and ற்ற -> ಟ್ರ (ಒಟ್ರುಂಡು, ಪೆಟ್ರು)
  * Tamil stops are voiced by Tamil sound rules: between vowels and after nasals / ய் ர் ழ்
    (ಇಡುವದನ್, ಎಂಗಳ್, ವಾೞ್ಗಿನ್ಱ); voiceless at word start, when doubled, after other stops
    and when the letter carries no vowel (ಪಟ್ಟು, ತಿರುಕ್ಕಾಪ್ಪು, ವಾೞಾಟ್ಪಟ್ಟು)
  * ச is ಶ at word start / between vowels (ಶೇವಡಿ, ಅಶುರರ್), ಚ when doubled or after ச್
    (ತಿರುಚ್ಚಕ್ಕರ), ಜ after a nasal (ಶೆಂಜುಡರ್)

The English file is only used for Sanskrit words (LITERAL_WORDS): there the English
letters (g/k, dh/th, sh ...) and the overrides below are taken as written, because
Tamil script cannot show aspirates or ś/ṣ/s.  Every disagreement between the Tamil and
English texts is written to the report (it often reveals a typo in one of them).

Usage:
  python tamil_en_to_kannada.py ta.js en.js out_ka.js [--report report.txt]
         [--nasal anusvara|conjunct] [--final-m anusvara|virama]
         [--simple-letters]      # ಳ for ழ and ರ for ற instead of ೞ / ಱ
         [--overrides extra.json] [--selftest]
"""
import argparse
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path

VIRAMA = "\u0CCD"

# --------------------------------------------------------------------------
# Tamil side: letter -> (canonical sound, default Kannada letter)
# --------------------------------------------------------------------------
T_CONS = {
    "க": ("k", "ಕ"), "ங": ("G", "ಙ"), "ச": ("c", "ಚ"), "ஜ": ("c", "ಜ"),
    "ஞ": ("Y", "ಞ"), "ட": ("T", "ಟ"), "ண": ("N", "ಣ"), "த": ("t", "ತ"),
    "ந": ("n", "ನ"), "ன": ("n", "ನ"), "ப": ("p", "ಪ"), "ம": ("m", "ಮ"),
    "ய": ("y", "ಯ"), "ர": ("r", "ರ"), "ற": ("R", "ಱ"), "ல": ("l", "ಲ"),
    "ள": ("L", "ಳ"), "ழ": ("Z", "ೞ"), "வ": ("v", "ವ"), "ஶ": ("c", "ಶ"),
    "ஷ": ("S", "ಷ"), "ஸ": ("c", "ಸ"), "ஹ": ("h", "ಹ"),
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

K_VOWEL_INDEP = {"a": "ಅ", "A": "ಆ", "i": "ಇ", "I": "ಈ", "u": "ಉ", "U": "ಊ",
                 "e": "ಎ", "E": "ಏ", "W": "ಐ", "o": "ಒ", "O": "ಓ", "X": "ಔ"}
K_MATRA = {"a": "", "A": "ಾ", "i": "ಿ", "I": "ೀ", "u": "ು", "U": "ೂ",
           "e": "ೆ", "E": "ೇ", "W": "ೈ", "o": "ೊ", "O": "ೋ", "X": "ೌ"}

# --------------------------------------------------------------------------
# English side (the scheme used in marker_*_en.js)
# --------------------------------------------------------------------------
E_VOW = {"ai": "W", "au": "X", "a": "a", "A": "A", "i": "i", "I": "I",
         "u": "u", "U": "U", "e": "e", "E": "E", "o": "o", "O": "O"}

# token -> list of (canonical, Kannada letter)
E_CONS = {
    # extended tokens, only used in OVERRIDES for Sanskrit words
    "~dh": [("t", "ಧ")], "~th": [("t", "ಥ")], "~kh": [("k", "ಖ")],
    "~gh": [("k", "ಘ")], "~S": [("c", "ಶ")], "~ny": [("Y", "ಞ")],
    # clusters written as one token in the English files
    "ng": [("G", "ಙ"), ("k", "ಗ")],
    "nj": [("Y", "ಞ"), ("c", "ಜ")],
    "zh": [("Z", "ೞ")], "ch": [("c", "ಚ")], "sh": [("S", "ಷ")],
    "th": [("t", "ತ")], "dh": [("t", "ದ")],
    "kh": [("k", "ಖ")], "gh": [("k", "ಘ")], "bh": [("p", "ಭ")], "ph": [("p", "ಫ")],
    "k": [("k", "ಕ")], "g": [("k", "ಗ")], "j": [("c", "ಜ")],
    "T": [("T", "ಟ")], "t": [("T", "ಟ")], "D": [("T", "ಡ")], "d": [("T", "ಡ")],
    "N": [("N", "ಣ")], "n": [("n", "ನ")],
    "p": [("p", "ಪ")], "b": [("p", "ಬ")], "m": [("m", "ಮ")],
    "y": [("y", "ಯ")], "r": [("r", "ರ")], "R": [("R", "ಱ")],
    "l": [("l", "ಲ")], "L": [("L", "ಳ")], "v": [("v", "ವ")],
    "s": [("c", "ಸ")], "h": [("h", "ಹ")],
}
E_TOKENS = sorted(list(E_VOW) + list(E_CONS), key=len, reverse=True)

# Sanskrit words (aspirates, ś/ṣ/s) and English typos that the plain scheme cannot
# resolve.  key = word exactly as in the English file, value = enhanced spelling
# using  ~S (ಶ)  ~th (ಥ)  ~dh (ಧ)  ~kh (ಖ)  ~gh (ಘ).
DEFAULT_OVERRIDES = {
    "gurumukamanadhIthya": "gurumu~khamana~dhIthya",   # ಗುರುಮುಖಮ್ ಅನಧೀತ್ಯ
    "asEshAn": "a~SEshAn",                             # ಅಶೇಷಾನ್
    "sulkam": "~Sulkam",                               # ಶುಲ್ಕಮ್
    "svasuram": "~Sva~Suram",                          # ಶ್ವಶುರಮ್
    "nAthamunigaL": "nA~thamunigaL",                   # ನಾಥಮುನಿಗಳ್
    "ranganAthasya": "ranganA~thasya",                 # ರಙ್ಗನಾಥಸ್ಯ
    "baTTar": "bhaTTar",                               # ಭಟ್ಟರ್ (Bhattar)
    "appAnjasanniyamum": "appA~nycha~Sanniyamum",          # ಪಾಂಚಶನ್ನಿಯಮುಂ (Pañcajanya)
    "vEdhAN": "vEdhAn",                                # typo: N -> n
    "arLich": "aruLich",                               # typo: missing u
}


# English words taken literally (Sanskrit words / names); everything else follows the Tamil rules.
LITERAL_WORDS = set(DEFAULT_OVERRIDES) | {
    "prAha", "narapathiparikluptham", "AdhAthu", "kAma", "amaravandhyam",
    "sAkshAth", "dhvijakulathilakam", "tham", "vishNuchiththam", "namAmi",
}

# Fixes applied to finished Kannada words (proper names that do not follow the voicing rules)
KANNADA_FIXES = {
    "ವಿಲ್ಲಿಬುತ್ತೂರ್": "ವಿಲ್ಲಿಪುತ್ತೂರ್",           # proper name
    "ಪಟ್ಟರ್ಬಿರಾನ್": "ಭಟ್ಟರ್ಪಿರಾನ್",              # Bhattarpiran
    # compounds that the Tamil file writes as one word but the Kannada edition splits
    "ಪಲಗೋಡಿ": "ಪಲ ಕೋಡಿ",
    "ಆಯಿರಂದೋಳುಂ": "ಆಯಿರನ್ ತೋಳುಂ",
    "ಏೞ್ಬಡಿಗಾಲ್": "ಏೞ್ ಪಡಿ ಕಾಲ್",
    "ಪಡೈಬೋರ್": "ಪಡೈ ಪೋರ್",
    "ಪೊರುಬಡೈ": "ಪೊರುಪಡೈ",
    "ವೀಡುಬೆಟ್ರು": "ವೀಡು ಪೆಟ್ರು",
    "ಕೋಟ್ಟಿಯರ್ಗೋನ್": "ಕೋಟ್ಟಿಯರ್ ಕೋನ್",
    "ಅಬಿಮಾನದುಂಗನ್": "ಅಬಿಮಾನ ತುಂಗನ್",
    "ತುೞಾಯ್ಮಲರ್ಜೂಡಿಕ್": "ತುೞಾಯ್ಮಲರ್ ಶೂಡಿಕ್",
    "ಕುಡಿಗುಡಿ": "ಕುಡಿಕುಡಿ",
}


def nfc(s):
    return unicodedata.normalize("NFC", s)


# --------------------------------------------------------------------------
# Tamil parsing
# --------------------------------------------------------------------------
def parse_tamil(text):
    """-> list of tokens: ('C',canon,letter) ('V',canon,attached) ('X',text)"""
    toks, i, n = [], 0, len(text)
    while i < n:
        ch = text[i]
        if ch in T_CONS:
            canon, letter = T_CONS[ch]
            toks.append(["C", canon, letter, ch, False])   # [kind, canon, letter, tamil char, literal]
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
            toks.append(["X", "ಃ"]); i += 1
        elif ch == ANUSVARA:
            toks.append(["X", "ಂ"]); i += 1
        elif ch in (PULLI, "\u200c", "\u200d"):
            i += 1
        else:
            toks.append(["X", ch]); i += 1
    return toks


# --------------------------------------------------------------------------
# English parsing
# --------------------------------------------------------------------------
def english_stream(text, overrides, unknown):
    stream = []
    for w in re.findall(r"[A-Za-z~]+", text):
        lit = w in LITERAL_WORDS
        w = overrides.get(w, w)
        i = 0
        while i < len(w):
            for tok in E_TOKENS:
                if w.startswith(tok, i):
                    if tok in E_VOW:
                        stream.append(("V", E_VOW[tok], None, lit))
                    else:
                        for canon, letter in E_CONS[tok]:
                            stream.append(("C", canon, letter, lit))
                    i += len(tok)
                    break
            else:
                unknown.add(w[i])
                i += 1
    return stream



STOPS = {"க": ("ಕ", "ಗ"), "ச": ("ಚ", "ಜ"), "ட": ("ಟ", "ಡ"), "த": ("ತ", "ದ"), "ப": ("ಪ", "ಬ")}
NASALS = set("ஙஞணநனம")
GLIDES = set("யரழ")


def apply_tamil_rules(toks):
    """Choose Kannada letters for Tamil consonants (voicing, ಶ for ச, ற்ற -> ಟ್ರ)."""
    n = len(toks)
    for i, t in enumerate(toks):
        if t[0] != "C" or t[4]:
            continue
        ch = t[3]
        has_vowel = i + 1 < n and toks[i + 1][0] == "V" and toks[i + 1][2]
        prev = toks[i - 1] if i > 0 else None

        if ch == "ற" and not has_vowel and i + 2 < n and toks[i + 1][0] == "C" and toks[i + 1][3] == "ற":
            t[2] = "ಟ"                       # ற்ற -> ಟ್ರ
            toks[i + 1][2] = "ರ"
            toks[i + 1][4] = True
            continue
        if ch not in STOPS:
            continue

        unv, voi = STOPS[ch]
        letter = unv
        if prev is None or prev[0] == "X":                      # word start
            if ch == "ச":
                j = i - 1
                while j >= 0 and toks[j][0] == "X" and toks[j][1].isspace():
                    j -= 1
                letter = "ಚ" if (j >= 0 and toks[j][0] == "C" and toks[j][3] == "ச") else "ಶ"
        elif has_vowel:
            if prev[0] == "V":                                   # between vowels
                letter = "ಶ" if ch == "ச" else voi
            elif prev[0] == "C":
                pc = prev[3]
                if pc == ch:
                    letter = unv                                 # doubled
                elif pc in NASALS or pc in GLIDES:
                    letter = voi
        t[2] = letter

# --------------------------------------------------------------------------
# One verse
# --------------------------------------------------------------------------
def convert_verse(ta, en, opts, overrides, report, ctx):
    toks = parse_tamil(nfc(ta))
    unknown = set()
    est = english_stream(nfc(en), overrides, unknown)
    if unknown:
        report.append(f"{ctx}: unknown English characters {sorted(unknown)}")

    t_idx = [k for k, t in enumerate(toks) if t[0] in "CV"]
    tcan = [toks[k][1] for k in t_idx]
    ecan = [e[1] for e in est]

    sm = difflib.SequenceMatcher(None, tcan, ecan, autojunk=False)
    for tag, i1, i2, j1, j2 in (sm.get_opcodes() if est else []):   # no English -> nothing to compare
        if tag == "equal":
            for d in range(i2 - i1):
                tk = toks[t_idx[i1 + d]]
                if tk[0] == "C" and est[j1 + d][3]:
                    tk[2] = est[j1 + d][2]      # Sanskrit word: keep the English letter
                    tk[4] = True
        else:
            tctx = "".join(tcan[max(0, i1 - 4):min(len(tcan), i2 + 4)])
            ectx = "".join(ecan[max(0, j1 - 4):min(len(ecan), j2 + 4)])
            kind = "sandhi/elision" if (tag == "delete" and all(c in "aAiIuUeEWoOX" for c in tcan[i1:i2])) else "MISMATCH"
            report.append(f"{ctx}: {kind}  Tamil[{''.join(tcan[i1:i2])}] vs English[{''.join(ecan[j1:j2])}]"
                          f"   (context T:{tctx}  E:{ectx})")

    apply_tamil_rules(toks)

    out, i = [], 0
    while i < len(toks):
        t = toks[i]
        if t[0] == "C":
            letter = t[2]
            if opts.simple_letters:
                letter = {"ೞ": "ಳ", "ಱ": "ರ"}.get(letter, letter)
            nxt = toks[i + 1] if i + 1 < len(toks) else None
            if nxt and nxt[0] == "V" and nxt[2]:
                out.append(letter + K_MATRA[nxt[1]])
                i += 2
            else:
                out.append(letter + VIRAMA)
                i += 1
        elif t[0] == "V":
            out.append(K_VOWEL_INDEP[t[1]])
            i += 1
        else:
            ch = t[1]
            if ch == ":" and i > 0 and toks[i - 1][0] in "CV":
                ch = "ಃ"                       # visarga attached to a word
            out.append(ch)
            i += 1
    result = "".join(out)

    if opts.nasal == "anusvara":
        for nas, rng in (("ಙ", "ಕಗ"), ("ಞ", "ಚಜ"), ("ಣ", "ಟಡ"), ("ನ", "ತದ"), ("ಮ", "ಪಬ")):
            result = re.sub(f"(?<!{VIRAMA}){nas}{VIRAMA}(?=[{rng}])", "ಂ", result)
            result = re.sub(f"(?<=ಯ{VIRAMA}){nas}{VIRAMA}(?=[{rng}])", "ಂ", result)
    if opts.final_m == "anusvara":
        result = re.sub(f"ಮ{VIRAMA}(?![\u0C80-\u0CFF])", "ಂ", result)
    for bad, good in KANNADA_FIXES.items():
        result = re.sub(f"(?<![\u0C80-\u0CFF]){re.escape(bad)}(?![\u0C80-\u0CFF])", good, result)
    return result



# Words read from the prapatti.com Kannada edition of Tiruppallandu: (Tamil, expected Kannada)
SELFTEST = [
    ("பல்லாண்டு", "ಪಲ್ಲಾಂಡು"), ("பல்லாயிரத்தாண்டு", "ಪಲ್ಲಾಯಿರತ್ತಾಂಡು"),
    ("நூறாயிரம்", "ನೂಱಾಯಿರಂ"), ("மல்லாண்ட", "ಮಲ್ಲಾಂಡ"), ("மணிவண்ணா", "ಮಣಿವಣ್ಣಾ"),
    ("சேவடி", "ಶೇವಡಿ"), ("செவ்வி", "ಶೆವ್ವಿ"), ("திருக்காப்பு", "ತಿರುಕ್ಕಾಪ್ಪು"),
    ("அடியோமோடும்", "ಅಡಿಯೋಮೋಡುಂ"), ("நின்னோடும்", "ನಿನ್ನೋಡುಂ"), ("வாழ்கின்ற", "ವಾೞ್ಗಿನ್ಱ"),
    ("மங்கையும்", "ಮಂಗೈಯುಂ"), ("சுடராழியும்", "ಶುಡರಾೞಿಯುಂ"), ("முழங்கும்", "ಮುೞಂಗುಂ"),
    ("வாழாட்பட்டு", "ವಾೞಾಟ್ಪಟ್ಟು"), ("நின்றீர்", "ನಿನ್ಱೀರ್"), ("உள்ளீரேல்", "ಉಳ್ಳೀರೇಲ್"),
    ("வந்து", "ವಂದು"), ("மண்ணும்", "ಮಣ್ಣುಂ"), ("மணமும்", "ಮಣಮುಂ"), ("கொண்மின்", "ಕೊಣ್ಮಿನ್"),
    ("எங்கள்", "ಎಂಗಳ್"), ("புகுதலொட்டோம்", "ಪುಗುದಲೊಟ್ಟೋಂ"), ("ஏழாட்காலும்", "ಏೞಾಟ್ಕಾಲುಂ"),
    ("இராக்கதர்", "ಇರಾಕ್ಕದರ್"), ("இலங்கை", "ಇಲಂಗೈ"), ("கூறுதுமே", "ಕೂಱುದುಮೇ"),
    ("இடுவதன்", "ಇಡುವದನ್"), ("வரம்பு", "ವರಂಬು"), ("அசுரர்", "ಅಶುರರ್"),
    ("தவிர்ந்து", "ತವಿರ್ನ್ದು"), ("ஒற்றுண்டு", "ಒಟ್ರುಂಡು"), ("சுழற்றிய", "ಶುೞಟ್ರಿಯ"),
    ("தோற்றி", "ತೋಟ್ರಿ"), ("பெற்று", "ಪೆಟ್ರು"), ("எந்தை", "ಎಂದೈ"), ("அந்தியம்", "ಅಂದಿಯಂ"),
    ("பாய்ந்தவனே", "ಪಾಯ್ಂದವನೇ"), ("ஐந்தலைய", "ಐಂದಲೈಯ"), ("நன்கு", "ನನ್ಗು"),
    ("வில்லிபுத்தூர்", "ವಿಲ್ಲಿಪುತ್ತೂರ್"), ("விட்டுசித்தன்", "ವಿಟ್ಟುಶಿತ್ತನ್"),
    ("திருச்சக்கரத்தின்", "ತಿರುಚ್ಚಕ್ಕರತ್ತಿನ್"), ("செஞ்சுடர்", "ಶೆಂಜುಡರ್"),
    ("கலத்தது", "ಕಲತ್ತದು"), ("பழிப்பு", "ಪೞಿಪ್ಪು"), ("தொழுது", "ತೊೞುದು"),
    ("அணி", "ಅಣಿ"), ("கோட்டியர்", "ಕೋಟ್ಟಿಯರ್"), ("பரமேட்டியை", "ಪರಮೇಟ್ಟಿಯೈ"),
    ("துங்கன்", "ತುಂಗನ್"), ("செல்வனை", "ಶೆಲ್ವನೈ"), ("அடைக்காயும்", "ಅಡೈಕ್ಕಾಯುಂ"),
    ("பையுடை", "ಪೈಯುಡೈ"), ("நாகப்பகைக்", "ನಾಗಪ್ಪಗೈಕ್"), ("பைந்நாகணைப்", "ಪೈನ್ನಾಗಣೈಪ್"),
    ("அருளிச்", "ಅರುಳಿಚ್"), ("இருடிகேசன்", "ಇರುಡಿಗೇಶನ್"),
]


def selftest(opts):
    bad = 0
    for ta, want in SELFTEST:
        got = convert_verse(ta, "", opts, DEFAULT_OVERRIDES, [], "selftest")
        if got != want:
            bad += 1
            print(f"FAIL {ta}: got {got}  expected {want}")
    print(f"selftest: {len(SELFTEST) - bad}/{len(SELFTEST)} passed")
    return bad

# --------------------------------------------------------------------------
# JS file handling
# --------------------------------------------------------------------------
KEY_RE = re.compile(r"^\s*'([^']+)'\s*:\s*\{")
ENTRY_RE = re.compile(r'^(\s*)(\d+):\s*"((?:[^"\\]|\\.)*)"(,?)\s*$')


def read_entries(text):
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


def convert_file(ta_path, en_path, out_path, opts, overrides=None):
    """Convert one Tamil .js file (using the English .js if given) and write out_path.

    Returns {"verses": int, "report": [...], "review": [...]}.  out_path=None -> dry run.
    """
    overrides = dict(DEFAULT_OVERRIDES if overrides is None else overrides)
    ta_text = Path(ta_path).read_text(encoding="utf-8")
    en_entries = {}
    if en_path and Path(en_path).exists():
        en_entries = read_entries(Path(en_path).read_text(encoding="utf-8"))

    report, review, verses = [], [], 0
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
            ka = convert_verse(ta, en, opts, overrides, report, ctx)
            for w in re.findall(r"[A-Za-z~]+", en):
                if "dh" in w or "sh" in w or w in overrides:
                    review.append(f"{ctx}: {w}")
            out_lines.append(f'{indent}{num}: "{ka}"{comma}')
            verses += 1
        else:
            line = line.replace("text_bundle_ta", "text_bundle_ka").replace("['ta']", "['ka']")
            out_lines.append(line)

    if out_path is not None:
        Path(out_path).write_text("\n".join(out_lines) + "\n", encoding="utf-8")
    return {"verses": verses, "report": report, "review": sorted(set(review))}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tamil", nargs="?")
    ap.add_argument("english", nargs="?")
    ap.add_argument("output", nargs="?")
    ap.add_argument("--selftest", action="store_true")
    ap.add_argument("--nasal", choices=["conjunct", "anusvara"], default="anusvara")
    ap.add_argument("--final-m", choices=["virama", "anusvara"], default="anusvara")
    ap.add_argument("--simple-letters", action="store_true")
    ap.add_argument("--overrides")
    ap.add_argument("--report", default=None)
    opts = ap.parse_args()

    if opts.selftest:
        return 1 if selftest(opts) else 0
    if not (opts.tamil and opts.english and opts.output):
        ap.error("tamil, english and output files are required")

    overrides = dict(DEFAULT_OVERRIDES)
    if opts.overrides:
        overrides.update(json.loads(Path(opts.overrides).read_text(encoding="utf-8")))

    res = convert_file(opts.tamil, opts.english, opts.output, opts, overrides)
    rep = ["Differences between Tamil and English (Tamil letter was used):"] + (res["report"] or ["  none"])
    rep += ["", "Sanskrit-looking words to review (aspirates / ś ṣ s):"] + res["review"]
    text = "\n".join(rep)
    if opts.report:
        Path(opts.report).write_text(text + "\n", encoding="utf-8")
    print(text)
    print(f"\nWrote {opts.output}")


if __name__ == "__main__":
    sys.exit(main())
