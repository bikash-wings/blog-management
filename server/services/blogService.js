const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const CustomError = require("../utills/CustomError");

/**
 * This service will create new blog
 */
const createBlog = async (req) => {
  try {
    const { title, description, status } = req.body;

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
    if (!status) {
      throw new CustomError(StatusCodes.NOT_FOUND, "blog status required!");
    }

    const newBlog = await db.Blog.create({ ...req.body, userId: user.id });

    const thumbnail = req.thumbnail;
    if (thumbnail) {
      newBlog.thumbnail = thumbnail;
      await newBlog.save();
    }

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

    const blog = await db.Blog.findOne({
      where: { id: blogid },
      include: {
        model: db.User,
        attributes: ["fullName", "avatar"],
        as: "User",
      },
    });
    if (!blog) {
      throw new CustomError(StatusCodes.NOT_FOUND, "no blog found!");
    }

    blog.views++;
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
 * This service will fetch all blogs with limits
 */
const fetchAllBlogs = async (req) => {
  try {
    const { page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;

    const allBlogs = await db.Blog.findAll({
      include: {
        model: db.User,
        attributes: ["fullName", "avatar"],
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

/**
 * This service is to add like to blog
 */
const toggleBlogLike = async (blogId, userId) => {
  const checkBlog = await db.Blog.findByPk(blogId);
  if (!checkBlog) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      `No blog found with id ${blogId}`
    );
  }

  // const checkUser = await db.Blog.findByPk(userId);
  // if (!checkUser) {
  //   throw new CustomError(
  //     StatusCodes.NOT_FOUND,
  //     `No User found with id ${userId}`
  //   );
  // }

  const checkBlogLike = await db.Likes.findOne({
    where: { blogId: blogId, userId: userId },
  });

  if (checkBlogLike) {
    const removedLike = await db.Likes.destroy({
      where: { blogId: blogId, userId: userId },
    });
    if (!removedLike) {
      throw new CustomError(
        StatusCodes.CONFLICT,
        "Failed to remove like from the blog"
      );
    }

    return "like removed";
  }

  const likeBlog = await db.Likes.create({ blogId: blogId, userId: userId });

  if (!likeBlog) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Error adding like to the blog"
    );
  }

  return "Like added to the blog";
};

/**
 * This service is count total likes of a blog
 */
const totalBlogLikes = async (blogId) => {
  try {
    const totalLikes = await db.Likes.count({ where: { blogId: blogId } });

    return totalLikes;
  } catch (error) {
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

/**
 * This will add comment to blog
 */
const addComment = async (req) => {
  const { comment } = req.body;
  const userId = req.user.id;
  const blogId = req.params.blogid;

  if (!comment) {
    throw new CustomError(StatusCodes.CONFLICT, "Comment content required");
  }

  const checkBlog = await db.Blog.findByPk(blogId);
  if (!checkBlog) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      `No blog found with id ${blogId}`
    );
  }

  const newComment = await db.Comments.create({
    userId: userId,
    blogId: blogId,
    content: comment,
  });
  if (!newComment) {
    throw new CustomError(StatusCodes.CREATED, "Comment added to the blog");
  }

  return newComment;
};

/**
 * This will fetch all comments
 */
const allComments = async (blogId) => {
  const allComments = await db.Comments.findAll({
    where: { blogId: blogId },
    include: {
      model: db.User,
      attributes: ["fullName", "avatar"],
      as: "User",
    },
    attributes: ["id", "content", "createdAt"],
  });

  if (!allComments) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "No comments found for the blog"
    );
  }

  return allComments;
};

module.exports = {
  createBlog,
  fetchSingleBlog,
  fetchAllBlogs,
  totalBlogCount,
  updateBlog,
  destroyBlog,
  toggleBlogLike,
  totalBlogLikes,
  addComment,
  allComments,
};
