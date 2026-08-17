import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { PetroglyphIcon } from '../components/PetroglyphIcon';
import { apiFetch } from '../services/api';

export const Shop = () => {
  const { language, isRtl, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Filter States
  const categoryParam = searchParams.get('category') || '';
  const typeParam = searchParams.get('type') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'newest';
  const inStockParam = searchParams.get('in_stock') === 'true';
  const maxPriceParam = searchParams.get('max_price') || '';

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (categoryParam) query.append('category', categoryParam);
    if (typeParam) query.append('type', typeParam);
    if (searchParam) query.append('search', searchParam);
    if (sortParam) query.append('sort', sortParam);
    if (inStockParam) query.append('in_stock', 'true');
    if (maxPriceParam) query.append('maxPrice', maxPriceParam);

    apiFetch(`/api/products?${query.toString()}`)
      .then((data) => {
        if (data && data.success && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryParam, typeParam, searchParam, sortParam, inStockParam, maxPriceParam]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-6 sm:space-y-8 text-start">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-bordered pb-4 sm:pb-6">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-charcoal">
            {t('shop')}
          </h1>
          <p className="text-xs sm:text-sm text-bodytext-muted mt-1">
            Browse complete desert veterinary catalog for camels, horses, and cattle across GCC.
          </p>
        </div>

        {/* Top Controls: Mobile Filter Button & Desktop Sorting Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-surface border border-surface-bordered rounded-xl text-xs font-bold text-charcoal shadow-sm touch-target"
          >
            <Filter className="w-4 h-4 text-clay" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-bodytext-muted hidden sm:inline">Sort by:</span>
            <select
              value={sortParam}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-surface border border-surface-bordered rounded-xl py-2 px-3 text-xs font-semibold text-charcoal focus:outline-none focus:border-clay"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {(categoryParam || typeParam || searchParam || inStockParam || maxPriceParam) && (
        <div className="flex flex-wrap items-center gap-2 bg-sand-dark p-3 rounded-2xl border border-surface-bordered">
          <span className="text-xs font-bold text-bodytext-muted">Active Filters:</span>
          {categoryParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-surface-bordered rounded-full text-xs font-semibold text-charcoal">
              <span>Species: {categoryParam}</span>
              <button onClick={() => updateFilter('category', '')}><X className="w-3 h-3 hover:text-clay" /></button>
            </span>
          )}
          {typeParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-surface-bordered rounded-full text-xs font-semibold text-charcoal">
              <span>Type: {typeParam}</span>
              <button onClick={() => updateFilter('type', '')}><X className="w-3 h-3 hover:text-clay" /></button>
            </span>
          )}
          {searchParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-surface-bordered rounded-full text-xs font-semibold text-charcoal">
              <span>Search: "{searchParam}"</span>
              <button onClick={() => updateFilter('search', '')}><X className="w-3 h-3 hover:text-clay" /></button>
            </span>
          )}
          {inStockParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-surface-bordered rounded-full text-xs font-semibold text-charcoal">
              <span>In Stock Only</span>
              <button onClick={() => updateFilter('in_stock', '')}><X className="w-3 h-3 hover:text-clay" /></button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-clay hover:underline flex items-center gap-1 ms-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden md:block md:col-span-3 space-y-6">
          <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-6">
            <div className="flex items-center justify-between border-b border-surface-bordered pb-4">
              <h3 className="font-display font-bold text-charcoal text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-clay" />
                <span>Filter Catalog</span>
              </h3>
            </div>

            {/* Filter 1: Animal Species */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-charcoal uppercase tracking-wider">
                {t('categories')}
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: '', label: t('allSpecies'), icon: 'camel' },
                  { id: 'camel', label: t('camel'), icon: 'camel' },
                  { id: 'horse', label: t('horse'), icon: 'horse' },
                  { id: 'cow', label: t('cow'), icon: 'cow' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateFilter('category', item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-start transition-colors font-semibold ${
                      categoryParam === item.id
                        ? 'bg-clay text-white'
                        : 'hover:bg-sand text-bodytext'
                    }`}
                  >
                    <PetroglyphIcon species={item.icon || 'camel'} size="sm" badge={false} className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Product Type */}
            <div className="space-y-3 border-t border-surface-bordered pt-4">
              <h4 className="font-display font-bold text-xs text-charcoal uppercase tracking-wider">
                Product Type
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: '', label: t('allTypes') },
                  { id: 'medicine', label: t('medicine') },
                  { id: 'supplements', label: t('supplements') },
                  { id: 'feed', label: t('feed') },
                  { id: 'equipment', label: t('equipment') },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateFilter('type', item.id)}
                    className={`w-full text-start px-3 py-2.5 rounded-xl transition-colors font-semibold ${
                      typeParam === item.id
                        ? 'bg-teal text-white'
                        : 'hover:bg-sand text-bodytext'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: In Stock Only Toggle */}
            <div className="border-t border-surface-bordered pt-4 flex items-center justify-between">
              <label htmlFor="inStockToggle" className="text-xs font-bold text-charcoal cursor-pointer">
                {t('inStock')} Only
              </label>
              <input
                id="inStockToggle"
                type="checkbox"
                checked={inStockParam}
                onChange={(e) => updateFilter('in_stock', e.target.checked ? 'true' : '')}
                className="w-4 h-4 text-clay focus:ring-clay border-surface-bordered rounded cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID AREA */}
        <main className="md:col-span-9 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-surface rounded-2xl animate-pulse border border-surface-bordered" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-surface border border-surface-bordered rounded-3xl p-8 sm:p-12 text-center space-y-4">
              <PetroglyphIcon species="camel" size="xl" className="mx-auto" />
              <h3 className="font-display font-bold text-charcoal text-xl">No Products Found</h3>
              <p className="text-xs sm:text-sm text-bodytext-muted max-w-md mx-auto">
                No items matched your active search and species filters. Try clearing your filters or searching for generic terms like "vitamin" or "feed".
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-clay hover:bg-clay-hover text-white font-bold rounded-xl text-xs transition-colors touch-target"
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-body md:hidden">
          <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className={`fixed inset-y-0 ${isRtl ? 'left-0' : 'right-0'} max-w-xs w-full bg-surface p-6 shadow-2xl space-y-6 overflow-y-auto`}>
            <div className="flex items-center justify-between border-b border-surface-bordered pb-4">
              <h3 className="font-display font-bold text-charcoal text-base">Filter Catalog</h3>
              <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6 text-charcoal" /></button>
            </div>

            <div className="space-y-3 text-start">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-charcoal">{t('categories')}</h4>
              {[
                { id: '', label: 'All Species' },
                { id: 'camel', label: t('camel') },
                { id: 'horse', label: t('horse') },
                { id: 'cow', label: t('cow') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { updateFilter('category', item.id); setMobileFilterOpen(false); }}
                  className={`w-full text-start py-2.5 px-3 rounded-xl text-xs font-semibold ${categoryParam === item.id ? 'bg-clay text-white' : 'bg-sand text-bodytext'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 border-t border-surface-bordered pt-4 text-start">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-charcoal">Product Type</h4>
              {[
                { id: '', label: 'All Types' },
                { id: 'medicine', label: t('medicine') },
                { id: 'supplements', label: t('supplements') },
                { id: 'feed', label: t('feed') },
                { id: 'equipment', label: t('equipment') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { updateFilter('type', item.id); setMobileFilterOpen(false); }}
                  className={`w-full text-start py-2.5 px-3 rounded-xl text-xs font-semibold ${typeParam === item.id ? 'bg-teal text-white' : 'bg-sand text-bodytext'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => { clearAllFilters(); setMobileFilterOpen(false); }}
              className="w-full py-3.5 bg-charcoal text-sand rounded-xl font-bold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
