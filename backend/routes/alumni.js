const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public Routes

// Get featured alumni for home page
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const alumni = await Alumni.find({ 
      status: 'verified', 
      isFeatured: true,
      isActive: true 
    })
    .select('-verificationNotes -__v')
    .limit(limit)
    .sort({ verifiedAt: -1 });
    
    res.json({ success: true, data: alumni });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all verified alumni with filters
router.get('/', async (req, res) => {
  try {
    const { search, year, industry, company, limit = 20, page = 1 } = req.query;
    
    let query = { status: 'verified', isActive: true };
    
    // Search by name or company
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by year
    if (year) {
      query.passoutYear = parseInt(year);
    }
    
    // Filter by industry
    if (industry) {
      query.industry = industry;
    }
    
    // Filter by company
    if (company) {
      query.currentCompany = new RegExp(company, 'i');
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const alumni = await Alumni.find(query)
      .select('-verificationNotes -__v')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ passoutYear: -1, lastName: 1 });
    
    const total = await Alumni.countDocuments(query);
    
    res.json({
      success: true,
      data: alumni,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single alumni profile
router.get('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id)
      .select('-verificationNotes -__v');
    
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    
    // Only show if verified (unless admin)
    if (alumni.status !== 'verified' && !req.user?.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Profile not available' });
    }
    
    res.json({ success: true, data: alumni });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Check if email is already registered
router.get('/check-registration/:email', async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ email: req.params.email.toLowerCase() });
    
    if (alumni) {
      return res.json({ 
        success: true, 
        exists: true, 
        status: alumni.status 
      });
    }
    
    res.json({ success: true, exists: false });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Self-Registration
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    // Check if email already exists
    const existing = await Alumni.findOne({ email: req.body.email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }
    
    const alumniData = {
      ...req.body,
      profileImage: req.file ? `/uploads/${req.file.filename}` : '',
      registrationType: 'self-registered',
      status: 'pending'
    };
    
    const alumni = new Alumni(alumniData);
    await alumni.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Admin will verify your profile.',
      data: { alumniId: alumni._id }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update own profile (for self-registered alumni)
router.put('/:id', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    
    // Only allow self-registered alumni to update their own profile
    if (alumni.registrationType !== 'self-registered') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only self-registered profiles can be updated by alumni' 
      });
    }
    
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }
    
    // Remove fields that shouldn't be updated by alumni
    delete updateData.status;
    delete updateData.isFeatured;
    delete updateData.verificationNotes;
    delete updateData.registrationType;
    
    Object.assign(alumni, updateData);
    await alumni.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: alumni
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin Routes (Protected)

// Get all pending registrations
router.get('/admin/pending', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumni = await Alumni.find({ status: 'pending' })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: alumni });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add alumni manually (admin only)
router.post('/admin/add', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumniData = {
      ...req.body,
      profileImage: req.file ? `/uploads/${req.file.filename}` : '',
      registrationType: 'admin-added',
      status: 'verified',
      verifiedAt: new Date()
    };
    
    const alumni = new Alumni(alumniData);
    await alumni.save();
    
    res.status(201).json({
      success: true,
      message: 'Alumni added successfully',
      data: alumni
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Verify alumni registration
router.patch('/admin/:id/verify', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      {
        status: 'verified',
        verifiedAt: new Date(),
        verificationNotes: req.body.verificationNotes || ''
      },
      { new: true }
    );
    
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    
    res.json({
      success: true,
      message: 'Alumni verified successfully',
      data: alumni
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject alumni registration
router.patch('/admin/:id/reject', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        verificationNotes: req.body.verificationNotes || ''
      },
      { new: true }
    );
    
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    
    res.json({
      success: true,
      message: 'Alumni registration rejected',
      data: alumni
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Toggle featured status
router.patch('/admin/:id/feature', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumni = await Alumni.findById(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    
    alumni.isFeatured = req.body.isFeatured;
    await alumni.save();
    
    res.json({
      success: true,
      message: `Alumni ${alumni.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: alumni
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete alumni (admin only)
router.delete('/admin/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    
    res.json({
      success: true,
      message: 'Alumni deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
