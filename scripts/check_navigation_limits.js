/**
 * Node check: CONFIG vs Navigation limits, auto-next rolls, picker clamp parity,
 * and on-disk marker lengths. Invoked by scripts/smoke_test.py.
 *
 * Usage:
 *   node scripts/check_navigation_limits.js \
 *     '[["NAT",3,11],...]' \
 *     '[["NAT","3.10","3.11"],...]'
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const limitCases = JSON.parse(process.argv[2] || '[]');
const rollCases = JSON.parse(process.argv[3] || '[]');

const ctx = { console, window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'navigation.js'), 'utf8'), ctx);

const Nav = ctx.Navigation;
const CONFIG = ctx.CONFIG;
if (!Nav || !CONFIG) {
    console.error('Navigation or CONFIG missing after load');
    process.exit(1);
}

function advanceChapterPasuram(pre, value) {
    const c = CONFIG[pre];
    const coords = Nav.parseCoords(value, c.hasSub);
    coords.pas += 1;
    const minChapterIndex = (typeof c.minCh !== 'undefined') ? c.minCh : 1;
    const chLimit = Nav.getLimit(pre, coords.ch, 0);
    if (coords.pas > chLimit) {
        coords.ch = (coords.ch >= c.maxCh) ? minChapterIndex : coords.ch + 1;
        coords.pas = 1;
    } else if (coords.pas < 1) {
        coords.ch = (coords.ch <= minChapterIndex) ? c.maxCh : coords.ch - 1;
        coords.pas = Nav.getLimit(pre, coords.ch, 0);
    }
    return `${coords.ch}.${coords.pas}`;
}

/** Mirror rebuildPasuramPickers clamp on chapter_pasuram "Ch.Pas". */
function clampChapterPasuram(value, maxPas) {
    const parts = String(value).split('.');
    const ch = parseInt(parts[0], 10);
    let pas = parseInt(parts[1], 10);
    if (isNaN(pas) || pas < 1) pas = 1;
    pas = Math.min(Math.max(pas, 1), Math.max(1, maxPas));
    return `${ch}.${pas}`;
}

/**
 * Full auto-next step as playerEngine.navigate(+1) intends after markers load:
 * advance with getLimit, then clamp with sectionPasuramCount (pickers).
 * Regression this guards: clamp with configPasuramCount while getLimit used markers.
 */
function navigateThenPickerSync(pre, value) {
    const advanced = advanceChapterPasuram(pre, value);
    const c = CONFIG[pre];
    const coords = Nav.parseCoords(advanced, c.hasSub);
    const maxPas = Nav.sectionPasuramCount(pre, String(coords.ch));
    return clampChapterPasuram(advanced, maxPas);
}

function chainNext(pre, start, steps) {
    let cur = start;
    const seen = [cur];
    for (let i = 0; i < steps; i++) {
        cur = navigateThenPickerSync(pre, cur);
        seen.push(cur);
    }
    return seen;
}

const failures = [];

function fail(msg) {
    failures.push(msg);
}

// ---------------------------------------------------------------------------
// Without markers: CONFIG drives limits / rolls / picker lists
// ---------------------------------------------------------------------------
ctx.MARKER_DATABASE = {};

for (const [book, ch, expected] of limitCases) {
    const got = Nav.getLimit(book, ch, 0);
    const viaCount = Nav.sectionPasuramCount(book, String(ch));
    const viaConfig = Nav.configPasuramCount(book, String(ch));
    if (got !== expected) fail(`${book}.${ch} getLimit=${got} expected=${expected}`);
    if (got !== viaCount) fail(`${book}.${ch} getLimit (${got}) != sectionPasuramCount (${viaCount})`);
    if (viaConfig !== expected) fail(`${book}.${ch} configPasuramCount=${viaConfig} expected=${expected}`);
}

for (const [book, fromVal, expected] of rollCases) {
    const got = navigateThenPickerSync(book, fromVal);
    if (got !== expected) fail(`${book} ${fromVal} -> ${got} expected ${expected}`);
}

