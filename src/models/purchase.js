'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Purchase.init({
    date: DataTypes.DATE,
    reference: DataTypes.STRING,
    supplier_id: DataTypes.BIGINT,
    location_id: DataTypes.INTEGER,
    supplier_name: DataTypes.STRING,
    tax_percentage: DataTypes.DOUBLE,
    tax_amount: DataTypes.DOUBLE,
    discount_percentage: DataTypes.DOUBLE,
    discount_amount: DataTypes.DOUBLE,
    total_excluding_tax: DataTypes.DECIMAL,
    shipping_amount: DataTypes.DOUBLE,
    total_amount: DataTypes.DOUBLE,
    paid_amount: DataTypes.DOUBLE,
    due_amount: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};