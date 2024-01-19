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
router.post("/add", createBlog);

/* GET all blogs */
router.get("/get-all", getAllBlogs);

/* GET single blog */
router.get("/:blogid", getSingleBlog);

/* PUT update blog  */
router.put("/:blogid", updateBlog);

/* DELETE blog */
router.delete("/:blogid", deleteBlog);

module.exports = router;
