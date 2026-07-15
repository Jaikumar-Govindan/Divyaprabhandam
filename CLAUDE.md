# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

**Divya Prabandham Anusandhanam** — a static, client-side web app for *Sandhai*
practice (memorization-style recitation) of the Tamil Sri Vaishnava
Divya Prabandham. The user picks a Prabandham (book) and a pasuram (verse),
then the app plays the recitation audio segment-by-segment in graduated
"learning steps" (half-line → line → two-line → full verse) while highlighting
the matching text in sync with the audio.

Accuracy of the per-phrase timing markers is the whole point of the app — the
playback engine relies on tight, hand-verified segment boundaries. Those
markers are authored **manually, per prabandam, in `splitter.html`** (see
"Generating markers" below), not computed automatically at runtime.

There is **no build system, no package manager, and no framework** — just
`index.html` plus vanilla JS files. There **is** a lightweight smoke test
(`scripts/smoke_test.py`), a Content Creation Status Report
(`content-status.html` + `scripts/build_content_status.py`), and related
data tooling under `scripts/`.

## Running locally

A static server is required (the app uses `fetch`, audio range requests, and
relative script injection that won't work over `file://`):

```bash
python3 scripts/server.py    # serves CWD on http://localhost:8000 (PORT env overrides)
```

Then open http://localhost:8000/index.html.

Other tool pages (same server):

- http://localhost:8000/splitter.html — marker authoring
- http://localhost:8000/content-status.html — content coverage + marker quality report

Quick health check:

```bash
python3 scripts/smoke_test.py
```

Regenerate the status report without the UI:

```bash
python3 scripts/build_content_status.py   # writes content-status.json
```

Or click **Update** on `content-status.html` (calls `POST /api/rebuild-content-status`
on `scripts/server.py` — not available on plain GitHub Pages).

## Architecture

`index.html` is the only player page. It loads scripts in this strict order
(order matters):

1. `sync_engine.js` — cache-busting / hot-swap layer (see below)
2. `config.js` — `CONFIG`: per-book structure + asset-path solvers
3. `navigation.js` — `Navigation`: coordinate parsing & section limits
4. `markerProcessor.js` — `MarkerProcessor`: segment-bounds helper
5. `playerEngine.js` — UI glue, step/repeat orchestration, text-sync rendering
6. `learningEngine.js` — `LearningEngine`: low-level audio playback engine

All modules attach to `window.*`; there are no ES imports/modules.

### Data model

Verse timing + text lives in `window.MARKER_DATABASE`, keyed by patterns like:
- `PREFIX.<chapter>.steps` (e.g. `PMT.1.steps`)
- `PREFIX.<chapter>.<sub>.steps` (books with sub-chapters, e.g. TVM, PTM, PAT)
- `PREFIX.steps` (flat books)

Each key holds an array of pasuram objects (one per verse):
```js
{ "p": 1, "text": "...", "step1": [[start,end],...], "step2": [...], "step3": [...], "step4": [start,end] }
```
- `step1` = half-line segments, `step2` = full lines, `step3` = two-line, `step4` = whole verse bounds.
- `text` is a ` *`-delimited string; phrase index aligns with `step1` segments for highlighting.
- `text` may also be `{ ta: "...", en: "..." }` for multi-language.

`CONFIG[PREFIX]` describes each book:
- `structure`: `chapter_pasuram` | `chapter_sub_pasuram` (via factory helpers)
- limits: `maxCh`, `maxSub`, `defPas`, `minCh`, and `ex` (per-section exceptions)
- solver functions: `getMarkerPath(num)`, `getLanguagePath(num, lang)`, `getAudioSrc(num)`

`config.js` builds books with factories (`makeSimpleBook`, `makeGroupedBook`,
`makeSubChapterBook`) and a shared asset root:

```js
const ROOT = 'aruLicheyal';
```

### Marker / asset files (`aruLicheyal/`)

All local book assets live under **`aruLicheyal/<BOOK>/`**:

- `aruLicheyal/<BOOK>/markers/` — timing JS
  - flat books: `marker_<book>_timelines.js`
  - sub-chapter books (TVM, PTM, PAT): `timelines_<chapter>.js`
- `aruLicheyal/<BOOK>/text/` — verse text
  - flat: `marker_<book>_<lang>.js`
  - sub-chapter: `<chapter>_<lang>.js`
- `aruLicheyal/<BOOK>/audiofiles/` — local `.ogg`; many sections fall back to
  remote `https://www.uveda.org/media/recitation/<PREFIX>.<num>.mp3`

Marker/language files are loaded **on demand** at play time via
`loadMarkerOnDemand` in `config.js` (injects `<script>` tags, dedupes via
`window.LOADED_SCRIPTS`).

Player UI book list is the `<select id="prefix">` in `index.html` (19 books).
`CONFIG` / disk may include additional books not yet exposed in the picker
(e.g. `4TA`, `TVT`, `TVS`, `PTA`, `TVK`).

### Audio engine (`learningEngine.js`)

Dual pipeline:
- **RAM mode** (`pipelineMode: "ram"`) — used when precise marker bounds exist.
  Decodes the whole `.ogg` via Web Audio API and plays exact `[start,end]` slices
  on a `BufferSource`, timed with `setTimeout` + `requestAnimationFrame` monitoring.
  Enables tight phrase loops and live playback-rate changes.
- **Native mode** — falls back to a plain `<audio>` element streaming the full
  track when there are no markers or RAM decode fails.

`playerEngine.js` drives repeats (`repeatLimit`), step progression, auto-advance,
and `syncTextToAudioTimeline()` which highlights the active phrase.

### Deep links / shareable URLs

The player keeps the address bar in sync with the current selection via
`history.replaceState`. Open or share links like:

```
/index.html?book=PMT&pas=1.1&step=step1&lang=ta
/index.html?book=TVM&pas=3.1.1&play=1
```

Supported query keys: `book` (alias `prefix`), `pas`, `step`, `lang`, `speed`,
`repeat`, `autoNext`, and optional `play=1` to auto-start. Use **Copy link** in
the header to copy the current URL.

### Sync engine (`sync_engine.js`)

On load, fetches `sync-check.json` (a hash manifest), compares against
`localStorage`, and hot-swaps any changed `.js` assets by appending `?h=<hash>`
and re-injecting the script. `sync-check.json` is generated automatically by CI
(`.github/scripts/build-manifest.js`) — **do not hand-edit it**.

## Generating markers (`splitter.html` — "Audio Marker Studio")

This standalone page is the **primary tool for authoring the timing markers**.
It is the manual workflow that produces the `step1`–`step4` arrays found under
`aruLicheyal/<BOOK>/markers/`. Open it the same way as the app (via the local
server, e.g. http://localhost:8000/splitter.html).

Typical workflow:
1. **Load audio** — paste a GitHub/asset URL or path and click *Load*.
2. **Paste the verse text** into "Raw Pasuram / Script Source Text Content",
   using ` *` to delimit the sub-phrases (half-lines), then *Parse Source to
   Canvas Steps* to seed the segment grid.
3. **Capture timing by ear** — play the audio and tap *Capture Stamp (M)*
   (hotkey **M**) at each half-line boundary. *Snap*, *Rewind 2s*, the
   per-segment ▶ test button, and *Even Distribute* help fine-tune.
4. **Export** — the tool records `step1` and **auto-derives** `step2`–`step4`,
   then emits ready-to-paste objects into the serialized output box. Optional
   **Mark reviewed (listen-verified)** adds:

```js
{ "p": N, "step1": …, "step2": …, "step3": …, "step4": …,
  "meta": { "source": "capture|evenDistribute|import", "reviewed": true,
            "reviewedAt": "YYYY-MM-DD", "tool": "splitter" } }
```

   `source` becomes `evenDistribute` after *Even Distribute*, and flips back
   to `capture` when you stamp or edit times by hand. The player ignores
   unknown keys like `meta`.
5. **Paste** those lines into the appropriate
   `aruLicheyal/<BOOK>/markers/…` file under the right
   `MARKER_DATABASE['PREFIX.<ch>.steps']` key. *Import Config Code Block Snippet*
   round-trips existing data back into the grid for editing.

It also offers **Copy Handoff URL** / **Show QR Code** to resume a capture
session on another device.

Because `step2`–`step4` are derived from `step1`, the manual work is getting
`step1` and the ` *`-delimited phrase count to line up exactly.

`new_splitter.html` may exist as an alternate/experimental UI — prefer
`splitter.html` unless you know otherwise.

## Content Creation Status Report

Standalone tooling page: **`content-status.html`**, fed by generated
**`content-status.json`**. It answers, per Prabandam: which pasurams have
markers, Tamil/English lyrics, and audio (local / remote / missing), plus a
marker-quality triage. Summary table + click-through detail; **Update**
regenerates the JSON via the local server API.

### How the report is created

```bash
python3 scripts/build_content_status.py
# → content-status.json
```

Pipeline:

1. Parse book catalog from `config.js` factories (`makeSimpleBook` /
   `makeGroupedBook` / `makeSubChapterBook`) — structure, `defPas`, `ex`,
   `availableContent`, etc. Skip commented-out entries (e.g. STM).
2. Read UI picker books from `<select id="prefix">` in `index.html` (`inUi`).
3. Enumerate **expected** pasurams per section from CONFIG limits.
4. Scan `aruLicheyal/<BOOK>/markers/*.js` for non-empty `step1` (+ optional
   `meta`).
5. Scan `aruLicheyal/<BOOK>/text/*.js` for `text_bundle_ta` / `text_bundle_en`.
6. Resolve audio like the CONFIG factories: local path under `audiofiles/` if
   present; else remote uveda URL for sub-chapter sections not locally
   hosted; else **missing**. Grouped books (e.g. RN) list **every** batch
   file (`RN_1_10.ogg` …), not one path per chapter.
7. Run marker **quality heuristics** (layers below) and write rollups into
   `content-status.json`.

`scripts/smoke_test.py` regenerates/validates this JSON and exercises
`POST /api/rebuild-content-status`.

**Honest limit:** “has markers” ≠ “hand-reviewed.” Git commit history is
**not** used to judge quality.

### Evaluation layers (marker quality)

| Layer | Signal | Reliable? | Where it shows |
|-------|--------|-----------|----------------|
| **1 — Coverage** | Non-empty `step1` | Yes | Marked % |
| **2 — Structural** | Integrity (`end ≥ start`, contiguous segments, `step4` spans `step1`); phrase count = `len(step1)` vs Tamil text split on ` *` (same rule as `playerEngine.js`) | Yes (broken / unsafe) | Broken; detail lists `integrity` / `phrase` |
| **3 — Even-scaffold** | `step1` durations nearly equal (CV below 0.01) — leftover Even Distribute / Path B | Medium — “needs listen check”, not proven wrong. Do **not** treat mild regularity (CV ~0.02–0.08) as auto | Suspect; `even-scaffold` |
| **4 — Manual review** | Optional `meta.reviewed` / `meta.source` from splitter export | Only durable “reviewed” signal | Reviewed column; untagged marked verses = **unknown** |
| **5 — Git history** | Last commit on marker files | Weak; campaign activity only | **Not implemented** |

Listen-QA workflow for suspect / new markers: open in `splitter.html`, play
per-segment ▶, fix stamps, confirm phrase count, check **Mark reviewed**,
export/paste, re-run the builder or click **Update**.

Audio column meanings (also on table header tooltips):

- **Audio local files** — files under `aruLicheyal/<BOOK>/audiofiles/` the
  player would use
- **Audio remote files** — no usable local file; playback falls back to
  `https://www.uveda.org/media/recitation/…`
- **Audio missing files** — expected local file configured but absent on disk

## CI (`.github/workflows/`)

- `generate-sync-manifest.yml` — regenerates and commits `sync-check.json`
  (do not hand-edit that file).
- `clean_audio.yml` — runs `scripts/process_audio.js` (ffmpeg) on audio changes.
- `smoke-test.yml` — runs `python3 scripts/smoke_test.py` on relevant path changes.
- `static.yml` — deploys static content to GitHub Pages.

## Data tooling (`scripts/`, Python)

Helpers (not the runtime player):

- `server.py` — local static server with HTTP range support (`PORT` env optional);
  also `POST /api/rebuild-content-status` for the status-page **Update** button
- `smoke_test.py` — JS syntax, config/`index.html` checks, `aruLicheyal/` layout,
  content-status rebuild, HTTP
- `build_content_status.py` — scans CONFIG + `aruLicheyal/` → `content-status.json`
  (coverage + marker quality); UI is `content-status.html`
- `build_offline_manifest.py` — scans `aruLicheyal/` → writes `offline-manifest.json`
- `scrape_rn_koyil.py` — scrapes RN word-by-word meanings →
  `aruLicheyal/RN/markers/marker_rn_koyil.js` (player koyil UI not wired).
  **Currently held in git stash** (not in the working tree; do not commit until wanted)
- `split_marker.py`, `combine_markers.py`, `convert_pasuram_format.py`, `add3stars.py`
  — marker/text reshape helpers after authoring in `splitter.html`

## Conventions

- Don't hand-edit timing arrays from scratch — author/adjust them in
  `splitter.html` and paste into `aruLicheyal/<BOOK>/markers/…`.
- Edit timing data carefully: `step1` segment count must stay aligned with the
  ` *`-delimited phrase count in `text`, or highlighting desyncs.
- After listen-verifying timings, prefer exporting with **Mark reviewed** so
  `content-status` can distinguish reviewed vs unknown.
- Adding a book = add a `CONFIG[PREFIX]` entry (factory), assets under
  `aruLicheyal/<BOOK>/`, and an `<option>` in `index.html`.
- Keep the `<script>` load order in `index.html` intact.
- Keep asset paths under `aruLicheyal/`; do not reintroduce top-level
  `markers/` or `audiofiles/` trees for new content.
- Do not hand-edit `content-status.json` — regenerate with
  `build_content_status.py` or the status-page **Update** button.
