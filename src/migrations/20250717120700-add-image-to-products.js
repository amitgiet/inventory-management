'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'image', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Products', 'banner', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'image');
    await queryInterface.removeColumn('Products', 'banner');
  }
}; 