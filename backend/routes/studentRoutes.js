const express = require('express');
const router = express.Router();
const {
  getStudentWorkspace,
  updateStudentSkill,
  removeStudentSkill,
  getAssessmentQuestions,
  submitAssessment,
  getJobMatches,
  getCareers
} = require('../controllers/studentController');

router.get('/workspace', getStudentWorkspace);
router.post('/skills', updateStudentSkill);
router.delete('/skills/:skillName', removeStudentSkill);
router.get('/assessment/questions/:skill', getAssessmentQuestions);
router.post('/assessment/submit', submitAssessment);
router.get('/job-matches', getJobMatches);
router.get('/careers', getCareers);

module.exports = router;
