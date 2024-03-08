const express = require("express");

const {
  addNewController,
  deleteMessageController,
  getAllController,
  roomMessagesCountController,
} = require("../controllers/messagesController");
const { isSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/", isSignIn, addNewController);
router.get("/:room", isSignIn, getAllController);
router.delete("/:messageid", isSignIn, deleteMessageController);
router.get("/total/:room", roomMessagesCountController);

module.exports = router;
