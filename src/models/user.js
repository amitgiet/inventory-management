"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email_verified_at: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      location_id: {
        type: DataTypes.STRING,
      },
      profile_picture: {
        type: DataTypes.STRING,
      },
      permission_id: {
        type: DataTypes.NUMERIC,
      },
      remember_token: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users", 
      underscored: true,
      timestamps: true, 
    }
  );
  return User;
};
