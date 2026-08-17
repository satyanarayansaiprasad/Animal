import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend clients
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    store: 'Al Namoos Veterinary Store & Pharmacy API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', apiRoutes);

// Serve static product images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Al Namoos Veterinary Express Backend running on http://0.0.0.0:${PORT}`);
});
