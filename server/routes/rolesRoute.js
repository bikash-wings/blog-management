const express = require("express");

const { isSignIn } = require("../middlewares/auth");
const { addNewRoleController } = require("../controllers/rolesController");

const router = express.Router();

router.route("/").post(isSignIn, addNewRoleController);

module.exports = router;
