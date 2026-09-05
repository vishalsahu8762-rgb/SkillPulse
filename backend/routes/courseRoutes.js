const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  analyzeCoursePayload
} = require('../controllers/courseController');

router.get('/', getCourses);
router.post('/', createCourse);
router.post('/analyze', analyzeCoursePayload);
router.get('/:id', getCourseById);

module.exports = router;
