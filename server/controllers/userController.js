const userServices = require("../services/userService");
const { catchAsync } = require("../utills/catchAsync");
const { setSuccessResponse } = require("../utills/sendResponse");
const { StatusCodes } = require("http-status-codes");

/**
 * This controller is to register new user
 */
const signup = catchAsync(async (req, res) => {
  const signup = await userServices.signup(req);

  if (signup) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      signup,
      "Email Registered! Please Verify Email"
    );
  }
});

/**
 * This controller will verify mail
 */

const mailVerification = catchAsync(async (req, res) => {
  const isVerified = await userServices.verifyMail(req);

  return setSuccessResponse(
    res,
    StatusCodes.OK,
    true,
    isVerified,
    "Mail Verification Successfull"
  );
});

/**
 * This service will upload profile image
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
  const login = await userServices.login(req);

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
 * This controller is to reset password when forgotten
 */
const forgotPassword = catchAsync(async (req, res) => {
  const user = await userServices.forgotPassword(req.body);

  if (user) {
    setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      user,
      "Password reset successfully"
    );
  }
});

/**
 * This controller will update user info
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userServices.updateUserInfo(req);

  if (user) {
    setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      user,
      "User info updated successfully"
    );
  }
});

/**
 * This controller will fetch all users with pagination
 */
const getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await userServices.fetchAllUsers(req);

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

/**
 * This Controller will return true if user is admin
 */
const isUserAdmin = catchAsync(async (req, res) => {
  const isAdmin = await userServices.checkUserRole(req);

  if (isAdmin) {
    return setSuccessResponse(res, StatusCodes.OK, true, isAdmin, "Admin user");
  }
});

/**
 * This controller is to invalidate token on logout
 */
const logoutController = catchAsync(async (req, res) => {
  const logout = await userServices.logout(req);

  if (logout) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      logout,
      "Logged out successfully"
    );
  }
});

/**
 * This controller will return total user count
 */
const totalUserCountController = catchAsync(async (req, res) => {
  const totalUser = await userServices.totalUsersCount();

  if (totalUser) {
    setSuccessResponse(res, StatusCodes.OK, true, totalUser, "");
  }
});

/**
 * This controller will return room id
 */
const getRoomIdController = catchAsync(async (req, res) => {
  const getRoomId = await userServices.getRoomId();

  if (getRoomId) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      getRoomId,
      "Room Id fetched"
    );
  }
});

/**
 * This controller will return profile info
 */
const userProfileController = catchAsync(async (req, res) => {
  const userProfile = await userServices.userProfile(req);

  if (userProfile) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      userProfile,
      "Profile info fetched"
    );
  }
});

module.exports = {
  signup,
  mailVerification,
  login,
  forgotPassword,
  updateUser,
  getAllUsers,
  uploadProfilePic,
  isUserAdmin,
  logoutController,
  totalUserCountController,
  getRoomIdController,
  userProfileController,
};
