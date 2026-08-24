import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { ProductCard } from '../components/ProductCard';
import { apiFetch } from '../services/api';

const healthIssueIcons = [
  { id: 'breathing-oxygen', title_en: 'Breathing & Oxygen', title_ar: 'علاجات النسم والتنفس', icon: '🫁' },
  { id: 'bones-joints', title_en: 'Bones & Joints', title_ar: 'مفاصل و اوتار', icon: '🦴' },
  { id: 'pain-relievers', title_en: 'Pain Relievers', title_ar: 'مسكنات الألم والالتهاب', icon: '⚡' },
  { id: 'dexamethasone', title_en: 'Dexamethasone', title_ar: 'دكسا الهجن', icon: '🫀' },
  { id: 'energy-power', title_en: 'Energy & Power', title_ar: 'طاقة ونشاط السباق', icon: '💥' },
  { id: 'diuretics', title_en: 'Diuretics', title_ar: 'إدرار وتصريف المائيات', icon: '💧' },
  { id: 'protectors-recovery', title_en: 'Protectors & Recovery', title_ar: 'حماية واستشفاء المفاصل', icon: '🩹' },
];

export const CategoryDetail = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const { language, isRtl } = useLanguage();
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formatted category and subcategory names
  const categoryName = categorySlug ? categorySlug.replace(/-/g, ' ') : 'Camel Race';
  const subcategoryName = subcategorySlug ? subcategorySlug.replace(/-/g, ' ') : '';

  useEffect(() => {
    setLoading(true);
    let url = '/api/products';
    if (categorySlug) {
      url += `?category=${encodeURIComponent(categorySlug.split('-')[0])}`;
    }
    apiFetch(url)
      .then((data) => {
        if (data && data.success && data.data) {
          let list = data.data;
          if (subcategorySlug) {
            const sub = subcategorySlug.toLowerCase();
            list = list.filter(p => 
              (p.type && p.type.toLowerCase().includes(sub)) ||
              (p.name_en && p.name_en.toLowerCase().includes(sub)) ||
              (p.name_ar && p.name_ar.includes(sub))
            );
          }
          setProducts(list.length > 0 ? list : data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categorySlug, subcategorySlug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-8 text-start bg-brand-cream min-h-screen">
      {/* 1. BREADCRUMBS NAVIGATION (Exact Al Zaafran Style - Screenshot 4) */}
      <div className="flex items-center gap-2 text-xs text-bodytext-muted">
        <Link to="/" className="hover:text-brand-orange">Home</Link>
        {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <Link to={`/category/${categorySlug || 'camel-race'}`} className="capitalize hover:text-brand-orange">{categoryName}</Link>
        {subcategoryName && (
          <>
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <span className="capitalize text-brown-dark font-bold">{subcategoryName}</span>
          </>
        )}
      </div>

      {/* 2. CATEGORY TITLE HEADER (Screenshot 4) */}
      <div className="text-center space-y-2 border-b border-surface-bordered pb-6">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brown-dark capitalize">
          {subcategoryName || categoryName}
        </h1>
        <p className="text-xs sm:text-sm text-bodytext-muted max-w-xl mx-auto">
          Explore specialized veterinary medicines, endurance formulas, and performance supplements.
        </p>
      </div>

      {/* 3. SUBCATEGORY CARDS GRID (Exact Al Zaafran 4 Light Blue Cards - Screenshot 2) */}
      {!subcategorySlug && (
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg text-brown-dark text-center">
            {language === 'ar' ? 'اختر الأقسام الفرعية' : 'Select Subcategory'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title_en: `${categoryName} Race`, title_ar: 'سباقات الهجن', slug: 'race', img: '/images/species/camel_card.jpg' },
              { title_en: `${categoryName} Supplements`, title_ar: 'مكملات وفيتامينات', slug: 'supplements', img: '/images/species/horse_card.jpg' },
              { title_en: `${categoryName} Problems`, title_ar: 'مشاكل وعلاجات', slug: 'problems', img: '/images/species/dog_card.jpg' },
              { title_en: `${categoryName} Medicines`, title_ar: 'أدوية ومستحضرات', slug: 'medicines', img: '/images/species/cat_card.jpg' },
            ].map((sub, i) => (
              <Link
                key={i}
                to={`/category/${categorySlug || 'camel-race'}/${sub.slug}`}
                className="group relative bg-[#F0F4F8] border border-surface-bordered rounded-3xl p-6 shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center justify-between text-center space-y-4 min-h-[260px]"
              >
                <h3 className="font-display font-black text-lg text-brown-dark group-hover:text-brand-orange transition-colors">
                  {language === 'ar' ? sub.title_ar : sub.title_en}
                </h3>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand-orange shadow-md group-hover:scale-105 transition-transform">
                  <img src={sub.img} alt={sub.title_en} className="w-full h-full object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. SYMPTOMS & BODY PART ICONS BAR (Exact Al Zaafran 7 Medical Icons - Screenshot 3) */}
      <div className="bg-white border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
        <h3 className="font-display font-bold text-brown-dark text-sm sm:text-base text-center">
          {language === 'ar' ? 'علاجات الأعضاء والأعراض البيطرية' : 'Body Part & Symptoms Veterinary Solutions'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {healthIssueIcons.map((issue) => (
            <Link
              key={issue.id}
              to={`/category/${categorySlug || 'camel-race'}/${issue.id}`}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all text-center space-y-2 border shadow-sm group ${
                subcategorySlug === issue.id
                  ? 'bg-brand-orange text-white border-brand-orange'
                  : 'bg-brand-cream hover:bg-brand-orange hover:text-white border-surface-bordered'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-orange/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
                {issue.icon}
              </div>
              <span className="text-[11px] font-bold leading-tight">
                {language === 'ar' ? issue.title_ar : issue.title_en}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. CLEAN 4-COLUMN PRODUCT GRID (NO SIDEBAR FILTERS - Screenshot 4) */}
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
