import React from 'react';

const ReadinessProgress = ({ readinessScore, currentReadiness, expectedReadiness }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Needs Improvement';
  };

  const getScoreTextColor = (score) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-yellow-700';
    if (score >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Readiness Score</h3>
      
      {/* Current Readiness */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Current Readiness</span>
          <span className={`text-2xl font-bold ${getScoreTextColor(readinessScore)}`}>
            {readinessScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`${getScoreColor(readinessScore)} h-4 rounded-full transition-all duration-500`}
            style={{ width: `${readinessScore}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Status: <span className={`font-semibold ${getScoreTextColor(readinessScore)}`}>
            {getScoreLabel(readinessScore)}
          </span>
        </div>
      </div>

      {/* Expected Readiness */}
      {expectedReadiness && expectedReadiness !== readinessScore && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Expected Readiness After Path</span>
            <span className={`text-2xl font-bold ${getScoreTextColor(expectedReadiness)}`}>
              {expectedReadiness}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`${getScoreColor(expectedReadiness)} h-4 rounded-full transition-all duration-500`}
              style={{ width: `${expectedReadiness}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Status: <span className={`font-semibold ${getScoreTextColor(expectedReadiness)}`}>
              {getScoreLabel(expectedReadiness)}
            </span>
          </div>
          <div className="mt-3 text-sm text-blue-600 font-medium">
            Improvement: +{expectedReadiness - readinessScore}%
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadinessProgress;
