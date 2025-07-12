require('dotenv').config();
const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'your-webhook-secret';

app.use(express.json());

// Verify GitHub webhook signature
function verifySignature(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  next();
}

// Handle GitHub webhooks
app.post('/webhook', verifySignature, (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  console.log(`Received ${event} event`);

  switch (event) {
    case 'ping':
      console.log('GitHub webhook ping received');
      res.json({ message: 'Pong!' });
      break;

    case 'issues':
      handleIssueEvent(payload);
      res.json({ message: 'Issue event processed' });
      break;

    case 'pull_request':
      handlePullRequestEvent(payload);
      res.json({ message: 'Pull request event processed' });
      break;

    default:
      console.log(`Unhandled event: ${event}`);
      res.json({ message: 'Event received' });
  }
});

// Handle issue events
function handleIssueEvent(payload) {
  const { action, issue, repository } = payload;
  
  console.log(`Issue ${action}: ${issue.title} in ${repository.full_name}`);
  
  if (action === 'opened') {
    console.log(`New issue opened by ${issue.user.login}`);
    // Add your bot logic here
  }
}

// Handle pull request events
function handlePullRequestEvent(payload) {
  const { action, pull_request, repository } = payload;
  
  console.log(`PR ${action}: ${pull_request.title} in ${repository.full_name}`);
  
  if (action === 'opened') {
    console.log(`New PR opened by ${pull_request.user.login}`);
    // Add your bot logic here
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🤖 weaveBot is running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
}); 