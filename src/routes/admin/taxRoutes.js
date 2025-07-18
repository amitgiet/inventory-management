const express = require("express");
const router = express.Router();
const taxController = require("../../controllers/taxController");
// const verifyToken = require("../../middlewares/verifyToken");

// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new tax
router.post("/", taxController.createTax);

// Get all taxes
router.get("/", taxController.getAllTaxs);

// Get a tax by ID
router.get("/:id", taxController.getTaxById);

// Update a tax
router.put("/:id", taxController.updateTax);

// Delete a tax
router.delete("/:id", taxController.deleteTax);

module.exports = router; 