const express = require('express');
const router = express.Router();
const Alumna = require('../models/Alumna');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public Routes

// Get featured alumnae for home page
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const alumnae = await Alumna.find({ 
      status: 'verified', 
      isFeatured: true,
      isActive: true 
    })
    .select('-verificationNotes -__v')
    .limit(limit)
    .sort({ verifiedAt: -1 });
    
    res.json({ success: true, data: alumnae });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all verified alumna with filters
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
    
    const alumnae = await Alumna.find(query)
      .select('-verificationNotes -__v')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ passoutYear: -1, lastName: 1 });
    
    const total = await Alumna.countDocuments(query);
    
    res.json({
      success: true,
      data: alumna,
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

// Get single alumna profile
router.get('/:id', async (req, res) => {
  try {
    const alumna = await Alumna.findById(req.params.id)
      .select('-verificationNotes -__v');
    
    if (!alumna) {
      return res.status(404).json({ success: false, message: 'alumna not found' });
    }
    
    // Only show if verified (unless admin)
    if (alumna.status !== 'verified' && !req.user?.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Profile not available' });
    }
    
    res.json({ success: true, data: alumna });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Check if email is already registered
router.get('/check-registration/:email', async (req, res) => {
  try {
    const alumnae = await Alumna.findOne({ email: req.params.email.toLowerCase() });
    
    if (alumna) {
      return res.json({ 
        success: true, 
        exists: true, 
        status: Alumna.status 
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
    const existing = await Alumna.findOne({ email: req.body.email.toLowerCase() });
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
    
    const alumnae = new alumna(alumniData);
    await Alumna.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Admin will verify your profile.',
      data: { alumniId: Alumna._id }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update own profile (for self-registered alumna)
router.put('/:id', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const alumna = await Alumna.findById(req.params.id);
    
    if (!alumna) {
      return res.status(404).json({ success: false, message: 'alumna not found' });
    }
    
    // Only allow self-registered alumna to update their own profile
    if (alumna.registrationType !== 'self-registered') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only self-registered profiles can be updated by alumna' 
      });
    }
    
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }
    
    // Remove fields that shouldn't be updated by alumna
    delete updateData.status;
    delete updateData.isFeatured;
    delete updateData.verificationNotes;
    delete updateData.registrationType;
    
    Object.assign(alumna, updateData);
    await alumna.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: alumna
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
    
    const alumnae = await Alumna.find({ status: 'pending' })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: alumnae });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add alumna manually (admin only)
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
    
    const alumnae = new alumna(alumniData);
    await Alumna.save();
    
    res.status(201).json({
      success: true,
      message: 'alumna added successfully',
      data: alumna
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Verify alumna registration
router.patch('/admin/:id/verify', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumnae = await Alumna.findByIdAndUpdate(
      req.params.id,
      {
        status: 'verified',
        verifiedAt: new Date(),
        verificationNotes: req.body.verificationNotes || ''
      },
      { new: true }
    );
    
    if (!alumna) {
      return res.status(404).json({ success: false, message: 'alumna not found' });
    }
    
    res.json({
      success: true,
      message: 'alumna verified successfully',
      data: alumna
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject alumna registration
router.patch('/admin/:id/reject', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumnae = await Alumna.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        verificationNotes: req.body.verificationNotes || ''
      },
      { new: true }
    );
    
    if (!alumna) {
      return res.status(404).json({ success: false, message: 'alumna not found' });
    }
    
    res.json({
      success: true,
      message: 'alumna registration rejected',
      data: alumna
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
    
    const alumnae = await Alumna.findById(req.params.id);
    
    if (!alumna) {
      return res.status(404).json({ success: false, message: 'alumna not found' });
    }
    
    Alumna.isFeatured = req.body.isFeatured;
    await Alumna.save();
    
    res.json({
      success: true,
      message: `alumna ${Alumna.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: alumna
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete alumna (admin only)
router.delete('/admin/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const alumnae = await Alumna.findByIdAndDelete(req.params.id);
    
    if (!alumna) {
      return res.status(404).json({ success: false, message: 'alumna not found' });
    }
    
    res.json({
      success: true,
      message: 'alumna deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;


