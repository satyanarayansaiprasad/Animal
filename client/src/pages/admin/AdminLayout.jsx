import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tag, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminSettings } from './AdminSettings';

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
    <div className="min-h-screen bg-[#F9F6F0] text-bodytext font-body text-start">
      {/* Premium Dark Brown Top Admin Bar */}
      <header className="bg-[#351809] text-white py-3.5 px-6 border-b border-[#5C2D15] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Al Namoos Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#D97706] shadow-md"
          />
          <div className="space-y-0.5">
            <span className="font-display font-extrabold text-white text-base block leading-none">
              AL NAMOOS VET — ADMIN PORTAL
            </span>
            <span className="text-[10px] text-amber-300/80 uppercase font-semibold tracking-wider">
              Single-Vendor Veterinary Management System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            to="/"
            className="px-3.5 py-1.5 bg-[#5C2D15] hover:bg-[#D97706] text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Admin Navigation Sidebar */}
        <aside className="md:col-span-3 space-y-3">
          <div className="bg-white border border-surface-bordered p-4 rounded-3xl space-y-2 shadow-warm">
            <span className="text-[10px] font-bold text-bodytext-muted uppercase tracking-wider px-3 block pb-1 border-b border-surface-bordered">
              Admin Control Panel
            </span>

            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Products Catalog (CRUD)', icon: Package },
              { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingCart },
              { id: 'settings', label: 'Store Settings & Rates', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all text-start shadow-sm ${
                    isActive
                      ? 'bg-[#D97706] text-white shadow-md ring-2 ring-[#D97706]/30'
                      : 'bg-white text-charcoal hover:bg-[#F3EBE0] hover:text-[#D97706] border border-surface-bordered'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#D97706]'}`} />
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
