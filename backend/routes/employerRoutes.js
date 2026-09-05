const express = require('express');
const router = express.Router();
const {
  getEmployers,
  getEmployerById,
  getSkillValidation,
  getCourseValidation,
  submitEmployerValidation
} = require('../controllers/employerController');

// Employer List routes
router.get('/employers', getEmployers);
router.get('/employers/:id', getEmployerById);

// Employer Validation & Feedback routes
router.get('/employer-validation/skills', getSkillValidation);
router.get('/employer-validation/courses', getCourseValidation);
router.post('/employer-validation', submitEmployerValidation);

module.exports = router;
