window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PAT.1.1.steps':
        {
            1: "vaNNa mAdangaL sUzh * thirukkOttiyUr * kaNNan kEsavan * nambi piRandhinil *** eNNey suNNam * edhir edhir thUvidak * kaNNan muRRam * kalandhu aLaRAyiRRE. *",
            2: "OduvAr vizhuvAr * ugandhAlippAr * nAduvAr nambirAn * enguththAn enbAr * pAduvArgaLum * palpaRai kotta ninRu * AduvArgaLum * AyiRRu AyppAdiyE *",
            3: "pENich chIrudaip * piLLai piRandhinil * kANath thAm puguvAr * pukkup pOdhuvAr * ANoppAr * ivan nErillai kAN * thiru vONaththAn * ulagALum enbArgaLE. *",
            4: "uRiyai muRRaththu * urutti ninRu AduvAr * naRuney pAl thayir * nanRAgath thUvuvAr * seRimen kUndhal * avizhath thiLaiththu * engum aRivazhindhanar * AyppAdi AyarE *",
            5: "koNda thAL uRi * kOlak kodu mazhu * thaNdinar * paRiyOlaich chayanaththar * viNda mullai * arumbanna pallinar * aNdar miNdip * pugundhu neyyAdinAr. *",
            6: "kaiyum kAlum nimirththuk * kadAra nIr * paiya vAttip * pasunjiRu manjaLAl * aiya nA vazhiththALukku * angAndhida * vaiyam Ezhum kaNdAL * piLLai vAyuLE *",
            7: "vAyuL vaiyagam * kaNda mada nallAr * Ayar puththiran allan * arundheyvam * pAya sIrudaip * paNbudaip pAlagan * mAyan enRu * magizhndhanar mAdharE *",
            8: "paththu nALum kadandha * iraNdA nAL * eththisaiyum * sayamaram kOdiththu * maththa mAmalai * thAngiya maindhanai * uththAnam seythu * ugandhanar AyarE *",
            9: "kidakkil thottil * kizhiya udhaiththidum * eduththuk koLLil * marungai iRuththidum * odukkip pulgil * udharaththE pAyndhidum * midukkilAmaiyAl * nAn melindhEn nangAy! *",
            10: "** sennelAr vayal sUzh * thirukkOttiyUr * mannu nAraNan * nambi piRandhamai * minnu nUl * vittuchiththan viriththa * ip pannu pAdal vallArkku * illai pAvamE. *",
        },
    };
    for (const key in text_bundle_en) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_en[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['en'] = text_bundle_en[key][p];
        }
    }
};
