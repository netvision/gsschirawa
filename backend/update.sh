#!/bin/bash

# Quick update script for GSS College Backend
# Use this for quick updates after initial deployment

set -e

echo "🔄 Updating GSS College Backend..."

cd /var/www/gsscollege/backend

# Pull latest changes
git pull origin main

# Install dependencies
npm install --production

# Restart PM2
pm2 restart gsscollege-api

echo "✅ Update complete!"
pm2 status gsscollege-api
