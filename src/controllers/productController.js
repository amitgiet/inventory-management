const {
  Category,
  Product,
  CategoryAttribute,
  CategoryAttributeValue,
} = require("../models");
const slugify = require("slugify");
const Validator = require("validatorjs");

/*
  @route   POST /product
  @desc    Create a new product category
  @access  Private
*/
const CreateProduct = async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      product_name: "required|string",
      product_code: "required|string",
      product_price: "required|integer",
      product_cost: "required|integer",
      category_ids: "array|required",
      "category_ids.*": "integer",
    });

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const { category_ids, ...productData } = req.body;

    const product = await Product.create(productData);

    await product.setCategories(category_ids);

    const productWithCategories = await Product.findByPk(product.id, {
      include: [{ model: Category, as: "categories" }],
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: productWithCategories,
    });
  } catch (error) {
    console.error("CreateProduct Error:", error);
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
    const products = await Product.findAll({
      order: [["id", "DESC"]],
      include: [{ model: Category, as: "categories" }],
    });
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
      product_name: "required|string",
      product_code: "required|string",
      product_price: "required|integer",
      product_cost: "required|integer",
      category_ids: "array|required",
      "category_ids.*": "integer",
    });

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { category_ids, ...productData } = req.body;

    // Update product fields
    await product.update(productData);

    // Update category relationships
    await product.setCategories(category_ids); // Uses belongsToMany association

    // Optionally return product with categories
    const updatedProduct = await Product.findByPk(product.id, {
      include: [{ model: Category, as: "categories" }],
    });

    return res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("UpdateProduct Error:", error);
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
    const { name, slug, parent_id, is_active, attributes } = req.body;
    const userId = req.user?.id || 1;

    // Basic validation
    const validation = new Validator(req.body, {
      name: "required|string",
      is_active: "boolean",
      attributes: "array", // Optional, but if present must be array
    });

    // If attributes are provided, validate nested fields
    if (Array.isArray(attributes) && attributes.length > 0) {
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        const attrValidation = new Validator(attr, {
          name: "required|string",
          values: "array",
          "values.*": "string",
        });

        if (attrValidation.fails()) {
          const [firstError] = Object.values(
            attrValidation.errors.all()
          ).flat();
          return res.status(422).json({ success: false, message: firstError });
        }
      }
    }

    if (validation.fails()) {
      const [firstError] = Object.values(validation.errors.all()).flat();
      return res.status(422).json({ success: false, message: firstError });
    }

    // Auto-generate slug from name if not provided
    const finalSlug = slug || slugify(name, { lower: true, strict: true });

    // Create category
    const category = await Category.create({
      name,
      slug: finalSlug,
      parent_id: parent_id || null,
      is_active: is_active !== undefined ? is_active : true,
      created_by: userId,
    });

    // Create attributes (optional)
    if (Array.isArray(attributes)) {
      for (const attr of attributes) {
        const createdAttr = await CategoryAttribute.create({
          category_id: category.id,
          name: attr.name,
          created_by: userId,
        });

        const values = attr.values.map((value) => ({
          category_attribute_id: createdAttr.id,
          value,
        }));

        await CategoryAttributeValue.bulkCreate(values);
      }
    }

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
      include: [
        {
          model: CategoryAttribute,
          as: "attributes",
          include: [
            {
              model: CategoryAttributeValue,
              as: "values",
            },
          ],
        },
      ],
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

    const category = await Category.findByPk(id, {
      include: [
        {
          model: CategoryAttribute,
          as: "attributes",
          include: [
            {
              model: CategoryAttributeValue,
              as: "values",
            },
          ],
        },
      ],
    });

    if (!category) {
      return res.apiError("Product category not found", 404);
    }
    return res.apiSuccess("Product category fetched successfully", category);
  } catch (error) {
    return res.apiError("Internal server error", 500, error);
  }
};

/*
  @route   PUT /product-category/:id
  @desc    Update a product category
  @access  Private
*/
const UpdateProductCategory = async (req, res) => {
  try {
    const { name, slug, parent_id, is_active, attributes } = req.body;
    const { id } = req.params;
    const userId = req.user?.id || 1;

    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }

    // Generate slug if name is updated but slug is not provided
    const finalSlug =
      slug ||
      (name ? slugify(name, { lower: true, strict: true }) : category.slug);

    // Update category fields
    await category.update({
      name: name ?? category.name,
      slug: finalSlug,
      parent_id: parent_id ?? category.parent_id,
      is_active: is_active ?? category.is_active,
    });

    // Handle attributes (if provided)
    if (Array.isArray(attributes)) {
      // Step 1: Delete old attributes and their values
      const existingAttributes = await CategoryAttribute.findAll({
        where: { category_id: id },
      });
      const attributeIds = existingAttributes.map((attr) => attr.id);

      await CategoryAttributeValue.destroy({
        where: { category_attribute_id: attributeIds },
      });
      await CategoryAttribute.destroy({ where: { category_id: id } });

      // Step 2: Create new attributes and values
      for (const attr of attributes) {
        if (!attr.name) {
          return res.status(422).json({
            success: false,
            message: "Each attribute must have a name",
          });
        }

        const createdAttr = await CategoryAttribute.create({
          category_id: id,
          name: attr.name,
          created_by: userId,
        });

        if (Array.isArray(attr.values)) {
          const valueData = attr.values.map((val) => ({
            category_attribute_id: createdAttr.id,
            value: val,
          }));
          await CategoryAttributeValue.bulkCreate(valueData);
        }
      }
    }

    return res.apiSuccess("Product category updated successfully", category);
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
