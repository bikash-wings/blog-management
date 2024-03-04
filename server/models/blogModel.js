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
      blog.belongsTo(models.User, { foreignKey: "userId" });
      blog.hasMany(models.Likes, { foreignKey: "blogId" });
      blog.hasMany(models.Views, { foreignKey: "blogId" });
    }
  }
  blog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      status: {
        type: DataTypes.ENUM("Drafted", "Published", "Active", "Inactive"),
        allowNull: false,
        required: true,
        defaultValue: "Drafted",
      },
      // views: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 0,
      // },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return blog;
};
