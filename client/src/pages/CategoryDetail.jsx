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
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Validate category key
  const catKey = taxonomy[categorySlug] ? categorySlug : 'camel';
  const categoryData = taxonomy[catKey];
  const categoryName = language === 'ar' ? categoryData.name_ar : categoryData.name_en;

  // Level 1 Subcategory
  const activeSubcat = subSlug ? categoryData.subcategories.find((s) => s.slug === subSlug) : null;
  const subcatName = activeSubcat ? (language === 'ar' ? activeSubcat.name_ar : activeSubcat.name_en) : '';

  // Level 2 Sub-subcategory
  const activeLevel2 = level2Slug && activeSubcat ? activeSubcat.items?.find((i) => i.slug === level2Slug) : null;
  const level2Name = activeLevel2 ? (language === 'ar' ? activeLevel2.name_ar : activeLevel2.name_en) : '';

  useEffect(() => {
    setLoading(true);
    let url = `/api/products?category=${encodeURIComponent(catKey)}`;

    apiFetch(url)
      .then((data) => {
        if (data && data.success && data.data) {
          let list = data.data;

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
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${catKey}`} className="capitalize hover:text-brand-orange font-semibold">
          {categoryName}
        </Link>
        {subSlug && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/category/${catKey}/${subSlug}`} className="capitalize hover:text-brand-orange">
              {subcatName}
            </Link>
          </>
        )}
        {level2Slug && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="capitalize text-brown-dark font-black">{level2Name}</span>
          </>
        )}
      </div>

      {/* 2. DEDICATED PAGE BANNER WITH RELEVANT PHOTO */}
      <div className="relative rounded-3xl overflow-hidden bg-[#3A1E0E] text-white p-8 sm:p-12 shadow-2xl border border-brown-border flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
        <img
          src={activeLevel2?.img || activeSubcat?.img || categoryData.banner}
          alt={categoryName}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white capitalize">
            {level2Name || subcatName || categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium">
            {language === 'ar' ? `منتجات وتركيبات بيطرية تخصصية مخصصة لـ ${categoryName}` : `Specialized veterinary medicines and certified formulas for ${categoryName}`}
          </p>
        </div>
      </div>

      {/* PAGE SCENARIO 1: MAIN CATEGORY PAGE (/category/:categorySlug) */}
      {!subSlug && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display font-black text-2xl text-brown-dark">
              {language === 'ar' ? `أقسام ${categoryName}` : `${categoryName} Subcategories`}
            </h2>
            <p className="text-xs text-bodytext-muted">Select a subcategory to browse specialized treatments</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryData.subcategories.map((sub, i) => (
              <Link
                key={i}
                to={`/category/${catKey}/${sub.slug}`}
                className="group relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover border border-surface-bordered flex flex-col justify-end p-5 transition-all duration-500"
              >
                {/* Background Image filling the card */}
                <img
                  src={sub.img}
                  alt={sub.name_en}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative z-10 text-center space-y-1">
                  <h3 className="font-display font-black text-lg text-white group-hover:text-brand-orange transition-colors drop-shadow-md">
                    {language === 'ar' ? sub.name_ar : sub.name_en}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-brand-orange text-white text-[11px] font-bold rounded-full shadow">
                    {language === 'ar' ? 'تصفح القسم ➔' : 'Explore Category ➔'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* PAGE SCENARIO 2: SUBCATEGORY PAGE (/category/:categorySlug/:subSlug) */}
      {subSlug && !level2Slug && activeSubcat && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display font-black text-2xl text-brown-dark">
              {language === 'ar' ? `تخصصات ${subcatName}` : `${subcatName} Specifications & Symptoms`}
            </h2>
            <p className="text-xs text-bodytext-muted">Select a specific symptom or treatment area</p>
          </div>

          {/* Full-Background Image Cards for Subcategories (Fixing small image inside card) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeSubcat.items.map((item) => (
              <Link
                key={item.slug}
                to={`/category/${catKey}/${activeSubcat.slug}/${item.slug}`}
                className="group relative h-52 sm:h-64 rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover border border-surface-bordered flex flex-col justify-between p-4 transition-all duration-500"
              >
                {/* Background Image filling 100% of the card */}
                <img
                  src={item.img}
                  alt={item.name_en}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Top Emoji Icon Badge */}
                <div className="relative z-10 self-start w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                {/* Bottom Title Text Overlay */}
                <div className="relative z-10 text-center pt-2">
                  <span className="font-display font-black text-xs sm:text-sm text-white drop-shadow-md group-hover:text-brand-orange transition-colors leading-tight block">
                    {language === 'ar' ? item.name_ar : item.name_en}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* PAGE SCENARIO 3: DEDICATED PRODUCT LISTING PAGE (/category/:categorySlug/:subSlug/:level2Slug) */}
      {(level2Slug || (subSlug && (!activeSubcat || activeSubcat.items.length === 0))) && (
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
      )}
    </div>
  );
};
