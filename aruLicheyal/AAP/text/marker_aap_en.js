window.MARKER_DATABASE = window.MARKER_DATABASE || {};
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'AAP.0.steps': {
            1: "periya nambigaL aruLiya: ApAda chUDamanubhUya harim shayAnam * madhyE kavEra duhitur muditAntarAtmA * adraShTrutAm nayanayOr viShayAntarANAm * yO nishchikAya manavai munivAhanam tam *",
            2: "thirumalai nambigaL aruLiya: kATTavE kaNDa pAdha kamalam nallADai undhi * thETTarum udhara bandham thirumArbu kaNDam sevvAy * vATTamil kaNgaL mEni muni ERith thani pugundhu * pATTinAl kaNDu vAzhum pANar thAL paravinOmE *"
        },
        'AAP.1.steps': {
            1: "# amalan ādi pirān * aḍiyārkkennai āṭpaḍutta vimalan * viṇṇavar kōn * viraiyār pozil vēṅgaḍavan * nimalan ninmalan nīdi vānavan * nīḻ madiḻ araṅgattammān * tirukkamala pādam vandu * en kaṇṇin uḻḻana okkinṟadē *",
            2: "uvanda uḻḻattanāy * ulagam aḻandaṇḍam uṟa * nivanda nīḻ muḍiyan * anṟu nērnda niśāśararai * kavarnda veṅgaṇai kkāguttan * kaḍiyār pozil araṅgattammān * araiccivanda āḍaiyin mēl * śenṟadām en śindanaiyē *",
            3: "# mandi pāy * vaḍa vēṅgaḍa mā malai * vānavargaḻ śandi śeyya ninṟān * araṅgattaravin aṇaiyān * andi pōl niṟattāḍaiyum * adan mēl ayanai ppaḍaittadōr ezil * undi mēladanṟō * aḍiyēn uḻḻattin uyirē *",
            4: "śadura mā madiḻ śūz * ilaṅgaikkiṟaivan talaipattudira ōṭṭi * ōr veṅgaṇai uyttavan * ōda vaṇṇan * madura mā vaṇḍu pāḍa * mā mayilāḍaraṅgattammān * tiru vayiṭrudara bandam * en uḻḻattuḻ ninṟulāginṟadē *",
            5: "pāram āya * pazavinai paṭraṟuttu * ennai ttan vāram ākki vaittān * vaittadanṟi ennuḻ pugundān * kōra mādavam śeydanan kolaṟiyēn * araṅgattammān * tiru āra mārvadanṟō * aḍiyēnai āṭkoṇḍadē *",
            6: "tuṇḍa veṇpiṟaiyan * tuyar tīrttavan * añjiṟaiya vaṇḍuvāz pozil śūz * araṅga nagar mēya appan * aṇḍar aṇḍa pagiraṇḍattu * orumānilam ezumāl varai * muṭrum uṇḍa kaṇḍam kaṇḍīr * aḍiyēnai uyyakkoṇḍadē *",
            7: "kaiyin ār * śuri śaṅganal āziyar * nīḻvarai pōl meyyanār * tuḻaba viraiyār kamaz nīṇ muḍi em aiyanār * aṇi araṅganār * aravin aṇaimiśai mēya māyanār * śeyya vāy aiyō ! * ennai ccindai kavarndaduvē ! *",
            8: "pariyan āgi vanda * avuṇan uḍal kīṇḍa * amararkkariya ādi ppirān * araṅgattamalan mugattu * kariya āgi ppuḍai parandu * miḻirndu śevvari ōḍi * nīṇḍa apperiya vāya kaṇgaḻ * ennai ppēdaimai śeydanavē ! *",
            9: "# ālamā marattin ilaimēl * oru pālakanāy * ñālam ēzum uṇḍān * araṅgattaravin aṇaiyān * kōlamā maṇi āramum * muttuttāmamum muḍivilladōr ezil * nīla mēni aiyō ! * niṟai koṇḍaden neñjinaiyē ! *",
            10: "# koṇḍal vaṇṇanai * kōvalanāy veṇṇey uṇḍa vāyan * en uḻḻam kavarndānai * aṇḍar kōn aṇi araṅgan * en amudinai kkaṇḍa kaṇgaḻ * maṭronṟinai kkāṇāvē *"
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



