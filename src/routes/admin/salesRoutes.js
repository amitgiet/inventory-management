const express = require("express");
const router = express.Router();
const salesController = require("../../controllers/salesController");
// const verifyToken = require("../../middlewares/verifyToken");

// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new sale
router.post("/", salesController.createSale);

// Get all sales
router.get("/", salesController.getAllSales);

// Get a sale by ID
router.get("/:id", salesController.getSaleById);

// Update a sale
router.put("/:id", salesController.updateSale);

// Delete a sale
router.delete("/:id", salesController.deleteSale);

module.exports = router; 