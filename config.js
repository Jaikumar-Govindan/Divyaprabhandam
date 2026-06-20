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

        // --- THE ALL-OR-NOTHING MANIFEST ---
        // Listing a key here automatically activates BOTH the local high-fi audio track 
        // AND the corresponding custom chapter timeline file.
        availableContent: [
            "3_1", "3_2", "3_3"
        ],



        // --- SOLVERS ---
        getMarkerPath: function (num) {
            if (!num) return this.defaultTimelinePath;

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the unique key for this segment
            const lookupKey = `${chapter}_${subChapter}`;

            return `markers/tvm/timeline_${chapter}.js`;

        },

        getAudioSrc: function (num) {
            if (!num) return '';

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the exact same key for the segment
            const lookupKey = `${chapter}_${subChapter}`;

            // If it's in our override list, swap out the remote URL for the local .ogg asset
            if (this.availableContent.includes(lookupKey)) {
                return `audiofiles/TVM/TVM_${chapter}.${subChapter}.ogg`;
            }

            // Remote fallback
            return `https://www.uveda.org/media/recitation/TVM.${num}.mp3`;
        },
        getLanguagePath: function (num, langCode) {
            // Guarantee a valid language token string defaults if empty
            const lang = langCode || 'en';


            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];
            const lookupKey = `${chapter}_${subChapter}`;


            return `markers/tvm/${chapter}_${lang}.js`;

        }


    },

    'PTM': {
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 10, ex: { '2.7': 13 },

        // --- THE ALL-OR-NOTHING MANIFEST ---
        // Listing a key here automatically activates BOTH the local high-fi audio track 
        // AND the corresponding custom chapter timeline file.
        availableContent: [
            "5_1", "5_2", "5_3", "5_4", "5_5", "5_6", "5_7", "5_8", //"5_9", "5_10"
        ],



        // --- SOLVERS ---
        getMarkerPath: function (num) {
            if (!num) return this.defaultTimelinePath;

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the unique key for this segment
            const lookupKey = `${chapter}_${subChapter}`;

            return `markers/PTM/timeline_${chapter}.js`;

        },

        getAudioSrc: function (num) {
            if (!num) return '';

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the exact same key for the segment
            const lookupKey = `${chapter}_${subChapter}`;

            // If it's in our override list, swap out the remote URL for the local .ogg asset
            if (this.availableContent.includes(lookupKey)) {
                return `audiofiles/PTM/PTM_${chapter}.${subChapter}.ogg`;
            }

            // Remote fallback
            return `https://www.uveda.org/media/recitation/PT.${num}.mp3`;
        },
        getLanguagePath: function (num, langCode) {
            // Guarantee a valid language token string defaults if empty
            const lang = langCode || 'en';


            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];
            const lookupKey = `${chapter}_${subChapter}`;


            return `markers/PTM/${chapter}_${lang}.js`;

        }
    },
    'PAT': {
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 10, ex: { '2.7': 13 },

        // --- THE ALL-OR-NOTHING MANIFEST ---
        // Listing a key here automatically activates BOTH the local high-fi audio track 
        // AND the corresponding custom chapter timeline file.
        availableContent: [
            "1_1", "1_2", "1_3", "1_4", "1_5", "1_6", "1_7", "1_8", "1_9",
            "2_1", "2_2", "2_3", "2_4", "2_5", "2_6", "2_7", "2_8", "2_9", "2_10"
        ],



        // --- SOLVERS ---
        getMarkerPath: function (num) {
            if (!num) return this.defaultTimelinePath;

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the unique key for this segment
            const lookupKey = `${chapter}_${subChapter}`;

            return `markers/PAT/timeline_${chapter}.js`;

        },

        getAudioSrc: function (num) {
            if (!num) return '';

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the exact same key for the segment
            const lookupKey = `${chapter}_${subChapter}`;

            // If it's in our override list, swap out the remote URL for the local .ogg asset
            if (this.availableContent.includes(lookupKey)) {
                return `audiofiles/PAT/PAT_${chapter}.${subChapter}.ogg`;
            }

            // Remote fallback
            return `https://www.uveda.org/media/recitation/PT.${num}.mp3`;
        },
        getLanguagePath: function (num, langCode) {
            // Guarantee a valid language token string defaults if empty
            const lang = langCode || 'en';


            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];
            const lookupKey = `${chapter}_${subChapter}`;


            return `markers/PAT/${chapter}_${lang}.js`;

        }
    },
    'PMT': {//Perumal Thirumozhi
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 10, defPas: 10, ex: { '0': 2 },
        getMarkerPath: (num) => {

            return 'markers/marker_pmt_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track
            return `markers/marker_pmt_${langCode}.js`;
            return null;
        },
        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            if (chapter == 0)
                return `audiofiles/PMT/PMT.${num}.ogg`

            if (chapter >= 1 && chapter <= 10) {
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
            if (chapter >= 0 && chapter <= 14) {
                return 'markers/marker_nat_timelines.js';
            }
            return null;
        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 0 && chapter <= 14) {
                return `markers/marker_nat_${langCode}.js`;
            }

            return null;
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 1 && chapter <= 14) {
                return `audiofiles/NAT/NAT_${chapter}.ogg`;
            }
            if (chapter == 0) { return `audiofiles/NAT/NAT_${num}.ogg` }
            return `https://www.uveda.org/media/recitation/NAT.${num}.mp3`;
        }
    },

    'RN': {

        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 108,
        ex: { '0': 3 },

        getMarkerPath: (num) => {
            return 'markers/marker_rn_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_rn_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `audiofiles/RN/RN.${num}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 108
                if (fileEnd > 108) {
                    fileEnd = 108;
                }

                return `audiofiles/RN/rn_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    '3TA': {
        structure: 'flat_pasuram',
        hasSub: false, maxPas: 100,
        getMarkerPath: () => 'markers/marker_3ta_timeline.js',
        getLanguagePath: () => (num, langCode) => `markers/marker_3ta_${langCode}.js`,
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/MUT.${num}.mp3`
    },
    'TPE': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 10, ex: { '0': 2 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'markers/marker_tpe_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `markers/marker_tpe_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `audiofiles/TPE/TPE.${chapter}.ogg`;

        }
    },
    'TPL': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 12, ex: { '0': 3 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'markers/marker_tpl_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `markers/marker_tpl_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `audiofiles/TPL/TPL.${chapter}.ogg`;

        }
    },
    'KCT': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 11, ex: { '0': 2 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'markers/marker_kct_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `markers/marker_kct_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `audiofiles/KCT/KCT_${chapter}.ogg`;

        }
    },
    'AAP': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 10, ex: { '0': 2 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'markers/marker_aap_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `markers/marker_aap_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `audiofiles/AAP/AAP_${chapter}.ogg`;

        }
    },
    'URM': {

        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 74,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'markers/marker_urm_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_urm_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `audiofiles/URM/URM_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 108
                if (fileEnd > 74) {
                    fileEnd = 74;
                }

                return `audiofiles/URM/URM_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TCV': {

        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 120,
        ex: { '0': 3 },

        getMarkerPath: (num) => {
            return 'markers/marker_tcv_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_tcv_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `audiofiles/TCV/TCV_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 120
                if (fileEnd > 120) {
                    fileEnd = 120;
                }

                return `audiofiles/TCV/TCV_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TML': {

        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 45,
        ex: { '0': 3 },

        getMarkerPath: (num) => {
            return 'markers/marker_tml_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_tml_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `audiofiles/TML/TML_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 45
                if (fileEnd > 45) {
                    fileEnd = 45;
                }

                return `audiofiles/TML/TML_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TPV': {

        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 30,
        ex: { '0': 3 },

        getMarkerPath: (num) => {
            return 'markers/marker_tpv_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_tpv_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `audiofiles/TPV/TPV_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 30
                if (fileEnd > 30) {
                    fileEnd = 30;
                }

                return `audiofiles/TPV/TPV_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TKT': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 1,
        maxCh: 1,
        defPas: 20,
        ex: { '0': 3 },

        getMarkerPath: (num) => {
            return 'markers/marker_tkt_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_tkt_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                // Take from Periya Thirumozhi since they share thanian tracks
                return `audiofiles/PTM/PTM_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 20
                if (fileEnd > 20) {
                    fileEnd = 20;
                }

                return `audiofiles/TKT/TKT_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TNT': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 1,
        maxCh: 1,
        defPas: 30,
        ex: { '0': 3 },

        getMarkerPath: (num) => {
            return 'markers/marker_tnt_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `markers/marker_tnt_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                // Take from Periya Thirumozhi since they share thanian tracks
                return `audiofiles/PTM/PTM_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 30
                if (fileEnd > 30) {
                    fileEnd = 30;
                }

                return `audiofiles/TNT/TNT_${fileStart}_${fileEnd}.ogg`;
            }
        }
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