const express = require('express');
const { getEmotions, saveEmotion } = require('../controllers/emotionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getEmotions)
  .post(protect, saveEmotion);

module.exports = router;
