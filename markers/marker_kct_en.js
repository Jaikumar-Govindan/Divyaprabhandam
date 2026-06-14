window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'KCT.0.steps': {
            1: "avidhitha vishayAnthara: satArEr * upanishadhAm upagAnamAthra bhOga: *** api cha guNavasAth thadhEka sEshI * madhurakavi hrudhayE mamAvirasthu *",
            2: "vERonRum nAn aRiyEn vEdham thamizh cheytha * mARan satakOpan vaNkurukUr ERu *** engaL vAzhvAm enREththum madhurakaviyAr * emmai ALwAr avarE araN *"
        },
        'KCT.1.steps': {
            1: "* kaNNinuN siRuththAmbinAl * kattuNNap paNNiya peru mAyan * en appanil *** naNNith thenkurugUr * nambi enRakkAl * aNNikkum amudhURum * en nAvukkE *",
            2: "nAvinAl naviRRu * inbam eydhinEn * mEvinEn * avan ponnadi meymmaiyE *** dhEvu maRRaRiyEn * kurugUr nambi * pAvin innisai * pAdith thirivanE *",
            3: "thiridhandhAgilum * dhEva pirAnudai * kariya kOlath * thiru uruk kANban nAn *** periya vaNkurugUr * nagar nambikku AL uriyanAy * adiyEn peRRa nanmaiyE *",
            4: "nanmaiyAl mikka * nAnmaRaiyALargaL * punmaiyAgak * karudhuvar Adhalin *** annaiyAy aththanAy * ennai ANdidum thanmaiyAn * sadagOpan en nambiyE *",
            5: "nambinEn * piRar nanporuL thannaiyum * nambinEn * madavAraiyum munnelAm *** sempon mAdath * thirukkurugUr nambikku anbanAy * adiyEn sadhirththEn inRE *",
            6: "inRu thottum * ezhumaiyum empirAn * ninRu than pugazh * Eththa aruLinAn *** kunRa mAdath * thirukkugUr nambi * enRum ennai * igazhvilan kANminE *",
            7: "kaNdu koNdennaik * kAri mARap pirAn * paNdai valvinai * pARRi aruLinAn *** eN thisaiyum * aRiya iyambu oN thamizh * sadagOpan aruLaiyE *",
            8: "aruL koNdAdum * adiyavar inbuRa * aruLinAn * avvarumaRaiyin poruL *** aruL koNdu * Ayiram inthamizh pAdinAn * aruL kaNdIr * ivvulaginil mikkadhE *",
            9: "mikka vEdhiyar * vEdhaththin utporuL * niRkap pAdi * en nenjchuL niRuththinAn *** thakka sIrch * sadagOpan en nambikku * AL pukka kAdhal * adimaip payan anRE *",
            10: "* payan anRAgilum * pAngkallar Agilum * seyal nanRAgath * thiruththip paNi koLvAn *** kuyil ninRAr pozhil sUzh * kurugUr nambi! * muyalginREn * undhan moykazhaRku anbaiyE *",
            11: "* anban thannai * adaindhavargatkellAm anban * thenkurugUr nagar nambikku *** anbanAy * madhurakavi sonna sol nambuvAr padhi * vaikundham kANminE *"
        },
    };

    // Non-destructive runtime merging engine
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



