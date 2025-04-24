const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', protect, authorize('admin'), categoryController.createCategory);

module.exports = router; 