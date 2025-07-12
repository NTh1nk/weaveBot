module.exports = {
  // GitHub Webhook Secret (set this in your GitHub repository webhook settings)
  webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || 'your-webhook-secret-here',
  
  // Server Port (optional, defaults to 3000)
  port: process.env.PORT || 3000,
  
  // Bot settings
  botName: 'weaveBot',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info'
}; 