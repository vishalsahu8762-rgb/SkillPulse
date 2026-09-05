import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  MapPin,
  Check,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentJobMatches } from '../services/api';

const JobMatch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobMatches, setJobMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobMatches();
  }, []);

  const fetchJobMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getStudentJobMatches();
      setJobMatches(res.data || []);
    } catch (err) {
      console.error('Failed to load job matches:', err);
      setError('Failed to load job matches.');
    } finally {
      setLoading(false);
    }
  };

  const getMatchBadge = (pct) => {
    if (pct >= 80) {
      return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-3 py-1 rounded-full text-xs">{pct}% MATCH</span>;
    }
    if (pct >= 60) {
      return <span className="bg-blue-100 text-blue-800 border border-blue-300 font-extrabold px-3 py-1 rounded-full text-xs">{pct}% MATCH</span>;
    }
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
          <Briefcase className="text-blue-600" />
          Job Match & Skill Alignment
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Automated evaluation of your skills against live regional job postings. Formula: Match % = (Matching Skills / Total Required Skills) × 100.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobMatches.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-2 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                    <span className="flex items-center gap-1 font-semibold">
                      <Building2 size={14} className="text-gray-400" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-orange-500" />
                      {job.district}
                    </span>
                  </div>
                </div>
                {getMatchBadge(job.matchPercentage)}
              </div>

              {/* Progress bar */}
              <div className="my-4 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${job.matchPercentage}%`,
                    backgroundColor: job.matchPercentage >= 80 ? '#10B981' : job.matchPercentage >= 60 ? '#3B82F6' : '#F59E0B'
                  }}
                />
              </div>

              {/* Matching Skills */}
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase block">Matching Skills ({job.matchingSkills.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.matchingSkills.map((sk, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <Check size={12} className="text-emerald-600" /> {sk}
                    </span>
                  ))}
                  {job.matchingSkills.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No matching skills yet.</span>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-800 uppercase block">Missing Required Skills ({job.missingSkills.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.missingSkills.map((sk, idx) => (
                    <span key={idx} className="bg-red-50 text-red-800 border border-red-200 px-2.5 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <PlusCircle size={12} className="text-red-500" /> {sk}
                    </span>
                  ))}
                  {job.missingSkills.length === 0 && (
                    <span className="text-xs text-emerald-600 font-bold">✓ 100% Skills Matched!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 font-mono">Salary: {job.salaryRange}</span>
              <button
                onClick={() => navigate('/skill-gap')}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg transition-colors text-xs"
              >
                <span>Analyze Skill Gap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {jobMatches.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 text-gray-500">
          No matching jobs found.
        </div>
      )}
    </div>
  );
};

export default JobMatch;
