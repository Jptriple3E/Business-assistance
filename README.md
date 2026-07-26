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

## Deploying to Vercel

Vercel doesn't run `server.js` directly — it uses the serverless
function in `api/chat.js` instead, with `vercel.json` routing static
files from `public/` and API calls to `api/chat.js`. The frontend
code doesn't need to change; `/api/chat` works the same either way.

Steps:
1. Push this project to a GitHub repo (or use `vercel` CLI directly).
2. Import it in Vercel.
3. In the project's **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your real key
4. Redeploy. The "Cannot GET /" error means either the deploy hasn't
   picked up `public/index.html` yet, or it ran before the API key
   was set — redeploying after adding the env variable fixes both.

## Deploying elsewhere (Render, Railway, Fly.io, a VPS)

These run `server.js` directly with `npm start`, so no extra config
needed — just set `ANTHROPIC_API_KEY` in that service's dashboard.
Don't upload your `.env` file directly; use the platform's env var
settings instead.

## Notes

- The assistant has no persistent memory between page reloads —
  each visitor starts a fresh conversation.
- API usage is billed per token through your Anthropic account; keep
  an eye on usage in the Console, especially once the site is public.
