window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PAT.4.1.steps': {
            1:"🙏 kadirAyiramiravi * kalanderittAlotta neeLmuDiyan * ediril perumaiirAmanai * irukkumiDam nADudirEl *** adirum kazhaRporutOL * iraNiyanagam piLandu * ariyAy-udiram aLainda kaiyODu irundAnai * uLLavA kaNDAruLar.",
            2:" nAndakam shanku taNDu * nANoli shArngam tiruch chakkaram * Endu perumai irAmanai * irukkumiDam nADudirEl *** kAndaL mugizh viral seedaikkagi * kaDunchilai senRiRukka * vEndartalaivan janakarAsantan * vELviyil kaNDAruLar.",
            3:" kolaiyAnai kombu paRittuk * kooDalar sEnai porudazhiya * silaiyAl marAmaram eyda dEvanai * chikkena nADudirEl *** talaiyAl kurakkinam tAngichchenRu * taDavarai koNDaDaippa * alaiyArkaDaRkarai veeRRirundAnai * anguttai kaNDAruLar.",
            4:" tOyam paranda naDuvu soozhalil * tollai vaDivu koNDa * mAya kuzhaviyadanai nADuRil * vammin suvaDuraikkEn *** Ayar maDamagaL pinnaikkAki * aDalviDai Ezhinaiyum * veeyapporudu viyarttu ninRAnai * meymmaiyE kaNDAruLar.",
            5:" neerERu senchaDai neela kaNDanum * nAnmuganum muRaiyAl * seerERu vAsakam seyya ninRa * tirumAlai nADutirEl *** vArERu kongai uruppiNiyai * valiyap piDittuk koNDu-tErERRi * sEnai naDuvu pOrseyya * chikkenak kaNDAruLar.",
            6:" pollA vaDivuDaip pEychchi tuNYcha * puNar mulai vAymaDukka-vallAnai * mAmaNi vaNNanai * maruvumiDam nADudirEl *** pallAyiram perundEvimAroDu * powvam ERituvarai * ellArum soozha singAsanattE * irundAnaik kaNDAruLar.",
            7:" veLLai viLi shaNGku veNYchuDar tiruch chakkaram * Endu kaiyan * uLLa iDam vinavil * umakku iRai vammin suvaDuraikkEn *** veLLaip puravik kurakku velkoDi * tErmisai munbu ninRu * kaLLappaDait tuNaiyagi * bAradam kai seyyak kaNDAruLar.",
            8:" nAzhihai kooRiTTuk kAttu ninRa * arasarkaL tammugappE * nAzhikai pOhap paDai porudavan * dEvagi tan siRuvan *** Azhi koNDu anRu iravi maRaippa * jayattiradan talaiyai * pAzhil uruLap paDai porudavan * pakkamE kaNDAruLar.",
            9:" maNNum malaiyum maRi kaDalhaLum * maRRum yAvum ellAm * tiNNam vizhungi umizhnda dEvanai * chikkena nADudirEl *** eNNaRkariyatOr Enamagi * irunilambuk kiDandu * vaNNak karuNGkuzhal mAdarODu * maNandAnaik kaNDAruLar.",
            10:"🙏 kariya mugil purai mEni mAyanai * kaNDa suvaDuraittu * puravi mugam seydu sennelOngi * viLai kazhanip puduvai *** tiruviR polimaRai vANan * paTTarpirAn sonna mAlai pattum * paravu manamuDaip pattaruLLAr * paraman aDi sErvargaLE.",
        },
        'PAT.4.2.steps': {
            1:"🙏 alambA veruTTA * konRu tiriyum arakkarai * kulam pAzh paDuttu * kula viLakkAy ninRakOn malai * silampArkka vandu * deyvamagaLirkaL ADumseer * silambARu pAyum * ten tirumAlirunchOlaiyE.",
            2:" vallALan tOLum * vALarakkan muDiyum * taNGgai-pollAda mookkum * pOkkuvittAn porundum malai * ellAviDattilum * eNGgum parandu * pallANDoli-sellA niRkum seer * ten tirumAlirunchOlaiyE.",
            3:" takkAr mikkArhaLai * chanchalam seyyum salavarai * tekkA neRiyE pOkkuvikkum * selvan ponmalai * ekkAlamum senRu * sEvittirukkum aDiyarai * akkAneRiyai mARRum * taN tirumAlirunchOlaiyE.",
            4:" AnAyar kooDi * amaitta vizhavai * amarartam-kOnArkku ozhiya * gOvarttanattu seydAn malai * vAnATTil ninRu * mAmalar kaRpaga tottizhi * tEnARu pAyum * ten tirumAlirunchOlaiyE.",
            5:" oru vAraNam paNi koNDavan * poyhaiyil * kanchantan-oru vAraNam uyir uNDavan * senRuRaiyum malai * karu vAraNam * tan piDi tuRandODa * kaDal vaNNan-tiruvANai kooRattiriyum * taN mAlirunchOlaiyE.",
            6:" EviRRuch cheyvAn * EnRedirndu vanda mallarai * sAvattagartta * sAndaNitOL saduran malai * Avattanam enRu * amararhaLum nan munivarum * sEvittirukkum * ten tirumAlirunchOlaiyE.",
            7:" mannar maRuga * maittunanmArkku oru tErinmEl * munnaNGgu ninRu * mOzhai ezhuvittavan malai * konnavil koorvERkOn * neDumARan ten kooDaRkOn * tennan koNDADum * ten tirumAlirunchOlaiyE.",
            8:" kuRugAda mannarai * kooDu kalakki * veNGgAniDai-siRukAl neRiyE pOkkuvikkum * selvan ponmalai * aRugAl vari vaNDukaL * Ayira nAmam solli * siRukAlaip pADum * ten tirumAlirunchOlaiyE.",
            9:" sindap puDaittu * cheNGgurudi koNDu * boodaNGgaL-andip pali koDuttu * Avattanam seyappan malai * indira kObangaL * emperumAn kani vAy oppAn * sindum puRavil * ten tirumAlirunchOlaiyE.",
            10:" eTTut tisaiyum * eNNiRanda perum dEvimAr * viTTu viLanga * veeRRirunda vimalan malai * paTTip piDihaL * pagaDuRinchi senRu * mAlai vAy-teTTit tiLaikkum * ten tirumAlirunchOlaiyE.",
            11:"🙏 marudap pozhilaNi * mAlirunchOlai malai tannai * karudi uRaihinRa * kArkkaDal vaNNan ammAn tannai * viradam konDEttum * villiputtoor vishNu chittansol * karudi uraippavar * kaNNan kazhaliNai kANbargaLE.",
        },
        'PAT.4.3.steps': {
            1:"🙏 uruppiNi nangai tannai meeTpAn * toDarndODichchenRa * uruppanai OTTi koNDiTTu * uRaittiTTa uRaippan malai * poruppiDaik konRai ninRu * muRiyAzhiyum kAsum koNDu * viruppoDu pon vazhangum * viyan mAlirunchOlaiyadE.",
            2:" kanchanum kALiyanum * kaLiRum marudum erudum * vanchanaiyil maDiya * vaLarnda maNivaNNan malai * nanchumizh nagam ezhundaNavi * naLir mAmadiyai * senchuDar nAvaLaikkum * tiru mAlirunchOlaiyadE.",
            3:" mannu naragan tannai * soozh pOhi vaLaitteRindu * kannimagaLir tammai * kavarnda kaDalvaNNan malai * punnai serundiyoDu * puna vEngaiyum kOngum ninRu * ponnarimAlaigaL soozh * pozhil mAlirunchOlaiyadE.",
            4:" mAvali tannuDaiya * magan vANan magaLirunda * kAvalaik kaTTazhitta * tanikkALai karudum malai * kOvalar gOvindanai * kuRamAdargaL paNkuRinchi * pAvoli pADi naDam payil * mAlirunchOlaiyadE.",
            5:"🙏 palapala nAzham solli * pazhitta shishupAlan tannai * alavalaimai tavirtta * azhagan alangAran malai * kula malai kOlamalai * kuLir mAmalai koRRamalai * nilamalai neeNDa malai * tiru mAlirunchOlaiyadE.",
            6:" pANDavartammuDaiya * pAncgaLi maRukkam ellAm * ANDuanNGu nooRRuvartam * peNDir mElvaitta appan malai * pANtagu vaNDinangaL * paNgaL pADi madupparuga * tONDal uDaiya malai * tollai mAlirunchOlaiyadE.",
            7:" kanaNGkuzgaiyAL poruTTA * kaNai pArittu * arakkar tangaL-inam kazhuvERRuvitta * ezhil tOL emmirAman malai * kanam kozhi teLLaruvi * vandu soozhndu akalnAlam ellAm * inam kuzhuvADum malai * ezhil mAlirunchOlaiyadE.",
            8:" erisidaRum sarattAl * ilangaiyinai * tannuDaiya-vari silaivAyil peydu * vAykkOTTam tavirttu uganda * araiyan amarum malai * amararoDukOnum senRu * tiri suDar soozhum malai * tiru mAlirunchOlaiyadE.",
            9:" kOTTumaN koNDiDandu * kuDangaiyil maNkoNDaLandu * meeTTumadu uNDumizhndu * viLaiyADu vimalan malai * eeTTiya palporuLgaL * embirAnukku aDiyuRaiyenRu * OTTarum taN silambARuDai * mAlirunchOlaiyadE.",
            10:" Ayiram tOLparappi * muDiyAyiram minnilaka * Ayiram paindalaiya * ananda sayanan ALum malai * Ayiram ARugaLum * sunaigaL palavAyiramum * Ayiram poompozhilumuDai * mAlirunchOlaiyadE.",
            11:"🙏 mAlirunchOlai ennum * malaiyai uDaiya malaiyai * nAliru moortti tannai * nAl vEdak kaDal amudai * mElirungaRpagattai * vEdAnta vizhupporuLin * mElirunda viLakkai * vishNu chittan virittanavE.",


        },
        'PAT.4.4.steps':
        {
            1:"🙏 nAva kAriyam sollilAdavar * nALtoRum virundOmbuvAr * dEva kAriyam seydu * vEdam payinRu vAzh tirukkOTTiyoor * moovar kAriyamum tiruttum * mudalvanai sindiyAda * ap - pAva kArikaLaip paDaittavan * enganam paDaittAn kolO!",
            2:" kuRRaminRi guNam perukki * kurukkaLukku anukoolarAy * seRRam onRumilAda * vaN kaiyinArhaL vAzh tirukkOTTiyoor * tuRRiyEzhulaguNDa * toomaNi vaNNan tannai tozhAdavar * peRRa tAyar vayiRRinai * peru nOy seyvAn piRandArgaLE.",
            3:" vaNNa nal maNiyum maragadamum azhutti * nizgaLEzhum-tiNNai soozh * tirukkOTTiyoor * tirumAlavan tiru nAmangaL * eNNak kaNDa viralhaLAl * iRaip pozhudum eNNagilAdupOy * uNNakkaNDa tam oottai vAykku * kavaLam undukinRArgaLE.",
            4:" uragamellaNaiyAnkaiyil * uRai shankam pOl maDavannangaL * nirai kaNam parandERum * sengamala vayal tirukkOTTiyoor * naraka nAsanai nAvil koNDazhaiyAda * mAniDa sAdiyar * paruku neerum uDukkum kooRaiyum * pAvam seydanatAn kolO!",
            5:" Amaiyin mudukattiDaik kudi koNDu * toomalar sADippOy * teemai seydu iLavALaigaL * viLaiyADu neert tirukkOTTiyoor * nEmisEr taDangaiyinAnai * ninaippilA vali nenchuDai * boomi bArangaL uNNum sORRinai vAngi * pullait tiNiminE.",
            6:" boodam aindoDu vELvi aindu * pulanhaL aindu poRikaLAl * Edam onRumilAda * vaN kaiyinArhaL vAzh tirukkOTTiyoornAdanai narasinganai * navinREttuvArhaL uzhakkiya * pAda tooLi paDudalAl * ivvulagam bAgyam seydadE.",
            7:" kurundam onRosittAnoDum senRu * kooDiyADi vizhAchcheydu * tirundu nAnmaRaiyOr * irAppagal Etti vAzh tirukkOTTiyoor * karundaDa mugilvaNNanai * kaDaikkoNDu kai tozhum pattarhaL * irundavooril irukkum mAniDar * ettavangaL seydAr kolO!",
            8:" naLirnda seelan nayAsalan * abimAnatunganai * nALtoRum-teLindaselvanaich * chEvakangoNDa sengaNmAltirukkOTTiyoor * kuLirnduRaikinRagOvindan * guNampADuvAruLLanATTinuL * viLaindatAniyamum irAkkadar * meedukoLLakilArkaLE.",
            9:" kombinArpozhilvAyk * kuyilinamgOvindankuNampADuseer * semponArmadiLsoozh * sezhungazhaniyuDaittirukkOTTiyoor * nambanainarasinganai * navinREttuvArkaLaik kaNDakkAl * empirAn danasinnangaL * ivarivarenRuAsaikaLteervanE.",
            10:" kAsinvAykkaramviRkilum * karavAdumARRilisORiTTu * dEsavArttaipaDaikkum * vaNkaiyinArkaLvAzhtirukkOTTiyoor * kEsavA! puruDOttamA! * kiLarsOdiyAy! kuRaLA! enRu * pEsuvAraDiyArkaL * endammaiviRkavumpeRuvArkaLE.",
            11:"🙏 seedaneerpuDaisoozh * sezhungazhaniyuDaittirukkOTTiyoor * AdiyAnaTiyAraiyum * aDimaiyinRittirivAraiyum * kOdilpaTTarpirAn * kuLirpuduvaimanviTTuchittansol * EdaminRiuraippavar * iruDeekEsanukkALarE.",
        },
        'PAT.4.5.steps': {
            1:"🙏 AsaivAy senRa sindaiyaragi * annai attan enputtirar boomi * vAsavAr kuzhaLAL enRu mayangi * mALum ellaik kaNvAy tiRavAdE * kEsavA! purushOttamA! enRum * kEzhaLAkiyakEDilee! enRum * pEsuvAravar eydum perumai * pEsuvAn pugil nam paramanRE.",
            2:" seeyinAl seRindERiya puNmEl * seRRalERik kuzhambirundu * engum-eeyinAl arippuNDu mayangi * ellai vAy senRu sErvadan munnam * vAyinAl namO nAraNA venRu * mattagattiDaik kaigaLaik kooppi * pOyinAl pinnai ittisaikku enRum * piNaik koDukkilum pogavoTTArE.",
            3:" sOrvinAl poruL vaittaduNDagil * sollu sollenRu suRRum irundu * Arvinavilum vAytiRavAdE * andakAlam aDaivadan munnam * mArvam enbadOrkOyil amaittu * mAdavan ennum deyvattai nATTi * ArvamenbadOr pooviDavallArkku * aravataNDattil uyyalumAmE.",
            4:" mEl ezhundadOr vAyuk kiLarndu * mEl miDaRRinai uLLezha vAngi * kAlum kaiyum vidir vidirttERik * kaNNuRakkam adAvadan munnam * moolamagiya oRRaiyezhuttai * moonRu mAttirai uLLezha vAngi * vElaivaNNanai mEvudiragil * viNNagattinil mEvalumAmE.",
            5:" maDi vazhi vandu neer pulan sOra * vAyilaTTiya kanchiyum meeNDE * kaDai vazhi vArak kaNDamaDaippa * kaNNuRakkam adAvadan munnam * toDai vazhi ummai nAygaL kavarA * soolattAl ummaip pAyvadum seyyAr * iDaivazhiyil neer kooRaiyum izhaveer * iruDeekEsan enREttavalleerE.",
            6:" angam viTTavai aindum agaRRi * Avi mookkinil sOditta pinnai * sangam viTTavarkaiyai maRittu * paiyavE talai sAyppadan munnam * vangam viTTulavum kaDaRpaLLi mAyanai * madusoodananai mArbil-tanga viTTu vaittu * AvadOr karumam sAdippArkku * enRum sAdikkalAmE.",
            7:" tennavan tamar seppamilAdAr * sEvadakkuvAr pOlap pugundu * pinnum vankayiRRAl piNitteRRi * pin munnaga izhuppadan munnam * innavan inaiyAn enRu solli * eNNi uLLattu iruLaRa nOkki * mannavan madusoodan enbAr * vAnagattu manRADigaL tAmE.",
            8:" kooDik kooDiuRRArgaL irundu * kuRRam niRka naRRangaL paRaindu * pADippADiOrpADaiyil iTTu * narippaDaikku oru paguDam pOlE * kODimooDi eDuppadan munnam * kowttuvamuDai gOvindanODu * kooDiyADiya uLLattarAnAl * kuRippiDam kaDandu uyyalumAmE.",
            9:" vAyoru pakkam vAngi valippa * vArnda neerk kuzhik kaNkaL mizhaRRa * tAy oru pakkam tandai oru pakkam * tAramum oru pakkam alaRRa * tee Oru pakkam sErvadan munnam * sengaNmAloDum sikkena suRRa-mAy * oru pakkam niRka vallArkku * arava taNDattil uyyalumAmE.",
            10:"🙏 settuppOvadOr pOdu ninaindu * seyyum seygaigaL dEva pirAnmEl * pattarAyiRandAr peRum pERRai * pAzhit tOL vishNu chittan puttoorkkOn * sittam nankorungit tirumAlai * seyda mAlai ivai pattum vallAr * sittam nankorungit tirumAl mEl * senRa sindai peRuvartAmE.",
        },
        'PAT.4.6.steps': {
            1:"🙏 kAsum kaRaiyuDai kooRaikkum * angOr kaRRaikkum-AsaiyinAl * anNGavattap pEriDum * AdargAL!-kEsavan pEriTTu * neengaL tEnittiruminO * nAyagan nAraNan * tam annai naragam pugAL.",
            2:" angoru kooRai * araikkuDuppadan AsaiyAl * mangiya mAniDa sAdiyin * pEriDum AdargAL! * sengaN neDumAl! * sireedarA! enRuazhaittakkAl * nangaigAL! nAraNan * tam annai naragam pugAL.",
            3:" uchchiyileNNeyum * suTTiyum vaLaiyum ugandu * echcham polindeergAL! * en seyvAn piRar pEriTTeer? * pichchai pukkagilum * embirAn tiru nAmamE-nachchumin * nAraNan * tam annai naragam pugAL.",
            4:" mAniDa sAdiyil tOnRiRRu * Or mAniDa sAdiyai * mAniDa sAdiyin pEriTTAl * maRumaikkillai * vAnuDai mAdavA! * gOvindA! enRuazhaittakkAl * nAnuDai nAraNan * tam annai naragam pugAL.",
            5:" malamuDai oottaiyil tOnRiRRu * Or mala oottaiyai * malamuDai oottaiyin pEriTTAl * maRumaikkillai * kulamuDai gOvindA! * gOvindA! enRu azhaittakkAl * nalamuDai nAraNan * tam annai naragam pugAL.",
            6:" nADum nagarumaRiya * mAniDa pEriTTu * kooDiyazhungi * kuzhiyil veezhndu vazhukkadE * sADiRap pAynda talaivA! * dAmOdarA! enRu-nADumin * nAraNan * tam annai naragam pugAL.",
            7:" maNNil piRandu maNNagum * mAniDap pEriTTu * angu-eNNam onReNNi irukkum * Ezhai manisargAL! * kaNNukkiniya * karu mugil vaNNan nAmamE-naNNumin * nAraNan * tam annai naragam pugAL.",
            8:" nambi bimbiyenRu * nATTu mAniDap pEriTTAl * nambum pimbum ellAm * nAlu nALil azhungip pOm * sem perundAmaraik kaNNan * pEriTTu azhaittakkAl * nambigAL! nAraNan * tam annai naragam pugAL.",
            9:" oottaik kuzhiyil * amudam pAyvadu pOl * ungaL-moottirap piLLaiyai * en mugil vaNNan pEriTTu * kOttuk kuzhaittu * guNAlam ADit tiriminO * nAttagu nAraNan * tam annai naragam pugAL.",
            10:"🙏 seeraNimAl * tiru nAmamE iDattERRiya * veeraNi tolpugazh * vishNu chittan viritta * OraNi oN tamizh * onbadODu onRum vallavar * pEraNi vaikunTattu * enRum pENi irupparE.",
        },
        'PAT.4.7.steps': {
            1:"🙏 tangaiyai mookkum tamaiyanai talaiyum taDinda * em dAsaradi pOy * engum tanpugazhAvirundu arasANDa * em purushOttaman irukkai * gangai gangai enRa vAsagattAlE * kaDu vinai kaLaindiDukiRkum * gangaiyin karaimEl kaitozha ninRa * kaNDam ennum kaDinagarE.",
            2:" salam podi uDambin tazhalumizh pEzhvAy * chandiran vengadir ancha * malarndu ezhundaNavu maNivaNNa uruvin * mAl purushOttaman vAzhvu * nalamtigazh saDaiyAn muDikkonRai malarum * nAraNan pAdat tuzhAyum * kalandizhi punalAl pugar paDugangai * kaNDam ennum kaDi nagarE.",
            3:" adirmugam uDaiya valamburi kumizhtti * azhalumizh Azhi koNDeRindu * angu-edir mugavasurar talaigaLai iDaRum * em purushOttaman irukkai * sadumugan kaiyil saduppuyan tALil * shankaran saDaiyinil tangi * kadir muga maNi koNDizhipunal gangai * kaNDam ennum kaDi nagarE.",
            4:" imaiyavar iRumAndirundu arasALa * ERRuvandedir poru sEnai * namapuram naNuga nAndagam visiRum * nam purushOttaman nagar tAn * imavandam toDangi irungaDalaLavum * irukarai ulagiraittADa * kamaiyuDai perumai gangaiyin karaimEl * kaNDam ennum kaDi nagarE.",
            5:" uzhuvadOr paDaiyum ulakkaiyum villum * oN suDar Azhiyum shaNGkum * mazhuvoDu vALum paDaikkalam uDaiya * mAl purushOttaman vAzhvu * ezhumaiyum kooDi eeNDiyapAvam * iRaip pozhudaLavinil ellAm * kazhuviDum perumai gangaiyin karaimEl * kaNDam ennum kaDi nagarE.",
            6:"talaip peydu kumuRichchalam podimEham * salasala pozhindiDak kaNDu * malaip perum kuDaiyAl maRaittavan madurai * mAl purushOttaman vAzhvu * alaippuDait tiraivAy arundava munivar * avapiradam kuDaindADa *",
            7:" viRpiDittiRuttu vEzhattai murukki * mElirundu avantalai sADi * maRporutezhap pAyndu araiyanayudaitta * mAl purushOttaman vAzhvu * aRpudam uDaiyaaiyirAvadamadamum * avar iLampaDiyar oNsAndum * kaRpa kamalarum kalandizhi gangai * kaNDam ennum kaDi nagarE.",
            8:" tirai porukaDal soozh tiN madiL tuvarai vEndu * tan maittunanmArkkAy * arasinai aviyaarasinai aruLum * ari purushOttamanam arvu * nirai nirai aga neDiyanayoobam * nirandaram ozhukku viTTu * iraNDu-karai purai vELvip pugai kamazh gangai * kaNDam ennum kaDi nagarE.",
            9:" vaDatisai madurai sALakkirAmam * vaikunTam tuvarai ayOddi * iDam uDai vadari iDavagai uDaiya * em purushOttaman irukkai * taDavarai atirat taraNi viNDiDiya * talaip paRRik karaimaram sADi * kaDalinai kalanga kaDuttizhi gangai * kaNDam ennum kaDi nagarE.",
            10:" moonRezhuttadanai moonRezhuttadanAl * moonRezhuttAkki * moonRezhuttai-EnRu koNDiruppArkkuirakkam nankuDaiya * em purushOttaman irukkai * moonRaDi nimirttu moonRinil tOnRi * moonRinil moonRuruvAnAn * kAntaDam pozhilsoozh gangaiyin karaimEl * kaNDam ennum kaDi nagarE.",
            11:"🙏 pongoli gangai karaimali kaNDattu * uRai purushOttaman aDimEl * vengali naliyA villi puttoor kOn * vishNu chittan viruppuRRu * tangiya anbAl seyda tamizh mAlai * tangiya nAvuDaiyArkku * gangaiyil tirumAl kazhaliNaik keezhE * kuLittirunda kaNakkAmE.",
        },
        'PAT.4.8.steps': {
            1:"🙏 mAtavattOn puttiran pOy * maRikaDal vAy mANDAnai * Oduvitta takkaNaiyA * uruvuruvE koDuttAnoor * tOdavattit tooymaRaiyOr * tuRai paDiyat tuLumbiengum * pOdil vaitta tEn soriyum * punal arangam enbaduvE.",
            2:" piRappagattE mANDozhinda * piLLaikaL ainAlvaraiyum * iRaippozhudil koNarndu koDuttu * oruppaDitta uRaippanoor * maRaip perum tee vaLarttiruppAr * varu virundai aLittiruppAr * siRappuDaiyam aRaiyavar vAzh * tiru arangam enbaduvE.",
            3:" marumagantan sandadiyai * uyir meeTTu, maittunan mAr * urumagattE veezhAmE * gurumugamAyk kAttAnoor * tirumugamAy sengamalam * tiru niRamAyk karunguvaLai * porumugamAy ninRalarum * punalarangam enbaduvE.",
            4:" koon tozhuttai sidakuraippa * koDi avaL vAykkaDiya solkETTu * eenReDutta tAyaraiyum * irAchchiyamum Angozhiya * kAn toDutta neRipOhi * kaNDakaraik kaLaindAnoor * tEn toDutta malarchchOlai * tiruvarangam enbaduvE.",
            5:" peruvarangaL avaipaRRi * pizhakuDaiya irAvaNanai * uruvarangap porudazhittu * ivvulaginaik kaN peRuttAnoor * kuruvarumbakkOngalara * kuyil koovum kuLirpozhil soozh * tiruvarangam enbaduvE * entirumAl sErviDamE.",
            6:" keezhulagilasurar kaLai * kizhangirundu kiLarAmE * Azhi viDuttu avaruDaiya * karuvazhi tavazhippanoor * tAzhai maDalooDurinchi * tavaLa vaNNa poDi aNindu * yAzhinisai vaNDinangaL * ALa vaikkum arangamE.",
            7:" kozhuppuDaiya sezhum kurudi * kozhittizhindu kumizhtteRiya * pizhakkuDaiyaasurarhaLai * piNam paDutta perumAnoor * tazhuppariya sandanangaL * taDavaraivAy eerttuk koNDu * tezhippuDaiya kAviri vandu * aDitozhum seer arangamE.",
            8:" valleyiRRu kEzhalumAy * vAL eyiRRu seeyamumAy * ellaiyillA taraNiyaiyum * avuNanaiyum iDandAnoor * elliyam pOdu irunchiRai vaNDu * emberumAn guNam pADi * mallihai veN shangoodum * madiL arangam enbaduvE.",
            9:" kunRADu kozhu mugil pOl * kuvaLaihaL pOl kurai kaDalpOl * ninRADu kaNamayil pOl * niRamuDaiya neDumAloor * kunRADu pozhil nuzhaindu * koDiyiDaiyAr mulaiyaNavi * manRooDu tenRalumAm * madiL arangam enbaduvE.",
            10:"🙏 paruvarangaL avaipaRRi * paDaiyAli tezhundAnai * seruvarangap porudazhitta * tiru vALan tiruppadi mEl * tiruvaranga tamizhmAlai * vishNu chittan virittana koNDu * iruvarangam erittAnai * Etta vallAr aDiyOmE.",
        },
        'PAT.4.9.steps': {
            1:"🙏 maravaDiyai tambikku vAn paNaiyam vaittuppOy * vAnOr vAzha * seruvuDaiya tisaik karumam tirutti vandu ulagANDa * tirumAl kOyiltiru vaDitan tiru uruvum * tirumangai malar kaNNum kATTi ninRu * uruvuDaiya malar neelam kARRATTa * O! salikkum oLiyarangamE.",
            2:"tannaDiyAr tiRattagattu * tAmaraiyAL agilum sidakuraikkumEl * ennaDiyAr adu seyyAr * seydArEl nanRu seydAr enbar pOlum * mannuDaiya vibeeshaNaRkA * madiL ilangai tisai nOkki malar kaN vaitta * ennuDaiya tiru varangaRku anRiyum * maRRoruvarkku ALAvarE?",
            3:" karuLuDaiya pozhil marudum * kadak kaLiRum pilambanaiyum kaDiyamAvum * uruLuDaiya sakaDaraiyum mallaraiyum * uDaiya viTTu Osai kETTAn * iruLakaRRum eRikatirOn * maNDalattooDu ERRi vaittu ENi vAngi * aruL koDuttiTTu aDiyavarai * ATkoLvAn amarum oor aNiyarangamE.",
            4:" padinARAm Ayiravar * dEvimAr paNi seyya tuvarai ennum * adil nAyagaragi veeRRirunda * maNavALar mannu kOyil * pudu nAN malark kamalam * emberumAn ponvayiRRil poovE pOlvAn * podu nAyagam pAvittu * irumAndu pon sAykkum punal arangamE.",
            5:" AmaiyAy gangaiyAy * Azh kaDalAy avaniyAy aruvaraihaLAy * nAnmuganAy nAnmaRaiyAy * vELviyAy takkaNaiyAy tAnumAnAn * sEmamuDai nAradanAr * senRu senRu tudittiRaincha kiDandAn kOyil * poomaruvi puLLinangaL * puLLaraiyan pugazh kuzhaRum punal arangamE.",
            6:" maittunanmAr kAdaliyai mayir * muDippittu avarhaLaiyE mannarAkki * uttaraitan siRuvanaiyum uyyakkoNDa * uyirALan uRaiyum kOyil * pattarhaLum pakavarhaLum * pazha mozhivAy munivarhaLum paranda nADum * sittarhaLum tozhudiRaincha * tisai viLakkAy niRkinRa tiruvarangamE.",
            7:" kuRaL biramasAriyAy * mAvaliyai kuRumbadakki arasu vAngi * iRaippozhidil pAdALam kalavirukkai * koDuttu uganda emmAn kOyil * eRippuDaiya maNivaraimEl * iLanAyiRu ezhundARpOl aravaNaiyin vAy * siRappuDaiya paNangaLmisai * sezhu maNihaL viTTeRikkum tiruvarangamE.",
            8:" uram paRRi iraNiyanai * ukir nudiyAl oLLiya mArbu uRaikka oonRi * siram paRRi muDiyiDiya kaN pidunga * vAyalarattu ezhittAn kOyil * uram peRRa malar kamalam * ulagaLanda sEvaDi pOl uyarndu kATTa * varambuRRa kadirch chennel * tAL sAyttu talai vaNakkum taNNarangamE.",
            9:" tEvuDaiya meenamAy AmaiyAy * EnamAy ariyAy kuRaLAy * moovuruvil irAmanAy * kaNNanAy kaRkiyAy muDippAn KOyil * sEvaloDu peDaiyannam * sengamala malarERi oosalADi * poovaNai mEl tudaindezhu * sempoDiyADi viLaiyADum punal arangamE.",
            10:" seru vALum puLLALan maNNALan * seruch cheyyum nAndakam ennum-oruvALan * maRaiyALan ODAda paDaiyALan * vizhukkaiyALan * iravALan pagalALan ennaiyALan * Ezhulaka perum puravALan * tiruvALan inidaga * tiruk kaNkaL vaLarhinRa tiruvarangamE.",
            11:"🙏 kainnagattiDar kaDinda * kanalAzhi paDai uDaiyAn karudum kOyil * tennADum vaDanADum tozha ninRa * tiruvarangam tiruppadiyin mEl * meynnAvan meyyaDiyAn vishNu chittan * viritta tamizh uraikka vallAr * ennAnRum emberumAn iNaiyaDikkeezh * iNaipiriyAdu iruppar tAmE.",
        },
        'PAT.4.10.steps': {
            1:"🙏 tuppuDaiyArai aDaivadellAm * sOrviDattu tuNaiyAvar enRE * oppilEn agilum ninnaDaindEn * Anaikku nee aruL seydamaiyAl * eyppu ennai vandu naliyum pOdu * angu Edum nAnunnai ninaikka mATTEn * appOdaikku ippOdE solli vaittEn * arangattu aravaNaip paLLiyAnE!",
            2:" sAmiDattu ennai kuRikkoL kaNDAy * shankoDu chakkaram EndinAnE! * nAmaDittu ennai anEha taNDam * seyvadA niRpar naman tamarhaL * pOmiDattu un tiRattu ettanaiyum * pugA vaNNam niRpadOr mAyai vallai * AmiDattE unnai solli vaittEn * arangattu aravaNai paLLiyAnE!",
            3:" ellaiyil vAsal kuRukach chenRAl * eRRi naman tamar paRRum pOdunillumin ennum ubAyamillai * nEmiyum shankamum EndinAnE!sollalAm pOdE un nAmam ellAm * sollinEn ennaik kuRikkoNDu enRumallal paDAvaNNam kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            4:" oRRai viDaiyanum nAnmuganum * unnai aRiyAp perumaiyOnE!muRRa ulagellAm neeyEyAki * moonRezhuttAya mudalvanEyO!aRRadu vANAL ivaRku enReNNi * ancha namantamar paRRaluRRaaRRaikku, neeennaik kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            5:" paiyaravin aNai pARkaDaluL * paLLi koLhinRa parama moortti!uyya ulagu paDaikka vENDi * undiyil tORRinAy nAnmuganaivaiya manisaraip poyyenRu eNNi * kAlanaiyum uDanE paDaittAyaiya! ini ennaik kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            6:" taNNenavillai namantamarhaL * sAla koDumaikaL seyyA niRparmaNNoDu neerum eriyum kAlum * maRRum AkAsamumAki ninRAy!eNNalAm pOdE unnAmam ellAm * eNNinEn, ennaik kuRikkoNDu enRumaNNalE! nee ennaik kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            7:" senchol maRaip poruLagi ninRa * dEvarhaL nAyakanE! emmAnE!enchalil ennuDai innamudE! * Ezhulagum uDaiyAy! ennappA!vancha uruvin namantamarhaL * valindu nalindu ennaip paRRum pOduanchalam enRu ennaik kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            8:" nAnEdum unmAyam onRaRiyEn * naman tamar paRRi nalindiTTu indaoonE pukEyenRu mOdum pOdu * angEdum nAn unnai ninaikka mATTEnvAnEy vAnavar tangaL eesA! * madurai piRanda mAmAyanE! * en-AnAy! nee ennaik kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            9:" kunReDuttu Anirai kAtta AyA! * kOnirai mEyttavanE! emmAnE! * anRu mudal inRaRudiyA * AdiyanchOdi maRandaRiyEn * nanRum koDiya namantamarhaL * nalindu valindu ennaip paRRum pOdu * anRangu nee ennaik kAkka vENDum * arangattu aravaNaip paLLiyAnE!",
            10:"🙏 mAyavanai madusoodananai * mAdavanai maRaiyOrhaL Ettum * AyarhaL ERRinai achchudanai * arangattu aravaNaip paLLiyAnai * vEyar pugazh villiputtoorman * vishNu chittan sonna mAlai pattum * tooya manattanaragi vallAr * toomaNi vaNNanukku ALar tAmE."
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