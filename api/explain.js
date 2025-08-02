export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const { word } = req.query;
    if (!word) return res.status(400).json({ error: 'Add ?word=term' });

    // Используем бесплатный прокси вместо OpenAI API
    const proxyResponse = await fetch('https://chatgpt-api.shn.hk/v1/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Explain "${word}" in simple terms`
        }]
      })
    });

    const data = await proxyResponse.json();
    res.status(200).json({ explanation: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
