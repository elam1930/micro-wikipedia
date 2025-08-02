import { OpenAI } from 'openai';

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { word } = req.query;
  if (!word) {
    return res.status(400).json({ error: 'Please provide a word to explain' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are Micro Wikipedia - explain concepts simply and clearly in 1-2 paragraphs.'
        },
        {
          role: 'user',
          content: `Explain "${word}" in simple terms.`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    res.status(200).json({
      explanation: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to get explanation' });
  }
};
