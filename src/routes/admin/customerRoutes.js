const express = require("express");
const router = express.Router();
const customerController = require("../../controllers/customerController");
// const verifyToken = require("../../middlewares/verifyToken");

// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new customer
router.post("/", customerController.createCustomer);

// Get all customers
router.get("/", customerController.getAllCustomers);

// Get a customer by ID
router.get("/:id", customerController.getCustomerById);

// Update a customer
router.put("/:id", customerController.updateCustomer);

// Delete a customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router; 