const express = require('express');
const router = express.Router();
const {
  getDistricts,
  getDistrictAnalysis,
  getDistrictSkills,
  getDistrictIndustries,
  getDistrictRecommendations
} = require('../controllers/districtController');

router.get('/', getDistricts);
router.get('/:district', getDistrictAnalysis);
router.get('/:district/skills', getDistrictSkills);
router.get('/:district/industries', getDistrictIndustries);
router.get('/:district/recommendations', getDistrictRecommendations);

module.exports = router;
