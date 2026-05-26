/**
 * config.js - Static book structures, asset paths, and asynchronous dynamic script loaders
 */

window.PASURAM_STRUCTURE = {
    'TVM': { hasSub: true,  maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13} },
    'PT':  { hasSub: true,  maxCh: 11, maxSub: 10, defPas: 10, ex: {} },
    'PMT': { hasSub: false, maxCh: 10, defPas: 10, ex: {} },
    'NAT': { hasSub: false, maxCh: 14, defPas: 10, ex: {} },
    // FIXED: Added Ramanusa Nootrandhadhi structural boundaries rules back
    'RN':  { hasSub: false, maxCh:1, defPas: 108, ex: {} }
};

const CONFIG = {
    'TVM': { 
		structure: 'chapter_sub_pasuram', // Variant 3
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13},
        markerPath: 'markers/marker_tvm.js',
        // Fall back to uVeda remote recitation server
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/TVM.${num}.mp3`
    },
    'PT':  { 
		structure: 'chapter_sub_pasuram', // Variant 3
        hasSub: true, maxCh: 11, maxSub: 10, defPas: 10, ex: {},
        markerPath: 'markers/marker_pt.js',
        // Fall back to uVeda remote recitation server
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/PT.${num}.mp3`
    },
    'PMT': { 
		structure: 'chapter_pasuram',
        hasSub: false, maxCh: 10, defPas: 10, ex: {},
        markerPath: 'markers/marker_pmt.js',
        isSingleFile: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            return chapter >= 1 && chapter <= 6;
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // Route local file assets for Chapters 1-5; fall back to uVeda for others
            if (chapter === 1) return `audiofiles/PMT/PMT.1.all.ogg`;
            if (chapter === 2) return `audiofiles/PMT/PMT.2.all.ogg`;
            if (chapter === 3) return `audiofiles/PMT/PMT.3.all.ogg`;
            if (chapter === 4) return `audiofiles/PMT/PMT.4.all.ogg`;
            if (chapter === 5) return `audiofiles/PMT/PMT.5.all.ogg`;
            if (chapter === 6) return `audiofiles/PMT/PMT.6.all.ogg`;
            return `https://www.uveda.org/media/recitation/PMT.${num}.mp3`;
        }
    },
    'NAT': { 
		structure: 'chapter_pasuram',
        hasSub: false, maxCh: 14, defPas: 10, ex: {},
        markerPath: 'markers/marker_nat.js',
        isSingleFile: (num) => parseInt(num.split('.')[0], 10) === 2,
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // Route local file assets for Chapter 2; fall back to uVeda for others
            return `https://www.uveda.org/media/recitation/NAT.${num}.mp3`;
        }
    },
     'RN': {
		 structure: 'flat_pasuram',        // Variant 1
    hasSub: false,       // Stays a flat sequence of 108 pasurams
    maxPas: 108,
    getAudioSrc: function(numInput) {
        const pasNum = parseInt(numInput, 10);
        
        // Math to group pasurams: 1-10 -> start 1, 11-20 -> start 11, etc.
        let startGroup = Math.floor((pasNum - 1) / 10) * 10 + 1;
        let endGroup = startGroup + 9;
        
        // Cap the final group safely at the maximum limit of 108
        if (endGroup > 108) endGroup = 108;
        
        // Returns paths like: audio/rn/rn_1_10.mp3, audio/rn/rn_11_20.mp3
        return `audiofiles/RN/rn_${startGroup}_${endGroup}.ogg`;
    },
    isSingleFile: true   // Instructs player components to locate data blocks locally
}
};


/**
 * Dynamically injects a marker script into the document head
 * @param {string} pre - The book prefix (e.g., 'TVM')
 * @param {function} callback - Function to run once loaded
 */
function loadMarkerOnDemand(pre, callback) {
    const book = CONFIG[pre];
    if (!book || !book.markerPath) {
        console.error("No marker path defined for:", pre);
        return;
    }

    // Check if already loaded to avoid duplicate requests
    if (window.MARKER_DATABASE && window.MARKER_DATABASE[pre]) {
        if (callback) callback();
        return;
    }

    const script = document.createElement('script');
    script.src = book.markerPath;
    script.onload = () => {
        console.log(`Loaded markers for ${pre}`);
        if (callback) callback();
    };
    script.onerror = () => console.error(`Failed to load ${book.markerPath}`);
    
    document.head.appendChild(script);
}

window.CONFIG = CONFIG;
window.loadMarkerOnDemand = loadMarkerOnDemand;

