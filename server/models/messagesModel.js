"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.User, { foreignKey: "sender", as: "Sender" });
    }
  }
  Messages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
      room: {
        type: DataTypes.ENUM("react", "node", "chitchat"),
        required: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
