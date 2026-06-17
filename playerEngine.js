// added dynamic language loaded
let activeLineIndex = 0;
let pauseTimeoutHandle = null;

function updateEngineSpeed() {
    const speedSelect = document.getElementById('playbackSpeed');
    if (speedSelect && window.LearningEngine) {
        window.LearningEngine.setPlaybackRate(speedSelect.value);
    }
}

function startLearningAndFocus() {
    if (window.LearningEngine && typeof window.LearningEngine.unlockAudio === 'function') {
        window.LearningEngine.unlockAudio();
    }
    updateEngineSpeed();
    startLearning();
}

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        LearningEngine.init(audioPlayer);
    }

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
    if (!rawTextString) return;

    const step1Timeline = targetPasuram["step1"] || [];

    // Smooth Normalization: Round playhead down to 1 decimal point to avoid floating-point race flickers
    const currentTime = Math.round((playerEl.currentTime || 0) * 10) / 10;

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
                document.getElementById('status').innerText = `Full Pasuram Recitation`;
            } else {
                const activeSegments = targetPasuram[chosenStep] || targetPasuram["step2"];
                if (activeSegments && activeSegments.length > 0) {
                    if (activeLineIndex >= activeSegments.length) activeLineIndex = 0;
                    const targetPair = activeSegments[activeLineIndex];
                    bounds = { start: targetPair[0], end: targetPair[1] };
                    document.getElementById('status').innerText = `Playing Phrase ${activeLineIndex + 1} of ${activeSegments.length}`;
                }
            }
        }

        if (!markersFound) {
            bounds = { start: 0, end: 9999 };
            document.getElementById('status').innerText = `Playing Full Pasuram...`;
        }

        let audioSrc = "";
        try {
            audioSrc = c.getAudioSrc(numInput);
        } catch (err) {
            console.error("Audio source path mapping error:", err);
            document.getElementById('status').innerText = "Audio track path missing";
            return;
        }

        syncTextToAudioTimeline();
        updateToggleButtonUI(true);

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
    document.getElementById('status').innerText = "Ready";
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
        toggleBtn.innerText = "STOP RECITATION";
        toggleBtn.style.backgroundColor = "#d93838";
    } else {
        toggleBtn.innerText = "START RECITATION";
        toggleBtn.style.backgroundColor = "#0070ba";
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
                coords.ch = (coords.ch <= 1) ? c.maxCh : coords.ch - 1;
                coords.pas = Navigation.getLimit(pre, coords.ch, 0);
            }
            input.value = `${coords.ch}.${coords.pas}`;
            break;

        case 'chapter_sub_pasuram':
            let subLimit = Navigation.getLimit(pre, coords.ch, coords.sub);
            if (coords.pas > subLimit) {
                coords.pas = 1;
                coords.sub++;
                if (coords.sub > c.maxSub) {
                    coords.sub = 1;
                    coords.ch = (coords.ch >= c.maxCh) ? minChapterIndex : coords.ch + 1;
                }
            } else if (coords.pas < 1) {
                coords.sub--;
                if (coords.sub < 1) {
                    coords.ch = (coords.ch <= 1) ? c.maxCh : coords.ch - 1;
                    coords.sub = c.maxSub;
                }
                coords.pas = Navigation.getLimit(pre, coords.ch, coords.sub);
            }
            input.value = `${coords.ch}.${coords.sub}.${coords.pas}`;
            break;
    }
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
                initialValue = c.hasSub ? "1.1.1" : "1.1";
                break;
        }
    }

    document.getElementById('number').value = initialValue;

    const displayPanel = document.getElementById('pasuramDisplay');
    if (displayPanel) {
        displayPanel.dataset.lastSignature = "";
        displayPanel.innerHTML = "<em>Select a file or press start to view pasuram lines...</em>";
    }
}