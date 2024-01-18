const { notFound } = require("../helpers/errorHandlers");
const db = require("../models");

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return notFound(res, "Blog title required!");
    }
    if (!description) {
      return notFound(res, "Blog description required!");
    }

    const newBlog = await db.Blog.create(req.body);

    return res.json(newBlog);
  } catch (error) {
    console.log(error);
  }
};

const fetchSingleBlog = async (req, res) => {
  try {
    const { blogid } = req.params;

    const blog = await db.Blog.findOne({ where: { id: blogid } });
    if (!blog) {
      return notFound(res, "no blog found!");
    }

    return res.json(blog);
  } catch (error) {
    console.log(error);
  }
};

const fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await db.Blog.findAll();

    return res.json(blogs);
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { blogid } = req.params;
    const { title, description } = req.body;

    const blog = await db.Blog.findOne({ where: { id: blogid } });
    if (!blog) {
      return notFound(res, "no blog found!");
    }

    if (title) {
      blog.title = title;
    }

    if (description) {
      blog.description = description;
    }

    const updatedBlog = await db.User.update(
      { ...blog },
      { where: { id: blogid } }
    );
    console.log(updatedBlog);

    return res.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
};

const destroyBlog = async (req, res) => {
  try {
    const { blogid } = req.params;

    const blog = await db.Blog.destroy({ where: { id: blogid } });
    if (!blog) {
      return notFound(res, "no blog found!");
    }

    return res.json(blog);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBlog,
  fetchSingleBlog,
  fetchAllBlogs,
  updateBlog,
  destroyBlog,
};
