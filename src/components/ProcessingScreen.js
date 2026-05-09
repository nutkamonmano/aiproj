/**
 * ProcessingScreen — Step 3
 * Displays real-time progress of segmentation, image generation, and compositing.
 */
export class ProcessingScreen {
  constructor(container, { landmark }) {
    this.container = container;
    this.landmark = landmark;
    this.tipInterval = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="screen" id="screen-processing" style="align-items:center; justify-content:center; text-align:center;">
        <div class="processing-header" style="margin-bottom:32px;">
          <div class="processing-icon animate-float" style="font-size:4.5rem; line-height:1; margin-bottom:16px;">${this.landmark.icon}</div>
          <h2 class="screen-title" style="margin-bottom:6px; font-size:1.2rem; letter-spacing:0.15em;">${this.landmark.theme.toUpperCase()}</h2>
          <p style="font-size:0.8rem; color:var(--text-muted); opacity:0.8;">${this.landmark.name} → NEURAL RECONSTRUCTION</p>
        </div>

        <div class="progress-container" style="width:100%; max-width:280px; margin-bottom:40px;">
          <div style="height:4px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; position:relative;">
            <div class="progress-bar" id="processing-bar" style="width:0%; height:100%; background:linear-gradient(90deg, var(--cyan), var(--purple)); border-radius:inherit; transition:width 0.4s ease;"></div>
          </div>
          <div class="progress-label" id="processing-pct" style="font-size:0.85rem; font-family:var(--font-display); color:var(--cyan); margin-top:12px; font-weight:bold;">0%</div>
        </div>

        <div class="status-list" style="width:100%; max-width:320px; display:flex; flex-direction:column; gap:12px;">
          <div class="status-item waiting" id="status-seg" style="display:flex; align-items:center; gap:12px; font-size:0.85rem; padding:12px 16px; background:rgba(255,255,255,0.02); border:1px solid transparent; border-radius:10px; transition:all 0.3s;">
            <span class="status-bullet" style="color:var(--text-muted);">●</span>
            <span class="status-text" style="color:var(--text-muted);">IMAGE SEGMENTATION</span>
          </div>
          <div class="status-item waiting" id="status-gen" style="display:flex; align-items:center; gap:12px; font-size:0.85rem; padding:12px 16px; background:rgba(255,255,255,0.02); border:1px solid transparent; border-radius:10px; transition:all 0.3s;">
            <span class="status-bullet" style="color:var(--text-muted);">●</span>
            <span class="status-text" style="color:var(--text-muted);">ENVIRONMENT GENERATION</span>
          </div>
          <div class="status-item waiting" id="status-comp" style="display:flex; align-items:center; gap:12px; font-size:0.85rem; padding:12px 16px; background:rgba(255,255,255,0.02); border:1px solid transparent; border-radius:10px; transition:all 0.3s;">
            <span class="status-bullet" style="color:var(--text-muted);">●</span>
            <span class="status-text" style="color:var(--text-muted);">SCI-FI COMPOSITING</span>
          </div>
        </div>

        <div class="processing-tip" id="processing-tip" style="margin-top:40px; font-size:0.75rem; color:var(--cyan); opacity:0.6; font-family:var(--font-display); letter-spacing:0.05em; min-height:1.2em; transition:opacity 0.3s;">
          INITIALIZING NEURAL ENGINE...
        </div>
      </div>
    `;

    this._startStatusRotation();
  }

  _startStatusRotation() {
    const tips = [
      "ACCESSING HCU MAINFRAME...",
      "CALIBRATING QUANTUM VORTEX...",
      "INJECTING NEON LIGHT TRAILS...",
      "SYNTHESIZING ATMOSPHERIC LAYERS...",
      "RENDERING HOLOGRAPHIC PILLARS...",
      "STABILIZING ENERGY CORE...",
      "ENHANCING CINEMATIC LIGHTING...",
      "BYPASSING PHYSICAL REALITY...",
      "MAPPING LANDMARK GEOMETRY...",
      "FINALIZING CYBERPUNK AESTHETIC..."
    ];
    let i = 0;
    this.tipInterval = setInterval(() => {
      const tipEl = this.container.querySelector('#processing-tip');
      if (tipEl) {
        tipEl.style.opacity = '0';
        setTimeout(() => {
          tipEl.textContent = tips[i % tips.length];
          tipEl.style.opacity = '1';
          i++;
        }, 300);
      }
    }, 2800);
  }

  destroy() {
    if (this.tipInterval) clearInterval(this.tipInterval);
  }

  setProgress(pct) {
    const bar = this.container.querySelector('#processing-bar');
    const label = this.container.querySelector('#processing-pct');
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `${Math.round(pct)}%`;
  }

  setStepActive(id) {
    const item = this.container.querySelector(`#status-${id}`);
    if (item) {
      item.style.borderColor = 'var(--cyan)';
      item.style.background = 'rgba(0, 245, 255, 0.05)';
      item.querySelector('.status-bullet').style.color = 'var(--cyan)';
      item.querySelector('.status-bullet').classList.add('animate-pulse');
      item.querySelector('.status-text').style.color = 'var(--text-primary)';
    }
  }

  setStepDone(id) {
    const item = this.container.querySelector(`#status-${id}`);
    if (item) {
      item.style.borderColor = 'var(--purple)';
      item.style.background = 'rgba(178, 75, 255, 0.05)';
      item.querySelector('.status-bullet').style.color = 'var(--purple)';
      item.querySelector('.status-bullet').textContent = '✓';
      item.querySelector('.status-bullet').classList.remove('animate-pulse');
      item.querySelector('.status-text').style.color = 'var(--purple)';
    }
  }

  setStepError(id) {
    const item = this.container.querySelector(`#status-${id}`);
    if (item) {
      item.style.borderColor = 'var(--pink)';
      item.style.background = 'rgba(255, 100, 150, 0.05)';
      item.querySelector('.status-bullet').style.color = 'var(--pink)';
      item.querySelector('.status-bullet').textContent = '✕';
      item.querySelector('.status-text').style.color = 'var(--pink)';
    }
  }

  setTip(text) {
    const tipEl = this.container.querySelector('#processing-tip');
    if (tipEl) tipEl.textContent = text.toUpperCase();
  }
}
