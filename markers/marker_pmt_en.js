window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'PMT.1.steps': {
      1: "iruL iriyach chudarmaNigaL imaikkum neRRi * inaththuththi aNipaNam AyirangaL Arndha * aravarasap perunjOdhi ananthan ennum * aNi viLangum uyar veLLai aNaiyai mEvi *** thiruvarangap perunagaruL theNNIrp ponni * thiraik kaiyAl adivarudap paLLi koLLum * karumaNiyaik kOmaLaththaik kaNdu koNdu * en kaNNiNaigaL enRu kolO kaLikkum nALE? *",
      2: "vAyOr IrainjnjURu thudhangaL Arndha * vaLai udambin azal nAgam umizhndha sendhI * vIyAdha malarch chenni vidhAnamE pOl * mEnmElum miga engum parandhadhan kIzh *** kAyAmpU malarp piRangal anna mAlaik * kadi arangaththu aravaNaiyil paLLi koLLum * mAyOnai maNaththUNE paRRi ninRu * en vAyAra enRu kolO vAzhththum nALE? *",
      3: "emmANbin ayan nAngu nAvinAlum eduththEththi * IriraNdu mugamum koNdu * emmAdum ezhiRkaNgaL ettinOdum thozhudhEththi * inidhiRainja ninRa *** sempon ammAn than malark kamalak koppUzh thOnRa * aNi arangaththu aravaNaiyil paLLi koLLum * ammAn than adiyiNaik kIzh alargaL ittu * angu adiyavarOdu enRu kolO aNugum nALE? *",
      4: "mAvinai vAy piLandhu ugandha mAlai * vElai vaNNaNai en kaNNaNai van kunRam Endhi * Avinai anRu uyyak koNda Ayar ERRai * amarargaL than thalaivanai andhamizhin inbap pAvinai *** avvadamozhiyaip paRRaRRArgaL * payil arangaththu aravaNaiyil paLLi koLLum * kOvinai nAvuRa vazhuththi endhan kaigaL * koymmalar thUy enRu kolO kUppum nALE? *",
      5: "iNai illA innisai yAzh kezhumi * inbath thumburuvum nAradhanum iRainji Eththa * thuNai illAth thonmaRai nUl thOththiraththAl * thonmalarkkaN ayan vaNangi OvAdhu Eththa *** maNimAda mALigaigaL malgu selva * madhiL arangaththu aravaNaiyil paLLi koLLum * maNivaNNan ammAnaik kaNdu koNdu * en malarch chenni enRu kolO vaNangum nALE? *",
      6: "aLimalar mEl ayan aran indhiranOdu * Enai amarargaL tham kuzhuvum arambaiyarum maRRum * theLimadhi sEr munivargaL tham kuzhuvum mundhith * thisai thisaiyil malar thUvich chenRu sErum *** kaLimalar sEr pozhil arangaththu uragam ERik * kaN vaLarum kadal vaNNar kamalak kaNNum * oLimadhi sEr thirumugamum kaNdu koNdu * en uLLam miga enRu kolO urugum nALE? *",
      7: "maRam thigazhum manamozhiththu vanjamARRi * vanpulangaL adakki idarppArath thunbam thuRandhu * irumuppozhudhu Eththi ellai illAth thonneRikkaN * nilai ninRa thoNdarAna *** aRam thigazhum manaththavar tham kadhiyaip ponni * aNi arangaththu aravaNaiyil paLLi koLLum * niRam thigazhum mAyOnaik kaNdu en kaNgaL * nIrmalga enRu kolO niRkum nALE? *",
      8: "kOlArndha nedum sArngam kUnaR sangam * kolaiyAzhi kodundhaNdu koRRa oLvAL * kAlArndha kadhik karudan ennum * venRik kadum paRavai ivai anaiththum puRanjUzh kAppa *** sElArndha nedungazhani sOlai sUzhndha * thiruvarangaththu aravaNaiyil paLLi koLLum * mAlOnaik kaNdu inbak kalavi eydhi * valvinaiyEn enRu kolO vAzhum nALE? *",
      9: "thUrAdha manak kAdhal thoNdar thangaL kuzhAm kuzhumith * thiruppugazhgaL palavum pAdi * ArAdha manak kaLippOdu azhudha kaNNIr mazhai sOra * ninaindhurugi Eththi *** nALum sIrArndha muzhavOsai paravai kAttum * thiruvarangaththu aravaNaiyil paLLi koLLum * pOrAzhi ammAnaik kaNdu thuLLip * pUdhalaththil enRu kolO puraLum nALE? *",
      10: "vanperu vAnagam uyya amarar uyya maNNuyya * maNNulagil manisar uyya * thunbamigu thuyar agala ayarvonRillAch chugam vaLara * agamagizhum thoNdar vAzha *** anbodu thendhisai nOkkip paLLi koLLum * aNi arangan thirumuRRaththu adiyAr thangaL * inbamigu perunguzhuvu kaNdu * yAnum isaindhudanE enRu kolO irukkum nALE? *",
      11: "thidar viLangu karaip ponni naduvu pAttuth * thiruvarangaththu aravaNaiyil paLLi koLLum * kadal viLangu karumEni ammAn thannaik * kaNNArak kaNdugakkum kAdhal thannAl *** kudai viLangu viRal thAnaik koRRa oLvAL * kUdalar kOn kodaik kulasEkaran soR seydha * nadai viLangu thamizh mAlai paththum vallAr * nalam thigazh nAraNan adik kIzh naNNuvArE *",
      12: "adivaravu: iruL vAy * emmANbin mAvinai * iNai aLi * maRam kOl * thUrAdha vanperu * thidar thEttu *"
    },
    'PMT.2.steps': {
      1: "thEttarum thiRal thEninaith * thennaranganai * thirumAdhu vAzh vAttamil vanamAlai mArvanai vAzhththi * mAlkoL sindhaiyarAy *** AttamEvi alandhazhaiththu * ayarveydhum meyyadiyArgaL tham * Ittam kaNdidak kUdumEl * adhu kANum kaN payan AvadhE *",
      2: "thOdulA malarmangai thOLiNai thOyndhadhum * sudar vALiyAl * nIdu mAmaram seRRadhum nirai mEyththadhum * ivaiyE ninaindhu *** AdippAdi arangavO! enRazhaikkum * thoNdaradippodi Ada nAm peRil * gangai nIr kudainthAdum * vEtkai ennAvadhE? *",
      3: "ERadarththadhum EnamAy nilam kINdadhum * mun irAmanAy * mARadarththadhum maNNaLandhadhum * sollip pAdi *** vaNponnippE rARu pOl varum kaNNanIr koNdu * arangan kOyil thirumuRRam * sERu sey thoNdar sEvadich * chezhunjERu en sennikku aNivanE *",
      4: "thOyththa thaN thayir veNNey pAludan uNdalum * udanRAychchi kaNdu * Arththa thOLudai empirAn * en aranganukku adiyArgaLAy *** nAththazhumbezha nAraNA enRazhaiththu * mey thazhumbath thozhudhu Eththi * inbuRum thoNdar sEvadi * Eththi vAzhththum en nenjamE *",
      5: "poysilaik kuralERReruththam iRuththup * pOraravIrththa kOn * seysilaich chudar sUzhoLith * thiNNa mAmadhiL thennaranganAm *** meysilaik karumEgam onRu * tham nenjil ninRu thigazhap pOy * meysilirppavar thammaiyE ninaindhu * en manam mey silirkkumE *",
      6: "Adhi andham anandham aRpudhamAna * vAnavar tham pirAn * pAdha mAmalar sUdum paththi ilAdha * pAvigaL uyndhida *** thIdhil nanneRi kAtti * engum thirindhu arangan emmAnukkE * kAdhal sey thoNdarkku eppiRappilum * kAdhal seyyum en nenjamE *",
      7: "kArinam purai mEni naRkadhir * muththa veNNagaich cheyya vAy * AramArvan arangan ennum * arumperum sudar onRinai *** sErum nenjinarAgich * chErndhu kasindhizhindha kaNNIrgaLAl * vAra niRpavar thALiNaikku * oru vAramAgum en nenjamE *",
      8: "mAlaiyuRRa kadal kidandhavan * vaNdukiNdu naRundhuzhAy * mAlaiyuRRa varaipperum thirumArvanai * malarkkaNNanai *** mAlaiyuRRu ezhundhu AdippAdith * thirindhu arangan emmAnukkE * mAlaiyuRRidum thoNdar vAzhvukku * mAlaiyuRRadhu en nenjamE *",
      9: "moyththuk kaNpani sOra meygaL silirppa * Engi iLaiththu ninRu * eyththuk kumbidu nattam ittezhundhu * AdippAdi iRainji *** en aththan achchan aranganukku adiyArgaLAgi * avanukkE piththarAm avar * piththar allargaL * maRRaiyAr muRRum piththarE *",
      10: "alli mAmalar mangai nAdhan * arangan meyyadiyArgaL tham * ellaiyil adimaith thiRaththinil * enRum mEvu manaththanAm *** kollikAvalan kUdalnAyagan * kOzhikkOn kulasEkaran * sollin inthamizh mAlai vallavar * thoNdar thoNdargaL AvarE *",
      11: "adivaravu: thEttu thOdu * ERu thOyththa * poy Adhi * kArinam mAlai * alli mey *"
    },
    'PMT.3.steps': {
      1: "meyyil vAzhkkaiyai * meyyenak koLLum * iv vaiyam thannodum * kUduvadhillai yAn * aiyanE! * arangA! enRu azhaikkinREn * maiyal koNdozhindhEn * endhan mAlukkE *",
      2: "nUlinEr idaiyAr * thiRaththE niRkum * gyAlam thannodum * kUduvadhillai yAn * AliyA azhaiyA * arangA! enRu * mAlezhundhu ozhindhEn * endhan mAlukkE *",
      3: "mAranAr * varivenjilaikku Atseyyum * pArinArodum * kUduvadhillai yAn * AramArvan * arangan ananthan * nal nAraNan * naragAndhagan piththanE *",
      4: "uNdiyE udaiyE * ugandhOdum * im maNdalaththodum * kUduvadhillai yAn * aNdavANan * arangan vanpEy mulai * uNda vAyan than * unmaththan kANminE *",
      5: "thIdhil nanneRi niRka * allAdhu sey * nIdhiyArodum * kUduvadhillai yAn * Adhi Ayan * arangan andhAmaraip * pEdhaimA * pEdhaimA maNavALan than piththanE *",
      6: "embaraththar * allArodum kUdalan * umbar vAzhvai * onRAgak karudhilan * thambirAn amararkku * aranga nagar * empirAnukku * ezhumaiyum piththanE *",
      7: "eththiRaththilum * yArodum kUdum * ach chiththam thannaith * thavirththanan sengaNmAl * aththanE! * arangA! enRu azhaikkinREn * piththanAy ozhindhEn empirAnukkE *",
      8: "pEyarE * enakku yAvarum * yAnum Or pEyanE * evarkkum idhu pEsi en! * AyanE! * arangA! enRu azhaikkinREn * pEyanAy ozhindhEn * empirAnukkE *",
      9: "angai Azhi * arangan adiyiNai * thangu sindhaith * thanip perum piththanAy * kongarkOn * kulasEkaran sonna sol * ingu vallavarkku Edham onRillaiyE* *",
      10: "adivaravu: mey nUl * mAranAr uNdi * thIdhil emparaththar * eththiRaththilum pEyarE * angai Un *"
    },
    'PMT.4.steps': {
      1: "UnERu selvaththu * udaRpiRavi yAn vENdEn * AnEREzh venRAn * adimaith thiRam allAl * kUnERu sangam idaththAn than * vEngadaththu * kOn Eri vAzhum * kurugAyp piRappEnE *",
      2: "AnAdha selvaththu * arambaiyargaL thaRsUzha * vAnALum selvamum * maNNarasum yAn vENdEn * thEnAr pUnjOlaith * thiruvEngadach chunaiyil * mInAyp piRakkum * vidhi udaiyEn AvEnE *",
      3: "pinnitta sadaiyAnum * piramanum indhiranum * thunnittup pugal ariya * vaigundha nIL vAsal * minvattach chudar Azhi * vEngadak kOn thAnumizhum * pon vattil pidiththudanE * pugap peRuvEn AvEnE *",
      4: "oNpavaLa vElai * ulavu thaN pARkadaluL * kaN thuyilum mAyOn * kazhaliNaigaL kANbadhaRku * paN pagarum vaNdinangaL * paN pAdum vEngadaththu * seNbagamAy niRkum * thiruvudaiyEn AvEnE *",
      5: "kambamadha yAnai * kazhuththagaththin mEl irundhu * inbamarum selvamum * ivvarasum yAn vENdEn * emperumAn Isan * ezhil vEngada malai mEl * thambagamAy niRkum * thavam udaiyEn AvEnE *",
      6: "minnanaiya nuNNidaiyAr * uruppasiyum mEnagaiyum * annavar tham pAdalodum * Adal avai AdhariyEn * thennavena vaNdinangaL * paN pAdum vEngadaththuL * annanaiya poRkudavAm * arunthavaththan AvEnE *",
      7: "vAnALum mAmadhi pOl * veNkudaik kIzh * mannavar tham kOnAgi vIRRirundhu * koNdAdum selvaRiyEn * thEnAr pUnjOlaith * thiruvEngada malai mEl * kAnARAyp pAyum * karuththudaiyEn AvEnE *",
      8: "piRai ERu sadaiyAnum * piramanum indhiranum * muRaiyAya peruvELvik * kuRai mudippAn maRaiyAnAn * veRiyAr thaNsOlaith * thiruvEngada malai mEl * neRiyAyk kidakkum * nilai udaiyEn AvEnE *",
      9: "sediyAya valvinaigaL * thIrkkum thirumAlE! * nediyAnE! vEngadavA! * nin kOyilin vAsal * adiyArum vAnavarum * arambaiyarum kidandhu iyangum * padiyAyk kidandhu * un pavaLavAy kANbEnE *",
      10: "umbar ulagANdu * oru kudaik kIzh uruppasi than * ampoRkalai algul * peRRAlum AdhariyEn * sembavaLa vAyAn * thiruvEngadam ennum * emperumAn ponmalai mEl * EdhEnum AvEnE *",
      11: "manniya thaNsAral * vadavEngadaththAn than * ponniyalum sEvadigaL * kANbAn purindhu iRainji * konnavilum kUrvEl * kulasEkaran sonna * panniya nUl thamizh vallAr * pAngAya paththargaLE *",
      12: "adivaravu: Un AnAdha * pin oN * kamba min * vAn piRai * sedi umbar * manniya tharu *"
    },
    'PMT.5.steps': {
      1: "tharuthuyaram thadAyEl * un saraN allAl saraN illai * virai kuzhuvum malarppozhil sUzh * viththuvakkOttammAnE! * arisinaththAl InRa thAy agaRRidinum * maRRavaL than aruL ninaindhE azhum kuzhavi * adhuvE pOnRirundhEnE *",
      2: "kaNdAr igazhvanavE * kAdhalan thAn seydhidinum * koNdAnai allAl * aRiyAk kulamagaL pOl * viNthOy madhiL pudai sUzh * viththuvakkOttammA! * nI koNdALAyAgilum * un kuraikazhalE kURuvanE *",
      3: "mIn nOkkum nILvayal sUzh * viththuvakkOttammA! * en pAl nOkkAyAgilum * un paRRallAl paRRilEn * thAn nOkkAdhu eththuyaram * seydhidinum * thArvEndhan kOl nOkki vAzhum * kudi pOnRirundhEnE *",
      4: "vALAl aRuththuch chudinum * maruththuvan pAl * mALAdha kAdhal * nOyALan pOl mAyaththAl * mILAth thuyar tharinum * viththuvakkOttammA! * nI ALA unadharuLE * pArppan adiyEnE *",
      5: "vengaN thiN kaLiRu adarththAy! * viththuvakkOttammAnE! * engup pOy uygEn? * un iNaiyadiyE adaiyal allAl * engum pOyk karai kANAdhu * eRikadal vAy mINdEyum * vangaththin kUmbERum * mAppaRavai pOnREnE *",
      6: "sendhazhalE vandhu * azhalaich cheydhidinum * sengamalam andharam sEr * vengadhirORkallAl alarAvAl * vendhuyar vIttAvidinum * viththuvakkOttammA! * un andhamil sIrkkallAl * agam kuzhaiya mAttEnE *",
      7: "eththanaiyum vAn maRandha kAlaththum * paingUzhgaL * maiththezhundha mAmugilE * pArththirukkum maRRavai pOl * meyththuyar vIttAvidinum * viththuvakkOttammA! * en siththam miga un pAlE * vaippan Adilene *",
      8: "thokkilanguyARellAm * parandhOdi * thodukadalE pukkanRip puRam niRka * mAttAdha maRRavai pOl * mikkilangu mugilniRaththAy! * viththuvakkOttammA! * un pukkilangu sIrallAl * pukkilan kAN puNNiyanE! *",
      9: "ninnaiyE thAn vENdi * nILselvam vENdAdhAn thannaiyE * thAn vENdum * selvam pOl mAyaththAl * minnaiyE sEr thigiri * viththuvakkOttammA! * ninnaiyE thAn vENdi * niRpan adiyEnE *",
      10: "viththuvakkOttammA! * nI vENdAyE Ayidinum * maRRArum paRRillEn enRu * avanaith thAL nayandha * koRRavEl thAnaik * kulasEkaran sonna * naRRamizh paththum vallAr * naNNAr naragamE *",
      11: "adivaravu: tharu kaNdAr * mIn vALAl * vengaN sendhazhal * eththanai thokku * ninnaiyE viththuvakkOttammA *"
    },
    'PMT.6.steps': {
      1: "Ermalarp pUnguzhal Ayar mAdhar * enaip palar uLLa ivvUril * undhan mArvu thazhuvudhaRku Asaiyinmai * aRindhaRindhE undhan poyyaik kEttu * kUrmazhai pOl panikkUdhal eydhik * kUsi nadungi yamunai ARRil * vArmaNal kunRil pulara ninREn * vAsudhEvA! un varavu pArththE *",
      2: "keNdai oNkaN madavAL oruththi * kIzhai agaththuth thayir kadaiyak kaNdu * ollai nAnum kadaivan enRu * kaLLa vizhiyai vizhiththup pukku * vaNdamar pUnguzhal thAzhndhulAva * vALmugam vErppach chevvAy thudippa * thaNthayir nI kadaindhitta vaNNam * dhAmOdharA! meyyaRivan nAnE *",
      3: "karumalark kUndhal oruththi thannaik * kadaikkaNiththu * AngE oruththi than pAl maruvi manam vaiththu maRRoruththikku uraiththu * oru pEdhaikkup poy kuRiththu * purikuzhal mangai oruththi thannaip puNardhi * avaLukkum meyyan allai * marudhiRuththAy! un vaLarththiyUdE * vaLarginRadhAl undhan mAyai thAnE *",
      4: "thAymulaip pAlil amudhirukkath * thavazhndhu thaLarnadai ittuch chenRu * pEymulai vAy vaiththu nanjai uNdu * piththan enRE piRar Esa ninRAy * Aymigu kAdhalOdu yAn iruppa * yAnvida vandha en thUdhiyOdE * nI migu bOgaththai nangugandhAy * adhuvum un kOrambukkERkumanRE *",
      5: "minnoththa nuNNidaiyALaik koNdu * vIngiruLvAy endhan vIdhiyUdE * ponnoththavAdai kukkUdalittup * pOginRa pOdhu nAn kaNdu ninREn * kaNNuRRavaLai nI kaNNAlittuk * kaiviLikkinRadhum kaNdE ninREn * ennukku avaLai vittu ingu vandhAy? * innam angE nada nambi! nIyE *",
      6: "maRporu thOLudai vAsudhEvA! * valvinaiyEn thuyil koNdavARE * iRRai iravidaiyE maththennai * innaNai mElittaganRu nI pOy * aRRai iravum Or piRRai nALum * arivaiyarOdum aNaindhu vandhAy * eRRukku nI en marungil vandhAy? * emperumAn! nI ezhundharuLE *",
      7: "paiyaravinnaNaip paLLiyinAy! * paNdaiyOm allOm nAm * nI ugakkum maiyari oNkaNNinArum allOm * vaigi em sEri varavozhi nI * seyya udaiyum thirumugamum * sengani vAyum kuzhalum kaNdu * poy oru nAL pattadhE amaiyum * puLLuvam pEsAdhE pOgu nambI! *",
      8: "ennai varugavenak kuRiththittu * inamalar mullaiyinbanthar nIzhal * manni avaLaip puNarap pukku * maRRennaik kaNdu uzhaRA negizhndhAy * ponniRa Adaiyaik kaiyil thAngip * poy achcham kAtti nI pOdhiyElum * innam en kaiyagaththu Ingoru nAL * varudhiyEl en sinam thIrvan nAnE *",
      9: "mangala nalvanamAlai mArvil ilanga * mayil thazhaippeeli sUdi * pongiLavAdai araiyil sAththip * pUngoththuk kAdhil puNarappeydhu * kongu naRunguzhalArgaLOdu * kuzhaindhu kuzhal inidhUdhi vandhAy * engaLukkE oru nAL vandhUdha * un kuzhal innisai pOtharAdhE *",
      10: "allimalarth thirumangai kELvan thannai * nayandhu iLavAychchimArgaL * ellip pozhudhinil EmaththUdi * eLgi uraiththa urai adhanai * kolli nagarkkiRai kUdaRkOmAn * kulasEkaran innisaiyil mEvi * solliya inthamizh mAlai paththum * solla vallArkku illai thunbam thAnE *",
      11: "adivaravu: Er keNdai * karu thAy * min maRporu * pai ennai * mangalam alli Alai *"
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