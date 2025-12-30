import express from 'express';
import { connectDB, closeDB, connectHydraliteDB } from './db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = 5005;

// Minimal CORS (no dependency). Needed because frontend and API are on different origins.
const allowedOrigins = new Set([
  'https://prosmartconcepts-website.vercel.app',
  'https://prosmart-concepts.vercel.app',
  'http://localhost:5173',
  'http://localhost:5005',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'https://api.prosmart.in',
  'https://prosmart.in',
  'https://www.prosmart.in',

  'http://localhost:8081',
  'https://www.hydralite.in/',
  'https://hydralite.in'
]);
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Expires', '0');
//   next();
// });

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Prosmart API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Prosmart API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      productById: '/api/products/:id',
      categories: '/api/categories',
      categoriesWithProducts: '/api/categories-with-products',
      subcategories: '/api/subcategories'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

const startServer = async () => {
  try {
    await connectDB();
    await connectHydraliteDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await closeDB();
  process.exit(0);
});

startServer();

