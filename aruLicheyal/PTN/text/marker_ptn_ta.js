window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_ta = {

        'PTN.0.steps': {
            1: "ஸ்ரீமதே ராமானுஜாய நம:"
        },

        'PTN.1.steps': {
            1: "ஸ்ரீ மணவாள மாமுனிகள் தனியன் : ஸ்ரீஸைலேஸ தயாபாத்ரம் * தீபக்த்யாதி குணார்ணவம் * யதீந்த்ரப்ரவணம் வந்தே * ரம்யஜாமாதரம் முநிம்.",
            2: "ஸ்ரீ வேதாந்த தேசிகன் தனியன் : ராமானுஜ தயாபாத்ரம் * ஜ்ஞாநவைராக்ய பூஷணம் * ஸ்ரீமத் வேங்கடநாதார்யம் * வந்தே வேதாந்ததேஸிகம்.",
            3: "குருபரம்பரை தனியன் : லஷ்மீநாத ஸமாரம்பாம் * நாத யாமுந மத்யமாம் * அஸ்மதாசார்ய பர்யந்தாம் * வந்தே குருபரம்பராம்.",
            4: "எம்பெருமானார் தனியன் : யோ நித்யமச்யுதபதாம்புஜயுக்மருக்ம * வ்யாமோஹதஸ் ததிராணி த்ருணாய மேநே * அஸ்மத்குரோர் பகவதோsஸ்ய தயைகஸிந்தோ: * ராமா நுஜஸ்ய சரணௌ ஸரணம் ப்ரபத்யே.",
            5: "நம்மாழ்வார் தனியன் : மாதா பிதா யுவதயஸ் தநயா விபூதிஸ் * ஸர்வம் யதேவ நியமேந மதந்வயாநாம் * ஆத்யஸ்ய ந:குலபதேர் வகுளாபிராமம் * ஸ்ரீமத் ததங்க்ரியுகளம் ப்ரணமாமி மூர்த்நா.",
            6: "ஆழ்வார்கள் தனியன் : பூதம் ஸரஸ்ச மஹதாஹ்வய பட்டநாத * ஸ்ரீபக்திஸார குலஸேகர யோகிவாஹாந் * பக்தாங்க்ரிரேணு பரகால யதீந்த்ர மிஸ்ராந் * ஸ்ரீமத் பராங்குஸ முநிம் ப்ரணதோஸ்மி நித்யம்.",
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