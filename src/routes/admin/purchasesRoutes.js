const router = require('express').Router();
const purchaseController = require('../../controllers/purchasesController');

router.get('/purchases', purchaseController.getAllPurchases);
router.get('/purchases/:id', purchaseController.getPurchaseById);
router.post('/purchases', purchaseController.createPurchase);
router.put('/purchases/:id', purchaseController.updatePurchase);
router.delete('/purchases/:id', purchaseController.deletePurchase);

module.exports = router;
