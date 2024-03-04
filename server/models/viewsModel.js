"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Views.belongsTo(models.Blog, { foreignKey: "blogId" });
    }
  }
  Views.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
      blogId: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Views",
    }
  );
  return Views;
};
