const { Expense } = require("../models");
const { Op } = require("sequelize");

/*
  @ApiPath: /expenses
  @Method: POST
  @Params: { 
    category_id: 1,
    date: "2025-07-17",
    details: "Stationary purchase",
    amount: 500 
  }
  @Description: This API is used to create a new expense. `reference` is auto-generated.
  @Access: Public
*/
const createExpense = async (req, res) => {
  try {
    const { category_id, date, details, amount } = req.body;

    if (!category_id || !date || !amount) {
      return res.status(422).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Auto-generate reference number like EXP-00001
    const lastExpense = await Expense.findOne({ order: [["id", "DESC"]] });
    const nextId = lastExpense ? lastExpense.id + 1 : 1;
    const reference = `EXP-${String(nextId).padStart(5, "0")}`;

    const expense = await Expense.create({
      category_id,
      date,
      reference,
      details,
      amount,
    });

    res.apiSuccess("Expense created", { expense });
  } catch (error) {
    res.apiError("Internal server error", error.message);
  }
};

/*
  @ApiPath: /expenses
  @Method: GET
  @Description: This API is used to fetch all expenses along with their categories.
  @Access: Public
*/
const getAllExpenses = async (req, res) => {
  try {
    const { search } = req.query;
    let where = {};
    if (search) {
      where = {
        [Op.or]: [
          { details: { [Op.like]: `%${search}%` } },
          { reference: { [Op.like]: `%${search}%` } },
        ],
      };
    }
    const expenses = await Expense.findAll({ where, include: ["category"] });
    res.apiSuccess("Expenses fetched", { expenses });
  } catch (error) {
    res.apiError("Internal server error", error.message);
  }
};

/*
  @ApiPath: /expenses/:id
  @Method: GET
  @Params: { id: "expense_id" }
  @Description: This API is used to fetch a single expense by ID.
  @Access: Public
*/
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id, {
      include: ["category"],
    });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.apiSuccess("Expense fetched", { expense });
  } catch (error) {
    res.apiError("Internal server error", error.message);
  }
};

/*
  @ApiPath: /expenses/:id
  @Method: PUT
  @Params: {
    category_id: 2,
    date: "2025-07-18",
    details: "Updated purchase",
    amount: 600
  }
  @Description: This API is used to update an expense by ID. Reference is not updated.
  @Access: Public
*/
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    const { category_id, date, details, amount } = req.body;

    await expense.update({
      category_id: category_id ?? expense.category_id,
      date: date ?? expense.date,
      details: details ?? expense.details,
      amount: amount ?? expense.amount,
    });

    res.apiSuccess("Expense updated", { expense });
  } catch (error) {
    res.apiError("Internal server error", error.message);
  }
};

/*
  @ApiPath: /expenses/:id
  @Method: DELETE
  @Params: { id: "expense_id" }
  @Description: This API is used to delete an expense by ID.
  @Access: Public
*/
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    await expense.destroy();
    res.apiSuccess("Expense deleted");
  } catch (error) {
    res.apiError("Internal server error", error.message);
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
