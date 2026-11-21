/**
 * AdaptiveGovernor.js — Rolling Frame-Time Performance Monitor & Quality Governor
 * 
 * Measures rolling 60-frame time average.
 * When frame time slips past 20ms (< 50fps), gracefully steps down quality tiers:
 * Tier 0 (High): Native dpr (up to 2 on desktop, 1.5 on mobile), full bloom, max stars
 * Tier 1 (Medium): Render scale 0.85, moderate bloom
 * Tier 2 (Low): Render scale 0.72, gentle bloom, starfield throttled
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
  }

  tick(timestamp) {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
      return;
    }

    const dt = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Discard anomalies (e.g. background tab wakeups)
    if (dt > 120) return;

    this.frameTimes[this.frameIndex] = dt;
    this.frameIndex = (this.frameIndex + 1) % this.historySize;
    if (this.totalSamples < this.historySize) this.totalSamples++;

    // Calculate rolling average
    let sum = 0;
    for (let i = 0; i < this.totalSamples; i++) {
      sum += this.frameTimes[i];
    }
    const avgDt = sum / this.totalSamples;
    this.fps = Math.round(1000 / Math.max(1, avgDt));

    // Evaluate Quality Tier
    if (this.totalSamples >= 30) {
      if (avgDt > 20.0) { // Below 50fps
        this.stableGoodFrames = 0;
        if (this.currentTier === 'high') {
          this.setTier('medium');
        } else if (this.currentTier === 'medium' && avgDt > 24.0) {
          this.setTier('low');
        }
      } else if (avgDt < 16.5) { // Solid 60fps
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

  setTier(tier) {
    if (this.currentTier === tier) return;
    this.currentTier = tier;
    
    let scale = 1.0;
    if (tier === 'medium') scale = 0.85;
    if (tier === 'low') scale = 0.72;

    this.onQualityChange(tier, scale);
  }

  getMetrics() {
    return {
      fps: this.fps,
      tier: this.currentTier
    };
  }
}
