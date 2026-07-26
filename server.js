require('dotenv').config();
const express = require('express');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('⚠️  ANTHROPIC_API_KEY is not set. Create a .env file (see .env.example).');
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Edit this to describe your business — it shapes how the assistant answers.
const SYSTEM_PROMPT = `You are a helpful assistant for [Your Business Name].
You help visitors with:
- General questions about the business, products, or services
- Generating short content (descriptions, replies, ideas) on request
- Basic customer support (hours, policies, how to contact a human)

Be concise, friendly, and honest. If you don't know something specific
about the business, say so and suggest the visitor contact support directly.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: messages, // [{ role: 'user'|'assistant', content: '...' }, ...]
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    res.json({ reply: textBlock ? textBlock.text : '' });
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({ error: 'Something went wrong talking to Claude.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
