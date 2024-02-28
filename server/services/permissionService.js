const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const CustomError = require("../utills/CustomError");

const addNew = async (body) => {
  const { name, roleId } = body;

  const checkPermission = await db.Permission.findOne({
    where: { name: name, role_id: roleId },
  });
  if (checkPermission) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      `Permission ${name} already added for role ${roleId}`
    );
  }

  const newPermission = db.Permission.create({ name: name, role_id: roleId });
  if (!newPermission) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Error creating new permission"
    );
  }

  return newPermission;
};

const rolePermissions = async (roleId) => {
  const rolePermissions = await db.Permission.findAll({
    where: { role_id: roleId },
  });
  if (!rolePermissions?.length) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      `No permission found for role ${roleId}`
    );
  }

  const allPermissions = rolePermissions?.map((per) => per.name);

  return allPermissions;
};

module.exports = { addNew, rolePermissions };
