import { removeBackground } from '@imgly/background-removal';

let isModelLoaded = false;

/**
 * Removes the background from an image file/blob and returns a transparent PNG blob.
 * Uses ONNX model running entirely in the browser — no server needed.
 * @param {File|Blob} imageSource
 * @param {(progress: number) => void} onProgress  - 0..1
 * @returns {Promise<Blob>}
 */
export async function segmentPerson(imageSource, onProgress) {
  const config = {
    model: 'small', // Use small model for better mobile compatibility
    // Reverting to default CDN to avoid Vite hashing issues with local assets
    output: {
      format: 'image/png',
      quality: 1,
      type: 'foreground',
    },
    progress: (key, current, total) => {
      if (onProgress && total > 0) {
        const pct = current / total;
        onProgress(pct);
      }
    },
  };

  try {
    const blob = await removeBackground(imageSource, config);
    isModelLoaded = true;
    return blob;
  } catch (err) {
    console.error('[segmentation] Detailed Error:', err);
    // Throw more descriptive error
    throw new Error(`Background removal failed: ${err.message || 'Unknown error'}`);
  }
}

export function isSegmentationReady() {
  return isModelLoaded;
}
