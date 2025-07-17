const productController = require('../../controllers/productController');
const router = require('express').Router();


router.post('/', productController.CreateProductCategory);
router.get('/', productController.GetAllProductCategories);
router.get('/:id', productController.GetProductCategoryById);
router.put('/:id', productController.UpdateProductCategory);
router.delete('/:id', productController.DeleteProductCategory);

module.exports = router;