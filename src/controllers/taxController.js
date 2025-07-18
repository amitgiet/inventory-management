const { Tax } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /taxs
 * @Method POST
 * @Params tax_name, tax_per
 * @Description Create a new tax
 * @Access Private
 */
const createTax = async (req, res) => {
  try {
    const rules = {
      tax_name: "required|string",
      tax_per: "required|numeric",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    const tax = await Tax.create(req.body);

    res.apiSuccess("Tax created successfully", tax);
  } catch (error) {
    console.error("Create Tax Error:", error);
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /taxs
 * @Method GET
 * @Description Get all taxes
 * @Access Private
 */
const getAllTaxs = async (req, res) => {
  try {
    const taxs = await Tax.findAll({
      order: [["tax_name", "ASC"]],
    });
    res.apiSuccess("Taxes fetched successfully", taxs);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /taxs/:id
 * @Method GET
 * @Params id
 * @Description Get a tax by ID
 * @Access Private
 */
const getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) return res.apiError("Tax not found", 404);
    res.apiSuccess("Tax fetched successfully", tax);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /taxs/:id
 * @Method PUT
 * @Params id
 * @Description Update a tax
 * @Access Private
 */
const updateTax = async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) return res.apiError("Tax not found", 404);

    const rules = {
      tax_name: "string",
      tax_per: "numeric",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    await tax.update(req.body);
    res.apiSuccess("Tax updated successfully", tax);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /taxs/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a tax
 * @Access Private
 */
const deleteTax = async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) return res.apiError("Tax not found", 404);

    await tax.destroy();
    res.apiSuccess("Tax deleted successfully");
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

module.exports = {
  createTax,
  getAllTaxs,
  getTaxById,
  updateTax,
  deleteTax,
}; 