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
     * Expected pasuram count for a section id ("0", "1", or "2.7") from CONFIG.ex / defPas.
     */
    sectionPasuramCount: function (pre, sectionId) {
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (!c) return 0;
        const ex = c.ex || {};
        const sid = String(sectionId);
        if (typeof ex[sid] !== 'undefined') return ex[sid];
        return c.defPas || 10;
    },

    /**
     * Lists all valid pasuram / taniyan options for a book from CONFIG limits.
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
     */
    getLimit: function (pre, ch, sub) {
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;

        // 1. Prioritize structural config exceptions (Thaniyan counts / sub-chapter ex)
        if (c && c.ex) {
            if (c.hasSub || c.structure === 'chapter_sub_pasuram') {
                const subKey = `${ch}.${sub}`;
                if (typeof c.ex[subKey] !== 'undefined') return c.ex[subKey];
            }
            if (typeof c.ex[ch] !== 'undefined') return c.ex[ch];
            if (typeof c.ex[String(ch)] !== 'undefined') return c.ex[String(ch)];
        }

        if (!window.MARKER_DATABASE) {
            return c ? (c.defPas || 10) : 0;
        }

        // 2. Construct a fallback list of separator variants (. vs _) and casing (upper/lower)
        // This ensures compatibility with both standard "TVM.3.2" and splitter-produced "tvm_3_2" keys.
        const keysToTry = [
            `${pre}.${ch}.${sub}.steps`,
            `${pre}_${ch}_${sub}.steps`,
            `${pre}.${ch}.steps`,
            `${pre}_${ch}.steps`,
            `${pre}.steps`,
            pre
        ];

        let dbArray = null;

        // 3. Resolve the active array from the database by checking all combinations
        for (const key of keysToTry) {
            const possibleKeys = [
                key,
                key.toLowerCase(),
                key.toUpperCase()
            ];

            for (const testKey of possibleKeys) {
                if (window.MARKER_DATABASE[testKey]) {
                    dbArray = window.MARKER_DATABASE[testKey];
                    break;
                }
            }
            if (dbArray) break;
        }

        // 4. Return the array length if it represents a dedicated sub-section/chapter array
        if (Array.isArray(dbArray)) {
            return dbArray.length;
        }

        // Fallback to config rules if marker data isn't loaded or structured as an array
        return c ? (c.defPas || 10) : 0;
    }
};

window.Navigation = Navigation;