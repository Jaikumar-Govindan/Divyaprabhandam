// added dynamic language loaded
let activeLineIndex = 0;
let pauseTimeoutHandle = null;

const VALID_STEPS = new Set(['step1', 'step2', 'step3', 'step4']);
const DEFAULT_STEP = 'step1';
const VALID_LANGS = new Set(['ta', 'en']);
const DEEP_LINK_KEYS = ['book', 'pas', 'step', 'lang', 'speed', 'repeat', 'autoNext', 'prefix', 'play'];

function hasDeepLinkParams() {
    const params = new URLSearchParams(window.location.search);
    return DEEP_LINK_KEYS.some((key) => params.has(key));
}

function shouldAutoPlayFromUrl() {
    return new URLSearchParams(window.location.search).get('play') === '1';
}

/**
 * Friendly hierarchical pasuram pickers (Part / optional Sub / Verse number).
 * Canonical coordinate stays in hidden #number for playback + deep links.
 * Users never need to know "0.1" / "1.20" notation.
 */
function bookUsesSubchapters(c) {
    return !!(c && (c.hasSub || c.structure === 'chapter_sub_pasuram'));
}

function setSubPickerVisible(visible) {
    const subEl = document.getElementById('pasSub');
    const subField = document.getElementById('pasSubField');
    const pickers = document.getElementById('pasuramPickers');
    if (subEl) subEl.classList.toggle('hidden', !visible);
    if (subField) subField.classList.toggle('hidden', !visible);
    if (pickers) pickers.classList.toggle('no-sub', !visible);
}

function fillSelectOptions(selectEl, items) {
    if (!selectEl) return;
    const prev = selectEl.value;
    selectEl.innerHTML = '';
    items.forEach(({ value, label }) => {
        const opt = document.createElement('option');
        opt.value = String(value);
        opt.textContent = label;
        selectEl.appendChild(opt);
    });
    if (items.some((i) => String(i.value) === prev)) {
        selectEl.value = prev;
    } else if (items.length) {
        selectEl.value = String(items[0].value);
    }
}

function sectionPasuramCountSafe(pre, sectionId) {
    if (typeof Navigation !== 'undefined' && typeof Navigation.sectionPasuramCount === 'function') {
        return Navigation.sectionPasuramCount(pre, sectionId);
    }
    const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
    if (!c) return 10;
    const ex = c.ex || {};
    const sid = String(sectionId);
    if (typeof ex[sid] !== 'undefined') return ex[sid];
    return c.defPas || 10;
}

function rebuildPasuramPickers(preferredValue) {
    const prefixEl = document.getElementById('prefix');
    const partEl = document.getElementById('pasPart');
    const subEl = document.getElementById('pasSub');
    const verseEl = document.getElementById('pasVerse');
    const numberEl = document.getElementById('number');
    if (!prefixEl || !partEl || !subEl || !verseEl || !numberEl) return;

    const pre = prefixEl.value;
    const c = (typeof CONFIG !== 'undefined') ? CONFIG[pre] : null;
    if (!c) {
        fillSelectOptions(partEl, [{ value: '0', label: 'Taniyans' }, { value: '1', label: 'Chapter 1' }]);
        setSubPickerVisible(false);
        verseEl.min = 1;
        verseEl.max = 10;
        verseEl.value = 1;
        numberEl.value = numberEl.value || '0.1';
        const hintEl = document.getElementById('pasuramHint');
        if (hintEl) hintEl.textContent = 'Select a prabandham';
        return;
    }

    const preferred = preferredValue != null ? String(preferredValue).trim() : (numberEl.value || '');
    const coords = (typeof Navigation !== 'undefined' && Navigation.parseCoords)
        ? Navigation.parseCoords(preferred || '1.1', c.hasSub)
        : { ch: 0, sub: 1, pas: 1 };

    if (bookUsesSubchapters(c)) {
        const maxCh = c.maxCh || 10;
        const parts = [];
        for (let ch = 0; ch <= maxCh; ch++) {
            parts.push({
                value: ch,
                label: ch === 0 ? 'Taniyan' : String(ch)
            });
        }
        fillSelectOptions(partEl, parts);
        partEl.value = String(Math.min(Math.max(coords.ch || 0, 0), maxCh));

        const maxSub = (typeof Navigation !== 'undefined' && Navigation.getSubLimit)
            ? (Navigation.getSubLimit(pre, parseInt(partEl.value, 10)) || c.maxSub || 10)
            : (c.maxSub || 10);
        const subs = [];
        for (let s = 1; s <= maxSub; s++) {
            subs.push({ value: s, label: String(s) });
        }
        fillSelectOptions(subEl, subs);
        setSubPickerVisible(true);
        const wantSub = coords.sub || 1;
        subEl.value = String(Math.min(Math.max(wantSub, 1), maxSub));

        const n = sectionPasuramCountSafe(pre, `${partEl.value}.${subEl.value}`);
        verseEl.min = 1;
        verseEl.max = Math.max(1, n);
        verseEl.value = Math.min(Math.max(coords.pas || 1, 1), n);
    } else if (c.structure === 'flat_pasuram') {
        fillSelectOptions(partEl, [{ value: '1', label: 'Pasurams' }]);
        partEl.value = '1';
        setSubPickerVisible(false);
        const n = c.maxPas || c.defPas || 10;
        verseEl.min = 1;
        verseEl.max = n;
        verseEl.value = Math.min(Math.max(coords.pas || 1, 1), n);
    } else {
        // chapter_pasuram (incl. taniyans as chapter 0)
        const minCh = typeof c.minCh !== 'undefined' ? c.minCh : 0;
        const maxCh = typeof c.maxCh !== 'undefined' ? c.maxCh : 1;
        const parts = [];
        for (let ch = minCh; ch <= maxCh; ch++) {
            parts.push({
                value: ch,
                label: ch === 0 ? 'Taniyan' : String(ch)
            });
        }
        fillSelectOptions(partEl, parts);
        const wantCh = typeof coords.ch === 'number' ? coords.ch : minCh;
        partEl.value = String(Math.min(Math.max(wantCh, minCh), maxCh));
        setSubPickerVisible(false);

        const n = sectionPasuramCountSafe(pre, partEl.value);
        verseEl.min = 1;
        verseEl.max = Math.max(1, n);
        const wantPas = coords.pas || 1;
        verseEl.value = Math.min(Math.max(wantPas, 1), n);
    }

    syncNumberFromPickers();
}

