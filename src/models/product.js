'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: 'ProductCategories',
        foreignKey: 'product_id',
        as: 'categories',
      });
    }
  }
  Product.init({
    common_code: DataTypes.STRING,
    category_id: DataTypes.BIGINT,
    product_type: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_prefix: DataTypes.STRING,
    product_code: DataTypes.STRING,
    product_barcode_symbology: DataTypes.STRING,
    product_quantity: DataTypes.INTEGER,
    product_cost: DataTypes.INTEGER,
    product_price: DataTypes.INTEGER,
    product_unit: DataTypes.STRING,
    product_hsn: DataTypes.STRING,
    product_stock_alert: DataTypes.INTEGER,
    product_order_tax: DataTypes.STRING,
    product_tax_type: DataTypes.TINYINT,
    product_note: DataTypes.TEXT,
    product_upc: DataTypes.TEXT,
    product_mpn: DataTypes.TEXT,
    product_dimension: DataTypes.TEXT,
    product_weight: DataTypes.TEXT,
    product_returnable: DataTypes.TEXT,
    product_perishable: DataTypes.TEXT,
    product_expiry: DataTypes.DATE,
    brand_id: DataTypes.INTEGER,
    manufacturer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};