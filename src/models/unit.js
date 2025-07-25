'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Unit.init({
    name: DataTypes.STRING,
    short_name: DataTypes.STRING,
    operator: DataTypes.STRING,
    operation_value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};