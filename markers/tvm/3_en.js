window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.3.1.steps':
        {
            1: "* mudichchOdhiyAy * unadhu mugachchOdhi malarndhadhuvO? * adichchOdhi nI ninRa * thAmaraiyAy alarndhadhuvO? *** padichchOdhi Adaiyodum * palakalanAy * nin paim pon kadicchOdhi kalandhadhuvO? * thirumAlE! katturaiyE *",
            2: "katturaikkil thAmarai * nin kaN pAdham kai ovvA * katturaiththa nan pon * un thirumEni oLi ovvAdhu *** otturaiththu ivvulagu unnaip * pugazhvellAm perumbAlum * patturaiyAyp puRkenRE * kAttumAl paranjOdhI! *",
            3: "paranjOdhi! nI paramAy * nin igazhndhu pin maRROr * paranjOdhi inmaiyin * padiyOvi nigazhginRa *** paranjOdhi nin uLLE * padar ulagam padaiththa * em paranjOdhi! gOvindhA! * paNburaikka mAttEnE *",
            4: "mAttAdhE Agilum * im malar thalai mA gyAlam * nin mAttAya malar puraiyum * thiru uruvam manam vaikka *** mAttAdha pala samaya * madhi koduththAy malarththuzhAy * mAttE nI manam vaiththAy * mA gyAlam varundhAdhE? *",
            5: "varundhAdha arundhavaththa * malar kadhirin sudar udambAy * varundhAdha gyAnamAy * varambinRi muzhudhiyanRAy! *** varungAlam nigazhkAlam * kazhikAlamAy ulagai * orungAga aLippAy! sIr * engulakka OdhuvanE? *",
            6: "OdhuvAr OththellAm * evvulagaththu evvevaiyum * sAdhuvAy nin pugazhin * thagaiyallAl piRidhillai *** pOdhuvAzh punandhuzhAy * mudiyinAy! pUvin mEl * mAdhuvAzh mArbinAy! * en solli yAn vAzhththuvanE? *",
            7: "vAzhththuvAr palarAga * nin uLLE nAnmuganai * mUzhththa nIr ulagellAm * padai enRu mudhal padaiththAy! *** kEzththa sIr aran mudhalAk * kiLar dheyvamAyk kiLarndhu * sUzhththamarar thudhiththAl * un thol pugazh mAsUNAdhE? *",
            8: "mAsUNAch chudar udambAy * malarAdhu kuviyAdhu * mAsUNA gyAnamAy * muzhudhumAy muzhudhiyanRAy! *** mAsUNA vAn kOlaththu * amarar kOn vazhippattAl * mAsUNA una pAdha * malarch chOdhi mazhungAdhE? *",
            9: "mazhungAdha vainnudhiya * chakkara nal valaththaiyAy * thozhum kAdhal kaLirRaLippAn * puLLUrndhu thOnRinaiyE *** mazhungAdha gyAnamE * padaiyAga malarulagil * thozhumbAyArkku aLiththAl * un sudarch chOdhi maRaiyAdhE? *",
            10: "maRaiyAya nAl vEdhaththuL ninRa * malarch chudarE! * muRaiyAl ivvulagellAm * padaiththu idandhu uNdu umizhndhu aLandhAy! *** piRai ERu sadaiyAnum * nAnmuganum indhiranum * iRai Adhal aRindhEththa * vIRRiruththal idhu viyappE? *",
            11: "* viyappAya viyappillA * meygyAna vEdhiyanai * sayap pugazhAr palar vAzhum * thadam kurugUrch chatakOpan *** thuyakkinRith thozhudhuraiththa * AyiraththuL ippaththum * uyak koNdu piRappaRukkum * oli munnIr gyAlaththE *"
        },
        'TVM.3.2.steps':
        {
            1: "* munnIr gyAlam padaiththa * em mugil vaNNanE! * anNAL nI thandha * Akkaiyin vazhi uzhalvEn *** vennAL nOy vIya * vinaigaLai vEr aRap pAyndhu * ennAL yAn unnai * ini vandhu kUduvanE? *",
            2: "vanmA vaiyam aLandha * em vAmanA! * nin panmA mAyap * piRaviyil padiginRa yAn *** thonmA valvinaith * thodargaLai mudhalarindhu * nin mA thAL sErndhu * niRpadhu engyAnRukolO? *",
            3: "kollA mAkkOl * kolai seydhu bhAradhap pOr * ellAch chEnaiyum * iru nilaththu aviththa endhAy! *** pollA Akkaiyin * puNarvinai aRukkalaRA * sollAy yAn unnaich * chArvadhOr sUzhchchiyE *",
            4: "sUzhchchi gyAnach * chudaroLy Agi * enRum Ezhchchik kEdinRi * engaNum niRaindha endhAy! *** thAzhchchi maRRengu thavirndhu * nin thALiNaik kIzh vAzhchchi * yAn sErum vagai * aruLAy vandhE *",
            5: "vandhAy pOlE * vandhum en manaththinai nI * sindhAmal seyyAy * idhuvE idhu Agil *** kondhAr kAyAvin * kozhumalarth thiru niRaththa endhAy! * yAn unnai * engu vandhu aNugiRpanE? *",
            6: "kiRpan killEn * enRilan muna nALAl * aRpa sArangaL * avai suvaiththu aganRozhindhEn *** paRpal Ayiram * uyir seydha paramA! * nin naRpoRsOdhith thAL * naNuguvadhu engyAnRE? *",
            7: "engyAnRum nAm irundhirundhu * irangi nenjE! * mey gyAnam inRi * vinai iyal piRappazhundhi *** engyAnRum engum * ozhivaRa niRaindhu ninRa * mey gyAnach chOdhik * kaNNanai mEvudhumE? *",
            8: "mEvu thunba vinaigaLai * viduththum ilEn * Ovudhal inRi * un kazhal vaNangiRRilEn *** pAvu thol sIrk kaNNA * en paranjudarE! * kUvuginREn kANbAn * engu eydhak kUvuvanE? *",
            9: "kUvik kUvik * koduvinaith thURRuL ninRu * pAviyEn pala kAlam * vazhi thigaiththu alamaruginREn *** mEvi anRu Anirai kAththavan * ulagamellAm * thAviya ammAnai * enginith thalaip peyvanE? *",
            10: "thalaip pey kAlam * naman thamar pAsam vittAl * alaippUN uNNum * avvallal ellAm agalak *** kalaip pal gyAnaththu * en kaNNanaik kaNdu koNdu * nilaip peRRen nenjam peRRadhu * nIduyirE *",
            11: "* uyirgaL ellA * ulagamum udaiyavanaik * kuyil koL sOlaith * then kurugUrch chatakOpan *** seyiril sol isai mAlai * AyiraththuL ippaththum * uyirin mEl Akkai * Unidai ozhivikkumE *",

        },
        'TVM.3.3.steps': {
            1: "* ozhivil kAlam ellAm * udanAy manni * vazhuvilA * adimai seyya vENdum nAm *** thezhikural aruvith * thiruvEngataththu * ezhilkoL sOdhi * endhai thandhai thandhaikkE *",
            2: "endhai thandhai thandhai * thandhai thandhaikkum Mundhai * vAnavar * vAnavar kOnodum *** sindhupU magizhum * thiruvEngataththu * andhamil pugazhk * kAr ezhil aNNalE *",
            3: "aNNal mAyan * aNi koL sendhAmaraik kaNNan * sengani vAyk * karumANikkam *** theNNiRaich chunai nIrth * thiruvEngataththu * eNNil thol pugazh * vAnavar IsanE *",
            4: "Isan vAnavarkku enban * enRAl * adhu thEsamO * thiruvEngataththAnukku *** nIsanEn * niRai onRum ilEn * en kaN pAsam vaiththa * paranjudarch chOdhikkE *",
            5: "sOdhiyAgi * ellA ulagum thozhum * Adhi mUrththi enRAl * aLavAgumO? *** vEdhiyar * muzhu vEdhaththamudhaththaith * thIdhil sIrth * thiruvEngataththAnaiyE *",
            6: "vEngatangaL * meym mEl vinai muRRavum * thAngaL thangatku * nallanavE seyvAr *** vEngataththuRaivArkku * namavennal Am kadamai * adhu sumandhArgatkE *",
            7: "sumandhu mA malar * nIr sudar dhUpam koNdu * amarndhu vAnavar * vAnavar kOnodum *** namanRezhum * thiruvEngatam nangatkuch * chaman koL vIdu tharum * thadam kunRamE *",
            8: "* kunRam Endhik * kuLir mazhai kAththavan * anRu gyAlam * aLandha pirAn *** paran senRu sEr * thiruvEngata mA malai * onRumE thozha * nam vinai OyumE *",
            9: "OyumUppup * piRappiRappup piNi * vIyumARu seyvAn * thiruvEngataththu Ayan *** nALmalarAm * adith thAmarai * vAyuLLum manaththuLLum * vaippArgatkE *",
            10: "vaiththa nAL varai * ellai kuRugich chenRu * eyththiLaippadhan * munnam adaiminO *** paiththa pAmbaNaiyAn * thiruvEngatam * moyththa sOlai * moy pUm thadam thAzhvarE *",
            11: "* thAL parappi * maN thAviya Isanai * nIL pozhil kurugUrch * chatakOpan sol *** kEzhil Ayiraththu * ippaththum vallavar * vAzhvar vAzhveydhi * gyAlam pugazhavE *"
        },

        'TVM.3.4.steps':
        {
            1: "pugazhum nal oruvan engO? * poruvil sIr bhUmi engO? thigazhum thaN paravai engO? * thI engO vAyu engO? * nigazhum AkAsam engO? * nIL sudar iraNdum engO? * igazhvil ivvanaiththum engO? kaNNanaik kUvumARE *",
            2: "kUvumARu aRiya mAttEn * kunRangaL anaiththum engO? * mEvu sIr mAri engO? * viLangu thAragaigaL engO? * nAviyal kalaigaL engO? * gyAna nal Avi engO? * pAvu sIrk kaNNan emmAn * pangayak kaNNanaiyE *",
            3: "pangayak kaNNan engO? * pavaLach chevvAyan engO? * angadhir adiyan engO? * anjana vaNNan engO? * sengadhir mudiyan engO? * thirumaRu mArban engO? * sangu sakkaraththan engO? * sAdhi mANikkaththaiyE *",
            4: "sAdhi mANikkam engO? * savi koL pon muththam engO? * sAdhi nal vairam engO? thavivil sIr viLakkam engO? * Adhiyam sOdhi engO? * Adhiyam purudan engO? * Adhumil kAlaththu endhai * achchudhan amalanaiyE *",
            5: "achchudhan amalan engO? * adiyavar vinai kedukkum * nachchu mA marundham engO? * nalam kadal amudham engO? * achchuvaik katti engO? * aRusuvai adisil engO? * neychchuvaith thERal engO? * kani engO? * pAl engEnO? *",
            6: "pAl engO? * nAngu vEdhap payan engO? * samaya nIdhi nUl engO? * nudangu kELvi isai engO? * ivaRRuL nalla mEl engO? * vinaiyin mikka payan engO? * kaNNan engO? mAl engO? mAyan engO? * vAnavar AdhiyaiyE *",
            7: "vAnavar Adhi engO? * vAnavar dheyvam engO? * vAnavar bOgam engO? * vAnavar muRRum engO? * Unamil selvam engO? * Unamil suvarggam engO? * Unamil mOkkam engO? * oLi maNivaNNanaiyE *",
            8: "oLi maNivaNNan engO? * oruvan enREththa ninRa * naLir madhich chadaiyan engO? * nAnmugak kadavuL engO? * aLi magizhndhulagam ellAm * padaiththavai Eththa ninRa * kaLi malarth thuLavan emmAn * kaNNanai mAyanaiyE *",
            9: "kaNNanai mAyan thannaik * kadal kadaindhu amudham koNda * aNNalai achchudhanai * ananthanai ananthan than mEl * naNNi nanguRaiginRAnai * gyAlam uNdumizhndha mAlai * eNNumARu aRiya mAttEn * yAvaiyum yavarum thAnE *",
            10: "yAvaiyum yavarum thAnAy * avar avar samayam thORum * thOyvilan pulan aindhukkum * solappadAn uNarvin mUrththi * Avi sEr uyirin uLLAl * Adhum Or paRRilAdha * bAvanai adhanaik kUdil * avanaiyum kUdalAmE *",
            11: "kUdi vaNdaRaiyum thaNdArk * koNdalpOl vaNNan thannai * mAdalar pozhil kurugUr * vaN SatakOpan sonna * pAdal Or AyiraththuL * ivaiyum oru paththum vallAr * vIdila bOgam eydhi * virumbuvar amarar moyththE *"
        },
        'TVM.3.5.steps':

        {
            1: "moymmAm pUm pozhil poygai * mudhalaich chiRaippattu ninRa * kaimmAvukku aruL seydha * kArmugil pOl vaNNan kaNNan * emmAnaich chollip pAdi * ezhundhum parandhum thuLLAdhAr * thammAl karumam en? * solleer thaN kadal vattaththuLLIrE! *",
            2: "thaN kadal vattaththuLLAraith * thamakku iraiyAth thadindhuNNum * thiN kazhaRkAl asurarkkuth * thIngizhaikkum thirumAlaip * paNgaL thalaik koLLap pAdip * paRandhum kuniththu uzhalAdhAr * maN koL ulagil piRappAr * valvinai mOdha malaindhE *",
            3: "malaiyai eduththuk kal mAri kAththup * pasu nirai thannaith * tholaivu thavirththa pirAnaich * chollich cholli ninRu eppOdhum * thalaiyinOdu Adhanam thattath * thadu kuttamAyp paRavAdhAr * alai koL naragaththu azhundhik * kidandhuzhaikkinRa vambarE *",
            4: "vambavizh kOthai poruttA * mAl vidai Ezhum adarththa * sem pavaLath thiraL vAyan * sirIdharan thol pugazh pAdik * kumbidu nattam ittAdik * kOgu kattuNdu uzhalAdhAr * tham piRappAl payan ennE? * sAdhu sanangaL idaiyE *",
            5: "sAdhu sanaththai naliyum * kanjanaich chAdhippadhaRku * AdhiyanjOdhi uruvai * angu vaiththingup piRandhu * vEdha mudhalvanaip pAdi * vIdhigaL thORum thuLLAdhAr * Odhi uNarndhavar munnA * en savippAr manisarE? *",
            6: "manisarum maRRum muRRumAy * mAyap piRavi piRandha * thaniyan piRappili thannaith * thadam kadal sErndha pirAnai * kaniyaik karumbin insARRaik * kattiyaith thEnai amudhai * munivinRi Eththik kunippAr * muzhudhuNar nIrmaiyinArE *",
            7: "nIrmaiyil nURRuvar vIya * aivarkku aruL seydhu ninRu * pAr malgu sEnai aviththa * param sudarai ninaindhAdi * nIr malgu kaNNinarAgi * nenjam kuzhaindhu naiyAdhE * Un malgi mOdu paruppAr * uththamargatkU en seyvArE? *",
            8: "vAr punal andhaN aruvi * vada thiruvEnkataththu endhai * pEr pala sollip pidhaRRip * piththar enRE piRar kURa * Ur pala pukkum pugAdhum * ulOgar sirikka ninRAdi * Arvam perugik kunippAr * amarar thozhap paduvARE *",
            9: "amarar thozhap paduvAnai * anaiththulagukkum pirAnai * amarar manaththinuL * yOgu puNarndhu * avan thannOdu onRAga * amarath thuNiya vallArgaL ozhiya * allAdhavar ellAm * amara ninaindhu ezhundhAdi * alaRRuvadhE karumamE *",
            10: "karumamum karuma palanum Agiya * kAraNan thannaith * thirumaNi vaNNanaich chengaN mAlinaith * dhEva pirAnai * orumai manaththinuL vaiththu * uLLam kuzhaindhu ezhundhAdi * perumiayum nANum thavirndhu * pidhaRRumin pEdhaimai thIrndhE *",
            11: "thIrndha adiyavar thammaith * thiruththip paNi koLLa valla * Arndha pugazh achchudhanai * amarar pirAnai emmAnai * vAyndha vaLa vayal sUzh * thaN vaLam kurugUrch chatakOpan * nErndha Or Ayiraththu ippaththu * aruvinai nIRu seyyumE *"
        },

        'TVM.3.6.steps':
        {
            1: "seyya thAmaraik kaNNanAy * ulagEzhum uNda avan kaNdIr * vaiyam vAnam manisar dheyvam * maRRum maRRum maRRum muRRumAych * cheyya sUzh sudar gyAnamAy * veLippattivai padaiththAn * pinnum moykoL sOdhiyOdu AyinAn * oru mUvar Agiya mUrththiyE *",
            2: "mUvar Agiya mUrththiyai * mudhal mUvarkkum mudhalvan thannaich * chAvam uLLana nIkkuvAnaith * thadam kadal kidandhAn thannaith * thEva thEvanaith then ilangai * eri ezhach cheRRa villiyaip * pAva nAsanaip pangayath thadam kaNNanaip * paravuminO *",
            3: "paravi vAnavar Eththa ninRa * paramanaip param sOdhiyaik * kuravai kOththa kuzhaganai * maNivaNNananik kudak kUththanai * aravam ERi alai kadal amarum * thuyil koNda aNNalai * iravu nan pagalum vidAdhu * enRum Eththudhal manam vaimminO *",
            4: "vaimmin num manathu enRu * yAn uraikkinRa mAyavan sIrmaiyai * emmanOrgaL uraippadhen? * adhu niRka nAL thoRum * vAnavar thammai ALum avanum * nAnmuganum sadai mudi aNNalum * semmaiyAl avan pAdha pangayam * sindhiththu Eththith thirivarE *",
            5: "thiriyum kARROdu agal visumbu * thiNindha maN kidandha kadal * eriyum thIyOdiru sudar dheyvam * maRRum maRRum muRRumAyk * kariya mEniyan seyya thAmaraik kaNNan * kaNNan viNNOr iRai suriyum pal karum kunji * engaL sudar mudi aNNal thORRamE *",
            6: "thORRak kEdavai illavan udaiyAn * avan oru mUrththiyAych * chIRRaththOdaruL peRRavan * adik kIzhp puga ninRa sengaNmAl * nARRath thORRach chuvai oli * uRal Agi ninRa * em vAnavar ERRaiyE anRi * maRRoruvarai yAn ilEn ezhumaikkumE *",
            7: "ezhumaikkum enadhAvikku * innamudhaththinai enadhAruyir * kezhumiya kadhirch chOdhiyai * maNivaNNanaik kudak kUththanai * vizhumiya amarar munivar * vizhungum * kannal kaniyinaith * thozhumin thUya manaththarAy * iRaiyum nillA thuyarangaLE *",
            8: "thuyarmE tharu thunba inba vinaigaLAy * avai allanAy * uyara ninRadhOr sOdhiyAy * ulagEzhum uNdumizhndhAn thannai * ayara vAngum naman thamarkku * aru nanjinai achchudhan thannaith * thayaradhaRku magan thannai anRi * maRRilEn thanjam AgavE *",
            9: "thanjam Agiya thandhai thAyodu * thAnumAy avai allanAy * enjalil amarar kula mudhal * mUvar tham uLLum Adhiyai * anji nIr ulagaththuLLIrgaL! * avan ivan enRu kUzhEnmin * nenjinAl ninaippAn yavan * avan Agum nIL kdal vaNNanE *",
            10: "kadal vaNNan kaNNan * viNNavar karu mANikkam enadhAruyir * pada aravin aNaik kidandha * paranjudar paNdu nURRuvar * adavarum padia manga * aivargatkAgi venjamaththu * anRu thEr thadaviya perumAn * kanai kazhal kANbadhenRu kol kaNgaLE? *",
            11: "kaNgaL kANdaRkariyanAyk * karuththukku nanRum eLiyanAy * maN koL gyAlaththu uyirkkellAm * aruL seyyum vAnavar Isanaip * paN koL sOlai vazhudhi nAdan * kurugaik kOn SatakOpan sol * paN koL Ayiraththip paththAl * paththarAgak kUdum payiluminE *"
        },
        'TVM.3.7.steps':
        {
            1: "payilum sudar oLi mUrththiyaip * pangayak kaNNanaip * payila iniya * nam pARkadal sErndha paramanaip * payilum thiru udaiyAr * evarElum avar kaNdIr * payilum piRappidai thOru * emmai ALum paramarE *",
            2: "ALum paramanaik kaNNanai * Azhip pirAn thannaith * thOLum Or nAngudaith * thUmaNi vaNNan emmAn thannaith * thALum thadakkaiyum kUppip * paNiyum avar kaNdIr * nALum piRappidai thORu * emmai ALudai nAdharE *",
            3: "nAdhanai gyAlamum vAnamum Eththum * naRundhuzhAyp pOdhanaip * ponnedum chakkaraththu * endhai pirAn thannaip * pAdham paNiya vallAraip * paNiyum avar kaNdIr * Odhum piRappidai thORu * emmai ALudaiyArgaLE *",
            4: "udai Arndha Adaiyan * kaNdigaiyan udai nANinan * pudaiyAr pon nUlinan * pon mudiyan maRRum pal kalan * nadaiyA udaith thirunAraNan * thoNdar thoNdar kaNdIr * idaiyAr piRappidai thORu * emakkem peru makkalE *",
            5: "peru makkaL uLLavar tham perumAnai * amarargatku arumai ozhiya * anRAramudhUttiya appanaip * perumai pidhaRRa vallAraip * pidhaRRum avar kaNdIr * varumaiyum immaiyum * nammai aLikkum pirAkkaLE *",
            6: "aLikkum paramanaik kaNNanai * Azhip pirAn thannaith * thuLikkum naRum kaNNith * thUmaNi vaNNan emmAn thannai * oLik koNda sOdhiyai * uLLaththuk koLLum avar kaNdIr * salippinRi ANdu emmaich * chanma chanmAntharam kApparE *",
            7: "sanma sanmAntharam kAththu * adiyArgaLaik koNdupOyth * thanmai peRuththith * than thALiNaik kIzhk koLLum appanaith * thonmai pidhaRRa vallAraip * pidhaRRumavar kaNdIr * nanmai peRuththu emmai * nAL uyyak koLginRa nambarE *",
            8: "nambanai gyAlam padaiththavanaith * thirumArbanai * umbar ulaginil yArkkum * uNarvariyAn thannaik * kumbi naragargaL EththuvarElum * avar kaNdIr * em pal piRappidai thORu * em thozhu kulam thAngaLE *",
            9: "kulam thAngu sAdhigaL * nAlilum kIzh izhindhu * eththanai nalam thAn ilAdha * saNdALa saNdaLargaL Agilum * valam thAngu sakkaraththaNNal * maNivaNNaRkALenRu uL kalandhAr * adiyAr tham adiyAr em adigaLE *",
            10: "adiyArndha vaiyam uNdu * Alilai anna vasam seyyum * padiyAdhumil kuzhavippadi * endhai pirAn thanakku * adiyAr adiyAr tham adiyAr adiyAr * thamakku adiyAr adiyAr tham * adiyAr adiyOngaLE *",
            11: "adiyOngu nURRuvar vIya * anRu aivarkkaruL seydha nediyOnaith * then kurugUrch chatakOpan kuRREvalgaL * adiyArndha AyiraththuL * ivai paththu avan thoNdar mEl mudivu * Arak kaRkil * sanmam seyyAmai mudiyumE *"
        },
        'TVM.3.8.steps':
        {
            1: "mudiyAnE! * mUvulagum thozhudhEththum sIr adiyanE! * Azhkadalaik kadaindhAy! * puLLUr kodiyAnE! * koNdal vaNNA! * aNdaththumbaril nediyAnE! * enRu kidakkum en nenjamE *",
            2: "nenjamE! nIL nagarAga * irundha en thanjanE! * thaNNilangaikku * iRaiyaich cheRRa nanjanE! * gyAlam koLvAn * kuRaLAgiya vanjanE! * ennum eppOdhum en vAsagamE *",
            3: "vAsagamE Eththa aruL seyyum * vAnavar tham nAyaganEe! * nAL iLam thingaLaik kOL viduththu * vEyagam pAl veNNey thoduvuNda * An Ayar thAyavanEe! * enRu thadavum en kaigaLE *",
            4: "kaigaLAl Arath * thozhudhu thozhudhu unnai * vaigalum mAththiraip pOdhum * Or vIdinRip * pai koL pAmbERi * uRai paranE! * unnai mey koLLak kANa * virumbum en kaNgaLE *",
            5: "kaNgaLAl kANa varum kol? enRu AsaiyAl maN koNda vAmanan ERa magizhndhu sel paN koNda puLLin siRagoli bAviththuth thiN koLLa Orkkum kidandhu en sevigaLE *",
            6: "sevigaLAl Ara * nin kIrththik kani ennum kavigaLE * kAlap paN thEn * uRaippath thuRRup * puviyin mEl * pon nedum sakkaraththu unnaiyE * avivinRi Adharikkum * enadhAviyE *",
            7: "AviyE! AramudhE! * ennai ALudaith * thUvi am puL udaiyAy! * sudar nEmiyAy! * pAviyEn nenjam * pulambap pala kAlum * kUviyum kANap peREn * una kOlamE *",
            8: "kOlamE! thAmaraik kaNNAdhOr * anjana neelamE! * niRu enadhAviyai * IrginRa seelamE! * senRu sellAdhana * munnilAm kAlamE! * unnai ennAL * kaNdu koLvanE? *",
            9: "koLvan nAn mAvali! * mUvadi thA enRa kaLvanE! * kanjanai vanjiththu * vANanai uL vanmai thIra * Or Ayiram thOL thuNiththa * puL vallAy! * unnai engyAnRu porundhuvanE? *",
            10: "porundhiya mA marudhin idai pOya * em perundhagAy! * un kazhal kANiya pEdhuRRu * varundhi nAn * vAsaga mAlai koNdu * unnaiyE irundhirundhu * eththanai kAlam pulambuvanE? *",
            11: "pulambu sIr * bUmi aLandha perumAnai * nalam koL sIr * nan kurugUrch chatakOpan * sol valam koNda AyiraththuL * ivaiyum Or paththu ilangu vAn * yAvarum ERuvar sonnAlE *"
        },
        'TVM.3.9.steps':
        {
            1: "sonnAl virOdham idhu * Agilum solluvan kENminO * en nAvil in kavi * yAn oruvarkkum kodukkilEn * thennA thenA enRu * vaNdu mural thiruvEnkataththu * en Anai en appan * emperumAn uLan AgavE *",
            2: "uLan AgavE eNNith * thannai onRAgath than selvaththai * vaLanA madhikkum * im mAnidaththaik kavi pAdi en? * kuLan Ar kazhani sUzh * kaNNan kuRungudi meymmaiyE * uLan Aya endhaiyai * endhai pemmAnai ozhiyavE *",
            3: "ozhivonRillAdha * pal Uzhi thORUzhi nilAvap * pOm vazhiyaith tharum * nangaL vAnavar Isanai niRkap pOyk * kazhiya miga nalla vAn * kavi koNdu pulavIrgAL! * izhiyak karudhi * Or mAnidam pAdal ennAvadhE? *",
            4: "ennAvadhu? eththanai nALaikkup pOdhum? * pulavIrgAL! * mannA manisaraip * pAdip padaikkum perum poruL * minnAr maNi mudi * viNNavar thAdhaiyaip pAdinAl * thannAgavE koNdu * sanmam seyyAmaiyum koLLumE *",
            5: "koLLum payan illai * kuppai kiLarththanna selvaththai * vaLLal pugazhndhu * num vAymai izhakkum pulavIrgAL! * koLLak kuRaivilan * vENdiRRellAm tharum kOdhil * en vaLLal maNivaNNan thannaik * kavi solla vamminO *",
            6: "vammin pulavIr! * num mey varuththik kai seydhuymminO * im mannulaginil * selvar ippOdhillai nOkkinOm * num in kavi koNdu * num num ittA dheyvam EththinAl * semmin sudar mudi * en thirumAlukkuch chErumE *",
            7: "sErum kodai pugazh * ellaiyilAnai * OrAyiram pErum udaiya pirAnai allAl * maRRu yAn kilEn * mAri anaiya kai * mAl varai okkum thiN thOL enRu * pAril Or paRRaiyaip * pachchaip pasum poygaL pEsavE *",
            8: "vEyin mali purai thOLi * pinnaikku maNALanai * Agiya perum pugazh * ellai ilAdhana pAdip pOyk * kAyam kazhiththu * avan thALinNaik kIzhp pugum kAdhalan * mAya manisarai * en solla vallEn en vAy koNdE? *",
            9: "vAy koNdu mAnidam pAda vandha * kaviyEn allEn * Ay koNda sIr vaLLal * Azhip pirAn enakkE uLan * sAy koNda immaiyum sAdhiththu * vAnavar nAttaiyum * nI kaNdu koL enRu * vIdum tharum ninRu ninRE *",
            10: "ninRu ninRu pala nAL uykkum * ivvudal nIngip pOych * chenRu chenRAgilum kaNdu * sanmam kazhippAn eNNi * onRi onRi ulagam padaiththAn * kavi AyinERku * enRum enRum ini * maRRoruvar kavi ERkumE? *",
            11: "ERkum perum pugazh * vAnavar Isan kaNNan thanakku * ERkum perum pugazh * vaN kurugUrch chatakOpan sol * ERkum perum pugazh * AyiraththuL ivaiyum Or paththu * ERkum perum pugazh * solla vallArkkillai sanmamE *"
        },
        'TVM.3.11.steps':
        {
            1: "sanmam pala pala seydhu veLippattuch * changodu chakkaram vil * oNmai udaiya ulakkai oL vAL * thaNdu koNdu puL Urndhu * ulagil vaNmai udaiya arakkar * asurarai mALap padai porudha * nanmai udaiyavan sIr paravap peRRa * nAnOr kuRaivilanE *",
            2: "kuRaivil thadam kadal kOL aravERith * than kOlach chendhAmaraikkaN * uRaibavaan pOla Or yOgu puNarndha * oLi maNi vaNNan kaNNan * kaRai aNi mUkkudaip puLLaik kadAvi * asuraraik kAyndha ammAn * niRai pugazh Eththiyum pAdiyum Adiyum * yAnoru muttilanE *",
            3: "muttil pal bOgaththoru thani nAyagan * mUvulagukkuriya * kattiyaith thEnai amudhai * nan pAlaik kaniyaik karumbu thannai * mattavizh thaNNan thuzhAy mudiyAnai vaNangi * avan thiRaththup patta pinnai * iRai Agilum * yAn en manaththup parivilanE *",
            4: "parivinRi vANanaik kAththumenRu * anRu padaiyodum vandhedhirndha * thiripuram seRRavanum maganum * pinnum angiyum pOr tholaiyap * poru siRaip puLLaik kadAviya * mAyanai Ayanaip poRchakkaraththu ariyinai * achchudhanaip paRRi * yAn iRaiyEnum idar ilanE *",
            5: "idar inRiyE oru nAL oru pOzhdhil * ellA ulagum kazhiyap * padar pugazhp pArththanum vaidhikanum * udan ERath thiN thEr kadavich * chudar oLiyAy ninRa thannudaich chOdhiyil * vaidhikan piLLaigaLai * udalodum koNdu koduththavanaip paRRi * onRum thuyar ilanE. *",
            6: "thuyaril sudar oLi thannudaich chOdhi * ninRa vaNNam niRkavE * thuyaril maliyum manisar piRaviyil * thOnRik kaN kANa vandhu * thuyarangaL seydhu than dheyva nilai ulagil * puga uykkum ammAn * thuyaramil sIrk kaNNan mAyan pugazh thuRRa * yAn Or thunbam ilanE *",
            7: "thunbamum inbamum Agiya * sey vinaiyAy ulagangaLumAy * inbam il vennaragAgi * iniya nal vAn suvarggangaLumAy * man pal uyirgaLumAgip * pala pala mAya mayakkukkaLAl * inbuRum iv viLaiyAttudaiyAnaip peRRu * Edhum allal ilanE *",
            8: "allalil inbam aLaviRandhu engum * azhagamar sUzhoLiyan * alli malar magaL bOga mayakkukkaL * Agiyum niRkum ammAn * ellaiyil gyAnaththan gyAnamahdhE koNdu * ellAk karumangaLum sey * ellaiyil mAyanaik kaaNNanaith thAL paRRi * yAnOr dhukkam ilanE *",
            9: "dhukkamil gyAnach chudaroLi mUrththi * thuzhAy alangal perumAn * mikka pal mA mAyangaLAl vigirudham seydhu * vENdumuruvu koNdu * nakka pirAnOdu ayan mudhalAga * ellArum evaiyum thannuL okka odunga vizhunga vallAnaip peRRu * onRum thaLarvilanE *",
            10: "thaLarvinRiyE enRum engum parandha * thani mudhal gyAnam onRAy * aLavudai aim pulangaL aRiyA vagaiyAl * aruvAgi niRkum * vaLaroLi Isanai mUrththiyai * bUdhangaL aindhai iru sudaraik * kiLaroLi mAyanaik kaNNanaith thAL paRRi * yAn onRum kEdilanE *",
            11: "kEdil vizhuppugazhk kEsavanaik * kurugUrch chatakOpan sonna * pAdal Or AyiraththuL * ivaiyum oru paththum payiRRa vallArgatku * avan nAdum nagaramum nagudan kANa * nalanidai Urdhi paNNi * vIdum peRuththith than mUvulagukkum tharum * oru nAyagamE *"
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