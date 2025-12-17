import express from 'express';
import User from '../models/User.js';
import Dua from '../models/Dua.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/duas/save
// @desc    Save a personal dua (not linked to a specific name)
// @access  Private
router.post('/save', protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Dua text is required' });
    }

    const user = await User.findById(req.user._id);
    user.savedDuas.push({
      text: text.trim(),
      date: new Date(),
    });

    await user.save();

    res.status(201).json({
      message: 'Dua saved successfully',
      savedDuas: user.savedDuas,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/duas/:duaId
// @desc    Delete a saved personal dua
// @access  Private
router.delete('/:duaId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedDuas = user.savedDuas.filter(
      (dua) => dua._id.toString() !== req.params.duaId
    );

    await user.save();

    res.json({
      message: 'Dua deleted successfully',
      savedDuas: user.savedDuas,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/duas/favorite
// @desc    Toggle favorite name
// @access  Private
router.post('/favorite', protect, async (req, res) => {
  try {
    const { nameId } = req.body;

    if (!nameId) {
      return res.status(400).json({ message: 'Name ID is required' });
    }

    const user = await User.findById(req.user._id);
    const index = user.favoriteNames.indexOf(nameId);

    if (index > -1) {
      user.favoriteNames.splice(index, 1);
    } else {
      user.favoriteNames.push(nameId);
    }

    await user.save();

    res.json({
      message: 'Favorite updated',
      favoriteNames: user.favoriteNames,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/duas/name
// @desc    Add a dua for a specific name (user contributed)
// @access  Private
router.post('/name', protect, async (req, res) => {
  try {
    const { nameId, text } = req.body;
    if (!nameId || !text || !text.trim()) {
      return res.status(400).json({ message: 'Name ID and dua text are required' });
    }

    const dua = await Dua.create({
      nameId,
      text: text.trim(),
      createdBy: req.user._id,
      source: 'user',
    });

    res.status(201).json({
      message: 'Dua added successfully',
      dua,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/duas/name/:nameId/random
// @desc    Get a random dua for a specific name (public)
// @access  Public
router.get('/name/:nameId/random', async (req, res) => {
  try {
    const nameId = Number(req.params.nameId);
    if (!nameId) {
      return res.status(400).json({ message: 'Invalid name ID' });
    }

    const [dua] = await Dua.aggregate([
      { $match: { nameId } },
      { $sample: { size: 1 } },
    ]);

    if (!dua) {
      return res.status(404).json({ message: 'No dua found for this name' });
    }

    res.json({
      dua,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/duas/name/:nameId
// @desc    List all duas for a specific name (public)
// @access  Public
router.get('/name/:nameId', async (req, res) => {
  try {
    const nameId = Number(req.params.nameId);
    if (!nameId) {
      return res.status(400).json({ message: 'Invalid name ID' });
    }

    const duas = await Dua.find({ nameId }).sort({ createdAt: -1 });
    res.json({ duas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

