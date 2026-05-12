import Human from '@vladmandic/human';

const human = new Human({
  modelBasePath: 'https://vladmandic.github.io/human/models', // CDN ที่ถูกต้อง
  cacheModels: true,
  segmentation: {
    enabled: true,
    return: true,
    device: 'webgl',
    smoothSegmentation: true,
    maskBlur: 5,
    useWebWorker: false,
  },
});

let isLoaded = false;

/**
 * Removes the background from an image file/blob and returns a transparent PNG blob.
 * Uses Human.js segmentation model in the browser.
 * @param {File|Blob|HTMLImageElement|HTMLCanvasElement} imageSource
 * @param {(progress: number) => void} onProgress  - 0..1
 * @returns {Promise<Blob>}
 */
export async function segmentPerson(imageSource, onProgress) {
  if (!isLoaded) {
    await human.load();
    isLoaded = true;
  }
  if (onProgress) onProgress(0.1);
  // Run segmentation
  const result = await human.segment(imageSource);
  if (onProgress) onProgress(0.8);
  // Create a canvas with transparent background
  const canvas = document.createElement('canvas');
  canvas.width = result.width;
  canvas.height = result.height;
  const ctx = canvas.getContext('2d');
  // Draw the original image
  ctx.drawImage(result.image, 0, 0);
  // Get segmentation mask
  const mask = result.data;
  // Apply mask to make background transparent
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < mask.length; i++) {
    // mask[i] is 0 (background) or 1 (person)
    imgData.data[i * 4 + 3] = imgData.data[i * 4 + 3] * mask[i];
  }
  ctx.putImageData(imgData, 0, 0);
  if (onProgress) onProgress(1.0);
  // Convert canvas to Blob
  return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export function isSegmentationReady() {
  return isLoaded;
}
