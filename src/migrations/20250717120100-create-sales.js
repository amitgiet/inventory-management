'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      customer_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'customers',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      customer_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      tax_percentage: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      tax_amount: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      discount_percentage: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      discount_amount: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      total_excluding_tax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      shipping_amount: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      total_amount: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false
      },
      paid_amount: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false
      },
      due_amount: {
        type: Sequelize.DOUBLE(12, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      payment_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      payment_method: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      terms: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
}; 