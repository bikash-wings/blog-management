const { StatusCodes } = require("http-status-codes");
const SERVICE = require("../services/permissionService");

const { catchAsync } = require("../utills/catchAsync");
const { setSuccessResponse } = require("../utills/sendResponse");

const addNewController = catchAsync(async (req, res) => {
  const addNew = await SERVICE.addNew(req.body);

  if (addNew) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      addNew,
      "New permission added"
    );
  }
});

const rolePermissionController = catchAsync(async (req, res) => {
  const rolePermissions = await SERVICE.rolePermissions(req.params.roleId);

  if (rolePermissions) {
    return setSuccessResponse(res, StatusCodes.OK, true, rolePermissions, "");
  }
});

module.exports = {
  addNewController,
  rolePermissionController,
};