function syncNumberFromPickers() {
    const prefixEl = document.getElementById('prefix');
    const partEl = document.getElementById('pasPart');
    const subEl = document.getElementById('pasSub');
    const verseEl = document.getElementById('pasVerse');
    const numberEl = document.getElementById('number');
    const hintEl = document.getElementById('pasuramHint');
    if (!prefixEl || !partEl || !verseEl || !numberEl) return;

    const c = CONFIG[prefixEl.value];
    if (!c) return;

    let pas = parseInt(verseEl.value, 10);
    if (isNaN(pas) || pas < 1) pas = 1;

    let value;
    let hint;

    if (bookUsesSubchapters(c)) {
        const ch = parseInt(partEl.value, 10) || 0;
        const sub = parseInt(subEl.value, 10) || 1;
        const n = sectionPasuramCountSafe(prefixEl.value, `${ch}.${sub}`);
        if (pas > n) pas = n;
        verseEl.max = n;
        verseEl.value = pas;
        value = `${ch}.${sub}.${pas}`;
        hint = `Chapter ${ch} · Decad ${sub} · Pasuram ${pas}`;
    } else if (c.structure === 'flat_pasuram') {
        const n = c.maxPas || c.defPas || 10;
        if (pas > n) pas = n;
        verseEl.max = n;
        verseEl.value = pas;
        value = `${pas}`;
        hint = `Pasuram ${pas}`;
    } else {
        const ch = parseInt(partEl.value, 10);
        const n = sectionPasuramCountSafe(prefixEl.value, String(ch));
        if (pas > n) pas = n;
        verseEl.max = n;
        verseEl.value = pas;
        value = `${ch}.${pas}`;
        hint = ch === 0 ? `Taniyan ${pas}` : `Chapter ${ch} · Pasuram ${pas}`;
    }

    numberEl.value = value;
    if (hintEl) hintEl.textContent = hint;
}

function syncPickersFromNumber() {
    const numberEl = document.getElementById('number');
    if (!numberEl) return;
    rebuildPasuramPickers(numberEl.value);
}

function setPasuramValue(preferredValue) {
    const numberEl = document.getElementById('number');
    if (!numberEl) return;
    if (preferredValue != null && String(preferredValue).trim() !== '') {
        numberEl.value = String(preferredValue).trim();
    }
    rebuildPasuramPickers(numberEl.value);
}

function onPasuramPickerChange() {
    const prefixEl = document.getElementById('prefix');
    const partEl = document.getElementById('pasPart');
    const subEl = document.getElementById('pasSub');
    const verseEl = document.getElementById('pasVerse');
    if (!prefixEl || !partEl || !verseEl) return;

    const c = CONFIG[prefixEl.value];
    // When part/sub changes, clamp verse to the new section's length
    if (bookUsesSubchapters(c)) {
        const n = sectionPasuramCountSafe(prefixEl.value, `${partEl.value}.${subEl.value}`);
        // Rebuild sub list if chapter changed (sub count can vary)
        const maxSub = (typeof Navigation !== 'undefined' && Navigation.getSubLimit)
            ? (Navigation.getSubLimit(prefixEl.value, parseInt(partEl.value, 10)) || c.maxSub || 10)
            : (c.maxSub || 10);
        const subs = [];
        for (let s = 1; s <= maxSub; s++) {
            subs.push({ value: s, label: String(s) });
        }
        const keepSub = subEl.value;
        fillSelectOptions(subEl, subs);
        if ([...subEl.options].some((o) => o.value === keepSub)) subEl.value = keepSub;
        verseEl.max = Math.max(1, n);
        if (parseInt(verseEl.value, 10) > n) verseEl.value = n;
    } else if (c && c.structure !== 'flat_pasuram') {
        const n = sectionPasuramCountSafe(prefixEl.value, partEl.value);
        verseEl.max = Math.max(1, n);
        if (parseInt(verseEl.value, 10) > n) verseEl.value = n;
    }

    syncNumberFromPickers();
    resetLineTracking();
    syncUrlToPrefs();
    ensureMarkersForCurrentSelection(() => {
        if (!(window.LearningEngine && LearningEngine.state && LearningEngine.state.isPlaying)) {
            syncTextToAudioTimeline();
        }
    });
}

