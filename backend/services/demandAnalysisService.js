const { sampleJobData, skillSupplyData, courseData } = require('../data/sampleDemandData');

/**
 * Calculate overall demand statistics
 */
const getOverallStats = (filters = {}) => {
  let filteredData = [...sampleJobData];

  // Apply filters
  if (filters.district) {
    filteredData = filteredData.filter(job => 
      job.location.toLowerCase() === filters.district.toLowerCase()
    );
  }
  if (filters.industry) {
    filteredData = filteredData.filter(job => 
      job.industry.toLowerCase() === filters.industry.toLowerCase()
    );
  }
  if (filters.jobRole) {
    filteredData = filteredData.filter(job => 
      job.jobRole.toLowerCase() === filters.jobRole.toLowerCase()
    );
  }
  if (filters.skill) {
    filteredData = filteredData.filter(job => 
      job.skills.some(s => s.toLowerCase() === filters.skill.toLowerCase())
    );
  }

  const totalJobs = filteredData.reduce((sum, job) => sum + job.demand, 0);

  // Calculate skill demand
  const skillDemand = {};
  filteredData.forEach(job => {
    job.skills.forEach(skill => {
      skillDemand[skill] = (skillDemand[skill] || 0) + job.demand;
    });
  });

  // Find most demanded skill
  const mostDemandedSkill = Object.entries(skillDemand)
    .sort((a, b) => b[1] - a[1])[0];

  // Find fastest growing skill (based on job role growth rates)
  const skillGrowth = {};
  filteredData.forEach(job => {
    job.skills.forEach(skill => {
      if (!skillGrowth[skill]) {
        skillGrowth[skill] = { totalGrowth: 0, count: 0 };
      }
      skillGrowth[skill].totalGrowth += job.growthRate;
      skillGrowth[skill].count += 1;
    });
  });

  const fastestGrowingSkill = Object.entries(skillGrowth)
    .map(([skill, data]) => ({
      skill,
      avgGrowth: data.totalGrowth / data.count
    }))
    .sort((a, b) => b.avgGrowth - a.avgGrowth)[0];

  // Find most demanded job role
  const roleDemand = {};
  filteredData.forEach(job => {
    roleDemand[job.jobRole] = (roleDemand[job.jobRole] || 0) + job.demand;
  });
  const mostDemandedRole = Object.entries(roleDemand)
    .sort((a, b) => b[1] - a[1])[0];

  // High priority courses (high demand, low supply)
  const highPriorityCourses = courseData
    .filter(course => course.industryDemand === 'High')
    .map(course => course.name);

  // Oversupplied courses (low demand, high supply)
  const oversuppliedCourses = courseData
    .filter(course => course.industryDemand === 'Low')
    .map(course => course.name);

  return {
    totalJobs,
    mostDemandedSkill: mostDemandedSkill ? mostDemandedSkill[0] : 'N/A',
    fastestGrowingSkill: fastestGrowingSkill ? fastestGrowingSkill.skill : 'N/A',
    mostDemandedRole: mostDemandedRole ? mostDemandedRole[0] : 'N/A',
    highPriorityCourses,
    oversuppliedCourses
  };
};

/**
 * Get top demanded skills
 */
const getTopDemandedSkills = (filters = {}, limit = 10) => {
  let filteredData = [...sampleJobData];

  // Apply filters
  if (filters.district) {
    filteredData = filteredData.filter(job => 
      job.location.toLowerCase() === filters.district.toLowerCase()
    );
  }
  if (filters.industry) {
    filteredData = filteredData.filter(job => 
      job.industry.toLowerCase() === filters.industry.toLowerCase()
    );
  }
  if (filters.jobRole) {
    filteredData = filteredData.filter(job => 
      job.jobRole.toLowerCase() === filters.jobRole.toLowerCase()
    );
  }

  const skillDemand = {};
  filteredData.forEach(job => {
    job.skills.forEach(skill => {
      skillDemand[skill] = (skillDemand[skill] || 0) + job.demand;
    });
  });

  const totalDemand = Object.values(skillDemand).reduce((a, b) => a + b, 0);

  return Object.entries(skillDemand)
    .map(([skill, demand]) => ({
      skill,
      demand,
      percentage: ((demand / totalDemand) * 100).toFixed(1)
    }))
    .sort((a, b) => b.demand - a.demand)
    .slice(0, limit);
};

/**
 * Get job role demand
 */
