const { Supplier } = require("../models");
const Validator = require("validatorjs");

/**
 * @ApiPath /supplier
 * @Method POST
 * @Description Create a new supplier
 * @Access Private
 */
const createSupplier = async (req, res) => {
  const rules = {
    supplier_name: "required|string",
    supplier_email: "required|email",
    supplier_phone: "required|string",
    city: "required|string",
    country: "required|string",
    address: "required|string",
  };

  const validation = new Validator(req.body, rules);
  if (validation.fails()) {
    const [firstError] = Object.values(validation.errors.all()).flat();
    return res.status(422).json({ success: false, message: firstError });
  }

  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    console.error("Create Supplier Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @ApiPath /supplier
 * @Method GET
 * @Description Get all suppliers
 * @Access Private
 */
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json({ success: true, data: suppliers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @ApiPath /supplier/:id
 * @Method GET
 * @Description Get single supplier by ID
 * @Access Private
 */
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }
    res.json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @ApiPath /supplier/:id
 * @Method PUT
 * @Description Update supplier by ID
 * @Access Private
 */
const updateSupplier = async (req, res) => {
  const rules = {
    supplier_name: "string",
    supplier_email: "email",
    supplier_phone: "string",
    city: "string",
    country: "string",
    address: "string",
  };

  const validation = new Validator(req.body, rules);
  if (validation.fails()) {
    const [firstError] = Object.values(validation.errors.all()).flat();
    return res.status(422).json({ success: false, message: firstError });
  }

  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    await supplier.update(req.body);
    res.json({ success: true, message: "Supplier updated", data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @ApiPath /supplier/:id
 * @Method DELETE
 * @Description Delete supplier by ID
 * @Access Private
 */
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    await supplier.destroy();
    res.json({ success: true, message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
