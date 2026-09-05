import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  PlusCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import {
  getCourses,
  analyzeCurriculum,
  acceptCurriculumRecommendation,
  rejectCurriculumRecommendation
} from '../services/api';

const CurriculumAnalyzer = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get('courseId') || '';

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchCourseList();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      runAnalysis(selectedCourseId);
    } else if (courses.length > 0) {
      setSelectedCourseId(courses[0]._id || courses[0].id);
    }
  }, [selectedCourseId, courses]);

  const fetchCourseList = async () => {
    try {
      const res = await getCourses();
      const list = res.data || [];
      setCourses(list);
      if (!initialCourseId && list.length > 0) {
        setSelectedCourseId(list[0]._id || list[0].id);
      }
    } catch (err) {
      console.error('Failed to load courses for analyzer:', err);
    }
  };

  const runAnalysis = async (courseId) => {
    try {
      setLoading(true);
      setNotification(null);
      const res = await analyzeCurriculum(courseId);
      setAnalysisData(res.data);
    } catch (err) {
      console.error('Failed to analyze curriculum:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!selectedCourseId) return;

    try {
      setActionLoading(true);
      const res = await acceptCurriculumRecommendation(selectedCourseId);
      setNotification({
        type: 'success',
        message: res.message || 'Curriculum recommendation accepted and successfully updated in MongoDB!'
      });
      // Refresh course list and analysis
      fetchCourseList();
      runAnalysis(selectedCourseId);
    } catch (err) {
      console.error('Error accepting recommendation:', err);
      setNotification({
        type: 'error',
        message: 'Failed to accept recommendation. Please try again.'
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedCourseId) return;

    try {
      setActionLoading(true);
      await rejectCurriculumRecommendation(selectedCourseId);
      setNotification({
        type: 'info',
        message: 'Curriculum recommendation rejected. No changes were applied to the course.'
      });
    } catch (err) {
      console.error('Error rejecting recommendation:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="text-amber-500" />
          Curriculum Analyzer
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Evaluate and align course curriculum with real-world industry requirements.
        </p>
      </div>

      {/* Course Selection Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
          Select Course for Curriculum Analysis
        </label>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {courses.map((course) => (
              <option key={course._id || course.id} value={course._id || course.id}>
                {course.name} ({course.category})
              </option>
            ))}
          </select>

          <button
            onClick={() => runAnalysis(selectedCourseId)}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span>Re-analyze</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-lg border flex items-center justify-between ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : notification.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-800'
              : 'bg-blue-50 border-blue-300 text-blue-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle size={20} className="text-emerald-600" />}
            {notification.type === 'error' && <X size={20} className="text-red-600" />}
            {notification.type === 'info' && <BookOpen size={20} className="text-blue-600" />}
            <span className="font-medium">{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Analyzing course curriculum against industry benchmarks...</p>
        </div>
      ) : analysisData ? (
        <div className="space-y-6">
          {/* Main Comparison Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Curriculum */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                Current Course Curriculum
              </h3>
              <div className="space-y-2">
                {analysisData.currentCurriculum.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <span className="font-medium text-gray-800">{skill}</span>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">Taught Module</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Requirements */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Sparkles size={20} className="text-amber-500" />
                Industry Required Skills
              </h3>
              <div className="space-y-2">
                {analysisData.industryRequirements.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100"
                  >
                    <span className="font-medium text-blue-900">{skill}</span>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">High Demand</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categorized Match Breakdown */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Alignment & Gap Breakdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MATCHED */}
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-3 pb-2 border-b border-emerald-200">
                  <CheckCircle size={20} className="text-emerald-600" />
                  <span>MATCHED ({analysisData.matched.length})</span>
                </div>
                {analysisData.matched.length > 0 ? (
                  <div className="space-y-2">
                    {analysisData.matched.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-emerald-900 bg-white p-2.5 rounded-lg border border-emerald-100 text-sm font-medium">
                        <Check size={16} className="text-emerald-600" />
                        <span>✓ {skill}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-700 italic">No skills currently matched with industry standards.</p>
                )}
              </div>

              {/* MISSING */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 font-bold mb-3 pb-2 border-b border-blue-200">
                  <PlusCircle size={20} className="text-blue-600" />
                  <span>MISSING ({analysisData.missing.length})</span>
                </div>
                {analysisData.missing.length > 0 ? (
                  <div className="space-y-2">
                    {analysisData.missing.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-blue-900 bg-white p-2.5 rounded-lg border border-blue-100 text-sm font-medium">
                        <PlusCircle size={16} className="text-blue-600" />
                        <span>➕ {skill}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-blue-700 italic">No missing skills detected!</p>
                )}
              </div>

              {/* LOW RELEVANCE */}
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800 font-bold mb-3 pb-2 border-b border-amber-200">
                  <AlertTriangle size={20} className="text-amber-600" />
                  <span>LOW RELEVANCE ({analysisData.lowRelevance.length})</span>
                </div>
                {analysisData.lowRelevance.length > 0 ? (
                  <div className="space-y-2">
                    {analysisData.lowRelevance.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-amber-900 bg-white p-2.5 rounded-lg border border-amber-100 text-sm font-medium">
                        <AlertTriangle size={16} className="text-amber-600" />
                        <span>⚠️ {skill}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-amber-700 italic">No outdated/low-relevance modules found.</p>
                )}
              </div>
            </div>
          </div>

          {/* RECOMMENDATION ENGINE PANEL */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Sparkles size={24} className="text-amber-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Industry-Aligned Curriculum Recommendation</h3>
                <p className="text-blue-200 text-sm mt-0.5">
                  Automated rule-based curriculum optimization engine based on current market demands.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 my-6 border border-white/10">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
                Proposed Curriculum Action Plan:
              </h4>

              <div className="space-y-3">
                {analysisData.missing.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-emerald-300">
                    <span className="bg-emerald-500/20 text-emerald-300 p-1 rounded">➕</span>
                    <span>Add <strong className="text-white">{skill}</strong> to core curriculum</span>
                  </div>
                ))}

                {analysisData.lowRelevance.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-amber-300">
                    <span className="bg-amber-500/20 text-amber-300 p-1 rounded">⚠️</span>
                    <span>Review / Phase out low-demand module: <strong className="text-white">{skill}</strong></span>
                  </div>
                ))}

                {analysisData.missing.length === 0 && analysisData.lowRelevance.length === 0 && (
                  <div className="text-emerald-300 font-medium">
                    ✓ Course curriculum is already 100% aligned with industry expectations!
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleAccept}
                disabled={actionLoading || (analysisData.missing.length === 0 && analysisData.lowRelevance.length === 0)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={20} />
                <span>Accept Recommendation</span>
              </button>

              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors border border-gray-600"
              >
                <X size={20} />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CurriculumAnalyzer;
