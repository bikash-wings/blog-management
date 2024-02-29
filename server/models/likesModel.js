"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.User, { foreignKey: "userId" });
      Likes.belongsTo(models.Blog, { foreignKey: "blogId" });
    }
  }
  Likes.init(
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
    },
    {
      sequelize,
      modelName: "Likes",
      indexes: [
        {
          unique: true,
          fields: ["userId", "blogId"],
        },
      ],
    }
  );
  return Likes;
};
