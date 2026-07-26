const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Edit this to describe your business — it shapes how the assistant answers.
const SYSTEM_PROMPT = `You are a helpful assistant for [Your Business Name].
You help visitors with:
- General questions about the business, products, or services
- Generating short content (descriptions, replies, ideas) on request
- Basic customer support (hours, policies, how to contact a human)

Be concise, friendly, and honest. If you don't know something specific
about the business, say so and suggest the visitor contact support directly.`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'messages array is required' });
      return;
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set on the server.' });
      return;
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    res.status(200).json({ reply: textBlock ? textBlock.text : '' });
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({ error: 'Something went wrong talking to Claude.' });
  }
};
