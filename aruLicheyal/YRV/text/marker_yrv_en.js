window.MARKER_DATABASE = window.MARKER_DATABASE || {};
// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {

        'YRV.0.steps': {
            1: "erumbiyappa arulicheyda: ya: stutim yatipati prasAdinIm * vyAjahAra yatirAja vimshatim *** tam prapanna jana chAtakAmbudam * naumi saumyavara yOgi punggavam",
        },
        'YRV.1.steps': {
            1: "shrImAdhavAngghri jalajadvaya nityasEvA * prEmAvilAshaya parAngkusha pAdabhaktam *** kAmAdi dOSha haram Atma padAshritAnAm * rAmAnujam yatipatim praNamAmi mUrdhnA",
            2: "shrIranggarAja charaNAmbuja rAjahamsam * shrImat parAngkusha padAmbuja bhrunggarAjam *** shrIbhaTTanAtha parakAla mukAbja mitram * shrIvatsachihna sharaNam yatirAjam IDE",
            3: "vAchA yatIndra manasA vapuShA cha yuShmat * pAdAravinda yugaLam bhajatAm gurUNAm *** kUrAdhinAtha kurukEsha mukhAdya pumsAm * pAdAnuchintana para: satatam bhavEyam",
            4: "nityam yatIndra tava divyavapu: smrutau mE * shaktam manO bhavatu vAk guNa kIrtanE-sau *** krutyanjcha dAsya karaNam tu kara dvayasya * vruttyantarE-stu vimukham karaNa trayanjcha",
            5: "aShTAkSharAkhyamanurAja pada trayArtha * niShThAm mamAtra vitarAdya yatIndra nAtha *** shiShTAgragaNya jana sEvya bhavat padAbjE * hruShTAstu nityam anubhUya mamAsya buddhi:",
            6: "alpApi mE na bhavdIya padAbja bhakti: * shabdAdi bhOga ruchir anvaham EdhatE hA *** mat pApam Eva hi nidAnam amuShya nAnyat * tad vArayArya yatirAja dayaika sindhO",
            7: "vruttyA pashur naravapustvaham IdrushO-pi * shrutyAdi siddha nikhilAtma guNAshrayO-yam *** ityAdarENa krutinO-pi mitha: pravaktum * adyApi vanjchana parO-tra yatIndra! vartE",
            8: "duHkhAvahO-ham anisham tava duShTa chEShTa: * shabdAdi bhOga nirata: sharaNAgatAkhya: *** tvat pAda bhakta iva shiShTa janaugha madhyE * mithyA charAmi yatirAja! tatO-smi mUrkha:",
            9: "nityam tvaham paribhavAmi gurum cha mantram * taddEvatAm api na kinjchit ahO bibhEmi *** ittham shaThO-pyashaThavat bhavadIya sangghE * hruShTa: charAmi yatirAja! tatO-smi mUrkha:",
            10: "hA hanta hanta manasA kriyayA cha vAchA * yO-ham charAmi satatam trividhApachArAn *** sO-ham tavApriyakara: priyakrudvat Eva * kAlam nayAmi yatirAja! tatO-smi mUrkha:",
            11: "pApE krutE yadi bhavanti bhayAnutApa * lajjA: puna: karaNam asya katham ghaTEta *** mOhEna mE na bhavatIha bhayAdi lEshaH  * tasmAt puna: punaragham yatirAja! kurvE",
            12: "antarbahi: sakala vastuShu santam Isham * andha: pura: sthitam ivAham avIkShamANa: *** kandarpavashya hrudaya: satatam bhavAmi * hanta tvadagra gamanasya yatIndra! nArha:",
            13: "tApa trayI janita duHkha nipAtinO-pi * dEha sthitau mama ruchistu na tannivruttau *** Etasya kAraNam ahO mama pApam Eva * nAtha! tvam Eva hara tat yatirAja! shIghram",
            14: "vAchAm agOchara mahA guNa dEshikAgrya * kUrAdhi nAtha kathitAkhila naichya pAtram *** EShOhamEva na punarjagat Idrushastad * rAmAnujArya karunaiva tu madgatistE",
            15: "shuddhAtma yAmuna gurUttama kUra nAtha * bhaTTAkhya dEshika varOkta samasta naichyam *** adyAstyasangkuchitam Eva mayIha lOkE * tasmAt yatIndra! karuNaiva tu madgatistE",
            16: "shabdAdi bhOga viShayA ruchir asmadIyA * naShTA bhavatviha bhavat dayayA yatIndra! *** tvat dAsa dAsa gaNanA charamAvadhau ya: * taddAsataika rasatA-viratA mamAstu",
            17: "shrutyagra vEdya nija divya guNa svarUpa: * pratyakShatAm upagatastviha ranggarAja: *** vashya: sadA bhavati tE yatirAja tasmAt * shakta: svakIya jana pApa vimOchanE tvam",
            18: "kAla trayE-pi karaNa traya nirmitAti * pApa kriyasya sharaNam bhagavat kShamaiva *** sA cha tvayaiva kamalAramaNE-rthitA yat * kShEmas sa Eva hi yatIndra! bhavachChritAnAm",
            19: "shrIman yatIndra! tava divya padAbja sEvAm * shrIshaila nAtha karuNA pariNAma dattAm *** tAm anvaham mama vivardhaya nAtha! tasyAH * kAmam viruddham akhilanjcha nivartaya tvam",
            20: "vijnjApanam yadidam adya tu mAmakInam * anggI kuruShva yatirAja! dayAmburAshE *** ajnjO-yam Atma guNa lEsha vivarjitash cha * tasmAt ananya sharaNO bhavatIti matvA",
            21: "iti yatikula dhuryam EdhamAnaiH * shruti madhurair uditai: praharShayantam *** varavaramunim Eva chintayantI * matir iyam Eti niratyayam prasAdam",
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