import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  ArrowRight,
  Filter,
  Layers,
  X
} from 'lucide-react';
import { getCourses, addCourse } from '../services/api';

const CourseAnalysis = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Course Form State
  const [newCourse, setNewCourse] = useState({
    name: '',
    category: 'IT & Software',
    marketDemandLevel: 'HIGH',
    marketDemandCount: 1000,
    trainingSupplyLevel: 'LOW',
    trainingSupplyCount: 300,
    curriculum: '',
    industryRequirements: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Failed to load courses. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name.trim()) return;

    try {
      const payload = {
        ...newCourse,
        marketDemandCount: Number(newCourse.marketDemandCount),
        trainingSupplyCount: Number(newCourse.trainingSupplyCount),
        curriculum: newCourse.curriculum.split(',').map(s => s.trim()).filter(Boolean),
        industryRequirements: newCourse.industryRequirements.split(',').map(s => s.trim()).filter(Boolean)
      };

      await addCourse(payload);
      setShowAddModal(false);
      setNewCourse({
        name: '',
        category: 'IT & Software',
        marketDemandLevel: 'HIGH',
        marketDemandCount: 1000,
        trainingSupplyLevel: 'LOW',
        trainingSupplyCount: 300,
        curriculum: '',
        industryRequirements: ''
      });
      fetchCourses();
    } catch (err) {
      console.error('Failed to create course:', err);
      alert('Failed to add new course. Please try again.');
    }
  };

  const filteredCourses = statusFilter === 'ALL'
    ? courses
    : courses.filter(c => c.status === statusFilter);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'HIGH PRIORITY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            🔥 HIGH PRIORITY
          </span>
        );
      case 'OVERSUPPLIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            ⚠️ OVERSUPPLIED
          </span>
        );
      case 'OBSOLETE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-800 border border-gray-400">
            ⛔ OBSOLETE
          </span>
        );
      case 'NEEDS CURRICULUM UPDATE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            🔄 NEEDS CURRICULUM UPDATE
          </span>
        );
      case 'HEALTHY':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ✅ HEALTHY
          </span>
        );
    }
  };

  const getDemandBadge = (level) => {
    const l = level?.toUpperCase() || 'MEDIUM';
    if (l === 'HIGH') return <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">HIGH</span>;
    if (l === 'LOW') return <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">LOW</span>;
    return <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">MEDIUM</span>;
  };

  const getSupplyBadge = (level) => {
    const l = level?.toUpperCase() || 'MEDIUM';
    if (l === 'HIGH') return <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">HIGH</span>;
    if (l === 'LOW') return <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">LOW</span>;
    return <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">MEDIUM</span>;
  };

  const totalHighPriority = courses.filter(c => c.status === 'HIGH PRIORITY').length;
  const totalOversupplied = courses.filter(c => c.status === 'OVERSUPPLIED' || c.status === 'OBSOLETE').length;
  const totalNeedsUpdate = courses.filter(c => c.status === 'NEEDS CURRICULUM UPDATE').length;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" />
            Course Analysis & Capacity Detector
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Rule-based detection of obsolete, oversupplied, and high-priority training courses.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm self-start md:self-auto"
        >
          <PlusCircle size={20} />
          <span>Add New Course</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Courses</p>
            <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">High Priority</p>
            <p className="text-2xl font-bold text-red-600">{totalHighPriority}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Oversupplied / Obsolete</p>
            <p className="text-2xl font-bold text-amber-600">{totalOversupplied}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Needs Update</p>
            <p className="text-2xl font-bold text-purple-600">{totalNeedsUpdate}</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-700 font-medium w-full md:w-auto">
          <Filter size={18} className="text-blue-600" />
          <span>Filter by Status:</span>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { label: 'All', value: 'ALL' },
            { label: 'High Priority', value: 'HIGH PRIORITY' },
            { label: 'Oversupplied', value: 'OVERSUPPLIED' },
            { label: 'Obsolete', value: 'OBSOLETE' },
            { label: 'Needs Update', value: 'NEEDS CURRICULUM UPDATE' },
            { label: 'Healthy', value: 'HEALTHY' }
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course._id || course.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">{course.name}</h3>
                </div>
                {getStatusBadge(course.status)}
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-lg p-3 my-4 border border-gray-100">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">Market Demand</span>
                  <div className="flex items-center gap-1.5">
                    {getDemandBadge(course.marketDemandLevel)}
                    <span className="text-xs text-gray-500 font-mono">({course.marketDemandCount})</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-500 block mb-1">Training Supply</span>
                  <div className="flex items-center gap-1.5">
                    {getSupplyBadge(course.trainingSupplyLevel)}
                    <span className="text-xs text-gray-500 font-mono">({course.trainingSupplyCount})</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-500 block mb-1">Demand/Supply Ratio</span>
                  <span className="text-sm font-bold text-gray-800 font-mono">
                    {course.demandSupplyRatio || (course.marketDemandCount / (course.trainingSupplyCount || 1)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="bg-slate-50 border-l-4 border-blue-500 p-3.5 rounded-r-lg my-3">
                <span className="text-xs font-bold text-gray-700 block uppercase mb-0.5">Recommendation:</span>
                <p className="text-sm text-gray-600">{course.recommendation}</p>
              </div>

              {/* Current Curriculum tags */}
              {course.curriculum && course.curriculum.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-semibold text-gray-500 block mb-1.5">Current Curriculum Topics:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.curriculum.map((topic, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => navigate(`/curriculum-analyzer?courseId=${course._id || course.id}`)}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <span>Analyze Curriculum</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200 text-gray-500">
          No courses found matching the selected filter.
        </div>
      )}

      {/* Add New Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Course for Analysis</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Course Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Security Architecture"
                  value={newCourse.name}
                  onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={newCourse.category}
                    onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Market Demand</label>
                  <select
                    value={newCourse.marketDemandLevel}
                    onChange={e => setNewCourse({ ...newCourse, marketDemandLevel: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Demand Count</label>
                  <input
                    type="number"
                    value={newCourse.marketDemandCount}
                    onChange={e => setNewCourse({ ...newCourse, marketDemandCount: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Training Supply</label>
                  <select
                    value={newCourse.trainingSupplyLevel}
                    onChange={e => setNewCourse({ ...newCourse, trainingSupplyLevel: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Supply Count</label>
                <input
                  type="number"
                  value={newCourse.trainingSupplyCount}
                  onChange={e => setNewCourse({ ...newCourse, trainingSupplyCount: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Current Curriculum Topics (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="HTML, CSS, JavaScript, PHP"
                  value={newCourse.curriculum}
                  onChange={e => setNewCourse({ ...newCourse, curriculum: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Industry Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="JavaScript, React, Node.js, Docker, AWS"
                  value={newCourse.industryRequirements}
                  onChange={e => setNewCourse({ ...newCourse, industryRequirements: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Save & Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAnalysis;
