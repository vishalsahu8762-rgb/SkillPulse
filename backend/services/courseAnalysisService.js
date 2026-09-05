const Course = require('../models/Course');

// In-memory sample courses store (used as seed or fallback if DB is not populated)
let sampleCourses = [
  {
    _id: '1',
    id: '1',
    name: 'Full Stack Development',
    category: 'IT & Software',
    marketDemandLevel: 'HIGH',
    marketDemandCount: 1200,
    trainingSupplyLevel: 'MEDIUM',
    trainingSupplyCount: 650,
    enrolled: 2500,
    completionRate: 78,
    curriculum: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    industryRequirements: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    status: 'NEEDS CURRICULUM UPDATE',
    recommendation: 'Update course curriculum to replace legacy modules with modern frameworks like React and Node.js.'
  },
  {
    _id: '2',
    id: '2',
    name: 'Basic Data Entry',
    category: 'Office Productivity',
    marketDemandLevel: 'LOW',
    marketDemandCount: 150,
    trainingSupplyLevel: 'HIGH',
    trainingSupplyCount: 3500,
    enrolled: 3500,
    completionRate: 92,
    curriculum: ['Typing Speed', 'MS Word', 'Basic Excel', 'Data Entry Forms'],
    industryRequirements: ['Advanced Excel', 'SQL', 'Power BI', 'Python Basics'],
    status: 'OVERSUPPLIED',
    recommendation: 'Reduce seats or redesign curriculum to prevent job market saturation.'
  },
  {
    _id: '3',
    id: '3',
    name: 'AI & Data Analytics',
    category: 'Data Science',
    marketDemandLevel: 'HIGH',
    marketDemandCount: 1800,
    trainingSupplyLevel: 'LOW',
    trainingSupplyCount: 400,
    enrolled: 850,
    completionRate: 65,
    curriculum: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Power BI'],
    industryRequirements: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Deep Learning', 'AWS'],
    status: 'HIGH PRIORITY',
    recommendation: 'Increase training capacity and expand batch sizes to fulfill high industry demand.'
  },
  {
    _id: '4',
    id: '4',
    name: 'Legacy Desktop Publishing',
    category: 'Media & Design',
    marketDemandLevel: 'LOW',
    marketDemandCount: 40,
    trainingSupplyLevel: 'HIGH',
    trainingSupplyCount: 1200,
    enrolled: 1200,
    completionRate: 85,
    curriculum: ['PageMaker', 'CorelDRAW 10', 'MS Publisher'],
    industryRequirements: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX Design'],
    status: 'OBSOLETE',
    recommendation: 'Phase out course or perform complete curriculum overhaul to modern UI/UX design.'
  },
  {
    _id: '5',
    id: '5',
    name: 'Cloud Computing (AWS & DevOps)',
    category: 'IT & Software',
    marketDemandLevel: 'HIGH',
    marketDemandCount: 1100,
    trainingSupplyLevel: 'MEDIUM',
    trainingSupplyCount: 700,
    enrolled: 1200,
    completionRate: 72,
    curriculum: ['Linux', 'AWS Core', 'Docker', 'Kubernetes', 'CI/CD'],
    industryRequirements: ['Linux', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    status: 'HEALTHY',
    recommendation: 'Maintain current training capacity and conduct periodic industry skill reviews.'
  },
  {
    _id: '6',
    id: '6',
    name: 'Cybersecurity Fundamentals',
    category: 'Security',
    marketDemandLevel: 'HIGH',
    marketDemandCount: 950,
    trainingSupplyLevel: 'LOW',
    trainingSupplyCount: 300,
    enrolled: 900,
    completionRate: 70,
    curriculum: ['Network Fundamentals', 'Ethical Hacking', 'Security Audit'],
    industryRequirements: ['Network Security', 'Python', 'Ethical Hacking', 'Cloud Security', 'SIEM Tools'],
    status: 'HIGH PRIORITY',
    recommendation: 'Increase training capacity and introduce cloud security modules.'
  }
];

/**
 * Transparent rule-based status calculation logic
 */
const calculateCourseAnalysis = (course) => {
  const demandCount = course.marketDemandCount || 500;
  const supplyCount = course.trainingSupplyCount || 500;
  const ratio = parseFloat((demandCount / (supplyCount || 1)).toFixed(2));

  const curr = course.curriculum || [];
  const reqs = course.industryRequirements || [];

  // Match rate calculation
  const matchedCount = curr.filter(skill => 
    reqs.some(req => req.toLowerCase() === skill.toLowerCase())
  ).length;

  const matchRate = reqs.length > 0 ? (matchedCount / reqs.length) * 100 : 100;

  let status = 'HEALTHY';
  let recommendation = 'Maintain current capacity and perform periodic reviews.';

  const demandLevel = course.marketDemandLevel?.toUpperCase() || (demandCount > 800 ? 'HIGH' : demandCount < 300 ? 'LOW' : 'MEDIUM');
  const supplyLevel = course.trainingSupplyLevel?.toUpperCase() || (supplyCount > 1500 ? 'HIGH' : supplyCount < 500 ? 'LOW' : 'MEDIUM');

  if (demandLevel === 'LOW' && supplyLevel === 'HIGH') {
    if (demandCount < 100 || matchRate < 30) {
      status = 'OBSOLETE';
      recommendation = 'Phasing out course or complete curriculum overhaul recommended due to low market relevance.';
    } else {
      status = 'OVERSUPPLIED';
      recommendation = 'Reduce seats or redesign curriculum to prevent job market saturation.';
    }
  } else if (demandLevel === 'HIGH' && (supplyLevel === 'LOW' || ratio > 1.4)) {
    if (matchRate < 60) {
      status = 'NEEDS CURRICULUM UPDATE';
      recommendation = 'High demand detected, but curriculum needs modern framework updates to align with industry expectations.';
    } else {
      status = 'HIGH PRIORITY';
      recommendation = 'Increase training capacity and scale up student intake to meet high industry demand.';
    }
  } else if (matchRate < 50) {
    status = 'NEEDS CURRICULUM UPDATE';
    recommendation = 'Update course curriculum to include key industry-required skills.';
  } else {
    status = 'HEALTHY';
    recommendation = 'Maintain current capacity and perform periodic reviews.';
  }

  return {
    ...course,
    demandSupplyRatio: ratio,
    curriculumMatchRate: Math.round(matchRate),
    status,
    recommendation
  };
};

/**
 * Get all analyzed courses
 */
const getAllCoursesService = async () => {
  try {
    const dbCourses = await Course.find().lean();
    if (dbCourses && dbCourses.length > 0) {
      return dbCourses.map(course => {
        const analyzed = calculateCourseAnalysis(course);
        return { ...course, ...analyzed };
      });
    }
  } catch (error) {
    console.warn('MongoDB query failed in getAllCoursesService, using sample data:', error.message);
  }

  return sampleCourses.map(calculateCourseAnalysis);
};

/**
 * Get single analyzed course by ID
 */
const getCourseByIdService = async (id) => {
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const dbCourse = await Course.findById(id).lean();
      if (dbCourse) {
        return calculateCourseAnalysis(dbCourse);
      }
    }
  } catch (error) {
    console.warn('MongoDB query error for ID in getCourseByIdService:', error.message);
  }

  const course = sampleCourses.find(c => String(c._id) === String(id) || String(c.id) === String(id));
  if (!course) return null;
  return calculateCourseAnalysis(course);
};

