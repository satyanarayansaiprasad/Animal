import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { ProductCard } from '../components/ProductCard';
import { taxonomy } from '../data/taxonomy';
import { apiFetch } from '../services/api';

export const CategoryDetail = () => {
  const { categorySlug, subSlug, level2Slug } = useParams();
  const { language, isRtl } = useLanguage();
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback to 'camel' if invalid
  const catKey = taxonomy[categorySlug] ? categorySlug : 'camel';
  const categoryData = taxonomy[catKey];
  const categoryName = language === 'ar' ? categoryData.name_ar : categoryData.name_en;

  // Selected Level 1 Subcategory
  const activeSubcat = categoryData.subcategories.find((s) => s.slug === subSlug) || categoryData.subcategories[0];
  const subcatName = activeSubcat ? (language === 'ar' ? activeSubcat.name_ar : activeSubcat.name_en) : '';

  // Selected Level 2 Item
  const activeLevel2 = activeSubcat?.items?.find((i) => i.slug === level2Slug);
  const level2Name = activeLevel2 ? (language === 'ar' ? activeLevel2.name_ar : activeLevel2.name_en) : '';

  useEffect(() => {
    setLoading(true);
    let url = `/api/products?category=${encodeURIComponent(catKey)}`;

    apiFetch(url)
      .then((data) => {
        if (data && data.success && data.data) {
          let list = data.data;

          // Filter by Level-1 or Level-2 keyword match
          const filterKeyword = (level2Slug || subSlug || '').replace(/-/g, ' ').toLowerCase();
          if (filterKeyword) {
            const filtered = list.filter((p) => {
              const textStr = `${p.type || ''} ${p.name_en || ''} ${p.name_ar || ''} ${p.desc_en || ''}`.toLowerCase();
              return textStr.includes(filterKeyword) || filterKeyword.split(' ').some((k) => k.length > 3 && textStr.includes(k));
            });
            list = filtered.length > 0 ? filtered : list;
          }

          setProducts(list);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [catKey, subSlug, level2Slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-8 text-start bg-brand-cream min-h-screen">
      {/* 1. BREADCRUMBS NAVIGATION */}
      <div className="flex items-center gap-2 text-xs text-bodytext-muted flex-wrap">
        <Link to="/" className="hover:text-brand-orange">Home</Link>
        {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <Link to={`/category/${catKey}`} className="capitalize hover:text-brand-orange font-semibold">
          {categoryName}
        </Link>
        {subSlug && (
          <>
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <Link to={`/category/${catKey}/${subSlug}`} className="capitalize hover:text-brand-orange">
              {subcatName}
            </Link>
          </>
        )}
        {level2Slug && (
          <>
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <span className="capitalize text-brown-dark font-black">{level2Name}</span>
          </>
        )}
      </div>

      {/* 2. CATEGORY HEADER TITLE */}
      <div className="text-center space-y-2 border-b border-surface-bordered pb-6">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brown-dark capitalize">
          {level2Name || subcatName || categoryName}
        </h1>
        <p className="text-xs sm:text-sm text-bodytext-muted max-w-xl mx-auto">
          Explore specialized products, supplements, and certified formulas for {categoryName}.
        </p>
      </div>

      {/* 3. LEVEL 1 SUBCATEGORY SELECTION CARDS (Rendered when no Level-1 subcategory is selected) */}
      {!subSlug && (
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg text-brown-dark text-center">
            {language === 'ar' ? 'اختر الأقسام الفرعية' : 'Select Subcategory'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryData.subcategories.map((sub, i) => (
              <Link
                key={i}
                to={`/category/${catKey}/${sub.slug}`}
                className="group relative bg-[#F0F4F8] border border-surface-bordered rounded-3xl p-6 shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center justify-between text-center space-y-4 min-h-[260px]"
              >
                <h3 className="font-display font-black text-lg text-brown-dark group-hover:text-brand-orange transition-colors">
                  {language === 'ar' ? sub.name_ar : sub.name_en}
                </h3>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand-orange shadow-md group-hover:scale-105 transition-transform">
                  <img src={sub.img} alt={sub.name_en} className="w-full h-full object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. LEVEL 2 SUBCATEGORY ITEMS GRID (Rendered when a Level-1 subcategory is active) */}
      {activeSubcat && activeSubcat.items && activeSubcat.items.length > 0 && (
        <div className="bg-white border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
          <h3 className="font-display font-bold text-brown-dark text-sm sm:text-base text-center">
            {language === 'ar' ? `أقسام ${subcatName}` : `${subcatName} Specifications`}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {activeSubcat.items.map((item) => (
              <Link
                key={item.slug}
                to={`/category/${catKey}/${activeSubcat.slug}/${item.slug}`}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all text-center space-y-2 border shadow-sm group ${
                  level2Slug === item.slug
                    ? 'bg-brand-orange text-white border-brand-orange'
                    : 'bg-brand-cream hover:bg-brand-orange hover:text-white border-surface-bordered'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-brand-orange/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-inner">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold leading-tight">
                  {language === 'ar' ? item.name_ar : item.name_en}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. CLEAN 4-COLUMN PRODUCT GRID (NO SIDEBAR FILTERS) */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-bodytext-muted">
            Showing {products.length} products
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-surface-bordered" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
