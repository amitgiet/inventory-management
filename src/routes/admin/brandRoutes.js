const brandController = require('../../controllers/brandController');
const router = require('express').Router();


router.post('/', brandController.createBrand);
router.get('/', brandController.getAllBrands);  
router.get('/:id', brandController.getBrandById);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;