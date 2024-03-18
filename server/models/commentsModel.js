"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.User, { foreignKey: "userId" }),
      Comments.belongsTo(models.Blog, { foreignKey: "blogId" });
    }
  }
  Comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
