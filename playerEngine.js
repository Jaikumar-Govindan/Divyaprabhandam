let activeLineIndex = 0;
let pauseTimeoutHandle = null;

// Unified global memory lookup contexts for modular script injection
window.CURRENT_MARKERS = window.CURRENT_MARKERS || {};
window.CURRENT_TEXT_DICTIONARY = window.CURRENT_TEXT_DICTIONARY || {};

// Global string track tags to monitor crossover file updates across chapters
window.CURRENT_MARKERS_SOURCE = "";
window.CURRENT_TEXT_SOURCE = "";


// Web Audio API Context initialization to lock down sampling rates
let audioCtx = null;
let audioSourceNode = null;

function assurePitchPreservationNode() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;

    // Force basic HTML5 flags first
    audioPlayer.preservesPitch = true;
    audioPlayer.webkitPreservesPitch = true;
    audioPlayer.mozPreservesPitch = true;

    // Connect to Web Audio API to force strict clock synchronization 
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
            audioSourceNode = audioCtx.createMediaElementSource(audioPlayer);
            audioSourceNode.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    } catch (e) {
        // Source might already be connected, safe to swallow
        console.log("Audio routing node already established.");
    }
}


function updateEngineSpeed() {
    const speedSelect = document.getElementById('playbackSpeed');
    const audioPlayer = document.getElementById('audioPlayer');

    if (speedSelect && audioPlayer) {
        const targetSpeed = parseFloat(speedSelect.value) || 1.0;
        
        assurePitchPreservationNode();
        
        // Update the playback rate
        audioPlayer.playbackRate = targetSpeed;
        
        // Sync to the core engine state if it's running
        if (window.LearningEngine && window.LearningEngine.state) {
            window.LearningEngine.setPlaybackRate(targetSpeed);
        }
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
    window.addEventListener('learning-track-ended', async () => {
        const limit = parseInt(document.getElementById('repeatLimit').value, 10);
       
        LearningEngine.state.currentRepeatCount = (LearningEngine.state.currentRepeatCount || 0) + 1;
        
        const chosenStep = document.getElementById('learningStep').value;
        if (LearningEngine.state.currentRepeatCount < limit) {
            startLearning();
        } else {
            LearningEngine.state.currentRepeatCount = 0;
            
            const pre = document.getElementById('prefix').value;
            const numInput = document.getElementById('number').value;
            const activeConfig = window.CONFIG || CONFIG;
            const c = activeConfig[pre];
            const coords = Navigation.parseCoords(numInput, c.hasSub);
            
            // Synchronous marker retrieval using refactored engine function
            const targetPasuram = await getMarkerDataForCoords(pre, coords);

            if (targetPasuram) {
                const activeSegments = targetPasuram[chosenStep] || targetPasuram["step2"];
                if (chosenStep !== "step4" && activeLineIndex < activeSegments.length - 1) {
                    activeLineIndex++;
                    startLearning();
                    return;
                }
            }

            activeLineIndex = 0;
            if (document.getElementById('autoNext').value === "true") {
                navigate(1);
            } else {
                safeStopAudio();
            }
        }
    });
});

// ==========================================
//  STRUCTURE-BASED ASSET SYNC LOADERS
// ==========================================

/**
 * Computes asset naming conventions and injects missing files into the DOM
 * synchronously based on the Prabandham's structure configuration.
 */
/**
 * Injects missing asset files into the DOM and returns a Promise 
 * that resolves only when both marker and text assets are fully loaded and parsed.
 */
