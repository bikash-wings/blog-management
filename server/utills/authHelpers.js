const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isPasswordMatch = await bcrypt.compareSync(password, hashedPassword);

    return isPasswordMatch;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashPassword, comparePassword };
