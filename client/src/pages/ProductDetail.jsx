import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Truck, MessageCircle, ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('dosage'); // 'dosage' | 'details' | 'warnings'

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProduct(data.data);

          // Fetch related products of same category
          fetch(`/api/products?category=${data.data.category}`)
            .then((r) => r.json())
            .then((relData) => {
              if (relData.success && relData.data) {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id).slice(0, 4));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-clay border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-display font-semibold text-charcoal text-sm">Loading Veterinary Product Specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <PetroglyphIcon species="camel" size="xl" className="mx-auto" />
        <h2 className="font-display font-bold text-charcoal text-2xl">Product Not Found</h2>
        <p className="text-xs text-bodytext-muted">The requested veterinary supply item could not be retrieved.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-clay text-white rounded-xl font-bold text-xs inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const title = language === 'ar' ? product.name_ar : product.name_en;
  const description = language === 'ar' ? product.desc_ar : product.desc_en;
  const dosage = language === 'ar' ? product.dosage_ar : product.dosage_en;
  const unitPrice = product.sale_price_omr || product.price_omr;

  const whatsappInquiryUrl = `https://wa.me/96895266144?text=${encodeURIComponent(
    `السلام عليكم، أستفسر عن المنتج: ${product.name_ar} (SKU: ${product.sku}) / Inquiring about ${product.name_en}`
  )}`;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-bodytext-muted">
        <Link to="/" className="hover:text-charcoal">{t('home')}</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-charcoal">{t('shop')}</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-charcoal capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-charcoal font-semibold truncate max-w-xs">{title}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery & Petroglyph Badge */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square bg-surface border border-surface-bordered rounded-3xl overflow-hidden shadow-warm flex items-center justify-center p-6">
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
              <PetroglyphIcon species={product.category} size="md" />
              {product.sale_price_omr && (
                <span className="bg-gold text-charcoal font-display font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                  SPECIAL OFFER
                </span>
              )}
            </div>

            <img
              src={product.image || '/favicon.svg'}
              alt={title}
              className="max-h-full max-w-full object-contain rounded-2xl"
            />
          </div>
        </div>

        {/* Right Column: Product Information & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-teal-light text-teal font-bold text-xs capitalize">
                {product.type}
              </span>
              <span className="text-xs font-mono text-bodytext-muted">SKU: {product.sku}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-charcoal leading-snug">
              {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-mono font-bold text-charcoal">{product.rating || 4.9}</span>
              <span className="text-bodytext-muted">({product.reviews_count || 18} reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-surface border border-surface-bordered p-4 sm:p-5 rounded-2xl space-y-2">
            <div className="flex items-baseline gap-3">
              {product.sale_price_omr && (
                <span className="text-sm text-bodytext-muted line-through font-mono-price">
                  {formatPrice(product.price_omr)}
                </span>
              )}
              <span className="font-mono-price font-extrabold text-2xl sm:text-3xl text-clay">
                {formatPrice(unitPrice)}
              </span>
            </div>

            {/* Stock State */}
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.in_stock ? 'bg-teal' : 'bg-clay'
                }`}
              />
              <span className={`font-semibold ${product.in_stock ? 'text-teal' : 'text-clay'}`}>
                {product.in_stock ? `${t('inStock')} (${product.stock_quantity || 50} units available)` : t('outOfStock')}
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-bodytext text-sm leading-relaxed">{description}</p>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-charcoal">{t('quantity')}:</span>
              <div className="flex items-center border border-surface-bordered rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-charcoal hover:bg-sand font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 font-mono font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-charcoal hover:bg-sand font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`w-full py-4 rounded-2xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 ${
                  added
                    ? 'bg-teal text-white'
                    : product.in_stock
                    ? 'bg-clay hover:bg-clay-hover text-white'
                    : 'bg-sand text-bodytext-muted cursor-not-allowed'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>{t('inquireWhatsapp')}</span>
              </a>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-bordered text-xs text-bodytext-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>Certified Pharmacy Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-clay" />
              <span>Cold-Chain GCC Transport</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Detailed Specifications & Veterinary Directions */}
      <div className="bg-surface border border-surface-bordered rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm">
        <div className="flex border-b border-surface-bordered gap-6 text-sm font-display font-bold">
          <button
            onClick={() => setActiveTab('dosage')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'dosage' ? 'border-clay text-clay' : 'border-transparent text-bodytext-muted hover:text-charcoal'
            }`}
          >
            {t('dosageInstructions')}
          </button>
          <button
            onClick={() => setActiveTab('warnings')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'warnings' ? 'border-clay text-clay' : 'border-transparent text-bodytext-muted hover:text-charcoal'
            }`}
          >
            {t('usageWarnings')}
          </button>
        </div>

        <div className="text-sm text-bodytext leading-relaxed">
          {activeTab === 'dosage' && (
            <div className="space-y-4">
              <div className="p-4 bg-sand rounded-2xl border border-surface-bordered flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-charcoal text-xs sm:text-sm">Official Veterinary Dosage Direction</h4>
                  <p className="text-xs text-bodytext-muted mt-1">{dosage || 'Follow licensed veterinarian guidance or product packaging instructions.'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-2 text-xs text-bodytext-muted">
              <p>• Store in cool temperature-controlled conditions (below 25°C).</p>
              <p>• Keep out of reach of children and unauthorized farm handlers.</p>
              <p>• Observe mandatory withdrawal periods prior to race events or slaughter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-charcoal">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
