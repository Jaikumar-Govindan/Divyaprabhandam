//added dynamic language loaded
let activeLineIndex = 0;
let pauseTimeoutHandle = null;

function updateEngineSpeed() {
    const speedSelect = document.getElementById('playbackSpeed');
    if (speedSelect && window.LearningEngine) {
        window.LearningEngine.setPlaybackRate(speedSelect.value);
    }
}

function startLearningAndFocus() {
    console.log("line 173");
    if (window.LearningEngine && typeof window.LearningEngine.unlockAudio === 'function') {
        window.LearningEngine.unlockAudio();
    }
    updateEngineSpeed();
    startLearning();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("line 182");
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        LearningEngine.init(audioPlayer);
    }
    console.log("line 187");

    window.addEventListener('learning-track-ended', () => {
        const limit = parseInt(document.getElementById('repeatLimit').value, 10);
        const chosenStep = document.getElementById('learningStep').value;

        // Increment repeat count safely
        LearningEngine.state.currentRepeatCount = (LearningEngine.state.currentRepeatCount || 0) + 1;

        // CASE A: We are still repeating the exact same segment phrase slice
        if (LearningEngine.state.currentRepeatCount < limit) {
            console.log(`Repeat loop active: ${LearningEngine.state.currentRepeatCount} of ${limit}`);
            startLearning(); // Simple replay execution
        }
        // CASE B: Repeat limit reached! Shift to next line phrase or move to the next verse
        else {
            console.log("Repeat limit reached. Calculating step alignment transitions...");

            const pre = document.getElementById('prefix').value;
            const numInput = document.getElementById('number').value;
            const selectedLang = document.getElementById('textLanguage')?.value || 'ta';
            const c = CONFIG[pre];

            // Wrap inside startLearning execution callback to guarantee file parsing synchronization
            startLearning(() => {
                const coords = Navigation.parseCoords(numInput, c.hasSub);

                const stepsKey = `${pre}.${coords.ch}.steps`;
                const alternativeKey = `${pre}.steps`;

                const stepsDatabaseBlock = window.MARKER_DATABASE[stepsKey] ||
                    window.MARKER_DATABASE[stepsKey.toLowerCase()] ||
                    window.MARKER_DATABASE[alternativeKey] ||
                    window.MARKER_DATABASE[alternativeKey.toLowerCase()] ||
                    window.MARKER_DATABASE['PTM_2_DATA'];

                if (stepsDatabaseBlock && stepsDatabaseBlock[coords.pas - 1]) {
                    const targetPasuram = stepsDatabaseBlock[coords.pas - 1];
                    const activeSegments = targetPasuram[chosenStep] || targetPasuram["step2"];

                    // If there are more phrases inside this specific verse, step to the next index
                    if (chosenStep !== "step4" && activeLineIndex < activeSegments.length - 1) {
                        activeLineIndex++;
                        LearningEngine.state.currentRepeatCount = 0; // Reset repeat counter for new phrase
                        startLearning();
                        return;
                    }
                }

                // End of verse reached. Clear phase indexes and handle text navigation blocks
                activeLineIndex = 0;
                LearningEngine.state.currentRepeatCount = 0;

                if (document.getElementById('autoNext').value === "true") {
                    console.log("Advancing to next verse context layout.");
                    navigate(1);
                } else {
                    safeStopAudio();
                }
            });
        }
    });
});

