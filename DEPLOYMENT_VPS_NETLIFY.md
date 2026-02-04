# 🚀 Deployment Guide: VPS + Netlify

## Overview
- **Backend API**: Linode VPS (172.104.207.144) → https://gssapi.netserve.in
- **Frontend**: Netlify → Auto-deploy from GitHub
- **Database**: MongoDB Atlas (recommended) or local MongoDB on VPS

---

## Part 1: Backend Deployment to Linode VPS

### Prerequisites on VPS
Ensure these are installed (you mentioned they already are):
- ✅ Node.js 18+
- ✅ Nginx
- ✅ PM2 (for process management)
- ✅ MongoDB (local) or MongoDB Atlas connection
- Git

### Step 1: Update DNS for API Domain

Add an A record for `gssapi.netserve.in`:
```
Type: A
Name: gssapi
Value: 172.104.207.144
TTL: 300 (or default)
```

Wait 5-10 minutes for DNS propagation. Test with:
```bash
ping gssapi.netserve.in
```

### Step 2: SSH into VPS

From your Windows PowerShell:
```powershell
ssh root@172.104.207.144
# or
ssh your_username@172.104.207.144
```

### Step 3: Setup Application Directory

```bash
# Create directory
sudo mkdir -p /var/www/gsscollege
sudo chown -R $USER:$USER /var/www/gsscollege
cd /var/www/gsscollege

# Clone repository
git clone https://github.com/YOUR_USERNAME/gsscollege.git .
cd backend

# Install dependencies
npm install --production
```

### Step 4: Create Production .env File

```bash
nano .env
```

Add the following (update values):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gsscollege
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gsscollege?retryWrites=true&w=majority

JWT_SECRET=YOUR_STRONG_RANDOM_SECRET_HERE
ADMIN_EMAIL=admin@gsschirawa.in
ADMIN_PASSWORD=YOUR_STRONG_PASSWORD_HERE

CORS_ORIGIN=https://gsscollege.netlify.app,https://www.gsscollege.edu.in
```

Generate strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Seed Database (First Time Only)

```bash
node seed.js
```

Save the admin credentials that are displayed!

### Step 6: Configure Nginx

```bash
# Copy nginx configuration
sudo cp /var/www/gsscollege/backend/nginx.conf /etc/nginx/sites-available/gssapi.netserve.in

# Create symbolic link
sudo ln -sf /etc/nginx/sites-available/gssapi.netserve.in /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 7: Start Application with PM2

```bash
cd /var/www/gsscollege/backend

# Start with PM2
pm2 start server.js --name gsscollege-api

# Save PM2 configuration
pm2 save

# Enable PM2 startup on boot
pm2 startup
# Run the command it outputs
```

### Step 8: Setup SSL Certificate (HTTPS)

```bash
# Install certbot if not already installed
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d gssapi.netserve.in

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)
```

### Step 9: Test API

```bash
# Test locally
curl http://localhost:5000/api/health

# Test via domain
curl https://gssapi.netserve.in/api/health
```

### Step 10: Monitor & Manage

```bash
# View logs
pm2 logs gsscollege-api

# Monitor
pm2 monit

# Restart
pm2 restart gsscollege-api

# Status
pm2 status
```

---

## Part 2: Frontend Deployment to Netlify

### Step 1: Push Latest Changes to GitHub

From your Windows PowerShell:
```powershell
cd d:\dev\gsscollege

# Add new files
git add .
git commit -m "Configure for VPS + Netlify deployment"
git push origin main
```

### Step 2: Create Netlify Account & Deploy

#### Option A: Netlify Web Interface (Easiest)

1. **Go to**: https://app.netlify.com/signup
2. **Sign up** with GitHub
3. **New site from Git**:
   - Choose GitHub
   - Select `gsscollege` repository
   - Configure build settings:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: frontend/dist
     ```
4. **Add Environment Variable**:
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://gssapi.netserve.in`
5. **Deploy**: Click "Deploy site"

#### Option B: Netlify CLI

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize (from frontend directory)
cd frontend
netlify init

# Follow prompts:
# - Create & configure new site
# - Build command: npm run build
# - Publish directory: dist

# Deploy
netlify deploy --prod
```

### Step 3: Configure Custom Domain (Optional)

If you have a custom domain for frontend:

1. **In Netlify Dashboard**:
   - Site settings → Domain management
   - Add custom domain (e.g., gsscollege.edu.in)
   
2. **Update DNS**:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's IP)
   ```

3. **Enable HTTPS**: Netlify auto-provisions SSL

### Step 4: Update CORS on Backend

SSH back into VPS and update backend/.env:
```bash
ssh root@172.104.207.144
cd /var/www/gsscollege/backend
nano .env
```

Update CORS_ORIGIN with your Netlify URL:
```env
CORS_ORIGIN=https://your-site.netlify.app,https://gsscollege.edu.in
```

