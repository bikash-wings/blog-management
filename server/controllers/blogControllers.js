const blogService = require("../services/blogService");

const createBlog = async (req, res) => {
  const blog = await blogService.createBlog(req, res);

  return blog;
};

const getSingleBlog = async (req, res) => {
  const blog = await blogService.fetchSingleBlog(req, res);

  return blog;
};

const getAllBlogs = async (req, res) => {
  const allBlogs = await blogService.fetchAllBlogs(req, res);

  return allBlogs;
};

const updateBlog = async (req, res) => {
  const updatedBlog = await blogService.updateBlog(req, res);

  return updatedBlog;
};

const deleteBlog = async (req, res) => {
  const deletedBlog = await blogService.destroyBlog(req, res);

  return deletedBlog;
};

module.exports = {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