function requirePrabandhamAssets(prefix, coords) {
    return new Promise((resolve, reject) => {
        const activeConfig = window.CONFIG || CONFIG;
        const c = activeConfig[prefix];
        const selectedLang = document.getElementById('textLanguage')?.value || 'ta';
        const folder = prefix.toLowerCase();
        
        let chunkIdentifier = "";
        
        if (c.structure === 'flat_pasuram') {
            let startGroup = Math.floor((coords.pas - 1) / 10) * 10 + 1;
            let endGroup = startGroup + 9;
            if (prefix === 'RN' && endGroup > 108) endGroup = 108;
            chunkIdentifier = `${startGroup}_${endGroup}`;
        } else if (c.structure === 'chapter_pasuram') {
            chunkIdentifier = `${coords.ch}`;
        } else if (c.structure === 'chapter_sub_pasuram') {
            chunkIdentifier = `${coords.ch}_${coords.sub}`;
        }

        const markerPath = `markers/${folder}/${chunkIdentifier}.js`;
        const textPath = `textfile/${folder}/${selectedLang}/${chunkIdentifier}.js`;

        let markersLoaded = false;
        let textLoaded = false;

        // Helper to check if both files are finished loading
        const checkBothLoaded = () => {
            if (markersLoaded && textLoaded) {
                resolve();
            }
        };

        // 1. Dynamic Marker file evaluation
        if (window.CURRENT_MARKERS_SOURCE !== markerPath) {
            window.CURRENT_MARKERS[prefix] = {}; 
            window.CURRENT_MARKERS_SOURCE = markerPath;
            
            const script = document.createElement('script');
            script.src = markerPath;
            script.async = false; 
            script.onload = () => {
                markersLoaded = true;
                checkBothLoaded();
            };
            script.onerror = () => reject(new Error(`Failed to load markers: ${markerPath}`));
            document.head.appendChild(script);
        } else {
            markersLoaded = true;
        }

        // 2. Dynamic Text file translation evaluation
        if (window.CURRENT_TEXT_SOURCE !== textPath) {
            if (!window.CURRENT_TEXT_DICTIONARY[prefix]) {
                window.CURRENT_TEXT_DICTIONARY[prefix] = {};
            }
            window.CURRENT_TEXT_DICTIONARY[prefix][selectedLang] = {}; 
            window.CURRENT_TEXT_SOURCE = textPath;
            
            const script = document.createElement('script');
            script.src = textPath;
            script.async = false;
            script.onload = () => {
          //      syncTextToAudioTimeline();
                textLoaded = true;
                checkBothLoaded();
            };
            script.onerror = () => reject(new Error(`Failed to load text layout: ${textPath}`));
            document.head.appendChild(script);
        } else {
            textLoaded = true;
        }

        // If neither file path changed, resolve immediately
        checkBothLoaded();
    });
}

// ==========================================
//   REFACTORED ISOLATED DATA RETRIEVERS
// ==========================================

/**
 * Extracted Function 1: Synchronously fetches timeline verse segments from nested cache
 */
async function getMarkerDataForCoords(prefix, coords) {
   await requirePrabandhamAssets(prefix, coords);
    
    // Direct nested namespace collection check (e.g. window.CURRENT_MARKERS["PMT"]["1"])
    const bookMarkers = window.CURRENT_MARKERS[prefix];
    if (!bookMarkers || !bookMarkers[coords.pas]) return null;
    
    return bookMarkers[coords.pas];
}

/**
 * Extracted Function 2: Computes audio source location strings out of configuration trees
 */
async function getAudioPathForCoords(prefix, numInput) {
    const activeConfig = window.CONFIG || CONFIG;
    const bookConfig = activeConfig[prefix];
    if (!bookConfig || typeof bookConfig.getAudioSrc !== 'function') {
        throw new Error(`Missing layout structure configuration maps for prefix: ${prefix}`);
    }
    
    const coords = Navigation.parseCoords(numInput, bookConfig.hasSub);
    await requirePrabandhamAssets(prefix, coords);

    // Fallback Verification: If the nested verse entry is missing, drop back to Uveda server streaming
    if (!window.CURRENT_MARKERS[prefix] || !window.CURRENT_MARKERS[prefix][coords.pas]) {
        console.log(`Markers for pasuram ${coords.pas} missing in cache. Defaulting to Uveda stream.`);
        return `https://www.uveda.org/media/recitation/${prefix}.${numInput}.mp3`;
    }

    return bookConfig.getAudioSrc(numInput);
}

// ==========================================
//   CORE SYNCHRONOUS PLAYBACK CONTROLLERS
// ==========================================

function syncTextToAudioTimeline() {
    const playerEl = document.getElementById('audioPlayer');
    const displayPanel = document.getElementById('pasuramDisplay');
    
    if (!playerEl || !displayPanel) return;

    const pre = document.getElementById('prefix').value;
    const numInput = document.getElementById('number').value;
    
    const activeConfig = window.CONFIG || CONFIG;
    if (!activeConfig[pre]) return;
    
    const coords = Navigation.parseCoords(numInput, activeConfig[pre].hasSub);
    
// FIX: Using corrected local context mapping variable 'pre' instead of 'prefix'
    const bookMarkers = window.CURRENT_MARKERS[pre];
    const targetPasuram = (bookMarkers && bookMarkers[coords.pas]) ? bookMarkers[coords.pas] : null;
    const selectedLangValue = document.getElementById('textLanguage')?.value || 'ta';
    
    if (!targetPasuram) {
        displayPanel.innerHTML = `<div style="color:#65676b; font-size:1.1rem; font-style:italic;">Pasuram ${numInput} (Loading Text Frame...)</div>`;
        return;
    }
    
    // Resolve clean text translation out of the namespace nested model
    const rawTextString = window.CURRENT_TEXT_DICTIONARY?.[pre]?.[selectedLangValue]?.[coords.pas] || "";
    
    if (!rawTextString) {
        displayPanel.innerHTML = `<div style="color:#65676b; font-size:1.1rem; font-style:italic;">Pasuram ${numInput} (Loading Text Frame...)</div>`;
        return;
    }
    
    const step1Timeline = targetPasuram["step1"] || [];
    const currentTime = playerEl.currentTime || 0;
    
    let matchIndex = -1;
    for (let i = 0; i < step1Timeline.length; i++) {
        if (currentTime >= step1Timeline[i][0] && currentTime <= step1Timeline[i][1]) {
            matchIndex = i;
            break;
        }
    }
    
    const currentSignature = `${matchIndex}_${coords.pas}_${pre}_${selectedLangValue}`;
    
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
                innerHTMLString.push(` <span style="color:#000000;">*</span><br> `);
            }
        }
        displayPanel.innerHTML = innerHTMLString.join('');
        displayPanel.dataset.lastSignature = currentSignature;
    }
}