/**
 * Apply shareable URL params:
 *   ?book=PMT&pas=1.1&step=step1&lang=ta&speed=1.0&repeat=3&autoNext=true&play=1
 * `prefix` is accepted as an alias for `book`.
 */
function applyDeepLinkFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const book = params.get('book') || params.get('prefix');

    if (book && CONFIG[book]) {
        const prefixEl = document.getElementById('prefix');
        if (prefixEl && [...prefixEl.options].some((opt) => opt.value === book)) {
            prefixEl.value = book;
        }
    }

    const pas = params.get('pas');
    setPasuramValue(pas || undefined);

    const step = params.get('step');
    if (step && VALID_STEPS.has(step)) {
        const stepEl = document.getElementById('learningStep');
        if (stepEl) stepEl.value = step;
    }

    const lang = params.get('lang');
    if (lang && VALID_LANGS.has(lang)) {
        const langEl = document.getElementById('textLanguage');
        if (langEl) langEl.value = lang;
    }

    const speed = params.get('speed');
    if (speed && document.querySelector(`#playbackSpeed option[value="${speed}"]`)) {
        document.getElementById('playbackSpeed').value = speed;
    }

    const repeat = params.get('repeat');
    if (repeat && !isNaN(parseInt(repeat, 10))) {
        document.getElementById('repeatLimit').value = parseInt(repeat, 10);
        syncRepeatDisplay();
    }

    const autoNext = params.get('autoNext');
    if (autoNext === 'true' || autoNext === 'false') {
        document.getElementById('autoNext').value = autoNext;
    }

    syncPracticeControlUI();
}

function syncUrlToPrefs() {
    if (!window.history || !window.history.replaceState) return;

    const params = new URLSearchParams();
    params.set('book', document.getElementById('prefix')?.value || '');
    params.set('pas', document.getElementById('number')?.value || '');
    params.set('step', document.getElementById('learningStep')?.value || DEFAULT_STEP);
    params.set('lang', document.getElementById('textLanguage')?.value || 'ta');

    const speed = document.getElementById('playbackSpeed')?.value;
    if (speed && speed !== '1.0') params.set('speed', speed);

    const repeat = document.getElementById('repeatLimit')?.value;
    if (repeat && repeat !== '3') params.set('repeat', repeat);

    const autoNext = document.getElementById('autoNext')?.value;
    if (autoNext === 'false') params.set('autoNext', autoNext);

    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', nextUrl);
}

function getShareUrl() {
    syncUrlToPrefs();
    return window.location.href;
}

async function copyShareLink() {
    const url = getShareUrl();
    const btn = document.getElementById('copyLinkBtn');
    const setCopiedFeedback = (ok) => {
        if (!btn) return;
        const previous = btn.dataset.label || btn.textContent || '🔗';
        btn.dataset.label = previous;
        btn.textContent = ok ? '✓' : '!';
        setTimeout(() => {
            btn.textContent = btn.dataset.label || '🔗';
        }, 2000);
    };

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(url);
        } else {
            throw new Error('Clipboard API unavailable');
        }
        setCopiedFeedback(true);
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            setCopiedFeedback(true);
        } catch (copyErr) {
            setCopiedFeedback(false);
            window.prompt('Copy this link:', url);
        }
        document.body.removeChild(textarea);
    }
}

function updateEngineSpeed() {
    const speedSelect = document.getElementById('playbackSpeed');
    if (speedSelect && window.LearningEngine) {
        window.LearningEngine.setPlaybackRate(speedSelect.value);
    }
    syncUrlToPrefs();
}

function startLearningAndFocus() {
    if (window.LearningEngine && typeof window.LearningEngine.unlockAudio === 'function') {
        window.LearningEngine.unlockAudio();
    }
    updateEngineSpeed();
    startLearning();
}

function renderCurrentPasuramText() {
    syncUrlToPrefs();
    syncTextToAudioTimeline();
}

function onPasuramNumberChange() {
    resetLineTracking();
    syncUrlToPrefs();
}

