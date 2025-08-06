const express = require("express");
const router = express.Router();
const locationController = require("../../controllers/locationController");
// const verifyToken = require("../../middlewares/verifyToken");

// Apply token verification middleware to all routes
// router.use(verifyToken);

// Create a new location
router.post("/", locationController.createLocation);

// Get all locations
router.get("/", locationController.getAllLocations);

// Get a location by ID
router.get("/:id", locationController.getLocationById);

// Update a location
router.put("/:id", locationController.updateLocation);

// Delete a location
router.delete("/:id", locationController.deleteLocation);

module.exports = router; 