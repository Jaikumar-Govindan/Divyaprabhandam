window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PAT.1.1.steps':
        {
            1: "🙏 vaNNa mAdangaL sUzh * thirukkOttiyUr * kaNNan kEsavan * nambi piRandhinil *** eNNey suNNam * edhir edhir thUvidak * kaNNan muRRam * kalandhu aLaRAyiRRE. *",
            2: "OduvAr vizhuvAr * ugandhAlippAr * nAduvAr nambirAn * enguththAn enbAr *** pAduvArgaLum * palpaRai kotta ninRu * AduvArgaLum * AyiRRu AyppAdiyE. *",
            3: "pENich chIrudaip * piLLai piRandhinil * kANath thAm puguvAr * pukkup pOdhuvAr *** ANoppAr * ivan nErillai kAN * thiru vONaththAn * ulagALum enbArgaLE. *",
            4: "uRiyai muRRaththu * urutti ninRu AduvAr * naRuney pAl thayir * nanRAgath thUvuvAr *** seRimen kUndhal * avizhath thiLaiththu * engum aRivazhindhanar * AyppAdi AyarE. *",
            5: "koNda thAL uRi * kOlak kodu mazhu * thaNdinar * paRiyOlaich chayanaththar *** viNDa mullai * arumbanna pallinar * aNdar miNdip * pugundhu neyyAdinAr. *",
            6: "kaiyum kAlum nimirththuk * kadAra nIr * paiya vAttip * pasunjiRu manjaLAl *** aiya nA vazhiththALukku * angAndhida * vaiyam Ezhum kaNdAL * piLLai vAyuLE. *",
            7: "vAyuL vaiyagam * kaNda mada nallAr * Ayar puththiran allan * arundheyvam *** pAya sIrudaip * paNbudaip pAlagan * mAyan enRu * magizhndhanar mAdharE. *",
            8: "paththu nALum kadandha * iraNdA nAL * eththisaiyum * sayamaram kOdiththu *** maththa mAmalai * thAngiya maindhanai * uththAnam seythu * ugandhanar AyarE. *",
            9: "kidakkil thottil * kizhiya udhaiththidum * eduththuk koLLil * marungai iRuththidum *** odukkip pulgil * udharaththE pAyndhidum * midukkilAmaiyAl * nAn melindhEn nangAy! *",
            10: "🙏 sennelAr vayal sUzh * thirukkOttiyUr * mannu nAraNan * nambi piRandhamai *** minnu nUl * vittuchiththan viriththa * ip pannu pAdal vallArkku * illai pAvamE. *",
        },
        'PAT.1.2.steps':
        {
            1: "🙏 sIdhak kadaluL * amudhanna dEvaki * kOdhaik kuzhalAL * asOdhaikkup pOththandha *** pEdhaik kuzhavi * pidiththuch chuvaiththu uNNum * pAdhak kamalangaL kANIrE * pavaLa vAyIr! vandhu kANIrE. *",
            2: "muththum maNiyum * vayiramum nanponnum * thaththip padhiththuth * thalaippeydhAR pOl *** engum paththu viralum * maNivaNNan pAdhangaL * oththittu irundhavA kANIrE * oNNudhalIr! vandhu kANIrE. *",
            3: "paNaith thOL iLavAychchi * pAl pAyndha kongai * aNaiththAra uNdu * kidandha ippiLLai *** iNaikkAlil veLLith * thaLai ninRu ilangum * kaNaikkAl irundhavA kANIrE * kArigaiyIr! vandhu kANIrE. *",
            4: "uzhandhAL naRuney * OrO thadA uNNa * izhandhAL erivinAl * Irththu ezhil maththin *** pazhanthAmbAl Ochchap * bayaththAl thavazhndhAn * muzhandhAL irundhavA kANIrE * mugizhmulaiyIr! vandhu kANIrE. *",
            5: "piRangiya pEychchi * mulai suvaiththu uNdittu * uRanguvAn pOlE * kidandha ippiLLai *** maRangkoL iraNiyan * mArvai mun kINdAn * kuRangukaLai vandhu kANIrE * kuvimulaiyIr! vandhu kANIrE. *",
            6: "maththak kaLiRRu * vasudEvar thammuDai * siththam piriyAdha * dEvaki than vayiRRil *** aththaththin paththA nAL * thOnRiya achchuthan * muththam irundhavA kANIrE * mugizhnagaiyIr! vandhu kANIrE. *",
            7: "irungai madhakaLiRu * IrkkinRavanai * parungip paRiththuk * koNdOdu paraman than *** nerungu pavaLamum * nErnANum muththum * marungum irundhavA kANIrE * vANudhalIr! vandhu kANIrE. *",
            8: "vandha madhalaik * kuzhAththai vali seydhu * thandhak kaLiRu pOl * thAnE viLaiyAdum *** nandhan madhalaikku * nanRum azhagiya * undhi irundhavA kANIrE * oLiyizhaiyIr! vandhu kANIrE. *",
            9: "adhirum kadal niRa vaNNanai * Aychchi madhura mulaiyUtti * vanjiththu vaiththu * padharappadAmE *** pazhanthAmbAl Arththa * udharam irundhavA kANIrE * oLivaLaiyIr! vandhu kANIrE. *",
            10: "peru mA uralil * piNippuNdu irundhu * angu iru mA marudham * iRuththa ippiLLai *** kuru mA maNippUN * kulAvith thigazhum * thirumArvu irundhavA kANIrE * sEyizhaiyIr! vandhu kANIrE. *",
            11: "nALgaL Or nAlaindhu * thingaL aLavilE * thALai nimirththuch * chakadaththaich chAdip pOy *** vALkoL vaLai eyiRRu * Aruyir vavvinAn * thOLgaL irundhavA kANIrE * surikuzhalIr! vandhu kANIrE. *",
            12: "maiththadangaNNi * asOdhai vaLarkkinRa * seyththalai nIla niRaththuch * chiRuppiLLai *** neyththalai nEmiyum * sangum nilAviya * kaiththalangaL vandhu kANIrE * kananguzhaiyIr! vandhu kANIrE. *",
            13: "vaNdamar pUnguzhal * Aychchi maganAga * koNdu vaLarkkinRa * kOvalak kuttaRku *** aNdamum nAdum * adanga vizhungiya * kaNdam irundhavA kANIrE * kArigaiyIr! vandhu kANIrE. *",
            14: "enthoNdai vAych chingam * vAvenRu eduththuk koNdu * anthoNdai vAy * amudhAdhariththu *** Aychchiyar thanthoNdai vAyAl * tharukkip parugum * ich chenthoNdai vAy vandhu kANIrE * sEyizhaiyIr! vandhu kANIrE. *",
            15: "nOkki yasOdhai * nuNukkiya manjaLAl * nAkku vazhiththu * nIrAttum innambikku *** vAkkum nayanamum * vAyum muRuvalum * mUkkum irundhavA kANIrE * moykuzhalIr! vandhu kANIrE. *",
            16: "viN koL amarargaL * vEdhanai thIra * mun maN koL vasudEvar tham * maganAy vandhu *** thiN koL asuraraith * thEya vaLarginRAn * kaNgaL irundhavA kANIrE * kanavaLaiyIr! vandhu kANIrE. *",
            17: "paruvam nirambAmE * pAr ellAm uyya * thiruvin vadivokkum * dEvaki peRRa *** uruvu kariya * oLi maNivaNNan * puruvam irundhavA kANIrE * pUNmulaiyIr! vandhu kANIrE. *",
            18: "maNNum malaiyum * kadalum ulagEzhum * uNNum thiRaththu * magizhndhu uNNum piLLaikku *** vaNNam ezhil koL * magarak kuzhai ivai * thiNNam irundhavA kANIrE * sEyizhaiyIr! vandhu kANIrE. *",
            19: "muRRilum thUdhaiyum * mun kai mEl pUvaiyum * siRRil izhaiththuth * thiritharuvOrgaLai *** paRRip paRiththuk * koNdOdum paraman than * neRRi irundhavA kANIrE * nErizhaiyIr! vandhu kANIrE. *",
            20: "azhagiya paimponnin * kOl ankaik koNdu * kazhalgaL sathangai * kalandhu engum Arppa *** mazha kanRinangaL * maRiththuth thirivAn * kuzhalgaL irundhavA kANIrE * kuvimulaiyIr! vandhu kANIrE. *",
            21: "🙏 suruppAr kuzhali * asOdhai mun sonna * thiruppAdha kEsaththaith * thenpudhuvaip pattan *** viruppAl uraiththa * irupathOdu onRum uraippAr pOy * vaikundhaththu onRuvar thAmE. *",
        },
        'PAT.1.3.steps':
        {
            1: "🙏 mANikkam katti * vayiram idai katti * ANipponnAl seydha * vaNNach chiRuth thottil *** pENi unakkup * piraman vidu thandhAn * mANikkuRaLanE! thAlElO * vaiyam aLandhAnE! thAlElO. *",
            2: "udaiyAr kanamaNiyOdu * oNmAdhaLampU * idai viravik kOththa * ezhil thezhginOdu *** vidai ERu kApAli * Isan vidu thandhAn * udaiyAy! azhEl azhEl thAlElO * ulagam aLandhAnE! thAlElO. *",
            3: "entham pirAnAr * ezhil thirumArvarkku * sandham azhagiya * thAmaraith thALarkku *** indhiran thAnum * ezhiludaik kiNkiNi * thandhuvanAy ninRAn thAlElO * thAmaraik kaNNanE! thAlElO. *",
            4: "sangin valampuriyum * sEvadik kiNkiNiyum * angkaich charivaLaiyum * nANum araith thodarum *** angkaN visumbil * amarargaL pOththandhAr * sengkaN karumugilE! thAlElO * dEvaki singamE! thAlElO. *",
            5: "ezhilAr thirumArbiRku * ERkum ivai enRu * azhagiya aimpadaiyum * Aramum koNdu *** vazhuvil kodaiyAn * vayichchiravaNan * thozhudhuvanAy ninRAn thAlElO * thUmaNi vaNNanE! thAlElO. *",
            6: "Odhak kadalil * oLi muththin Aramum * sAdhip pavaLamum * sandhach charivaLaiyum *** mA thakkavenRu * varuNan vidu thandhAn * sOdhich chudar mudiyAy! thAlElO * sundharath thOLanE! thAlElO. *",
            7: "kAnAr naRunthuzhAy * kai seydha kaNNiyum * vAnAr sezhunjOlaik * kaRpagaththin vAsigaiyum *** thEnAr malar mEl * thirumangai pOththandhAL * kOnE! azhEl azhEl thAlElO * kudandhaik kidandhAnE! thAlElO. *",
            8: "kachchodu poRsurigai * kAmbu kana vaLai * uchchi maNich chutti * oNthAL niraip poRpU *** achchudhanukku enRu * avaniyAL pOththandhAL * nachchu mulai uNdAy! thAlElO * nArAyaNA! azhEl thAlElO. *",
            9: "mey thimiru nAnap * podiyOdu manjaLum * seyya thadangaNNukku * anjanamum sindhuramum *** veyya kalaip pAgi * koNduvaLAy ninRAL * ayyA! azhEl azhEl thAlElO * arangaththaNaiyAnE! thAlElO. *",
            10: "🙏 vanjanaiyAl vandha * pEychchi mulai uNda * anjana vaNNanai * Aychchi thAlAttiya *** senjol maRaiyavar * sEr pudhuvaip pattan sol * enjAmai vallavarkku * illai idar thAnE. *",
        },
        'PAT.1.4.steps':
        {
            1: "🙏 than mugaththuch chutti * thUngath thUngath thavazhndhu pOy * pon mugak kiNkiNi Arppap * puzhudhi aLaiginRAn *** en magan gOvindan * kUththinai iLa mAmadhI! * nin mugam kaNNuLavAgil * nI ingE nOkkip pO. *",
            2: "en siRuk kuttan * enakkOr innamudhu empirAn * than siRukkaigaLAl * kAttik kAtti azhaikkinRAn *** anjana vaNNanOdu * Adal Ada uRudhiyEl * manjil maRaiyAdhE * mAmadhI! magizhndhu Odi vA. *",
            3: "suRRum oLi vattam * sUzhndhu sOdhi parandhu engum * eththanai seyyilum * en magan mugam nEr ovvAy *** viththagan vEngada vANan * unnai viLikkinRa * kaiththalam nOvAmE * ambulI! kadidhu Odi vA. *",
            4: "chakkarak kaiyan * thadangaNNAl malara vizhiththu * okkalai mEl irundhu * unnaiyE suttik kAttum kAN *** thakkadhu aRidhiyEl * chandhirA! salam seyyAdhE * makkaL peRAdha * maladan allaiyEl vA kaNdAy. *",
            5: "azhagiya vAyil * amudha URal theLivuRA * mazhalai muRRAdha * iLanjollAl unnaik kUvuginRAn *** kuzhagan sirIdharan * kUvak kUva nI pOdhiyEl * puzhai ilavAgAdhE * nin sevi pugar mAmadhI! *",
            6: "thaNdodu chakkaram * sArngam Endhum thadakkaiyan * kaN thuyil koLLak karudhik * kottAvi koLginRAn *** uNda mulaippAl aRA kaNdAy * uRangAvidil * viN thanil manniya * mAmadhI! viraindhu Odi vA. *",
            7: "pAlagan enRu * paribavam seyyEl * paNdoru nAL Alin ilai vaLarndha * siRukkan avan ivan *** mEl ezhap pAyndhu * pidiththuk koLLum veguLumEl * mAlai madhiyAdhE * mAmadhI! magizhndhu Odi vA. *",
            8: "siRiyan enRu en iLansingaththai * igazhEl kaNdAy * siRumaiyin vArththaiyai * mAvali idaich chenRu kEL *** siRumaip pizhai koLLil * nIyum un thEvaikkuriyai kAN * niRai madhI! nedumAl * viraindhu unnaik kUvuginRAn. *",
            9: "thAzhiyil veNNey * thadankai Ara vizhungiya * pEzhai vayiRRu empirAn kaNdAy * unnaik kUvuginRAn *** Azhi koNdu unnai eRiyum * aiyuRavillai kAN * vAzha uRudhiyEl * mAmadhI! magizhndhu Odi vA. *",
            10: "🙏 maith thadangaNNi * asOdai than maganukku * ivai oththana solli * uraiththa mARRam *** oLi puththUr viththagan vittuchiththan * viriththa thamizh ivai * eththanaiyum solla vallavarkku * idar illaiyE. *",
        },
        'PAT.1.5.steps':
        {
            1: "🙏 uyya ulagu padaiththu uNda maNivayiRA! * Uzhi thoRUzhi pala Alin ilai adhan mEl * paiya uyOgu thuyil koNda paramparanE! * pangaya nIL nayanaththu anjana mEniyanE! *** seyyavaL nin agalam sEmam enak karudhich * chelvu poli magarak kAdhu thigazhndhu ilaga * aiya! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            2: "kOL ariyin uruvam koNdu avuNan udalam * kurudhi kuzhambi ezhak kUrugirAl kudaivAy! * mILa avan maganai meymmai koLak karudhi * mElai amarar padhi mikku veguNdu vara *** kALa nanmEgam avai kallodu kAr pozhiyak * karudhi varaik kudaiyAk kAligaL kAppavanE! * ALa! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            3: "nammudai nAyaganE! nAnmaRaiyin poruLE! * nAviyuL naRkamala nAnmuganukku orukAl * thammanai AnavanE! tharaNithala muzhudhum * thAragaiyin ulagum thadavi adhan puRamum *** vimma vaLarndhavanE! vEzhamum Ezh vidaiyum * viraviya vElaithanuL venRu varumavanE! * amma! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            4: "vAnavar thAm magizha vansagadam uruLa * vanja mulaip pEyin nanjamadhu uNdavanE! * kAnaga valviLavin kAy udhirak karudhik * kanRadhu koNdu eRiyum karuniRa en kanRE! *** thEnuganum muranum thiNthiRal vennaragan * enbavar thAm madiyach cheruvadhirach chellum * Anai! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            5: "maththaLavum thayirum vArkuzhal nanmadavAr * vaiththana ney kaLavAl vAri vizhungi * orungu oththa iNai marudham unniya vandhavarai * Uru karaththinoDum undhiya venthiRalOy! *** muththin iLamuRuval muRRa varuvathan mun * munna mugaththaNiyAr moykuzhalgaL alaiya * aththa! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            6: "kAyamalar niRavA! karumugil pOl uruvA! * kAnaga mAmaduvil kALiyan uchchiyilE * thUya nadam payilum sundara en siRuvA! * thunga madhakkariyin kombu paRiththavanE! *** Ayam aRindhu poruvAn edhir vandha mallai * andharam inRi azhiththu Adiya thAL iNaiyAy! * Aya! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            7: "thuppudai AyargaL tham sol vazhuvAdhu orukAl * thUya karunguzhal nalthOgai mayil anaiya * nappinai than thiRamA nalvidai Ezh aviya * nalla thiRal udaiya nAthanum AnavanE! *** thappina piLLaigaLaith thana migu sOdhi pugath * thani oru thEr kadavith thAyodu kUttiya * en appa! enakku orukAl Aduga sengIrai * AyargaL pOrERE! Aduga AdugavE. *",
            8: "unnaiyum okkalaiyil koNdu thamil maruvi * unnodu thangaL karuththAyina seydhu varum * kanniyarum magizhak kaNdavar kaN kuLirak * kaRRavar theRRi varap peRRa enakku aruLi *** mannu kuRungudiyAy! veLLaRaiyAy! madhiL sUzh * sOlaimalaikku arasE! kaNNapuraththu amudhE! * en avalam kaLaivAy! Aduga sengIrai * Ezhulagum udaiyAy! Aduga AdugavE. *",
            9: "pAlodu ney thayir oNsAndhodu seNbagamum * pangaya nalla karuppUramum nARi vara * kOla naRumpavaLach chenthuvar vAyin idaik * kOmaLa veLLi muLaip pOl sila pal ilaga *** nIla niRaththazhagAr aimpadaiyin naduvE * nin kani vAy amudham iRRu muRindhu vizha * Elu maRaip poruLE! Aduga sengIrai * Ezhulagum udaiyAy! Aduga AdugavE. *",
            10: "sengamalak kazhalil siRRidhazh pOl viralil * sEr thigazh AzhigaLum kiNkiNiyum * araiyil thangiya ponvadamum thALa nanmAdhuLaiyin * pUvodu ponmaNiyum mOdhiramum kiRiyum *** mangala aimpadaiyum thOL vaLaiyum kuzhaiyum * magaramum vALigaLum suttiyum oththilaga * engaL kudikku arasE! Aduga sengIrai * Ezhulagum udaiyAy! Aduga AdugavE. *",
            11: "🙏 annamum mInuruvum ALariyum kuRaLum * Amaiyum AnavanE! AyargaL nAyaganE! * en avalam kaLaivAy! Aduga sengIrai * Ezhulagum udaiyAy! Aduga Aduga enRu *** anna nadai madavAL asOdai ugandha parisu * Ana pugazhp pudhuvaip pattan uraiththa thamizh * innisai mAlaigaL ippaththum vallAr * ulagil eNthisaiyum pugazh mikku inbam adheydhuvarE. *",
        },
        'PAT.1.6.steps':
        {
            1: "🙏 mANikkak kiNkiNi Arppa * marungin mEl * ANip ponnAl seydha * Ay ponnudai maNi *** pENip pavaLa vAy * muththilanga * paNdu kANi koNda kaigaLAl chappANi * karunguzhal kuttanE! chappANi. *",
            2: "ponnarai nANodu * mANikkak kiNkiNi * thannarai Adath * thanich chutti thAzhndhAda *** ennarai mEl ninRu izhindhu * ungaL Ayar tham * mannarai mEl kottAy chappANi * mAyavanE! kottAy chappANi. *",
            3: "panmaNi muththin * pavaLam padhiththanna * en maNivaNNan! * ilangu poRROttin mEl *** nin maNi vAy muththu ilanga * nin ammai than * ammaNi mEl kottAy chappANi * AzhiyangaiyanE! chappANi. *",
            4: "thUnilA muRRaththE * pOndhu viLaiyAda * vAnilA ambulI! * chandhirA! vA enRu *** nI nilA nin pugazhA * ninRa Ayar tham * kO nilAvak kottAy chappANi * kudandhaik kidandhAnE! chappANi. *",
            5: "puttiyil sERum * puzhudhiyum koNdu vandhu * atti amukki * agam pukku aRiyAmE *** chattith thayirum * thadAvinil veNNeyum uN * pattik kanRE! kottAy chappANi * paRpanAbA! kottAy chappANi. *",
            6: "thAriththu nURRuvar * thandhai sol koLLAdhu * pOr uyththu vandhu * pugundhavar maNNALa *** pAriththa mannar padap * panjavarkku * anRu thEr uyththa kaigaLAl chappANi * dEvaki singamE! chappANi. *",
            7: "parandhittu ninRa * padu kadal thannai * irandhitta kai mEl * eRi thirai mOdha *** karandhittu ninRa * kadalaik kalanga * charanthotta kaigaLAl chappANi * sArnga vil kaiyanE! chappANi. *",
            8: "kurakkinaththAlE * kurai kadal thannai * nerukki aNai katti * nIL nIr ilangai *** arakkar aviya * adu kaNaiyAlE * nerukkiya kaigaLAl chappANi * nEmi angaiyanE! chappANi. *",
            9: "aLandhitta thUNai * avan thatta * AngE vaLarndhittu * vAL ugirch singa uruvAy *** uLanthottu iraNiyan * oN mArvagalam * piLandhitta kaigaLAl chappANi * pEy mulai uNdAnE! chappANi. *",
            10: "adaindhittu amarargaL * Azhkadal thannai * midaindhittu mandharam * maththAga nAtti *** vadam suRRi * vAsugi vankayiRAga * kadaindhitta kaigaLAl chappANi * kArmugil vaNNanE! chappANi. *",
            11: "🙏 AtkoLLath thOnRiya * Ayar tham kOvinai * nAtkamazh pUmpozhil * villipuththUrp pattan *** vEtkaiyAl sonna * chappANi Iraindhum * vEtkaiyinAl solluvAr * vinai pOmE. *",
        },
        'PAT.1.7.steps':
        {
            1: "🙏 thodar sangilikai salAr pilAr ennath * thUngu ponmaNi olippa * padu mummadhap punal sOra * vAraNam paiya ninRu Urvadhu pOl *** udankUdik kiNkiNi AravArippa * udaimaNi paRai kaRanga * thadanthALiNai koNdu sArngapANi * thaLarnadai nadavAnO. *",
            2: "sekkar idai nunikkombil thOnRum * siRupiRai muLaip pOla * nakka senthuvar vAyth thiNNai mIdhE * naLir veNpal muLai ilaga *** akkuvadam uduththu Amaith thAli pUNda * anantha sayanan * thakka mAmaNivaNNan vAsudEvan * thaLarnadai nadavAnO. *",
            3: "minnuk kodiyum Or veNthingaLum * sUzh parivEdamumAy * pinnal thulangum arasilaiyum * pIdagach chiRRAdaiyodum *** minnil polindhadhOr kArmugil pOlak * kazhuththinil kARaiyodum * thannil polindha irudIkEsan * thaLarnadai nadavAnO. *",
            4: "kannal kudam thiRandhAl oththURik * kaNakaNa siriththu vandhu * mun vandhu ninRu muththam tharum * en mugilvaNNan thirumArvan *** thannaip peRRERkuth than vAy amudham thandhu * ennaith thaLirppikkinRAn * than eRRu mARRalar thalaigaL mIdhE * thaLarnadai nadavAnO. *",
            5: "munnal Or veLLip perumalaik kuttan * modumodu viraindhOda * pinnaith thodarndhadhOr karumalaik kuttan * peyarndhadi iduvadhu pOl *** panni ulagam paravi OvAp * pugazhp baladEvan ennum * than nambi Odap pin kUdach chelvAn * thaLarnadai nadavAnO. *",
            6: "oru kAlil sangu oru kAlil chakkaram * uLLadi poRiththu amaindha * iru kAlum koNdu angangu ezhudhinAR pOl * ilachchinai pada nadandhu *** perugA ninRa inba veLLaththin mEl * pinnaiyum peydhu peydhu * karukArk kadalvaNNan kAmar thAdhai * thaLarnadai nadavAnO. *",
            7: "padar pangaya malar vAy negizhap * pani padu siRu thuLi pOl * idangkoNda sevvAy URiyURi * iRRiRRu vIzha ninRu *** kadum chEkkazhuththin maNik kural pOl * udai maNi kaNa kaNena * thadanthALinai koNdu sArngapANi * thaLarnadai nadavAnO. *",
            8: "pakkam karum chiRuppARai mIdhE * aruvigaL pagarndhanaiya * akku vadam izhindhERith thAzha * aNi algul pudai peyara *** makkaL ulaginil peydhaRiyA * maNik kuzhavi uruvin * thakka mAmaNivaNNan vAsudEvan * thaLarnadai nadavAnO. *",
            9: "veNpuzhuthi mEl peydhu koNdu aLaindhadhOr * vEzhaththin karungkanRu pOl * theNpuzhuthi Adith thirivikkiraman * siRu pugar pada viyarththu *** oN pOdhalar kamalach chiRukAl uraiththu * onRum nOvAmE * thaNpOdhu koNda thavisin mIdhE * thaLarnadai nadavAnO. *",
            10: "thirai nIrch chandhira mandalam pOl * sengkaNmAl kEsavan than * thirunIr mugaththuth thulangu chutti * thigazhndhu engum pudai peyara *** perunIrth thirai ezhu gangaiyilum * periyadhOr thIrththa palam tharu nIr * siRuchchaNNam thuLLam sOrath * thaLarnadai nadavAnO. *",
            11: "🙏 Ayar kulaththinil vandhu thOnRiya * anjana vaNNan thannaith * thAyar magizha onnAr thaLarath * thaLarnadai nadandhadhanai *** vEyar pugazh vittuchiththan * sIrAl viriththana uraikka vallAr * mAyan maNivaNNan thAL paNiyum * makkaLaip peRuvargaLE. *",
        },
        'PAT.1.8.steps':
        {
            1: "🙏 ponniyal kiNkiNi * chutti puRam katti * thanniyal Osai * salan salan enRida *** minniyal mEgam * viraindhu edhir vandhAR pOl * ennidaikkOttarA achchOvachchO * emperumAn! vArA achchOvachchO. *",
            2: "sengamalap pUvil * thEn uNNum vaNdE pOl * pangigaL vandhu * un pavaLa vAy moyppa *** sangu vil vAL thaNdu * chakkaram Endhiya * angaigaLAlE vandhu achchOvachchO * Arath thazhuvA vandhu achchOvachchO. *",
            3: "panjavar thUdhanAyp * bAratham kai seydhu * nanjumizh nAgam kidandha * naRpoygai pukku *** anjap paNaththin mEl * pAyndhittu aruL seydha * anjana vaNNanE! achchOvachchO * Ayar perumAnE! achchOvachchO. *",
            4: "nARiya sAndham * namakku iRai nalgenna * thERi avaLum * thiru udambil pUsa *** URiya kUninai * uLLE odunga * anRu ERa uruvinAy! achchOvachchO * emperumAn! vArA achchOvachchO. *",
            5: "kazhal mannar sUzhak * kadhir pOl viLangi * ezhal uRRu mINdE * irundhu unnai nOkkum *** suzhalaip peridhudaith * thuchchOdhananai * azhala vizhiththAnE! achchOvachchO * Azhi angaiyanE! achchOvachchO. *",
            6: "pOr okkap paNNi * ippUmip poRai thIrppAn * thEr okka UrndhAy! * sezhunthAr visayaRkAy *** kAr okkum mEnik * karum perum kaNNanE! * Arath thazhuvA vandhu achchOvachchO * AyargaL pOrERE! achchOvachchO. *",
            7: "mikka perum pugazh * mAvali vELviyil * thakkadhu idhanRu enRu * thAnam vilakkiya *** sukkiran kaNNaith * thurumbAl kiLaRiya * chakkarak kaiyanE! achchOvachchO * sangam idaththAnE! achchOvachchO. *",
            8: "ennidhu mAyam? * en appan aRindhilan * munnaiya vaNNamE koNdu * aLavAy enna *** mannu namusiyai * vAnil suzhaRRiya * minnu mudiyanE! achchOvachchO * vEngada vANanE! achchOvachchO. *",
            9: "kaNda kadalum * malaiyum ulagEzhum * muNdaththukkARRA * mugil vaNNA OvenRu *** iNdaich chadai mudi * Isan irak koLLa * maNdai niRaiththAnE! achchOvachchO * mArvil maRuvanE! achchOvachchO. *",
            10: "thunniya pEr iruL * sUzhndhu ulagai mUda * manniya nAnmaRai * muRRum maRaindhida *** pin ivvulaginil * pEr iruL nInga * anRu annam adhAnAnE! achchOvachchO * arumaRai thandhAnE! achchOvachchO. *",
            11: "🙏 nachchuvAr mun niRkum * nArAyaNan thannai * achchO varuga enRu * Aychchi uraiththana *** machchaNi mAdap * pudhuvaikkOn pattan sol * nichchalum pAduvAr * nIL visumbALvarE. *",
        },
        'PAT.1.9.steps':
        {
            1: "🙏 vattu naduvE vaLarginRa * mANikka mottu nunaiyil * muLaikkinRa muththE pOl *** sottuch chottennath * thuLikkath thuLikka * en kuttan vandhu ennaip puRam pulguvAn * gOvindan ennaip puRam pulguvAn. *",
            2: "kiNkiNi kattik * kiRi katti * kaiyinil kangaNam ittuk * kazhuththil thodar katti *** than kaNaththAlE * sadhirA nadandhu vandhu * en kaNNan ennaip puRam pulguvAn * empirAn ennaip puRam pulguvAn. *",
            3: "kaththak kadhiththuk * kidandha perunjelvam * oththup porundhik koNdu * uNNAdhu maNNALvAn *** koththuth thalaivan * kudi kedath thOnRiya * aththan vandhu ennaip puRam pulguvAn * AyargaL ERu en puRam pulguvAn. *",
            4: "nAndhagam Endhiya * nambi saraN enRu * thAzhndha dananjayaRkAgi * tharaNiyil *** vEndharkaL utka * visayan maNith thiNthEr * Urndhavan ennaip puRam pulguvAn * umbar kOn ennaip puRam pulguvAn. *",
            5: "veNkalap paththiram * katti viLaiyAdi * kaN pala seydha * karunthazhaik kAvin kIzh *** paN pala pAdip * pallANdu isaippa * paNdu maN pala koNdAn puRam pulguvAn * vAmanan ennaip puRam pulguvAn. *",
            6: "chaththiram Endhith * thani oru mANiyAy * uththara vEdhiyil * ninRa oruvanai *** kaththiriyar kANak * kANi muRRum koNda * paththirAkAran puRam pulguvAn * pAr aLandhAn en puRam pulguvAn. *",
            7: "poththa uralaik kavizhththu * adhan mEl ERi * thiththiththa pAlum * thadAvinil veNNeyum *** meththath thiruvayiRu * Ara vizhungiya * aththan vandhu ennaip puRam pulguvAn * AzhiyAn ennaip puRam pulguvAn. *",
            8: "mUththavai kANa * mudhu maNaRkunRu ERi * kUththu uvandhAdik * kuzhalAl isai pAdi *** vAyththa maRaiyOr vaNanga * imaiyavar Eththa vandhu ennaip puRam pulguvAn * empirAn ennaip puRam pulguvAn. *",
            9: "kaRpagak kAvu * karudhiya kAdhalikku * ippozhudhu Ivan enRu * indhiran kAvinil *** niRpana seydhu * nilAth thigazh muRRaththuL * uyththavan ennaip puRam pulguvAn * umbar kOn ennaip puRam pulguvAn. *",
            10: "🙏 Aychchi anRAzhippirAn * puRam pulgiya * vEyth thadanthOLi sol * vittuchiththan magizhndhu *** Iththa thamizh ivai * Iraindhum vallavar * vAyththa nanmakkaLaip peRRu * magizhvarE. *",
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
