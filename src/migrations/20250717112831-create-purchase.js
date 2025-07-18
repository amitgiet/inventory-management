'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      reference: {
        type: Sequelize.STRING
      },
      supplier_id: {
        type: Sequelize.BIGINT
      },
      location_id: {
        type: Sequelize.INTEGER
      },
      supplier_name: {
        type: Sequelize.STRING
      },
      tax_percentage: {
        type: Sequelize.DOUBLE
      },
      tax_amount: {
        type: Sequelize.DOUBLE
      },
      discount_percentage: {
        type: Sequelize.DOUBLE
      },
      discount_amount: {
        type: Sequelize.DOUBLE
      },
      total_excluding_tax: {
        type: Sequelize.DECIMAL
      },
      shipping_amount: {
        type: Sequelize.DOUBLE
      },
      total_amount: {
        type: Sequelize.DOUBLE
      },
      paid_amount: {
        type: Sequelize.DOUBLE
      },
      due_amount: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.STRING
      },
      payment_status: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Purchases');
  }
};