# 🚀 Deployment & Continuous Development Plan

## Overview
This plan outlines the deployment strategy and continuous development workflow for the GSS College portal, allowing seamless development on local environment while maintaining a stable production deployment.

---

## �️ Current Deployment Configuration

**Live Server (Linode)**
- **IP Address**: 172.104.207.144
- **Hostname**: (to be configured)
- **SSH Access**: Use your SSH key to connect

**Connection Command**:
```bash
ssh root@172.104.207.144
```

---

## �📍 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│  Local Dev (Windows)  →  GitHub  →  Production (Server)     │
│         ↓                   ↓              ↓                 │
│   Local MongoDB      Version Control   Production DB        │
│   localhost:3000     CI/CD Pipeline    Live Domain          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Deployment Options

### **Recommended: Option A - Budget-Friendly Stack**
- **Frontend**: Vercel or Netlify (Free tier)
- **Backend**: Railway.app or Render.com (Free/Low-cost tier)
- **Database**: MongoDB Atlas (Free M0 tier - 512MB)
- **Media Storage**: Cloudinary (Free tier - 25GB)
- **Total Cost**: ₹0-500/month

### **Option B - Full Control VPS**
- **Server**: DigitalOcean/Linode/AWS Lightsail ($5-10/month)
- **Database**: MongoDB on same server or Atlas
- **Total Cost**: ₹400-800/month

### **Option C - Indian Hosting**
- **Server**: HostGator India/Bluehost India
- **Database**: MongoDB Atlas (Free)
- **Total Cost**: ₹200-500/month

---

## 📦 Step-by-Step Deployment Plan

### **Phase 1: Prepare for Production**

#### 1.1 Create Production Environment Files

```powershell
# Frontend production environment
New-Item -Path "frontend\.env.production" -ItemType File
```

Add to `frontend/.env.production`:
```env
VITE_API_URL=https://api.gsscollege.edu.in
# or
VITE_API_URL=https://gsscollege-api.railway.app
```

#### 1.2 Update Backend for Production

Add to `backend/.env` (production values):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gsscollege?retryWrites=true&w=majority
JWT_SECRET=<generate-strong-random-secret>
ADMIN_EMAIL=admin@gsschirawa.in
ADMIN_PASSWORD=<strong-production-password>
CORS_ORIGIN=https://gsscollege.edu.in,https://www.gsscollege.edu.in
```

#### 1.3 Create Deployment Scripts

Add to `package.json` (root):
```json
{
  "scripts": {
    "deploy:frontend": "cd frontend && npm run build",
    "deploy:backend": "cd backend && npm install --production",
    "deploy:all": "npm run deploy:backend && npm run deploy:frontend"
  }
}
```

---

### **Phase 2: Deploy Database (MongoDB Atlas)**

#### 2.1 Setup MongoDB Atlas (Free Tier)

1. **Create Account**: https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster**:
   - Choose M0 (Free tier)
   - Region: Mumbai (ap-south-1) for India
   - Cluster name: gsscollege-cluster

3. **Database Access**:
   - Create database user with strong password
   - Save credentials securely

4. **Network Access**:
   - For development: Add your current IP
   - For production: Add 0.0.0.0/0 (or specific IPs)

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `gsscollege`

---

### **Phase 3A: Deploy Backend (Railway.app - Recommended)**

#### 3A.1 Setup Railway

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Link to project
railway link
```

#### 3A.2 Configure Railway

1. **Create New Project** on https://railway.app
2. **Deploy from GitHub**:
   - Connect GitHub repository
   - Select `gsscollege` repository
   - Set root directory to `backend`

3. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret>
   ADMIN_EMAIL=admin@gsschirawa.in
   ADMIN_PASSWORD=<strong-password>
   CORS_ORIGIN=https://gsscollege.vercel.app
   ```

4. **Deploy**:
   - Railway auto-deploys on every push to main branch
   - Get your backend URL: `https://gsscollege-production.up.railway.app`

#### 3A.3 Seed Production Database

```powershell
# SSH into Railway or run locally with production MongoDB
railway run node seed.js
```

---

### **Phase 3B: Alternative - Deploy Backend (Render.com)**

#### 3B.1 Setup Render

1. **Create Account**: https://render.com
2. **New Web Service**:
   - Connect GitHub repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `node server.js`

3. **Environment Variables**: Add same as Railway above

4. **Deploy**: Auto-deploys on git push

---

### **Phase 4: Deploy Frontend (Vercel - Recommended)**

#### 4.1 Setup Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel
```

#### 4.2 Configure Vercel

1. **Project Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`

2. **Environment Variables**:
   ```
   VITE_API_URL=https://gsscollege-production.up.railway.app
   ```

3. **Custom Domain** (if you have):
   - Add domain in Vercel dashboard
   - Update DNS records as instructed

#### 4.3 Auto-Deploy Setup

Vercel automatically deploys on:
- Every push to `main` branch → Production
- Every push to other branches → Preview deployments

---

### **Phase 5: Setup Custom Domain (Optional)**

#### 5.1 Purchase Domain
- Namecheap, GoDaddy, or Google Domains
- Suggested: gsscollege.edu.in or gsscollege.ac.in

#### 5.2 Configure DNS

**For Vercel (Frontend)**:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**For Railway (Backend API)**:
```
Type    Name           Value
CNAME   api            <your-app>.up.railway.app
```

#### 5.3 SSL Certificate
- Both Vercel and Railway provide automatic SSL
- No additional configuration needed

---

## 🔄 Continuous Development Workflow

### **Git Branching Strategy**

