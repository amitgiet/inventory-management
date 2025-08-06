'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      short_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      operator: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      operation_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('units');
  }
}; 