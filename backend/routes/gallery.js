const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all gallery images (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;

    const images = await Gallery.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery images',
      error: error.message
    });
  }
});

// Upload gallery image (admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const galleryData = {
      ...req.body,
      image: `/uploads/${req.file.filename}`
    };

    const gallery = new Gallery(galleryData);
    await gallery.save();

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: gallery
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
});

// Update gallery image (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      });
    }

    res.json({
      success: true,
      message: 'Gallery image updated successfully',
      data: gallery
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating gallery image',
      error: error.message
    });
  }
});

// Delete gallery image (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      });
    }

    res.json({
      success: true,
      message: 'Gallery image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting gallery image',
      error: error.message
    });
  }
});

module.exports = router;
