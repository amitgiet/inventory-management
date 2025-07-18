const express = require("express");
const router = express.Router();
const purchasePaymentController = require("../../controllers/purchasePaymentController");

router.post("/", purchasePaymentController.createPurchasePayment);
router.get("/", purchasePaymentController.getAllPurchasePayments);
router.get("/:id", purchasePaymentController.getPurchasePaymentById);
router.put("/:id", purchasePaymentController.updatePurchasePayment);
router.delete("/:id", purchasePaymentController.deletePurchasePayment);

module.exports = router;
