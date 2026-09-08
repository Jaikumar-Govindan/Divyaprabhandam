window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'NAT.0.steps':
    {
      1: "allinAL thAmarai mEl AraNangin inthuNaivi * malli nAdANda madamayil * - melliyalALAyarkula vEndhan AgaththAL then pudhuvaivEyar payandha viLakku *",
      2: "kOlach churisangai mAyan sevvAyin guNam vinavum seelaththanaL * then thirumalli nAdi * sezhunguzhal mEl mAlaith thodai thennarangarukku Iyum madhippudaiya sOlaik kiLi * avaL thUya naRpAdham thuNai namakkE *"
    },


    'NAT.1.steps':
    {
      1: "thaiyoru thingaLum tharai viLakkith * thaN maNdalamittu mAsi munnAL * aiya nuNmaNaR koNdu theruvaNindhu * azhaginukku alangariththu ananga dhEvA! * uyyavumAngolO enRu solli * unnaiyum umbiyaiyum thozhudhEn * veyyadhOr thazhal umizh chakkarak kai * vEngadavaRku ennai vidhikkiRRiyE *",
      2: "veLLai nuNmaNaR koNdu theruvaNindhu * veLvaraippadhan munnam thuRai padindhu * muLLumillAch chuLLi erimaduththu * muyanRu unnai nORkinREn kAma dhEvA! * kaLLavizh pUngaNai thoduththuk koNdu * kadalvaNNan enbadhOr pEr ezhudhi * puLLinai vAy piLandhAn enbadhOr * ilakkinil puga ennai eygiRRiyE *",
      3: "maththanan naRumalar murukkamalar koNdu * muppOdhum unnadi vaNangi * thaththuvamili enRu nenjerindhu * vAsagaththazhiththu unnai vaidhidAmE * koththalar pUngaNai thoduththuk koNdu * gOvindhan enbadhOr pEr ezhudhi * viththagan vEngadavANan ennum * viLakkinil puga ennai vidhikkiRRiyE *",
      4: "suvaril purANa! nin pEr ezhudhich * suRavanaR kodikkaLum thurangangaLum * kavarip piNAkkaLum karuppu villum * kAttith thandhEn kandAy kAma dhEvA! * avaraip pirAyam thodangi * enRum Adhariththu ezhundha en thadamulaigaL * thuvaraip pirAnukkE sangaRpiththuth * thozhudhu vaiththEn ollai vidhikkiRRiyE *",
      5: "vAnidai vAzhum avvAnavarkku * maRaiyavar vELviyil vaguththa avi * kAnidaith thirivadhOr nari pugundhu * kadappadhum mOppadhum seyvadhoppa * Unidai Azhi sangu uththamarkkenRu * unniththu ezhundha en thadamulaigaL * mAnidavarkkenRu pEchchuppadil * vAzhagillEn kaNdAy manmadhanE! *",
      6: "uruvudaiyAr iLaiyArgaL nallAr * Oththu vallArgaLaik koNdu * vaigal theruvidai edhir koNdu panguni nAL * thirundhavE nORkinREn kAma dhEvA! * karuvudai mugilvaNNan kAyAvaNNan * karuviLai pOl vaNNan kamala vaNNath * thiruvudai mugaththinil thirukkaNgaLAl * thirundhavE nOkkenakku aruL kaNday *",
      7: "kAyudai nellodu karumbamaiththuk * katti arisi aval amaiththu * vAyudai maRaiyavar mandhiraththAl * manmadhanE! unnai vaNanguginREn * thEsa munnaLandhavan thirivikkiraman thirukkaigaLAl ennaith thINdum vaNNam * sAyudai vayiRum en thadamulaiyum * tharaNiyil thalaippugazh tharakkiRRiyE *",
      8: "mAsudai udambodu thalai ulaRi * vAyppuram veLuththu orupOdhumuNdu * thEsudaith thiRaludaik kAma dhEvA! * nORkinRa nOnbinaik kuRikkoL kaNdAy * pEsuvadhonRu uNdu ingu emperumAn! * peNmaiyaith thalaiyudaiththu Akkum vaNNam * kEsava nambiyaik kAl pidippAL ennum * ippERu enakkaruL kaNdAy *",
      9: "thozhudhu muppOdhum unnadi vaNangith * thUmalar thUyth thozhudhu EththuginREn * pazhudhinRip pArkkadal vaNNanukkE * paNi seydhu vAzhap peRAvidil nAn * azhudhazhudhu alamandhu ammA vazhanga * ARRavum adhu unakku uRaikkum kaNdAy * uzhuvadhOr eruththinai nugangodu pAyndhu * UttaminRith thurandhAl okkumE *",
      10: "karuppu vil malark kaNaik kAma vELaik * kazhaliNai paNindhu angOr kari alaRa * maruppinai osiththup puL vAy piLandha * maNivaNNaRku ennai vaguththidenRu * poruppanna mAdam polindhu thOnRum * pudhuvaiyar kOn vittuchiththan kOdhai * viruppudai inthamizh mAlai vallAr * viNNavar kOn adi naNNuvarE *",
      11: "adivaravu: thai veLLai * maththam suvaril * vAnidai uru * kAyudai mAsudai * thozhudhu karuppu nAmam *"
    },
    'NAT.2.steps':
    {
      1: "nAmam Ayiram Eththa ninRa * nArAyaNA! naranE! * unnai mAmi than maganAgap peRRAl * emakku vAdhai thavirumE * kAmanpOtharu kAlam enRu * panguni nAL kadai pAriththOm * thImai seyyum sirIdharA! * engaL siRRil vandhu sidhaiyElE *",
      2: "inRu muRRum mudhugu nOva * irundhizhaiththa ichchiRRilai * nanRum kaNNuRa nOkki * nAngoLum Arvam thannaith thaNikidAy * anRu bAlaganAgi * Alilai mEl thuyinRa em AdhiyAy! * enRum undhanakku engaL mEl * irakkam ezhAdhadhu em pAvamE *",
      3: "guNdunIr uRai kOLarI! * madha yAnai kOL viduththAy * unnaik kaNdu mAluRuvOngaLaik * kadaik kaNgaLAlittu vAdhiyEl * vaNdal nuNmaNal theLLi * yAm vaLaik kaigaLAl siramappattOm * theN thiraik kadal paLLiyAy! * engaL siRRil vandhu sidhaiyElE *",
      4: "peyyumA mugil pOl vaNNA! * undhan pEchchum seygaiyum * engaLai maiyal ERRi mayakka * un mugam mAya mandhiram thAn kolO? * noyyar piLLaigaL enbadhaRku * unnai nOva nAngaL uraikkilOm * seyya thAmaraik kaNNinAy! * engaL siRRil vandhu sidhaiyElE *",
      5: "veLLai nuNmaNal koNdu * siRRil vichiththirappada * vIdhi vAyth theLLi nAngaL izhaiththa kOlam * azhiththiyAgilum undhan mEl * uLLam Odi urugal allAl * urOdam onRumilOm kaNdAy * kaLLa mAdhavA! kEsavA! * un mugaththana kaNgaL allavE *",
      6: "muRRilAdha piLLaigaLOm * mulai pOndhilAdhOmai * nAL thoRum siRRil mElittuk koNdu * nI siRidhuNdu thiNNena nAm adhu kaRRilOm * kadalai adaiththu arakkar kulangaLai * muRRavum seRRu * ilangaiyaip pUsalAkkiya sEvagA! * emmai vAdhiyEl *",
      7: "bEdham nangaRivArgaLOdu * ivai pEsinAl peridhu insuvai * yAdhum onRaRiyAdha piLLaigaLOmai * nI nalindhu en payan? * OdhamA kadal vaNNA! * un maNavAttimArodu sUzhaRum * sEdhu bandham thiruththinAy! * engaL siRRil vandhu sidhaiyElE *",
      8: "vattavAych chiRu thUdhaiyOdu * siRu suLagum maNalum koNdu * ittamA viLaiyAduvOngaLaich * chiRRil Idazhiththu en payan? * thottudhaiththu naliyEl kaNdAy * sudarch chakkaram kaiyil EndhinAy! * kattiyum kaiththAl innAmai * aRidhiyE kadal vaNNanE! *",
      9: "muRRaththUdu pugundhu * nin mugam kAttip punmuRuval seydhu * siRRilOdu engaL sindhaiyum * sidhaikkak kadavaiyO? gOvindhA! * muRRa maNNidam thAvi * viNNuRa nINdaLandhu koNdAy! * emmaip paRRi meyppiNakkittakkAl * indhap pakkam ninRavar en sollAr? *",
      10: "sIdhai vAy amudham uNdAy! * engaL siRRil nI sidhaiyEl enRu * vIdhi vAy viLaiyAdum * Ayar siRumiyar mazhalaich chollai * vEdha vAyth thozhilArgaL vAzh * villipuththUr man vittuchiththan than * kOdhai vAyth thamizh vallavar * kuRaivinRi vaigundham sErvarE *",
      11: "adivaravu: nAmam inRu * guNdu peyyum * veLLai muRRilAdha * pEdham vattam * muRRaththUdu sIdhai kOzhi *"
    },
    'NAT.3.steps': {
      1: "kOzhi azhaippadhan munnam * kudaindhu nIrAduvAn pOndhOm * Azhiyanjelvan ezhundhAn * aravaNai mEl paLLi koNdAy! * Ezhaimai ARRavum pattOm * ini enRum poygaikku vArOm * thOzhiyum nAnum thozhudhOm * thugilaip paNiththaruLAyE *",
      2: "idhuven pugundhadhu! ingandhO! * ippoygaikku evvARu vandhAy? * madhuvin thuzhAy mudi mAlE! * mAyanE! engaL amudhE! * vidhiyinmaiyAl adhu mAttOm * viththagap piLLAy! viraiyEl * kudhikoNdu aravil nadiththAy! * kurundhidaik kURai paNiyAy *",
      3: "ellE! Idhenna iLamai? * emmanaimAr kANil ottAr * pollAngu IdhenRu karudhAy * pUngurundhu ERi iruththi * villAl ilangai azhiththAy! * nI vENdiyadhellAm tharuvOm * pallArum kANAmE pOvOm * pattaip paNiththaruLAyE *",
      4: "parakka vizhiththu engum nOkkip * palar kudaindhAdum sunaiyil * arakka nillA kaNNa nIrgaL * alamaruginRavA pArAy * irakkamEl onRum ilAdhAy! * ilangai azhiththa pirAnE! * kurakkarasu AvadhaRindhOm * kurundhidaik kURai paNiyAy *",
      5: "kAlaik kathuviduginRa * kayalodu vALai viravi * vElaip pidiththu ennaimArgaLOttil * enna viLaiyAttO? * kOlach chiRRAdai palavum kondu * nI ERi irAdhE * kOlam kariya pirAnE! * kurundhidaik kURai paNiyAy *",
      6: "thadaththavizh thAmaraip poygaith * thALgaL em kAlaik kadhuva * vidaththEL eRindhAlE pOla * vEdhanai ARRavum pattOm * kudaththai eduththERa vittuk * kUththAda valla em kOvE! * padiRRai ellAm thavirndhu * engaL pattaip paNiththaruLAyE *",
      7: "nIrilE ninRu ayarkkinROm * nIdhi allAdhana seydhAy * Uragam sAlavum sEyththAl * Uzhi ellAm uNarvAnE! * Arvam unakkE udaiyOm * ammanaimAr kANil ottAr * pOra vidAy engaL pattaip * pUngurundhu ERi irAdhE *",
      8: "mAmimAr makkaLE allOm * maRRum ingu ellArum pOndhAr * thUmalark kaNgaL vaLarath * thollaiyirAth thuyilvAnE! * sEmamEl anRidhu sAlach * chikkena nAm idhu sonnOm * kOmaLa Ayar kozhundhE! * kurundhidaik kURai paNiyAy *",
      9: "kanjan valai vaiththa anRu * kAriruL ellil pizhaiththu * nenju dhukkam seyyap pOndhAy * ninRa ikkanniyarOmai * anja urappAL asOdhai * ANAda vittittu irukkum * vanjagap pEychchi pAl uNda * masimaiyilee! kURai thArAy *",
      10: "kanniyarOdu engaL nambi * kariya pirAn viLaiyAttai * ponniyal mAdangaL sUzhndha * pudhuvaiyar kOn pattan kOdhai * innisaiyAl sonna mAlai * Iraindhum vallavar thAm pOy * manniya mAdhavanOdu * vaigundham pukku iruppArE *",
      11: "adivaravu: kOzhi idhu * ellE parakka * kAlai thadaththu * nIril mAmimAr * kanjan kanniyarOdu theLLiyAr *"
    },
    'NAT.4.steps': {
      1: "theLLiyAr * palar kai thozhum dhEvanAr * vaLLal * mAlirunjOlai maNALanAr   ***  paLLi koLLum idaththu * adi kottida * koLLumAgil * nI kUdidu kUdalE! *",
      2: "* kAttil vEngadam * kaNNapura nagar * vAttam inRi * magizhndhuRai vAmanan   ***  OttarA vandhu * en kaip paRRi * thannodum kUttumAgil * nI kUdidu kUdalE! *",
      3: "pUmagan pugazh vAnavar * pORRudhaR kAmagan * aNi vANudhal * dhEvaki mAmagan   ***  migu sIr * vasudhEvar tham * kOmagan varil * kUdidu kUdalE! *",
      4: "AychchimArgaLum * Ayarum anjida * pUththa nIL * kadambERip pugap pAyndhu   ***  vAyththa kALiyan mEl * nadam Adiya * kUththanAr varil * kUdidu kUdalE! *",
      5: "mAda mALigai sUzh * madhuraip padhi nAdi * nandheruvin * naduvE vandhittu   ***  OdaimA * madha yAnai udhaiththavan * kUdumAgil * nI kUdidu kUdalE! *",
      6: "aRRavan * marudham muRiya nadai kaRRavan * kanjanai * vanjanaiyinAl seRRavan   ***  thigazhum madhuraip padhi * koRRavan varil * kUdidu kUdalE! *",
      7: "anRu innAdhana sey * sisupAlanum * ninRa nIL marudhum * erudhum puLLum   ***  venRi vEl * viRal kanjanum vIzha * mun konRavan varil * kUdidu kUdalE! *",
      8: "Aval anbudaiyAr tham * manaththanRi mEvalan * virai sUzh * thuvarApadhik kAvalan   ***  kanRu mEyththu viLaiyAdum * kOvalan varil * kUdidu kUdalE! *",
      9: "koNda kOlak * kuRaL uruvAych chenRu * paNdu mAvali than * peru vELviyil   ***  aNdamum nilanum * adi onRinAl * koNdavan varil * kUdidu kUdalE! *",
      10: "pazhagu nAnmaRaiyin poruLAy * madham ozhugu vAraNam * uyya aLiththa   ***  em azhaganAr * aNi Aychchiyar sindhaiyuL * kuzhaganAr varil * kUdidu kUdalE! *",
      11: "* Udal kUdal * uNardhal puNardhalai * nIdu ninRa * niRai pugazh Aychchiyar   ***  kUdalaik * kuzhaR kOdhai mun kURiya * pAdal paththum vallArkku * illai pAvamE *",
      12: "adivaravu: theLLiyAr kAttil * pUmagan AychchimArgaL * mAdam aRRavan * anRu Aval * koNda pazhagu * Udal mannu *"
    },
    'NAT.5.steps': {
      1: "* mannu perumpugazh mAdhavan * mAmaNi vaNNan maNimudi maindhan thannai * ugandhadhu kAraNamAga * en sangizhakkum vazhakkuNdE?   ***  punnai kurukkaththi njAzhal serundhip * podhumbinil vAzhum kuyilE! * panni eppOdhum irundhu viraindhu * en pavaLavAyan varak kUvAy",
      2: "veLLai viLi sangu idangaiyil koNda * vimalan enakku urukkAttAn * uLLam pugundhu ennai naiviththu * nALum uyirppeydhu kUththAttuk kANum   ***  kaLLavizh seNbagap pUmalar kOdhik * kaLiththisai pAdum kuyilE! * meLLa irundhu mizhaRRi mizhaRRAdhu * en vEngadavan varak kUvAy",
      3: "mAdhali thEr munbu kOl koLLa * mAyan irAvaNan mEl * saramAri thAy thalai aRRaRRu vIzhath * thoduththa thalaivan varavengum kANEn   ***  pOdhalar kAvil pudhu maNam nARap * poRivaNdin kAmaram kEttu * un kAdhaliyOdu udan vAzh kuyilE! * en karumANikkam varak kUvAy",
      4: "enburugi inavEl nedum kaNgaL * imai porundhA pala nALum * thunbak kadal pukku vaigundhan enbadhOr * thONi peRAdhu uzhalginREn   ***  anbudaiyAraip pirivuRu nOy * adhu nIyum aRidhi kuyilE! * pon purai mEnik karuLak kodiyudaip * puNNiyanai varak kUvAy ",
      5: "* mennadai annam parandhu viLaiyAdum * villipuththUr uRaivAn than * ponnadi kANbadhOr AsayinAl * en porukayaR kaNNiNai thunjA   ***  innadisilodu pAl amudhUtti * eduththa en kOlak kiLiyai * unnodu thOzhamai koLLuvan kuyilE! * ulagaLandhAn varak kUvAy ",
      6: "eththisaiyum amarar paNindhu Eththum * irudIkEsan vali seyya * muththanna veNmuRuval seyya vAyum * mulaiyum azhagazhindhEn nAn   ***  koththalar kAvil maNiththadam * kaNpadai koLLum iLanguyilE! * en thaththuvanai varak kUkiRRiyAgil * thalai allAl kaimmARilEnE ",
      7: "pongiya pARkadal paLLi koLvAnaip * puNarvadhOr AsaiyinAl * en kongai kiLarndhu kumaiththuk kudhugaliththu * Aviyai Agulam seyyum anguyilE! * unakkenna maRaindhuRaivu? * Azhiyum sangum oN thaNdum * thangiya kaiyavanai varak kUvil * nI sAlath tharumam peRudhi ",
      8: "sArngam vaLaiya valikkum * thadakkaich chadhuran poruththam udaiyan * nAngaL emmilirundhu ottiyagachchangam * nAnum avanum aRidhum   ***  thEngani mAmpozhil sendhaLir kOdhum * siRu kuyilE! * thirumAlai Angu viraindhu ollai kUgiRRiyAgil * avanai nAn seyvana kANE ",
      9: "paingiLi vaNNan sirIdharan enbadhOr * pAsaththu agappattirundhEn * pongoLi vaNdiraikkum pozhil vAzh kuyilE! * kuRikkoNdu idhu nI kEL   ***  sangodu chakkaraththAn varak kUvudhal * ponvaLai koNdu tharudhal * inguLLa kAvinil vAzhak karudhil * iraNdaththonREl thiNNam vENdum ",
      10: "anRulagam aLandhAnai ugandhu * adimaikkaN avan vali seyya * thenRalum thingaLum UdaRuththu * ennai naliyum muRaimai aRiyEn   ***  enRum ikkAvil irundhirundhu * ennaith thadhaiththAdhE nIyum kuyilE! * inRu nArAyaNanai varak kUvAyEl * inguththai ninRum thurappan",
      11: "* viNNuRa nINdu adi thAviya maindhanai * vERkaN madandhai virumbi * kaNNuRa en kadal vaNNanaik * kUvu karunguyilE! enRa mARRam   ***  paNNuRu nAnmaRaiyOr pudhuvai mannan * pattarpirAn kOdhai sonna * naNNuRu vAsaga mAlai vallAr *  namO nArAyaNAya enbArE",
      12: "adivaravu: mannu veLLai * mAthali enbu * mennadai eththisai * pongiya sArngam * paingiLi anRu viN vAraNam"
    },
    'NAT.6.steps':
    {
      1: "vAraNam Ayiram * sUzha valam seydhu * nAraNa nambi * nadakkinRAn enRedhir   ***  pUraNa poRkudam * vaiththup puram engum * thOraNam nAttak * kanAk kaNdEn thOzhI! nAn *",
      2: "nALai vadhuvai * maNam enRu nAL ittu * pALai kamugu * parisudaip pandhaR kIzh   ***  kOL ari mAdhavan * gOvindhan enbAn Or * kALai pugudhak * kanAk kaNdEn thOzhI! nAn *",
      3: "indhiran uLLitta * dhEvar kuzhAm ellAm * vandhirundhu ennai * magaL pEsi mandhiriththu   ***  mandhirak kOdi uduththi * maNa mAlai * andhari sUttak * kanAk kaNdEn thOzhI! nAn *",
      4: "nAl thisaith thIrththam koNarndhu * nani nalgi * pArppanach chittargaL * pallAr eduththEththi   ***  pUppunai kaNNip * punidhanOdu endhannai * kAppu nAN kattak * kanAk kaNdEn thOzhI! nAn *",
      5: "kadhiroLi dhIpam * kalasam udan Endhi * sadhir iLamangaiyar thAm * vandhedhir koLLa   ***  madhuraiyAr mannan * adi nilai thottu engum * adhirap pugudhak * kanAk kaNdEn thOzhI! nAn *",
      6: "maththaLam kotta * vari sangam ninRUdha * muththudaith thAmam * niRai thAzhndha pandhaR kIzh   ***  maiththunan nambi * madhusUdhan vandhu ennaik * kaiththalam paRRak * kanAk kaNdEn thOzhI! nAn *",
      7: "vAy nallAr * nalla maRai Odhi mandhiraththAl * pAsilai nANal paduththup * paridhi vaiththu   ***  kAysinamA kaLiRu annAn * en kaip paRRi * thI valam seyyak * kanAk kaNdEn thOzhI! nAn *",
      8: "immaikkum * Ezh Ezh piRavikkum paRRAvAn * nammai udaiyavan * nArAyaNan nambi   ***  semmai udaiya * thirukkaiyAl thAL paRRi * ammi midhikkak * kanAk kaNdEn thOzhI! nAn *",
      9: "varisilai vAL mugaththu * ennaimAr thAm vandhittu * eri mugam pAriththu * ennai munnE niRuththi   ***  ari mugan achchuthan * kaimmEl en kai vaiththu * pori mugam thattak * kanAk kaNdEn thOzhI! nAn *",
      10: "kungumam appik * kuLir sAndhamattiththu * mangala vIdhi * valam seydhu maNa nIr   ***  angu avanOdum * udan senRu angAnai mEl * manjanam Attak * kanAk kaNdEn thOzhI! nAn *",
      11: "AyanukkAgath * thAn kaNda kanAvinai * vEyar pugazh * villipuththUrk kOn kOdhai sol   ***  thUya thamizh mAlai * Iraindhum vallavar * vAyu nanmakkaLaip peRRu * magizhvarE *",
      12: "adivaravu: vAraNam nALai * indhiran nARRthisai * kadhir maththaLam * vAy immaikkum * varisilai kungumam * AyanukkAga karuppUram *"
    },
    'NAT.7.steps': {
      1: "* karuppUram nARumO? * kamalappU nARumO? *thiruppavaLach chevvAy thAn * thiththiththu irukkumO?  *** marupposiththa mAdhavan than * vAych chuvaiyum nARRamum *viruppuRRuk kEtkinREn * sollAzhi veNsangE! ",
      2: "kadalil piRandhu karudhAdhu * panjasananudalil vaLarndhu pOy * UzhiyAn kaiththalaththidaril  ***  kudiyERith * thIya asurar *nadalaippada muzhangum * thORRaththAy naRsangE! ",
      3: "thadavaraiyin mIdhE * saraRkAla chandhiran *idaiyuvAvil vandhu * ezhundhAlE pOl  ***  nIyumvadamadhuraiyAr mannan * vAsudhEvan kaiyil *kudiyERi vIRRirundhAy * kOlap perum sangE! ",
      4: "chandhira maNdalam pOl * dhAmOdharan kaiyil *andharam onRinRi * ERi avan seviyil  *** mandhiram koLvAyE pOlum * valampuriyE! *indhiranum unnOdu * selvaththukku ElAnE ",
      5: "unnOdu udanE * oru kadalil vAzhvArai *innAr inaiyAr enRu * eNNuvAr illai kAN  *** mannAgi ninRa * madhusUdhan vAy amudham *pannALum uNginRAy * pAnjasanniyamE! ",
      6: "pOyththIrththam AdAdhE * ninRa puNar marudham *sAyththIrththAn kaiththalaththE * ERik kudi koNdu  *** sEyththIrthamAy ninRa * sengaNmAl thannudaiya *vAyththIrththam pAyndhAda vallAy * valampuriyE! ",
      7: "sengamala nANmalar mEl * thEnugarum annam pOl *sengat karumEni * vAsudhEvanudaiya  *** angaith thalam ERi * anna vasam seyyum *sangaraiyA! un selvam * sAla azhagiyadhE ",
      8: "uNbadhu sollil * ulagaLandhAn vAy amudham *kaNpadai koLLil * kadalvaNNan kaiththalaththE  *** peNpadaiyAr un mEl * perum pUsal sARRuginRAr *paNpala seyginRAy * pAnjasanniyamE! ",
      9: "padhinARAm Ayiravar * dhEvimAr pArththiruppa *madhuvAyil koNdAR pOl * mAdhavan than vAy amudham  *** podhuvAga uNbadhanaip * pukku nI uNdakkAl *sidhaiyArO unnOdu? * selvap perum sangE! ",
      10: "* pAnjasanniyaththaip * paRpanAbanodum *vAyndha perum suRRam * Akkiya vaNpudhuvai  *** Eyndha pugazhp pattarpirAn * kOdhai thamizh Iraindhum *AyndhEththa vallAr * avarum aNukkarE",
      11: "adivaravu: karuppUram kadalil thadavarai chandhira unnOdu pOy sengamalam uNbadhu padhinARu pAnjasanniyaththai viN",
    },
    'NAT.8.steps': {
      1: "* viNNIla mElAppu * viriththAR pOl mEgangAL! *theNNIr pAy vEngadaththu * en thirumAlum pOndhAnE?  *** kaNNIrgaL mulaik kuvattil * thuLi sOrach chOrvEnai * peNNIrmai Idazhikkum * idhu thamakkOr perumaiyE ",
      2: "mAmuththa nidhi soriyum * mAmugilgAL! * vEngadaththuchchAmaththin niRam koNda * thAdALan vArththai ennE!  *** kAmath thIyuL pugundhu * kadhuvappattu idaik kangul *maththOr thenRalukku * ingu ilakkAy nAn iruppEnE ",
      3: "oLivaNNam vaLai sindhai * uRakkaththOdu ivai ellAm *eLimaiyAl ittu ennai * Idazhiyap pOyinavAl  *** kuLir aruvi vEngadaththu * en gOvindhan guNam pAdi *aLiyaththa mEgangAL! * Avi kAththu iruppEnE ",
      4: "minnAgaththu ezhuginRa * mEgangAL! * vEngadaththuththannAgath thirumangai * thangiya sIr mArvarkku  *** ennAgaththu iLangongai * virumbith thAm nAL thORum *ponnAgam pulgudhaRku * en purivudaimai seppuminE ",
      5: "vAn koNdu kiLarndhu ezhundha * mAmugilgAL! * vEngadaththuththEn koNda malar sidhaRath * thiraNdERip pozhivIrgAL!  *** Un koNda vaLLugirAl * iraNiyanai udal idandhAn *thAn koNda sarivaLaigaL * tharumAgil sARRuminE ",
      6: "salangoNdu kiLarndhu ezhundha * thaN mugilgAL! * mAvaliyainilangoNdAn vEngadaththE * nirandhERip pozhivIrgAL!  *** ulanguNda viLangani pOl * uL meliyap pugundhu * ennainalangoNda nAraNaRku * en nadalai nOy seppuminE ",
      7: "* sangamA kadal kadaindhAn * thaN mugilgAL! * vEngadaththuchchengaNmAl sEvadik kIzh * adi vIzhchchi viNNappam  *** kongai mEl kungumaththin * kuzhambazhiyap pugundhu * oru nALthangumEl * en Avi thangum enRu uraiyIrE ",
      8: "kAr kAlaththu ezhuginRa * kAr mugilgAL! * vEngadaththuppOr kAlaththu ezhundharuLip * porudhavanAr pEr solli  *** nIr kAlaththu erukkil * am pazhavilai pOl vIzhvEnai *vAr kAlaththu oru nAL * tham vAsagam thandharuLArE ",
      9: "* madha yAnai pOl ezhundha * mAmugilgAL! * vEngadaththaippadhiyAga vAzhvIrgAL! * pAmbaNaiyAn vArththai ennE!  *** kadhi enRum thAn AvAn * karudhAdhu * Or peN kodiyaivadhai seydhAn ennum sol * vaiyagaththAr madhiyArE ",
      10: "* nAgaththin aNaiyAnai * nannudhalAL nayandhurai sey * mEgaththai vEngadak kOn * vidu thUdhil viNNappam  *** bOgaththil vazhuvAdha * pudhuvaiyar kOn kOdhai thamizh *Agaththu vaiththuraippAr * avaradiyAr AguvarE ",
      11: "adivaravu: viN mA oLi min vAn salam sangam kAr madham nAgam sindhuram",
    },
    'NAT.9.steps': {
      1: "* sindhurach chembodip pOl * thirumAlirunjOlai engum *indhira kObangaLE * ezhundhum parandhittanavAl  *** mandharam nAtti anRu * madhurak kozhunjARu koNda *sundharath thOL udaiyAn * suzhalaiyil ninRu uydhungolO? ",
      2: "pOrk kaLiRu porum * mAlirunjOlaiyam pUmpuRavil *thArkkodi mullaigaLum * thavaLa nagai kAttuginRa  *** kArkkoL padAkkaL ninRu * kazhaRich chirikkath thariyEn *ArkkidugO? thOzhI! * avan thAr seydha pUsalaiyE ",
      3: "karuviLai oN malargAL! * kAyA malargAL! * thirumAluruvoLi kAttuginRIr * enakku uyvazhakkonRu uraiyIr  *** thiruviLaiyAdu thiN thOL * thirumAlirunjOlai nambi *vari vaLaiyil pugundhu * vandhi paRRum vazhakkuLadhE ",
      4: "paimbozhil vAzh kuyilgAL! * mayilgAL! oN karuviLaigAL! *vambak kaLanganigAL! * vaNNap pUvai naRumalargAL!  *** aimberum pAdhagargAL! * aNi mAlirunjOlai ninRa *emperumAnudaiya niRam * ungaLukku en seyvadhE? ",
      5: "thunga malarp pozhil sUzh * thirumAlirunjOlai ninRa *sengat karumugilin * thiru urup pOl  ***  malar mElthongiya vaNdinangAL! * thogu pUnj sunaigAL! * sunaiyilthangu senthAmaraigAL! * enakku Or saraN sARRuminE ",
      6: "* nARu naRum pozhil * mAlirunjOlai nambikku * nAnnURu thadAvil veNNey * vAy nErndhu parAvi vaiththEn  *** nURu thadA niRaindha * akkAra adisil sonnEn *ERu thiru udaiyAn * inRu vandhu ivai koLLungolO? ",
      7: "inRu vandhu iththanaiyum * amudhu seydhidap peRil * nAnonRu nURAyiramAk koduththup * pinnum ALum seyvan  *** thenRal maNam kamazhum * thirumAlirunjOlai thannuLninRa pirAn * adiyEn manaththE vandhu nEr padilE ",
      8: "kAlai ezhundhirundhu * kariya kuruvik kaNangaL *mAlin varavu solli * maruL pAdudhal meymmai kolO?  *** sOlai malaip perumAn * thuvarApadhi emperumAn *Alinilaip perumAn * avan vArththai uraikkinRadhE ",
      9: "kOngalarum pozhil * mAlirunjOlaiyil konRaigaL mEl *thUngu pon mAlaigaLOdu * udanAy ninRu thUnguginREn  *** pUngoL thirumugaththu * maduththUdhiya sangoliyum *sArngavil nAN oliyum * thalaippeyvadhu enjnjAnRu kolO ",
      10: "* sandhodu kAragilum sumandhu * thadangaL porudhu *vandhizhiyum silambARudai * mAlirunjOlai ninRasundharanai  ***  surumbAr kuzhal * kOdhai thoguththuraiththa *sendhamizh paththum vallAr * thirumAl adi sErvargaLE ",
      11: "adivaravu: sindhuram pOr karuviLai paimpozhil thungam nARu inRu kAlai kOngu sandhodu kArkkOdal",
    },
    'NAT.10.steps': {
      1: "* kArkkOdal pUkkAL! * kArkkadal vaNNan en mEl * ummaippOrkkOlam seydhu * pOra viduththavan enguRRAn?  *** ArkkO ini nAm * pUsal iduvadhu? * aNi thuzhAyththArkkOdum nenjam thannaip * padaikka vallEn andhO! ",
      2: "mEl thOnRip pUkkAL! * mEl ulagangaLin mIdhu pOy *mEl thOnRum sOdhi * vEdha mudhalvar valangaiyil  *** mEl thOnRum Azhiyin * venjudar pOlach chudAdhu * emmaimARROlaip pattavar kUttaththu * vaiththuk koLgiRRirE ",
      3: "kOvai maNAtti! * nI un kozhungani koNdu * emmaiAvi tholaiviyEl * vAyazhagar thammai anjudhum  *** pAviyEn thOnRip * pAmbaNaiyArkkum tham pAmbu pOl *nAvum iraNduLa AyiRRu nANiliyEnukkE ",
      4: "mullaip pirAtti! * nI un muRuvalgaL koNdu * emmaiallal viLaiviyEl * AzhinangAy! un adaikkalam  *** kollai arakkiyai mUkkarindhitta * kumaranArsollum poy AnAl * nAnum piRandhamai poy anRE ",
      5: "pAdum kuyilgAL! * Idhenna pAdal? * nal vEngadanAdar namakku oru vAzhvu thandhAl * vandhu pAdumin  *** Adum karuLak kodi udaiyAr * vandhu aruL seydhu *kUduvar Ayidil * kUvi num pAttugaL kEttumE ",
      6: "kaNamA mayilgAL! * kaNNa pirAn thirukkOlam pOnRu *aNimA nadam payinRu AduginRIrkku * adi vIzhginREn  *** paNamAdaravaNaip * paRpala kAlamum paLLi koL *maNavALar nammai vaiththa * parisidhu kANminE ",
      7: "nadamAdith thOgai virikkinRa * mAmayilgAL! * ummainadamAttam kANap * pAviyEn nAn Or mudhalilEn  *** kudamAdu kUththan * gOvindhan kOmiRai seydhu * emmaiudaimAdu koNdAn * ungaLukku ini onRu pOdhumE? ",
      8: "* mazhaiyE! mazhaiyE! maNpuRam pUsi * uLLAy ninRamezhugu URRinAR pOl * URRu nal vEngadaththuL ninRa  *** azhagap pirAnAr thammai * en nenjaththu agappadaththazhuva ninRu * ennaith thadharththik koNdu * URRavum vallaiyE? ",
      9: "kadalE! kadalE! unnaik kadaindhu * kalakkuRuththu *udaluL pugundhu ninRu * URal aRuththavaRku  ***  ennaiyumudaluL pugundhu ninRu * URal aRukkinRa mAyaRku * ennadalaigaL ellAm * nAgaNaikkE senRu uraiththiyE ",
      10: "* nalla en thOzhi! * nAgaNai misai nam parar *selvar periyar * siRumAnidavar nAm seyvadhen?  *** villi pudhuvai * vittuchiththar thangaL dhEvarai *valla parisu varuvipparEl * adhu kANdumE ",
      11: "adivaravu: kAr mEl kOvai mullai pAdum kaNam nadamAdi mazhaiyE kadalE nalla thAm",
    },
    'NAT.11.steps': {
      1: "* thAm ugakkum tham kaiyil * sangamE pOlAvO? *yAm ugakkum engaiyil * sangamum EndhizhaiyIr!  *** thI mugaththu nAgaNai mEl * sErum thiruvarangar *A! mugaththai nOkkArAl * ammanE! ammanE! ",
      2: "ezhil udaiya ammanaimIr! * ennarangaththu innamudhar *kuzhalazhagar vAyazhagar * kaNNazhagar  ***  koppUzhilezhukamalap pUvazhagar * emmAnAr * ennudaiyakazhal vaLaiyaith * thAmum kazhal vaLaiyE AkkinarE ",
      3: "* pongOdham sUzhndha * buvaniyum viNNulagum *angAdhum sOrAmE * ALginRa emperumAn  *** sengOl udaiya * thiruvarangach chelvanAr *engOl vaLaiyAl * idar thIrvar AgAdhE? ",
      4: "machchaNi mAda * madhiL arangar vAmananAr *pachchaip pasundhEvar * thAm paNdu nIr ERRa  *** pichchaik kuRaiyAgi * ennudaiya peyvaLai mEl *ichchai udaiyarEl * iththeruvE pOdhArE? ",
      5: "pollAk kuRaL uruvAyp * poRkaiyil nIr ERRu *ellA ulagum * aLandhu koNda emperumAn  *** nallArgaL vAzhum * naLir aranga nAgaNaiyAn *illAdhOm kaipporuLum * eydhuvAn oththuLanE ",
      6: "kaipporuLgaL munnamE * kaikkoNdAr * kAviri nIrseyppuraLa Odum * thiruvarangach chelvanAr  *** epporutkum ninRArkkum * eydhAdhu * nAnmaRaiyinsoRporuLAy ninRAr * en meypporuLum koNdArE ",
      7: "uNNAdhu uRangAdhu * oli kadalai UdaRuththu *peNNAkkai AppuNdu * thAm uRRa pEdhellAm  *** thiNNAr madhiL sUzh * thiruvarangach chelvanAr *eNNAdhE thammudaiya * nanmaigaLE eNNuvarE ",
      8: "* pAsi thUrththuk kidandha * pArmagatku * paNdoru nALmAsudambil nIr vArA * mAnamilAp panRiyAm  ***  thEsudaiya dhEvar * thiruvarangach chelvanAr *pEsi iruppanagaL * pErkkavum pErAvE ",
      9: "kaNNAlam kOdiththuk * kanni thannaik kaippidippAn *thiNNArndhirundha * sisupAlan thEsazhindhu  ***  aNNAndhirukkavE * AngavaLaik kaippidiththa *peNNALan pENumUr * pErum arangamE",
      10: "* semmai udaiya * thiruvarangar thAm paNiththa *meymmaip peru vArththai * vittuchiththar kEttu iruppar  *** thammai ugappAraith * thAm ugappar ennum sol *thammidaiyE poyyAnAl * sAdhippAr Ar iniyE?",
      11: "adivaravu: thAm ezhil pongu machchu pollA kai uNNAdhu pAsikaNNAlam semmai maRRu",
    },
    'NAT.12.steps': {
      1: "* maRRirundhIrgatku aRiyalAgA *mAdhavan enbadhOr anbu thannai *uRRirundhEnukku uraippadhu ellAm *UmaiyarOdu sevidar vArththai  *** peRRirundhALai ozhiyavE pOyp *pErththoru thAyil vaLarndha nambi *maRporundhAmaRkaLam adaindha *madhuraip puRaththu ennai uyththidumin ",
      2: "nANi iniyOr karumam illai *nAlayalArum aRindhozhindhAr *pANiyAdhu ennai marundhu seydhu *paNdu paNdAkka uRudhirAgil  *** mANi uruvAy ulagaLandha *mAyanaik kANil thalaimaRiyum *ANaiyAl nIr ennaik kAkka vENdil *AyppAdikkE ennai uyththidumin ",
      3: "thandhaiyum thAyum uRRArum niRkath *thani vazhi pOyinAL ennum sollu *vandha pinnaip pazhi kApparidhu *mAyavan vandhu urukkAttuginRAn  *** kondhaLamAkkip parakkazhiththuk *kuRumbu seyvAn Or maganaip peRRa *nandhagOpAlan kadaiththalaikkE *naLLirutkaN ennai uyththidumin ",
      4: "angaith thalaththidai Azhi koNdAn *avan mugaththanRi vizhiyEn enRu *sengachchuk koNdu kaNNAdai Arththuch *chiRumAnidavaraik kANil nANum  *** kongaith thalamivai nOkkik kANIr *gOvindhanukkallAl vAyil pOgA *inguththai vAzhvai ozhiyavE pOy *yamunaik karaikku ennai uyththidumin ",
      5: "Arkkum en nOy idhu aRiyal AgAdhu *ammanaimIr! thuzhadhippadAdhE *kArkkadal vaNNan enbAn oruvan *kaikaNda yOgam thadavath thIrum  *** nIrkkarai ninRa kadambai ERik *kALiyan uchchiyil nattam pAyndhu *pOrkkaLamAga niruththam seydha *poygaik karaikku ennai uyththidumin ",
      6: "kArththaN mugilum karuviLaiyum *kAyA malarum kamalap pUvum *IrththiduginRana ennai vandhittu *irudIkEsan pakkal pOgE enRu  *** vErththup pasiththu vayiRasaindhu *vENdadisil uNNum pOdhu * IdhenRupArththirundhu nedunOkkuk koLLum *paththavilOsanaththu uyththidumin ",
      7: "vaNNam thirivum mananguzhaivum *mAnam ilAmaiyum vAy veLuppum *uNNal uRAmaiyum uL melivum *OdhanIr vaNNan enbAn oruvan  *** thaNNan thuzhAy ennum mAlai koNdu *sUttath thaNiyum pilamban thannaip *paNNazhiyap paladhEvan venRa *pANdi vadaththu ennai uyththidumin ",
      8: "kaRRinam mEykkilum mEykkap peRRAn *kAdu vAzh sAdhiyum Agap peRRAn *paRRi uralidai AppumuNdAn *pAvigAL! ungaLukku Echchuk kolO?  *** kaRRana pEsi vasaiyuNAdhE *kAligaL uyya mazhai thaduththu *koRRak kudaiyAga Endhi ninRa *gOvarththanaththu ennai uyththidumin ",
      9: "kUttil irundhu kiLi eppOdhum *gOvindhA! gOvindhA! enRu azhaikkum *Uttuk kodAdhu seRuppanAgil *ulagaLandhAn enRu uyarak kUvum  *** nAttil thalaippazhi eydhi *ungaL nanmai izhandhu thalaiyidAdhE *sUttuyar mAdangaL sUzhndhu thOnRum *thuvarApadhikku ennai uyththidumin ",
      10: "* mannu madhurai thodakkamAga *vaN thuvarApadhi thannaLavum *thannaith thamar uyththup peyya vENdith *thAzhkuzhalAL thuNindha thuNivai  *** ponniyal mAdam polindhu thOnRum *pudhuvaiyar kOn vittuchiththan kOdhai *innisaiyAl sonna senjol mAlai *Eththa vallArkku idam vaigundhamE ",
      11: "adivaravu: maRRu nANi thandhai angai Arkkum kArththaN vaNNam kaRRinam kUttil mannu kaNNan",
    },
    'NAT.13.steps': {
      1: "* kaNNan ennum karundheyvam * kAtchi pazhagik kidappEnai *puNNil puLippeydhAR pOl * puRam ninRu azhagu pEsAdhE  *** peNNin varuththam aRiyAdha * perumAn araiyil pIthagavaNNa Adai koNdu * ennai vAttam thaNiya vIsIrE ",
      2: "pAl Alilaiyil thuyil koNda * paraman valaippattirundhEnai *vElAl thunnam peydhAR pOl * vENdiRRellAm pEsAdhE  *** kOlAl nirai mEyththu AyanAyk * kudandhaik kidandha kudamAdi *neelAr thaNNandhuzhAy koNdu * en neRimen kuzhal mEl sUttIrE ",
      3: "kanjaik kAyndha karuvilli * kadaikkaN ennum siRaik kOlAl *nenju Uduruva EvuNdu * nilaiyum thaLarndhu naivEnai  *** anjEl ennAn avan oruvan * avan mArvaNindha vanamAlai *vanjiyAdhE tharumAgil * mArvil koNarndhu purattIrE ",
      4: "ArE ulagaththu ARRuvAr? * AyarpAdi kavarndhuNNum *kArERuzhakka uzhakkuNdu * thaLarndhum muRindhum kidappEnai  *** ArAvamudham anaiyAn than * amudha vAyil URiya *nIr thAn koNarndhu pularAmE * parukki iLaippai nIkkirE ",
      5: "azhilum thozhilum urukkAttAn * anjEl ennAn avan oruvan *thazhuvi muzhuvip pugundhu ennaich * chuRRich chuzhanRu pOgAnAl  *** thazhaiyin pozhilvAy niraip pinnE * nedumAl Udhi varuginRa *kuzhalin thoLai vAy nIr koNdu * kuLira mugaththuth thadavIrE ",
      6: "nadai onRillA ulagaththu * nandhagOpan magan ennum *kodiya kadiya thirumAlAl * kuLappuk kURu koLappattu  *** pudaiyum peyaragillEn nAn * pOtkan midhiththa adippAttil *podith thAn koNarndhu pUsIrgaL * pOgA uyir en udambaiyE ",
      7: "veRRik karuLak kodiyAn than * mImIdhAdA ulagaththu *veRRa veRidhE peRRa thAy * vEmbEyAga vaLarththALE  *** kuRRamaRRa mulai thannaik * kumaran kOlap paNaith thOLOdu *aRRa kuRRam avai thIra * aNaiya amukkik kattIrE ",
      8: "uLLE urugi naivEnai * uLaLO ilaLO ennAdha *koLLai koLLik kuRumbanaik * kOvarththananaik kaNdakkAl  *** koLLum payan onRillAdha * kongai thannaik kizhangOdum *aLLip paRiththittu avan mArvil eRindhu * en azhalai thIrvEnE ",
      9: "kommai mulaigaL idar thIrak * kOvindhaRku Or kuRREval *immaip piRavi seyyAdhE * inip pOych cheyyum thavam thAn en?  *** semmai udaiya thirumArvil * sErththAnElum oru gyAnRu *meymmai solli mugam nOkki * vidai thAn tharumEl miga nanRE ",
      10: "* allal viLaiththa perumAnai * AyarpAdikku aNiviLakkai *villi pudhuvai nagar nambi * vittuchiththan viyan kOdhai  *** villaith tholaiththa puruvaththAL * vEtkai uRRu miga virumbum *sollaith thudhikka vallArgaL * thunbak kadaluL thuvaLArE ",
      11: "adivaravu: kaNNan pAl kanjai ArE azhil nadai veRRi uLLEkommai allal patti",
    },
    'NAT.14.steps': {
      1: "* patti mEyndhOr kArERu * baladhEvaRku Or kIzhk kanRAy *ittIRittu viLaiyAdi * ingE pOdhak kaNdIrE?  *** ittamAna pasukkaLai * inidhu maRiththu nIrUtti *vittuk koNdu viLaiyAda * virundhAvanaththE kaNdOmE ",
      2: "anunga ennaip pirivu seydhu * AyarpAdi kavarndhuNNum *kuNungu nARik kuttERRaik * kOvardhdhananaik kaNdIrE?  *** kaNangaLOdu minmEgam * kalandhAR pOla vanamAlai *minunga ninRu viLaiyAda * virundhAvanaththE kaNdOmE ",
      3: "mAlAyp piRandha nambiyai * mAlE seyyum maNALanai *ElAp poygaL uraippAnai * ingE pOdhak kaNdIrE?  *** mElAl parandha veyil kAppAn * vinathai siRuvan siRagennum *mElAppin kIzh varuvAnai * virundhAvanaththE kaNdOmE ",
      4: "kArththaN kamalakkaN ennum * nedungayiRu paduththi * ennaiIrththuk koNdu viLaiyAdum * Isan thannaik kaNdIrE?  *** pOrththa muththinkuppAyap * pugarmAl yAnaik kanRE pOl *vErththu ninRu viLaiyAda * virundhAvanaththE kaNdOmE ",
      5: "* mAdhavan en maNiyinai * valaiyil pizhaiththa panRi pOl *Edhum onRum koLaththArA * Isan thannaik kaNdIrE?  *** pIdhaga Adai udai thAzhap * perungAr mEgak kanRE pOl *vIdhiyAra varuvAnai * virundhAvanaththE kaNdOmE ",
      6: "dharumam aRiyAk kuRumbanaith * than kaich chArngam adhuvE pOl *puruva vattam azhagiya * poruththamiliyaik kaNdIrE?  *** uruvu karidhAy mugam seydhAy * udhayap paruppadhaththin mEl *viriyum kadhirE pOlvAnai * virundhAvanaththE kaNdOmE ",
      7: "poruththam udaiya nambiyaip * puRampOl uLLum kariyAnai *karuththaip pizhaiththu ninRa * akkarumA mugilaik kaNdIrE?  *** aruththiththArA kaNangaLAl * Arap perugu vAnam pOl *viruththam peridhAy varuvAnai * virundhAvanaththE kaNdOmE ",
      8: "veLiya sangonRudaiyAnaip * pIdhaga Adai udaiyAnai *aLinangudaiya thirumAlai * AzhiyAnaik kaNdIrE?  *** kaLivaNdu engum kalandhAR pOl * kamazhpUm kuzhalgaL –thadanthOL mEl *miLira ninRu viLaiyAda * virundhAvanaththE kaNdOmE ",
      9: "* nAttaip padai enRu ayan mudhalAth thandha * naLir mAmalar undhi *vIttaip paNNi viLaiyAdum * vimalan thannaik kaNdIrE?  *** kAttai nAdith thEnuganum * kaLiRum puLLum udan madiya *vEttaiyAdi varuvAnai * virundhAvanaththE kaNdOmE ",
      10: "* parundhAt kaLiRRukku aruL seydha * paraman thannai * pArin mElvirundhAvanaththE kaNdamai * vittuchiththan kOdhai sol  *** marundhAm enRu tham manaththE * vaiththuk koNdu vAzhvArgaL *perunthAL udaiya pirAn adik kIzhp * piriyAdhenRum iruppArE",
      11: "adivaravu: patti anunga mAl kArththaN mAdhavan dharumam poruththam veLiya nAttai parundhAL iruL",
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