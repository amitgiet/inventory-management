const { Location } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /locations
 * @Method POST
 * @Params location_name, location_address
 * @Description Create a new location
 * @Access Private
 */
const createLocation = async (req, res) => {
  try {
    const rules = {
      location_name: "required|string",
      location_address: "required|string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    const location = await Location.create(req.body);

    res.apiSuccess("Location created successfully", location);
  } catch (error) {
    console.error("Create Location Error:", error);
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /locations
 * @Method GET
 * @Description Get all locations
 * @Access Private
 */
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      order: [["location_name", "ASC"]],
    });
    res.apiSuccess("Locations fetched successfully", locations);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /locations/:id
 * @Method GET
 * @Params id
 * @Description Get a location by ID
 * @Access Private
 */
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.apiError("Location not found", 404);
    res.apiSuccess("Location fetched successfully", location);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /locations/:id
 * @Method PUT
 * @Params id
 * @Description Update a location
 * @Access Private
 */
const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.apiError("Location not found", 404);

    const rules = {
      location_name: "string",
      location_address: "string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    await location.update(req.body);
    res.apiSuccess("Location updated successfully", location);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /locations/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a location
 * @Access Private
 */
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.apiError("Location not found", 404);

    await location.destroy();
    res.apiSuccess("Location deleted successfully");
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
}; 