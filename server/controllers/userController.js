const userServices = require("../services/userService");
const { catchAsync } = require("../utills/catchAsync");
const { setSuccessResponse } = require("../utills/sendResponse");
const { StatusCodes } = require("http-status-codes");

/**
 * This controller is to register new user
 */
const signup = catchAsync(async (req, res) => {
  const signup = await userServices.signup(req, res);

  if (signup) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      signup,
      "signed up successfully"
    );
  }
});

/**
 * This will upload profile image
 */
const uploadProfilePic = catchAsync(async (req, res) => {
  const uploadPicResult = await userServices.uploadPic(req);

  if (uploadPicResult) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      uploadPicResult,
      "Image uploaded successfully"
    );
  }
});

/**
 * This controller is to login
 */
const login = catchAsync(async (req, res) => {
  const login = await userServices.login(req, res);

  if (login) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      login,
      "logged in successfully"
    );
  }
});

/**
 * This controller will fetch all users
 */
const getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await userServices.fetchAllUsers();

  if (allUsers) {
    setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      allUsers,
      "all users fetched successfully"
    );
  }
});

module.exports = { signup, login, getAllUsers, uploadProfilePic };
