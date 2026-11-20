/**
 * Adaptive Hardware-Memory Dual Architecture
 * Sync Engine Safe Patch Edition
 */
/**
 * Pitch-preserving time-stretch (WSOLA: waveform-similarity overlap-add).
 * rate > 1 = faster/shorter, rate < 1 = slower/longer. Pitch is unchanged.
 * channels: array of Float32Array (same length). Returns array of Float32Array.
 * Edges use flat half-windows so a phrase's first/last milliseconds are not faded.
 */
function wsolaTimeStretch(channels, sampleRate, rate) {
    const numCh = channels.length;
    const inLen = channels[0].length;
    const outLen = Math.max(1, Math.round(inLen / rate));
    const out = channels.map(() => new Float32Array(outLen));
    if (inLen < 64) {
        out.forEach((o, c) => o.set(channels[c].subarray(0, Math.min(inLen, outLen))));
        return out;
    }

    let N = 2 * Math.round(sampleRate * 0.015);      // ~30 ms analysis frame
    N = Math.max(64, N + (N % 2));
    const Hs = N / 2;                                // synthesis hop (50% overlap)
    const Ha = Hs * rate;                            // analysis hop
    const delta = Math.round(sampleRate * 0.012);    // +/- search tolerance
    const D = 4;                                     // decimation for coarse search

    const mono = new Float32Array(inLen);
    for (let c = 0; c < numCh; c++) {
        const ch = channels[c];
        for (let i = 0; i < inLen; i++) mono[i] += ch[i] / numCh;
    }
    const dLen = Math.floor(inLen / D);
    const dmono = new Float32Array(dLen);
    for (let i = 0; i < dLen; i++) {
        let s = 0;
        for (let j = 0; j < D; j++) s += mono[i * D + j];
        dmono[i] = s / D;
    }

    const rise = new Float32Array(Hs);
    const fall = new Float32Array(Hs);
    for (let i = 0; i < Hs; i++) {
        rise[i] = 0.5 - 0.5 * Math.cos(Math.PI * i / Hs);
        fall[i] = 1 - rise[i];
    }

    let lastK = 0;
    while (Math.round((lastK + 1) * Ha) < inLen) lastK++;

    function findBestPos(nominal, target) {
        if (target >= inLen) return nominal;
        const lo = Math.max(0, nominal - delta);
        const hi = Math.min(inLen - 1, nominal + delta);
        if (hi <= lo) return Math.min(lo, inLen - 1);

        // coarse search on the decimated signal
        const L = Math.floor(Hs / D);
        const t0 = Math.floor(target / D);
        let bestScore = -Infinity;
        let bestD = Math.floor(lo / D);
        const dHi = Math.floor(hi / D);
        for (let dp = Math.floor(lo / D); dp <= dHi; dp++) {
            let corr = 0, en = 0;
            for (let i = 0; i < L; i++) {
                const ti = t0 + i, pi = dp + i;
                if (ti >= dLen || pi >= dLen) break;
                const a = dmono[ti], b = dmono[pi];
                corr += a * b;
                en += b * b;
            }
            const score = corr / Math.sqrt(en + 1e-9);
            if (score > bestScore) { bestScore = score; bestD = dp; }
        }

        // fine search at full resolution around the coarse winner
        const center = bestD * D;
        let best = Math.min(Math.max(center, lo), hi);
        let bestFine = -Infinity;
        const pLo = Math.max(lo, center - D);
        const pHi = Math.min(hi, center + D);
        for (let p = pLo; p <= pHi; p++) {
            let corr = 0, en = 0;
            for (let i = 0; i < Hs; i++) {
                const ti = target + i, pi = p + i;
                if (ti >= inLen || pi >= inLen) break;
                const a = mono[ti], b = mono[pi];
                corr += a * b;
                en += b * b;
            }
            const score = corr / Math.sqrt(en + 1e-9);
            if (score > bestFine) { bestFine = score; best = p; }
        }
        return best;
    }

    let prevPos = 0;
    for (let k = 0; k <= lastK; k++) {
        const nominal = Math.round(k * Ha);
        const pos = (k === 0) ? 0 : findBestPos(nominal, prevPos + Hs);
        const outPos = k * Hs;
        for (let c = 0; c < numCh; c++) {
            const inp = channels[c];
            const o = out[c];
            for (let i = 0; i < N; i++) {
                const oi = outPos + i;
                if (oi >= outLen) break;
                const ii = pos + i;
                const x = (ii >= 0 && ii < inLen) ? inp[ii] : 0;
                let w;
                if (i < Hs) w = (k === 0) ? 1 : rise[i];
                else w = (k === lastK) ? 1 : fall[i - Hs];
                o[oi] += x * w;
            }
        }
        prevPos = pos;
    }
    return out;
}

