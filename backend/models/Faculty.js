const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: [
      'Hindi Literature',
      'History',
      'Political Science',
      'Geography',
      'Economics',
      'English Literature',
      'Home Science',
      'Sociology',
      'Commerce',
      'Business Administration',
      'Computer Science',
      'Physical Education',
      'Library'
    ]
  },
  photo: {
    type: String,
    default: ''
  },
  experience: {
    type: String,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  achievements: [{
    type: String,
    trim: true
  }],
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for searching
facultySchema.index({ name: 'text', department: 'text' });

module.exports = mongoose.model('Faculty', facultySchema);
