# weaveBot 🤖

A super simple GitHub bot that responds to webhooks. This is the barebones version with just the essential functionality.

## Features

- ✅ GitHub webhook verification
- ✅ Issue event handling
- ✅ Pull request event handling
- ✅ Health check endpoint
- ✅ Simple logging

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create a `.env` file with your configuration:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
GITHUB_WEBHOOK_SECRET=your-webhook-secret-here
PORT=3000
BOT_NAME=weaveBot
LOG_LEVEL=info
NODE_ENV=development
```

**Important:** Generate a strong webhook secret:
```bash
# Using the built-in generator
npm run generate-secret

# Or manually (on Unix/Linux/macOS)
openssl rand -hex 32
```

### 3. Run the Bot

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The bot will start on `http://localhost:3000`

### 4. Set Up GitHub Webhook

1. Go to your GitHub repository
2. Navigate to **Settings** → **Webhooks**
3. Click **Add webhook**
4. Set the **Payload URL** to: `https://your-domain.com/webhook`
5. Set **Content type** to: `application/json`
6. Set **Secret** to match your `GITHUB_WEBHOOK_SECRET`
7. Select events: **Issues** and **Pull requests**
8. Click **Add webhook**

## API Endpoints

- `POST /webhook` - GitHub webhook endpoint
- `GET /health` - Health check endpoint

## Events Handled

- **Issues**: `opened`, `closed`, `reopened`, etc.
- **Pull Requests**: `opened`, `closed`, `merged`, etc.
- **Ping**: Webhook verification

## Development

Add your bot logic in the handler functions:

```javascript
// In src/index.js
function handleIssueEvent(payload) {
  const { action, issue, repository } = payload;
  
  if (action === 'opened') {
    // Add your custom logic here
    console.log(`New issue: ${issue.title}`);
  }
}
```

## Deployment

### Local Testing with ngrok

```bash
# Install ngrok
npm install -g ngrok

# Start your bot
npm start

# In another terminal, expose your local server
ngrok http 3000

# Use the ngrok URL as your webhook payload URL
```

### Production Deployment

Deploy to any Node.js hosting service (Heroku, Railway, Render, etc.) and set the environment variables:

- `GITHUB_WEBHOOK_SECRET` - Your webhook secret
- `PORT` - Server port (optional)
- `NODE_ENV` - Set to "production"
- `LOG_LEVEL` - Set to "error" or "warn" for production

## License

MIT

