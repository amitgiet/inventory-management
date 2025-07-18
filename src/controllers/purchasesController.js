const { Purchase, Supplier } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /purchase
 * @Method POST
 * @Params date, supplier_id, location_id, supplier_name, tax_percentage, discount_percentage,
 *         shipping_amount, total_amount, paid_amount, due_amount, status, payment_status,
 *         payment_method, note
 * @Description Create a new purchase entry
 * @Access Private
 */
const createPurchase = async (req, res) => {
  try {
    const rules = {
      date: "required|date",
      supplier_id: "required|integer",
      location_id: "required|integer",
      supplier_name: "required|string",
      tax_percentage: "numeric",
      discount_percentage: "numeric",
      shipping_amount: "numeric",
      total_amount: "required|numeric",
      paid_amount: "required|numeric",
      due_amount: "required|numeric",
      status: "required|string",
      payment_status: "required|string",
      payment_method: "required|string",
      note: "string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const lastPurchase = await Purchase.findOne({ order: [["id", "DESC"]] });
    const nextId = lastPurchase ? lastPurchase.id + 1 : 1;
    const reference = `PO-${String(nextId).padStart(5, "0")}`;

    const {
      date,
      supplier_id,
      location_id,
      supplier_name,
      tax_percentage = 0,
      discount_percentage = 0,
      shipping_amount = 0,
      total_amount,
      paid_amount,
      due_amount,
      status,
      payment_status,
      payment_method,
      note,
    } = req.body;

    const tax_amount = (total_amount * tax_percentage) / 100;
    const discount_amount = (total_amount * discount_percentage) / 100;
    const total_excluding_tax = total_amount - tax_amount;

    const purchase = await Purchase.create({
      date,
      reference,
      supplier_id,
      location_id,
      supplier_name,
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
      note,
      total_excluding_tax,
    });

    res.status(201).json({
      success: true,
      message: "Purchase created successfully",
      data: purchase,
    });
  } catch (error) {
    console.error("Create Purchase Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * @ApiPath /purchase
 * @Method GET
 * @Description Get all purchases
 * @Access Private
 */
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase/:id
 * @Method GET
 * @Params id
 * @Description Get a purchase by ID
 * @Access Private
 */
const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id);
    if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });
    res.status(200).json({ success: true, data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase/:id
 * @Method PUT
 * @Params id
 * @Description Update a purchase
 * @Access Private
 */
const updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id);
    if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });

    await purchase.update(req.body);
    res.status(200).json({ success: true, message: "Purchase updated", data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase/:id
 * @Method DELETE
 * @Params id
 * @Description Delete a purchase
 * @Access Private
 */
const deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id);
    if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });

    await purchase.destroy();
    res.status(200).json({ success: true, message: "Purchase deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
};