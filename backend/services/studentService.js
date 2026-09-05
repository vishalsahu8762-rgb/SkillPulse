/**
 * STUDENT WORKSPACE & PERSONALIZED CAREER SERVICE
 */

const { getUserByTokenService, updateUserProfileService } = require('./authService');
const { sampleJobData } = require('../data/sampleDemandData');

// Quiz Question Bank for Skill Assessments
const questionBank = {
  Python: [
    {
      id: 1,
      question: 'Which keyword is used to define a function in Python?',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'What is the correct file extension for Python files?',
      options: ['.pyt', '.pt', '.py', '.pyw'],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'Which data structure in Python is immutable?',
      options: ['List', 'Dictionary', 'Set', 'Tuple'],
      correctAnswer: 3
    },
    {
      id: 4,
      question: 'How do you insert comments in Python code?',
      options: ['// Comment', '/* Comment */', '# Comment', '<!-- Comment -->'],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'Which built-in function returns the number of items in a list?',
      options: ['size()', 'length()', 'count()', 'len()'],
      correctAnswer: 3
    }
  ],
  JavaScript: [
    {
      id: 1,
      question: 'Which keyword declares a block-scoped variable in JavaScript?',
      options: ['var', 'let', 'static', 'string'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'What does DOM stand for in web development?',
      options: ['Document Object Model', 'Data Object Mode', 'Digital Optimization Method', 'Desktop Operating Mode'],
      correctAnswer: 0
    },
    {
      id: 3,
      question: 'Which method adds one or more elements to the end of an array?',
      options: ['push()', 'pop()', 'append()', 'shift()'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'What is the result of typeof NaN in JavaScript?',
      options: ['"undefined"', '"null"', '"number"', '"NaN"'],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'Which operator checks both value and type equality?',
      options: ['==', '=', '===', 'equals'],
      correctAnswer: 2
    }
  ],
  React: [
    {
      id: 1,
      question: 'What hook is used to manage state in a React functional component?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'What syntax is used to render XML-like elements inside JavaScript in React?',
      options: ['HTML5', 'JSX', 'Template Strings', 'V-DOM'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'How are read-only values passed from parent to child components?',
      options: ['State', 'Props', 'Context', 'Reducers'],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'Which hook performs side effects in functional components?',
      options: ['useMemo', 'useCallback', 'useEffect', 'useRef'],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'What attribute must be provided when rendering a list of items in React?',
      options: ['id', 'key', 'index', 'name'],
      correctAnswer: 1
    }
  ],
  SQL: [
    {
      id: 1,
      question: 'Which SQL clause is used to filter records in a SELECT query?',
      options: ['GROUP BY', 'HAVING', 'WHERE', 'ORDER BY'],
      correctAnswer: 2
    },
    {
      id: 2,
      question: 'Which command is used to fetch unique values from a table column?',
      options: ['SELECT DISTINCT', 'SELECT UNIQUE', 'SELECT DIFFERENT', 'SELECT FILTER'],
      correctAnswer: 0
    },
    {
      id: 3,
      question: 'Which SQL join returns all rows from the left table and matched rows from the right?',
      options: ['RIGHT JOIN', 'INNER JOIN', 'LEFT JOIN', 'FULL JOIN'],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'Which statement modifies existing data in a table?',
      options: ['ALTER', 'UPDATE', 'MODIFY', 'CHANGE'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'What function counts the total number of rows in a table?',
      options: ['SUM()', 'COUNT()', 'TOTAL()', 'NUMBER()'],
      correctAnswer: 1
    }
  ],
  'Cloud Computing': [
    {
      id: 1,
      question: 'What service model provides virtualized servers, storage, and networking over the internet?',
      options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
      correctAnswer: 2
    },
    {
      id: 2,
      question: 'Which AWS service provides resizable compute capacity in the cloud?',
      options: ['Amazon S3', 'Amazon EC2', 'Amazon RDS', 'AWS Lambda'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'What tool is used to containerize applications with all their dependencies?',
      options: ['Docker', 'Git', 'Webpack', 'Nginx'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'What is Amazon S3 primarily used for?',
      options: ['Relational Database', 'Object Storage', 'DNS Routing', 'Queue Messaging'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'What technology orchestrates automated deployment and scaling of containers?',
      options: ['Kubernetes', 'Babel', 'Jenkins', 'Vite'],
      correctAnswer: 0
    }
  ]
};

// Jobs dataset for Job Match feature
const sampleJobPostings = [
  {
    id: 'job-101',
    title: 'Junior Full Stack Developer',
    company: 'Tech Solutions Pvt Ltd',
    district: 'Bhopal',
    requiredSkills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL'],
    demandLevel: 'HIGH',
    salaryRange: '6-12 LPA'
  },
  {
    id: 'job-102',
    title: 'Frontend React Developer',
    company: 'MP Digital Services',
    district: 'Indore',
    requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'SQL'],
    demandLevel: 'HIGH',
    salaryRange: '7-14 LPA'
  },
  {
    id: 'job-103',
    title: 'Data & Analytics Associate',
    company: 'Bhopal IT Services',
    district: 'Bhopal',
    requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Excel'],
    demandLevel: 'HIGH',
    salaryRange: '5-10 LPA'
  },
  {
    id: 'job-104',
    title: 'Cloud & DevOps Associate',
    company: 'Central Auto Industries',
    district: 'Jabalpur',
    requiredSkills: ['Cloud Computing', 'Linux', 'AWS', 'Python', 'Docker'],
    demandLevel: 'HIGH',
    salaryRange: '8-16 LPA'
  },
  {
    id: 'job-105',
    title: 'Full Stack Web Engineer',
    company: 'E-Commerce Tech',
    district: 'Indore',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
    demandLevel: 'HIGH',
    salaryRange: '10-20 LPA'
  }
];

// Career exploration cards dataset
const sampleCareers = [
  {
    id: 'car-1',
    name: 'Full Stack Developer',
    demandLevel: 'HIGH',
    description: 'Build end-to-end web applications covering frontend UI, backend services, and database persistence.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL'],
    avgSalary: '8-22 LPA'
  },
  {
    id: 'car-2',
    name: 'Data Analyst',
    demandLevel: 'HIGH',
    description: 'Transform raw business data into actionable insights using statistics, SQL, and data visualization tools.',
    requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Power BI', 'Excel'],
    avgSalary: '6-15 LPA'
  },
  {
    id: 'car-3',
    name: 'AI/ML Engineer',
    demandLevel: 'HIGH',
    description: 'Develop intelligent predictive models, machine learning pipelines, and deep neural network algorithms.',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'AWS'],
    avgSalary: '12-30 LPA'
  },
  {
    id: 'car-4',
    name: 'Cloud Engineer',
    demandLevel: 'HIGH',
    description: 'Architect, deploy, and manage scalable cloud infrastructure and containerized microservices.',
    requiredSkills: ['Cloud Computing', 'AWS', 'Docker', 'Kubernetes', 'Python'],
    avgSalary: '10-25 LPA'
  },
  {
    id: 'car-5',
    name: 'Cybersecurity Analyst',
    demandLevel: 'HIGH',
    description: 'Protect enterprise networks, conduct vulnerability audits, and mitigate cyber threats.',
    requiredSkills: ['Cybersecurity', 'Network Security', 'Python', 'SQL', 'Linux'],
    avgSalary: '9-24 LPA'
  },
  {
    id: 'car-6',
    name: 'Data Scientist',
    demandLevel: 'HIGH',
    description: 'Utilize statistical modeling, big data processing, and machine learning to solve complex challenges.',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Analysis'],
    avgSalary: '12-28 LPA'
  }
];

/**
 * Calculate readiness score consistently
 * Readiness = % of target role's required skills matched
 */
const calculateReadinessScore = (userSkills = [], targetRole = 'Full Stack Developer') => {
  const career = sampleCareers.find(c => c.name.toLowerCase() === targetRole.toLowerCase()) || sampleCareers[0];
  const reqs = career.requiredSkills || [];

  const matched = userSkills.filter(s =>
    reqs.some(r => r.toLowerCase() === s.toLowerCase())
  );

  const percentage = reqs.length > 0 ? (matched.length / reqs.length) * 100 : 70;
  return Math.round(percentage);
};

/**
 * Get complete Student Workspace bundle
 */
const getStudentWorkspaceService = async (token) => {
  const user = await getUserByTokenService(token);
  if (!user) throw new Error('Unauthorized');

  const currentSkills = user.currentSkills || ['Python', 'SQL', 'HTML', 'JavaScript'];
  const targetRole = user.targetRole || 'Full Stack Developer';
  const readinessScore = calculateReadinessScore(currentSkills, targetRole);

  const career = sampleCareers.find(c => c.name.toLowerCase() === targetRole.toLowerCase()) || sampleCareers[0];
  const requiredSkills = career.requiredSkills || ['JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL'];

  const matchedSkills = currentSkills.filter(s =>
    requiredSkills.some(r => r.toLowerCase() === s.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(r =>
    !currentSkills.some(s => s.toLowerCase() === r.toLowerCase())
  );

  // Skill levels mapping
  const skillLevels = user.skillLevels || [
    { skill: 'Python', level: 'Advanced' },
    { skill: 'SQL', level: 'Intermediate' },
    { skill: 'JavaScript', level: 'Intermediate' },
    { skill: 'HTML', level: 'Intermediate' }
  ];

  // Job matches calculation
  const jobMatches = sampleJobPostings.map(job => {
    const jobReqs = job.requiredSkills;
    const matching = currentSkills.filter(s =>
      jobReqs.some(r => r.toLowerCase() === s.toLowerCase())
    );
    const missing = jobReqs.filter(r =>
      !currentSkills.some(s => s.toLowerCase() === r.toLowerCase())
    );

    const matchPercentage = Math.round((matching.length / jobReqs.length) * 100);

    return {
      ...job,
      matchPercentage,
      matchingSkills: matching,
      missingSkills: missing
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    user,
    targetRole,
    readinessScore,
    stats: {
      currentSkillsCount: currentSkills.length,
      missingSkillsCount: missingSkills.length,
      jobMatchesCount: jobMatches.length,
      readinessPercentage: readinessScore
    },
    currentSkills,
    missingSkills,
    prioritySkills: missingSkills.slice(0, 3),
    recommendedNextStep: missingSkills.length > 0
      ? `Complete ${missingSkills[0]} skill assessment`
      : 'Explore advanced Cloud & DevOps courses',
    skillLevels,
    jobMatches,
    careers: sampleCareers.map(c => {
      const cReqs = c.requiredSkills;
      const cMatching = currentSkills.filter(s => cReqs.some(r => r.toLowerCase() === s.toLowerCase()));
      const cMissing = cReqs.filter(r => !currentSkills.some(s => s.toLowerCase() === r.toLowerCase()));
      const matchPct = Math.round((cMatching.length / cReqs.length) * 100);
      return {
        ...c,
        matchPercentage: matchPct,
        matchingSkills: cMatching,
        missingSkills: cMissing
      };
    })
  };
};

/**
 * Add or update skill with level
 */
const updateStudentSkillService = async (userId, skillName, level = 'Intermediate') => {
  const dbUser = await getUserByTokenService(userId); // Or by id
  // Get current user details and update
  const currentSkills = new Set(dbUser?.currentSkills || []);
  currentSkills.add(skillName);

  const existingLevels = dbUser?.skillLevels || [];
  const levelIdx = existingLevels.findIndex(l => l.skill.toLowerCase() === skillName.toLowerCase());

  let updatedLevels = [...existingLevels];
  if (levelIdx !== -1) {
    updatedLevels[levelIdx].level = level;
  } else {
    updatedLevels.push({ skill: skillName, level });
  }

  const updatedUser = await updateUserProfileService(dbUser._id || dbUser.id, {
    currentSkills: Array.from(currentSkills),
    skillLevels: updatedLevels
  });

  return updatedUser;
};

/**
 * Remove skill
 */
const removeStudentSkillService = async (userId, skillName) => {
  const dbUser = await getUserByTokenService(userId);
  const currentSkills = (dbUser?.currentSkills || []).filter(s => s.toLowerCase() !== skillName.toLowerCase());
  const skillLevels = (dbUser?.skillLevels || []).filter(l => l.skill.toLowerCase() !== skillName.toLowerCase());

  const updatedUser = await updateUserProfileService(dbUser._id || dbUser.id, {
    currentSkills,
    skillLevels
  });

  return updatedUser;
};

/**
 * Get assessment questions for a skill
 */
const getAssessmentQuestionsService = (skill) => {
  const key = Object.keys(questionBank).find(k => k.toLowerCase() === (skill || '').toLowerCase()) || 'Python';
  return {
    skill: key,
    totalQuestions: questionBank[key].length,
    questions: questionBank[key]
  };
};

/**
 * Submit assessment answers and calculate level
 */
const submitAssessmentService = async (token, skill, answers) => {
  const qSet = getAssessmentQuestionsService(skill);
  const questions = qSet.questions;

  let correctCount = 0;
  questions.forEach(q => {
    if (answers[q.id] !== undefined && Number(answers[q.id]) === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);

  let calculatedLevel = 'Beginner';
  if (percentage >= 70) calculatedLevel = 'Advanced';
  else if (percentage >= 40) calculatedLevel = 'Intermediate';

  // Update student skills & level automatically upon assessment completion
  let user = await getUserByTokenService(token);
  if (user) {
    user = await updateStudentSkillService(token, qSet.skill, calculatedLevel);
  }

  return {
    skill: qSet.skill,
    score: correctCount,
    totalQuestions: questions.length,
    percentage,
    level: calculatedLevel,
    message: `Assessment Completed ✓. Evaluated Level: ${calculatedLevel}`,
    user
  };
};

module.exports = {
  getStudentWorkspaceService,
  updateStudentSkillService,
  removeStudentSkillService,
  getAssessmentQuestionsService,
  submitAssessmentService,
  sampleJobPostings,
  sampleCareers,
  calculateReadinessScore
};
