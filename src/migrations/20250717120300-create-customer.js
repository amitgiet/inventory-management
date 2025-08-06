'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      customer_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      customer_email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      customer_phone: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('customers');
  }
}; 