/**
 * config.js - Static book structures, asset paths, and asynchronous dynamic script loaders
 */

window.PASURAM_STRUCTURE = {
    'TVM': { hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: { '2.7': 13 } },
    'PT': { hasSub: true, maxCh: 11, maxSub: 10, defPas: 10, ex: {} },
    'PMT': { hasSub: false, maxCh: 10, defPas: 10, ex: {} },
    'NAT': { hasSub: false, maxCh: 14, defPas: 10, ex: {} },
    'RN': { hasSub: false, maxCh: 1, defPas: 108, ex: {} }
};

const CONFIG = {
    'TVM': {
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: { '2.7': 13 },
        getMarkerPath: () => 'markers/marker_tvm_timeline.js',
        //getLanguagePath: () => null, - don't define as null. it causing a crash and prevents loading of the audiosrc
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/TVM.${num}.mp3`
    },
    'PT': {
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 11, maxSub: 10, defPas: 10, ex: {},
        getMarkerPath: () => 'markers/marker_pt_timelines.js',
        //getLanguagePath: () => null,
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/PT.${num}.mp3`
    },

    'PMT': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 1, maxCh: 10, defPas: 10, ex: {},
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY Chapters 1 and 6 house timeline markers
            if (chapter >= 1 && chapter <= 8) {
                return 'markers/marker_pmt_timelines.js';
            }
            return null; // No timeline markers available for other chapters
        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track
            if (chapter >= 1 && chapter <= 8) {
                return `markers/marker_pmt_${langCode}.js`;
            }
            return null;
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            if (chapter >= 1 && chapter <= 8) {
                return `audiofiles/PMT/PMT.${chapter}.all.ogg`;
            }
            return `https://www.uveda.org/media/recitation/PMT.${num}.mp3`;
        }
    },
    'NAT': {
        structure: 'chapter_pasuram',
        hasSub: false, maxCh: 14, defPas: 10, ex: {},
        minCh: 0, // to support thanian in chapter 0
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 0 && chapter <= 4) {
                return 'markers/marker_nat_timelines.js';
            }
            return null;
        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 0 && chapter <= 4) {
                return `markers/marker_nat_${langCode}.js`;
            }

            return null;
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 1 && chapter <= 4) {
                return `audiofiles/NAT/NAT_${chapter}.ogg`;
            }
            if (chapter == 0) { return `audiofiles/NAT/NAT_${num}.ogg` }
            return `https://www.uveda.org/media/recitation/NAT.${num}.mp3`;
        }
    },
    'RN': {
        structure: 'flat_pasuram',
        hasSub: false,
        maxPas: 108,
        getMarkerPath: () => 'markers/marker_rn_timelines.js',
        getLanguagePath: (num, langCode) => `markers/marker_rn_${langCode}.js`,
        getAudioSrc: function (numInput) {
            const pasNum = parseInt(numInput, 10);
            let startGroup = Math.floor((pasNum - 1) / 10) * 10 + 1;
            let endGroup = startGroup + 9;
            if (endGroup > 108) endGroup = 108;
            return `audiofiles/RN/rn_${startGroup}_${endGroup}.ogg`;
        }
    },
    'MUT': {
        structure: 'flat_pasuram',
        hasSub: false, maxPas: 100,
        getMarkerPath: () => 'markers/marker_mut_timeline.js',
        getLanguagePath: () => (num, langCode) => `markers/marker_mut_${langCode}.js`,
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/MUT.${num}.mp3`
    },
};

/**
 * Dynamically downloads timeline anchors and language text layers on-demand.
 */
function loadMarkerOnDemand(pre, numVal, langCode, callback) {
    const book = CONFIG[pre];
    if (!book || typeof book.getMarkerPath !== 'function') {
        console.error("Marker path resolution strategy missing for book prefix:", pre);
        return;
    }

    window.LOADED_SCRIPTS = window.LOADED_SCRIPTS || {};
    const timelinePath = book.getMarkerPath(numVal);

    // GUARD HOOK: If the config returns null, break early and proceed to playback without a timeline mesh
    if (!timelinePath) {
        console.log(`No local timeline registered for ${pre} chapter context: ${numVal}. Proceeding with clean fallback.`);
        if (callback) callback();
        return;
    }

    if (window.LOADED_SCRIPTS[timelinePath]) {
        handleLanguageInjection(book, numVal, langCode, callback);
        return;
    }

    const script = document.createElement('script');
    script.src = timelinePath;

    script.onload = () => {
        console.log(`Timeline asset script loaded successfully: ${timelinePath}`);
        window.LOADED_SCRIPTS[timelinePath] = true;
        handleLanguageInjection(book, numVal, langCode, callback);
    };

    script.onerror = () => {
        console.error(`Critical script load exception while parsing timeline path: ${timelinePath}`);
        if (callback) callback(); // Prevent app layout locks if files disappear
    };

    document.head.appendChild(script);
}

/**
 * Isolated logic controller to sequence translation file injections cleanly behind loaded timelines.
 */
function handleLanguageInjection(book, numVal, langCode, callback) {
    if (typeof book.getLanguagePath !== 'function') {
        if (callback) callback();
        return;
    }

    const textAssetPath = book.getLanguagePath(numVal, langCode);

    if (textAssetPath && !window.LOADED_SCRIPTS[textAssetPath]) {
        console.log(`Language layer code [${langCode}] detected. Chaining source file: ${textAssetPath}`);

        const langScript = document.createElement('script');
        langScript.src = textAssetPath;

        langScript.onload = () => {
            console.log(`Language layer asset (${textAssetPath}) downloaded.`);
            window.LOADED_SCRIPTS[textAssetPath] = true;

            if (typeof window.mergeLanguageTexts === 'function') {
                window.mergeLanguageTexts(langCode);
            }
            if (callback) callback();
        };

        langScript.onerror = () => {
            console.error(`Failed to handle translation script path cleanly: ${textAssetPath}. Continuing with pure timeline flags.`);
            if (callback) callback();
        };

        document.head.appendChild(langScript);
    } else {
        if (callback) callback();
    }
}

window.CONFIG = CONFIG;
window.loadMarkerOnDemand = loadMarkerOnDemand;