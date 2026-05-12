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
    publicPath: `${import.meta.env.BASE_URL}assets/`, // Ensure WASM assets are found on GitHub Pages
    output: {
      format: 'image/png',
      quality: 1,
      type: 'foreground',
    },
    progress: (key, current, total) => {
      if (onProgress && total > 0) {
        // During model download keys start with "fetch:"
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
    console.error('[segmentation] Error:', err);
    throw new Error('Background removal failed. Please try again.');
  }
}

export function isSegmentationReady() {
  return isModelLoaded;
}
