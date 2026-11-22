window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_ka = {
        'PTM.0.1.steps': {
            1: "ತಿರುಕ್ಕೋಟ್ಟಿಯೂರ್ ನಮ್ಪಿ ಅರುಳಿಚ್ ಚೆಯ್ತ: ಕಲಯಾಮಿ ಕಲಿ ತ್ವಮ್ಸಮ್ * ಕವಿಮ್ ಲೋಕ ತಿವಾಕರಮ್ * ಯಸ್ಯ ಕೋಪಿ: ಪ್ರಕಾಚಾಪಿ * ರಾವಿತ್ಯಮ್ ನಿಹತಮ್ ತಮ: ",
            2: "ಎಮ್ಪೆರುಮಾನಾರ್ ಅರುಳಿಚ್ ಚೆಯ್ತ: ವಾಳಿ ಪರಕಾಲನ್ ವಾಳಿ ಕಲಿಕನ್ರಿ * ವಾಳಿ ಕುರೈಯಲೂರ್ ವಾಳ್ ವೇನ್ತನ್ * ವಾಳಿಯರೋ ಮಾಯೋನೈ ವಾಳ್ ವಲಿಯಾಲ್ ಮನ್ತಿರಙ್ಕೊಳ್ ಮಙ್ಕೈಯರ್ ಕೋನ್ * ತೂಯೋನ್ ಚುಟರ್ಮಾನ ವೇಲ್",
            3: "ಆಳ್ವಾನ್ ಅರುಳಿಚ್ ಚೆಯ್ತ: ನೆಞ್ಚುಕ್ಕಿರುಳ್ ಕಟಿ ತೀಪಮ್ ಅಟಙ್ಕಾ ನೆಟುಮ್ಪಿರವಿ * ನಞ್ಚುಕ್ಕು ನಲ್ಲವಮುತಮ್ * ತಮಿಳ್ ನನ್ನೂಲ್ ತುರೈಕಳ್ * ಅಞ್ಚುಕ್ಕು ಇಲಕ್ಕಿಯಮ್ ಆರಣಚಾರಮ್ * ಪರಚಮಯಪ್ ಪಞ್ಚುಕ್ ಕನಲಿನ್ ಪೆಾರಿ * ಪರಕಾಲನ್ ಪನುವಲ್ಕಳೇ",
            4: "ಎಮ್ಪಾರ್ ಅರುಳಿಚ್ ಚೆಯ್ತ: ಎಙ್ಕಳ್ ಕತಿಯೇ! ಇರಾಮಾನುಚ ಮುನಿಯೇ! * ಚಙ್ಕೈ ಕೆಟುತ್ತಾಣ್ಟ ತವರಾಚಾ! *  ಪೊಙ್ಕು ಪುಕಳ್ ಮಙ್ಕೈಯರ್ ಕೋನೀನ್ತ ಮರೈ ಆಯಿರಮನೈತ್ತುಮ್ * ತಙ್ಕು ಮನಮ್ ನೀಯೆನಕ್ಕುತ್ ತಾ"
        }
    };
    // Non-destructive runtime merging engine
    for (const key in text_bundle_ka) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_ka[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['ka'] = text_bundle_ka[key][p];
        }
    }
};
