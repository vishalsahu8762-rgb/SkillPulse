/**
 * DISTRICT-WISE SKILL DEMAND PLANNER SERVICE
 * Prototype Dataset & Analysis Engine for Madhya Pradesh Districts
 */

const districtDatabase = {
  Bhopal: {
    district: 'Bhopal',
    region: 'Central MP',
    overallDemandScore: 88,
    topIndustry: 'IT & Software',
    industries: [
      { name: 'IT & Software', demandLevel: 'HIGH', demandScore: 92, topSkills: ['Python', 'Cloud Computing', 'SQL'] },
      { name: 'Healthcare & Pharma', demandLevel: 'HIGH', demandScore: 84, topSkills: ['Medical Lab Tech', 'Pharma QC', 'Data Analysis'] },
      { name: 'E-Governance & Public Admin', demandLevel: 'MEDIUM', demandScore: 75, topSkills: ['SQL', 'Cybersecurity', 'Excel'] },
      { name: 'Education & EdTech', demandLevel: 'MEDIUM', demandScore: 68, topSkills: ['Digital Teaching', 'Python', 'Content Management'] }
    ],
    skills: [
      { name: 'Python', demandScore: 92, trainingCapacity: 45, industry: 'IT & Software' },
      { name: 'Cloud Computing', demandScore: 85, trainingCapacity: 30, industry: 'IT & Software' },
      { name: 'SQL', demandScore: 78, trainingCapacity: 60, industry: 'IT & Software' },
      { name: 'Data Analysis', demandScore: 72, trainingCapacity: 65, industry: 'Healthcare' },
      { name: 'Cybersecurity', demandScore: 68, trainingCapacity: 28, industry: 'E-Governance' },
      { name: 'Basic Excel', demandScore: 35, trainingCapacity: 75, industry: 'Administration' }
    ],
    courses: [
      {
        name: 'Python for Data Analytics',
        relatedSkills: ['Python', 'Data Analysis', 'SQL'],
        demandScore: 92,
        priority: 'HIGH',
        reason: 'High Python demand (92) combined with severe training shortage in Bhopal.'
      },
      {
        name: 'Cloud Computing Fundamentals (AWS)',
        relatedSkills: ['Cloud Computing', 'Linux'],
        demandScore: 85,
        priority: 'HIGH',
        reason: 'High cloud adoption among Bhopal tech firms + critical local skill shortage.'
      },
      {
        name: 'Advanced SQL & Database Administration',
        relatedSkills: ['SQL', 'Database Management'],
        demandScore: 78,
        priority: 'MODERATE',
        reason: 'Moderate shortage across IT services & state data centers.'
      }
    ]
  },

  Indore: {
    district: 'Indore',
    region: 'Malwa MP',
    overallDemandScore: 94,
    topIndustry: 'IT & Software',
    industries: [
      { name: 'IT & Software', demandLevel: 'HIGH', demandScore: 96, topSkills: ['React', 'Node.js', 'Java'] },
      { name: 'E-Commerce & Retail Tech', demandLevel: 'HIGH', demandScore: 89, topSkills: ['Digital Marketing', 'React', 'Supply Chain Analytics'] },
      { name: 'Logistics & Supply Chain', demandLevel: 'HIGH', demandScore: 82, topSkills: ['Supply Chain Analytics', 'Excel', 'IoT'] },
      { name: 'Automobile & Manufacturing', demandLevel: 'MEDIUM', demandScore: 76, topSkills: ['CAD/CAM', 'Industrial Automation', 'Quality Control'] }
    ],
    skills: [
      { name: 'React & Frontend', demandScore: 95, trainingCapacity: 50, industry: 'IT & Software' },
      { name: 'Node.js & Backend', demandScore: 88, trainingCapacity: 40, industry: 'IT & Software' },
      { name: 'Supply Chain Analytics', demandScore: 82, trainingCapacity: 35, industry: 'Logistics' },
      { name: 'Java & Spring Boot', demandScore: 78, trainingCapacity: 70, industry: 'IT & Software' },
      { name: 'Digital Marketing', demandScore: 74, trainingCapacity: 60, industry: 'E-Commerce' },
      { name: 'Basic Data Entry', demandScore: 25, trainingCapacity: 80, industry: 'Administration' }
    ],
    courses: [
      {
        name: 'Full Stack Web Development (MERN)',
        relatedSkills: ['React', 'Node.js', 'MongoDB'],
        demandScore: 95,
        priority: 'HIGH',
        reason: 'Surging demand for React & Node developers across Indore tech hubs.'
      },
      {
        name: 'Logistics & Supply Chain Analytics',
        relatedSkills: ['Supply Chain Analytics', 'Excel'],
        demandScore: 82,
        priority: 'HIGH',
        reason: 'High warehouse & logistics automation demand near Pithampur corridor.'
      },
      {
        name: 'Digital Marketing & Growth Hacking',
        relatedSkills: ['Digital Marketing', 'SEO', 'Analytics'],
        demandScore: 74,
        priority: 'MODERATE',
        reason: 'Growing requirement in Indore e-commerce startups.'
      }
    ]
  },

  Jabalpur: {
    district: 'Jabalpur',
    region: 'Mahakoshal MP',
    overallDemandScore: 72,
    topIndustry: 'Defense & Manufacturing',
    industries: [
      { name: 'Defense & Manufacturing', demandLevel: 'HIGH', demandScore: 86, topSkills: ['PLC Automation', 'CAD/CAM', 'Quality Control'] },
      { name: 'Telecom & Networking', demandLevel: 'MEDIUM', demandScore: 74, topSkills: ['Network Security', 'Linux', 'Cybersecurity'] },
      { name: 'Healthcare', demandLevel: 'MEDIUM', demandScore: 68, topSkills: ['Medical Equipment Tech', 'Nursing', 'Lab Tech'] },
      { name: 'Civil & Infrastructure', demandLevel: 'MEDIUM', demandScore: 62, topSkills: ['Civil Surveying', 'AutoCAD', 'Project Mgmt'] }
    ],
    skills: [
      { name: 'Industrial Automation (PLC)', demandScore: 86, trainingCapacity: 35, industry: 'Defense Manufacturing' },
      { name: 'CAD / Mechanical Design', demandScore: 80, trainingCapacity: 45, industry: 'Manufacturing' },
      { name: 'Network & Cybersecurity', demandScore: 74, trainingCapacity: 25, industry: 'Telecom' },
      { name: 'Quality Assurance (QA)', demandScore: 68, trainingCapacity: 60, industry: 'Manufacturing' },
      { name: 'Python Basics', demandScore: 55, trainingCapacity: 50, industry: 'IT' },
      { name: 'Legacy DTP Printing', demandScore: 18, trainingCapacity: 70, industry: 'Media' }
    ],
    courses: [
      {
        name: 'Industrial Automation & Robotics (PLC)',
        relatedSkills: ['PLC Automation', 'SCADA', 'Sensors'],
        demandScore: 86,
        priority: 'HIGH',
        reason: 'Critical shortage of automation specialists in Ordnance Factory & Jabalpur manufacturing.'
      },
      {
        name: 'Cybersecurity & Network Defense',
        relatedSkills: ['Network Security', 'Cybersecurity'],
        demandScore: 74,
        priority: 'HIGH',
        reason: 'High demand from regional defense & telecommunication hubs.'
      },
      {
        name: 'Mechanical CAD/CAM Design',
        relatedSkills: ['CAD/CAM', 'AutoCAD'],
        demandScore: 80,
        priority: 'HIGH',
        reason: 'High manufacturing demand exceeding local vocational institute capacity.'
      }
    ]
  },

  Gwalior: {
    district: 'Gwalior',
    region: 'Chambal/Gwalior MP',
    overallDemandScore: 68,
    topIndustry: 'Textile & Light Manufacturing',
    industries: [
      { name: 'Textile & Light Manufacturing', demandLevel: 'HIGH', demandScore: 80, topSkills: ['Textile Tech', 'Quality Control', 'Machine Ops'] },
      { name: 'Tourism & Hospitality', demandLevel: 'MEDIUM', demandScore: 75, topSkills: ['Digital Marketing', 'Hospitality', 'Languages'] },
      { name: 'Retail & Commerce', demandLevel: 'MEDIUM', demandScore: 70, topSkills: ['Tally', 'Sales', 'Customer Service'] },
      { name: 'Agro-Processing', demandLevel: 'MEDIUM', demandScore: 62, topSkills: ['Agro Logistics', 'Food Tech', 'Quality Audit'] }
    ],
    skills: [
      { name: 'Digital Marketing & Tourism', demandScore: 78, trainingCapacity: 30, industry: 'Tourism' },
      { name: 'Quality Control (QC)', demandScore: 75, trainingCapacity: 40, industry: 'Manufacturing' },
      { name: 'Hospitality Management', demandScore: 72, trainingCapacity: 52, industry: 'Hospitality' },
      { name: 'Tally & GST Accounting', demandScore: 68, trainingCapacity: 62, industry: 'Retail' },
      { name: 'Basic Computer Operations', demandScore: 30, trainingCapacity: 75, industry: 'General' }
    ],
    courses: [
      {
        name: 'Digital Marketing for Tourism & Retail',
        relatedSkills: ['Digital Marketing', 'Social Media', 'SEO'],
        demandScore: 78,
        priority: 'HIGH',
        reason: 'Expanding heritage tourism & retail sector seeking digital visibility.'
      },
      {
        name: 'Industrial Quality Assurance & Safety',
        relatedSkills: ['Quality Control', 'ISO Audit'],
        demandScore: 75,
        priority: 'HIGH',
        reason: 'Required by Malanpur & Gwalior industrial manufacturing plants.'
      }
    ]
  },

  Ujjain: {
    district: 'Ujjain',
    region: 'Malwa MP',
    overallDemandScore: 76,
    topIndustry: 'Agri-Tech & Pharmaceuticals',
    industries: [
      { name: 'Agri-Tech & Processing', demandLevel: 'HIGH', demandScore: 84, topSkills: ['Agri-Analytics', 'Soil Testing', 'Drone Farming'] },
      { name: 'Pharmaceuticals', demandLevel: 'HIGH', demandScore: 80, topSkills: ['Pharma QC', 'Chemistry Lab', 'GMP Audit'] },
      { name: 'Tourism & Event Mgmt', demandLevel: 'MEDIUM', demandScore: 72, topSkills: ['Crowd Management', 'Hospitality', 'Logistics'] }
    ],
    skills: [
      { name: 'Agri-Tech & Precision Farming', demandScore: 84, trainingCapacity: 25, industry: 'Agriculture' },
      { name: 'Pharma Quality Control', demandScore: 80, trainingCapacity: 35, industry: 'Pharmaceuticals' },
      { name: 'Event & Crowd Logistics', demandScore: 72, trainingCapacity: 50, industry: 'Tourism' },
      { name: 'Web Development Basics', demandScore: 45, trainingCapacity: 40, industry: 'IT Services' }
    ],
    courses: [
      {
        name: 'Agri-Tech & Precision Farming Specialist',
        relatedSkills: ['Agri-Analytics', 'IoT Farming', 'Soil Tech'],
        demandScore: 84,
        priority: 'HIGH',
        reason: 'Severe regional shortage of modern agricultural technology professionals.'
      },
      {
        name: 'Pharma QC & Regulatory Compliance',
        relatedSkills: ['Pharma QC', 'GMP Audit'],
        demandScore: 80,
        priority: 'HIGH',
        reason: 'High demand from expanding Ujjain pharmaceutical industrial zone.'
      }
    ]
  },

  Sagar: {
    district: 'Sagar',
    region: 'Bundelkhand MP',
    overallDemandScore: 64,
    topIndustry: 'Renewable Energy & Mining',
    industries: [
      { name: 'Renewable Energy (Solar)', demandLevel: 'HIGH', demandScore: 82, topSkills: ['Solar PV Installation', 'Electrical Safety', 'Maintenance'] },
      { name: 'Mining & Infrastructure', demandLevel: 'MEDIUM', demandScore: 74, topSkills: ['GIS Surveying', 'Heavy Equipment', 'Safety'] },
      { name: 'Rural Banking & Finance', demandLevel: 'MEDIUM', demandScore: 65, topSkills: ['Micro-Finance', 'Tally', 'Customer Care'] }
    ],
    skills: [
      { name: 'Solar PV & Renewable Tech', demandScore: 82, trainingCapacity: 20, industry: 'Renewable Energy' },
      { name: 'GIS & Land Surveying', demandScore: 74, trainingCapacity: 30, industry: 'Mining & Infrastructure' },
      { name: 'Micro-Finance Operations', demandScore: 65, trainingCapacity: 48, industry: 'Banking' },
      { name: 'Python Programming', demandScore: 38, trainingCapacity: 32, industry: 'IT' }
    ],
    courses: [
      {
        name: 'Solar Energy & Technician Certification',
        relatedSkills: ['Solar PV', 'Electrical Tech'],
        demandScore: 82,
        priority: 'HIGH',
        reason: 'Major solar farm expansions creating urgent technician shortage in Sagar.'
      },
      {
        name: 'GIS Drone Mapping & Surveying',
        relatedSkills: ['GIS Surveying', 'Drone Ops'],
        demandScore: 74,
        priority: 'HIGH',
        reason: 'High demand in regional mining & infrastructure development projects.'
      }
    ]
  }
};

