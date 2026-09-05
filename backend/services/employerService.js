/**
 * EMPLOYER VALIDATION & INDUSTRY FEEDBACK SERVICE
 * Prototype Dataset & Validation Processing Engine
 */

let sampleEmployers = [
  {
    id: '1',
    name: 'Tech Solutions Pvt Ltd',
    industry: 'IT Services',
    district: 'Bhopal',
    hiringRoles: ['Full Stack Developer', 'Cloud Engineer'],
    responsesCount: 8,
    status: 'Validated',
    contactPerson: 'Rahul Sharma (HR Director)'
  },
  {
    id: '2',
    name: 'Bhopal IT Services',
    industry: 'IT Services',
    district: 'Bhopal',
    hiringRoles: ['Data Analyst', 'Python Developer'],
    responsesCount: 6,
    status: 'Validated',
    contactPerson: 'Priya Verma (Talent Acquisition)'
  },
  {
    id: '3',
    name: 'Central Auto Industries',
    industry: 'Manufacturing',
    district: 'Jabalpur',
    hiringRoles: ['PLC Automation Engineer', 'CAD Designer'],
    responsesCount: 5,
    status: 'Needs Update',
    contactPerson: 'Vikram Singh (Plant Head)'
  },
  {
    id: '4',
    name: 'MP Digital Services',
    industry: 'E-Commerce & Digital',
    district: 'Indore',
    hiringRoles: ['React Developer', 'Digital Marketer'],
    responsesCount: 7,
    status: 'Validated',
    contactPerson: 'Neha Gupta (CTO)'
  },
  {
    id: '5',
    name: 'Healthcare Analytics Pvt Ltd',
    industry: 'Healthcare & Pharma',
    district: 'Ujjain',
    hiringRoles: ['Data Analyst', 'Pharma QC Specialist'],
    responsesCount: 5,
    status: 'Validated',
    contactPerson: 'Dr. Amit Patel (VP Engineering)'
  }
];

let roleSkillValidationData = {
  'Full Stack Developer': [
    { skill: 'JavaScript', industryDemand: 95, validationScore: 92, status: 'VALIDATED' },
    { skill: 'React', industryDemand: 90, validationScore: 88, status: 'VALIDATED' },
    { skill: 'Node.js', industryDemand: 85, validationScore: 78, status: 'NEEDS UPDATE' },
    { skill: 'MongoDB', industryDemand: 80, validationScore: 82, status: 'VALIDATED' },
    { skill: 'Cloud Computing', industryDemand: 88, validationScore: 74, status: 'NEEDS UPDATE' },
    { skill: 'PHP Legacy', industryDemand: 30, validationScore: 42, status: 'LOW RELEVANCE' }
  ],
  'Data Analyst': [
    { skill: 'Python', industryDemand: 92, validationScore: 94, status: 'VALIDATED' },
    { skill: 'SQL', industryDemand: 88, validationScore: 90, status: 'VALIDATED' },
    { skill: 'Power BI', industryDemand: 82, validationScore: 86, status: 'VALIDATED' },
    { skill: 'Excel Advanced', industryDemand: 85, validationScore: 88, status: 'VALIDATED' },
    { skill: 'Machine Learning', industryDemand: 75, validationScore: 72, status: 'NEEDS UPDATE' }
  ],
  'Cloud Engineer': [
    { skill: 'AWS Core Services', industryDemand: 94, validationScore: 92, status: 'VALIDATED' },
    { skill: 'Docker & Containers', industryDemand: 88, validationScore: 85, status: 'VALIDATED' },
    { skill: 'Kubernetes', industryDemand: 82, validationScore: 76, status: 'NEEDS UPDATE' },
    { skill: 'Linux Administration', industryDemand: 90, validationScore: 88, status: 'VALIDATED' },
    { skill: 'Terraform IaC', industryDemand: 78, validationScore: 70, status: 'NEEDS UPDATE' }
  ],
  'PLC Automation Engineer': [
    { skill: 'PLC Programming', industryDemand: 90, validationScore: 88, status: 'VALIDATED' },
    { skill: 'SCADA Systems', industryDemand: 84, validationScore: 82, status: 'VALIDATED' },
    { skill: 'AutoCAD Electrical', industryDemand: 80, validationScore: 78, status: 'NEEDS UPDATE' },
    { skill: 'Industrial IoT', industryDemand: 75, validationScore: 72, status: 'NEEDS UPDATE' }
  ]
};

