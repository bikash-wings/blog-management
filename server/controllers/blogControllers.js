const { StatusCodes } = require("http-status-codes");
const blogService = require("../services/blogService");
const { setSuccessResponse } = require("../utills/sendResponse");
const { catchAsync } = require("../utills/catchAsync");

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

const getAllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await blogService.fetchAllBlogs();

  return setSuccessResponse(
    res,
    StatusCodes.OK,
    true,
    allBlogs,
    "Fetched all blogs"
  );
});

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
  updateBlog,
  deleteBlog,
};
