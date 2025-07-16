'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      guard_name: {
        type: Sequelize.STRING
      },
      edit_own_profile: {
        type: Sequelize.BOOLEAN
      },
      access_user_management: {
        type: Sequelize.BOOLEAN
      },
      show_total_stats: {
        type: Sequelize.BOOLEAN
      },
      show_month_overview: {
        type: Sequelize.BOOLEAN
      },
      show_weekly_sales_purchases: {
        type: Sequelize.BOOLEAN
      },
      show_monthly_cashflow: {
        type: Sequelize.BOOLEAN
      },
      show_notifications: {
        type: Sequelize.BOOLEAN
      },
      access_products: {
        type: Sequelize.BOOLEAN
      },
      products_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_products: {
        type: Sequelize.BOOLEAN
      },
      delete_products: {
        type: Sequelize.BOOLEAN
      },
      access_product_categories: {
        type: Sequelize.BOOLEAN
      },
      print_barcodes: {
        type: Sequelize.BOOLEAN
      },
      access_adjustments: {
        type: Sequelize.BOOLEAN
      },
      adjustments_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_adjustments: {
        type: Sequelize.BOOLEAN
      },
      delete_adjustments: {
        type: Sequelize.BOOLEAN
      },
      access_quotations: {
        type: Sequelize.BOOLEAN
      },
      quotations_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_quotations: {
        type: Sequelize.BOOLEAN
      },
      delete_quotations: {
        type: Sequelize.BOOLEAN
      },
      create_quotation_sales: {
        type: Sequelize.BOOLEAN
      },
      send_quotation_mails: {
        type: Sequelize.BOOLEAN
      },
      access_expenses: {
        type: Sequelize.BOOLEAN
      },
      expenses_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_expenses: {
        type: Sequelize.BOOLEAN
      },
      access_expense_categories: {
        type: Sequelize.BOOLEAN
      },
      access_customers: {
        type: Sequelize.BOOLEAN
      },
      customers_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_customers: {
        type: Sequelize.BOOLEAN
      },
      delete_customers: {
        type: Sequelize.BOOLEAN
      },
      access_brands: {
        type: Sequelize.BOOLEAN
      },
      brands_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_brands: {
        type: Sequelize.BOOLEAN
      },
      access_manufacturers: {
        type: Sequelize.BOOLEAN
      },
      manufacturers_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_manufacturers: {
        type: Sequelize.BOOLEAN
      },
      access_suppliers: {
        type: Sequelize.BOOLEAN
      },
      suppliers_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_suppliers: {
        type: Sequelize.BOOLEAN
      },
      delete_suppliers: {
        type: Sequelize.BOOLEAN
      },
      access_sales: {
        type: Sequelize.BOOLEAN
      },
      sales_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_sales: {
        type: Sequelize.BOOLEAN
      },
      delete_sales: {
        type: Sequelize.BOOLEAN
      },
      create_pos_sales: {
        type: Sequelize.BOOLEAN
      },
      access_sale_payments: {
        type: Sequelize.BOOLEAN
      },
      access_sale_returns: {
        type: Sequelize.BOOLEAN
      },
      sale_returns_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_sale_returns: {
        type: Sequelize.BOOLEAN
      },
      access_sale_return_payments: {
        type: Sequelize.BOOLEAN
      },
      access_purchases: {
        type: Sequelize.BOOLEAN
      },
      purchases_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_purchases: {
        type: Sequelize.BOOLEAN
      },
      delete_purchases: {
        type: Sequelize.BOOLEAN
      },
      access_purchase_payments: {
        type: Sequelize.BOOLEAN
      },
      access_purchase_returns: {
        type: Sequelize.BOOLEAN
      },
      purchase_returns_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_purchase_returns: {
        type: Sequelize.BOOLEAN
      },
      access_purchase_return_payments: {
        type: Sequelize.BOOLEAN
      },
      access_reports: {
        type: Sequelize.BOOLEAN
      },
      access_manufacuturedpurchases: {
        type: Sequelize.BOOLEAN
      },
      manufacuturedpurchases_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_manufacuturedpurchases: {
        type: Sequelize.BOOLEAN
      },
      delete_manufacuturedpurchases: {
        type: Sequelize.BOOLEAN
      },
      access_parts: {
        type: Sequelize.BOOLEAN
      },
      parts_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_parts: {
        type: Sequelize.BOOLEAN
      },
      access_adjustments_part: {
        type: Sequelize.BOOLEAN
      },
      adjustments_part_create_edit: {
        type: Sequelize.BOOLEAN
      },
      show_adjustments_part: {
        type: Sequelize.BOOLEAN
      },
      delete_adjustments_part: {
        type: Sequelize.BOOLEAN
      },
      access_currencies: {
        type: Sequelize.BOOLEAN
      },
      currencies_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_currencies: {
        type: Sequelize.BOOLEAN
      },
      access_warehouse_location: {
        type: Sequelize.BOOLEAN
      },
      warehouse_location_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_warehouse_location: {
        type: Sequelize.BOOLEAN
      },
      access_units: {
        type: Sequelize.BOOLEAN
      },
      units_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_units: {
        type: Sequelize.BOOLEAN
      },
      access_taxes: {
        type: Sequelize.BOOLEAN
      },
      taxes_create_edit: {
        type: Sequelize.BOOLEAN
      },
      delete_taxes: {
        type: Sequelize.BOOLEAN
      },
      access_settings: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Permissions');
  }
};