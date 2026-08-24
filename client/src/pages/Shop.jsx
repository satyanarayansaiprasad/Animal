import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { apiFetch } from '../services/api';

const healthIssueIcons = [
  { id: 'breathing-oxygen', title_en: 'Breathing & Oxygen', title_ar: 'علاجات النسم والتنفس', icon: '🫁' },
  { id: 'bones-joints', title_en: 'Bones & Joints', title_ar: 'مفاصل و اوتار', icon: '🦴' },
  { id: 'pain-relievers', title_en: 'Pain Relievers', title_ar: 'مسكنات الألم', icon: '⚡' },
  { id: 'dexamethasone', title_en: 'Dexamethasone', title_ar: 'دكسا الهجن', icon: '🫀' },
  { id: 'energy-power', title_en: 'Energy & Power', title_ar: 'طاقة ونشاط', icon: '💥' },
  { id: 'diuretics', title_en: 'Diuretics', title_ar: 'إدرار وتصريف', icon: '💧' },
  { id: 'protectors-recovery', title_en: 'Protectors & Recovery', title_ar: 'حماية واستشفاء', icon: '🩹' },
];

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
          Complete veterinary medicine catalog for race camels, Arabian horses, cattle, and pets.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'CAMEL RACE', slug: 'camel-race', img: '/images/species/camel_card.jpg' },
          { label: 'HORSE RACE', slug: 'horse-race', img: '/images/species/horse_card.jpg' },
          { label: 'DOG & PETS', slug: 'dog-pets', img: '/images/species/dog_card.jpg' },
          { label: 'COW & CATTLE', slug: 'cow-cattle', img: '/images/species/cat_card.jpg' },
        ].map((item, i) => (
          <Link
            key={i}
            to={`/category/${item.slug}`}
            className="flex items-center gap-3 p-4 bg-white border border-surface-bordered rounded-2xl shadow-sm hover:shadow-warm-hover hover:border-brand-orange transition-all group"
          >
            <img src={item.img} alt={item.label} className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange" />
            <span className="font-display font-black text-xs sm:text-sm text-brown-dark group-hover:text-brand-orange transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Body Part & Symptoms Icons Bar */}
      <div className="bg-white border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
        <h3 className="font-display font-bold text-brown-dark text-sm sm:text-base text-center">
          {language === 'ar' ? 'علاجات الأعضاء والأعراض البيطرية' : 'Body Part & Symptoms Veterinary Solutions'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {healthIssueIcons.map((issue) => (
            <Link
              key={issue.id}
              to={`/category/camel-race/${issue.id}`}
              className="flex flex-col items-center p-3 rounded-2xl bg-brand-cream hover:bg-brand-orange hover:text-white transition-all text-center space-y-2 border border-surface-bordered group shadow-sm"
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

      {/* Clean 4-Column Product Grid (NO SIDEBAR FILTERS) */}
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
