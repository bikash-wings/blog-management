const { hashPassword, comparePassword } = require("../utills/authHelpers");
const { notFound, alreadyExists } = require("../helpers/errorHandlers");
const db = require("../models");
const jwt = require("jsonwebtoken");
const CustomError = require("../utills/CustomError");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");

/**
 * Multer instance
 */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

/**
 * This service is for signup
 */
const signup = async (req, res) => {
  const { fname, lname, email, password, phone, avatar, answer } = req.body;

  if (!fname) {
    throw new CustomError(StatusCodes.NOT_FOUND, "First Name required!");
  }
  if (!lname) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Last Name required!");
  }
  if (!email) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Email required!");
  }
  if (!password) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Password required!");
  }
  if (!phone) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Phone number required!");
  }
  if (!answer) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Answer required!");
  }

  const existingUser = await db.User.findOne({ where: { email: email } });

  // Only when email is registered
  if (existingUser) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Email registered, verify email"
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await db.User.create({
    ...req.body,
    fullName: fname + " " + lname,
    password: hashedPassword,
    avatar: avatar || null,
  });

  return newUser;
};

/**
 * This service is to login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return notFound(res, "Invalid Email!");
    }
    if (!password) {
      return notFound(res, "Invalid Password!");
    }

    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      return notFound(res, "Email is not registered!");
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return notFound(res, "Wrong password!");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m",
    });

    return { success: true, user: user, token: token };
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error"
    );
  }
};

/**
 * This service is to upload profile image
 */
const uploadPic = async (req) => {
  try {
    if (!req.file) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "No file uploaded!");
    }
    const { userid } = req.body;

    console.log(userid)

    return { success: true, message: "Image uploaded successfully" };
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error"
    );
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error"
    );
  }
};

/**
 * This service will fetch all users
 */

const fetchAllUsers = async () => {
  try {
    const allUsers = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });

    return allUsers;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error!"
    );
  }
};

module.exports = { signup, login, forgotPassword, fetchAllUsers, uploadPic };
