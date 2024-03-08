const express = require("express");
const {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogsCount,
  toggleBlogLikeController,
  totalBlogLikesController,
  addCommentController,
  allCommentsController,
  deleteCommentController,
} = require("../controllers/blogControllers");
const { isSignIn, checkPermissions } = require("../middlewares/auth");
const { uploadThumbnail } = require("../middlewares/uploadFile");

const router = express.Router();

/* POST new blog */
router.post(
  "/add",
  isSignIn,
  checkPermissions("add-blog"),
  uploadThumbnail.single("thumbnail"),
  createBlog
);

/* GET all blogs, query: page & limit */
router.get("/get-all", getAllBlogs);

/* GET blogs count */
router.get(
  "/total-count",
  // isSignIn,
  // checkPermissions("view-blogs"),
  getBlogsCount
);

/* GET single blog */
router.get("/:blogid", getSingleBlog);

/* PUT update blog  */
router.put(
  "/:blogid",
  isSignIn,
  checkPermissions("update-blog"),
  uploadThumbnail.single("thumbnail"),
  updateBlog
);

/* DELETE blog */
router.delete(
  "/:blogid",
  isSignIn,
  checkPermissions("delete-blog"),
  deleteBlog
);

/* POST like-blog */
router.post("/toggle-like/:blogid", isSignIn, toggleBlogLikeController);

/* GET like-count */
router.get("/count-likes/:blogid", totalBlogLikesController);

/* POST add-comment */
router.post("/comments/:blogid", isSignIn, addCommentController);

/* GET all-comments */
router.get("/comments/:blogid", allCommentsController);

/* DELETE delete-comment */
router.delete("/comments/:commentid", isSignIn, deleteCommentController);

module.exports = router;
