import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  PlusCircle,
  Trash2,
  Edit3,
  Award,
  ArrowRight,
  CheckCircle,
  X,
  Sparkles,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateStudentSkill, removeStudentSkill, getAllSkills } from '../services/api';

const MySkills = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [availableSkillsList, setAvailableSkillsList] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkillsCatalog();
  }, []);

  useEffect(() => {
    if (user) {
      const levels = user.skillLevels || (user.currentSkills || []).map(s => ({
        skill: s,
        level: s === 'Python' ? 'Advanced' : 'Intermediate'
      }));
      setSkillLevels(levels);
    }
  }, [user]);

  const fetchSkillsCatalog = async () => {
    try {
      const res = await getAllSkills();
      setAvailableSkillsList(res.data || []);
    } catch (err) {
      console.error('Error fetching skills catalog:', err);
    }
  };

  const handleAddOrUpdateSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    try {
      setLoading(true);
      const updatedUser = await updateStudentSkill(newSkillName.trim(), newSkillLevel);
      await updateProfile(updatedUser);
      setShowAddModal(false);
      setNewSkillName('');
      setNewSkillLevel('Intermediate');
    } catch (err) {
      console.error('Failed to add skill:', err);
      alert('Failed to update skill.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (skillName) => {
    if (!window.confirm(`Are you sure you want to remove ${skillName} from your skills?`)) return;

    try {
      setLoading(true);
      const updatedUser = await removeStudentSkill(skillName);
      await updateProfile(updatedUser);
    } catch (err) {
      console.error('Failed to remove skill:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'Advanced':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-3 py-1 rounded-full text-xs">Advanced</span>;
      case 'Intermediate':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 font-extrabold px-3 py-1 rounded-full text-xs">Intermediate</span>;
      case 'Beginner':
      default:
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 font-extrabold px-3 py-1 rounded-full text-xs">Beginner</span>;
    }
  };

  const filteredCatalog = availableSkillsList.filter(s =>
    s.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !(user?.currentSkills || []).includes(s)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" />
            My Skills & Competencies
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your skill portfolio, set proficiency levels, and prepare for career assessments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl transition-colors shadow self-start md:self-auto"
        >
          <PlusCircle size={18} />
          <span>+ Add Skill</span>
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(user?.currentSkills || []).map((skillName) => {
          const lvlItem = skillLevels.find(l => l.skill.toLowerCase() === skillName.toLowerCase());
          const level = lvlItem ? lvlItem.level : 'Intermediate';

          return (
            <div key={skillName} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{skillName}</h3>
                  {getLevelBadge(level)}
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Proficiency status: <strong className="text-gray-700">{level}</strong>. Verified in student portfolio.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => navigate(`/skill-assessment?skill=${encodeURIComponent(skillName)}`)}
                  className="flex items-center gap-1.5 text-blue-600 font-bold hover:underline"
                >
                  <Sparkles size={14} />
                  <span>Take Quiz</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setNewSkillName(skillName);
                      setNewSkillLevel(level);
                      setShowAddModal(true);
                    }}
                    className="text-gray-400 hover:text-blue-600 p-1"
                    title="Edit Level"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleRemoveSkill(skillName)}
                    className="text-gray-400 hover:text-red-600 p-1"
                    title="Remove Skill"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(!user?.currentSkills || user.currentSkills.length === 0) && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 text-gray-500">
          <BookOpen size={36} className="mx-auto mb-3 text-gray-400" />
          <p className="text-base font-semibold">No skills added yet.</p>
          <p className="text-xs mt-1">Click "+ Add Skill" above to start building your profile skills.</p>
        </div>
      )}

      {/* Connection CTA to Skill Gap & Assessment */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Award className="text-amber-400" />
            Ready to test your skills?
          </h3>
          <p className="text-xs text-blue-200 mt-1">
            Complete a 5-question skill quiz to automatically verify and upgrade your proficiency level!
          </p>
        </div>
        <button
          onClick={() => navigate('/skill-assessment')}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Start Skill Assessment</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Add / Edit Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Add or Update Skill</h2>

            <form onSubmit={handleAddOrUpdateSkill} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, Node.js, Python"
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                />

                {/* Quick Catalog Suggestions */}
                <div className="relative mb-2">
                  <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:outline-none"
                  />
                </div>

                <div className="max-h-32 overflow-y-auto flex flex-wrap gap-1.5 p-1 border border-gray-100 rounded-lg bg-gray-50/50">
                  {filteredCatalog.slice(0, 10).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewSkillName(s)}
                      className="bg-white hover:bg-blue-50 border border-gray-200 px-2.5 py-1 rounded text-xs text-gray-700 font-medium"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Proficiency Level</label>
                <select
                  value={newSkillLevel}
                  onChange={e => setNewSkillLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySkills;
