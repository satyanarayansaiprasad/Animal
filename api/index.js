import express from 'express';
import cors from 'cors';
import apiRoutes from '../server/routes/api.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'online',
    platform: 'Vercel Serverless API',
    store: 'Al Namoos Veterinary Store & Pharmacy API',
    timestamp: new Date().toISOString(),
  });
});

// Middleware to normalize req.url so sub-router matches whether Vercel passes /api/settings or /settings
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
  next();
});

// Primary Router Mount
app.use('/', apiRoutes);

// Export Handler function compatible with Vercel @vercel/node
export default (req, res) => {
  return app(req, res);
};
