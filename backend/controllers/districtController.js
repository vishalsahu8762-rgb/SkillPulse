const {
  getDistrictsListService,
  getDistrictAnalysisService
} = require('../services/districtService');

/**
 * GET /api/districts
 * Get list of all available districts & overall comparison data
 */
const getDistricts = (req, res) => {
  try {
    const districts = getDistrictsListService();
    res.json({
      success: true,
      count: districts.length,
      data: districts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch districts list',
      error: error.message
    });
  }
};

/**
 * GET /api/districts/:district
 * Get complete district analysis
 */
const getDistrictAnalysis = (req, res) => {
  try {
    const { district } = req.params;
    const { industry } = req.query;

    const analysis = getDistrictAnalysisService(district, { industry });
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch district analysis',
      error: error.message
    });
  }
};

/**
 * GET /api/districts/:district/skills
 */
const getDistrictSkills = (req, res) => {
  try {
    const { district } = req.params;
    const { industry } = req.query;

    const analysis = getDistrictAnalysisService(district, { industry });
    res.json({
      success: true,
      district: analysis.district,
      data: analysis.skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch district skills',
      error: error.message
    });
  }
};

/**
 * GET /api/districts/:district/industries
 */
const getDistrictIndustries = (req, res) => {
  try {
    const { district } = req.params;
    const analysis = getDistrictAnalysisService(district);
    res.json({
      success: true,
      district: analysis.district,
      data: analysis.industries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch district industries',
      error: error.message
    });
  }
};

/**
 * GET /api/districts/:district/recommendations
 */
const getDistrictRecommendations = (req, res) => {
  try {
    const { district } = req.params;
    const analysis = getDistrictAnalysisService(district);
    res.json({
      success: true,
      district: analysis.district,
      data: analysis.courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch district recommendations',
      error: error.message
    });
  }
};

module.exports = {
  getDistricts,
  getDistrictAnalysis,
  getDistrictSkills,
  getDistrictIndustries,
  getDistrictRecommendations
};
