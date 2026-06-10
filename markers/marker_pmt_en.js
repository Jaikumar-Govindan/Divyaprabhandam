window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'PMT.0.steps':
    {
      1: "udayavar aruLich cheydha: innamudham UttugEn ingE vA paingiLiyE! * thennarangam pAda valla sIrp perumAL * ponnan jilai sEr nudhaliyar vEL sEralar kOn * engaL kulasEkaran enRE kURu *",
      2: "manakkAl nambi aruLich cheydha: Aram kedap paran anbar koLLAr enRu * avargaLukkE vArangodu kudap pAmbiR kai ittavan * mARRalarai vIrangeduththa sengOl kolli kAvalan villavar kOn * sEran kulasEkaran mudi vEndhar sigAmaNiyE *"
    },
    'PMT.1.steps': {
      1: "* iruL iriyach chudarmaNigaL imaikkum neRRi * inaththuththi aNipaNam AyirangaL Arndha * aravarasap perunjOdhi ananthan ennum * aNi viLangum uyar veLLai aNaiyai mEvi *** thiruvarangap perunagaruL theNNIrp ponni * thiraik kaiyAl adivarudap paLLi koLLum * karumaNiyaik kOmaLaththaik kaNdu koNdu * en kaNNiNaigaL enRu kolO kaLikkum nALE? *",
      2: "* vAyOr IrainjnjURu thudhangaL Arndha * vaLai udambin azal nAgam umizhndha sendhI * vIyAdha malarch chenni vidhAnamE pOl * mEnmElum miga engum parandhadhan kIzh *** kAyAmpU malarp piRangal anna mAlaik * kadi arangaththu aravaNaiyil paLLi koLLum * mAyOnai maNaththUNE paRRi ninRu * en vAyAra enRu kolO vAzhththum nALE? *",
      3: "emmANbin ayan nAngu nAvinAlum eduththEththi * IriraNdu mugamum koNdu * emmAdum ezhiRkaNgaL ettinOdum thozhudhEththi * inidhiRainja ninRa *** sempon ammAn than malark kamalak koppUzh thOnRa * aNi arangaththu aravaNaiyil paLLi koLLum * ammAn than adiyiNaik kIzh alargaL ittu * angu adiyavarOdu enRu kolO aNugum nALE? *",
      4: "mAvinai vAy piLandhu ugandha mAlai * vElai vaNNaNai en kaNNaNai van kunRam Endhi * Avinai anRu uyyak koNda Ayar ERRai * amarargaL than thalaivanai andhamizhin inbap pAvinai *** avvadamozhiyaip paRRaRRArgaL * payil arangaththu aravaNaiyil paLLi koLLum * kOvinai nAvuRa vazhuththi endhan kaigaL * koymmalar thUy enRu kolO kUppum nALE? *",
      5: "iNai illA innisai yAzh kezhumi * inbath thumburuvum nAradhanum iRainji Eththa * thuNai illAth thonmaRai nUl thOththiraththAl * thonmalarkkaN ayan vaNangi OvAdhu Eththa *** maNimAda mALigaigaL malgu selva * madhiL arangaththu aravaNaiyil paLLi koLLum * maNivaNNan ammAnaik kaNdu koNdu * en malarch chenni enRu kolO vaNangum nALE? *",
      6: "aLimalar mEl ayan aran indhiranOdu * Enai amarargaL tham kuzhuvum arambaiyarum maRRum * theLimadhi sEr munivargaL tham kuzhuvum mundhith * thisai thisaiyil malar thUvich chenRu sErum *** kaLimalar sEr pozhil arangaththu uragam ERik * kaN vaLarum kadal vaNNar kamalak kaNNum * oLimadhi sEr thirumugamum kaNdu koNdu * en uLLam miga enRu kolO urugum nALE? *",
      7: "maRam thigazhum manamozhiththu vanjamARRi * vanpulangaL adakki idarppArath thunbam thuRandhu * irumuppozhudhu Eththi ellai illAth thonneRikkaN * nilai ninRa thoNdarAna *** aRam thigazhum manaththavar tham kadhiyaip ponni * aNi arangaththu aravaNaiyil paLLi koLLum * niRam thigazhum mAyOnaik kaNdu en kaNgaL * nIrmalga enRu kolO niRkum nALE? *",
      8: "kOlArndha nedum sArngam kUnaR sangam * kolaiyAzhi kodundhaNdu koRRa oLvAL * kAlArndha kadhik karudan ennum * venRik kadum paRavai ivai anaiththum puRanjUzh kAppa *** sElArndha nedungazhani sOlai sUzhndha * thiruvarangaththu aravaNaiyil paLLi koLLum * mAlOnaik kaNdu inbak kalavi eydhi * valvinaiyEn enRu kolO vAzhum nALE? *",
      9: "thUrAdha manak kAdhal thoNdar thangaL kuzhAm kuzhumith * thiruppugazhgaL palavum pAdi * ArAdha manak kaLippOdu azhudha kaNNIr mazhai sOra * ninaindhurugi Eththi *** nALum sIrArndha muzhavOsai paravai kAttum * thiruvarangaththu aravaNaiyil paLLi koLLum * pOrAzhi ammAnaik kaNdu thuLLip * pUdhalaththil enRu kolO puraLum nALE? *",
      10: "vanperu vAnagam uyya amarar uyya maNNuyya * maNNulagil manisar uyya * thunbamigu thuyar agala ayarvonRillAch chugam vaLara * agamagizhum thoNdar vAzha *** anbodu thendhisai nOkkip paLLi koLLum * aNi arangan thirumuRRaththu adiyAr thangaL * inbamigu perunguzhuvu kaNdu * yAnum isaindhudanE enRu kolO irukkum nALE? *",
      11: "* thidar viLangu karaip ponni naduvu pAttuth * thiruvarangaththu aravaNaiyil paLLi koLLum * kadal viLangu karumEni ammAn thannaik * kaNNArak kaNdugakkum kAdhal thannAl *** kudai viLangu viRal thAnaik koRRa oLvAL * kUdalar kOn kodaik kulasEkaran soR seydha * nadai viLangu thamizh mAlai paththum vallAr * nalam thigazh nAraNan adik kIzh naNNuvArE *",
      12: "adivaravu: iruL vAy * emmANbin mAvinai * iNai aLi * maRam kOl * thUrAdha vanperu * thidar thEttu *"
    },
    'PMT.2.steps': {
      1: "* thEttarum thiRal thEninaith * thennaranganai * thirumAdhu vAzh vAttamil vanamAlai mArvanai vAzhththi * mAlkoL sindhaiyarAy *** AttamEvi alandhazhaiththu * ayarveydhum meyyadiyArgaL tham * Ittam kaNdidak kUdumEl * adhu kANum kaN payan AvadhE *",
      2: "thOdulA malarmangai thOLiNai thOyndhadhum * sudar vALiyAl * nIdu mAmaram seRRadhum nirai mEyththadhum * ivaiyE ninaindhu *** AdippAdi arangavO! enRazhaikkum * thoNdaradippodi Ada nAm peRil * gangai nIr kudainthAdum * vEtkai ennAvadhE? *",
      3: "ERadarththadhum EnamAy nilam kINdadhum * mun irAmanAy * mARadarththadhum maNNaLandhadhum * sollip pAdi *** vaNponnippE rARu pOl varum kaNNanIr koNdu * arangan kOyil thirumuRRam * sERu sey thoNdar sEvadich * chezhunjERu en sennikku aNivanE *",
      4: "thOyththa thaN thayir veNNey pAludan uNdalum * udanRAychchi kaNdu * Arththa thOLudai empirAn * en aranganukku adiyArgaLAy *** nAththazhumbezha nAraNA enRazhaiththu * mey thazhumbath thozhudhu Eththi * inbuRum thoNdar sEvadi * Eththi vAzhththum en nenjamE *",
      5: "poysilaik kuralERReruththam iRuththup * pOraravIrththa kOn * seysilaich chudar sUzhoLith * thiNNa mAmadhiL thennaranganAm *** meysilaik karumEgam onRu * tham nenjil ninRu thigazhap pOy * meysilirppavar thammaiyE ninaindhu * en manam mey silirkkumE *",
      6: "Adhi andham anandham aRpudhamAna * vAnavar tham pirAn * pAdha mAmalar sUdum paththi ilAdha * pAvigaL uyndhida *** thIdhil nanneRi kAtti * engum thirindhu arangan emmAnukkE * kAdhal sey thoNdarkku eppiRappilum * kAdhal seyyum en nenjamE *",
      7: "kArinam purai mEni naRkadhir * muththa veNNagaich cheyya vAy * AramArvan arangan ennum * arumperum sudar onRinai *** sErum nenjinarAgich * chErndhu kasindhizhindha kaNNIrgaLAl * vAra niRpavar thALiNaikku * oru vAramAgum en nenjamE *",
      8: "mAlaiyuRRa kadal kidandhavan * vaNdukiNdu naRundhuzhAy * mAlaiyuRRa varaipperum thirumArvanai * malarkkaNNanai *** mAlaiyuRRu ezhundhu AdippAdith * thirindhu arangan emmAnukkE * mAlaiyuRRidum thoNdar vAzhvukku * mAlaiyuRRadhu en nenjamE *",
      9: "moyththuk kaNpani sOra meygaL silirppa * Engi iLaiththu ninRu * eyththuk kumbidu nattam ittezhundhu * AdippAdi iRainji *** en aththan achchan aranganukku adiyArgaLAgi * avanukkE piththarAm avar * piththar allargaL * maRRaiyAr muRRum piththarE *",
      10: "* alli mAmalar mangai nAdhan * arangan meyyadiyArgaL tham * ellaiyil adimaith thiRaththinil * enRum mEvu manaththanAm *** kollikAvalan kUdalnAyagan * kOzhikkOn kulasEkaran * sollin inthamizh mAlai vallavar * thoNdar thoNdargaL AvarE *",
      11: "adivaravu: thEttu thOdu * ERu thOyththa * poy Adhi * kArinam mAlai * alli mey *"
    },
    'PMT.3.steps': {
      1: "* meyyil vAzhkkaiyai * meyyenak koLLum * iv vaiyam thannodum * kUduvadhillai yAn * aiyanE! * arangA! enRu azhaikkinREn * maiyal koNdozhindhEn * endhan mAlukkE *",
      2: "nUlinEr idaiyAr * thiRaththE niRkum * gyAlam thannodum * kUduvadhillai yAn * AliyA azhaiyA * arangA! enRu * mAlezhundhu ozhindhEn * endhan mAlukkE *",
      3: "mAranAr * varivenjilaikku Atseyyum * pArinArodum * kUduvadhillai yAn * AramArvan * arangan ananthan * nal nAraNan * naragAndhagan piththanE *",
      4: "uNdiyE udaiyE * ugandhOdum * im maNdalaththodum * kUduvadhillai yAn * aNdavANan * arangan vanpEy mulai * uNda vAyan than * unmaththan kANminE *",
      5: "thIdhil nanneRi niRka * allAdhu sey * nIdhiyArodum * kUduvadhillai yAn * Adhi Ayan * arangan andhAmaraip * pEdhaimA * pEdhaimA maNavALan than piththanE *",
      6: "embaraththar * allArodum kUdalan * umbar vAzhvai * onRAgak karudhilan * thambirAn amararkku * aranga nagar * empirAnukku * ezhumaiyum piththanE *",
      7: "eththiRaththilum * yArodum kUdum * ach chiththam thannaith * thavirththanan sengaNmAl * aththanE! * arangA! enRu azhaikkinREn * piththanAy ozhindhEn empirAnukkE *",
      8: "pEyarE * enakku yAvarum * yAnum Or pEyanE * evarkkum idhu pEsi en! * AyanE! * arangA! enRu azhaikkinREn * pEyanAy ozhindhEn * empirAnukkE *",
      9: "* angai Azhi * arangan adiyiNai * thangu sindhaith * thanip perum piththanAy * kongarkOn * kulasEkaran sonna sol * ingu vallavarkku Edham onRillaiyE* *",
      10: "adivaravu: mey nUl * mAranAr uNdi * thIdhil emparaththar * eththiRaththilum pEyarE * angai Un *"
    },
    'PMT.4.steps': {
      1: "* UnERu selvaththu * udaRpiRavi yAn vENdEn * AnEREzh venRAn * adimaith thiRam allAl * kUnERu sangam idaththAn than * vEngadaththu * kOn Eri vAzhum * kurugAyp piRappEnE *",
      2: "AnAdha selvaththu * arambaiyargaL thaRsUzha * vAnALum selvamum * maNNarasum yAn vENdEn * thEnAr pUnjOlaith * thiruvEngadach chunaiyil * mInAyp piRakkum * vidhi udaiyEn AvEnE *",
      3: "pinnitta sadaiyAnum * piramanum indhiranum * thunnittup pugal ariya * vaigundha nIL vAsal * minvattach chudar Azhi * vEngadak kOn thAnumizhum * pon vattil pidiththudanE * pugap peRuvEn AvEnE *",
      4: "oNpavaLa vElai * ulavu thaN pARkadaluL * kaN thuyilum mAyOn * kazhaliNaigaL kANbadhaRku * paN pagarum vaNdinangaL * paN pAdum vEngadaththu * seNbagamAy niRkum * thiruvudaiyEn AvEnE *",
      5: "kambamadha yAnai * kazhuththagaththin mEl irundhu * inbamarum selvamum * ivvarasum yAn vENdEn * emperumAn Isan * ezhil vEngada malai mEl * thambagamAy niRkum * thavam udaiyEn AvEnE *",
      6: "minnanaiya nuNNidaiyAr * uruppasiyum mEnagaiyum * annavar tham pAdalodum * Adal avai AdhariyEn * thennavena vaNdinangaL * paN pAdum vEngadaththuL * annanaiya poRkudavAm * arunthavaththan AvEnE *",
      7: "vAnALum mAmadhi pOl * veNkudaik kIzh * mannavar tham kOnAgi vIRRirundhu * koNdAdum selvaRiyEn * thEnAr pUnjOlaith * thiruvEngada malai mEl * kAnARAyp pAyum * karuththudaiyEn AvEnE *",
      8: "piRai ERu sadaiyAnum * piramanum indhiranum * muRaiyAya peruvELvik * kuRai mudippAn maRaiyAnAn * veRiyAr thaNsOlaith * thiruvEngada malai mEl * neRiyAyk kidakkum * nilai udaiyEn AvEnE *",
      9: "* sediyAya valvinaigaL * thIrkkum thirumAlE! * nediyAnE! vEngadavA! * nin kOyilin vAsal * adiyArum vAnavarum * arambaiyarum kidandhu iyangum * padiyAyk kidandhu * un pavaLavAy kANbEnE *",
      10: "umbar ulagANdu * oru kudaik kIzh uruppasi than * ampoRkalai algul * peRRAlum AdhariyEn * sembavaLa vAyAn * thiruvEngadam ennum * emperumAn ponmalai mEl * EdhEnum AvEnE *",
      11: "* manniya thaNsAral * vadavEngadaththAn than * ponniyalum sEvadigaL * kANbAn purindhu iRainji * konnavilum kUrvEl * kulasEkaran sonna * panniya nUl thamizh vallAr * pAngAya paththargaLE *",
      12: "adivaravu: Un AnAdha * pin oN * kamba min * vAn piRai * sedi umbar * manniya tharu *"
    },
    'PMT.5.steps': {
      1: "* tharuthuyaram thadAyEl * un saraN allAl saraN illai * virai kuzhuvum malarppozhil sUzh * viththuvakkOttammAnE! * arisinaththAl InRa thAy agaRRidinum * maRRavaL than aruL ninaindhE azhum kuzhavi * adhuvE pOnRirundhEnE *",
      2: "kaNdAr igazhvanavE * kAdhalan thAn seydhidinum * koNdAnai allAl * aRiyAk kulamagaL pOl * viNthOy madhiL pudai sUzh * viththuvakkOttammA! * nI koNdALAyAgilum * un kuraikazhalE kURuvanE *",
      3: "mIn nOkkum nILvayal sUzh * viththuvakkOttammA! * en pAl nOkkAyAgilum * un paRRallAl paRRilEn * thAn nOkkAdhu eththuyaram * seydhidinum * thArvEndhan kOl nOkki vAzhum * kudi pOnRirundhEnE *",
      4: "vALAl aRuththuch chudinum * maruththuvan pAl * mALAdha kAdhal * nOyALan pOl mAyaththAl * mILAth thuyar tharinum * viththuvakkOttammA! * nI ALA unadharuLE * pArppan adiyEnE *",
      5: "vengaN thiN kaLiRu adarththAy! * viththuvakkOttammAnE! * engup pOy uygEn? * un iNaiyadiyE adaiyal allAl * engum pOyk karai kANAdhu * eRikadal vAy mINdEyum * vangaththin kUmbERum * mAppaRavai pOnREnE *",
      6: "sendhazhalE vandhu * azhalaich cheydhidinum * sengamalam andharam sEr * vengadhirORkallAl alarAvAl * vendhuyar vIttAvidinum * viththuvakkOttammA! * un andhamil sIrkkallAl * agam kuzhaiya mAttEnE *",
      7: "eththanaiyum vAn maRandha kAlaththum * paingUzhgaL * maiththezhundha mAmugilE * pArththirukkum maRRavai pOl * meyththuyar vIttAvidinum * viththuvakkOttammA! * en siththam miga un pAlE * vaippan Adilene *",
      8: "thokkilanguyARellAm * parandhOdi * thodukadalE pukkanRip puRam niRka * mAttAdha maRRavai pOl * mikkilangu mugilniRaththAy! * viththuvakkOttammA! * un pukkilangu sIrallAl * pukkilan kAN puNNiyanE! *",
      9: "ninnaiyE thAn vENdi * nILselvam vENdAdhAn thannaiyE * thAn vENdum * selvam pOl mAyaththAl * minnaiyE sEr thigiri * viththuvakkOttammA! * ninnaiyE thAn vENdi * niRpan adiyEnE *",
      10: "viththuvakkOttammA! * nI vENdAyE Ayidinum * maRRArum paRRillEn enRu * avanaith thAL nayandha * koRRavEl thAnaik * kulasEkaran sonna * naRRamizh paththum vallAr * naNNAr naragamE *",
      11: "* adivaravu: tharu kaNdAr * mIn vALAl * vengaN sendhazhal * eththanai thokku * ninnaiyE viththuvakkOttammA *"
    },
    'PMT.6.steps': {
      1: "* Ermalarp pUnguzhal Ayar mAdhar * enaip palar uLLa ivvUril * undhan mArvu thazhuvudhaRku Asaiyinmai * aRindhaRindhE undhan poyyaik kEttu * kUrmazhai pOl panikkUdhal eydhik * kUsi nadungi yamunai ARRil * vArmaNal kunRil pulara ninREn * vAsudhEvA! un varavu pArththE *",
      2: "keNdai oNkaN madavAL oruththi * kIzhai agaththuth thayir kadaiyak kaNdu * ollai nAnum kadaivan enRu * kaLLa vizhiyai vizhiththup pukku * vaNdamar pUnguzhal thAzhndhulAva * vALmugam vErppach chevvAy thudippa * thaNthayir nI kadaindhitta vaNNam * dhAmOdharA! meyyaRivan nAnE *",
      3: "karumalark kUndhal oruththi thannaik * kadaikkaNiththu * AngE oruththi than pAl maruvi manam vaiththu maRRoruththikku uraiththu * oru pEdhaikkup poy kuRiththu * purikuzhal mangai oruththi thannaip puNardhi * avaLukkum meyyan allai * marudhiRuththAy! un vaLarththiyUdE * vaLarginRadhAl undhan mAyai thAnE *",
      4: "thAymulaip pAlil amudhirukkath * thavazhndhu thaLarnadai ittuch chenRu * pEymulai vAy vaiththu nanjai uNdu * piththan enRE piRar Esa ninRAy * Aymigu kAdhalOdu yAn iruppa * yAnvida vandha en thUdhiyOdE * nI migu bOgaththai nangugandhAy * adhuvum un kOrambukkERkumanRE *",
      5: "minnoththa nuNNidaiyALaik koNdu * vIngiruLvAy endhan vIdhiyUdE * ponnoththavAdai kukkUdalittup * pOginRa pOdhu nAn kaNdu ninREn * kaNNuRRavaLai nI kaNNAlittuk * kaiviLikkinRadhum kaNdE ninREn * ennukku avaLai vittu ingu vandhAy? * innam angE nada nambi! nIyE *",
      6: "maRporu thOLudai vAsudhEvA! * valvinaiyEn thuyil koNdavARE * iRRai iravidaiyE maththennai * innaNai mElittaganRu nI pOy * aRRai iravum Or piRRai nALum * arivaiyarOdum aNaindhu vandhAy * eRRukku nI en marungil vandhAy? * emperumAn! nI ezhundharuLE *",
      7: "paiyaravinnaNaip paLLiyinAy! * paNdaiyOm allOm nAm * nI ugakkum maiyari oNkaNNinArum allOm * vaigi em sEri varavozhi nI * seyya udaiyum thirumugamum * sengani vAyum kuzhalum kaNdu * poy oru nAL pattadhE amaiyum * puLLuvam pEsAdhE pOgu nambI! *",
      8: "ennai varugavenak kuRiththittu * inamalar mullaiyinbanthar nIzhal * manni avaLaip puNarap pukku * maRRennaik kaNdu uzhaRA negizhndhAy * ponniRa Adaiyaik kaiyil thAngip * poy achcham kAtti nI pOdhiyElum * innam en kaiyagaththu Ingoru nAL * varudhiyEl en sinam thIrvan nAnE *",
      9: "mangala nalvanamAlai mArvil ilanga * mayil thazhaippeeli sUdi * pongiLavAdai araiyil sAththip * pUngoththuk kAdhil puNarappeydhu * kongu naRunguzhalArgaLOdu * kuzhaindhu kuzhal inidhUdhi vandhAy * engaLukkE oru nAL vandhUdha * un kuzhal innisai pOtharAdhE *",
      10: "* allimalarth thirumangai kELvan thannai * nayandhu iLavAychchimArgaL * ellip pozhudhinil EmaththUdi * eLgi uraiththa urai adhanai * kolli nagarkkiRai kUdaRkOmAn * kulasEkaran innisaiyil mEvi * solliya inthamizh mAlai paththum * solla vallArkku illai thunbam thAnE *",
      11: "adivaravu: Er keNdai * karu thAy * min maRporu * pai ennai * mangalam alli Alai *"
    },
    'PMT.7.steps':
    {
      1: "* AlainIL karumbannavan thAlO * ambuyath thadangaNNinan thAlO * vElainIr niRaththannavan thAlO * vEzhap pOdhagam annavan thAlO *** ElavArkuzhal en magan thAlO * enRenRu unnai en vAyidai niRaiya * thAloliththidum thiruvinai illAth * thAyaril kadaiyAyina thAyE",
      2: "vadikkoL anjanam ezhudhu semmalarkkaN * maruvi mElinidhonRinai nOkki * mudakkich chEvadi malarch chiRukarundhAL * poliyum nIrmugiR kuzhaviyE pOla *** adakkiyArach chenjiRuviral anaiththum * angaiyOdu aNaindhu AnaiyiRkidandha * kidakkai kaNdidap peRRilan andhO! * kEsavA! keduvEn keduvEnE",
      3: "mundhai nanmuRaiy anpudai magaLir * muRai muRai thandham kuRangidai iruththi * endhaiyE! en kulap perunjudarE! * ezhumugil kaNaththezhil kavarERE! *** undhaiyAvan enRuraippa nin sengEzh viralinum * kadaikkaNNinum kAtta * nandhan peRRanan nalvinai illA * nangaLkOn vasudhEvan peRRilanE",
      4: "kaLi nilA ezhil madhi purai mugamum * kaNNanE! thiN kai mArvum thiN thOLum * thaLir malark karunguzhal piRaiyadhuvum * thadangoL thAmaraik kaNgaLum polindha *** iLamai inbaththai inRu endhan kaNNAl * paruguvERku ivaL thAy ena ninaindha * aLavil piLLaimai inbaththai izhandha * pAviyEn enadhAvi nillAdhE",
      5: "maruvum nin thiruneRRiyil sutti asai thara * maNivAyidai muththam tharudhalum * undhan thAdhaiyaip pOlum vadivu kaNdu koNdu * uLLam uL kuLira *** viralaich chenjiRu vAyidaich chErththu * veguLiyAy ninRuraikkum avvuraiyum *  thiruvilEn onRum peRRilEn * ellAm dheyva nangai yasOdhai peRRALE",
      6: "thaNNandhAmaraik kaNNanE! kaNNA! * thavazhndhezhundhu thaLarndhadhOr nadaiyAl * maNNil sembodiyAdi vandhu * endhan mArvil mannidap peRRilEn andhO! *** vaNNach chenjiRu kaiviral anaiththum * vAri vAykkoNda adisilin michchil * uNNap peRRilEn O! koduvinaiyEn * ennai en seyyap peRRadhu emmOyE!",
      7: "kuzhaganE! endhan kOmaLap piLLAy! * gOvindhA! en kudangaiyil manni * ozhugu pErezhil iLanjiRu thaLir pOl * oru kaiyAl oru mulaimugam nerudA *** mazhalai mennagai idaiyidai aruLA * vAyilE mulai irukka en mugaththE * ezhilkoL nin thirukkaNNiNai nOkkam thannaiyum * izhandhEn izhandhEnE",
      8: "muzhudhum veNNey aLaindhu thottuNNum * mugizh iLanjiRuth thAmaraik kaiyum * ezhilkoL thAmbu koNdadippadhaRku eLgu nilaiyum * veNthayir thOyndha sevvAyum *** azhugaiyum anji nOkkum annOkkum * aNikoL senjiRuvAy neLippadhuvum * thozhugaiyum ivai kaNda asOdhai * thollai inbaththiRudhi kaNdALE",
      9: "kunRinAl kudai kaviththadhum * kOlak kuravai kOththadhum kudamAttum * kanRinAl viLaveRindhadhum * kAlAl kALiyan thalai midhiththadhum mudhalA *** venRisEr piLLai nalviLaiyAttam anaiththilum * angen uLLam uL kuLira * onRum kaNdidap peRRilEn adiyEn * kANumARu ini uNdenil aruLE",
      10: "vanjamEviya nenjudaip pEychchi * varaNdunAr narambezhak karindhukka * nanjamAr tharu suzhimulai andhO! * suvaiththu nI aruL seydhu vaLarndhAy *** kanjan nAL kavar karumugil endhAy! * kadaippattEn veRidhE mulai sumandhu *  thanjamEl onRilEn uyndhirundhEn * thakkadhE nalla thAyaip peRRAyE",
      11: "* mallai mAnagarkku iRaiyavan thannai * vAnseluththi vanthIngaNai mAyaththu * ellaiyil piLLai seyvana kANAth * theyvath thEvagi pulambiya pulambal *** kolli kAvalan mAladi mudimEl * kOlamAm kulasEkaran sonna * nallisaith thamizh mAlai vallArgaL * naNNuvAr ollai nAraNan ulagE",
      12: "adivaravu: Alai vadi * mundhai kaLi * maruvu thaNNam * kuzhagan muzhudhum * kunRinAl vanjam * mallai mannu* "
    },
    'PMT.8.steps':
    {
      1: "* mannupugazhk kausalai than * maNivayiRu vAyththavanE! * thennilangaik kOn mudigaL * sindhuviththAy! sempon sEr *** kanninanmA madhiL pudai sUzh * kaNapuraththen karumaNiyE! * ennudaiya innamudhE! * irAgavanE! thAlElO",
      2: "puNdariga malaradhan mEl * buvani ellAm padaiththavanE! * thiN thiRalAL thAdagai than * uram uruvach chilai vaLaiththAy! *** kaNdavar tham manam vazhangum * kaNapuraththen karumaNiyE! * eN thisaiyum ALudaiyAy! *  irAgavanE! thAlElO",
      3: "kongumali karunguzhalAL * kausalai than kulamadhalAy! * thangu perum pugazhch chanagan * thirumarugA! dhAsarathI! *** gangaiyilum thIrththamali * kaNapuraththen karumaNiyE! * engaL kulathu innamudhE! * irAgavanE! thAlElO",
      4: "thAmarai mEl ayan avanaip * padaiththavanE! * dhayaradhan than mAmadhalAy! * maidhili than maNavALA! *** vaNdinangaL kAmarangaL isai pAdum * kaNapuraththen karumaNiyE! * Emaruvum silai valavA! *  irAgavanE! thAlElO",
      5: "pArALum padar selvam * baradha nambikkE aruLi * ArAvanbu iLaiyavanOdu * arungAnam adaindhavanE! *** sIrALum varai mArbA! * thirukkaNNapuraththarasE! * thArALum nINmudi * en dhAsaradhI! thAlElO",
      6: "suRRam ellAm pin thodarath * tholgAnam adaindhavanE! * aRRavargatku arumarundhE! * ayOththi nagarkku adhipadhiyE! *** kaRRavargaL thAm vAzhum * kaNapuraththen karumaNiyE! siRRavai than sol koNda * sIrAmA! thAlElO",
      7: "Alinilaip pAlaganAy * anRulagam uNdavanE! * vAliyaik konRu arasu * iLaiya vAnaraththukku aLiththavanE! *** kAlinmaNi karai alaikkum * kaNapuraththen karumaNiyE! * Alinagarkku adhipadhiyE! * ayOththimanE! thAlElO",
      8: "* malai adhanAl aNai katti * madhiL ilangai azhiththavanE! * alai kadalaik kadaindhu * amararkku amudharuLich cheydhavanE! *** kalaivalavar thAm vAzhum * kaNapuraththen karumaNiyE! * silaivalavA! sEvaganE! * sIrAmA! thAlElO",
      9: "thaLai avizhum naRungunjith * thayaradhan than kulamadhalAy! * vaLaiya oru silai adhanAl * madhiL ilangai azhiththavanE! *** kaLai kazhunIr marungalarum * kaNapuraththen karumaNiyE! * iLaiyavargatku aruLudaiyAy! * irAgavanE! thAlElO",
      10: "* dhEvaraiyum asuraraiyum * thisaigaLaiyum padaiththavanE! * yAvarum vandhu adivaNanga *aranganagarth thuyinRavanE! *** kAviri nalnadhi pAyum * kaNapuraththen karumaNiyE! * Evarivenjilai valavA! * irAgavanE! thAlElO",
      11: "* kanninanmAmadhiL pudai sUzh * kaNapuraththen kAkuththan  thannadi mEl * thAlElO enRuraiththa * thamizh mAlai ***  kol navilum vElvalavan * kudaik kulasEgaran sonna *  panniya nUl paththum vallAr * pAngAya paththargaLE",
      12: "adivaravu: mannu puNdarIkam * kongu thAmarai * pAr suRRam * Alin malai * thaLai dhEvarai * kanni vanthAL",
    },
    'PMT.9.steps':
    {
      1: "* vanthALiniNai vaNangi vaLanagaram thozhudhEththa * mannanAvAn ninRAyai * ariyaNai mEl irundhAyai * nedungAnam padarap pOgu enRAL *** em irAmAvO! *  unaip payandha kaikEsi than soRkEttu * nanRAga nAnilaththai ALviththEn * nanmaganE! unnai nAnE",
      2: "vevvAyEn vevvurai kEttu * irunilaththai vENdAdhE viraindhu * venRi maivAya kaLiRozhindhu thErozhindhu mAvozhindhu * vanamE mEvi *** neyvAya vElnedungaN * nErizhaiyum iLangOvum pinbu pOga * evvARu nadandhanai? em irAmAvO! * emperumAn! en seygEnE!",
      3: "kollaNaivEl varinedungaN * kausalai than kulamadhalAy! kunivillEndhum * mallaNaindha varaiththOLA! * valvinaiyEn manamurukkum vagaiyE kaRRAy *** mellaNai mEl mun thuyinRAy  inRinippOy * viyangAna maraththin nIzhal * kallaNai mEl kaN thuyilak kaRRanaiyO? * kAkuththA! kariya kOvE!",
      4: "vA pOgu vA innam vandhu  orugAl kaNdu pO * malarAL kUndhal * vEy pOlum ezhil thOLi than poruttA * vidaiyOn than villaich cheRRAy *** mApOgu nedungAnam valvinaiyEn * manamurukkum maganE! * inRu nI pOga en nenjam * irupiLavAyp pOgAdhE niRkumARE",
      5: "porundhAr kaivElnudhi pOl paral pAya * melladikkaL kurudhi sOra * virumbAdha kAn virumbi veyil uRaippa * vembasi nOy kUra *** inRu  perum pAviyEn maganE! pOginRAy * kEkayar kOn magaLAyp peRRa * arumbAvi soRkEtta aruvinaiyEn * en seygEn? andhO! yAnE",
      6: "ammA enRu ugandhazhaikkum * Arvach chol kELAdhE aNisEr mArvam * en mArvaththidai azhundhath * thazhuvAdhE muzhusAdhE mOvAdhuchchi *** kaimmAvin nadaiyanna mennadaiyum * kamalam pOl mugamum kANAdhu * emmAnai en maganai izhandhitta * izhithagaiyEn irukkinREnE",
      7: "pUmaruvu naRungunji punsadaiyAypunaindhu *  pUndhugil sEralgul * kAmarezhil vizhaluduththuk * kalanaNiyAdhu angangaL azhagu mARi *** Emaru thOL en pudhalvan * yAn inRu selath thakka vanam thAn sErdhal * thUmaRaiyIr! idhu thagavO? * sumandhiranE! vasittanE! solleer nIrE",
      8: "ponpeRRAr ezhil vEdhap pudhalvanaiyum * thambiyaiyum pUvai pOlum * minpaRRA nuNmarungul * melliyal en marugiyaiyum vanaththil pOkki *** nin paRRA nin magan mEl pazhi viLaiththittu * ennaiyum nILvAnil pOkka * en peRRAy? kaikEsI! * irunilaththil inidhAga irukkinRAyE",
      9: "munnoru nAL mazhuvALi silai vAngi * avan thavaththai muRRum seRRAy * unnaiyum un arumaiyaiyum un mOyin varuththamum * onRAgak koLLAdhu *** ennaiyum en meyyuraiyum meyyAgak koNdu * vanam pukka endhAy! * ninnaiyE maganAgap peRap peRuvEn * EzhpiRappum nedunthOL vEndhE!",
      10: "thEnagu mAmalark kUndhal * kausalaiyum sumiththiraiyum sindhai nOva * kUnuruvin kodunthozhuththai soRkEtta * kodiyavaL than sol koNdu *** inRu  kAnagamE miga virumbi * nI thuRandha vaLanagaraith thuRandhu * nAnum vAnagamE miga virumbip pOginREn * manukulaththAr thangaL kOvE!",
      11: "* ErArndha karunedumAl irAmanAy * vanam pukka adhanukku ARRA * thArArndha thadavaraiththOL dhayaradhan thAn pulambiya * appulambal thannai *** kUrArndha vElvalavan kOzhiyar kOn * kudaik kulasEkaran soRseydha * sIrArndha thamizh mAlai ivai vallAr * thIneRikkaN sellAr thAmE",
      12: "adivaravu: vanthAL vevvAyEn * kollaNai vApOgu * porundhAr ammA * pU pon * mun thEn * ErArndha angaN",
    },
    'PMT.10.steps':
    {
      1: "* angaNedu madhiL pudai sUzh ayOdhdhi ennum * aNi nagaraththu ulaganaiththum viLakkum sOdhi * vengadhirOn kulaththukkOr viLakkAyth thOnRi * viN muzhudhum uyak koNda vIran thannai *** sengaNedum karumugilai irAman thannaith * thillainagarth thiruchchithrakUdam thannuL * engaL thani mudhalvanai emperumAn thannai * enRu kolO! kaN kuLirak kANum nALE",
      2: "vandhedhirndha thAdagai than uraththaik kIRi * varu kurudhi pozhi thara van kaNai onREvi * mandhirangoL maRai munivan vELvi kAththu * vallarakkar uyiruNda maindhan kANmin *** sendhaLirvAy malar nagai sEr sezhundhaN sOlaith * thillainagarth thiruchchithrakUdam thannuL * andhaNargaL oru mUvAyiravar Eththa * aNimaNi Asanaththirundha ammAn thAnE",
      3: "sevvari naRkarunedungaN sIthaikkAgich * china vidaiyOn silai iRuththu mazhuvAL Endhi * vevvari naRsilai vAngi venRi koNdu * vElvEndhar pagai thadindha vIran thannai *** thevvaranju nedum purisai uyarndha pAngarth * thillainagarth thiruchchithrakUdam thannuL * evvari venjilaith thadakkai irAman thannai * iRainjuvAr iNaiyadiyE iRainjinEnE",
      4: "thoththalar pUnjuri kuzhal kaikEsi sollAl * thonnagaram thuRandhu thuRaik kangai thannai * paththiyudaik kugan kadaththa vanam pOyp pukkup * paradhanukkup pAdhukamum arasum Indhu *** chiththirakUdaththu irundhAn thannai * inRu thillainagarth thiruchchithrakUdam thannuL * eththanaiyum kaNkuLirak kANap peRRa * irunilaththArkku imaiyavar nErovvAr thAmE",
      5: "vali vaNakku varai nedundhOL virAdhaik konRu vaNthamizh mAmuni koduththa varivil vAngi * kalaivaNakku nOkkarakki mUkkai nIkkik * karanOdu thUdaNan than uyirai vAngi *** silai vaNakki mAn mariya eydhAn thannaith * thillainagarth thiruchchithrakUdam thannuL * thalai vaNakkik kai kUppi Eththa vallAr * thiridhalAl thavamudaiththuth tharaNi thAnE",
      6: "thanamaruvu vaidhEgi piriyal uRRuth * thaLarveydhich chadAyuvai vaigunthaththu ERRi * vanamaruvu kavi arasan kAdhal koNdu * vAliyaik konRu ilangai nagar arakkar kOmAn *** sinam adanga mArudhiyAl suduviththAnaith * thillainagarth thiruchchithrakUdam thannuL * inidhamarndha ammAnai irAman thannai * EththuvAr iNaiyadiyE EththinEnE",
      7: "kurai kadalai adalambAl maRuga eydhu * kulai katti maRu karaiyai adhanAl ERi * eri neduvEl arakkarodum ilangai vEndhan * innuyir koNdu avan thambikku arasum Indhu *** thirumagaLOdu inidhamarndha selvan thannaith * thillainagarth thiruchchithrakUdam thannuL * arasamarndhAn adi sUdum arasai allAl * arasAga eNNEn maRRarasu thAnE",
      8: "ambonedu maNimAda ayOdhdhi eydhi * araseydhi agaththiyan vAyththAn mun konRAn than * perundhol kadhai kEttu midhilaich chelvi * ulaguyyath thiruvayiRu vAyththa makkaL *** sembavaLath thiraL vAyth than saridhai kEttAn * thillainagarth thiruchchithrakUdam thannuL * emperumAn than saridhai seviyAl kaNNAl paruguvOm * innamudham madhiyOm anRE",
      9: "seRithavach champugan thannaich chenRu konRu * sezhumaRaiyOn uyir mIttuth thavaththOn Indha * niRaimaNip pUN aNiyum koNdu ilavaNan thannaith * thambiyAl vAn ERRi munivan vENda *** thiRal viLangum ilakkumanaip pirindhAn thannaith * thillainagarth thiruchchithrakUdam thannuL * uRaivAnai maRavAdha uLLam thannai udaiyOm * maRRuRu thuyaram adaiyOm anRE",
      10: "* anRu sarAsarangaLai vaigunthaththu ERRi * adal aravap pagai ERi asurar thammai  venRu * ilangu maNi nedundhOL nAngum thOnRa * viN muzhudhum edhir varath than thAmam mEvi *** senRu inidhu vIRRirundha ammAn thannaith * thillainagarth thiruchchithrakUdam thannuL * enRum ninRAn avan ivan enRu Eththi * nALum  iRainjuminO eppozhudhum thondIr! nIrE",
      11: "* thillainagarth thiruchchithrakUdam thannuL * thiRal viLangu mArudhiyOdu amarndhAn thannai * ellaiyil sIrth thayaradhan than maganAyth thOnRiRRu adhu mudhalAth * than ulagam pukkadhu IRA *** kolliyalum padaiththAnaik koRRa oL vAL * kOzhiyar kOn kudaik kulasEkaran soR seydha * nalliyalin thamizh mAlai paththum vallAr * nalam thigazh nAraNan adik kIzh naNNuvArE",
      12: "adivaravu: angaN vandhu * sevvari thoththu * valithanam kurai * ampon seRi * anRu thillai * ",
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