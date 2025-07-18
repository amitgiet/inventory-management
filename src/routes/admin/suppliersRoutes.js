const router = require("express").Router();
const {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../../controllers/suppliersController");

// POST /supplier
router.post("/", createSupplier);

// GET /supplier
router.get("/", getAllSuppliers);

// GET /supplier/:id
router.get("/:id", getSupplierById);

// PUT /supplier/:id
router.put("/:id", updateSupplier);

// DELETE /supplier/:id
router.delete("/:id", deleteSupplier);

module.exports = router;
