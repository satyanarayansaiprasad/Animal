import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from '../server/routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
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

// Middleware to normalize req.url so Express sub-routers match whether Vercel passes /api/settings or /settings
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
  next();
});

// Primary API Router Mount
app.use('/', apiRoutes);

export default app;
