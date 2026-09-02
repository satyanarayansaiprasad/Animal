import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppBubble } from './components/WhatsAppBubble';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoryDetail } from './pages/CategoryDetail';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Consultation } from './pages/Consultation';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { DeliveryPolicy } from './pages/DeliveryPolicy';
import { TermsPrivacy } from './pages/TermsPrivacy';
import { NotFound } from './pages/NotFound';
import { AdminLayout } from './pages/admin/AdminLayout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-sand text-bodytext font-body selection:bg-brand-orange selection:text-white">
      <ScrollToTop />
      {!isAdminPath && <Header />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          
          {/* 3-Tier Taxonomy Routes */}
          <Route path="/category/:categorySlug" element={<CategoryDetail />} />
          <Route path="/category/:categorySlug/:subSlug" element={<CategoryDetail />} />
          <Route path="/category/:categorySlug/:subSlug/:level2Slug" element={<CategoryDetail />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/delivery-policy" element={<DeliveryPolicy />} />
          <Route path="/terms-privacy" element={<TermsPrivacy />} />
          
          {/* Admin Panel */}
          <Route path="/admin/*" element={<AdminLayout />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPath && (
        <>
          <Footer />
          <CartDrawer />
          <WhatsAppBubble />
        </>
      )}
    </div>
  );
}

export default App;
