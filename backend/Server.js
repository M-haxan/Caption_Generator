const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post('/api/generate', async (req, res) => {
  const { keywords, platform, tone, length } = req.body;

  try {
    const systemPrompt = `You are an expert social media manager. Generate a highly engaging caption for ${platform} using a ${tone} tone. The length of the caption should be ${length}. The caption must include relevant emojis and hashtags at the end.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Topic/Keywords: ${keywords}` }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      // Yeh line Groq ka asal internal error nikale gi
      const errorData = await response.json(); 
      console.error("🔥 GROQ INTERNAL ERROR:", errorData);
      
      if (response.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute.' });
      }
      throw new Error(`Groq API Error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    res.json({ caption: data.choices[0].message.content });

  } catch (error) {
    console.error("🔥 BACKEND ERROR DETAILS:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));