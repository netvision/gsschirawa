const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
  phone: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  
  // Academic Information
  courseName: {
    type: String,
    required: true,
    enum: ['B.A.', 'B.Com', 'M.A. Hindi', 'M.A. English', 'M.A. Economics', 'M.A. Political Science', 'M.A. History', 'M.A./M.Sc. Geography']
  },
  specialization: {
    type: String,
    required: true
  },
  passoutYear: {
    type: Number,
    required: true,
    min: 1987,
    max: new Date().getFullYear()
  },
  batch: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    trim: true
  },
  
  // Career Information
  currentDesignation: {
    type: String,
    required: true,
    trim: true
  },
  currentCompany: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    enum: ['IT & Technology', 'Banking & Finance', 'Education', 'Healthcare', 'Government', 'NGO/Social Work', 'Business/Entrepreneurship', 'Media & Entertainment', 'Law', 'Research & Development', 'Other']
  },
  yearsOfExperience: {
    type: Number,
    default: 0,
    min: 0
  },
  linkedinProfile: {
    type: String,
    trim: true
  },
  websitePortfolio: {
    type: String,
    trim: true
  },
  
  // Alumni Story/Achievement
  story: {
    type: String,
    required: true,
    minlength: 100
  },
  achievements: [{
    type: String,
    trim: true
  }],
  successTips: {
    type: String,
    trim: true
  },
  
  // Status & Verification
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  verificationNotes: {
    type: String,
    trim: true
  },
  
  // Registration Info
  registrationType: {
    type: String,
    enum: ['self-registered', 'admin-added'],
    default: 'self-registered'
  },
  
  // Metadata
  tags: [{
    type: String,
    enum: ['Entrepreneur', 'Corporate Leader', 'Academic', 'Social Worker', 'Government Officer', 'Researcher', 'Creative Professional']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  verifiedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for search
alumniSchema.index({ firstName: 'text', lastName: 'text', currentCompany: 'text' });

// Virtual for full name
alumniSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to check if alumni can be publicly displayed
alumniSchema.methods.isPublic = function() {
  return this.status === 'verified' && this.isActive;
};

module.exports = mongoose.model('Alumni', alumniSchema);
