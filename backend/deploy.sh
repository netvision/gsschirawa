#!/bin/bash

# GSS College Backend Deployment Script for Linode VPS
# This script deploys the backend to /var/www/gsscollege/backend

set -e  # Exit on error

echo "🚀 Starting GSS College Backend Deployment..."

# Configuration
APP_DIR="/var/www/gsscollege/backend"
REPO_URL="https://github.com/YOUR_USERNAME/gsscollege.git"  # Update this
BRANCH="main"
PM2_APP_NAME="gsscollege-api"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Step 1: Creating application directory...${NC}"
sudo mkdir -p /var/www/gsscollege
sudo chown -R $USER:$USER /var/www/gsscollege

if [ -d "$APP_DIR" ]; then
    echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
    cd $APP_DIR
    git pull origin $BRANCH
else
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    cd /var/www/gsscollege
    git clone $REPO_URL .
    cd backend
fi

echo -e "${YELLOW}📦 Step 2: Installing dependencies...${NC}"
npm install --production

echo -e "${YELLOW}⚙️  Step 3: Setting up environment...${NC}"
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}⚠️  IMPORTANT: Edit /var/www/gsscollege/backend/.env with production values!${NC}"
    echo "Press Enter after updating .env file..."
    read
fi

echo -e "${YELLOW}🗄️  Step 4: Seeding database (first time only)...${NC}"
read -p "Do you want to seed the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    node seed.js
    echo -e "${GREEN}✅ Database seeded${NC}"
fi

echo -e "${YELLOW}🔄 Step 5: Managing PM2 process...${NC}"
if pm2 list | grep -q $PM2_APP_NAME; then
    echo "Restarting existing PM2 process..."
    pm2 restart $PM2_APP_NAME
else
    echo "Starting new PM2 process..."
    pm2 start server.js --name $PM2_APP_NAME
    pm2 save
fi

echo -e "${YELLOW}🌐 Step 6: Configuring Nginx...${NC}"
if [ ! -f /etc/nginx/sites-available/gssapi.netserve.in ]; then
    echo "Copying nginx configuration..."
    sudo cp nginx.conf /etc/nginx/sites-available/gssapi.netserve.in
    sudo ln -sf /etc/nginx/sites-available/gssapi.netserve.in /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl reload nginx
    echo -e "${GREEN}✅ Nginx configured${NC}"
else
    echo "Nginx config already exists. Testing configuration..."
    sudo nginx -t
    sudo systemctl reload nginx
fi

echo -e "${YELLOW}🔒 Step 7: SSL Certificate Setup${NC}"
echo "To enable HTTPS, run:"
echo "sudo certbot --nginx -d gssapi.netserve.in"
echo ""
read -p "Do you want to set up SSL now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo certbot --nginx -d gssapi.netserve.in
fi

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "📊 Status Check:"
pm2 status
echo ""
echo "🌐 API should be available at:"
echo "   http://gssapi.netserve.in"
echo "   https://gssapi.netserve.in (if SSL configured)"
echo ""
echo "📝 Useful commands:"
echo "   pm2 logs $PM2_APP_NAME     - View logs"
echo "   pm2 restart $PM2_APP_NAME  - Restart API"
echo "   pm2 stop $PM2_APP_NAME     - Stop API"
echo "   pm2 monit                  - Monitor processes"
echo ""
