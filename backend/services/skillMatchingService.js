/**
 * AI-Assisted Skill Matching Service
 * Rule-based skill gap analysis for prototype demonstration
 */

// Job role to required skills mapping
const JOB_ROLE_SKILLS = {
  'Software Developer': ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs'],
  'Data Analyst': ['Python', 'SQL', 'Excel', 'Power BI', 'Statistics', 'Data Visualization'],
  'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL', 'HTML', 'CSS', 'Git'],
  'AI/ML Engineer': ['Python', 'Machine Learning', 'TensorFlow', 'Statistics', 'SQL', 'Data Preprocessing'],
  'Cloud Engineer': ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Networking', 'CI/CD'],
  'Cybersecurity Analyst': ['Cybersecurity', 'Network Security', 'Python', 'Linux', 'Penetration Testing', 'Incident Response']
};

// All available skills for selection
const ALL_SKILLS = [
  'Python', 'Java', 'JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB',
  'Docker', 'AWS', 'Power BI', 'Excel', 'Machine Learning', 'Cybersecurity',
  'Git', 'REST APIs', 'HTML', 'CSS', 'TensorFlow', 'Statistics',
  'Data Visualization', 'Data Preprocessing', 'Kubernetes', 'Linux',
  'Networking', 'CI/CD', 'Network Security', 'Penetration Testing', 'Incident Response'
];

/**
 * Analyze skill gap for a given role and current skills
 */
const analyzeSkillGap = (role, currentSkills) => {
  const requiredSkills = JOB_ROLE_SKILLS[role] || [];
  
  if (requiredSkills.length === 0) {
    return {
      requiredSkills: [],
      matchedSkills: [],
      missingSkills: [],
      readinessScore: 0,
      gapLevels: { high: [], medium: [], low: [] }
    };
  }

  // Find matched and missing skills
  const matchedSkills = requiredSkills.filter(skill => 
    currentSkills.includes(skill)
  );
  const missingSkills = requiredSkills.filter(skill => 
    !currentSkills.includes(skill)
  );

  // Calculate readiness score
  const readinessScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);

  // Categorize gaps based on importance (weighted scoring)
  const gapLevels = categorizeGaps(missingSkills, role);

  return {
    requiredSkills,
    matchedSkills,
    missingSkills,
    readinessScore,
    gapLevels
  };
};

/**
 * Categorize skill gaps into HIGH, MEDIUM, LOW priority
 * Based on rule-based weighted scoring
 */
const categorizeGaps = (missingSkills, role) => {
  const highPriority = [];
  const mediumPriority = [];
  const lowPriority = [];

  // Define high-priority skills per role (core skills)
  const HIGH_PRIORITY_SKILLS = {
    'Software Developer': ['JavaScript', 'React', 'Node.js', 'SQL'],
    'Data Analyst': ['Python', 'SQL', 'Statistics'],
    'Full Stack Developer': ['JavaScript', 'React', 'Node.js'],
    'AI/ML Engineer': ['Python', 'Machine Learning', 'Statistics'],
    'Cloud Engineer': ['AWS', 'Docker', 'Linux'],
    'Cybersecurity Analyst': ['Cybersecurity', 'Network Security', 'Python']
  };

  const highPriorityForRole = HIGH_PRIORITY_SKILLS[role] || [];

  missingSkills.forEach(skill => {
    if (highPriorityForRole.includes(skill)) {
      highPriority.push(skill);
    } else {
      // Medium priority for remaining skills
      mediumPriority.push(skill);
    }
  });

  return {
    high: highPriority,
    medium: mediumPriority,
    low: lowPriority
  };
};

/**
 * Get all available job roles
 */
const getJobRoles = () => {
  return Object.keys(JOB_ROLE_SKILLS);
};

/**
 * Get all available skills
 */
const getAllSkills = () => {
  return ALL_SKILLS;
};

/**
 * Get required skills for a specific role
 */
const getRequiredSkills = (role) => {
  return JOB_ROLE_SKILLS[role] || [];
};

module.exports = {
  analyzeSkillGap,
  getJobRoles,
  getAllSkills,
  getRequiredSkills,
  categorizeGaps
};
