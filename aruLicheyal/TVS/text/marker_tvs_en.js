window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge ondemand
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'TVS.0.steps': {
      1: "🙏 aruLALap perumAL emperumAnAr aruLich cheydhadhu: kAsiniyOr thAm vAzhak * kali yugaththE vandhudhiththu * Asiriyap pA adhanAl * arumaRai nUl viriththAnaith *** thEsikanaip parAngkusanaith * thigazh vaguLath thArAnai * mAsaDaiyA manaththu vaiththu * maRavAmal vAzhththudhumE",
    },
    'TVS.1.steps': {
      1: "🙏 sekkar mA mugil uDuththu mikka senjchuDarp paridhi sUDi * anjchuDar madhiyam pUNDu * pala suDar punaindha pavaLach sevvAy * thigazh pasunjchOdhi maradhagak kunRam * kaDalOn kai misaik kaN vaLarvadhu pOl * pIthaga ADai muDi pUN mudhalA * mEthagu palkalan aNindhu * sOdhi vAyavum kaNNavum sivappa * mIdhiTTup pachchai mEni migap pagaippa * nachchu vinaik kavar thalai aravin amaLi ERi * eRi kaDal naDuvuL aRi thuyil amarndhu * sivan ayan indhiran ivar mudhal anaiththOr * dheyvak kuzhAnggaL kai thozhak kiDandha * thAmarai undhi thanip perum nAyaga! * mUvulagaLandha sEvaDiyOyE!",
      2: "ulagu paDaiththu uNDa endhai * aRai kazhal suDarp pUnthAmarai sUDudhaRku * avAvAr uyir urugi ukka * nEriya kAdhal anbil inbIn thERal * amudha veLLaththAn Am siRappu viTTu * oru poruTku asaivOr asaiga * thiruvoDu maruviya iyaRkai * mAyAp peru viRal ulagam mUnRinoDu nal vIDu peRinum * koLvadhu eNNumO theLLiyOr kuRippE?",
      3: "kuRippil koNDu neRip paDa * ulagam mUnRuDan vaNanggu thOnRu pugazh ANai * mey peRa naDAya dheyvam mUvaril mudhalvanAgi * suDar viLanggagalaththu * varai purai thirai poru peru varai veruvara * uru mural oli mali naLir kaDal paDavara varasuDal thaDa varai suzhaRRiya * thani mAth dheyvaththu aDiyavarkku ini nAm AL AgAvE isaiyum kol? * Uzhi thORUzhi OvAdhE",
      4: "Uzhi thORUzhi OvAdhu * vAzhiya enRu yAm thozha isaiyum kol? * yAvagai ulagamum yAvarum illA * mEl varum perum pAzh kAlaththu * irum poruTku ellAm arum peRal thani viththu * oru thAn Agith dheyva nAnmugak kozhu muLai InRu * mukkaN IsanoDu dhEvu pala nudhali * mUvulagam viLaiththa undhi * mAyak kaDavuL mA mudhal aDiyE",
      5: "mA mudhal aDip pOdhonRu kavizhththu alarththi * maN muzhudhum agappaDuththu * oN suDar aDip pOdhu onRu viN selIi * nAnmugap puththEL nADu viyandhu uvappa * vAnavar muRai muRai vazhipaDa neRIi * thAmaraik kADu malark kaNNoDu kani vAy uDaiyadhu mAy * iru nAyiRu Ayiram malarndhanna * kaRpagak kAvu paRpala anna * muDi thOL Ayiram thazhaiththa * neDiyOykku alladhum aDiyadhO ulagE?",
      6: "OO! ulaginadhu iyalvE! * InROL irukka maNai nIrATTi * paDaiththu iDandhu uNDu umizhndhu aLandhu * thErndhu ulagaLikkum mudhaR perum kaDavuL niRpa * puDaip pala thAn aRi dheyvam pENudhal * thanAdhu pul aRivANmai porundhak kATTi * kolvana mudhalA allana muyalum * inaiya seygai inbu thunbaLi * thol mA mAyap piRaviyuL nInggA * pal mA mAyaththu azhundhumA naLirndhE",
      7: "🙏 naLir madhich saDaiyanum nAnmugak kaDavuLum * thaLir oLi imaiyavar thalaivanum mudhalA * yAvagai ulagamum yAvarum agappaDa * nilam nIr thI kAl suDar iruvisumbum * malar suDar piRavum siRidhuDan mayangga * oru poruL puRappADinRi muzhuvadhum agappaDak karandhu * Or Alilaich sErndha em peru mA mAyanai alladhu * oru mA dheyvam maRRuDaiyamO yAmE?",
      8: "aDivaravu: sekkar ulagu * kuRippu Uzhi * mAmudhal OOulagu * naLir muyaRRi *",
    }
  };

  // Nondestructive runtime merging engine
  for (const key in text_bundle_en) {
    window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
    for (const p in text_bundle_en[key]) {
      const idx = parseInt(p) - 1;
      window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
      window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
      window.MARKER_DATABASE[key][idx]['text']['ta'] = text_bundle_en[key][p];
    }
  }
};

