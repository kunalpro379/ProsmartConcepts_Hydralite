import express from 'express';
import {
  getAllProducts,
  getProductById,
  getCategoriesWithProducts,
  getCategories,
  getSubcategories,
  getProductByCatSubcatId,
  getHydraliteProducts,
  getHydraliteHeroCustomization,
  updateHydraliteHeroCustomization,
  getHydraliteProductsPriority,
  updateHydraliteProductsPriority
} from '../controllers/productController.js';

const router = express.Router();

// Product routes
router.get('/products', getAllProducts);
router.get('/hydralite/products', getHydraliteProducts);
router.get('/products/:catidsubcatid/:productid', getProductByCatSubcatId);
router.get('/products/:id', getProductById);

// Category routes
router.get('/categories', getCategories);
router.get('/categories-with-products', getCategoriesWithProducts);

// Subcategory routes
router.get('/subcategories', getSubcategories);

// Hydralite hero section routes
router.get('/hydralite/hero-customization', getHydraliteHeroCustomization);
router.put('/hydralite/hero-customization', updateHydraliteHeroCustomization);

// Hydralite products priority routes
router.get('/hydralite/priority', getHydraliteProductsPriority);
router.put('/hydralite/priority', updateHydraliteProductsPriority);

// Health route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Prosmart API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;


