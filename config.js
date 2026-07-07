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
            "3_1", "3_2", "3_3", "3_4", "3_5"
        ],



        // --- SOLVERS ---
        getMarkerPath: function (num) {
            if (!num) return this.defaultTimelinePath;

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the unique key for this segment
            const lookupKey = `${chapter}_${subChapter}`;

            return `aruLicheyal/TVM/markers/timelines_${chapter}.js`;

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
                return `aruLicheyal/TVM/audiofiles/TVM_${chapter}.${subChapter}.ogg`;
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


            return `aruLicheyal/TVM/text/${chapter}_${lang}.js`;

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

            return `aruLicheyal/PTM/markers/timelines_${chapter}.js`;

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
                return `aruLicheyal/PTM/audiofiles/PTM_${chapter}.${subChapter}.ogg`;
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


            return `aruLicheyal/PTM/text/${chapter}_${lang}.js`;

        }
    },
    'PAT': {
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 10, ex: { '1.2': 21, '1.5': 11, '1.6': 11, '1.7': 11, '1.8': 11 },

        // --- THE ALL-OR-NOTHING MANIFEST ---
        // Listing a key here automatically activates BOTH the local high-fi audio track 
        // AND the corresponding custom chapter timeline file.
        availableContent: [
            "1_1", "1_2", "1_3", "1_4", "1_5", "1_6", "1_7", "1_8", "1_9",
            "2_1", "2_2", "2_3", "2_4", "2_5", "2_6", "2_7", "2_8", "2_9", "2_10",
            "3_1", "3_2", "3_3", "3_4", "3_5", "3_6", "3_7", "3_8", "3_9", "3_10",
            "4_1", "4_2", "4_3", "4_4", "4_5", "4_6", "4_7"
        ],



        // --- SOLVERS ---
        getMarkerPath: function (num) {
            if (!num) return this.defaultTimelinePath;

            const parts = num.split('.');
            const chapter = parts[0];
            const subChapter = parts[1];

            // Generate the unique key for this segment
            const lookupKey = `${chapter}_${subChapter}`;

            return `aruLicheyal/PAT/markers/timelines_${chapter}.js`;

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
                return `aruLicheyal/PAT/audiofiles/PAT_${chapter}.${subChapter}.ogg`;
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


            return `aruLicheyal/PAT/text/${chapter}_${lang}.js`;

        }
    },
    'PMT': {//Perumal Thirumozhi
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 10, defPas: 10, ex: { '0': 2 },
        getMarkerPath: (num) => {

            return 'aruLicheyal/PMT/markers/marker_pmt_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track
            return `aruLicheyal/PMT/text/marker_pmt_${langCode}.js`;
            return null;
        },
        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            if (chapter == 0)
                return `aruLicheyal/PMT/audiofiles/PMT.${num}.ogg`

            if (chapter >= 1 && chapter <= 10) {
                return `aruLicheyal/PMT/audiofiles/PMT.${chapter}.ogg`;
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
                return 'aruLicheyal/NAT/markers/marker_nat_timelines.js';
            }
            return null;
        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 0 && chapter <= 14) {
                return `aruLicheyal/NAT/text/marker_nat_${langCode}.js`;
            }

            return null;
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);
            if (chapter >= 1 && chapter <= 14) {
                return `aruLicheyal/NAT/audiofiles/NAT_${chapter}.ogg`;
            }
            if (chapter == 0) { return `aruLicheyal/NAT/audiofiles/NAT_${num}.ogg` }
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
            return 'aruLicheyal/RN/markers/marker_rn_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/RN/text/marker_rn_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/RN/audiofiles/RN.${num}.ogg`;
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

                return `aruLicheyal/RN/audiofiles/rn_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    '1TA': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 100,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/1TA/markers/marker_1ta_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/1TA/text/marker_1ta_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/1TA/audiofiles/1TA_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 100
                if (fileEnd > 100) {
                    fileEnd = 100;
                }

                return `aruLicheyal/1TA/audiofiles/1TA_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    '2TA': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 100,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/2TA/markers/marker_2ta_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/2TA/text/marker_2ta_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/2TA/audiofiles/2TA_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 100
                if (fileEnd > 100) {
                    fileEnd = 100;
                }

                return `aruLicheyal/2TA/audiofiles/2TA_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    '3TA': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 100,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/3TA/markers/marker_3ta_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/3TA/text/marker_3ta_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/3TA/audiofiles/3TA_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 100
                if (fileEnd > 100) {
                    fileEnd = 100;
                }

                return `aruLicheyal/3TA/audiofiles/3TA_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    '4TA': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 97,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/4TA/markers/marker_4ta_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/4TA/text/marker_4ta_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/4TA/audiofiles/4TA_${chapter}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 100
                if (fileEnd > 97) {
                    fileEnd = 97;
                }

                return `aruLicheyal/4TA/audiofiles/4TA_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TVT': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 100,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/TVT/markers/marker_tvt_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TVT/text/marker_tvt_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/TVT/audiofiles/TVT.${num}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 100
                if (fileEnd > 100) {
                    fileEnd = 100;
                }

                return `aruLicheyal/TVT/audiofiles/TVT_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TVS': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 7,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/TVS/markers/marker_tvs_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TVS/text/marker_tvs_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/TVS/audiofiles/TVS.${num}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 7
                if (fileEnd > 7) {
                    fileEnd = 7;
                }

                return `aruLicheyal/TVS/audiofiles/TVS_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TVK': {
        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 8,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/TVK/markers/marker_tvk_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TVK/text/marker_tvk_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/TVK/audiofiles/TVK.${num}.ogg`;
            }

            // CASE 2: Main Pasurams (Chapter 1) -> Grouped in batches of 10
            if (chapter === 1) {
                // Automatically groups: 1-10 -> 1, 11-20 -> 11, 101-108 -> 101
                let fileStart = Math.floor((pasuram - 1) / 10) * 10 + 1;
                let fileEnd = fileStart + 9;

                // Cap the final audio file window string at 8
                if (fileEnd > 8) {
                    fileEnd = 8;
                }

                return `aruLicheyal/TVK/audiofiles/TVK_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TPE': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 10, ex: { '0': 2 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'aruLicheyal/TPE/markers/marker_tpe_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `aruLicheyal/TPE/text/marker_tpe_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `aruLicheyal/TPE/audiofiles/TPE.${chapter}.ogg`;

        }
    },
    'TPL': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 12, ex: { '0': 3 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'aruLicheyal/TPL/markers/marker_tpl_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `aruLicheyal/TPL/text/marker_tpl_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `aruLicheyal/TPL/audiofiles/TPL.${chapter}.ogg`;

        }
    },
    'KCT': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 11, ex: { '0': 2 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'aruLicheyal/KCT/markers/marker_kct_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `aruLicheyal/KCT/text/marker_kct_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `aruLicheyal/KCT/audiofiles/KCT_${chapter}.ogg`;

        }
    },
    'AAP': {
        structure: 'chapter_pasuram',
        hasSub: false, minCh: 0, maxCh: 1, defPas: 10, ex: { '0': 2 },
        getMarkerPath: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return 'aruLicheyal/AAP/markers/marker_aap_timelines.js';

        },
        getLanguagePath: (num, langCode) => {
            const chapter = parseInt(num.split('.')[0], 10);
            // ONLY map text assets if the chapter contains an underlying timeline track

            return `aruLicheyal/AAP/text/marker_aap_${langCode}.js`;

        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0], 10);

            return `aruLicheyal/AAP/audiofiles/AAP_${chapter}.ogg`;

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
            return 'aruLicheyal/URM/markers/marker_urm_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/URM/text/marker_urm_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/URM/audiofiles/URM_${chapter}.ogg`;
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

                return `aruLicheyal/URM/audiofiles/URM_${fileStart}_${fileEnd}.ogg`;
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
            return 'aruLicheyal/TCV/markers/marker_tcv_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TCV/text/marker_tcv_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/TCV/audiofiles/TCV_${chapter}.ogg`;
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

                return `aruLicheyal/TCV/audiofiles/TCV_${fileStart}_${fileEnd}.ogg`;
            }
        }
    },
    'TML': {

        structure: 'chapter_pasuram',
        hasSub: false,
        minCh: 0,
        maxCh: 1,
        defPas: 45,
        ex: { '0': 1 },

        getMarkerPath: (num) => {
            return 'aruLicheyal/TML/markers/marker_tml_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TML/text/marker_tml_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/TML/audiofiles/TML_${chapter}.ogg`;
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

                return `aruLicheyal/TML/audiofiles/TML_${fileStart}_${fileEnd}.ogg`;
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
            return 'aruLicheyal/TPV/markers/marker_tpv_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TPV/text/marker_tpv_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                return `aruLicheyal/TPV/audiofiles/TPV_${chapter}.ogg`;
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

                return `aruLicheyal/TPV/audiofiles/TPV_${fileStart}_${fileEnd}.ogg`;
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
            return 'aruLicheyal/TKT/markers/marker_tkt_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TKT/text/marker_tkt_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                // Take from Periya Thirumozhi since they share thanian tracks
                return `aruLicheyal/PTM/audiofiles/PTM_${chapter}.ogg`;
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

                return `aruLicheyal/TKT/audiofiles/TKT_${fileStart}_${fileEnd}.ogg`;
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
            return 'aruLicheyal/TNT/markers/marker_tnt_timelines.js';
        },

        getLanguagePath: (num, langCode) => {
            return `aruLicheyal/TNT/text/marker_tnt_${langCode}.js`;
        },

        getAudioSrc: (num) => {
            const parts = num.split('.');
            const chapter = parseInt(parts[0], 10);
            const pasuram = parseInt(parts[1], 10);

            // CASE 1: Thanians (Chapter 0) -> Plays individual files per Thaniyan
            if (chapter === 0) {
                // Take from Periya Thirumozhi since they share thanian tracks
                return `aruLicheyal/PTM/audiofiles/PTM_${chapter}.ogg`;
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

                return `aruLicheyal/TNT/audiofiles/TNT_${fileStart}_${fileEnd}.ogg`;
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
