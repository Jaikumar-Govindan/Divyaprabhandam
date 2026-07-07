const fs = require('fs');
const { execSync } = require('child_process');

// 1. Setup paths
const AUDIO_DIR = 'audiofiles';
const CLEAN_DIR = `${AUDIO_DIR}/clean`;
const MARKER_FILE = 'marker.js';

// 2. Extract MARKER_DATABASE from the file string
const markerContent = fs.readFileSync(MARKER_FILE, 'utf8');
const dbMatch = markerContent.match(/window\.MARKER_DATABASE = ({[\s\S]*?});/);

if (!dbMatch) {
    console.error("❌ Could not find MARKER_DATABASE in marker.js");
    process.exit(1);
}

// Convert the string match into a real JavaScript object
const MARKER_DATABASE = eval(`(${dbMatch[1]})`);

// 3. Ensure clean directory exists
if (!fs.existsSync(CLEAN_DIR)) fs.mkdirSync(CLEAN_DIR, { recursive: true });

const markerStats = fs.statSync(MARKER_FILE);

// 4. Loop through the database keys
Object.keys(MARKER_DATABASE).forEach(key => {
    if (!key.includes('.all')) return;

    const markers = MARKER_DATABASE[key];
    // Check for your specific filename: NAT.2.m4a
    const inputFile = `${AUDIO_DIR}/${key}.m4a`;
    const outputFile = `${CLEAN_DIR}/${key}_clean.m4a`;

    if (!fs.existsSync(inputFile)) {
        console.log(`⚠️ Skipping ${key}: File not found at ${inputFile}`);
        return;
    }

    // Smart Check: Only process if audio/markers are newer than clean version
    let shouldProcess = false;
    if (!fs.existsSync(outputFile)) {
        shouldProcess = true;
    } else {
        const inputStats = fs.statSync(inputFile);
        const outputStats = fs.statSync(outputFile);
        if (inputStats.mtime > outputStats.mtime || markerStats.mtime > outputStats.mtime) {
            shouldProcess = true;
        }
    }

    if (!shouldProcess) {
        console.log(`✅ ${key} is up to date.`);
        return;
    }

    console.log(`🚀 Cleaning ${key}...`);

    let filter = "";
    let inputs = "";

    markers.forEach((m, i) => {
        const isObj = (typeof m === 'object' && m !== null);
        // Logical check for start/end points
        const start = isObj ? m.start : (i === 0 ? 0 : (typeof markers[i - 1] === 'object' ? markers[i - 1].end : markers[i - 1]));
        const end = isObj ? m.end : m;

        filter += `[0:a]atrim=start=${start}:end=${end},asetpts=PTS-STARTPTS[a${i}]; `;
        inputs += `[a${i}]`;
    });

    // Run FFmpeg
    //    const cmd = `ffmpeg -i "${inputFile}" -filter_complex "${filter}${inputs}concat=n=${markers.length}:v=0:a=1[outa]" -map "[outa]" -y "${outputFile}"`;
    // Add these filter settings for high-quality learning audio
    const noiseFilter = "afftdn=nr=12:nf=-25"; // Noise reduction
    const compressionFilter = "compand=attacks=0:points=-80/-80|-40/-15|-20/-10|0/-7"; // Volume leveling

    // Update the FFmpeg command to include the new filters
    const cmd = `ffmpeg -i "${inputFile}" -filter_complex "${filter}${inputs}concat=n=${markers.length}:v=0:a=1[raw]; [raw]${noiseFilter},${compressionFilter}[outa]" -map "[outa]" -y "${outputFile}"`;

    try {
        execSync(cmd);
        console.log(`✨ Successfully created ${outputFile}`);
    } catch (e) {
        console.error(`❌ Error processing ${key}:`, e.message);
    }
});