function onLearningStepChange() {
    resetLineTracking();
    syncUrlToPrefs();
    ensureMarkersForCurrentSelection(() => {
        if (!(window.LearningEngine && LearningEngine.state && LearningEngine.state.isPlaying)) {
            syncTextToAudioTimeline();
        }
    });
}

function onSessionPrefChange() {
    syncUrlToPrefs();
}

function onTextLanguageChange() {
    renderCurrentPasuramText();
}

function setTextLanguage(lang) {
    if (!VALID_LANGS.has(lang)) return;
    const langEl = document.getElementById('textLanguage');
    if (langEl) langEl.value = lang;
    renderCurrentPasuramText();
}

function syncAutoToggleUI() {
    const hidden = document.getElementById('autoNext');
    const toggle = document.getElementById('autoNextToggle');
    if (!hidden || !toggle) return;
    toggle.checked = hidden.value !== 'false';
}

function onAutoToggleChange() {
    const hidden = document.getElementById('autoNext');
    const toggle = document.getElementById('autoNextToggle');
    if (!hidden || !toggle) return;
    hidden.value = toggle.checked ? 'true' : 'false';
    onSessionPrefChange();
}

function syncPracticeControlUI() {
    syncAutoToggleUI();
    syncRepeatDisplay();
}

function syncRepeatDisplay() {
    const input = document.getElementById('repeatLimit');
    if (!input) return;
    let n = parseInt(input.value, 10);
    if (!Number.isFinite(n) || n < 1) n = 1;
    if (n > 99) n = 99;
    input.value = String(n);
}

function bindChromeControls() {
    syncPracticeControlUI();
}

function initPasuramPickers() {
    try {
        if (hasDeepLinkParams()) {
            applyDeepLinkFromUrl();
        } else {
            setPasuramValue(document.getElementById('number')?.value);
        }
        syncUrlToPrefs();
        ensureMarkersForCurrentSelection(() => {
            if (!(window.LearningEngine && LearningEngine.state && LearningEngine.state.isPlaying)) {
                syncTextToAudioTimeline();
            }
        });
    } catch (err) {
        console.error('Pasuram picker init failed:', err);
    }
}

let lyricsFitResizeTimer = null;

function scheduleLyricsFit() {
    if (lyricsFitResizeTimer) clearTimeout(lyricsFitResizeTimer);
    lyricsFitResizeTimer = setTimeout(() => {
        requestAnimationFrame(() => fitLyricsToPanel());
    }, 80);
}

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        LearningEngine.init(audioPlayer);
    }

    initPasuramPickers();
    updateToggleButtonUI(false);
    updatePhraseNavButtons();
    bindChromeControls();
    requestAnimationFrame(() => fitLyricsToPanel());

    window.addEventListener('resize', scheduleLyricsFit);
    window.addEventListener('orientationchange', scheduleLyricsFit);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', scheduleLyricsFit);
    }

    if (shouldAutoPlayFromUrl()) {
        setTimeout(() => startLearningAndFocus(), 600);
    }

    ['repeatLimit', 'autoNext', 'number'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', onSessionPrefChange);
    });

    window.addEventListener('learning-track-ended', () => {
        const limit = parseInt(document.getElementById('repeatLimit').value, 10);
        const chosenStep = document.getElementById('learningStep').value;

        // Increment repeat count safely
        LearningEngine.state.currentRepeatCount = (LearningEngine.state.currentRepeatCount || 0) + 1;

        // CASE A: We are still repeating the exact same segment phrase slice
        if (LearningEngine.state.currentRepeatCount < limit) {
            // console.log(`Repeat loop active: ${LearningEngine.state.currentRepeatCount} of ${limit}`);
            startLearning();
        }
        // CASE B: Repeat limit reached! Shift to next line phrase or move to the next verse
        else {
            // console.log("Repeat limit reached. Calculating step alignment transitions...");

            const pre = document.getElementById('prefix').value;
            const numInput = document.getElementById('number').value;
            const c = CONFIG[pre];

            // Resolve coordinates and array bounds synchronously BEFORE triggering execution
            const coords = Navigation.parseCoords(numInput, c.hasSub);
            const stepsKey = `${pre}.${coords.ch}.steps`;
            const alternativeKey = `${pre}.steps`;
            const lookupKey = `${pre}.${coords.ch}.${coords.sub}.steps`;
            const stepsDatabaseBlock = window.MARKER_DATABASE[stepsKey] ||
                window.MARKER_DATABASE[stepsKey.toLowerCase()] ||
                window.MARKER_DATABASE[alternativeKey] ||
                window.MARKER_DATABASE[alternativeKey.toLowerCase()] ||
                window.MARKER_DATABASE[lookupKey] ||
                window.MARKER_DATABASE[lookupKey.toLowerCase()] ||
                window.MARKER_DATABASE['PTM_2_DATA'];

            if (stepsDatabaseBlock && stepsDatabaseBlock[coords.pas - 1]) {
                const targetPasuram = stepsDatabaseBlock[coords.pas - 1];
                const activeSegments = targetPasuram[chosenStep] || targetPasuram["step2"];

                // If there are more phrases inside this specific verse, step to the next index smoothly
                if (chosenStep !== "step4" && activeLineIndex < activeSegments.length - 1) {
                    activeLineIndex++;
                    LearningEngine.state.currentRepeatCount = 0; // Reset repeat counter for new phrase
                    startLearning();
                    return;
                }
            }

            // End of verse unit reached. Clear phase indexes and handle text navigation blocks
            activeLineIndex = 0;
            LearningEngine.state.currentRepeatCount = 0;

            if (document.getElementById('autoNext').value === "true") {
                // console.log("Advancing to next verse context layout.");
                navigate(1);
            } else {
                safeStopAudio();
            }
        }
    });
});

