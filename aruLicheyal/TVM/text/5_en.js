window.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.5.1.steps': {
            1: "🙏 kaiyAr chakkaraththu * en karu mANikkamE! enRenRu * poyyE kaimmai sollip * puRamE puRamE ADi *** meyyE peRRu ozhindhEn * vidhi vAykkinRu kAppAr Ar? * aiyO! kaNNa pirAn! * aRaiyO! inip pOnAlE",
            2: "pOnAy! mA marudhin naDuvE * en pollA maNiyE! * thEnE! in amudhE! * enRenRE sila kUththuch solla *** thAnEl emperumAn * avan en Agi ozhindhAn * vAnE mA nilamE * maRRu muRRum en uLLanavE",
            3: "uLLana maRRuLavAp * puRamE sila mAyam solli * vaLLal! maNi vaNNanE! * enRenRE unnaiyum vanjchikkum *** kaLLa manam thavirndhE * unnaik kaNDu koNDu uyndhu ozhindhEn * veLLaththaNaik kiDandhAy * ini unnai viTTu en koLvanE?",
            4: "en koLvan? unnai viTTu ennum * vAsagangkaL solliyum * van kaLvanEn manaththai valiththuk * kaNNa nIr karandhu *** nin kaN nerungka vaiththE * enadhAviyai nIkka killEn * en kaN malinam aRuththu * ennaik kUvi aruLAy kaNNanE!",
            5: "kaNNa pirAnai * viNNOr karu mANikkaththai amudhai * naNNiyum naNNa killEn * naDuvE Or uDambil iTTu *** thiNNam azhundhak kaTTip * pala sey vinai vankayiRRAl * puNNai maRaiya varindhu * ennaip pOra vaiththAy puRamE",
            6: "puRam aRak kaTTik koNDu * iru valvinaiyAr kumaikkum * muRai muRai Akkai pugal ozhiyak * kaNDu koNDu ozhindhEn *** niRam uDai nAl thaDanthOL * seyya vAy seyya thAmaraik kaN * aRa muyal Azhi angkaik * karu mEni ammAn thannaiyE",
            7: "ammAn Azhip pirAn * avan evviDaththAn? yAn Ar? * emmA pAviyarkkum * vidhi vAykkinRu vAykkum kaNDIr *** kaimmA thunbozhiththAy! enRu * kai thalai pUsal iTTE * mey mAlAy ozhindhEn * empirAnum en mElAnE",
            8: "mElAth thEvargaLum * nilath thEvarum mEvith thozhum * mAlAr vandhu ina nAL * aDiyEn manaththE manninAr *** sElEy kaNNiyarum * perunjchelvamum nanmakkaLum * mElAth thAy thandhaiyum * avarE ini AvArE",
            9: "AvAr Ar? thuNai enRu * alai nIrk kaDaluL azhundhum nAvAy pOl * piRavik kaDaluL * ninRu nAn thuLangka *** thEvAr kOlaththoDum * thiruchchakkaram sangkinoDum * AvA! enRu aruL seydhu * aDiyEnoDum AnAnE",
            10: "AnAn AL uDaiyAn enRu * aqdhE koNDu ugandhu vandhu * thAnE innaruL seydhu * ennai muRRavum thAn AnAn *** mInAy AmaiyumAy * narasingkamumAyk kuRaLAy * kAnAr EnamumAyk * kaRkiyAm innam kAr vaNNanE",
            11: "🙏 kAr vaNNan kaNNa pirAn * kamalath thaDangkaNNan thannai * Er vaLa oNkazhanik * kurugUrch saTakOpan sonna *** sIr vaNNa oNthamizhgaL * ivai AyiraththuL ippaththum * Ar vaNNaththAl uraippAr * aDik kIzh puguvAr polindhE",
        },
        'TVM.5.2.steps': {
            1: "🙏 poliga poliga poliga * pOyiRRu valluyirch sAbam * naliyum naragamum naindha * namanukku ingku yAdhonRum illai *** kaliyum keDum kaNDu koNmin * kaDal vaNNan pUdhangkaL maN mEl * maliyap pugundhu isai pADi * ADi uzhi tharak kaNDOm",
            2: "kaNDOm kaNDOm kaNDOm * kaNNukku iniyana kaNDOm * thoNDIr! ellIrum vArIr * thozhudhu thozhudhu ninRArththum *** vaNDAr thaN anthuzhAyAn * mAdhavan pUdhangkaL maN mEl * paN thAn pADi ninRu ADip * parandhu thiriginRanavE",
            3: "thiriyum kali yugam nIngkith * dhEvargaL thAmum pugundhu * periya kidha yugam paRRip * pEr inba veLLam peruga *** kariya mugil vaNNan emmAn * kaDal vaNNan pUdhangkaL maN mEl * iriyap pugundhu isai pADi * engkum iDam koNDanavE",
            4: "iDangkoL samayaththai ellAm * eDuththuk kaLaivana pOlE * thaDangkaDal paLLip perumAn * thannuDaip pUdhangkaLE Ay * kiDandhum irundhum ezhundhum * kItham pala pala pADi * naDandhum paRandhum kuniththum * nADagam seyginRanavE",
            5: "seyginRadhu en kaNNukku onRE * okkinRadhu ivvulagaththu * vaikundhan pUdhangkaLE Ay * mAyaththinAl engkum manni *** aiyam onRillai * arakkar asurar piRandhIr uLLIrEl * uyyum vagai illai thoNDIr! * Uzhi peyarththiDum konRE",
            6: "konRu uyir uNNum visAdhi * pagai pasi thIyana ellAm * ninRu ivvulagil kaDivAn * nEmip pirAn thamar pOndhAr *** nanRu isai pADiyum thuLLi ADiyum * njAlam parandhAr * senRu thozhudhu uymmin thoNDIr! * sindhaiyaich senniRuththiyE",
            7: "niRuththi num uLLaththuk koLLum * dheyvangkaL ummai uyyak kOL * maRuththum avanODE kaNDIr * mArkkaNDEyanum kariyE *** kaRuththa manam onRum vENDA * kaNNan allAl dheyvam illai * iRuppadhu ellAm * avan mUrththiyAy avarkkE iRuminE",
            8: "iRukkum iRai iRuththu uNNa * evvulagukkum than mUrththi * niRuththinAn theyvangkaL Aga * aththeyva nAyagan thAnE *** maRuth thiru mArvan avan than * pUdhangkaL kIdhangkaL pADi * veRuppinRi njAlaththu mikkAr * mEvith thozhudhu uymmin nIrE",
            9: "mEvith thozhudhu uymmin nIrgaL * vEdhap punidha irukkai * nAvil koNDu achchudhan thannai * njAna vidhi pizhaiyAmE *** pUvil pugaiyum viLakkum * sAndhamum nIrum malindhu * mEvith thozhum aDiyArum * pagavarum mikkadhu ulagE",
            10: "mikka ulagugaL thORum * mEvik kaNNan thiru mUrththi * nakka pirAnODu * ayanum indhiranum mudhalAga *** thokka amarar kuzhAngkaL * engkum parandhana thoNDIr! * okkath thozha kiRRir Agil * kali yugam onRum illaiyE",
            11: "🙏 kali yugam onRum inRikkE * than aDiyArkku aruL seyyum * maliyum suDar oLi mUrththi * mAyap pirAn kaNNan thannai *** kali vayal thennan kurugUrk * kAri mARan saTakOpan * oli pugazh Ayiraththu ippaththu * uLLaththai mAsu aRukkumE",
        },
        'TVM.5.3.steps': {
            1: "🙏 mAsaRu sOdhi * en seyya vAy maNik kunRaththai * AsaRu sIlanai * Adhi mUrththiyai nADiyE *** pAsaRavu eydhi * aRivu izhandhu enai nALaiyam? * EsaRum Uravar kavvai * thOzhI! en seyyumE?",
            2: "en seyyum Uravar kavvai? * thOzhI! ini nammai * en seyya thAmaraik kaNNan * ennai niRai koNDAn *** mun seyya mAmai izhandhu * mEni melivu eydhi * en seyya vAyum karungkaNNum * payappu UrndhavE",
            3: "Urndha sagaDam * udhaiththa pAdhaththan * pEy mulai sArndhu suvaiththa sevvAyan * ennai niRai koNDAn *** pErndhum peyarndhum * avanODu anRi Or sollilEn * thIrndha en thOzhI! * en seyyum Uravar kavvaiyE?",
            4: "Uravar kavvai eru iTTu * annai sol nIr paDuththu * Ira nel viththi muLaiththa * nenjchap perunjcheyuL *** pEr amar kAdhal * kaDal puraiya viLaiviththa * kAr amar mEni * nam kaNNan thOzhI! kaDiyanE?",
            5: "kaDiyan koDiyan neDiya mAl * ulagam koNDa aDiyan * aRivaru mEni mAyaththan *** Agilum koDiya en nenjcham * avan enRE kiDakkum ellE! * thuDi koL iDai maDath thOzhI! * annai en seyyumE?",
            6: "annai en seyyil en? * Ur en sollil en? thOzhimIr! * ennai ini umakku Asai illai * agappaTTEn *** munnai amarar mudhalvan * vaNthuvarApathi mannan * maNi vaNNan * vAsudhEvan valaiyuLE",
            7: "valaiyuL agappaDuththu * ennai nal nenjcham kUvik koNDu * alai kaDal paLLi ammAnai * Azhip pirAn thannai *** kalai koL agal algul thOzhI! * nam kaNgaLAl kaNDu * thalaiyil vaNangkavum AngkolO? * thaiyalAr munbE",
            8: "pEy mulai uNDu sagaDam pAyndhu * marudhiDaip pOy mudhal sAyththu * puL vAy piLandhu kaLiRaTTa *** thU muRuval thoNDai vAyp pirAnai * ennAL kolO? * yAm uRuginRadhu thOzhI! * annaiyar nANavE",
            9: "nANum niRaiyum kavarndhu * ennai nal nenjcham kUvik koNDu * sEN uyar vAnaththu irukkum * dhEva pirAn thannai *** ANai en? thOzhI! * ulagu thORu alar thURRi * Am kONaigaL seydhu * kudhiriyAy maDal UrdhumE",
            10: "yAm maDal Urndhum * em Azhi angkaip pirAnuDai * thU maDal thaN anthuzhAy * malar koNDu sUDuvOm *** yAm maDam inRith * theruvu thORu ayal thaiyalAr * nA maDangkap pazhi thURRi * nADum iraikkavE",
            11: "🙏 iraikkum karungkaDal vaNNan * kaNNa pirAn thannai * viraik koL pozhil * kurugUrch saTakOpan sonna *** niraik koL andhAdhi * Or AyiraththuL ippaththum * uraikka vallArkku * vaikundham Agum tham Ur ellAm",
        },
        'TVM.5.4.steps': {
            1: "🙏 Ur ellAm thunjchi * ulagellAm naLLiruLAy * nIr ellAm thERi * Or nIL iravAy nInDadhAl *** pAr ellAm uNDa * nam pAmbaNaiyAn vArAnAl * Ar? ellE! valvinaiyEn * Avi kAppAr iniyE",
            2: "Avi kAppAr ini yAr? * Azh kaDal maN viN mUDi * mA vikAramAy * Or valliravAy nInDadhAl *** kAvi sEr vaNNan * en kaNNanum vArAnAl * pAviyEn nenjchamE! * nIyum pAngku allaiyE",
            3: "nIyum pAngku allai kAN * nenjchamE! nIL iravum * Oyum pozhudhu inRi * UzhiyAy nINDadhAl *** kAyum kaDunjchilai * en kAguththan vArAnAl * mAyum vagai aRiyEn * valvinaiyEn peN piRandhE",
            4: "peN piRandhAr eydhum * perunthuyar kANgilEn enRu * oN suDarOn * vArAdhu oLiththAn *** immaN aLandha kaN periya sevvAy * engkAr ERu vArAnAl * eN periya sindhai nOy * thIrppAr Ar ennaiyE?",
            5: "Ar ennai ArAyvAr? * annaiyarum thOzhiyarum * nIr ennE? ennAdhE * nIL iravum thunjchuvarAl *** kAr anna mEni * nam kaNNanum vArAnAl * pEr ennai mAyAdhAl * valvinaiyEn pin ninRE",
            6: "pin ninRa kAdhal nOy * nenjcham peridhu aDumAl * mun ninRu irA Uzhi * kaN pudhaiya mUDiRRAl *** man ninRa chakkaraththu * em mAyavanum vArAnAl * inninRa nIL Avi * kAppAr Ar ivviDaththE?",
            7: "kAppAr Ar ivviDaththu? * kangkiruLin nuN thuLiyAy * chETpAladhu UzhiyAych * selginRa kangkul vAy *** thUp pAla veNsangku * chakkaraththan thOnRAnAl * thIp pAla valvinaiyEn * dheyvangkAL! en seygEnO?",
            8: "dheyvangkAL! en seygEn? * Or iravu Ezh UzhiyAy * mey vandhu ninRu * enadhAvi melivikkum *** kai vandha chakkaraththu * en kaNNanum vArAnAl * thaivandha thaNthenRal * venjchuDaril thAn aDumE",
            9: "venjchuDaril thAn aDumAl * vIngkiruLin nuN thuLiyAy * anjchuDara veyyOn * aNi neDunthEr thOnRAdhAl *** senjchuDarth thAmaraik kaN * selvanum vArAnAl * nenjchiDar thIrppAr ini yAr? * ninRu uruguginREnE",
            10: "ninRu uruguginREnE pOla * neDu vAnam * senRu urugi nuN thuLiyAych * selginRa kangkul vAy *** anRu orukAl vaiyam * aLandha pirAn vArAn enRu * onRu orukAl sollAdhu * ulagO uRangkumE",
            11: "🙏 uRangkuvAn pOl * yOgu seydha perumAnai * siRandha pozhil sUzh * kurugUrch saTakOpan sol *** niRam kiLarndha andhAdhi * Ayiraththu ippaththAl * iRandhu pOy vaikundham * sErA ARu engnganEyO?",
        },
        'TVM.5.5.steps': {
            1: "🙏 engnganEyO annaimIrgAL! * ennai munivadhu nIr? * nangkaL kOlath thirukkuRungkuDi nambiyai * nAn kaNDa pin *** sangkinODum nEmiyODum * thAmaraik kaNgaLODum * sengkani vAy onRinODum * selginRadhu en nenjchamE",
            2: "en nenjchinAl nOkkik kANIr * ennai muniyAdhE * thennan sOlaith thirukkuRungkuDi nambiyai * nAn kaNDa pin *** minnu nUlum kuNDalamum * mArvil thiru maRuvum * mannu pUNum nAnku thOLum * vandhu engkum ninRiDumE",
            3: "ninRiDum thisaikkum naiyum enRu * annaiyarum munidhir * kunRa mADath thirukkuRungkuDi nambiyai * nAn kaNDa pin *** venRi villum thaNDum vALum * chakkaramum sangkamum * ninRu thOnRik kaNNuL nIngkA * nenjchuLLum nIngkAvE",
            4: "nIngka nillA kaNNa nIrgaL enRu * annaiyarum munidhir * thEn koL sOlaith thirukkuRungkuDi nambiyai * nAn kaNDa pin *** pUnthaN mAlaith thaNthuzhAyum * pon muDiyum vaDivum * pAngku thOnRum paTTum nANum * pAviyEn pakkaththavE",
            5: "pakkam nOkki niRkum naiyum enRu * annaiyarum munidhir * thakka kIrththik thirukkuRungkuDi nambiyai * nAn kaNDa pin *** thokka sOthith thoNDai vAyum * nINDa puruvangkaLum * thakka thAmaraik kaNNum * pAviyEn Aviyin mElanavE",
            6: "mElum van pazhi nangkuDikku ivaL enRu * annai kANa koDAL * sOlai sUzh thaN thirukkuRungkuDi nambiyai * nAn kaNDa pin *** kOla nIL koDi mUkkum * thAmaraik kaNNum kani vAyum * nIla mEniyum nAnku thOLum * en nenjcham niRaindhanavE",
            7: "niRaindha van pazhi nangkuDikku ivaL enRu * annai kANa koDAL * siRandha kIrththith thirukkuRungkuDi nambiyai * nAn kaNDa pin *** niRaindha sOthi veLLam sUzhndha * nINDa pon mEniyoDum * niRaindhu ennuLLE ninRu ozhindhAn * nEmi angkai uLadhE",
            8: "kaiyuL nan mugam vaikkum naiyum enRu * annaiyarum munidhir * maikoL mADath thirukkuRungkuDi nambiyai * nAn kaNDa pin *** seyya thAmaraik kaNNum algulum * siRRiDaiyum vaDivum * moyya nIL kuzhal thAzhndha thOLgaLum * pAviyEn mun niRkumE",
            9: "mun ninRAy enRu thOzhimArgaLum * annaiyarum munidhir * mannu mADath thirukkuRungkuDi nambiyai * nAn kaNDa pin *** senni nIL muDi AdhiyAya * ulappil aNi kalaththan * kannal pAl amudhAgi vandhu * en nenjcham kazhiyAnE",
            10: "kazhiya mikkadhOr kAdhalaL ivaL enRu * annai kANa koDAL * vazhu il kIrththith thirukkuRungkuDi nambiyai * nAn kaNDa pin *** kuzhumith dhEvar kuzhAngkaL * kai thozhach sOthi veLLaththin uLLE * ezhuvadhOr uru en nenjchuL ezhum * Arkkum aRivaridhE",
            11: "🙏 aRivariya pirAnai * Azhi angkaiyanaiyE alaRRi * naRiya nalmalar nADi * nankurugUrch saTakOpan sonna *** kuRi koL AyiraththuL ivai paththum * thirukkuRungkuDi adhan mEl * aRiyak kaRRu vallAr vaiTNavar * Azh kaDal njAlaththuLLE",
        },
        'TVM.5.6.steps': {
            1: "🙏 kaDal njAlam seydhEnum yAnE ennum * kaDal njAlam AvEnum yAnE ennum * kaDal njAlam koNDEnum yAnE ennum * kaDal njAlam kINDEnum yAnE ennum *** kaDal njAlam uNDEnum yAnE ennum * kaDal njAlaththu Isan vandhu ERak kolO? * kaDal njAlaththIrkku ivai en sollugEn? * kaDal njAlaththu en magaL kaRkinRanavE",
            2: "kaRkum kalvikku ellai ilanE ennum * kaRkum kalvi AvEnum yAnE ennum * kaRkum kalvi seyvEnum yAnE ennum * kaRkum kalvi thIrppEnum yAnE ennum *** kaRkum kalvich sAramum yAnE ennum * kaRkum kalvi nAthan vandhu ERak kolO? * kaRkum kalviyIrkku ivai en sollugEn? * kaRkum kalvi en magaL kANginRanavE",
            3: "kANginRa nilam ellAm yAnE ennum * kANginRa visumbu ellAm yAnE ennum * kANginRa venthI ellAm yAnE ennum * kANginRa ikkARRu ellAm yAnE ennum *** kANginRa kaDal ellAm yAnE ennum * kANginRa kaDal vaNNan ERak kolO? * kANginRa ulagaththIrkku en sollugEn? * kANginRa en kArigai seyginRanavE",
            4: "seyginRa kidhi ellAm yAnE ennum * seyvAn ninRanagaLum yAnE ennum * seydhu mun iRandhavum yAnE ennum * seygaip payan uNbEnum yAnE ennum *** seyvArgaLaich seyvEnum yAnE ennum * seyya kamalak kaNNan ERak kolO? * seyya ulagaththIrkku ivai en sollugEn? * seyya kani vAy iLa mAn thiRaththE",
            5: "thiRambAmal maN kAkkinREn yAnE ennum * thiRambAmal malai eDuththEnE ennum * thiRambAmal asuraraik konREnE ennum * thiRam kATTi anRu aivaraik kAththEnE ennum *** thiRambAmal kaDal kaDaindhEnE ennum * thiRambAdha kaDal vaNNan ERak kolO? * thiRambAtha ulagaththIrkku en sollugEn? * thiRambAdhu en thirumagaL eydhinavE",
            6: "ina vEy malai EndhinEn yAnE ennum * ina ERugaL seRREnum yAnE ennum * ina An kanRu mEyththEnum yAnE ennum * ina Anirai kAththEnum yAnE ennum *** ina Ayar thalaivanum yAnE ennum * inath thEvar thalaivan vandhu ERak kolO? * ina vERkaN nallIrkku ivai en sollugEn? * ina vERkaNNi en magaL uRRanavE",
            7: "uRRArgaL enakku illai yArum ennum * uRRArgaL enakku ingku ellArum ennum * uRRArgaLaich seyvEnum yAnE ennum * uRRArgaLai azhippEnum yAnE ennum *** uRRArgaLukku uRREnum yAnE ennum * uRRAr ili mAyan vandhu ERak kolO? * uRRIrgaTku en sollich sollugEn yAn? * uRRu ennuDaip pEdhai uraikkinRanavE",
            8: "uraikkinRa mukkaN pirAn yAnE ennum * uraikkinRa thisaimugan yAnE ennum * uraikkinRa amararum yAnE ennum * uraikkinRa amarar kOn yAnE ennum *** uraikkinRa munivarum yAnE ennum * uraikkinRa mugil vaNNan ERak kolO? * uraikkinRa ulagaththIrkku en sollugEn? * uraikkinRa en kOmaLa oN koDikkE",
            9: "koDiya vinai yAdhum ilanE ennum * koDiya vinai AvEnum yAnE ennum * koDiya vinai seyvEnum yAnE ennum * koDiya vinai thIrppEnum yAnE ennum *** koDiyAn ilangkai seRREnE ennum * koDiya puL uDaiyavan ERak kolO? * koDiya ulagaththIrkku ivai en sollugEn? * koDiyEn koDi en magaL kOlangkaLE",
            10: "kOlangkoL suvarkkamum yAnE ennum * kOlamil naragamum yAnE ennum * kOlam thigazh mOkkamum yAnE ennum * kOlangkoL uyirgaLum yAnE ennum *** kOlangkoL thani mudhal yAnE ennum * kOlangkoL mugil vaNNan ERak kolO? * kOlangkoL ulagaththIrkku en sollugEn? * kOlam thigazh kOdhai en kUndhalukkE",
            11: "🙏 kUndhal malar mangkaikkum maN maDandhaikkum * kula Ayar kozhundhukkum kELvan thannai * vAyndha vazhudhi vaLa nADan * mannu kurugUrch saTakOpan kuRREval seydhu *** Ayndha thamizh mAlai * AyiraththuL ivaiyum Or paththum vallAr * ulagil Endhu perunjchelvaththarAyth * thirumAl aDiyArgaLaip pUsikka nORRArgaLE",

        },
        'TVM.5.7.steps': {

            1: "🙏  nORRa nOnbu prApaka niShkarSham seyyum thiruvAymozhigaLil mudhalAvadhu; AzhvAr thamadhu Akinjchanyaththai [kaimmudhal illAmaiyai] eDuththuk kURi vAnamAmalaip perumAniDaththil prapaththi paNNudhal *** nORRa nOnbilEn * nuNNaRivu ilEn * Agilum ini unnai viTTu onRum ARRa kiRkinRilEn * aravin aNai ammAnE! *** sERRuth thAmarai sennelUDu malar * sirIvara mangkala nagar * vIRRirundha endhAy! * unakku migai allEn angkE",
            2: "angkuRREn allEn ingkuRREn allEn * unnaik kANum avAvil vIzhndhu * nAn engkuRREnum allEn * ilangkai seRRa ammAnE! *** thingkaL sEr maNi mADa nIDu * sirIvara mangkala nagar uRai * sangku chakkaraththAy! * thamiyEnukku aruLAyE",
            3: "karuLap puTkoDi chakkarap paDai * vAna nADa! en kAr mugil vaNNA * poruL allAdha ennaip poruL Akki * aDimai konDAy *** theruL koL nAnmaRai vallavar palar vAzh * sirIvara mangkala nagarkku * aruL seydhu angku irundhAy! * aRiyEn oru kaimmARE",
            4: "mARu sEr paDai nURRuvar mangka * Or aivarkkAy anRu mAyap pOr paNNi * nIRu seydha endhAy! * nilam kINDa ammAnE! *** thERu njAnaththar vEdha vELvi aRAch * sirIvara mangkala nagar * ERi vIRRirundhAy! * unnai engku eydhak kUvuvanE?",
            5: "eydhak kUvudhal AvadhE enakku? * evva thevvaththuLAyum Ay ninRu * kaithavangkaL seyyum * karu mEni ammAnE! *** seydha vELviyar vaiyath dhEvar aRAch * sirIvara mangkala nagar * kai thozha irundhAy * adhu nAnum kaNDEnE",
            6: "🙏 EnamAy nilam kINDa en appanE! kaNNA! * enRum ennai ALuDai * vAna nAyaganE! * maNi mANikkach suDarE *** thEna mAm pozhil thaN sirIvara mangkalaththavar * kai thozha uRai * vAnamAmalaiyE! * aDiyEn thozha vandharuLE",
            7: "vandharuLi en nenjchu iDam koNDa * vAnavar kozhundhE! * ulagukku Or mundhaith thAy thandhaiyE! * muzhu Ezh ulagum uNDAy *** senthozhilavar vEdha vELvi aRAch * sirIvara mangkala nagar * andham il pugazhAy! * aDiyEnai agaRRElE",
            8: "agaRRa nI vaiththa mAya val aimpulankaL Am avai * nanku aRindhanan * agaRRi ennaiyum nI * arunjchERRil vIzhththi kaNDAy *** pagaR kadhir maNi mADa nIDu * sirIvara mangkai vANanE! * enRum pugaRku ariya endhAy! * puLLin vAy piLandhAnE!",
            9: "puLLin vAy piLandhAy! marudhu iDai pOyinAy! * erudhu Ezh aDarththa * en kaLLa mAyavanE! * karu mANikkach suDarE *** theLLiyAr thiru nAnmaRaigaL vallAr * mali thaN sirIvara mangkai * uL irundha endhAy! * aruLAy uyyum ARu enakkE",
            10: "ARenakku nin pAdhamE * saraNAgath thandhu ozhindhAy * unakku Or kaim mARu nAn onRilEn * enadhu Aviyum unadhE *** sERu koL karumbum perunjchennelum * mali thaN sirIvara mangkai * nARu pUnthaN thuzhAy muDiyAy! * dheyva nAyaganE!",
            11: "🙏 dheyva nAyagan nAraNan * thirivikkiraman aDi iNai misai * koy koL pUmpozhil sUzh * kurugUrch saTakOpan *** seydha AyiraththuL ivai * thaN sirIvara mangkai mEya paththuDan * vaigal pADa vallAr * vAnOrkku ArA amudhE",


        },
        'TVM.5.8.steps': {
            1: "🙏 ArA amudhE! aDiyEn uDalam * nin pAl anbAyE * nIrAy alaindhu karaiya urukkuginRa * neDumAlE! *** sIr Ar sennel kavari vIsum * sezhu nIrth thirukkuDandhai * Er Ar kOlam thigazhak kiDandhAy! * kaNDEn emmAnE!",
            2: "emmAnE! en veLLai mUrththi! * ennai ALvAnE * em mA uruvum vENDum ARRAl * AvAy! ezhil ERE! *** sem mA kamalam sezhu nIr misaik kaN malarum * thirukkuDandhai * am mA malark kaN vaLarginRAnE! * en nAn seygEnE!",
            3: "en nAn seygEn? yArE kaLaikaN? * ennai en seyginRAy? * unnAl allAl yAvarAlum * onRum kuRai vENDEn *** kannAr madhiL sUzh kuDandhaik kiDandhAy! * aDiyEn aru vANAL * sennAL ennAL? annAL * una thAL piDiththE selak kANE",
            4: "selak kAN kiRpAr kANum aLavum * sellum kIrththiyAy! * ulappu ilAnE! * ellA ulagum uDaiya oru mUrththi! *** nalaththAl mikkAr kuDandhaik kiDandhAy! * unnaik kANbAn nAn alappAy * AgAsaththai nOkki * azhuvan thozhuvanE",
            5: "azhuvan thozhuvan ADik kANban * pADi alaRRuvan * thazhu val vinaiyAl pakkam nOkki * nANik kavizhndhu iruppan *** sezhu oN pazhanak kuDandhaik kiDandhAy! * senthAmaraik kaNNA! * thozhuvanEnai una thAL * sErum vagaiyE sUzh kaNDAy",
            6: "sUzh kaNDAy en thollai vinaiyai aRuththu * un aDi sErum Uzh kaNDu irundhE * thUrAk kuzhi thUrththu * enai nAL aganRu iruppan? *** vAzh thol pugazhAr kuDandhaik kiDandhAy! * vAnOr kOmAnE! * yAzhin isaiyE! amudhE! * aRivin payanE! ari ERE!",
            7: "ari ERE! en ampoR suDarE! * sengkaN karu mugilE! * eriyE! pavaLak kunRE! * nAl thOL endhAy! unadharuLE *** piriyA aDimai ennaik koNDAy! * kuDandhaith thirumAlE! * thariyEn ini un saraNam thandhu * en sanmam kaLaiyAyE",
            8: "kaLaivAy thunbam kaLaiyAdhu ozhivAy * kaLaikaN maRRilEn * vaLai vAy nEmip paDaiyAy! * kuDandhaik kiDandha mA mAyA! *** thaLarA uDalam enadhAvi * sarindhu pOm pOdhu * iLaiyAdhu una thAL orungkap piDiththu * pOdha isai nIyE",
            9: "isaiviththu ennai un thAL iNaik kIzh * iruththum ammAnE! * asaivil amarar thalaivar thalaivA! * Adhip peru mUrththi! *** thisai vil vIsum sezhu mA maNigaL sErum * thirukkuDandhai * asaivil ulagam paravak kiDandhAy! * kANa vArAyE",
            10: "🙏 vArA aruvAy varum en mAyA! * mAyA mUrththiyAy! * ArA amudhAy aDiyEn Avi * agamE thiththippAy *** thIrA vinaigaL thIra ennai ANDAy! * thirukkuDandhai UrA! * unakku ATpaTTum * aDiyEn innam uzhalvEnO?",
            11: "🙏 uzhalai enbin pEychchi mulai UDu * avaLai uyir uNDAn * kazhalgaL avaiyE saraN Agak koNDa * kurugUrch saTakOpan *** kuzhalin maliyach sonna * Or AyiraththuL ippaththum * mazhalai thIra vallAr * kAmar mAnEy nOkkiyarkkE",
        },
        'TVM.5.9.steps': {
            1: "🙏 mAnEy nOkku mUnRAvadhu. thirukkuDandhaiyilum pERu peRAmal thiruvallavAzh sella oruppaTTa nAyagi bakthi paravasa nilaiyAlE avvUrp puRachchOlaiyil vizhundhu, thaDukkum thOzhiyarkkuth than Arththiyaik kURi, 'andhath thiruvallavAzhp pirAnai enRu aDaivEn?' enRu kURum pAsuram *** mAnEy nOkku nallIr! * vaigalum vinaiyEn meliya * vAn Ar vaN kamugum * madhu malligai kamazhum *** thEn Ar sOlaigaL sUzh * thiruvallavAzh uRaiyum kOnArai * aDiyEn * aDi kUDuvadhu enRu kolO?",
            2: "enRu kol? thOzhimIrgAL! * emmai nIr nalindhu en seydhIrO? * pon thigazh punnai magizh * pudhu mAdhavi mIdhu aNavi *** thenRal maNam kamazhum * thiruvallavAzh nagaruL ninRa pirAn * aDi nIRu * aDiyOm koNDu sUDuvadhE",
            3: "sUDu malark kuzhalIr! * thuyarATTiyEnai meliya * pADu nal vEdha oli * paravaith thirai pOl muzhangka *** mADuyarndhu Omap pugai kamazhum * thaN thiruvallavAzh * nIDuRaiginRa pirAn * kazhal kANDungkol nichchalumE?",
            4: "nichchalum thOzhimIrgAL! * emmai nIr nalindhu en seydhIrO? * pachchilai nIL kamugum * palavum thengkum vAzhaigaLum *** machchaNi mADangkaL mIdhu aNavum * thaN thiruvallavAzh * nachcharavu in aNai mEl * nam pirAnadhu nannalamE",
            5: "nannalath thOzhimIrgAL! * nalla andhaNar vELvip pugai * mainnalam koNDu uyar viN maRaikkum * thaN thiruvallavAzh *** kannal angkaTTi thannaik * kaniyai innamudham thannai * en nalangkoL suDarai * enRu kol kaNgaL kANbadhuvE?",
            6: "kANbadhu enjnjAnRu kolo? * vinaiyEn kani vAy maDavIr! * pAN kural vaNDinoDu * pasunthenRalum Agi engkum *** sEN sinai Ongku * marach sezhungkAnal thiruvallavAzh * mAN kuRaL kOlap pirAn * malarth thAmaraip pAdhangkaLE",
            7: "pAdhangkaL mEl aNi pUnthozhak kUDungkol? * pAvai nallIr! * Odha neDunthaDaththuL * uyar thAmarai sengkazhunIr *** mAdhargaL vANmugamum * kaNNum Endhum thiruvallavAzh * nAdhan injnjAlam uNDa * nam pirAn thannai nALthORumE",
            8: "nADoRum vIDu inRiyE * thozhak kUDungkol? nal nudhalIr! * ADuRu thIngkarumbum * viLai sennelum Agi engkum *** mADuRu pUnthaDam sEr * vayal sUzh thaN thiruvallavAzh * nIDuRaiginRa pirAn * nilam thAviya nIL kazhalE",
            9: "kazhal vaLai pUrippa yAm kaNDu * kai thozhak kUDungkolO? * kuzhal enna yAzhum ennak * kuLir sOlaiyuL thEn arundhi *** mazhalai vari vaNDugaL isai pADum * thiruvallavAzh * suzhalin mali chakkarap perumAnadhu * thol aruLE",
            10: "thol aruL nal vinaiyAl * solak kUDungkol? thOzhimIrgAL! * thol aruL maNNum viNNum * thozha ninRa thiru nagaram *** nal aruL Ayiravar * nalan Endhum thiruvallavAzh * nal aruL nam perumAn * nArAyaNan nAmangkaLE",
            11: "🙏 nAmangkaL Ayiram uDaiya * nam perumAn aDi mEl * sEmangkoL thenkurugUrch * saTakOpan therindhu uraiththa *** nAmangkaL AyiraththuL * ivai paththum thiruvallavAzh * sEmangkoL thennagar mEl * seppuvAr siRandhAr piRandhE",
        },
        'TVM.5.10.steps': {
            1: "🙏 piRandha ARum vaLarndha ARum * periya bAratham kai seydhu * aivarkkuth thiRangkaL kATTiyiTTuch * seydhu pOna mAyangkaLum *** niRandhan UDu pukku enadhAviyai * ninRu ninRu urukki uNkinRa * ich chiRandha vAn suDarE! * unnai enRu kol sErvadhuvE?",
            2: "vadhuvai vArththaiyuL ERu pAyndhadhum * mAya mAvinai vAy piLandhadhum * madhuvai vAr kuzhalAr * kuravai piNaindha kuzhagum *** adhu idhu udhu ennal Avana alla * ennai un seygai naivikkum * mudhu vaiya mudhalvA! * unnai enRu thalaippeyvanE?",
            3: "peyyum pUngkuzhal pEy mulai uNDa * piLLaith thERRamum * pErndhu Or sADiRach seyya pAdham onRAl * seydha nin siRuch sEvagamum *** ney uN vArththaiyuL annai kOl koLLa * nI un thAmaraik kaNgaL nIr malga * paiyavE nilaiyum vandhu * en nenjchai urukkungkaLE",
            4: "kaLLa vEDaththaik koNDu pOyp * puRam pukka ARum * kalandhu asurarai uLLam pEdham seydhiTTu * uyir uNDa upAyangkaLum *** veLLa nIrch saDaiyAnum * ninniDai vERu alAmai viLangka ninRadhum * uLLam uL kuDaindhu * en uyirai urukki uNNumE",
            5: "uNNa vAnavar kOnukku * Ayar oruppaDuththa aDisil uNDadhum * vaNNa mAl varaiyai eDuththu * mazhai kAththadhum *** maNNai mun paDaiththu uNDu umizhndhu * kaDandhu iDandhu maNandha mAyangkaL * eNNum thORum en nenjchu * eri vAy mezhugu okkum ninRE",
            6: "ninRa ARum irundha ARum * kiDandha ARum ninaippu ariyana * onRu alA uruvAy * aruvAya nin mAyangkaL *** ninRu ninRu ninaiginREn * unnai engnganam ninaikiRpan? * pAviyERku onRu nanku uraiyAy * ulagam uNDa oN suDarE!",
            7: "oN suDarODu iruLumAy ninRa ARum * uNmaiyODu inmaiyAy vandhu * en kaN koLA vagai * nI karandhu ennaich seyginRana *** eN koL sindhaiyuL naiginREn * en kariya mANikkamE! * en kaNgaTkuth thiN koLLa oru nAL * aruLAy un thiru uruvE",
            8: "thiru uruvu kiDandha ARum * koppUzhch senthAmarai mEl * thisaimugan karuvuL vIRRirundhu * paDaiththiTTa karumangkaLum *** poruvil un thani nAyagam avai * kETkum thORum en nenjcham ninRu nekku * aruvi sOrum kaN nIr * en seygEn aDiyEnE?",
            9: "aDiyai mUnRai irandha ARum * angkE ninRu Azh kaDalum maNNum viNNum muDiya * IraDiyAl muDiththuk koNDa * mukkiyamum *** noDiyum ARu avai kETkum thORum * en nenjcham nin thanakkE karaindhu ugum * koDiya val vinaiyEn * unnai enRu kol kUDuvadhE?",
            10: "kUDi nIraik kaDaindha ARum * amudham dhEvar uNNa * asurarai vIDum vaNNangkaLE * seydhu pOna viththagamum *** UDu pukku enadhAviyai * urukki uNDiDuginRa * nin thannai nADum vaNNam sollAy * nachchu nAgaNaiyAnE!",
            11: "🙏 nAgaNai misai nam pirAn * charaNE saraN namakku enRu * nAL thoRum Eka sindhaiyanAyk * kurugUrch saTakOpan mARan *** Aga nURRa andhAthi * AyiraththuL ivaiyum Or paththum vallAr * mAga vaikundhaththu * magizhvu eydhuvar vaigalumE",
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