/**
 * Transparent rule-based skill shortage & priority calculation
 * shortage = demandScore - trainingCapacity
 */
const processSkillShortage = (skill) => {
  const shortage = skill.demandScore - skill.trainingCapacity;

  let shortageClassification = 'BALANCED';
  let trainingPriority = 'BALANCED';
  let actionRecommendation = 'Maintain current capacity';

  if (shortage >= 30) {
    shortageClassification = 'HIGH SHORTAGE';
    trainingPriority = 'HIGH PRIORITY';
    actionRecommendation = `Urgent: Increase training seats and introduce new courses for ${skill.name}`;
  } else if (shortage >= 15) {
    shortageClassification = 'MODERATE SHORTAGE';
    trainingPriority = 'MODERATE PRIORITY';
    actionRecommendation = `Expand training capacity for ${skill.name} in local institutes`;
  } else if (shortage >= -15) {
    shortageClassification = 'BALANCED';
    trainingPriority = 'BALANCED';
    actionRecommendation = `Maintain current capacity for ${skill.name}`;
  } else {
    shortageClassification = 'OVERSUPPLIED';
    trainingPriority = 'OVERSUPPLIED';
    actionRecommendation = `Reduce training seats or redirect learners from ${skill.name} to higher demand skills`;
  }

  return {
    ...skill,
    shortage,
    shortageClassification,
    trainingPriority,
    actionRecommendation
  };
};

