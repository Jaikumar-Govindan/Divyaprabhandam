window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PAT.3.1.steps':
        {
            1: "tannErAyiram piLLaikaLODu *  taLar naDaiyittu varuvAn * ponnEy neyyoDu pAlamuduNdu *  oru puLLuvan poyyE tavazhum * minnEr nuNNiDai vanjamagaL koNGgai tunja *  vAy vaitta pirAnE! * annE! unnai aRindukoNDEn *  unakku anjuvan ammam taravE. *  ",
            2: "ponpOl manjanamATTi amudooTTi pOnEn *  varumaLavu ippAl * vanpAra chakaDam iRachchAdi *  vadakkil agam pukkirundu * minpOl nuNNiDaiyAl oru kanniyai *  vERRuruvam seyduvaitta * anbA! unnai aRindu koNDEn *  unakku anjuvan ammam taravE ",
            3: "kummAyattODu veNNey vizhuNGgi *  kuDattayir sAyttup paruhi * poymmAya marudAna asurarai *  ponRu vittu inRu nee vandAy * immAyam valla piLLai nambee! *  unnai enmaganE enbar ninRAr * ammA! unnai aRindu koNDEn unakku anjuvan ammam taravE ",
            4: "maiyArkaN madavAychchiyar makkaLai *  maiyanmai seydu avar pin pOy * koyyAr poonduhil paRRi tani ninRu *  kuRRam palapala seydAy * poyyA! unnaip puRam palapEsuva *  puttagattukuLa kEttEn * aiyA! unnai aRindu koNDEn *  unakku anjuvan ammam taravE. *  ",
            5: "muppOdum kaDaindu eeNDiya veNNeyinODu *  tayirum vizhuNGgi * kappAl AyargaL kAvil koNarnda *  kalattoDu sAyttu parugi * meyppAluNDa azhu piLLaigaL pOla *  nee vimmi vimmi azhuginRa * appA! unnai aRindu koNDEn *  unakku anjuvan ammam taravE. ",
            6: "karumbAr neeLvayal kAykadir chennelai *  kaRRAnirai maNdi tinna * virumbA kanRonRu koNdu *  viLaNGgani veezha eRinda pirAnE! * surumbAr menkuzhal kanni oruttikku *  choozhvalai vaittu tiriyum * arambA! unnai aRindu koNDEn *  unakku anjuvan ammam taravE. *  ",
            7: "maruttAr menkuzhal koNDu pozhil pukku *  vAy vaittu avvAyar tampAdi * suruttAr menkuzhal kanniyar vandu unnai *  chuRRum tozha ninRa sOdi! * poruttAyamilEn_ emberumAn! *  unnai peRRa kuRRamallAl *  maRRiNGgu arattA! unnai aRindu koNDEn *  unakku anjuvan ammam taravE. ",
            8: "vALAvAgilum kANagillAr *  piRar makkaLai maiyanmai seydu * tOLAlittu avarOdu tiLaittu *  nee sollappadAdana seydAy * kELAr Ayar kulattavar ippazhi kettEn! *  vAzhvillai *  nandan kALAy! unnai aRindu koNDEn *  unakku anjuvan ammam taravE. ",
            9: "tAymAr mOr viRkap pOvar *  tagappanmAr kaRRAniRai pinbu pOvar * nee AyppAdi iLaNGgannimArhaLai *  nErpadavE koNdu pOdi * kAyvArkku enRum ugappanavE seydu *  kaNdAr kazhaRattiriyum * AyA! unnai aRindu koNDEn *  unakku anjuvan ammam taravE. *  ",
            10: "tottAr poonguzhal kanniyoruttiyai *  sOlai tadam koNdu pukku * muttAr kongai puNarndu irA nAzhikai *  moovEzhu senRapin vandAy * ottArkku ottana pEsuvar * unnai urappavE nAn onRum mAttEn * attA! unnai aRindu koNDEn *  unakku anjuvan ammamtaravE ",
            11: "kArAr mEni niRattu embirAnai *  kaDi kamazh pooNGguzhal Aychchi * ArA innamudu uNNattaruvan nAn *  ammam tArEn enRa mARRam * pArAr tol pugazhAn puduvai mannan *  pattar pirAn sonna pAdal * ErAr innisai mAlai vallAr *  iruDeekEsan aDiyArE. *  ",
        },
        'PAT.3.2.steps':
        {
            1: "anjana vaNNanai *  Ayar kula kozhundinai * manjanamATTi *  manaigaL tORum tiriyAmE * kanjanai kAynda *  kazhaladi nOva kanRinpin * en seya piLLaiyai pOkkinEn? *  ellE pAvamE ",
            2: "paRRu manjaL poosi *  pAvai mAroDu pAdiyil * siRRil sidaittu enggum  * teemai seydu tiriyAmE * kaRRuttooLiyudai *  vEdar kAnidai kanRinpin * eRRukku en piLLaiyai pOkkinEn? *  ellE pAvamE ",
            3: "nanmaNimegalai *  nangaimArodu nAL toRum * ponmaNi mEni *  puzhudiyAdi tiriyAmE * kanmaNi ninRadir *  kAnadaridai kanRinpin * en maNi vaNNanai pOkkinEn *  ellE pAvamE ",
            4: "vaNNa karunguzhal *  mAdar vandu alar tooRRida * paNNi pala seydu *  ippAdi enggum tiriyAmE * kaNNukkiniyAnai *  kAnadaridai kanRinpin * eNNaRku ariyAnai pOkkinEn *  ellE pAvamE ",
            5: "avvavvidampukku *  avvAyar peNDirkku aNukkanAy * kovvai kanivAy koduttu *  koozhaimai seyyAmE * evvum silaiyudai *  vEdar kAnidai kanRinpin * deyva talaivanai pOkkinEn *  ellE pAvamE. ",
            6: "midaRu mezhumezhuttOda *  veNNey vizhunggi pOy * padiRu pala seydu *  ippAdi enggum tiriyAmE * kadiRu palatiri *  kAnadaridai kanRinpin * idaRa enpiLLaiyai pOkkinEn *  ellE pAvamE. ",
            7: "vaLLi nudangiDai *  mAdar vandu alar tooRRida * tuLLi viLaiyADi *  tOzharOdu tiriyAmE * kaLLiyuNangu *  venggAnataridai kanRinpin * puLLin talaivanai pOkkinEn *  ellE pAvamE ",
            8: "panniru tingaL *  vayiRRil koNDa appAnginAl * en iLangkongai *  amudamootti eDuttuyAn * ponnaDi nOva *  pulariyE kAnil kanRinpin * enniLani chingattai pOkkinEn *  ellE pAvamE! *  ",
            9: "kuDaiyum seruppum koDAdE *  dAmOdaranai nAn * uDaiyum kaDiyana oonRu *  vemparaRkaLudai * kaDiya venggAnidai *  kAlaDi nOva kanRinpin * koDiyEn enpiLLaiyai pOkkinEn *  ellE pAvamE! *  ",
            10: "enRum enakku iniyAnai *  enmaNi vaNNanai * kanRin pin pOkkinEn enRu *  asOdai kazhaRiya * pon tikazhmAda *  puduvaiyar kOn pattan sol * intamizh mAlaigaL vallavar─╖ku iDarillAiyE. ",
        },
        'PAT.3.3.steps':
        {
            1: "seelaikkudambai orukAdu orukAdu *  senniRa mEl tOnRippoo * kOlappaNai kachchum kooRai uDaiyum *  kuLir muttin kOdAlamum * kAlippinnE varuhinRa *  kadal vaNNan vEdattai vandu kANeer * nyAlattu puttiranai peRRAr *  nangaimeer! nAnE maRRArumillai. ",
            2: "kanni nan mAmadiL soozhtaru *  poombozhil kAviri tennaraNGgam * manniya seer madusoodanA! kEsavA! *  pAviyEn vAzhvugandu * unnai iLangkanRu mEykka *  siRukAlEyootti oruppaduttEn * ennin manam valiyAL oru peN illai *  en kuttanE muttam tA. *  ",
            3: "kADukaLooDupOy * kanRukaL mEyttu maRiyODi * kArkkODalpooch  chooDi varuginRa dAmOdarA! *  kaRRu tooLikAN unnuDambu * pEdai mayiR sAyal pinnai maNALA! *  neerAttamaittu vaittEn * Adi amudu sey appanum uNdilan *  unnOdu udanE uNbAn. *  ",
            4: "kaDiyAr pozhilaNi vEngkatavA! * karumpOrERE! * neeyugakkum kudaiyum seruppum kuzhalum *  taruvikka koLLAdE pOnAy mAlE! * kadiya veNGgAnidai kanRin pinpOna *  siRukkutta cheNGgamala * adiyum vedumbi *  un kaNkaL sivandAy asaindittAy *  nee embirAn! *  ",
            5: "paRRAr nadunga mun pAnja channiyattai *  vAy vaitta pOrERE! * en siRRAyar siNGgamE! seetai maNALA! *  siRukkutta cheNGgaNmAlE! * siRRADaiyum siRuppattiramum  * ivai kaTTilin mEl vaittu pOy * kaRRAyarODu nee kanRuhaL mEyttu *  kalandudan vandAy pOlum. *  ",
            6: "anchuDarAzhi unkaiyakattu Endum azhakA! *  nee poykai pukku * nanjumizh nAgattinOdu piNangavum *  nAn uyir vAzhndirundEn * en seyya ennai vayiRu maRukkinAy? *  Edum Or achchamillai * kanjan manattukku ukappanavE seydAy *  kAyAm poovaNNam koNDAi *  ",
            7: "panRiyum Amaiyum meenamumAkiya * pARkadal vaNNA! * unmEl kanRin uruvAki mEypulattEvanda *  kaLLa asurar tannai * senRu pidittuch siRu kaikaLAlE *  viLaNGgAy eRindAy pOlum * enRum enpiLLaikkut teemaikaL seyvArkaL *  aNGganam AvarkaLE. *  ",
            8: "kEttaRiyAdana kEtkinREn *  kEsavA! kOvalar indiraRku * kaTTiya sORum kaRiyum tayirum *  kalandudan uNdAy pOlum * ooTTamudalilEn untannaik koNdu *  orupOdum enakkaridu * vATTamilAp pukazh vAsudEvA! *  unnai aNYjuvan inRu tottum. *  ",
            9: "tiNNAr veNsaNGgudaiyAy! *  tirunAL tiruvONam inREzhunAL *  munpaNNOr mozhiyAraik koovimuLaiyattip *  pallANdu kooRuvittEn * kaNNAlam seyya *  kaRiyum kalattarisiyum Akki vaittEn * kaNNA! nee nALait tottu kanRinpin pOkEl *  kOlam seydu iNGgEyiru. *  ",
            10: "puRRaravalkul asOdai nallAychchi *  tan puttiran gOvindanai * kaRRinam mEyttuvarak kaNdukanDu *  avaL kaRpitta mARRamellAm * seRRamilAdavar vAzhtaru *  tenpuduvai viShNu chittansol * kaRRivai pAdavallAr *  kadalvaNNan kazhaliNai kANbArkaLE. ",
        },
        'PAT.3.4.steps':
        {

            1: "tazhaigaLum tongalum tadumbi engum * taNNumai ekkammattaLi tAzhpeeli * kuzhalgaLum geedamumAgi * engumgOvindan varuhinRa koottam kaNdu * mazhaikolO varuhinRadenRu solli * mangaimAr sAlaga vAsal paRRi * nuzhaivanar niRpanarAgi engum * uLLam vittu ooN maRandu ozhindanarE ",
            2: "valli nuN idazhanna ADaikoNdu * vasaiyaRa tiruvarai virittuDuttu * palli nuNpaRRAka udaivAL sAttip * paNaikkachchundi palatazhai naduvE * mullai nal naRumalar vEngaimalar aNindu *  pallAyar kuzhAm naduvE * elliyam pOdAga piLLai varum * edir ninRu anginavaLai izhavEnminE ",
            3: "surigaiyum teRivillum sendu kOlum * mElADaiyum tOzhanmAr koNdOda * orukaiyAl oruvan tan tOLaiyoonRi * Anirai inam meeLa kuRitta sangam * varuhaiyil vAdiya piLLai kaNNan * manjaLum mEniyum vadivum kaNdAL * aruhE ninRAL enpeN nOkki kaNdAL * adugaNdu ivvoor onRu puNarkkinRadE ",
            4: "kunReduttu Anirai kAtta pirAn * kOvalanAy kuzhal oodiyoodi * kanRukaL mEyttu tan tOzharODu * kalandudan varuvAnai teruvil kaNdu * enRum ivanai oppArai nangAy * kaNdaRiyEn Edi! vandu kANAy * onRum nillA vaLai kazhanRu * tugilEndiLa mulaiyum en vasam allavE ",
            5: "suRRi ninRu Ayar tazhaihaLida * suruL pangi nEttirattAl aNindu * paRRi ninRu Ayar kadaittalaiyE * pAdavum AdakkaNdEn *  anRippin maRRoruvarkku ennai pEsal ottEn * mAlirunchOlai em mAyaRkallAl * koRRavanukku ivaLAm enReNNi * koDuminkaL kodeerAkil kOzhambamE ",
            6: "sinduram ilanga tan tiru neRRimEl * tiruttiya kORambum tirukkuzhalum * andaramuzhava taN tazhaikkAvin keezh * varum AyarOdu udan vaLai kOlveesa * andam onRillAda AyappiLLai * aRindaRindu ivveedi pOdumAgil * pandu koNdAnenRu vaLaittu vaittu * pavaLavAy muRuvalum kANbOm tOzhee ",
            7: "sAlappal niraippinnE tazhai kAvin keezh * tan tirumEni ninRoLi tihazha * neela nal naRungunchi nEttirattAl aNindu * pallAyar kuzhAm naduvE * kOla sendAmarai kaNmiLira * kuzhal oodi isaipAdi kunittu *  AyarOdu Alittu varuhinRa AyappiLLai * azhagu kaNDu enmagaL ayarkkinRadE. *  ",
            8: "sindura poDi koNDu senniyappi * tiru nAmam iTTu angOr ilaiyam tannAl * andaram inRi tanneRi pangiyai * azhagiya nEttirattAl aNindu * indiran pOl varum AyappiLLai * edir ninRangina vaLai izhavEl enna * sandiyil ninRu kaNdeer nangai tan * tugiloDu sari vaLai kazhalkinRadE. *  ",
            9: "valankAdin mEltOnRi poovaNindu * mallihai vanamAlai mauval mAlai * silingArattAl kuzhal tAzhaviTTu * teenguzhal vAy maduttu oodiyoodi * alangArattAl varum AyppiLLai * azhaku kaNdu enmagaL AsaippaTTu * vilangi nillAdu edir ninRu kaNdeer * veLvaLai kazhanRu meymelikinRadE. ",
            10: "viNNin meedu amarar_kaL virumbit tozha * miRaittu AyarpADiyil veediyooDE * kaNNan kAlippinnE ezhundaruLa kaNdu * iLavAy kannimAr kAmuRRa vaNNam *  vaNdamar pozhil puduvaiyar kOn * viShNu chittan sonna mAlai pattum * paNNinbam varappADum pattaruLLAr * paramAna vaikunTam naNNuvarE. *  ",
        },
        'PAT.3.5.steps':
        {
            1: "aTTukkuvi sORRu paruppadamum * tayirvaaviyum neyyaLaRum adaNGgap-pottattuRRi *  maarippagai puNartta * porumaa kadalvaNNan poRuttamalai * vattat tadaNGgaN madamaan kanRinai * valaivaay paRRi koNDu *  kuRamagaLir kottait talaippaal koduttu vaLarkkum * gOvarttanam ennum koRRakkuDaiyE. *  ",
            2: "vazhuvonRumilaa seykai vaanavarkOn * valippattu munindu vidukkappattu * mazhai vandu ezhu naaL peydu maattaduppa * madusoodan eduttu maRitta malai * izhavutariyaadadOr eeRRuppidi * iLaNYjeeyam todarndu mudukudalum * kuzhaviyidai kaalittu edirndu porum * gOvarttanam ennum koRRakkuDaiyE. *  ",
            3: "ammai tadaNGgaN madavaaychchiyarum * aanaayarum aaniraiyum alaRi * emmai saraNenRu koL enRirappa * ilaNGgaazhikkai endai edutta malai * tammai charaNenRa tampaavaiyaraip * punamEykinRa maaninam kaaNmin enRu * kommai puyakkunRar silai kunikkum * gOvarttanam ennum koRRakkuDaiyE. *  ",
            4: "kaDuvaay sina veNGgaN kaLiRRinukku * kavaLam eduttu koduppaanavan pOl * adivaay uRakkaiyittu ezha paRittittu * amarar perumaan koNdu ninRa malai * kadalvaay senRu mEham kavizhndiRaNGgi * kaduvaayppada neer magandERi *  eNGgum-kudavaayppada ninRu mazhai pozhiyum * gOvarttanam ennum kORRakuDaiyE *  ",
            5: "vaanattil uLLeer! valiyeer uLLeerEl * aRaiyO! vandu vaaNGgumin enbavan pOl * Enattu uruvaagiya eesan endai * idavanezha vaaNGgi edutta malai * kaana kaLiyaanai tan kombizhandu * kaduvaay madam sOrattan kaiyeduttu * koonal piRai vENdi aNNaandu niRkum * gOvarttanam ennum koRRakkuDaiyE. *  ",
            6: "seppaadudaiya tirumaalavan tan * sendaamarai kaiviral aindinaiyum * kappaaga maduttu maNi neDuntOL * kaambaaga koduttu kavitta malai * eppaaDum parandizhi teLLaruvi * ilaNGgu maNi muttu vaDam piRazha * kuppaayamena ninRu kaatchitarum * gOvarttanam ennum koRRakkuDaiyE. * ",
            7: "padaNGgaL palavum uDai paambaraiyan * padar boomiyai taaNGgi kidappavan pOl * tadaNGgai viralaindum malara vaittu * daamOdaran taaNGgu tadavaraitaan * adaNGgachchenRu ilaNGgaiyai eedazhitta * anuman pagazh paadi tam kuttan_kaLai * kudaNGgai koNDu mandigaL kaN vaLarttum * gOvarttanam ennum koRRakkuDaiyE. *  ",
            8: "salamaamugil palkaNap pOrkkaLattu * saramaari pozhindu eNGgum poosalittu * nalivaanuRa kEdakam kOppavanpOl * naaraayaNan munmagam kaatta malai * ilaivEy kurambai tavamaa munivar * irundaar naDuvE senRu aNaar soRiya * kolaivaay sina vENGgaihaL ninRuRaNGgum * gOvarttanam ennum koRRakkuDaiyE. ",
            9: "vanpEy mulaiyuNdatOr vaayudaiyan * van_tooNena ninRadOr vanparattai * tanpErittukkoNdu taraNi tannil * daamOdaran taaNGgu tadavaraitaan * munbE vazhikaatta musukkaNaNGgaL * muduhil peydu tammudai kuttan_kaLai * kombERRi irundu kudi payiRRum * gOvarttanam ennum koRRakkuDaiyE. *  ",
            10: "koDiyERu sendaamarai kaiviralhaL * kOlamum azhindila vaadiRRila * vadivERu tiruvuhir nondumila * maNivaNNan malaiyumOr sampiradam * mudiyERiya maamuhil pal kaNaNGgaL * munneRRi naraittana pOla *  eNGgum kudiyERi irundu mazhai pozhiyum * gOvarttanam ennum koRRakkuDaiyE * . ",
            11: "aravil paLLi koNDu aravam turandiTTu * arava pakaiyoordi avanuDaiya * kuraviRkoDi mullaigaL ninRuRangum * gOvarttanam ennum koRRakkudaimEl * tiruviR polimaRai vaaNar puttoortihazh *  pattar piraan sonna maalai pattum * paravu mana nankudai pattaruLLaar * paramaana vaikuntam naNNuvarE. ",
        },
        'PAT.3.6.steps':
        {
            1: "nAvalam periya teevinil vAzhum * nangaimeerkAL! idu Or aRpudam kELeer * toovalam puriyuDaiya tirumAl * tooyavAyil kuzhalOsai vazhiyE * kOvalar siRumiyar iLangongai-kudugalippa *  uDaluLavizhndu *  engum-kAvalum kaDandu kayiRumAlaiyAki * vandu kavizhndu ninRanarE. ",
            2: "iDavaNarai iDattOLoDu sAyttu * irugai kooDappuruvam nerindERa * kuDavayiRu paDavAy kaDaikooDak * gOvindan kuzhalkoDu oodinapOdu * maDamayilhaLoDu mAnbiNai pOlE * mangaimArkaL malar koondal avizha * uDai nekizha Or kaiyAl tugil paRRi * olkiyODarikkaNODa ninRanarE. ",
            3: "vAn iLavarasu vaikunta kuttan * vAsudEvan madurai mannan * nanda kOn iLavarasu kOvalar kuttan * gOvindan kuzhalkoDu oodinapOdu * vAniLam paDiyar vandu vandeeNDi * manamurugi malarkkaNkaL panippa * tEnaLavu seRikoondal avizha * senni vErppa sevi sErttu ninRanarE. * ",
            4: "tEnukan pilamban kALiyan ennum * teeppa pooDukaL aDanga uzhakki * kAnakambaDi ulAviyulAvik * karuNYchiRukkan kuzhaloodina pOdu * mEnakaiyoDu tilOttamai arambai * uruppasi aravar veLhi mayangi * vAnakam paDiyil vAy tiRappinRi * ADal pADalavai mARinar tAmE * . ",
            5: "mun narasingamadagi * avuNan mannar aNYjum *  madusoodanan vAyil * kuzhalin Osai seviyai paRRi vAnga * nannarambuDaiya tumburuvODu * nAradanum tamtam veeNai maRandu * kinnara midunangaLum tamtam * kinnaram toDukilOm enRanarE. *  ",
            6: "semperum taDang kaNNan tiraL tOLan * dEvaki siRuvan dEvarhaL singam * namparaman innAL kuzhaloodak * kEttavarhaL iDaruRRana kELeer * ambaram tiriyum kAndappar ellAm * amuda geedavalaiyAl surukkuNDu * namparamanRenRu nANi mayangi * naindu sOrndu kaimmaRittu ninRanarE. *  ",
            7: "puviyuL nAn kaNDadOr aRpudam kELeer * pooNimEykkum iLangOvalar koottattu * avaiyuL nagattaNaiyAn kuzhalooda * amara lOkattaLavum senRisaippa * aviyuNA maRandu vAnavar ellAm * AyarpADi niRaiya pugundu eeNDi * seviyuNAvin suvai koNDu magizhndu * gOvindanai toDarndu enRum viDArE. *  ",
            8: "siRu viralhaL taDavi parimARa * sengaN kODa seyyavAy koppaLikka * kuRuveyar puruvam kooDalippak * gOvindan kuzhal koDu oodinapOdu * paRavaiyin kaNangaL kooDu tuRandu * vandu soozhndu paDukADu kiDappa * kaRavaiyin kaNangaL kAl parappiittu * kavizhndiRangi seviyAttakillAvE. *  ",
            9: "tiraNDezhu tazhai mazhai mugil vaNNan * sengamala malar soozh vaNDinam pOlE * suruNDiruNDa kuzhal tAzhnda mugattAn * ooduginRa kuzhalOsai vazhiyE * maruNDu mAnkaNangaL mEyhai maRandu * mEynda pullum kaDaivAy vazhisOra * iraNDu pADum tulangAppuDai peyarA * ezhudu sittirangaL pOla ninRanavE. *  ",
            10: "karungaN tOgaimayil peeli aNindu * katti nanku uDutta peedaga vADai * arungala uruvin Ayar perumAn * avanoruvan kuzhaloodina pOdu * marangaL ninRu madu tAraihaL pAyum * malarhaL veezhum vaLar kombugaL tAzhum * irangum koombum tirumAl ninRa ninRa pakkam nOkki *  avai seyyum guNamE. *  ",
            11: "kuzhaliruNDu suruNDERiya kuNYji * gOvindanuDaiya kOmaLa vAyil * kuzhal muzhaiNYjugaLinooDu kumizhttu * kozhittizhinda amudappunal tannai * kuzhal muzhavam viLambum puduvaikkOn * vishNuchittan viritta tamizh vallAr * kuzhalai venRa kuLir vAyinaragi * sAdu kOttiyuL koLLap paDuvArE. ",
        },
        'PAT.3.7.steps':
        {

            1: "aiyapuzhudi uDambaLaindu *  ivaL pEchchu malandalaiyAy * seyya noolin siRRADai *  seppanaDukkavum vallaL allaL * kaiyinil siRutoodaiyODu *  ivaL muRRil pirindumilaL * paiyaravaNai paLLiyAnODu *  kaivaittu ivaL varumE. *  ",
            2: "vAyil pallum ezhundila *  mayirum muDi kooDiRRila * sAyvilAda kuRundalai *  sila piLLaihaLODu iNangi * teeyiNakkiNangADi vandu *  ivaL tannanna semmai solli * mAyan mAmaNi vaNNanmEl *  ivaL mAluRuginRALE. *  ",
            3: "pongu veN maNal koNDu *  siRRilum muRRattu izhaikkaluRil * shangu chakkaram taNDu vAL *  villum alladu izhaikkaluRAl * kongai innam kuvindezhundila *  gOvindanODu ivaLai * sangaiyAki ennuLLam *  nALtoRum taTTuLuppaginRadE. *  ",
            4: "Ezhai pEdai Or bAlagan vandu *  en peNmagaLai eLki * tOzhimAr palar koNDu pOy *  seyda soozhchchiyai yArkkuraikkEn? * AzhiyAn ennum AzhamOzhaiyil *  pAychchi agappaDutti * moozhaiyup paRiyAdadu ennum *  mooduraiyum ilaLE. *  ",
            5: "nADum oorum aRiyavE pOy * nalla tuzhAyalangaL sooDi *  nAraNan pOmiDamellAm *  sOdittu uzhi taruginRAL * kEDu vENDukinRAr palaruLar *  kEsavanODu ivaLai * pADu kAvaliDumin enRenRu *  pAr taDumARinadE. *  ",
            6: "paTTam kaTTip poRRODu peydu *  ivaL pADagamum silambum * iTTamaga vaLarttu eDuttEnukku *  ennODu irukkaluRAL * poTTa pOy puRappaTTu ninRu *  ivaL poovai poovaNNA ennum * vaTTavAr kuzhal mangaimeer! *  ivaL mAluRukinRALE. *  ",
            7: "pEsavum tariyAda peNmaiyin *  pEdaiyEn pEdai ivaL * koosaminRi ninRArkaL tammedir * kOl kazhindAn moozhaiyAy * kEsavA enRum kEDilee enRum  * kiNYjukavAy mozhiyAL * vAsavAr kuzhal mangaimeer! *  ivaL mAluRuginRALE. *  ",
            8: "kARai pooNum kaNNADi kANum *  tan kaiyil vaLai kulukkum * kooRaiyuDukkum ayarkkum *  tan kovvai sevvAy tiruttum * tERittERi ninRu AyirampEr *  dEvan tiRam pidaRRum * mARil mAmaNivaNNan mEl *  ivaL mAluRukinRALE. *  ",
            9: "kaittalattuLLa mADazhiya * kaNNAlangaL seydu * ivaLai vaittuvaittu koNDu enna vANibam? *  nammai vaDuppaDuttum * seyttalai ezhu nARRuppOl *  avan seyvana seydu koLLa * maittaDamugil vaNNan pakkal *  vaLara viDuminkaLE. *  ",
            10: "perupperutta kaNNAlangaL seydu *  pENi nam illattuLLE * iruttuvAn eNNi nAmirukka *  ivaLum onRu eNNukinRAL * maruttuva padam neenginAL ennum *  vArttai paDuvadan mun * oruppaDuttiDumin ivaLai *  ulagaLandAn iDaikkE. *  ",
            11: "nyalamuRRum uNDu Alilaittuyil *  nArAyaNanukku *  ivaLmAlatAki makizhndanaL enRu *  tAyurai seydadanai * kOlamAr pozhil soozh puduvaiyarkOn *  vishNuchittansonna * mAlai pattum vallavarkaTku *  illai varutuyarE. *  ",
        },
        'PAT.3.8.steps':
        {
            1: "nalladOr tAmaraip poygai *  nAN malar mEl pani sOra * alliyum tAdum udirndiTTu *  azhagazhindAl ottadAlO * illam veRiyODiRRAlO *  en magaLai engum kANEn * mallarai aTTavan pinpOy *  madurai puRam pukkALkolO? *  ",
            2: "onRum aRivonRillAda *  uruvaRaik kOpAlar tangaL * kanRu kAl mARumApOlE *  kanni irundALai koNDu * nanRum kiRi seydu pOnAn *  nArAyaNan seyda teemai * enRum emarkaL kuDikku *  Or Echchukkol AyiDum kolO? *  ",
            3: "kumari maNam seydu koNDu *  kOlam seydu illattirutti * tamarum piRarum aRiya *  dAmOdaraRku enRu sARRi * amarar padiyuDai dEvi *  arasANiyai vazhipaTTu * tumilam ezhappaRai koTTi *  tOraNam nATTiDum kolO? *  ",
            4: "orumagaL tannai uDaiyEn *  ulagam niRainda pugazhAl * tirumagaL pOla vaLarttEn *  sengaNmAltAn koNDupOnAn * perumagaLAy kuDivAzhndu *  perum piLLai peRRa asOdai * marumagaLai kaNDugandu *  maNATTuppuRam seyyum kolO? *  ",
            5: "tammAman nanda gOpAlan *  tazheeikkoNDu en magaL tannai * semmAndirE enRu solli *  sezhuNG kayal kaNNum sevvAyum * kommai mulaiyum iDaiyum *  kozhum paNaittOLgaLum kaNDiTTu * immagaLai peRRa tAyar *  init tariyAr ennum kolO? *  ",
            6: "vEDar maRakkulam pOlE *  vENDiRRu seydu enmagaLai * kooDiya kooTTamEyAka *  koNDu kuDi vAzhungolO? * nADum nagarum aRiya *  nalladOr kaNNAlam seydu * sADiRa pAynda perumAn *  takkavagai paRRungolO? *  ",
            7: "aNDattamarar perumAn *  AzhiyAn inRu enmagaLai * paNDa pazhippukkaL sollip *  parisaRa ANDiDum kolO? * koNDu kuDivAzhkkai vAzhndu *  kOvalappaTTam kavittu * paNDai maNATTimAr munnE *  pAdugAval vaikkum kolO? *  ",
            8: "kuDiyil piRandavar seyyum *  kuNamonRum seydilan andO! * naDai onRum seydilan nangAy! *  nandagOpan magan kaNNan * iDaiyirupAlum vaNanga *  iLaittiLaittu en magaL Engi * kaDaikayiRE paRRi vAngik *  kai tazhumbERiDum kolO? *  ",
            9: "veNNiRa tOytayir tannai *  veL varaippinmun ezhundu * kaNNuRangAdE irundu *  kaDaiyavum tAn vallaLkolO? * oNNiRa tAmarai sengaN *  ulagaLandAn enmagaLai * paNNaRaiyA paNikoNDu  * parisaRa ANDiDum kolO? *  ",
            10: "mAyavan pin vazhi senRu *  vazhiyiDai mARRangaL kETTu * AyargaL sEriyilum pukku *  anguttai mARRamumellAm * tAyavaL solliya sollai *  taN puduvaippaTTansonna * tooya tamizh pattum vallAr *  toomaNi vaNNanukkALarE. *  ",
        },
        'PAT.3.9.steps':
        {
            1: "ennAdan dEvikku *  anRu inbappoo eeyAdAL * tan nAdan kANavE *  taNpoo marattinai * vannAda puLLAl *  valiya paRittiTTa * ennAdan vanmaiyai pADippaRa * empirAn vanmaiyai pADippaRa. *  ",
            2: "en vilvali kaNDu *  pOvenRu edir vandAn * tan villinODum *  tavattai edirvAngi * mun vilvalittu *  mudu peNNuyiruNDAn * tan villin vanmaiyai pADippaRa * dAsaradi tanmaiyai paDippaRa. *  ",
            3: "uruppiNi nangaiyai * tErERRik koNDu * viruppuRRu angEGa * viraindu edirvandu * serukkuRRAn * veeram sidaiya * talaiyai chiraittiTTAn vanmaiyaip pADippaRa * dEvaki singattai pADippaRa. *  ",
            4: "mARRuttAy senRu *  vanam pOhE enRiDa * eeRRuttAy pintoDarndu *  empirAn! enRuazha * kooRRuttAy solla *  koDiya vanam pOna * seeRRamilAdAnai pADippaRa * seedai maNALanaip pADippaRa. *  ",
            5: "panjavar toodanAy *  bAradam kaiseydu * nanjumizh nagam *  kiDanda nalpoyhai pukku * anja paNattin mEl *  pAyndiTTu aruL seyda * anjana vaNNanai pADippaRa * asOdai tansingattai pADippaRa. *  ",
            6: "muDiyonRi  * moovulagangaLum ANDu *  unaDiyERku aruLenRu *  avan pintoDarnda * paDiyil kuNattu *  barada nampikku *  anRuaDinilai eendAnai pADippaRa * ayOttiyar kOmAnai pADippaRa. *  ",
            7: "kALiyan poyhai *  kalanga pAyndiTTu *  avan neeLmuDi aindilum *  ninRu naDam seydu * meeLa avanukku *  aruL seyda vittakan * tOLvali veeramE pADippaRa * toomaNi vaNNanai pADippaRa. *  ",
            8: "tArkku iLandambikku *  araseendu *  taNDakamnooRRavaL *  solkoNDupOhi *  nuDangiDaisoorppaNakAvai *  seviyoDu mookku *  avaL Arkka arindAnai pADippaRa * ayOddikku arasanai pADippaRa. *  ",
            9: "mAyach chakaDam udaittu *  marutiRuttu * AyarkaLODu pOy *  Anirai kAttu *  aNi vEyin kuzhaloodi *  vittakanAy ninRa * AyarkaL ERRinaip pADippaRa * Anirai mEyttAnai pADippaRa. *  ",
            10: "kArAr kaDalai aDaittiTTu *  ilangai pukku * OrAdAn ponmuDi *  onbatODu onRaiyum * nErA avan tambikkE *  neeL araseenda * ArAvamudanai pADippaRa * ayOddiyar vEndanai pADippaRa. *  ",
            11: "nandan madalaiyai *  kAkuttanai navinRu * undi paRanda *  oLiyizhaiyArhaL sol * sendamizh tenpuduvai *  vishNuchittansol * aindinODu aindum vallArkku *  allal illaiyE. *  ",

        },
        'PAT.3.10.steps':
        {
            1: "neRinda karuNGguzhal maDavAy! *  ninnaDiyEn viNNappam * seRinda maNi muDichchanakan *  silaiyiRuttu ninai koNarndaduaRindu *  arasu kaLaikaTTa *  arundavattOn iDai vilaNGga * seRinda silai koDu tavattai *  sidaittadum OraDaiyALam. *  ",
            2: "alliyam poomalar kOdAy! *  aDipaNindEn viNNappam * sollugEn kETTaruLAy *  tuNai malarkkaN maDamAnE! * elliyam pOdu inidiruttal *  irundadOr iDa vagaiyil * malligai mAmAlai koNDu *  aNGgu Arttadum OraDaiyALam. *  ",
            3: "kalakkiya mAmanattanaLAy *  kaikEsi varam vENDa * malakkiya mAmanattananAy *  mannavanum aRAdozhiya * kulakkumarA! kADuRaiya pO enRu  * viDai koDuppa * ilakkumaNan tannoDum *  aNGgu Ekiyadum OraDaiyALam. *  ",
            4: "vAraNinda mulai maDavAy! *  vaidEvee! viNNappam * tEraNinda ayOddiyarkOn *  perundEvee! kETTaruLAy * kooraNinda vElvalavan *  guganODum gaNGgai tannil * seeraNinda tOzhamai *  koNDadum OraDaiyALam. *  ",
            5: "mAnamaru mennOkki! *  vaidEvee! viNNappam * kAnamarum kalladar pOy *  kADuRainda kAlattu * tEnamarum pozhiRsAral *  chittira kooDattu iruppa * pAlmozhiyAy! barada nambi *  paNindadum OraDaiyALam. *  ",
            6: "chittirakooDattu iruppa *  siRukAkkai mulaiteeNDa * attiramE koNDeRiya *  anaittu ulagum tirindODi * vittakanE! irAmAvO! *  ninnabayam enRu azhaippa * attiramE adan kaNNai *  aRuttadum OraDaiyALam. *  ",
            7: "minnotta nuNNiDaiyAy! *  meyyaDiyEn viNNappam * ponnotta mAnonRu *  pukundu inidu viLaiyADa * ninnan pinvazhi ninRu *  silaipiDittu empirAnEha * pinnE angu ilakkumaNan *  pirindadum OraDaiyALam. *  ",
            8: "maittaku mAmalar kuzhalAy! *  vaidEvee! viNNappam * otta pugazh vAnarakkOn *  uDanirundu ninaittEDa * attakuseer ayOddiyarkOn *  aDaiyALam ivai mozhindAn * ittakaiyAl aDaiyALam *  eedu avan kaimOdiramE. *  ",
            9: "tikkuniRai pukazhALan *  tee vELvi senRanAL * mikka perum sabai naDuvE *  villiRuttAn mOdiram kaNDu * okkumAl aDaiyALam *  anumAn! enRu * uchchimEl vaittukkoNDu ukandanaLAl *  malarkkuzhalAL seedaiyumE * . ",
            10: "vArArum mulai maDavAL *  vaidEvi tanaikkaNDu * seerArum tiRal anuman *  terinduraitta aDaiyALam * pArArum pukazh puduvai *  paTTarpirAn pADal vallAr * ErArum vaikunTattu *  imaiyavarODu iruppArE. *  ",
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