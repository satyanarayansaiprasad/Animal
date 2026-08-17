/**
 * Central API Client for Al Namoos Veterinary Store
 * Handles relative requests with automatic fallback to http://127.0.0.1:5001/api
 */
export async function apiFetch(endpoint, options = {}) {
  const relativeUrl = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const res = await fetch(relativeUrl, options);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Relative fetch to ${relativeUrl} failed, trying direct 127.0.0.1 fallback...`, err);
  }

  // Fallback direct URL if Vite proxy is bypassed
  const fallbackUrl = `http://127.0.0.1:5001${relativeUrl}`;
  const res = await fetch(fallbackUrl, options);
  return await res.json();
}
