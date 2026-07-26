# Your Business Website + AI Assistant

A simple website with a chat widget powered by the Claude API. The
assistant can answer questions, help draft content, and handle basic
support queries — all through one chat panel in the corner of the page.

## Setup

1. **Install Node.js** (v18+) if you don't have it: https://nodejs.org

2. **Install dependencies**
   ```
   npm install
   ```

3. **Add your API key**
   - Copy `.env.example` to `.env`
   - Paste your Anthropic API key in:
     ```
     ANTHROPIC_API_KEY=sk-ant-your-real-key
     ```
   - ⚠️ Never commit `.env` or share your key. If a key has ever been
     posted anywhere semi-public (chat, screenshot, repo), revoke it
     in the Anthropic Console and generate a new one first.

4. **Run it**
   ```
   npm start
   ```
   Then open http://localhost:3000

## Customize

- **Business info & assistant behavior**: edit the `SYSTEM_PROMPT`
  constant near the top of `server.js`. This is what tells the
  assistant about your business, tone, and what it should/shouldn't
  say.
- **Page content & copy**: edit `public/index.html`
- **Colors & fonts**: edit `public/style.css` (`:root` variables at
  the top control the palette)

## Deploying

This is a standard Node/Express app. It can be deployed to services
like Render, Railway, Fly.io, or a VPS. Whichever you pick, set the
`ANTHROPIC_API_KEY` environment variable in that service's dashboard
— don't upload your `.env` file directly.

## Notes

- The assistant has no persistent memory between page reloads —
  each visitor starts a fresh conversation.
- API usage is billed per token through your Anthropic account; keep
  an eye on usage in the Console, especially once the site is public.
