const productController = require('../../controllers/productController');
const router = require('express').Router();
const { fileUploader } = require('../../utils/uploadFile');
// const verifyToken = require("../../middlewares/verifyToken");


// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new product with image upload
router.post('/', fileUploader('products', [
  { name: 'image', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), productController.CreateProduct);

// Get all products
router.get('/', productController.GetAllProducts);

// Get a product by ID
router.get('/:id', productController.GetProductById);

// Update a product with image upload
router.put('/:id', fileUploader('products', [
  { name: 'image', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), productController.UpdateProduct);

// Delete a product
router.delete('/:id', productController.DeleteProduct);

module.exports = router;