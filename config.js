/**
 * config.js - Static book structures, asset paths, and asynchronous dynamic script loaders
 */

const ROOT = 'aruLicheyal';

/** Returns the standard flat marker path for simple books */
function flatMarkerPath(book) {
    const b = book.toLowerCase();
    return `${ROOT}/${book}/markers/marker_${b}_timelines.js`;
}

/** Returns the standard flat language path for simple books */
function flatLangPath(book, langCode) {
    const b = book.toLowerCase();
    return `${ROOT}/${book}/text/marker_${b}_${langCode}.js`;
}

/** Groups pasuram into batches of 10: pasuram 11 → BOOK_11_20.ogg */
function batchAudio(pasuram, maxPas, book) {
    const start = Math.floor((pasuram - 1) / 10) * 10 + 1;
    const end = Math.min(start + 9, maxPas);
    return `${ROOT}/${book}/audiofiles/${book}_${start}_${end}.ogg`;
}

/**
 * Factory for sub-chapter books: TVM, PTM, PAT.
 * All three share identical solver logic; only metadata differs.
 */
function makeSubChapterBook(opts) {
    // opts: { key, structure, hasSub, maxCh, maxSub, defPas, ex,
    //         availableContent, remotePrefix }
    const { key, remotePrefix } = opts;
    return {
        structure: opts.structure,
        hasSub: opts.hasSub,
        maxCh: opts.maxCh,
        maxSub: opts.maxSub,
        defPas: opts.defPas,
        ex: opts.ex,
        availableContent: opts.availableContent,

        getMarkerPath(num) {
            if (!num) return undefined;
            const chapter = num.split('.')[0];
            return `${ROOT}/${key}/markers/timelines_${chapter}.js`;
        },

        getAudioSrc(num) {
            if (!num) return '';
            const [chapter, subChapter] = num.split('.');
            if (this.availableContent.includes(`${chapter}_${subChapter}`)) {
                return `${ROOT}/${key}/audiofiles/${key}_${chapter}.${subChapter}.ogg`;
            }
            return `https://www.uveda.org/media/recitation/${remotePrefix}.${num}.mp3`;
        },

        getLanguagePath(num, langCode) {
            const lang = langCode || 'en';
            const chapter = num.split('.')[0];
            return `${ROOT}/${key}/text/${chapter}_${lang}.js`;
        }
    };
}

/**
 * Factory for grouped single-chapter books.
 * Ch0 (thanian) → BOOK_0.ogg; Ch1 → batched in groups of 10.
 */
function makeGroupedBook({ key, defPas, ex = {}, minCh = 0, maxCh = 1 }) {
    return {
        structure: 'chapter_pasuram',
        hasSub: false, minCh, maxCh, defPas, ex,

        getMarkerPath: () => flatMarkerPath(key),
        getLanguagePath: (_num, langCode) => flatLangPath(key, langCode),

        getAudioSrc(num) {
            const [ch, pas] = num.split('.');
            const chapter = parseInt(ch, 10);
            const pasuram = parseInt(pas, 10);
            if (chapter === 0) return `${ROOT}/${key}/audiofiles/${key}_0.ogg`;
            if (chapter === 1) return batchAudio(pasuram, defPas, key);
        }
    };
}

/**
 * Factory for simple per-chapter books (TPE, TPL, KCT, AAP, NAT, PMT).
 * One audio file per chapter, no batching.
 *
 * opts:
 *   key            - book key
 *   defPas         - default pasuram count
 *   ex             - exceptions map (default {})
 *   minCh          - default 0
 *   maxCh          - default 1
 */
