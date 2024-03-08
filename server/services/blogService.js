const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const db = require("../models");
const CustomError = require("../utills/CustomError");
const { Op } = require("sequelize");

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
  const { blogid } = req.params;

  const blog = await db.Blog.findOne({
    where: { id: blogid, isDeleted: false, status: "Published" },
    include: [
      {
        model: db.User,
        attributes: ["fullName", "avatar"],
        as: "User",
      },
      {
        model: db.Likes,
        attributes: ["userId"],
        as: "Likes",
      },
    ],
  });
  if (!blog) {
    throw new CustomError(StatusCodes.NOT_FOUND, "no blog found!");
  }

  // const userId = req?.user?.id;

  const blogViews = await db.Views.findAll({
    where: { blogId: blogid },
  });

  let userid;

  if (req.user) {
    userid = req.user.id;
  } else if (req.headers.authorization) {
    const token = req.headers.authorization;
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await db.User.findOne({
      where: { id: userId },
      include: {
        model: db.invalidated_tokens,
        where: { token: token },
        required: false,
      },
    });

    if (!user || user.invalidated_tokens.length) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "jwt expired");
    }

    userid = user.id;
  }

  if (userid) {
    const userView = blogViews?.filter((view) => view.userId === userid);
    if (!userView.length) {
      const newView = await db.Views.create({
        userId: userid,
        blogId: blogid,
      });
      blogViews.push(newView);
    }
  }

  blog.dataValues.views = blogViews.length || 0;

  blog.dataValues.likes = blog.dataValues.Likes?.map((like) => like.userId);
  delete blog.dataValues.Likes;

  // blog.views++;
  // await blog.save();

  delete blog.dataValues.isDeleted;
  delete blog.dataValues.updatedAt;
  delete blog.dataValues.userId;

  return blog;
};

/**
 * This service will fetch all blogs with limits
 */
const fetchAllBlogs = async (req) => {
  const {
    page = 1,
    limit = 12,
    sort = "id",
    order = "DESC",
    status = "Published",
  } = req.query;
  const offset = (page - 1) * limit;

  let statusReq = status.split(",");

  const allBlogs = await db.Blog.findAll({
    where: { isDeleted: false, status: { [Op.in]: statusReq } },
    order: [[sort, order]],
    include: [
      {
        model: db.User,
        attributes: ["fullName", "avatar"],
        as: "User",
      },
      {
        model: db.Views,
        attributes: ["id"],
        as: "Views",
      },
      {
        model: db.Likes,
        attributes: ["userId"],
        as: "Likes",
      },
    ],
    limit: Number(limit),
    offset: Number(offset),
  });

  allBlogs.forEach((blog) => {
    blog.dataValues.views = blog.dataValues.Views?.length;
    delete blog.dataValues.Views;

    blog.dataValues.likes = blog.dataValues.Likes?.map((like) => like.userId);
    delete blog.dataValues.Likes;
  });

  return allBlogs;
};

/**
 * This service count total number of blogs
 */
const totalBlogCount = async (req) => {
  let { status = "Published" } = req.query;

  const statusReq = status.split(",");

  const blogCount = await db.Blog.count({
    where: { isDeleted: false, status: { [Op.in]: statusReq } },
  });

  return blogCount;
};

/**
 * This service will update blog
 */
const updateBlog = async (req) => {
  const { blogid } = req.params;
  const { title, description, status } = req.body;

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

  if (status) {
    blog.status = status;
  }

  if (req.thumbnail) {
    blog.thumbnail = req.thumbnail;
  }

  await blog.save();

  return blog;
};

/**
 * This service will delete the blog
 */
const destroyBlog = async (req) => {
  try {
    const { blogid } = req.params;

    const blog = await db.Blog.findOne({
      where: { id: blogid, isDeleted: false },
    });
    if (!blog) {
      throw new CustomError(StatusCodes.NOT_FOUND, "No blog found!");
    }

    blog.isDeleted = true;
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
 * This service is to add like to blog
 */
const toggleBlogLike = async (blogId, userId, req) => {
  const checkBlog = await db.Blog.findByPk(blogId);
  if (!checkBlog) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      `No blog found with id ${blogId}`
    );
  }

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

    return fetchSingleBlog(req);
  }

  const likeBlog = await db.Likes.create({ blogId: blogId, userId: userId });

  if (!likeBlog) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Error adding like to the blog"
    );
  }

  return fetchSingleBlog(req);
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
    where: { blogId: blogId, isDeleted: false },
    include: {
      model: db.User,
      attributes: ["fullName", "avatar"],
      as: "User",
    },
    attributes: ["id", "content", "createdAt"],
    order: [["id", "DESC"]],
  });

  if (!allComments) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "No comments found for the blog"
    );
  }

  return allComments;
};

const deleteComment = async (commentId, req) => {
  const findComment = await db.Comments.findOne({
    where: { id: commentId, isDeleted: false },
  });

  if (!findComment) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      `No Comment found with id ${commentId}`
    );
  }

  const userId = req.user.id;

  if (userId !== findComment.userId) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      "Commented user can delete only"
    );
  }

  findComment.isDeleted = true;

  await findComment.save();

  return findComment;
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
  deleteComment,
};
