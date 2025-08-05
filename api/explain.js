import { OpenAI } from 'openai';

// Инициализация OpenAI (обязательно добавьте ключ в Vercel!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, res) => {
  // Настройка CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { word } = req.query;
    if (!word) return res.status(400).json({ error: 'Добавьте ?word=термин' });

    // Запрос к ChatGPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Объясняй понятия просто и кратко (1-2 предложения).'
        },
        {
          role: 'user',
          content: `Объясни "${word}" простыми словами.`
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    // Возвращаем ответ ИИ
    res.status(200).json({
      explanation: completion.choices[0].message.content
    });

  } catch (error) {
    // Если ИИ не сработал
    res.status(500).json({ 
      error: 'Ошибка ИИ',
      details: error.message 
    });
  }
};
