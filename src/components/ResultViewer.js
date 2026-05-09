import { generateBackground, regenerateForRatio } from '../services/imageGen.js';
import { compositeImage } from '../services/compositor.js';

/**
 * ResultViewer — Step 4
 * Shows the final composited image with:
 *  - 9:16 / 16:9 ratio toggle (re-generates background)
 *  - Download button
 *  - Share button (Web Share API)
 *  - "Generate Again" and "Start Over"
 */
export class ResultViewer {
  constructor(container, { landmark, personBlob, backgroundUrl, seed, onRestart }) {
    this.container = container;
    this.landmark = landmark;
    this.personBlob = personBlob;
    this.seed = seed;
    this.onRestart = onRestart;

    this.currentRatio = 'portrait';
    this.backgroundUrls = { portrait: backgroundUrl, landscape: null };
    this.finalDataUrls = { portrait: null, landscape: null };
    this.isRegenerating = false;
  }

  async render() {
    this.container.innerHTML = `
      <div class="screen" id="screen-result" style="gap:0; padding-bottom:40px;">

        <!-- Header row -->
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
          <button class="btn btn-ghost" id="btn-restart" style="padding:10px 14px; min-height:40px; font-size:0.8rem;">✦ เริ่มใหม่</button>
          <div style="flex:1; text-align:center;">
            <p class="screen-title" style="margin-bottom:0; font-size:1rem;">${this.landmark.icon} ${this.landmark.theme}</p>
          </div>
          <button class="btn btn-icon" id="btn-regen" style="padding:10px 12px; min-height:40px;" title="Generate ใหม่">🎲</button>
        </div>

        <!-- Ratio Toggle -->
        <div class="ratio-toggle" style="margin-bottom:14px;" id="ratio-toggle">
          <button class="ratio-btn active" data-ratio="portrait" id="ratio-portrait">📱 9:16</button>
          <button class="ratio-btn"        data-ratio="landscape" id="ratio-landscape">🖥️ 16:9</button>
        </div>

        <!-- Image display -->
        <div id="result-image-wrapper" style="position:relative; border-radius:var(--radius-lg); overflow:hidden; background:var(--bg-card); display:flex; align-items:center; justify-content:center;">
          <div id="result-skeleton" style="width:100%; aspect-ratio:9/16; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:16px;">
            <div class="spinner"></div>
            <p style="font-size:0.8rem; color:var(--text-muted);">กำลัง Composite...</p>
          </div>
          <img id="result-img" style="display:none; width:100%; border-radius:inherit;" alt="HCU LandmarkLens result" />

          <!-- Holographic badge -->
          <div class="holo-badge" id="holo-badge" style="display:none; position:absolute; bottom:16px; left:16px; right:16px;">
            <div style="background:rgba(0,0,0,0.6); backdrop-filter:blur(12px); border:1px solid rgba(0,245,255,0.3); border-radius:var(--radius-md); padding:10px 14px; display:flex; align-items:center; gap:10px;">
              <span style="font-size:1.4rem;">${this.landmark.icon}</span>
              <div>
                <p style="font-family:var(--font-display); font-size:0.85rem; font-weight:700; color:var(--cyan); letter-spacing:0.05em;">${this.landmark.name}</p>
                <p style="font-size:0.7rem; color:var(--text-muted); letter-spacing:0.1em;">HCU LANDMARKLENS • AI GENERATED</p>
              </div>
              <div style="margin-left:auto; font-size:0.7rem; color:var(--purple); font-family:var(--font-display); letter-spacing:0.08em;">${this.landmark.theme.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <!-- Regenerating overlay -->
        <div id="regen-overlay" style="display:none; margin-top:12px; text-align:center;">
          <div class="spinner" style="margin:0 auto;"></div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;" id="regen-tip">กำลัง Generate background ใหม่...</p>
        </div>

        <!-- Action buttons -->
        <div id="result-actions" style="display:none; margin-top:16px; display:none; flex-direction:column; gap:10px;">
          <button class="btn btn-primary" id="btn-download">📥 ดาวน์โหลด</button>
          <button class="btn btn-icon" id="btn-share" style="background:var(--bg-card);">📤 แชร์</button>
        </div>
      </div>
    `;

    this._attachListeners();
    await this._composite('portrait');
  }

