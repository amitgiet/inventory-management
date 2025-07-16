'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permission.init({
    name: DataTypes.STRING,
    guard_name: DataTypes.STRING,
    edit_own_profile: DataTypes.BOOLEAN,
    access_user_management: DataTypes.BOOLEAN,
    show_total_stats: DataTypes.BOOLEAN,
    show_month_overview: DataTypes.BOOLEAN,
    show_weekly_sales_purchases: DataTypes.BOOLEAN,
    show_monthly_cashflow: DataTypes.BOOLEAN,
    show_notifications: DataTypes.BOOLEAN,
    access_products: DataTypes.BOOLEAN,
    products_create_edit: DataTypes.BOOLEAN,
    show_products: DataTypes.BOOLEAN,
    delete_products: DataTypes.BOOLEAN,
    access_product_categories: DataTypes.BOOLEAN,
    print_barcodes: DataTypes.BOOLEAN,
    access_adjustments: DataTypes.BOOLEAN,
    adjustments_create_edit: DataTypes.BOOLEAN,
    show_adjustments: DataTypes.BOOLEAN,
    delete_adjustments: DataTypes.BOOLEAN,
    access_quotations: DataTypes.BOOLEAN,
    quotations_create_edit: DataTypes.BOOLEAN,
    show_quotations: DataTypes.BOOLEAN,
    delete_quotations: DataTypes.BOOLEAN,
    create_quotation_sales: DataTypes.BOOLEAN,
    send_quotation_mails: DataTypes.BOOLEAN,
    access_expenses: DataTypes.BOOLEAN,
    expenses_create_edit: DataTypes.BOOLEAN,
    delete_expenses: DataTypes.BOOLEAN,
    access_expense_categories: DataTypes.BOOLEAN,
    access_customers: DataTypes.BOOLEAN,
    customers_create_edit: DataTypes.BOOLEAN,
    show_customers: DataTypes.BOOLEAN,
    delete_customers: DataTypes.BOOLEAN,
    access_brands: DataTypes.BOOLEAN,
    brands_create_edit: DataTypes.BOOLEAN,
    delete_brands: DataTypes.BOOLEAN,
    access_manufacturers: DataTypes.BOOLEAN,
    manufacturers_create_edit: DataTypes.BOOLEAN,
    delete_manufacturers: DataTypes.BOOLEAN,
    access_suppliers: DataTypes.BOOLEAN,
    suppliers_create_edit: DataTypes.BOOLEAN,
    show_suppliers: DataTypes.BOOLEAN,
    delete_suppliers: DataTypes.BOOLEAN,
    access_sales: DataTypes.BOOLEAN,
    sales_create_edit: DataTypes.BOOLEAN,
    show_sales: DataTypes.BOOLEAN,
    delete_sales: DataTypes.BOOLEAN,
    create_pos_sales: DataTypes.BOOLEAN,
    access_sale_payments: DataTypes.BOOLEAN,
    access_sale_returns: DataTypes.BOOLEAN,
    sale_returns_create_edit: DataTypes.BOOLEAN,
    delete_sale_returns: DataTypes.BOOLEAN,
    access_sale_return_payments: DataTypes.BOOLEAN,
    access_purchases: DataTypes.BOOLEAN,
    purchases_create_edit: DataTypes.BOOLEAN,
    show_purchases: DataTypes.BOOLEAN,
    delete_purchases: DataTypes.BOOLEAN,
    access_purchase_payments: DataTypes.BOOLEAN,
    access_purchase_returns: DataTypes.BOOLEAN,
    purchase_returns_create_edit: DataTypes.BOOLEAN,
    delete_purchase_returns: DataTypes.BOOLEAN,
    access_purchase_return_payments: DataTypes.BOOLEAN,
    access_reports: DataTypes.BOOLEAN,
    access_manufacuturedpurchases: DataTypes.BOOLEAN,
    manufacuturedpurchases_create_edit: DataTypes.BOOLEAN,
    show_manufacuturedpurchases: DataTypes.BOOLEAN,
    delete_manufacuturedpurchases: DataTypes.BOOLEAN,
    access_parts: DataTypes.BOOLEAN,
    parts_create_edit: DataTypes.BOOLEAN,
    delete_parts: DataTypes.BOOLEAN,
    access_adjustments_part: DataTypes.BOOLEAN,
    adjustments_part_create_edit: DataTypes.BOOLEAN,
    show_adjustments_part: DataTypes.BOOLEAN,
    delete_adjustments_part: DataTypes.BOOLEAN,
    access_currencies: DataTypes.BOOLEAN,
    currencies_create_edit: DataTypes.BOOLEAN,
    delete_currencies: DataTypes.BOOLEAN,
    access_warehouse_location: DataTypes.BOOLEAN,
    warehouse_location_create_edit: DataTypes.BOOLEAN,
    delete_warehouse_location: DataTypes.BOOLEAN,
    access_units: DataTypes.BOOLEAN,
    units_create_edit: DataTypes.BOOLEAN,
    delete_units: DataTypes.BOOLEAN,
    access_taxes: DataTypes.BOOLEAN,
    taxes_create_edit: DataTypes.BOOLEAN,
    delete_taxes: DataTypes.BOOLEAN,
    access_settings: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};