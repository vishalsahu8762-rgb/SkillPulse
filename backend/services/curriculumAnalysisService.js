const { getCourseByIdService, updateCourseCurriculumService } = require('./courseAnalysisService');

/**
 * Compare course curriculum against industry requirements
 */
const analyzeCurriculumLogic = (course) => {
  const currentCurriculum = course.curriculum || [];
  const industryRequirements = course.industryRequirements || [];

  const currentLower = currentCurriculum.map(s => s.toLowerCase());
  const industryLower = industryRequirements.map(s => s.toLowerCase());

  // Matched skills (present in both)
  const matched = currentCurriculum.filter(skill =>
    industryLower.includes(skill.toLowerCase())
  );

  // Missing skills (in industry requirements but not in current curriculum)
  const missing = industryRequirements.filter(skill =>
    !currentLower.includes(skill.toLowerCase())
  );

  // Low relevance skills (in current curriculum but not in industry requirements)
  const lowRelevance = currentCurriculum.filter(skill =>
    !industryLower.includes(skill.toLowerCase())
  );

  // Recommended curriculum (all industry requirements)
  const recommendedCurriculum = [...new Set([...matched, ...missing])];

  return {
    courseId: course._id || course.id,
    courseName: course.name,
    category: course.category,
    currentCurriculum,
    industryRequirements,
    matched,
    missing,
    lowRelevance,
    recommendation: {
      title: 'Industry-Aligned Curriculum Recommendation',
      recommendedCurriculum,
      addSkills: missing,
      removeSkills: lowRelevance,
      description: missing.length > 0
        ? `Recommend adding ${missing.length} high-demand industry skill(s): ${missing.join(', ')}.`
        : 'Curriculum is fully aligned with industry requirements.'
    }
  };
};

/**
 * Analyze curriculum for a given course ID
 */
const getCurriculumAnalysis = async (courseId) => {
  const course = await getCourseByIdService(courseId);
  if (!course) return null;

  return analyzeCurriculumLogic(course);
};

/**
 * Accept curriculum recommendation and persist to DB / memory state
 */
const acceptCurriculumRecommendationService = async (courseId) => {
  const course = await getCourseByIdService(courseId);
  if (!course) return null;

  const analysis = analyzeCurriculumLogic(course);
  const newCurriculum = analysis.recommendation.recommendedCurriculum;

  // Persist updated curriculum to DB / state
  const updatedCourse = await updateCourseCurriculumService(courseId, newCurriculum);
  
  return {
    success: true,
    message: 'Curriculum recommendation accepted and successfully persisted to database!',
    course: updatedCourse,
    analysis: analyzeCurriculumLogic(updatedCourse)
  };
};

module.exports = {
  analyzeCurriculumLogic,
  getCurriculumAnalysis,
  acceptCurriculumRecommendationService
};