function makeSimpleBook({ key, defPas, ex = {}, minCh = 0, maxCh = 1 }) {
    return {
        structure: 'chapter_pasuram',
        hasSub: false, minCh, maxCh, defPas, ex,

        getMarkerPath: () => flatMarkerPath(key),
        getLanguagePath: (_num, langCode) => flatLangPath(key, langCode),
        getAudioSrc: (num) => `${ROOT}/${key}/audiofiles/${key}_${parseInt(num.split('.')[0], 10)}.ogg`
    };
}
const CONFIG = {
    'TPL': makeSimpleBook({ key: 'TPL', defPas: 12, ex: { '0': 3 } }),
    'PAT': makeSubChapterBook({
        key: 'PAT', remotePrefix: 'PT',
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 10,
        ex: { '1.2': 21, '1.5': 11, '1.6': 11, '1.7': 11, '1.8': 11 },
        availableContent: [
            "1_1", "1_2", "1_3", "1_4", "1_5", "1_6", "1_7", "1_8", "1_9",
            "2_1", "2_2", "2_3", "2_4", "2_5", "2_6", "2_7", "2_8", "2_9", "2_10",
            "3_1", "3_2", "3_3", "3_4", "3_5", "3_6", "3_7", "3_8", "3_9", "3_10",
            "4_1", "4_2", "4_3", "4_4", "4_5", "4_6", "4_7"
        ]
    }),
    'TPV': makeGroupedBook({ key: 'TPV', defPas: 30, ex: { '0': 3 } }),
    'NAT': makeSimpleBook({ key: 'NAT', defPas: 10, ex: { '0': 2 }, minCh: 0, maxCh: 14 }),
    'PMT': makeSimpleBook({ key: 'PMT', defPas: 10, ex: { '0': 2 }, minCh: 0, maxCh: 10 }),
    'TCV': makeGroupedBook({ key: 'TCV', defPas: 120, ex: { '0': 3 } }),
    'TML': makeGroupedBook({ key: 'TML', defPas: 45, ex: { '0': 1 } }),
    'TPE': makeGroupedBook({ key: 'TPE', defPas: 10, ex: { '0': 2 } }),
    'AAP': makeSimpleBook({ key: 'AAP', defPas: 10, ex: { '0': 2 } }),
    'KCT': makeSimpleBook({ key: 'KCT', defPas: 11, ex: { '0': 2 } }),

    // --- 2000 ---

    'PTM': makeSubChapterBook({
        key: 'PTM', remotePrefix: 'PT',
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 10, ex: { '2.7': 13 },
        availableContent: ["5_1", "5_2", "5_3", "5_4", "5_5", "5_6", "5_7", "5_8"]
    }),

    'TKT': makeGroupedBook({ key: 'TKT', defPas: 20, ex: { '0': 3 } }),
    'TNT': makeGroupedBook({ key: 'TNT', defPas: 30, ex: { '0': 3 } }),

    // --- 3000 ---

    '1TA': makeGroupedBook({ key: '1TA', defPas: 100, ex: { '0': 1 } }),
    '2TA': makeGroupedBook({ key: '2TA', defPas: 100, ex: { '0': 1 } }),
    '3TA': makeGroupedBook({ key: '3TA', defPas: 100, ex: { '0': 1 } }),
    '4TA': makeGroupedBook({ key: '4TA', defPas: 97, ex: { '0': 1 } }),
    'TVT': makeGroupedBook({ key: 'TVT', defPas: 100, ex: { '0': 1 } }),
    'TVS': makeGroupedBook({ key: 'TVS', defPas: 7, ex: { '0': 1 } }),
    'PTA': makeGroupedBook({ key: 'PTA', defPas: 87, ex: { '0': 1 } }),
    'TVK': makeGroupedBook({ key: 'TVK', defPas: 8, ex: { '0': 1 } }),
    //'STM': makeGroupedBook({ key: 'STM', defPas: 8, ex: { '0': 1 } }),
    // PTM - periya thiru madal - name conflict :(

    // --- 4000 ---

    'TVM': makeSubChapterBook({
        key: 'TVM', remotePrefix: 'TVM',
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: { '2.7': 13 },
        availableContent: ["3_1", "3_2", "3_3", "3_4", "3_5"]
    }),

    'RN': makeGroupedBook({ key: 'RN', defPas: 108, ex: { '0': 3 } }),
    'URM': makeGroupedBook({ key: 'URM', defPas: 74, ex: { '0': 1 } }),
};

// ---------------------------------------------------------------------------
// DYNAMIC LOADER
// ---------------------------------------------------------------------------

/**
 * Dynamically loads timeline and language scripts on-demand.
 */
function loadMarkerOnDemand(pre, numVal, langCode, callback) {
    const book = CONFIG[pre];
    if (!book || typeof book.getMarkerPath !== 'function') {
        console.error("Marker path resolution strategy missing for book prefix:", pre);
        return;
    }

    window.LOADED_SCRIPTS = window.LOADED_SCRIPTS || {};
    const timelinePath = book.getMarkerPath(numVal);

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
        window.LOADED_SCRIPTS[timelinePath] = true;
        handleLanguageInjection(book, numVal, langCode, callback);
    };
    script.onerror = () => {
        console.error(`Failed to load timeline: ${timelinePath}`);
        if (callback) callback();
    };
    document.head.appendChild(script);
}

/**
 * Chains language file injection after timeline is loaded.
 */
function handleLanguageInjection(book, numVal, langCode, callback) {
    if (typeof book.getLanguagePath !== 'function') {
        if (callback) callback();
        return;
    }

    const textAssetPath = book.getLanguagePath(numVal, langCode);

    if (textAssetPath && !window.LOADED_SCRIPTS[textAssetPath]) {
        const langScript = document.createElement('script');
        langScript.src = textAssetPath;
        langScript.onload = () => {
            window.LOADED_SCRIPTS[textAssetPath] = true;
            if (typeof window.mergeLanguageTexts === 'function') {
                window.mergeLanguageTexts(langCode);
            }
            if (callback) callback();
        };
        langScript.onerror = () => {
            console.error(`Failed to load language layer: ${textAssetPath}`);
            if (callback) callback();
        };
        document.head.appendChild(langScript);
    } else {
        if (callback) callback();
    }
}

window.CONFIG = CONFIG;
window.loadMarkerOnDemand = loadMarkerOnDemand;
