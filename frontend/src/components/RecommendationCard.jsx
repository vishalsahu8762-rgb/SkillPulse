import React from 'react';

const RecommendationCard = ({ learningPath, totalDuration, message }) => {
  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-orange-100 text-orange-700 border-orange-300',
      low: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    };
    return styles[priority] || styles.low;
  };

  const getLevelBadge = (level) => {
    const styles = {
      Beginner: 'bg-green-100 text-green-700',
      Intermediate: 'bg-blue-100 text-blue-700',
      Advanced: 'bg-purple-100 text-purple-700'
    };
    return styles[level] || styles.Beginner;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Recommendations</h3>
      
      {message && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">{message}</p>
        </div>
      )}

      {learningPath.length > 0 ? (
        <div className="space-y-3">
          {learningPath.map((module, index) => (
            <div
              key={`${module.skill}-${module.title}-${index}`}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
                    <h4 className="text-md font-medium text-gray-800">{module.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{module.skill}</span>
                    <span>•</span>
                    <span>{module.duration}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityBadge(module.priority)}`}
                  >
                    {module.priority.toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getLevelBadge(module.level)}`}
                  >
                    {module.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-gray-600">No learning modules needed!</p>
        </div>
      )}

      {totalDuration && learningPath.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total Duration:</span>
            <span className="text-lg font-bold text-blue-600">{totalDuration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
