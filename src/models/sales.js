'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Customer model
      Sales.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'customer',
        onDelete: 'SET NULL'
      });
    }
  }
  Sales.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    customer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customer_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tax_percentage: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    tax_amount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    discount_percentage: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    discount_amount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    total_excluding_tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    shipping_amount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    total_amount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false
    },
    paid_amount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false
    },
    due_amount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Sales',
    tableName: 'sales',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Sales;
}; 