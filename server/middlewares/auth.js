const jwt = require("jsonwebtoken");
const db = require("../models");
const CustomError = require("../utills/CustomError");
const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("../utills/catchAsync");

const isSignIn = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "token required!");
    }

    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await db.User.findOne({
      where: { id: userId },
      include: {
        model: db.invalidated_tokens,
        where: { token: token },
        required: false,
      },
    });

    if (user.invalidated_tokens.length) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "jwt expired");
    }

    if (!user) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthenticated!");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      error.message || error.errorMessage || "JWT Token required!"
    );
  }
});

const isAdmin = catchAsync(async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user.role, ";;;;;;;;;;;;;");

    if (user.role !== "admin") {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized access!");
    }

    next();
  } catch (error) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized access!");
  }
});

module.exports = { isSignIn, isAdmin };
