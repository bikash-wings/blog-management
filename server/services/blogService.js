const { StatusCodes } = require("http-status-codes");
const { notFound } = require("../helpers/errorHandlers");
const db = require("../models");
const CustomError = require("../utills/CustomError");

const createBlog = async (req) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      throw new CustomError(StatusCodes.NOT_FOUND, "blog title required!");
    }
    if (!description) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        "blog description required!"
      );
    }

    const newBlog = await db.Blog.create(req.body);

    return newBlog;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

const fetchSingleBlog = async (req) => {
  try {
    const { blogid } = req.params;

    const blog = await db.Blog.findOne({ where: { id: blogid } });
    if (!blog) {
      throw new CustomError(StatusCodes.NOT_FOUND, "no blog found!");
    }

    return blog;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

const fetchAllBlogs = async () => {
  try {
    const allBlogs = await db.Blog.findAll();

    return allBlogs;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

const updateBlog = async (req) => {
  try {
    const { blogid } = req.params;
    const { title, description } = req.body;

    const blog = await db.Blog.findOne({ where: { id: blogid } });
    if (!blog) {
      throw new CustomError(StatusCodes.NOT_FOUND, "no blog found!");
    }

    if (title) {
      blog.title = title;
    }

    if (description) {
      blog.description = description;
    }

    await blog.save();

    return blog;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

const destroyBlog = async (req) => {
  try {
    const { blogid } = req.params;

    const blog = await db.Blog.destroy({ where: { id: blogid } });
    if (!blog) {
      throw new CustomError(StatusCodes.NOT_FOUND, "no blog found!");
    }

    return blog;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

module.exports = {
  createBlog,
  fetchSingleBlog,
  fetchAllBlogs,
  updateBlog,
  destroyBlog,
};
