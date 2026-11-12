window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'IYLS.0.steps':
        {
            1: "piLLai uRangkAvilli thAsar aruLich seythathu : nanRum thiruvudaiyOm nAnilaththil evvuyirkkum * onRum kuRai illai OthinOm * kunRam eduththAn adi sEr irAmAnusan thAL* pidiththAr pidiththAraip paRRi",
            2: "vakuLAbaraNa battar aruLich seythathu : vAzhi thirukkurugUr vAzhi thirumazhisai * vAzhi thirumalli vaLa nAdu * vAzhi suzhi poRiththa nIrp ponnith thennarangkan thannai * vazhi paRiththa vALan vali",
            3: "srI parAngkusa thAsar aruLich seythathu : thirunAdu vAzhi thirupporunal vAzhi * thirunAttuth thenkurugUr vAzhi * thirunAttuch sittaththamar vAzhi * vAzhi sadakOpan ittath thamizhp pAvisai",
            4: "parakAla thAsar aruLich seythathu : mangkai nagar vAzhi vaN kuRaiyalUr vAzhi * sengkai aruNmAri sIr vAzhi * pongku punal maNNiththuRai vAzhi * vAzhi parakAlan eNNil thamizhp pAvisai",
            5: "piLLai irAmAnusa thAsar aruLich seythathu : vAzhiyarO then kurugai vAzhiyarO then puthuvai * vAzhiyarO thenkuRaiyal mAnagaram * vAzhiyarO thakkOr paravum thadam sUzh perumbUthUr * mukkOl pidiththa muni",
            6: "thiruvarangkaththamuthanAr aruLich seythathu : mozhiyaik kadakkum perum pugazhAn * vanjcha mukkuRumbAm kuzhiyaik kadakkum nam kUraththAzhvAn charaN kUdiya pin ** pazhiyaik kadaththum irAmAnusan pugazh pAdi allA vazhiyaik kadaththal * enakkiniyAthum varuththamanRE",
            7: "piLLai azhagiya maNavALa thAsar aruLich seythathu : nenjchaththirunthu nirantharamAga nirayaththuykkum * vanjchak kuRumbin vagai aRuththEn * mAya vAthiyar thAm anjchap piRanthavan sImAthavan adikkanbu seyyum * thanjchaththoruvan saraNAm buyam en thalaikkaNinthE",
            8: "pinbazhagarAm perumAL sIyar aruLich seythathu : Uzhi thoRum Uzhi thoRum ulagam uyya umbargaLum kEttuyya *anbinAlE vAzhi enum bUtham pEy poygai mARan mazhisaiyar kOn pattar pirAn mangkai vEnthan * kOzhiyar kOn thoNdar thugaL pANan kOthai kula munivan kURiya nUlOthi * vIthi vAzhi ena varum thiraLai vAzhththuvAr tham malar adi en sennikku malarntha pUvE",
        },
        'IYLS.1.steps': {
            1: "🙏 Aazhwaar Emperumaanaar Jeeyar ThiruvadigaLE sharanam 🙏"
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


