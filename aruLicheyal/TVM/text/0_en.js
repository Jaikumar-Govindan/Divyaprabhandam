
indow.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.0.1.steps': {
            1: "🙏 nAthamunigaL aruLich cheydhadhu: bhaktAmrutam vishva janAnumOdanam sarvArtthadam srIshaThakOpa vAngkmayam * sahasra shAkhOpaniShat samAgamam namAmyaham drAviDa vEda sAgaram ",
            2: "🙏 IsvaramunigaL aruLich cheydhadhu: thiruvazhudhi nADu enRum thenkurugUr enRum * maruviniya vaNporunal enRum * arumaRaigaL andhAdhi seydhAn aDi iNaiyE eppozhudhum * sindhiyAy nenjchE! theLindhu",
            3: "🙏 soTTai nambigaL aruLich cheydhadhu: manaththAlum vAyAlum vaNkurugUr pENum * inaththArai allAdhu iRainjchEn * dhanaththAlum Edhum kuRaivilEn * endhai saDakOpan pAdhangkaL yAmuDaiya paRRu",
            4: "🙏 ananthAzhvAn aruLich cheydhadhu: Eyndha perungkIrththi irAmAnusa muni than * vAyndha malarp pAdham vaNangkuginREn * Ayndha perum sIrAr saDakOpan senthamizh vEdham tharikkum * pErAdha uLLam peRa",
            5: "🙏 bhaTTar aruLich seydhavai: vAn thigazhum sOlai madhiL arangkar vaNpugazh mEl * AnRa thamizh maRaigaL Ayiramum * InRa mudhal thAy saDakOpan * moympAl vaLarththa idhath thAy irAmAnusan",
            6: "🙏 bhaTTar aruLich seydhavai: mikka iRai nilaiyum meyyAm uyir nilaiyum * thakka neRiyum thaDai Agith - thokkiyalum * Uzh vinaiyum vAzh vinaiyum Odhum kurugaiyar kOn * yAzhin isai vEdhaththu iyal ",
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











