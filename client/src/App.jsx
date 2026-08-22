import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
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
import { Account } from './pages/Account';

// Admin Routes
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-bodytext antialiased">
              <Header />
              <CartDrawer />
              <main className="flex-1">
                <Routes>
                  {/* Public Storefront Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/category/:categoryId" element={<CategoryDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderConfirmation />} />
                  <Route path="/consultation" element={<Consultation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                  <Route path="/terms-privacy" element={<TermsPrivacy />} />
                  <Route path="/account" element={<Account />} />

                  {/* Admin Portal Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
