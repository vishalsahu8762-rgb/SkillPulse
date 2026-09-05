const express = require('express');
const router = express.Router();
const {
  analyzeSkills,
  getRecommendations,
  getRoles,
  getSkills,
  getRoleSkills,
  getSkillLearningModules
} = require('../controllers/skillController');

// Analyze skill gap
router.post('/analyze', analyzeSkills);

// Get learning recommendations
router.post('/recommendations', getRecommendations);

// Get all available job roles
router.get('/roles', getRoles);

// Get all available skills
router.get('/skills', getSkills);

// Get required skills for a specific role
router.get('/roles/:role/skills', getRoleSkills);

// Get learning modules for a specific skill
router.get('/skills/:skill/modules', getSkillLearningModules);

module.exports = router;
