const {
  getOverallStats,
  getTopDemandedSkills,
  getJobRoleDemand,
  getLocationDemand,
  getIndustryDemand,
  getTrendingSkills,
  getFilterOptions
} = require('../services/demandAnalysisService');

/**
 * Get overall dashboard statistics
 */
const getStats = (req, res) => {
  try {
    const filters = {
      district: req.query.district,
      industry: req.query.industry,
      jobRole: req.query.jobRole,
      skill: req.query.skill
    };

    const stats = getOverallStats(filters);
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

/**
 * Get top demanded skills
 */
const getSkills = (req, res) => {
  try {
    const filters = {
      district: req.query.district,
      industry: req.query.industry,
      jobRole: req.query.jobRole
    };

    const limit = parseInt(req.query.limit) || 10;
    const skills = getTopDemandedSkills(filters, limit);

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
 * Get job role demand
 */
const getRoles = (req, res) => {
  try {
    const filters = {
      district: req.query.district,
      industry: req.query.industry
    };

    const roles = getJobRoleDemand(filters);

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
 * Get location-wise demand
 */
const getLocations = (req, res) => {
  try {
    const filters = {
      industry: req.query.industry,
      jobRole: req.query.jobRole
    };

    const locations = getLocationDemand(filters);

    res.json({
      success: true,
      data: locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching locations',
      error: error.message
    });
  }
};

/**
 * Get industry demand
 */
const getIndustries = (req, res) => {
  try {
    const filters = {
      district: req.query.district,
      jobRole: req.query.jobRole
    };

    const industries = getIndustryDemand(filters);

    res.json({
      success: true,
      data: industries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching industries',
      error: error.message
    });
  }
};

/**
 * Get trending skills
 */
const getTrending = (req, res) => {
  try {
    const filters = {
      district: req.query.district,
      industry: req.query.industry
    };

    const limit = parseInt(req.query.limit) || 10;
    const trending = getTrendingSkills(filters, limit);

    res.json({
      success: true,
      data: trending
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending skills',
      error: error.message
    });
  }
};

/**
 * Get filter options
 */
const getFilters = (req, res) => {
  try {
    const options = getFilterOptions();

    res.json({
      success: true,
      data: options
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};

module.exports = {
  getStats,
  getSkills,
  getRoles,
  getLocations,
  getIndustries,
  getTrending,
  getFilters
};
