import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  LineChart
} from 'lucide-react';
import { getTrendingSkills, getDemandSkills } from '../services/api';

const IndustryTrends = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [demandSkills, setDemandSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      const [trendRes, demandRes] = await Promise.all([
        getTrendingSkills(),
        getDemandSkills()
      ]);
      setTrending(trendRes.data || []);
      setDemandSkills(demandRes.data || []);
    } catch (err) {
      console.error('Failed to load industry trends:', err);
    } finally {
      setLoading(false);
    }
  };

  const skillsToWatch = [
    { skill: 'Cloud Computing (AWS / DevOps)', reason: 'Surging demand in Bhopal & Indore tech corridors', priority: 'HIGH' },
    { skill: 'React & MERN Stack', reason: 'Top requested skill in regional software startup hiring', priority: 'HIGH' },
    { skill: 'Python for Data Science', reason: 'High growth rate (+25% YoY) across analytics firms', priority: 'HIGH' },
    { skill: 'Industrial PLC Automation', reason: 'Critical skill shortage in Jabalpur manufacturing belt', priority: 'HIGH' }
  ];

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-blue-600" />
          Industry Trends & Skill Insights
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Explore real-world market trends to decide which skills to learn next for maximum career growth.
        </p>
      </div>

      {/* Trending Skills Grid */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Flame className="text-amber-500" />
          Top Trending Skills by Growth Rate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trending.map((t, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-900 text-base">{t.skill}</span>
                  <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <LineChart size={12} /> +{t.avgGrowthRate}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  High market trajectory with strong hiring growth across IT & analytics sectors.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                <span className="text-blue-600 font-semibold">Trend: Rising 🔥</span>
                <button
                  onClick={() => navigate(`/skill-assessment?skill=${encodeURIComponent(t.skill)}`)}
                  className="text-gray-700 hover:text-blue-600 font-bold flex items-center gap-1"
                >
                  <span>Quiz</span> <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills to Watch Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Sparkles size={22} className="text-amber-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Skills to Watch for Career Growth</h3>
            <p className="text-blue-200 text-xs mt-0.5">
              High-impact skills recommended by regional industry analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsToWatch.map((item, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base text-white">{item.skill}</h4>
                  <span className="bg-amber-400 text-slate-900 font-black text-xs px-2.5 py-0.5 rounded-full">
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-blue-100">{item.reason}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => navigate('/learning-path')}
                  className="text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-1"
                >
                  <span>View Learning Path</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryTrends;
