import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { JsonRepository } from '../repositories/jsonRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

// Instantiate Abstract JSON Repositories
const productRepo = new JsonRepository(path.join(dataDir, 'products.json'));
const categoryRepo = new JsonRepository(path.join(dataDir, 'categories.json'));
const orderRepo = new JsonRepository(path.join(dataDir, 'orders.json'));
const settingRepo = new JsonRepository(path.join(dataDir, 'settings.json'));
const customerRepo = new JsonRepository(path.join(dataDir, 'customers.json'));
const bannerRepo = new JsonRepository(path.join(dataDir, 'banners.json'));
const contactRepo = new JsonRepository(path.join(dataDir, 'contacts.json'));

const router = express.Router();

// --- PRODUCTS ---
router.get('/products', async (req, res) => {
  try {
    const { category, type, search, in_stock, sort, minPrice, maxPrice, featured } = req.query;
    let products = await productRepo.findAll();

    if (category) {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (type) {
      products = products.filter((p) => p.type.toLowerCase() === type.toLowerCase());
    }

    if (in_stock === 'true') {
      products = products.filter((p) => p.in_stock === true);
    }

    if (featured === 'true') {
      products = products.filter((p) => p.is_featured === true);
    }

    if (minPrice) {
      products = products.filter((p) => Number(p.price_omr) >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => Number(p.price_omr) <= Number(maxPrice));
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          (p.name_en && p.name_en.toLowerCase().includes(q)) ||
          (p.name_ar && p.name_ar.includes(q)) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.desc_en && p.desc_en.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort === 'price_asc') {
      products.sort((a, b) => a.price_omr - b.price_omr);
    } else if (sort === 'price_desc') {
      products.sort((a, b) => b.price_omr - a.price_omr);
    } else if (sort === 'rating') {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await productRepo.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const newProduct = await productRepo.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await productRepo.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const success = await productRepo.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- CATEGORIES ---
router.get('/categories', async (req, res) => {
  try {
    const categories = await categoryRepo._readData();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- SETTINGS ---
router.get('/settings', async (req, res) => {
  try {
    const settings = await settingRepo._readData();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/settings', async (req, res) => {
  try {
    await settingRepo._writeData(req.body);
    res.json({ success: true, data: req.body });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- BANNERS ---
router.get('/banners', async (req, res) => {
  try {
    const banners = await bannerRepo._readData();
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/banners', async (req, res) => {
  try {
    await bannerRepo._writeData(req.body);
    res.json({ success: true, data: req.body });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- ORDERS ---
router.get('/orders', async (req, res) => {
  try {
    const orders = await orderRepo.findAll();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const order = await orderRepo.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const orderId = `ALN-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderData = {
      id: orderId,
      status: 'pending',
      payment_status: req.body.payment_method === 'apple_pay' ? 'paid' : 'pending_transfer',
      notification_recipient: 'foxx20041@hotmail.com',
      ...req.body,
    };
    const createdOrder = await orderRepo.create(orderData);
    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status, payment_status } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (payment_status) updates.payment_status = payment_status;

    const updatedOrder = await orderRepo.update(req.params.id, updates);
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- CONTACT & INQUIRY SUBMISSIONS ---
router.post('/contact', async (req, res) => {
  try {
    const submission = {
      id: `MSG-${Date.now()}`,
      target_email: 'foxx20041@hotmail.com',
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    const saved = await contactRepo.create(submission);
    console.log(`📩 Contact Form Submission logged for foxx20041@hotmail.com:`, saved);
    res.status(201).json({ success: true, message: 'Inquiry transmitted to foxx20041@hotmail.com', data: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- CUSTOMERS ---
router.get('/customers', async (req, res) => {
  try {
    const customers = await customerRepo.findAll();
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- ADMIN AUTH ---
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'alnamoos2026') {
    return res.json({
      success: true,
      token: 'admin-session-token-alnamoos-2026',
      user: { username: 'admin', role: 'administrator' },
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

export default router;