let courseValidationData = [
  {
    id: 'c1',
    courseName: 'Full Stack Development (MERN)',
    industry: 'IT Services',
    demand: 'HIGH',
    assessment: 'Relevant',
    validationScore: 85,
    comment: 'Course covers major technical skills required for entry-level developers. Adding Docker & AWS modules will make candidates 100% job-ready.',
    status: 'VALIDATED'
  },
  {
    id: 'c2',
    courseName: 'Python for Data Analytics',
    industry: 'Analytics & IT',
    demand: 'HIGH',
    assessment: 'Highly Relevant',
    validationScore: 92,
    comment: 'Excellent alignment with entry-level Data Analyst roles in Bhopal and Indore.',
    status: 'VALIDATED'
  },
  {
    id: 'c3',
    courseName: 'Cloud Computing Fundamentals (AWS)',
    industry: 'Cloud & IT Services',
    demand: 'HIGH',
    assessment: 'Needs Update',
    validationScore: 74,
    comment: 'Needs hands-on practical lab exercises on Kubernetes and CI/CD pipelines.',
    status: 'NEEDS UPDATE'
  },
  {
    id: 'c4',
    courseName: 'Industrial Automation & PLC',
    industry: 'Manufacturing',
    demand: 'HIGH',
    assessment: 'Highly Relevant',
    validationScore: 88,
    comment: 'Strong practical value for manufacturing plants in Jabalpur industrial belt.',
    status: 'VALIDATED'
  },
  {
    id: 'c5',
    courseName: 'Legacy Desktop Publishing',
    industry: 'Media & Printing',
    demand: 'LOW',
    assessment: 'Not Relevant',
    validationScore: 35,
    comment: 'Course teaches obsolete tools like PageMaker; recommend replacing with Figma & UI Design.',
    status: 'LOW RELEVANCE'
  }
];

let submittedFeedbacks = [
  {
    id: 'fb-1',
    employerName: 'Tech Solutions Pvt Ltd',
    industry: 'IT Services',
    district: 'Bhopal',
    jobRole: 'Full Stack Developer',
    skillPriority: 'Essential',
    courseRelevance: 'Highly Relevant',
    feedback: 'Candidates need more practical project experience in AWS cloud deployments.',
    date: '2026-08-28'
  },
  {
    id: 'fb-2',
    employerName: 'MP Digital Services',
    industry: 'E-Commerce',
    district: 'Indore',
    jobRole: 'React Developer',
    skillPriority: 'Essential',
    courseRelevance: 'Relevant',
    feedback: 'React state management (Redux/Zustand) is critical for our hiring requirements.',
    date: '2026-08-30'
  }
];

/**
 * Calculate validation status based on score
 */
const calculateValidationStatus = (score) => {
  if (score >= 80) return 'VALIDATED';
  if (score >= 50) return 'NEEDS UPDATE';
  return 'LOW RELEVANCE';
};

/**
 * Get overall summary statistics
 */
const getEmployerSummaryService = () => {
  const totalEmployers = sampleEmployers.length;
  let validatedSkillsCount = 0;
  let needsUpdateSkillsCount = 0;

  Object.values(roleSkillValidationData).forEach(skillsList => {
    skillsList.forEach(s => {
      if (s.status === 'VALIDATED') validatedSkillsCount++;
      if (s.status === 'NEEDS UPDATE') needsUpdateSkillsCount++;
    });
  });

  const totalResponses = sampleEmployers.reduce((sum, e) => sum + e.responsesCount, 0) + submittedFeedbacks.length;

  return {
    totalEmployers,
    validatedSkills: validatedSkillsCount,
    needsIndustryUpdate: needsUpdateSkillsCount,
    employerResponses: totalResponses
  };
};

