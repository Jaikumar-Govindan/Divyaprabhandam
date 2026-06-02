window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TPE.0.steps': {
            1: "thamEva mathvA paravAsudhEvam * rangESayam rAjavadharhaNIyam * prAbOdhikIm yOkrutha sUkthimAlAm * bhakthAngrirENum bhagavanthamIdE * ",
            2: "maNdangudi enbar mAmaRaiyOr * manniyasIrth thoNdaradippodi thonnagaram * vaNdu thiNarththavayal thennarangaththammAnaip * paLLiyuNarththum pirAnudhiththa Ur * ",
        },
        'TPE.1.steps': {
            1: "kathiravan guNadhisaich chikaram vandhaNainthAn * kana iruL aganRathu kAlai am pozhuthAy * madhuvirinthu ozhugina mAmalar ellAm * vanavar arasargaL vandhu vandhu INdi *** ethirdhisai niRainthanar ivarodum pugundha * irungaLiRRu Ittamum pidiyodu murasum * adhirthalil alaikadal pOnruLudhu * engum arangaththammA paLLi ezhundhu aruLAyE *",
            2: "kozhungodi mullaiyin kozhu malaraNavik * kUrnthathu guNadhisai mArutham ithuvO * ezhundhana malaraNaip paLLikoL annam * Inpani nanaintha thamirum chiRagudhaRi *** vizhungiya mudhaliyin pilamburai pEzhvAy * veLLeyiRu uRavathan vidaththinukkku anungi * azhungiya Anaiyin arunthuyar keduththa * arangaththammA paLLi ezhundhu aruLAyE *",
            3: "sudaroLi paranthana sUzhdhisai ellAm * thunniya thArakai minnoLi surungip * padaroLi pasuththanan panimadhi ivanO * pAyiruL aganRathu paimpozhil kamugin *** madalidaik kIRi vaNpALaigaL nARa * vaikaRai kUrnthathu mArutham ithuvO * adaloLi thigazhtharu thigiRiyan thadakkai * arangaththammA paLLi ezhundhu aruLAyE *",
            4: "mEttiLa mEdhigaL thaLai vidum AyargaL * vEynguzhal Osaiyum vidaimaNik kuralum * Ittiya visaidhisai parandhana vayaluL * irinthana surumbinam ilangaiyar kulaththai *** vAttiya varisilai vanavarERE * mAmuni vELviyaik kAththu * avabiratham Attiya adu thiRal ayOththi emmarasE * arangaththammA paLLi ezhundhu aruLAyE *",
            5: "pulambina putkaLum pUmpozhilgaLin vAy * pOyiRRuk kangul pugunthathu pulari * kalanthathu guNadhisai kanaikadal aravam * kaLivaNdu mizhaRRiya kalambagam punaintha *** alangalan thodaiyal koNdu adiyiNai paNivAn * amarargaL pugunthanar Adhalil ammA * ilangaiiyarkOn vazhipAdu sey kOyil * emperumAn paLLi ezhundhu aruLAyE *",
            6: "iraviyar maNi nedum thErodum ivarO * iRaiyavar padhinoru vidaiyarum ivarO * maruviya mayilinan aRumugan ivanO * marutharum vasukkaLum vandhu vandhu INdi *** puraviyOdu Adalum pAdalaum thErum * kumara thaNdam pugundhu Indiya veLLam * aruvarai anaiya nin kOyil mun ivarO * arangaththammA paLLi ezhundhu aruLAyE *",
            7: "antharatthu amararagaL kUttangaL ivaiyO * arunthava munivarum marutharum ivarO * indhiran Anaiyum thAnum vandhivanO * emperumAn una kOyilin vAsal *** sundharar nerukka vichchAdharar nUkka * iyakkarum mayanginar thiruvadi thozhuvAn * antharam pAr idamillai maRRidhuvO * arangaththammA paLLi ezhundhu aruLAyE *",
            8: "vambavizh vAnavar vAyuRai vazhanga * mAnidhi kapilai oN kaNNAdi mudhalA * emperumAn padimaikkalam kANdaRku ERpanavAyina * koNdu nal munivar *** thumburu nAradhar pugundhanar ivarO * thOnRinan iraviyum thulangoLi parappi * ambara thalaththil ninRu agalginRathu iruLpOy * arangaththammA paLLi ezhundhu aruLAyE *",
            9: "Ethamil thaNNumai ekkam maththaLi * yAzh kuzhal muazhavamOdu isai dhisai kezhumik * kIthangaL pAdinar kinnarar kerudargaL * kadharuvar avar kanguluLellAm *** mAthavar vAnavar chAraNar iyakkar * siththarum manginar thiruvadi thozhuvAn * Athalil avarkku nALOlakkam aruLa * arangaththammA paLLi ezhundhu aruLAyE *",
            10: "kadimalark kamalangal malarnthana ivaiyO * kathiravan kanaikadal muLaiththanan ivanO * thudi idaiyAr suri kuzhal pizhinthu udharith * thugiluduththu ERinar sUzhpunal arangA *** thodai oththa thuLavamum kUdaiyum polindhu * thOnRiya thOL thoNdaradippodi ennum * adiyanai aLiyan enRu aruLi un adiyArkku * AtpaduththAy paLLi ezhuntharuLAyE *",
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
