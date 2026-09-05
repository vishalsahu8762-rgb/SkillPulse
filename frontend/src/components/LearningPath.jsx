import React from 'react';

const LearningPath = ({ learningPath, currentReadiness, expectedReadiness, totalDuration }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-red-500 bg-red-50',
      medium: 'border-orange-500 bg-orange-50',
      low: 'border-yellow-500 bg-yellow-50'
    };
    return colors[priority] || colors.low;
  };

  const getPriorityDot = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-orange-500',
      low: 'bg-yellow-500'
    };
    return colors[priority] || colors.low;
  };

  if (!learningPath || learningPath.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Path</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-gray-600">You have all the required skills!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personalized Learning Path</h3>
      
      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Current Readiness</div>
            <div className="text-2xl font-bold text-blue-600">{currentReadiness}%</div>
          </div>
          <div className="text-3xl">→</div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Expected Readiness</div>
            <div className="text-2xl font-bold text-purple-600">{expectedReadiness}%</div>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          Total Duration: <span className="font-semibold text-gray-800">{totalDuration}</span>
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="space-y-4">
        {learningPath.map((module, index) => (
          <div
            key={`${module.skill}-${module.title}-${index}`}
            className={`relative pl-8 pb-4 ${index !== learningPath.length - 1 ? 'border-l-2 border-gray-200' : ''}`}
          >
            {/* Timeline Dot */}
            <div
              className={`absolute left-0 top-0 w-4 h-4 rounded-full ${getPriorityDot(module.priority)} border-2 border-white shadow`}
            ></div>

            {/* Module Card */}
            <div className={`p-4 rounded-lg border-l-4 ${getPriorityColor(module.priority)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">Step {index + 1}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                      {module.level}
                    </span>
                  </div>
                  <h4 className="text-md font-semibold text-gray-800">{module.title}</h4>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="text-gray-400">📚</span>
                      {module.skill}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-400">⏱️</span>
                      {module.duration}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded ${
                    module.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : module.priority === 'medium'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {module.priority.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <div>
            <div className="text-sm font-semibold text-green-800">Complete this path to achieve</div>
            <div className="text-lg font-bold text-green-700">{expectedReadiness}% readiness</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
