import { getDB, getDatabase, getHydraliteDB } from '../db.js';

/**
 * Get all products with populated category and subcategory data
 */
export const getAllProducts = async (req, res) => {
  try {
    const db = getDB();
    const productsCol = db.collection('products');
    const categoriesCol = db.collection('categories');
    const subcategoriesCol = db.collection('subcategories');

    // Get query parameters for filtering
    const { category_id, subcategory_id, main_category } = req.query;

    // Build filter
    const filter = {};
    if (category_id) filter.category_id = category_id;
    if (subcategory_id) filter.subcategory_id = subcategory_id;
    if (main_category) filter.main_category = main_category;

    // Fetch products
    const products = await productsCol.find(filter).toArray();

    // Fetch all categories and subcategories for mapping
    const categories = await categoriesCol.find({}).toArray();
    const subcategories = await subcategoriesCol.find({}).toArray();

    // Create lookup maps
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.category_id] = cat.category_name;
    });

    const subcategoryMap = {};
    subcategories.forEach(sub => {
      subcategoryMap[sub.subcategory_id] = sub.subcategory_name;
    });

    // Enrich products with category and subcategory names
    const enrichedProducts = products.map(product => ({
      ...product,
      category_name: categoryMap[product.category_id] || 'Unknown',
      subcategory_name: subcategoryMap[product.subcategory_id] || 'Unknown'
    }));

    res.json({
      success: true,
      count: enrichedProducts.length,
      data: enrichedProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (req, res) => {
  try {
    const db = getDB();
    const productsCol = db.collection('products');
    const categoriesCol = db.collection('categories');
    const subcategoriesCol = db.collection('subcategories');

    const { id } = req.params;

    const product = await productsCol.findOne({ product_id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get category and subcategory names
    const category = await categoriesCol.findOne({ category_id: product.category_id });
    const subcategory = await subcategoriesCol.findOne({ subcategory_id: product.subcategory_id });

    const enrichedProduct = {
      ...product,
      category_name: category?.category_name || 'Unknown',
      subcategory_name: subcategory?.subcategory_name || 'Unknown'
    };

    res.json({
      success: true,
      data: enrichedProduct
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

/**
 * Get all categories with their subcategories and products
 * Returns data in the structure needed by the frontend
 */
export const getCategoriesWithProducts = async (req, res) => {
  try {
    const db = getDB();
    const productsCol = db.collection('products');
    const categoriesCol = db.collection('categories');
    const subcategoriesCol = db.collection('subcategories');

    // Fetch all data
    const products = await productsCol.find({}).toArray();
    const categories = await categoriesCol.find({}).toArray();
    const subcategories = await subcategoriesCol.find({}).toArray();

    // Build nested structure
    const categoryMap = {};

    // Initialize categories
    categories.forEach(cat => {
      categoryMap[cat.category_id] = {
        category_id: cat.category_id,
        category_name: cat.category_name,
        main_category: cat.main_category,
        subcategories: {}
      };
    });

    // Add subcategories to categories
    subcategories.forEach(sub => {
      if (categoryMap[sub.category_id]) {
        categoryMap[sub.category_id].subcategories[sub.subcategory_id] = {
          subcategory_id: sub.subcategory_id,
          subcategory_name: sub.subcategory_name,
          products: []
        };
      }
    });

    // Add products to subcategories (include main_category and normalized image_urls)
    products.forEach(product => {
      const category = categoryMap[product.category_id];
      if (category && category.subcategories[product.subcategory_id]) {
        category.subcategories[product.subcategory_id].products.push({
          product_id: product.product_id,
          product_name: product.product_name,
          product_title: product.product_title,
          product_description: product.product_description,
          product_price: product.product_price,
          image_urls: product.image_urls || product.product_images || [],
          category_id: product.category_id,
          subcategory_id: product.subcategory_id,
          subcategory: category.subcategories[product.subcategory_id].subcategory_name,
          main_category: category.main_category,
        });
      }
    });

    res.json({
      success: true,
      data: {
        categories: categoryMap
      }
    });
  } catch (error) {
    console.error('Error fetching categories with products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories with products',
      error: error.message
    });
  }
};

/**
 * Get all categories
 */
export const getCategories = async (req, res) => {
  try {
    const db = getDB();
    const categoriesCol = db.collection('categories');

    const categories = await categoriesCol.find({}).toArray();

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

/**
 * Get all subcategories or by category_id
 */
export const getSubcategories = async (req, res) => {
  try {
    const db = getDB();
    const subcategoriesCol = db.collection('subcategories');

    const { category_id } = req.query;
    const filter = category_id ? { category_id } : {};

    const subcategories = await subcategoriesCol.find(filter).toArray();

    res.json({
      success: true,
      count: subcategories.length,
      data: subcategories
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subcategories',
      error: error.message
    });
  }
};

// Get single product by catid, subcatid, and productid
export const getProductByCatSubcatId = async (req, res) => {
  try {
    const db = getDB();
    const productsCol = db.collection('products');
    const categoriesCol = db.collection('categories');
    const subcategoriesCol = db.collection('subcategories');
    const { catidsubcatid, productid } = req.params;

    // Regex to support both hyphen and underscore forms
    const match = catidsubcatid.match(/^(cat[-_][^/]+)(subcat[-_][^/]+)$/);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid catidsubcatid format.' });
    }
    const catid = match[1];
    const subcatid = match[2];

    // Now query for both split fields!
    const product = await productsCol.findOne({
      category_id: catid,
      subcategory_id: subcatid,
      product_id: productid
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const category = await categoriesCol.findOne({ category_id: product.category_id });
    const subcategory = await subcategoriesCol.findOne({ subcategory_id: product.subcategory_id });
    res.json({
      success: true,
      data: {
        ...product,
        category_name: category?.category_name || '',
        subcategory_name: subcategory?.subcategory_name || '',
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};


/**
 * Get all products from hydralite database
 */
export const getHydraliteProducts = async (req, res) => {
  try {
    const db = getHydraliteDB();
    const productsCol = db.collection('products');

    const products = await productsCol.find({}).toArray();

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching hydralite products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hydralite products',
      error: error.message
    });
  }
};

/**
 * Get Hydralite hero section customization
 */
export const getHydraliteHeroCustomization = async (req, res) => {
  try {
    const db = getHydraliteDB();
    const heroCol = db.collection('HeroSectionCustomization');

    let heroData = await heroCol.findOne({});

    // If no document exists, create one
    if (!heroData) {
      await heroCol.insertOne({ products: [] });
      heroData = { products: [] };
    }

    res.json({
      success: true,
      data: heroData
    });
  } catch (error) {
    console.error('Error fetching hero customization:', error);
    console.error('Full error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error fetching hero customization',
      error: error.message
    });
  }
};

/**
 * Update Hydralite hero section customization
 */
export const updateHydraliteHeroCustomization = async (req, res) => {
  try {
    const db = getHydraliteDB(); // hydralite
    const heroCol = db.collection('HeroSectionCustomization');
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Products must be an array'
      });
    }

    // Update or insert
    await heroCol.updateOne(
      {},
      { $set: { products, updated_at: new Date().toISOString() } },
      { upsert: true }
    );

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Error updating hero customization:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating hero customization',
      error: error.message
    });
  }
};

/**
 * Get Hydralite products priority
 */
export const getHydraliteProductsPriority = async (req, res) => {
  try {
    const db = getHydraliteDB();
    const priorityCol = db.collection('productsPriority');

    let priorityData = await priorityCol.findOne({});

    // If no document exists, create one
    if (!priorityData) {
      await priorityCol.insertOne({ products: [] });
      priorityData = { products: [] };
    }

    res.json({
      success: true,
      data: priorityData
    });
  } catch (error) {
    console.error('Error fetching products priority:', error);
    console.error('Full error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error fetching products priority',
      error: error.message
    });
  }
};

/**
 * Update Hydralite products priority
 */
export const updateHydraliteProductsPriority = async (req, res) => {
  try {
    const db = getHydraliteDB(); // hydralite
    const priorityCol = db.collection('productsPriority');
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Products must be an array'
      });
    }

    // Update or insert
    await priorityCol.updateOne(
      {},
      { $set: { products, updated_at: new Date().toISOString() } },
      { upsert: true }
    );

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Error updating products priority:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating products priority',
      error: error.message
    });
  }
};

