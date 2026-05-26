/**
 * config.js - Static book structures and asset path configurations
 */

window.PASURAM_STRUCTURE = {
    'TVM': { hasSub: true,  maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13} },
    'PT':  { hasSub: true,  maxCh: 11, maxSub: 10, defPas: 10, ex: {} },
    'PMT': { hasSub: false, maxCh: 10, defPas: 10, ex: {} },
    'NAT': { hasSub: false, maxCh: 14, defPas: 10, ex: {} },
    'RN':  { hasSub: false, maxCh: 1,  defPas: 108, ex: {} }
};

window.CONFIG = {
    'TVM': { 
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13},
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/TVM.${num}.mp3`,
        isSingleFile: true
    },
    'PT':  { 
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 11, maxSub: 10, defPas: 10, ex: {} ,
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/PT.${num}.mp3`,
        isSingleFile: true
    },
    'PMT': { 
        structure: 'chapter_pasuram',
        hasSub: false, maxCh: 10, defPas: 10, ex: {},
        getAudioSrc: (numInput) => {
            let chNum = parseInt(numInput.split('.')[0], 10);
            // Chapters 1 to 6 use local OGG files
            if (chNum <= 6) {
                return `audiofiles/PMT/pmt_${chNum}.ogg`;
            }
            // Chapters 7 to 10 fallback to remote server
            return `https://www.uveda.org/media/recitation/PMT.${numInput}.mp3`;
        },
        isSingleFile: true
    },
    'NAT': { 
        structure: 'chapter_pasuram',
        hasSub: false, maxCh: 14, defPas: 10, ex: {},
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/NAT.${num}.mp3`,
        isSingleFile: true
    },
    'RN':  { 
        structure: 'flat_pasuram',
        hasSub: false, maxCh: 1, defPas: 108, ex: {},
        getAudioSrc: (numInput) => {
            let pasNum = parseInt(numInput, 10);
            let startGroup = Math.floor((pasNum - 1) / 10) * 10 + 1;
            let endGroup = startGroup + 9;
            if (endGroup > 108) endGroup = 108;
            return `audiofiles/RN/rn_${startGroup}_${endGroup}.ogg`;
        },
        isSingleFile: true
    }
};