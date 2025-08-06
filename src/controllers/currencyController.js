const { Currency } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /currencies
 * @Method POST
 * @Params currency_name, code, symbol, thousand_separator, decimal_separator, exchange_rate
 * @Description Create a new currency
 * @Access Private
 */
const createCurrency = async (req, res) => {
  try {
    const rules = {
      currency_name: "required|string",
      code: "required|string",
      symbol: "required|string",
      thousand_separator: "required|string",
      decimal_separator: "required|string",
      exchange_rate: "integer",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    const currency = await Currency.create(req.body);

    res.apiSuccess("Currency created successfully", currency);
  } catch (error) {
    console.error("Create Currency Error:", error);
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /currencies
 * @Method GET
 * @Description Get all currencies
 * @Access Private
 */
const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.findAll({
      order: [["currency_name", "ASC"]],
    });
    res.apiSuccess("Currencies fetched successfully", currencies);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /currencies/:id
 * @Method GET
 * @Params id
 * @Description Get a currency by ID
 * @Access Private
 */
const getCurrencyById = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.apiError("Currency not found", 404);
    res.apiSuccess("Currency fetched successfully", currency);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /currencies/:id
 * @Method PUT
 * @Params id
 * @Description Update a currency
 * @Access Private
 */
const updateCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.apiError("Currency not found", 404);

    const rules = {
      currency_name: "string",
      code: "string",
      symbol: "string",
      thousand_separator: "string",
      decimal_separator: "string",
      exchange_rate: "integer",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    await currency.update(req.body);
    res.apiSuccess("Currency updated successfully", currency);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /currencies/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a currency
 * @Access Private
 */
const deleteCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.apiError("Currency not found", 404);

    await currency.destroy();
    res.apiSuccess("Currency deleted successfully");
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

module.exports = {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
}; 