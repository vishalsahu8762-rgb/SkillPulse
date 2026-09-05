import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, Users, BookOpen, Filter, X, Building2, MapPin } from 'lucide-react';
import StatCard from '../components/StatCard';
import DemandChart from '../components/DemandChart';
import SkillBar from '../components/SkillBar';
import {
  getDemandStats,
  getDemandSkills,
  getDemandRoles,
  getDemandLocations,
  getDemandIndustries,
  getTrendingSkills,
  getFilterOptions
} from '../services/api';

const IndustryDemand = () => {
  const [stats, setStats] = useState(null);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    district: '',
    industry: '',
    jobRole: '',
    skill: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (filterOptions) {
      fetchFilteredData();
    }
  }, [filters]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, skillsRes, rolesRes, locationsRes, industriesRes, trendingRes, filterRes] = await Promise.all([
        getDemandStats(),
        getDemandSkills(),
        getDemandRoles(),
        getDemandLocations(),
        getDemandIndustries(),
        getTrendingSkills(),
        getFilterOptions()
      ]);

      setStats(statsRes.data);
      setSkills(skillsRes.data);
      setRoles(rolesRes.data);
      setLocations(locationsRes.data);
      setIndustries(industriesRes.data);
      setTrending(trendingRes.data);
      setFilterOptions(filterRes.data);
    } catch (error) {
      console.error('Error fetching industry demand data:', error);
      setError('Failed to load industry demand data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, skillsRes, rolesRes, locationsRes, industriesRes, trendingRes] = await Promise.all([
        getDemandStats(filters),
        getDemandSkills(filters),
        getDemandRoles(filters),
        getDemandLocations(filters),
        getDemandIndustries(filters),
        getTrendingSkills(filters)
      ]);

      setStats(statsRes.data);
      setSkills(skillsRes.data);
      setRoles(rolesRes.data);
      setLocations(locationsRes.data);
      setIndustries(industriesRes.data);
      setTrending(trendingRes.data);
    } catch (error) {
      console.error('Error fetching filtered demand data:', error);
      setError('Failed to load filtered data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ district: '', industry: '', jobRole: '', skill: '' });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Industry Demand</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchAllData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Industry Demand Analytics
          </h1>
          <p className="text-sm text-orange-600 font-medium mt-1">
            ⚠️ PROTOTYPE DATA - Real-time job market demand trends & sector analysis
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow self-start md:self-auto"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Filter Demand Data</h3>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              <X size={16} />
              <span>Clear All Filters</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">District / Location</label>
              <select
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Districts</option>
                {filterOptions?.districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Industry Sector</label>
              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Industries</option>
                {filterOptions?.industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Job Role</label>
              <select
                value={filters.jobRole}
                onChange={(e) => handleFilterChange('jobRole', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                {filterOptions?.jobRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Skill</label>
              <select
                value={filters.skill}
                onChange={(e) => handleFilterChange('skill', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Skills</option>
                {filterOptions?.skills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Openings"
          value={stats?.totalJobs ? stats.totalJobs.toLocaleString() : '--'}
          icon={LayoutDashboard}
          color="blue"
        />
        <StatCard
          title="Most Demanded Skill"
          value={stats?.mostDemandedSkill || '--'}
          icon={BookOpen}
          color="green"
        />
        <StatCard
          title="Fastest Growing Skill"
          value={stats?.fastestGrowingSkill || '--'}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Most Demanded Role"
          value={stats?.mostDemandedRole || '--'}
          icon={Users}
          color="orange"
        />
        <StatCard
          title="High Priority Courses"
          value={stats?.highPriorityCourses?.length ? stats.highPriorityCourses.length.toString() : '--'}
          icon={BookOpen}
          color="red"
        />
        <StatCard
          title="Oversupplied Courses"
          value={stats?.oversuppliedCourses?.length ? stats.oversuppliedCourses.length.toString() : '--'}
          icon={BookOpen}
          color="indigo"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemandChart
          type="bar"
          data={skills.map(s => ({ name: s.skill, value: s.demand }))}
          title="Top Demanded Skills"
          dataKey="value"
          nameKey="name"
        />
        <DemandChart
          type="bar"
          data={roles.map(r => ({ name: r.role, value: r.demand }))}
          title="Job Role Demand"
          dataKey="value"
          nameKey="name"
        />
        <DemandChart
          type="pie"
          data={locations.map(l => ({ name: l.location, value: l.demand }))}
          title="Location-wise Demand"
          dataKey="value"
          nameKey="name"
        />
        <DemandChart
          type="pie"
          data={industries.map(i => ({ name: i.industry, value: i.demand }))}
          title="Industry Demand Distribution"
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Trending Skills & Demand Percentages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemandChart
          type="line"
          data={trending.map(t => ({ name: t.skill, value: parseFloat(t.avgGrowthRate) }))}
          title="Trending Skills (Growth Rate %)"
          dataKey="value"
          nameKey="name"
        />
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Skill Demand Percentage</h3>
          <div className="space-y-3">
            {skills.slice(0, 8).map((skill, index) => (
              <SkillBar
                key={skill.skill}
                skill={skill.skill}
                percentage={parseFloat(skill.percentage)}
                color={['blue', 'green', 'purple', 'orange', 'red', 'indigo'][index % 6]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Course Recommendations Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-emerald-500">🎯</span> High Priority Training Courses
          </h3>
          <ul className="space-y-2.5">
            {stats?.highPriorityCourses?.map((course, index) => (
              <li key={index} className="flex items-center text-sm font-semibold text-gray-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                <span className="text-emerald-600 font-bold mr-2">✓</span>
                {course}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-red-500">⚠️</span> Oversupplied / High Training Seats
          </h3>
          <ul className="space-y-2.5">
            {stats?.oversuppliedCourses?.map((course, index) => (
              <li key={index} className="flex items-center text-sm font-semibold text-gray-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                <span className="text-amber-600 font-bold mr-2">!</span>
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndustryDemand;
