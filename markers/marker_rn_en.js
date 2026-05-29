window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'RN.steps': {
      1: "pU mannu mAdhu porundhiya mArban * pugazh malindha pA mannu mARan * adi paNindhu uyndhavan *** pal kalaiyOr thAm manna vandha irAmAnusan * saraNAravindham nAm manni vAzha * nenjE solluvOm avan nAmangLE *",
      2: "kaL Ar pozhil thennarangan * kamalap padhangaL nenjil koLLA * manisarai nIngi *** kuRaiyal pirAn adikkIzh viLLadha anban irAmAnusan * mikka seelam allAl uLLAdhu en nenju * onRu aRIyEn enakkuRRa pEriyalvE *",
      3: "pEr iyal nenjE! * adi paNindhEn unnai * pEyp piRavip pUriyarOdu uLLa * suRRam pularththi *** poruvu arum sIr Ariyan semmai irAmAnusa munikku anbu seyyum * sIRiya pERu udaiyAr * adikkIzh ennaich chErththadhaRkE *",
      4: "ennaip puviyil oru poruLAkki * maruL surandha munnaip pazhavinai vEr aRuththu *** Uzhi mudhalvanaiyE pannap paNiththa irAmAnusan * paran pAdhamum en sennith tharikka vaiththAn * enakku Edhum sidhaivu illaiyE *",
      5: "enakku uRRa selvam irAmAnusan enRu * isaiyagillA manak kuRRa mAndhar * pazhikkil pugazh *** avan manniya sIr thanakku uRRa anbar avan thirunAmangaL sARRum en pA * inak kuRRam kANagillAr * paththi Eyndha iyalvu idhu enRE *",
      6: "iyalum poruLum isaiyath thoduththu * In kavigaL anbAl mayal koNdu vAzhthtum * irAmAnusanai *** madhi inmaiyAl payilum kavigaLil paththi illAdha en pAvi nenjAl * muyalginRanan * avan than perum kIrththi mozhindhidavE *",
      7: "mozhiyaik kadakkum perum pugazhAn * vanja mukkuRumbAm kuzhiyaik kadakkum * nam kUraththAzhwAn saraN kUdiya pin *** pazhiyaik kadaththum irAmAnusan * pugazh pAdi allA vazhiyaik kadaththal * enakku ini yAdhum varuththam anRE *",
      8: "varuththum puRa iruL mARRa * em poygaippirAn maRaiyin kuruththin poruLaiyum * sendhamizh thanniyum kUtti *** onRath thiriththu anRu eriththa thiruviLakkaith than thiru uLLaththE * iruththm paraman * irAmAnusan em iRaiyavanE *",
      9: "iRaivanaik kANum idhayaththu iruL keda * gyAnam ennum niRai viLakku ERRiya * bhUdhath thiruvadi thALgaL *** nenjaththu uRaiya vaiththu ALum irAmAnusan * pugazh Odhum nallOr maRaiyinaik kAththu * indha maNNagaththE mannavaippavarE *",
      10: "manniya pEr iruL mANdapin * kOvaluL mAmalarAL thannodum Ayanaik * kaNdamai kAttum *** thamizhth thalaivan pon adi pORRum irAmAnusaRku anbu pUNdavar thAL * senniyil sUdum * thiruvudaiyAr enRum sIriyarE *",
      11: "sIriya nAnmaRaich chemboruL * sendhamizhAl aLiththa pAr iyalum pugazhp * pAN perumAL *** saraNAm padumath thAr iyal senni irAmAnusan thannaich chArndhavar tham * kAriya vaNmai * ennAl solloNAdhu ikkadal idaththE *",
      12: "idam koNda kIrththi mazhisaikku iRaivan * iNai adippOdhu adangum * idhayaththu irAmAnusan *** am poRpAdham enRum kadam koNdu irainjum thiru munivarkku anRi kAdhal seyyAth * thidam koNda gyAniyarkkE * adiyEN anbu seyvadhuvE *",
      13: "seyyum pasum thuLabath thozhil mAlaiyum * sendhamizhil peyyum * maRaith thamizh mAlaiyum *** pErAdha sIr arangaththu aiyan kazhaRku aNiyum paran thAL anRi * AdhariyA meyyan * irAmAnusan saraNE gadhi vERu enakkE *",
      14: "kadhikkup padhaRi * vengAnamum kallum kadalum ellAm kodhikkath * thavam seyyum koLgai aRREn *** kolli kAvalan sol padhikkum kalaik kavi pAdum periyavar pAdhangaLE * thudhikkum paraman * irAmAnusan ennaich chOrvilanE *",
      15: "sOrAdha kAdhal perum suzhippAl * thollai mAlai onRum pArAdhu avanaip * pallANdu enRu kAppidum *** pAnmaiyan thAL pErAdha uLLaththu irAmAnusan than piRangiya sIr * sArA manisaraich chErEn * enakku enna thAzhvu iniyE? *",
      16: "thAzhvu onRu illA maRai thAzhndhu * thala muzhudhum kaliyE ALginRa nAL vandhu * aLiththavan kANmin *** arangar mauli sUzhginRa mAlaiyaich chUdik koduththavaL thol aruLAl * vAzhginRa vaLLal * irAmAnusan ennum mA muniyE *",
      17: "muniyAr thuyarangaL mundhilum * inbangaL moyththidinum kaniyAr manam * kaNNamangai ninrAnai *** kalai paravum thani Anaiyaith thaN thamizh seydha neelan thanaku * ulagil iniyAnai * engaL irAmAnusanai vandhu eydhinarE *",
      18: "eydhaRku ariya maRaigaLai * Ayiram inthamizhAl seydhaRku ulagil varum * sadagOpanaich *** chindhai uLLE peydhaRku isaiyum periyavar sIrai uyirgaL ellAm * uydhaRku udhavum * irAmAnusan em uRuthuNaiyE *",
      19: "uRu perum selvamum thandhaiyum thAyum * uyar guruvum veRi tharu * pUmagaL nAdhanum *** mARan viLangiya sIr neRi tharum sendhamizh AraNamE enRu in nIL nilaththOr * aRidhara ninRa * irAmAnusan... enakku AramudhE *",
      20: "Arap pozhil then kurugaippirAn * amudhath thiruvAy Irath thamizhin * isai uNarndhOrgatku *** iniyavar tham sIraip payinRu uyyum seelam koL nAdhamuniyai * nenjAl vArip parugum * irAmAnusan endhan mAnidhiyE *",
      21: "nidhiyaip pozhiyum mugil enRu * nIsar tham vAsal paRRi thudhi kaRRu ulagil * thuvaLginRilEn ini *** thUy neRi sEr edhigatku iRaivan yamunaith thuRaivan iNai adiyAm * gadhi peRRudaiya * irAmAnusan ennaik kAththananE *",
      22: "kArththigaiyAnum kari mugaththAnum * kanalum mukkaN mUrththiyum * mOdiyum veppum mudhugittu *** mUvulagum pUththavanE! enRu pORRida vANan pizhai poRuththa * thIrththanai Eththum * irAmAnusan endhan sEma vaippE *",
      23: "vaippAya vAn poruL enRu * nal anbar manaththagaththE * eppOdhum vaikkum irAmAnusanai *** iru nilaththil oppAr ilAdha uRu vinaiyEn vanja nenjil vaiththu * muppOdhum vAzhththuvan * ennAm idhu avan moy pugazhkkE? *",
      24: "moyththa vem thI vinaiyAl * pal udal thoRum mUththu * adhanAl eyththu ozhindhEn * muna nALgaL ellAm *** inRu kaNdu uyarndhEn poyth thavam pORRum pulaich chamayangaL nilaththu aviyak * kaiththa meigyAnaththu * irAmAnusan ennum kAr thannaiyE *",
      25: "kArEy karuNai irAmAnusa! * ikkadal idaththil ArE aRibavar * nin aruLin thanmai *** allalukku nErE uRaividam nAn vandhu nI ennai uyththapin * un sIrE uyirkkuyirAy * adiyERku inRu thiththikkumE *",
      26: "thikkuRRa kIrththi irAmAnusanai * en sey vinaiyAm meykkuRRam nIkki * viLangiya mEgaththai *** mEvum nallOr ekkuRRavALar edhu piRappu Edhu iyalvu Aga ninROr * akkuRRam appiRappu * avviyalvE nammai AtkoLLumE *",
      27: "koLLak kuRaivu aRRu ilangi * kozhundhu vittu Ongiya un vaLLal thanaththinAl * valvinaiyEn manam nI pugundhAy *** veLLaich chuddar vidum un peru mEnmaikku izhukku idhu enRu * thaLLuRRu irangum * irAmAnusA en thani nenjamE *",
      28: "nenjil kaRai koNda kanjanaik kAyndha nimalan * nangaL panjith thiruvadip * pinnai than kAdhalan *** pAdham naNNA vanjarkku ariya irAmAnusan * pugazh anRi en vAy konjip paravagillAdhu * enna vAzhvu inRu kUdiyadhE! *",
      29: "kUttum vidhi enRu kUdungolO? * then kurugaippirAn pAttennum * vEdhap pasum thamizh thannai *** than paththi ennum vIttin kaN vaiththa irAmAnusan * pugazh mey uNarndhOr IttangaL thannai * en nAttangaL kaNdu inbam eydhidavE *",
      30: "inbam tharu peru vIdu vandhu eydhil en? * eNNiRandha thunbam tharu * nirayam pala sUzhil en? *** thol ulagail man pal uyirgatku iRaiyavan mAyan ena mozhindha * anban anagan * irAmAnusan ennai ANdananE *"
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