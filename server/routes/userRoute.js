const {
  signup,
  login,
  getAllUsers,
  uploadProfilePic,
  mailVerification,
  forgotPassword,
  updateUser,
  isUserAdmin,
  logoutController,
} = require("../controllers/userController");
const { isSignIn, isAdmin } = require("../middlewares/auth");

const { upload } = require("../middlewares/uploadFile");

const router = require("express").Router();

/* POST new user. */
router.post("/signup", signup);

/* POST user login */
router.post("/login", login);

/* POST forgot password */
router.post("/forgot-password", forgotPassword);

/* PUT update user info */
router.put("/update/:userid", updateUser);

/* GET all users, queries: page & limit */
router.get("/get-all", isSignIn, isAdmin, getAllUsers);

/* POST pic upload */
router.post("/upload/:userid", upload.single("avatar"), uploadProfilePic);

/* GET verify mail */
router.get("/mail-verification", mailVerification);

/* GET is user admin */
router.get("/is-admin", isSignIn, isUserAdmin);

/* POST log out */
router.post("/logout", isSignIn, logoutController);

module.exports = router;