function syncTextToAudioTimeline() {
    const playerEl = document.getElementById('audioPlayer');
    const displayPanel = document.getElementById('pasuramDisplay');

    if (!playerEl || !displayPanel || !window.MARKER_DATABASE) return;

    const pre = document.getElementById('prefix').value;
    const numInput = document.getElementById('number').value;
    if (!CONFIG[pre]) return;

    const coords = Navigation.parseCoords(numInput, CONFIG[pre].hasSub);

    const stepsKey = `${pre}.${coords.ch}.steps`;
    const lookupKey = `${pre}.${coords.ch}.${coords.sub}.steps`;
    const alternativeKey = `${pre}.steps`;
    const stepsDatabaseBlock = window.MARKER_DATABASE[stepsKey] ||
        window.MARKER_DATABASE[lookupKey] ||
        window.MARKER_DATABASE[lookupKey.toLowerCase()] ||
        window.MARKER_DATABASE[alternativeKey] ||
        window.MARKER_DATABASE['PTM_2_DATA'];

    if (!stepsDatabaseBlock || !stepsDatabaseBlock[coords.pas - 1]) {
        displayPanel.innerHTML = `<div style="color:#65676b; font-size:1.1rem; font-style:italic;">Pasuram ${numInput} (Audio-Only Mode)</div>`;
        displayPanel.dataset.lastSignature = '';
        updatePhraseNavButtons();
        fitLyricsToPanel();
        return;
    }

    const targetPasuram = stepsDatabaseBlock[coords.pas - 1];
    let rawTextString = "";
    if (targetPasuram.text) {
        if (typeof targetPasuram.text === 'string') {
            rawTextString = targetPasuram.text;
        } else {
            const selectedLang = document.getElementById('textLanguage')?.value || 'ta';
            rawTextString = targetPasuram.text[selectedLang] || targetPasuram.text['ta'] || targetPasuram.text['en'] || "";
        }
    }
    if (!rawTextString) {
        updatePhraseNavButtons();
        fitLyricsToPanel();
        return;
    }

    const step1Timeline = targetPasuram["step1"] || [];

    // Smooth Normalization: Round playhead down to 1 decimal point to avoid floating-point race flickers
    //  const currentTime = Math.round((playerEl.currentTime || 0) * 10) / 10;
    // Use overrideTime if specified (e.g. during manual/auto transitions) to bypass playhead latency
    let currentTime;
    if (typeof overrideTime === 'number') {
        currentTime = Math.round(overrideTime * 10) / 10;
    } else {
        currentTime = Math.round((playerEl.currentTime || 0) * 10) / 10;
    }


    let matchIndex = -1;
    for (let i = 0; i < step1Timeline.length; i++) {
        const isLastSegment = (i === step1Timeline.length - 1);
        const segmentStart = Math.round(step1Timeline[i][0] * 10) / 10;
        const segmentEnd = Math.round(step1Timeline[i][1] * 10) / 10;

        if (isLastSegment) {
            if (currentTime >= segmentStart) {
                matchIndex = i;
                break;
            }
        } else {
            if (currentTime >= segmentStart && currentTime <= segmentEnd) {
                matchIndex = i;
                break;
            }
        }
    }

    const selectedLangToken = document.getElementById('textLanguage')?.value || 'ta';
    const currentSignature = `${pre}_${coords.ch}_${coords.pas}_${selectedLangToken}_${matchIndex}`;

    if (displayPanel.dataset.lastSignature === currentSignature) {
        return;
    }

    let textPhrases = rawTextString.split(' *');
    if (textPhrases[textPhrases.length - 1].trim() === "") textPhrases.pop();

    let innerHTMLString = [];
    for (let j = 0; j < textPhrases.length; j++) {
        const cleanPhrase = textPhrases[j].trim();
        if (j === matchIndex) {
            innerHTMLString.push(`<span class="active-segment">${cleanPhrase}</span>`);
        } else {
            innerHTMLString.push(`<span class="normal-segment">${cleanPhrase}</span>`);
        }
        if (j < textPhrases.length - 1) {
            innerHTMLString.push(` <span style="color:#000000;">*</span><br> `);
        }
    }

    displayPanel.innerHTML = innerHTMLString.join('');
    displayPanel.dataset.lastSignature = currentSignature;
    updatePhraseNavButtons();
    fitLyricsToPanel();
}

