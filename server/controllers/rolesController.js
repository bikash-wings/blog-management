const { catchAsync } = require("../utills/catchAsync");

const SERVICE = require("../services/rolesService");

const { setSuccessResponse } = require("../utills/sendResponse");
const { StatusCodes } = require("http-status-codes");

const addNewRoleController = catchAsync(async (req, res) => {
  const newRole = await SERVICE.addNew(req.body);

  if (newRole) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      newRole,
      "New role added"
    );
  }
});

module.exports = { addNewRoleController };
