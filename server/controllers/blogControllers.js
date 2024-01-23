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
  const blogCount = await blogService.totalBlogCount();

  if (blogCount) {
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

  return setSuccessResponse(
    res,
    StatusCodes.OK,
    true,
    deletedBlog,
    "Blog deleted!"
  );
});

module.exports = {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  getBlogsCount,
  updateBlog,
  deleteBlog,
};
