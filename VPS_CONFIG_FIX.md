# 🚨 VPS Configuration - URGENT FIXES NEEDED

## Issue Summary
The API is working locally (http://localhost:5002/api/health returns 200), but nginx isn't properly proxying requests to it.

## What You Need to Do on VPS

### Step 1: SSH into VPS
```bash
ssh root@172.104.207.144
```

### Step 2: Fix CORS on Backend
Update the backend .env with your Netlify domain:
```bash
cd /var/www/gsscollege/backend
nano .env
```

Update/add these lines:
```env
PORT=5002
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-site.netlify.app,https://gssapi.netserve.in
```

Replace `your-netlify-site` with your actual Netlify domain.

### Step 3: Verify Nginx Configuration
```bash
# Check if nginx config is correct
sudo cat /etc/nginx/sites-available/gssapi.netserve.in
```

It should have:
```nginx
location / {
    proxy_pass http://localhost:5002;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Step 4: Test Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Restart Backend
```bash
cd /var/www/gsscollege/backend
pm2 restart gsscollege-api
pm2 logs gsscollege-api
```

### Step 6: Test API from Your Computer
```powershell
curl https://gssapi.netserve.in/api/health
```

## Your Netlify Domain
**What is your Netlify domain?** (Should look like: https://gsschirawa.netlify.app)

Once you provide it, you can update your backend CORS_ORIGIN on the VPS.

## Quick Checklist
- [ ] SSH into VPS
- [ ] Update backend/.env with CORS_ORIGIN including your Netlify domain
- [ ] Test nginx configuration
- [ ] Restart backend with PM2
- [ ] Test API endpoint
