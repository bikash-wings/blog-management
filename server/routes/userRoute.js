const {
  signup,
  login,
  getAllUsers,
  uploadProfilePic,
  mailVerification,
} = require("../controllers/userController");

const { upload } = require("../middlewares/uploadFile");

const router = require("express").Router();

/* POST new user. */
router.post("/signup", signup);

/* POST user login */
router.post("/login", login);

/* GET all users */
router.get("/get-all", getAllUsers);

/* POST pic upload */
router.post("/upload/:userid", upload.single("avatar"), uploadProfilePic);

/* GET verify mail */
router.get("/mail-verification", mailVerification);

module.exports = router;
