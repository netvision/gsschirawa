#!/bin/bash
# Hotfix script for alumnae deployment issue

echo "🔧 Fixing alumni -> alumnae deployment issue..."

# Navigate to project root
cd /var/www/gsscollege

# Stop the backend
echo "⏸️  Stopping backend..."
pm2 stop gsscollege-api

# Remove old files
echo "🗑️  Removing old alumni files..."
rm -f backend/routes/alumni.js
rm -f backend/models/Alumni.js

# Pull latest changes
echo "📥 Pulling latest changes..."
git fetch origin
git reset --hard origin/main

# Install dependencies (in case of any new packages)
echo "📦 Installing dependencies..."
cd backend
npm install

# Restart backend
echo "🚀 Restarting backend..."
pm2 restart gsscollege-api

# Show status
echo "✅ Deployment complete! Checking status..."
pm2 status
pm2 logs gsscollege-api --lines 10

echo ""
echo "If you still see errors, run: pm2 logs gsscollege-api"
