const express = require('express');
const router = express.Router();
const manufacturedPurchaseController = require('../../controllers/manufacturedPurchaseCotroller');

router.post('/', manufacturedPurchaseController.createPurchase);
router.get('/', manufacturedPurchaseController.getAllPurchases);
router.get('/:id', manufacturedPurchaseController.getPurchaseById);
router.put('/:id', manufacturedPurchaseController.updatePurchase);
router.delete('/:id', manufacturedPurchaseController.deletePurchase);

module.exports = router;
