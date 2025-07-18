'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      currency_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      symbol: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      thousand_separator: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      decimal_separator: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      exchange_rate: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('currencies');
  }
}; 