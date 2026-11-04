window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge ondemand
window.mergeLanguageTexts = function () {
  const text_bundle_en = {
    'TVK.0.steps': {
      1: "🙏 emperumAnAr aruLich cheydhadhu: vAzhi parakAlan vAzhi kalikanRi * vAzhi kuRaiyalUr vAzh vEndhan * vAzhiyarO mAyOnai vAL valiyAl mandhirangkoL manggaiyar kOn * thUyOn suDar mAna vEl",
      2: "🙏 emperumAnAr aruLich cheydhadhu: சீரார் திருவெழு கூற்றிருக் கையென்னும் செந்தமிழால் * ஆராவமுதன் குடந்தைப் பிரான் தன் அடியிணைக்கீழ் * ஏரார் மறைப்பொருள் எல்லாம் எடுத்து இவ்வுலகுய்யவே * சேராமற் சொன்ன அருள்மாரி பாதம் துணைநமக்கே."
    },
    'TVK.1.steps': {
      1: "🙏 oru pEr undhi iru malarth thavisil * oru muRai ayanai InRanai * oru muRai iru suDar mIdhinil iyanggA * mummadhiL ilanggai iru kAl vaLaiya",
      2: "oru silai onRiya IreyiRRu azhal vAy vALiyin aTTanai * mUvaDi nAnilam vENDi * muppuri nUloDu mAn uri ilanggu mArvinin * iru piRappu oru mANAgi",
      3: "oru muRai IraDi mUvulagu aLandhanai * nAl thisai naDungga anjchiRaip paRavai ERi * nAl vAy mummadhaththu iru sevi oru thani vEzhaththu  arandhaiyai",
      4: "oru nAL iru nIr maDuvuL thIrththanai * muththI nAnmaRai aivagai vELvi * aRu thozhil andhaNar vaNanggum thanmaiyai * aimpulan agaththinuL seRuththu * nAnkuDan aDakki mukkuNaththu iraNDavai agaRRi",
      5: "onRinil onRi ninRu * Anggu iru piRappu aRuppOr aRiyum thanmaiyai * mukkaN nAl thOL aivAy aravODu * ARu podhi saDaiyOn aRivarum thanmaip perumaiyuL ninRanai * Ezh ulagu eyiRRinil koNDanai * kURiya aRu suvaip payanum Ayinai * suDar viDum aimpaDai angkaiyuL amarndhanai * sundhara nAl thOL munnIr vaNNa! * nin IraDi onRiya manaththAl",
      6: "oru madhi mugaththu manggaiyar iruvarum malarana * angkaiyin muppozhudhum varuDa aRi thuyil amarndhanai * neRi muRai nAl vagai varuNamum Ayinai * mE thagum aimperum pUdhamum nIyE * aRupadha muralum kUndhal kAraNam * Ezh viDai aDanggach seRRanai * aRu vagaich samayamum aRivu aru nilaiyinai * aimpAl Odhiyai Agaththu iruththinai * aRamudhal nAnkavaiyAy mUrththi mUnRAy * iru vagaip payanAy onRAy virindhu ninRanai",
      7: "kunRA madhu malarch sOlai vaNkoDip paDappai * varu punal ponni mA maNi alaikkum * sennel oNkazhanith thigazh vanam uDuththa * kaRpOr puriseyk kanaga mALigai * nimir koDi visumbil iLampiRai thuvakkum * 🙏 selvam malgu then thirukkuDandhai * andhaNar mandhira mozhiyuDan vaNangga * ADaravu amaLiyil aRi thuyil amarndha parama! * nin aDiyiNai paNivan varum iDar agala mARRO vinaiyE",
      8: "iDangkoNDa nenjchaththu iNanggik kiDappana * enRum ponnith thaDangkoNDa thAmarai sUzhum malarndha thaN pUngkuDandhai * viDangkoNDa veNpal karundhuththi sengkaN thazhal umizh vAy * paDangkoNDa pAmbaNaip paLLi koNDAn thiruppAdhanggaLE"
    },
  };

  // Nondestructive runtime merging engine
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

