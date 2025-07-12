#!/usr/bin/env node

const crypto = require('crypto');

// Generate a random 32-byte hex string
const secret = crypto.randomBytes(32).toString('hex');

console.log('🔐 Generated GitHub Webhook Secret:');
console.log('');
console.log(secret);
console.log('');
console.log('📝 Add this to your .env file:');
console.log(`GITHUB_WEBHOOK_SECRET=${secret}`);
console.log('');
console.log('⚠️  Keep this secret secure and never commit it to version control!'); 