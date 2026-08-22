import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Activity,
  Heart,
  Zap,
  Shield,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { apiFetch } from '../services/api';

const subCategoriesMap = {
  'camel-race': [
    { id: 'race', title: 'Camel Race', title_ar: 'سباق الهجن', image: '/images/species/camel_card.jpg' },
    { id: 'supplements', title: 'Camel Supplements', title_ar: 'مكملات الهجن', image: '/images/species/camel_card.jpg' },
    { id: 'problems', title: 'Camel Problems', title_ar: 'علاجات الهجن', image: '/images/species/camel_card.jpg' },
    { id: 'medicines', title: 'Camel Medicines', title_ar: 'أدوية الهجن', image: '/images/species/camel_card.jpg' },
  ],
  'horse-race': [
    { id: 'race', title: 'Horse Race', title_ar: 'سباق الخيل', image: '/images/species/horse_card.jpg' },
    { id: 'supplements', title: 'Equine Supplements', title_ar: 'مكملات الخيول', image: '/images/species/horse_card.jpg' },
    { id: 'problems', title: 'Equine Problems', title_ar: 'علاجات الخيول', image: '/images/species/horse_card.jpg' },
    { id: 'medicines', title: 'Equine Medicines', title_ar: 'أدوية الخيول', image: '/images/species/horse_card.jpg' },
  ],
  'dog': [
    { id: 'dog-care', title: 'Dog Care', title_ar: 'رعاية الكلاب', image: '/images/species/dog_card.jpg' },
    { id: 'cat-care', title: 'Cat Care', title_ar: 'رعاية القطط', image: '/images/species/cat_card.jpg' },
  ],
  'cow': [
    { id: 'dairy', title: 'Dairy Cattle', title_ar: 'أبقار الحليب', image: '/images/species/cow.jpg' },
    { id: 'rumen', title: 'Rumen & Digestive', title_ar: 'صحة الكرش', image: '/images/species/cow.jpg' },
  ]
};

const medicalConditions = [
  { id: 'breathing-oxygen', title: 'Breathing & Oxygen', title_ar: 'النسم والتنفس', icon: '🫁', color: 'bg-blue-50 text-blue-600' },
  { id: 'bones-joints', title: 'Bones & Joints', title_ar: 'العظام والمفاصل', icon: '🦴', color: 'bg-amber-50 text-amber-600' },
  { id: 'pain-relievers', title: 'Pain Relievers', title_ar: 'مسكنات الآلام', icon: '💪', color: 'bg-red-50 text-red-600' },
  { id: 'dexamethasone', title: 'Dexamethasone', title_ar: 'دكساميثازون', icon: '❤️', color: 'bg-rose-50 text-rose-600' },
  { id: 'energy-power', title: 'Energy & Power', title_ar: 'الطاقة والقدرة', icon: '⚡', color: 'bg-yellow-50 text-yellow-600' },
  { id: 'diuretics', title: 'Diuretics', title_ar: 'مدرات البول', icon: '🫘', color: 'bg-teal-50 text-teal-600' },
  { id: 'protectors-recovery', title: 'Protectors & Recovery', title_ar: 'الحماية والاستشفاء', icon: '🩹', color: 'bg-emerald-50 text-emerald-600' },
];

export const CategoryDetail = () => {
  const { categoryId } = useParams();
  const { language, isRtl } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName = categoryId === 'camel-race' ? 'Camel Race' : categoryId === 'horse-race' ? 'Horse Race' : categoryId === 'dog' ? 'Dog & Pets' : 'Cow & Cattle';
  const subCategories = subCategoriesMap[categoryId] || subCategoriesMap['camel-race'];

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/products?category=${categoryId}`)
      .then((data) => {
        if (data && data.success && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-10 text-start bg-[#F9F6F0]">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-bodytext-muted">
        <Link to="/" className="hover:text-brand-orange">Home</Link>
        <span>/</span>
        <span className="font-bold text-brown-dark">{categoryName}</span>
      </nav>

      {/* 1. SUB-CATEGORY CARDS GRID (1:1 Al Zaafran Screenshot 2) */}
      <div className="space-y-4">
        <h2 className="font-display font-black text-xl sm:text-2xl text-brown-dark">
          {categoryName} Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {subCategories.map((sub) => (
            <Link
              key={sub.id}
              to={`/shop?category=${categoryId}&subCategory=${sub.id}`}
              className="bg-white border border-surface-bordered rounded-3xl p-6 shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[260px] group"
            >
              <h3 className="font-display font-black text-lg sm:text-xl text-brown-dark group-hover:text-brand-orange transition-colors">
                {language === 'ar' ? sub.title_ar : sub.title}
              </h3>

              <div className="relative w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white shadow-inner overflow-hidden my-4 group-hover:scale-105 transition-transform">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="text-xs font-bold text-brand-orange group-hover:underline">
                Explore Products →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. MEDICAL CONDITIONS ICON GRID (1:1 Al Zaafran Screenshot 3) */}
      <div className="space-y-4 pt-4 border-t border-surface-bordered">
        <h2 className="font-display font-black text-xl sm:text-2xl text-brown-dark">
          Condition & Treatment Types
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {medicalConditions.map((cond) => (
            <Link
              key={cond.id}
              to={`/shop?subCategory=${cond.id}`}
              className="bg-white border border-surface-bordered rounded-2xl p-4 shadow-sm hover:shadow-warm-hover hover:border-brand-orange transition-all flex flex-col items-center justify-center space-y-2 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${cond.color} flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                {cond.icon}
              </div>
              <span className="font-display font-bold text-xs text-brown-dark leading-tight group-hover:text-brand-orange">
                {language === 'ar' ? cond.title_ar : cond.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. FEATURED CATEGORY PRODUCTS GRID */}
      <div className="space-y-4 pt-4 border-t border-surface-bordered">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-xl sm:text-2xl text-brown-dark">
            Featured {categoryName} Products
          </h2>
          <Link to={`/shop?category=${categoryId}`} className="text-xs font-bold text-brand-orange hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-surface-bordered" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
