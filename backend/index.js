// backend/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-review', async (req, res) => {
  const { appliance } = req.body;

  if (!appliance) {
    return res.status(400).json({ error: 'Appliance name is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in writing customer reviews for home appliance repair services.',
        },
        {
          role: 'user',
          content: `Generate a short positive review for a ${appliance} repair service.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const review = completion.choices[0].message.content;
    res.json({ review });
  } catch (error) {
    console.error('Error from OpenAI:', error);
    res.status(500).json({ error: 'Error generating review.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