  async _composite(ratio) {
    const img = this.container.querySelector('#result-img');
    const skeleton = this.container.querySelector('#result-skeleton');
    const badge = this.container.querySelector('#holo-badge');
    const actions = this.container.querySelector('#result-actions');
    const wrapper = this.container.querySelector('#result-image-wrapper');

    // Show skeleton
    img.style.display = 'none';
    skeleton.style.display = 'flex';
    badge.style.display = 'none';
    actions.style.display = 'none';

    // Set wrapper aspect ratio
    wrapper.style.aspectRatio = ratio === 'portrait' ? '9/16' : '16/9';

    try {
      // Generate background for this ratio if not cached
      if (!this.backgroundUrls[ratio]) {
        const { imageUrl } = await regenerateForRatio(
          this.landmark,
          ratio,
          this.seed,
        );
        this.backgroundUrls[ratio] = imageUrl;
      }

      // Composite if not cached
      if (!this.finalDataUrls[ratio]) {
        const dataUrl = await compositeImage(
          this.personBlob,
          this.backgroundUrls[ratio],
          ratio,
          this.landmark.color,
        );
        this.finalDataUrls[ratio] = dataUrl;
      }

      img.src = this.finalDataUrls[ratio];
      img.style.display = 'block';
      skeleton.style.display = 'none';
      badge.style.display = 'block';
      actions.style.display = 'flex';
      img.classList.add('ratio-preview');
      setTimeout(() => img.classList.remove('ratio-preview'), 400);
    } catch (err) {
      console.error('[ResultViewer] composite error:', err);
      const msg = err.message || 'เกิดข้อผิดพลาดในการประมวลผลภาพ';
      skeleton.innerHTML = `
        <div style="text-align:center; padding:20px;">
          <p style="color:var(--pink); font-size:0.85rem; margin-bottom:12px;">${msg}</p>
          <button class="btn btn-ghost" id="btn-composite-retry" style="font-size:0.75rem;">🔄 ลองใหม่</button>
        </div>
      `;
      skeleton.querySelector('#btn-composite-retry')?.addEventListener('click', () => this._composite(ratio));
    }
  }

  async _regenerate() {
    if (this.isRegenerating) return;
    this.isRegenerating = true;

    // Clear caches
    this.seed = Math.floor(Math.random() * 1_000_000);
    this.backgroundUrls = { portrait: null, landscape: null };
    this.finalDataUrls = { portrait: null, landscape: null };

    const overlay = this.container.querySelector('#regen-overlay');
    const actions = this.container.querySelector('#result-actions');
    const img = this.container.querySelector('#result-img');
    const badge = this.container.querySelector('#holo-badge');

    img.style.display = 'none';
    badge.style.display = 'none';
    actions.style.display = 'none';
    overlay.style.display = 'block';

    try {
      await this._composite(this.currentRatio);
    } finally {
      overlay.style.display = 'none';
      this.isRegenerating = false;
    }
  }

  _download() {
    const dataUrl = this.finalDataUrls[this.currentRatio];
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `hcu-landmarklens-${this.landmark.id}-${this.currentRatio}-${Date.now()}.jpg`;
    a.click();
  }

  async _share() {
    const dataUrl = this.finalDataUrls[this.currentRatio];
    if (!dataUrl) return;

    if (navigator.share && navigator.canShare) {
      // Convert dataURL to File for Web Share API
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `hcu-landmarklens.jpg`, { type: 'image/jpeg' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `HCU LandmarkLens — ${this.landmark.name}`,
            text: `ถ่ายรูปกับ ${this.landmark.name} แล้ว AI พาไปโลก Sci-Fi! 🚀`,
            files: [file],
          });
          return;
        } catch { /* user cancelled */ }
      }
    }
    // Fallback: download
    this._download();
    this._showToast('คัดลอกลิงก์ไม่ได้ — ดาวน์โหลดแทน');
  }

  _showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  _attachListeners() {
    // Restart
    this.container.querySelector('#btn-restart').addEventListener('click', () => this.onRestart());

    // Ratio toggle
    this.container.querySelectorAll('.ratio-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (this.isRegenerating) return;
        const ratio = btn.dataset.ratio;
        if (ratio === this.currentRatio) return;

        this.currentRatio = ratio;
        this.container.querySelectorAll('.ratio-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        await this._composite(ratio);
      });
    });

    // Regenerate
    this.container.querySelector('#btn-regen').addEventListener('click', () => this._regenerate());

    // Download
    this.container.querySelector('#btn-download').addEventListener('click', () => this._download());

    // Share
    this.container.querySelector('#btn-share').addEventListener('click', () => this._share());
  }
}
