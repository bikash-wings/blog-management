const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const CustomError = require("../utills/CustomError");

const addNew = async (body) => {
  const { name } = body;

  const checkRole = await db.Roles.findOne({ where: { name: name } });
  if (checkRole) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      `Role ${name} is already added`
    );
  }

  const newRole = await db.Roles.create({ name: name });
  if (!newRole) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Problem occurred creating new role"
    );
  }

  return newRole;
};

module.exports = { addNew };