async function startLearning() {
    if (pauseTimeoutHandle) clearTimeout(pauseTimeoutHandle);

    const pre = document.getElementById('prefix').value;
    const numInput = document.getElementById('number').value;
    const chosenStep = document.getElementById('learningStep').value;
    const focusMode = document.getElementById('recitationFocus').value;
    
    const activeConfig = window.CONFIG || CONFIG;
    const c = activeConfig[pre];
    const coords = Navigation.parseCoords(numInput, c.hasSub);
    const isSingle = typeof c.isSingleFile === 'function' ? c.isSingleFile(numInput) : c.isSingleFile;
    
    let bounds = null;
    let lineWindows = null;
    let markersFound = false;

    if (isSingle) {
        document.getElementById('status').innerText = `Loading next chapter data assets...`;
        const targetPasuram = await getMarkerDataForCoords(pre, coords);
        
        if (targetPasuram) {
            markersFound = true;
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
    }

    if (!markersFound) {
        bounds = { start: 0, end: 9999 }; 
        document.getElementById('status').innerText = `Playing Full Pasuram...`;
    }

    // Call extracted audio path selector
    let audioSrc = "";
    try {
        audioSrc = await getAudioPathForCoords(pre, numInput);
    } catch (err) {
        console.error("Audio path layout resolution configuration exception:", err);
        document.getElementById('status').innerText = "Audio track path missing";
        return;
    }

    // Capture and bind precise speed conditions during media load pipeline shifts
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        const speedSelect = document.getElementById('playbackSpeed');
        const targetSpeed = speedSelect ? parseFloat(speedSelect.value) : 1.0;

        // Force rules when track changes media structures asynchronously
        const applySpeedRules = () => {
            assurePitchPreservationNode();
            audioPlayer.playbackRate = targetSpeed;
        };

        // Remove old listeners to prevent leak cascades, then bind clean event loop hooks
        audioPlayer.removeEventListener('canplay', applySpeedRules);
        audioPlayer.addEventListener('canplay', applySpeedRules);
        
        // Immediate baseline backup enforcement 
        applySpeedRules();
    }

    syncTextToAudioTimeline();

    LearningEngine.playSegment(audioSrc, bounds, () => {
        window.dispatchEvent(new CustomEvent('learning-track-ended'));
    }, lineWindows, chosenStep, focusMode);
}

function safeStopAudio() {
    if (pauseTimeoutHandle) clearTimeout(pauseTimeoutHandle);
    if (window.LearningEngine) {
        LearningEngine.stopMonitor();
    }
    document.getElementById('status').innerText = "Ready";
}

async function navigate(dir) {
    safeStopAudio();
    resetLineTracking();
    
    const input = document.getElementById('number');
    const pre = document.getElementById('prefix').value;
    const activeConfig = window.CONFIG || CONFIG;
    const c = activeConfig[pre];
    let coords = Navigation.parseCoords(input.value, c.hasSub);
    
    coords.pas += dir;
    
    switch (c.structure) {
        case 'flat_pasuram':
            if (coords.pas > c.maxPas) coords.pas = 1;
            else if (coords.pas < 1) coords.pas = c.maxPas;
            input.value = `${coords.pas}`;
            break;

        case 'chapter_pasuram':
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

        case 'chapter_sub_pasuram':
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
    await startLearning();
}

function resetLineTracking() {
    activeLineIndex = 0;
    if (window.LearningEngine && LearningEngine.state) { LearningEngine.state.currentRepeatCount = 0; }
}

function resetToStart() {
    safeStopAudio();
    resetLineTracking();
    const pre = document.getElementById('prefix').value;
    const activeConfig = window.CONFIG || CONFIG;
    
    if (pre === "PMT") {
        document.getElementById('number').value = "5.1";
    } else if (pre === "RN") {
        document.getElementById('number').value = "1";
    } else {
        document.getElementById('number').value = activeConfig[pre].hasSub ? "1.1.1" : "1.1";
    }
    
    const displayPanel = document.getElementById('pasuramDisplay');
    if (displayPanel) {
        displayPanel.dataset.lastSignature = "";
        displayPanel.innerHTML = "<em>Select a file or press start to view pasuram lines...</em>";
    }
}