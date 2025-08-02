// backend/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();

// ✅ Specific CORS allow karo:
app.use(cors({
  origin: 'https://aes-review-ui.onrender.com', // ← Yahan apne frontend ka URL likho
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ... rest code same ...
