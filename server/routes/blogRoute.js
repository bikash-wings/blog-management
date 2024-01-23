const express = require("express");
const {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogsCount,
} = require("../controllers/blogControllers");
const { isSignIn } = require("../middlewares/auth");

const router = express.Router();

/* POST new blog */
router.post("/add", isSignIn, createBlog);

/* GET all blogs */
router.get("/get-all", getAllBlogs);

/* GET blogs count */
router.get("/total-count", getBlogsCount);

/* GET single blog */
router.get("/:blogid", getSingleBlog);

/* PUT update blog  */
router.put("/:blogid", isSignIn, updateBlog);

/* DELETE blog */
router.delete("/:blogid", isSignIn, deleteBlog);

module.exports = router;