/**
 * Get list of employers
 */
const getEmployersListService = () => {
  return sampleEmployers;
};

/**
 * Get single employer by ID
 */
const getEmployerByIdService = (id) => {
  return sampleEmployers.find(e => String(e.id) === String(id));
};

/**
 * Get skill validations for a job role
 */
const getSkillValidationByRoleService = (role) => {
  const key = Object.keys(roleSkillValidationData).find(r => r.toLowerCase() === (role || '').toLowerCase()) || 'Full Stack Developer';
  return {
    jobRole: key,
    availableRoles: Object.keys(roleSkillValidationData),
    skills: roleSkillValidationData[key]
  };
};

/**
 * Get course validations
 */
const getCourseValidationListService = () => {
  return courseValidationData;
};

/**
 * Get aggregated skill validation scores for summary chart
 */
const getAggregatedSkillScoresService = () => {
  return [
    { skill: 'Python', validationScore: 94, demandScore: 92 },
    { skill: 'SQL', validationScore: 90, demandScore: 88 },
    { skill: 'React', validationScore: 88, demandScore: 90 },
    { skill: 'JavaScript', validationScore: 92, demandScore: 95 },
    { skill: 'Cloud Computing', validationScore: 74, demandScore: 88 },
    { skill: 'Data Analysis', validationScore: 86, demandScore: 82 },
    { skill: 'PLC Automation', validationScore: 88, demandScore: 90 }
  ];
};

/**
 * Submit new employer feedback
 */
const submitEmployerFeedbackService = (feedbackData) => {
  const newFeedback = {
    id: `fb-${Date.now()}`,
    employerName: feedbackData.employerName || 'Anonymous Employer',
    industry: feedbackData.industry || 'IT Services',
    district: feedbackData.district || 'Bhopal',
    jobRole: feedbackData.jobRole || 'Full Stack Developer',
    skillPriority: feedbackData.skillPriority || 'Essential',
    courseRelevance: feedbackData.courseRelevance || 'Highly Relevant',
    feedback: feedbackData.feedback || 'Validation submitted.',
    date: new Date().toISOString().split('T')[0]
  };

  submittedFeedbacks.unshift(newFeedback);

  // Dynamically update scores/counts for selected role if matching
  const role = feedbackData.jobRole || 'Full Stack Developer';
  if (roleSkillValidationData[role]) {
    roleSkillValidationData[role] = roleSkillValidationData[role].map(s => {
      const boost = feedbackData.skillPriority === 'Essential' ? 2 : 1;
      const newScore = Math.min(100, s.validationScore + boost);
      return {
        ...s,
        validationScore: newScore,
        status: calculateValidationStatus(newScore)
      };
    });
  }

  // Update response count for employer if present
  const employerIndex = sampleEmployers.findIndex(e => e.name.toLowerCase() === newFeedback.employerName.toLowerCase());
  if (employerIndex !== -1) {
    sampleEmployers[employerIndex].responsesCount += 1;
    sampleEmployers[employerIndex].status = 'Validated';
  } else {
    // Add temporary employer to sample array
    sampleEmployers.push({
      id: String(Date.now()),
      name: newFeedback.employerName,
      industry: newFeedback.industry,
      district: newFeedback.district,
      hiringRoles: [newFeedback.jobRole],
      responsesCount: 1,
      status: 'Validated',
      contactPerson: 'Employer Representative'
    });
  }

  return {
    success: true,
    message: 'Employer validation submitted successfully.',
    feedback: newFeedback,
    updatedSummary: getEmployerSummaryService()
  };
};

module.exports = {
  getEmployerSummaryService,
  getEmployersListService,
  getEmployerByIdService,
  getSkillValidationByRoleService,
  getCourseValidationListService,
  getAggregatedSkillScoresService,
  submitEmployerFeedbackService,
  submittedFeedbacks
};
