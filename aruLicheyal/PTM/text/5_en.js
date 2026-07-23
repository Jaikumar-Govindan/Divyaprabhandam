window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PTM.5.1.steps':
        {
            1: "* aRivadhariyAn anaiththulagum udaiyAn * ennai ALudaiyAn *kuRiya mANi uruvAya * kUththan manni amarumidam *naRiya malar mEl surumbArkka * ezhilAr magyai nadamAda *poRi koL siRai vaNdu isai pAdum * puLLam bUdhangudi thAnE *",
            2: "kaLLak kuRaLAy mAvaliyai vanjiththu * ulagam kaippaduththu *poLLaik karaththa pOdhagaththin * thunbam thavirththa punidhanidam *paLLach cheRuvil kayal ugaLap * pazhanak kazhani adhanuL pOy *puLLup piLLaikku irai thEdum * puLLam bUdhangudi thAnE *",
            3: "mEvA arakkar thennilangai * vEndhan vIyach charam thurandhu *mAvAy piLandhu malladarththu * marudham sAyththa mAladhidam *kAvAr thengin pazham vIzhak * kayalgaL pAyak kurugiriyum*pUvAr kazhani ezhilArum * puLLam bUdhangudi thAnE *",
            4: "veRpAl mAri pazhudhAkki * viRal vAL arakkar thalaivan than *vaRpAr thiraL thOL ainnAngum * thuNiththa valvil irAmanidam *kaRpAr purisai seygunRam * kavinAr kUdam mALigaigaL *poRpAr mAdam ezhilArum * puLLam bUdhangudi thAnE *",
            5: "maiyAr thadangaN karungUndhal * Aychchi maRaiya vaiththa thayir *neyyAr pAlOdu amudhu seydha * nEmi angai mAyanidam *seyyAr Aral irai karudhich * chengAl nArai senRaNaiyum *poyyA nAvin maRaiyALar * puLLam bUdhangudi thAnE *",
            6: "minnin anna nuNmarungul * vEyEy thadanthOL melliyaRkA *mannu sinaththa mazha vidaigaL * Ezh anRadarththa mAladhidam *mannu mudhunIr aravindha malar mEl * varivaNdu isai pAda *punnai ponnEy thAdhudhirkkum * puLLam bUdhangudi thAnE *",
            7: "kudaiyA vilangal koNdu Endhi * mAri pazhudhu Anirai kAththu *sadaiyAn Oda adal vANan * thadandhOL thuNiththa thalaivanidam *kudiyA vaNdu kaLLuNNak * kOla neelam mattugukkum *pudaiyAr kazhani ezhilArum * puLLam bUdhangudi thAnE *",
            8: "kaRaiyAr neduvEl maRamannar vIya * visayan thEr kadavi *iRaiyAn kaiyil niRaiyAdha * muNdam niRaiththa endhaiyidam *maRaiyAl muththI avai vaLarkkum * mannu pugazhAl vaNmaiyAl *poRaiyAl mikka andhaNar vAzh * puLLam bUdhangudi thAnE *",
            9: "thunni maNNum viNNAdum * thOnRAdhu iruLAy mUdiya nAL *annamAgi arumaRaigaL * aruLich cheydha amalanidam *minnu sOdhi navamaNiyum * vEyin muththum sAmaraiyum *ponnum ponni koNarndhu alaikkum * puLLam bUdhangudi thAnE *",
            10: "* kaRRA maRiththu kALiyan than * senni nadunga nadam payinRa *poRRAmaraiyAL than kELvan * puLLam bUdhangudi than mEl *kaRRAr paravum mangaiyar kOn * kArAr puyaRkaik kalikanRi *sol thAn Iraindhu ivai pAdach * chOra nillA thuyar thAmE *",
            11: "adivaravu: aRivadhu kaLLam * mEvA veRpAl * maiyAr minnin * kudai kaRai * thunni kaRRA thAm *",
        },
        'PTM.5.2.steps':
        {
            1: "* thAm tham perumai aRiyAr * thUdhuvEndharkkAya * vEndhar Ur pOl *kAndhaL viral * men kalai nanmadavAr *kUndhal kamazhum * kUdalUrE *",

            2: "seRunthiN thimil ERudaiya * pinnaipeRunthaN kOlam * peRRAr Ur pOl *naRundhaN thIm * thEn uNda vaNdu *kuRinji pAdum * kUdalUrE  *",
            3: "piLLai uruvAyth thayir uNdu * adiyEnuLLam pugundha * oruvar Ur pOl *kaLLa nArai vayaluL * kayal mInkoLLai koLLum * kUdalUrE  *",
            4: "kURREr uruvin kuRaLAy * nilam nIrERRAn endhai * perumAn Ur pOl *sERREr uzhavar * kOdhaip pOdhUN *kOl thEn muralum * kUdalUrE *",
            5: "thoNdar paravach * chudar senRu aNava *aNdaththu amarum * adigaL Ur pOl *vaNdal alaiyuL * keNdai miLira *koNdal adhirum * kUdalUrE  *",
            6: "thakkan vELvi * thagarththa thalaivan *thukkam thudaiththa * thuNaivar Ur pOl *ekkalidu * nuNmaNal mEl * engumkokkin pazham vIzh * kUdalUrE *",
            7: "karundhaN kadalum * malaiyum ulagum *arundhum adigaL * amarum Ur pOl *perundhaN mullaip * piLLai Odi *kurundham thazhuvum * kUdalUrE *",
            8: "kalaivAzh piNaiyOdu aNaiyum * thirunIrmalai vAzh endhai * maruvum Ur pOl *ilai thAzh thengin mEl ninRu * iLanIrkkulai thAzh kidangin * kUdalUrE *",
            9: "perugu kAdhal adiyEn * uLLamurugap pugundha * oruvar Ur pOl *arugu kaidhai malara * keNdaikurugenRu anjum * kUdalUrE *",
            10: "* kAvip perunIr vaNNan * kaNNanmEvith thigazhum * kUdalUr mEl *kOvaith thamizhAl * kaliyan sonna *pAvaip pAdap * pAvam pOmE *",
            11: "adivaravu:thAm seRum * piLLai kURREr * thoNdar thakkan * karundhaN kalai * perugu kAvi venRi * ",
        },
        'PTM.5.3.steps':
        {
            1: "* venRi mAmazhu Endhi mun maN misai mannarai * mUvezhukAlkonRa dhEva! * nin kurai kazhal thozhuvadhOr vagai * enakku aruL puriyE *manRil mAmbozhil nuzhai thandhu * malligai mauvalin pOdhu alarththi *thenRal mAmaNam kamazh thara varu * thiruveLLaRai ninRAnE! *",
            2: "vasaiyil nAnmaRai keduththa ammalar ayaRku aruLi * mun parimugamAy *isaikoL vEdha nUl enRivai payandhavanE! * enakku aruL puriyE *uyar koL mAdhavip pOdhodu ulAviya * mArudham vIdhiyin vAy *thisai ellAm kamazhum pozhil sUzh * thiruveLLaRai ninRAnE! *",
            3: "veyyanAy ulagEzhudan nalindhavan * udalagam iru piLavA *kaiyil nIL ugirp padaiyadhu vAyththavanE! * enakku aruL puriyE *maiyinAr tharuvarAlinam pAya * vaN thadaththidaik kamalangaL *dheyva nARum oN poygaigaL sUzh * thiruveLLaRai ninRAnE ! *",
            4: "vAmbariyuga mannar tham uyir sega * aivargatku arasaLiththa *kAmbinAr thiruvEngadap poruppa! * nin kAdhalai aruL enakku *mAmbozhil thaLir kOdhiya madakkuyil * vAyadhu thuvarppeydha *thImbalanganith thEnadhu nugar * thiruveLLaRai ninRAnE! *",
            5: "mAnavEl oN kaN madavaral * maNmagaL azhunga munnIrp parappil *EnamAgi anRu iru nilam idandhavanE! * enakku aruL puriyE *kAna mAmullai kazhaik karumbu ERi * veNmuRuval seydhu alarginRa *thEnin vAy malar murugu ugukkum * thiruveLLaRai ninRAnE! *",
            6: "pongu nINmudi amarargaL thozhudhu ezha * amudhinaik koduththaLippAn *angu Or Amai adhAgiya Adhi! * nin adimaiyai aruL enakku *thangu pEdaiyOdu Udiya madhugaram * thaiyalAr kuzhal aNaivAn *thingaL thOy senni mAdam senRaNai * thiruveLLaRai ninRAnE! *",
            7: "ARinOdu oru nAngudai nedu mudi * arakkan than siram ellAm *vERu vERuga villadhu vaLaiththavanE! * enakku aruL puriyE *mARil sOdhiya maradhagap pAsadaith * thAmarai malar vArndha *thERal mAndhi vaNdu innisai mural * thiruveLLaRai ninRAnE! *",
            8: "mun ivvEzhulagu uNarvinRi iruL miga * umbargaL thozhudhEththa *annamAgi anRu arumaRai payandhavanE! * enakku aruL puriyE *mannu kEdhagai sUdhagam enRivai * vanaththidaich churumbu inangaL *thennavenRu vaNdu innisai mural * thiruveLLaRai ninRAnE! *",
            9: "Angu mAvali vELviyil irandhu senRu * agalidam muzhudhinaiyum *pAnginAl koNda parama! niRpaNindhu ezhuvEn * enakku aruL puriyE *Ongu piNdiyin semmalar ERi * vaNdu uzhidhara * mAvERiththInguyil mizhaRRum padappai * thiruveLLaRai ninRAnE!  *",
            10: "* manjulA maNi mAdangaL sUzh * thiruveLLaRai adhan mEya *anjanam puraiyum thiru uruvanai * Adhiyai amudhaththai *nanju ulAviya vEl valavan * kaliganRi sol aiyiraNdum *enjal inRi ninRu ERRa vallAr * imaiyOrkku arasu AvargaLE. *",
            11: "adivaravu:venRi vasai * veyya vAmbari * mAnavEl pongu * ARu mun * Angu manju undhimEl *",
        },
        'PTM.5.4.steps':
        {
            1: "* undhi mEl nAnmuganaip padaiththAn * ulagu uNdavanendhai pemmAn * imaiyOrgaL thAdhaikku * idam enbarAl *sandhinOdu maNiyum kozhikkum * punal kAviri *andhi pOlum niRaththAr vayal sUzh * thennarangamE *",
            2: "vaiyam uNdu Alilai mEvum mAyan * maNi nIL mudi *paigoL nAgaththaNaiyAn * payilum idam enbarAl *thaiyal nallAr kuzhal mAlaiyum * maRRavar thadamulai *seyya sAndhum kalandhizhi punal sUzh * thennarangamE *",
            3: "paNdu ivvaiyam aLappAn senRu * mAvali kaiyil nIrkoNda * Azhith thadakkaik * kuRaLan idam enbarAl *vaNdu pAdum madhuvAr punal * vandhizhi kAviri *aNda nARum pozhil sUzhndhu * azhagAr thennarangamE *",
            4: "viLaiththa vembOr viRal vALarakkan * nagar pAzhpada *vaLaiththa valvil thadakkai avanukku * idam enbarAl *thuLaikkai yAnai maruppum agilum * koNarndhu undhi * munthiLaikkum selvap punal kAviri sUzh * thennarangamE *",
            5: "vambulAm kUndhal maNdOdhari kAdhalan * vAn puga *ambu thannAl munindha * azhagan idam enbarAl *umbar kOnum ulagEzhum * vandhINdi vaNangum * nalsembonArum madhiL sUzhndhu * azhagAr thennarangamE *",
            6: "kalai uduththa agalalgul * van pEy magaL thAyena *mulai koduththAL uyir uNdavan * vAzhidam enbarAl *kulai eduththa kadhalip * pozhilUdum vandhu undhi * munalai edukkum punal kAviri sUzh * thennarangamE *",
            7: "kanjan nenjum kadu mallarum * sagadamum kAlinAl *thunja venRa sudar AzhiyAn * vAzhidam enbarAl *manju sEr mALigai * nIdu agil pugaiyum * maRaiyOrsenjol vELvip pugaiyum kamazhum * thennarangamE *",
            8: "Enam mIn AmaiyOdu * ariyum siRu kuRaLumAy *thAnumAya * tharaNith thalaivan idam enbarAl *vAnum maNNum niRaiyap * pugundhu INdi vaNangum * nalthEnum pAlum kalandhu annavar sEr * thennarangamE *",
            9: "sEyan enRum migap periyan * nuN nErmaiyinAya * immAyai yArum aRiyA vagaiyAn * idam enbarAl *vEyin muththum maNiyum koNarndhu * Ar punal kAviri *Aya pon mAmadhiL sUzhndhu * azhagAr thennarangamE *",
            10: "* alli mAdhar amarum * thirumArvan arangaththai *kallin mannu madhiL * mangaiyar kOn kali kanRi sol *nallisai mAlaigaL * nAliraNdum iraNdum udan *vallavar thAm ulagANdu * pin vAnulagu ALvarE *",
            11: "adivaravu:undhimEl vaiyam * paNdu viLaiththa * vambu kalai * kanjan Enam * sEyan alli veruvAdhAL * ",
        },
        'PTM.5.5.steps':
        {
            1: "* veruvAdhAL vAy veruvi * vEngadamE! vEngadamE! enginRALAl *maruvALAl en kudangAl * vAL nedungaNthuyil maRandhAL * vaNdAr koNdaluruvALan vAnavar tham uyirALan *oli thirai nIrp pauvam koNdathiruvALan * en magaLaich cheydhanagaL *enganam nAn sindhikkEnE?  *",
            2: "kalaiyALA agalalgul * kanavaLaiyum kaiyALA en seygEn nAn? *vilaiyALA adiyEnai * vENdudhiyO?vENdAyO? ennum * meyyamalaiyALan vAnavar tham thalaiyALan *marAmaram Ezh eydha venRichchilaiyALan * en magaLaich cheydhanagaL *enganam nAn sindhikkEnE?  *",
            3: "mAnAya mennOkki * vAL nedungaN nIr malgum vaLaiyum sOrum *thEnAya naRundhuzhAy alangalin *thiRam pEsi uRangAL kANmin *kAnAyan kadi manaiyil thayir uNdu ney paruga * nandhan peRRaAnAyan * en magaLaich cheydhanagaL *ammanaimIr! aRigilEnE  *",
            4: "thAy vAyil sol kELAL * than AyaththOdu aNaiyAL thadamen kongaiyE * Arach chAndhu aNiyAL * emperumAnthiruvarangam engE? ennum *pEy mAya mulai uNdu ivvulagu uNdaperu vayiRRan * pEsil nangAy! *mAmAyan en magaLaich cheydhanagaL *mangaimIr! madhikkilEnE  *",
            5: "pUN mulai mEl sAndhaNiyAL * poru kayal kaN mai ezhudhAL pUvai pENAL *ENaRiyAL eththanaiyum * emperumAn thiruvarangam engE ? ennum *nANmalarAL nAyaganAy * nAmaRiya AyppAdi vaLarndha nambi *ANmaganAy en magaLaich cheydhanagaL *ammanaimIr! aRigilEnE  *",
            6: "thAdhAdu vana mAlai * thArAnO?enRenRE thaLarndhAL kANmin *yAdhAnum onRu uraikkil * emperumAn thiruvarangam ennum * pUmElmAdhALan kudamAdi madhusUdhan *mannarkkAy munnam senRathUdhALan * en magaLaich cheydhanagaL *enganam nAn sollugEnE?  *",
            7: "vArALum iLangongai * vaNNamvERAyinavARu eNNAL * eNNilpErALan pErallAl pEsAL * ippeN peRREn en seygEn nAn? *thArALan thaN kudandhai nagarALan *aivarkkAy amaril uyththathErALan * en magaLaich cheydhanagaL *enganam nAn seppugEnE?  *",
            8: "uRavAdhum ilaL enRu * ozhiyAdhu palar Esum alar AyiRRAl *maRavAdhE eppozhudhum * mAyavanE! mAdhavanE! enginRaLAl *piRavAdha pErALan peNNALan maNNALan * viNNOr thangaLaRavALan * en magaLaich cheydhanagaL *ammanaimIr! aRigilEnE  *",
            9: "pandhOdu kazhal maruvAL * paingiLiyumpAlUttAL pAvai pENAL *vandhAnO! thiruvarangan * vArAnO!enRenRE vaLaiyum sOrum *sandhOgan pauzhiyan ainthazhal Ombu *thaiththiriyan sAma vEdhi *andhO! vandhu en magaLaich cheydhanagaL *ammanaimIr! aRigilEnE  *",
            10: "* sElugaLum vayal pudai sUzh * thiruvarangaththu ammAnaich chindhai seydha *neela malarkkaN madavAL niRai azhivaith *thAy mozhindha adhanai * nErArkAla vEl parakAlan * kalikanRioli mAlai kaRRu vallAr *mAlai sEr veN kudaik kIzh mannavarAyp *ponnulagil vAzhvar thAmE  *",
            11: "adivaravu: veruvAdhAL kalai * mAn thAy * pUN thAdhAdu * vArALum uRavu * pandhOdu sEl kaimmAnam *",
        },
        'PTM.5.6.steps':
        {
            1: "* kaimmAna mazhakaLiRRaik * kadal kidandha karumaNiyai *maimmAna maradhagaththai * maRai uraiththa thirumAlai *emmAnai enakku enRum iniyAnaip * panikAththaammAnai * yAn kaNdadhu * aNinIrth thennarangaththE *",
            2: "* pErAnaik * kuRungudi emperumAnai * thiruththaNkAlUrAnaik * karambanUr uththamanai * muththilangukArAr thiN kadal Ezhum * malai Ezhu ivvulagEzhu uNdum *ArAdhenRu irundhAnaik * kaNdadhu thennarangaththE *",
            3: "EnAgi ulagidandhu * anRu irunilanum peru visumbum *thAnAya perumAnaith * thannadiyAr manaththu enRum *thEnAgi amudhAgith * thigazhndhAnai magizhndhu orugAl *AnAyan AnAnaik * kaNdadhu thennarangaththE  *",
            4: "vaLarndhavanaith thadangadaluL * valiyuruvil thirisagadam *thaLarndhu adhira udhaiththavanaith * thariyAdhu anRu iraNiyanaippiLandhavanai * perunilam Iradi nIttip * paNdu oru nALaLandhavanai * yAn kaNdadhu * aNinIrth thennarangaththE *",
            5: "nIr azhalAy nedu nilanAy * ninRAnai * anRu arakkanUr azhalAl uNdAnaik * kaNdAr pin kANAmE *pErazhalAyp peruvisumbAyp * pin maRaiyOr mandhiraththin *ArazhalAl uNdAnaik * kaNdadhu thennarangaththE *",
            6: "than sinaththaith thavirththu adaindhAr * thava neRiyai * thariyAdhukanjanaik konRu * anRu ulagam uNdu umizhndha kaRpagaththai *venjinaththa kodum thozhilOn * visai uruvai asaiviththa *anjiRaip puL pAganai * yAn kaNdadhu thennarangaththE *",
            7: "* sindhanaiyaith thava neRiyaith * thirumAlai * piriyAdhuvandhu enadhu manaththu irundha * vadamalaiyai * varivaNdArkondhaNaindha pozhil kOval * ulagaLappAn adi nimirththaandhaNanai * yAn kaNdadhu * aNinIrth thennarangaththE *",
            8: "thuvariththa udaiyavarkkum * thUymai illAch chamaNarkkum *avargatku angu aruLillA * aruLAnai * thannadaindhaemargatkum adiyERkum * emmARkum emmanaikkum *amararkkum pirAnAraik * kaNdadhu thennarangaththE *",
            9: "poy vaNNam manaththu agaRRip * pulan aindhum sela vaiththu *mey vaNNam ninaindhavarkku * mey ninRa viththaganai *maivaNNam karumugil pOl * thigazh vaNNam maradhagaththin *avvaNNa vaNNanai * yAn kaNdadhu thennarangaththE *",
            10: "* Amaruvi nirai mEyththa * aNi arangaththu ammAnai *kAmaru sIrk kalikanRi * oli seydha malipugazh sEr *nAmaruvu thamizh mAlai * nAliraNdOdu iraNdinaiyum *thAmaruvi vallAr mEl * sArA thIvinai thAnE  *",
            11: "adivaravu: kaimmAnam pErAnai * EnAgi vaLarndhavanai * nIr tham * sindhanai thuvariththa * pOy Amaruvi paNdai *",
        },
        'PTM.5.7.steps':
        {
            1: "* paNdai nAnmaRaiyum vELviyum kELvippadhangaLum * padhangaLin poruLum *piNdamAy virindha piRangoLi analum *perugiya punalodu nilanum *koNdal mArudhamum kurai kadal Ezhum *EzhumA malaigaLum visumbum *aNdamum thAnAy ninRa emperumAn *arangamA nagar amarndhAnE  *",
            2: "indhiran piraman Isan enRu ivargaL *eNNil pal guNangaLE iyaRRa *thandhaiyum thAyum makkaLum mikkasuRRamum * suRRi ninRu agalAppandhamum * pandham aRuppadhOr marundhumpAnmaiyum * palluyirkku ellAm *andhamum vAzhvum Aya emperumAn *arangamA nagar amarndhAnE  *",
            3: "maNNum mAnilanum malaigaLum kadalum *vAnamum dhAnavar ulagum *thunnu mAyiruLAyth thulangoLi surungith *thollai nAnmaRaigaLum maRaiya *pinnum vAnavarkkum munivarkkum nalgip *piRangiruL niRam keda * oru nALannamAy anRangu arumaRai payandhAn *arangamA nagar amarndhAnE  *",
            4: "mAyirum kunRam onRu maththAga *mAsuNam adhanOdum aLavi *pAyirum pauvam pagadu viNdalaRap *padu thirai visumbidaip padara *sEyiru visumbum thingaLum sudarum *dhEvarum thAmudan thisaippa *Ayiram thOLAl alai kadal kadaindhAn *arangamA nagar amarndhAnE  *",
            5: "enganE uyvar? dhAnavar ninaindhAl *iraNiyan ilangu pUN agalam *pongu vengurudhi pon malai piLandhu *pozhi tharum aruvi oththizhiya *vengaN vALeyiRROr veLLimA vilangal *viNNuRak kanal vizhiththu ezhundhadhu *anganE okka ari uruvAnAn *arangamA nagar amarndhAnE  *",
            6: "Ayiram kunRam senRu thokkanaiya *adal purai ezhil thigazh thiraL thOL *Ayiram thuNiya adal mazhup paRRi *maRRavan agal visumbu aNaiya *Ayiram peyarAl amarar senRu iRainja *aRi thuyil alai kadal naduvE *Ayiram sudar vAy aravaNaith thuyinRAn *arangamA nagar amarndhAnE  *",
            7: "suri kuzhal kanivAyth thiruvinaip piriththa *kodumaiyil kaduvisai arakkan *eri vizhiththu ilangu maNi mudi podi seydhu *ilangai pAzh paduppadhaRku eNNi *vari silai vaLaiya adusaram thurandhu *maRi kadal neRi pada * malaiyAlarikulam paNi koNdu alai kadal adaiththAn *arangamA nagar amarndhAnE  *",
            8: "* UzhiyAy Omaththu uchchiyAy * orugAludaiya thEr oruvanAy * ulagilsUzhimAl yAnaith thuyar keduththu * ilangaimalanga anRu adusaram thurandhu *pAzhiyAl mikka pArththanukku aruLip *pagalavan oLi keda * pagalEAzhiyAl anRangu Azhiyai maRaiththAn *arangamA nagar amarndhAnE  *",
            9: "pEyinAr mulaiyUN piLLaiyAy * orugAlperu nilam vizhungi adhu umizhndhavAyanAy * mAlAy Alilai vaLarndhu *maNi mudi vAnavar thamakkuchchEyanAy * adiyERku aNiyanAy vandhu *en sindhaiyuL vendhuyar aRukkum *AyanAy anRu kunRam onRu eduththAn *arangamA nagar amarndhAnE  *",
            10: "* ponnum mAmaNiyum muththamum sumandhu *porudhirai mAnadhi pudai sUzhndhu *annamAdu ulavum alai punal sUzhndha *arangamA nagar amarndhAnai *mannu mAmAda mangaiyar thalaivan *mAnavEl kaliyan vAy oligaL *panniya panuval pAduvAr * nALumpazhavinai paRRu aRuppArE  *",
            11: "adivaravu: paNdai indhiran * mannu mAyirum * enganE Ayiram * suri Uzhi * pEyinAr ponnum Ezhai *",
        },
        'PTM.5.8.steps':
        {
            1: "* Ezhai Edhalan kIzh magan ennAdhuirangi * maRRavaRku innaruL surandhu *mAzhai mAn mada nOkki un thOzhi *umbi embi enRozhindhilai * ugandhuthOzhan nI enakku ingozhi enRasoRkaL vandhu * adiyEn manaththu irundhida *Azhi vaNNa! nin adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            2: "vAdha mAmagan maRkadam vilangu *maRROr sAdhi enRozhindhilai * ugandhukAdhal Adharam kadalinum perugach * cheythagavinukku illai kaimmARu enRu *kOdhil vAymaiyinAyodum udanE *uNban nAn enRa ONporuL * enakkumAdhal vEndum enRu adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            3: "kadigoL pUmbozhil kAmaru poygai *vaigu thAmarai vAngiya vEzham *mudiyum vaNNam Or muzhuvali mudhalaipaRRa * maRRadhu nin charaN ninaippa *kodiya vAy vilanginnuyir malangak *koNda sIRRam onRuNduLadhaRindhu * unadiyanEnum vandhu adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            4: "nanju sOrvadhOr venjina aravam *veruvi vandhu nin charaN enach charaNA *nenjil koNdu nin anjiRaip paRavaikku *adaikkalam koduththu aruL seydhadhu aRindhu *venjolALargaL naman thamar kadiyar *kodiya seyvanavuLa * adhaRku adiyEnanji vandhu nin adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            5: "mAga mAnilam muzhuvadhum vandhu iRainjum *malaradi kaNda mAmaRaiyALan *thOgai mAmayil annavar inbam *thuRRilAmaiyil aththa! ingu ozhindhu *bOgam nI eydhip pinnum nammidaikkE *pOdhuvAy enRa ponnaruL * enakkumAga vENdum enRu adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            6: "mannu nAnmaRai mAmuni peRRamaindhanai * madhiyAdha vengURRamthannai anji * nin charaN enach charaNAyth *thagavil kAlanaiyuga munindhozhiyA *pinnai enRum nin thiruvadi piriyA vaNNam *eNNiya pEraruL * enakkumannadhu Agum enRu adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            7: "Odhu vAymaiyum uvaniyap piRappum *unakku mun thandha andhaNan oruvan *kAdhal en magan pugalidam kANEn *kaNdu nI tharuvAy enakku enRu *kOdhil vAymaiyinAn unai vENdiya *kuRai mudiththu avan siRuvanaik koduththAy *AdhalAl vandhu un adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            8: "vEdha vAymozhi andhaNan oruvan *endhai! nin charaN ennudai manaivi *kAdhal makkaLaip payaththalum kANAL *kadiyadhOr dheyvam koNdoLikkum enRazhaippa *EdhalAr munnE innaruL avaRkuchcheydhu * un makkaL maRRivar enRu koduththAy *AdhalAl vandhu un adiyiNai adaindhEn *aNipozhil thiruvarangaththammAnE!  *",
            9: "* thuLangu nINmudi arasar tham kurisil *thoNdai mannavan thiN thiRal oruvaRku *uLangoL anbinOdu innaruL surandhu *angOdu nAzhigai Ezhudan iruppa *vaLangoL mandhiram maRRavaRku aruLichseydhavARu * adiyEn aRindhu * ulagamaLandha ponnadiyE adaindhu uyndhEn *aNipozhil thiruvarangaththammAnE!  *",
            10: "* mAdamALigai sUzh thirumangaimannan * onnalar thangaLai vellum *AdalmA valavan kali kanRi *aNipozhil thiruvarangaththammAnai *nIdu thol pugazhAzhi vallAnai *endhaiyai nedumAlai ninaindha *pAdal paththivai pAdumin thondIr! *pAda nummidaip pAvam nillAvE  *",
            11: "adivaravu:Ezhai vAdham  * kadi nanju  * mAgam mannu * Odhu vEdham * thuLangu mAdam kai *",
        },
        'PTM.5.9.steps':
        {
            1: "* kaiyilangu Azhi sangan * karumugil thiruniRaththan *poyyilan meyyan than thAL * adaivarEl adimai Akkum *seyyalar kamalam Ongu * seRi pozhil then thiruppEr *paiyaravaNaiyAn nAmam * paravi nAn uyndhavARE! *",
            2: "vangamAr kadalgaL Ezhum * malaiyum vAnagamum maRRum *angaNmA gyAlam ellAm * amudhu seydhu umizhndha endhai *thingaL mAmugil aNavu * seRi pozhil then thiruppEr *engaL mAl iRaivan nAmam * Eththi nAn uyndhavARE! *",
            3: "oruvanai undhippU mEl * Onguviththu Agam thannAl *oruvanaich chAbam nIkki * umbar AL enRu vittAn *peruvarai madhiLgaL sUzhndha * perunagar aravaNai mEl *karuvarai vaNNan thenpEr * karudhi nAn uyndhavARE! *",
            4: "Unamar thalai onRu Endhi * ulagelAm thiriyum Isan *Inamar sAbam nIkkAy enna * oN punalai IndhAn *thEnamar pozhilgaL sUzhndha * seRivayal then thiruppEr *vAnavar thalaivan nAmam * vAzhththi nAn uyndhavARE! *",
            5: "vakkaran vAy mun kINda * mAyanE! enRu vAnOrpukku * araN thandhu aruLAy ennap * pon AgaththAnai *nakkari uruvamAgi * nagam kiLarndhu idandhu ugandha *sakkarach chelvan thenpErth * thalaivan thAL adaindhu uyndhEnE *",
            6: "vilangalAl kadal adaiththu * viLangizhai poruttu * villAlilangai mAnagarkku iRaivan * irupadhu puyam thuNiththAn *nalangoL nAnmaRai vallArgaL * Oththoli Eththak kEttu *malangu pAy vayal thiruppEr * maruvi nAn vAzhndhavARE! *",
            7: "veNNey thAn amudhu seyya * veguNdu maththAychchi Ochchi *kaNNiyar kuRungayiRRAl * katta vettenRu irundhAn *thiNNamA madhiLgaL sUzhndha * then thiruppEruL * vElaivaNNanAr nAma nALum * vAy mozhindhu uyndhavARE! *",
            8: "amponAr ulagam Ezhum aRiya * AyppAdi thannuL *kombanAr pinnai kOlam * kUdudhaRku ERu konRAn *semponAr madhiLgaL sUzhndha * then thiruppEruL mEvum *empirAn nAmam nALum * Eththi nAn uyndhavARE!  *",
            9: "nAl vagai vEdham aindhu vELvi * ARangam vallAr *mElai vAnavaril mikka * vEdhiyar Adhi kAlam *sElugaL vayal thiruppErch * chengaN mAlOdum vAzhvAr *seelamA thavaththar sindhaiyALi * en sindhaiyAnE  *",
            10: "* vaNdaRai pozhil thiruppEr * vari aravaNaiyil paLLikoNdu * uRaiginRa mAlaik * kodi madhiL mAda mangai *thiN thiRal thOL kaliyan * senjolAl mozhindha mAlai *koNdivai pAdi Adak * kUduvar nIL visumbE  *",
            11: "adivaravu: kai vangam * oruvanai Un * vakkaran vilangalAl * veNNey ampon  * nAlvagai vaNdaRai thIdhaRu *",
        },
        'PTM.5.10.steps':
        {
            1: "* thIdhaRu nilaththodu eri kAlinodu * nIr kezhu visumbum avaiyAy *mAsaRu manaththinodu uRakkamodu iRakkai * avaiyAya perumAn *thAy seRa uLaindhu thayir uNdu kudamAdu * thadamArvar thagai sEr *nAdhan uRaiginRa nagar * nandhipura viNNagaram naNNu manamE! *",
            2: "uyyum vagaiyuNdu sona seyyil * ulagEzhum ozhiyAmai muna nAL *meyyin aLavE amudhu seyya vala * aiyan avan mEvu nagar thAn *maiya varivaNdu madhu uNdu kiLaiyOdu * malar kiNdi adhan mEl *naivaLam naviRRu pozhil * nandhipura viNNagaram naNNu manamE! *",
            3: "umbar ulagEzhu kadal Ezhu malai Ezhum * ozhiyAmai muna nAL *thambon vayiRAraLavum uNdu avai umizhndha * thadamArvar thagai sEr *vambu malarginRa pozhil paimbon varu thumbi maNi * kangul vayal sUzh *namban uRaiginRa nagar * nandhipura viNNagaram naNNu manamE! *",
            4: "piRaiyin oLi eyiRilaga muRugi edhir porudhumena * vandha asurar *iRaigaL avai neRu neRana veRiya avar vayiRazhala * ninRa perumAn *siRai koL mayil kuyil payila malargaL uga aLi murala * adikoL nedumA *naRai sey pozhil mazhai thavazhum * nandhipura viNNagaram naNNu manamE! *",
            5: "mULa eri sindhi muni eydhi amar seydhumena * vandha asurar *thOLum avar thALum mudiyOdu podiyAga * nodiyAmaLaveydhAn *vALum vari villum vaLai Azhi kadhai sangam * ivai angai udaiyAn *nALum uRaiginRa nagar * nandhipura viNNagaram naNNu manamE! *",
            6: "thambiyodu thAm oruvar than thuNaivi kAdhal * thuNaiyAga muna nAL *vembi eri kAnagam ulAvum avar thAm * inidhu mEvu nagar thAn *kombu kudhi koNdu kuyil kUva mayil Alum * ezhilAr puRavu sEr *nambi uRaiginRa nagar * nandhipura viNNagaram naNNu manamE! *",
            7: "thandhai manamundhu thuyar nandha iruL vandha viRal * nandhan madhalai *endhai ivan enRu amarar kandha malar koNdu thozha * ninRa nagar thAn *mandha muzhavOsai mazhaiyAga ezhu kAr * mayilgaL Adu pozhil sUzh *nandhi paNi seydha nagar * nandhipura viNNagaram naNNu manamE! *",
            8: "eNNil ninaiveydhi ini illai iRai enRu * muniyALar thiruvAr *paNNil mali gIdhamodu pAdi avar Adalodu * kUda ezhilAr *maNNil idhu pOla nagar illai ena * vAnavargaL thAm malargaL thUy *naNNi uRaiginRa nagar * nandhipura viNNagaram naNNu manamE! *",
            9: "vangamali pauvam adhu mAmugadin uchchi puga * mikka perunIr *angam azhiyAr avanadhu ANai thalai sUdum * adiyAr aRidhiyEl *pongu punal undhu maNi kangul iruL sIRum oLi * engum uLadhAl *nangaL perumAn uRaiyum * nandhipura viNNagaram naNNu manamE! *",
            10: "* naRai sey pozhil mazhai thavazhum * nandhipura viNNagaram naNNi uRaiyum *uRai koL pugar Azhi suri sangam * avai angai udaiyAnai * oLi sErkaRai vaLarum vEl valla * kaliyan oli mAlai ivai aindhum aindhum *muRaiyil ivai payila vala adiyavargaL koduvinaigaL * muzhudhagalumE *",
            11: "adivaravu : thIdhu uyyum * umbar piRai * mULa thambiyodu * thandhai eNNil * vangam naRaisey vaNdu",
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