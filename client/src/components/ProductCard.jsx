import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { PetroglyphIcon } from './PetroglyphIcon';

export const ProductCard = ({ product }) => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const title = language === 'ar' ? product.name_ar : product.name_en;
  const priceOmr = product.sale_price_omr || product.price_omr;
  const hasDiscount = !!product.sale_price_omr;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white border border-surface-bordered rounded-2xl sm:rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col h-full text-start">
      {/* Top Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Animal Species Photo Avatar Badge */}
        <div className="pointer-events-auto shadow-sm">
          <PetroglyphIcon species={product.category} size="sm" />
        </div>

        {/* Sale / Discount Orange Pill Badge */}
        {hasDiscount && (
          <span className="pointer-events-auto bg-[#D97706] text-white font-display font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
            SALE
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square bg-[#F9F6F0] overflow-hidden p-4">
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-sand text-bodytext-muted">
            <PetroglyphIcon species={product.category} size="lg" />
            <span className="text-[10px] mt-2 font-mono">{product.sku}</span>
          </div>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <span className="bg-white text-[#351809] p-2.5 rounded-full shadow-md hover:bg-[#D97706] hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category Pill & Stock Status */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-[#D97706] font-bold capitalize tracking-wide">
              {product.type}
            </span>
            <span
              className={`font-semibold ${
                product.in_stock ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'
              }`}
            >
              {product.in_stock ? t('inStock') : t('outOfStock')}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-display font-bold text-bodytext text-xs sm:text-sm line-clamp-2 hover:text-[#D97706] transition-colors leading-snug min-h-[2.5rem]">
              {title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[#D97706] text-xs pt-0.5">
            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
            <span className="font-mono font-bold text-bodytext">{product.rating || 4.9}</span>
            <span className="text-bodytext-muted text-[10px]">({product.reviews_count || 12})</span>
          </div>
        </div>

        {/* Price & Add to Cart Action Button */}
        <div className="pt-3 border-t border-surface-bordered flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col text-start">
            {hasDiscount && (
              <span className="text-[10px] sm:text-xs text-bodytext-muted line-through font-mono-price">
                {formatPrice(product.price_omr)}
              </span>
            )}
            <span className="font-mono-price font-bold text-sm sm:text-base text-[#D97706] leading-tight">
              {formatPrice(priceOmr)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.in_stock}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 shadow-md touch-target ${
              added
                ? 'bg-emerald-700 text-white'
                : product.in_stock
                ? 'bg-[#D97706] hover:bg-[#B45309] text-white'
                : 'bg-sand text-bodytext-muted cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] text-white">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] whitespace-nowrap text-white">{t('addToCart')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
