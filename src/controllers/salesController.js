const { Sales, Customer } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /sales
 * @Method POST
 * @Params date, customer_id, location_id, customer_name, tax_percentage, discount_percentage,
 *         shipping_amount, total_amount, paid_amount, due_amount, status, payment_status,
 *         payment_method, terms, note
 * @Description Create a new sales entry
 * @Access Private
 */
const createSale = async (req, res) => {
  try {
    const rules = {
      date: "required|date",
      customer_id: "integer",
      location_id: "required|integer",
      customer_name: "required|string",
      tax_percentage: "numeric",
      discount_percentage: "numeric",
      shipping_amount: "numeric",
      total_amount: "required|numeric",
      paid_amount: "required|numeric",
      due_amount: "required|numeric",
      status: "required|string",
      payment_status: "required|string",
      payment_method: "required|string",
      terms: "string",
      note: "string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.apiError(firstError, 422);
    }

    const lastSale = await Sales.findOne({ order: [["id", "DESC"]] });
    const nextId = lastSale ? lastSale.id + 1 : 1;
    const reference = `SO-${String(nextId).padStart(5, "0")}`;

    const {
      date,
      customer_id,
      location_id,
      customer_name,
      tax_percentage = 0,
      discount_percentage = 0,
      shipping_amount = 0,
      total_amount,
      paid_amount,
      due_amount,
      status,
      payment_status,
      payment_method,
      terms,
      note,
    } = req.body;

    const tax_amount = (total_amount * tax_percentage) / 100;
    const discount_amount = (total_amount * discount_percentage) / 100;
    const total_excluding_tax = total_amount - tax_amount;

    const sale = await Sales.create({
      date,
      reference,
      customer_id,
      location_id,
      customer_name,
      tax_percentage,
      tax_amount,
      discount_percentage,
      discount_amount,
      shipping_amount,
      total_amount,
      paid_amount,
      due_amount,
      status,
      payment_status,
      payment_method,
      terms,
      note,
      total_excluding_tax,
    });

    res.apiSuccess("Sale created successfully", sale);
  } catch (error) {
    console.error("Create Sale Error:", error);
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /sales
 * @Method GET
 * @Description Get all sales
 * @Access Private
 */
const getAllSales = async (req, res) => {
  try {
    const sales = await Sales.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "customer_name", "customer_email", "customer_phone"],
        },
      ],
    });
    res.apiSuccess("Sales fetched successfully", sales);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /sales/:id
 * @Method GET
 * @Params id
 * @Description Get a sale by ID
 * @Access Private
 */
const getSaleById = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "customer_name", "customer_email", "customer_phone"],
        },
      ],
    });
    if (!sale) return res.apiError("Sale not found", 404);
    res.apiSuccess("Sale fetched successfully", sale);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /sales/:id
 * @Method PUT
 * @Params id
 * @Description Update a sale
 * @Access Private
 */
const updateSale = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) return res.apiError("Sale not found", 404);

    const {
      date,
      customer_id,
      location_id,
      customer_name,
      tax_percentage,
      discount_percentage,
      shipping_amount,
      total_amount,
      paid_amount,
      due_amount,
      status,
      payment_status,
      payment_method,
      terms,
      note,
    } = req.body;

    // Recalculate tax and discount amounts if total_amount is updated
    let tax_amount = sale.tax_amount;
    let discount_amount = sale.discount_amount;
    let total_excluding_tax = sale.total_excluding_tax;

    if (total_amount !== undefined) {
      const newTaxPercentage = tax_percentage !== undefined ? tax_percentage : sale.tax_percentage;
      const newDiscountPercentage = discount_percentage !== undefined ? discount_percentage : sale.discount_percentage;
      
      tax_amount = (total_amount * newTaxPercentage) / 100;
      discount_amount = (total_amount * newDiscountPercentage) / 100;
      total_excluding_tax = total_amount - tax_amount;
    }

    await sale.update({
      date: date ?? sale.date,
      customer_id: customer_id ?? sale.customer_id,
      location_id: location_id ?? sale.location_id,
      customer_name: customer_name ?? sale.customer_name,
      tax_percentage: tax_percentage ?? sale.tax_percentage,
      tax_amount,
      discount_percentage: discount_percentage ?? sale.discount_percentage,
      discount_amount,
      shipping_amount: shipping_amount ?? sale.shipping_amount,
      total_amount: total_amount ?? sale.total_amount,
      paid_amount: paid_amount ?? sale.paid_amount,
      due_amount: due_amount ?? sale.due_amount,
      status: status ?? sale.status,
      payment_status: payment_status ?? sale.payment_status,
      payment_method: payment_method ?? sale.payment_method,
      terms: terms ?? sale.terms,
      note: note ?? sale.note,
      total_excluding_tax,
    });

    res.apiSuccess("Sale updated successfully", sale);
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

/**
 * @ApiPath /sales/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a sale
 * @Access Private
 */
const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) return res.apiError("Sale not found", 404);

    await sale.destroy();
    res.apiSuccess("Sale deleted successfully");
  } catch (error) {
    res.apiError("Internal Server Error", 500, error);
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
}; 