const {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  calculateCourseAnalysis
} = require('../services/courseAnalysisService');

/**
 * GET /api/courses
 */
const getCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
};

/**
 * GET /api/courses/:id
 */
const getCourseById = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course details',
      error: error.message
    });
  }
};

/**
 * POST /api/courses
 * Create a new course
 */
const createCourse = async (req, res) => {
  try {
    const { name, category, marketDemandLevel, marketDemandCount, trainingSupplyLevel, trainingSupplyCount, curriculum, industryRequirements } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Course name is required'
      });
    }

    const created = await createCourseService({
      name,
      category,
      marketDemandLevel,
      marketDemandCount,
      trainingSupplyLevel,
      trainingSupplyCount,
      curriculum: curriculum || [],
      industryRequirements: industryRequirements || []
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: created
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

/**
 * POST /api/courses/analyze
 * Analyze course payload or calculate status on the fly
 */
const analyzeCoursePayload = async (req, res) => {
  try {
    const courseData = req.body;
    const analyzed = calculateCourseAnalysis(courseData);
    res.json({
      success: true,
      data: analyzed
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to analyze course payload',
      error: error.message
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  analyzeCoursePayload
};
