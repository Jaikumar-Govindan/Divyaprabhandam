window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PTM.6.1.steps': {
            1: "*  vaNduNu naRumalar iNdai koNdu *  paNdai nam vinai keda enRu *  adi mEl thoNdarum amararum paNiya ninRu *  angu aNdamodu agalidam aLandhavanE! *  ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl *  vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            2: "aNNal seydhu alai kadal kadaindhu *  adhanuL kaNNudhal nanjuNNak kaNdavanE! * viNNavar amudhuNa amudhil varum *  peNNamudhu uNda emperumAnE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            3: "kuzhal niRa vaNNa! nin kURu koNda *  thazhal niRa vaNNan naNNAr nagaramvizha *  nani malai silai vaLaivu seydhu *  angu azhal niRa ambadhuvAnavanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            4: "nilavodu veyil nila iru sudarum *  ulagamum uyirgaLum uNdu oru kAl * kalai tharu kuzhaviyin uru vinaiyAy *  alaikadal Alilai vaLarndhavanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            5: "pArezhu kadalezhu malaiyezhumAych *  chIrkezhum ivvulagEzhum ellAm * Arkezhu vayiRRinil adakki ninRu *  angu Orezhuththu OruruvAnavanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            6: "kArkezhu kadalgaLum malaigaLumAy *  Erkezhum ulagamumAgi *  mudhalArgaLum aRivaru nilaiyinaiyAych *  chIrkezhu nAnmaRai AnavanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            7: "urukkuRu naRuney koNdu Arazhalil *  irukkuRum andhaNar sandhiyin vAy * perukkamodu amarargaL amara nalgum *  irukkinil innisai AnavanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            8: "kAdhal seydhu iLaiyavar kalavi tharum *  vEdhanai vinaiyadhu veruvudhalAm * Adhalin unadhadi aNuguvan nAn *  pOdhalAr nedu mudip puNNiyanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            9: "sAdhalum piRaththalum enRu ivaRRai *  kAdhal seyyAdhu una kazhal adaindhEn * Odhal sey nAnmaRaiyAgi *  umbar Adhal sey mUvuruvAnavanE! * ANdAy! unaik kANbadhOr *  aruL enakku aruLudhiyEl * vENdEn manai vAzhkkaiyai *  viNNagar mEyavanE! ",
            10: "*  pUmaru pozhil aNi *  viNNagar mEl *  kAmaru sIrk *  kali kanRi sonna * pAmaru thamizh ivai *  pAda vallAr * vAmanan adi iNai *  maruvuvarE ",
            11: "adivaravu:- vaNdu aNNal *  kuzhal nilavOdu *  pAr kAr *  urukkuRu kAdhal *  sAdhal pUmaru poRuththEn ",
        },

        'PTM.6.2.steps': {

            1: "*  poRuththEn punsol nenjil *  poruL inbam ena iraNdumiRuththEn *  aimpulangatkadanAyina *  vAyilottiaRuththEn *  Arvach cheRRam avai thammai manaththagaRRiveRuththEn *  ninnadaindhEn *  thiruviNNagar mEyavanE! ",
            2: "maRandhEn unnai munnam *  maRandha madhiyil manaththAl * iRandhEn eththanaiyum *  adhanAl idumbaik kuzhiyil * piRandhE eyththu ozhindhEn *  perumAn! thirumArbA! * siRandhEn ninnadikkE *  thiruviNNagar mEyavanE! ",
            3: "mAnEy nOkkiyar tham *  vayiRRuk kuzhiyil uzhaikkum * UnEr Akkai thannai *  udhavAmai uNarndhu uNarndhu * vAnE! mAnilamE! *  vandhu vandhu en manaththu irundhathEnE! *  ninnadaindhEn *  thiruviNNagar mEyavanE! ",
            4: "piRindhEn peRRa makkaL *  peNdir enRivar pin udhavAdhuaRindhEn *  nI paNiththa aruL ennum *  oL vAL uruvieRindhEn *  aimpulangaL idar thIra *  eRindhu vandhuseRindhEn *  ninnadikkE *  thiruviNNagar mEyavanE! ",
            5: "pAN thEn vaNdaRaiyum kuzhalArgaL *  pallANdu isaippa * ANdAr vaiyam ellAm *  arasAgi *  mun ANdavarEmANdAr enRu vandhAr andhO! *  manai vAzhkkai thannaivENdEn *  ninnadaindhEn *  thiruviNNagar mEyavanE! ",
            6: "kallA aimpulangaL avai *  kaNdavARu seyyagillEn * mallA! mallamaruL mallar mALa *  malladarththamallA! *  mallalam sIr *  madhiL nIr ilangai azhiththavillA! *  ninnadaindhEn *  thiruviNNagar mEyavanE! ",
            7: "vERA yAn irandhEn *  veguLAdhu manakkoL endhAy! * ARA vennaragaththu *  adiyEnai idak karudhi * kURA aivar vandhu kumaikkak *  kudi vittavarai * thERAdhu unnadaindhEn *  thiruviNNagar mEyavanE! ",
            8: "thIvAy valvinaiyAr *  udan ninRu siRandhavar pOl * mEvA vennaragaththu *  idavuRRu viraindhu vandhAr * mUvA vAnavar tham mudhalvA! *  madhi kOL viduththadhEvA! *  ninnadaindhEn *  thiruviNNagar mEyavanE! ",
            9: "pOdhAr thAmaraiyAL *  pulavik kulavAnavar thamkOdhA! *  kOdhil sengOl *  kudai mannar idai nadandhathUdhA! *  thUmozhiyAy! sudar pOl *  en manaththirundhavEdhA! *  ninnadaindhEn *  thiruviNNagar mEyavanE! ",
            10: "*  thEnAr pUm puRavil *  thiruviNNagar mEyavanai * vAnArum madhiL sUzh *  vayal mangaiyar kOn maruvAr * UnAr vEl kaliyan *  oli sey thamizh mAlai vallAr * kOnAy vAnavar tham *  kodi mAnagar kUduvarE ",
            11: "adivaravu:- poRuththEn maRandhEn *  mAnEy piRindhEn *  pAN kallA *  vERA thIvAy *  pOdhAr thEnAr thuRappEn ",
        },


        'PTM.6.3.steps': {

            1: "*  thuRappEn allEn *  inbam thuRavAdhu *  nin uruvammaRappEn allEn *  enRum maRavAdhu *  yAn ulagilpiRappEnAga eNNEn *  piRavAmai peRRadhu *  ninthiRaththEnA thanmaiyAl *  thiruviNNagarAnE! ",
            2: "thuRandhEn Arvach cheRRach *  chuRRam thuRandhamaiyAl * siRandhEn ninnadikkE *  adimai thirumAlE! * aRandhAnAyth thirivAy! *  unnai en manaththagaththE * thiRambAmal koNdEn *  thiruviNNagarAnE! ",
            3: "mAnEy nOkku nallAr *  madhi pOl mugaththu ulavum * UnEy kaN vALikku *  udaindhOttaththu unnadaindhEn * kOnE! kuRungudiyuL kuzhagA! *  thirunaRaiyUrththEnE! *  varupunal sUzh *  thiruviNNagarAnE! ",
            4: "sAndhEndhu men mulaiyAr *  thadanthOL puNar inba veLLaththuAzhndhEn *  arunaragaththu azhundhum *  payan padaiththEn * pOndhEn puNNiyanE! *  unnai eydhi en thIvinaigaLthIrndhEn *  ninnadaindhEn *  thiruviNNagarAnE! ",
            5: "maRROr theyvam eNNEn *  unnai en manaththu vaiththuppeRREn *  peRRadhuvum *  piRavAmai emperumAn! * vaRRA nIL kadal sUzh *  ilangai irAvaNanaichcheRRAy! *  koRRavanE! *  thiruviNNagarAnE! ",
            6: "maiyoN karungadalum *  nilanum maNivaraiyum * seyya sudar iraNdum *  ivaiyAya ninnai *  nenjiluyyum vagai uNarndhEn *  uNmaiyAl ini *  yAdhum maRROrtheyvam piRidhaRiyEn *  thiruviNNagarAnE! ",
            7: "vERE kURuvadhuNdu *  adiyEn viriththuraikkumARE *  nI paNiyAdhu adai *  nin thirumanaththu * kUREn nenju thannAl *  guNam koNdu *  maRROr dheyvamthEREn unnai allAl *  thiruviNNagarAnE! ",
            8: "muLindhIndha vengadaththu *  mUrip perungaLiRRAl * viLindhIndha mAmaram pOl *  vIzhndhArai ninaiyAdhE * aLindhOrndha sindhai *  nin pAl adiyERkku *  vAnulagamtheLindhE enRu eydhuvadhu? *  thiruviNNagarAnE! ",
            9: "sollAy thirumArvA! *  unakkAgith thoNdu pattanallEnai *  vinaigaL naliyAmai *  nambu nambI * mallA! kudamAdI! *  madhusUdhanE! *  ulagilsellA nallisaiyAy! *  thiruviNNagarAnE! ",
            10: "*  thArAr malark kamalath *  thadam sUzhndha thaN puRavil * sIrAr nedumaRugil *  thiruviNNagarAnai * kArAr puyal thadakkaik *  kaliyan oli mAlai * ArAr ivai vallAr *  avarkku allal nillAvE ",
            11: "adivaravu:- thuRappEn thuRandhEn *  mAnEy sAndhu *  maRROr mai *  vERE muLindhIndha *  sollAy thArAr kaNNum ",
        },
        'PTM.6.4.steps': {

            1: "*  kaNNum suzhanRu pILaiyOdu *  ILai vandhu EnginAl * paNNin mozhiyAr *  paiya nadamin ennAdha mun * viNNum malaiyum *  vEdhamum vELviyum AyinAn * naNNu naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            2: "konguN kuzhalAr *  kUdi irundhu siriththu *  nIringen? irumi *  empAl vandhadhenRu igazhAdha mun * thingaL eri kAl *  senjudarAyavan thEsudai * nangaL naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            3: "kongAr kuzhalAr *  kUdi irundhu siriththu *  emmaiengOlam aiyA! *  en? inik kANbadhu ennAdha mun * sengOl valavan *  thAn paNindhu Eththith thigazhumUr * nangOn naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            4: "kombum aravamum *  valliyum venRa nuNNEridai * vambuN kuzhalAr *  vAsal adaiththu igazhAdha mun * sempon kamuginam thAn *  kaniyum sezhum sOlai sUzh * namban naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            5: "vilangum kayalum *  vElum oN kAviyum venRa kaN * salam koNda sollAr thAngaL *  siriththu igazhAdha mun * malangum varAlum *  vALaiyum pAy vayal sUzh tharu * nalangoL naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            6: "minnEr idaiyAr *  vEtkaiyai mARRi irundhu * en nIr irumi *  empAl vandhadhu? enRu igazhAdha mun * thonnIr ilangai malanga *  vilangeri UttinAn * nannIr naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            7: "villEr nudhalAr *  vEtkaiyai mARRich chiriththu *  ivanpollAn thiraindhAn ennum *  puRanuRai kEtpadhan mun * sollAr maRai nAngu Odhi *  ulagil nilAyavar * nallAr naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            8: "vALoN kaN nallAr thAngaL *  madhanan enRAr thammai * kENmingaL ILaiyOdu *  Engu kizhavan ennAdha mun * vELvum vizhavum *  vIdhiyil enRum aRAdha Ur * nALum naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            9: "kani sErndhu ilangu nal vAyavar *  kAdhanmai vittida * kuni sErndhudalam *  kOlil thaLarndhu iLaiyAdha mun * pani sEr visumbil *  pAl madhi kOL viduththAn idam * nani sEr naRaiyUr *  nAm thozhudhum ezhu nenjamE! ",
            10: "*  piRai sEr nudhalAr *  pENudhal nammai ilAdha mun * naRai sEr pozhil sUzh *  naRaiyUr thozhu nenjamE! enRa * kaRaiyAr nedu vEl mangaiyar kOn *  kalikanRi sol * maRavAdhu uraippavar *  vAnavarkku innarasu AvarE ",
            11: "adivaravu:- kaNNum konguN *  kongAr kombu *  vilangu min *  vil vAL *  kani piRai kalanga ",
        },

        'PTM.6.5.steps': {
            1: "*  kalanga munnIr kadaindhu *  amudham koNdu *  imaiyOr thuLangal thIra *  nalgu sOdhich chudarAya *  valangai Azhi idangaich changam *  udaiyAnUr *  nalangoL vAymai *  andhaNar vAzhum naRaiyUrE ",
            2: "munaiyAr sIyamAgi *  avuNan muraN mArvam *  punai vAL ugirAl *  pOzhpada Irndha punidhanUr *  sinaiyAr thEmAnj *  senthaLir kOdhik kuyil kUvum *  nanaiyAr sOlai sUzhndhu *  azhagAya naRaiyUrE ",
            3: "Anaip puravi *  thErodu kAlAL aNi koNda * sEnaith thogaiyaich chAdi *  ilangai seRRAnUr * mInaith thazhuvi vIzhndhu ezhum *  maLLarkku alamandhu * nAnap pudhalil *  Amai oLikkum naRaiyUrE ",
            4: "uRiyAr veNNey uNdu *  uralOdum kattuNdu * veRiyAr kUndhal *  pinnai poruttu An venRAnUr * poRiyAr manjnjai *  pUmpozhil thORum nadamAda * naRu nAN malar mEl *  vaNdu isai pAdum naRaiyUrE ",
            5: "vidai Ezh venRu *  menthOL Aychchikku anbanAy * nadaiyAl ninRa *  marudham sAyththa nAdhanUr * pedaiyOdu annam *  peyvaLaiyAr tham pin senRu * nadaiyOdiyali *  nANi oLikkum naRaiyUrE ",
            6: "paguvAy vanpEy *  kongai suvaiththu Aruyir uNdu * puguvAy ninRa *  pOdhagam vIzhap porudhAnUr * neguvAy neydhal *  pUmadhu mAndhik kamalaththin * naguvAy malar mEl *  annam uRangum naRaiyUrE ",
            7: "mundhu nUlum muppuri nUlum *  munnIndha * andhaNALan piLLaiyai *  anjnjAnRu aLiththAnUr * pondhil vAzhum piLLaikkAgip *  puLLOdi * nandhuvArum *  paimpunal vAvi naRaiyUrE ",
            8: "veLLaip puravith thEr *  visayaRkAy viRal viyUgamviLLa *  sindhuk kOn vizha *  Urndha vimalanUr * koLLaik kozhu mIn uN *  kurugu Odip pedaiyOdum * naLLak kamalath *  thERal ugukkum naRaiyUrE ",
            9: "*  pArai Urum pAram thIrap *  pArththan than * thErai Urum *  dhEva dhEvan sErumUr * thArai Urum *  thaN thaLir vEli pudai sUzha * nArai Urum *  nal vayal sUzhndha naRaiyUrE ",
            10: "*  thAmath thuLaba *  nIL mudi mAyan thAn ninRa * nAmath thiraL mAmALigai sUzhndha *  naRaiyUr mEl * kAmak kadhir vEl vallAn *  kaliyan oli mAlai * sEmath thuNaiyAm *  seppum avarkkuth thirumAlE ",
            11: "Adivaravu:- kalanga munai *  Anai uRiyAr *  vidai paguvAy *  mundhu veLLai *  pArai thAmam ambaram ",
        },

        'PTM.6.6.steps': {
            1: "*  ambaramum perunilanum thisaigaL ettum * alaikadalum kulavaraiyum uNda kaNdan * kombamarum vada maraththin ilai mEl *  paLLikUdinAn thiruvadiyE kUdagiRpIr! * vambavizhum seNbagaththin vAsam uNdu * maNivaNdu vaguLaththin malar mEl vaigu * sembiyan kOch chengaNAn sErndha kOyil * thirunaRaiyUr maNimAdam sErmingaLE ",
            2: "kozhungayalAy nedu veLLam koNda kAlam * kulavaraiyin mIdhOdi aNdaththappAl * ezhundhu inidhu viLaiyAdum Isan endhai * iNaiyadik kIzh inidhu iruppIr! inavaNdAlum * uzhum seRuvil maNi koNarndhu karai mEl sindhi * ulagellAm sandhanamum agilum koLLa * sezhum ponni vaLangodukkum sOzhan sErndha * thirunaRaiyUr maNimAdam sErmingaLE ",
            3: "pavva nIrudai AdaiyAgach chuRRip * pAragalam thiruvadiyAp pavanam meyyA * sevvi mAdhiram ettum thOLA *  aNdamthirumudiyA ninRAn pAl sellagiRpIr * kavvai mAkaLiRu undhi veNNiyERRa * kazhal mannar maNi mudi mEl kAgam ERa * dheyva vAL valam koNda sOzhan sErndha * thirunaRaiyUr maNimAdam sErmingaLE ",
            4: "paingaNAL ari uruvAy veruva nOkkip * paruvaraith thOL iraNiyanaip paRRi vAngi * angai vAL ugir nudhiyAl avanadhu Agam * angurudhi ponguviththAn adik kIzh niRpIr! * vengaN mAkaLiRu undhi veNNiyERRa* viRal mannar thiRal azhiya vemmA uyththa * sengaNAn kOchchOzhan sErndha kOyil * thirunaRaiyUr maNimAdam sErmingaLE ",
            5: "anRu ulaga mUnRinaiyum aLandhu *  vEROrari uruvAy iraNiyanadhu Agam kINdu * venRu avanai viNNulagil sela uyththARku * virundhAvIr! mElezhundhu vilangal pAyndhu * pon sidhaRi maNi koNarndhu karai mEl sindhip * pulam parandhu nilam parakkum ponni nAdan * then thamizhan vadapulak kOn sOzhan sErndha * thirunaRaiyUr maNimAdam sErmingaLE ",
            6: "thannAlE thannuruvam payandha thAnAyth * thayangoLi sEr mUvulagum thAnAy vAnAy * thannAlE thAnuruvin mUrththi mUnRAyth * thAnAyan AyinAn saraN enRu uyvIr! * minnAdu vElEndhu viLaindha vELai * viNNERath thani vEl uyththu ulagam ANda * thennAdan kudakongan sOzhan sErndha * thirunaRaiyUr maNimAdam sErmingaLE ",
            7: "mulaith thadaththa nanjuNdu thunjap pEychchi * mudhudhu varaik kulapadhiyAk kAlip pinnE * ilaith thadaththa kuzhalUdhi Ayar mAdhar * inavaLai koNdAn adik kIzh eythagiRpIr! * malaith thadaththa maNi koNarndhu vaiyam uyya * vaLam kodukkum varu punalam ponni nAdan * silaith thadakkaik kulachchOzhan sErndha kOyil * thirunaRaiyUr maNimAdam sErmingaLE ",
            8: "murukkilangu kaniththuvarvAyp pinnai kELvan * mannellAm mun aviyach chenRu *  venRichcherukkaLaththuth thiRal azhiyach cheRRa vEndhan * siram thuNiththAn thiruvadi num senni vaippIr! * irukkilangu thirumozhi vAy eNthOL IsaRku * ezhil mAdam ezhupadhu seydhu ulagamANda * thirukkulaththu vaLachchOzhan sErndha kOyil * thirunaRaiyUr maNimAdam sErmingaLE ",
            9: "thArALan thaNNaranga vALan *  pUmElthaniyALan muniyALar Eththa ninRapErALan *  Ayiram pErudaiya vALan * pinnaikku maNavALan perumai kEtpIr! * pArALar ivarivar enRu azhundhai ERRa * padai mannar udal thuNiyap parimA uyththa * thErALan kOchchOzhan sErndha kOyil * thirunaRaiyUr maNimAdam sErmingaLE ",
            10: "*  semmozhi vAy nAl vEdha vANar vAzhum * thirunaRaiyUr maNimAdach chengaNmAlai * poymmozhi onRillAdha meymmaiyALan * pulamangaik kulavEndhan pulamai Arndha * ammozhi vAyk kalikanRi inbap pAdal * pAduvAr viyan ulagil namanAr pAdi * vemmozhi kEttu anjAdhE meymmai sollil * viNNavarkku virundhAgum perunthakkOrE ",
            11: "adivaravu:- ambaram kozhu *  pavvam paingaN *  anRu thannAlE *  mulai murukku *  thArALan semmozhi Alum ",
        },

        'PTM.6.7.steps': {
            1: "*ALum paNiyum adiyEnaik koNdAn *  viNda nisAsararai * thOLum thalaiyum thuNiveydhach *  chudu venjilai vAych charam thurandhAn * vELum sEyum anaiyArum *  vERkaNArum payil vIdhi * nALum vizhavin oli OvA *  naRaiyUr ninRa nambiyE ",
            2: "muniyAy vandhu mUvezhukAl *  mudisEr mannar udal thuNiya * thanivAy mazhuvin padai ANda *  thArAr thOLAn vArpuRavil * pani sEr mullai pallarumbap *  pAnal orupAl kaN kAtta * nanisEr kamalam mugam kAttum *  naRaiyUr ninRa nambiyE ",
            3: "theLLAr kadalvAy vidavAya *  sinavAL aravil thuyil amarndhu * thuLLA varu mAn vIzha *  vALi thurandhAn irandhAn mAvali maN * puLLAr puRavil pUngAvi *  pulan koL mAdhar kaN kAtta * naLLAr kamalam mugam kAttum *  naRaiyUr ninRa nambiyE ",
            4: "OLiyA veNNey uNdAn enRu *  uralOdu Aychchi oNkayiRRAl * viLiyA Arkka AppuNdu *  vimmi azhudhAn menmalar mEl * kaLiyA vaNdu kaLLuNNak *  kAmar thenRal alar thURRa * naLir vAy mullai muRuvalikkum *  naRaiyUr ninRa nambiyE ",
            5: "villAr vizhavil vadamadhurai *  virumbi virumbA malladarththu * kallAr thiraL thOL kanjanaik kAyndhAn *  pAyndhAn kALiyan mEl * sollAr surudhi muRaiyOdhich *  chOmuch cheyyum thozhilinOr * nallAr maRaiyOr palar vAzhum *  naRaiyUr ninRa nambiyE",
            6: "vaLLi kozhunan mudhalAya *  makkaLOdu mukkaNAnveLgi Oda *  viRal vANan *  viyanthOL vanaththaith thuNiththu ugandhAn * paLLi kamalaththu idaippatta *  paguvAy alavan mugam nOkki * naLLiyUdum vayal sUzhndha *  naRaiyUr ninRa nambiyE ",
            7: "midaiyA vandha vEl mannar vIya *  visayan thEr kadavi * kudaiyA varai onRu eduththu Ayar kOvAy ninRAn *  kUrAzhippadaiyAn *  vEdham nAngu aindhu vELvi *  angam ARu isai Ezh * nadaiyA valla andhaNar vAzh *  naRaiyUr ninRa nambiyE ",
            8: "pandhAr viralAL pAnjAli *  kUndhal mudikkap pAradhaththu * kandhAr kaLiRRuk kazhal mannar kalangach *  changam vAy vaiththAn * senthAmarai mEl ayanOdu *  sivanum anaiya perumaiyOr * nandhA vaNkai maRaiyOr vAzh *  naRaiyUr ninRa nambiyE ",
            9: "ARum piRaiyum aravamum *  adambum sadai mEl aNindhu *  udalamnIRum pUsi ERUrum *  iRaiyOn senRu kuRai irappa * mARu onRillA vAsa nIr *  varai mArbagalaththu aLiththu ugandhAn * nARum pozhil sUzhndhu azhagAya *  naRaiyUr ninRa nambiyE ",
            10: "*nanmai udaiya maRaiyOr vAzh *  naRaiyUr ninRa nambiyai * kanni madhiL sUzh vayal mangaik *  kaliyan oli sey thamizh mAlai * panni ulagil pAduvAr *  pAdu sArA pazha vinaigaL * manni ulagam ANdu pOy *  vAnOr vaNanga vAzhvArE ",
            11: "adivaravu:- ALum muni * theLLAr oLiyA * villAr vaLLi * midaiyA pandhAr * ARum nanmai mAn ",
        },

        'PTM.6.8.steps': {
            1: "*  mAn koNda thOl *  mArvin mANiyAy *  mAvali maNthAn koNdu *  thALAl aLandha perumAnai * thEn koNda sAral *  thiruvEngadaththAnai * nAn senRu nAdi *  naRaiyUril kaNdEnE ",
            2: "munnIrai munnAL *  kadaindhAnai *  mUzhththa nALannIrai mInAy *  amaiththa perumAnai * thennAli mEya *  thirumAlai emmAnai * nannIr vayal sUzh *  naRaiyUril kaNdEnE ",
            3: "thUvAya puL Urndhu *  vandhu thuRai vEzham * mUvAmai nalgi *  mudhalai thuNiththAnai * dhEvAdhi dhEvanaich *  chengamalak kaNNAnai * nAvAyuLAnai *  naRaiyUril kaNdEnE ",
            4: "OdA ariyAy *  iraNiyanai Un idandha * sEdAr pozhil sUzh *  thirunIrmalaiyAnai * vAdA malarth thuzhAy *  mAlai mudiyAnai * nAL thORum nAdi *  naRaiyUril kaNdEnE ",
            5: "kallAr madhiL sUzh *  kadi ilangaik kAr arakkan * vallAgam kILa *  vari venjaram thurandhavillAnai *  selva vibIdaNaRku *  vERAga * nallAnai nAdi *  naRaiyUril kaNdEnE ",
            6: "umbar ulagOdu *  uyir ellAm undhiyil * vambu malar mEl *  padaiththAnai mAyOnai * ambanna kaNNAL *  asOdhai than singaththai * nambanai nAdi *  naRaiyUril kaNdEnE ",
            7: "kattERu nIL sOlaik *  kANdavaththaith thImUttivittAnai *  meyyam amarndha perumAnai * mattERu kaRpagaththai *  mAdharkkAy *  vaN thuvarainattAnai nAdi *  naRaiyUril kaNdEnE ",
            8: "maNNin mI pAram keduppAn *  maRa mannar * paNNin mEl vandha *  padai ellAm pAradhaththu * viNNin mIdhERa *  visayan thEr UrndhAnai * naNNi nAn nAdi *  naRaiyUril kaNdEnE ",
            9: "*  pongERu nIL sOdhip *  ponnAzhi thannOdum * sangERu kOlath *  thadakkaip perumAnai * kongERu sOlaik *  kudandhaik kidandhAnai * nangOnai nAdi *  naRaiyUril kaNdEnE ",
            10: "*  mannu madhurai *  vasudhEvar vAzh mudhalai * nannaRaiyUr ninRa nambiyai *  vambavizhthArkkannavilum thOLAn *  kaliyan oli vallAr * ponnulagil vAnavarkkup *  puththELir AguvarE ",
            11: "adivaravu:- mAn munnIrai * thUvAya OdA * kallAr umbar * kattERu maNNin * pongu mannu pedai ",
        },

        'PTM.6.9.steps': {
            1: "*  pedai adarththa madavannam *  piriyAdhu *  malark kamalammadal eduththu madhu nugarum *  vayal uduththa thirunaRaiyUr * mudai adarththa siram Endhi *  mUvulagum bali thirivOn * idar keduththa thiruvALan *  iNaiyadiyE adai nenjE! ",
            2: "kazhiyArum kanasangam *  kalandhu engum niRaindhERi * vazhiyAra muththInRu *  vaLangodukkum thirunaRaiyUr * pazhiyArum viRal arakkan *  parumudigaL avai sidhaRa * azhalARum saram thurandhAn *  adiyiNaiyE adai nenjE! ",
            3: "suLai koNda palanganigaL *  thEn pAya kadhaligaLin * thiLai koNda pazham kezhumu *  thigazh sOlaith thirunaRaiyUr * vaLai koNda vaNNaththan *  pin thOnRal *  mUvulagOduaLai veNNey uNdAn than *  adiyiNaiyE adai nenjE! ",
            4: "thunROLith thukiRpadalam *  thunni engum mALigai mEl * ninRAra vAn mUdum *  nIL selvath thirunaRaiyUr * manRArak kudamAdi *  varai eduththu mazhai thaduththa * kunRArum thiraL thOLan *  kuraikazhalE adai nenjE! ",
            5: "agiR kuRadum santhanamum *  amponnum aNimuththum * migak koNarndhu thirai undhum *  viyan ponnith thirunaRaiyUr * pagal karantha sudarAzhip padaiyAn *  ivvulagEzhum * pugak karandha thiruvayiRRan *  ponnadiyE adai nenjE! ",
            6: "ponmuththum ariyugirum *  puzhaik kaimmA karikkOdum * minnath thaN thirai undhum *  viyan ponnith thirunaRaiyUr * minnoththa nuNmarungul *  melliyalai *  thirumArbilmannath thAn vaiththugandhAn *  malaradiyE adai nenjE! ",
            7: "sIr thazhaiththa kadhirch chennel *  sengamalaththu idaiyidaiyin * pAr thazhaiththuk karumbOngip *  payan viLaikkum thirunaRaiyUr * kAr thazhaiththa thiru uruvan *  kaNNa pirAn viNNavar kOn * thAr thazhaiththa thuzhAy mudiyan *  thaLiradiyE adai nenjE! ",
            8: "*  kulaiyArndha pazhukkAyum *  pasungAyum pALai muththum * thalaiyArndha iLangamugin *  thadanjOlaith thirunaRaiyUr * malaiyArndha kOlam sEr *  maNimAdam miga manni * nilaiyAra ninRAn than *  nILkazhalE adai nenjE! ",
            9: "maRaiyArum peruvELvik *  kozhum pugai pOy vaLarndhu engum * niRaiyAra vAn mUdum *  nILselvath thirunaRaiyUr * piRaiyArum sadaiyAnum *  piramanum mun thozhudhEththa * iRaiyAgi ninRAn than *  iNaiyadiyE adai nenjE! ",
            10: "*  thiNkaLaga madhiL pudai sUzh *  thirunaRaiyUr ninRAnai * vaNkaLaga nilaveRikkum *  vayal mangai nagarALan * paNkaLagam payinRa sIrp *  pAdal ivai paththum vallAr * viNkaLagaththu imaiyavarAy *  vIRRirundhu vAzhvArE ",
            11: "adivaravu:- pedai kazhi * suLai thunRu * agil pon * sIr kulai * maRai thiN kidandha ",
        },

        'PTM.6.10.steps': {
            1: "*  kidandha nambi kudandhai mEvik *  kEzhalAy ulagaiidandha nambi *  engaL nambi *  eRinjar araN azhiya * kadandha nambi kadiyAr ilangai *  ulagai IradiyAl * nadandha nambi nAmam sollil *  namO nArAyaNamE ",
            2: "vidam thAn udaiya aravam veruvach *  cheruvil muna nAL *  munthadam thAmarai nIrp *  poygai pukku mikka thAdALan * idandhAn vaiyam kEzhalAgi *  ulagai IradiyAl * nadandhAn udaiya nAmam sollil *  namO nArAyaNamE ",
            3: "pUNAdhu analum *  thaRu kaN vEzham maRuga *  vaLai maruppaipENAn vAngi *  amudham koNda perumAn thirumArvan * pANA vaNdu muralum kUndhal *  Aychchi thayir veNNey * nANAdhu uNdAn nAmam sollil *  namO nArAyaNamE ",
            4: "kallAr madhiL sUzh *  kachchi nagaruL nachchip *  pAdagaththuLellA ulakum vaNanga *  irundha ammAn *  ilangaik kOnvallAL Agam *  villAl munindha endhai *  vibIdaNaRkunallAn udaiya nAmam sollil *  namO nArAyaNamE ",
            5: "kudaiyA varaiyAl *  nirai mun kAththa perumAn *  maruvAdhavidai thAn Ezhum venRAn *  kOval ninRAn *  thennilangaiadaiyA arakkar vIyap porudhu *  mEvi vengURRam * nadaiyA uNNak kaNdAn nAmam *  namO nArAyaNamE ",
            6: "kAna eNgum kurangum *  musuvum padaiyA *  adal arakkarmAnam azhiththu ninRa *  venRi ammAn *  enakku enRumthEnum pAlum amudhumAya *  thirumAl thirunAmam * nAnum sonnEn namarum uraimin *  namO nArAyaNamE ",
            7: "ninRa varaiyum kidandha kadalum *  thisaiyum irunilanum * onRum ozhiyA vaNNam *  eNNi ninRa ammAnAr * kunRu kudaiyA eduththa *  adigaLudaiya thirunAmam * nanRu kANmin thoNdIr! sonnEn *  namO nArAyaNamE ",
            8: "kadungAl mAri kallE pozhiya *  allE emakkenRupadungAl *  nIyE saraN enRu *  Ayar anja anjA mun * nedungAl kunRam kudai onREndhi *  niraiyaich chiramaththAl * nadungA vaNNam kAththAn nAmam *  namO nArAyaNamE ",
            9: "pongu puNarik kadal sUzh Adai *  nilamA magaL malarmAmangai *  piraman sivan indhiran *  vAnavar nAyagarAya * engaL adigaL imaiyOr *  thalaivar udaiya thirunAmam * nangaL vinaigaL thavira uraimin *  namO nArAyaNamE ",
            10: "*  vAvith thadam sUzh maNi muththARRu *  naRaiyUr nedumAlai * nAvil paravi nenjil koNdu *  nambi nAmaththai * kAvith thadangaN madavAr kELvan *  kaliyan oli mAlai * mEvich cholla vallAr pAvam *  nillA vIyumE ",
            11: "adivaravu:- kidandha vidam * pUNAdhu kal * kudai kAnam * ninRa kadungAl * pongu vAvi kaRavA ",
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