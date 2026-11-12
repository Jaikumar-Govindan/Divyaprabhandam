

window.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.4.1.steps': {
            1: "🙏 oru nAyagamAy * ODa ulaguDan AnDavar * karu nAy kavarndha kAlar * sidhaigiya pAnaiyar *** peru nADu kANa * immaiyilE pichchai thAm koLvar * thiru nAraNan thAL * kAlam peRach sindhiththu uymminO",
            2: "uymmin thiRai koNarndhu * enRu ulagAnDavar * immaiyE tham in suvai maDavAraip * piRar koLLath thAm viTTu *** vem min oLi veyil * kAnagam pOyk kumai thinbargaL * sem min muDith thirumAlai * viraindhu aDi sErminO",
            3: "aDi sEr muDiyinar Agi * arasargaL thAm thozha * iDi sEr murasangkaL * muRRaththu iyamba irundhavar *** poDi sEr thugaLAyp pOvargaL * Adhalil nokkena * kaDi sEr thuzhAy muDik * kaNNan kazhalgaL ninaiminO",
            4: "ninaippAn pugil kaDal ekkalil * nuNmaNalin palar * enaiththOr ugangkaLum * ivvulagu ANDu kazhindhavar *** manaippAl marungkaRa * mAydhal allAl maRRuk kaNDilam * panaith thAL madha kaLiRu aTTavan * pAdham paNiminO",
            5: "paNimin thiru aruL ennum * amsIdhap paimpUm paLLi * aNi menkuzhalAr * inbak kalavi amudhunDAr *** thuNi munbu nAlap * pal Ezhaiyar thAm izhippach selvar * maNi minnu mEni * nam mAyavan pEr solli vAzhminO",
            6: "vAzhndhArgaL vAzhndhadhu * mA mazhai mokkuLin mAyndhu mAyndhu * AzhndhAr enRallAl * anRu mudhal inRu aRudhiyA *** vAzhndhArgaL vAzhndhE niRpar * enbadhillai niRkuRil * AzhndhAr kaDaR paLLi * aNNal aDiyavar AminO",
            7: "Am in suvai avai * ARODu aDisil uNDu Arndha pin * thU men mozhi maDavAr irakkap * pinnum thuRRuvAr *** Imin emakkoru thuRRu enRu * iDaRuvar Adhalin * kOmin thuzhAy muDi * Adhi anjchOdhi guNangkaLE",
            8: "guNangkoL niRai pugazh mannar * koDaik kaDan pUNDirundhu * iNangki ulaguDan Akkilum * Angku avanai illAr *** maNangkoNDa bOgaththu manniyum * mILvargaL mILvillai * paNangkoL aravaNaiyAn * thiru nAmam paDiminO",
            9: "paDi mannu palkalan paRRODu aRuththu * aimpulan venRu * seDi mannu kAyam seRRArgaLum * Angku avanai illAr *** kuDi mannum in suvarkkam eydhiyum * mILvargaL mILvillai * koDi mannu puL uDai * aNNal kazhalgaL kuRuguminO",
            10: "kuRuga miga uNarvaththoDu nOkki * ellAm viTTa * iRugal iRappu ennum * njAnikkum appayan illaiyEl *** siRuga ninaivadhOr pAsam uNDAm * pinnum vIDillai * maRugal il Isanaip paRRi * viDAviDil vIDu aqdhE",
            11: "🙏 aqdhE uyyap pugum ARenRu * kaNNan kazhalgaL mEl * koy pUm pozhil sUzh * kurugUrch saTakOpan kuRREval *** sey kOlaththu Ayiram * sIrth thoDaip pADal ivai paththum * aqgAmal kaRpavar * Azh thuyar pOy uyyaRpAlarE",
        },
        'TVM.4.2.steps': {
            1: "🙏 pAlanAy * Ezh ulaguNDu parivinRi * Alilai * annavasam seyyum aNNalAr *** thAL iNai mEl aNi * thaNNanthuzhAy enRE mAlumAl * valvinaiyEn * maDavalliyE",
            2: "valli sEr nuN iDai * Aychchiyar thammoDum * kollaimai seydhu * kuravai piNaindhavar *** nal aDi mEl aNi * nARu thuzhAy enRE sollumAl * sUzh vinaiyATTiyEn pAvaiyE",
            3: "pA iyal vEdha * nanmAlai pala koNDu * dhEvargaL mA munivar * iRainjcha ninRa *** sEvaDi mEl aNi * sempon thuzhAy enRE kUvumAl * kOL vinaiyATTiyEn kOdhaiyE",
            4: "kOdhila vaNpugazh * koNDu samayigaL * pEdhangkaL sollip * pidhaRRum pirAn paran *** pAdhangkaL mEl aNi * paimpon thuzhAy enRE OdhumAl * Uzh vinaiyEn thaDanthOLiyE",
            5: "thOLi sEr pinnai poruTTu * erudhu Ezh thazhIik kOLiyAr * kOvalanAr * kuDak kUththanAr *** thAL iNai mEl aNi * thaNNanthuzhAy enRE nALu nAL * naiginRadhAl * endhan mAdharE",
            6: "mAdhar mA maN maDandhai poruTTu * EnamAy * Adhi angkAlaththu * agal iDam kINDavar *** pAdhangkaL mEl aNi * paimpon thuzhAy enRE * OdhumAl eydhinaL * endhan maDandhaiyE",
            7: "maDandhaiyai * vaNkamalath thiru mAdhinai * thaDangkoL thAr mArbinil * vaiththavar thALin mEl *** vaDangkoL pUn thaNNanthuzhAy malarkkE * ivaL maDangkumAl * vANudhalIr! en maDak kombE",
            8: "kombu pOl sIthai poruTTu * ilangkai nagar * ambu eri uyththavar * thAL iNai mEl aNi *** vambavizh thaNNanthuzhAy malarkkE * ivaL nambumAl * nAn idhaRku en seygEn? * nangkaimIr!",
            9: "nangkaimIr! nIrum * Or peN peRRu nalginIr * engnganE sollugEn? * yAn peRRa Ezhaiyai *** sangku ennum chakkaram ennum * thuzhAy ennum * ingnganE sollum * irAp pagal en seygEn?",
            10: "en seygEn? ennuDaip pEdhai * en kOmaLam * en sollum * en vasamum allaL nangkaimIr! *** min sey pUN mArbinan * kaNNan kazhal thuzhAy * pon sey pUN men mulaikku enRu * meliyumE",
            11: "🙏 meliyu nOy thIrkkum * nam kaNNan kazhalgaL mEl * mali pugazh vaN kurugUrch * saTakOpan sol *** oli pugazh Ayiraththu * ippaththum vallavar * mali pugazh vAnavarkku Avar * naRkOvaiyE",
        },
        'TVM.4.3.steps': {
            1: "🙏  kOvai vAyAL poruTTu * ERRin eruththam iRuththAy! * madhiL ilangkaik kOvai vIyach silai kuniththAy! * kula nal yAnai maruppu osiththAy! *** pUvai vIyA nIr thUvip * pOdhAl vaNangkEnElum * nin pUvai vIyAm mEnikkup * pUsum sAndhu en nenjchamE",
            2: "pUsum sAndhu en nenjchamE * punaiyum kaNNi enadhuDaiya * vAsagam sey mAlaiyE * vAn paTTADaiyum aqdhE *** thEsam Ana aNi kalanum * en kai kUppuch seygaiyE * Isan njAlam uNDu umizhndha * endhai Eka mUrththikkE",
            3: "Eka mUrththi iru mUrththi * mUnRu mUrththi pala mUrththi Agi * aindhu pUdhamAy * iraNDu suDarAy aruvAgi *** nAgam ERi naDuk kaDaluL thuyinRa * nArAyaNanE! * un Agam muRRum agaththaDakki * Avi allal mAyththadhE",
            4: "mAyththal eNNi vAy mulai thandha * mAyap pEy uyir mAyththa * Aya mAyanE! * vAmananE! mAdhavA! *** pUth thaN mAlai koNDu * unnaip pOdhAl vaNangkEnElum * nin pUth thaN mAlai neDu muDikkup * punaiyum kaNNi enadhuyirE",
            5: "kaNNi enadhuyir * kAdhal kanagach sOdhi muDi mudhalA * eNNil pal kalankaLum * Elum ADaiyum aqdhE *** naNNi mUvulagum * naviRRum kIrththiyum aqdhE * kaNNan empirAn emmAn * kAla chakkaraththAnukkE",
            6: "kAla chakkaraththoDu * veNsangku am kai EndhinAy! * njAla muRRum uNDu umizhndha * nArAyaNanE! enRenRu *** Olam iTTu nAn azhaiththAl * onRum vArAy Agilum * kOlamAm en sennikku * un kamalam anna kurai kazhalE",
            7: "kurai kazhalgaL nITTi * maN koNDa kOla vAmanA! * kurai kazhal kai kUppuvArgaL * kUDa ninRa mAyanE! *** virai koL pUvum nIrum koNDu * Eththa mATTEnElum * un urai koL sOdhith thiru uruvam * ennadhAvi mEladhE",
            8: "ennadhAvi mElaiyAy * Er koL Ezh ulagamum * thunni muRRum Agi ninRa * sOdhi njAna mUrththiyAy *** unnadhu ennadhu Aviyum * ennadhu unnadhu Aviyum * inna vaNNamE ninRAy * enRuraikka vallEnE?",
            9: "uraikka vallEn allEn * un ulappil kIrththi veLLaththin * karaik kaN enRu selvan nAn? * kAdhal maiyal ERinEn *** puraippu ilAdha param paranE! * poy ilAdha paranjchuDarE! * iraiththu nalla mEn makkaL Eththa * yAnum EththinEn",
            10: "yAnum Eththi * Ezh ulagum muRRum Eththi * pinnaiyum thAnum Eththilum * thannai Eththa Eththa engkeydhum? *** thEnum pAlum kannalum * amudhum Agith thiththippa * yAnum empirAnaiyE EththinEn * yAn uyvAnE",
            11: "🙏 uyvu upAyam maRRu inmai thERik * kaNNan oNkazhalgaL mEl * seyya thAmaraip pazhanath * then nan kurugUrch saTakOpan *** poy il pADal AyiraththuL * ivaiyum paththum vallArgaL * vaiyam manni vIRRirundhu * viNNum ALvar maNNUDE",
        },
        'TVM.4.4.steps': {
            1: "🙏 maNNai irundhu thuzhAvi * vAmanan maN idhu ennum * viNNaith thozhudhu avan mEvu * vaikundham enRu kai kATTum *** kaNNai uNNIr malga ninRu * kaDal vaNNan ennum annE! * en peNNaip peru mayal seydhARku * en seygEn? pey vaLaiyIrE!",
            2: "pey vaLaik kaigaLaik kUppip * pirAn kiDakkum kaDal ennum * seyyadhOr njAyiRRaik kATTich * sirIdharan mUrththi Idhennum *** naiyum kaNNIr malga ninRu * nAraNan ennum annE! * en dheyva uruvil siRu mAn * seyginRadhu onRu aRiyEnE",
            3: "aRiyum senthIyaith thazhuvi * achchudhan ennum mey vEvAL * eRiyum thaN kARRaith thazhuvi * ennuDaik gOvindhan ennum *** veRi koL thuzhAy malar nARum * vinai uDaiyATTiyEn peRRa * seRi vaLai mun kaich siRu mAn * seyginRadhu en kaNNukku onRE",
            4: "onRiya thingkaLaik kATTi * oLi maNi vaNNanE! ennum * ninRa kunRaththinai nOkki * neDumAlE! vA enRu kUvum *** nanRu peyyum mazhai kANil * nAraNan vandhAn enRu Alum * enRu ina maiyalgaL seydhAr * ennuDaik kOmaLaththaiyE",
            5: "kOmaLa vAn kanRaip pulgik * gOvindhan mEyththana ennum * pOm iLa nAgaththin pin pOy * avan kiDakkai Idhennum *** Am aLavu onRum aRiyEn * aru vinaiyATTiyEn peRRa * kOmaLavalliyai mAyOn * mAl seydhu seyginRa kUththE",
            6: "kUththar kuDam eDuththu ADil * gOvindhanAm enA ODum * vAyththa kuzhal Osai kETkil * mAyavan enRu maiyAkkum *** Aychchiyar veNNeygaL kANil * avan uNDa veNNey Idhennum * pEychchi mulai suvaiththARku * en peN koDi ERiya piththE!",
            7: "ERiya piththinODu * ellA ulagu kaNNan paDaippu ennum * nIRu sevvE iDak kANil * neDumAl aDiyAr enRu ODum *** nARu thuzhAy malar kANil * nAraNan kaNNi Idhennum * thERiyum thERAdhum mAyOn * thiRaththanaLE iththiruvE",
            8: "thiru uDai mannaraik kANil * thirumAlaik kanDEnE ennum * uru uDai vaNNangkaL kANil * ulagaLandhAn enRu thuLLum *** karu uDaith thEvilgaL ellAm * kaDal vaNNan kOyilE ennum * veruvilum vIzhvilum OvAk * kaNNan kazhalgaL virumbumE",
            9: "virumbip pagavaraik kANil * viyal iDam uNDAnE! ennum * karum peru mEgangkaL kANil * kaNNan enRu ERap paRakkum *** perum pula Anirai kANil * pirAn uLan enRu pin sellum * arum peRal peNNinai mAyOn * alaRRi ayarppikkinRAnE",
            10: "ayarkkum suRRum paRRi nOkkum * agalavE nINOkkuk koLLum * viyarkkum mazhaik kaN thuLumba * vevvuyirk koLLum mey sOrum *** peyarththum kaNNA! enRu pEsum * perumAnE! vA enRu kUvum * mayal perungkAdhal en pEdhaikku * en seygEn? valvinaiyEnE",
            11: "🙏 valvinai thIrkkum kaNNanai * vaN kurugUrch saTakOpan * sol vinaiyAl sonna pADal * AyiraththuL ivai paththum *** nal vinai enRu kaRpArgaL * nalaniDai vaikundham naNNi * thol vinai thIra ellArum * thozhudhezha vIRRiruppArE",
        },
        'TVM.4.5.steps': {
            1: "🙏  vIRRirundhu Ezh ulagum * thanik kOl sella vIvil sIr * ARRal mikku ALum ammAnai * vem mA piLandhAn thannai *** pORRi enRE kaigaL Arath * thozhudhu sol mAlaigaL * ERRa nORRERku * ini enna kuRai ezhumaiyumE?",
            2: "maiya kaNNAL malar mEl uRaivAL * uRai mArbinan * seyya kOlath thaDangkaNNan * viNNOr perumAn thannai *** moyya sollAl isai mAlaigaL Eththi * uLLap peRREn * veyya nOygaL muzhudhum * viyan njAlaththu vIyavE",
            3: "vIvil inbam miga * ellai nigazhndha nam achchudhan * vIvil sIran malark kaNNan * viNNOr perumAn thannai *** vIvil kAlam isai mAlaigaL Eththi * mEvap peRREn * vIvil inbam miga * ellai nigazhndhanan mEviyE",
            4: "mEvi ninRu thozhuvAr * vinai pOga mEvum pirAn * thUvi ampuL uDaiyAn * aDal Azhi ammAn thannai *** nA iyalAl isai mAlaigaL Eththi * naNNap peRREn * Avi en Aviyai * yAn aRiyEn seydha ARRaiyE",
            5: "ARRa nalla vagai kATTum * ammAnai * amarar tham ERRai * ellAp poruLum viriththAnai emmAn thannai *** mARRa mAlai punaindhu Eththi * nALum magizhveydhinEn * kARRin munnam kaDugi * vinai nOygaL kariyavE",
            6: "kariya mEni misai * veLiya nIRu siRidhE iDum * periya kOlath thaDangkaNNan * viNNOr perumAn thannai *** uriya sollAl isai mAlaigaL Eththi * uLLap peRRERku * ariyadhu uNDO enakku? * inRu thoTTum ini enRumE",
            7: "enRum onRAgi * oththArum mikkArgaLum * than thanakku inRi ninRAnai * ellA ulagum uDaiyAn thannai *** kunRam onRAl mazhai kAththa pirAnaich * sol mAlaigaL * nanRu sUTTum vidhi eydhinam * enna kuRai namakkE?",
            8: "namakkum pUvin misai nangkaikkum * inbanai * njAlaththAr thamakkum * vAnaththavarkkum perumAnai *** thaNthAmarai sumakkum pAdhap perumAnaich * sol mAlaigaL * sollum ARu amaikka vallERku * ini yAvar nigar agal vAnaththE?",
            9: "vAnaththum vAnaththuL umbarum * maNNuLLum maNNin kIzhth thAnaththum * eNthisaiyum thavirAdhu ninRAn thannai *** kUnaRsangkath thaDak kaiyavanaik * kuDam ADiyai vAnak kOnaik * kavi solla vallERku * ini mARu uNDE?",
            10: "uNDu umizhndhum kaDandhum iDandhum * kiDandhu ninRum * koNDa kOlaththoDu vIRRirundhum * maNangkUDiyum *** kaNDa ARRAl thanadhE * ulagena ninRAn thannai * vaNthamizh nURka nORREn * aDiyArkku inba mAriyE",
            11: "🙏 mAri mARAdha thaNNammalai * vEngkaDaththu aNNalai * vAri mARAdha paimpUm pozhil sUzh * kurugUr nagar *** kAri mARan saTakOpan * sol Ayiraththu ippaththAl * vEri mARAdha pU mEl iruppAL * vinai thIrkkumE",
        },
        'TVM.4.6.steps': {
            1: "🙏 thIrppArai yAm ini * engnganam nADudhum annaimIr! * OrppAl ivvoNNudhal * uRRa nal nOy idhu thERinOm *** pOrp pAgu thAn seydhu * anRu aivarai velviththa * mAyap pOrth thErp pAganArkku * ivaL sindhai thuzhAyth thisaikkinRadhE",
            2: "thisaikkinRadhE ivaL nOy * idhu mikka perundheyvam * isaippinRi nIr aNangkADum * iLandheyvam anRidhu *** thisaippinRiyE * sangku chakkaram enRu ivaL kETka * nIr isaikkiRRir Agil * nanRE il peRum idhu kANminE",
            3: "idhu kANmin annaimIr! * ikkaTTuvichchi soRkoNDu * nIr edhuvAnum seydhu * angkOr kaLLum iRaichchiyum thUvEnmin *** madhu Ar thuzhAy muDi * mAyap pirAn kazhal vAzhththinAl * adhuvE ivaL uRRa nOykkum * arumarundhu AgumE",
            4: "marundhAgum enRu * angkOr mAya alavai soRkoNDu * nIr karunjchORum maRRaich senjchORum * kaLan izhaiththu en payan? *** orungkAgavE ulagEzhum * vizhungki umizhndhiTTa * perundhEvan pEr solla kiRkil * ivaLaip peRudhirE",
            5: "ivaLaip peRum parisu * ivvaNangku ADudhal anRandhO! * kuvaLaith thaDangkaNNum * kOvaich sevvAyum payandhanaL *** kavaLak kaDAk kaLiRaTTa pirAn * thirunAmaththAl * thavaLap poDik koNDu * nIr iTTiDumin thaNiyumE",
            6: "thaNiyum pozhudhu illai * nIr aNangku ADudhir annaimIr! * piNiyum ozhiginRadhu illai * perugum idhu allAl *** maNiyin aNi niRa mAyan * thamar aDi nIRu koNDu * aNiya muyalil * maRRillai kaNDIr ivvaNangkukkE",
            7: "aNangkukku arumarundhu enRu * angkOr ADum kaLLum parAy * suNangkai eRindhu * num thOL kulaikkappaDum annaimIr! *** uNangkal keDak * kazhudhai udhaDATTam kaNDen payan? * vaNangkIrgaL mAyap pirAn thamar * vEdham vallAraiyE",
            8: "vEdham vallArgaLaik koNDu * viNNOr perumAn thirup pAdham paNindhu * ivaL nOy idhu * thIrththuk koLLAdhu pOy *** Edham paRaindhu alla seydhu * kaLLUDu kalAyth thUy * kItha muzhavu iTTu * nIr aNangku ADudhal kIzhmaiyE",
            9: "kIzhmaiyinAl angkOr * kIzh magan iTTa muzhavin kIzh * nAzhmai pala solli * nIr aNangku ADum poy kANkilEn *** Ezhmaip piRappukkum sEmam * innOykkum IdhE marundhu * Uzhmaiyil kaNNa pirAn * kazhal vAzhththumin unniththE",
            10: "unniththu maRRoru dheyvam thozhAL * avanai allAl * num ichchai solli * num thOL kulaikkappaDum annaimIr! *** mannappaDu maRai vANanai * vaNthuvarApadhi mannanai * Eththumin * Eththudhalum thozhudhu ADumE",
            11: "🙏 thozhudhADi thUmaNi vaNNanukku * ATseydhu nOy thIrndha * vazhuvAdha thol pugazh * vaNkurugUrch saTakOpan *** sol vazhuvAdha AyiraththuL * ivai paththu veRigaLum * thozhudhADip pADa vallAr * thukka sIlam ilargaLE",
        },
        'TVM.4.7.steps': {

            1: "🙏 sIlam illAch siRiyan Elum * sey vinaiyO peridhAl * njAlam uNDAy! njAna mUrththI! * nArAyaNA! enRenRu *** kAlam thORum yAn irundhu * kai thalai pUsal iTTAl * kOla mEni kANa vArAy * kUviyum koLLAyE",
            2: "koLLa mALA inba veLLam * kOdhila thandhiDum * en vaLLalEyO! vaiyam koNDa * vAmanAvO! enRenRu *** naL irAvum nan pagalum * nAn irundhu Olam iTTAl * kaLLa mAyA! unnai * en kaN kANa vandhu IyAyE",
            3: "IvilAdha thI vinaigaL * eththanai seydhanan kol? * thAvi vaiyam koNDa endhAy! * dhAmOdharA! enRenRu *** kUvik kUvi nenjchurugik * kaN pani sOra ninRAl * pAvi nI enRu onRu sollAy * pAviyEn kANa vandhE",
            4: "kANa vandhu en kaN mugappE * thAmaraik kaN piRazha * ANi sempon mEni endhAy! * ninRaruLAy enRenRu *** nANam illAch siRu thagaiyEn * nAn ingku alaRRuvadhen? * pENi vAnOr kANa mATTAp * pIDuDai appanaiyE",
            5: "appanE! aDal AzhiyAnE! * Azh kaDalaik kaDaindha thuppanE! * un thOLgaL nAnkum * kanDiDak kUDungkol? enRu *** eppozhudhum kaNNa nIr koNDu * Avi thuvarndhu thuvarndhu * ippozhudhE vandhiDAy enRu * EzhaiyEn nOkkuvanE",
            6: "nOkki nOkki unnaik kANbAn * yAn enadhAvi uLLE * nAkku nILvan njAnam illai * nAL thORum ennuDaiya *** Akkai uLLum Avi uLLum * alla puRaththin uLLum * nIkkam inRi engkum ninRAy! * ninnai aRindhu aRindhE",
            7: "aRindhu aRindhu thERith thERi * yAn enadhAvi uLLE * niRaindha njAna mUrththiyAyai * ninmalam Aga vaiththu *** piRandhum seththum ninRu iDaRum * pEdhaimai thIrndhu ozhindhEn * naRunthuzhAyin kaNNi ammA! * nAn unnaik kaNDu koNDE",
            8: "kaNDu koNDu en kaigaL Ara * nin thiruppAdhangkaL mEl * eN thisaiyum uLLa pUk koNDu * Eththi ugandhu ugandhu *** thoNDarOngkaL pADi ADach * sUzh kaDal njAlaththuLLE * vaNthuzhAyin kaNNi vEndhE! * vandhiDa killAyE",
            9: "iDa kilEn OnRu aTTa killEn * aimpulan vella killEn * kaDavan Agik kAlam thORum * pUp paRiththu Eththa killEn *** maDa vannenjcham kAdhal kUra * valvinaiyEn ayarppAy * thaDavukinREn engkuk kANban * chakkaraththu aNNalaiyE?",
            10: "chakkaraththu aNNalE! enRu * thAzhndhu kaNNIr thadhumba * pakkam nOkki ninRu alandhEn * pAviyEn kANginRilEn *** mikka njAna mUrththi Aya * vEdha viLakkinai * en thakka njAnak kaNgaLAlE * kaNDu thazhuvuvanE",
            11: "🙏 thazhuvi ninRa kAdhal thannAl * thAmaraik kaNNan thannai * kuzhuvu mADath thenkurugUr * mARan saTakOpan *** sol vazhuvilAdha oNthamizhgaL * AyiraththuL ippaththum * thazhuvap pADi ADa vallAr * vaikundham ERuvarE",
        },
        'TVM.4.8.steps': {

            1: "🙏 ERALum iRaiyOnum * thisaimuganum thirumagaLum * kURALum thani uDamban * kulangkulamA asurargaLai *** nIRAgumpaDi Aga * nirumiththup paDai thoTTa * mARALan kavarAdha * maNi mAmai kuRaivilamE",
            2: "maNi mAmai kuRaivillA * malar mAdhar uRai mArban * aNimAnath thaDa varaith thOL * aDal Azhith thaDak kaiyan *** paNi mAnam pizhaiyAmE * aDiyEnaip paNi koNDa * maNi mAyan kavarAdha * maDa nenjchAl kuRaivilamE",
            3: "maDa nenjchAl kuRaivillA * magaL thAy seydha oru pEychchi * viDa nanjcha mulai suvaiththa * migu njAnach siRu kuzhavi *** paDa nAgaththaNaik kiDandha * paru varaith thOL parampuruDan * neDu mAyan kavarAdha * niRaivinAl kuRaivilamE",
            4: "niRaivinAl kuRaivillA * neDum paNaith thOL maDap pinnai * poRaiyinAl mulai aNaivAn * poru viDai Ezh aDarththu ugandha *** kaRaiyin Ar thuvar uDukkai * kaDaiyAvin kazhikOl kai * saRaiyinAr kavarAdha * thaLir niRaththAl kuRaivilamE",
            5: "thaLir niRaththAl kuRaivu illAth * thanich chiRaiyil viLappuRRa * kiLi mozhiyAL kAraNamAk * kiLar arakkan nagar eriththa *** kaLi malarth thuzhAy alangkal * kamazh muDiyan kaDal njAlaththu * aLimikkAn kavarAdha * aRivinAl kuRaivilamE",
            6: "aRivinAl kuRaivillA * agal njAlaththavar aRiya * neRi ellAm eDuththu uraiththa * niRai njAnaththu oru mUrththi *** kuRiya mAN uruvAgik * koDungkOLAl nilam koNDa * kiRi ammAn kavarAdha * kiLar oLiyAl kuRaivilamE",
            7: "kiLar oLiyAl kuRaivillA * ari uruvAyk kiLarndhu ezhundhu * kiLar oLiya iraNiyaNadhu * agal mArbam kizhiththu ugandha *** vaLar oLiya kanal Azhi * valampuriyan maNi nIla * vaLar oLiyAn kavarAdha * vari vaLaiyAl kuRaivilamE",
            8: "vari vaLaiyAl kuRaivillAp * peru muzhakkAl aDangkArai * eri azhalam puga Udhi * iru nila mun thuyar thavirththa *** therivariya sivan piraman * amarar kOn paNindhu Eththum * viri pugazhAn kavarAdha * mEgalaiyAl kuRaivilamE",
            9: "mEgalaiyAl kuRaivillA * melivuRRa agal algul * bOga magaL pugazhth thandhai * viRal vANan buyam thuNiththu *** nAga misaith thuyilvAn pOl * ulagellAm nanku oDungka * yOgu aNaivAn kavarAdha * uDambinAl kuRaivilamE",
            10: "uDambinAl kuRaivillA * uyir pirindha malaith thuNDam * kiDandhana pOl thuNi palavA * asurar kuzhAm thuNiththu ugandha *** thaDam punala saDai muDiyan * thani oru kURu amarndhu uRaiyum * uDambu uDaiyAn kavarAdha * uyirinAl kuRaivilamE",
            11: "🙏 uyirinAl kuRaivillA * ulagEzh thannuL oDukki * thayir veNNey uNDAnaith * thaDangkurugUrch saTakOpan *** seyir il sol isai mAlai * AyiraththuL ippaththAl * vayiram sEr piRappu aRuththu * vaikundham naNNuvarE",
        },
        'TVM.4.9.steps': {
            1: "🙏 naNNAdhAr muRuvalippa * nal uRRAr karaindhu Engka * eNNArAth thuyar viLaikkum * ivai enna ulagiyaRkai? *** kaNNALA! kaDal kaDaindhAy! * una kazhaRkE varum parisu * thaNNAvAdhu aDiyEnaip * paNi kaNDAy sAm ARE",
            2: "sAm ARum keDum ARum * thamar uRRAr thalaith thalaippeydhu * EmARik kiDandhu alaRRum * ivai enna ulagiyaRkai? *** Am ARu onRu aRiyEn nAn * aravaNaiyAy! ammAnE! * kUm ARE virai kaNDAy * aDiyEnaik kuRikkoNDE",
            3: "koNDATTum kulam punaivum * thamar uRRAr vizhu nidhiyum * vaNDAr pUngkuzhalALum * manai ozhiya uyir mAydhal *** kaNDu ARREn ulagiyaRkai * kaDal vaNNA! aDiyEnai * paNDE pOl karudhAdhu * un aDikkE kUyp paNi koLLE",
            4: "koL enRu kiLarndhu ezhundha * perunjchelvam neruppAga * koL enRu thamam mUDum * ivai enna ulagiyaRkai? *** vaLLalE! maNi vaNNA! * una kazhaRkE varum parisu * vaLLal seydhu aDiyEnai * unadhu aruLAl vAngkAyE",
            5: "vAngku nIr malar ulagil * niRpanavum thirivanavum * Angku uyirgaL piRappu iRappup * piNi mUppAl thagarppu uNNum *** Ingku idhan mEl vennaragam * ivai enna ulagiyaRkai? * vAngku enai nI maNi vaNNA! * aDiyEnai maRukkElE",
            6: "maRukki valvalaip paDuththik * kumaiththiTTuk konRuNbar * aRap poruLai aRindhu OrAr * ivai enna ulagiyaRkai? *** veRith thuLava muDiyAnE! * vinaiyEnai unakku aDimai aRak koNDAy! * ini en AramudhE! * kUy aruLAyE",
            7: "AyE! ivvulagaththu * niRpanavum thirivanavum * nIyE maRRoru poruLum * inRi nI ninRamaiyAl *** nOyE mUppu piRappu iRappup * piNiyE enRivai ozhiya * kUyE koL aDiyEnaik * koDu ulagam kATTElE",
            8: "kATTi nI karandhu umizhum * nilam nIr thI visumbu kAl * ITTi nI vaiththu amaiththa * imaiyOr vAzh thani muTTai *** kOTTaiyinil kazhiththu * enai un kozhunjchOdhi uyaraththu * kUTTariya thiruvaDikkaL * enjnjAnRu kUTTudhiyE?",
            9: "kUTTudhi nin kurai kazhalgaL * imaiyOrum thozhA vagai seydhu * ATTudhi nI aravaNaiyAy! * aDiyEnum aqdhu aRivan *** vETkai ellAm viDuththu * ennai un thiruvaDiyE sumandhu uzhala * kUTTariya thiruvaDikkaL * kUTTinai nAn kaNDEnE",
            10: "kaNDu kETTu uRRu mOndhu uNDu uzhalum * aingkaruvi kaNDa inbam * therivariya aLavillAch chiRRinbam *** oNthoDiyAL thirumagaLum * nIyumE nilA niRpa * kaNDa sadhir kaNDu ozhindhEn * aDaindhEn un thiruvaDiyE",
            11: "🙏 thiruvaDiyai nAraNanaik * kEsavanaip paranjchuDarai * thiruvaDi sErvadhu karudhich * sezhungkurugUrch saTakOpan *** thiruvaDi mEl uraiththa thamizh * AyiraththuL ippaththum * thiruvaDiyE aDaivikkum * thiruvaDi sErndhu onRuminE",
        },
        'TVM.4.10.steps': {
            1: "🙏 onRum dhEvum ulagum uyirum maRRum * yAdhum illA anRu * nAnmugan thannoDu * dhEvar ulagODu uyir paDaiththAn *** kunRam pOl maNi mADa nIDu * thirukkurugUr adhanuL * ninRa Adhip pirAn niRka * maRRaith dheyvam nADudhirE",
            2: "nADi nIr vaNangkum dheyvamum * ummaiyum mun paDaiththAn * vIDil sIrp pugazh Adhip pirAn * avan mEvi uRai kOyil *** mADa mALigai sUzhndhu azhagAya * thirukkurugUr adhanai * pADi ADip paravich senminkaL * pal ulagIr! parandhE",
            3: "parandha dheyvamum pal ulagum paDaiththu * anRu uDanE vizhungki * karandhu umizhndhu kaDandhu iDandhadhu * kaNDum theLiya killIr *** sirangkaLAl amarar vaNangkum * thirukkurugUr adhanuL * paran thiRam anRip pal ulagIr! * dheyvam maRRillai pEsuminE",
            4: "pEsa ninRa sivanukkum piraman thanakkum * piRarkkum nAyagan avanE * kabAla nan mOkkaththuk kaNDu koNmin *** thEsa mA madhiL sUzhndhu azhagAya * thirukkurugUr adhanuL * Isan pAl Or avam paRaidhal * en Avadhu ilingkiyarkkE?",
            5: " ilingkaththu iTTa purANaththIrum * samaNarum sAkkiyarum * valindhu vAdhu seyvIrgaLum * maRRu nundheyvamum Agi ninRAn *** malindhu sennel kavari vIsum * thirukkurugUr adhanuL *🙏 polindhu ninRa pirAn kanDIr * onRum poy illai pORRuminE",
            6: "pORRi maRROr dheyvam * pENap puRaththu iTTu * ummai innE thERRi vaiththadhu * ellIrum vIDu peRRAl ulagillai enRE *** sERRil sennel kamalam Ongku * thirukkurugUr adhanuL * ARRa vallavan mAyam kanDIr * adhu aRindhu aRindhu ODuminE",
            7: "ODi ODip pala piRappum piRandhu * maRROr dheyvam pADi ADip paNindhu * pal paDi kAl * vazhi ERik kanDIr *** kUDi vAnavar Eththa ninRa * thirukkurugUr adhanuL * ADu puTkoDi Adhi mUrththikku * aDimai puguvadhuvE",
            8: "pukku aDimaiyinAl thannaik kaNDa * mArkkaNDEyan avanai * nakka pirAnum anRu uyyak koNDadhu * nArAyaNan aruLE *** kokkalar thaDanthAzhai vElith * thirukkurugUr adhanuL * mikka Adhip pirAn niRka * maRRaith dheyvam viLambudhirE",
            9: "viLambum ARu samayamum * avai Agiya maRRum than pAl * aLandhu kAnDaRku ariyan Agiya * Adhip pirAn amarum *** vaLangkoL thaNpaNai sUzhndhu azhagAya * thirukkurugUr adhanai * uLangkoL njAnaththu vaimmin * ummai uyyak koNDu pOguRilE",
            10: "uRuvadhu Avadhu eththEvum * evvulagangkaLum maRRum than pAl * maRuvil mUrththiyODu oththu * iththanaiyum ninRa vaNNam niRkavE *** seRuvil sennel karumboDu Ongku * thirukkurugUr adhanuL * kuRiya mAN uru Agiya * nIL kuDak kUththanukku ATseyvadhE",
            11: "🙏 ATseydhu Azhip pirAnaich sErndhavan * vaNkurugUr nagarAn * nATkamazh magizh mAlai mArbinan * mARan saTakOpan *** vETkaiyAl sonna pADal * AyiraththuL ippaththum vallAr * mITchi inRi vaikundha mA nagar * maRRadhu kaiyadhuvE",
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