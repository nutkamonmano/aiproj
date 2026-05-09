const PROXY_URL = 'https://images.weserv.nl/?url=';
const BASE_URL = 'https://image.pollinations.ai/prompt';
const QUALITY_SUFFIX =
  ', ultra detailed, cinematic lighting, professional photography, 8K resolution, photorealistic, masterpiece, award winning';

const DIMENSIONS = {
  portrait: { width: 1080, height: 1920 },
  landscape: { width: 1920, height: 1080 },
};

/**
 * Generates a Sci-Fi background image using Pollinations AI Flux model.
 * @param {string} prompt         - Landmark-specific prompt
 * @param {'portrait'|'landscape'} ratio
 * @param {number} [seed]         - Provide same seed to regenerate for a different ratio
 * @param {(url: string) => void} [onGenerated]
 * @returns {Promise<{ imageUrl: string, seed: number }>}
 */
export async function generateBackground(landmark, ratio = 'portrait', seed = null, onGenerated) {
  const useSeed = seed ?? Math.floor(Math.random() * 1_000_000);
  const { width, height } = DIMENSIONS[ratio];
  const fullPrompt = encodeURIComponent(landmark.prompt + QUALITY_SUFFIX);

  const targetUrl = `${BASE_URL}/${fullPrompt}?model=flux&width=${width}&height=${height}&seed=${useSeed}&enhance=true&nologo=true&private=true`;
  const url = `${PROXY_URL}${encodeURIComponent(targetUrl)}`;

  try {
    const result = await fetchWithRetry(url, 3, 40000);
    if (onGenerated) onGenerated(result);
    return { imageUrl: result, seed: useSeed };
  } catch (err) {
    console.warn('[imageGen] AI failed, using offline fallback:', landmark.fallback);
    // If AI fails, use the high-quality pre-rendered fallback
    if (onGenerated) onGenerated(landmark.fallback);
    return { imageUrl: landmark.fallback, seed: useSeed, isFallback: true };
  }
}

/**
 * Fetches image URL with retry on timeout.
 * @param {string} url
 * @param {number} maxRetries
 * @param {number} timeoutMs
 * @returns {Promise<string>} Final resolved image URL (after redirect)
 */
async function fetchWithRetry(url, maxRetries, timeoutMs) {
  let lastError = '';
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.startsWith('image/')) {
        throw new Error('AI Provider returned an invalid response (not an image).');
      }

      // Convert to blob URL so canvas can draw cross-origin image
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      lastError = err.name === 'AbortError' ? 'Timeout' : err.message;
      console.warn(`[imageGen] Attempt ${attempt} failed:`, lastError);
      
      if (attempt === maxRetries) {
        throw new Error(`Background generation failed: ${lastError}. Please try again.`);
      }
      
      // On retry, try a faster model (turbo) if flux failed
      if (url.includes('model%3Dflux')) {
        url = url.replace('model%3Dflux', 'model%3Dturbo');
      }
      
      // Randomise seed on retry to get a different result
      url = url.replace(/seed%3D\d+/, `seed%3D${Math.floor(Math.random() * 1_000_000)}`);
      await sleep(1500);
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Re-generates the background for a different ratio using the same seed.
 */
export function regenerateForRatio(landmark, ratio, seed) {
  return generateBackground(landmark, ratio, seed);
}
