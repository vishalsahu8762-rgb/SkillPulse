import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  CheckCircle,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { getStudentWorkspace } from '../services/api';

const StudentProgress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);
  const [learningItems, setLearningItems] = useState([
    { id: 1, title: 'Learn React Fundamentals & Components', status: 'In Progress' },
    { id: 2, title: 'Master State Management (Redux/Context)', status: 'Not Started' },
    { id: 3, title: 'Build Express & Node.js REST API', status: 'Not Started' },
    { id: 4, title: 'MongoDB Database Design & Mongoose', status: 'Not Started' },
    { id: 5, title: 'Deploy Cloud App on AWS EC2', status: 'Not Started' },
    { id: 6, title: 'Python Syntax & Data Structures', status: 'Completed' },
    { id: 7, title: 'SQL Queries & Joins', status: 'Completed' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const res = await getStudentWorkspace();
      setWorkspace(res.data);
    } catch (err) {
      console.error('Failed to load progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = (itemId) => {
    setLearningItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextStatus = item.status === 'Completed' ? 'Not Started' : item.status === 'In Progress' ? 'Completed' : 'In Progress';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const getLevelPct = (level) => {
    if (level === 'Advanced') return 100;
    if (level === 'Intermediate') return 70;
    return 40;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const readiness = workspace?.readinessScore || 72;
  const completedCount = learningItems.filter(i => i.status === 'Completed').length;
  const inProgressCount = learningItems.filter(i => i.status === 'In Progress').length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="text-blue-600" />
          Personalized Career Readiness & Progress
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Track your skill level growth, assessment history, and curriculum learning milestones.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Career Readiness Score"
          value={`${readiness}%`}
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Skills Verified"
          value={workspace?.currentSkills?.length?.toString() || '4'}
          icon={CheckCircle}
          color="blue"
        />
        <StatCard
          title="Learning Milestones"
          value={`${completedCount} / ${learningItems.length}`}
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Target Role"
          value={user?.targetRole || 'Full Stack Developer'}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Career Readiness Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider block">
            Consistent Readiness Score Calculation
          </span>
          <h3 className="text-2xl font-bold">Career Readiness: {readiness}%</h3>
          <p className="text-xs text-emerald-100">
            You match <strong>{readiness}%</strong> of the recommended skills and proficiency standards for your target career (<strong>{user?.targetRole || 'Full Stack Developer'}</strong>).
          </p>
        </div>

        <button
          onClick={() => navigate('/learning-path')}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Continue Learning Path</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Skill Progress Bars */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-100">
          <BookOpen size={20} className="text-blue-600" />
          Skill Proficiency Breakdown
        </h3>

        <div className="space-y-4">
          {(workspace?.skillLevels || []).map((item, idx) => {
            const pct = getLevelPct(item.level);
            return (
              <div key={idx}>
                <div className="flex justify-between items-center text-sm font-semibold mb-1">
                  <span className="text-gray-900 font-bold">{item.skill}</span>
                  <span className="text-gray-600 font-mono text-xs">{item.level} ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 80 ? '#10B981' : pct >= 60 ? '#3B82F6' : '#F59E0B'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Milestones Checklist */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle size={20} className="text-emerald-600" />
          Learning Milestones Checklist
        </h3>

        <div className="space-y-3">
          {learningItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleStatusToggle(item.id)}
              className="p-4 rounded-xl border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                  item.status === 'Completed'
                    ? 'bg-emerald-500 text-white'
                    : item.status === 'In Progress'
                    ? 'bg-blue-500 text-white'
                    : 'border border-gray-300 text-gray-400'
                }`}>
                  {item.status === 'Completed' ? '✓' : item.status === 'In Progress' ? '•' : ''}
                </div>
                <span className={`text-sm font-semibold ${item.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {item.title}
                </span>
              </div>

              <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                item.status === 'Completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : item.status === 'In Progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
