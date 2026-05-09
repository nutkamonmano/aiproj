/**
 * Composites a segmented person (transparent PNG blob) over a background image URL
 * and applies Sci-Fi overlay effects using HTML5 Canvas.
 *
 * @param {Blob}   personBlob       - Transparent PNG from segmentation
 * @param {string} backgroundUrl    - Blob URL from image generation
 * @param {'portrait'|'landscape'} ratio
 * @param {string} accentColor      - Landmark accent hex color (for neon rim)
 * @returns {Promise<string>}        - Data URL of final composited image
 */
export async function compositeImage(personBlob, backgroundUrl, ratio, accentColor = '#00f5ff') {
  const dimensions = {
    portrait: { width: 1080, height: 1920 },
    landscape: { width: 1920, height: 1080 },
  };
  const { width, height } = dimensions[ratio];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Draw background
  const bgImg = await loadImage(backgroundUrl);
  ctx.drawImage(bgImg, 0, 0, width, height);

  // 2. Draw person — centered, scaled to fill ~80% of height
  const personUrl = URL.createObjectURL(personBlob);
  try {
    const personImg = await loadImage(personUrl);
    const personAspect = personImg.width / personImg.height;
    const targetH = height * 0.85;
    const targetW = targetH * personAspect;
    const personX = (width - targetW) / 2;
    const personY = height - targetH - height * 0.02; // slight bottom margin

    // 3. Neon rim glow behind person
    applyNeonGlow(ctx, personImg, personX, personY, targetW, targetH, accentColor);

    // 4. Draw person on top
    ctx.drawImage(personImg, personX, personY, targetW, targetH);
  } finally {
    URL.revokeObjectURL(personUrl);
  }

  // 5. Scanlines overlay
  applyScanlines(ctx, width, height);

  // 6. Vignette
  applyVignette(ctx, width, height);

  // 7. Chromatic aberration tint (subtle)
  applyChromaticAberration(ctx, width, height);

  return canvas.toDataURL('image/jpeg', 0.93);
}

// --- Effect Helpers ---

function applyNeonGlow(ctx, img, x, y, w, h, color) {
  // Draw the person image several times with blur + color tint to simulate rim light
  const offCanvas = document.createElement('canvas');
  offCanvas.width = w + 60;
  offCanvas.height = h + 60;
  const offCtx = offCanvas.getContext('2d');
  offCtx.drawImage(img, 30, 30, w, h);

  // Colorize the mask
  offCtx.globalCompositeOperation = 'source-in';
  offCtx.fillStyle = color;
  offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);

  // Draw glow layers
  ctx.save();
  ctx.filter = 'blur(18px)';
  ctx.globalAlpha = 0.55;
  ctx.drawImage(offCanvas, x - 30, y - 30);
  ctx.filter = 'blur(8px)';
  ctx.globalAlpha = 0.4;
  ctx.drawImage(offCanvas, x - 30, y - 30);
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
  ctx.restore();
}

function applyScanlines(ctx, width, height) {
  ctx.save();
  ctx.globalAlpha = 0.07;
  for (let y = 0; y < height; y += 4) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, y, width, 2);
  }
  ctx.restore();
}

function applyVignette(ctx, width, height) {
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, height * 0.25,
    width / 2, height / 2, height * 0.85
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function applyChromaticAberration(ctx, width, height) {
  // Subtle red-channel shift at edges
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const shift = 2;
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % width;
    const edgeFactor = Math.abs((x / width) - 0.5) * 2; // 0 center, 1 edge
    if (edgeFactor > 0.6) {
      const srcIdx = Math.max(0, i - shift * 4);
      data[i] = data[srcIdx]; // shift red channel left
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

// --- Utilities ---

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Only use crossOrigin for non-blob URLs to avoid issues
    if (!src.startsWith('blob:') && !src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image resource. Please try again.`));
    img.src = src;
  });
}
