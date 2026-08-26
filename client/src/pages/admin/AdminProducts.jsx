import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const AdminProducts = () => {
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    sku: '',
    name_en: '',
    name_ar: '',
    desc_en: '',
    desc_ar: '',
    dosage_en: '',
    dosage_ar: '',
    category: 'camel',
    type: 'medicine',
    price_omr: 15.0,
    price_aed: 143.0,
    sale_price_omr: '',
    in_stock: true,
    stock_quantity: 50,
    is_featured: false,
    is_best_seller: false,
    image: '/images/products/camel_med_1.jpg',
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) setProducts(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      sku: `ALN-${Math.floor(1000 + Math.random() * 9000)}`,
      name_en: '',
      name_ar: '',
      desc_en: '',
      desc_ar: '',
      dosage_en: '',
      dosage_ar: '',
      category: 'camel',
      type: 'medicine',
      price_omr: 15.0,
      price_aed: 143.0,
      sale_price_omr: '',
      in_stock: true,
      stock_quantity: 50,
      is_featured: false,
      is_best_seller: false,
      image: '/images/products/camel_med_1.jpg',
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p.id);
    setFormData({
      sku: p.sku || '',
      name_en: p.name_en || '',
      name_ar: p.name_ar || '',
      desc_en: p.desc_en || '',
      desc_ar: p.desc_ar || '',
      dosage_en: p.dosage_en || '',
      dosage_ar: p.dosage_ar || '',
      category: p.category || 'camel',
      type: p.type || 'medicine',
      price_omr: p.price_omr || 0,
      price_aed: p.price_aed || 0,
      sale_price_omr: p.sale_price_omr || '',
      in_stock: p.in_stock ?? true,
      stock_quantity: p.stock_quantity || 50,
      is_featured: p.is_featured ?? false,
      is_best_seller: p.is_best_seller ?? false,
      image: p.image || '/images/products/camel_med_1.jpg',
    });
    setModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';

    const payload = {
      ...formData,
      price_omr: Number(formData.price_omr),
      price_aed: Number(formData.price_aed) || Number(formData.price_omr) * 9.55,
      sale_price_omr: formData.sale_price_omr ? Number(formData.sale_price_omr) : null,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchProducts();
      }
    } catch {
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch {
      alert('Error deleting product');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name_ar?.includes(searchQuery) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-bordered pb-4">
        <div>
          <h2 className="font-display font-black text-2xl text-charcoal">Products Catalog Management</h2>
          <p className="text-xs text-bodytext-muted">Add, edit, or delete veterinary items with bilingual fields.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter products by name or SKU..."
          className="w-full bg-surface border border-surface-bordered rounded-xl py-2 px-3 text-xs text-charcoal"
        />
        <Search className="w-4 h-4 absolute top-2.5 right-3 text-bodytext-muted" />
      </div>

      {/* Table */}
      <div className="bg-surface border border-surface-bordered rounded-3xl overflow-hidden shadow-warm">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-start border-collapse">
            <thead className="bg-sand border-b border-surface-bordered text-charcoal font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 text-start">Image</th>
                <th className="p-3 text-start">SKU</th>
                <th className="p-3 text-start">English Title</th>
                <th className="p-3 text-start">Arabic Title</th>
                <th className="p-3 text-start">Species</th>
                <th className="p-3 text-start">Type</th>
                <th className="p-3 text-start">Price (OMR)</th>
                <th className="p-3 text-start">Stock</th>
                <th className="p-3 text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-bordered">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-sand/30">
                  <td className="p-3">
                    <img src={p.image || '/favicon.svg'} alt="" className="w-10 h-10 object-cover rounded-lg border bg-sand" />
                  </td>
                  <td className="p-3 font-mono font-bold text-brand-orange">{p.sku}</td>
                  <td className="p-3 font-bold text-charcoal max-w-xs truncate">{p.name_en}</td>
                  <td className="p-3 text-charcoal max-w-xs truncate dir-rtl">{p.name_ar}</td>
                  <td className="p-3 capitalize font-semibold">{p.category}</td>
                  <td className="p-3 capitalize font-semibold text-brand-orange">{p.type}</td>
                  <td className="p-3 font-mono font-bold">{formatPrice(p.price_omr)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.in_stock ? 'bg-teal-light text-teal' : 'bg-clay-light text-clay'}`}>
                      {p.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(p)} className="p-1.5 hover:bg-sand rounded text-charcoal"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 hover:bg-sand rounded text-clay"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-surface-bordered rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-surface-bordered pb-3">
              <h3 className="font-display font-bold text-charcoal text-lg">
                {editingId ? 'Edit Veterinary Product' : 'Add New Veterinary Product'}
              </h3>
              <button onClick={() => setModalOpen(false)}><X className="w-6 h-6 text-charcoal" /></button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pe-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-charcoal block mb-1">SKU *</label>
                  <input type="text" required value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 font-mono" />
                </div>
                <div>
                  <label className="font-bold text-charcoal block mb-1">Price (OMR) *</label>
                  <input type="number" step="0.1" required value={formData.price_omr} onChange={(e) => setFormData({ ...formData, price_omr: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-charcoal block mb-1">Product Title (English) *</label>
                  <input type="text" required value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5" />
                </div>
                <div>
                  <label className="font-bold text-charcoal block mb-1">Product Title (Arabic) *</label>
                  <input type="text" required value={formData.name_ar} onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 dir-rtl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-charcoal block mb-1">Species Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 font-bold">
                    <option value="camel">Camel (الإبل والهجن)</option>
                    <option value="horse">Horse (الخيل)</option>
                    <option value="cow">Cow / Cattle (الأبقار والمواشي)</option>
                    <option value="dog">Dog / Pets (الكلاب والأليفة)</option>
                    <option value="falcon">Falcon / Birds (الصقور والطيور)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-charcoal block mb-1">Product Type *</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 font-bold">
                    <option value="medicine">Veterinary Medicine</option>
                    <option value="supplements">Supplements & Vitamins</option>
                    <option value="feed">Feed & Nutrition</option>
                    <option value="equipment">Equipment & Supplies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-charcoal block mb-1">Image URL / Path *</label>
                <input type="text" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 font-mono" />
              </div>

              <div>
                <label className="font-bold text-charcoal block mb-1">Dosage Directions (Arabic)</label>
                <textarea rows="2" value={formData.dosage_ar} onChange={(e) => setFormData({ ...formData, dosage_ar: e.target.value })} className="w-full bg-sand/50 border rounded-xl p-2.5 dir-rtl" />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" checked={formData.in_stock} onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })} className="w-4 h-4 text-brand-orange" />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="w-4 h-4 text-brand-orange" />
                  <span>Featured Item</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-brand-orange text-white rounded-xl font-bold">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
