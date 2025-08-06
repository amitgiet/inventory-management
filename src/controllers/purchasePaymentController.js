const { PurchasePayment } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /purchase-payments
 * @Method POST
 * @Params purchase_id, amount, date, payment_method, note
 * @Description Create a new payment for a purchase
 * @Access Private
 */
const createPurchasePayment = async (req, res) => {
  try {
    const rules = {
      purchase_id: "required|integer",
      amount: "required|numeric",
      date: "required|date",
      payment_method: "required|string",
      note: "string",
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const last = await PurchasePayment.findOne({ order: [["id", "DESC"]] });
    const reference = `PP-${String((last?.id || 0) + 1).padStart(5, "0")}`;

    const payment = await PurchasePayment.create({ ...req.body, reference });

    res.status(201).json({
      success: true,
      message: "Purchase payment created successfully",
      data: payment,
    });
  } catch (error) {
    console.error("CreatePurchasePayment Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase-payments
 * @Method GET
 * @Description List all purchase payments
 * @Access Private
 */
const getAllPurchasePayments = async (req, res) => {
  try {
    const data = await PurchasePayment.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GetAllPurchasePayments Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase-payments/:id
 * @Method GET
 * @Description Get purchase payment by ID
 * @Access Private
 */
const getPurchasePaymentById = async (req, res) => {
  try {
    const payment = await PurchasePayment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("GetPurchasePaymentById Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase-payments/:id
 * @Method PUT
 * @Description Update a purchase payment
 * @Access Private
 */
const updatePurchasePayment = async (req, res) => {
  try {
    const payment = await PurchasePayment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    await payment.update(req.body);

    res.status(200).json({ success: true, message: "Payment updated", data: payment });
  } catch (error) {
    console.error("UpdatePurchasePayment Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @ApiPath /purchase-payments/:id
 * @Method DELETE
 * @Description Delete a purchase payment
 * @Access Private
 */
const deletePurchasePayment = async (req, res) => {
  try {
    const payment = await PurchasePayment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    await payment.destroy();
    res.status(200).json({ success: true, message: "Payment deleted" });
  } catch (error) {
    console.error("DeletePurchasePayment Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createPurchasePayment,
  getAllPurchasePayments,
  getPurchasePaymentById,
  updatePurchasePayment,
  deletePurchasePayment,
};
