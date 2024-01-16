const express = require("express");
const {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogControllers");

const router = express.Router();

/* POST new blog */
router.route("/add").post(createBlog);

/* GET all blogs */
router.route("/get-all").get(getAllBlogs);

/* GET single blog */
router.route("/:blogid").get(getSingleBlog);

/* PUT update blog  */
router.route("/:blogid").put(updateBlog);

/* DELETE blog */
router.route("/:blogid").delete(deleteBlog);

module.exports = router;
