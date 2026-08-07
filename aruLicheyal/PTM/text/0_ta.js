window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_ta = {
        'PTM.0.1.steps': {
            1: "திருக்கோட்டியூர் நம்பி அருளிச் செய்த: கலயாமி கலி த்வம்ஸம் * கவிம் லோக திவாகரம் * யஸ்ய கோபி: ப்ரகாசாபி * ராவித்யம் நிஹதம் தம: ",
            2: "எம்பெருமானார் அருளிச் செய்த: வாழி பரகாலன் வாழி கலிகன்றி * வாழி குறையலூர் வாழ் வேந்தன் * வாழியரோ மாயோனை வாள் வலியால் மந்திரங்கொள் மங்கையர் கோன் * தூயோன் சுடர்மான வேல்",
            3: "ஆழ்வான் அருளிச் செய்த: நெஞ்சுக்கிருள் கடி தீபம் அடங்கா நெடும்பிறவி * நஞ்சுக்கு நல்லவமுதம் * தமிழ் நன்னூல் துறைகள் * அஞ்சுக்கு இலக்கியம் ஆரணசாரம் * பரசமயப் பஞ்சுக் கனலின் பொறி * பரகாலன் பனுவல்களே",
            4: "எம்பார் அருளிச் செய்த: எங்கள் கதியே! இராமானுச முனியே! * சங்கை கெடுத்தாண்ட தவராசா! *  பொங்கு புகழ் மங்கையர் கோனீந்த மறை ஆயிரமனைத்தும் * தங்கு மனம் நீயெனக்குத் தா"
        }
    };
    // Non-destructive runtime merging engine
    for (const key in text_bundle_ta) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_ta[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['ta'] = text_bundle_ta[key][p];
        }
    }
};
