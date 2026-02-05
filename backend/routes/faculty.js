const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public Routes

// Get all active faculty
router.get('/', async (req, res) => {
  try {
    const { department, search } = req.query;
    
    let query = { isActive: true };
    
    if (department) {
      query.department = department;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const faculty = await Faculty.find(query)
      .select('-__v')
      .sort({ order: 1, name: 1 });
    
    res.json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single faculty member
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).select('-__v');
    
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    
    res.json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin Routes

// Get all faculty (including inactive)
router.get('/admin/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const faculty = await Faculty.find({})
      .sort({ order: 1, name: 1 });
    
    res.json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add faculty member
router.post('/admin/add', auth, upload.single('photo'), async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const facultyData = {
      ...req.body,
      photo: req.file ? `/uploads/${req.file.filename}` : ''
    };
    
    const faculty = new Faculty(facultyData);
    await faculty.save();
    
    res.status(201).json({
      success: true,
      message: 'Faculty member added successfully',
      data: faculty
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update faculty member
router.put('/admin/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }
    
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    
    res.json({
      success: true,
      message: 'Faculty member updated successfully',
      data: faculty
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete faculty member
router.delete('/admin/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    
    res.json({
      success: true,
      message: 'Faculty member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
