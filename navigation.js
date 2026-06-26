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
     * Returns the total maximum pasuram limit for the current active section boundary.
     */
    getLimit: function (pre, ch, sub) {
        // 1. Prioritize structural config exceptions (like Thaniyan counts) first
        const c = typeof CONFIG !== 'undefined' ? CONFIG[pre] : null;
        if (c && c.ex && typeof c.ex[ch] !== 'undefined') {
            return c.ex[ch];
        }

        if (!window.MARKER_DATABASE) return 0;

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