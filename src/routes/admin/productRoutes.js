const productController = require('../../controllers/productController');
const router = require('express').Router();


router.post('/', productController.CreateProduct);

router.get('/', productController.GetAllProducts);
router.get('/:id', productController.GetProductById);

router.put('/:id', productController.UpdateProduct);

router.delete('/:id', productController.DeleteProduct);

module.exports = router;