const getJobRoleDemand = (filters = {}) => {
  let filteredData = [...sampleJobData];

  // Apply filters
  if (filters.district) {
    filteredData = filteredData.filter(job => 
      job.location.toLowerCase() === filters.district.toLowerCase()
    );
  }
  if (filters.industry) {
    filteredData = filteredData.filter(job => 
      job.industry.toLowerCase() === filters.industry.toLowerCase()
    );
  }

  const roleDemand = {};
  filteredData.forEach(job => {
    if (!roleDemand[job.jobRole]) {
      roleDemand[job.jobRole] = { demand: 0, growthRate: 0, count: 0 };
    }
    roleDemand[job.jobRole].demand += job.demand;
    roleDemand[job.jobRole].growthRate += job.growthRate;
    roleDemand[job.jobRole].count += 1;
  });

  return Object.entries(roleDemand)
    .map(([role, data]) => ({
      role,
      demand: data.demand,
      avgGrowthRate: (data.growthRate / data.count).toFixed(1)
    }))
    .sort((a, b) => b.demand - a.demand);
};

/**
 * Get location-wise demand
 */
const getLocationDemand = (filters = {}) => {
  let filteredData = [...sampleJobData];

  // Apply filters
  if (filters.industry) {
    filteredData = filteredData.filter(job => 
      job.industry.toLowerCase() === filters.industry.toLowerCase()
    );
  }
  if (filters.jobRole) {
    filteredData = filteredData.filter(job => 
      job.jobRole.toLowerCase() === filters.jobRole.toLowerCase()
    );
  }

  const locationDemand = {};
  filteredData.forEach(job => {
    if (!locationDemand[job.location]) {
      locationDemand[job.location] = 0;
    }
    locationDemand[job.location] += job.demand;
  });

  return Object.entries(locationDemand)
    .map(([location, demand]) => ({ location, demand }))
    .sort((a, b) => b.demand - a.demand);
};

/**
 * Get industry-wise demand
 */
const getIndustryDemand = (filters = {}) => {
  let filteredData = [...sampleJobData];

  // Apply filters
  if (filters.district) {
    filteredData = filteredData.filter(job => 
      job.location.toLowerCase() === filters.district.toLowerCase()
    );
  }
  if (filters.jobRole) {
    filteredData = filteredData.filter(job => 
      job.jobRole.toLowerCase() === filters.jobRole.toLowerCase()
    );
  }

  const industryDemand = {};
  filteredData.forEach(job => {
    if (!industryDemand[job.industry]) {
      industryDemand[job.industry] = 0;
    }
    industryDemand[job.industry] += job.demand;
  });

  return Object.entries(industryDemand)
    .map(([industry, demand]) => ({ industry, demand }))
    .sort((a, b) => b.demand - a.demand);
};

/**
 * Get trending skills (based on growth rate)
 */
const getTrendingSkills = (filters = {}, limit = 10) => {
  let filteredData = [...sampleJobData];

  // Apply filters
  if (filters.district) {
    filteredData = filteredData.filter(job => 
      job.location.toLowerCase() === filters.district.toLowerCase()
    );
  }
  if (filters.industry) {
    filteredData = filteredData.filter(job => 
      job.industry.toLowerCase() === filters.industry.toLowerCase()
    );
  }

  const skillGrowth = {};
  filteredData.forEach(job => {
    job.skills.forEach(skill => {
      if (!skillGrowth[skill]) {
        skillGrowth[skill] = { totalGrowth: 0, count: 0 };
      }
      skillGrowth[skill].totalGrowth += job.growthRate;
      skillGrowth[skill].count += 1;
    });
  });

  return Object.entries(skillGrowth)
    .map(([skill, data]) => ({
      skill,
      avgGrowthRate: (data.totalGrowth / data.count).toFixed(1)
    }))
    .sort((a, b) => b.avgGrowthRate - a.avgGrowthRate)
    .slice(0, limit);
};

/**
 * Get filter options
 */
const getFilterOptions = () => {
  const districts = [...new Set(sampleJobData.map(job => job.location))];
  const industries = [...new Set(sampleJobData.map(job => job.industry))];
  const jobRoles = [...new Set(sampleJobData.map(job => job.jobRole))];
  const skills = [...new Set(sampleJobData.flatMap(job => job.skills))];

  return {
    districts: districts.sort(),
    industries: industries.sort(),
    jobRoles: jobRoles.sort(),
    skills: skills.sort()
  };
};

module.exports = {
  getOverallStats,
  getTopDemandedSkills,
  getJobRoleDemand,
  getLocationDemand,
  getIndustryDemand,
  getTrendingSkills,
  getFilterOptions
};
