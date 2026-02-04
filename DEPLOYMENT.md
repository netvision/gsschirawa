# Deployment Guide - GSS College Portal

## 📋 Pre-Deployment Checklist

- [ ] Change admin password to a strong password
- [ ] Update JWT_SECRET with a random, complex string
- [ ] Configure production MongoDB database
- [ ] Update CORS settings for production domain
- [ ] Test all features in staging environment
- [ ] Optimize and compress images
- [ ] Configure SSL certificates
- [ ] Set up backup strategy
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Set up domain and DNS records

---

## 🌐 Deployment Options

### Option 1: Traditional VPS/Dedicated Server (Recommended for Full Control)

#### Requirements
- Ubuntu 20.04 LTS or similar
- Node.js 18+ installed
- MongoDB installed or MongoDB Atlas connection
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB (or use MongoDB Atlas)
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

#### Step 2: Deploy Backend

```bash
# Create application directory
sudo mkdir -p /var/www/gsscollege
sudo chown $USER:$USER /var/www/gsscollege

# Upload backend files
cd /var/www/gsscollege
# (Upload your backend folder here via SCP, SFTP, or Git)

# Install dependencies
cd backend
npm install --production

# Create .env file
nano .env
# Add all production environment variables

# Seed database (first time only)
node seed.js

# Start with PM2
pm2 start server.js --name gsscollege-api
pm2 save
pm2 startup
```

#### Step 3: Deploy Frontend

```bash
# Build frontend locally
cd frontend
npm run build

# Upload dist/ folder to server
# Upload to /var/www/gsscollege/frontend/dist/

# Or build on server
cd /var/www/gsscollege/frontend
npm install
npm run build
```

#### Step 4: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/gsscollege
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect to HTTPS (after SSL setup)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (add after obtaining certificate)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Frontend
    location / {
        root /var/www/gsscollege/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend uploads
    location /uploads {
        proxy_pass http://localhost:5000;
        
        # Cache uploaded files
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/gsscollege /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 5: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

---

### Option 2: Heroku Deployment (Easy, Managed)

#### Backend on Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend
heroku create gsscollege-api

# Add MongoDB addon (or use MongoDB Atlas)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_here
heroku config:set ADMIN_EMAIL=admin@gsschirawa.in
heroku config:set ADMIN_PASSWORD=strong_password_here
heroku config:set FRONTEND_URL=https://your-frontend-url.netlify.app

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Run seed script (once)
heroku run node seed.js
```

#### Frontend on Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build frontend
cd frontend
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Or connect via GitHub and auto-deploy
```

Update `frontend/.env.production`:
```
VITE_API_URL=https://gsscollege-api.herokuapp.com
```

---

### Option 3: DigitalOcean App Platform (Simplified)

#### Backend
1. Create new app from GitHub repository
2. Select `backend` folder
3. Configure environment variables
4. Deploy automatically

#### Frontend
1. Create static site app
2. Select `frontend` folder
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

---

### Option 4: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### Backend on Railway
1. Connect GitHub repository
2. Select backend folder
3. Configure environment variables
4. Deploy automatically

---

## 🗄️ Database Hosting

### MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (Free tier available)
3. Configure network access (add your IPs or 0.0.0.0/0 for all)
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in .env

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/gsscollege?retryWrites=true&w=majority
```

---

## 🔐 Security Hardening

### Environment Variables (Production)

```env
# Backend .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/gsscollege
JWT_SECRET=use-a-random-64-character-string-here
ADMIN_EMAIL=admin@gsscollege.edu.in
ADMIN_PASSWORD=Use$tr0ng!P@ssw0rd#Here
FRONTEND_URL=https://gsscollege.edu.in
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Generate Strong JWT Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### Firewall Configuration (UFW on Ubuntu)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# View logs
pm2 logs gsscollege-api

# Monitor resources
pm2 monit

# Web-based monitoring
pm2 install pm2-logrotate
```

### Error Tracking (Sentry)

Install Sentry:
```bash
npm install @sentry/node
```

Add to `backend/server.js`:
```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
```

---

## 💾 Backup Strategy

### Automated MongoDB Backups

```bash
# Create backup script
nano /home/user/backup-mongo.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
mongodump --db gsscollege --out $BACKUP_DIR/gsscollege_$DATE
# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +
```

```bash
# Make executable
chmod +x /home/user/backup-mongo.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/user/backup-mongo.sh
```

### File Uploads Backup

```bash
# Sync uploads folder
rsync -avz /var/www/gsscollege/backend/uploads/ /home/user/backups/uploads/
```

---

## 🔄 Update & Maintenance

### Updating the Application

```bash
# Pull latest code
cd /var/www/gsscollege
git pull origin main

# Backend updates
cd backend
npm install
pm2 restart gsscollege-api

# Frontend updates
cd ../frontend
npm install
npm run build
```

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update major versions carefully
npm install package-name@latest
```

---

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check PM2 logs
pm2 logs gsscollege-api

# Check if port is in use
sudo lsof -i :5000

# Restart
pm2 restart gsscollege-api
```

### MongoDB Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check connection string
# Ensure IP whitelist in MongoDB Atlas
```

### Nginx Issues
```bash
# Check configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

---

## 📈 Performance Optimization

### Enable Gzip Compression (Nginx)

Already configured in Nginx, but verify:
```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### Enable HTTP/2

Ensure in Nginx config:
```nginx
listen 443 ssl http2;
```

### CDN Integration (Optional)

Consider using Cloudflare for:
- DDoS protection
- Caching static assets
- SSL/TLS optimization
- Analytics

---

## 📱 Domain Configuration

### DNS Records

```
Type    Name    Value                       TTL
A       @       your-server-ip              3600
A       www     your-server-ip              3600
CNAME   api     your-domain.com            3600
```

---

## ✅ Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Admin login works
- [ ] Contact form submits successfully
- [ ] Images upload and display
- [ ] SSL certificate is valid
- [ ] Site is responsive on mobile
- [ ] SEO meta tags are correct
- [ ] Sitemap is accessible
- [ ] robots.txt is configured
- [ ] Google Analytics is tracking (if configured)
- [ ] Backup system is running
- [ ] Monitoring is active
- [ ] Error tracking is working

---

## 🎉 Launch!

Your GSS College Portal is now live and ready to serve students and faculty!

**Remember to:**
1. Change admin password immediately
2. Monitor logs regularly
3. Keep dependencies updated
4. Backup regularly
5. Review security settings periodically

---

**Need Help?**
- Technical Support: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

**Developed by Karmath Consultants**  
Copyright © 2025 GSS College, Chirawa
