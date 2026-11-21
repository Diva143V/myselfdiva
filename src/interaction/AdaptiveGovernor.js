/**
 * AdaptiveGovernor.js — Rolling Frame-Time Performance Monitor & Quality Governor
 * 
 * - Measures rolling frame times and tracks slow frames / stalls (>120ms) explicitly.
 * - Distinguishes between tab suspension wakeups and actual rendering stalls.
 * - Gracefully steps down quality tiers when under GPU/CPU pressure:
 *   Tier 0 (High): Native dpr (up to 2 on desktop, 1.5 on mobile), full bloom, max stars
 *   Tier 1 (Medium): Render scale 0.85, moderate bloom
 *   Tier 2 (Low): Render scale 0.72, gentle bloom, starfield throttled
 */

export class AdaptiveGovernor {
  constructor(options = {}) {
    this.onQualityChange = options.onQualityChange || (() => {});
    this.historySize = 60;
    this.frameTimes = new Float32Array(this.historySize);
    this.frameIndex = 0;
    this.totalSamples = 0;
    this.lastTimestamp = 0;

    this.currentTier = 'high'; // 'high' | 'medium' | 'low'
    this.stableGoodFrames = 0;
    this.fps = 60;
    this.longStallCount = 0;
    this.maxObservedFrameTime = 0;
    this.isSuspended = false;
  }

  notifySuspension() {
    this.isSuspended = true;
    this.lastTimestamp = 0;
  }

  resumeClock(now = performance.now()) {
    this.isSuspended = false;
    this.lastTimestamp = now;
  }

  tick(timestamp) {
    if (!this.lastTimestamp || this.isSuspended) {
      this.lastTimestamp = timestamp;
      this.isSuspended = false;
      return;
    }

    const dt = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (dt > 120) {
      // Record genuine long stalls
      this.longStallCount++;
      this.maxObservedFrameTime = Math.max(this.maxObservedFrameTime, dt);
      // Clamp for rolling average window so long stall degrades tier rather than vanishing
      const clampedDt = Math.min(dt, 160);
      this.recordSample(clampedDt);
    } else {
      this.recordSample(dt);
    }

    // Calculate rolling average
    let sum = 0;
    for (let i = 0; i < this.totalSamples; i++) {
      sum += this.frameTimes[i];
    }
    const avgDt = sum / this.totalSamples;
    this.fps = Math.round(1000 / Math.max(1, avgDt));

    // Evaluate Quality Tier
    if (this.totalSamples >= 30) {
      if (avgDt > 20.0 || this.longStallCount > 3) { // Below 50fps or frequent stalls
        this.stableGoodFrames = 0;
        if (this.currentTier === 'high') {
          this.setTier('medium');
        } else if (this.currentTier === 'medium' && (avgDt > 24.0 || this.longStallCount > 5)) {
          this.setTier('low');
        }
      } else if (avgDt < 16.8 && this.longStallCount === 0) { // Solid 60fps
        this.stableGoodFrames++;
        if (this.stableGoodFrames > 180) { // 3 seconds stable
          if (this.currentTier === 'low') {
            this.setTier('medium');
          } else if (this.currentTier === 'medium') {
            this.setTier('high');
          }
          this.stableGoodFrames = 0;
        }
      }
    }
  }

  recordSample(dt) {
    this.frameTimes[this.frameIndex] = dt;
    this.frameIndex = (this.frameIndex + 1) % this.historySize;
    if (this.totalSamples < this.historySize) this.totalSamples++;
  }

  setTier(tier) {
    if (this.currentTier === tier) return;
    this.currentTier = tier;
    
    let scale = 1.0;
    if (tier === 'medium') scale = 0.85;
    if (tier === 'low') scale = 0.72;

    this.onQualityChange(tier, scale);
  }

  getPercentiles() {
    if (this.totalSamples === 0) {
      return { p50: 16.6, p95: 16.6, p99: 16.6, maxFrameTime: 0, longStalls: 0, fps: 60 };
    }
    const samples = Array.from(this.frameTimes.slice(0, this.totalSamples)).sort((a, b) => a - b);
    const p50 = samples[Math.floor(samples.length * 0.5)];
    const p95 = samples[Math.min(samples.length - 1, Math.floor(samples.length * 0.95))];
    const p99 = samples[Math.min(samples.length - 1, Math.floor(samples.length * 0.99))];
    return {
      p50: Number(p50.toFixed(2)),
      p95: Number(p95.toFixed(2)),
      p99: Number(p99.toFixed(2)),
      maxFrameTime: Number(this.maxObservedFrameTime.toFixed(2)),
      longStalls: this.longStallCount,
      fps: this.fps
    };
  }

  getMetrics() {
    const percentiles = this.getPercentiles();
    return {
      fps: this.fps,
      tier: this.currentTier,
      longStallCount: this.longStallCount,
      maxObservedFrameTime: this.maxObservedFrameTime,
      percentiles
    };
  }
}
