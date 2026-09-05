import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Building2,
  TrendingUp,
  AlertTriangle,
  Award,
  BookOpen,
  Filter,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import StatCard from '../components/StatCard';
import { getDistricts, getDistrictAnalysis } from '../services/api';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

const DistrictPlanner = () => {
  const [districtsList, setDistrictsList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('Bhopal');
  const [selectedIndustry, setSelectedIndustry] = useState('ALL');
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialDistricts();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      loadDistrictData(selectedDistrict, selectedIndustry);
    }
  }, [selectedDistrict, selectedIndustry]);

  const fetchInitialDistricts = async () => {
    try {
      const res = await getDistricts();
      if (res.data && res.data.length > 0) {
        setDistrictsList(res.data);
      }
    } catch (err) {
      console.error('Failed to load districts list:', err);
    }
  };

  const loadDistrictData = async (districtName, industryFilter) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getDistrictAnalysis(districtName, { industry: industryFilter });
      setDistrictData(res.data);
    } catch (err) {
      console.error('Error fetching district analysis:', err);
      setError('Failed to load district data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getShortageBadge = (classification) => {
    switch (classification) {
      case 'HIGH SHORTAGE':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300 flex items-center gap-1 w-max">
            <AlertTriangle size={12} /> HIGH SHORTAGE
          </span>
        );
      case 'MODERATE SHORTAGE':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-max">
            ⚠️ MODERATE SHORTAGE
          </span>
        );
      case 'OVERSUPPLIED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-800 border border-gray-400 flex items-center gap-1 w-max">
            ⛔ OVERSUPPLIED
          </span>
        );
      case 'BALANCED':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
            <CheckCircle size={12} /> BALANCED
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
      case 'HIGH PRIORITY':
        return <span className="text-xs font-bold bg-red-600 text-white px-2.5 py-0.5 rounded-full">HIGH PRIORITY</span>;
      case 'MODERATE':
      case 'MODERATE PRIORITY':
        return <span className="text-xs font-bold bg-amber-500 text-white px-2.5 py-0.5 rounded-full">MODERATE</span>;
      default:
        return <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">BALANCED</span>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="text-orange-500" />
          District-wise Skill Demand Planner
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Convert regional job market demand into district-level training priorities and course recommendations.
        </p>
      </div>

      {/* Visual Workflow Pipeline Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-xl p-4 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] text-xs font-semibold">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <MapPin size={14} className="text-orange-400" />
            <span>1. DISTRICT</span>
          </div>
          <ArrowRight size={14} className="text-gray-400" />
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <Building2 size={14} className="text-blue-400" />
            <span>2. INDUSTRY DEMAND</span>
          </div>
          <ArrowRight size={14} className="text-gray-400" />
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <TrendingUp size={14} className="text-emerald-400" />
            <span>3. SKILL DEMAND</span>
          </div>
          <ArrowRight size={14} className="text-gray-400" />
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <AlertTriangle size={14} className="text-amber-400" />
            <span>4. SKILL SHORTAGE</span>
          </div>
          <ArrowRight size={14} className="text-gray-400" />
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <Award size={14} className="text-purple-400" />
            <span>5. TRAINING PRIORITY</span>
          </div>
          <ArrowRight size={14} className="text-gray-400" />
          <div className="flex items-center gap-2 bg-amber-500 text-slate-900 px-3 py-1.5 rounded-lg font-bold shadow">
            <Sparkles size={14} />
            <span>6. RECOMMENDED COURSE</span>
          </div>
        </div>
      </div>

      {/* 1. DISTRICT SELECTION BAR */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <MapPin size={16} className="text-orange-500" />
              Select Target District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'].map(d => (
                <option key={d} value={d}>{d} District</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Filter size={16} className="text-blue-500" />
              Industry Sector Filter
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Industries</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Manufacturing">Manufacturing & Automation</option>
              <option value="Healthcare">Healthcare & Pharma</option>
              <option value="Logistics">Logistics & Supply Chain</option>
              <option value="Tourism">Tourism & Hospitality</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => loadDistrictData(selectedDistrict, selectedIndustry)}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <BarChart3 size={18} />
              <span>Analyze District</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-md border border-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Computing demand vs training capacity for {selectedDistrict}...</p>
        </div>
      ) : districtData ? (
        <div className="space-y-6">
          {/* 2. DISTRICT DEMAND OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Top Industry"
              value={districtData.summary.topIndustry}
              icon={Building2}
              color="blue"
            />
            <StatCard
              title="Overall Training Priority"
              value={districtData.summary.overallPriority}
              icon={Award}
              color={districtData.summary.overallPriority === 'HIGH' ? 'red' : 'green'}
            />
            <StatCard
              title="Critical Skill Shortages"
              value={`${districtData.summary.highShortageCount} Skills`}
              icon={AlertTriangle}
              color="orange"
            />
            <StatCard
              title="Recommended Courses"
              value={`${districtData.summary.recommendedProgramsCount} Programs`}
              icon={BookOpen}
              color="purple"
            />
          </div>

          {/* 3 & 4. TOP SKILLS & INDUSTRY-WISE DEMAND */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3. Top Skills in District */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-600" />
                  Top Demanded Skills in {districtData.district}
                </span>
                <span className="text-xs text-gray-500 font-normal">Demand Score %</span>
              </h3>

              <div className="space-y-4 my-2">
                {districtData.skills.slice(0, 5).map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-sm font-medium mb-1">
                      <span className="text-gray-800 font-semibold">{s.name}</span>
                      <span className="text-gray-600 font-mono font-bold">{s.demandScore}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(s.demandScore, 100)}%`,
                          backgroundColor: COLORS[idx % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Industry-wise Demand */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-blue-600" />
                Industry Sectors in {districtData.district}
              </h3>

              <div className="space-y-3">
                {districtData.industries.map((ind, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 flex flex-col justify-between gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{ind.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        ind.demandLevel === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {ind.demandLevel} DEMAND ({ind.demandScore})
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
                      <span className="font-semibold text-gray-500">Key Skills:</span>
                      {ind.topSkills.map((sk, sIdx) => (
                        <span key={sIdx} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 & 6. SKILL SHORTAGE ANALYSIS & TRAINING PRIORITY MATRIX */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle size={22} className="text-amber-500" />
                Skill Shortage & Training Capacity Analysis
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                Formula: Shortage Score = Industry Demand - Current Training Capacity
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50 text-xs font-bold text-gray-600 uppercase border-b border-gray-200">
                    <th className="p-3.5">Skill Name</th>
                    <th className="p-3.5">Industry Sector</th>
                    <th className="p-3.5">Demand Score</th>
                    <th className="p-3.5">Training Capacity</th>
                    <th className="p-3.5">Shortage Gap</th>
                    <th className="p-3.5">Classification</th>
                    <th className="p-3.5">Action Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {districtData.skills.map((s, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-gray-800">{s.name}</td>
                      <td className="p-3.5 text-gray-600">{s.industry}</td>
                      <td className="p-3.5 font-mono font-bold text-blue-600">{s.demandScore}</td>
                      <td className="p-3.5 font-mono text-gray-600">{s.trainingCapacity}</td>
                      <td className="p-3.5 font-mono font-bold text-red-600">
                        {s.shortage > 0 ? `+${s.shortage}` : s.shortage}
                      </td>
                      <td className="p-3.5">{getShortageBadge(s.shortageClassification)}</td>
                      <td className="p-3.5 text-xs font-medium text-gray-700">{s.actionRecommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. RECOMMENDED COURSES / TRAINING PROGRAMS */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-amber-400">
              <Sparkles size={22} />
              Recommended Training Programs for {districtData.district}
            </h3>
            <p className="text-xs text-blue-200 mb-6">
              Prioritized course interventions based on local shortage gaps and industry demand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {districtData.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 flex flex-col justify-between hover:bg-white/15 transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h4 className="font-bold text-base text-white">{course.name}</h4>
                      {getPriorityBadge(course.priority)}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {course.relatedSkills.map((sk, sIdx) => (
                        <span key={sIdx} className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded text-xs">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="bg-black/20 p-3 rounded-lg text-xs text-gray-200 border border-white/5 my-2">
                      <strong className="text-amber-300 block mb-0.5">Rationale:</strong>
                      {course.reason}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-300">
                    <span>Demand Index: <strong className="text-white font-mono">{course.demandScore}</strong></span>
                    <span className="text-emerald-400 font-medium">Ready for Rollout</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. REGIONAL DISTRICT COMPARISON CHART */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-600" />
              Regional Demand Score Comparison (MP Districts)
            </h3>
            <p className="text-xs text-gray-500 mb-4">Overall job market demand index across key districts</p>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={districtData.comparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="overallDemandScore" fill="#3B82F6">
                  {districtData.comparison.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.district === selectedDistrict ? '#F97316' : '#3B82F6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DistrictPlanner;