function fitLyricsToPanel() {
    const displayPanel = document.getElementById('pasuramDisplay');
    if (!displayPanel) return;
    if (displayPanel.clientHeight < 8 || displayPanel.clientWidth < 8) return;

    const maxPx = 26;
    const minPx = 11;
    let lo = minPx;
    let hi = maxPx;
    let best = minPx;

    displayPanel.style.fontSize = `${maxPx}px`;

    // Binary search the largest size that fits without scrolling.
    for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        displayPanel.style.fontSize = `${mid}px`;
        if (displayPanel.scrollHeight <= displayPanel.clientHeight + 1 &&
            displayPanel.scrollWidth <= displayPanel.clientWidth + 1) {
            best = mid;
            lo = mid;
        } else {
            hi = mid;
        }
    }

    displayPanel.style.fontSize = `${best}px`;
}

function getMarkerStepsBlock(pre, coords) {
    if (!window.MARKER_DATABASE || !pre || !coords) return null;
    const stepsKey = `${pre}.${coords.ch}.steps`;
    const alternativeKey = `${pre}.steps`;
    const lookupKey = `${pre}.${coords.ch}.${coords.sub}.steps`;
    return window.MARKER_DATABASE[stepsKey] ||
        window.MARKER_DATABASE[stepsKey.toLowerCase()] ||
        window.MARKER_DATABASE[lookupKey] ||
        window.MARKER_DATABASE[lookupKey.toLowerCase()] ||
        window.MARKER_DATABASE[alternativeKey] ||
        window.MARKER_DATABASE[alternativeKey.toLowerCase()] ||
        window.MARKER_DATABASE['PTM_2_DATA'] ||
        null;
}

function getActiveSegmentsForCurrentSelection() {
    const pre = document.getElementById('prefix')?.value;
    const numInput = document.getElementById('number')?.value;
    const chosenStep = document.getElementById('learningStep')?.value || 'step1';
    const c = CONFIG[pre];
    if (!c || !numInput) return { chosenStep, segments: null };

    const coords = Navigation.parseCoords(numInput, c.hasSub);
    const block = getMarkerStepsBlock(pre, coords);
    if (!block || !block[coords.pas - 1]) return { chosenStep, segments: null };

    const targetPasuram = block[coords.pas - 1];
    if (chosenStep === 'step4') return { chosenStep, segments: null };

    const segments = targetPasuram[chosenStep] || targetPasuram.step2 || null;
    if (!segments || !segments.length) return { chosenStep, segments: null };
    return { chosenStep, segments };
}

function updatePhraseNavButtons() {
    const { chosenStep, segments } = getActiveSegmentsForCurrentSelection();
    const enabled = chosenStep !== 'step4' && !!(segments && segments.length > 0);
    ['prevPhraseBtn', 'nextPhraseBtn'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = !enabled;
    });
}

/**
 * Preload timeline (+ language) for the current selection so phrase ◂ ▸ can
 * enable before the user presses Play (critical for on-demand books like NAT).
 */
function ensureMarkersForCurrentSelection(done) {
    const pre = document.getElementById('prefix')?.value;
    const numInput = document.getElementById('number')?.value;
    const selectedLang = document.getElementById('textLanguage')?.value || 'ta';
    const finish = () => {
        // Markers may lengthen the section vs CONFIG — refresh pickers so No. max
        // matches getLimit (same source) before phrase-nav / play.
        const keep = document.getElementById('number')?.value;
        if (typeof rebuildPasuramPickers === 'function') {
            rebuildPasuramPickers(keep);
        }
        updatePhraseNavButtons();
        if (typeof done === 'function') done();
    };
    if (!pre || !numInput || typeof CONFIG === 'undefined' || !CONFIG[pre]) {
        finish();
        return;
    }
    if (typeof loadMarkerOnDemand !== 'function') {
        finish();
        return;
    }
    loadMarkerOnDemand(pre, numInput, selectedLang, finish);
}

function navigatePhrase(dir) {
    const { segments } = getActiveSegmentsForCurrentSelection();
    if (!segments || !segments.length) return;

    const n = segments.length;
    activeLineIndex = ((activeLineIndex + dir) % n + n) % n;
    if (window.LearningEngine && LearningEngine.state) {
        LearningEngine.state.currentRepeatCount = 0;
    }
    safeStopAudio();
    startLearning();
}

