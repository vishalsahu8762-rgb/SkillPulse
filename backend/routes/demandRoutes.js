const express = require('express');
const router = express.Router();
const {
  getStats,
  getSkills,
  getRoles,
  getLocations,
  getIndustries,
  getTrending,
  getFilters
} = require('../controllers/demandController');

// Get overall statistics
router.get('/stats', getStats);

// Get top demanded skills
router.get('/skills', getSkills);

// Get job role demand
router.get('/roles', getRoles);

// Get location-wise demand
router.get('/locations', getLocations);

// Get industry demand
router.get('/industries', getIndustries);

// Get trending skills
router.get('/trending', getTrending);

// Get filter options
router.get('/filters', getFilters);

module.exports = router;
