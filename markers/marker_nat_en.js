window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'NAT.0.steps':
    {
      1: "allinAL thAmarai mEl AraNangin inthuNaivi * malli nAdANda madamayil * - melliyalALAyarkula vEndhan AgaththAL then pudhuvaivEyar payandha viLakku *",
      2: "kOlach churisangai mAyan sevvAyin guNam vinavum seelaththanaL * then thirumalli nAdi * sezhunguzhal mEl mAlaith thodai thennarangarukku Iyum madhippudaiya sOlaik kiLi * avaL thUya naRpAdham thuNai namakkE *"
    },


    'NAT.1.steps':
    {
      1: "thaiyoru thingaLum tharai viLakkith * thaN maNdalamittu mAsi munnAL * aiya nuNmaNaR koNdu theruvaNindhu * azhaginukku alangariththu ananga dhEvA! * uyyavumAngolO enRu solli * unnaiyum umbiyaiyum thozhudhEn * veyyadhOr thazhal umizh chakkarak kai * vEngadavaRku ennai vidhikkiRRiyE *",
      2: "veLLai nuNmaNaR koNdu theruvaNindhu * veLvaraippadhan munnam thuRai padindhu * muLLumillAch chuLLi erimaduththu * muyanRu unnai nORkinREn kAma dhEvA! * kaLLavizh pUngaNai thoduththuk koNdu * kadalvaNNan enbadhOr pEr ezhudhi * puLLinai vAy piLandhAn enbadhOr * ilakkinil puga ennai eygiRRiyE *",
      3: "maththanan naRumalar murukkamalar koNdu * muppOdhum unnadi vaNangi * thaththuvamili enRu nenjerindhu * vAsagaththazhiththu unnai vaidhidAmE * koththalar pUngaNai thoduththuk koNdu * gOvindhan enbadhOr pEr ezhudhi * viththagan vEngadavANan ennum * viLakkinil puga ennai vidhikkiRRiyE *",
      4: "suvaril purANa! nin pEr ezhudhich * suRavanaR kodikkaLum thurangangaLum * kavarip piNAkkaLum karuppu villum * kAttith thandhEn kandAy kAma dhEvA! * avaraip pirAyam thodangi * enRum Adhariththu ezhundha en thadamulaigaL * thuvaraip pirAnukkE sangaRpiththuth * thozhudhu vaiththEn ollai vidhikkiRRiyE *",
      5: "vAnidai vAzhum avvAnavarkku * maRaiyavar vELviyil vaguththa avi * kAnidaith thirivadhOr nari pugundhu * kadappadhum mOppadhum seyvadhoppa * Unidai Azhi sangu uththamarkkenRu * unniththu ezhundha en thadamulaigaL * mAnidavarkkenRu pEchchuppadil * vAzhagillEn kaNdAy manmadhanE! *",
      6: "uruvudaiyAr iLaiyArgaL nallAr * Oththu vallArgaLaik koNdu * vaigal theruvidai edhir koNdu panguni nAL * thirundhavE nORkinREn kAma dhEvA! * karuvudai mugilvaNNan kAyAvaNNan * karuviLai pOl vaNNan kamala vaNNath * thiruvudai mugaththinil thirukkaNgaLAl * thirundhavE nOkkenakku aruL kaNday *",
      7: "kAyudai nellodu karumbamaiththuk * katti arisi aval amaiththu * vAyudai maRaiyavar mandhiraththAl * manmadhanE! unnai vaNanguginREn * thEsa munnaLandhavan thirivikkiraman thirukkaigaLAl ennaith thINdum vaNNam * sAyudai vayiRum en thadamulaiyum * tharaNiyil thalaippugazh tharakkiRRiyE *",
      8: "mAsudai udambodu thalai ulaRi * vAyppuram veLuththu orupOdhumuNdu * thEsudaith thiRaludaik kAma dhEvA! * nORkinRa nOnbinaik kuRikkoL kaNdAy * pEsuvadhonRu uNdu ingu emperumAn! * peNmaiyaith thalaiyudaiththu Akkum vaNNam * kEsava nambiyaik kAl pidippAL ennum * ippERu enakkaruL kaNdAy *",
      9: "thozhudhu muppOdhum unnadi vaNangith * thUmalar thUyth thozhudhu EththuginREn * pazhudhinRip pArkkadal vaNNanukkE * paNi seydhu vAzhap peRAvidil nAn * azhudhazhudhu alamandhu ammA vazhanga * ARRavum adhu unakku uRaikkum kaNdAy * uzhuvadhOr eruththinai nugangodu pAyndhu * UttaminRith thurandhAl okkumE *",
      10: "karuppu vil malark kaNaik kAma vELaik * kazhaliNai paNindhu angOr kari alaRa * maruppinai osiththup puL vAy piLandha * maNivaNNaRku ennai vaguththidenRu * poruppanna mAdam polindhu thOnRum * pudhuvaiyar kOn vittuchiththan kOdhai * viruppudai inthamizh mAlai vallAr * viNNavar kOn adi naNNuvarE *",
      11: "adivaravu: thai veLLai maththam suvaril vAnidai uru kAyudai mAsudai thozhudhu karuppu nAmam *"
    },
    'NAT.2.steps':
    {
      1: "nAmam Ayiram Eththa ninRa * nArAyaNA! naranE! * unnai mAmi than maganAgap peRRAl * emakku vAdhai thavirumE * kAmanpOtharu kAlam enRu * panguni nAL kadai pAriththOm * thImai seyyum sirIdharA! * engaL siRRil vandhu sidhaiyElE *",
      2: "inRu muRRum mudhugu nOva * irundhizhaiththa ichchiRRilai * nanRum kaNNuRa nOkki * nAngoLum Arvam thannaith thaNikidAy * anRu bAlaganAgi * Alilai mEl thuyinRa em AdhiyAy! * enRum undhanakku engaL mEl * irakkam ezhAdhadhu em pAvamE *",
      3: "guNdunIr uRai kOLarI! * madha yAnai kOL viduththAy * unnaik kaNdu mAluRuvOngaLaik * kadaik kaNgaLAlittu vAdhiyEl * vaNdal nuNmaNal theLLi * yAm vaLaik kaigaLAl siramappattOm * theN thiraik kadal paLLiyAy! * engaL siRRil vandhu sidhaiyElE *",
      4: "peyyumA mugil pOl vaNNA! * undhan pEchchum seygaiyum * engaLai maiyal ERRi mayakka * un mugam mAya mandhiram thAn kolO? * noyyar piLLaigaL enbadhaRku * unnai nOva nAngaL uraikkilOm * seyya thAmaraik kaNNinAy! * engaL siRRil vandhu sidhaiyElE *",
      5: "veLLai nuNmaNal koNdu * siRRil vichiththirappada * vIdhi vAyth theLLi nAngaL izhaiththa kOlam * azhiththiyAgilum undhan mEl * uLLam Odi urugal allAl * urOdam onRumilOm kaNdAy * kaLLa mAdhavA! kEsavA! * un mugaththana kaNgaL allavE *",
      6: "muRRilAdha piLLaigaLOm * mulai pOndhilAdhOmai * nAL thoRum siRRil mElittuk koNdu * nI siRidhuNdu thiNNena nAm adhu kaRRilOm * kadalai adaiththu arakkar kulangaLai * muRRavum seRRu * ilangaiyaip pUsalAkkiya sEvagA! * emmai vAdhiyEl *",
      7: "bEdham nangaRivArgaLOdu * ivai pEsinAl peridhu insuvai * yAdhum onRaRiyAdha piLLaigaLOmai * nI nalindhu en payan? * OdhamA kadal vaNNA! * un maNavAttimArodu sUzhaRum * sEdhu bandham thiruththinAy! * engaL siRRil vandhu sidhaiyElE *",
      8: "vattavAych chiRu thUdhaiyOdu * siRu suLagum maNalum koNdu * ittamA viLaiyAduvOngaLaich * chiRRil Idazhiththu en payan? * thottudhaiththu naliyEl kaNdAy * sudarch chakkaram kaiyil EndhinAy! * kattiyum kaiththAl innAmai * aRidhiyE kadal vaNNanE! *",
      9: "muRRaththUdu pugundhu * nin mugam kAttip punmuRuval seydhu * siRRilOdu engaL sindhaiyum * sidhaikkak kadavaiyO? gOvindhA! * muRRa maNNidam thAvi * viNNuRa nINdaLandhu koNdAy! * emmaip paRRi meyppiNakkittakkAl * indhap pakkam ninRavar en sollAr? *",
      10: "sIdhai vAy amudham uNdAy! * engaL siRRil nI sidhaiyEl enRu * vIdhi vAy viLaiyAdum * Ayar siRumiyar mazhalaich chollai * vEdha vAyth thozhilArgaL vAzh * villipuththUr man vittuchiththan than * kOdhai vAyth thamizh vallavar * kuRaivinRi vaigundham sErvarE *",
      11: "adivaravu: nAmam inRu guNdu peyyum veLLai muRRilAdha pEdham vattam muRRaththUdu sIdhai kOzhi *"
    },
    'NAT.3.steps': {
      1: "kOzhi azhaippadhan munnam * kudaindhu nIrAduvAn pOndhOm * Azhiyanjelvan ezhundhAn * aravaNai mEl paLLi koNdAy! * Ezhaimai ARRavum pattOm * ini enRum poygaikku vArOm * thOzhiyum nAnum thozhudhOm * thugilaip paNiththaruLAyE *",
      2: "idhuven pugundhadhu! ingandhO! * ippoygaikku evvARu vandhAy? * madhuvin thuzhAy mudi mAlE! * mAyanE! engaL amudhE! * vidhiyinmaiyAl adhu mAttOm * viththagap piLLAy! viraiyEl * kudhikoNdu aravil nadiththAy! * kurundhidaik kURai paNiyAy *",
      3: "ellE! Idhenna iLamai? * emmanaimAr kANil ottAr * pollAngu IdhenRu karudhAy * pUngurundhu ERi iruththi * villAl ilangai azhiththAy! * nI vENdiyadhellAm tharuvOm * pallArum kANAmE pOvOm * pattaip paNiththaruLAyE *",
      4: "parakka vizhiththu engum nOkkip * palar kudaindhAdum sunaiyil * arakka nillA kaNNa nIrgaL * alamaruginRavA pArAy * irakkamEl onRum ilAdhAy! * ilangai azhiththa pirAnE! * kurakkarasu AvadhaRindhOm * kurundhidaik kURai paNiyAy *",
      5: "kAlaik kathuviduginRa * kayalodu vALai viravi * vElaip pidiththu ennaimArgaLOttil * enna viLaiyAttO? * kOlach chiRRAdai palavum kondu * nI ERi irAdhE * kOlam kariya pirAnE! * kurundhidaik kURai paNiyAy *",
      6: "thadaththavizh thAmaraip poygaith * thALgaL em kAlaik kadhuva * vidaththEL eRindhAlE pOla * vEdhanai ARRavum pattOm * kudaththai eduththERa vittuk * kUththAda valla em kOvE! * padiRRai ellAm thavirndhu * engaL pattaip paNiththaruLAyE *",
      7: "nIrilE ninRu ayarkkinROm * nIdhi allAdhana seydhAy * Uragam sAlavum sEyththAl * Uzhi ellAm uNarvAnE! * Arvam unakkE udaiyOm * ammanaimAr kANil ottAr * pOra vidAy engaL pattaip * pUngurundhu ERi irAdhE *",
      8: "mAmimAr makkaLE allOm * maRRum ingu ellArum pOndhAr * thUmalark kaNgaL vaLarath * thollaiyirAth thuyilvAnE! * sEmamEl anRidhu sAlach * chikkena nAm idhu sonnOm * kOmaLa Ayar kozhundhE! * kurundhidaik kURai paNiyAy *",
      9: "kanjan valai vaiththa anRu * kAriruL ellil pizhaiththu * nenju dhukkam seyyap pOndhAy * ninRa ikkanniyarOmai * anja urappAL asOdhai * ANAda vittittu irukkum * vanjagap pEychchi pAl uNda * masimaiyilee! kURai thArAy *",
      10: "kanniyarOdu engaL nambi * kariya pirAn viLaiyAttai * ponniyal mAdangaL sUzhndha * pudhuvaiyar kOn pattan kOdhai * innisaiyAl sonna mAlai * Iraindhum vallavar thAm pOy * manniya mAdhavanOdu * vaigundham pukku iruppArE *",
      11: "adivaravu: kOzhi idhu ellE parakka kAlai thadaththu nIril mAmimAr kanjan kanniyarOdu theLLiyAr *"
    },
    'NAT.4.steps': {
      1: "theLLiyAr * palar kai thozhum dhEvanAr * vaLLal * mAlirunjOlai maNALanAr *** paLLi koLLum idaththu * adi kottida * koLLumAgil * nI kUdidu kUdalE! *",
      2: "* kAttil vEngadam * kaNNapura nagar * vAttam inRi * magizhndhuRai vAmanan *** OttarA vandhu * en kaip paRRi * thannodum kUttumAgil * nI kUdidu kUdalE! *",
      3: "pUmagan pugazh vAnavar * pORRudhaR kAmagan * aNi vANudhal * dhEvaki mAmagan *** migu sIr * vasudhEvar tham * kOmagan varil * kUdidu kUdalE! *",
      4: "AychchimArgaLum * Ayarum anjida * pUththa nIL * kadambERip pugap pAyndhu *** vAyththa kALiyan mEl * nadam Adiya * kUththanAr varil * kUdidu kUdalE! *",
      5: "mAda mALigai sUzh * madhuraip padhi nAdi * nandheruvin * naduvE vandhittu *** OdaimA * madha yAnai udhaiththavan * kUdumAgil * nI kUdidu kUdalE! *",
      6: "aRRavan * marudham muRiya nadai kaRRavan * kanjanai * vanjanaiyinAl seRRavan *** thigazhum madhuraip padhi * koRRavan varil * kUdidu kUdalE! *",
      7: "anRu innAdhana sey * sisupAlanum * ninRa nIL marudhum * erudhum puLLum *** venRi vEl * viRal kanjanum vIzha * mun konRavan varil * kUdidu kUdalE! *",
      8: "Aval anbudaiyAr tham * manaththanRi mEvalan * virai sUzh * thuvarApadhik kAvalan *** kanRu mEyththu viLaiyAdum * kOvalan varil * kUdidu kUdalE! *",
      9: "koNda kOlak * kuRaL uruvAych chenRu * paNdu mAvali than * peru vELviyil *** aNdamum nilanum * adi onRinAl * koNdavan varil * kUdidu kUdalE! *",
      10: "pazhagu nAnmaRaiyin poruLAy * madham ozhugu vAraNam * uyya aLiththa *** em azhaganAr * aNi Aychchiyar sindhaiyuL * kuzhaganAr varil * kUdidu kUdalE! *",
      11: "* Udal kUdal * uNardhal puNardhalai * nIdu ninRa * niRai pugazh Aychchiyar *** kUdalaik * kuzhaR kOdhai mun kURiya * pAdal paththum vallArkku * illai pAvamE *",
      12: "adivaravu: theLLiyAr kAttil pUmagan AychchimArgaL mAdam aRRavan anRu Aval koNda pazhagu Udal mannu *"
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