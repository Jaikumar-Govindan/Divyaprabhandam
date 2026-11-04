window.MARKER_DATABASE = window.MARKER_DATABASE || { };

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PTM.7.1.steps': {

            1: "🙏 kaRavA maDa nAgu  *  than kanRu uLLinAR pOl  * maRavAdhu aDiyEn  *  unnaiyE azhaikkinREn  *** naRavAr pozhil sUzh  *  naRaiyUr ninRa nambi!  * piRavAmai enaip paNi  *  endhai pirAnE! ",
            2: "vaRRA mudhu nIroDu  *  mAl varai Ezhum  * thuRRAga mun thuRRiya  *  thol pugazhOnE!  *** aRREn aDiyEn  *  unnaiyE azhaikkinREn  * peRREn aruL thandhiDu  *  en endhai pirAnE! ",
            3: "thArEn piRarkku  *  un aruL enniDai vaiththAy  * ArEn adhuvE  *  parugik kaLikkinREn  *** kArEy kaDalE malaiyE  *  thirukkOTTiyUrE  *  ugandhAyai  *  ugandhu aDiyEnE ",
            4: "puL vAy piLandha  *  punidhA! enRu azhaikka  * uLLE ninRu  *  en uLLam kuLirum oruvA!  *** kaLvA!  *  kaDalmallaik kiDandha karumbE!  * vaLLAl! unnai  *  engnganam nAn maRakkEnE? ",
            5: "villEr nudhal  *  vEl neDungkaNNiyum nIyum  * kallAr kaDungkAnam  *  thirindha kaLiRE!  *** nallAy! naranAraNanE!  *  enggaL nambi!  * sollAy unnai  *  yAn vaNanggith thozhumARE ",
            6: "paNi Ey parangkunRin  *  pavaLath thiraLE!  * muniyE!  *  thirumUzhikkaLaththu viLakkE!  *** iniyAya thonDarOm  *  parugu innamudhAyakaniyE!  *  unnaik kaNDu konDu  *  uyndhozhindhEnE ",
            7: "kadhiyEl illai  *  nin aruL alladhu enakku  * nidhiyE!  *  thirunIrmalai niththilaththoththE!  *** padhiyE! paravith thozhum  *  thoNDar thamakkukkadhiyE!  *  unnaik kaNDu koNDu uyndhozhindhEnE ",
            8: "aththA! ariyE! enRu  *  unnai azhaikka  * piththA enRu pEsuginRAr  *  piRar ennai  *** muththE! maNimANikkamE!  *  muLaikkinRaviththE!  *  unnai engnganam  *  nAn viDugEnE? ",
            9: "thUyAy! suDar mAmadhi pOl  *  uyirkku ellAm  * thAyAy aLikkinRa  *  thaNthAmaraik kaNNA!  *** AyA! alainIr ulagEzhum  *  mun uNDavAyA!  *  unnai engnganam  *  nAn maRakkEnE? ",
            10: "🙏 vaNDAr pozhil sUzh  *  naRaiyUr nambikku  *  enRumthoNDAyk  *  kaliyan oli sey thamizh mAlai  *** thonDIr! ivai pADumin  *  pADi ninRADa  * unDE visumbu  *  unthamakku illai thuyarE ",
            11: "aDivaravu: kaRavA vaRRA  *  thArEn puL  *  vil pani  *****  kadhi aththAn  *  thUyAy vaNDAr puLLay",
        },
        'PTM.7.2.steps': {
            1: " 🙏 puLLAy EnamumAyp pugundhu  *  ennai uLLam koNDakaLvA! enRalum  *  en kaNgaL nIrgaL sOrtharumAl  *** uLLE ninRu urugi  *  nenjcham unnai uLLiyakkAl  * naLLEn unnai allAl  *  naRaiyUr ninRa nambIyO! ",
            2: "ODA ALariyin  *  uruvAy maruvi  *  enthanmADE vandhu  *  aDiyEn manam koLLa valla maindhA!  *** pADEn thoNDar thammaik  *  kavidhaip panuval koNDu  * nADEn unnai allAl  *  naRaiyUr ninRa nambIyO! ",
            3: "emmAnum em anaiyum  *  enaip peRRu ozhindhadhaR pin  * ammAnum ammanaiyum  *  aDiyEnukkAgi ninRa  *** nanmAna oNsuDarE!  *  naRaiyUr ninRa nambI!  *  unmaimmAna vaNNam allAl  *  magizhndhu Eththa mATTEnE ",
            4: "siRiyAy Or piLLaiyumAy  *  ulaguNDu Or Alilai mEluRaivAy!  *  en nenjchin uLLE uRaivAy  *  uRaindhadhu thAn  *** aRiyAdhu irundhu aRiyEn aDiyEn  *  aNivaNDu kiNDum  * naRai vArum pozhil sUzh  *  naRaiyUr ninRa nambIyO! ",
            5: "nINDAyai vAnavargaL  *  ninaindhu Eththik kANbaridhAl  * ANDAy enRu AdharikkappaDuvAykku  *  nAn aDimaipUNDEn  *** en nenjchin uLLE  *  pugundhAyaip pOgal oTTEn  * nAN thAn unakku ozhindhEn  *  naRaiyUr ninRa nambIyO! ",
            6: "en thAdhai thAdhai appAl  *  ezhuvar pazhavaDimaivandhAr  *  en nenjchin uLLE  *  vandhAyaip pOgal oTTEn  *** andhO! en AruyirE!  *  arasE! aruL enakku  * nandhAmal thandha endhAy!  *  naRaiyUr ninRa nambIyO! ",
            7: "man anjcha Ayiram thOL  *  mazhuvil thuNiththa maindhA!  * en nenjchaththuL irundhu  *  inggu inip pOyp piRar oruvar  *** vannenjcham pukkirukka oTTEn  *  vaLaiththu vaiththEn  * nannenjcha anna mannum  *  naRaiyUr ninRa nambIyO! ",
            8: "eppOdhum ponmalar iTTu  *  imaiyOr thozhudhu  *  thanggaLkaippOdhu koNDu iRainjchik  *  kazhal mEl vaNangga ninRAy  *** ippOdhu en nenjchin uLLE  *  pugundhAyaip pOgal oTTEn  * naRpOdhu vaNDu kiNDum  *  naRaiyUr ninRa nambIyO! ",
            9: "Un Er Akkai thannai  *  uzhandhu Ombi vaiththamaiyAl  * yAnAy enthanakkAy  *  aDiyEn manam pugundhathEnE!  *** thIngkarumbin theLivE!  *  en sindhai thannAl  * nAnE eydhap peRREn  *  naRaiyUr ninRa nambIyO! ",
            10: "🙏 nannIr vayal puDai sUzh  *  naRaiyUr ninRa nambiyai  * kannIra mAl varaith thOL  *  kalikanRi manggaiyar kOn  *** sonnIra sol mAlai  *  solluvArgaL  *  sUzh visumbilnannIrmaiyAl magizhndhu  *  neDungkAlam vAzhvArE",
            11: "aDivaravu: puL ODA emmAnum siRiyAy nINDAy enthAdhai man eppOdhum UnEr nannIr sinavil"
        },
        'PTM.7.3.steps': {
            1: "🙏 sinavil sengkaN arakkar uyir mALach  * seRRa villi enRu kaRRavar thanthammanavuL koNDu  *  enRum eppOdhum ninRu EththummAmuniyai  *  maram Ezh eydha maindhanai  *** nanavil senRArkkum naNNaRku ariyAnai  * nAn aDiyEn naRaiyUr ninRa nambiyai  * kanavil kaNDEn inRu kaNDamaiyAl  *  enkaNNiNaigaL kaLippak kaLiththEnE ",
            2: "thAy ninaindha kanRE okka  *  ennaiyumthannaiyE ninaikkach seydhu  *  thAn enakkAy ninaindhu aruL seyyum appanai  * anRu ivvaiyagam uNDu umizhndhiTTavAyanai  ***  magarak kuzhaik kAdhanaimaindhanai  *  madhiL kOval iDaikazhiAyanai  *  amararkku ari ERRai  *  enanbanai anRi AdhariyEnE ",
            3: "vandha nAL vandhu en nenjchiDam koNDAn  * maRROr nenjchu aRiyAn  *  aDiyEnuDaichsindhaiyAy vandhu thenpularkku ennaichsEr koDAn  *  idhu sikkenap peRREn  *** kondhulAm pozhil sUzh kuDandhaith thalaikkOvinaik  *  kuDam ADiya kUththanai  * endhaiyai endhai thandhai thammAnai  * empirAnai eththAl maRakkEnE? ",
            4: "urangkaLAl iyanRa mannar mALap  * pAradhaththu oru thEr aivarkkAych senRu  * iranggi Urndhu avarkku innaruL seyyumempirAnai  *  vambAr punal kAviri  *** aranggam ALi en ALi viN ALi  * Azhi sUzh ilanggai malanggach senRu  * saranggaL ANDa thaNthAmaraik kaNNanukku anRi  * en manam thAzhndhu nillAdhE ",
            5: "Anggu vennaragaththu azhundhum pOdhu  * anjchEl enRu aDiyEnai anggE vandhuthAnggu  *  thAmarai anna ponnAr aDiempirAnai  *  umbarkku aNiyAy ninRa  *** vEngkaDaththu ariyaip pari kIRiyai  * veNNey uNDu uraliniDai AppuNDathIngkarumbinai  *  thEnai nanpAlinai anRi  * en manam sindhai seyyAdhE ",
            6: "eTTanaip pozhudhu Agilum  *  enRumen manaththu agalAdhu irukkum pugazh  * thaTTalarththa ponnE alar kOnggin  * thAzh pozhil thirumAlirunjchOlai angkaTTiyai  ***  karumbu InRa insARRaik  * kAdhalAl maRai nAnkum mun OdhiyapaTTanai  *  paravaith thuyil ERRai  *  enpaNbanai anRip pADal seyyEnE ",
            7: "paNNin inmozhi yAzh narambil peRRa  * pAlai Agi inggE pugundhu  *  enkaNNum nenjchum vAyum iDangkoNDAn  * koNDa pin maRaiyOr manam thannuL  *** viNNuLAr perumAnai emmAnai  * vInggu nIr magaram thiLaikkum kaDalvaNNan  *  mAmaNi vaNNan em aNNal  * vaNNamE anRi vAy uraiyAdhE ",
            8: "ini eppAvam vandhu eydhum? sollIr  * emakku immaiyE aruL peRRamaiyAl  *  aDumthuniyaith thIrththu inbamE tharuginRadhOr  * thORRath thonneRiyai  ***  vaiyam thozhappaDummuniyai vAnavarAl vaNangkappaDummuththinaip  *  paththar thAm nugarginRadhOrkaniyai  *  kAdhal seydhu en uLLam koNDakaLvanai  *  inRu kaNDu koNDEnE ",
            9: "en seygEn aDiyEn? uraiyIr  *  idhaRkuenRum en manaththE irukkum pugazh  * thanjchai ALiyaip pon peyarOn  *  nenjchamanRu iDandhavanaith thazhalE purai  *** min sey vAL arakkan nagar pAzh paDach  * sUzhkaDal siRai vaiththu imaiyOr thozhum  * pon sey mAl varaiyai maNik kunRinaianRi  *  en manam pORRi ennAdhE ",
            10: "🙏 thODu viNDalar pUmpozhil manggaiyarthOnRal  *  vAL kaliyan thiruvAlinADan  *  nannaRaiyUr ninRa nambi than  *** nalla mAmalarch sEvaDi senniyilsUDiyum thozhudhum ezhundhADiyum  * thoNDargaTku avan sonna sol mAlai  * pADal paththu ivai pADumin thoNDIr!  * pADa nummiDaip pAvam nillAvE",
            11: "aDivaravu: sinavil thAy urangkaL Anggu eTTanai paNNin ini enseygEn thODu kaN"
        },
        'PTM.7.4.steps': {
            1: "🙏 kaN sOra vengkurudhi vandhizhiya  * venthazhal pOl kUndhalALai  * maN sEra mulai uNDa mAmadhalAy!  * vAnavar tham kOvE! enRu  *** viN sErum iLanthinggaL agaDurinjchu  * maNi mADa malgu  *  selvaththaNsERai emperumAn thAL thozhuvArkANmin  *  en thalai mElArE ",
            2: "ampuruva vari neDungkaN  *  alar magaLaivarai agalaththu amarndhu  *  mallalkomburuva viLangkani mEl  *  iLangkanRukoNDu eRindha kUththar pOlAm  *** vambalarum thaNsOlai vaNsERai  * vAn undhu kOyil mEya  * emperumAn thAL thozhuvAr  *  eppozhudhumen manaththE irukkinRArE ",
            3: "mIdhODi vAL eyiRu min ilaga  * mun vilagum uruvinALai  * kAdhODu koDi mUkku anRu uDan aRuththa  * kaiththalaththA! enRu ninRu  *** thAdhODu vaNDalambum  *  thaNsERaiemperumAn thALai Eththi  * pOdhODu punal thUvum puNNiyarE  * viNNavaril poliginRArE ",
            4: "thEr ALum vAL arakkan  *  then ilanggaivenjchamaththup ponRi vIzha  * pOr ALum silai adhanAl  *  poru kaNaigaLpOkkuviththAy enRu  ***  nALumthAr ALum varai mArban  *  thaNsERaiemperumAn umbar ALum  * pErALan pEr Odhum periyOrai  * oru kAlum pirigilEnE ",
            5: "vandhikkum maRRavarkkum  *  mAsuDambilval amaNar thamakkum allEn  * mundhich senRu ari uruvAy iraNiyanai  * muraN azhiththa mudhalvarkku allAl  *** sandhap pU malarch sOlaith  *  thaNsERaiemperumAn thALai  *  nALumsindhippArkku en uLLam  *  thEn URieppozhudhum thiththikkumE ",
            6: "paNDu EnamAy ulagai anRu iDandha  * paNbALA enRu ninRu  * thoNDAnEn thiruvaDiyE thuNai allAl  * thuNai ilEn solluginREn  *** vaNDEndhum malarp puRavil  *  vaNsERaiemperumAn aDiyAr thammai  * kaNDEnukku idhu kANIr  *  en nenjchumkaN iNaiyum kaLikkumARE ",
            7: "pai viriyum vari aravil  *  paDukaDaluLthuyil amarndha paNbA! enRum  * mai viriyum maNi varai pOl  *  mAyavanE!enRenRum vaNDAr nIlam  *** sey viriyum thaNsERai emperumAn  * thiruvaDiyaich sindhiththERku  *  enaiyaRivum koNDAnukku AL AnArkkuALAm  *  en anbu thAnE ",
            8: "uNNAdhu vengkURRam  *  OvAdhupAvanggaL sErA  *  mElaiviNNOrum maNNOrum vandhu iRainjchum  * menthaLir pOl aDiyinAnai  *** paNNAra vaNDu iyambum  *  paimpozhil sUzhthaNsERai ammAn thannai  * kaNNArak kaNDu urugik  *  kai AraththozhuvAraik karudhunggAlE ",
            9: "kaLLaththEn poy agaththEn AdhalAl  * pOdharukAl kavalai ennum  * veLLaththERku en kolO?  *  viLai vayaluLkaru nIlam kaLainjar thALAlthaLLa  ***  thEn maNa nARum  *  thaNsERaiemperumAn thALai  *  nALumuLLaththE vaippArukku idhu kANIr  * en uLLam urugumARE ",
            10: "🙏 pU mAN sEr karungkuzhalAr pOl naDandhu  * vayal ninRa peDaiyODu  *  annamthE mAvin innizhalil kaN thuyilum  * thaNsERai ammAn thannai  *** vA mAn thErp parakAlan  *  kalikanRioli mAlai koNDu thoNDIr!  * thU mAN sEr ponnaDi mEl sUTTumin  *  numthuNaik kaiyAl thozhudhu ninRE ",
            11: "aDivaravu: kaN ambu mIdhODi thErALum vandhikkum paNDu paiviriyum uNNAdhu kaLLaththEn pUmANthandhai"
        },
        'PTM.7.5.steps': {
            1: "🙏 thandhai kAlil peruvilanggu * thAL avizha * naLLiruTkaN vandha endhai perumAnAr * maruvi ninRa Ur pOlum *** mundhi vAnam mazhai pozhiya * mUvA uruvin maRaiyALar * andhi mUnRum anal Ombum * aNiyAr vIdhi azhundhUrE",
            2: "pAriththu ezhundha * paDai mannar thammai mALa * pAradhaththuth thEril pAganAy Urndha * dhEva dhEvan Ur pOlum *** nIril paNaiththa neDuvALaikku * anjchip pOna kuruginanggaL * Aral kavuLODu arugaNaiyum * aNiyAr vayal sUzh azhundhUrE",
            3: "sempon madhiL sUzh thennilanggaikku iRaivan * siranggaL aiyiraNDum * umbar vALikku ilakkAga * udhirththa uravOn Ur pOlum *** kombil Arndha mAdhavi mEl * kOdhi mEyndha vaNDinanggaL * ambarAvum kaNmaDavAr * aimpAl aNaiyum azhundhUrE",
            4: "veLLaththuL Or Alilai mEl * mEvi aDiyEn manam pugundhu * en uLLaththuLLum kaNNuLLum * ninRAr ninRa Ur pOlum *** puLLup piLLaikku irai thEDip * pOna kAdhal peDaiyODum * aLLal seRuvil kayal nADum * aNiyAr vayal sUzh azhundhUrE",
            5: "pagalum iravum thAnEyAyp * pArum viNNum thAnEyAy * nigaril suDarAy iruLAgi * ninRAr ninRa Ur pOlum *** thugilin koDiyum thErth thugaLum * thunni mAdhar kUndhal vAy * agilin pugaiyAl mugil Eykkum * aNiyAr vIdhi azhundhUrE",
            6: "EDilanggu thAmarai pOl * sevvAy muRuval seydharuLi * mADu vandhu en manam pugundhu * ninRAr ninRa Ur pOlum *** nIDu mADath thanich chUlam * pOzhak koNDal thuLi thUva * ADal aravaththu Arppu OvA * aNiyAr vIdhi azhundhUrE",
            7: "mAlaip pugundhu malar aNai mEl vaigi * aDiyEn manam pugundhu * en nIlak kaNgaL pani malga * ninRAr ninRa Ur pOlum *** vElaik kaDal pOl neDu vIdhi * viN thOy sudhai veNmaNi mADaththu * Alaip pugaiyAl azhal kadhirai maRaikkum * vIdhi azhundhUrE",
            8: "vanjchi marunggul iDai nOva * maNandhu ninRa kanavagaththu * en nenjchu niRaiyak kai kUppi * ninRAr ninRa Ur pOlum *** panjchi anna mellaDi * naRpAvaimArgaL * ADagaththin anjchilambin Arppu OvA * aNiyAr vIdhi azhundhUrE",
            9: "en aimpulanum ezhilum koNDu * inggE nerunal ezhundharuLi * pon angkalaigaL melivu eydhap * pOna punidhar Ur pOlum *** mannu mudhunIr aravindha malar mEl * varivaNDu isai pADa * annam peDaiyODu uDan ADum * aNiyAr vayal sUzh azhundhUrE",
            10: "🙏 nellil kuvaLai kaN kATTa * nIril kumudham vAy kATTa * allik kamalam mugam kATTum * kazhani azhundhUr ninRAnai *** vallip podhumbil kuyil kUvum * manggai vEndhan parakAlan * sollil polindha thamizh mAlai * sollap pAvam nillAvE",
            11: "aDivaravu: thandhai pAriththu * sempon veLLaththuL * pagal EDu * mAlai vanjchi * ennaimpulanum nellil singgam",

        },
        'PTM.7.6.steps': {
            1: "🙏 singgam adhAy avuNan * thiRal Agam mun kINDugandha * sanggam iDaththAnaith * thazhal Azhi valaththAnai *** sengkamalaththu ayan anaiyAr * thennazhundhaiyil manni ninRa * angkamalak kaNNanai * aDiyEn kaNDu koNDEnE",
            2: "kOvAnAr maDiyak * kolai Ar mazhuk koNDaruLum * mUvA vAnavanai * muzhu nIr vaNNanai *** aDiyArkku AvA! enRu iranggith * thennazhundhaiyil manni ninRa * dhEvAdhi dhEvanai * yAn kaNDu koNDu thiLaiththEnE",
            3: "uDaiyAnai * oli nIr ulaganggaL paDaiththAnai * viDaiyAn ODa anRu * viRal Azhi visaiththAnai *** aDaiyAr thennilanggai azhiththAnai * aNi azhundhUr uDaiyAnai * aDiyEn aDaindhu uyndhu pOnEnE",
            4: "kunRAl mAri thaDuththavanaik * kula vEzham anRu ponRAmai * adhanukku aruL seydha pOr ERRai *** anRu Avin naRuney amarndhu uNNa * aNi azhundhUr ninRAnai * aDiyEn kaNDu koNDu niRaindhEnE",
            5: "kanjchanaik kAyndhAnaik * kaNNamanggaiyuL ninRAnai * vanjchanap pEy mulaiyUDu * uyir vAy maDuththu uNDAnai *** senjchol nAnmaRaiyOr * thennazhundhaiyil manni ninRa * anjchanak kunRam thannai * aDiyEn kaNDu koNDEnE",
            6: "periyAnai * amarar thalaivaRkum piramanukkum * uri yAnai ugandhAn avanukkum * uNarvadhanukku ariyAnai *** azhundhUr maRaiyOrgaL * aDi paNiyum kariyAnai * aDiyEn kaNDu koNDu kaLiththEnE",
            7: "thiruvAzh mArvan thannaith * thisai maN nIr eri mudhalA * uruvAy ninRavanai * oli sErum mArudhaththai *** aruvAy ninRavanaith * thennazhundhaiyil manni ninRa * karuvAr kaRpagaththaik * kaNDu koNDu kaLiththEnE",
            8: "nilai ALAga * ennai ugandhAnai * nilamagaL than mulai AL viththaganai * mudhu nAnmaRai vIdhi thoRum *** alai Arum kaDal pOl muzhanggum * thennazhundhaiyil manni ninRa * kalai Ar soRporuLaik * kaNDu koNDu kaLiththEnE",
            9: "🙏 pErAnaik * kuDandhaip perumAnai * ilangkoLi sEr vArAr vanamulaiyAL * malar manggai nAyaganai *** ArA innamudhaith * thennazhundhaiyil manni ninRa * kArAr karumugilaik * kaNDu koNDu kaLiththEnE",
            10: "🙏 thiRal murugan anaiyAr * thennazhundhaiyil manni ninRa * aRa mudhalvan avanai * aNi Aliyar kOn maruvAr *** kaRai neDuvEl valavan * kalikanRi sol aiyiraNDum * muRai vazhuvAmai vallAr * muzhudhALvar vAn ulagE",
            11: "aDivaravu: singgamadhu kO * uDaiyAnai kunRAl * kanjchanai periyAnai * thiruvAzh nilai * pErAnai thiRal thiru",
        },
        'PTM.7.7.steps': {
            1: "🙏 thiruvukkum thiruvAgiya selvA! * dheyvaththukku arasE! seyya kaNNA! * uruvach senjchuDar Azhi vallAnE! * ulaguNDa oruvA! thirumArbA *** oruvaRku ARRi uyyum vagai anRAl * uDan ninRu aivar ennuL pugundhu * ozhiyAdhu aruvith thinRiDa anjchi nin aDaindhEn * azhundhUr mEl thisai ninRa ammAnE!",
            2: "pandhAr melviral nalvaLaith thOLi * vandhAy * en manaththE manni ninRAy * mAlvaNNA! mazhai pOl oLivaNNA! *** chandhOgA! pauzhiyA! thaiththiriyA! * sAma vEdhiyanE! neDumAlE! * andhO! ninnaDi anRi maRRaRiyEn * azhundhUr mEl thisai ninRa ammAnE!",
            3: "neyyAr Azhiyum sanggamum Endhum * nINDa thOL uDaiyAy! * aDiyEnaich seyyAdha ulagaththiDaich seydhAy * siRumaikkum perumaikkum uL pugundhu *** poyyAl aivar en meykuDi ERip * pORRi vAzhvadhaRku anjchi nin aDaindhEn * aiyA! ninnaDi anRi maRRaRiyEn * azhundhUr mEl thisai ninRa ammAnE!",
            4: "paranE! panjchavan pauzhiyan chOzhan * varanE! * mAdhavanE! madhusUdhA! * maRROr nalthuNai nin alAl ilEn kAN *** nambI! * emperumAn! umbar ALum aranE! * AdhivarAgam mun AnAy! * azhundhUr mEl thisai ninRa ammAnE!",
            5: "viNDAn viN puga venjchamaththu ariyAyp * pariyOn mArvagam paRRip piLandhu * paNDu An uyya Or mAlvarai Endhum * paNbALA! paranE! paviththiranE! *** kaNDEn nAn kali yugaththadhan thanmai * karumam Avadhum enthanakku aRindhEn * aNDA! nin aDi anRi maRRu aRiyEn * azhundhUr mEl thisai ninRa ammAnE!",
            6: "thOyA inthayir ney amudhu uNNach * sonnAr solli nagum parisE * peRRa thADALA! * tharaiyOrkkum viNNOrkkum sEyAy! *** kirEdha thirEdha thuvApara kali yugam ivai * nAnkum mun AnAy! * AyA! ninnaDi anRi maRRaRiyEn * azhundhUr mEl thisai ninRa ammAnE!",
            7: "kaRuththuk kanjchanai anjcha munindhAy! * kArvaNNA! kaDal pOl oLivaNNA! * iRuththiTTu AnviDai Ezhum mun venRAy! * endhAy! andharam Ezhum mun AnAy! *** poRuththuk koNDu irundhAl poRukkoNA * bOgamE nugarvAn pugundhu * aivar aRuththuth thinRiDa anjchi nin aDaindhEn * azhundhUr mEl thisai ninRa ammAnE!",
            8: "neDiyAnE! kaDi Ar kali nambI! * ninnaiyE ninaindhu inggu iruppEnai * kaDiyAr kALaiyar aivar pugundhu * kAval seydha akkAvalaip pizhaiththu *** kuDi pOndhu unnaDik kIzh vandhu pugundhEn * kURai sORu ivai thandhu enakkaruLi * aDiyEnaip paNi ANDu koL endhAy! * azhundhUr mEl thisai ninRa ammAnE!",
            9: "kOvAy aivar en meykuDi ERik * pOgAr * nAn avaraip poRukkakilEn punidhA! * puTkoDiyAy! neDumAlE! *** thI vAy nAgaNaiyil thuyilvAnE! * thirumAlE! inich seyvadhu onRu aRiyEn * AvA enRu aDiyERku iRai iranggAy * azhundhUr mEl thisai ninRa ammAnE!",
            10: "🙏 annam mannu paimpUmpozhil sUzhndha * azhundhUr mEl thisai ninRa ammAnai * Ali nADan * manggaik kula vEndhan *** sonna inthamizh nanmaNik kOvai * thUya mAlai ivai paththum vallAr * manni mannavarAy ulagANDu * mAna veNkuDaik kIzh magizhvArE",
            11: "aDivaravu: thiruvukkum * pandhAr ney * paranE viNDAn * thOyA kaRuththu * neDiyAnE kOvAy * annam sengkamalam",

        },
        'PTM.7.8.steps': {
            1: "🙏 sengkamalath thirumagaLum puviyum * sempon thiruvaDiyin iNai varuDa munivar Eththa * vangga mali thaDangkaDaluL ananthan ennum * vari aravin aNaith thuyinRa mAyOn kANmin *** enggu mali niRai pugazh nAl vEdham * aindhu vELvigaLum kELvigaLum iyanRa thanmai * angkamalaththu ayan anaiyAr payilum selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            2: "mun ivvulagu Ezhum iruL maNDi uNNa * munivaroDu dhAnavargaL thisaippa * vandhu pannu kalai nAl vEdhap poruLai ellAm * parimugamAy aruLiya em paraman kANmin *** sennel mali kadhirk kavari vIsach * sanggam avai muralach sengkamala malarai ERi * annam mali peDaiyODum amarum selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            3: "kulath thalaiya madha vEzham poygai pukkuk * kOL mudhalai piDikka adhaRku anunggi ninRu * nilath thigazhum malarch suDarEy sOdhI! enna * nenjchiDar thIrththu aruLiya en nimalan kANmin *** malaith thigazh chandhagil kanaka maNiyum koNDu * vandhundhi vayalgaL thoRum maDaigaL pAya * alaiththu varum ponni vaLam perugum selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            4: "silambu mudhal kalan aNindhOr sengkaN kunRam * thigazhndhadhu enath thiruvuruvam panRi Agi * ilanggu puvi maDandhai thanai iDandhu pulgi * eyiRRiDai vaiththu aruLiya em Isan kANmin *** pulambu siRai vaNDolippap pUgam thokka * pozhilgaL thoRum kuyil kUva mayilgaL Ala * alambu thiraip punal puDai sUzhndhu azhagAr selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            5: "sina mEvum aDal ariyin uruvam Agith * thiRal mEvum iraNiyanadhu Agam kINDu * mana mEvu vanjchanaiyAl vandha pEychchi * mALa uyir vavviya em mAyOn kANmin *** ina mEvu varivaLaik kai Endhum kOvai * EyvAya maragadham pOl kiLiyin insol * ana mEvu naDai maDavAr payilum selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            6: "vAnavar tham thuyar thIra vandhu thOnRi * mAN uruvAy mUvaDi mAvaliyai vENDi * thAn amara Ezh ulagum aLandha venRith * thani mudhal chakkarap paDai en thalaivan kANmin *** thEn amarum pozhil thazhuvum ezhil koL vIdhich * sezhumADa mALigaigaL kUDam thORum * Ana thol sIr maRaiyALar payilum selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            7: "pandhaNaindha melviralAL sIdhaikkAgip * pagalavan mIdhu iyanggAdha ilanggai vEndhan * andhamil thiNkaram siranggaL puraNDu vIzha * aDukaNaiyAl eydhugandha ammAn kANmin *** senthamizhum vaDakalaiyum thigazhndha nAvar * thisaimuganE anaiyavargaL semmai mikka * andhaNar tham Agudhiyin pugai Ar selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            8: "paRiththu * mazha viDai aDarththuk kuravai kOththu * vambavizhum malark kuzhalAL Aychchi vaiththa * thayir veNNey uNDugandha mAyOn kANmin *** sempavaLa maradhagam nanmuththam kATTath * thigazh pUgam kadhali pala vaLa mikku enggum * ampon madhiL pozhil puDai sUzhndhu azhagAr selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            9: "UDERu kanjchanoDu mallum villum * oNkariyum uruLchagaDum uDaiyach seRRa * nIDERu peruvalith thOL uDaiya venRi * nilavu pugazh nEmi anggai neDiyOn kANmin *** sEDERu pozhil thazhuvum ezhil koL vIdhith * thiruvizhavil maNi aNindha thiNNai thORum * ADERu malark kuzhalAr payilum selvaththu * aNi azhundhUr ninRugandha amarar kOvE",
            10: "🙏 panRiyAy mInAgi ariyAyp * pAraip paDaiththuk kAththu uNDumizhndha paraman thannai * anRu amararkku adhipadhiyum ayanum sEyum * aDi paNiya aNi azhundhUr ninRa kOvai *** kanRi neDuvEl valavan Ali nADan * kalikanRi oli seydha inbap pADal * onRinoDu nAnkum Oraindhum vallAr * olikaDal sUzh ulagALum umbar thAmE",
            11: "aDivaravu: sengkamalam * mun kulam * silambu vAnavar * pandhu kumbam * UDERu panRi * kaLLam",
        },
        'PTM.7.9.steps': {
            1: "🙏 kaLLam manam viLLum vagai * karudhik kazhal thozhuvIr * veLLam mudhu paravaith * thirai viriya *** karai enggum theLLum maNi thigazhum * siRupuliyUrch salasayanaththu uLLum * enadhu uLLaththuLLum * uRaivArai uLLIrE",
            2: "theruvil thiri siRu nOnbiyar * senjchORRoDu kanjchi maruvi * pirindhavar vAy mozhi * madhiyAdhu vandhu aDaivIr! *** thiruvil poli maRaiyOr * siRupuliyUrch salasayanaththu * uruvak kuRaL aDigaL * aDi uNarmin uNarvIrE",
            3: "paRaiyum vinai thozhudhu uymin nIr * paNiyum siRu thoNDIr! * aRaiyum punal orupAl * vayal orupAl pozhil orupAl *** siRai vaNDinam aRaiyum * siRupuliyUrch salasayanaththu uRaiyum * iRai aDi alladhu * onRu iRaiyum aRiyEnE",
            4: "vAnAr madhi podhiyum saDai * mazhuvALiyoDu orupAl * thAn Agiya thalaivan avan * amararkku adhipadhiyAm *** thEnAr pozhil thazhuvum * siRupuliyUrch salasayanaththu An Ayanadhu * aDi alladhu * onRaRiyEn aDiyEnE",
            5: "nandhA neDu naragaththiDai * naNugA vagai * nALum endhAy! ena * imaiyOr thozhudhEththum iDam *** eRi nIrch senthAmarai malarum * siRupuliyUrch salasayanaththu * anthAmarai aDiyAy! * unadhu aDiyERku aruL puriyE",
            6: "muzhu nIlamum malar Ambalum * aravindhamum viravi * kazhunIroDu maDavAr avar * kaN vAy mugam alarum *** sezhunIr vayal thazhuvum * siRupuliyUrch salasayanam * thozhu nIrmaiyadhu uDaiyAr * aDi thozhuvAr thuyar ilarE",
            7: "🙏 sEy Onggu * thaN thirumAlirunjchOlai malai uRaiyum mAyA! * enakku uraiyAy idhu * maRai nAnkin uLAyO? *** thI Ombu kai maRaiyOr * siRupuliyUrch salasayanaththu AyO? * unadhu aDiyAr manaththAyO? * aRiyEnE",
            8: "mai Ar vari nIlam * malark kaNNAr manam viTTiTTu * uyvAn una kazhalE * thozhudhu ezhuvEn kiLi maDavAr *** sevvAy mozhi payilum * siRupuliyUrch salasayanaththu * aivAy aravaNai mEl * uRai amalA! aruLAyE",
            9: "🙏 karu mA mugil uruvA! * kanal uruvA! punal uruvA! * peru mAl varai uruvA! * piRa uruvA! ninadhuruvA! *** thirumAmagaL maruvum * siRupuliyUrch salasayanaththu * arumAkaDal amudhE! * unadhu aDiyE saraNAmE",
            10: "🙏 sIrAr neDu maRugil * siRupuliyUrch salasayanaththu * ErAr mugilvaNNan thanai * imaiyOr perumAnai *** kArAr vayal manggaikku iRai * kaliyan oli mAlai * pArAr ivai paravith thozhap * pAvam payilAvE",
            11: "aDivaravu: kaLLam theruvil * paRaiyum vAn * nandhA muzhu * sEyOnggu maiyAr * karu sIrAr perumpuRam",

        },
        'PTM.7.10.steps': {
            1: "🙏 perumpuRakkaDalai aDal ERRinaip * peNNai ANai * eNNil munivarkku aruL tharum thavaththai muththin thiraL kOvaiyaip * paththar Aviyai niththilath thoththinai *** arumbinai alarai aDiyEn manaththu Asaiyai * amudham podhi insuvai * karumbinaik kaniyaich senRu nADik * kaNNamanggaiyuL kaNDu koNDEnE",
            2: "meynnalath thavaththaith thivaththaith tharum * meyyaip poyyinaik kaiyil Or sangguDai * mainniRak kaDalaik kaDal vaNNanai * mAlai Alilaip paLLi koL mAyanai *** nennalaip pagalai iRRai nALinai * nALaiyAy varum thinggaLai ANDinai * kannalaik karumbiniDaith thERalaik * kaNNamanggaiyuL kaNDu koNDEnE",
            3: "enggaLukku aruL seyginRa Isanai * pangganai * panggil vaiththu ugandhAn thannaip * pAnmaiyaip pani mAmadhiyam thavazh *** manggulaich suDarai vaDa mAmalai uchchiyai * kanggulai * pagalaich senRu nADik * kaNNamanggaiyuL kaNDu koNDEnE",
            4: "pEy mulaiththala nanjchu uNDa piLLaiyaith * theLLiyAr vaNanggappaDum dhEvanai * mAyanai madhiL kOval iDaikazhi maindhanai * Isanai *** ilanggum suDarch sOdhiyai * endhaiyai enakku eyppinil vaippinai * kAsinai maNiyaich senRu nADik * kaNNamanggaiyuL kaNDu koNDEnE",
            5: "🙏 ERRinai imayaththuL em Isanai * immaiyai maRumaikku marundhinai * aiyanaik * kaiyil Azhi onRu Endhiya kURRinai *** kuru mAmaNik kunRinai * ninRavUr ninRa niththilath thoththinai * kARRinaip punalaich senRu nADik *** kaNNamanggaiyuL kaNDu koNDEnE",
            6: "thOnRalaich * suDar vAn kalan peydhadhOr seppinai * thirumanggai maNALanaith * oppanai *** ulagEzhinai Uzhiyai * kaRpinai * kazhunIr malarum vayal * kaNNamanggaiyuL kaNDu koNDEnE",
            7: "thiruththanaith thisai nAnmugan thandhaiyaith * viruththanai * viLanggum suDarch sOdhiyai * aruththanai *** ariyaip pari kIRiya appanai * appil Ar azhalAy ninRa karuththanai * kaLi vaNDaRaiyum pozhil * kaNNamanggaiyuL kaNDu koNDEnE",
            8: "venjchinak kaLiRRai viLanggAy vizhak * kanRu vIsiya Isanai * pEy magaL thunjcha nanjchu suvaiththu uNDa thOnRalaith * nanjchinai *** amudhaththinai nAdhanai * nachchuvAr uchchi mEl niRkum nambiyai * kanjchanaith thunjcha vanjchiththa vanjchanaik * kaNNamanggaiyuL kaNDu koNDEnE",
            9: "paNNinaip paNNil ninRadhOr pAnmaiyaip * viNNinai * viLanggum suDarch sOdhiyai * vELviyai viLakkin oLi thannai *** maNNinai malaiyai alai nIrinai * kaNNinai * kaNgaL AraLavum ninRu * kaNNamanggaiyuL kaNDu koNDEnE",
            10: "🙏 kaNNamanggaiyuL kaNDu koNDEn enRu * kAdhalAl kalikanRi urai seydha * vaNNa oNthamizh onbadhODu onRivai * vallarAy uraippAr madhiyam thavazh *** viNNil viNNavarAy magizhvu eydhuvar * kaNNa! * ninthanakkum kuRippAgil kaRkalAm * kaviyin poruL thAnE",
            11: "aDivaravu: peru * mey enggaLukku * pEy ERRinai * thuppanai thiruththanai * venjchinam paNNinai kaNNamanggaiyuL silai",
        },

    };
    // Non-destructive runtime merging engine

    for (const key in text_bundle_en) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key]|| [];
        for (const p in text_bundle_en[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || { };
            window.MARKER_DATABASE[key][idx]['text']['en'] = text_bundle_en[key][p];
        }
    }
};
