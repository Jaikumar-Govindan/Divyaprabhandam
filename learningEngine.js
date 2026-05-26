/**
 * Adaptive Hardware-Memory Dual Architecture
 * Rule-Based Pipeline Router:
 * 1. Mapped Local Tracks -> Decoded directly into hardware RAM arrays for stutter-free precision loops.
 * 2. Unmapped Remote Tracks -> Streamed via native HTML5 containers for total CORS immunity.
 * Routes active states cleanly through a single-ended output channel to bypass the physical silent switch without distortion.
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
        pipelineMode: "native" // "ram" for precision loops, "native" for full streams
    },

    /**
     * Binds the engine to the template audio element container
     */
    init: function(audioPlayerEl) {
        this.state.playerElement = audioPlayerEl;
        this.state.playerElement.preload = "auto";
        this.state.playerElement.setAttribute('playsinline', 'true');
        this.state.playerElement.setAttribute('webkit-playsinline', 'true');
        
        this._loopCheck = this._loopCheck.bind(this);
        console.log("Adaptive Hardware-Memory Engine Active.");
    },

    /**
     * Updates playback speed rates dynamically across both operating contexts
     */
    setPlaybackRate: function(rate) {
        const parsedRate = parseFloat(rate);
        if (isNaN(parsedRate)) return;
        
        this.state.playbackRate = parsedRate;
        
        if (this.state.playerElement) {
            this.state.playerElement.playbackRate = parsedRate;
        }

        // Dynamically alter volatile hardware node clock timers if RAM execution loop is active
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

    /**
     * Wakes up the global AudioContext and links the background silent-switch bypass channel
     */
    unlockAudio: function() {
        if (!this.state.audioContext) {
            this.state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        if (!this.state.streamDestination) {
            this.state.streamDestination = this.state.audioContext.createMediaStreamDestination();
            
            // SILENT SWITCH OVERRIDE: Link the stream destination down to a hardware companion priority player
            const secondaryPlayer = new Audio();
            secondaryPlayer.playsInline = true;
            secondaryPlayer.srcObject = this.state.streamDestination.stream;
            this.state.secondaryPlayer = secondaryPlayer;
        }

        if (this.state.audioContext.state === 'suspended') {
            this.state.audioContext.resume();
        }
    },

    /**
     * Downloads and decodes audio track binaries directly into uncompressed volatile RAM buffers
     */
    _loadAudioBuffer: async function(url) {
        const response = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error(`Asset network fetch failure: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        return await this.state.audioContext.decodeAudioData(arrayBuffer);
    },

    /**
     * Main traffic coordinator evaluating marker existence to select the correct processing pipeline
     */
    playSegment: async function(src, bounds, onEndCallback, lineWindows = null, chosenStep = "step2", focusMode = "both") {
        this.stopMonitor();

        this.state.bounds = bounds;
        this.state.onSegmentEndCallback = onEndCallback;
        
        this.unlockAudio();

        // THE CORE RULE: If it has explicit finite phrase markers (< 9999), route to RAM for stutter-free looping
        const hasValidMarkers = (bounds && bounds.end && bounds.end < 9999);
        this.state.pipelineMode = hasValidMarkers ? "ram" : "native";

        const absoluteSrc = (src.startsWith('http://') || src.startsWith('https://')) ? src : new URL(src, window.location.href).href;

        if (this.state.pipelineMode === "ram") {
            try {
                document.getElementById('status').innerText = "Buffering Stutter-Free Loop...";
                
                // Completely detach source references from the native element to isolate the audio graph lanes cleanly
                if (this.state.playerElement.src) {
                    this.state.playerElement.removeAttribute('src');
                    this.state.playerElement.load();
                }

                if (this.state.currentSrc !== absoluteSrc) {
                    this.state.currentSrc = absoluteSrc;
                    this.state.audioBuffer = await this._loadAudioBuffer(absoluteSrc);
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

    /**
     * PIPELINE A: High-Resolution RAM Buffer Wave Looper (Zero Boundary Lag)
     */
    _executeRAMPlayback: function() {
        const ctx = this.state.audioContext;
        const bounds = this.state.bounds;

        if (this.state.activeSourceNode) {
            try { this.state.activeSourceNode.stop(); } catch(e){}
            this.state.activeSourceNode.disconnect();
        }

        // Spin up a fresh audio hardware source node out of the memory cache array bank
        const source = ctx.createBufferSource();
        source.buffer = this.state.audioBuffer;
        
        // Connect the source exclusively to the stream destination pipeline to avoid audio doubling distortion
        source.connect(this.state.streamDestination);
        
        source.playbackRate.setValueAtTime(this.state.playbackRate, ctx.currentTime);
        this.state.activeSourceNode = source;

        const startOffset = (bounds && bounds.start < this.state.audioBuffer.duration) ? bounds.start : 0;
        const duration = bounds.end - startOffset;

        this.state.isPlaying = true;
        this.state.startTimeInContext = ctx.currentTime;
        this.state.startOffsetInTrack = startOffset;

        document.getElementById('status').innerText = "Playing Precision Segment...";
        
        // Wake up browser audio element priority contexts together
        if (this.state.secondaryPlayer) this.state.secondaryPlayer.play().catch(() => {});
        this.state.playerElement.play().catch(() => {}); 

        // Fire audio wave array natively on the hardware matrix master clock timeline
        source.start(0, startOffset, duration);

        const realTimeDuration = duration / this.state.playbackRate;
        if (this.state.pauseTimeout) clearTimeout(this.state.pauseTimeout);
        this.state.pauseTimeout = setTimeout(() => {
            this._handleSegmentComplete();
        }, realTimeDuration * 1000);

        this.startMonitor();
    },

    /**
     * PIPELINE B: Pure Native HTML5 Continuous Streaming Node (CORS Immune)
     */
    _executeNativePlayback: function(src) {
        document.getElementById('status').innerText = "Streaming Full Pasuram...";
        const player = this.state.playerElement;
        
        player.removeAttribute('crossOrigin'); // Prevents domain fallback CORS preflight check errors
        
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
        if (this.state.playerElement) {
            this.state.playerElement.pause();
        }
        if (this.state.secondaryPlayer) {
            this.state.secondaryPlayer.pause();
        }
    },

    /**
     * High-speed real-time telemetry synchronizer tracking active pipelines to text highlight nodes
     */
    _loopCheck: function() {
        if (!this.state.isMonitoring) return;

        const player = this.state.playerElement;
        
        const ctx = this.state.audioContext;
        // --- ADD LOG: Check if player exists and if it thinks it's ended ---
        if (!player) {
            console.error("Engine Error: Player element is null.");
            return;
        }

        if (this.state.pipelineMode === "ram") {
            if (this.state.isPlaying && ctx && this.state.audioBuffer) {
                const elapsedRealTime = ctx.currentTime - this.state.startTimeInContext;
                const elapsedTrackTime = elapsedRealTime * this.state.playbackRate;
                
                // Expose artificial playhead metrics for syncTextToAudioTimeline selectors
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
