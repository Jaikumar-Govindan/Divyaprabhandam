/**
 * navigation.js - Coordinate math and limits
 */
const Navigation = {
    /**
     * Parses the string input from the 'number' input box into coordinate components.
     * Handles flat single numbers (e.g. "12") for flat books like RN.
     */
    parseCoords: function (str, hasSub) {
        if (!str) return { ch: 1, sub: 1, pas: 1 };

        // FIX: Map strictly to numbers, preserving 0 where it's typed
        const parts = str.split('.').map(p => {
            const parsed = parseInt(p, 10);
            return isNaN(parsed) ? 1 : parsed;
        });



        if (hasSub) {
            // Format: Chapter.Subchapter.Pasuram (e.g. 1.2.3)
            return {
                ch: parts[0] || 1,
                sub: parts[1] || 1,
                pas: parts[2] || 1
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
     * Returns the total maximum pasuram limit for the current active section boundary.
     */
    getLimit: function (pre, ch, sub) {
        if (!window.MARKER_DATABASE) return 0;

        // 1. Construct the precise database lookup keys
        const subKey = `${pre}.${ch}.${sub}.steps`; // e.g., "TVM.1.1.steps"
        const chKey = `${pre}.${ch}.steps`;        // e.g., "PMT.1.steps"
        const flatKey = `${pre}.steps`;             // Fallback for flat books like "RN.steps"
        const directKey = pre;                      // Alternative fallback "RN"

        // 2. Resolve the active array from the database
        const dbArray = window.MARKER_DATABASE[subKey] ||
            window.MARKER_DATABASE[chKey] ||
            window.MARKER_DATABASE[flatKey] ||
            window.MARKER_DATABASE[directKey];

        // 3. Return the array length (total pasurams available for this segment)
        if (Array.isArray(dbArray)) {
            return dbArray.length;
        }

        // Fallback to config rules if marker data isn't loaded or structured as an array
        const c = CONFIG[pre];
        return c ? (c.defPas || 10) : 0;
    }
};
