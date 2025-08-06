const { Unit } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /units
 * @Method POST
 * @Params name, short_name, operator, operation_value
 * @Description Create a new unit
 * @Access Private
 */
const createUnit = async (req, res) => {
  try {
    const rules = {
      name: "required|string",
      short_name: "required|string",
      operator: "required|string",
      operation_value: "integer",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const unit = await Unit.create(req.body);

    res.apiSuccess("Unit created successfully", unit);
  } catch (error) {
    console.error("Create Unit Error:", error);
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /units
 * @Method GET
 * @Description Get all units
 * @Access Private
 */
const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.findAll({
      order: [["name", "ASC"]],
    });
    res.apiSuccess("Units fetched successfully", units);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /units/:id
 * @Method GET
 * @Params id
 * @Description Get a unit by ID
 * @Access Private
 */
const getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.apiError("Unit not found", 404);
    res.apiSuccess("Unit fetched successfully", unit);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /units/:id
 * @Method PUT
 * @Params id
 * @Description Update a unit
 * @Access Private
 */
const updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.apiError("Unit not found", 404);

    const rules = {
      name: "string",
      short_name: "string",
      operator: "string",
      operation_value: "integer",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    await unit.update(req.body);
    res.apiSuccess("Unit updated successfully", unit);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /units/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a unit
 * @Access Private
 */
const deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.apiError("Unit not found", 404);

    await unit.destroy();
    res.apiSuccess("Unit deleted successfully");
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

module.exports = {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
}; 