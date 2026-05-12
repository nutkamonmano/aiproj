(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`gate`,name:`ป้ายหน้ามหาวิทยาลัย`,nameEn:`University Gate`,icon:`🏛️`,color:`#00f5ff`,theme:`Quantum Portal`,fallback:`./assets/landscapes/gate.jpg`,prompt:`massive futuristic university gateway transformed into a quantum energy portal, swirling cyan and purple energy vortex, towering holographic pillars, neon light trails, epic sci-fi cinematic, photorealistic 8K, volumetric god rays, dark dramatic sky`},{id:`library`,name:`ตึกห้องสมุด`,nameEn:`Library Building`,icon:`📚`,color:`#4facfe`,theme:`Neural Archive`,fallback:`./assets/landscapes/library.png`,prompt:`infinite digital neural library interior, towering data server stacks glowing electric blue, millions of floating holographic books and data streams, tron aesthetic corridors, volumetric light shafts, futuristic AI knowledge hub, cinematic ultra wide angle, photorealistic 8K`},{id:`admin`,name:`ตึกอำนวยการ`,nameEn:`Admin Building`,icon:`🏢`,color:`#b24bff`,theme:`Cyberpunk HQ`,fallback:`https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1080&h=1920`,prompt:`futuristic megacorporation headquarters at night, rain-soaked cyberpunk city, massive holographic neon advertisements, blade runner 2049 aesthetic, reflective wet streets, flying vehicles, moody purple orange neon ambiance, cinematic photorealistic 8K`},{id:`nursing`,name:`คณะพยาบาลศาสตร์`,nameEn:`Faculty of Nursing`,icon:`🏥`,color:`#00d4ff`,theme:`MedStation 3000`,fallback:`https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=1080&h=1920`,prompt:`year 3000 orbital medical space station, floating holographic patient diagnostic displays, robotic surgical drones, sterile blue white neon environment, advanced life support systems, medical AI interface panels, epic sci-fi cinematic, photorealistic 8K`},{id:`pharmacy`,name:`คณะเภสัชศาสตร์`,nameEn:`Faculty of Pharmacy`,icon:`⚗️`,color:`#00ff9f`,theme:`Biopunk Lab`,fallback:`https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1080&h=1920`,prompt:`biopunk pharmaceutical research laboratory, glowing cyan and green vials floating in zero gravity, giant DNA double helix holograms, molecular structures swirling in the air, bioluminescent plants, green neon ambient lighting, ultra detailed cinematic 8K photorealistic`},{id:`science`,name:`คณะวิทยาศาสตร์ฯ`,nameEn:`Faculty of Science`,icon:`🚀`,color:`#ff6b9d`,theme:`Space Station`,fallback:`https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080&h=1920`,prompt:`interior of a massive orbital space station, panoramic floor-to-ceiling windows revealing star-filled cosmos and Earth below, zero gravity research laboratory with floating experiments, NASA futuristic white and silver design, astronauts in sleek suits, cinematic wide angle, photorealistic 8K`},{id:`health`,name:`คณะสาธารณสุขฯ`,nameEn:`Faculty of Public Health`,icon:`🌿`,color:`#43e97b`,theme:`Smart City 2100`,fallback:`https://images.unsplash.com/photo-1518005020250-eccdd5f1d954?auto=format&fit=crop&q=80&w=1080&h=1920`,prompt:`utopian smart eco city in year 2100, clean energy bio-domes with lush vegetation, flying medical drones delivering health supplies, clean air solar towers, golden sunrise over futuristic green city, photorealistic 8K cinematic`},{id:`arena`,name:`ลานกิจกรรมกลาง`,nameEn:`Central Activity Grounds`,icon:`⚡`,color:`#f093fb`,theme:`Holodeck Arena`,fallback:`https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1080&h=1920`,prompt:`massive holodeck arena with glowing energy grid floor, electric holographic audience of thousands, spectacular light show with laser beams, pink and purple electric atmosphere, esports championship stage of the future, cinematic dramatic lighting, photorealistic 8K`}],t=class{constructor(e,{onSelect:t}){this.container=e,this.onSelect=t,this.selected=null}render(){this.container.innerHTML=`
      <div class="screen" id="screen-picker">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:12px;">
          <h2 class="screen-title" style="margin-bottom:0; font-size:1.1rem;">เลือก Landmark</h2>
          <button class="btn-help" id="btn-help" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--cyan); background:transparent; color:var(--cyan); font-weight:bold; cursor:pointer;">?</button>
        </div>
        
        <p class="screen-subtitle">สัมผัส ม.หัวเฉียวฯ ในมิติใหม่แบบล้ำสมัย</p>

        <div class="landmark-grid">
          ${e.map((e,t)=>`
            <div class="landmark-card" data-id="${e.id}" style="--accent: ${e.color}; animation-delay: ${t*.05}s;">
              <div class="lm-icon">${e.icon}</div>
              <div class="lm-info">
                <div class="lm-name">${e.name}</div>
                <div class="lm-theme">${e.theme}</div>
              </div>
              <div class="lm-check">✓</div>
            </div>
          `).join(``)}
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
    `,this._injectGridStyles(),this._attachListeners()}_injectGridStyles(){if(document.getElementById(`lm-grid-styles`))return;let e=document.createElement(`style`);e.id=`lm-grid-styles`,e.textContent=`
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
    `,document.head.appendChild(e)}_attachListeners(){let t=this.container.querySelectorAll(`.landmark-card`),n=this.container.querySelector(`#btn-next-landmark`),r=this.container.querySelector(`#btn-help`),i=this.container.querySelector(`#btn-close-guide`),a=this.container.querySelector(`#guide-overlay`);t.forEach(r=>{r.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`selected`)),r.classList.add(`selected`),this.selected=e.find(e=>e.id===r.dataset.id),n.disabled=!1,r.style.transform=`scale(0.96)`,setTimeout(()=>r.style.transform=`scale(1)`,100)})}),n.addEventListener(`click`,()=>{this.selected&&this.onSelect(this.selected)}),r.addEventListener(`click`,()=>{a.style.display=`flex`}),i.addEventListener(`click`,()=>{a.style.display=`none`})}},n=class{constructor(e,{landmark:t,onCapture:n,onBack:r}){this.container=e,this.landmark=t,this.onCapture=n,this.onBack=r,this.stream=null,this.facingMode=`environment`,this.photoBlob=null}render(){this.container.innerHTML=`
      <div class="screen" id="screen-camera">
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
    `,this._startCamera(),this._attachListeners()}async _startCamera(){try{this.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:this.facingMode,width:{ideal:1080},height:{ideal:1440}},audio:!1});let e=this.container.querySelector(`#camera-video`);e.srcObject=this.stream,e.style.transform=this.facingMode===`user`?`scaleX(-1)`:`none`}catch(e){console.warn(`[camera] getUserMedia failed:`,e),this._showCameraError()}}_stopCamera(){this.stream&&=(this.stream.getTracks().forEach(e=>e.stop()),null)}_showCameraError(){let e=this.container.querySelector(`#camera-area`);e.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:12px; padding:24px; text-align:center;">
        <div style="font-size:3rem;">📷</div>
        <p style="color:var(--text-secondary); font-size:0.9rem;">ไม่สามารถเข้าถึงกล้องได้<br>กรุณาอัปโหลดรูปจากอัลบั้มแทน</p>
      </div>
    `}_captureFrame(){let e=this.container.querySelector(`#camera-video`),t=document.createElement(`canvas`),n=e.videoWidth||1080,r=e.videoHeight||1440;t.width=n,t.height=r;let i=t.getContext(`2d`);return this.facingMode===`user`&&(i.translate(n,0),i.scale(-1,1)),i.drawImage(e,0,0,n,r),t}_showPreview(e){let t=this.container.querySelector(`#camera-video`),n=this.container.querySelector(`#photo-preview`),r=this.container.querySelector(`#preview-img`);t.style.display=`none`,n.style.display=`block`,r.src=e;let i=this.container.querySelector(`#camera-controls`),a=this.container.querySelector(`#photo-actions`);i.style.display=`none`,a.style.display=`flex`}_retake(){let e=this.container.querySelector(`#camera-video`),t=this.container.querySelector(`#photo-preview`);e.style.display=`block`,t.style.display=`none`;let n=this.container.querySelector(`#camera-controls`),r=this.container.querySelector(`#photo-actions`);n.style.display=`flex`,r.style.display=`none`,this.photoBlob=null,this.stream||this._startCamera()}_attachListeners(){this.container.querySelector(`#btn-back-camera`).addEventListener(`click`,()=>{this._stopCamera(),this.onBack()}),this.container.querySelector(`#btn-capture`).addEventListener(`click`,()=>{this._captureFrame().toBlob(e=>{this.photoBlob=e,this._showPreview(URL.createObjectURL(e))},`image/jpeg`,.95)}),this.container.querySelector(`#btn-flip`).addEventListener(`click`,async()=>{this._stopCamera(),this.facingMode=this.facingMode===`user`?`environment`:`user`,await this._startCamera()}),this.container.querySelector(`#file-input`).addEventListener(`change`,e=>{let t=e.target.files[0];t&&(this.photoBlob=t,this._stopCamera(),this._showPreview(URL.createObjectURL(t)))}),this.container.querySelector(`#btn-use-photo`).addEventListener(`click`,()=>{this.photoBlob&&(this._stopCamera(),this.onCapture(this.photoBlob))}),this.container.querySelector(`#btn-retake`).addEventListener(`click`,()=>{this._retake()})}destroy(){this._stopCamera()}},r=class{constructor(e,{landmark:t}){this.container=e,this.landmark=t,this.tipInterval=null}render(){this.container.innerHTML=`
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
    `,this._startStatusRotation()}_startStatusRotation(){let e=[`ACCESSING HCU MAINFRAME...`,`CALIBRATING QUANTUM VORTEX...`,`INJECTING NEON LIGHT TRAILS...`,`SYNTHESIZING ATMOSPHERIC LAYERS...`,`RENDERING HOLOGRAPHIC PILLARS...`,`STABILIZING ENERGY CORE...`,`ENHANCING CINEMATIC LIGHTING...`,`BYPASSING PHYSICAL REALITY...`,`MAPPING LANDMARK GEOMETRY...`,`FINALIZING CYBERPUNK AESTHETIC...`],t=0;this.tipInterval=setInterval(()=>{let n=this.container.querySelector(`#processing-tip`);n&&(n.style.opacity=`0`,setTimeout(()=>{n.textContent=e[t%e.length],n.style.opacity=`1`,t++},300))},2800)}destroy(){this.tipInterval&&clearInterval(this.tipInterval)}setProgress(e){let t=this.container.querySelector(`#processing-bar`),n=this.container.querySelector(`#processing-pct`);t&&(t.style.width=`${e}%`),n&&(n.textContent=`${Math.round(e)}%`)}setStepActive(e){let t=this.container.querySelector(`#status-${e}`);t&&(t.style.borderColor=`var(--cyan)`,t.style.background=`rgba(0, 245, 255, 0.05)`,t.querySelector(`.status-bullet`).style.color=`var(--cyan)`,t.querySelector(`.status-bullet`).classList.add(`animate-pulse`),t.querySelector(`.status-text`).style.color=`var(--text-primary)`)}setStepDone(e){let t=this.container.querySelector(`#status-${e}`);t&&(t.style.borderColor=`var(--purple)`,t.style.background=`rgba(178, 75, 255, 0.05)`,t.querySelector(`.status-bullet`).style.color=`var(--purple)`,t.querySelector(`.status-bullet`).textContent=`✓`,t.querySelector(`.status-bullet`).classList.remove(`animate-pulse`),t.querySelector(`.status-text`).style.color=`var(--purple)`)}setStepError(e){let t=this.container.querySelector(`#status-${e}`);t&&(t.style.borderColor=`var(--pink)`,t.style.background=`rgba(255, 100, 150, 0.05)`,t.querySelector(`.status-bullet`).style.color=`var(--pink)`,t.querySelector(`.status-bullet`).textContent=`✕`,t.querySelector(`.status-text`).style.color=`var(--pink)`)}setTip(e){let t=this.container.querySelector(`#processing-tip`);t&&(t.textContent=e.toUpperCase())}},i=`https://images.weserv.nl/?url=`,a=`https://image.pollinations.ai/prompt`,o=`, ultra detailed, cinematic lighting, professional photography, 8K resolution, photorealistic, masterpiece, award winning`,s={portrait:{width:1080,height:1920},landscape:{width:1920,height:1080}};async function c(e,t=`portrait`,n=null,r){let c=n??Math.floor(Math.random()*1e6),{width:u,height:d}=s[t],f=`${a}/${encodeURIComponent(e.prompt+o)}?model=flux&width=${u}&height=${d}&seed=${c}&enhance=true&nologo=true&private=true`,p=`${i}${encodeURIComponent(f)}`;try{let e=await l(p,3,4e4);return r&&r(e),{imageUrl:e,seed:c}}catch{return console.warn(`[imageGen] AI failed, using offline fallback:`,e.fallback),r&&r(e.fallback),{imageUrl:e.fallback,seed:c,isFallback:!0}}}async function l(e,t,n){let r=``;for(let i=1;i<=t;i++)try{let t=new AbortController,r=setTimeout(()=>t.abort(),n),i=await fetch(e,{signal:t.signal});if(clearTimeout(r),!i.ok)throw Error(`HTTP ${i.status}`);let a=i.headers.get(`content-type`);if(a&&!a.startsWith(`image/`))throw Error(`AI Provider returned an invalid response (not an image).`);let o=await i.blob();return URL.createObjectURL(o)}catch(n){if(r=n.name===`AbortError`?`Timeout`:n.message,console.warn(`[imageGen] Attempt ${i} failed:`,r),i===t)throw Error(`Background generation failed: ${r}. Please try again.`);e.includes(`model%3Dflux`)&&(e=e.replace(`model%3Dflux`,`model%3Dturbo`)),e=e.replace(/seed%3D\d+/,`seed%3D${Math.floor(Math.random()*1e6)}`),await u(1500)}}function u(e){return new Promise(t=>setTimeout(t,e))}function d(e,t,n){return c(e,t,n)}async function f(e,t,n,r=`#00f5ff`){let{width:i,height:a}={portrait:{width:1080,height:1920},landscape:{width:1920,height:1080}}[n],o=document.createElement(`canvas`);o.width=i,o.height=a;let s=o.getContext(`2d`),c=await _(t);s.drawImage(c,0,0,i,a);let l=URL.createObjectURL(e);try{let e=await _(l),t=e.width/e.height,n=a*.85,o=n*t,c=(i-o)/2,u=a-n-a*.02;p(s,e,c,u,o,n,r),s.drawImage(e,c,u,o,n)}finally{URL.revokeObjectURL(l)}return m(s,i,a),h(s,i,a),g(s,i,a),o.toDataURL(`image/jpeg`,.93)}function p(e,t,n,r,i,a,o){let s=document.createElement(`canvas`);s.width=i+60,s.height=a+60;let c=s.getContext(`2d`);c.drawImage(t,30,30,i,a),c.globalCompositeOperation=`source-in`,c.fillStyle=o,c.fillRect(0,0,s.width,s.height),e.save(),e.filter=`blur(18px)`,e.globalAlpha=.55,e.drawImage(s,n-30,r-30),e.filter=`blur(8px)`,e.globalAlpha=.4,e.drawImage(s,n-30,r-30),e.filter=`none`,e.globalAlpha=1,e.restore()}function m(e,t,n){e.save(),e.globalAlpha=.07;for(let r=0;r<n;r+=4)e.fillStyle=`#000000`,e.fillRect(0,r,t,2);e.restore()}function h(e,t,n){let r=e.createRadialGradient(t/2,n/2,n*.25,t/2,n/2,n*.85);r.addColorStop(0,`rgba(0,0,0,0)`),r.addColorStop(1,`rgba(0,0,0,0.6)`),e.fillStyle=r,e.fillRect(0,0,t,n)}function g(e,t,n){let r=e.getImageData(0,0,t,n),i=r.data;for(let e=0;e<i.length;e+=4){let n=e/4%t;Math.abs(n/t-.5)*2>.6&&(i[e]=i[Math.max(0,e-8)])}e.putImageData(r,0,0)}function _(e){return new Promise((t,n)=>{let r=new Image;!e.startsWith(`blob:`)&&!e.startsWith(`data:`)&&(r.crossOrigin=`anonymous`),r.onload=()=>t(r),r.onerror=()=>n(Error(`Failed to load image resource. Please try again.`)),r.src=e})}var v=class{constructor(e,{landmark:t,personBlob:n,backgroundUrl:r,seed:i,onRestart:a}){this.container=e,this.landmark=t,this.personBlob=n,this.seed=i,this.onRestart=a,this.currentRatio=`portrait`,this.backgroundUrls={portrait:r,landscape:null},this.finalDataUrls={portrait:null,landscape:null},this.isRegenerating=!1}async render(){this.container.innerHTML=`
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
    `,this._attachListeners(),await this._composite(`portrait`)}async _composite(e){let t=this.container.querySelector(`#result-img`),n=this.container.querySelector(`#result-skeleton`),r=this.container.querySelector(`#holo-badge`),i=this.container.querySelector(`#result-actions`),a=this.container.querySelector(`#result-image-wrapper`);t.style.display=`none`,n.style.display=`flex`,r.style.display=`none`,i.style.display=`none`,a.style.aspectRatio=e===`portrait`?`9/16`:`16/9`;try{if(!this.backgroundUrls[e]){let{imageUrl:t}=await d(this.landmark,e,this.seed);this.backgroundUrls[e]=t}if(!this.finalDataUrls[e]){let t=await f(this.personBlob,this.backgroundUrls[e],e,this.landmark.color);this.finalDataUrls[e]=t}t.src=this.finalDataUrls[e],t.style.display=`block`,n.style.display=`none`,r.style.display=`block`,i.style.display=`flex`,t.classList.add(`ratio-preview`),setTimeout(()=>t.classList.remove(`ratio-preview`),400)}catch(t){console.error(`[ResultViewer] composite error:`,t),n.innerHTML=`
        <div style="text-align:center; padding:20px;">
          <p style="color:var(--pink); font-size:0.85rem; margin-bottom:12px;">${t.message||`เกิดข้อผิดพลาดในการประมวลผลภาพ`}</p>
          <button class="btn btn-ghost" id="btn-composite-retry" style="font-size:0.75rem;">🔄 ลองใหม่</button>
        </div>
      `,n.querySelector(`#btn-composite-retry`)?.addEventListener(`click`,()=>this._composite(e))}}async _regenerate(){if(this.isRegenerating)return;this.isRegenerating=!0,this.seed=Math.floor(Math.random()*1e6),this.backgroundUrls={portrait:null,landscape:null},this.finalDataUrls={portrait:null,landscape:null};let e=this.container.querySelector(`#regen-overlay`),t=this.container.querySelector(`#result-actions`),n=this.container.querySelector(`#result-img`),r=this.container.querySelector(`#holo-badge`);n.style.display=`none`,r.style.display=`none`,t.style.display=`none`,e.style.display=`block`;try{await this._composite(this.currentRatio)}finally{e.style.display=`none`,this.isRegenerating=!1}}_download(){let e=this.finalDataUrls[this.currentRatio];if(!e)return;let t=document.createElement(`a`);t.href=e,t.download=`hcu-landmarklens-${this.landmark.id}-${this.currentRatio}-${Date.now()}.jpg`,t.click()}async _share(){let e=this.finalDataUrls[this.currentRatio];if(e){if(navigator.share&&navigator.canShare){let t=await(await fetch(e)).blob(),n=new File([t],`hcu-landmarklens.jpg`,{type:`image/jpeg`});if(navigator.canShare({files:[n]}))try{await navigator.share({title:`HCU LandmarkLens — ${this.landmark.name}`,text:`ถ่ายรูปกับ ${this.landmark.name} แล้ว AI พาไปโลก Sci-Fi! 🚀`,files:[n]});return}catch{}}this._download(),this._showToast(`คัดลอกลิงก์ไม่ได้ — ดาวน์โหลดแทน`)}}_showToast(e){let t=document.createElement(`div`);t.className=`toast`,t.textContent=e,document.body.appendChild(t),requestAnimationFrame(()=>t.classList.add(`show`)),setTimeout(()=>{t.classList.remove(`show`),setTimeout(()=>t.remove(),400)},2500)}_attachListeners(){this.container.querySelector(`#btn-restart`).addEventListener(`click`,()=>this.onRestart()),this.container.querySelectorAll(`.ratio-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{if(this.isRegenerating)return;let t=e.dataset.ratio;t!==this.currentRatio&&(this.currentRatio=t,this.container.querySelectorAll(`.ratio-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),await this._composite(t))})}),this.container.querySelector(`#btn-regen`).addEventListener(`click`,()=>this._regenerate()),this.container.querySelector(`#btn-download`).addEventListener(`click`,()=>this._download()),this.container.querySelector(`#btn-share`).addEventListener(`click`,()=>this._share())}},y=`modulepreload`,b=function(e){return`/aiproj/`+e},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=b(t,n),t in x)return;x[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:y,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C;async function w(e,t){C||=(await S(async()=>{let{removeBackground:e}=await import(`./dist-iN7xzB6N.js`);return{removeBackground:e}},[])).removeBackground;let n={model:`small`,publicPath:`https://static.img.ly/packages/@imgly/background-removal-data/1.4.5/dist/`,output:{format:`image/png`,quality:1,type:`foreground`},progress:(e,n,r)=>{t&&r>0&&t(n/r)}};try{return await C(e,n)}catch(e){throw console.error(`[segmentation] Detailed Error:`,e),Error(`Background removal failed: ${e.message||`Unknown error`}`)}}console.log(`HCU LandmarkLens v1.1.0 - Initializing...`);var T={step:1,landmark:null,photoBlob:null};document.getElementById(`app`);var E=document.getElementById(`step-dots`);function D(){let e=document.getElementById(`particle-canvas`),t=e.getContext(`2d`),n=[],r,i;function a(){r=e.width=window.innerWidth,i=e.height=window.innerHeight}class o{constructor(){this.reset()}reset(){this.x=Math.random()*r,this.y=Math.random()*i,this.r=Math.random()*1.5+.3,this.vx=(Math.random()-.5)*.3,this.vy=(Math.random()-.5)*.3,this.alpha=Math.random()*.6+.1,this.color=Math.random()>.5?`#00f5ff`:`#b24bff`}update(){this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>r||this.y<0||this.y>i)&&this.reset()}draw(){t.globalAlpha=this.alpha,t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.r,0,Math.PI*2),t.fill()}}a(),window.addEventListener(`resize`,a);for(let e=0;e<120;e++)n.push(new o);function s(){t.clearRect(0,0,r,i),n.forEach(e=>{e.update(),e.draw()}),t.globalAlpha=1,requestAnimationFrame(s)}s()}function O(e){E&&(E.innerHTML=[1,2,3,4].map(t=>`<div class="step-dot ${t===e?`active`:t<e?`done`:``}"></div>`).join(``))}var k=document.getElementById(`content`),A=null;function j(e){switch(T.step=e,O(e),A&&=(A.destroy(),null),e){case 1:M();break;case 2:N();break;case 3:P();break;case 4:break}}function M(){new t(k,{onSelect(e){T.landmark=e,j(2)}}).render()}function N(){let e=new n(k,{landmark:T.landmark,onCapture(e){T.photoBlob=e,j(3)},onBack(){j(1)}});e.render(),A=e}async function P(){let e=new r(k,{landmark:T.landmark,onComplete(){},onError(){}});e.render();let t,n,i;try{e.setStepActive(`seg`),t=await w(T.photoBlob,t=>{e.setProgress(t*40)}),e.setStepDone(`seg`),e.setProgress(40),e.setStepActive(`gen`),e.setTip(`Pollinations AI Flux กำลังสร้างโลก Sci-Fi... (~15-20 วิ)`);let r=40,a=setInterval(()=>{r<84&&(r+=.5,e.setProgress(r))},300),o=await c(T.landmark,`portrait`);n=o.imageUrl,i=o.seed,clearInterval(a),e.setStepDone(`gen`),e.setProgress(85),e.setStepActive(`comp`),e.setTip(`กำลังใส่ Sci-Fi Effects... เกือบเสร็จแล้ว!`),e.setProgress(92),await new Promise(e=>setTimeout(e,300)),e.setStepDone(`comp`),e.setProgress(100),await new Promise(e=>setTimeout(e,400)),O(4),await new v(k,{landmark:T.landmark,personBlob:t,backgroundUrl:n,seed:i,onRestart(){j(1)}}).render()}catch(r){console.error(`[app] Processing error:`,r),e.setStepError(t?n?`comp`:`gen`:`seg`),e.setTip(`เกิดข้อผิดพลาด: `+r.message),setTimeout(()=>{let e=k.querySelector(`#processing-tip`);e&&(e.innerHTML=`
          <span style="color:var(--pink);">${r.message}</span><br><br>
          <button class="btn btn-ghost" style="margin-top:8px; font-size:0.85rem;" id="btn-retry">🔄 ลองใหม่</button>
          <button class="btn btn-ghost" style="margin-top:8px; font-size:0.85rem;" id="btn-restart-err">← กลับหน้าแรก</button>
        `,k.querySelector(`#btn-retry`)?.addEventListener(`click`,()=>j(3)),k.querySelector(`#btn-restart-err`)?.addEventListener(`click`,()=>j(1)))},500)}}D(),j(1);export{S as t};