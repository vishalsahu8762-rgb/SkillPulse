import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  TrendingUp,
  Check,
  PlusCircle,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentCareers } from '../services/api';

const Careers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [careersList, setCareersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await getStudentCareers();
      setCareersList(res.data || []);
    } catch (err) {
      console.error('Failed to load careers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMatchBadge = (pct) => {
    if (pct >= 80) return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-3 py-1 rounded-full text-xs">{pct}% MATCH</span>;
    if (pct >= 60) return <span className="bg-blue-100 text-blue-800 border border-blue-300 font-extrabold px-3 py-1 rounded-full text-xs">{pct}% MATCH</span>;
    return <span className="bg-amber-100 text-amber-800 border border-amber-300 font-extrabold px-3 py-1 rounded-full text-xs">{pct}% MATCH</span>;
  };

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
          <Compass className="text-blue-600" />
          Career Pathway Exploration
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Explore key tech careers, analyze your current skill alignment, and identify target learning paths.
        </p>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careersList.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-2 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                    {c.demandLevel} DEMAND • {c.avgSalary}
                  </span>
                </div>
                {getMatchBadge(c.matchPercentage)}
              </div>

              <p className="text-xs text-gray-600 my-3 leading-relaxed">
                {c.description}
              </p>

              {/* Matching Skills */}
              <div className="space-y-1.5 mb-3">
                <span className="text-xs font-bold text-emerald-800 uppercase block">Matched Skills ({c.matchingSkills.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.matchingSkills.map((sk, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <Check size={12} className="text-emerald-600" /> {sk}
                    </span>
                  ))}
                  {c.matchingSkills.length === 0 && <span className="text-xs text-gray-400 italic">None matched yet.</span>}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-red-800 uppercase block">Missing Skills to Learn ({c.missingSkills.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.missingSkills.map((sk, idx) => (
                    <span key={idx} className="bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <PlusCircle size={12} className="text-red-500" /> {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => navigate('/skill-gap')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs shadow"
              >
                <span>View Career Skill Gap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
