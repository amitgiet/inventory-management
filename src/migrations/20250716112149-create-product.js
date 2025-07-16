'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      common_code: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.BIGINT
      },
      product_type: {
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      product_prefix: {
        type: Sequelize.STRING
      },
      product_code: {
        type: Sequelize.STRING
      },
      product_barcode_symbology: {
        type: Sequelize.STRING
      },
      product_quantity: {
        type: Sequelize.INTEGER
      },
      product_cost: {
        type: Sequelize.INTEGER
      },
      product_price: {
        type: Sequelize.INTEGER
      },
      product_unit: {
        type: Sequelize.STRING
      },
      product_hsn: {
        type: Sequelize.STRING
      },
      product_stock_alert: {
        type: Sequelize.INTEGER
      },
      product_order_tax: {
        type: Sequelize.STRING
      },
      product_tax_type: {
        type: Sequelize.TINYINT
      },
      product_note: {
        type: Sequelize.TEXT
      },
      product_upc: {
        type: Sequelize.TEXT
      },
      product_mpn: {
        type: Sequelize.TEXT
      },
      product_dimension: {
        type: Sequelize.TEXT
      },
      product_weight: {
        type: Sequelize.TEXT
      },
      product_returnable: {
        type: Sequelize.TEXT
      },
      product_perishable: {
        type: Sequelize.TEXT
      },
      product_expiry: {
        type: Sequelize.DATE
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      manufacturer_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};