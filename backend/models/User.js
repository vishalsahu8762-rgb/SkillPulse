const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['TRAINEE', 'EMPLOYER', 'ADMIN'],
    default: 'TRAINEE'
  },
  // Trainee specific fields
  district: {
    type: String,
    default: 'Bhopal'
  },
  currentSkills: [
    {
      type: String,
      trim: true
    }
  ],
  targetRole: {
    type: String,
    default: 'Full Stack Developer'
  },
  // Employer specific fields
  companyName: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    default: 'IT Services'
  },
  hiringRoles: [
    {
      type: String,
      trim: true
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
