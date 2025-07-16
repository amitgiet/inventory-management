const productController = require('../../controllers/productController');
const router = require('express').Router();


// Create
router.post('/', productController.createCategory);

// Read (all + by ID)
router.get('/', productController.getAllCategories);
router.get('/:id', productController.getCategoryById);

// Update
router.put('/:id', productController.updateCategory);

// Delete
router.delete('/:id', productController.deleteCategory);

module.exports = router;