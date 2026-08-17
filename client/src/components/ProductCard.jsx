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
  const description = language === 'ar' ? product.desc_ar : product.desc_en;
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
    <div className="group relative bg-surface-card border border-surface-bordered rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col h-full">
      {/* Top Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Petroglyph Animal Species Badge */}
        <div className="pointer-events-auto shadow-sm">
          <PetroglyphIcon species={product.category} size="sm" />
        </div>

        {/* Sale / Discount Gold Badge */}
        {hasDiscount && (
          <span className="pointer-events-auto bg-gold text-charcoal font-display font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            SALE
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square bg-sand/40 overflow-hidden">
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-sand-light text-bodytext-muted">
            <PetroglyphIcon species={product.category} size="lg" />
            <span className="text-xs mt-2 font-mono">{product.sku}</span>
          </div>
        )}

        {/* Hover Quick Action Layer */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <span className="bg-surface text-charcoal p-2.5 rounded-full shadow-md hover:bg-clay hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {/* Category Pill & Stock Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-teal font-semibold capitalize tracking-wide">
              {product.type}
            </span>
            <span
              className={`font-medium ${
                product.in_stock ? 'text-teal' : 'text-clay font-bold'
              }`}
            >
              {product.in_stock ? t('inStock') : t('outOfStock')}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display font-bold text-charcoal text-sm sm:text-base line-clamp-2 hover:text-clay transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-gold text-xs">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="font-mono font-semibold text-charcoal">{product.rating || 4.9}</span>
            <span className="text-bodytext-muted text-[11px]">({product.reviews_count || 12})</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-4 mt-4 border-t border-surface-bordered flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-bodytext-muted line-through font-mono-price">
                {formatPrice(product.price_omr)}
              </span>
            )}
            <span className="font-mono-price font-bold text-base sm:text-lg text-clay">
              {formatPrice(priceOmr)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.in_stock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm ${
              added
                ? 'bg-teal text-white'
                : product.in_stock
                ? 'bg-clay hover:bg-clay-hover text-white'
                : 'bg-sand text-bodytext-muted cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{t('addToCart')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
