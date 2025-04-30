// backend/routes/summarizeRoute.js
const express = require('express');
const { summarizeText } = require('../services/summarize');
const router = express.Router();

router.post('/summarize', async (req, res) => {
  const { transcription } = req.body;

  try {
    const summary = await summarizeText(transcription);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
