'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryAttribute extends Model {
    static associate(models) {
      // Each CategoryAttribute belongs to one Category
      CategoryAttribute.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });

      // If you have values, associate those too
      CategoryAttribute.hasMany(models.CategoryAttributeValue, {
        foreignKey: 'category_attribute_id',
        as: 'values',
      });
    }
  }

  CategoryAttribute.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CategoryAttribute',
  });

  return CategoryAttribute;
};
