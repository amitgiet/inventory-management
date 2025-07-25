'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tax.init({
    tax_name: DataTypes.STRING,
    tax_per: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Tax',
  });
  return Tax;
};