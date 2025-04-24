const ErrorResponse = require('../utils/errorResponse');
const Blog = require('../models/blog');

exports.checkBlogOwnership = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
    }

    // Check if user is admin or the original author
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to update this blog`, 401)
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};