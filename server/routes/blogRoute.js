const express = require("express");
const {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogsCount,
} = require("../controllers/blogControllers");
const { isSignIn, checkPermissions } = require("../middlewares/auth");

const router = express.Router();

/* POST new blog */
router.post("/add", isSignIn, checkPermissions("add-blog"), createBlog);

/* GET all blogs, query: page & limit */
router.get("/get-all", isSignIn, checkPermissions("view-blogs"), getAllBlogs);

/* GET blogs count */
router.get(
  "/total-count",
  isSignIn,
  checkPermissions("view-blogs"),
  getBlogsCount
);

/* GET single blog */
router.get("/:blogid", isSignIn, checkPermissions("view-blogs"), getSingleBlog);

/* PUT update blog  */
router.put("/:blogid", isSignIn, checkPermissions("update-blog"), updateBlog);

/* DELETE blog */
router.delete(
  "/:blogid",
  isSignIn,
  checkPermissions("delete-blog"),
  deleteBlog
);

module.exports = router;
