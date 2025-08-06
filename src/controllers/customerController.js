const { Customer } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /customers
 * @Method POST
 * @Params customer_name, customer_email, customer_phone, city, country, address
 * @Description Create a new customer
 * @Access Private
 */
const createCustomer = async (req, res) => {
  try {
    const rules = {
      customer_name: "required|string",
      customer_email: "required|email",
      customer_phone: "required|string",
      city: "required|string",
      country: "required|string",
      address: "required|string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    const customer = await Customer.create(req.body);

    res.apiSuccess("Customer created successfully", customer);
  } catch (error) {
    console.error("Create Customer Error:", error);
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /customers
 * @Method GET
 * @Description Get all customers
 * @Access Private
 */
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      order: [["customer_name", "ASC"]],
    });
    res.apiSuccess("Customers fetched successfully", customers);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /customers/:id
 * @Method GET
 * @Params id
 * @Description Get a customer by ID
 * @Access Private
 */
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.apiError("Customer not found", 404);
    res.apiSuccess("Customer fetched successfully", customer);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /customers/:id
 * @Method PUT
 * @Params id
 * @Description Update a customer
 * @Access Private
 */
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.apiError("Customer not found", 404);

    const rules = {
      customer_name: "string",
      customer_email: "email",
      customer_phone: "string",
      city: "string",
      country: "string",
      address: "string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    await customer.update(req.body);
    res.apiSuccess("Customer updated successfully", customer);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /customers/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a customer
 * @Access Private
 */
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.apiError("Customer not found", 404);

    await customer.destroy();
    res.apiSuccess("Customer deleted successfully");
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}; 