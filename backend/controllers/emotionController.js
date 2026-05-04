const Emotion = require('../models/Emotion');

// @desc    Get logged in user's emotions
// @route   GET /api/emotions
// @access  Private
exports.getEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.find({ user: req.user.id }).sort('-timestamp');
    
    res.status(200).json({
      success: true,
      count: emotions.length,
      data: emotions
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Save emotion data
// @route   POST /api/emotions
// @access  Private
exports.saveEmotion = async (req, res) => {
  try {
    const { emotion, confidence } = req.body;

    if (!emotion || confidence === undefined) {
      return res.status(400).json({ success: false, error: 'Please provide emotion and confidence' });
    }

    const newEmotion = await Emotion.create({
      user: req.user.id,
      emotion,
      confidence
    });

    res.status(201).json({
      success: true,
      data: newEmotion
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
