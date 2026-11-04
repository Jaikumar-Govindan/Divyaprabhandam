window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PTMDL.0.steps':
        {
            1: "piLLai thirunaRaiyUr araiyar aruLich cheydhadhu: ponnulagil vAnavarum pU magaLum pORRi seyyum * nannudhalIr! nambi naRaiyUrar *** mannulagil en nilaimai kaNDum iranggArEyAm Agil * mannu maDal Urvan vandhu"
        },
        'PTMDL.1.steps':
        {
            1: "** manniya pal poRi sEr Ayira vAy vAL aravin * senni maNik kuDumith dheyvach suDar naDuvuL * manniya nAgaththaNai mEl Or mAmalai pOl * minnum maNi magara kuNDalanggaL vil vIsa * thunniya thAragaiyin pEroLi sEr AgAsam * ennum vidhAnaththin kIzhAl",
            2: "iru suDarai mannum viLakkAga ERRi * maRi kaDalum pannu thiraik kavari vIsa",
            3: "nila manggai thannai muna nAL aLaviTTa thAmarai pOl * manniya sEvaDiyai vAn iyanggu thAragai mIn * ennum malarp piNaiyal Eyndha",
            4: "mazhaik kUndhal thennan uyar poruppum dheyva vaDamalaiyum * ennum ivaiyE mulaiyA vaDivamaindha * anna naDaiya aNanggE(y)",
            5: "aDi iNaiyaith thannuDaiya angkaigaLAl thAn thaDavath thAn kiDandhu * Or unniya yOgaththu uRakkam thalaik koNDa pinnai * than nAbi valayaththup pEroLi sEr * manniya thAmarai mAmalar pUththu * ammalar mEl munnam thisai muganaith thAn paDaikka * maRRavanum munnam paDaiththanan nAnmaRaigaL",
            6: "ammaRai thAn mannum aRam poruL inbam vIDu enRu ulagil * nanneRi mEmpaTTana nAnkanRE",
            7: "nAnkinilum pinnaiyadhu pinnaip peyar tharum enbadhu Or * thonneRiyai vENDuvAr vIzh kaniyum Uzh ilaiyum * ennum ivaiyE nugarndhuDalam thAm varundhi * thunnum ilaikkurambaith thunjchiyum",
            8: "venjchuDarOn mannum azhal nugarndhum vaNthaDaththin uTkiDandhum * innadhOr thanmaiyarAy IngguDalam viTTezhundhu * thonneRikkaN senRAr enappaDum sol allAl * innadhOr kAlaththu inaiyAr idhu peRRAr * ennavum kETTu aRivadhillai",
            9: "uLadhennil mannum kaDungkadhirOn maNDalaththin nannaDuvuL * annadhOr illiyin UDu pOy",
            10: "vIDennum thonneRikkaN senRAraich solluminkaL sollAdhE * annadhE pEsum aRivil siRu manaththu * Anggu annavaraik kaRpippOm yAmE",
            11: "adhu niRka munna nAn sonna aRaththin vazhi muyanRa * annavar thAm kaNDIrgaL Ayirak kaN vAnavar kOn * ponnagaram pukku amarar pORRi seppa",
            12: "ponggoLi sEr kol navilum kOL ari mAth thAn sumandha kOlam sEr * manniya singgAsanaththin mEl",
            13: "vAL neDungkaN kanniyarAl iTTa kavarip podhi avizhndhu * Anggu inniLam pUnthenRal iyangga",
            14: "marunggirundha min anaiya nuNmarunggul mel iyalAr veNmuRuval * munnam mugizhththa mugizh nilA vandharumba * annavar tham mAnOkkam uNDAnggu aNimalar sEr * pon iyal kaRpagaththin kADuDuththa mADellAm * manniya mandhAram pUththa madhuth thivalai * innisai vaNDamarum sOlai vAy mAlai sEr * manniya mA mayil pOl kUndhal",
            15: "mazhaith thaDangkaN min iDaiyArODum viLaiyADi vENDiDaththu * mannum maNith thalaththu mANikka manjchariyin * minnin oLi sEr paLinggu viLimbaDuththa * mannum pavaLakkAl sempon sey maNDapaththuL * anna naDaiya arambaiyar tham kai vaLarththa * innisai yAzh pADal kETTu inbuRRu",
            16: "iru visumbil mannu mazhai thavazhum vANilA nIL madhi thOy * minnin oLi sEr visumbUrum mALigai mEl * mannu maNi viLakkai mATTi",
            17: "mazhaik kaNNAr pannu vichiththiramAp pAppaDuththa paLLi mEl * thunniya sAlEgam sUzh kadhavam thAL thiRappa * annam uzhakka neRindhukka vAL nIlach * chinna naRunthAdhu sUDi",
            18: "Or mandhAram thunnu naRumalarAl thOL koTTi * kaRpagaththin mannu malar vAy maNi vaNDu pin thoDara * inniLam pUnthenRal pugundhu Inggu iLamulai mEl * nannarum sandhanach sERu pularththa",
            19: "thAnggarunjchIr minniDai mEl kai vaiththirundhu EndhiLamulai mEl * pon arumbAram pulamba",
            20: "agam kuzhaindhu Anggu inna uruvin imaiyAth thaDangkaNNAr * annavar tham mAnOkkam uNDu Anggu aNimuRuval * innamudham mAndhi iruppar",
            21: "idhu anRE anna aRaththin payan Avadhu * oN poruLum anna thiRaththadhE AdhalAl",
            22: "kAmaththin mannum vazhi muRaiyE niRRu nAm * mAnOkkin anna naDaiyAr alar Esa ADavar mEl * mannu maDal UrAr enbadhOr vAsagamum * thennuRaiyil kETTu aRivadhuNDu",
            23: "adhanai yAm theLiyOm mannum vaDa neRiyE vENDinOm * vENDAdhAr thennan podhiyil sezhum sandhanak kuzhambin * annadhOr thanmai aRiyAdhAr",
            24: "Ayan vEy innisai Osaikku iranggAdhAr * mAl viDaiyin mannu maNi pulamba vADAdhAr",
            25: "peNNai mEl pinnum avvanRil peDai vAych siRu kuralukku * unni uDal urugi naiyAdhAr",
            26: "umbar vAyth thunnu madhi uguththa thU nilA nIL neruppil * tham uDalam vEvath thaLarAdhAr",
            27: "kAma vEL mannum silai vAy malar vALi kOththeyya * pon neDu vIdhi pugAdhAr",
            28: "tham pUvaNai mEl chinna malark kuzhalum algulum menmulaiyum * inniLa vADai thaDavath thAm kaN thuyilum * pon anaiyAr pinnum thiru uRuga",
            29: "pOr vEndhan thannuDaiya thAdhai paNiyAl arasozhindhu * pon nagaram pinnE pulamba valam koNDu * mannum vaLa nADu kai viTTu",
            30: "mAthiranggaL min uruvil viN thEr thirindhu veLippaTTu * kal niraindhu thIyndhu kazhai uDaindhu kAl suzhanRu * pinnum thirai vayiRRup pEyE thirindhulavA * konnavilum vengkAnaththUDu",
            31: "koDungkadhirOn thunnu veyil vaRuththa vemparal mEl panjchaDiyAl * mannan irAman pin vaidhEvi enRuraikkum * anna naDaiya aNanggu naDandhilaLE? * pinnum karu neDungkaN sevvAyp piNai nOkkin * min anaiya nuNmarunggul vEgavadhi enRuraikkum kanni * than innuyirAm kAdhalanaik kANAdhu * thannuDaiya mun thOnRal koNDEgath thAn senRu * anggu annavanai nOkkAdhu azhiththu urappi",
            32: "vAL amaruL kal navil thOL kALaiyaik kaip piDiththu mINDum pOy * pon navilum Agam puNarndhilaLE? * pUngganggai munnam punal parakkum nal nADan min ADum * konnavilum nIL vEl gurukkaL kula madhalai * than nigar onRillAdha venRith dhananjchayanai * pannAgarAyan maDap pAvai",
            33: "pAvai than manniya nAN achcham maDam enRivai agala * thannuDaiya konggai muganeriya",
            34: "thAn avan than pon varai Agam thazhIik koNDu pOy * thanadhu nal nagaram pukku nayandhu inidhu vAzhndhadhuvum * mun uraiyil kETTu aRivadhu illaiyE?",
            35: "sUzh kaDaluL pon nagaram seRRa purandharanODu Er okkum * mannavan vANan avuNarkku vAL vEndhan * thannuDaiya pAvai ulagaththuth than okkum * kanniyarai illAdha kATchiyAL",
            36: "thannuDaiya innuyirth thOzhiyAl emperumAn InthuzhAy * mannu maNi varaith thOL mAyavan",
            37: "pAviyEn ennai idhu viLaiththa IriraNDu mAl varaith thOL * mannavan than kAdhalanai mAyaththAl koNDu pOy * kanni than pAl vaikka maRRavanODu eththanaiyOr * manniya pEr inbam eydhinAL",
            38: "maRRivai thAn ennAlE kETTIrE? EzhaigAL! en uraikkEn? * mannu malai araiyan poRpAvai",
            39: "vANilA minnu maNi muRuval sevvAy umai ennum * anna naDaiya aNanggu nuDanggiDai sEr * pon uDambu vADap pulan aindhum nondhagala * thannuDaiya kUzhaich saDAbAram thAn thariththu * Anggu anna arunthavaththin UDu pOy",
            40: "AyiranthOL mannu karathalanggaL maTTiththu * mAthiranggaL minni eri vIsa mEl eDuththa sUzh kazhaRkAl * pon ulagam Ezhum kaDandhu umbar mEl silumba * mannu kula varaiyum mArudhamum thAragaiyum * thannin uDanE suzhalach suzhanRADum * konnavilum mUvilai vEl kUththan poDiyADi * annavan than pon agalam senRAnggu aNaindhilaLE? * panni uraikkungkAl bAradhamAm",
            41: "pAviyERku en uRu nOy yAn uraippak kENmin * irumpozhil sUzh mannu maRaiyOr thirunaRaiyUr mAmalai pOl * pon iyalum mADak kavADam kaDandhu pukku * ennuDaiya kaN kaLippa nOkkinEn",
            42: "nOkkudhalum mannan thiru mArbum vAyum aDi iNaiyum * pannu karathalamum kaNgaLum",
            43: "panggayaththin pon iyal kADOr maNi varai mEl pUththadhu pOl * minni oLi paDaippa vIzh nANum thOL vaLaiyum * manniya kuNDalamum Aramum nIL muDiyum * thunnu veyil viriththa sULAmaNi imaippa * mannu maradhagak kunRin marunggE",
            44: "Or inniLa vanjchik koDi onRu ninRadhu thAn * annamAy mAnAy aNimayilAy AnggiDaiyE * minnAy iLavEy iraNDAy iNaich cheppAy * munnAya thoNDaiyAyk keNDaik kulam iraNDAy * anna thiru uruvam ninRadhu aRiyAdhE * ennuDaiya nenjchum aRivum ina vaLaiyum * pon iyalum mEgalaiyum Anggozhiyap pOndhERku * mannu maRi kaDalum Arkkum",
            45: "madhi uguththa innilAvin kadhirum en thanakkE veydhAgum * thannuDaiya thanmai thavirath thAn en kolO? * thennan podhiyil sezhunjchandhin thAdhaLaindhu * mannu ivvulagai manam kaLippa vandhu iyanggum * inniLam pUnthenRalum vIsum eri enakkE * munniya peNNai mEl muL muLarik kUTTagaththu * pinnum avvanRil peDai vAych siRu kuralum * ennuDaiya nenjchukkOr Ir vALAm en seygEn? * kal navil thOL kAman karuppuch silai vaLaiya * kol navilum pUngkaNaigaL kOththup podha aNaindhu * thannuDaiya thOL kazhiya vAnggi",
            46: "thamiyEn mEl ennuDaiya nenjchE ilakkAga eyginRAn * pin idhanaik kAppIr thAm illaiyE",
            47: "pEdhaiyEn kal navilum kATTagaththu Or vallik kaDi malarin * nal naRu vAsam maRRArAnum eydhAmE * mannum vaRu nilaththu vALA Anggu uguththadhu pOl * ennuDaiya peNmaiyum en nalanum en mulaiyum * mannu malar manggai maindhan * kaNapuraththup pon malai pOl ninRavan than pon agalam thOyAvEl * en ivai thAn? vALA enakkE poRai Agi * mun irundhu mUkkinRu mUvAmaik kAppadhOr * mannum marundhaRivIr illaiyE?",
            48: "mAl viDaiyin thunnu piDar eruththuth thUkkuNDu * van thoDarAl kanniyar kaN miLirak kaTTuNDu * mAlai vAyth thannuDaiya nA ozhiyAdhu ADum thani maNiyin * innisai Osaiyum vandhu en sevi thanakkE * kol navilum eqkil koDidhAy neDidhAgum * en idhanaik kAkkumA? sollIr",
            49: "idhu viLaiththa mannan naRunthuzhAy vAzh mArban",
            50: "mA madhi kOL munnam viDuththa mugil vaNNan * kAyAvin sinna naRum pUnthigazh vaNNan * vaNNam pOl anna kaDalai malai iTTu aNai kaTTi * mannan irAvaNanai mA maNDu venjchamaththu * pon muDigaL paththum puraLach charam thurandhu * thennulagam ERRuviththa sEvaganai",
            51: "Ayirak kaN mannavan vAnamum vAnavar tham pon ulagum * thannuDaiya thOL valiyAl kaik koNDa dhAnavanai * pin Or ari uruvam Agi eri vizhiththu * kol navilum venjchamaththuk kollAdhE",
            52: "vallALan mannu maNik kunjchi paRRi vara Irththu * thannuDaiya thAL mEl kiDAththi",
            53: "avanuDaiya pon agalam vaL ugirAl pOzhndhu pugazh paDaiththa * min ilanggum Azhip paDaith thaDak kai vIranai * mannu ivvagal iDaththai mA mudhu nIr thAn vizhungga * pinnum Or EnamAyp pukku vaLai maruppil * kol navilum kUr nudhi mEl vaiththu eDuththa kUththanai * mannum vaDa malaiyai maththAga mAsuNaththAl * minnum iru suDarum viNNum piRanggoLiyum * thanninuDanE suzhala malai thiriththu * Anggu innamudham vAnavarai UTTi * avaruDaiya mannum thuyar kaDindha vaLLalai",
            54: "maRRanRiyum than uruvam Arum aRiyAmal thAn anggOr * mannum kuRaL uruvin mANiyAy",
            55: "mAvali than pon iyalum vELvikkaN pukkirundhu * pOr vEndhar mannai manangkoLLa vanjchiththu nenjchurukki * ennuDaiya pAdhaththAl yAn aLappa mUvaDi maN * mannA! tharuga enRu vAy thiRappa",
            56: "maRRavanum ennAl tharappaTTadhu enRalumE * aththuNaikkaN minnAr maNi muDi pOy viN thaDava",
            57: "mEl eDuththa ponnAr kanai kazhaRkAl Ezh ulagum pOyk kaDandhu * anggu onnA asurar thuLanggach sela nITTi * mannu ivvagal iDaththai mAvaliyai vanjchiththu * than ulagam Akkuviththa thALAnai",
            58: "thAmarai mEl minniDaiyAL nAyaganai viNNagaruL pon malaiyai * ponni maNi kozhikkum pUngkuDandhaip pOr viDaiyai * then nankuRungkuDiyuL sempavaLak kunRinai * manniya thaN sERai vaLLalai",
            59: "mA malar mEl annam thuyilum aNi nIr vayal Ali * ennuDaiya innamudhai evvuL perumalaiyai * kanni madhiL sUzh kaNamanggaik kaRpagaththai * minnai iru suDarai veLLaRaiyuL kal aRai mEl ponnai * maradhagaththaip puTkuzhi em pOr ERRai * ** mannum aranggaththu em mA maNiyai",
            60: "vallavAzhp pinnai maNALanai pEril piRappiliyai * thonnIrk kaDal kiDandha thOLA maNich suDarai * en manaththu mAlai iDavendhai Isanai * mannum kaDalmallai mAyavanai",
            61: "vAnavar tham senni maNich suDaraith thaNkAl thiRal valiyai * thannaip piRar aRiyAth thaththuvaththai muththinai * annaththai mInai ariyai arumaRaiyai * mun ivvulaguNDa mUrththiyai",
            62: "kOvalUr mannum iDaikazhi em mAyavanai * pEy alaRap pinnum mulai uNDa piLLaiyai",
            63: "aLLal vAy annam irai thEr azhundhUr ezhum suDarai * then thillaich chiththira kUDaththu en selvanai",
            64: "minni mazhai thavazhum vEngkaDaththu em viththaganai * mannanai mAlirunjchOlai maNALanai * kol navilum Azhip paDaiyAnai",
            65: "kOTTiyUr anna uruvin ariyai * thirumeyyaththu innamudha veLLaththai indhaLUr andhaNanai * mannu madhiL kachchi vELukkai ALariyai * manniya pADagaththu em maindhanai",
            66: "veqkAvil unniya yOgaththu uRakkaththai * UragaththuL annavanai aTTabuyakaraththu emmAn ERRai * ennai manam kavarndha Isanai",
            67: "vAnavar tham munnavanai mUzhik kaLaththu viLakkinai * annavanai AdhanUr ANDaLakkum aiyanai * nennalai inRinai nALaiyai",
            68: "nIrmalai mEl mannum maRai nAnkum AnAnai * pullANith thennan thamizhai vaDamozhiyai * nAnggUril mannu maNimADak kOyil maNALanai * nannIrth thalaichchangga nANmadhiyai",
            69: "nAn vaNanggum kaNNanaik kaNNapuraththAnai * thennaRaiyUr mannu maNimADak kOyil maNALanai * kal navil thOL kALaiyaik kaNDAngguk kai thozhudhu * en nilaimai ellAm aRiviththAl emperumAn * than aruLum Agamum thArAnEl",
            70: "thannai nAn minniDaiyAr sEriyilum vEdhiyargaL vAzhviDaththum * than aDiyAr munbum tharaNi muzhudhALum * kol navilum vEl vEndhar kUTTaththum nATTagaththum * than nilaimai ellAm aRivippan",
            71: "thAn muna nAL minniDai Aychchiyar tham sErik kaLavinkaN * thunnu paDal thiRandhu pukku",
            72: "thayir veNNey than vayiRAra vizhungga * kozhungkayaRkaN mannu maDavOrgaL paRRi Or vAn kayiRRAl * pinnum uralODu kaTTuNDa peRRimaiyum * annadhOr bUthamAy Ayar vizhavinkaN * thunnu sagaDaththAl pukka perunjchORRai * mun irundhu muRRath thAn thuRRiya theRRenavum * mannar perum savaiyuL vAzh vEndhar thUdhanAy * thannai igazndhu uraippath thAn muna nAL senRadhuvum * mannu paRai kaRangga manggaiyar tham kaN kaLippa * konnavilum kUththanAyp peyarththum kuDam ADi * en ivan? ennappaDuginRa IDaRavum * then ilanggaiyATTi arakkar kulap pAvai * mannan irAvaNan than nal thanggai",
            73: "vAL eyiRRuth thunnu suDu sinaththuch sUrpaNakAch sOrveydhi * pon niRam koNDu pularndhu ezhundha kAmaththAl * thannai nayandhALaith thAn munindhu mUkkarindhu * manniya thiNNenavum vAyththa malai pOlum * than nigar onRillAdha thADagaiyai",
            74: "** mAmunikkAth thennulagam ERRuviththa thiN thiRalum * maRRivai thAn unni ulavA ulagaRiya Urvan nAn * munni muLaiththezhundhu Onggi oLi parandha * manniya pUm peNNai maDal en nilaimai ellAm aRiviththAl emperumAn * than aruLum Agamum thArAnEl",
            75: "pinnaip pOy oNDuRai nIr vElai ulagaRiya Urvan nAn * vaNDaRai pUm peNNai maDal",
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