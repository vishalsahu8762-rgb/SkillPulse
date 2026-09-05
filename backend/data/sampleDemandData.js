/**
 * PROTOTYPE DATA - Sample Job Market Data
 * 
 * This is prototype/sample data for demonstration purposes only.
 * Do NOT present this as official government statistics.
 */

const sampleJobData = [
  // Software Developer
  {
    id: 1,
    jobRole: 'Software Developer',
    industry: 'IT Services',
    location: 'Bengaluru',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    demand: 850,
    growthRate: 12,
    salaryRange: '6-15 LPA',
    postedDate: '2024-01-15'
  },
  {
    id: 2,
    jobRole: 'Software Developer',
    industry: 'IT Services',
    location: 'Pune',
    skills: ['Java', 'JavaScript', 'Spring Boot', 'MySQL', 'Docker'],
    demand: 620,
    growthRate: 10,
    salaryRange: '5-12 LPA',
    postedDate: '2024-01-14'
  },
  {
    id: 3,
    jobRole: 'Software Developer',
    industry: 'IT Services',
    location: 'Indore',
    skills: ['Python', 'JavaScript', 'React', 'MongoDB'],
    demand: 320,
    growthRate: 15,
    salaryRange: '4-10 LPA',
    postedDate: '2024-01-13'
  },
  // Data Analyst
  {
    id: 4,
    jobRole: 'Data Analyst',
    industry: 'Analytics',
    location: 'Bengaluru',
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Machine Learning'],
    demand: 540,
    growthRate: 18,
    salaryRange: '8-18 LPA',
    postedDate: '2024-01-12'
  },
  {
    id: 5,
    jobRole: 'Data Analyst',
    industry: 'Analytics',
    location: 'Pune',
    skills: ['SQL', 'Excel', 'Power BI', 'Python'],
    demand: 380,
    growthRate: 16,
    salaryRange: '6-14 LPA',
    postedDate: '2024-01-11'
  },
  {
    id: 6,
    jobRole: 'Data Analyst',
    industry: 'Finance',
    location: 'Mumbai',
    skills: ['SQL', 'Excel', 'Power BI', 'Python'],
    demand: 420,
    growthRate: 14,
    salaryRange: '7-16 LPA',
    postedDate: '2024-01-10'
  },
  // Full Stack Developer
  {
    id: 7,
    jobRole: 'Full Stack Developer',
    industry: 'IT Services',
    location: 'Bengaluru',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    demand: 720,
    growthRate: 20,
    salaryRange: '10-25 LPA',
    postedDate: '2024-01-09'
  },
  {
    id: 8,
    jobRole: 'Full Stack Developer',
    industry: 'E-commerce',
    location: 'Pune',
    skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'AWS'],
    demand: 480,
    growthRate: 18,
    salaryRange: '8-20 LPA',
    postedDate: '2024-01-08'
  },
  // AI/ML Engineer
  {
    id: 9,
    jobRole: 'AI/ML Engineer',
    industry: 'AI/ML',
    location: 'Bengaluru',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'AWS', 'Docker'],
    demand: 380,
    growthRate: 25,
    salaryRange: '15-35 LPA',
    postedDate: '2024-01-07'
  },
  {
    id: 10,
    jobRole: 'AI/ML Engineer',
    industry: 'AI/ML',
    location: 'Hyderabad',
    skills: ['Python', 'Machine Learning', 'PyTorch', 'SQL', 'AWS'],
    demand: 290,
    growthRate: 22,
    salaryRange: '12-30 LPA',
    postedDate: '2024-01-06'
  },
  // Cloud Engineer
  {
    id: 11,
    jobRole: 'Cloud Engineer',
    industry: 'Cloud Services',
    location: 'Bengaluru',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Linux'],
    demand: 450,
    growthRate: 22,
    salaryRange: '12-28 LPA',
    postedDate: '2024-01-05'
  },
  {
    id: 12,
    jobRole: 'Cloud Engineer',
    industry: 'Cloud Services',
    location: 'Pune',
    skills: ['AWS', 'Docker', 'Python', 'Linux'],
    demand: 320,
    growthRate: 20,
    salaryRange: '10-24 LPA',
    postedDate: '2024-01-04'
  },
  // Cybersecurity Analyst
  {
    id: 13,
    jobRole: 'Cybersecurity Analyst',
    industry: 'Cybersecurity',
    location: 'Bengaluru',
    skills: ['Cybersecurity', 'Python', 'Network Security', 'AWS', 'SQL'],
    demand: 280,
    growthRate: 28,
    salaryRange: '12-30 LPA',
    postedDate: '2024-01-03'
  },
  {
    id: 14,
    jobRole: 'Cybersecurity Analyst',
    industry: 'Finance',
    location: 'Mumbai',
    skills: ['Cybersecurity', 'Network Security', 'Python', 'SQL'],
    demand: 220,
    growthRate: 25,
    salaryRange: '10-26 LPA',
    postedDate: '2024-01-02'
  },
  // Additional entries for other locations
  {
    id: 15,
    jobRole: 'Software Developer',
    industry: 'IT Services',
    location: 'Bhopal',
    skills: ['Python', 'JavaScript', 'React', 'Node.js'],
    demand: 180,
    growthRate: 14,
    salaryRange: '4-9 LPA',
    postedDate: '2024-01-01'
  },
  {
    id: 16,
    jobRole: 'Data Analyst',
    industry: 'Analytics',
    location: 'Bhopal',
    skills: ['Python', 'SQL', 'Excel', 'Power BI'],
    demand: 120,
    growthRate: 16,
    salaryRange: '5-11 LPA',
    postedDate: '2024-01-01'
  },
  {
    id: 17,
    jobRole: 'Software Developer',
    industry: 'IT Services',
    location: 'Jabalpur',
    skills: ['Java', 'JavaScript', 'MySQL'],
    demand: 95,
    growthRate: 12,
    salaryRange: '3-8 LPA',
    postedDate: '2024-01-01'
  },
  {
    id: 18,
    jobRole: 'Full Stack Developer',
    industry: 'IT Services',
    location: 'Patna',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    demand: 85,
    growthRate: 18,
    salaryRange: '5-12 LPA',
    postedDate: '2024-01-01'
  },
  {
    id: 19,
    jobRole: 'Data Analyst',
    industry: 'Analytics',
    location: 'Indore',
    skills: ['Python', 'SQL', 'Power BI', 'Excel'],
    demand: 145,
    growthRate: 17,
    salaryRange: '5-12 LPA',
    postedDate: '2024-01-01'
  },
  {
    id: 20,
    jobRole: 'Cloud Engineer',
    industry: 'Cloud Services',
    location: 'Hyderabad',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
    demand: 265,
    growthRate: 21,
    salaryRange: '11-25 LPA',
    postedDate: '2024-01-01'
  }
];

