window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'KCT.0.steps': {
            1: "அவிதித விஷயாந்தர: சடாரேர் * உபநிஷதாம் உபகாநமாத்ர போக: *** அபி ச குநவசாத் ததேக சேஷீ * மதுரகவி ஹ்ருதயே மமாவிரஸ்து *",
            2: "வேறொன்றும் நான் அறியேன் * வேதம் தமிழ் செய்த * மாறன் சடகோபன் வண்குருகூர் ஏறு *** எங்கள் வாழ்வாம் என்றேத்தும் * மதுரகவியார் எம்மை ஆள்வார் * அவரே அரண் *"
        },
        'KCT.1.steps': {
        },
    };

    // Non-destructive runtime merging engine
    for (const key in text_bundle_en) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_en[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['ta'] = text_bundle_en[key][p];
        }
    }
};



