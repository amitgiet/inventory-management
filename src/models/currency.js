'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Currency.init({
    currency_name: DataTypes.STRING,
    code: DataTypes.STRING,
    symbol: DataTypes.STRING,
    thousand_separator: DataTypes.STRING,
    decimal_separator: DataTypes.STRING,
    exchange_rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};