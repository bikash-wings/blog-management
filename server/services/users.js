const { hashPassword, comparePassword } = require("../helpers/auth");
const { notFound, alreadyExists } = require("../helpers/errorHandlers");
const db = require("../models");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { fname, lname, email, password, phone, avatar, answer } = req.body;

    if (!fname) {
      return notFound(res, "First Name required!");
    }
    if (!lname) {
      return notFound(res, "Last Name required!");
    }
    if (!email) {
      return notFound(res, "Email required!");
    }
    if (!password) {
      return notFound(res, "Password required!");
    }
    if (!phone) {
      return notFound(res, "Phone number required!");
    }
    if (!answer) {
      return notFound(res, "Answer required!");
    }

    const existingUser = await db.User.findOne({ where: { email: email } });

    // Only when email is registered
    if (existingUser) {
      return alreadyExists(res, "Email registered, verify email");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.User.create({
      ...req.body,
      fullName: fname + " " + lname,
      password: hashedPassword,
      avatar: avatar || null,
    });

    return res.json(newUser);
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
};

/**
 * login service
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

    return res.json({ user: user, token: token });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword=async(req,res)=>{
    try {
        const {email,newPassword}=req.body;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { signup, login };