/**
 * Get list of available districts with overall demand scores
 */
const getDistrictsListService = () => {
  return Object.values(districtDatabase).map(d => ({
    district: d.district,
    region: d.region,
    overallDemandScore: d.overallDemandScore,
    topIndustry: d.topIndustry
  }));
};

/**
 * Get comprehensive district analysis
 */
const getDistrictAnalysisService = (districtName, filters = {}) => {
  // Case-insensitive lookup or default to Bhopal
  const key = Object.keys(districtDatabase).find(
    k => k.toLowerCase() === (districtName || '').toLowerCase()
  ) || 'Bhopal';

  const rawData = districtDatabase[key];

  let skills = rawData.skills.map(processSkillShortage);
  let industries = [...rawData.industries];
  let courses = [...rawData.courses];

  // Apply optional industry filter
  if (filters.industry && filters.industry !== 'ALL') {
    industries = industries.filter(i => i.name.toLowerCase().includes(filters.industry.toLowerCase()));
    skills = skills.filter(s => s.industry.toLowerCase().includes(filters.industry.toLowerCase()));
  }

  // Calculate summary metrics
  const highShortageSkills = skills.filter(s => s.shortageClassification === 'HIGH SHORTAGE');
  const moderateShortageSkills = skills.filter(s => s.shortageClassification === 'MODERATE SHORTAGE');

  let overallPriority = 'BALANCED';
  if (highShortageSkills.length >= 2) overallPriority = 'HIGH';
  else if (highShortageSkills.length === 1 || moderateShortageSkills.length >= 2) overallPriority = 'MODERATE';

  return {
    district: rawData.district,
    region: rawData.region,
    overallDemandScore: rawData.overallDemandScore,
    topIndustry: rawData.topIndustry,
    summary: {
      totalHighDemandSkills: skills.filter(s => s.demandScore >= 70).length,
      topIndustry: rawData.topIndustry,
      overallPriority,
      highShortageCount: highShortageSkills.length,
      topShortageSkills: highShortageSkills.map(s => s.name),
      recommendedProgramsCount: courses.length
    },
    industries,
    skills: skills.sort((a, b) => b.demandScore - a.demandScore),
    courses,
    comparison: getDistrictsListService()
  };
};

module.exports = {
  getDistrictsListService,
  getDistrictAnalysisService
};
