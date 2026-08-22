import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { PetroglyphIcon } from '../components/PetroglyphIcon';
import { apiFetch } from '../services/api';

const subCategoryTitles = {
  'breathing-oxygen': 'Breathing & Oxygen',
  'bones-joints': 'Bones & Joints',
  'pain-relievers': 'Pain Relievers',
  'dexamethasone': 'Dexamethasone',
  'energy-power': 'Energy & Power',
  'diuretics': 'Diuretics',
  'protectors-recovery': 'Protectors & Recovery',
  'medicines': 'Medicines',
  'supplements': 'Supplements'
};

export const Shop = () => {
  const { language, isRtl, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Filter States
  const categoryParam = searchParams.get('category') || '';
  const subCategoryParam = searchParams.get('subCategory') || '';
  const typeParam = searchParams.get('type') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'newest';
  const inStockParam = searchParams.get('in_stock') === 'true';

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (categoryParam) query.append('category', categoryParam);
    if (subCategoryParam) query.append('sub_category', subCategoryParam);
    if (typeParam) query.append('type', typeParam);
    if (searchParam) query.append('search', searchParam);
    if (sortParam) query.append('sort', sortParam);
    if (inStockParam) query.append('in_stock', 'true');

    apiFetch(`/api/products?${query.toString()}`)
      .then((data) => {
        if (data && data.success && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryParam, subCategoryParam, typeParam, searchParam, sortParam, inStockParam]);

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

  const activeTitle = subCategoryTitles[subCategoryParam] || (categoryParam ? categoryParam.toUpperCase() : 'Veterinary Store');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-6 sm:space-y-8 text-start bg-[#F9F6F0]">
      {/* 1. BREADCRUMBS & CENTERED HEADER (1:1 Al Zaafran Screenshot 4) */}
      <div className="text-center space-y-3 pb-6 border-b border-surface-bordered">
        <nav className="flex items-center justify-center gap-2 text-xs text-bodytext-muted">
          <Link to="/" className="hover:text-brand-orange">Home</Link>
          <span>›</span>
          <span className="font-bold text-brown-dark">{activeTitle}</span>
        </nav>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-brown-dark tracking-tight">
          {activeTitle}
        </h1>
      </div>

      {/* Top Controls: Mobile Filter Button & Desktop Sorting Selector */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-surface-bordered rounded-xl text-xs font-bold text-brown-dark shadow-sm"
        >
          <Filter className="w-4 h-4 text-brand-orange" />
          <span>Filters</span>
        </button>

        <div className="flex items-center gap-2 ms-auto">
          <span className="text-xs text-bodytext-muted hidden sm:inline">Sort by:</span>
          <select
            value={sortParam}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="bg-white border border-surface-bordered rounded-xl py-2 px-3 text-xs font-semibold text-brown-dark focus:outline-none focus:border-brand-orange shadow-sm"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {(categoryParam || subCategoryParam || typeParam || searchParam || inStockParam) && (
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-surface-bordered shadow-sm">
          <span className="text-xs font-bold text-bodytext-muted">Active Filters:</span>
          {categoryParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream border border-surface-bordered rounded-full text-xs font-semibold text-brown-dark">
              <span>Category: {categoryParam}</span>
              <button onClick={() => updateFilter('category', '')}><X className="w-3 h-3 hover:text-brand-orange" /></button>
            </span>
          )}
          {subCategoryParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream border border-surface-bordered rounded-full text-xs font-semibold text-brown-dark">
              <span>Condition: {subCategoryParam}</span>
              <button onClick={() => updateFilter('subCategory', '')}><X className="w-3 h-3 hover:text-brand-orange" /></button>
            </span>
          )}
          {searchParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream border border-surface-bordered rounded-full text-xs font-semibold text-brown-dark">
              <span>Search: "{searchParam}"</span>
              <button onClick={() => updateFilter('search', '')}><X className="w-3 h-3 hover:text-brand-orange" /></button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1 ms-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + 4-Column Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden md:block md:col-span-3 space-y-6">
          <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-6">
            <div className="flex items-center justify-between border-b border-surface-bordered pb-4">
              <h3 className="font-display font-bold text-brown-dark text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
                <span>Filter Catalog</span>
              </h3>
            </div>

            {/* Filter 1: Main Category */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-brown-dark uppercase tracking-wider">
                Category
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: '', label: 'All Categories' },
                  { id: 'camel-race', label: 'Camel Race' },
                  { id: 'horse-race', label: 'Horse Race' },
                  { id: 'dog', label: 'Dog & Pets' },
                  { id: 'cow', label: 'Cow & Cattle' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateFilter('category', item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-start transition-colors font-semibold ${
                      categoryParam === item.id
                        ? 'bg-brand-orange text-white'
                        : 'hover:bg-brand-cream text-bodytext'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Medical Condition Sub-Category */}
            <div className="space-y-3 border-t border-surface-bordered pt-4">
              <h4 className="font-display font-bold text-xs text-brown-dark uppercase tracking-wider">
                Condition Type
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: '', label: 'All Conditions' },
                  { id: 'breathing-oxygen', label: 'Breathing & Oxygen' },
                  { id: 'bones-joints', label: 'Bones & Joints' },
                  { id: 'pain-relievers', label: 'Pain Relievers' },
                  { id: 'dexamethasone', label: 'Dexamethasone' },
                  { id: 'energy-power', label: 'Energy & Power' },
                  { id: 'diuretics', label: 'Diuretics' },
                  { id: 'protectors-recovery', label: 'Protectors & Recovery' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateFilter('subCategory', item.id)}
                    className={`w-full text-start px-3 py-2 rounded-xl transition-colors font-semibold ${
                      subCategoryParam === item.id
                        ? 'bg-brown-dark text-white'
                        : 'hover:bg-brand-cream text-bodytext'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID AREA (4 Columns like Screenshot 4) */}
        <main className="md:col-span-9 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-surface-bordered" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white border border-surface-bordered rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-warm">
              <h3 className="font-display font-bold text-brown-dark text-xl">No Products Found</h3>
              <p className="text-xs sm:text-sm text-bodytext-muted max-w-md mx-auto">
                No items matched your active search and category filters. Try resetting your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
