window.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.6.1.steps': {
            1: "🙏 vaigal pUngkazhi vAy * vandhu mEyum kurugu inanggAL! * sey koL sennel uyar * thiruvaNvaNDUr uRaiyum *** kai koL chakkaraththu * en kani vAy perumAnaik kaNDu * kaigaL kUppich sollIr * vinaiyATTiyEn kAdhanmaiyE",
            2: "kAdhal men peDaiyODu * uDan mEyum karu nArAy! * vEdha vELvi oli muzhanggum * thaN thiruvaNvaNDUr *** nAdhan njAlam ellAm uNDa * namperumAnaik kaNDu * pAdham kai thozhudhu paNiyIr * aDiyEn thiRamE",
            3: "thiRanggaL Agi enggum * seygaLUDu uzhal puL inanggAL! * siRandha selvam malgu * thiruvaNvaNDUr uRaiyum *** kaRanggu chakkarak kaik * kani vAyp perumAnaik kaNDu * iRanggi nIr thozhudhu paNiyIr * aDiyEn iDarE",
            4: "iDaril bOgam mUzhgi * iNaindhADum maDa annanggAL! * viDalil vEdha oli muzhanggum * thaN thiruvaNvaNDUr *** kaDalin mEnip pirAn * kaNNaNai neDumAlaik kaNDu * uDalam naindhu oruththi * urugum enRu uNarththuminE",
            5: "uNarththal UDal uNarndhu * uDan mEyum maDa annanggAL! * thiNarththa vaNDalgaL mEl * sanggu sErum thiruvaNvaNDUr *** puNarththa pUnthaN thuzhAy muDi * nam perumAnaik kaNDu * puNarththa kaiyinarAy * aDiyEnukkum pORRuminE",
            6: "pORRi yAn irandhEn * punnai mEl uRai pUngkuyilgAL! * sERRil vALai thuLLum * thiruvaNvaNDUr uRaiyum *** ARRal Azhi angkai * amarar perumAnaik kaNDu * mARRam koNDu aruLIr * maiyal thIrvadhu oru vaNNamE",
            7: "oru vaNNam senRu pukku * enakku onRu urai oNkiLiyE! * seru oNpUmpozhil sUzh * sekkar vElaith thiruvaNvaNDUr *** karu vaNNam seyya vAy * seyya kaN seyya kai seyya kAl * seru oNchakkaram sanggu * aDaiyALam thirundhak kaNDE",
            8: "thirundhak kaNDu enakku onRu uraiyAy * oNsiRu pUvAy! * serundhi njAzhal magizh * punnai sUzh thaNthiruvaNvaNDUr *** perunthaN thAmaraik kaN * peru nIL muDi nAl thaDanthOL * karunthiN mA mugil pOl * thiru mEni aDigaLaiyE",
            9: "aDigaL kai thozhudhu * alar mEl asaiyum annanggAL! * viDivai sanggu olikkum * thiruvaNvaNDUr uRaiyum *** kaDiya mAyan thannaik * kaNNanai neDumAlaik kaNDu * koDiya valvinaiyEn * thiRam kURumin vERu koNDE",
            10: "vERu koNDu ummai yAn irandhEn * veRi vaNDu inanggAL! * thERu nIrp pambai * vaDapAlaith thiruvaNvaNDUr *** mARil pOr arakkan * madhiL nIRezhach seRRu ugandha * ERu sEvaganArkku * ennaiyum uLaL enmingaLE",
            11: "🙏 minkoL sEr purinUl kuRaLAy * agal njAlam koNDa * vankaLvan aDi mEl * kurugUrch saDakOpan sonna *** paNkoL AyiraththuL ivai paththum * thiruvaNvaNDUrkku * inkoL pADal vallAr * madhanar min iDaiyavarkkE",

        },
        'TVM.6.2.steps': {
        },
        'TVM.6.3.steps': {
        },
        'TVM.6.4.steps': {
        },
        'TVM.6.5.steps': {
        },
        'TVM.6.6.steps': {
        },
        'TVM.6.7.steps': {
        },
        'TVM.6.8.steps': {
        },
        'TVM.6.9.steps': {
        },
        'TVM.6.10.steps': {
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