window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TPL.0.steps': {
            1: "nAthamunigaL arLich cheytha : gurumukamanadhIthya * prAha vEdhAN asEshAn * narapathiparikluptham * sulkam AdhAthu kAma: *** svasuram amaravandhyam * ranganAthasya sAkshAth * dhvijakulathilakam tham * vishNuchiththam namAmi * ",
            2: "pANDiya baTTar arLich cheytha : minnAr thadamathiLchUzh * villipuththUr enRorukAl * chonnAr kazhaRkamalam chUdinOm *** munnAL kizhiyaRuththAn enRuraiththOm * kIzhmayiniR chErum * vazhiyaRuththOm nenjamE vaNth * ",
            3: "pANDiya baTTar arLich cheytha : pANdiyan koNdAdap * pattarpirAn vanthAnenRu * INdiya changam * eduththUtha *** vENdiya vEdhangaLOdhi * virainthu kizhiyaRuththAn * pAthangaL * yAmudaiya paRRu * ",
        },
        'TPL.1.steps': {
            1: "pallANdu pallANdu pallAyiraththANdu * palakOti nURayiram *** mallANda thiNthOL maNivaNNA * un chEvadi chevvith thirukkAppu * ",
            2: "adiyOmOdum ninnOdum * pirivinRi Ayiram pallANdu * vadivAy nin valamArbinil * vAzhkinRa mangaiyum pallANdu *** vadivAr chOthi valaththuRaiyum * chudarAzhiyum pallANdu * padaipOr pukku muzhangum * appAnjasanniyamum pallANdE * ",
            3: "vAzhAtpattu ninRIruLLIrEl * vanthu maNNum maNamum koNmin * kUzhAtpattu ninRIrkaLai * engaL kuzhuvinil puguthalottOm *** EzhAtkAlum pazhippilOm nAngaL * irAkkathar vAzh * ilangai pAzhALAgap padai poruthAnukkup * pallAnNdu kURuthumE * ",
            4: "Edu nilaththil iduvathan munnam vaNthu * engaL kuzhAm pugunthu * kUdu manam udaiyIrgaL varambozhi * vanthollaik kUduminO *** nAdu nagaramum nangaRiya * namO nArAyaNAya enRu * pAdu manam udaip paththar uLLIr * vanthu pallANdu kURuminE * ",
            5: "aNdak kulaththukku adhipathiyAgi * asurar irAkkatharai * iNdak kulaththai eduththuk kaLaintha * irudIkEsan thanakku *** thoNdak kulaththiluLLIr * vanthu adithozhuthu Ayira nAmam chollip * pAndaik kulaiththaith thavirnthu * pallANdu pallAyiraththANdu enminE * ",
            6: "enthai thanthai thanthai * thanthai tham mUththappan * Ezh padikAl thodangi * vanthu vazhi vazhi AL cheyginROm *** thiruvONath thiruvizhavil anthiyam pOthil ari uruvAgi * ariyai azhiththavanaip * panthanai thIrap pallANdu * pallAyiraththANdu enRu pAduthumE * ",
            7: "thIyil poliginRa senjudarAzhi * thigazh thiruchchakkaraththin * kOyil poRiyAlE oRRuNdu ninRu * kudi kudi AL seyginROm *** mAyap poru padai vANanai * Ayiram thOLum pozhi kurudhi pAya * suzhaRRiya Azhi vallAnukkup * pallANdu kURuthumE * ",
            8: "neyyidai nallathOr sORum * niyathamum aththANich chEvakamum * kai adaikkAyum kazhuththukkup pUNodu * kAthukkuk kuNdalamum *** meyyida nallathOr sAnthamum thanthu * ennai veLLuyirAkka valla * paiyudai nAgap pagaik kodiyAnukkup * pallANdu kURuvanE * ",
            9: "uduththuk kaLaintha nin pIthaga Adai uduththuk * kalaththathu uNdu * thoduththa thuzhAy malar sUdik kaLainthana * sUdum ith thoNdargaLOm *** viduththa thisaik karumam thiruththith * thiruvONath thiruvizhavil * paduththa pain nAgaNaip paLLi koNdAnukkup * pallANdu kURuthumE * ",
            10: "ennAL emperumAn * un thanakku adiyOmenRu ezhuththuppatta annALE * adiyOngaL adik kudil * vIdu peRRu uynthathu kAN *** sennAL thORRith * thiru mathuraiyuL silai kuniththu * ainthalaiya pain nAgath thalaip pAynthavanE * unnaip pallANdu kURuthumE * ",
            11: "al vazhakku onRum illA * aNi kOttiyar kOn * abhimAna thungan selvanaip pOlath * thirumAlE nAnum unakkup pazha adiyEn *** nal vagaiyAl namO nArAyaNA enRu * nAmam pala paravip * pal vagaiyAlum paviththiranE * unnaip pallANdu kURuvanE * ",
            12: "pallANdu enRu paviththiranaip * paramEttiyaich * chArngam ennum villANdAn thannai * villipuththUr vittuchiththan virumbiya sol *** nallANdu enRu navinRu uraippAr * namO nArAyaNAya enRu * pallANdum paramAthmanich * chUzhnthu irunthu Eththuvar pallANdE * "
        },
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



