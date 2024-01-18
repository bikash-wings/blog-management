const {
  signup,
  login,
  getAllUsers,
  uploadProfilePic,
} = require("../controllers/userController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const router = require("express").Router();

/* POST new user. */
router.post("/signup", signup);

/* POST user login */
router.post("/login", login);

/* GET all users */
router.get("/get-all", getAllUsers);

/* POST pic upload */
router.post("/upload/:userid", upload.single("avatar"), uploadProfilePic);

module.exports = router;
