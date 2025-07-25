'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpenseCategory.init({
    category_name: DataTypes.STRING,
    category_description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ExpenseCategory',
  });
  return ExpenseCategory;
};