window.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.9.1.steps': {
        },
        'TVM.9.2.steps': {
        },
        'TVM.9.3.steps': {
        },
        'TVM.9.4.steps': {
        },
        'TVM.9.5.steps': {
        },
        'TVM.9.6.steps': {
        },
        'TVM.9.7.steps': {
        },
        'TVM.9.8.steps': {
        },
        'TVM.9.9.steps': {
        },
        'TVM.9.10.steps': {
        },
    };
    // Non-destructive runtime merging engine
    for (const key in text_bundle_ta) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_ta[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['en'] = text_bundle_en[key][p];
        }
    }
};