function startLearning(onPlayCallback) {
    if (pauseTimeoutHandle) clearTimeout(pauseTimeoutHandle);

    const pre = document.getElementById('prefix').value;
    const numInput = document.getElementById('number').value;
    const chosenStep = document.getElementById('learningStep').value;
    const focusMode = document.getElementById('recitationFocus').value;
    const selectedLang = document.getElementById('textLanguage')?.value || 'ta';

    const c = CONFIG[pre];
    if (!c) return;

    loadMarkerOnDemand(pre, numInput, selectedLang, () => {
        const coords = Navigation.parseCoords(numInput, c.hasSub);

        let bounds = null;
        let lineWindows = null;
        let markersFound = false;

        const stepsKey = `${pre}.${coords.ch}.steps`;
        const alternativeKey = `${pre}.steps`;
        const lookupKey = `${pre}.${coords.ch}.${coords.sub}.steps`;

        const stepsDatabaseBlock = window.MARKER_DATABASE[stepsKey] ||
            window.MARKER_DATABASE[stepsKey.toLowerCase()] ||
            window.MARKER_DATABASE[lookupKey] ||
            window.MARKER_DATABASE[lookupKey.toLowerCase()] ||
            window.MARKER_DATABASE[alternativeKey] ||
            window.MARKER_DATABASE[alternativeKey.toLowerCase()] ||
            window.MARKER_DATABASE['PTM_2_DATA'];

        if (stepsDatabaseBlock && stepsDatabaseBlock[coords.pas - 1]) {
            markersFound = true;
            const targetPasuram = stepsDatabaseBlock[coords.pas - 1];
            lineWindows = targetPasuram["step2"] || null;

            if (chosenStep === "step4") {
                const fullBounds = targetPasuram["step4"] ? targetPasuram["step4"] : null;
                if (fullBounds) {
                    bounds = { start: fullBounds[0], end: fullBounds[1] };
                } else if (lineWindows && lineWindows.length > 0) {
                    bounds = { start: lineWindows[0][0], end: lineWindows[lineWindows.length - 1][1] };
                }
                // document.getElementById('status').innerText = `Full Pasuram Recitation`;
            } else {
                const activeSegments = targetPasuram[chosenStep] || targetPasuram["step2"];
                if (activeSegments && activeSegments.length > 0) {
                    if (activeLineIndex >= activeSegments.length) activeLineIndex = 0;
                    const targetPair = activeSegments[activeLineIndex];
                    bounds = { start: targetPair[0], end: targetPair[1] };
                    // document.getElementById('status').innerText = `Playing Phrase ${activeLineIndex + 1} of ${activeSegments.length}`;
                }
            }
        }

        if (!markersFound) {
            bounds = { start: 0, end: 9999 };
            // document.getElementById('status').innerText = `Playing Full Pasuram...`;
        }

        let audioSrc = "";
        try {
            audioSrc = c.getAudioSrc(numInput);
        } catch (err) {
            console.error("Audio source path mapping error:", err);
            // document.getElementById('status').innerText = "Audio track path missing";
            return;
        }

        syncTextToAudioTimeline();
        updateToggleButtonUI(true);
        updatePhraseNavButtons();

        LearningEngine.playSegment(audioSrc, bounds, () => {
            window.dispatchEvent(new CustomEvent('learning-track-ended'));
        }, lineWindows, chosenStep, focusMode);

        if (typeof onPlayCallback === 'function') {
            onPlayCallback();
        }
    });
}

function safeStopAudio() {
    if (pauseTimeoutHandle) clearTimeout(pauseTimeoutHandle);
    if (window.LearningEngine) {
        LearningEngine.stopMonitor();
    }
    // document.getElementById('status').innerText = "Ready";
    updateToggleButtonUI(false);
}

function handlePlaybackToggle() {
    const isPlaying = window.LearningEngine && window.LearningEngine.state && window.LearningEngine.state.isPlaying;
    if (isPlaying) {
        safeStopAudio();
    } else {
        startLearningAndFocus();
    }
}

function updateToggleButtonUI(isPlaying) {
    const toggleBtn = document.getElementById('toggleBtn');
    if (!toggleBtn) return;

    if (isPlaying) {
        toggleBtn.textContent = '■';
        toggleBtn.classList.add('is-playing');
        toggleBtn.title = 'Stop recitation';
        toggleBtn.setAttribute('aria-label', 'Stop recitation');
    } else {
        toggleBtn.textContent = '▶';
        toggleBtn.classList.remove('is-playing');
        toggleBtn.title = 'Start recitation';
        toggleBtn.setAttribute('aria-label', 'Start recitation');
    }
}

