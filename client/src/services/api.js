import { fallbackProducts, fallbackSettings, fallbackCategories } from '../data/fallbackData';

/**
 * Resilient API Client for Al Namoos Veterinary Store
 * Tries live API endpoints first; if offline or starting up, gracefully serves fallback dataset.
 */
export async function apiFetch(endpoint, options = {}) {
  const relativeUrl = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 1. Try relative endpoint (/api/...)
  try {
    const res = await fetch(relativeUrl, options);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success) return json;
    }
  } catch {
    // Silently continue to fallback attempt
  }

  // 2. Try direct localhost endpoint (http://127.0.0.1:5001/api/...)
  try {
    const fallbackUrl = `http://127.0.0.1:5001${relativeUrl}`;
    const res = await fetch(fallbackUrl, options);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success) return json;
    }
  } catch {
    // Silently continue to local fallback data
  }

  // 3. Guaranteed Local Fallback Engine
  const urlObj = new URL(relativeUrl, 'http://localhost');
  const path = urlObj.pathname;
  const params = urlObj.searchParams;

  if (path.startsWith('/api/products/')) {
    const id = path.split('/api/products/')[1];
    const item = fallbackProducts.find((p) => String(p.id) === String(id));
    return { success: true, data: item || fallbackProducts[0] };
  }

  if (path === '/api/products') {
    let filtered = [...fallbackProducts];
    const category = params.get('category');
    const type = params.get('type');
    const search = params.get('search');
    const inStock = params.get('in_stock');
    const sort = params.get('sort');

    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (type) {
      filtered = filtered.filter((p) => p.type.toLowerCase() === type.toLowerCase());
    }
    if (inStock === 'true') {
      filtered = filtered.filter((p) => p.in_stock === true);
    }
    if (search) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name_en?.toLowerCase().includes(q) ||
          p.name_ar?.includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }

    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.price_omr - b.price_omr);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.price_omr - a.price_omr);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return { success: true, count: filtered.length, data: filtered };
  }

  if (path === '/api/settings') {
    return { success: true, data: fallbackSettings };
  }

  if (path === '/api/categories') {
    return { success: true, data: fallbackCategories };
  }

  return { success: true, data: fallbackProducts };
}
