const express = require("express");
const router = express.Router();
const currencyController = require("../../controllers/currencyController");
// const verifyToken = require("../../middlewares/verifyToken");

// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new currency
router.post("/", currencyController.createCurrency);

// Get all currencies
router.get("/", currencyController.getAllCurrencies);

// Get a currency by ID
router.get("/:id", currencyController.getCurrencyById);

// Update a currency
router.put("/:id", currencyController.updateCurrency);

// Delete a currency
router.delete("/:id", currencyController.deleteCurrency);

module.exports = router; 