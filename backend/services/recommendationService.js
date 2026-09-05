/**
 * Learning Recommendation Service
 * Rule-based learning path recommendation for prototype demonstration
 */

// Learning modules for each skill
const SKILL_MODULES = {
  'Python': [
    { title: 'Python Basics', duration: '2 weeks', level: 'Beginner' },
    { title: 'Python Data Structures', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Python for Data Analysis', duration: '3 weeks', level: 'Intermediate' }
  ],
  'JavaScript': [
    { title: 'JavaScript Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'ES6+ Features', duration: '1 week', level: 'Intermediate' },
    { title: 'Asynchronous JavaScript', duration: '2 weeks', level: 'Advanced' }
  ],
  'React': [
    { title: 'React Basics', duration: '2 weeks', level: 'Beginner' },
    { title: 'React Hooks', duration: '2 weeks', level: 'Intermediate' },
    { title: 'State Management with Redux', duration: '2 weeks', level: 'Advanced' }
  ],
  'Node.js': [
    { title: 'Node.js Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'Express.js Framework', duration: '2 weeks', level: 'Intermediate' },
    { title: 'REST API Development', duration: '2 weeks', level: 'Intermediate' }
  ],
  'SQL': [
    { title: 'SQL Basics', duration: '2 weeks', level: 'Beginner' },
    { title: 'Advanced SQL Queries', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Database Design', duration: '2 weeks', level: 'Intermediate' }
  ],
  'MongoDB': [
    { title: 'MongoDB Basics', duration: '1 week', level: 'Beginner' },
    { title: 'Mongoose ODM', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Aggregation Framework', duration: '2 weeks', level: 'Advanced' }
  ],
  'Power BI': [
    { title: 'Power BI Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'Data Visualization', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Advanced DAX', duration: '2 weeks', level: 'Advanced' }
  ],
  'Excel': [
    { title: 'Excel Basics', duration: '1 week', level: 'Beginner' },
    { title: 'Advanced Excel Functions', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Data Analysis in Excel', duration: '2 weeks', level: 'Intermediate' }
  ],
  'Statistics': [
    { title: 'Statistics Fundamentals', duration: '3 weeks', level: 'Beginner' },
    { title: 'Probability Theory', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Statistical Analysis', duration: '3 weeks', level: 'Advanced' }
  ],
  'Machine Learning': [
    { title: 'ML Fundamentals', duration: '3 weeks', level: 'Beginner' },
    { title: 'Supervised Learning', duration: '4 weeks', level: 'Intermediate' },
    { title: 'Unsupervised Learning', duration: '3 weeks', level: 'Advanced' }
  ],
  'TensorFlow': [
    { title: 'TensorFlow Basics', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Neural Networks', duration: '3 weeks', level: 'Advanced' },
    { title: 'Deep Learning Projects', duration: '4 weeks', level: 'Advanced' }
  ],
  'AWS': [
    { title: 'AWS Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'EC2 and S3', duration: '2 weeks', level: 'Intermediate' },
    { title: 'AWS Architecture', duration: '3 weeks', level: 'Advanced' }
  ],
  'Docker': [
    { title: 'Docker Basics', duration: '1 week', level: 'Beginner' },
    { title: 'Docker Compose', duration: '1 week', level: 'Intermediate' },
    { title: 'Container Orchestration', duration: '2 weeks', level: 'Advanced' }
  ],
  'Kubernetes': [
    { title: 'Kubernetes Fundamentals', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Kubernetes Deployment', duration: '3 weeks', level: 'Advanced' },
    { title: 'Kubernetes Best Practices', duration: '2 weeks', level: 'Advanced' }
  ],
  'Linux': [
    { title: 'Linux Basics', duration: '2 weeks', level: 'Beginner' },
    { title: 'Linux Administration', duration: '3 weeks', level: 'Intermediate' },
    { title: 'Shell Scripting', duration: '2 weeks', level: 'Intermediate' }
  ],
  'Cybersecurity': [
    { title: 'Cybersecurity Fundamentals', duration: '3 weeks', level: 'Beginner' },
    { title: 'Network Security', duration: '3 weeks', level: 'Intermediate' },
    { title: 'Security Operations', duration: '3 weeks', level: 'Advanced' }
  ],
  'Network Security': [
    { title: 'Network Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'Firewall Configuration', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Intrusion Detection', duration: '3 weeks', level: 'Advanced' }
  ],
  'Penetration Testing': [
    { title: 'Penetration Testing Basics', duration: '3 weeks', level: 'Intermediate' },
    { title: 'Vulnerability Assessment', duration: '3 weeks', level: 'Advanced' },
    { title: 'Ethical Hacking Projects', duration: '4 weeks', level: 'Advanced' }
  ],
  'Incident Response': [
    { title: 'Incident Response Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'Forensic Analysis', duration: '3 weeks', level: 'Intermediate' },
    { title: 'Incident Management', duration: '2 weeks', level: 'Advanced' }
  ],
  'Git': [
    { title: 'Git Fundamentals', duration: '1 week', level: 'Beginner' },
    { title: 'Git Workflows', duration: '1 week', level: 'Intermediate' },
    { title: 'Git Advanced Features', duration: '1 week', level: 'Advanced' }
  ],
  'REST APIs': [
    { title: 'API Design Principles', duration: '2 weeks', level: 'Beginner' },
    { title: 'RESTful Services', duration: '2 weeks', level: 'Intermediate' },
    { title: 'API Security', duration: '2 weeks', level: 'Advanced' }
  ],
  'HTML': [
    { title: 'HTML Fundamentals', duration: '1 week', level: 'Beginner' },
    { title: 'Semantic HTML', duration: '1 week', level: 'Intermediate' },
    { title: 'HTML5 Features', duration: '1 week', level: 'Intermediate' }
  ],
  'CSS': [
    { title: 'CSS Fundamentals', duration: '1 week', level: 'Beginner' },
    { title: 'CSS Layouts', duration: '2 weeks', level: 'Intermediate' },
    { title: 'CSS Animations', duration: '2 weeks', level: 'Advanced' }
  ],
  'Data Visualization': [
    { title: 'Data Visualization Principles', duration: '2 weeks', level: 'Beginner' },
    { title: 'Chart Libraries', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Interactive Dashboards', duration: '3 weeks', level: 'Advanced' }
  ],
  'Data Preprocessing': [
    { title: 'Data Cleaning', duration: '2 weeks', level: 'Beginner' },
    { title: 'Feature Engineering', duration: '3 weeks', level: 'Intermediate' },
    { title: 'Data Transformation', duration: '2 weeks', level: 'Intermediate' }
  ],
  'Networking': [
    { title: 'Networking Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'TCP/IP Protocols', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Network Architecture', duration: '3 weeks', level: 'Advanced' }
  ],
  'CI/CD': [
    { title: 'CI/CD Fundamentals', duration: '2 weeks', level: 'Beginner' },
    { title: 'Jenkins/GitLab CI', duration: '2 weeks', level: 'Intermediate' },
    { title: 'Pipeline Optimization', duration: '2 weeks', level: 'Advanced' }
  ]
};

/**
 * Generate learning path based on missing skills
 */
const generateLearningPath = (role, missingSkills, currentReadiness) => {
  if (!missingSkills || missingSkills.length === 0) {
    return {
      learningPath: [],
      currentReadiness,
      expectedReadiness: currentReadiness,
      totalDuration: '0 weeks',
      message: 'No missing skills. You are ready for this role!'
    };
  }

  // Sort missing skills by priority (high priority first)
  const sortedSkills = [...missingSkills].sort((a, b) => {
    const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Generate learning path
  const learningPath = [];
  let totalWeeks = 0;

  sortedSkills.forEach(skillObj => {
    const skill = skillObj.skill;
    const modules = SKILL_MODULES[skill] || [];
    
    modules.forEach(module => {
      learningPath.push({
        ...module,
        skill: skill,
        priority: skillObj.priority
      });
      
      // Parse duration (e.g., "2 weeks" -> 2)
      const durationMatch = module.duration.match(/(\d+)/);
      if (durationMatch) {
        totalWeeks += parseInt(durationMatch[1]);
      }
    });
  });

  // Calculate expected readiness after completing the path
  // Assume completing all missing skills will bring readiness to 90-95%
  const expectedReadiness = Math.min(95, currentReadiness + (100 - currentReadiness) * 0.9);

  return {
    learningPath,
    currentReadiness,
    expectedReadiness: Math.round(expectedReadiness),
    totalDuration: `${totalWeeks} weeks`,
    message: `Complete this ${totalWeeks}-week learning path to reach ${Math.round(expectedReadiness)}% readiness`
  };
};

/**
 * Get learning modules for a specific skill
 */
const getSkillModules = (skill) => {
  return SKILL_MODULES[skill] || [];
};

/**
 * Get all available skills with modules
 */
const getAllSkillsWithModules = () => {
  return Object.keys(SKILL_MODULES);
};

module.exports = {
  generateLearningPath,
  getSkillModules,
  getAllSkillsWithModules
};
