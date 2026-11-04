window.MARKER_DATABASE = window.MARKER_DATABASE || {};

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PTM.4.1.steps': {
            1: "🙏 pOdhalarndha pozhiR sOlaip * puRam enggum poru thiraigaL * thAdhudhira vandhalaikkum * thaDamaNNith thenkarai mEl * mAdhavan thAn uRaiyum iDam * vayal nAnggai * vari vaNDu thEdhena enRu isai pADum * thiruththEvanAr thogaiyE",
            2: "yAvarumAy yAvaiyumAy * ezhil vEdhap poruLgaLumAy * mUvarumAy mudhalAya * mUrththi amarndhu uRaiyum iDam *** mA varum thiNpaDai mannai * venRi koLvAr mannu nAnggai * dhEvarum senRu iRainjchu pozhil * thiruththEvanAr thogaiyE",
            3: "vAnADum maNNADum * maRRuLLa palluyirum * thAnAya emperumAn * thalaivan amarndhu uRaiyum iDam *** AnAdha perunjchelvaththu * arumaRaiyOr nAnggai thannuL * thEnArum malarp pozhil sUzh * thiruththEvanAr thogaiyE",
            4: "indhiranum imaiyavarum * munivargaLum ezhil amaindha * sandha malarch chadhumuganum * kadhiravanum chandhiranum *** endhai emakku aruL ena ninRu * aruLum iDam ezhil nAnggai * sundhara naRpozhil puDai sUzh * thiruththEvanAr thogaiyE",
            5: "anDamum ivvalai kaDalum * avanigaLum kulavaraiyum * uNDa pirAn uRaiyum iDam * OLimaNi sandhu agil kanagam *** theNthiraigaL varath thiraTTum * thigazh maNNith thenkarai mEl * thiNthiRalAr payil nAnggaith * thiruththEvanAr thogaiyE",
            6: "njAlam ellAm amudhu seydhu * nAnmaRaiyum thoDarAdha * pAlaganAy Alilaiyil * paLLi koLLum paraman iDam *** sAli vaLam perugi varum * thaDamaNNith thenkarai mEl * sEl ugaLum vayal nAnggaith * thiruththEvanAr thogaiyE",
            7: "ODAdha ALariyin * uruvAgi iraNiyanai * vADAdha vaLLugirAl * piLandhu aLaindha mAladhiDam *** EDERu perunjchelvaththu * ezhil maRaiyOr nAnggai thannuL * sEDERu pozhil thazhuvu * thiruththEvanAr thogaiyE",
            8: "vArArum iLangkonggai * maithiliyai maNam puNarvAn * kArAr thiNsilai iRuththa * thanik kALai karudhum iDam *** ErArum perunjchelvaththu * ezhil maRaiyOr nAnggai thannuL * sIrArum malarp pozhil sUzh * thiruththEvanAr thogaiyE",
            9: "kumba migu madha yAnai * pAganoDum kulaindhu vIzha * kombadhanaip paRiththu eRindha * kUththan amarndhu uRaiyum iDam *** vambavizhum seNbagaththin * maNam kamazhum nAnggai thannuL * sempon madhiL pozhil puDai sUzh * thiruththEvanAr thogaiyE",
            10: "🙏 kArArndha thirumEnik * kaNNan amarndhu uRaiyum iDam * sIrArndha pozhil nAnggaith * thiruththEvanAr thogai mEl *** kUrArndha vERkaliyan * kURu thamizh paththum vallAr * ErArndha vaikundhaththu * imaiyavarODu iruppArE",
            11: "aDivaravu: pOdhu * yAvarum vAnADum * indhiranum aNDamum * njAlam ODAdha * vArArum kumbam",
        },
        'PTM.4.2.steps': {
            1: "🙏 kamba mAkaDal aDaiththu ilanggaikku man * kathir muDi avai paththum ambinAl aRuththu * arasu avan thambikku * aLiththavan uRai kOyil *** sempalA nirai seNbagam mAdhavi * sUthagam vAzhaigaL sUzh * vambulAm kamugu Onggiya nAnggUr * vaNpuruDOththamamE",
            2: "pallavam thigazh pUngkaDambu ERi * akkALiyan paNavaranggil * ollai vandhuRap pAyndhu arunaDam seydha * umbar kOn uRai kOyil *** nalla venthazhal mUnRu nAlvEdham * aivELviyODu ARanggam * valla andhaNar malgiya nAnggUr * vaNpuruDOththamamE",
            3: "aNDar Anavar vAnavar kOnukku enRu * amaiththa sORadhu ellAm uNDu * kOnirai mEyththu avai kAththavan * ugandhu inidhuRai kOyil *** koNDalAr muzhavil kuLir vAr pozhil * kula mayil naDam ADa * vaNDu thAn isai pADiDu nAnggUr * vaNpuruDOththamamE",
            4: "parungkai yAnaiyin kombinaip paRiththu * adhan pAganaich sADip pukku * oRungga mallaraik konRu * pin kanjchanai udhaiththavan uRai kOyil *** karumbinUDu uyar sAligaL viLai tharu * kazhaniyil mali vAvi * marunggelAm pozhil Onggiya nAnggUr * vaNpuruDOththamamE",
            5: "sADu pOy vizhath thAL nimirththu * Isan than paDaiyoDum kiLaiyODum ODa * vANanai Ayiram thOLgaLum * thuNiththavan uRai kOyil *** ADu vAn koDi agal visumbu aNavip pOyp * pagalavan oLi maRaikkum * mADa mALigai sUzh tharu nAnggUr * vaNpuruDOththamamE",
            6: "angkaiyAl aDi mUnRu nIr ERRu * ayan alar koDu thozhudhu Eththa * ganggai pOdharak kAl nimirththu aruLiya * kaNNan vandhuRai kOyil *** konggai kOnggu avai kATTa vAy kumudhanggaL kATTa * mA padhumanggaL * manggaimAr mugam kATTiDu nAnggUr * vaNpuruDOththamamE",
            7: "uLaiya oNthiRal ponpeyarOn thanadhu * uram piLandhu udhiraththai aLaiyum * venjchinaththu ari pari kIRiya * appan vandhuRai kOyil *** iLaiya manggaiyar iNaiyaDich silambinODu * ezhil koL pandhu aDippOr * kai vaLaiyil ninRu oli malgiya nAnggUr * vaNpuruDOththamamE",
            8: "vALaiyAr thaDangkaN umai panggan * van sAbam maRRadhu nIngga * mULaiyAr siraththu aiyam munnaLiththa * em mugil vaNNan uRai kOyil *** pALai vAnkamugUDu uyar thenggin * vanpazham vizha veruvip pOy * vALai pAy thaDam sUzh tharu nAnggUr * vaNpuruDOththamamE",
            9: "indhu vAr saDai Isanaip payandha * nAnmuganai than ezhilArum * undhi mAmalar mImisaip paDaiththavan * ugandhu inidhuRai kOyil *** kundhi vAzhaiyin kozhungkani nugarndhu * than kuruLaiyaith thazhuvip pOy * mandhi mAmpaNai mEl vaigu nAnggUr * vaNpuruDOththamamE",
            10: "🙏 maNNuL Ar pugazh vEdhiyar nAnggUr * vaNpuruDOththamaththuL * aNNal sEvaDik kIzh aDaindhu uyndhavan * Aliman aruLmAri *** paNNuL Ar tharap pADiya pADal * ippaththum vallAr * ulagil eNNilAdha pErinbam uRRu * imaiyavarODum kUDuvarE",
            11: "aDivaravu: kambam * pallavam aNDar * parungkai sADu * angkaiyAl uLaiya * vALai indhu * maNNuLAr",
        },
        'PTM.4.3.steps': {
            1: "🙏 pEr aNindhu ulagaththavar thozhudhu Eththum * pEraruLALan empirAnai * vAraNi mulaiyAL malarmagaLODu * maNmagaLum uDan niRpa *** sIraNi mADa nAnggai nannaDuvuL * semponsey kOyilin uLLE * kAraNi mEgam ninRadhu oppAnaik * kaNDu koNDu uyndhu ozhindhEnE",
            2: "piRappoDu mUppu onRu illavan thannaip * pEdhiyA inba veLLaththai * iRappu edhirkAlak kazhivum AnAnai * Ezh isaiyin suvai thannai *** siRappuDai maRaiyOr nAnggai nannaDuvuL * semponsey kOyilin uLLE * maRaip perum poruLai vAnavar kOnaik * kaNDu nAn vAzhndhu ozhindhEnE",
            3: "thiDavisumbu eri nIr thinggaLum suDarum * sezhunilaththu uyirgaLum maRRum * paDarporuLgaLumAy ninRavan thannai * panggayaththu ayanavan anaiya *** thiDamozhi maRaiyOr nAnggai nannaDuvuL * semponsey kOyilin uLLE * kaDal niRa vaNNan thannai nAn aDiyEn * kaNDu koNDu uyndhu ozhindhEnE",
            4: "vasai aRu kuRaLAy mAvali vELvi * maN aLaviTTavan thannai * asaivaRum amarar aDiyiNai vaNangga * alaikaDal thuyinRa ammAnai *** thisaimugan anaiyOr nAnggai nannaDuvuL * semponsey kOyilin uLLE * uyarmaNi maguDam sUDi ninRAnaik * kaNDu koNDu uyndhu ozhindhEnE",
            5: "thI manaththu arakkar thiRal azhiththavanE! enRu * senRu aDaindhavar thamakku * thAy manaththu iranggi aruLinaik koDukkum * thayaradhan madhalaiyaich sayamE *** thEmalarp pozhil sUzh nAnggai nannaDuvuL * semponsey kOyilin uLLE * kAmanaip payandhAn thannai nAn aDiyEn * kaNDu koNDu uyndhu ozhindhEnE",
            6: "mallai mA munnIr adharpaDa * malaiyAl aNai seydhu magizhndhavan thannai * kallin mIdhu iyanRa kaDimadhiL ilanggai kalangga * Or vALi thoTTAnai *** selva nAnmaRaiyOr nAnggai nannaDuvuL * semponsey kOyilin uLLE * alli mAmalarAL thannoDum aDiyEn * kaNDu koNDu allal thIrndhEnE",
            7: "venjchinak kaLiRum villoDu mallum * veguNDu iRuththu aDarththavan thannai * kanjchanaik kAyndha kALai ammAnaik * karumugil thiruniRaththavanai *** senjchol nAnmaRaiyOr nAnggai nannaDuvuL * semponsey kOyilin uLLE * anjchanak kunRam ninRadhu oppAnaik * kaNDu koNDu allal thIrndhEnE",
            8: "🙏 anRiya vANan Ayiram thOLum thuNiya * anRu Azhi thoTTAnai * min thigazh kuDumi vEngkaDa malai mEl * mEviya vEdha nalviLakkai *** thenthisaith thiladham anaiyavar nAnggaich * semponsey kOyilin uLLE * manRadhu poliya magizhndhu ninRAnai * vaNanggi nAn vAzhndhu ozhindhEnE",
            9: "kaLangkani vaNNA! kaNNaNE! * endhan kArmugilE! ena ninaindhiTTu * uLam kanindhirukkum aDiyavar thanggaL * uLLaththuL URiya thEnai *** theLindha nAnmaRaiyOr nAnggai nannaDuvuL * semponsey kOyilin uLLE * vaLangkoL pErinbam manni ninRAnai * vaNanggi nAn vAzhndhu ozhindhEnE",
            10: "🙏 thEn amar sOlai nAnggai nannaDuvuL * semponsey kOyilin uLLE * vAnavar kOnaik kaNDamai sollum * manggaiyAr vATkalikanRi *** Unamil pADal onbadhODu onRum * ozhivinRik kaRRu vallArgaL * mAna veNkuDaik kIzh vaiyagam ANDu * vAnavar Aguvar magizhndhE",
            11: "aDivaravu: pEraNindhu * piRappu thiDa * vasai thImanaththu * mallai venjchinam * anRiya kaLangkani",
        },
        'PTM.4.4.steps': {
            1: "🙏 mARRarasar maNimuDiyum thiRalum thEsum * maRRavar tham kAdhalimAr kuzhaiyum * thandhai kAl thaLaiyum uDan kazhala vandhu thOnRik * kathanAgam kAththaLiththa kaNNar kaNDIr *** nURRidhazh koL aravindham nuzhaindha paLLaththu * iLangkamugin mudhupALai paguvAy naNDin * sERRaLaiyil veNmuththam sindhum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            2: "poRRoDith thOL maDamagaL than vaDivu koNDa * pollAdha vanpEychchi konggai vAnggi * peRReDuththa thAy pOla maDuppa * Arum pENA nanjchuNDu ugandha piLLai kaNDIr *** nel thoDuththa malar nIlam niRaindha sUzhal * irunjchiRaiya vaNDoliyum neDungkaNAr tham * siRRaDi mEl silamboliyum mizhaRRum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            3: "paDal aDaiththa siRukurambai nuzhaindhu pukkup * pasu veNNey padham Arap paNNai muRRum * aDal aDarththa vERkaNAr thOkkai paRRi * alandhalaimai seydhu uzhalum aiyan kaNDIr *** maDal eDuththa neDunthenggin pazhanggaL vIzha * mAngganigaL thiraTTu uruTTA varunIrp ponni * thiDal eDuththu malar sumandhanggu izhiyu nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            4: "vArArum mulai maDavAL pinnaikkAgi * vaLai maruppil kaDunjchinaththu vanthAL Arndha * kArAr thiNviDai aDarththu vadhuvai ANDa * karumugil pOl thiruniRaththu en kaNNar kaNDIr *** ErArum malarp pozhilgaL thazhuvi enggum * ezhil madhiyaik kAl thoDara viLanggu sOdhi * sIrArum maNimADam thigazhum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            5: "kalai ilanggum agal algul kamalap pAvai * kadhir muththa veNNagaiyAL karungkaN Aychchi * mulai ilanggum oLi maNippUN vaDamum thEyppa * mUvAdha varai neDunthOL mUrththi kaNDIr *** malai ilanggu niraich sandhi mADa vIdhi * ADavarai maDamozhiyAr mugaththu * iraNDu silai vilanggi manam siRai koNDirukkum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            6: "thAn pOlum enRu ezhundhAn tharaNiyALan * adhu kaNDu thariththiruppAn arakkar thanggaL * kOn pOlum enRu ezhundhAn kunRam anna * irupadhu thOL uDan thuNiththa oruvan kaNDIr *** mAn pOlum mennOkkin seyya vAyAr * maragadham pOl maDakkiLiyaik kai mEl koNDu * thEn pOlum menmazhalai payiRRum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            7: "ponggilanggu purinUlum thOlum thAzhap * pollAdha kuRaL uruvAyp porundhA vANan * manggalam sEr maRai vELvi adhanuL pukku * maNNagalam kuRai irandha maindhan kaNDIr *** konggalarndha malark kuzhalAr konggai thOyndha * kunggumaththin kuzhambu aLaindha kOlam thannAl * senggalanggal veNmaNal mEl thavazhu nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            8: "silambin iDai siRu paral pOl periya mEru * kulungga * nila maDandhai thanai iDandhu pulgik * kOTTiDai vaiththu aruLiya engkOmAn kaNDIr *** ilanggiya nAnmaRai anaiththum anggam ARum * Ezhisaiyum kELvigaLum eNthikku enggum * silambiya naRperum selvam thigazhum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            9: "Ezhulagum thAzh varaiyum enggum mUDi * eNthisaiyum maNDalamum maNDi * aNDam mOzhai ezhundhu Azhi migum Uzhi veLLam * mun agaTTil oDukkiya em mUrththi kaNDIr *** Uzhi thoRum Uzhi thoRum uyarndha selvaththu * Onggiya nAnmaRai anaiththum thAnggu nAvar * sEzh uyarndha maNimADam thigazhum nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlE",
            10: "🙏 sIraNindha maNimADam thigazhu nAnggUrth * thiruththeRRiyambalaththu en sengkaNmAlai * kUraNindha vElvalavan Ali nADan * koDimADa manggaiyar kOn kuRaiyal ALi *** pAraNindha thol pugazhAn kaliyan sonna * pAmAlai ivai aindhum aindhum vallAr * sIraNindha ulagaththu mannarAgich * sEN visumbil vAnavarAyth thigazhvar thAmE",
            11: "aDivaravu: mARRarasar * poRRoDi paDal * vArArum kalai * thAn ponggu * silambin Ezhulagum * sIraNindha",
        },
        'PTM.4.5.steps': {
            1: "🙏 thUmbuDaip panaik kai vEzham * thuyar keDuththu aruLi * mannu kAmbuDaik kunRam Endhik * kaDumazhai kAththa endhai *** pUmpunal ponni muRRum * pugundhu pon varaNDa * enggum thEmpozhil kamazhum nAnggUrth * thirumaNikkUDaththAnE",
            2: "kavvai vAL eyiRRu vanpEy * kadhir mulai suvaiththu * ilanggai vavviya iDumbai kUrak * kaDungkaNai thurandha endhai *** kovvai vAy magaLir konggaik * kunggumam kazhuvip pOndha * dheyva nIr kamazhum nAnggUrth * thirumaNikkUDaththAnE",
            3: "mAth thozhil maDanggach seRRu * maRudhiRa naDandhu * vanthAL sEth thozhil sidhaiththup * pinnai sevvith thOL puNarndha endhai *** nAth thozhil maRai vallArgaL * nayandhu aRam payandha * vaNkaith thIth thozhil payilum nAnggUrth * thirumaNikkUDaththAnE",
            4: "thAngga arumsinaththu vanthAL * thaDakkai mA maruppu vAnggi * pUngkurundhu osiththup puLvAy piLandhu * erudhaDarththa endhai *** mAngkani nugarndha mandhi * vandhu vaNDu iriya * vAzhaith thIngkani nugarum nAnggUrth * thirumaNikkUDaththAnE",
            5: "karumagaL ilanggaiyATTi * pilangkoL vAy thiRandhu * than mEl varumavaL seviyum mUkkum * vALinAl thaDindha endhai *** perumagaL pEdhai manggai * thannoDum pirivilAdha * thirumagaL maruvu nAnggUrth * thirumaNikkUDaththAnE",
            6: "keNDaiyum kuRaLum puLLum * kEzhalum ariyum mAvum * aNDamum suDarum * allA ARRalum Aya endhai *** oNthiRal thennan ODa * vaDavarasu OTTam kaNDa * thiNthiRalALar nAnggUrth * thirumaNikkUDaththAnE",
            7: "kunRamum vAnum maNNum * kuLir punal thinggaLODu * ninRa venjchuDarum * allA nilaigaLum Aya endhai *** manRavum vayalum kAvum * mADamum maNam koNDu * enggum thenRal vandhulavum nAnggUrth * thirumaNikkUDaththAnE",
            8: "sanggaiyum thuNivum poyyum * meyyum iththaraNi Ombum * ponggiya mugilum * allAp poruLgaLum Aya endhai *** panggayam uguththa thERal * parugiya vALai pAya * sengkayal ugaLum nAnggUrth * thirumaNikkUDaththAnE",
            9: "pAvamum aRamum vIDum * inbamum thunbam thAnum * kOvamum aruLum * allAk guNanggaLum Aya endhai *** mUvaril enggaL mUrththi * ivan ena munivarODu * dhEvar vandhu iRainjchum nAnggUrth * thirumaNikkUDaththAnE",
            10: "🙏 thinggaL thOy mADa nAnggUrth * thirumaNikkUDaththAnai * manggaiyar thalaivan vaNthArk * kaliyan vAyoligaL vallAr *** ponggu nIr ulagam ANDu * ponnulagANDu * pinnum vengkadhirp paridhi vaTTaththu * UDu pOy viLangguvArE",
            11: "aDivaravu: thUmbu * kavvai mAththozhil * thAnggarum karumagaL * keNDai kunRam * sanggai pAvam",
        },
        'PTM.4.6.steps': {
            1: "🙏 thAvaLandhu ulaga muRRum * thaDamalarp poygai pukku * nA vaLam navinRu anggEththa * nAgaththin naDukkam thIrththAy! *** mA vaLam perugi mannu * maRaiyavar vAzhum * nAnggaik kAvaLampADi mEya * kaNNanE! kaLaikaN nIyE",
            2: "maNNiDandhu Enam Agi * mAvali vali tholaippAn * viNNavar vENDach senRu * vELviyil kuRai irandhAy *** thuNNena mARRAr thammaith * tholaiththavar nAnggai mEya * kaNNanE! kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            3: "uruththezhu vAli mArbil * Oru kaNai uruva OTTi * karuththuDaith thambikku * inbak kadhir muDi arasu aLiththAy *** paruththezhu palavum mAvum * pazham vizhundhu ozhugum nAnggai * karuththanE! kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            4: "munai mugaththu arakkan mALa * muDigaL paththu aRuththu vIzhththu * Anggu anaiyavaRku iLaiyavaRkE * arasu aLiththu aruLinAnE! *** sunaigaLil kayalgaL pAyach * surumbu thEn nugarum nAnggai * kanai kazhal kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            5: "paDa aravu uchchi than mEl * pAyndhu pal naDanggaL seydhu * maDavaral manggai thannai * mArvagaththu iruththinAnE! *** thaDavarai thanggu mADath * thagu pugazh nAnggai mEya * kaDavuLE! kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            6: "mallarai aTTu mALak * kanjchanai malaindhu konRu * pallarasu avindhu vIzhap * pAradhap pOr muDiththAy! *** nallaraN kAvin nIzhal * naRai kamazh nAnggai mEya * kallaraN kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            7: "mUththavaRku arasu vENDi * munbu thUdhu ezhundharuLi * mAththamar pAgan vIzha * madha kari maruppu osiththAy! *** pUththamar sOlai Onggip * punal parandhu ozhugu nAnggai * kAththanE! kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            8: "EviLam kannikkAgi * imaiyavar kOnaich seRRu * kAvaLam kaDidhiRuththuk * kaRpagam koNDu pOndhAy! *** pUvaLam pozhilgaL sUzhndha * purandharan seydha nAnggai * kAvaLampADi mEya * kaNNanE! kaLaikaN nIyE",
            9: "sandhamAy samayam Agich * samaya aimpUdham Agi * andhamAy Adhi Agi * arumaRai avaiyum AnAy! *** mandhamAr pozhilgaL thORum * maDamayil Alu nAnggai * kandhamAr kAvaLanthaNpADiyAy! * kaLaikaN nIyE",
            10: "🙏 mAvaLam perugi mannu * maRaiyavar vAzhum * nAnggaik kAvaLampADi mEya * kaNNaNaik kaliyan sonna *** pAvaLam paththum vallAr * pAr misai arasarAgi * kOviLamannar thAzhak * kuDai nizhal polivar thAmE",
            11: "aDivaravu: thAvaLam * maN uruththu * munai paDam * mallrai mUththavaRku * EviLam sandham * mAvaLam",
        },
        'PTM.4.7.steps': {
            1: "🙏 kaNNAr kaDal pOl * thirumEni kariyAy! * naNNAr munai * venRi koLvAr mannu nAnggUr *** thiNNAr madhiL sUzh * thiruveLLakkuLaththuL aNNA! * aDiyEn iDaraik kaLaiyAyE",
            2: "kondhAr thuLava * malar koNDu aNivAnE! * nandhAdha perum pugazh * vEdhiyar nAnggUr *** senthAmarai nIrth * thiruveLLakkuLaththuL endhAy! * aDiyEn iDaraik kaLaiyAyE",
            3: "kunRAl kuLir mAri * thaDuththu ugandhAnE! * nanRAya perum pugazh * vEdhiyar nAnggUr *** senRAr vaNanggum * thiruveLLakkuLaththuL ninRAy! * neDiyAy! aDiyEn iDar nIkkE",
            4: "kAnAr kari kombadhu * osiththa kaLiRE! * nAnA vagai * nallavar manniya nAnggUr *** thEnAr pozhil sUzh * thiruveLLakkuLaththuL AnAy! * aDiyEnukku aruL puriyAyE",
            5: "🙏 vEDAr thiruvEngkaDam * mEya viLakkE! * nADAr pugazh * vEdhiyar manniya nAnggUr *** sEDAr pozhil sUzh * thiruveLLakkuLaththAy! * pADA varuvEn * vinai Ayina pARRE",
            6: "kallAl kaDalai * aNai kaTTi ugandhAy! * nallAr palar * vEdhiyar manniya nAnggUr *** selvA! * thiruveLLakkuLaththu uRaivAnE! * ellA iDarum * keDumARu aruLAyE",
            7: "kOlAl nirai mEyththa * engkOvalar kOvE! * nAlAgiya * vEdhiyar manniya nAnggUr *** sElAr vayal sUzh * thiruveLLakkuLaththuL mAlE! * ena valvinai thIrththu aruLAyE",
            8: "vArAgam adhAgi * immaNNai iDandhAy! * nArAyaNaNE! * nalla vEdhiyar nAnggUr *** sIrAr pozhil sUzh * thiruveLLakkuLaththuL * ArAvamudhE! * aDiyERku aruLAyE",
            9: "pUvAr thirumAmagaL * pulgiya mArbA! * nAvAr pugazh * vEdhiyar manniya nAnggUrth *** dhEvA! * thiruveLLakkuLaththu uRaivAnE! * AvA! aDiyAn * ivan enRu aruLAyE",
            10: "🙏 nal anbuDai * vEdhiyar manniya nAnggUr * selvan * thiruveLLakkuLaththu uRaivAnai *** kallin mali thOL * kaliyan sonna mAlai * vallar ena vallavar * vAnavar thAmE",
            11: "aDivaravu: kaNNAr * kondhu kunRAl * kAn vEDu * kallAl kOlAl * vArAgamadhu pUvAr * nallanbu kavaLayAnai",
        },
        'PTM.4.8.steps': {
            1: "🙏 kavaLa yAnaik kombu osiththa * kaNNan enRum kAmaru sIr * kuvaLai mEgam anna mEni * koNDa kOn en Anai enRum *** thavaLa mADa nIDu nAnggaith * thAmaraiyAL kELvan enRum * pavaLa vAyAL en maDandhai * pArththanpaLLi pADuvALE",
            2: "kanjchan viTTa venjchinaththa * kaLiRu aDarththa kALai enRum * vanjchamEvi vandha pEyin * uyirai uNDa mAyan enRum *** senjcholALar nIDu nAnggaith * dhEva dhEvan enRenRu Odhi * panjchi anna mellaDiyAL * pArththanpaLLi pADuvALE",
            3: "aNDar kOn en Anai enRum * Ayar mAdhar konggai pulgu seNDan enRum * nAnmaRaigaL * thEDi ODum selvan enRum *** vanDulavu pozhil koL nAnggai * mannu mAyan enRenRu Odhi * paNDu pOl anRu en maDandhai * pArththanpaLLi pADuvALE",
            4: "kollai AnAL parisazhindhAL * kOl vaLaiyAr tham mugappE * mallai munnIr thaTTilanggai * kaTTazhiththa mAyan enRum *** selvam malgu maRaiyOr nAnggai * dhEva dhEvan enRenRu Odhi * palvaLaiyAL en maDandhai * pArththanpaLLi pADuvALE",
            5: "arakkar Avi mALa anRu * AzhkaDal sUzh ilanggai seRRa * kurakkarasan enRum * kOlavilli enRum *** mAmadhiyai nerukku mADa nIDu nAnggai * ninmalan enRenRu Odhi * parakkazhindhAL en maDandhai * pArththanpaLLi pADuvALE",
            6: "njAlam muRRum unDu umizhndha * nAdhan enRum nAnilam sUzh * vElai anna kOla mEni *  vaNNan enRum mEl ezhundhu *** sEl ugaLum vayal koL nAnggaith * dhEva dhEvan enRenRu Odhi * pAlin nalla menmozhiyAL * pArththanpaLLi pADuvALE",
            7: "nADi endhan uLLam koNDa * nAdhan enRum * nAnmaRaigaL thEDi enRum kANa mATTAch * selvan enRum *** siRai koL vaNDu sEDulavu pozhil koL nAnggaith * dhEva dhEvan enRenRu Odhi * pADagam sEr mellaDiyAL * pArththanpaLLi pADuvALE",
            8: "ulagam Eththum oruvan enRum * oNsuDarODu umbar eydhA * nilavum Azhip paDaiyan enRum * nEsan enRum *** thenthisaikkuth thiladham anna maRaiyOr nAnggaith * dhEva dhEvan enRenRu Odhi * palarum Esa en maDandhai * pArththanpaLLi pADuvALE",
            9: "kaNNan enRum vAnavargaL * kAdhaliththu malargaL thUvum * eNNan enRum inban enRum * Ezhulagukku Adhi enRum *** thiNNa mADa nIDu nAnggaith * dhEva dhEvan enRenRu Odhi * paNNin anna menmozhiyAL * pArththanpaLLi pADuvALE",
            10: "🙏 pAruL nalla maRaiyOr nAnggaip * pArththanpaLLich sengkaN mAlai * vArkoL nalla mulai maDavAL pADalaith * thAy mozhindha mARRam *** kUrkoL nalla vEl kaliyan * kURu thamizh paththum vallAr * ErkoL nalla vaikunthaththuL * inbam nALum eydhuvArE",
            11: "aDivaravu: kavaLam * kanjchan aNDar * kollai arakkar * njAlam nADi * ulagam kaNNan * pAruL nummai",
        },
        'PTM.4.9.steps': {
            1: "🙏 nummaith thozhudhOm * nundham paNi seydhirukkum num aDiyOm * immaikku inbam peRROm * endhAy! indhaLUrIrE! *** emmaik kaDidhAk karumam aruLi * AvA! enRu iranggi * nammai orukAl kATTi naDandhAl * nAnggaL uyyOmE?",
            2: "🙏 sindhai thannuL nInggAdhu irundha thiruvE! * maruviniya maindhA! * andhaN Ali mAlE! * sOlai mazhakaLiRE! *** nandhA viLakkin suDarE! * naRaiyUr ninRa nambI! *  en endhAy! indhaLUrAy! * aDiyERku iRaiyum iranggAyE!",
            3: "pEsuginRadhu idhuvE * vaiyam IraDiyAl aLandha * mUsi vaNDu muralum * kaNNi muDiyIr! *** ummaik kANum Asai ennum * kaDalil vIzhndhu inggu ayarththOm *  ayalArum EsuginRadhu idhuvE kANum * indhaLUrIrE!",
            4: "Asai vazhuvAdhu Eththum * emakkinggu izhukku Ayththu * aDiyOrkkuth thEsam aRiya * umakkE ALAyth thiriginROmukku *** kAsin oLiyin thigazhum vaNNam * kATTIr emperumAn! * vAsi vallIr! indhaLUrIr! * vAzhndhE pOm nIrE",
            5: "thI emperumAn nIr emperumAn * thisaiyum iru nilanu mAy * emperumAn Agi ninRAl * aDiyOm kANOmAl *** thAy emperumAn * thandhai thandhai AvIr * aDiyOmuk kE emperumAn allIrO? nIr * indhaLUrIrE!",
            6: "sollAdhu ozhiyakillEn * aRindha sollil * num aDiyAr ellArODum okka * eNNi irundhIr aDiyEnai *** nallAr aRivIr thIyAr aRivIr * namakku ivvulagaththu * ellAm aRivIr IdhE aRiyIr * indhaLUrIrE!",
            7: "mATTIr AnIr paNi nIr koLLa * emmaip paNi aRiyA vITTIr *  idhanai vERE sonnOm * indhaLUrIrE! *** kATTIr AnIr * nuntham aDikkaL kATTil * umakku indha nATTE vandhu thoNDar Ana * nAnggaL uyyOmE?",
            8: "munnai vaNNam pAlin vaNNam * muzhudhum nilai ninRa * pinnai vaNNam konDal vaNNam * vaNNam eNNungkAl *** ponnin vaNNam maNiyin vaNNam * puraiyum thirumEni * inna vaNNam enRu kATTIr * indhaLUrIrE!",
            9: "endhai thandhai thammAn enRenRu * emar Ezh aLavum * vandhu ninRa thoNDarOrkkE * vAsi vallIrAl *** sindhai thannuL mundhi niRRir * siRidhum thirumEni * indha vaNNam enRu kATTIr * indhaLUrIrE",
            10: "🙏 ErAr pozhil sUzh * indhaLUril endhai perumAnai * kArAr puRavin manggai vEndhan * kaliyan oli seydha *** sIrAr insol mAlai * kaRRuth thirivAr ulagaththil * ArAr avarE * amararkku enRum amarar AvArE",
            11: "aDivaravu: nummai * sindhai pEsuginRadhu * Asai thI * sollAdhu mATTIr * munnai endhai * ErAr Aychchiyar",
        },
        'PTM.4.10.steps': {
            1: "🙏 Aychchiyar azhaippa veNNey uNDu orukAl * Alilai vaLarndha emperumAn * pEychchiyai mulai uNDu iNai marudhu iRuththup * perunilam aLandhavan kOyil *** kAyththa nIL kamugum kadhaliyum thenggum * enggum mAmpozhilgaLin naDuvE * vAyththa nIr pAyum maNNiyin thenpAl * thiruveLLiyangkuDi adhuvE",
            2: "Anirai mEyththu anRu alaikaDal aDaiththiTTu * arakkar tham siranggaLai uruTTi * kAr niRai mEgam kalandhadhOr uruvak * kaNNanAr karudhiya kOyil *** pU niraich serundhi punnai muththarumbip * podhumbiDai varivaNDu miNDi * thEn iraiththu uNDu anggu innisai muralum * thiruveLLiyangkuDi adhuvE",
            3: "kaDu viDam uDaiya kALiyan thaDaththaik * kalakki mun alakkazhiththu * avan than paDam iRap pAyndhu pal maNi sindhap * pal naDam payinRavan kOyil *** paDavaravu algul pAvai nallArgaL * payiRRiya nADagaththu oli pOy * aDai puDai thazhuvi aNDam ninRu adhirum * thiruveLLiyangkuDi adhuvE",
            4: "kaRavai mun kAththuk kanjchanaik kAyndha * kALamEgath thiru uruvan * paRavai mun uyarththup pARkaDal thuyinRa * paramanAr paLLi koL kOyil *** thuRai thuRai thORum ponmaNi sidhaRum * thoguthirai maNNiyin thenpAl * seRimaNi mADak koDi kadhir aNavum * thiruveLLiyangkuDi adhuvE",
            5: "pArinai uNDu pArinai umizhndhu * pAradham kai eRindhu * orukAl thErinai Urndhu thErinaith thurandha * sengkaNmAl senRu uRai kOyil *** Er nirai vayaluL vALaigaL maRugi * emakkiDam anRu idhu enRu eNNi * sIr mali poygai senRu aNaiginRa * thiruveLLiyangkuDi adhuvE",
            6: "uRak * kaDal arakkar tham sEnai * kURRiDaich sellak koDungkaNai thurandha * kOlavilli irAman than kOyil *** URRiDai ninRa vAzhaiyin kanigaL * Uzhththu vIzhndhana uNDu maNDi * sERRiDaik kayalgaL ugaL thigazh vayal sUzh * thiruveLLiyangkuDi adhuvE",
            7: "OLLiya karumam seyvan enRu uNarndha * mAvali vELviyil pukku * theLLiya kuRaLAy mUvaDi koNDu * thikkuRa vaLarndhavan kOyil *** aLLi ampozhilvAy irundhu vAzh kuyilgaL * ari ari enRavai azhaippa * veLLiyAr vaNangga viraindhu aruL seyvAn * thiruveLLiyangkuDi adhuvE",
            8: "muDi uDai amararkku iDar seyyum * asurar tham perumAnai * anRu ariyAy maDi iDai vaiththu mArvai mun kINDa * mAyanAr manniya kOyil *** paDi iDai mADaththu aDiyiDaith thUNil * padhiththa panmaNigaLin oLiyAl * viDi pagal iravenRu aRivaridhAya * thiruveLLiyangkuDi adhuvE",
            9: "kuDi kuDiyAgak kUDi ninRu amarar * guNanggaLE pidhaRRi ninRu Eththa * aDiyavarkku aruLi aravaNaith thuyinRa * AzhiyAn amarndhu uRai kOyil *** kaDi uDaik kamalam aDi iDai malarak * karumboDu perunjchennel alaiya * vaDivuDai annam peDaiyoDum sErum * vayal veLLiyangkuDi adhuvE",
            10: "🙏 paNDu mun EnamAgi anRu orukAl * pAr iDandhu eyiRRinil koNDu * theNthirai varuDap pARkaDal thuyinRa * thiruveLLiyangkuDiyAnai *** vaNDaRai sOlai manggaiyar thalaivan * mAnavEl kaliyan vAy oligaL * koNDivai pADum thavam uDaiyArgaL * ALvar ikkurai kaDal ulagE",
            11: "aDivaravu: Aychchi * Anirai kaDu * kaRavai pArinai * kARRu oLLiya * muDi kuDi * paNDu aRivadhu",
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
