window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
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