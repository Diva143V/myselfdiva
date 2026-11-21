/**
 * scripts/benchmark_and_screenshots.js
 * 
 * 1. Hosts ./dist over local HTTP.
 * 2. Launches Chrome via Playwright with WebGL enabled.
 * 3. Profiles performance under baseline and 4x CPU throttle (CDP).
 * 4. Measures frame times, FPS, draw calls, triangles, and heap.
 * 5. Captures the 4 required screenshots:
 *    - Hero view (hero.png)
 *    - Planet close-up (planet-closeup.png)
 *    - Work flight deck (work-flight.png)
 *    - 390px mobile view (mobile-390px.png)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.woff2': 'font/woff2'
};

function startServer(port = 4173) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';

    const filePath = path.join(distDir, reqPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`[HTTP Server] Serving ${distDir} at http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer(4173);

  console.log('[Playwright] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: [
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--use-gl=angle',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  // Ensure output directories exist
  const publicScreenshots = path.resolve(__dirname, '../public/screenshots');
  const distScreenshots = path.resolve(__dirname, '../dist/screenshots');
  fs.mkdirSync(publicScreenshots, { recursive: true });
  fs.mkdirSync(distScreenshots, { recursive: true });

  const saveScreenshot = async (page, name) => {
    const pubPath = path.join(publicScreenshots, name);
    const distPath = path.join(distScreenshots, name);
    await page.screenshot({ path: pubPath });
    fs.copyFileSync(pubPath, distPath);
    console.log(`[Screenshot Saved] ${name} -> ${pubPath}`);
  };

  try {
    // ----------------------------------------------------
    // TEST SUITE 1: Desktop (1440x900)
    // ----------------------------------------------------
    console.log('\n--- Test 1: Desktop Viewport (1440x900) ---');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') console.error(`[Browser Error]:`, msg.text());
    });

    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    console.log('[Page Loaded] Waiting for ignition sequence...');
    await page.waitForTimeout(3000); // Allow staged ignition and stars to settle

    // 1. Capture Hero View
    await saveScreenshot(page, 'hero.png');

    // Setup CDP Session for CPU Throttling
    const cdp = await context.newCDPSession(page);

    // Baseline Metrics (1x CPU)
    console.log('\nProfiling Baseline (1x CPU, 120 frames)...');
    const baselineMetrics = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const frameTimes = [];
        let frames = 0;
        let last = performance.now();

        function sample(now) {
          frameTimes.push(now - last);
          last = now;
          frames++;
          if (frames < 120) {
            requestAnimationFrame(sample);
          } else {
            const renderer = window.__UNIVERSE__?.universeScene?.renderer;
            const info = renderer?.info || {};
            resolve({
              frameTimes,
              drawCalls: info.render?.calls || 0,
              triangles: info.render?.triangles || 0,
              points: info.render?.points || 0,
              lines: info.render?.lines || 0,
              geometries: info.memory?.geometries || 0,
              textures: info.memory?.textures || 0,
              qualityTier: window.__UNIVERSE__?.governor?.currentTier || 'unknown'
            });
          }
        }
        requestAnimationFrame(sample);
      });
    });

    // Apply 4x CPU Throttling
    console.log('\nEnabling 4x CPU Throttling via Chrome DevTools Protocol...');
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    console.log('Profiling under 4x CPU Throttle (180 frames)...');
    const throttledMetrics = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const frameTimes = [];
        let frames = 0;
        let last = performance.now();

        function sample(now) {
          const dt = now - last;
          frameTimes.push(dt);
          last = now;
          frames++;
          if (frames < 180) {
            requestAnimationFrame(sample);
          } else {
            const renderer = window.__UNIVERSE__?.universeScene?.renderer;
            const info = renderer?.info || {};
            resolve({
              frameTimes,
              drawCalls: info.render?.calls || 0,
              triangles: info.render?.triangles || 0,
              points: info.render?.points || 0,
              lines: info.render?.lines || 0,
              geometries: info.memory?.geometries || 0,
              textures: info.memory?.textures || 0,
              qualityTier: window.__UNIVERSE__?.governor?.currentTier || 'unknown',
              governorFps: window.__UNIVERSE__?.governor?.fps || 60
            });
          }
        }
        requestAnimationFrame(sample);
      });
    });

    // Reset CPU throttle for cinematic interaction shots
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

    // 2. Planet Close-Up View (focus Python ocean world)
    console.log('\nFocusing on Python Planet (Orbit 1)...');
    await page.evaluate(() => {
      const u = window.__UNIVERSE__;
      if (u && u.universeScene && u.universeScene.planets.python) {
        u.universeScene.focusOnBody(u.universeScene.planets.python, 45, 1.2);
      }
    });
    await page.waitForTimeout(2000);
    await saveScreenshot(page, 'planet-closeup.png');

    // 3. Work Flight Deck (Scroll to Work Section)
    console.log('\nNavigating to Work Section flight deck...');
    await page.evaluate(() => {
      const workEl = document.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });
    await page.waitForTimeout(2000);
    await saveScreenshot(page, 'work-flight.png');

    await context.close();

    // ----------------------------------------------------
    // TEST SUITE 2: Mobile Viewport (390x844 - iPhone 13/14)
    // ----------------------------------------------------
    console.log('\n--- Test 2: Mobile Viewport (390x844) ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(3000);

    // 4. Capture Mobile View
    await saveScreenshot(mobilePage, 'mobile-390px.png');

    // Mobile Performance Under 4x CPU Throttle
    const mobileCdp = await mobileContext.newCDPSession(mobilePage);
    await mobileCdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    console.log('Profiling Mobile under 4x CPU Throttle (120 frames)...');
    const mobileThrottledMetrics = await mobilePage.evaluate(async () => {
      return new Promise((resolve) => {
        const frameTimes = [];
        let frames = 0;
        let last = performance.now();

        function sample(now) {
          frameTimes.push(now - last);
          last = now;
          frames++;
          if (frames < 120) {
            requestAnimationFrame(sample);
          } else {
            const renderer = window.__UNIVERSE__?.universeScene?.renderer;
            const info = renderer?.info || {};
            resolve({
              frameTimes,
              drawCalls: info.render?.calls || 0,
              triangles: info.render?.triangles || 0,
              qualityTier: window.__UNIVERSE__?.governor?.currentTier || 'unknown',
              governorFps: window.__UNIVERSE__?.governor?.fps || 60
            });
          }
        }
        requestAnimationFrame(sample);
      });
    });

    await mobileContext.close();

    // ----------------------------------------------------
    // ANALYZE & FORMAT METRICS
    // ----------------------------------------------------
    const calcStats = (times) => {
      const sorted = [...times].sort((a, b) => a - b);
      const avg = times.reduce((s, v) => s + v, 0) / times.length;
      const p95 = sorted[Math.floor(sorted.length * 0.95)];
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const fps = 1000 / avg;
      return { avg, p95, min, max, fps };
    };

    const baseStats = calcStats(baselineMetrics.frameTimes);
    const throttledStats = calcStats(throttledMetrics.frameTimes);
    const mobileStats = calcStats(mobileThrottledMetrics.frameTimes);

    console.log('\n=============================================================');
    console.log('          PERFORMANCE PROFILING & BENCHMARK REPORT          ');
    console.log('=============================================================');
    console.log(`\n1. DESKTOP BASELINE (1x CPU, 1440x900 @ 2x DPR):`);
    console.log(`   - Average Frame Time : ${baseStats.avg.toFixed(2)} ms (${baseStats.fps.toFixed(1)} FPS)`);
    console.log(`   - 95th Percentile    : ${baseStats.p95.toFixed(2)} ms`);
    console.log(`   - Max Frame Time     : ${baseStats.max.toFixed(2)} ms`);
    console.log(`   - Draw Calls         : ${baselineMetrics.drawCalls}`);
    console.log(`   - Triangles          : ${baselineMetrics.triangles.toLocaleString()}`);
    console.log(`   - Geometries         : ${baselineMetrics.geometries}`);
    console.log(`   - Textures           : ${baselineMetrics.textures}`);
    console.log(`   - Quality Tier       : ${baselineMetrics.qualityTier}`);

    console.log(`\n2. DESKTOP 4x CPU THROTTLE (1440x900 @ 2x DPR):`);
    console.log(`   - Average Frame Time : ${throttledStats.avg.toFixed(2)} ms (${throttledStats.fps.toFixed(1)} FPS)`);
    console.log(`   - 95th Percentile    : ${throttledStats.p95.toFixed(2)} ms`);
    console.log(`   - Max Frame Time     : ${throttledStats.max.toFixed(2)} ms`);
    console.log(`   - Draw Calls         : ${throttledMetrics.drawCalls}`);
    console.log(`   - Triangles          : ${throttledMetrics.triangles.toLocaleString()}`);
    console.log(`   - Quality Tier       : ${throttledMetrics.qualityTier}`);
    console.log(`   - Governor FPS       : ${throttledMetrics.governorFps}`);

    console.log(`\n3. MOBILE 4x CPU THROTTLE (390x844 @ 1.5x DPR Capped):`);
    console.log(`   - Average Frame Time : ${mobileStats.avg.toFixed(2)} ms (${mobileStats.fps.toFixed(1)} FPS)`);
    console.log(`   - 95th Percentile    : ${mobileStats.p95.toFixed(2)} ms`);
    console.log(`   - Draw Calls         : ${mobileThrottledMetrics.drawCalls}`);
    console.log(`   - Triangles          : ${mobileThrottledMetrics.triangles.toLocaleString()}`);
    console.log(`   - Quality Tier       : ${mobileThrottledMetrics.qualityTier}`);

    console.log('\n=============================================================');
    console.log('All 4 Screenshots Successfully Generated in public/screenshots/');
    console.log('1. hero.png');
    console.log('2. planet-closeup.png');
    console.log('3. work-flight.png');
    console.log('4. mobile-390px.png');
    console.log('=============================================================\n');

    // Save report data for documentation
    fs.writeFileSync(
      path.resolve(__dirname, '../scratch/benchmark_results.json'),
      JSON.stringify({
        baseline: { ...baseStats, ...baselineMetrics },
        throttled: { ...throttledStats, ...throttledMetrics },
        mobileThrottled: { ...mobileStats, ...mobileThrottledMetrics }
      }, null, 2)
    );

  } catch (err) {
    console.error('Error during benchmark run:', err);
  } finally {
    await browser.close();
    server.close();
  }
}

run();
