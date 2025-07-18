'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchasePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PurchasePayment.init({
    purchase_id: DataTypes.BIGINT,
    amount: DataTypes.DOUBLE,
    date: DataTypes.DATEONLY,
    reference: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PurchasePayment',
  });
  return PurchasePayment;
};