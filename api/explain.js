import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const { word } = req.query;
    if (!word) return res.status(400).json({ error: 'Add ?word=term to URL' });

    console.log('Request to OpenAI with word:', word); // Логирование

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are Micro Wikipedia. Explain concepts simply in 1-2 sentences.'
        },
        {
          role: 'user',
          content: `Explain "${word}" in simple terms. Response in English.`
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    console.log('OpenAI response:', completion); // Логирование
    
    res.status(200).json({
      explanation: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('API Error:', error); // Логирование ошибки
    res.status(500).json({ 
      error: 'Failed to get explanation',
      details: error.message // Добавляем детали ошибки
    });
  }
};
