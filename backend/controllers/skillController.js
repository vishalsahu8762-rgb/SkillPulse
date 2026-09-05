const {
  analyzeSkillGap,
  getJobRoles,
  getAllSkills,
  getRequiredSkills
} = require('../services/skillMatchingService');

const {
  generateLearningPath,
  getSkillModules
} = require('../services/recommendationService');

/**
 * Analyze skill gap for a given role and current skills
 */
const analyzeSkills = (req, res) => {
  try {
    const { role, currentSkills } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Job role is required'
      });
    }

    if (!currentSkills || !Array.isArray(currentSkills)) {
      return res.status(400).json({
        success: false,
        message: 'Current skills must be an array'
      });
    }

    const analysis = analyzeSkillGap(role, currentSkills);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error analyzing skills',
      error: error.message
    });
  }
};

/**
 * Get learning recommendations for a role
 */
const getRecommendations = (req, res) => {
  try {
    const { role, missingSkills, currentReadiness } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Job role is required'
      });
    }

    if (!missingSkills || !Array.isArray(missingSkills)) {
      return res.status(400).json({
        success: false,
        message: 'Missing skills must be an array'
      });
    }

    const recommendations = generateLearningPath(role, missingSkills, currentReadiness || 0);

    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error: error.message
    });
  }
};

/**
 * Get all available job roles
 */
const getRoles = (req, res) => {
  try {
    const roles = getJobRoles();

    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job roles',
      error: error.message
    });
  }
};

/**
 * Get all available skills
 */
const getSkills = (req, res) => {
  try {
    const skills = getAllSkills();

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
};

/**
 * Get required skills for a specific role
 */
const getRoleSkills = (req, res) => {
  try {
    const { role } = req.params;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Job role is required'
      });
    }

    const skills = getRequiredSkills(role);

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching role skills',
      error: error.message
    });
  }
};

/**
 * Get learning modules for a specific skill
 */
const getSkillLearningModules = (req, res) => {
  try {
    const { skill } = req.params;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: 'Skill is required'
      });
    }

    const modules = getSkillModules(skill);

    res.json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill modules',
      error: error.message
    });
  }
};

module.exports = {
  analyzeSkills,
  getRecommendations,
  getRoles,
  getSkills,
  getRoleSkills,
  getSkillLearningModules
};
