const axios = require('axios');

async function summarizeText(transcription) {
  try {
    const prompt = `Summarize the following podcast transcript into 3 key points and a brief paragraph:\n\n${transcription}`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summaryText = response.data.choices[0].message.content;

    return {
      text: summaryText,
      keyPoints: summaryText.split('\n').filter(l => l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.'))
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      text: transcription.slice(0, 500) + '...',
      keyPoints: ['Fallback: Error during OpenRouter summarization']
    };
  }
}

module.exports = { summarizeText };
