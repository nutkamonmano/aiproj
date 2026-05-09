import { landmarks } from '../data/landmarks.js';

/**
 * LandmarkPicker — Step 1
 * Renders an 8-card grid for selecting a HCU landmark.
 * Calls onSelect(landmark) when the user picks one.
 */
export class LandmarkPicker {
  constructor(container, { onSelect }) {
    this.container = container;
    this.onSelect = onSelect;
    this.selected = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="screen" id="screen-picker">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:12px;">
          <h2 class="screen-title" style="margin-bottom:0; font-size:1.1rem;">เลือก Landmark</h2>
          <button class="btn-help" id="btn-help" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--cyan); background:transparent; color:var(--cyan); font-weight:bold; cursor:pointer;">?</button>
        </div>
        
        <p class="screen-subtitle">สัมผัส ม.หัวเฉียวฯ ในมิติใหม่แบบล้ำสมัย</p>

        <div class="landmark-grid">
          ${landmarks.map((l, i) => `
            <div class="landmark-card" data-id="${l.id}" style="--accent: ${l.color}; animation-delay: ${i * 0.05}s;">
              <div class="lm-icon">${l.icon}</div>
              <div class="lm-info">
                <div class="lm-name">${l.name}</div>
                <div class="lm-theme">${l.theme}</div>
              </div>
              <div class="lm-check">✓</div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:24px; width:100%;">
          <button class="btn btn-primary" id="btn-next-landmark" disabled>
            <span>เริ่มถ่ายรูปเลย</span>
            <span style="margin-left:8px;">→</span>
          </button>
        </div>

        <!-- Guide Overlay -->
        <div id="guide-overlay" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:1000; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(4px);">
          <div class="modal-content glass" style="background:var(--bg-card); padding:24px; border-radius:16px; border:1px solid var(--border); max-width:340px; width:100%; text-align:center;">
            <h3 style="color:var(--cyan); margin-bottom:16px; font-family:var(--font-display); letter-spacing:0.05em;">HOW IT WORKS</h3>
            <ul style="text-align:left; font-size:0.85rem; line-height:1.7; color:var(--text-muted); padding-left:10px; list-style:none;">
              <li style="margin-bottom:10px;">📍 <b>เลือกสถานที่</b> ที่คุณต้องการ</li>
              <li style="margin-bottom:10px;">📸 <b>ถ่ายรูป</b> ให้เห็นตัวคนชัดเจน</li>
              <li style="margin-bottom:10px;">✨ <b>AI จะลบพื้นหลัง</b> และสร้างโลกใหม่ให้คุณ</li>
              <li>📱 <b>ดาวน์โหลด/แชร์</b> ได้ทั้งแนวตั้งและแนวนอน</li>
            </ul>
            <button class="btn btn-primary" id="btn-close-guide" style="margin-top:24px; width:100%; font-size:0.8rem;">เข้าใจแล้ว</button>
          </div>
        </div>
      </div>
    `;
    this._injectGridStyles();
    this._attachListeners();
  }

  _injectGridStyles() {
    if (document.getElementById('lm-grid-styles')) return;
    const style = document.createElement('style');
    style.id = 'lm-grid-styles';
    style.textContent = `
      .landmark-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        width: 100%;
      }
      .landmark-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 14px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        overflow: hidden;
        transition: all 0.2s ease;
        animation: slideUp 0.4s ease both;
      }
      .landmark-card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--accent, #00f5ff) 0%, transparent 80%);
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .landmark-card.selected {
        border-color: var(--accent, #00f5ff);
        background: rgba(255,255,255,0.03);
        box-shadow: 0 0 15px color-mix(in srgb, var(--accent, #00f5ff) 30%, transparent);
      }
      .landmark-card.selected::after { opacity: 0.1; }
      
      .lm-icon {
        font-size: 1.6rem;
        flex-shrink: 0;
        line-height: 1;
        z-index: 1;
      }
      .lm-info { flex: 1; min-width: 0; z-index: 1; }
      .lm-name {
        font-family: var(--font-display);
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-primary);
        line-height: 1.2;
        margin-bottom: 2px;
      }
      .lm-theme {
        font-size: 0.65rem;
        color: var(--text-muted);
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      .lm-check {
        font-size: 0.8rem;
        color: var(--accent, #00f5ff);
        opacity: 0;
        transition: opacity 0.2s;
        flex-shrink: 0;
        z-index: 1;
      }
      .landmark-card.selected .lm-check { opacity: 1; }
      .landmark-card.selected .lm-name  { color: var(--accent, #00f5ff); }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  _attachListeners() {
    const cards = this.container.querySelectorAll('.landmark-card');
    const nextBtn = this.container.querySelector('#btn-next-landmark');
    const helpBtn = this.container.querySelector('#btn-help');
    const closeGuideBtn = this.container.querySelector('#btn-close-guide');
    const guideOverlay = this.container.querySelector('#guide-overlay');

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        cards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selected = landmarks.find((lm) => lm.id === card.dataset.id);
        nextBtn.disabled = false;
        
        // Visual feedback
        card.style.transform = 'scale(0.96)';
        setTimeout(() => card.style.transform = 'scale(1)', 100);
      });
    });

    nextBtn.addEventListener('click', () => {
      if (this.selected) {
        this.onSelect(this.selected);
      }
    });

    helpBtn.addEventListener('click', () => {
      guideOverlay.style.display = 'flex';
    });

    closeGuideBtn.addEventListener('click', () => {
      guideOverlay.style.display = 'none';
    });
  }
}
