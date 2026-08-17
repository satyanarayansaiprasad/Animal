import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tag, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminSettings } from './AdminSettings';
import { PetroglyphIcon } from '../../components/PetroglyphIcon';

export const AdminLayout = () => {
  const [token, setToken] = useState(() => localStorage.getItem('alnamoos_admin_token'));
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'settings'

  if (!token) {
    return <AdminLogin onLogin={(tok) => setToken(tok)} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('alnamoos_admin_token');
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-sand text-bodytext font-body">
      {/* Top Admin Bar */}
      <header className="bg-charcoal text-sand py-3 px-6 border-b border-charcoal-light flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Al Namoos Logo"
            className="w-9 h-9 rounded-full object-cover border border-gold"
          />
          <span className="font-display font-extrabold text-white text-base">
            AL NAMOOS VET — ADMIN PORTAL
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link to="/" className="text-gold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-charcoal-light hover:bg-clay text-white rounded font-bold transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Admin Navigation Sidebar */}
        <aside className="md:col-span-3 space-y-2">
          <div className="bg-surface border border-surface-bordered p-4 rounded-3xl space-y-1 shadow-warm">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Products Catalog (CRUD)', icon: Package },
              { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingCart },
              { id: 'settings', label: 'Store Settings & Rates', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-start ${
                    activeTab === tab.id
                      ? 'bg-clay text-white shadow-md'
                      : 'hover:bg-sand text-charcoal'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Admin Main Workspace */}
        <main className="md:col-span-9">
          {activeTab === 'dashboard' && <AdminDashboard onNavigate={(t) => setActiveTab(t)} />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
