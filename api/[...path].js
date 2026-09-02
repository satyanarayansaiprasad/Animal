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

// Normalize req.url so sub-router matches whether Vercel passes /api/settings or /settings
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
  next();
});

// Primary Router Mount
app.use('/', apiRoutes);

export default (req, res) => {
  return app(req, res);
};
