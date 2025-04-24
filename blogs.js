const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const blogController = require('../controllers/blogController');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.post('/', protect, blogController.createBlog);
router.put('/:id', protect, blogController.updateBlog);
router.delete('/:id', protect, blogController.deleteBlog);

module.exports = router;