const natOpts = Nav.listPasuramOptions('NAT').map((o) => o.value);
if (!natOpts.includes('3.11')) fail('listPasuramOptions(NAT) missing 3.11 (adivaravu)');
if (!natOpts.includes('4.12')) fail('listPasuramOptions(NAT) missing 4.12');
if (natOpts.includes('3.12')) fail('listPasuramOptions(NAT) unexpectedly has 3.12');
if (!natOpts.includes('0.1') || !natOpts.includes('0.2')) {
    fail('listPasuramOptions(NAT) missing taniyans 0.1/0.2');
}

// Backward from 4.1 → last of previous chapter (CONFIG: NAT.3 = 11)
{
    const c = CONFIG.NAT;
    let coords = Nav.parseCoords('4.1', c.hasSub);
    coords.pas -= 1;
    const minChapterIndex = (typeof c.minCh !== 'undefined') ? c.minCh : 1;
    if (coords.pas < 1) {
        coords.ch = (coords.ch <= minChapterIndex) ? c.maxCh : coords.ch - 1;
        coords.pas = Nav.getLimit('NAT', coords.ch, 0);
    }
    const back = `${coords.ch}.${coords.pas}`;
    if (back !== '3.11') fail(`NAT prev from 4.1 -> ${back} expected 3.11`);
}

// ---------------------------------------------------------------------------
// Classic 3.10 loop regression: markers longer than stale CONFIG-style clamp
// ---------------------------------------------------------------------------
ctx.MARKER_DATABASE = {};
ctx.MARKER_DATABASE['NAT.3.steps'] = Array.from({ length: 11 }, (_, i) => ({ p: i + 1 }));

if (Nav.getLimit('NAT', 3, 0) !== 11) {
    fail(`marker NAT.3 getLimit=${Nav.getLimit('NAT', 3, 0)} expected 11`);
}

const advanced = advanceChapterPasuram('NAT', '3.10');
if (advanced !== '3.11') fail(`NAT 3.10 advance -> ${advanced} expected 3.11`);

const sharedClamp = clampChapterPasuram(advanced, Nav.sectionPasuramCount('NAT', '3'));
if (sharedClamp !== '3.11') {
    fail(`shared clamp undid auto-next: ${advanced} -> ${sharedClamp} (THE 3.10 LOOP)`);
}

// Intentionally wrong clamp source (CONFIG-only while pretending defPas was 10)
const buggyClamp = clampChapterPasuram(advanced, 10);
if (buggyClamp !== '3.10') {
    fail('test harness: expected config-only clamp of 3.11 with max=10 to yield 3.10');
} else {
    // Prove the bug shape, then require production path uses shared count (not 10).
    const production = navigateThenPickerSync('NAT', '3.10');
    if (production === '3.10') {
        fail('navigateThenPickerSync looped on 3.10 — pickers must use sectionPasuramCount');
    }
    if (production !== '3.11') {
        fail(`navigateThenPickerSync NAT 3.10 -> ${production} expected 3.11`);
    }
}

// Markers longer than CONFIG: both getLimit and picker clamp must follow markers
ctx.MARKER_DATABASE['NAT.3.steps'] = Array.from({ length: 14 }, (_, i) => ({ p: i + 1 }));
if (Nav.configPasuramCount('NAT', '3') !== 11) {
    fail(`CONFIG NAT.3 should remain 11, got ${Nav.configPasuramCount('NAT', '3')}`);
}
if (Nav.sectionPasuramCount('NAT', '3') !== 14) {
    fail('sectionPasuramCount must prefer loaded marker length 14 over CONFIG 11');
}
if (navigateThenPickerSync('NAT', '3.13') !== '3.14') {
    fail('markers=14: 3.13 must advance to 3.14 without CONFIG clamp');
}
if (navigateThenPickerSync('NAT', '3.14') !== '4.1') {
    fail('markers=14: 3.14 must roll to 4.1');
}

