const { StatusCodes } = require("http-status-codes");
const blogService = require("../services/blogService");
const { setSuccessResponse } = require("../utills/sendResponse");
const { catchAsync } = require("../utills/catchAsync");

/**
 * This controller is to create blog
 */
const createBlog = catchAsync(async (req, res) => {
  const blog = await blogService.createBlog(req);

  return setSuccessResponse(
    res,
    StatusCodes.OK,
    true,
    blog,
    "Blog created successfully"
  );
});

/**
 * This controller is to fetch single blog
 */
const getSingleBlog = catchAsync(async (req, res) => {
  const blog = await blogService.fetchSingleBlog(req);

  return setSuccessResponse(
    res,
    StatusCodes.OK,
    true,
    blog,
    "blog fetched successfully"
  );
});

/**
 * This will fetch all blogs
 */
const getAllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await blogService.fetchAllBlogs(req);

  if (allBlogs) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      allBlogs,
      "Fetched all blogs"
    );
  }
});

/**
 * This controller will return total blog count
 */
const getBlogsCount = catchAsync(async (req, res) => {
  const blogCount = await blogService.totalBlogCount(req);

  if (blogCount >= 0) {
    setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      blogCount,
      "Total blogs count fetched"
    );
  }
});

/**
 * This will update the blog
 */
const updateBlog = catchAsync(async (req, res) => {
  const updatedBlog = await blogService.updateBlog(req);

  return setSuccessResponse(
    res,
    StatusCodes.OK,
    true,
    updatedBlog,
    "blog updated successfully"
  );
});

/**
 * This will delete the blog
 */
const deleteBlog = catchAsync(async (req, res) => {
  const deletedBlog = await blogService.destroyBlog(req);

  if (deletedBlog) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      "",
      "Blog deleted successfully!"
    );
  }
});

/**
 * This controller is to like a blog
 */
const toggleBlogLikeController = catchAsync(async (req, res) => {
  const likeBlog = await blogService.toggleBlogLike(
    req.params.blogid,
    req.user.id,
    req
  );

  if (likeBlog) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      likeBlog,
      "Blog like toggled"
    );
  }
});

/**
 * This controller will return total likes count
 */
const totalBlogLikesController = catchAsync(async (req, res) => {
  const totalLikes = await blogService.totalBlogLikes(req.params.blogid);

  if (totalLikes >= 0) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      totalLikes,
      "like count fetched"
    );
  }
});

/**
 * This controller is to add comments to the blog
 */
const addCommentController = catchAsync(async (req, res) => {
  const addComment = await blogService.addComment(req);

  if (addComment) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      addComment,
      "Comment added to the blog"
    );
  }
});

/**
 * This controller is to fetch all comments of the blog
 */
const allCommentsController = catchAsync(async (req, res) => {
  const allComments = await blogService.allComments(req.params.blogid);

  if (allComments) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      allComments,
      "all comments fetched"
    );
  }
});

/**
 * This controller will delete blog comment
 */
const deleteCommentController = catchAsync(async (req, res) => {
  const deleteComment = await blogService.deleteComment(
    req.params.commentid,
    req
  );

  if (deleteComment) {
    return setSuccessResponse(res, StatusCodes.OK, true, "", "Comment Deleted");
  }
});

module.exports = {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  getBlogsCount,
  updateBlog,
  deleteBlog,
  toggleBlogLikeController,
  totalBlogLikesController,
  addCommentController,
  allCommentsController,
  deleteCommentController,
};
