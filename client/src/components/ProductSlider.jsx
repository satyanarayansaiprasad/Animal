import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from './ProductCard';
import { PetroglyphIcon } from './PetroglyphIcon';

export const ProductSlider = ({
  title,
  subtitle,
  species = null,
  viewAllLink = '/shop',
  products = [],
  loading = false,
}) => {
  const { isRtl, t } = useLanguage();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    const factor = direction === 'left' ? -1 : 1;
    sliderRef.current.scrollBy({
      left: factor * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="space-y-4 sm:space-y-6 text-start">
      {/* Slider Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-surface-bordered pb-4">
        <div className="flex items-center gap-3">
          {species && <PetroglyphIcon species={species} size="md" />}
          <div>
            <h2 className="font-display font-black text-xl sm:text-3xl text-charcoal flex items-center gap-2">
              <span>{title}</span>
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-bodytext-muted mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Controls: Prev/Next Buttons + View All */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-xs font-bold text-clay hover:underline flex items-center gap-1 me-2"
            >
              <span>{t('startShopping')}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl bg-surface border border-surface-bordered text-charcoal hover:bg-clay hover:text-white transition-colors shadow-sm active:scale-95 touch-target"
              aria-label="Previous Slide"
            >
              {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl bg-surface border border-surface-bordered text-charcoal hover:bg-clay hover:text-white transition-colors shadow-sm active:scale-95 touch-target"
              aria-label="Next Slide"
            >
              {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      {loading ? (
        <div className="flex gap-4 overflow-hidden py-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-64 sm:w-72 h-80 bg-surface rounded-3xl animate-pulse border border-surface-bordered flex-shrink-0"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="p-8 bg-surface rounded-3xl border border-surface-bordered text-center text-xs text-bodytext-muted">
          No products available in this section currently.
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-3 px-1 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-64 sm:w-72 flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
