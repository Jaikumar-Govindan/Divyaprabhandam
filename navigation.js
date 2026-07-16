/**
 * navigation.js - Coordinate math and limits with dynamic subchapter tracking
 */
const Navigation = {
    /**
     * Parses the string input from the 'number' input box into coordinate components.
     * Handles flat single numbers (e.g. "12") for flat books like RN.
     */
    parseCoords: function (str, hasSub) {
        if (!str) return { ch: 1, sub: 1, pas: 1 };

        // Map strictly to numbers, preserving 0 where it's typed
        const parts = str.split('.').map(p => {
            const parsed = parseInt(p, 10);
            return isNaN(parsed) ? 1 : parsed;
        });

        if (hasSub) {
            // Format: Chapter.Subchapter.Pasuram (e.g. 1.2.3)
            // FIX: Using typeof check instead of logical '||' to preserve typed '0'
            return {
                ch: (typeof parts[0] !== 'undefined') ? parts[0] : 1,
                sub: (typeof parts[1] !== 'undefined') ? parts[1] : 1,
                pas: (typeof parts[2] !== 'undefined') ? parts[2] : 1
            };
        } else {
            // Check if it's a flat single number format (e.g., "12" instead of "1.12")
            if (parts.length === 1) {
                return {
                    ch: 1,      // Default fallback chapter layout assignment
                    sub: 1,     // Default fallback subchapter layout assignment
                    pas: parts[0]
                };
            }

            // Format: Chapter.Pasuram (e.g. 0.1)
            // Explicit checks for index safety prevent logical short-circuits on 0 values
            return {
                ch: (typeof parts[0] !== 'undefined') ? parts[0] : 1,
                sub: 1,
                pas: (typeof parts[1] !== 'undefined') ? parts[1] : 1
            };
        }
    },

    /**
     * Returns the maximum number of chapters (centums) in a given book.
     */
    getChapterLimit: function (pre) {
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (c && typeof c.maxChapters !== 'undefined') {
            return c.maxChapters;
        }

        // Fallback: Scan DB for highest chapter index
        if (window.MARKER_DATABASE) {
            let maxCh = 1;
            const escapedPre = pre.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const pattern = new RegExp(`^${escapedPre}[._](\\d+)`, 'i');

            for (const key in window.MARKER_DATABASE) {
                const match = key.match(pattern);
                if (match) {
                    const chNum = parseInt(match[1], 10);
                    if (chNum > maxCh) maxCh = chNum;
                }
            }
            return maxCh;
        }
        return 10;
    },

    /**
     * Returns the maximum number of subchapters (decads) in a given chapter.
     * This dynamically handles chapters that only have 9 subchapters.
     */
    getSubLimit: function (pre, ch) {
        // 1. Prioritize explicit config exceptions if defined
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (c && c.subExceptions && typeof c.subExceptions[ch] !== 'undefined') {
            return c.subExceptions[ch];
        }

        // 2. Scan loaded database keys to find the actual maximum subchapter index
        if (window.MARKER_DATABASE) {
            let maxSub = 0;
            const escapedPre = pre.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            // Matches: pre.ch.sub.steps or pre_ch_sub_steps or pre.ch.sub
            const pattern = new RegExp(`^${escapedPre}[._]${ch}[._](\\d+)(?:[._]steps)?$`, 'i');

            for (const key in window.MARKER_DATABASE) {
                const match = key.match(pattern);
                if (match) {
                    const subNum = parseInt(match[1], 10);
                    if (subNum > maxSub) {
                        maxSub = subNum;
                    }
                }
            }
            if (maxSub > 0) {
                return maxSub;
            }
        }

        // 3. Fallback default
        return c ? (c.defSubs || 10) : 10;
    },

    /**
     * Resolve a loaded marker array for a section ("3" or "3.1"), if present.
     * Same keys historical getLimit used for chapter / sub-chapter blocks.
     */
    markerSectionArray: function (pre, sectionId) {
        if (!window.MARKER_DATABASE) return null;
        const parts = String(sectionId).split('.');
        const keysToTry = (parts.length >= 2)
            ? [
                `${pre}.${parts[0]}.${parts[1]}.steps`,
                `${pre}_${parts[0]}_${parts[1]}.steps`
            ]
            : [
                `${pre}.${parts[0]}.steps`,
                `${pre}_${parts[0]}.steps`
            ];

        for (const key of keysToTry) {
            for (const testKey of [key, key.toLowerCase(), key.toUpperCase()]) {
                const arr = window.MARKER_DATABASE[testKey];
                if (Array.isArray(arr) && arr.length > 0) return arr;
            }
        }
        return null;
    },

    /**
     * CONFIG-only count (defPas / ex). Used before markers load and for tooling.
     */
    configPasuramCount: function (pre, sectionId) {
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (!c) return 0;
        const ex = c.ex || {};
        const sid = String(sectionId);
        if (typeof ex[sid] !== 'undefined') return ex[sid];
        return c.defPas || 10;
    },

    /**
     * Pasuram count for a section. Prefer loaded marker array length (same as
     * pre-picker main navigate), else CONFIG. Pickers and getLimit share this
     * so auto-next cannot clamp away from a valid next verse.
     */
    sectionPasuramCount: function (pre, sectionId) {
        const markers = this.markerSectionArray(pre, sectionId);
        if (markers) return markers.length;
        return this.configPasuramCount(pre, sectionId);
    },

    /**
     * Lists all valid pasuram / taniyan options for a book from section limits.
     * Returns [{ value, label, group }, ...] for building the #number select.
     */
    listPasuramOptions: function (pre) {
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (!c) return [];

        const options = [];

        if (c.hasSub || c.structure === 'chapter_sub_pasuram') {
            const maxCh = c.maxCh || 10;
            const maxSub = c.maxSub || c.defSubs || 10;
            for (let ch = 1; ch <= maxCh; ch++) {
                for (let sub = 1; sub <= maxSub; sub++) {
                    const sectionId = `${ch}.${sub}`;
                    const n = this.sectionPasuramCount(pre, sectionId);
                    const group = sectionId;
                    for (let pas = 1; pas <= n; pas++) {
                        const value = `${ch}.${sub}.${pas}`;
                        options.push({ value, label: `Pasuram ${pas}`, group });
                    }
                }
            }
            return options;
        }

        const minCh = typeof c.minCh !== 'undefined' ? c.minCh : 0;
        const maxCh = typeof c.maxCh !== 'undefined' ? c.maxCh : 1;
        for (let ch = minCh; ch <= maxCh; ch++) {
            const n = this.sectionPasuramCount(pre, String(ch));
            const group = ch === 0 ? 'Taniyans' : `Chapter ${ch}`;
            for (let pas = 1; pas <= n; pas++) {
                const value = `${ch}.${pas}`;
                const label = ch === 0 ? `Taniyan ${pas}` : `Pasuram ${pas}`;
                options.push({ value, label, group });
            }
        }
        return options;
    },

    /**
     * Returns the total maximum pasuram limit for the current active section boundary.
     * Same source as sectionPasuramCount / pasuram pickers (markers when loaded, else CONFIG).
     */
    getLimit: function (pre, ch, sub) {
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (!c) return 0;

        if (c.structure === 'flat_pasuram') {
            return c.maxPas || c.defPas || 0;
        }

        if (c.hasSub || c.structure === 'chapter_sub_pasuram') {
            return this.sectionPasuramCount(pre, `${ch}.${sub}`);
        }

        return this.sectionPasuramCount(pre, String(ch));
    }
};

window.Navigation = Navigation;