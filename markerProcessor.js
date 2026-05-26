/**
 * markerProcessor.js
 * Logic for handling contiguous and non-contiguous audio segments.
 */

const MarkerProcessor = {
    /**
     * Calculates the start and end time for a specific index in a marker array.
     * @param {Array} markerArray - The array from window.MARKER_DATABASE
     * @param {number} index - The zero-based index of the suthram/pasuram
     * @returns {Object|null} - {start, end} or null if not found
     */
    getSegmentBounds: function(markerArray, index) {
        if (!markerArray || markerArray[index] === undefined) {
            return null;
        }

        const current = markerArray[index];
        let start, end;

        if (typeof current === 'object' && current !== null) {
            // Case 1: Explicit bounds provided to skip unnecessary segments
            start = current.start;
            end = current.end;
        } else {
            // Case 2: Contiguous segment (starts where previous left off)
            if (index === 0) {
                start = 0;
            } else {
                const previous = markerArray[index - 1];
                start = (typeof previous === 'object' && previous !== null) 
                    ? previous.end 
                    : previous;
            }
            end = current;
        }

        return { start, end };
    }
};

// Export for use in browser environment
window.MarkerProcessor = MarkerProcessor;