function navigate(dir) {
    safeStopAudio();
    resetLineTracking();

    const input = document.getElementById('number');
    const pre = document.getElementById('prefix').value;
    const c = CONFIG[pre];

    let coords = Navigation.parseCoords(input.value, c.hasSub);
    coords.pas += dir;

    const minChapterIndex = (typeof c.minCh !== 'undefined') ? c.minCh : 1;
    switch (c.structure) {
        case 'flat_pasuram':
            if (coords.pas > c.maxPas) coords.pas = 1;
            else if (coords.pas < 1) coords.pas = c.maxPas;
            input.value = `${coords.pas}`;
            break;

        case 'chapter_pasuram':
            let chLimit = Navigation.getLimit(pre, coords.ch, 0);
            if (coords.pas > chLimit) {
                coords.ch = (coords.ch >= c.maxCh) ? minChapterIndex : coords.ch + 1;
                coords.pas = 1;
            } else if (coords.pas < 1) {
                coords.ch = (coords.ch <= minChapterIndex) ? c.maxCh : coords.ch - 1;
                coords.pas = Navigation.getLimit(pre, coords.ch, 0);
            }
            input.value = `${coords.ch}.${coords.pas}`;
            break;

        case 'chapter_sub_pasuram':
            // 1. Get the current active pasuram limit for the specific subchapter
            let subPasuramLimit = Navigation.getLimit(pre, coords.ch, coords.sub);

            if (coords.pas > subPasuramLimit) {
                coords.pas = 1;
                coords.sub++;

                // FIX: Get the dynamic subchapter limit for this specific chapter instead of static c.maxSub
                let activeSubLimit = Navigation.getSubLimit(pre, coords.ch);
                if (coords.sub > activeSubLimit) {
                    coords.sub = 1;
                    coords.ch = (coords.ch >= c.maxCh) ? minChapterIndex : coords.ch + 1;
                }
            } else if (coords.pas < 1) {
                coords.sub--;
                if (coords.sub < 1) {
                    // Navigate to the previous chapter
                    coords.ch = (coords.ch <= 1) ? c.maxCh : coords.ch - 1;

                    // FIX: Set the subchapter index to the previous chapter's dynamic maximum
                    coords.sub = Navigation.getSubLimit(pre, coords.ch);
                }
                coords.pas = Navigation.getLimit(pre, coords.ch, coords.sub);
            }
            input.value = `${coords.ch}.${coords.sub}.${coords.pas}`;
            break;
    }
    syncPickersFromNumber();
    syncUrlToPrefs();
    startLearning();
}

function resetLineTracking() {
    activeLineIndex = 0;
    if (window.LearningEngine && LearningEngine.state) { LearningEngine.state.currentRepeatCount = 0; }
}

function resetToStart() {
    safeStopAudio();
    resetLineTracking();
    const pre = document.getElementById('prefix').value;
    const c = CONFIG[pre];

    let initialValue = "1.1";

    if (c) {
        const startingChapter = (typeof c.minCh !== 'undefined') ? c.minCh : 1;

        switch (c.structure) {
            case 'flat_pasuram':
                initialValue = "1";
                break;

            case 'chapter_pasuram':
                initialValue = `${startingChapter}.1`;
                break;

            case 'chapter_sub_pasuram':
                initialValue = `${startingChapter}.1.1`;
                break;

            default:
                initialValue = c.hasSub ? "0.1.1" : "1.1";
                break;
        }
    }

    setPasuramValue(initialValue);

    const displayPanel = document.getElementById('pasuramDisplay');
    if (displayPanel) {
        displayPanel.dataset.lastSignature = "";
        displayPanel.innerHTML = "<em>Select a file or press start to view pasuram lines...</em>";
        displayPanel.style.fontSize = '';
    }
    syncUrlToPrefs();
    ensureMarkersForCurrentSelection(() => {
        if (!(window.LearningEngine && LearningEngine.state && LearningEngine.state.isPlaying)) {
            syncTextToAudioTimeline();
        }
        fitLyricsToPanel();
    });
}

window.copyShareLink = copyShareLink;
window.getShareUrl = getShareUrl;
window.applyDeepLinkFromUrl = applyDeepLinkFromUrl;
window.syncUrlToPrefs = syncUrlToPrefs;
window.setPasuramValue = setPasuramValue;
window.onPasuramPickerChange = onPasuramPickerChange;
window.syncPickersFromNumber = syncPickersFromNumber;
window.initPasuramPickers = initPasuramPickers;
window.renderCurrentPasuramText = renderCurrentPasuramText;
window.onLearningStepChange = onLearningStepChange;
window.onPasuramNumberChange = onPasuramNumberChange;
window.onSessionPrefChange = onSessionPrefChange;
window.onTextLanguageChange = onTextLanguageChange;
window.setTextLanguage = setTextLanguage;
window.onAutoToggleChange = onAutoToggleChange;
window.syncPracticeControlUI = syncPracticeControlUI;
window.syncRepeatDisplay = syncRepeatDisplay;
window.navigatePhrase = navigatePhrase;
window.ensureMarkersForCurrentSelection = ensureMarkersForCurrentSelection;
window.navigate = navigate;
window.handlePlaybackToggle = handlePlaybackToggle;
window.fitLyricsToPanel = fitLyricsToPanel;
window.resetToStart = resetToStart;
window.updateEngineSpeed = updateEngineSpeed;
window.startLearningAndFocus = startLearningAndFocus;
window.bindChromeControls = bindChromeControls;

// Fill pickers even if this script was hot-swapped after DOMContentLoaded (sync_engine).
if (document.readyState !== 'loading') {
    initPasuramPickers();
    bindChromeControls();
}