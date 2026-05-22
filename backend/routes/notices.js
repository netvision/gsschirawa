const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all active notices (public)
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find({
      isActive: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } }
      ]
    }).sort({ priority: -1, createdAt: -1 });

    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notices',
      error: error.message
    });
  }
});

// Get all notices (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notices',
      error: error.message
    });
  }
});

// Get a single active notice (public)
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findOne({
      _id: req.params.id,
      isActive: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } }
      ]
    });

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notice',
      error: error.message
    });
  }
});

// Create notice (admin only)
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const noticeData = {
      ...req.body,
      file: req.file ? `/uploads/${req.file.filename}` : null
    };

    const notice = new Notice(noticeData);
    await notice.save();

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating notice',
      error: error.message
    });
  }
});

// Update notice (admin only)
router.put('/:id', auth, upload.single('file'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.file = `/uploads/${req.file.filename}`;
    }

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating notice',
      error: error.message
    });
  }
});

// Delete notice (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting notice',
      error: error.message
    });
  }
});

module.exports = router;
