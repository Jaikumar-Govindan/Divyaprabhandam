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
            1: "🙏 minniDai maDavArgaL ninnaruL sUDuvAr * munbu nAn adhanjchuvan * mannuDai ilanggai * araN kAyndha mAyavanE! *** unnuDaiya suNDAyam nAn aRivan * ini adhu koNDu seyvadhu en? * ennuDaiya pandhum kazhalum * thandhu pOgu nambI!",
            2: "pOgu nambI! un thAmarai purai kaNNiNaiyum * sevvAy muRuvalum * AkulanggaL seyya * azhidhaRkE nORROmE yAm? *** thOgai mA mayilArgaL ninnaruL sUDuvAr * sevi Osai vaiththu ezha * AgaL pOga viTTuk * kuzhal Udhu pOy irundhE",
            3: "pOy irundhu nin puLLuvam aRiyAdhavarkku * urai nambI! * nin seyya vAy irungkaniyum kaNgaLum * viparIdham innAL *** vEy irunthaDanthOLinAr * iththiruvaruL peRuvAr yavar kol? * mA irungkaDalaik kaDaindha * perumAnAlE",
            4: "Alin nIL ilai Ezhulagam uNDu * anRu nI kiDandhAy * un mAyanggaL mElai vAnavarum aRiyAr * ini em paramE? *** vElinEr thaDangkaNNinAr * viLaiyADu sUzhalaich sUzhavE ninRu * kAli mEykka vallAy! * emmai nI kazhaRElE",
            5: "kazhaREl nambI! * un kaithavam maNNum viNNum nankaRiyum * thiN chakkara nizhaRu thol paDaiyAy! * unakku onRu uNarththuvan nAn *** mazhaRu thEn mozhiyArgaL ninnaruL sUDuvAr * manam vADi niRka * em kuzhaRu pUvaiyoDum * kiLiyODum kuzhagElE",
            6: "kuzhagi enggaL kuzhamaNan koNDu * kOyinmai seydhu kanmam onRu illai * pazhagi yAm iruppOm * paramE iththiruvaruLgaL? *** azhagiyAr ivvulagu mUnRukkum * thEvimai thaguvAr palar uLar * kazhagam EREl nambI! * unakkum iLaidhE kanmamE",
            7: "kanmam anRu enggaL kaiyil pAvai paRippadhu * kaDal njAlam uNDiTTa * ninmalA! neDiyAy! * unakkElum pizhai pizhaiyE *** vanmamE solli emmai nI viLaiyADudhi * adhu kETkil en aimAr * thanma pAvam ennAr * oru nAnRu thaDi piNakkE",
            8: "piNakki yAvaiyum yAvarum * pizhaiyAmal pEdhiththum pEdhiyAdhadhOr * kaNakkil kIrththi veLLak * kadhir njAna mUrththiyinAy! *** iNakki emmai em thOzhimAr * viLaiyADap pOdhumin ennap pOndhOmai * uNakki nI vaLaiththAl * en sollAr ugavAdhavarE!",
            9: "ugavaiyAl nenjcham uLLurugi * un thAmaraith thaDangkaN vizhigaLin * agavalaippaDuppAn * azhiththAy un thiruvaDiyAl *** thagavu seydhilai enggaL siRRilum * yAm aDu siRu sORum kaNDu * nin muga oLi thigazha * muRuval seydhu ninRilaiyE",
            10: "ninRu ilanggu muDiyinAy! * irupaththOr kAl arasu kaLai kaTTa * venRi nIL mazhuvA! * viyan njAlam mun paDaiththAy! *** inRu ivvAyar kulaththai vIDuyyath thOnRiya * karumANikkach suDar! * nin thannAl nalivE paDuvOm * enRum AychchiyOmE",
            11: "🙏 Aychchi Agiya annaiyAl * anRu veNNey vArththaiyuL * sIRRamuNDu azhu kUththa appan thannaik * kurugUrch saDakOpan *** Eththiya thamizh mAlai * AyiraththuL ivaiyum Or paththu isaiyoDum * nAth thannAl navila uraippArkku * illai nalkuravE",
        },
        'TVM.6.3.steps': {
            1: "🙏 nalkuravum selvum * naragum suvarkkamumAy * vel pagaiyum naTpum * viDamum amudhamumAy *** pal vagaiyum parandha * perumAn ennai ALvAnai * selvam malgu kuDith * thiruviNNagark kaNDEnE",
            2: "kaNDa inbam thunbam * kalakkanggaLum thERRamumAy * thaNDamum thaNmaiyum * thazhalum nizhalumAy *** kaNDu kODaRku ariya * perumAn ennai ALvAn Ur * theNthiraip punal sUzh * thiruviNNagar nannagarE",
            3: "nagaramum nADugaLum * njAnamum mUDamumAy * nigaril sUzh suDarAy iruLAy * nilanAy visumbAy *** sigara mADanggaL sUzh * thiruviNNagarch chErndha pirAn * pugar koL kIrththi allAl illai * yAvarkkum puNNiyamE",
            4: "puNNiyam pAvam * puNarchchi pirivu enRa ivaiyAy * eNNamAy maRappAy * uNmaiyAy inmaiyAy allanAy *** thiNNa mADanggaL sUzh * thiruviNNagarch chErndha pirAn * kaNNan innaruLE * kaNDu koNmingaL kaithavamE",
            5: "kaithavam semmai * karumai veLumaiyumAy * mey poy iLamai mudhumai * pudhumai pazhamaiyumAy *** seyya thiNmadhiL sUzh * thiruviNNagarch chErndha pirAn * peydha kAvu kaNDIr * perundhEvu uDai mUvulagE",
            6: "mUvulaganggaLumAy allanAy * ugappAy munivAy * pUvil vAzh magaLAyth * thavvaiyAyp pugazhAyp pazhiyAy *** dhEvar mEvith thozhum * thiruviNNagarch chErndha pirAn * pAviyEn manaththE * uRaiginRa paranjchuDarE",
            7: "paranjchuDar uDambAy * azhukku padhiththa uDambAy * karandhum thOnRiyum ninRum * kaithavanggaL seydhum *** viNNOr siranggaLAl vaNanggum * thiruviNNagarch chErndha pirAn * varangkoL pAdham allAl illai * yAvarkkum van saraNE",
            8: "van saraN surarkkAy * asurarkku vengkURRamumAy * than saraN nizhaR kIzh * ulagam vaiththum vaiyAdhum *** then saraN thisaikkuth * thiruviNNagarch chErndha pirAn * en saraN en kaNNan * ennai ALuDai en appanE",
            9: "en appan enakkAy iguLAy * ennaip peRRavaLAy * pon appan maNiya ppan * muththappan en appanumAy *** minnap pon madhiL sUzh * thiruviNNagarch chErndha appan * than oppAr illappan * thandhanan thana thAL nizhalE",
            10: "nizhal veyyil siRumai perumai * kuRumai neDumaiyumAy * suzhalvana niRpana * maRRumAy avai allanumAy *** mazhalai vAy vaNDu vAzh * thiruviNNagar mannu pirAn * kazhalgaL anRi * maRROr kaLaikaN ilam kANmingaLE",
            11: "🙏 kANmingaL ulagIr! enRu * kaN mugappE nimirndha * thAL iNaiyan thannaik * kurugUrch saDakOpan sonna *** ANai Ayiraththuth * thiruviNNagarp paththum vallAr * kONai inRi viNNOrkku * enRum Avar kuravargaLE",

        },
        'TVM.6.4.steps': {
            1: "🙏 kuravai AychchiyarODu kOththadhum * kunRam onRu Endhiyadhum * uravu nIrp poygai nAgam kAyndhadhum * uTpaDa maRRum pala *** araviR paLLip pirAn than * mAya vinaigaLaiyE alaRRi * iravum nanpagalum thavirgilam * enna kuRaivu namakkE?",
            2: "kEyath thIngkuzhal UdhiRRum * nirai mEyththadhum keNDai oNkaN * vAsap pUngkuzhal pinnai thOLgaL maNandhadhum * maRRum pala *** mAyak kOlap pirAn than * seygai ninaindhu manam kuzhaindhu * nEyaththODu kazhindha pOdhu * enakku evvulagam nigarE?",
            3: "nigaril mallaraich seRRadhum * nirai mEyththadhum nIL neDungkai * sigara mA kaLiRu aTTadhum * ivai pOlvanavum piRavum *** pugar koL sOdhip pirAn than * seygai ninaindhu pulambi * enRum nugara vaigal vaigap peRREn * enakku en ini nOvadhuvE?",
            4: "nOva Aychchi uralODu Arkka * iranggiRRum vanjchap peNNai * sAvap pAl uNDadhum * Ur sagaDam iRach sADiyadhum *** dhEvak kOlap pirAn than * seygai ninaindhu manam kuzhaindhu * mEvak kAlanggaL kUDinEn * enakku en ini vENDuvadhE?",
            5: "vENDith dhEvar irakka vandhu piRandhadhum * vInggiruL vAy pUNDu * anRu annai pulambap pOy * anggOr Aykkulam pukkadhum *** kANDal inRi vaLarndhu * kanjchanaith thunjcha vanjcham seydhadhum * INDu nAn alaRRap peRRen * enakku enna igal uLadhE?",
            6: "igal koL puLLaip piLandhadhum * imil ERugaL seRRadhuvum * uyar koL sOlaik kurundhu osiththadhum * uTpaDa maRRum pala *** agal koL vaiyam aLandha mAyan * en appan than mAyanggaLE * pagal irAp paravap peRREn * enakku enna manap parippE?",
            7: "manap parippODu * azhukku mAniDa sAdhiyil thAn piRandhu * thanakku vENDu uruk koNDu * thAn thana sIRRaththinai muDikkum *** punath thuzhAy muDi mAlai mArban * en appan than mAyanggaLE * ninaikkum nenjchu uDaiyEn * enakku ini yAr nigar nINilaththE?",
            8: "nINilaththoDu vAn viyappa * niRai perum pOrgaL seydhu * vANan Ayiram thOL thuNiththadhum * uTpaDa maRRum pala *** mANiyAy nilam koNDa mAyan * en appan than mAyanggaLE * kANum nenjchu uDaiyEn * enakku ini enna kalakkam uNDE?",
            9: "kalakka Ezh kaDal Ezh malai * ulagu Ezhum kazhiyak kaDAy * ulakkath thEr koDu senRa mAyamum * uTpaDa maRRum pala *** valakkai Azhi iDakkai sanggam * ivai uDai mAl vaNNanai * malakku nA uDaiyERku * mARuLadhO immaNNin misaiyE?",
            10: "maN misaip perum bAram nIngga * Or bAradha mA perum pOr paNNi * mAyanggaL seydhu * sEnaiyaip pAzh paDa nURRiTTup pOy *** viN misaith thana thAmamE puga * mEviya sOdhi than thAL * naNNi nAn vaNanggap peRRen * enakku Ar piRar nAyagarE?",
            11: "🙏 nAyagan muzhu Ezh ulagukkumAy * muzhu Ezh ulagum * than vAyagam puga vaiththu umizhndhu avaiyAy * avai allanumAm *** kEsavan aDiyiNai misaik * kurugUrch saDakOpan sonna * thUya Ayiraththu ippaththAl * paththar Avar thuvaL inRiyE",
        },
        'TVM.6.5.steps': {
            1: "🙏 thuvaLil mA maNi mADam Onggu * tholaivilli manggalam thozhum ivaLai * nIr ini annaimIr! * umakku Asai illai viDuminO *** thavaLa oN sanggu chakkaram enRum * thAmaraith thaDanggaN enRum * kuvaLai oN malark kaNgaL nIr malga * ninRu ninRu kumuRumE",
            2: "kumuRum Osai vizhavolith * tholaivilli manggalam koNDu pukku * amudha men mozhiyALai * nIr umakku Asai inRi agaRRinIr *** thimir koNDAl oththu niRkum * maRRivaL dhEva dhEva pirAn enRE * nimiyum vAyoDu kaNgaL nIr malga * nekkosindhu karaiyumE",
            3: "karai koL paimpozhil thaN paNaith * tholaivilli manggalam koNDu pukku * urai koL in mozhiyALai * nIr umakku Asai inRi agaRRinIr *** thirai koL pauvaththuch sErndhadhum * thisai njAlam thAvi aLandhadhum * niraigaL mEyththadhumE pidhaRRi * neDungkaN nIr malga niRkumE",
            4: "niRkum nAnmaRai vANar vAzh * tholaivilli manggalam kaNDa pin * aRkam onRum aRa uRAL * malindhAL kaNDIr ivaL annaimIr! *** kaRkum kalvi ellAm * karungkaDal vaNNan kaNNa pirAn enRE * oRkam onRum ilaL * ugandhu ugandhu uL magizhndhu kuzhaiyumE",
            5: "kuzhaiyum vANmugaththu Ezhaiyaith * tholaivilli manggalam koNDu pukku * izhai koL sOdhich senthAmaraik kaN pirAn * irundhamai kATTinIr *** mazhai peydhAl okkum kaNNa nIrinoDu * anRu thoTTum maiyAndhu * ivaL nuzhaiyum sindhaiyaL annaimIr! * thozhum aththisai uRRu nOkkiyE",
            6: "nOkkum pakkam ellAm * karumboDu sennel Onggu senthAmarai * vAykkum thaN porunal * vaDakarai vaN tholaivilli manggalam *** nOkkumEl aththisai allAl * maRu nOkkilaL vaigal nAL thoRum * vAyk koL vAsagamum * maNi vaNNan nAmamE ivaL annaimIr!",
            7: "annaimIr! aNi mA mayil * siRu mAn ivaL nammaik kai valindhu * enna vArththaiyum kETkuRAL * tholaivilli manggalam enRallAl *** munnam nORRa vidhi kolO? * mugil vaNNan mAyangkolO? * avan chinnamum thiru nAmamum * ivaL vAyanagaL thirundhavE",
            8: "thirundhu vEdhamum vELviyum * thiru mA magaLirum thAm * malin thirundhu vAzh porunal * vaDakarai vaN tholaivilli manggalam *** karunthaDangkaNNi kai thozhudha * annAL thoDanggi innAL thoRum * irundhu irundhu aravindha lOchana! * enRenRE naindhu iranggumE",
            9: "iranggi nAL thoRum vAyverIi * ivaL kaNNa nIrgaL alamara * maranggaLum iranggum vagai * maNi vaNNavO! enRu kUvumAl *** thuranggam vAy piLandhAn uRai * tholaivilli manggalam enRu * than karanggaL kUppith thozhum * avvUrth thiru nAmam kaRRadhaR pinnaiyE",
            10: "pinnai kol? nila mA magaL kol? * thiru magaL kol? piRandhiTTAL * enna mAyangkolO? * ivaL neDumAl enRE ninRu kUvumAl *** munni vandhu avan ninRu irundhu uRaiyum * tholaivilli manggalam senniyAl vaNanggum * avvUrth thiru nAmam * kETpadhu sindhaiyE",
            11: "🙏 sindhaiyAlum sollAlum seygaiyinAlum * dhEva pirAnaiyE * thandhai thAy enRu aDaindha * vaN kurugUravar saDakOpan *** mundhai AyiraththuL ivai * tholaivilli manggalaththaich sonna * senthamizh paththum vallAr * aDimai seyvAr thirumAlukkE",
        },
        'TVM.6.6.steps': {
            1: "🙏 mAlukku * vaiyam aLandha maNALaRku * nIlak karu niRa * mEga niyAyaRku *** kOlach senthAmaraik kaNNaRku * en konggalar Elak kuzhali * izhandhadhu sanggE",
            2: "sanggu vil vAL thaNDu * chakkarak kaiyaRku * sengkani vAych * seyya thAmaraik kaNNaRku *** konggalar thaNNanthuzhAy * muDiyAnukku * en manggai izhandhadhu * mAmai niRamE",
            3: "niRam kariyAnukku * nIDu ulaguNDa * thiRam kiLar vAych * siRu kaLvan avaRku *** kaRanggiya chakkarak * kaiyavanukku * en piRanggu irungkUndhal * izhandhadhu pIDE",
            4: "pIDuDai nAnmuganaip * paDaiththAnukku * mADuDai vaiyam * aLandha maNALaRku *** nADuDai mannarkkuth * thUdhu sel nambikku * en pADuDai algul * izhandhadhu paNbE",
            5: "paNbuDai vEdham * payandha paranukku * maN purai vaiyam * iDandha varAgaRku *** theN punal paLLi * em dhEva pirAnukku * en kaN punai kOdhai * izhandhadhu kaRpE",
            6: "kaRpagak kAvana * naR pala thOLaRku * poR suDark kunRu anna * pUnthaN muDiyaRku *** naR pala thAmarai * nAL malark kaiyaRku * en viR puruvak koDi * thORRadhu meyyE",
            7: "mey amar pal kalan * nanku aNindhAnukku * pai aravin aNaip * paLLiyinAnukku *** kaiyoDu kAl seyya * kaNNa pirAnukku* en thaiyal izhandhadhu * thannuDaich sAyE",
            8: "sAyak kurundham * osiththa thamiyaRku * mAyach sagaDam * udhaiththa maNALaRku *** pEyaip piNam paDap * pAl uN pirAnukku * en vAsak kuzhali * izhandhadhu mANbE",
            9: "mANbamai kOlaththu * em mAyak kuRaLaRku * sEN suDark kunRanna * senjchuDar mUrththikku *** kAN perum thORRaththu * em kAguththa nambikku * en pUN punai menmulai * thORRadhu poRpE",
            10: "poRpamai nIL muDip * pUnthaN thuzhAyaRku * maR poru thOL uDai * mAyap pirAnukku *** niRpana pal uruvAy * niRku mAyaRku * en kaRpuDaiyATTi * izhandhadhu kaTTE",
            11: "🙏 kaTTezhil sOlai * nal vEngkaDa vANanai * kaTTezhil then kurugUrch * saDakOpan sol *** kaTTezhil Ayiraththu * ippaththum vallavar * kaTTezhil vAnavar * bOgam uNbArE",
        },
        'TVM.6.7.steps': {
            1: "🙏 uNNum sORu parugu nIr * thinnum veRRilaiyum ellAm kaNNan * emperumAn enRenRE * kaNgaL nIrgaL malgi *** maNNinuL avan sIr * vaLam mikka avan Ur vinavi * thiNNam en iLa mAn pugum Ur * thirukkOLUrE",
            2: "Urum nADum ulagamum * thannaip pOl * avanuDaiya pErum thArgaLumE pidhaRRak * kaRpu vAn iDaRi *** sEru nal vaLam sEr * pazhanath thirukkOLUrkkE * pOrungkol? uraiyIr * koDiyEn koDi pUvaigaLE!",
            3: "pUvai paingkiLigaL * pandhu thUdhai pUm puTTilgaL * yAvaiyum thirumAl * thiru nAmanggaLE kUvi ezhum *** en pAvai pOy inith * thaN pazhanath thirukkOLUrkkE * kOvai vAy thuDippa * mazhaik kaNNoDu en seyyungkolO?",
            4: "kollai enbar kolO? * guNam mikkanaL enbar kolO? * sillai vAyp peNDugaL * ayaR sEri uLLArum ellE! *** selvam malgi avan kiDandha * thirukkOLUrkkE * mel iDai nuDangga * iLa mAn sella mEvinaLE",
            5: "mEvi naindhu naindhu viLaiyADal uRAL * en siRuth thEvi pOy * inith than thirumAl * thirukkOLUril *** pUviyal pozhilum * thaDamum avan kOyilum kaNDu * Avi uL kuLira * engnganE ugakkungkol inRE?",
            6: "inRu enakku udhavAdhu aganRa * iLa mAn inip pOy * thenthisaith thiladham anaiya * thirukkOLUrkkE senRu *** than thirumAl thiruk kaNNum * sevvAyum kaNDu * ninRu ninRu naiyum * neDungkaNgaL pani malgavE",
            7: "malgu nIrk kaNNoDu * maiyal uRRa manaththanaLAy * allum nanpagalum * neDumAl enRu azhaiththu inip pOy *** selvam malgi avan kiDandha * thirukkOLUrkkE * olgi olgi naDandhu * engnganE pugungkol OsindhE?",
            8: "osindha nuNNiDai mEl * kaiyai vaiththu nondhu nondhu * kasindha nenjchinaLAyk * kaNNa nIr thuLumbach sellungkol? *** osindha oNmalarAL kozhunan * thirukkOLUrkkE * kasindha nenjchinaLAy * emmai nIththa em kArigaiyE",
            9: "kAriyam nallanagaL avai kANil * en kaNNanukku enRu * IriyAy iruppAL * idhellAm kiDakka inip pOy *** sEri pal pazhi thUy iraippath * thirukkOLUrkkE * nEr izhai naDandhAL * emmai onRum ninaiththilaLE",
            10: "ninaikkilEn dheyvanggAL! * neDungkaN iLa mAn inip pOy * anaiththu ulagum uDaiya * aravindha lOchananai *** thinaith thanaiyum viDAL * avan sEr thirukkOLUrkkE * manaikku vAn pazhiyum ninaiyAL * sella vaiththanaLE",
            11: "🙏 vaiththa mA nidhiyAm * madhusUdhanaiyE alaRRi * koththalar pozhil sUzh * kurugUrch saDakOpan sonna *** paththu nURRuL ippaththu * avan sEr thirukkOLUrkkE * siththam vaiththu uraippAr * thigazh ponnulagu ALvArE",
        },
        'TVM.6.8.steps': {
            1: "🙏 ponnlagu ALIrO? * buvani muzhudhu ALIrO? * nannalap puL inanggAL! * vinaiyATTiyEn nAn irandhEn *** mun ulaganggaL ellAm paDaiththa * mugil vaNNan kaNNan * en nalam koNDa pirAn thanakku * en nilaimai uraiththE",
            2: "maiyamar vAL neDungkaN * manggaimAr munbu en kai irundhu * neyyamar innaDisil * nichchal pAloDu mEvIrO? *** kaiyamar chakkaraththu * en kani vAyp perumAnaik kaNDu * meyyamar kAdhal sollik * kiLigAL! viraindhu ODi vandhE",
            3: "ODi vandhu en kuzhal mEl * oLi mA malar UdhIrO? * kUDiya vaNDinanggAL! * kurunADu uDaiya aivargaTkAy *** ADiya mA neDunthErp paDai * nIRezha seRRa pirAn * sUDiya thaN thuLavam uNDa * thU madhu vAygaL koNDE",
            4: "thU madhu vAygaL koNDu vandhu * en mullaigaL mEl thumbigAL! * pU madhu uNNach sellil * vinaiyEnaip poy seydhu aganRa *** mA madhu vAr thaNthuzhAy muDi * vAnavar kOnaik kaNDu * yAm idhuvO thakka ARu? * enna vENDum kaNDIr nunggaTkE",
            5: "nunggaTku yAn uraikkEn vammin * yAn vaLarththa kiLigAL! * vengkaN puL Urndhu vandhu * vinaiyEnai nenjcham kavarndha *** sengkaN karu mugilaich * seyya vAych sezhung kaRpagaththai * engguch senRAgilum kaNDu * idhuvO thakka ARu? enminE",
            6: "en minnu nUl mArvan * en karum perumAn en kaNNan * than mannu nIL kazhal mEl * thaNthuzhAy namakku anRi nalgAn *** kanmingaL enRu ummai yAn * kaRpiyA vaiththa mARRam solli * senmingaL thI vinaiyEn * vaLarththa siRu pUvaigaLE!",
            7: "pUvaigaL pOl niRaththan * puNDarIganggaL pOlum kaNNan * yAvaiyum yAvarumAy * ninRa mAyan en Azhip pirAn *** mAvai val vAy piLandha * madhusUdhaRku en mARRam solli * pAvaigaL! thIrkkiRRirE * vinaiyATTiyEn pAsaRavE",
            8: "pAsaRavu eydhi innE * vinaiyEn enai Uzhi naivEn? * AsaRu thUvi veLLaik kurugE! * aruL seydhoru nAL *** mAsaRu nIlach suDar muDi * vAnavar kOnaik kaNDu * EsaRum nummai allAl * maRu nOkkilaL pErththu maRRE",
            9: "pErththu maRROr kaLaikaN * vinaiyATTiyEn nAn onRilEn * nIrth thirai mEl ulavi * irai thErum puthA inanggAL! *** kArth thiraL mA mugil pOl * kaNNan viNNavar kOnaik kaNDu * vArththaigaL koNDu aruLi uraiyIr * vaigal vandhu irundhE",
            10: "vandhu irundhu ummuDaiya * maNich chEvalum nIrum ellAm * andharam onRum inRi * alar mEl asaiyum annanggAL! *** en thirumArvaRku ennai * innavARu ivaL kANmin enRu * mandhiraththu onRu uNarththi uraiyIr * maRu mARRanggaLE",
            11: "🙏 mARRanggaL Ayndhu koNDu * madhusUdha pirAn aDi mEl * nARRangkoL pUmpozhil sUzh * kurugUrch saDakOpan sonna *** thORRanggaL AyiraththuL * ivaiyum oru paththum vallAr * URRin kaN nuN maNal pOl * urugA niRpar nIrAyE",
        },
        'TVM.6.9.steps': {
            1: "🙏 nIrAy nilanAyth * thIyAyk kAlAy neDuvAnAy * sIrAr suDargaL iraNDAych * sivanAy ayanAnAy! *** kUrAr Azhi veNsanggu Endhik * koDiyEn pAl vArAy * oru nAL * maNNum viNNum magizhavE",
            2: "maNNum viNNum magizhak * kuRaLAy valangkATTi * maNNum viNNum koNDa * mAya ammAnE! *** naNNi unai nAn * kaNDu ugandhu kUththADa * naNNi oru nAL * njAlaththUDE naDavAyE",
            3: "njAlaththUDE naDandhum ninRum * kiDandhu irundhum * sAlap pala nAL * ugam thORu uyirgaL kAppAnE! *** kOlath thiru mA magaLODu * unnaik kUDAdhE * sAlap pala nAL * aDiyEn innam thaLarvEnO?",
            4: "thaLarndhum muRindhum * sagaDa asurar uDal vERA * piLandhu vIyath * thiruk kAl ANDa perumAnE! *** kiLarndhu piraman sivan * indhiran viNNavar sUzha * viLangga oru nAL * kANa vArAy viN mIdhE",
            5: "viN mIdhu iruppAy! malai mEl niRpAy! * kaDal sErppAy! * maN mIdhu uzhalvAy! * ivaRRuL enggum maRaindhu uRaivAy! *** eNmIdhu iyanRa puRa aNDaththAy! * enadhu Avi * uL mIdhADi * uruk kATTAdhE oLippAyO?",
            6: "pAy Or aDi vaiththu adhan kIzhp * paravai nilam ellAm thAy * Or aDiyAl * ellA ulagum thaDavandha mAyOn! *** unnaik kANbAn * varundhi enai nALum * thIyODu uDan sEr mezhugAy * ulagil thirivEnO?",
            7: "ulagil thiriyum karuma kadhiyAy * ulagamAy * ulagukkE Or uyirum AnAy! * puRa aNDaththu *** alagil polindha * thisai paththAya aruvEyO! * alagil polindha * aRivu ilEnukku aruLAyE",
            8: "aRivu ilEnukku aruLAy * aRivAr uyir AnAy! * veRi koL sOdhi mUrththi! * aDiyEn neDumAlE! *** kiRi seydhu ennaip puRaththiTTu * innam keDuppAyO? * piRidhu onRu aRiyA aDiyEn * Avi thigaikkavE",
            9: "Avi thigaikka * aivar kumaikkum chiRRinbam * pAviyEnaip * pala nI kATTip paDuppAyO? *** thAvi vaiyam koNDa * thaDanthAmaraigaTkE * kUvik koLLum kAlam * innam kuRugAdhO?",
            10: "kuRugA nILA * iRudhi kUDA enai Uzhi * siRugA perugA * aLavil inbam sErndhAlum *** maRukAl inRi mAyOn * unakkE ALAgum * siRu kAlaththai uRumO? * andhO! theriyilE",
            11: "🙏 theridhal ninaidhal * eNNal AgAth thirumAlukku * uriya thoNDar thoNDar * thoNDan saDakOpan *** theriyach chonna * Or AyiraththuL ippaththum * uriya thoNDar Akkum * ulagam uNDARkE",
        },
        'TVM.6.10.steps': {
            1: "🙏 ulagam uNDa peru vAyA! * ulappil kIrththi ammAnE! * nilavum suDar sUzh oLi mUrththi! * neDiyAy! aDiyEn AruyirE! *** thiladham ulagukkAy ninRa * thiruvEngkaDaththu emperumAnE! * kula thol aDiyEn una pAdham * kUDum ARu kURAyE",
            2: "kURAy nIRAy nilan Agik * koDu val asurar kulam ellAm * sIRA eRiyum thiru nEmi valavA! * dheyvak kOmAnE! *** sERAr sunaith thAmarai senthI malarum * thiruvEngkaDaththAnE! * ARA anbil aDiyEn * un aDi sEr vaNNam aruLAyE",
            3: "vaNNam aruL koL aNi mEga vaNNA! * mAya ammAnE! * eNNam pugundhu thiththikkum amudhE! * imaiyOr adhipadhiyE! *** theNNal aruvi maNi pon muththalaikkum * thiruvEngkaDaththAnE! * aNNalE! un aDi sEra * aDiyERku AvA ennAyE",
            4: "AvA! ennAdhu ulagaththai alaikkum * asurar vANAL mEl * thI vAy vALi mazhai pozhindha silaiyA! * thiru mA magaL kELvA! dhEvA! *** surargaL munik kaNanggaL virumbum * thiruvEngkaDaththAnE! * pUvAr kazhalgaL aru vinaiyEn * porundhum ARu puNarAyE",
            5: "puNarA ninRa maram Ezh * anRu eydha oru vil valavAvO! * puNarEy ninRa maram iraNDin * naDuvE pOna mudhalvAvO! *** thiNarAr mEgam enak kaLiRu sErum * thiruvEngkaDaththAnE! * thiNarAr sArnggaththu una pAdham * sErvadhu aDiyEn ennALE?",
            6: "ennALE? nAm maN aLandha * iNaith thAmaraigaL kANbadhaRku enRu * ennALum ninRu imaiyOrgaL Eththi * iRainjchi inam inamAy *** mey nA manaththAl vazhipADu seyyum * thiruvEngkaDaththAnE! * mey nAn eydhi ennAL * un aDikkaN aDiyEn mEvuvadhE?",
            7: "aDiyEn mEvi amarginRa amudhE! * imaiyOr adhipadhiyE! * koDiyA aDu puL uDaiyAnE! * kOlak kani vAyp perumAnE! *** seDiyAr vinaigaL thIr marundhE! * thiruvEngkaDaththu emperumAnE! * noDiyAr pozhudhum una pAdham * kANa nOlAdhu ARREnE",
            8: "nOlAdhu ARREn una pAdham * kANa enRu nuN uNarvin * nIlAr kaNDaththu ammAnum * niRai nAnmuganum indhiranum *** sElEy kaNNAr palar sUzha virumbum * thiruvEngkaDaththAnE! * mAlAy mayakki aDiyEn pAl * vandhAy pOlE vArAyE",
            9: "vandhAy pOlE vArAdhAy * vArAdhAy pOl varuvAnE! * senthAmaraik kaN sengkani vAy * nAl thOL amudhE! enadhuyirE *** sindhAmaNigaL pagar allaip pagal sey * thiruvEngkaDaththAnE! * andhO! aDiyEn una pAdham * agala killEn iRaiyumE",
            10: "🙏 agala killEn iRaiyum enRu * alar mEl manggai uRai mArbA! * nigaril pugazhAy! ulagam mUnRu uDaiyAy! * ennai ALvAnE! *** nigaril amarar munik kaNanggaL virumbum * thiruvEngkaDaththAnE! * pugal onRillA aDiyEn * un aDik kIzh amarndhu pugundhEnE",
            11: "🙏 aDik kIzh amarndhu pugundhu * aDiyIr! vAzhmin enRenRu aruL koDukkum * paDik kEzh illAp perumAnaip * pazhanak kurugUrch saDakOpan *** muDippAn sonna Ayiraththuth * thiruvEngkaDaththukku ivai paththum * piDiththAr piDiththAr vIRRirundhu * periya vAnuL nilAvuvarE"
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