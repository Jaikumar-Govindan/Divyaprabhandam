window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'URM.0.steps': {
            1: "munnam thiruvAimozhippiLLai thAm upadhEsiththa nEr thannin padiyaith thaNavAdha sol maNavALamuni than anbudan sey upadhEsa raththinamAlai thannaith than nenju thannil tharippavar thALgaL charaN namakkE *"

        },
        'URM.1.steps': {
           	1: "enthai thiruvAimozhip piLLai innaruLAl * vandha upadhEsa mArkkaththaich chindhai seidhu * pinnavarum kaRka * upadhEsamAyp pEsuginREn * manniya seer veNpAvil vaiththu *",
            2: "kaRROrgaL thAm ugappar * kalvi thannil Asai uLLOr * peRROm ena ugandhu pinbu kaRpar * maRROrgaL mAchcharyaththAl * igazhil vandhadhen nenjE * igazhgai AchcharyamO thAnavarkku *",
            3: "AzhvArgaL vAzhi * aruLichcheyal vAzhi * thAzhvAdhumil kuravar thAm vAzhi * Ezh pArum uyya * avargaL uraiththavaigaL thAm vAzhi * seyya maRai thannudanE sErndhu *",
            4: "poigaiyAr bhUthaththAr pEyAr * pugazh mazhisai ayyan * aruL mAran sEralarkOn * thuyya patta nAthan anbar thAL thULi * naRpANan naRkaliyan * eedhivar thORRaththu adaivAm ingu *",
            5: "anthamizhAl naRkaligaL * AyndhurRaiththa AzhvArgaL * intha ulagil iruL neenga * vandhu udhiththa mAthangaL nALgaL thammai * maNNulagOr thAm aRiya * eethenRu solluvOm yAm *",
            6: "aippasiyil ONam * avittam sathayam ivai * oppilavA nALgaL ulagaththIr * eppuviyum pEsu pugazhp * poigaiyAr bhUthaththAr pEyAzhvAr * thEsudanE thOnRu siRappAl *",
            7: "maRRuLLa AzhvArgaLukku * munnE vandhu udhiththu * naRRamizhAl nUl seidhu nAttai uyththa * peRRimaiyOr enRu * mudhal AzhvArgaL ennum peyar ivarkku * ninRadhu ulagaththE nighazhndhu *",
            8: "pEdhai nenjE * inRaip perumai aRindhilaiyO * Edhu perumai inRaikku enRiyEl (en ennil) * OdhuginRen vAyththa pugazh mangaiyar kOn * mAnilaththil vandhu udhiththa * kArththikaiyil kArththikai nAL kAN *",
            9: "mARan paNiththa * thamizh maRaikku * mangaiyarkOn ARangam kURa avadhariththa * veeRudaiya kArththikaiyil kArththikai nAL * inRenRu kAdhalippAr * vAyththa malarth thALgaL nenjE vAzhththu *",
            10: "kArththigaiyil rOhiNi nAL * kANmin inRu kAsiniyIr * vAyththa pugazhp pANar vandhu udhippAl * AththiyargaL anbudanE thAn * amalanAdhipirAn kaRRadhar pin * nangudanE koNdAdum nAL *",
            11: "manniya seer mArgazhiyil * kEttai inRu mAnilaththeer * en idhanukku ERRam enil uraikkEn * thunnu pugazh mAmaRaiyOn * thoNdaradippodi AzhvAr piRappAl * nAnmaRaiyOr koNdAdum nAL *",
            12: "thaiyil magam inRu * thAraNiyIr ERRam * indhath thaiyil magaththukkuch chARRuginREn * thuyya madhi peRRa * mazhisaip pirAn piRandha nAL enRu * naRRavargaL koNdAdum nAL *",
            13: "mAsip punarpUsam * kANmin inRu maNNulagIr * thEsu iththivasaththukku Edhennil * pEuginREn kolli nagark kOn * kulasEkaran piRappAl * nallavargaL koNdAdum nAL *",
            14: "ERAr vaikAsi * visAkaththin ERRaththaip * pArOr aRiyap pagarkinREn * seerArum vEdham thamizh seydha * meyyan ezhil kurugai * nAthan avadhariththa nAL *",
            15: "uNdO vaikAsi * visAkaththukku oppu oru * nAL uNdO satakOparkku oppu oruvar * uNdO thiruvAimozhikku oppu * then kurugaikku uNdO * oru pAr thanil okkum Ur *",
            16: "inRaip perumai aRindhilaiyO * Ezhai nenjE * inRaikku en ERRam enil uraikkEn * nanRi punai pallANdu pAdiya * nam pattar pirAn vandhu udhiththa * nal Anilyil sOdhi nAL *",
            17: "mAnilaththil munnam * periyAzhvAr vandhu udhiththa * Ani thannil sOthi enRAl Adharikkum * gyAniyar(u)kku opporuvar (oppOr) illai * ivvulagu thanil enRu nenjE * eppozhudhum (eppOdhum) sindhiththu iru *",
            18: "mangaLAsAsanaththil * maRRuLLa AzhvArgaL * thangaL Arvaththu aLavu thAN anRi * pongum parivAlE * villipuththUr pattar pirAn peRRAn * periyAzhvAr ennum peyar *",
            19: "kOdhilavAm AzhvArgaL * kURu kalaikkellAm * Adhi thiruppallANdu Anadhuvum * vEdhaththukku Om ennum adhu pOl * uLLadhukkellAm surukkAyth * thAn mangalamAdhalAl *",
            20: "uNdO thiruppallANdukku oppadhOr kalai thAn uNdO periyAzhvArkku oppu uruvar * thaN thamizh nUl seydhu aruLum * AzhvArgaL thammil avar sey kalaiyil * paidhal nenjE nee uNarndhu pAr *",
            21: "AzhvAr thirumagaLAr ANdAL * madhurakavi AzhvAr * ethirAsarAm ivargaL * vAzhvAga vandhu udhiththa mAthangAL nALgaL thammin * vAsiyaiyum * indha ulagOrkku uraippOm yAm *",
            22: "inRO thiruvAdippUram * emakkAga anRo * ingu ANdAL avathariththAL * kunRAdha vAzhvAga(na) * vaikuntha vAn pOkam thannai igazhndhu * AzhvAr thirumagaLArAi *",
            23: "periyAzhvAr peN piLLaiyAy * ANdAL piRandha * thiruvAdip pUraththin seermai * oru nALaikku uNdO * manamE uNarndhu pAr * ANdALukku uNdAgil oppu itharkum uNdu *",
            24: "anju kudikku oru santhathiyAy * AzhvArgaL tham seyalai * vinji niRkum thanmaiyaLAi * pinjAip pazhuththALai ANdALaip * paththiyudan nALum * vazhuththAi manamE magizhndhu *",
            25: "ErAr madhurakavi * ivvulagil vandhu udhiththa * seerArum chiththiraiyil chiththirai nAL * pArulagil maRRuLLa AzhvArgaL * vandhu udhiththa nALgaLilum * uRRadhu emakku enRu nenjE Or *",
            26: "vAyththa thirumanthiraththin * maththimamAm padham pOl * seerththa madhurakavi sey kalaiyai * Arththa pugazh AriyargaL thAngaL * aruLichchyal naduvE * sErviththAr thARpariyam thErndhu *",
            27: "inRu ulageer chiththiraiyil * Eyndha thiruvAdhirai nAL * enRaiyinum inRu idhanukku ERRam en thAn * enRavarkkuch chARRuginREn kENmin * ethirAsar tham piRappAl * nARRisaiyum koNdAdum nAL *",
            28: "AzhvArgaL thANgaL * avathariththa nALgaLilum * vAzhvAna nAL namakku maNNulageer * Ezh pArum uyya * ethirAsar udhiththaruLum * chiththiraiyil seyya thiruvAdhirai *",
            29: "enthai ethirAsar * ivvulagil enthamakkA * vandhu udhiththa nAL ennum vAsiyinAl * indhath thiruvAdhirai thannin * seermai thanai nenjE * oruvAmal eppozhudum Or *",
            30: "eNNarum seerp poigai munnOr * ivvulagil thOnRiya Ur * vaNmai migu kachchi mallai mAmayilai * maNNiyil neer thEngum kuRaiyalUr * seerk kaliyan thOnRiya Ur * Ongum uRaiyUr pANan Ur *",
            31: "thoNdaradip podiyAr thOnRiya Ur * thol pugazh sEr maNdangudi enbar maNNulagil * eN thisaiyum Eththum * kulasEkaran Ur ena uraippar * vAyththa thiruvanchikkaLam *",
            32: "mannu thirumazhisai * mAdath thiruk kurugUr * minnu pugazh villipuththUr mEdhiniyil * nanneRiyOr Eyndha paththi sArar * ezhil mARan pattar pirAn * vAyndhu udhiththa UrgaL vagai *",
            33: "seerArum villipuththUr * selvath thirukkOLUr * ErAr perumbUthUr ennum ivai * pAril madhiyArum ANdAL * madhurakavi AzhvAr * ethirAsar thOnRiya Ur ingu *",
            34: "AzhvArgaL ERRam * aruLichcheyal ERRam * thAzhvAdhum inRi avai thAm vaLarththOr * Ezh pArum uyya * avargaL sey(dha) vyAkkiyaigaL uLLadhellAm * vaiyam aRiyap pagarvOm vAyndhu *",
            35: "AzhvArgaLaiyum * aruLichcheyalgaLaiyum * thAzhvA ninaippavargaL thAm * naragil veezhvArgaL enRu ninaiththu nenjE * eppozhudum nee avar pAl * chenRu aNugak kUsith thiri *",
            36: "theruLuRRa AzhvArgaL * seermai aRivArAr * aruLichcheyalai aRivArAr * aruL peRRa nAthamuni mudhalAna * nam thEsikarai allAl pEthai manamE uNdO pEsu *",
            37: "OrAN vazhiyAy * upadhEsiththAr munnOr * ErAr ethirAsar innaruLAl * pArulagil Asai udaiyOrkkellAm*  AriyargAL kURum enRu * pEsi varambu aRuththAr pin *",
            38: "emperumAnAr tharisanam enRE idharku * namperumAL pErittu nAtti vaiththAr * ampuviyOr indhath tharisanaththai * emperumAnAr vaLarththa * andhach cheyal aRigaikkA *",
            39: "piLLAn nanjIyar * periyavAchchAn piLLai * theLLAr vadakkuth thiruveedhip piLLai * maNavALa yOgi * thiruvAimozhiyaik kAththa * guNavALar enRu nenjE kURu *",
            40: "mundhuRavE piLLAn * mudhalAnOr seydhu aruLum * andha viyAkkiyaigaL anRAgil * andhO thiruvAimozhip poruLai * thErndhu uraikka valla guruvAr * ikkAlam nenjE kUru *",
            41: "theLLArum gyAnath * thirukkurugaip pirAn piLLAn * ethirAsar pEraruLAl * uLLArum anbudanE * mARan maRaip poruLai anRu uraiththadhu * inbamigum ARAyiram *",
            42: "thanjeerai gyAniyargaL * thAm pugazhum vEdhAnthi * nanjeeyar thAm bhattar nal aruLAl * enjAdha Arvamudan * mARan maRip poruLai Ayndhu uraiththadhu * Er onbadhinAyiram *",
            43: "nampiLLAi thammudaiya * nal aruLAl Eviyidap * pin periyavAchchAn piLLai adhanAl * inbA varu paththi * mARan maRaip poruLaich chonnadhu * irupaththu nAlAyiram *",
            44: "theLLiyadhA nampiLLai * cheppu neRi thannai * vaLLal vadakkuth thiruveedhip piLLai * indha nAdu aRiya * mARan maRaip poruLai nangu uraiththadhu * eedu muppaththARayiram *",
            45: "anbOdu * azhagiya maNavALach cheeyar * pinbOrum kaRRu aRindhu pEsugaikkA * tham periya pOdhamudan * mARan maRaiyin poruL uraiththadhu * Edhamil panneerAyiram *",
            46: "periyavAchchAn piLLai * pinbuLLavaikkum theriya * viyakkiyaigaL seyvAL * ariya aruLichcheyal poruLai * Ariyargatku ippOdhu * aruLichcheyalAyththu aRindhu *",
            47: "nanjeeyar seydha * viyakkiyaigaL nAliraNdukku * enjAmai yAvaikkum illaiyE * tham seerAl vaiya kuruvin thambi * mannu maNavALamuni * seyyumavai thAmum sila *",
            48: "seerAr vadakkuth thiruveedhip piLLai * ezhu thErAr thamizh vEdhaththu eedu thanai * thArum ena vAngi mun nampiLLai * eeyuNNi mAdhavarkkuth thAm koduththAr * pin adhanaith thAn *",
            49: "Angavar pAl peRRa * siRiyAzhvAn appiLLai * thAm koduththAr tham maganAr tham kaiyil * pAngudanE nAlUr piLLaikku avar thAm * nalla maganArkku avar thAm * mElOrkku eendhAr avarE mikku *",
            50: "namperumAL nammAzhvAr * nanjeeyar nampiLLai enbar * avaravar tham ERRaththAl * anbu udaiyOr sARRu thiru nAmangaL * thAn enRu nannenjE * Eththu adhanaich chollu(i) nee inRu *",
            51: "thunnu pugazhk kandhAdai * thOzhappar tham ugappAl * enna ulagAriyanO enRu uraikkap * pinnai ulagAriyan ennum pEr * nampiLLaikku Ongi * vilagAmal ninRadhu enRum mEl *",
            52: "pinnai vadakkuth thiruveedhip piLLai * anbAl anna thirunAmaththai Adhariththu * mannu pugazh maindharkkuch chARRugaiyAl * vandhu parandhadhu * engum indhath thirunAmam ingu *",
            53: "anna pugazh mudumbai * aNNal ulagAsiriyan * innaruLAl seydha kalai yAvaiyilum * unnil thigazh vachana bhUdaNaththin seermai * onRukkillai * pugazhalla ivvArththai mey ippOdhu *",
            54: "munnam kuravOr * mozhindha vachanangaL thannai * migak koNdu kaRROr thammuyirkku * minnaNiyAch chErach chamaiththavarE * seer vachana bhUdaNamen(num) pEr * ikkalaikku ittAr pin *",
            55: "Ar vachana bhUdaNaththin * Azh poruL ellAm aRivAr * Ar adhu sonnEril anuttippAr * Ororuvar uNdAgil * aththanai kAN uLLamE * ellArkkum aNdAdhadhu anRO adhu *",
            56: "uyya ninaivu udaiyeer * ungaLukkuch cholluginREn * vaiya guru munnam vAy mozhindha * seyya kalaiyAm * vachana bhUdaNaththin Azh poruLai * kaRRadhanukku Am nilaiyil nillum aRindhu *",
            57: "thEsikar pAl kEtta * sezhum poruLai * sindhai thannil mAsaRavE UnRi(a) mananam seydhu * Asarikka vallArgaL thAm * vachana bhUdaNaththin vAn poruLaik * kallAdhadhennO kavarndhu *",
            58: "sachchampiradhAyam * thAm udaiyOr kEttakkAl * mechchum viyAkkiyai(gal) [thAn] uNdAgil * nachchi adhikariyum neer * vachana bhUdaNaththukku aRRa madhi udaiyeer * maththiyaththarAy *",
            59: "seer vachana bhUdaNaththin * semporuLaich * chindhai thannAl thERilumAm vAy koNdu cheppilumAm * AriyargAL enthanakku * nALum inidhAgA ninRadhu aiyO * unthamakku evvinbam uLadhAm *",
            60: "than guruvin thALiNaigaL thannil * anbu onRillAdhAr * anbu than pAl seydhAlum ambuyai kOn * inbamigu viNNAdu * thAn aLikka vENdiyirAn * AdhalAl naNNAr avargaL thirunAdu *",
            61: "gyAnam anuttAnam ivai * nanRAgavE udaiyanAna * guruvai adaindhakkAl * mAnilaththeer thEnAr kamalath * thirumAmagaL kozhunan * thAnE vaikuntham tharum *",
            62: "uyya ninaivu uNdAgil * um gurukkaL tham padhaththE vaiyum * anbu thannai indha mAnilaththeer * mey uraikkEn paiyaravil mAyan * paramapadham ungaLukkAm * kaiyilangu nellikkani *",
            63: "AchAryan sey(dha) * upakAramAnavadhu * thUydhAga nenju thannil thOnRumEl * thEsAn tharaththil irukka * manam thAn porundha mAttAdhu * iruththal ini EdhaRiyOm yAm *",
            64: "than Ariyanukkuth * thAn adimai seyvadhu * avan innAdu thannil irukkum nAL * annEr aRindhum adhil Asai inRi * AchAriyanaip pirindhu irupAr Ar * manamE pEsu *",
            65: "AchAryan * chichchan Aruyiraip pENumavan * thEsArum chichchan avan seer vadivai * Asaiyudan nOkkumavan ennum * nuN aRivaik kEttu vaiththum * Arkkum annEr niRkai aRidhAm *",
            66: "pinbazhagarAm * perumAL seeyar * perunthivaththil anbadhuvum aRRu mikka AsaiyinAl * nampiLLaikku Ana adimaigaL sey * annilaiyai nannenjE * UnamaRa eppozhudhum Or *",
            67: "AchAriyargaL * anaivarum munnAsariththa * AchAram thannai aRiyAdhAr * pEsuginRa vArththaigaLaik kEttu * maruLAdhE * pUruvargaL seerththa nilai thannai nenjE sEr *",
            68: "nAththikarum naRkalaiyin * nanneRi sEr Aththikarum * Aththika nAththikarumAm ivarai * Orththu nenjE munnavarum pinnavarum * mUrkkar ena vittu * naduch chonnavarai nALum thodar *",
            69: "nalla maNam uLLadhonRai * naNNi iruppadhaRkku * nalla maNam uNdAm nalam adhu pOl * nalla kuNam udaiyOr thangaLudan * kUdi iruppArkkuk * kuNam adhuvEyAm sErththi koNdu *",
            70: "theeya kandham uLLadhonRaich * chErndhu iruppadhonRukkuth * theeya kandham ERum thiRam adhu pOl * theeya kuNam udaiyOr thangaLudan * kUdi iruppArkkuk * kuNam adhuvEyAm seRivu koNdu *",
            71: "munnOr mozhindha * muRai thappAmal kEttu * pinnOrndhu thAm adhanaip pEsAdhE * than nenjil thORRinadhE solli * idhu suththa upadhEsapara vArththadhenbar * mUrkkar AvAr *",
            72: "pUruvAchAriyargaL * pOdham anuttAnangaL * kURuvAr varththaigaLaik koNdu neer thERi * iruL tharumA gyAlaththE * inbam uRRu vAzhum * theruL tharumA thEsikanaich chErndhu *",
            73: "indha upadhESa * raththina mAlai thannaich * chindhai thannil nALum sindhippAr * endhai ethirAsar * innaruLukku enRum ilakkAgich * chathirAga vAzhndhiduvar thAm *",
            74: "mannuyirgAL ingE * maNavALa mAmunivan * ponnadiyAm senkamalap pOdhukaLai * unnich chiraththAlE theeNdil * amAnavanum nammaik * karaththAlE theeNdal kadan *"
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
