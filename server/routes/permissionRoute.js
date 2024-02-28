const express = require("express");

const {
  addNewController,
  rolePermissionController,
} = require("../controllers/permissionController");
const { isSignIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(isSignIn, addNewController);
router.route("/:roleId").get(isSignIn, rolePermissionController);

module.exports = router;
