/**
 * audioWaveform.js — lightweight waveform decode + canvas renderer for Splitter.
 * Decode once via Web Audio API; draw overview + per-segment trim bars.
 */
(function () {
    'use strict';

    const PRECISION = 2;
    const SEGMENT_PALETTE = [
        '#4a90d9', '#50b86c', '#e8a838', '#9b59b6', '#e74c3c',
        '#1abc9c', '#f39c12', '#3498db', '#2ecc71', '#e67e22'
    ];
    const KEEP_FILL = 'rgba(76, 175, 80, 0.28)';
    const KEEP_STROKE = '#4caf50';
    const KEEP_MARKER = '#66bb6a';
    const GAP_FILL = 'rgba(239, 83, 80, 0.45)';
    const PLAYHEAD_COLOR = '#d32f2f';
    const PIN_AREA = 26;
    const TIME_AREA = 20;

    let peaks = null;
    let peakSampleRate = 0;
    let duration = 0;
    let audioContext = null;
    let decodePromise = null;
    let currentSrc = null;
    let rawPeaks = null;

    let overviewMount = null;
    const segmentBars = new Map();
    let playheadTime = 0;
    let activeSegmentIndex = -1;

    function roundTime(t) {
        return parseFloat(Number(t).toFixed(PRECISION));
    }

    function getAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    function computePeaks(buffer, samplesPerPeak) {
        const channel = buffer.getChannelData(0);
        const len = channel.length;
        const count = Math.max(1, Math.ceil(len / samplesPerPeak));
        const mins = new Float32Array(count);
        const maxs = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const start = i * samplesPerPeak;
            const end = Math.min(start + samplesPerPeak, len);
            let min = 1;
            let max = -1;
            for (let j = start; j < end; j++) {
                const v = channel[j];
                if (v < min) min = v;
                if (v > max) max = v;
            }
            mins[i] = min;
            maxs[i] = max;
        }
        return { mins, maxs, count };
    }

    async function decode(src) {
        if (!src) return false;
        if (src === currentSrc && peaks) return true;
        if (decodePromise && src === currentSrc) return decodePromise;

        currentSrc = src;
        decodePromise = (async () => {
            try {
                const ctx = getAudioContext();
                const response = await fetch(src);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
                duration = buffer.duration;
                peakSampleRate = buffer.sampleRate;
                rawPeaks = computePeaks(buffer, Math.max(64, Math.floor(buffer.length / 2000)));
                peaks = rawPeaks;
                if (overviewMount) redrawOverview();
                segmentBars.forEach((bar) => bar.redraw());
                return true;
            } catch (err) {
                console.warn('[AudioWaveform] decode failed:', err);
                peaks = null;
                rawPeaks = null;
                duration = 0;
                return false;
            } finally {
                decodePromise = null;
            }
        })();
        return decodePromise;
    }

    function resamplePeaksForWidth(width) {
        if (!rawPeaks || width < 1) return null;
        const target = Math.max(1, Math.floor(width));
        if (rawPeaks.count === target) return rawPeaks;
        const { mins, maxs, count } = rawPeaks;
        const outMins = new Float32Array(target);
        const outMaxs = new Float32Array(target);
        for (let i = 0; i < target; i++) {
            const srcStart = Math.floor((i / target) * count);
            const srcEnd = Math.floor(((i + 1) / target) * count);
            let min = 1;
            let max = -1;
            for (let j = srcStart; j < Math.max(srcStart + 1, srcEnd); j++) {
                if (j >= count) break;
                if (mins[j] < min) min = mins[j];
                if (maxs[j] > max) max = maxs[j];
            }
            outMins[i] = min;
            outMaxs[i] = max;
        }
        return { mins: outMins, maxs: outMaxs, count: target };
    }

    function timeToX(time, viewStart, viewEnd, width) {
        const span = viewEnd - viewStart;
        if (span <= 0) return 0;
        return ((time - viewStart) / span) * width;
    }

    function xToTime(x, viewStart, viewEnd, width) {
        const span = viewEnd - viewStart;
        if (width <= 0) return viewStart;
        return viewStart + (x / width) * span;
    }

    function drawPeaksForTimeRange(ctx, pk, viewStart, viewEnd, x, y, w, h, color) {
        if (!pk || duration <= 0 || viewEnd <= viewStart) return;
        const mid = y + h / 2;
        const half = h / 2 - 1;
        ctx.fillStyle = color;
        const cols = Math.max(1, Math.floor(w));
        for (let i = 0; i < cols; i++) {
            const t0 = viewStart + (i / cols) * (viewEnd - viewStart);
            const t1 = viewStart + ((i + 1) / cols) * (viewEnd - viewStart);
            const idx0 = Math.max(0, Math.floor((t0 / duration) * pk.count));
            const idx1 = Math.min(pk.count, Math.ceil((t1 / duration) * pk.count));
            let min = 1;
            let max = -1;
            for (let j = idx0; j < idx1; j++) {
                if (pk.mins[j] < min) min = pk.mins[j];
                if (pk.maxs[j] > max) max = pk.maxs[j];
            }
            const px = x + (i / cols) * w;
            const barW = Math.max(1, w / cols);
            const top = mid - max * half;
            const bot = mid - min * half;
            ctx.fillRect(px, top, barW, Math.max(1, bot - top));
        }
    }

    function drawWaveformPeaks(ctx, pk, x, y, w, h, color) {
        drawPeaksForTimeRange(ctx, pk, 0, duration || 1, x, y, w, h, color);
    }

    function findSilenceValley(time, radiusSec) {
        if (!rawPeaks || duration <= 0) return roundTime(time);
        radiusSec = radiusSec || 0.25;
        const t0 = Math.max(0, time - radiusSec);
        const t1 = Math.min(duration, time + radiusSec);
        const startIdx = Math.floor((t0 / duration) * rawPeaks.count);
        const endIdx = Math.ceil((t1 / duration) * rawPeaks.count);
        let bestIdx = startIdx;
        let bestAmp = Infinity;
        for (let i = startIdx; i < endIdx; i++) {
            const amp = Math.max(Math.abs(rawPeaks.mins[i]), Math.abs(rawPeaks.maxs[i]));
            if (amp < bestAmp) {
                bestAmp = amp;
                bestIdx = i;
            }
        }
        const valleyTime = (bestIdx / rawPeaks.count) * duration;
        return roundTime(valleyTime);
    }

    function drawOverview(canvas, markers, issues, playhead, activeIdx) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
        }
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        const viewEnd = duration || (markers.length ? markers[markers.length - 1].end : 1);
        const pk = resamplePeaksForWidth(w);
        drawWaveformPeaks(ctx, pk, 0, 0, w, h, '#b0bec5');

        if (markers && markers.length) {
            for (let i = 0; i < markers.length; i++) {
                const m = markers[i];
                const x0 = timeToX(m.start, 0, viewEnd, w);
                const x1 = timeToX(m.end, 0, viewEnd, w);
                const color = SEGMENT_PALETTE[i % SEGMENT_PALETTE.length];
                ctx.fillStyle = i === activeIdx ? color + '99' : color + '55';
                ctx.fillRect(x0, 0, Math.max(1, x1 - x0), h);
            }
            if (issues) {
                issues.forEach((issue) => {
                    if (!issue.types.includes('gap')) return;
                    const prev = markers[issue.index - 1];
                    const curr = markers[issue.index];
                    if (!prev || !curr) return;
                    const gx0 = timeToX(prev.end, 0, viewEnd, w);
                    const gx1 = timeToX(curr.start, 0, viewEnd, w);
                    ctx.fillStyle = GAP_FILL;
                    ctx.fillRect(gx0, 0, Math.max(1, gx1 - gx0), h);
                });
            }
        }

        if (playhead > 0 && viewEnd > 0) {
            const px = timeToX(playhead, 0, viewEnd, w);
            ctx.strokeStyle = PLAYHEAD_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, 0);
            ctx.lineTo(px, h);
            ctx.stroke();
        }
    }

    function formatClock(t) {
        const s = Math.max(0, t || 0);
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }

    function drawSegmentBar(canvas, segmentIndex, markers, playhead, expanded, viewLock, activeHandle) {
        const m = markers[segmentIndex];
        if (!m) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
        }
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        // audiotrimmer-style layout: pin markers on top, waveform middle, time badges below
        const pinArea = PIN_AREA;
        const timeArea = TIME_AREA;
        const waveY = pinArea;
        const waveH = Math.max(24, h - pinArea - timeArea);
        const waveBottom = waveY + waveH;

        ctx.fillStyle = '#f7f7f7';
        ctx.fillRect(0, waveY, w, waveH);

        const segLen = Math.max(0.05, m.end - m.start);
        const margin = expanded ? Math.max(2.5, segLen * 0.35) : Math.max(0.75, segLen * 0.2);
        let viewStart;
        let viewEnd;
        if (viewLock && viewLock.viewEnd > viewLock.viewStart) {
            viewStart = viewLock.viewStart;
            viewEnd = viewLock.viewEnd;
        } else {
            viewStart = Math.max(0, m.start - margin);
            viewEnd = Math.min(duration || m.end + margin, m.end + margin);
            if (viewEnd - viewStart < 0.2) viewEnd = viewStart + 0.2;
        }

        drawPeaksForTimeRange(ctx, rawPeaks, viewStart, viewEnd, 0, waveY, w, waveH, '#9e9e9e');

        const x0 = timeToX(m.start, viewStart, viewEnd, w);
        const x1 = timeToX(m.end, viewStart, viewEnd, w);
        const keepW = Math.max(2, x1 - x0);

        // Soft "keep" selection overlay (audiotrimmer style)
        ctx.fillStyle = KEEP_FILL;
        ctx.fillRect(x0, waveY, keepW, waveH);
        ctx.strokeStyle = 'rgba(76, 175, 80, 0.55)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x0 + 0.5, waveY + 0.5, keepW - 1, waveH - 1);

        // "keep" label centered above selection
        if (keepW > 36) {
            ctx.fillStyle = '#2e7d32';
            ctx.font = 'bold 11px system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('keep', (x0 + x1) / 2, pinArea / 2);
        }

        // Start / end pin markers
        drawTrimPin(ctx, x0, waveY, waveBottom, activeHandle === 'start');
        drawTrimPin(ctx, x1, waveY, waveBottom, activeHandle === 'end');

        // Time badges under pins
        drawTimeBadge(ctx, x0, waveBottom + 3, formatClock(m.start), activeHandle === 'start', w);
        drawTimeBadge(ctx, x1, waveBottom + 3, formatClock(m.end), activeHandle === 'end', w);

        // View / phrase duration (bottom-right, like audiotrimmer total)
        ctx.fillStyle = '#757575';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(formatClock(m.end - m.start), w - 4, h - 2);

        if (playhead >= viewStart && playhead <= viewEnd) {
            const px = timeToX(playhead, viewStart, viewEnd, w);
            ctx.strokeStyle = PLAYHEAD_COLOR;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px, waveY);
            ctx.lineTo(px, waveBottom);
            ctx.stroke();
        }

        // Wide hit targets around pin stems
        return {
            viewStart,
            viewEnd,
            x0,
            x1,
            handleW: 22,
            waveY,
            waveBottom,
            pinArea
        };
    }

    /** Inverted teardrop pin + stem — matches audiotrimmer start/end markers */
    function drawTrimPin(ctx, x, waveY, waveBottom, isActive) {
        const r = 8;
        const cy = r + 2;
        const tipY = waveY;

        // Stem through the keep region
        ctx.strokeStyle = isActive ? '#2e7d32' : KEEP_MARKER;
        ctx.lineWidth = isActive ? 2.5 : 2;
        ctx.beginPath();
        ctx.moveTo(x, tipY);
        ctx.lineTo(x, waveBottom);
        ctx.stroke();

        // Pin head (circle + point into waveform)
        ctx.beginPath();
        ctx.arc(x, cy, r, Math.PI * 0.85, Math.PI * 0.15, true);
        ctx.lineTo(x, tipY);
        ctx.closePath();
        ctx.fillStyle = isActive ? '#43a047' : KEEP_MARKER;
        ctx.fill();
        ctx.strokeStyle = isActive ? '#1b5e20' : '#388e3c';
        ctx.lineWidth = isActive ? 2 : 1.5;
        ctx.stroke();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(x - 1.5, cy - 1.5, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fill();

        if (isActive) {
            ctx.strokeStyle = '#90caf9';
            ctx.lineWidth = 2;
            ctx.strokeRect(x - r - 3, 1, r * 2 + 6, tipY + 2);
        }
    }

    function drawTimeBadge(ctx, x, y, text, emphasized, canvasW) {
        ctx.font = emphasized ? 'bold 11px system-ui, sans-serif' : '11px system-ui, sans-serif';
        const tw = ctx.measureText(text).width;
        const padX = 5;
        const bw = tw + padX * 2;
        const bh = 15;
        let left = x - bw / 2;
        left = Math.max(0, Math.min(canvasW - bw, left));
        ctx.fillStyle = emphasized ? '#212121' : '#424242';
        ctx.beginPath();
        const r = 3;
        ctx.moveTo(left + r, y);
        ctx.arcTo(left + bw, y, left + bw, y + bh, r);
        ctx.arcTo(left + bw, y + bh, left, y + bh, r);
        ctx.arcTo(left, y + bh, left, y, r);
        ctx.arcTo(left, y, left + bw, y, r);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, left + bw / 2, y + bh / 2 + 0.5);
    }

    function mountOverview(container, callbacks) {
        container.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.className = 'wf-overview-wrap';
        const label = document.createElement('div');
        label.className = 'wf-label';
        label.textContent = 'Track overview';
        const canvas = document.createElement('canvas');
        canvas.className = 'wf-overview-canvas';
        wrap.appendChild(label);
        wrap.appendChild(canvas);
        container.appendChild(wrap);

        let dragging = null;

        function hitTest(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const w = rect.width;
            const viewEnd = duration || 1;
            return { x, time: roundTime(xToTime(x, 0, viewEnd, w)) };
        }

        canvas.addEventListener('mousedown', (e) => {
            if (!callbacks.onSeek) return;
            const hit = hitTest(e);
            dragging = 'seek';
            callbacks.onSeek(hit.time);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (dragging !== 'seek') return;
            callbacks.onSeek(hitTest(e).time);
        });
        window.addEventListener('mouseup', () => { dragging = null; });

        canvas.addEventListener('click', (e) => {
            if (!callbacks.onSeek) return;
            callbacks.onSeek(hitTest(e).time);
            if (callbacks.onSegmentClick && callbacks.getMarkers) {
                const t = hitTest(e).time;
                const markers = callbacks.getMarkers();
                const idx = markers.findIndex((mk) => t >= mk.start && t < mk.end);
                if (idx >= 0) callbacks.onSegmentClick(idx);
            }
        });

        overviewMount = { canvas, callbacks };
        redrawOverview();
    }

    function redrawOverview() {
        if (!overviewMount) return;
        const { canvas, callbacks } = overviewMount;
        const markers = callbacks.getMarkers ? callbacks.getMarkers() : [];
        const issues = callbacks.getIssues ? callbacks.getIssues() : [];
        drawOverview(canvas, markers, issues, playheadTime, activeSegmentIndex);
    }

    function createSegmentBar(canvas, segmentIndex, callbacks, expanded) {
        // Reuse existing bar on the same canvas so we don't stack duplicate listeners
        // (new_splitter remounts often via refreshWaveformViews).
        const existing = segmentBars.get(segmentIndex);
        if (existing && existing.canvas === canvas) {
            existing.callbacks = callbacks;
            existing.setExpanded(!!expanded);
            existing.redraw();
            return existing;
        }

        // Fresh canvas element if replacing an old bar (drop leaked listeners)
        if (existing && existing.canvas !== canvas) {
            if (typeof existing.destroy === 'function') existing.destroy();
            segmentBars.delete(segmentIndex);
        }

        const state = {
            segmentIndex,
            callbacks,
            expanded: !!expanded,
            drag: null,
            viewLock: null
        };

        function redraw() {
            const markers = state.callbacks.getMarkers ? state.callbacks.getMarkers() : [];
            const activeHandle = (state.drag === 'start' || state.drag === 'end') ? state.drag : null;
            const layout = drawSegmentBar(
                canvas,
                segmentIndex,
                markers,
                playheadTime,
                state.expanded,
                state.viewLock,
                activeHandle
            );
            state.layout = layout;
        }

        function localHit(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const w = rect.width;
            if (!state.layout) return { zone: 'none' };
            const { viewStart, viewEnd, x0, x1, handleW, pinArea } = state.layout;
            const t = roundTime(xToTime(x, viewStart, viewEnd, w));
            // Prefer pin heads / stems — especially easy grab in the top pin belt
            const hitPad = y <= (pinArea || PIN_AREA) + 4 ? Math.max(handleW, 26) : Math.max(handleW, 18);
            if (Math.abs(x - x0) <= hitPad) return { zone: 'start', time: t };
            if (Math.abs(x - x1) <= hitPad) return { zone: 'end', time: t };
            if (x >= x0 && x <= x1) return { zone: 'body', time: t };
            return { zone: 'seek', time: t };
        }

        function onMouseMove(e) {
            if (!state.drag) {
                const hover = localHit(e);
                canvas.style.cursor = (hover.zone === 'start' || hover.zone === 'end')
                    ? 'ew-resize'
                    : (hover.zone === 'body' || hover.zone === 'seek' ? 'crosshair' : 'default');
                return;
            }
            const hit = localHit(e);
            if (state.drag === 'start' && state.callbacks.onBoundaryChange) {
                state.callbacks.onBoundaryChange(segmentIndex, 'start', hit.time);
            } else if (state.drag === 'end' && state.callbacks.onBoundaryChange) {
                state.callbacks.onBoundaryChange(segmentIndex, 'end', hit.time);
            } else if (state.drag === 'seek' && state.callbacks.onSeek) {
                state.callbacks.onSeek(hit.time);
            }
            redraw();
        }

        function onMouseUp() {
            if (!state.drag) return;
            const wasBoundary = state.drag === 'start' || state.drag === 'end';
            if (state.callbacks.onDragEnd) state.callbacks.onDragEnd(segmentIndex);
            state.drag = null;
            state.viewLock = null;
            if (wasBoundary) redraw();
        }

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('click', onClickSetEnd);
        window.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('dblclick', onDblClick);

        function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            state._downX = e.clientX;
            state._downY = e.clientY;
            const hit = localHit(e);
            if (hit.zone === 'start' || hit.zone === 'end') {
                state.drag = hit.zone;
                // Freeze camera so dragging start/end doesn't re-zoom under the pointer
                if (state.layout) {
                    state.viewLock = {
                        viewStart: state.layout.viewStart,
                        viewEnd: state.layout.viewEnd
                    };
                }
                if (state.callbacks.onDragStart) state.callbacks.onDragStart(segmentIndex, hit.zone);
            } else if (hit.zone === 'seek' || hit.zone === 'body') {
                state.drag = 'seek';
                // Don't seek on mousedown — let click handler decide (set-end vs seek)
            }
        }

        function onClickSetEnd(e) {
            // Only fire if the mouse barely moved (genuine click, not a drag)
            const dx = Math.abs(e.clientX - (state._downX || 0));
            const dy = Math.abs(e.clientY - (state._downY || 0));
            if (dx > 5 || dy > 5) return;

            const hit = localHit(e);
            // Click in body/seek zone → set end of this segment to clicked position
            // Only accept times ahead of current playhead so audio isn't cut short
            if ((hit.zone === 'body' || hit.zone === 'seek') && state.callbacks.onBoundaryChange) {
                const minEnd = playheadTime > 0 ? Math.max(hit.time, playheadTime + 0.05) : hit.time;
                state.callbacks.onBoundaryChange(segmentIndex, 'end', minEnd);
                redraw();
            }
        }

        function onDblClick(e) {
            e.stopPropagation();
            if (state.callbacks.onToggleExpand) state.callbacks.onToggleExpand(segmentIndex);
        }

        const bar = {
            canvas,
            segmentIndex,
            get callbacks() { return state.callbacks; },
            set callbacks(v) { state.callbacks = v; },
            redraw,
            setExpanded(exp) {
                state.expanded = !!exp;
                if (!state.drag) state.viewLock = null;
                redraw();
            },
            destroy() {
                canvas.removeEventListener('mousedown', onMouseDown);
                canvas.removeEventListener('mousemove', onMouseMove);
                canvas.removeEventListener('click', onClickSetEnd);
                canvas.removeEventListener('dblclick', onDblClick);
                window.removeEventListener('mouseup', onMouseUp);
            }
        };
        segmentBars.set(segmentIndex, bar);
        redraw();
        return bar;
    }

    function setPlayhead(t) {
        playheadTime = t;
        redrawOverview();
        segmentBars.forEach((bar) => bar.redraw());
    }

    function setActiveSegment(idx) {
        activeSegmentIndex = idx;
        redrawOverview();
    }

    function refreshAll() {
        redrawOverview();
        segmentBars.forEach((bar) => bar.redraw());
    }

    function clearSegmentBars() {
        segmentBars.forEach((bar) => {
            if (bar && typeof bar.destroy === 'function') bar.destroy();
        });
        segmentBars.clear();
    }

    function destroyOverview() {
        overviewMount = null;
    }

    function showUnavailable(container, message) {
        container.innerHTML = '<div class="wf-unavailable">' + message + '</div>';
    }

    window.AudioWaveform = {
        PRECISION,
        roundTime,
        decode,
        isReady: () => !!peaks,
        getDuration: () => duration,
        findSilenceValley,
        mountOverview,
        createSegmentBar,
        setPlayhead,
        setActiveSegment,
        refreshAll,
        clearSegmentBars,
        destroyOverview,
        showUnavailable,
        redrawOverview
    };
})();
