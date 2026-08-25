import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { taxonomy } from '../data/taxonomy';
import { apiFetch } from '../services/api';

export const Shop = () => {
  const { language, isRtl, t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    let url = '/api/products';
    const query = new URLSearchParams();
    if (categoryParam) query.append('category', categoryParam);
    if (searchParam) query.append('search', searchParam);
    
    if (query.toString()) {
      url += `?${query.toString()}`;
    }

    apiFetch(url)
      .then((data) => {
        if (data && data.success && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryParam, searchParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-8 text-start bg-brand-cream min-h-screen">
      {/* Header Title */}
      <div className="text-center space-y-2 border-b border-surface-bordered pb-6">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brown-dark">
          {t('shop')}
        </h1>
        <p className="text-xs sm:text-sm text-bodytext-muted max-w-xl mx-auto">
          Complete veterinary medicine catalog for race camels, Arabian horses, cattle, dogs, and falcons.
        </p>
      </div>

      {/* 5 Main Species Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.keys(taxonomy).map((key) => {
          const item = taxonomy[key];
          return (
            <Link
              key={key}
              to={`/category/${item.slug}`}
              className="flex items-center gap-3 p-4 bg-white border border-surface-bordered rounded-2xl shadow-sm hover:shadow-warm-hover hover:border-brand-orange transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-base shrink-0 shadow">
                {item.name_en[0]}
              </div>
              <span className="font-display font-black text-xs sm:text-sm text-brown-dark group-hover:text-brand-orange transition-colors">
                {language === 'ar' ? item.name_ar : item.name_en}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Level-1 Subcategories Quick Index Bar for Camel */}
      <div className="bg-white border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
        <h3 className="font-display font-bold text-brown-dark text-sm sm:text-base text-center">
          {language === 'ar' ? 'تصفح حسب أقسام الهجن والخيل' : 'Explore Camel & Horse Categories'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {taxonomy.camel.subcategories.map((sub) => (
            <Link
              key={sub.slug}
              to={`/category/camel/${sub.slug}`}
              className="p-3.5 rounded-2xl bg-brand-cream hover:bg-brand-orange hover:text-white transition-all text-center space-y-1 border border-surface-bordered group shadow-sm"
            >
              <span className="text-xs font-black block">
                {language === 'ar' ? sub.name_ar : sub.name_en}
              </span>
              <span className="text-[10px] text-bodytext-muted group-hover:text-white/90 font-mono">
                {sub.items.length} specifications
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Clean 4-Column Product Grid */}
      <div className="space-y-6 pt-2">
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
