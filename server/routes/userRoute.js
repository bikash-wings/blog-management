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
  totalUserCountController,
  getRoomIdController,
  userProfileController,
} = require("../controllers/userController");
const { isSignIn, checkPermissions } = require("../middlewares/auth");

const { uploadAvatar } = require("../middlewares/uploadFile");

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
router.get("/get-all", getAllUsers);

/* POST pic upload */
router.post("/upload/:userid", uploadAvatar.single("avatar"), uploadProfilePic);

/* GET verify mail */
router.get("/mail-verification", mailVerification);

/* GET is user admin */
router.get("/is-admin", isSignIn, isUserAdmin);

/* POST log out */
router.post("/logout", logoutController);

/* GET users count */
router.get(
  "/total-count",
  isSignIn,
  checkPermissions("view-users"),
  totalUserCountController
);

/* GET room-id */
router.get("/room-id", isSignIn, getRoomIdController);

/* GET profile */
router.get("/profile", isSignIn, userProfileController);

module.exports = router;
