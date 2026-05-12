/**
 * CameraCapture — Step 2
 * Handles camera stream (front/back) and file upload.
 * Calls onCapture(imageBlob) with the captured photo.
 */
export class CameraCapture {
  constructor(container, { landmark, onCapture, onBack }) {
    this.container = container;
    this.landmark = landmark;
    this.onCapture = onCapture;
    this.onBack = onBack;
    this.stream = null;
    this.facingMode = 'environment'; // start with back camera
    this.photoBlob = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="screen" id="screen-camera" style="height: 100%; max-height: 100%; overflow: hidden; display: flex; flex-direction: column;">
        <div style="display:flex; align-items:center; justify-content: space-between; gap:10px; margin-bottom:12px; flex-shrink: 0;">
          <button class="btn btn-ghost" id="btn-back-camera" style="padding:8px 12px; min-height:36px; font-size:0.8rem; flex-shrink:0;">← กลับ</button>
          <div style="text-align: right; min-width: 0;">
            <p class="screen-title" style="margin-bottom:0; font-size:1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${this.landmark.icon} ${this.landmark.name}</p>
            <p style="font-size:0.7rem; color:var(--text-muted); letter-spacing:0.05em;">${this.landmark.theme.toUpperCase()}</p>
          </div>
        </div>

        <!-- Camera or preview -->
        <div id="camera-area" class="camera-frame scan-sweep neon-border" style="position:relative; flex: 1; min-height: 0; flex-shrink: 1;">
          <video id="camera-video" autoplay playsinline muted style="width:100%; height:100%; object-fit:cover;"></video>
          <canvas id="capture-canvas" style="display:none; width:100%; height:100%; object-fit:cover; border-radius: inherit;"></canvas>
          <div id="photo-preview" style="display:none; width:100%; height:100%;">
            <img id="preview-img" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;" />
          </div>
          <!-- Corner grid overlay -->
          <div style="position:absolute; inset:0; pointer-events:none; background-image: linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px); background-size: 40px 40px; border-radius:inherit;"></div>
        </div>

        <!-- Controls -->
        <div id="camera-controls" style="margin-top:12px; display:flex; flex-direction:column; align-items:center; gap:10px; flex-shrink: 0;">
          <div style="display:flex; align-items:center; gap:24px;">
            <label class="btn btn-icon" style="cursor:pointer; width:48px; height:48px; padding:0; display:flex; align-items:center; justify-content:center;" title="อัปโหลดรูป">
              🖼️
              <input type="file" id="file-input" accept="image/*" style="display:none;" />
            </label>
            <button class="capture-btn" id="btn-capture" title="ถ่ายรูป"></button>
            <button class="btn btn-icon" id="btn-flip" style="width:48px; height:48px; padding:0; display:flex; align-items:center; justify-content:center;" title="สลับกล้อง">🔄</button>
          </div>
          <p id="camera-hint" style="font-size:0.75rem; color:var(--text-muted); text-align:center;">กดปุ่มเพื่อถ่ายรูป หรือเลือกรูปจากอัลบั้ม</p>
        </div>

        <!-- Retake / Use Photo -->
        <div id="photo-actions" style="display:none; margin-top:12px; flex-direction:column; gap:8px; flex-shrink: 0;">
          <button class="btn btn-primary" id="btn-use-photo" style="min-height:48px;">ใช้รูปนี้ ✨</button>
          <button class="btn btn-ghost" id="btn-retake" style="min-height:44px;">ถ่ายใหม่</button>
        </div>
      </div>
    `;

    this._startCamera();
    this._attachListeners();
  }

  async _startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.facingMode, width: { ideal: 1080 }, height: { ideal: 1440 } },
        audio: false,
      });
      const video = this.container.querySelector('#camera-video');
      video.srcObject = this.stream;
      // Mirror only front camera
      video.style.transform = this.facingMode === 'user' ? 'scaleX(-1)' : 'none';
    } catch (err) {
      console.warn('[camera] getUserMedia failed:', err);
      this._showCameraError();
    }
  }

  _stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
  }

  _showCameraError() {
    const area = this.container.querySelector('#camera-area');
    area.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:12px; padding:24px; text-align:center;">
        <div style="font-size:3rem;">📷</div>
        <p style="color:var(--text-secondary); font-size:0.9rem;">ไม่สามารถเข้าถึงกล้องได้<br>กรุณาอัปโหลดรูปจากอัลบั้มแทน</p>
      </div>
    `;
  }

  _captureFrame() {
    const video = this.container.querySelector('#camera-video');
    const canvas = document.createElement('canvas');
    const w = video.videoWidth || 1080;
    const h = video.videoHeight || 1440;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (this.facingMode === 'user') {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
  }

  _showPreview(src) {
    const video = this.container.querySelector('#camera-video');
    const preview = this.container.querySelector('#photo-preview');
    const img = this.container.querySelector('#preview-img');
    video.style.display = 'none';
    preview.style.display = 'block';
    img.src = src;

    const controls = this.container.querySelector('#camera-controls');
    const actions = this.container.querySelector('#photo-actions');
    controls.style.display = 'none';
    actions.style.display = 'flex';
  }

  _retake() {
    const video = this.container.querySelector('#camera-video');
    const preview = this.container.querySelector('#photo-preview');
    video.style.display = 'block';
    preview.style.display = 'none';

    const controls = this.container.querySelector('#camera-controls');
    const actions = this.container.querySelector('#photo-actions');
    controls.style.display = 'flex';
    actions.style.display = 'none';

    this.photoBlob = null;
    if (!this.stream) this._startCamera();
  }

  _attachListeners() {
    // Back
    this.container.querySelector('#btn-back-camera').addEventListener('click', () => {
      this._stopCamera();
      this.onBack();
    });

    // Capture
    this.container.querySelector('#btn-capture').addEventListener('click', () => {
      const canvas = this._captureFrame();
      canvas.toBlob((blob) => {
        this.photoBlob = blob;
        this._showPreview(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.95);
    });

    // Flip camera
    this.container.querySelector('#btn-flip').addEventListener('click', async () => {
      this._stopCamera();
      this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
      await this._startCamera();
    });

    // File upload
    this.container.querySelector('#file-input').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      this.photoBlob = file;
      this._stopCamera();
      this._showPreview(URL.createObjectURL(file));
    });

    // Use photo
    this.container.querySelector('#btn-use-photo').addEventListener('click', () => {
      if (this.photoBlob) {
        this._stopCamera();
        this.onCapture(this.photoBlob);
      }
    });

    // Retake
    this.container.querySelector('#btn-retake').addEventListener('click', () => {
      this._retake();
    });
  }

  destroy() {
    this._stopCamera();
  }
}
