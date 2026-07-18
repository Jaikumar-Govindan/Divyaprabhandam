window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PAT.2.1.steps':
        {
            1: "mechchoodu shankam iDattAn *  nalvEyoodi * poychchoodil tORRa *  poRaiyuDai mannarkkAy * pattoor peRAdu anRu *  bhAratam kai seyta * attoodan appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            2: "malaipurai tOL mannavarum *  mAradarum maRRum * palar kulaiya *  nooRRuvarum paTTazhiya * pArttan silai vaLaiyat *  tiNtErmEl munninRa * sengaN alavalai vandu appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            3: "kAyum neer pukku *  kaDambERi * kALiyan teeya paNattil *  silambArkka pAyndADi * vEyin kuzhaloodi *  vittakanAy ninRa * Ayanvandu appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            4: "iruTTil piRandupOy *  Ezhai vallAyar * maruTTait tavirppittu *  vankanchanmALap-puraTTi *  annAL engaL *  poompaTTuk koNDa * araTTan vandu appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            5: "sEppooNDa *  sADu sidaRi * tiruDi neykku AppooNDu *  nandan manaivi kaDai tAmbAl * sOppooNDu tuLLi *  tuDikkat tuDikka * anRu AppooNDAn appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            6: "seppiLa menmulait *  dEvaki nangaikku * soppaDat tOnRit *  toRuppADiyOm vaitta * tuppamum pAlum *  tayirum vizhungiya * appan vandu appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            7: "tattuk koNDALkolO? *  tAnE peRRAL kolO? * sitta manaiyAL *  asOtai iLanchingam * kottAr karuNGkuzhal *  gOpAla kOLari * attan vandu appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            8: "kongaivan *  kooni soRkoNDu * kuvalayat tungak kariyum *  pariyum irAchchiyamum * engum paradaRku aruLi *  vankAnaDai * aNGkaNNan appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            9: "padaga mudalai *  vAyppaTTa kaLiRu * kadaRik kaikooppi *  enkaNNA! kaNNA! enna * udavap puLLoorndu *  angu uRutuyar teertta * adakan vandu appoochchi kATTukinRAn * ammanE! appoochchi kATTukinRAn.",
            10: "vallAL ilangai malangach *  charanduranda * villALanai *  vishNu chittan viritta * sollArnda appoochchi *  pADal ivaipattum vallArpOy * vaikuntam manni irupparE.",

        },

        'PAT.2.2.steps':
        {
            1: "aravaNaiyAy! AyarERE! *  ammam uNNat tuyilezhAyE * iravum uNNAtu uRangi neepOy *  inRumuchchi koNDatAlO * varavum kANEn vayiRasaindAy *  vana mulaigaL sOrndu pAya * tiruvuDaiya vAymaDuttut *  tiLaittu udaittup parugiDAyE.",
            2: "vaitta neyyum kAynda pAlum *  vaDitayirum naRu veNNeyum * ittanaiyum peRRaRiyEn *  empirAn! nee piRanda pinnai * ettanaiyum seyyap peRRAy *  Edum seyyEn kadam paDAtE * muttanaiya muRuval seytu *  mookkuRinchi mulai uNAyE.",
            3: "tandam makkaL azhudu senRAl *  tAymArAvAr tarikkakillAr * vandu ninmEl poosal seyya *  vAzhavalla vAsudEvA! * undaiyar untiRattarallar *  unnai nAn onRu urappamATTEn * nandagOpan aNisiRuvA! *  nAn suranda mulaiyuNAyE.",
            4: "kanchan tannAl puNarkkap paTTa *  kaLLachchakaDu kalakkazhiya * panchiyanna mellaDiyAl *  pAynda pOdu nondiDum enRu * anchinEnkAN amarar kOvE! *  Ayar kooTTattu aLavanRAlO * kanchanai un vanchanaiyAl *  valaippaDuttAy! mulaiyuNAyE.",
            5: "teeya pundik kanchan unmEl *  sinamuDaiyan sOrvu pArttu * mAyandannAl valaippaDukkil *  vAzhakillEn vAsudEvA! * tAyar vAychchol karumam kaNDAy *  sARRich chonnEn pogavENDA * AyarpADikku aNiviLakkE! *  amarndu vandu en mulaiyuNAyE.",
            6: "minnanaiya nuNNiDaiyAr *  virikuzhalmEl nuzhainda vaNDu * innisaikkum villiputtoor *  inidamarndAy! unnaik kaNDAr * enna nOnbu nORRALkolO *  ivanaip peRRa vayiRuDaiyAL * ennum vArttaiy eyduvitta *  iruDeekEsA! mulai uNAyE.",
            7: "peNDir vAzhvAr ninnoppAraip *  peRudum ennum AsaiyAlE * kaNDavarkaL pOkkozhindAr *  kaNNiNaiyAl kalakka nOkki * vaNDulAm poonguzhalinAr *  un vAyamudam uNNa vENDi * koNDu pOvAn vandu ninRAr *  gOvindA! nee mulai uNAyE.",
            8: "irumalaipOl edirnda mallar *  iruvarangam eri seytAy! * un tirumalindu tikazh mArvu *  tEkka vandu ennalkulERi * orumulaiyai vAy maDuttu *  orumulaiyai neruDikkoNDu * irumulaiyum muRaimuRaiyA *  Engi Engi irunduNAyE.",
            9: "angamalap pOdagattil *  aNikoL muttam sindinAR pOl * sengamala mugam viyarppat *  teemai seydu immuRRattooDE * angam ellAm puzhudiyaga *  aLaiya vENDA amma! vimma * angu amararkku amudaLitta *  amarar kOvE! mulai uNAyE.",
            10: "ODavODak kingiNikaL *  olikkum OsaippANiyAlE * pADippADi varukinRAyaip *  paRpanApan enRu irundEn * ADiyADi asaindasaindiTTu *  adanukkERRa koottaiyADi * ODiYODip pOyviDAtE *  uttamA! neemulai uNAyE.",
            11: "vAraNinda kongai Aychchi *  mAdavA! uNNenRa mARRam * neeraNinda kuvaLai vAsam *  nikazha nARum villiputtoor * pAraNinda tolpugazhAn *  paTTar pirAn pADal vallAr * seeraNinda sengaN mAlmEl *  senRa sindai peRuvAr tAmE.",

        },
        'PAT.2.3.steps': {
            1: "pOyppADu uDaiya nin tandaiyum tAzhttAn *  porutiRal kanchan kaDiyan * kAppArum illai kaDal vaNNA *  unnait taniyE pOy engum tiridi * pEyppAl mulai uNDa pittanE! *  kEsava nambee! unnaik kAdu kutta * AyppAlar peNDukaL ellArum vandAr *  aDaikkAy tirutti nAn vaittEn.",
            2: "vaNNap pavaLa marunginil sAtti *  malarppAdak kingiNi yArppa * naNNit tozhum avar sindai piriyAda *  nArAyaNA! ingE vArAy * eNNaR kariya pirAnE *  tiriyai eriyAmE kAdukku iDuvan * kaNNukku nanRum azhakum uDaiya *  kanakak kaDippum ivaiyA!",
            3: "vaiyam ellAm peRum vArkaDal vAzhum *  makarak kuzhai koNDu vaittEn * veyyavE kAdil tiriyai iDuvan *  nee vENDiyadu ellAm taruvan * uyya ivvAyar kulattinil tOnRiya *  oN suDar Ayar kozhundE * maiyanmai seitu iLa Aychchiyar uLLattu *  mAdavanE! ingE vArAy",
            4: "vaNa nanRu uDaiya vayirak kaDippiTTu *  vAr kAdu tAzhap perukki * guNa nanRu uDaiyar ikgOpAla piLLaigaL *  gOvindA! nee solluk koLLAy * iNai nanRu azhagiya ikkaDippu iTTAl *  iniya palAp pazham tandu * suNa nanRu aNimulai uNNat taruvan nAn *  sOttampirAn! ingE vArAy",
            5: "sOttampirAn! enRu irandAlum koLLAy *  suri kuzhalAroDu nee pOy * kOttuk kuravai piNaindu ingu vandAl *  guNam koNDu iDuvanO? nambee * pErttum periyana appam taruvan *  pirAnE! tiriyiDa oTTil * vEyt taDandOLAr virumbu karuNGkuzhal *  vishNuvE! nee ingE vArAy",
            6: "viN ellAm kETka azhudiTTAy! *  unvAyil virumbi adanai nAn nOkki * maN ellAm kaNDu en manattu uLLE anchi *  madusoodanE enRu irundEn * puN Edum illai unkAdum aRiyum *  poRuttu iRaip pOdu iru nambee!kaNNA! en kArmukilE! kaDal vaNNA *  kAvalanE! mulai uNAyE",
            7: "mulai Edum vENDEn enRu ODi *  nin kAdil kaDippaip paRittu eRindiTTu * malaiyai eDuttu magizhndu kalmAri kAttup *  pasu nirai mEyttAy * silai onRu iRuttAy! tirivikkiramA! *  tiruAyar pADip pirAnE! * talai nilAppOdE un kAdaip perukkAdE *  viTTiTTEn kuRRamE anRE",
            8: "en kuRRamE enRu sollavum vENDA kAN *  ennai nAn maN uNDEnAka * anpuRRu nOkki aDittum piDittum *  anaivarkkum kATTiRRu ilaiyE * vanpuRRu aravin pakaikkoDi *  vAmana nambee! unkAdukaL toorum * tunpuRRana ellAm teerppAy pirAnE! tiriyiTTuch sollugEn meyyE",
            9: "mey enRu solluvAr sollaik karudi *  toDuppu uNDAy veNNeyai enRu * kaiyaip piDittuk karai uralODu ennaik *  kANavE kaTTiRRu ilaiyE * seydana solli sirittu angu irukkil *  sireedarA! unkAdu toorum * kaiyil tiriyai iDukiDAy inninRa *  kArikaiyAr siriyAmE",
            10: "kArikaiyArkkum unakkum izhukku uRRen *  kAdukaL veengi eRiyil * tAriyAdagil talai nondiDum enRu *  viTTiTTEn kuRRamE anRE * sEriyiR piLLaikaL ellArum- kAdu perukki *  tiriyavum kANDi * ErviDai seRRu iLaNGkanRu eRindiTTa *  iruDeekEsA! entan kaNNE!",
            11: "kaNNaik kuLirak kalandu engum nOkkik *  kaDi kamazh pooNGkuzhalArkaL * eNNattuL enRum irundu *  tittikkum perumAnE! engaL amudE * uNNak kanikaL taruvan *  kaDippu onRum nOvAmE kAdukku iDuvan * paNNai kizhiya chakaDam udaittiTTa *  paRpanAbA! ingE vArAy",
            12: "vA enRu solli en kaiyaip piDittu *  valiyavE kAdil kaDippai * nOvat tirikkil unakku ingu izhukku uRRen *  kAdukaL nondiDum killEn * nAvaR pazham koNDu vaittEn *  ivai kANAy nambee * mun vancha makaLaich chAvappAl uNDu sakaDiRap pAyndiTTa *  dAmOdarA! ingE vArAy",
            13: "vArkAdu tAzhap perukki amaittu *  makarak kuzhaiyiDa vENDi * seerAl asOdai tirumAlai sonna sol * sindai uL ninRu tigazha *  pArAr tol pugazhAn puduvai mannan * panniru nAmattAl sonna *  ArAda andAdi panniraNDum vallAr *  achchudanukku aDiyArE",

        },
        'PAT.2.4.steps': {
            1: "veNNeyaLainda kuNungum *  viLaiyADu puzhudiyum koNDu * tiNNena ivvirA unnai *  tEyttuk kiDakka nAnoTTEn * eNNey puLippazham koNDu *  ingu ettanai pOdum irundEn * naNNalariya pirAnE! *  nAraNA! neerADa vArAy.",
            2: "kanRugaL ODachcheviyil *  kaTTeRumbu piDittiTTAl * tenRik keDumagil *  veNNey tiraTTi vizhungumAkANban * ninRa marAmaram sAyttAy! *  nee piRanda tiruvONam * inRu nee neerADa vENDum *  embirAn! ODAdE vArAy.",
            3: "pEychchi mulai uNNa kaNDu *  pinnaiyum nillAdu en nenjam * Aychchiyar ellArum kooDi *  azhaikkavum nAn mulai tandEn * kAychchina neeroDu nelli *  kaDArattil poorittu vaittEn * vAytta pukazh maNi vaNNA!  manchanamADa nee vArAy.",
            4: "kanchan puNarppinil vanda *  kaDiya sakaDam udaittu * vanchaka pEymagaL tuncha *  vAymulai vaitta pirAnE! * manchaLum sengazhu neerin *  vAsikaiyum nARu sAndum * anchanamum koNDu vaittEn *  azhakanE! neerADa vArAy.",
            5: "appam kalanda siRRuNDi *  akkAram pAlil kalandu * soppaDa nAn suTTu vaittEn *  tinnal uRidiyEl nambee! * seppiLa menmulaiyArkaL *  siRupuRam pEsichchirippar * soppaDa neerADa vENDum *  sOttampirAn! ingE vArAy.",
            6: "eNNey kuDattai uruTTi *  iLampiLLai kiLLi ezhuppi * kaNNai puraTTi vizhittuk *  kazhakaNDu seyyum pirAnE! * uNNak kanikaL taruvan *  olikaDal Oda neer pOlE * vaNNam azhagiya nambee! *  manchanamADa nee vArAy.",
            7: "kaRanda naR pAlum tayirum *  kaDaindu uRimEl vaitta veNNey * piRandaduvE mudalaga *  peRRaRiyEn embirAnE! * siRanda naRRAy alartooRRum *  enbadanAl piRarmunnE * maRandum uraiyADa mATTEn manchanamADa nee vArAy.",
            8: "kanRinai vAlOlai kaTTik *  kanigaL udira eRindu * pintoDarndu ODiOrpAmbaip *  piDittukkoNDu ATTinAy pOlum * nintiRattEn allEn nambee! *  nee piRanda tiru nalnAL * nanRu nee neerADa vENDum *  nAraNA! ODAtE vArAy.",
            9: "pooNit tozhuvinil pukku *  puzhudi aLainda ponmEni * kANa peridum ugappan *  Akilum kaNDAr pazhippar * nAN ettanaiyum ilAdAy! *  nappinnai kANil sirikkum * mANikkamE! enmaNiyE! *  manchanamADa nee vArAy.",
            10: "kArmali mEni niRattu *  kaNNa pirAnai ugandu * vArmali kongai yasOdai *  manchana mATTiya vARRai * pArmali tol puduvaikkOn *  paTTar pirAn sonna pADal * seermali sendamizh vallAr *  teevinai yAdum ilarE.",

        },
        'PAT.2.5.steps': {
            1: "pinnai maNALanai *  pEril kiDandAnai * munnai amarar *  mudal tani vittinai * ennaiyum engaL *  kuDimuzhudu ATkoNDa * mannanai vandu kuzhal vArAy akkAkkAy!mAdavantan kuzhal vArAy akkAkkAy!",
            2: "pEyin mulaiyuNDa *  piLLaiivanmunnam * mAyach chakaDum *  marudumiRuttavan * kAyA malarvaNNan *  kaNNan karuNGkuzhal * tooydaga vandu kuzhal vArAy akkAkkAy!too maNi vaNNan kuzhal vArAy akkAkkAy!",
            3: "tiNNak kalattil *  tiraiyuRimEl vaitta * veNNey vizhungi *  viraiyauRangiDum * aNNal amarar *  perumAnai Ayartam * kaNNanai vandu kuzhal vArAy akkAkkAy!kArmugil vaNNan kuzhal vArAy akkAkkAy!",
            4: "paLLattil mEyum *  paRavai urukkoNDu * kaLLavasuran *  varuvAnait tAnkaNDu * puLLidu venRu *  poduk kOvAy keeNDiTTa * piLLaiyai vandu kuzhal vArAy akkAkkAy!pEymulai uNDAn kuzhal vArAy akkAkkAy!",
            5: "kaRRinam mEyttuk *  kanikku orukanRinai * paRRi eRinda *  paramantirumuDi * uRRana pEsi *  nee ODittiriyAdE * aRRaikkum vandu kuzhal vArAy akkAkkAy!AzhiyAntan kuzhal vArAy akkAkkAy!",
            6: "kizhakkil kuDimannar *  kEDilAdArai * azhippAn ninaindiTTu *  avvAzhi yadanAl * vizhikkum aLavilE *  vEraRuttAnai * kuzhaRkuaNiyAkak kuzhal vArAy akkAkkAy!gOvindantan kuzhal vArAy akkAkkAy!",
            7: "piNDat tiraLaiyum *  pEykku iTTa neerchchORum * uNDaRku vENDi *  neeODit tiriyAdE * aNDattuamarar *  perumAn azhagamar * vaNDottu iruNDa kuzhal vArAy akkAkkAy!mAyavantan kuzhal vArAy akkAkkAy!",
            8: "undi ezhunda *  uruvamalartannil * sandach chadumukan *  tannaip paDaittavan * kondak kuzhalaik *  kuRandu puLiyaTTi * tandattinseeppAl kuzhal vArAy akkAkkAy!dAmOdarantan kuzhal vArAy akkAkkAy!",
            9: "mannan tan tEvimAr *  kaNDu magizhveyda * muniv ulaginai *  muRRum aLandavan * ponnin muDiyinaip *  poovaNai mElvaittu * pinnEyirundu kuzhal vArAy akkAkkAy!pErAyirattAn kuzhal vArAy akkAkkAy!",
            10: "kaNDArpazhiyAmE *  akkAkkAy! * kAr vaNNan vaNDAr kuzhal vAra *  vAvenRa Aychchisol * viNtOy madiL *  villiputtoor kOn paTTansol * koNDADi pADa *  kuRugA vinaitAmE!",
        },
        'PAT.2.6.steps': {
            1: "vElikkOl veTTi *  viLaiyADu villERRi * tAlik kozhundai *  taDangazhuttil pooNDu * peelittazhaiyai *  piNaittu piRakiTTu * kAlippin pOvARkuOr kOl koNDu vA!kaDal niRa vaNNaRkuOr kOl koNDuvA.",
            2: "kongum kuDandaiyum *  kOTTiyoorum pErum * engum tirindu *  viLaiyADum enmagan * sangam piDikkum *  taDakkaikku takka * nal angamuDaiyadOr kOl koNDuvA!arakku vazhittadOr kOl koNDuvA.",
            3: "kaRuttiTTu edir ninRa *  kanchanai konRAn * poRuttiTTu edir vanda *  puLLinvAy keeNDAn * neRitta kuzhalhaLai *  neenga munnODi * siRukkanRu mEyppARku Or kOlkoNDuvA!dEvapirAnukku Or kOl koNDuvA.",
            4: "onRE uraippAn *  oru sollE solluvAn * tunRumuDiyAn *  duriyOdanan pakkal * senRu angup bAradam *  kai eRindAnukku * kanRugaL mEyppadOr kOl koNDuvA * kaDal niRa vaNNarkku Or kOl koNDuvA.",
            5: "seer onRu toodAy *  duriyOdanan pakkal * ooronRu vENDip *  peRAda urODattAl * pAronRi bAradam *  kai seydu pArttaRku * tEronRai UrndARku Or kOl koNDuvAdEvapirAnukku Or kOl koNDuvA.",
            6: "AlattilaiyAn *  aravin aNai mElAn * neelakkaDaluL *  neDungAlam kaN vaLarndAn * bAla pirAyattE *  pArttarkku aruL seyda * kOlappirAnukku Or kOlkoNDuvA!kuDandai kiDandArkkuOr kOl koNDuvA.",
            7: "pon tikazh *  chittirakooDap poruppinil * uRRavaDivil *  oru kaNNum koNDa * akkaRRaik kuzhalan *  kaDiyan viraindu unnai * maRRaikkaN koLLAmE kOl koNDuvA!maNivaNNa nambikku Or kOl koNDuvA.",
            8: "minniDai seedai poruTTA *  ilangaiyar * mannan maNimuDi *  pattum uDan veezha * tannigar onRillA *  silaikAl vaLaittiTTa * minnu muDiyaRku Or kOl koNDuvA!vElaiyaDaittARku Or kOl koNDuvA.",
            9: "tennilangai mannan *  siramtOL tuNi seydu * minnilangupooN *  vibeeDaNa nambikku * ennilangu nAmattaLavum *  arasenRa * minnilangAraRku Or kOl koNDuvA!vENGkaDa vANarkku Or kOl koNDuvA.",
            10: "akkAkkAy! nampikku *  kOl koNDu vAvenRu * mikkAL uraitta sol *  villiputtoor paTTan * okka uraitta *  tamizh pattum vallavar * makkaLaip peRRu *  makizhvar ivvaiyattE.",
        },
        'PAT.2.7.steps': {
            1: "Anirai mEykka neepOdi *  arumarundu AvadaRiyAy * kAnakam ellAm tirindu *  un kariya tirumEni vADa * pAnaiyil pAlai parugi *  paRRAdAr ellAm sirippa * tEnil iniyapirAnE! *  seNbaga poochchooTTa vArAy.",
            2: "karuvuDai mEhangaL kaNDAl *  unnai kaNDAl okkum kaNgaL * uruvuDaiyAy! ulagEzhum *  uNDaga vandu piRandAy! * tiruvuDaiyAL maNavALA! *  tiruvarangattE kiDandAy! * maruvi maNam kamazhhinRa *  mallikai poochchooTTa vArAy.",
            3: "machchoDu mALigai ERi *  mAdarhaL tammiDam pukku * kachchoDu paTTai kizhittu *  kAmpu tugilavai keeRi * nichchalum teemaigaL seyvAy! *  neeL tiruvENGkaDattu endAy! * pachchai tamanagattODu *  pAdiri poochchooTTa vArAy.",
            4: "teruvinkaN ninRu iLa AychchimArkaLai *  teemai seyyAdE * maruvum tamanakamum seer *  mAlai maNam kamazhhinRa * puruvam karuNGkuzhal neRRi *  polinda mugiRkanRu pOlE * uruvam azhagiya nambee! *  ugandivai sooTTa nee vArAy.",
            5: "puLLinai vAy piLandiTTAy! *  porukariyin kombosittAy! * kaLLavarakkiyai mookkoDu *  kAvalanai talai koNDAy! * aLLi nee veNNey vizhunga *  anjAdu aDiyEn aDittEn * teLLiya neeril ezhunda *  sengazhu neer sooTTa vArAy.",
            6: "erudugaLODu porudi *  Edum ulObAykAN nambi! * karudiya teemaigaL seydu *  kanjanai kAl koDu pAyndAy! * teruvinkaN teemaigaL seydu *  sikkena mallarhaLODu * porudu varuginRa ponnE! *  punnai poochchooTTa vArAy.",
            7: "kuDangaL eDuttERaviTTu *  koottADa valla em kOvE! * maDangoL madi mugattArai *  mAl seyya valla en maindA! * iDandiTTu iraNiyan nenjai *  irupiLavaga mun keeNDAy! * kuDandai kiDanda em kOvE! *  kurukkatti poochchooTTa vArAy.",
            8: "seemAlikan avanODu *  tOzhamai koLLavum vallAy! * sAmARu avanai nee eNNi *  chakkarattAl talaikkoNDAy! * AmARaRiyum pirAnE! *  aNi arangattE kiDandAy! * EmARRam ennai tavirttAy! *  iruvATchi poochchooTTa vArAy.",
            9: "aNDattamararkaL soozha *  attANiyuL angirundAy! * toNDarkaL nenjil uRaivAy! *  toomalarAL maNavALA! * uNDiTTu ulaginai Ezhum *  OrAlilaiyil tuyil koNDAy! * kaNDu nAn unnai ugakka *  karumugai poochchooTTa vArAy.",
            10: "seNbaga malligaiyODu *  sengazhuneer iruvATchi * eNpagar poovum koNarndEn *  inRu ivai sooTTa vAvenRu * maNpagar koNDAnai *  Aychchi magizhndurai seyda immAlai * paNpagar villiputtoor kOn *  paTTar pirAn sonna pattE.",
        },
        'PAT.2.8.steps': {
            1: "indiranODu biraman *  eesan imaiyavar ellAm * mandira mAmalar koNDu *  maRaindu uvarAy vandu ninRAr * chandiran mALigai sErum *  sadirarkaL veLLaRai ninRAy * andiyam pOdu iduvAkum *  azhaganE! kAppiDa vArAy.",
            2: "kanRugaL illam pugundu *  kadaRukinRa pasu ellAm * ninRu ozhindEn unnaik koovi *  nEsamEl onRum ilAdAy! * manRil nillEl andip pOdu *  madiL tiru veLLaRai ninRAy! * nanRu kaNDAy en tan sollu *  nAn unnaik kAppiDa vArAy.",
            3: "seppOdu men mulaiyArkaL *  siRusORum illum sidaittiTTu * appOdu nAn urappappOy *  aDisilum uNDilai ALvAy! * muppOdum vAnavar Ettum *  munivarhaL veLLaRai ninRAy!ippOdu nAn onRum seyyEn *  embirAn! kAppiDa vArAy",
            4: "kaNNil maNal koDu toovik *  kAlinAl pAynddanai enRuenRu * eNNarum piLLaikaL vandiTTu *  ivarAl muRaippaDu kinRAr * kaNNanE! veLLaRai ninRAy! *  kaNDArODE teemai seyvAy!vaNNamE vElaiyadu oppAy! *  vaLLalE! kAppiDa vArAy",
            5: "pallAyiravar ivvooril *  piLLaikaL teemaigaL seyvAr * ellAm un mEl anRi pogAdu *  embirAn! nee ingE vArAy * nallArkaL veLLaRai ninRAy! *  nAnachchuDarE! un mEni * sollAra vAzhtti ninRu Etti *  soppaDa kAppiDa vArAy.",
            6: "kanjan kaRukkoNDu ninmEl *  karuniRa chemmayirp pEyai * vanjippadaRku viDuttAn *  enbadOr vArttaiyum uNDu * manju tavazh maNimADa *  madiL tiru veLLaRai ninRAy!anjuvan nee angu niRka *  azhaganE! kAppiDa vArAy.",
            7: "kaLLach chakaDum marudum *  kalakkazhiya udai seyda * piLLaiyarasE! *  nee pEyai piDittu mulai uNDa pinnai * uLLavARu onRum aRiyEn *  oLi uDai veLLaRai ninRAy! * paLLi koL pOdu iduvagum *  paramanE! kAppiDa vArAy.",
            8: "inbam adanai uyarttAy! *  imaiyavarkku enRum ariyAy! * kumba kaLiRaTTa kOvE! *  koDum kanjan nenjinil kooRRE! * sempon madiL veLLaRaiyAy! *  selvattinAl vaLar piLLAy!kamba kabAli kAN angu *  kaDidODi kAppiDa vArAy.",
            9: "irukkoDu neer sangil koNDiTTu *  ezhil maRaiyOr vandu ninRAr * tarukkEl nambi! sandi ninRu *  tAy sollu koLLAy sila nAL * tirukkAppu nAn unnai sAtta *  tEsuDai veLLaRai ninRAy! * urukkATTum andi viLakku *  inRu oLi koLLa ERRukEn vArAy.",
            10: "pOdamar selvak kozhundu *  puNar tiru veLLaRaiyAnai * mAdarkkuyarnda asOdai *  magan tannai kAppiTTa mARRam * vEdap payan koLLa valla *  vishNu chittan sonna mAlai * pAda payan koLLa valla *  pattaruLLAr vinai pOmE.",
        },
        'PAT.2.9.steps': {
            1: "veNNey vizhungi veRum kalattai veRpiDai iTTu *  adan Osai kETkum * kaNNa birAn kaRRa kalvi tannai *  kAkkakillOm unmaganai kAvAy * puNNil puLippeydAl okkum teemai *  puraipuraiyAl ivai seyya valla * aNNal kaNNAnOr maganai peRRa * asOdai nangAy! un maganai koovAy.",
            2: "varuha varuha varuha ingE *  vAmana nambee! varuha ingE * kariya kuzhal seyyavAy muhattu *  kAkutta nambee! varuhaingE * ariyanivan enakku inRu nangAy! *  anjana vaNNA! asalagattAr * paribavam pEsa tarikka killEn *  pAviyEnukku ingE pOdarAyE.",
            3: "tiruvuDai piLLai tAn teeyavARu *  tEkkam onRumilan tEsuDaiyan * uruhavaitta kuDattoDu veNNey *  uRinji uDaittiTTu pOndu ninRAn * aruhirundAr tammai aniyAyam seyvadu tAn *  vazhakkO? asOdAy! * varuha venRu unmagan tannai koovAy *  vAzha oTTAn madusoodananE.",
            4: "koNDal vaNNA! ingE pOdarAyE *  kOyil piLLAy! ingE pOdarAyE * teNtiraisoozh tiruppEr kiDanda *  tiru nAraNA! ingE pOdarAyE * uNDu vandEn ammaM enRu solli *  ODi agampuha AychchitAnum * kaNDedirE senReDuttu koLLa *  kaNNapirAn kaRRa kalvidAnE.",
            5: "pAlai kaRandu aDuppERa vaittu *  pal vaLaiyAL enmagaL iruppa * mElaiyakattE neruppu vENDichchenRu *  iRaippozhudu angE pEsi ninREn * sALakkirAmam uDaiya nambi *  sAyttu parukiTTu pOndu ninRAn * Alai karumbin mozhi anaiya *  asOdai nangAy! unmaganai koovAy",
            6: "pOdar kaNDAy ingE pOdar kaNDAy *  pOdarEn ennAdE pOdar kaNDAy * EdEnum solli asalagattAr *  EdEnum pEsa nAn kETka mATTEn * kOdugalamuDai kuTTa nEyA! *  kunReDuttAy! kuDamADu koottA!vEdapporuLE! en vENGkaTavA! *  vittaganE! ingE pOdarAyE.",
            7: "sennel arisi siRuparuppu *  seyda akkAram naRu ney pAlAl * panniraNDu tiruvONam aTTEn *  paNDum ippiLLai parisaRivan * innamuhappan nAn enRu solli *  ellAm vizhungiTTu pOndu ninRAn * unmagan tannai asOdai nangAy! *  koovi koLLAy ivaiyum silavE",
            8: "kEsavanE! ingE pOdarAyE *  killEn ennAdu ingE pOdarAyE * nEsamilAdAr agattirundu *  nee viLaiyADAdE pOdarAyE * toosanam sollum tozhuttaimArum *  toNDarum ninRa iDattil ninRu * tAy sollu koLvadu tanmam kaNDAy *  dAmOdarA! ingE pOdarAyE.",
            9: "kannal ilaTTuvattODu seeDai *  kAr eLLin uNDai kalattiliTTu * ennagam enRu nAn vaittup pOndEn *  ivan pukku avaRRai peRutti pOndAn * pinnum agampukku uRiyai nOkki *  piRangoLi veNNeyum sOdikkinRAn * unmagan tannai yasOdai nangAy! *  koovi koLLAy ivaiyum silavE.",
            10: "sollil arasippaDudi nangAy! *  suzhaluDaiyan unpiLLai tAnE * illam puhundu enmagaLai koovi *  kaiyil vaLaiyai kazhaRRi koNDu * kollaiyil ninRum koNarndu viRRa *  angoruttikku avvaLai koDuttu * nallana nAval pazhangaL koNDu *  nAnallEn enRu sirikkinRAnE.",
            11: "vaNDu kaLittiraikkum pozhilsoozh *  varu punal kAviri tennarangan * paNDavanseyda kireeDai ellAm *  paTTar pirAn vishNu chittan pADal * koNDivai pADi kunikka vallAr *  gOvindan tan aDiyArkaLagi * eNtisaikkum viLakkAki niRpAr *  iNaiyaDi en talai mElanavE.",
        },
        'PAT.2.10.steps': {
            1: "ARRilirundu *  viLaiyADu vOngaLai * sERRAl eRindu *  vaLaitugil kaikkoNDu * kARRin kaDiyanAy *  ODi agampukku * mARRamum tArAnAl inRu muRRum * vaLaittiRam pEsAnAl inRumuRRum.",
            2: "kuNDalam tAzha *  kuzhal tAzha nAN tAzha * eNtisaiyOrum *  iRainji tozhudEtta * vaNDamar pooNGkuzhalAr *  tugil kaikkoNDu * viNtOy marattAnAl inRu muRRum * vENDavum tArAnAl inRumuRRum.",
            3: "taDampaDu tAmarai *  poyhai kalakki * viDampaDu nAkattai *  vAlpaRRi eerttu * paDampaDu paindalai *  mElezha pAyndittu * uDambai asaittAnAl inRu muRRum * uchchiyil ninRAnAl inRu muRRum.",
            4: "tEnugan Avi sekuttu * panangani tAneRinditta *  taDam perum tOLinAl * vAnavarkOnviDa *  vanda mazhai taDuttu * Anirai kAttAnAl inRu muRRum * avai uyya koNDAnAl inRumuRRum.",
            5: "Aychchiyar sEri *  aLai tayir pAl uNDu * pErttavar kaNDu piDikka *  piDiyuNDu * vEyttaDam tOLinAr *  veNNey koL mAttAdu * angu AppuNDu irundAnAl inRu muRRum * aDiyuNDu azhudAnAl inRumuRRum.",
            6: "taLLi taLir naDaiyittu *  iLam piLLaiyAy * uLLattin uLLE *  avaLai uRanOkki * kaLLattinAl vanda *  pEychchi mulaiyuyir * tuLLa suvaittAnAl inRu muRRum * tuvakkaRa uNDAnAl inRumuRRum.",
            7: "mAvali vELviyil *  mAN uruvAy senRu * moovaDi tAvenRu *  iranda immaNNinai * OraDiyittu *  iraNDAm aDi tannilE * tAvaDi ittAnAl inRu muRRum * taraNi aLandAnAl inRumuRRum.",
            8: "tAzhai taNNAmbal *  taDam perum poyhai vAy * vAzhu mudalai *  valaippattu vAdippuN * vEzham tuyar keDa *  viNNOr perumAnAy * AzhipaNi koNDAnAl inRu muRRum * adaRku aruL seydAnAl inRumuRRum.",
            9: "vAnattu ezhunda *  mazhai mugil pOl * engum kAnattu mEyndu *  kaLittu viLaiyADi * EnatturuvAy *  iDanda immaNNinai * tAnattE vaittAnAl inRu muRRumtaraNi iDandAnAl inRu muRRum.",
            10: "angamala kaNNan tannai *  yasOdaikku * mangai nallArkaL *  tAm vandu muRaippatta * angavar sollai *  puduvai kOn pattan sol * ingu ivai vallavarkku *  Edam onRillaiyE.",
        }
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
