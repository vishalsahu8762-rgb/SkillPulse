const {
  getCurriculumAnalysis,
  acceptCurriculumRecommendationService
} = require('../services/curriculumAnalysisService');

/**
 * GET /api/curriculum/analyze/:courseId
 */
const getCurriculumAnalysisByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const analysis = await getCurriculumAnalysis(courseId);
    
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Course not found for curriculum analysis'
      });
    }

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to analyze curriculum',
      error: error.message
    });
  }
};

/**
 * POST /api/curriculum/accept/:courseId
 */
const acceptRecommendation = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await acceptCurriculumRecommendationService(courseId);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to accept recommendation',
      error: error.message
    });
  }
};

/**
 * POST /api/curriculum/reject/:courseId
 */
const rejectRecommendation = async (req, res) => {
  try {
    const { courseId } = req.params;
    res.json({
      success: true,
      message: 'Curriculum recommendation rejected. No changes were applied.',
      data: { courseId, status: 'REJECTED' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reject recommendation',
      error: error.message
    });
  }
};

module.exports = {
  getCurriculumAnalysisByCourse,
  acceptRecommendation,
  rejectRecommendation
};
