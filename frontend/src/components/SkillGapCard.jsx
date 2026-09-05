import React from 'react';

const SkillGapCard = ({ matchedSkills, missingSkills, gapLevels }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skill Gap Analysis</h3>
      
      {/* Matched Skills */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-green-700 mb-3 flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Matched Skills ({matchedSkills.length})
        </h4>
        {matchedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No matched skills</p>
        )}
      </div>

      {/* Missing Skills by Priority */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-red-700 mb-3 flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          Missing Skills ({missingSkills.length})
        </h4>
        
        {/* High Priority */}
        {gapLevels.high.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-semibold text-red-600 mb-2 uppercase tracking-wide">
              HIGH PRIORITY
            </div>
            <div className="flex flex-wrap gap-2">
              {gapLevels.high.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium border border-red-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority */}
        {gapLevels.medium.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-semibold text-orange-600 mb-2 uppercase tracking-wide">
              MEDIUM PRIORITY
            </div>
            <div className="flex flex-wrap gap-2">
              {gapLevels.medium.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Low Priority */}
        {gapLevels.low.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-yellow-600 mb-2 uppercase tracking-wide">
              LOW PRIORITY
            </div>
            <div className="flex flex-wrap gap-2">
              {gapLevels.low.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium border border-yellow-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {missingSkills.length === 0 && (
          <p className="text-gray-500 text-sm">No missing skills - you're ready!</p>
        )}
      </div>
    </div>
  );
};

export default SkillGapCard;
