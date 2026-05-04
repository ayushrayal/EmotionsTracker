const mongoose = require('mongoose');

const EmotionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  emotion: {
    type: String,
    required: [true, 'Please provide an emotion']
  },
  confidence: {
    type: Number,
    required: [true, 'Please provide confidence level']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Emotion', EmotionSchema);
