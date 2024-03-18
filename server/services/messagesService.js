const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const db = require("../models");
const CustomError = require("../utills/CustomError");

const addNew = async (body, req) => {
  const { room, content } = body;
  const sender = req.user.id;

  if (!room) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Room required");
  }

  if (!content) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Message content required");
  }

  const newMessage = await db.Messages.create({
    sender: sender,
    room: room,
    content: content,
  });

  if (!newMessage) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Problem ocurred adding new message"
    );
  }

  delete newMessage.dataValues.isDeleted;
  delete newMessage.dataValues.updatedAt;
  delete newMessage.dataValues.sender;

  newMessage.dataValues.Sender = {
    id: req.user.id,
    fullName: req.user.fullName,
    avatar: req.user.avatar,
  };

  return newMessage;
};

const getAll = async (req) => {
  const room = req.params.room;

  const { sort = "id", order = "ASC", limit = 10, page = 1 } = req.query;

  const offset = (page - 1) * limit;

  const allMessages = await db.Messages.findAll({
    where: {
      [Op.and]: [{ room: room }, { isDeleted: false }],
    },
    include: [
      {
        model: db.User,
        attributes: ["id", "fullName", "avatar"],
        as: "Sender",
      },
    ],
    attributes: ["id", "content", "createdAt"],
    order: [[sort, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return allMessages.reverse();
};

const destroyMessage = async (messageId, sender) => {
  const checkMessage = await db.Messages.findByPk(messageId);
  if (!checkMessage) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      `No message found with id ${messageId}`
    );
  }

  if (checkMessage.sender !== sender) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Can't delete this message");
  }

  checkMessage.isDeleted = true;
  await checkMessage.save();

  return checkMessage;
};

const getRoomMessagesCount = async (req) => {
  const roomMessagesCount = await db.Messages.count({
    where: { room: req.params.room, isDeleted: false },
  });

  return roomMessagesCount;
};

module.exports = {
  addNew,
  getAll,
  destroyMessage,
  getRoomMessagesCount,
};
