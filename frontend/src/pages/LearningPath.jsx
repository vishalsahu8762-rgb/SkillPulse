import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import LearningPathComponent from '../components/LearningPath';
import { useNavigate } from 'react-router-dom';
import { analyzeSkills, getSkillRecommendations } from '../services/api';

const LearningPath = () => {
  const navigate = useNavigate();
  const [learningPathData, setLearningPathData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if there's stored analysis data from Skill Gap page
    const storedAnalysis = sessionStorage.getItem('skillGapAnalysis');
    if (storedAnalysis) {
      try {
        const analysis = JSON.parse(storedAnalysis);
        if (analysis.recommendations) {
          setLearningPathData(analysis.recommendations);
        }
      } catch (error) {
        console.error('Error parsing stored analysis:', error);
      }
    }
  }, []);

  const handleBackToSkillGap = () => {
    navigate('/skill-gap');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-blue-600" />
              Personalized Learning Path
            </h1>
            <p className="text-sm text-orange-600 font-medium mt-1">⚠️ PROTOTYPE DATA - Rule-based recommendations for demonstration</p>
          </div>
          <button
            onClick={handleBackToSkillGap}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Skill Gap</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!learningPathData ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-12">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Learning Path Available</h3>
            <p className="text-gray-600 mb-6">
              Complete the Skill Gap Analysis first to get your personalized learning path.
            </p>
            <button
              onClick={handleBackToSkillGap}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Skill Gap Analysis
            </button>
          </div>
        </div>
      ) : (
        <LearningPathComponent
          learningPath={learningPathData.learningPath}
          currentReadiness={learningPathData.currentReadiness}
          expectedReadiness={learningPathData.expectedReadiness}
          totalDuration={learningPathData.totalDuration}
        />
      )}
    </div>
  );
};

export default LearningPath;