function syncTextToAudioTimeline() {
    const playerEl = document.getElementById('audioPlayer');
    const displayPanel = document.getElementById('pasuramDisplay');

    if (!playerEl || !displayPanel || !window.MARKER_DATABASE) return;

    const pre = document.getElementById('prefix').value;
    const numInput = document.getElementById('number').value;
    //console.log(pre);
    if (!CONFIG[pre]) return;

    const coords = Navigation.parseCoords(numInput, CONFIG[pre].hasSub);

    const stepsKey = `${pre}.${coords.ch}.steps`;
    const alternativeKey = `${pre}.steps`;
    const stepsDatabaseBlock = window.MARKER_DATABASE[stepsKey] ||
        window.MARKER_DATABASE[alternativeKey] ||
        window.MARKER_DATABASE['PTM_2_DATA'];

    if (!stepsDatabaseBlock || !stepsDatabaseBlock[coords.pas - 1]) {
        displayPanel.innerHTML = `<div style="color:#65676b; font-size:1.1rem; font-style:italic;">Pasuram ${numInput} (Audio-Only Mode)</div>`;
        return;
    }

    const targetPasuram = stepsDatabaseBlock[coords.pas - 1];
    // --- LANGUAGE RESOLUTION ADDITION ---
    let rawTextString = "";
    if (targetPasuram.text) {
        if (typeof targetPasuram.text === 'string') {
            rawTextString = targetPasuram.text; // Backwards compatible with legacy files
        } else {
            // Read from the newly added language dropdown element
            const selectedLang = document.getElementById('textLanguage')?.value || 'ta';
            rawTextString = targetPasuram.text[selectedLang] || targetPasuram.text['ta'] || targetPasuram.text['en'] || "";
        }
    }
    // rawTextString = targetPasuram.text || "";
    if (!rawTextString) return;

    const step1Timeline = targetPasuram["step1"] || [];
    //console.log(step1Timeline);
    const currentTime = playerEl.currentTime || 0;

    let matchIndex = -1;
    for (let i = 0; i < step1Timeline.length; i++) {
        if (currentTime >= step1Timeline[i][0] && currentTime <= step1Timeline[i][1]) {
            matchIndex = i;
            break;
        }
    }

    const currentSignature = `${matchIndex}_${coords.pas}_${pre}`;
    if (displayPanel.dataset.lastSignature !== currentSignature) {
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
                //innerHTMLString.push(` <span style="color:#ccbf99;">*</span> `);
                innerHTMLString.push(` <span style="color:#000000;">*</span><br> `);

            }
        }
        displayPanel.innerHTML = innerHTMLString.join('');
        displayPanel.dataset.lastSignature = currentSignature;
    }
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

        const stepsDatabaseBlock = window.MARKER_DATABASE[stepsKey] ||
            window.MARKER_DATABASE[stepsKey.toLowerCase()] ||
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

        // Execute the playback sequence
        LearningEngine.playSegment(audioSrc, bounds, () => {
            window.dispatchEvent(new CustomEvent('learning-track-ended'));
        }, lineWindows, chosenStep, focusMode);

        // CRITICAL FIX: If a callback sequence was requested by the loop tracker, fire it now
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
}

function navigate(dir) {
    safeStopAudio();
    resetLineTracking();

    const input = document.getElementById('number');
    const pre = document.getElementById('prefix').value;
    const c = CONFIG[pre];


    let coords = Navigation.parseCoords(input.value, c.hasSub);

    coords.pas += dir;

    switch (c.structure) {
        case 'flat_pasuram': // Variant 1: RN
            if (coords.pas > c.maxPas) coords.pas = 1;
            else if (coords.pas < 1) coords.pas = c.maxPas;
            input.value = `${coords.pas}`;
            break;

        case 'chapter_pasuram': // Variant 2: PMT
            let chLimit = Navigation.getLimit(pre, coords.ch, 0);
            if (coords.pas > chLimit) {
                coords.ch = (coords.ch >= c.maxCh) ? 1 : coords.ch + 1;
                coords.pas = 1;
            } else if (coords.pas < 1) {
                coords.ch = (coords.ch <= 1) ? c.maxCh : coords.ch - 1;
                coords.pas = Navigation.getLimit(pre, coords.ch, 0);
            }
            input.value = `${coords.ch}.${coords.pas}`;
            break;

        case 'chapter_sub_pasuram': // Variant 3: TVM
            let subLimit = Navigation.getLimit(pre, coords.ch, coords.sub);
            if (coords.pas > subLimit) {
                coords.pas = 1;
                coords.sub++;
                if (coords.sub > c.maxSub) {
                    coords.sub = 1;
                    coords.ch = (coords.ch >= c.maxCh) ? 1 : coords.ch + 1;
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

    if (pre === "PMT") {
        document.getElementById('number').value = "5.1";
    } else if (pre === "RN") {
        document.getElementById('number').value = "1"; // Flat value placeholder
    }
    else {
        document.getElementById('number').value = CONFIG[pre].hasSub ? "1.1.1" : "1.1";
    }

    const displayPanel = document.getElementById('pasuramDisplay');
    if (displayPanel) {
        displayPanel.dataset.lastSignature = "";
        displayPanel.innerHTML = "<em>Select a file or press start to view pasuram lines...</em>";
    }
}
