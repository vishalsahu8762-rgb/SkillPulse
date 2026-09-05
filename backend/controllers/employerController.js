const {
  getEmployerSummaryService,
  getEmployersListService,
  getEmployerByIdService,
  getSkillValidationByRoleService,
  getCourseValidationListService,
  getAggregatedSkillScoresService,
  submitEmployerFeedbackService
} = require('../services/employerService');

/**
 * GET /api/employers
 */
const getEmployers = (req, res) => {
  try {
    const employers = getEmployersListService();
    const summary = getEmployerSummaryService();
    res.json({
      success: true,
      summary,
      count: employers.length,
      data: employers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employers',
      error: error.message
    });
  }
};

/**
 * GET /api/employers/:id
 */
const getEmployerById = (req, res) => {
  try {
    const employer = getEmployerByIdService(req.params.id);
    if (!employer) {
      return res.status(404).json({
        success: false,
        message: 'Employer not found'
      });
    }

    res.json({
      success: true,
      data: employer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employer',
      error: error.message
    });
  }
};

/**
 * GET /api/employer-validation/skills
 */
const getSkillValidation = (req, res) => {
  try {
    const { role } = req.query;
    const skillData = getSkillValidationByRoleService(role);
    const chartData = getAggregatedSkillScoresService();

    res.json({
      success: true,
      data: {
        ...skillData,
        chartData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skill validation data',
      error: error.message
    });
  }
};

/**
 * GET /api/employer-validation/courses
 */
const getCourseValidation = (req, res) => {
  try {
    const courses = getCourseValidationListService();
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course validation data',
      error: error.message
    });
  }
};

/**
 * POST /api/employer-validation
 */
const submitEmployerValidation = (req, res) => {
  try {
    const feedbackData = req.body;
    const result = submitEmployerFeedbackService(feedbackData);

    res.status(201).json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit employer validation',
      error: error.message
    });
  }
};

module.exports = {
  getEmployers,
  getEmployerById,
  getSkillValidation,
  getCourseValidation,
  submitEmployerValidation
};
