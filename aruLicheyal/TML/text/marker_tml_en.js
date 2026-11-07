window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TML.0.steps': {
            1: "maRRonRum vENDA manamE! madhiL aranggar * kaRRinam mEyththa kazhaliNaik kIzh * uRRa thirumAlaip pADum sIrth thoNDaraDippoDi emperumAnai * eppozhudhum pEsu  "
        },
        'TML.1.steps': {
            1: "🙏 kAvalil pulanai vaiththuk * kali thannaik kaDakkap pAyndhu * nAvaliTTu uzhi tharuginROm * naman thamar thalaigaL mIdhE *** mUvulagu uNDu umizhndha * mudhalva! nin nAmam kaRRa * Avalippu uDaimai kaNDAy * aranggamA nagaruLAnE!",
            2: "🙏 pachchai mAmalai pOl mEni * pavaLa vAy kamalach chengkaN * achchudhA! amarar ERE! * Ayar tham kozhundhE! ennum *** ichchuvai thavira yAn pOy * indhira lOgam ALum * achchuvai peRinum vENDEn * aranggamA nagaruLAnE!",
            3: "vEdha nUl pirAyam nURu * manisar thAm puguvarElum * pAdhiyum uRanggip pOgum * ninRa ippadhinai ANDu *** pEdhai pAlagan adhAgum * piNi pasi mUpputh thunbam * AdhalAl piRavi vENDEn * aranggamA nagaruLAnE!",
            4: "moyththa valvinaiyuL ninRu * mUnRezhuththu uDaiya pErAl * kaththirabanthum anRE * parAnggadhi kaNDu koNDAn *** iththanai aDiyar AnArkku * iranggum nam arangganAya * piththanaip peRRum andhO! * piRaviyuL piNanggumARE!",
            5: "peNDirAl suganggaL uyppAn * periyadhOr iDumbai pUNDu * uNDirAk kiDakkum pOdhum * uDalukkE karaindhu naindhu *** thaNthuzhAy mAlai mArban * thamargaLAyp pADi ADi * thoNDu pUNDu amudham uNNAth * thozhumbar sORu ugakkumARE!",
            6: "maRam suvar madhiL eDuththu * maRumaikkE veRumai pUNDu * puRam suvar OTTai mADam * puraLum pOdhu aRiya mATTIr *** aRam suvarAgi ninRa * arangganArkku ATcheyyAdhE * puRam suvar kOlam seydhu * puL kauvak kiDakkinRIrE!",
            7: "pulai aRamAgi ninRa * puththoDu samaNam ellAm * kalai aRak kaRRa mAndhar * kANbarO kETparO thAm *** thalai aRuppuNDum sAgEn * saththiyam kANmin aiyA! * silaiyinAl ilanggai seRRa * dhEvanE dhEvan AvAn",
            8: "veRuppoDu samaNar muNDar * vidhi il sAkkiyargaL * nin pAl poRuppu ariyanagaL pEsil * pOvadhE nOy adhAgi *** kuRippu enakku aDaiyumAgil * kUDumEl thalaiyai * AnggE aRuppadhE karumam kaNDAy * aranggamA nagaruLAnE!",
            9: "maRRum Or dheyvam uNDE * madhi ilA mAniDanggAL * uRRa pOdhu anRi nInggaL * oruvan enRu uNara mATTIr *** aRRamEl onRu aRIyIr * avan allAl dheyvam illai * kaRRinam mEyththa endhai * kazhaliNai paNimin nIrE",
            10: "nATTinAn dheyvam enggum * nalladhOr aruL thannAlE * kATTinAn thiruvaranggam * uybavarkku uyyum vaNNam *** kETTirE nambimIrgAL! * keruDa vAgananum niRka * sETTai than maDiyagaththuch * chelvam pArththu irukkinRIrE",
            11: "oru villAl Onggu munnIr aDaiththu * ulaganggaL uyya * seruvilE arakkar kOnaich * cheRRa nam sEvaganAr *** maruviya periya kOyil * madhiL thiruvaranggam ennA * karuvilE thiruvilAdhIr! * kAlaththaik kazhikkinRIrE",
            12: "namanum muRkalanum pEsa * naragil ninRArgaL kETka * naragamE suvarkkam Agum * nAmanggaL uDaiya nambi *** avanadhu Ur aranggam ennAdhu * ayarththu vIzhndhu aLiya mAndhar * kavalaiyuL paDuginRAr enRu * adhanukkE kavalginREnE!",
            13: "eRiyu nIr veRi koL vElai * mAnilaththu uyirgaL ellAm * veRi koL pUnthuLava mAlai * viNNavar kOnai Eththa *** aRivilA manisar ellAm * aranggam enRu azhaipparAgil * poRiyil vAzh naragam ellAm * pul ezhundhu ozhiyumanRE",
            14: "🙏 vaNDinam muralum sOlai * mayilinam Alum sOlai * koNDal mIdhu aNavum sOlai * kuyilinam kUvum sOlai *** aNDar kOn amarum sOlai * aNi thiruvaranggam ennA * miNDar pAyndhu uNNum sORRai vilakki * nAykku iDuminIrE",
            15: "meyyarkkE meyyanAgum * vidhi ilA ennaip pOla * poyyarkkE poyyanAgum * puTkoDi uDaiya kOmAn *** uyyap pOm uNarvinArgaTku * oruvan enRu uNarndha pinnai * aiyappADu aRuththuth thOnRum * azhaganUr aranggam anRE",
            16: "sUdhanAyk kaLvanAgith * thUrththarODu isaindha kAlam * mAdharAr kayaRkaN ennum * valaiyuL paTTu azhundhuvEnai *** pOdharE enRu sollip * pundhiyil pugundhu * than pAl Adharam peruga vaiththa * azhaganUr aranggam anRE",
            17: "virumbi ninRu Eththa mATTEn * vidhiyilEn madhi onRillai * irumbu pOl valiya nenjcham * iRai iRai urugum vaNNam *** surumbamar sOlai sUzhndha * aranggamA kOyil koNDa * karumbinaik kaNDu koNDu * en kaNNiNai kaLikkumARE!",
            18: "inidhu iraith thivalai mOdha * eRiyum thaNparavai mIdhE * thani kiDandhu arasu seyyum * thAmaraik kaNNan emmAn *** kani irundhu anaiya sevvAyk * kaNNaNaik kaNDa kaNgaL * pani arumbu udhirumAlO! * en seygEn pAviyEnE!",
            19: "🙏 kuDa thisai muDiyai vaiththuk * guNa thisai pAdham nITTi * vaDa thisai pinbu kATTith * then thisai ilanggai nOkki *** kaDal niRak kaDavuL endhai * aravaNaith thuyilumA kaNDu * uDal enakku urugumAlO! * en seygEn? ulagaththIrE!",
            20: "pAyu nIr aranggam thannuL * pAmbaNaip paLLi koNDa * mAyanAr thiru nanmArvum * maragadha uruvum thOLum *** thUya thAmaraik kaNgaLum * thuvaridhazhp pavaLa vAyum * Aya sIr muDiyum thEsum * aDiyarOrkku agalalAmE?",
            21: "paNivinAl manamadhu onRip * pavaLa vAy arangganArkku * thuNivinAl vAzha mATTAth * thollai nenjchE! nI sollAy *** aNiyinAr semponAya * aruvarai anaiya kOyil * maNiyanAr kiDantha ARRai * manaththinAl ninaikkalAmE?",
            22: "pEsiRRE pEsal allAl * perumai onRu uNaral AgAdhu * AsaRRAr thanggaTku allAl * aRiyal AvAnum allan *** mAsaRRAr manaththuLAnai * vaNanggi nAm iruppadhu allAl * pEsath thAn AvadhuNDO? * pEdhai nenjchE! nI sollAy",
            23: "ganggaiyil punidham Aya * kAviri naDuvu pATTu * ponggu nIr parandhu pAyum * pUmpozhil aranggam thannuL *** enggaL mAl iRaivan Isan * kiDandhadhOr kiDakkai kaNDum * engnganam maRandhu vAzhgEn? * EzhaiyEn EzhaiyEnE",
            24: "veLLa nIr parandhu pAyum * viri pozhil aranggam thannuL * kaLvanAr kiDandha ARum * kamala nanmugamum kaNDu *** uLLamE! valiyai pOlum * oruvan enRu uNara mATTAy * kaLLamE kAdhal seydhu * un kaLLaththE kazhikkinRAyE",
            25: "kuLiththu mUnRu analai Ombum * kuRikoL anthaNamai thannai * oLiththiTTEn enkaN illai * ninkaNum paththan allEn *** kaLippadhu en koNDu? nambi! * kaDal vaNNA! kadhaRuginREn * aLiththu enakku aruL sey kaNDAy * aranggamA nagaruLAnE!",
            26: "pOdhu ellAm pOdhu koNDu * un ponnaDi punaiya mATTEn * thIdhilA mozhigaL koNDu * un thirukkuNam seppa mATTEn *** kAdhalAl nenjcham anbu * kalandhilEn adhu thannAlE * EdhilEn aranggarkku ellE! * en seyvAn thOnRinEnE?",
            27: "kuranggugaL malaiyai nUkkak * kuLiththuth thAm puraNDiTTu ODi * tharangga nIr aDaikkal uRRa * salamilA aNilum pOlEn *** maranggaL pOl valiya nenjcham * vanjchanEn nenjchu thannAl * arangganArkku ATcheyyAdhE * aLiyaththEn ayarkkinREnE",
            28: "umbarAl aRiyalAgA * oLiyuLAr AnaikkAgi * sempulAl uNDu vAzhum * mudhalai mEl sIRi vandhAr *** nam param Ayadhu uNDE? * nAygaLOm siRumai OrA * empirARku ATcheyyAdhE * en seyvAn thOnRinEnE?",
            29: "UrilEn kANi illai * uRavu maRRoruvar illai * pAril nin pAdha mUlam * paRRilEn parama mUrththi! *** kAroLi vaNNanE! * kaNNanE! kadhaRuginREn * AruLar kaLaikaN? ammA! * aranggamA nagaruLAnE!",
            30: "manaththilOr thUymai illai * vAyilOr insol illai * sinaththinAl seRRam nOkkith * thI viLi viLivan vALA *** punaththuzhAy mAlaiyAnE! * ponni sUzh thiruvaranggA! * enakku inik kathi en sollAy? * ennai ALuDaiya kOvE!",
            31: "thavaththuLAr thammil allEn * dhanam paDaththAril allEn * uvarththa nIr pOla * endhan uRRavarkku onRum allEn *** thuvarththa sevvAyinArkkE * thuvakkaRath thurisanAnEn * avaththamE piRavi thandhAy * aranggamA nagaruLAnE!",
            32: "Arththu vaNDalambum sOlai * aNi thiruvaranggam thannuL * kArth thiraL anaiya mEnik * kaNNanE! unnaik kANum *** mArkkam onRu aRiya mATTA * manisaril thurisanAya * mUrkkanEn vandhu ninREn * * mUrkkanEn mUrkkanEnE",
            33: "mey ellAm pOga viTTu * viri kuzhalAril paTTu * poy ellAm podhindhu koNDa * pOzhkkanEn vandhu ninREn *** aiyanE! arangganE! * un aruL ennum Asai thannAl * poyyanEn vandhu ninREn * poyyanEn poyyanEnE",
            34: "uLLaththE uRaiyum mAlai * uLLuvAn uNarvu onRillA * kaLLaththEn nAnum thoNDAyth * thoNDukkE kOlam pUNDu *** uLLuvAr uLLiRRellAm * uDan irundhu aRidhi enRu * veLgip pOy ennuLLE nAn * vilavaRach siriththiTTEnE",
            35: "thAvi anRu ulagam ellAm * thalai viLAk koNDa endhAy! * sEviyEn unnai allAl * sikkenach chengkaN mAlE! *** AviyE! amudhE! * endhan Aruyir anaiya endhAy! * pAviyEn unnai allAl * pAviyEn pAviyEnE",
            36: "mazhaikku anRu varai mun Endhum * maindhanE! madhura ARE! * uzhaik kanRE pOla nOkkam * uDaiyavar valaiyuL paTTu *** uzhaikkinRERku ennai nOkkAdhu ozhivadhE! * unnai anRE azhaikkinREn * AdhimUrththi! * aranggamA nagaruLAnE!",
            37: "theLivilAk kalanggal nIr sUzh * thiruvaranggaththuL Onggum * oLiyuLAr thAmE anRE * thandhaiyum thAyum AvAr *** eLiyadhOr aruLum anRE * en thiRaththu empirAnAr * aLiyan nam paiyal ennAr * ammavO! koDiyavARE!",
            38: "🙏 mEmporuL pOga viTTu * meymmaiyai miga uNarndhu * Am parisu aRindhu koNDu * aimpulan agaththaDakki *** kAmbaRath thalai siraiththu * un kaDaiththalai irundhu vAzhum * sOmbarai ugaththi pOlum * sUzh punal aranggaththAnE!",
            39: "aDimaiyil kuDimai illA * ayal sadhuppEdhimAril * kuDimaiyil kaDaimai paTTa * kukkaril piRapparElum *** muDiyinil thuLabam vaiththAy! * moykazhaRku anbu seyyum * aDiyarai ugaththi pOlum * aranggamA nagaruLAnE!",
            40: "thiru maRu mArva! ninnaich * sindhaiyuL thigazha vaiththu * maruviya manaththarAgil * mAnilaththu uyirgaL ellAm *** veruvuRak konRu suTTiTTu * ITTiya vinaiyarElum * aruvinaip payanadhu uyyAr * aranggamA nagaruLAnE!",
            41: "vAnuLAr aRiyalAgA * vAnavA enbarAgil * thEnulAm thuLaba mAlaich * senniyAy! enbarAgil *** Unam AyinagaL seyyum * Una kAragargaLElum * pOnagam seydha sEDam * tharuvarEl punidham anRE",
            42: "pazhudhilA ozhugal ARRup * pala sadhuppEdhimArgaL! * izhi kulaththavargaLElum * em aDiyArgaLAgil *** thozhuminIr koDumin koNmin * enRu ninnODum okka * vazhipaDa aruLinAy pOl * madhiL thiruvaranggaththAnE!",
            43: "amara Or anggam ARum * vEdham Or nAnkum Odhi * thamargaLil thalaivarAya * sAdhi anthaNargaLElum *** numargaLaip pazhipparAgil * noDippadhOr aLavil * AnggE avargaL thAm pulaiyar pOlum * aranggamA nagaruLAnE!",
            44: "🙏 peNNulAm saDaiyinAnum * piramanum unnaik kANbAn * eNNilA Uzhi Uzhi * thavam seydhAr veLgi niRpa *** viNNuLAr viyappa vandhu * Anaikku anRu aruLai Indha kaNNaRA!(y) * unnai ennO? * kaLaikaNAk karudhumARE",
            45: "🙏 vaLavezhum thavaLa mADa * madhurai mAnagaram thannuL * kavaLa mAl yAnai konRa * kaNNanai arangga mAlai *** thuLavath thoNDAya thol sIrth * thoNDaraDippoDi sol * iLaiya punkavidhaiyElum * empirARku iniyavARE",
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