```
main (production)
  ↑
  └── develop (staging)
        ↑
        ├── feature/new-gallery-section
        ├── feature/student-portal
        └── bugfix/contact-form-validation
```

### **Development Workflow**

#### Daily Development on Windows

```powershell
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and test locally
npm run dev:all  # Start both frontend and backend

# 4. Commit changes
git add .
git commit -m "feat: add new feature description"

# 5. Push to GitHub
git push origin feature/your-feature-name

# 6. Create Pull Request on GitHub
# Review → Merge to main → Auto-deploy to production
```

#### Local Development Environment

**Terminal 1 - Backend**:
```powershell
cd backend
npm run dev  # Uses local MongoDB
```

**Terminal 2 - Frontend**:
```powershell
cd frontend
npm run dev  # Points to localhost:5000
```

**Terminal 3 - MongoDB** (if running locally):
```powershell
mongod
```

### **Environment Management**

**Local Development** (`.env`):
```env
# backend/.env
MONGODB_URI=mongodb://localhost:27017/gsscollege
JWT_SECRET=local-dev-secret
CORS_ORIGIN=http://localhost:5173

# frontend/.env
VITE_API_URL=http://localhost:5000
```

**Production** (Set in hosting platform):
```env
# Railway/Render
MONGODB_URI=mongodb+srv://...atlas.mongodb.net/gsscollege
JWT_SECRET=<strong-production-secret>
CORS_ORIGIN=https://gsscollege.vercel.app

# Vercel
VITE_API_URL=https://gsscollege-production.up.railway.app
```

---

## 🔧 Continuous Integration/Deployment (CI/CD)

### **GitHub Actions Setup** (Optional but Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install
      
      - name: Run Tests (if you add them later)
        run: |
          cd backend && npm test
          cd ../frontend && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: echo "Auto-deployed by Vercel and Railway"
```

---

## 📊 Monitoring & Maintenance

### **Post-Deployment Monitoring**

1. **Uptime Monitoring**:
   - UptimeRobot (Free): https://uptimerobot.com
   - Monitor both frontend and backend URLs
   - Get email alerts on downtime

2. **Error Tracking**:
   - Sentry (Free tier): https://sentry.io
   - Track backend errors automatically

3. **Analytics**:
   - Google Analytics: Track visitor stats
   - Vercel Analytics: Built-in performance monitoring

### **Regular Maintenance Tasks**

**Weekly**:
- [ ] Check error logs on Railway/Render
- [ ] Review MongoDB Atlas performance metrics
- [ ] Check uptime reports

**Monthly**:
- [ ] Update npm dependencies
- [ ] Review and optimize database
- [ ] Backup database (MongoDB Atlas auto-backups)
- [ ] Review security logs

**Quarterly**:
- [ ] Update Node.js version
- [ ] Security audit: `npm audit fix`
- [ ] Performance optimization review

---

## 🔐 Security Checklist

Before going live:

- [ ] Change admin password to strong password (12+ chars)
- [ ] Generate strong JWT_SECRET (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Enable MongoDB authentication
- [ ] Configure CORS for production domain only
- [ ] Add rate limiting to API endpoints
- [ ] Enable HTTPS (auto on Vercel/Railway)
- [ ] Remove .env files from git (already in .gitignore)
- [ ] Set up database backups
- [ ] Configure CSP headers
- [ ] Add input validation and sanitization

---

## 📝 Quick Commands Reference

### **Local Development**
```powershell
# Start everything
npm run dev:all

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Seed local database
cd backend && node seed.js
```

### **Deployment**
```powershell
# Deploy frontend to Vercel
cd frontend && vercel --prod

# Deploy backend to Railway
railway up

# Build for production
npm run deploy:all
```

### **Git Workflow**
```powershell
# Create feature branch
git checkout -b feature/name

# Commit and push
git add .
git commit -m "description"
git push origin feature/name

# Deploy to production
git checkout main
git merge feature/name
git push origin main  # Auto-deploys
```

---

## 🎯 Next Steps

### **Immediate (Day 1-2)**
1. ✅ Code pushed to GitHub
2. [ ] Setup MongoDB Atlas
3. [ ] Deploy backend to Railway
4. [ ] Deploy frontend to Vercel
5. [ ] Test production deployment

### **Short Term (Week 1)**
6. [ ] Add custom domain
7. [ ] Setup uptime monitoring
8. [ ] Configure error tracking
9. [ ] Create backup strategy
10. [ ] Document production URLs and credentials

### **Medium Term (Month 1)**
11. [ ] Add automated tests
12. [ ] Setup CI/CD pipeline
13. [ ] Add performance monitoring
14. [ ] Implement rate limiting
15. [ ] Add email notifications

### **Long Term (Ongoing)**
16. [ ] Regular security updates
17. [ ] Feature additions
18. [ ] Performance optimization
19. [ ] User feedback implementation
20. [ ] Scale as needed

---

## 📞 Support Resources

- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Railway**: https://docs.railway.app
- **Vercel**: https://vercel.com/docs
- **Render**: https://render.com/docs
- **GitHub Actions**: https://docs.github.com/actions

---

## 💰 Cost Estimation

### **Free Tier (Recommended to Start)**
- MongoDB Atlas: Free (M0 - 512MB)
- Railway: $5/month credit (Free to start)
- Vercel: Free (Hobby plan)
- **Total: ₹0-400/month**

### **Paid Tier (When Scaling)**
- MongoDB Atlas: $9/month (M2 - 2GB)
- Railway: $20/month
- Vercel: Free or $20/month (Pro)
- **Total: ₹2,400-4,000/month**

---

**Ready to deploy? Let's start with Step 1: MongoDB Atlas setup!**
