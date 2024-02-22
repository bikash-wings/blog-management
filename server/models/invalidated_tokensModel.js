"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class invalidated_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invalidated_tokens.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  invalidated_tokens.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "invalidated_tokens",
    }
  );
  return invalidated_tokens;
};
