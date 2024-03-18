const { StatusCodes } = require("http-status-codes");
const { gOAuthLogin } = require("../services/authService");
const { catchAsync } = require("../utills/catchAsync");
const { setSuccessResponse } = require("../utills/sendResponse");

const gOAuthLoginController = catchAsync(async (req, res) => {
  const login = await gOAuthLogin(req, res);

  if (login) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      login,
      "Logged in successfully"
    );
  }
});

module.exports = { gOAuthLoginController };
