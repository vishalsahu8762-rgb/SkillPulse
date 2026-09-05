import React from 'react';

const SkillSelector = ({ availableSkills, selectedSkills, onSkillToggle, label = 'Select Skills' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{label}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableSkills.map(skill => (
          <button
            key={skill}
            onClick={() => onSkillToggle(skill)}
            className={`px-3 py-2 rounded-lg border-2 transition-all ${
              selectedSkills.includes(skill)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{skill}</span>
              {selectedSkills.includes(skill) && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
      </div>
    </div>
  );
};

export default SkillSelector;