const LearningEngine = {
    state: {
        audioContext: null,
        audioBuffer: null,
        streamDestination: null,
        activeSourceNode: null,
        secondaryPlayer: null,
        bufferSrc: "",
        nativeSrc: "",
        nativeArmed: false,
        segmentRate: 1,
        stretchCache: null,
        bounds: null,
        onSegmentEndCallback: null,
        isPlaying: false,
        startTimeInContext: 0,
        startOffsetInTrack: 0,
        pauseTimeout: null,
        isMonitoring: false,
        animationFrameId: null,
        playerElement: null,
        playbackRate: 1.0,
        pipelineMode: "native"
    },

    init: function (audioPlayerEl) {
        this.state.playerElement = audioPlayerEl;
        this.state.playerElement.preload = "auto";
        this.state.playerElement.setAttribute('playsinline', 'true');
        this.state.playerElement.setAttribute('webkit-playsinline', 'true');
        this._applyPitchPreservation();

        this._loopCheck = this._loopCheck.bind(this);
        console.log("Adaptive Hardware-Memory Engine Synchronized and Active.");
    },

    _applyPitchPreservation: function () {
        const p = this.state.playerElement;
        if (!p) return;
        p.preservesPitch = true;
        p.mozPreservesPitch = true;
        p.webkitPreservesPitch = true;
    },

    /**
     * AudioBufferSourceNode.playbackRate always shifts pitch, so for speeds other
     * than 1.0x the segment is rendered with a pitch-preserving time-stretch and
     * played at normal rate (see _getStretchedSegment). A speed change while a
     * segment is playing takes effect from the next segment. The <audio>-element
     * path (unmarked tracks / fallback) applies the new speed live.
     */
    setPlaybackRate: function (rate) {
        const parsedRate = parseFloat(rate);
        if (isNaN(parsedRate) || parsedRate <= 0) return;

        this.state.playbackRate = parsedRate;
        const player = this.state.playerElement;
        if (!player) return;

        if (this.state.pipelineMode === "native") {
            this._applyPitchPreservation();
            player.playbackRate = parsedRate;
            if (this.state.isPlaying && this.state.nativeArmed) this._armNativeBackupTimer();
        }
    },

    _armNativeBackupTimer: function () {
        const b = this.state.bounds;
        const player = this.state.playerElement;
        if (this.state.pauseTimeout) clearTimeout(this.state.pauseTimeout);
        this.state.pauseTimeout = null;
        if (!b || !(b.end < 9999) || !player) return;
        // Backup for background tabs, where requestAnimationFrame is throttled.
        const remaining = Math.max(0, (b.end - player.currentTime) / this.state.playbackRate);
        this.state.pauseTimeout = setTimeout(() => this._handleSegmentComplete(), remaining * 1000 + 250);
    },

    unlockAudio: function () {
        if (!this.state.audioContext) {
            this.state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (!this.state.streamDestination) {
            this.state.streamDestination = this.state.audioContext.createMediaStreamDestination();
            const secondaryPlayer = new Audio();
            secondaryPlayer.playsInline = true;
            secondaryPlayer.srcObject = this.state.streamDestination.stream;
            this.state.secondaryPlayer = secondaryPlayer;
        }
        if (this.state.audioContext.state === 'suspended') {
            this.state.audioContext.resume();
        }
        // iOS/Android only allow an element to start playing from a user tap. Start the
        // stream element here (startLearningAndFocus calls this synchronously in the tap)
        // so later play() calls, after fetch/decode, are allowed.
        if (this.state.secondaryPlayer && this.state.secondaryPlayer.paused) {
            this.state.secondaryPlayer.play().catch(() => { });
        }
    },

    _loadAudioBuffer: async function (url) {
        const response = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error(`Asset network fetch failure: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        return await this.state.audioContext.decodeAudioData(arrayBuffer);
    },

    playSegment: async function (src, bounds, onEndCallback, lineWindows = null, chosenStep = "step2", focusMode = "both") {
        this.stopMonitor();

        this.state.bounds = bounds;
        this.state.onSegmentEndCallback = onEndCallback;
        this.unlockAudio();

        const hasValidMarkers = (bounds && bounds.end && bounds.end < 9999);
        this.state.pipelineMode = hasValidMarkers ? "ram" : "native";

        const absoluteSrc = (src.startsWith('http://') || src.startsWith('https://')) ? src : new URL(src, window.location.href).href;

        // Strip query cache parameters (?h=...) for the RAM buffer comparison
        const cleanCacheKey = absoluteSrc.split('?')[0];
        const existingCacheKey = this.state.bufferSrc.split('?')[0];

        if (this.state.pipelineMode === "ram") {
            try {
                if (this.state.playerElement.getAttribute('src')) {
                    this.state.playerElement.removeAttribute('src');
                    this.state.playerElement.load();
                }
                this.state.nativeSrc = "";

                // If the root source asset is identical, reuse the uncompressed RAM buffer safely
                if (existingCacheKey !== cleanCacheKey) {
                    // document.getElementById('status').innerText = "Buffering Fresh Audio Track...";
                    this.state.audioBuffer = await this._loadAudioBuffer(absoluteSrc); // Fetch uses full asset string
                    this.state.bufferSrc = absoluteSrc;
                }

                this._executeRAMPlayback();
            } catch (err) {
                console.warn("RAM pipeline decode stalled. Falling back to native stream logic.", err);
                this.state.pipelineMode = "native";
                this._executeNativePlayback(absoluteSrc);
            }
        } else {
            this._executeNativePlayback(absoluteSrc);
        }
    },

    _getStretchedSegment: function (buffer, start, end, rate) {
        if (!this.state.stretchCache) this.state.stretchCache = new Map();
        const cache = this.state.stretchCache;
        const key = `${this.state.bufferSrc.split('?')[0]}|${start.toFixed(3)}|${end.toFixed(3)}|${rate}`;
        if (cache.has(key)) {
            const hit = cache.get(key);
            cache.delete(key);
            cache.set(key, hit); // refresh LRU order
            return hit;
        }

        const sr = buffer.sampleRate;
        const s0 = Math.max(0, Math.floor(start * sr));
        const s1 = Math.min(buffer.length, Math.ceil(end * sr));
        const chans = [];
        for (let c = 0; c < buffer.numberOfChannels; c++) {
            chans.push(buffer.getChannelData(c).subarray(s0, s1));
        }
        const stretched = wsolaTimeStretch(chans, sr, rate);
        const out = this.state.audioContext.createBuffer(stretched.length, stretched[0].length, sr);
        for (let c = 0; c < stretched.length; c++) out.copyToChannel(stretched[c], c);

        cache.set(key, out);
        if (cache.size > 24) cache.delete(cache.keys().next().value);
        return out;
    },

    _executeRAMPlayback: function () {
        const ctx = this.state.audioContext;
        const bounds = this.state.bounds;
        const fullBuffer = this.state.audioBuffer;

        const startOffset = (bounds && bounds.start < fullBuffer.duration) ? bounds.start : 0;
        const segEnd = Math.min(bounds.end, fullBuffer.duration);
        const segLen = segEnd - startOffset;
        const rate = this.state.playbackRate;
        const stretch = Math.abs(rate - 1) > 0.001;

        // Render first: if stretching throws, nothing was touched and playSegment
        // falls back to native playback.
        const playBuffer = stretch
            ? this._getStretchedSegment(fullBuffer, startOffset, segEnd, rate)
            : fullBuffer;

        if (this.state.activeSourceNode) {
            try { this.state.activeSourceNode.stop(); } catch (e) { }
            this.state.activeSourceNode.disconnect();
        }

        const source = ctx.createBufferSource();
        source.buffer = playBuffer;
        source.connect(this.state.streamDestination);
        this.state.activeSourceNode = source;

        const realDuration = stretch ? playBuffer.duration : segLen;

        this.state.isPlaying = true;
        this.state.segmentRate = stretch ? rate : 1; // track-seconds per real second, for the text sync
        this.state.startTimeInContext = ctx.currentTime;
        this.state.startOffsetInTrack = startOffset;

        if (this.state.secondaryPlayer) this.state.secondaryPlayer.play().catch(() => { });
        this.state.playerElement.play().catch(() => { });

        if (stretch) source.start(0);
        else source.start(0, startOffset, segLen);

        // Primary end signal: the node actually finishing. The timer is only a backup.
        source.onended = () => {
            if (this.state.activeSourceNode === source) this._handleSegmentComplete();
        };
        if (this.state.pauseTimeout) clearTimeout(this.state.pauseTimeout);
        this.state.pauseTimeout = setTimeout(() => {
            this._handleSegmentComplete();
        }, realDuration * 1000 + 300);

        this.startMonitor();
    },

    _executeNativePlayback: function (src) {
        const player = this.state.playerElement;
        const b = this.state.bounds;
        const segStart = (b && b.start > 0) ? b.start : 0;

        player.removeAttribute('crossOrigin');
        // The RAM loop shadows player.currentTime with an own property; remove it
        // so seeking and reading work normally again.
        try { delete player.currentTime; } catch (e) { }
        this._applyPitchPreservation();

        if (this.state.nativeSrc !== src || !player.getAttribute('src')) {
            this.state.nativeSrc = src;
            player.src = src;
            player.load();
        }
        player.playbackRate = this.state.playbackRate;

        this.state.isPlaying = true;
        this.state.nativeArmed = false;

        const begin = () => {
            // Ignore if this segment was stopped or replaced while metadata loaded
            if (!this.state.isPlaying || this.state.bounds !== b) return;
            player.currentTime = segStart;
            player.playbackRate = this.state.playbackRate;
            this._applyPitchPreservation();
            const p = player.play();
            if (p && p.catch) p.catch(() => { });
            this.state.nativeArmed = true;
            this._armNativeBackupTimer();
        };

        // Starting at 0 needs no seek, so don't wait for metadata (iOS may not
        // load until play() is called). Only a mid-track start waits for it.
        if (player.readyState >= 1 || segStart === 0) begin();
        else player.addEventListener('loadedmetadata', begin, { once: true });

        this.startMonitor();
    },

    startMonitor: function () {
        if (!this.state.isMonitoring) {
            this.state.isMonitoring = true;
            this.state.animationFrameId = requestAnimationFrame(this._loopCheck);
        }
    },

    stopMonitor: function () {
        this.state.isMonitoring = false;
        this.state.isPlaying = false;
        this.state.nativeArmed = false;
        if (this.state.animationFrameId) {
            cancelAnimationFrame(this.state.animationFrameId);
            this.state.animationFrameId = null;
        }
        if (this.state.pauseTimeout) {
            clearTimeout(this.state.pauseTimeout);
            this.state.pauseTimeout = null;
        }
        if (this.state.activeSourceNode) {
            try { this.state.activeSourceNode.stop(); } catch (e) { }
            this.state.activeSourceNode.disconnect();
            this.state.activeSourceNode = null;
        }
        if (this.state.playerElement) this.state.playerElement.pause();
        if (this.state.secondaryPlayer) this.state.secondaryPlayer.pause();
    },

    _loopCheck: function () {
        if (!this.state.isMonitoring) return;
        const player = this.state.playerElement;
        const ctx = this.state.audioContext;

        if (!player) return;

        if (this.state.pipelineMode === "ram") {
            if (this.state.isPlaying && ctx && this.state.audioBuffer) {
                const elapsedRealTime = ctx.currentTime - this.state.startTimeInContext;
                const elapsedTrackTime = elapsedRealTime * this.state.segmentRate;

                Object.defineProperty(player, 'currentTime', {
                    value: this.state.startOffsetInTrack + elapsedTrackTime,
                    writable: true,
                    configurable: true
                });
            }
        } else {
            const b = this.state.bounds;
            const reachedEnd = this.state.nativeArmed && b && b.end < 9999 && player.currentTime >= b.end;
            if (player.ended || reachedEnd) {
                this._handleSegmentComplete();
                return;
            }
        }

        if (window.syncTextToAudioTimeline) {
            window.syncTextToAudioTimeline();
        }

        if (this.state.isMonitoring) {
            this.state.animationFrameId = requestAnimationFrame(this._loopCheck);
        }
    },

    _handleSegmentComplete: function () {
        this.stopMonitor();
        if (typeof this.state.onSegmentEndCallback === 'function') {
            this.state.onSegmentEndCallback();
        }
    }
};

window.LearningEngine = LearningEngine;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { wsolaTimeStretch, LearningEngine };
}
