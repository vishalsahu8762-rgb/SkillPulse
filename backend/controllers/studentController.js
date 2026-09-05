const {
  getStudentWorkspaceService,
  updateStudentSkillService,
  removeStudentSkillService,
  getAssessmentQuestionsService,
  submitAssessmentService,
  sampleJobPostings,
  sampleCareers
} = require('../services/studentService');
const { getUserByTokenService } = require('../services/authService');

const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return req.headers['x-auth-token'] || req.query.token;
};

/**
 * GET /api/student/workspace
 */
const getStudentWorkspace = async (req, res) => {
  try {
    const token = extractToken(req);
    const workspaceData = await getStudentWorkspaceService(token);
    res.json({
      success: true,
      data: workspaceData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load student workspace',
      error: error.message
    });
  }
};

/**
 * POST /api/student/skills
 */
const updateStudentSkill = async (req, res) => {
  try {
    const token = extractToken(req);
    const { skill, level } = req.body;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: 'Skill name is required'
      });
    }

    const updatedUser = await updateStudentSkillService(token, skill, level || 'Intermediate');
    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update skill',
      error: error.message
    });
  }
};

/**
 * DELETE /api/student/skills/:skillName
 */
const removeStudentSkill = async (req, res) => {
  try {
    const token = extractToken(req);
    const { skillName } = req.params;

    const updatedUser = await removeStudentSkillService(token, skillName);
    res.json({
      success: true,
      message: 'Skill removed successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove skill',
      error: error.message
    });
  }
};

/**
 * GET /api/student/assessment/questions/:skill
 */
const getAssessmentQuestions = (req, res) => {
  try {
    const { skill } = req.params;
    const questions = getAssessmentQuestionsService(skill);
    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load assessment questions',
      error: error.message
    });
  }
};

/**
 * POST /api/student/assessment/submit
 */
const submitAssessment = async (req, res) => {
  try {
    const token = extractToken(req);
    const { skill, answers } = req.body;

    if (!skill || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Skill and answers are required'
      });
    }

    const result = await submitAssessmentService(token, skill, answers);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit assessment',
      error: error.message
    });
  }
};

/**
 * GET /api/student/job-matches
 */
const getJobMatches = async (req, res) => {
  try {
    const token = extractToken(req);
    const workspace = await getStudentWorkspaceService(token);
    res.json({
      success: true,
      count: workspace.jobMatches.length,
      data: workspace.jobMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load job matches',
      error: error.message
    });
  }
};

/**
 * GET /api/student/careers
 */
const getCareers = async (req, res) => {
  try {
    const token = extractToken(req);
    const workspace = await getStudentWorkspaceService(token);
    res.json({
      success: true,
      count: workspace.careers.length,
      data: workspace.careers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load careers exploration',
      error: error.message
    });
  }
};

module.exports = {
  getStudentWorkspace,
  updateStudentSkill,
  removeStudentSkill,
  getAssessmentQuestions,
  submitAssessment,
  getJobMatches,
  getCareers
};
