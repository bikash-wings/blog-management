const { hashPassword, comparePassword } = require("../utills/authHelpers");
const db = require("../models");
const jwt = require("jsonwebtoken");
const CustomError = require("../utills/CustomError");
const { StatusCodes } = require("http-status-codes");
const sendMail = require("../utills/sendMail");
const randomString = require("randomstring");

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
  if (!answer) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Answer required!");
  }

  const existingUser = await db.User.findOne({ where: { email: email } });

  // Only when email is registered
  if (existingUser && !existingUser.isVerified) {
    const mailSubject = `Mail Verification`;
    const content = `<p>Hi ${fname}, Please <a href="http://localhost:3000/api/v1/users/mail-verification?token=${existingUser.randomToken}">Verify</a> your Mail.</p>`;
    await sendMail(email, mailSubject, content);

    throw new CustomError(
      StatusCodes.CONFLICT,
      "Email registered, verify email"
    );
  }

  if (existingUser && existingUser.isVerified) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Email Verified! Try login");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await db.User.create({
    ...req.body,
    fullName: fname + " " + lname,
    password: hashedPassword,
    avatar: avatar || null,
  });

  const mailSubject = "Mail Verification";
  const randomToken = randomString.generate();
  let content = `<p>Hi ${fname}, Please <a href="http://localhost:3000/api/v1/users/mail-verification?token=${randomToken}">Verify</a> your Mail.</p>`;
  sendMail(email, mailSubject, content);

  newUser.verifyToken = randomToken;

  await newUser.save();

  newUser.verifyToken = "****";
  newUser.password = "****";

  return newUser;
};

/**
 * This service will verify mail
 */
const verifyMail = async (req) => {
  try {
    const { token } = req.query;

    const user = await db.User.findOne({ where: { verifyToken: token } });
    if (!user) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    user.isVerified = true;
    await user.save();

    return { isVerified: true };
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

/**
 * This service is to login
 */
const login = async (req) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Invalid Email!");
    }
    if (!password) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Invalid Password!");
    }

    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        "Email is not registered!"
      );
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Wrong password!");
    }

    if (!user.isVerified) {
      const mailSubject = "Mail Verification";
      let content = `<p>Hi ${user.fname}, Please <a href="http://localhost:3000/api/v1/users/mail-verification?token=${user.verifyToken}">Verify</a> your Mail.</p>`;
      sendMail(email, mailSubject, content);
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Please verify mail");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m",
    });

    user.password = "*******";
    user.avatar = `/${user.avatar}`;

    return { user: user, token: token };
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
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
    const { userid } = req.params;

    const user = await db.User.findByPk(userid);
    if (!user) {
      throw new CustomError(StatusCodes.NOT_FOUND, "no user found!");
    }

    user.avatar = req.avatar;

    await user.save();

    console.log(user);

    return { success: true, message: "Image uploaded successfully" };
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};


/**
 * This service is to forgot password
 */

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

module.exports = {
  signup,
  verifyMail,
  login,
  forgotPassword,
  fetchAllUsers,
  uploadPic,
  fetchProfilePic,
};
