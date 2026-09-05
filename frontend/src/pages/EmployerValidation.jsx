import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Users,
  Award,
  PlusCircle,
  X,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  BookOpen
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import StatCard from '../components/StatCard';
import {
  getEmployers,
  getSkillValidation,
  getCourseValidation,
  submitEmployerValidation
} from '../services/api';

import { useAuth } from '../context/AuthContext';

const EmployerValidation = () => {
  const { user } = useAuth();
  const [summaryData, setSummaryData] = useState({
    totalEmployers: 24,
    validatedSkills: 42,
    needsIndustryUpdate: 8,
    employerResponses: 31
  });
  const [employersList, setEmployersList] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedRole, setSelectedRole] = useState(
    user?.role === 'EMPLOYER' && user?.hiringRoles?.[0] ? user.hiringRoles[0] : 'Full Stack Developer'
  );
  const [roleSkills, setRoleSkills] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [coursesValidation, setCoursesValidation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState(null);

  // Form State initialized from logged-in Employer context
  const [formData, setFormData] = useState({
    employerName: user?.companyName || user?.name || '',
    industry: user?.industry || 'IT Services',
    district: user?.district || 'Bhopal',
    jobRole: user?.hiringRoles?.[0] || 'Full Stack Developer',
    skillPriority: 'Essential',
    courseRelevance: 'Highly Relevant',
    feedback: ''
  });

  useEffect(() => {
    if (user?.role === 'EMPLOYER') {
      setFormData(prev => ({
        ...prev,
        employerName: user.companyName || user.name || prev.employerName,
        industry: user.industry || prev.industry,
        district: user.district || prev.district,
        jobRole: user.hiringRoles?.[0] || prev.jobRole
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchPageData();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      loadRoleSkills(selectedRole);
    }
  }, [selectedRole]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [empRes, coursesRes] = await Promise.all([
        getEmployers(),
        getCourseValidation()
      ]);

      if (empRes.summary) {
        setSummaryData(empRes.summary);
      }
      setEmployersList(empRes.data || []);
      if (empRes.data && empRes.data.length > 0) {
        setSelectedEmployer(empRes.data[0]);
      }

      setCoursesValidation(coursesRes.data || []);
    } catch (err) {
      console.error('Failed to load employer validation data:', err);
      setError('Failed to load employer validation data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const loadRoleSkills = async (roleName) => {
    try {
      const res = await getSkillValidation(roleName);
      if (res.data) {
        setRoleSkills(res.data.skills || []);
        if (res.data.availableRoles) {
          setAvailableRoles(res.data.availableRoles);
        }
        if (res.data.chartData) {
          setChartData(res.data.chartData);
        }
      }
    } catch (err) {
      console.error('Failed to load role skills:', err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employerName.trim()) {
      alert('Please enter Employer Name');
      return;
    }

    try {
      const res = await submitEmployerValidation(formData);
      setSubmitSuccessMsg(res.message || 'Employer validation submitted successfully.');
      setShowFeedbackModal(false);

      // Reset form
      setFormData({
        employerName: '',
        industry: 'IT Services',
        district: 'Bhopal',
        jobRole: 'Full Stack Developer',
        skillPriority: 'Essential',
        courseRelevance: 'Highly Relevant',
        feedback: ''
      });

      // Refresh data
      fetchPageData();
      loadRoleSkills(selectedRole);

      // Clear success notification after 5s
      setTimeout(() => {
        setSubmitSuccessMsg(null);
      }, 5000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Failed to submit validation. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'VALIDATED':
      case 'Validated':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
            <CheckCircle size={12} /> VALIDATED
          </span>
        );
      case 'NEEDS UPDATE':
      case 'Needs Update':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
            <AlertTriangle size={12} /> NEEDS UPDATE
          </span>
        );
      case 'LOW RELEVANCE':
      case 'Pending':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-800 border border-gray-400 inline-flex items-center gap-1">
            ⛔ LOW RELEVANCE
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="text-red-600" />
            Employer Validation & Industry Feedback
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Verify skill requirements, course relevance, and job-readiness standards with industry employers.
          </p>
        </div>

        <button
          onClick={() => setShowFeedbackModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-lg transition-colors shadow self-start md:self-auto"
        >
          <PlusCircle size={18} />
          <span>Submit Employer Feedback</span>
        </button>
      </div>

      {/* Success Banner */}
      {submitSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle size={20} className="text-emerald-600" />
            <span>{submitSuccessMsg}</span>
          </div>
          <button onClick={() => setSubmitSuccessMsg(null)} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* 1. DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Employers"
          value={summaryData.totalEmployers.toString()}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Validated Skills"
          value={summaryData.validatedSkills.toString()}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Needs Industry Update"
          value={summaryData.needsIndustryUpdate.toString()}
          icon={AlertTriangle}
          color="orange"
        />
        <StatCard
          title="Employer Responses"
          value={summaryData.employerResponses.toString()}
          icon={MessageSquare}
          color="purple"
        />
      </div>

      {/* 2. EMPLOYER LIST TABLE */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users size={22} className="text-blue-600" />
            Participating Employer Partners
          </h3>
          <span className="text-xs text-gray-500 font-mono">Showing {employersList.length} employers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-600 uppercase border-b border-gray-200">
                <th className="p-3.5">Employer Name</th>
                <th className="p-3.5">Industry</th>
                <th className="p-3.5">District</th>
                <th className="p-3.5">Hiring Roles</th>
                <th className="p-3.5">Responses</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {employersList.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployer(emp)}
                  className={`cursor-pointer transition-colors ${
                    selectedEmployer?.id === emp.id ? 'bg-red-50/60 font-semibold' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="p-3.5 font-bold text-gray-800 flex items-center gap-2">
                    <Building2 size={16} className="text-gray-400" />
                    <span>{emp.name}</span>
                  </td>
                  <td className="p-3.5 text-gray-600">{emp.industry}</td>
                  <td className="p-3.5 text-gray-600">{emp.district}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {emp.hiringRoles.map((role, rIdx) => (
                        <span key={rIdx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-gray-800">{emp.responsesCount}</td>
                  <td className="p-3.5">{getStatusBadge(emp.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SKILL VALIDATION BY ROLE */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Award size={22} className="text-amber-500" />
              Employer Skill Validation Matrix
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Rule-based scoring: Score ≥ 80 = VALIDATED | 50-79 = NEEDS UPDATE | &lt; 50 = LOW RELEVANCE
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase">Select Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {availableRoles.length > 0 ? (
                availableRoles.map(r => <option key={r} value={r}>{r}</option>)
              ) : (
                <option value="Full Stack Developer">Full Stack Developer</option>
              )}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-600 uppercase border-b border-gray-200">
                <th className="p-3.5">Skill Name</th>
                <th className="p-3.5">Industry Demand Score</th>
                <th className="p-3.5">Employer Validation Score</th>
                <th className="p-3.5">Validation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {roleSkills.map((sk, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-gray-800">{sk.skill}</td>
                  <td className="p-3.5 font-mono text-blue-600 font-bold">{sk.industryDemand}%</td>
                  <td className="p-3.5 font-mono text-emerald-600 font-bold">{sk.validationScore}%</td>
                  <td className="p-3.5">{getStatusBadge(sk.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. COURSE VALIDATION BY EMPLOYERS */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={22} className="text-purple-600" />
          Employer Course & Job-Readiness Assessments
        </h3>

        <div className="space-y-4">
          {coursesValidation.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-bold text-gray-800 text-base">{c.courseName}</h4>
                  <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded">
                    {c.industry}
                  </span>
                  {getStatusBadge(c.status)}
                </div>

                <p className="text-sm text-gray-600 italic mt-1 bg-white p-3 rounded-lg border border-gray-100">
                  "{c.comment}"
                </p>
              </div>

              <div className="md:text-right shrink-0">
                <span className="text-xs text-gray-500 block uppercase">Employer Assessment</span>
                <span className="text-sm font-bold text-emerald-700">{c.assessment} ({c.validationScore}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. VALIDATION SUMMARY CHART */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <ThumbsUp size={20} className="text-blue-600" />
          Aggregated Employer Skill Validation Scores vs Industry Demand
        </h3>
        <p className="text-xs text-gray-500 mb-4">Comparative view of industry demand scores vs verified employer consensus</p>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="demandScore" name="Industry Demand %" fill="#3B82F6" />
            <Bar dataKey="validationScore" name="Employer Validation %" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 7. INDUSTRY FEEDBACK IMPACT & RECOMMENDATIONS */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 text-white rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-600 rounded-lg">
            <Sparkles size={22} className="text-amber-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Industry-Validated Recommendations</h3>
            <p className="text-red-200 text-xs mt-0.5">
              How verified employer feedback updates platform training priorities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-sm font-medium">
          <div className="bg-white/10 p-3.5 rounded-lg border border-white/10 flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-lg">✓</span>
            <span>Add Cloud Computing & DevOps modules to core Full Stack curriculum</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-lg border border-white/10 flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-lg">✓</span>
            <span>Increase Python for Data Analytics intake capacity in Bhopal & Indore</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-lg border border-white/10 flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-lg">✓</span>
            <span>Update React course with Redux/Zustand state management standards</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-lg border border-white/10 flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-lg">✓</span>
            <span>Introduce practical SQL & database project modules across all IT courses</span>
          </div>
        </div>
      </div>

      {/* 4. EMPLOYER FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Submit Employer Skill Validation</h2>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Employer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bhopal IT Solutions Ltd"
                  value={formData.employerName}
                  onChange={e => setFormData({ ...formData, employerName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">District</label>
                  <select
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Bhopal">Bhopal</option>
                    <option value="Indore">Indore</option>
                    <option value="Jabalpur">Jabalpur</option>
                    <option value="Gwalior">Gwalior</option>
                    <option value="Ujjain">Ujjain</option>
                    <option value="Sagar">Sagar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Job Role</label>
                <select
                  value={formData.jobRole}
                  onChange={e => setFormData({ ...formData, jobRole: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="PLC Automation Engineer">PLC Automation Engineer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Skill Priority</label>
                  <select
                    value={formData.skillPriority}
                    onChange={e => setFormData({ ...formData, skillPriority: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Essential">Essential</option>
                    <option value="Important">Important</option>
                    <option value="Useful">Useful</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Course Relevance</label>
                  <select
                    value={formData.courseRelevance}
                    onChange={e => setFormData({ ...formData, courseRelevance: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Highly Relevant">Highly Relevant</option>
                    <option value="Relevant">Relevant</option>
                    <option value="Needs Update">Needs Update</option>
                    <option value="Not Relevant">Not Relevant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Additional Feedback</label>
                <textarea
                  rows="3"
                  placeholder="Provide details on skill gaps or curriculum recommendations..."
                  value={formData.feedback}
                  onChange={e => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow"
                >
                  Submit Validation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerValidation;
