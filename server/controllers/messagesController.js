const { StatusCodes } = require("http-status-codes");
const messageService = require("../services/messagesService");

const { catchAsync } = require("../utills/catchAsync");
const { setSuccessResponse } = require("../utills/sendResponse");

const addNewController = catchAsync(async (req, res) => {
  const addNew = await messageService.addNew(req.body, req);

  if (addNew) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      addNew,
      "New message added"
    );
  }
});

const getAllController = catchAsync(async (req, res) => {
  const getAll = await messageService.getAll(req);

  if (getAll) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      getAll,
      "Messages fetched"
    );
  }
});

const deleteMessageController = catchAsync(async (req, res) => {
  const deleteMessage = await messageService.destroyMessage(
    req.params.messageid,
    req.user.id
  );

  if (deleteMessage) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      "",
      "Message deleted successfully"
    );
  }
});

const roomMessagesCountController = catchAsync(async (req, res) => {
  const messagesCount = await messageService.getRoomMessagesCount(req);

  if (messagesCount >= 0) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      messagesCount,
      "Room messages count fetched"
    );
  }
});

module.exports = {
  addNewController,
  getAllController,
  deleteMessageController,
  roomMessagesCountController,
};
