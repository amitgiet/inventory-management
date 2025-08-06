const express = require("express");
const router = express.Router();
const unitController = require("../../controllers/unitController");
// const verifyToken = require("../../middlewares/verifyToken");

// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new unit
router.post("/", unitController.createUnit);

// Get all units
router.get("/", unitController.getAllUnits);

// Get a unit by ID
router.get("/:id", unitController.getUnitById);

// Update a unit
router.put("/:id", unitController.updateUnit);

// Delete a unit
router.delete("/:id", unitController.deleteUnit);

module.exports = router; 