// Shorter-than-CONFIG markers win once loaded
ctx.MARKER_DATABASE['PMT.1.steps'] = Array.from({ length: 10 }, (_, i) => ({ p: i + 1 }));
if (Nav.getLimit('PMT', 1, 0) !== 10) {
    fail(`with markers PMT.1 getLimit=${Nav.getLimit('PMT', 1, 0)} expected 10`);
}
if (navigateThenPickerSync('PMT', '1.10') !== '2.1') {
    fail('with markers PMT 1.10 should roll to 2.1');
}

// No stuck-on-same-verse for a decad→adivaravu→next-chapter chain
ctx.MARKER_DATABASE = {
    'NAT.3.steps': Array.from({ length: 11 }, (_, i) => ({ p: i + 1 })),
    'NAT.4.steps': Array.from({ length: 12 }, (_, i) => ({ p: i + 1 }))
};
const chain = chainNext('NAT', '3.9', 3);
// 3.9 -> 3.10 -> 3.11 -> 4.1
if (chain.join('>') !== '3.9>3.10>3.11>4.1') {
    fail(`NAT chain from 3.9: ${chain.join('>')} expected 3.9>3.10>3.11>4.1`);
}
const unique = new Set(chain);
if (unique.size !== chain.length) {
    fail(`NAT chain repeated a verse (loop): ${chain.join('>')}`);
}

// ---------------------------------------------------------------------------
// On-disk marker files: getLimit must match real array lengths once loaded
// ---------------------------------------------------------------------------
ctx.MARKER_DATABASE = {};
for (const book of ['NAT', 'PMT']) {
    const markerFile = path.join(
        root, 'aruLicheyal', book, 'markers', `marker_${book.toLowerCase()}_timelines.js`
    );
    if (!fs.existsSync(markerFile)) {
        fail(`missing marker file ${markerFile}`);
        continue;
    }
    vm.runInContext(fs.readFileSync(markerFile, 'utf8'), ctx);
    const c = CONFIG[book];
    const minCh = typeof c.minCh !== 'undefined' ? c.minCh : 0;
    const maxCh = typeof c.maxCh !== 'undefined' ? c.maxCh : 1;
    for (let ch = minCh; ch <= maxCh; ch++) {
        const key = `${book}.${ch}.steps`;
        const arr = ctx.MARKER_DATABASE[key];
        if (!Array.isArray(arr) || !arr.length) {
            // Some chapters may be absent; then CONFIG applies.
            const cfg = Nav.configPasuramCount(book, String(ch));
            if (Nav.getLimit(book, ch, 0) !== cfg) {
                fail(`${book}.${ch}: no markers but getLimit!=config (${Nav.getLimit(book, ch, 0)} vs ${cfg})`);
            }
            continue;
        }
        const limit = Nav.getLimit(book, ch, 0);
        if (limit !== arr.length) {
            fail(`${book}.${ch}: on-disk markers length ${arr.length} but getLimit=${limit}`);
        }
        // Last verse must advance to next chapter (or wrap), not stay
        const last = `${ch}.${arr.length}`;
        const next = navigateThenPickerSync(book, last);
        const [nextCh] = next.split('.').map(Number);
        if (nextCh === ch) {
            fail(`${book} after last verse ${last} stayed in chapter: ${next}`);
        }
        // Penultimate → last must stay in chapter (adivaravu reachable)
        if (arr.length >= 2) {
            const penult = `${ch}.${arr.length - 1}`;
            const toLast = navigateThenPickerSync(book, penult);
            if (toLast !== last) {
                fail(`${book} ${penult} -> ${toLast} expected ${last} (adivaravu/last)`);
            }
        }
    }
}

// Sub-chapter book: TVM uses defPas 11; getLimit without markers follows CONFIG
ctx.MARKER_DATABASE = {};
if (Nav.getLimit('TVM', 1, 1) !== 11) {
    fail(`TVM 1.1 getLimit=${Nav.getLimit('TVM', 1, 1)} expected 11`);
}
if (Nav.sectionPasuramCount('TVM', '2.7') !== 13) {
    fail(`TVM 2.7 ex getLimit/count expected 13, got ${Nav.sectionPasuramCount('TVM', '2.7')}`);
}

if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
}
console.log('ok');
