const { Category, Product } = require("../models");
const Validator = require("validatorjs");

/*
  @route   POST /product
  @desc    Create a new product category
  @access  Private
*/
const CreateProduct = async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      category_id: "required|integer",
      product_name: "required|string",
      product_code: "required|string",
      product_price: "required|integer",
      product_cost: "required|integer",
    });

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   Get /product
  @desc    Get all roducts
  @access  Private
*/
const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["id", "DESC"]] });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   GET /product/:id
  @desc    Get Product by id
  @access  Private
*/
const GetProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   POST /product/:id
  @desc    Update product
  @access  Private
*/
const UpdateProduct = async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      category_id: "required|integer",
      product_name: "required|string",
      product_code: "required|string",
      product_price: "required|integer",
      product_cost: "required|integer",
    });
    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }
    const product = await Product.findByPk(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await product.update(req.body);
    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   DELETE /product/:id
  @desc    Delete Product by id
  @access  Private
*/
const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await product.destroy();
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   POST /product-category
  @desc    Create a new product category
  @access  Private
*/
const CreateProductCategory = async (req, res) => {
  try {
    const { name, slug, parent_id, is_active } = req.body;

    const validation = new Validator(req.body, {
      name: "required|string",
      slug: "required|string",
      is_active: "boolean",
    });

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const category = await Category.create({
      name,
      slug,
      parent_id: parent_id || null,
      is_active: is_active !== undefined ? is_active : true,
    });

    return res.status(201).json({
      success: true,
      message: "Product category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("CreateProductCategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   GET /product-category
  @desc    Get all product categories
  @access  Public
*/
const GetAllProductCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Product categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("GetAllProductCategories Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   GET /product-category/:id
  @desc    Get a single product category by ID
  @access  Public
*/
const GetProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("GetProductCategoryById Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   PUT /product-category/:id
  @desc    Update a product category
  @access  Private
*/
const UpdateProductCategory = async (req, res) => {
  try {
    const { name, slug, parent_id, is_active } = req.body;
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }

    await category.update({
      name: name ?? category.name,
      slug: slug ?? category.slug,
      parent_id: parent_id ?? category.parent_id,
      is_active: is_active ?? category.is_active,
    });

    return res.status(200).json({
      success: true,
      message: "Product category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("UpdateProductCategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/*
  @route   DELETE /product-category/:id
  @desc    Delete a product category
  @access  Private
*/
const DeleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }

    await category.destroy();

    return res.status(200).json({
      success: true,
      message: "Product category deleted successfully",
    });
  } catch (error) {
    console.error("DeleteProductCategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  CreateProductCategory,
  GetAllProductCategories,
  GetProductCategoryById,
  UpdateProductCategory,
  DeleteProductCategory,
  CreateProduct,
  GetAllProducts,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
};
