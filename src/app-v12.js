console.log('HCU LandmarkLens v1.1.0 - Initializing...');

// Import styles
import './styles/main.css';
import './styles/animations.css';
import './styles/effects.css';

import { LandmarkPicker } from './components/LandmarkPicker.js';
import { CameraCapture } from './components/CameraCapture.js';
import { ProcessingScreen } from './components/ProcessingScreen.js';
import { ResultViewer } from './components/ResultViewer.js';
import { segmentPerson } from './services/segmentation.js';
import { generateBackground } from './services/imageGen.js';

// ============================================================
//  APP STATE
// ============================================================
const state = {
  step: 1,          // 1-4
  landmark: null,
  photoBlob: null,
};

const app = document.getElementById('app');
const stepsEl = document.getElementById('step-dots');

// ============================================================
//  PARTICLE FIELD
// ============================================================
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '#00f5ff' : '#b24bff';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

// ============================================================
//  STEP INDICATOR
// ============================================================
function updateStepDots(activeStep) {
  if (!stepsEl) return;
  stepsEl.innerHTML = [1, 2, 3, 4].map((s) =>
    `<div class="step-dot ${s === activeStep ? 'active' : s < activeStep ? 'done' : ''}"></div>`
  ).join('');
}

// ============================================================
//  SCREEN ROUTER
// ============================================================
const content = document.getElementById('content');
let currentCamera = null;

function goTo(step) {
  state.step = step;
  updateStepDots(step);

  if (currentCamera) {
    currentCamera.destroy();
    currentCamera = null;
  }

  switch (step) {
    case 1: showLandmarkPicker(); break;
    case 2: showCamera(); break;
    case 3: showProcessing(); break;
    case 4: /* shown after processing */ break;
  }
}

function showLandmarkPicker() {
  const picker = new LandmarkPicker(content, {
    onSelect(landmark) {
      state.landmark = landmark;
      goTo(2);
    },
  });
  picker.render();
}

function showCamera() {
  const cam = new CameraCapture(content, {
    landmark: state.landmark,
    onCapture(blob) {
      state.photoBlob = blob;
      goTo(3);
    },
    onBack() { goTo(1); },
  });
  cam.render();
  currentCamera = cam;
}

async function showProcessing() {
  const ps = new ProcessingScreen(content, {
    landmark: state.landmark,
    onComplete() {},
    onError() {},
  });
  ps.render();

  let personBlob, backgroundUrl, seed;

  try {
    // --- Step 1: Segmentation (0 → 40%) ---
    ps.setStepActive('seg');
    personBlob = await segmentPerson(state.photoBlob, (pct) => {
      ps.setProgress(pct * 40);
    });
    ps.setStepDone('seg');
    ps.setProgress(40);

    // --- Step 2: Image Generation (40 → 85%) ---
    ps.setStepActive('gen');
    ps.setTip('Pollinations AI Flux กำลังสร้างโลก Sci-Fi... (~15-20 วิ)');

    // Animate progress during generation (indeterminate)
    let genPct = 40;
    const genInterval = setInterval(() => {
      if (genPct < 84) { genPct += 0.5; ps.setProgress(genPct); }
    }, 300);

    const result = await generateBackground(state.landmark, 'portrait');
    backgroundUrl = result.imageUrl;
    seed = result.seed;

    clearInterval(genInterval);
    ps.setStepDone('gen');
    ps.setProgress(85);

    // --- Step 3: Compositing (85 → 100%) ---
    ps.setStepActive('comp');
    ps.setTip('กำลังใส่ Sci-Fi Effects... เกือบเสร็จแล้ว!');
    ps.setProgress(92);
    await new Promise((r) => setTimeout(r, 300)); // give UI a frame
    ps.setStepDone('comp');
    ps.setProgress(100);

    await new Promise((r) => setTimeout(r, 400));

    // --- Step 4: Result ---
    updateStepDots(4);
    const viewer = new ResultViewer(content, {
      landmark: state.landmark,
      personBlob,
      backgroundUrl,
      seed,
      onRestart() { goTo(1); },
    });
    await viewer.render();

  } catch (err) {
    console.error('[app] Processing error:', err);
    ps.setStepError(
      !personBlob ? 'seg' : !backgroundUrl ? 'gen' : 'comp'
    );
    ps.setTip('เกิดข้อผิดพลาด: ' + err.message);

    // Show retry button
    setTimeout(() => {
      const tipEl = content.querySelector('#processing-tip');
      if (tipEl) {
        tipEl.innerHTML = `
          <span style="color:var(--pink);">${err.message}</span><br><br>
          <button class="btn btn-ghost" style="margin-top:8px; font-size:0.85rem;" id="btn-retry">🔄 ลองใหม่</button>
          <button class="btn btn-ghost" style="margin-top:8px; font-size:0.85rem;" id="btn-restart-err">← กลับหน้าแรก</button>
        `;
        content.querySelector('#btn-retry')?.addEventListener('click', () => goTo(3));
        content.querySelector('#btn-restart-err')?.addEventListener('click', () => goTo(1));
      }
    }, 500);
  }
}

// ============================================================
//  BOOT
// ============================================================
initParticles();
goTo(1);
