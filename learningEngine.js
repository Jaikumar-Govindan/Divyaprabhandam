/**
 * Adaptive Hardware-Memory Dual Architecture
 * Sync Engine Safe Patch Edition
 */
const LearningEngine = {
    state: {
        audioContext: null,
        audioBuffer: null,
        streamDestination: null,
        activeSourceNode: null,
        secondaryPlayer: null,
        currentSrc: "",
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

    init: function(audioPlayerEl) {
        this.state.playerElement = audioPlayerEl;
        this.state.playerElement.preload = "auto";
        this.state.playerElement.setAttribute('playsinline', 'true');
        this.state.playerElement.setAttribute('webkit-playsinline', 'true');
        
        this._loopCheck = this._loopCheck.bind(this);
        console.log("Adaptive Hardware-Memory Engine Synchronized and Active.");
    },

    setPlaybackRate: function(rate) {
        const parsedRate = parseFloat(rate);
        if (isNaN(parsedRate)) return;
        
        this.state.playbackRate = parsedRate;
        if (this.state.playerElement) {
            this.state.playerElement.playbackRate = parsedRate;
        }

        if (this.state.pipelineMode === "ram" && this.state.isPlaying && this.state.activeSourceNode) {
            this.state.activeSourceNode.playbackRate.setValueAtTime(parsedRate, this.state.audioContext.currentTime);
            
            const ctx = this.state.audioContext;
            const elapsedRealTime = ctx.currentTime - this.state.startTimeInContext;
            const elapsedTrackTime = elapsedRealTime * this.state.activeSourceNode.playbackRate.value;
            const totalTrackDuration = (this.state.bounds && this.state.bounds.end < 9999) ? 
                (this.state.bounds.end - this.state.bounds.start) : (this.state.audioBuffer.duration - this.state.bounds.start);
            
            const remainingTrackTime = totalTrackDuration - elapsedTrackTime;
            const remainingRealTime = remainingTrackTime / parsedRate;

            if (this.state.pauseTimeout) clearTimeout(this.state.pauseTimeout);
            this.state.pauseTimeout = setTimeout(() => {
                this._handleSegmentComplete();
            }, Math.max(0, remainingRealTime * 1000));
        }
    },

    unlockAudio: function() {
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
    },

    _loadAudioBuffer: async function(url) {
        const response = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error(`Asset network fetch failure: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        return await this.state.audioContext.decodeAudioData(arrayBuffer);
    },

    playSegment: async function(src, bounds, onEndCallback, lineWindows = null, chosenStep = "step2", focusMode = "both") {
        this.stopMonitor();

        this.state.bounds = bounds;
        this.state.onSegmentEndCallback = onEndCallback;
        this.unlockAudio();

        const hasValidMarkers = (bounds && bounds.end && bounds.end < 9999);
        this.state.pipelineMode = hasValidMarkers ? "ram" : "native";

        const absoluteSrc = (src.startsWith('http://') || src.startsWith('https://')) ? src : new URL(src, window.location.href).href;

        // ⚡ FIX: Strip the query cache parameters (?h=...) for internal RAM state comparison checks
        const cleanCacheKey = absoluteSrc.split('?')[0];
        const existingCacheKey = this.state.currentSrc.split('?')[0];

        if (this.state.pipelineMode === "ram") {
            try {
                if (this.state.playerElement.src) {
                    this.state.playerElement.removeAttribute('src');
                    this.state.playerElement.load();
                }

                // If the root source asset is identical, reuse the uncompressed RAM buffer safely
                if (existingCacheKey !== cleanCacheKey) {
                    document.getElementById('status').innerText = "Buffering Fresh Audio Track...";
                    this.state.currentSrc = absoluteSrc;
                    this.state.audioBuffer = await this._loadAudioBuffer(absoluteSrc); // Fetch uses full asset string
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

    _executeRAMPlayback: function() {
        const ctx = this.state.audioContext;
        const bounds = this.state.bounds;

        if (this.state.activeSourceNode) {
            try { this.state.activeSourceNode.stop(); } catch(e){}
            this.state.activeSourceNode.disconnect();
        }

        const source = ctx.createBufferSource();
        source.buffer = this.state.audioBuffer;
        source.connect(this.state.streamDestination);
        source.playbackRate.setValueAtTime(this.state.playbackRate, ctx.currentTime);
        this.state.activeSourceNode = source;

        const startOffset = (bounds && bounds.start < this.state.audioBuffer.duration) ? bounds.start : 0;
        const duration = bounds.end - startOffset;

        this.state.isPlaying = true;
        this.state.startTimeInContext = ctx.currentTime;
        this.state.startOffsetInTrack = startOffset;

        document.getElementById('status').innerText = "Playing Phrase Loop...";
        
        if (this.state.secondaryPlayer) this.state.secondaryPlayer.play().catch(() => {});
        this.state.playerElement.play().catch(() => {}); 

        source.start(0, startOffset, duration);

        const realTimeDuration = duration / this.state.playbackRate;
        if (this.state.pauseTimeout) clearTimeout(this.state.pauseTimeout);
        this.state.pauseTimeout = setTimeout(() => {
            this._handleSegmentComplete();
        }, realTimeDuration * 1000);

        this.startMonitor();
    },

    _executeNativePlayback: function(src) {
        document.getElementById('status').innerText = "Streaming Full Track...";
        const player = this.state.playerElement;
        player.removeAttribute('crossOrigin');
        
        if (this.state.currentSrc !== src) {
            this.state.currentSrc = src;
            player.src = src;
            player.load();
        }

        player.currentTime = (this.state.bounds && this.state.bounds.start > 0) ? this.state.bounds.start : 0;
        player.playbackRate = this.state.playbackRate;

        this.startMonitor();

        const playPromise = player.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                document.getElementById('status').innerText = "Tap screen to wake audio";
            });
        }
    },

    startMonitor: function() {
        if (!this.state.isMonitoring) {
            this.state.isMonitoring = true;
            this.state.animationFrameId = requestAnimationFrame(this._loopCheck);
        }
    },

    stopMonitor: function() {
        this.state.isMonitoring = false;
        this.state.isPlaying = false;
        if (this.state.animationFrameId) {
            cancelAnimationFrame(this.state.animationFrameId);
            this.state.animationFrameId = null;
        }
        if (this.state.pauseTimeout) {
            clearTimeout(this.state.pauseTimeout);
            this.state.pauseTimeout = null;
        }
        if (this.state.activeSourceNode) {
            try { this.state.activeSourceNode.stop(); } catch(e){}
            this.state.activeSourceNode.disconnect();
            this.state.activeSourceNode = null;
        }
        if (this.state.playerElement) this.state.playerElement.pause();
        if (this.state.secondaryPlayer) this.state.secondaryPlayer.pause();
    },

    _loopCheck: function() {
        if (!this.state.isMonitoring) return;
        const player = this.state.playerElement;
        const ctx = this.state.audioContext;

        if (!player) return;

        if (this.state.pipelineMode === "ram") {
            if (this.state.isPlaying && ctx && this.state.audioBuffer) {
                const elapsedRealTime = ctx.currentTime - this.state.startTimeInContext;
                const elapsedTrackTime = elapsedRealTime * this.state.playbackRate;
                
                Object.defineProperty(player, 'currentTime', {
                    value: this.state.startOffsetInTrack + elapsedTrackTime,
                    writable: true,
                    configurable: true
                });
            }
        } else {
            if (player.ended) {
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

    _handleSegmentComplete: function() {
        this.stopMonitor();
        if (typeof this.state.onSegmentEndCallback === 'function') {
            this.state.onSegmentEndCallback();
        }
    }
};

window.LearningEngine = LearningEngine;