const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: 'IT & Software'
  },
  marketDemandLevel: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW'],
    default: 'MEDIUM'
  },
  marketDemandCount: {
    type: Number,
    default: 500
  },
  trainingSupplyLevel: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW'],
    default: 'MEDIUM'
  },
  trainingSupplyCount: {
    type: Number,
    default: 500
  },
  enrolled: {
    type: Number,
    default: 1000
  },
  completionRate: {
    type: Number,
    default: 75
  },
  curriculum: [
    {
      type: String,
      trim: true
    }
  ],
  industryRequirements: [
    {
      type: String,
      trim: true
    }
  ],
  status: {
    type: String,
    enum: ['HIGH PRIORITY', 'HEALTHY', 'OVERSUPPLIED', 'OBSOLETE', 'NEEDS CURRICULUM UPDATE'],
    default: 'HEALTHY'
  },
  recommendation: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
