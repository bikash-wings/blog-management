"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // blog.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  blog.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: "User", key: "id" },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // },
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return blog;
};