const skillSupplyData = [
  { skill: 'Python', supply: 1200, demand: 950 },
  { skill: 'Java', supply: 980, demand: 720 },
  { skill: 'JavaScript', supply: 1100, demand: 1050 },
  { skill: 'React', supply: 750, demand: 820 },
  { skill: 'Node.js', supply: 680, demand: 720 },
  { skill: 'SQL', supply: 1300, demand: 1100 },
  { skill: 'MongoDB', supply: 450, demand: 520 },
  { skill: 'Docker', supply: 380, demand: 480 },
  { skill: 'AWS', supply: 420, demand: 550 },
  { skill: 'Power BI', supply: 320, demand: 380 },
  { skill: 'Excel', supply: 1500, demand: 900 },
  { skill: 'Machine Learning', supply: 280, demand: 420 },
  { skill: 'Cybersecurity', supply: 220, demand: 350 }
];

const courseData = [
  { name: 'Full Stack Development', enrolled: 2500, completionRate: 75, industryDemand: 'High' },
  { name: 'Data Science with Python', enrolled: 1800, completionRate: 68, industryDemand: 'High' },
  { name: 'Cloud Computing (AWS)', enrolled: 1200, completionRate: 72, industryDemand: 'High' },
  { name: 'Cybersecurity Fundamentals', enrolled: 900, completionRate: 65, industryDemand: 'High' },
  { name: 'Machine Learning Specialization', enrolled: 750, completionRate: 58, industryDemand: 'Medium' },
  { name: 'Java Programming', enrolled: 2200, completionRate: 82, industryDemand: 'Medium' },
  { name: 'Basic Excel Training', enrolled: 3500, completionRate: 90, industryDemand: 'Low' },
  { name: 'Web Development Basics', enrolled: 2800, completionRate: 78, industryDemand: 'Medium' }
];

module.exports = {
  sampleJobData,
  skillSupplyData,
  courseData
};
