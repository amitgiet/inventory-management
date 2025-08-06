const router = require("express").Router();

const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const brandRoutes = require("./brandRoutes");
const productCategoryRoutes = require("./productCategoriesRoutes");

const expensesRoutes = require("./expensesRoutes");
const expensesCategoryRoutes = require("./expensesCategoryRoutes");
const purchaseRoutes = require("./purchasesRoutes");
const manufacturesRoutes = require("./manufacturesRoutes");
const suppliersRoutes = require("./suppliersRoutes");
const manufacturerPurchaseRoutes = require("./manufacturerPurchaseRoutes");
const purchasePaymentRoutes = require("./purchasePaymentRoutes");
const salesRoutes = require("./salesRoutes");
const currencyRoutes = require("./currencyRoutes");
const customerRoutes = require("./customerRoutes");
const locationRoutes = require("./locationRoutes");
const taxRoutes = require("./taxRoutes");
const unitRoutes = require("./unitRoutes");

router.use(authRoutes);
router.use("/product", productRoutes);
router.use("/category", productCategoryRoutes);
router.use("/brand", brandRoutes);

router.use("/expenses", expensesRoutes);
router.use("/expense-categories", expensesCategoryRoutes);
router.use("/purchase", purchaseRoutes);
router.use("/suppliers", suppliersRoutes);
router.use("/purchase-payments", purchasePaymentRoutes);
router.use("/manufacturers", manufacturesRoutes);
router.use("/manufactured-purchases", manufacturerPurchaseRoutes);
router.use("/sales", salesRoutes);
router.use("/currencies", currencyRoutes);
router.use("/customers", customerRoutes);
router.use("/locations", locationRoutes);
router.use("/taxs", taxRoutes);
router.use("/units", unitRoutes);

module.exports = router;
