const express = require('express');
const router = express.Router();
const {
  getCurriculumAnalysisByCourse,
  acceptRecommendation,
  rejectRecommendation
} = require('../controllers/curriculumController');

router.get('/analyze/:courseId', getCurriculumAnalysisByCourse);
router.post('/accept/:courseId', acceptRecommendation);
router.post('/reject/:courseId', rejectRecommendation);

module.exports = router;
