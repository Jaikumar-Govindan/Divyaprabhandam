window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PAT.5.1.steps': {
            1: "vAkkut tooymai ilAmaiyinAlE * mAdavA! unnai vAykkoLLa mAttEn * nAkku ninnaiyallAl aRiyAdu * nAn adaNYjuvan en vasam anRu * moorkkup pEsukinRAn ivan enRu * munivAyElum en nAvinukku ARREn * kAkkai vAyilum katturai koLvar * ",
            2: "chazhakku nAkkoDu punkavi sonnEn * shanku chakkaram Endu kaiyAnE! * pizhaippar agilum tammaDiyAr sol * poRuppadu periyOr kaDananRE * vizhikkum kaNNilEn nin kaN maRRallAl * vERoruvarODu en manam paRRAdu * uzhaikkuOr puLLi migaiyanRu kaNDAy * ",
            3: "nanmai teemaigaL onRum aRiyEn * nAraNA! ennum ittanai allAl * punmaiyAl unnai puLLuvam pEsi * pugazhvAn anRu kaNDAy tirumAlE! * unnumARu unnai onRum aRiyEn * OvAdE namO nAraNA! enban * vanmaiyAvadu un kOyilil vAzhum * ",
            4: "neDumaiyAl ulagEzhum aLandAy! * ninmalA! neDiyAy! aDiyEnai * kuDimai koLvadaRku aiyuRa vENDA * kooRai sORu ivai vENDuvadu illai * aDimai ennum akkOyinmaiyAlE * aNGaNGE avai pOdarum kaNDAy * koDumai kaNYjanai konRu nintAdai * ,",
            5: "tOttam illavaL Attozhu ODai * tuDavaiyum kiNaRum ivai ellAm * vAttaminRi unponnaDi keezhE * vaLaippagam vakuttu koNDirundEn * nAttu mAniDattODu enakku aridu * nachchuvAr palar kEzhalonRAki * kOttu maNkoNDa koLkaiyinAnE! * ",
            6: "kaNNA! nAnmukanai paDaittAnE! * kAraNA! kariyAy! aDiyEn nAn * uNNA nAL pasiyAvadu onRillai * OvAdE namO nAraNA enRu * eNNA nALum irukkesu sAma vEda * naNNA nAL *  avaitattuRumAkil * ",
            7: "veLLai veLLattin mEl oru pAmbai * mettaiyaga virittu *  adanmElE-kaLLa nittirai koLhinRa mArkkam * kANalAngol enRAsaiyinAlE * uLLam sOra ugandedir vimmi * urOmakoobangaLAy *  kaNNa neerkaL-tuLLamsOrat tuyilaNai koLLEn * ",
            8: "vaNNamAl varaiyE kuDaiyAka * mArikAttavanE! madusoodA! * kaNNanE! karikOL viDuttAnE! * kAraNA! kaLiRatta pirAnE! * eNNuvAr iDarai kaLaivAnE! * Ettarum peruNG keerttiyinAnE! * naNNi nAn unnai nALtoRum Ettum * ",
            9: "nambanE! navinREtta vallArkaL * nAdanE! narasiNGamadu AnAy! * umbarkOn ulagEzhum aLandAy * oozhiyAyinAy! Azhi munnEndi * kambamA karikOL viDuttAnE! * kAraNA! kaDalai kaDaindAnE! * embirAn! ennai ALuDait tEnE! * ",
            10: "kAmar tAdai karudalar siNGgam * kANa iniya karunguzhal kuttan * vAmanan enmaradaka vaNNan * mAdavan madusoodanan tannai * sEma nankamarum puduvaiyarkOn * vishNu chittan viyan tamizh pattum * nAmam enRu navinRuraippArkaL * ",

        },
        'PAT.5.2.steps': {
            1: " neykkuDattaip paRRi *  ERum eRumbukaL pOl nirandu *  engum-kaikkoNDu niRkinRa nOygAL! *  kAlam peRa uyyappOmin * meykkoNDu vandupugundu *  vEdappirAnAr kiDandAr * paikkoNDa pAmbaNaiyODum *  paNDanRu paTTinam kAppE ",
            2: " chittirakuttan ezhuttAl *  tenpulakkOn poRiyoRRi * vaitta ilachchinai mARRi *  tooduvar ODiyoLittAr * muttu tiraikkaDaR sErppan *  moodaRivALar mudalvan * pattarkku amudanaDiyEn *  paNDanRu paTTinam kAppE. ",
            3: " vayiRRil tozhuvaip pirittu *  vanpulach chEvaiyadakki * kayiRRum akkANi kazhittuk *  kAliDai pAsam kazhaRRi * eyiRRiDai maNkoNDa endai *  irAppagal Oduvittu *  ennaip-payiRRi paNi seyyak koNDAn *  paNDanRu paTTinam kAppE. ",
            4: " mangiya valvinai nOyhAL! *  umakkum Orvalvinai kaNDeer * ingup pugEnmin pugEnmin *  eLidanRu kaNDeer pugEnmin * singappirAn avan emmAn *  sErum tirukkOyil kaNDeer * pangappaDAdu uyyappOmin *  paNDanRu paTTinam kAppE. ",
            5: " mANi kuRaLuruvAya *  mAyanai en manattuLLE * pENik koNarndu pugudavaittuk koNDEn *  piRidinRi * mANikkap paNDAram kaNDeer *  valivan kuRumbarkaLLeer! * pANikka vENDA naDamin *  paNDanRu paTTinam kAppE. ",
            6: " uRRavuRu piNi nOyhAL! *  umakku onRu sollukEn kENmin * peRRangaL mEykkum pirAnAr *  pENum tirukkOyil kaNDeer * aRRamuraikkinREn *  innam AzhvinaikAL! *  umakkuinguOr-paRRillai kaNDeer naDamin *  paNDanRu paTTinam kAppE. ",
            7: " kongai siRuvarai ennum *  podumbinil veezhndu vazhukki * angOr muzhaiyinil pukkiTTu *  azhundi kiDandu uzhalvEnai * vangakkaDal vaNNan ammAn *  valvinai Ayina mARRi * pangappaDA vaNNam seydAn *  paNDanRu paTTinam kAppE. ",
            8: " EdangaL AyinavellAm *  iRangaliDuvittu *  ennuLLE-peedaga ADaip pirAnAr *  birama guruvagi vandu * pOdil kamala vannenjam *  pukundum ensennittiDaril * pAda ilachchinai vaittAr *  paNDanRu paTTinam kAppE. ",
            9: " uRagal uRagal uRagal *  oN suDar AzhiyE! shankE! * aRaveRi nAndaga vALE! *  azhakiya sArngamE! taNDE! * iRavupaDAmal irunda *  eNmar ulOhapAleerkAL! * paRavaiyaraiyA! uRagal *  paLLiyaRaik kuRikkoNmin. ",
            10: " aravattu amaLiyinODum *  azhagiya pARkaDalODum * aravinda pAvaiyumtAnum *  agampaDi vandu pugundu * paravai tiraipalamOda *  paLLi koLhinRa pirAnai * paravuginRAn vishNu chittan *  paTTinam kAvaR poruTTE. ",
        },
        'PAT.5.3.steps': {
            1: " tukkach chuzhalaiyai soozhndu kiDanda *  valaiyai aRappaRittu * pukkinil pukkunnai kaNDu koNDEn *  inippOha viDuvaduNDO? * makkaL aRuvarai kalliDai mOda *  izhandavaL tan vayiRRil * sikkena vandu piRandu ninRAy! *  tirumAlirunchOlai endAy!  ",
            2: " vaLaittu vaittEn inip pOhaloTTEn *  untan indira nAlaNGgkaLAl * oLittiDil nin tiruvANai kaNDAy *  nee oruvarkkum meyyanallai * aLitteNGgum nADum nugaramum *  tammuDai teevinai teerkkaluRRu * teLittu valancheyyum teerttamuDai *  tirumAlirunchOlai endAy! ",
            3: " unakku paNi seytirukkum tavamuDaiyEn, *  inippOy oruvan-tanakkup paNindu *  kaDaittalai niRkai *  ninsAyai azhivu kaNDAy * punattinai kiLLip puduvavikATTi *  un ponnaDi vAzhhavenRu * inakkuRavar pudiyaduNNum *  ezhil mAlirunchOlai endAy! ",
            4: " kAdam palavum tirindu uzhanRERku *  angOr nizhalillai neerumillai *  un-pAda nizhalallAl maRROr uyirppiDam *  nAn engum kANkinRilEn * toodu senRAy! guru pANDavarkkAy *  angOr poysuRRam pEsichchenRu * pEdancheydu eNGgum piNampaDaittAy! *  tirumAlirunchOlai endAy! ",
            5: " kAlum ezhA kaNNa neerum nillA *  uDal sOrndu naDungi *  kural-mElum ezhA mayir koochchumaRA *  enatOLhaLum veezhvozhiyA * mAlugaLA niRkum enmananE! *  unnai vAzhat talaip peydiTTEn * sElugaLA niRkum neeL sunaisoozh *  tirumAlirunchOlai endAy! ",
            6: " eruttuk koDiyuDaiyAnum *  biramanum indiranum *  maRRum-oruttarum ippiRavi ennum nOykku *  marundu aRivArum illai * maruttuvanAy ninRa mAmaNi vaNNA! *  maRupiRavi tavirat-tirutti *  unkOyil kaDaippugappey *  tirumAlirunchOlai endAy! ",
            7: " akkarai ennumanattak kaDaluL azhundi *  un pEraruLAl * ikkarai yERi iLaittu irundEnai *  anchEl enRu kaikaviyAy * sakkaramum taDakkaigaLum *  kaNgaLum peeduga vADaiyoDum * sekkar niRattu sivappuDaiyAy! *  tirumAlirunchOlai endAy! ",
            8: " ettanai kAlamum ettanai oozhiyum *  inRoDu nALai enRE * ittanai kAlamum pOykkiRippaTTEn *  ini unnaip pOhaloTTEn * maittunanmArkaLaivAzhvittu *  mARRalar nooRRuvaraik keDuttAy! * sittam ninpAlatu aRidiyanRE *  tirumAlirunchOlai endAy! ",
            9: " anRu vayiRRil kiDandirundE *  aDimai seyyaluRRiruppan * inRu vanduingu unnaik kaNDu koNDEn *  inip pOha viDuvaduNDE? * senRangu vANanai AyirandOLum *  tiruch chakkarama tanAl * tenRit tisaitisaiveezhach cheRRAy! *  tirumAlirunchOlai endAy! ",
            10: " senRulagam kuDaindADum sunai *  tirumAlirunchOlai tannuL-ninRa pirAn *  aDimEl aDimaittiRam *  nEr paDa viNNappam sey * pon tihazh mADam polindu tOnrum *  puduvaikkOn vishNu chittan * onRinODu onbadum pADa vallAr *  ulugam aLandAn tamarE. ",
        },
        'PAT.5.4.steps': {
            1: " senniyOngu *  taN tiruvEnkaTam uDaiyAy! *  ulagu-tannai vAzha ninRa nambee! *  dAmOdarA! sadirA! * ennaiyum en uDaimaiyaiyum *  un sakkarap poRiyoRRik koNDu * ninnaruLE purindirundEn *  ini en tirukkuRippE? ",
            2: " paRavai ERu parampuruDA! *  nee ennaik kaikkoNDapin * piRavi ennum kaDalum vaRRi *  perumpadam aginRadAl * iRavu seyyum pAvakkADu *  teekkoLee i vEhinRadAl * aRivai ennum amudavARu *  talaippaRRi vAyk koNDadE. ",
            3: " emmanA! enkula deyvamE! *  ennuDai nAyaganE! * ninnuLEnAy peRRa nanmai *  ivvulaginil Ar peRuvAr? * namman pOlE veezhttamukkum *  nATTiluLLa pAvam ellAm * summenAtE kaiviTTODit *  tooRugaL pAyndanavE. ",
            4: " kaDal kaDaindu amudam koNDu *  kalasattai niRaittAR pOl * uDalurugi vAytiRandu *  maDuttu unnai niRaittuk koNDEn * koDumai seyyum kooRRamum *  en kOlADi kuRugappeRA * taDavaraittOL chakkarapANee! *  sArngaviR sEvakanE! ",
            5: " ponnaik koNDu uraihal meedE *  niRamezha uraittAR pOl * unnaik koNDu en nAvakampAl *  mARRinRi uraittuk koNDEn * unnaik koNDu ennuL vaittEn *  ennaiyum unniliTTEn * ennappA! en iruDeekEsA! *  ennuyirk kAvalanE! ",
            6: " unnuDaiya vikkiramam *  onRozhiyAmal ellAm * ennuDaiya nenjagampAl *  suvar vazhi ezhudik koNDEn * mannaDanga mazhuvalangaik koNDa *  irAma nambee! * enniDai vandu emberumAn! *  ini engup pOhinRadE? ",
            7: " paruppadattu kayal poRitta *  pANDiyar kulapati pOl * tirup polinda sEvaDi *  en senniyinmEl poRittAy * marupposittAy! mallaDarttAy! *  enRenRu unvAsakamE * uruppolinda nAvinEnai *  unakku urittAkkinaiyE. ",
            8: " anandan pAlum garuDan pAlum *  aidu noydaga vaittu *  en-manandanuLLE vanduvaihi *  vAzhachcheydAy embirAn! * ninaindu ennuLLE ninRu nekkuk *  kaNgaL asumpozhuga * ninaindirundE siramam teerndEn *  nEmi neDiyavanE! ",
            9: " panik kaDalil paLLikOLai *  pazhaka viTTu *  ODi vandu en-manak kaDalil vAzha valla *  mAya maNALa nambee! * tanik kaDalE! tanichchuDarE! *  taniyulagE enRenRu * unakkiDamAyirukka *  ennai unakku urittAkkinaiyE. ",
            10: " taDavarai vAy miLirndu minnum *  tavaLa neDungoDi pOl * suDaroLiyAy nenchinuLLE *  tOnRum en jOdi nambi! * vaDataDamum vaikunTamum *  madiL tuvarA patiyum * iDavagaikaL igazhndiTTu *  enpAl iDavagai koNDanaiyE. ",
            11: "vEyar tangaL kulattuditta *  vishNu chittan manattE * kOyil koNDa kOvalanai *  kozhunguLir mugil vaNNanai * AyarERRai amarar kOvai *  andaNartam amudattinai * sAyaipOla pADa vallAr *  tAmum aNukkarkaLE.",
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