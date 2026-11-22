window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_te = {
        'PTM.0.1.steps': {
            1: "తిరుక్కోట్టియూర్ నమ్పి అరుళిచ్ చెయ్త: కలయామి కలి త్వమ్సమ్ * కవిమ్ లోక తివాకరమ్ * యస్య కోపి: ప్రకాచాపి * రావిత్యమ్ నిహతమ్ తమ: ",
            2: "ఎమ్పెరుమానార్ అరుళిచ్ చెయ్త: వాೞి పరకాలన్ వాೞి కలికన్ఱి * వాೞి కుఱైయలూర్ వాೞ్ వేన్తన్ * వాೞియరో మాయోనై వాళ్ వలియాల్ మన్తిరఙ్కొళ్ మఙ్కైయర్ కోన్ * తూయోన్ చుటర్మాన వేల్",
            3: "ఆೞ్వాన్ అరుళిచ్ చెయ్త: నెఞ్చుక్కిరుళ్ కటి తీపమ్ అటఙ్కా నెటుమ్పిఱవి * నఞ్చుక్కు నల్లవముతమ్ * తమిೞ్ నన్నూల్ తుఱైకళ్ * అఞ్చుక్కు ఇలక్కియమ్ ఆరణచారమ్ * పరచమయప్ పఞ్చుక్ కనలిన్ పెాఱి * పరకాలన్ పనువల్కళే",
            4: "ఎమ్పార్ అరుళిచ్ చెయ్త: ఎఙ్కళ్ కతియే! ఇరామానుచ మునియే! * చఙ్కై కెటుత్తాణ్ట తవరాచా! *  పొఙ్కు పుకೞ్ మఙ్కైయర్ కోనీన్త మఱై ఆయిరమనైత్తుమ్ * తఙ్కు మనమ్ నీయెనక్కుత్ తా"
        }
    };
    // Non-destructive runtime merging engine
    for (const key in text_bundle_te) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_te[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['te'] = text_bundle_te[key][p];
        }
    }
};
