window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'STMDL.0.steps':
        {
            1: "piLLai thirunaRaiyUr araiyar aruLich cheydhadhu: muLLich sezhumalarOr thArAn muLai madhiyam * koLLikku en uLLam kodhiyAmE * vaLLal thiruvALan sIrkkaliyan kArk kaliyai veTTi * maru vALan thandhAn maDal"
        },
        'STMDL.1.steps':
        {
            1: "🙏 kArAr varaik konggai kaNNAr kaDal uDukkai * sIrAr suDar chuTTi sengkaluzhip pEr ARRu * pEr Ara mArbin peru mA mazhaik kUndhal * nIr Ara vEli nila manggai ennum * ip pArOr solap paTTa mUnRanRE",
            2: "ammUnRum ArAyil thAnE aRam poruL inbam enRu * ArAr ivaRRin iDai adhanai eydhuvAr * sIrAr iru kalaiyum eydhuvar * sikkena maRRu ArAnum uNDenbAr enbadhu thAn adhuvum * orAmai anRE? ulagaththAr sollum sol * orAmai AmARu adhu uraikkEn kEL AmE * kArAr puravi Ezh pUNDa thani Azhi * thErAr niRai kadhirOn maNDalaththaik kINDu pukku * ArA amudham anggu eydhi",
            3: "adhil ninRum vArAdhu ozhivadhu onRuNDE? * adhu niRka ErAr muyal viTTuk kAkkaip pin pOvadhE? * ErAr iLa mulaiyIr en thanakku uRRadhu thAn * kArAr kuzhal eDuththuk kaTTi",
            4: "kadhir mulaiyai vArAra vIkki maNi mEgalai thiruththi * ArAr ayil vERkaN anjchanaththin nIRaNindhu * sIrAr sezhum pandhu koNDaDiyA ninREn nAn * nIrAr kamalam pOl sengkaN mAl enRoruvan * pArOrgaL ellAm magizhap paRai kaRangga * sIrAr kuDam iraNDEndhi",
            5: "sezhuntheruvE ArAr enach solli ADum adhu kaNDu * ErAr iLa mulaiyAr ennaiyarum ellArum * vArAyO enRArkkuch senREn en valvinaiyAl * kAr Ar maNi niRamum kai vaLaiyum kANEn nAn * ArAnum solliRRum koLLEn",
            6: "aRivazhindhu thIrA uDamboDu pEdhuRuvEn kaNDu iranggi *  ErAr kiLik kiLavi em anai thAn vandhu ennai * sIrAr sezhum puzhudhik kAppiTTu",
            7: "sengkuRinjchith thArAr naRu mAlai sAththaRku * thAn pinnum nErAdhana onRu nErndhAL",
            8: "adhanAlum thIrAdhu en sindhai nOy thIrAdhu en pEdhuRavu * vArAdhu mAmai adhu kaNDu maRRAnggE * ArAnum mUdhaRiyum ammanaimAr solluvAr * pArOr solappaDum kaTTuppaDuththirEl * ArAnum meyppaDuvan enRAr",
            9: "adhu kETTuk kArAr kuzhaR koNDaik kaTTuvichchi kaTTERi * sIrAr suLagil sila nel piDiththu eRiyA * vErA vidhir vidhirA mey silirAk kai mOvA * pEr Ayiram uDaiyAn enRAL",
            10: "pErththEyum kArAr thirumEni kATTinAL * kai adhuvum sIr Ar valampuriyE enRAL",
            11: "thiruththuzhAyth thArAr naRumAlai kaTTuraiththAL kaTTuraiyA * nIr Edhum anjchEnmin num magaLai nOy seydhAn * ArAnum allan aRindhEn avanai nAn * kUrAr vERkaNNIr! umakkaRiyak kURugEnO? * ArAl ivvaiyam aDi aLappuNDadhu thAn? * ArAl ilanggai poDi poDiyA vIzhndhadhu? * maRRu ArAlE kanmAri kAththadhu thAn?",
            12: "Azhi nIr ArAl kaDainthiDappaTTadhu? * avan kANmin Ur Anirai mEyththu ulagellAm uNDu umizhndhum * ArAdha thanmaiyanAy Anggoru nAL AyppADi * sIrAr kalai algul sIraDich senthuvar vAy * vArAr vana mulaiyAL maththArap paRRik koNDu * ErAr iDai nOva eththanaiyOr pOdhumAy * sIrAr thayir kaDaindhu veNNai thiraNDadhaNai * vErAr nudhal maDavAL vEROr kalaththiTTu * nArAr uRi ERRi nankamaiya vaiththadhanai * pOrAr vERkaN maDavAL pOndhanaiyum poy uRakkam * OrAdhavan pOl uRanggi aRivuRRu * thArAr thaDanthOLgaL uLLaLavum kai nITTi * ArAdha veNNey vizhunggi",
            13: "arugirundha mOrAr kuDam uruTTi mun kiDandha thAnaththE * OrAdhavan pOl kiDandhAnaik kaNDavaLum * vArAth thAn vaiththadhu kANAL",
            14: "vayiRaDiththu inggu ArAr pugudhuvAr? aiyar ivar allAl * nIrAm idhu seydhIr enROr neDungkayiRRAl * UrArgaL ellArum kANa uralODE * thIrA veguLiyaLAych sikkena ArththaDippa * ArA vayiRRinODu ARRAdhAn",
            15: "anRiyum nIrAr neDungkayaththai senRu alaikka ninRu urappi * orAyiram paNa vengkOviyal nAgaththai * vArAy enakkenRu maRRadhan maththagaththu * sIrAr thiruvaDiyAl pAyndhAn",
            16: "than sIthaikku nEr Avan enROr nisAsari thAn vandhALai *  kUrArndha vALAl koDi mUkkum kAdhiraNDum * IrA viDuththu avaTku mUththOnai",
            17: "vennaragam sErA vagaiyE silai kuniththAn * senthuvar vAy vArAr vana mulaiyAL vaidhEvi kAraNamA * erAr thaDanthOL irAvaNanai",
            18: "Iraindhu sIrAr siram aRuththuch seRRugandha sengkaN mAl * pOrAr neDu vElOn pon peyarOn Agaththai * kUrArndha vaLLugirAl kINDu",
            19: "kuDal mAlai sIrAr thiru mArbin mEl kaTTi * sengkurudhi sOrAk kiDandhAnaik kunggumath thOL koTTi * ArA ezhundhAn ari uruvAy",
            20: "anRiyum pEr vAman Agiya kAlaththu * mUvaDi maN thArAy enakku enRu vENDich salaththinAl * nIr ERRu ulagellAm ninRu aLandhAn mAvaliyai",
            21: "ArAdha pOril asurargaLum thAnumAy * kArAr varai naTTu nAgam kayiRAga * pErAmal thAnggik kaDaindhAn",
            22: "thiruththuzhAyth thArArndha mArvan thaDa mAl varai pOlum * pOr Anai poygai vAy kOTpaTTu ninRu alaRi * nIrAr malark kamalam koNDOr neDungkaiyAl * nArAyaNA! O! maNivaNNA! nAgaNaiyAy! * vArAy en AriDarai nIkkAy",
            23: "ena veguNDu thIrAdha sIRRaththAl senRu iraNDu kURAga * IrA adhanai iDar kaDindhAn emperumAn * pEr Ayiram uDaiyAn pEyp peNDIr! num magaLai * thIrA nOy seydhAn ena uraiththAL",
            24: "sikkena maRRu ArAnum allAmai kETTu enggaL ammanaiyum * pOrAr vERkaNNIr! avan Agil pUnthuzhAy * thArAdhu ozhiyumE? than aDichchi allaLE? * maRRu ArAnum allanE enRozhindhAL",
            25: "nAn avanaik kArAr thirumEni kaNDadhuvE kAraNamA * pErAp pidhaRRAth thiritharuvan",
            26: "pinnaiyum IrAp pugudhalum ivvuDalaith thaN vADai * sOrA maRukkum vagai aRiyEn",
            27: "sUzh kuzhalAr ArAnum Esuvar ennumadhan pazhiyai * vArAmal kAppadhaRku vALA irundhu ozhindhEn * vArAy maDa nenjchE! vandhu",
            28: "maNivaNNan sIrAr thiruththuzhAy mAlai namakkaruLi * thArAn tharum enRu iraNDaththil onRadhanai * ArAnum onnAdhAr kELAmE sonnakkAl * ArAyumElum paNi kETTu adhanRenilum * pOrAdhozhiyAdhE pOndhiDu nI enRERku * kAr Ar kaDalvaNNan pin pOna nenjchamum * vArAdhE ennai maRandhadhu thAn",
            29: "valvinaiyEn UrAr ugappadhE AyinEn",
            30: "maRRenakku inggu ArAyvAr illai azhal vAy mezhugu pOl * nIrAy urugum en Avi",
            31: "neDungkaNgaL UrAr uRanggilum thAn uRanggA * uththaman than  pEr AyinavE pidhaRRuvan",
            32: "pinnaiyum kArAr kaDal pOlum kAmaththar AyinAr * ArE pollAmai aRivAr? adhu niRka",
            33: "ArAnum AdhAnum allaL avaL kANIr * vArAr vanamulai vAsavadhaththai enRu * ArAnum sollappaDuvAL",
            34: "avaLum than pEr Ayam ellAm ozhiyap peruntheruvE * thArAr thaDanthOL thaLaik kAlan pin pOnAL * UrAr igazhndhiDappaTTALE?",
            35: "maRRenakku inggu ArAnum kaRpippAr nAyagarE? * nAn avanaik kArAr thirumEni kANum aLavum pOy",
            36: "🙏 sIrAr thiruvEngkaDamE thirukkOva lUrE * madhiTkachchi UragamE pEragamE * pErA maRudhu iRuththAn veLLaRaiyE veqkAvE * pEr Ali thaNkAl naRaiyUr thiruppuliyUr",
            37: "🙏 ArAmam sUzhndha aranggam * kaNamanggai kArAr maNi niRak kaNNanUr viNNagaram * sIrAr kaNapuram sERai thiruvazhundhUr * kArAr kuDandhai kaDigai kaDal mallai * ErAr pozhil sUzh iDavendhai nIrmalai * sIrArum mAlirunjchOlai thirumOgUr * pArOr pugazhum vadhari vaDa madhurai",
            38: "UrAya ellAm ozhiyAmE nAn avanai * Or Anai kombosiththu Or Anai kOL viDuththa sIrAnai * sengkaN neDiyAnaith thEn thuzhAyth thArAnai * thAmarai pOl kaNNAnai * eNNarum sIr pEr Ayiramum pidhaRRi",
            39: "🙏 peruntheruvE UrAr igazhilum UrAdhu ozhiyEn nAn * vArAr pUm peNNai maDal",
            40: "UrAdhu ozhiyEn ulagaRiya oNNudhalIr! * sIrAr mulaith thaDanggaL sEraLavum * pAr ellAm anROnggi ninRu aLandhAn ninRa thirunaRaiyUr * manROngga Urvan maDal",
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