/**
 * Create a new course
 */
const createCourseService = async (courseData) => {
  const analyzed = calculateCourseAnalysis(courseData);
  
  try {
    const newCourse = new Course({
      name: courseData.name,
      category: courseData.category || 'IT & Software',
      marketDemandLevel: courseData.marketDemandLevel || 'MEDIUM',
      marketDemandCount: courseData.marketDemandCount || 500,
      trainingSupplyLevel: courseData.trainingSupplyLevel || 'MEDIUM',
      trainingSupplyCount: courseData.trainingSupplyCount || 500,
      enrolled: courseData.enrolled || 100,
      completionRate: courseData.completionRate || 80,
      curriculum: courseData.curriculum || [],
      industryRequirements: courseData.industryRequirements || [],
      status: analyzed.status,
      recommendation: analyzed.recommendation
    });

    const saved = await newCourse.save();
    return calculateCourseAnalysis(saved.toObject());
  } catch (error) {
    console.warn('MongoDB save failed, saving to sample in-memory array:', error.message);
    const newId = String(Date.now());
    const newSample = {
      _id: newId,
      id: newId,
      ...courseData,
      status: analyzed.status,
      recommendation: analyzed.recommendation
    };
    sampleCourses.push(newSample);
    return calculateCourseAnalysis(newSample);
  }
};

/**
 * Update course curriculum (used when accepting curriculum recommendation)
 */
const updateCourseCurriculumService = async (id, updatedCurriculum) => {
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const dbCourse = await Course.findById(id);
      if (dbCourse) {
        dbCourse.curriculum = updatedCurriculum;
        const analyzed = calculateCourseAnalysis(dbCourse.toObject());
        dbCourse.status = analyzed.status;
        dbCourse.recommendation = analyzed.recommendation;
        await dbCourse.save();
        return calculateCourseAnalysis(dbCourse.toObject());
      }
    }
  } catch (error) {
    console.warn('MongoDB update failed for ID, updating in-memory array:', error.message);
  }

  const courseIndex = sampleCourses.findIndex(c => String(c._id) === String(id) || String(c.id) === String(id));
  if (courseIndex !== -1) {
    sampleCourses[courseIndex].curriculum = updatedCurriculum;
    const analyzed = calculateCourseAnalysis(sampleCourses[courseIndex]);
    sampleCourses[courseIndex].status = analyzed.status;
    sampleCourses[courseIndex].recommendation = analyzed.recommendation;
    return sampleCourses[courseIndex];
  }

  return null;
};

module.exports = {
  calculateCourseAnalysis,
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseCurriculumService,
  sampleCourses
};
