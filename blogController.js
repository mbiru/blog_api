const ErrorResponse = require('../utils/errorResponse');
const Blog = require('../models/blog');
const User = require('../models/user');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name')
      .populate('category', 'name');
      
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name');

    if (!blog) {
      return next(
        new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Author
exports.createBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    // Add author to req.body
    req.body.author = req.user.id;

    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(
        new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
      );
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(
        new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
      );
    }

    await blog.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get blogs by category
// @route   GET /api/blogs/category/:categoryId
// @access  Public
exports.getBlogsByCategory = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ category: req.params.categoryId })
      .populate('author', 'name')
      .populate('category', 'name');

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    next(err);
  }
};