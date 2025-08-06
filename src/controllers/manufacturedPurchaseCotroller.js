const Validator = require("validatorjs");
const { ManufacturedPurchase } = require("../models");

/*
  @ApiPath: /manufactured-purchases
  @Method: POST
  @Params: {
    date: "YYYY-MM-DD",
    location_id: integer (optional),
    reference: string,
    supplier_id: bigint (optional),
    supplier_name: string (optional),
    tax_percentage: number,
    tax_amount: number,
    discount_percentage: number,
    discount_amount: number,
    total_excluding_tax: decimal,
    shipping_amount: number,
    total_amount: number,
    paid_amount: number,
    due_amount: number,
    status: string,
    payment_status: string (optional),
    payment_method: string (optional),
    note: string (optional)
  }
  @Description: Create a new manufactured purchase record
  @Access: Public
*/
exports.createPurchase = async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      date: "required|date",
      location_id: "integer",
      reference: "required|string",
      supplier_id: "integer",
      supplier_name: "string",
      tax_percentage: "required|numeric",
      tax_amount: "required|numeric",
      discount_percentage: "required|numeric",
      discount_amount: "required|numeric",
      total_excluding_tax: "required|numeric",
      shipping_amount: "required|numeric",
      total_amount: "required|numeric",
      paid_amount: "required|numeric",
      due_amount: "required|numeric",
      status: "required|string",
      payment_status: "string",
      payment_method: "string",
      note: "string",
    });

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const purchase = await ManufacturedPurchase.create(req.body);

    res.status(201).json({ success: true, message: "Purchase created", data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufactured-purchases
  @Method: GET
  @Description: Get all manufactured purchase records
  @Access: Public
*/
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await ManufacturedPurchase.findAll();
    res.json({ success: true, data: purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufactured-purchases/:id
  @Method: GET
  @Params: { id: "Purchase ID" }
  @Description: Get manufactured purchase record by ID
  @Access: Public
*/
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await ManufacturedPurchase.findByPk(req.params.id);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }
    res.json({ success: true, data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufactured-purchases/:id
  @Method: PUT
  @Params: {
    date: "YYYY-MM-DD",
    location_id: integer (optional),
    reference: string,
    supplier_id: bigint (optional),
    supplier_name: string (optional),
    tax_percentage: number,
    tax_amount: number,
    discount_percentage: number,
    discount_amount: number,
    total_excluding_tax: decimal,
    shipping_amount: number,
    total_amount: number,
    paid_amount: number,
    due_amount: number,
    status: string,
    payment_status: string (optional),
    payment_method: string (optional),
    note: string (optional)
  }
  @Description: Update manufactured purchase record by ID
  @Access: Public
*/
exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await ManufacturedPurchase.findByPk(req.params.id);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    const validation = new Validator(req.body, {
      date: "date",
      location_id: "integer",
      reference: "string",
      supplier_id: "integer",
      supplier_name: "string",
      tax_percentage: "numeric",
      tax_amount: "numeric",
      discount_percentage: "numeric",
      discount_amount: "numeric",
      total_excluding_tax: "numeric",
      shipping_amount: "numeric",
      total_amount: "numeric",
      paid_amount: "numeric",
      due_amount: "numeric",
      status: "string",
      payment_status: "string",
      payment_method: "string",
      note: "string",
    });

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    await purchase.update(req.body);

    res.json({ success: true, message: "Purchase updated", data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufactured-purchases/:id
  @Method: DELETE
  @Params: { id: "Purchase ID" }
  @Description: Delete manufactured purchase record by ID
  @Access: Public
*/
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await ManufacturedPurchase.findByPk(req.params.id);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    await purchase.destroy();
    res.json({ success: true, message: "Purchase deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
