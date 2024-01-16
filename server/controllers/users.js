const userServices = require("../services/users");

const signup = async (req, res) => {
  const user = await userServices.signup(req, res);

  return user;
};

const login = async (req, res) => {
  const userInfo = await userServices.login(req, res);

  return userInfo;
};

module.exports = { signup, login };
