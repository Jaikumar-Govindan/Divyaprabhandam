window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {

        'TKT.0.steps': {
        },

        'TKT.1.steps': {
            1: "🙏 nidhiyinaip pavaLath thUNai * neRimaiyAl ninaiya vallAr * kadhiyinaik kanjchan mALak * kaNDu mun aNDam ALum *** madhiyinai mAlai vAzhththi * vaNanggi en manaththu vandha * vidhiyinaik kaNDu koNDa * thoNDanEn viDugilEnE",
            2: "kARRinaip punalaith thIyaik * kaDi madhiL ilanggai seRRa ERRinai * imayam mEya * ezhil maNith thiraLai *** inba ARRinai amudham thannai * avuNan Ar uyirai uNDa kURRinai * guNam koNDu uLLam! * kURu nI kURumARE",
            3: "pAy irum paravai thannuL * paruvarai thiriththu * vAnOrk kAy irundhu amudham koNDa * appanai empirAnai *** vEy irunjchOlai sUzhndhu * viri kadhir iriya ninRa * mAyirunjchOlai mEya * maindhanai vaNangginEnE",
            4: "kETka yAn uRRadhuNDu * kEzhalAy ulagam koNDa * pUk kezhu vaNNanAraip * pOdharak kanavil kaNDu *** vAkkinAl karumam thannAl * manaththinAl siraththai thannAl * vETkai mIdhUra vAnggi * vizhungginERku iniyavARE",
            5: "irumbu ananRuNDa nIr pOl * emperumAnukku * endhan arum peRal anbu pukkiTTu * aDimai pUNDu uyndhu pOnEn *** varum puyal vaNNanArai * maruvi en manaththu vaiththu * karumbin insARu pOlap * paruginERku iniyavARE",
            6: "mUvaril mudhalvanAya * oruvanai ulagam koNDa * kOvinaik kuDandhai mEya * kurumaNith thiraLai *** inbap pAvinaip pachchaith thEnaip * paimponnai amarar sennip pUvinai * pugazhum thoNDar * en sollip pugazhvar thAmE?",
            7: "immaiyai maRumai thannai * emakku vIDAgi ninRa * meymmaiyai virindha sOlai * viyan thiruvaranggam mEya *** semmaiyaik karumai thannaith * thirumalai orumaiyAnai * thanmaiyai ninaivAr endhan * thalai misai mannuvArE",
            8: "vAniDaip puyalai mAlai * varai iDaip pirasam InRa * thEn iDaik karumbin sARRaith * thiruvinai maruvi vAzhAr *** mAniDap piRavi andhO! * madhikkilar koLga * thandham UniDaik kurambai vAzhkkaikku * uRudhiyE vENDinArE",
            9: "uLLamO onRi nillAdhu * Osaiyin eri ninRu uNNum * koLLi mEl eRumbu pOlak * kuzhaiyumAl endhan uLLam *** theLLiyIr! dhEvarkkellAm * dhEvarAy ulagam koNDa * oLLiyIr! ummai allAl * ezhumaiyum thuNai ilOmE",
            10: "chiththamum sevvai nillAdhu * en seygEn thI vinaiyEn? * paththimaikku anbuDaiyEn AvadhE? * paNiyAy endhAy! *** muththoLi maragadhamE! * muzhanggoLi mugil vaNNA! * en aththa! nin aDimai allAl * yAdhum onRu aRigilEnE",
            11: "thoNDellAm paravi ninnaith * thozhudhu aDi paNiyumARu kaNDu * thAn kavalai thIrppAn AvadhE? * paNiyAy endhAy! *** aNDamAy eNthisaikkum * AdhiyAy! nIdhi Ana * paNDamAm parama sOdhi! * ninnaiyE paravuvEnE",
            12: "Aviyai arangga mAlai * azhukkuDambu echchil vAyAl * thUymaiyil thoNDanEn nAn * sollinEn thollai nAmam *** pAviyEn pizhaiththa ARenRu * anjchinERku anjchal enRu * kAvi pOl vaNNar vandhu * en kaNNuLE thOnRinArE",
            13: "irumbu ananRuNDa nIrum * pOdharum koLga * endhan arum piNi pAvam ellAm * aganRana ennai viTTu *** surumbamar sOlai sUzhndha * arangga mA kOyil koNDa * karumbinaik kaNDu koNDu * en kaNNiNai kaLikkumARE!",
            14: "kAviyai venRa kaNNAr * kalaviyE karudhi * nALum pAviyEn Aga eNNi * adhanuLLE pazhuththozhindhEn *** thUvi sEr annam mannum * sUzh punal kuDandhaiyAnai * pAviyEn pAviyAdhu * pAviyEn AyinEnE",
            15: "mun polA irAvaNan than * mudhu madhiL ilanggai vEviththu * anbinAl anuman vandhu * Anggu aDiyiNai paNiya ninRArkku *** enbelAm urugi ukkiTTu * ennuDai nenjcham ennum * anbinAl njAna nIr koNDu * ATTuvan aDiyanEnE",
            16: "mAya mAn mAyach cheRRu * marudhiRa naDandhu * vaiyam thAya mA paravai ponggath * thaDavarai thiriththu * vAnOrkku Iyu mAl empirAnArkku * ennuDaich choRkaL ennum * thUya mA mAlai koNDu * sUTTuvan thoNDanEnE",
            17: "pEsinAr piRavi nIththAr * pEr uLAn perumai pEsi * EsinAr uyndhu pOnAr * enbadhu ivvulagin vaNNam *** pEsinEn Esa mATTEn * pEdhaiyEn piRavi nIththaRku * AsaiyO peridhu koLga * alai kaDal vaNNar pAlE",
            18: "iLaippinai iyakkam nIkki * irundhu mun imaiyaik kUTTi * aLappil aimpulan aDakki * anbu avar kaNNE vaiththu *** thuLakkamil sindhai seydhu * thOnRalum suDar viTTu * AnggE viLakkinai vidhiyin kANbAr * meymmaiyE kANgiRpArE",
            19: "🙏 piNDiyAr maNDai Endhip * piRar manai thiridhandhu uNNum * muNDiyAn sAbam thIrththa * oruvan Ur *** ulagam Eththum kaNDiyUr aranggam meyyam * kachchi pEr mallai enRu maNDinAr * uyyal allAl * maRRaiyArkku uyyalAmE?",
            20: "🙏 vAnavar thanggaL kOnum * malar misai ayanum * nALum thEmalar thUvi Eththum * sEvaDich sengkaN mAlai *** mAna vEl kaliyan sonna * vaNthamizh mAlai nAlaindhum * Unam adhinRi vallAr * oLi visumbu ALvar thAmE",
        }
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