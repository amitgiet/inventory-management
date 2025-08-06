const { ExpenseCategory } = require("../models");

/* 
  @ApiPath: /expense-category
  @Method: POST
  @Params: { 
    category_name: "string", 
    category_description: "string (optional)"
  }
  @Description: This API creates a new expense category.
  @Access: Public
*/
exports.createCategory = async (req, res) => {
  try {
    const { category_name, category_description } = req.body;
    if (!category_name)
      return res.status(422).json({ success: false, message: "Category name is required" });

    const category = await ExpenseCategory.create({ category_name, category_description });
    res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* 
  @ApiPath: /expense-category
  @Method: GET
  @Params: none
  @Description: Fetch all expense categories.
  @Access: Public
*/
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategory.findAll();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* 
  @ApiPath: /expense-category/:id
  @Method: GET
  @Params: { id: "Category ID" }
  @Description: Fetch a single expense category by ID.
  @Access: Public
*/
exports.getCategoryById = async (req, res) => {
  try {
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* 
  @ApiPath: /expense-category/:id
  @Method: PUT
  @Params: { 
    id: "Category ID",
    category_name: "string", 
    category_description: "string"
  }
  @Description: Update an existing expense category by ID.
  @Access: Public
*/
exports.updateCategory = async (req, res) => {
  try {
    const { category_name, category_description } = req.body;
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    await category.update({ category_name, category_description });
    res.json({ success: true, message: "Category updated", data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* 
  @ApiPath: /expense-category/:id
  @Method: DELETE
  @Params: { id: "Category ID" }
  @Description: Delete an expense category by ID.
  @Access: Public
*/
exports.deleteCategory = async (req, res) => {
  try {
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    await category.destroy();
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
