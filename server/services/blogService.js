const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const CustomError = require("../utills/CustomError");

/**
 * This service will create new blog
 */
const createBlog = async (req) => {
  try {
    const { title, description } = req.body;

    const user = req.user;

    if (!title) {
      throw new CustomError(StatusCodes.NOT_FOUND, "blog title required!");
    }
    if (!description) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        "blog description required!"
      );
    }

    const newBlog = await db.Blog.create({ ...req.body, userId: user.id });

    return newBlog;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

/**
 * This service will fetch single blog
 */
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

/**
 * This service will fetch all blogs with limits
 */
const fetchAllBlogs = async (req) => {
  try {
    const { page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;

    const allBlogs = await db.Blog.findAll({
      include: {
        model: db.User,
        attributes: ["fullName"],
        as: "User",
      },
      limit: Number(limit),
      offset: Number(offset),
    });

    return allBlogs;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

/**
 * This service count total number of blogs
 */
const totalBlogCount = async () => {
  try {
    const blogCount = await db.Blog.count();

    return blogCount;
  } catch (error) {
    throw new CustomError(
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      error.errorMessage || "Internal Server Error"
    );
  }
};

/**
 * This service will update blog
 */
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

/**
 * This service will delete the blog
 */
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
  totalBlogCount,
  updateBlog,
  destroyBlog,
};
