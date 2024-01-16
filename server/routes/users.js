const express = require("express");
const { signup, login } = require("../controllers/users");
const router = express.Router();

/* POST new user. */
router.route("/signup").post(signup);

/* POST user login */
router.route("/login").post(login);

module.exports = router;
