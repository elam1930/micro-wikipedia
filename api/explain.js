export default async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const { word } = req.query;
    if (!word) return res.status(400).json({ error: 'Добавьте ?word=термин' });

    // Вариант 1: Локальный заглушка (работает мгновенно без API)
    const mockResponses = {
      "apple": "Apple is a sweet fruit that grows on trees. It's often red or green.",
      "technology": "Technology refers to tools and machines that make our lives easier.",
      // Добавьте свои примеры...
    };
    
    // Имитируем задержку как у реального API (1 сек)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Возвращаем готовый ответ
    res.status(200).json({
      explanation: mockResponses[word.toLowerCase()] || `Объяснение для "${word}" не найдено. Попробуйте другое слово.`
    });

  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
