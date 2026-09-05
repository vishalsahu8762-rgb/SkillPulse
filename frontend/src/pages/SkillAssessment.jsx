import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAssessmentQuestions, submitAssessment } from '../services/api';

const SkillAssessment = () => {
  const [searchParams] = useSearchParams();
  const initialSkill = searchParams.get('skill') || 'Python';

  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const [selectedSkill, setSelectedSkill] = useState(initialSkill);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const availableSkills = ['Python', 'JavaScript', 'React', 'SQL', 'Cloud Computing'];

  useEffect(() => {
    loadQuestions(selectedSkill);
  }, [selectedSkill]);

  const loadQuestions = async (skillName) => {
    try {
      setLoading(true);
      setQuizResult(null);
      setUserAnswers({});
      const res = await getAssessmentQuestions(skillName);
      setQuestionData(res.data);
    } catch (err) {
      console.error('Failed to load assessment questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (!questionData) return;

    try {
      setSubmitting(true);
      const res = await submitAssessment(selectedSkill, userAnswers);
      setQuizResult(res.data);
      if (res.data?.user) {
        await updateProfile(res.data.user);
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="text-amber-500" />
            Skill Assessment Quiz
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Test your knowledge to calculate your verified proficiency level and update your portfolio.
          </p>
        </div>
      </div>

      {/* Skill Selector Dropdown */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-800 font-bold w-full md:w-auto">
          <BookOpen size={20} className="text-blue-600" />
          <span>Select Skill to Assess:</span>
        </div>

        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-xl px-4 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {availableSkills.map(sk => (
            <option key={sk} value={sk}>{sk} Quiz</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto mb-3"></div>
          <p className="text-gray-600 font-medium text-sm">Loading quiz questions for {selectedSkill}...</p>
        </div>
      ) : quizResult ? (
        /* QUIZ RESULT PANEL */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto">
            <CheckCircle size={36} />
          </div>

          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">
              Assessment Completed ✓
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">{selectedSkill} Assessment</h2>
            <p className="text-sm text-gray-500 mt-1">Rule-based scoring: 0-39% = Beginner | 40-69% = Intermediate | 70-100% = Advanced</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <span className="text-xs text-gray-500 block uppercase">Correct Answers</span>
              <span className="text-2xl font-black text-gray-800">{quizResult.score} / {quizResult.totalQuestions}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block uppercase">Score %</span>
              <span className="text-2xl font-black text-blue-600">{quizResult.percentage}%</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block uppercase">Calculated Level</span>
              <span className="text-xl font-black text-emerald-600">{quizResult.level}</span>
            </div>
          </div>

          <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl max-w-lg mx-auto">
            {quizResult.message}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/my-skills')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow flex items-center gap-2"
            >
              <span>View My Skills</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => loadQuestions(selectedSkill)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      ) : questionData ? (
        /* QUIZ FORM */
        <form onSubmit={handleSubmitQuiz} className="space-y-6">
          {questionData.questions.map((q, qIdx) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-base flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-1 rounded-md shrink-0">
                  Q{qIdx + 1}
                </span>
                <span>{q.question}</span>
              </h3>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <label
                    key={optIdx}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      userAnswers[q.id] === optIdx
                        ? 'bg-blue-50 border-blue-500 font-semibold text-blue-900'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      checked={userAnswers[q.id] === optIdx}
                      onChange={() => handleOptionSelect(q.id, optIdx)}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting || Object.keys(userAnswers).length < questionData.questions.length}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Submit Assessment</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default SkillAssessment;