Restart backend:
```bash
pm2 restart gsscollege-api
```

---

## Part 3: Continuous Development Workflow

### Local Development (Windows)

```powershell
# Work on features locally
cd d:\dev\gsscollege
npm run dev:all

# Make changes, test locally
# Backend: http://localhost:5000
# Frontend: http://localhost:5173
```

### Deploy Updates

#### Backend Updates (to VPS):

**From Windows:**
```powershell
# Commit and push changes
git add .
git commit -m "Update backend feature"
git push origin main
```

**On VPS:**
```bash
# SSH into VPS
ssh root@172.104.207.144

# Quick update
cd /var/www/gsscollege/backend
bash update.sh

# Or manually:
git pull origin main
npm install --production
pm2 restart gsscollege-api
```

#### Frontend Updates (to Netlify):

```powershell
# Just push to GitHub - Netlify auto-deploys!
git add .
git commit -m "Update frontend feature"
git push origin main

# Netlify will automatically:
# 1. Detect the push
# 2. Build the frontend
# 3. Deploy to production
# (~2-3 minutes)
```

### Automated Deployment Script (Optional)

Create a webhook on VPS to auto-pull on git push:

```bash
# On VPS
cd /var/www/gsscollege/backend
nano webhook.js
```

Add:
```javascript
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.post('/deploy', (req, res) => {
  exec('cd /var/www/gsscollege/backend && git pull && npm install --production && pm2 restart gsscollege-api', 
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return res.status(500).send('Deployment failed');
      }
      console.log(stdout);
      res.send('Deployed successfully');
    }
  );
});

app.listen(3001, () => console.log('Webhook listening on port 3001'));
```

---

## Part 4: Testing Deployment

### Test Backend API

```powershell
# From Windows PowerShell
curl https://gssapi.netserve.in/api/courses
curl https://gssapi.netserve.in/api/events
curl https://gssapi.netserve.in/api/notices
```

### Test Frontend

1. Visit your Netlify URL
2. Navigate through pages
3. Test admin login: https://your-site.netlify.app/admin/login
4. Verify API calls work (check Network tab in DevTools)

---

## Part 5: Monitoring & Maintenance

### Backend (VPS)

```bash
# SSH into VPS
ssh root@172.104.207.144

# Check status
pm2 status
pm2 monit

# View logs
pm2 logs gsscollege-api
pm2 logs gsscollege-api --lines 100

# Restart if needed
pm2 restart gsscollege-api

# Check nginx
sudo nginx -t
sudo systemctl status nginx

# Check disk space
df -h

# Check memory
free -m
```

### Frontend (Netlify)

- **Dashboard**: https://app.netlify.com
- **Deploy logs**: Site → Deploys
- **Analytics**: Site → Analytics
- **Functions logs**: Site → Functions

### Database (if using MongoDB Atlas)

- **Dashboard**: https://cloud.mongodb.com
- **Metrics**: Performance, connections, storage
- **Backups**: Automated daily backups

---

## Part 6: Quick Reference

### VPS Commands

```bash
# SSH
ssh root@172.104.207.144

# Quick update
cd /var/www/gsscollege/backend && bash update.sh

# View logs
pm2 logs gsscollege-api

# Restart
pm2 restart gsscollege-api

# SSL renewal (auto-renews, but manual if needed)
sudo certbot renew
```

### Local Commands

```powershell
# Development
npm run dev:all

# Deploy (push to GitHub)
git add .
git commit -m "message"
git push origin main
```

### URLs

- **Backend API**: https://gssapi.netserve.in
- **Frontend**: https://your-site.netlify.app (update after deployment)
- **Admin Panel**: https://your-site.netlify.app/admin/login
- **Netlify Dashboard**: https://app.netlify.com

---

## Troubleshooting

### Backend not accessible

```bash
# Check PM2
pm2 status
pm2 logs gsscollege-api

# Check nginx
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Check firewall
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
```

### Frontend can't reach API

1. Check CORS settings in backend/.env
2. Verify VITE_API_URL in Netlify environment variables
3. Check browser console for errors
4. Test API directly: `curl https://gssapi.netserve.in/api/courses`

### Database connection issues

```bash
# If using local MongoDB
sudo systemctl status mongod
sudo systemctl restart mongod

# If using Atlas
# Check IP whitelist (0.0.0.0/0 or add VPS IP)
```

---

## Next Steps

1. ✅ Deploy backend to VPS
2. ✅ Deploy frontend to Netlify
3. [ ] Test all features
4. [ ] Setup monitoring (UptimeRobot, Sentry)
5. [ ] Configure backups
6. [ ] Setup custom domain (if needed)
7. [ ] Add analytics (Google Analytics)

---

**Ready to deploy? Start with Part 1: Backend Deployment!**
