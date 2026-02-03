# 🔧 Troubleshooting Guide - GSS College Portal

Common issues and their solutions for the GSS College Portal.

---

## 📋 Table of Contents

1. [Installation Issues](#installation-issues)
2. [MongoDB Issues](#mongodb-issues)
3. [Backend/API Issues](#backendapi-issues)
4. [Frontend Issues](#frontend-issues)
5. [Authentication Issues](#authentication-issues)
6. [File Upload Issues](#file-upload-issues)
7. [Performance Issues](#performance-issues)
8. [Browser Issues](#browser-issues)
9. [Deployment Issues](#deployment-issues)
10. [Database Issues](#database-issues)

---

## 🔴 Installation Issues

### Issue: "npm is not recognized"
**Symptom**: Command `npm` not found
**Cause**: Node.js not installed or not in PATH
**Solution**:
```powershell
# Download and install Node.js from https://nodejs.org/
# Choose the LTS version
# Restart PowerShell after installation
node --version
npm --version
```

### Issue: "npm install" fails
**Symptom**: Errors during dependency installation
**Cause**: Various (network, permissions, corrupted cache)
**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

### Issue: Permission denied during npm install
**Symptom**: EACCES errors
**Cause**: Insufficient permissions
**Solution**:
```powershell
# Run PowerShell as Administrator
# Or configure npm to use a different directory
npm config set prefix ~/.npm-global
```

---

## 🗄️ MongoDB Issues

### Issue: "MongoDB not found" or "mongod: command not found"
**Symptom**: Cannot start MongoDB
**Cause**: MongoDB not installed or not in PATH
**Solution**:
```powershell
# Check if MongoDB is installed
mongod --version

# If not installed, download from:
# https://www.mongodb.com/try/download/community

# Or start as Windows service
net start MongoDB
```

### Issue: "Connection refused" to MongoDB
**Symptom**: Backend cannot connect to database
**Cause**: MongoDB not running
**Solution**:
```powershell
# Option 1: Start as service
net start MongoDB

# Option 2: Start manually
mkdir C:\data\db -Force
mongod --dbpath C:\data\db

# Keep the window open
```

### Issue: "Authentication failed" to MongoDB
**Symptom**: Cannot connect with credentials
**Cause**: Incorrect MongoDB credentials
**Solution**:
```powershell
# Check connection string in backend/.env
# Format: mongodb://username:password@localhost:27017/gsscollege

# Or use without authentication for local development
MONGODB_URI=mongodb://localhost:27017/gsscollege
```

### Issue: "Data directory not found"
**Symptom**: MongoDB won't start
**Cause**: Default data directory missing
**Solution**:
```powershell
# Create data directory
mkdir C:\data\db -Force

# Start MongoDB with custom path
mongod --dbpath C:\data\db
```

---

## ⚙️ Backend/API Issues

### Issue: "Port 5000 already in use"
**Symptom**: Backend won't start
**Cause**: Another process using port 5000
**Solution**:
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill the process
$processId = (Get-NetTCPConnection -LocalPort 5000).OwningProcess
Stop-Process -Id $processId -Force

# Or change port in backend/.env
PORT=5001
```

### Issue: Backend crashes immediately after start
**Symptom**: Server starts then exits
**Cause**: Missing environment variables or MongoDB not running
**Solution**:
```powershell
# Check MongoDB is running
net start MongoDB

# Verify .env file exists
Get-Content backend\.env

# Check for errors
cd backend
npm run dev
# Read the error message carefully
```

### Issue: "JWT secret not configured"
**Symptom**: Authentication fails
**Cause**: JWT_SECRET not set in .env
**Solution**:
```powershell
# Add to backend/.env
JWT_SECRET=your_random_secret_key_min_32_characters

# Generate a secure secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Issue: API returns 404 for all endpoints
**Symptom**: All API calls return "Not Found"
**Cause**: Routes not loaded or backend not running
**Solution**:
```powershell
# Verify backend is running
# Check console for "Server running on port 5000"

# Verify API base URL
# Should be: http://localhost:5000/api/

# Test with curl
curl http://localhost:5000/api/courses
```

### Issue: CORS errors in browser console
**Symptom**: "Access-Control-Allow-Origin" errors
**Cause**: CORS misconfiguration
**Solution**:
```javascript
// In backend/server.js, verify CORS config:
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// In backend/.env:
FRONTEND_URL=http://localhost:5173
```

---

## 🎨 Frontend Issues

### Issue: "Port 5173 already in use"
**Symptom**: Frontend won't start
**Cause**: Another Vite server running
**Solution**:
```powershell
# Find and kill process
$processId = (Get-NetTCPConnection -LocalPort 5173).OwningProcess
Stop-Process -Id $processId -Force

# Or change port in vite.config.js
server: { port: 3000 }
```

### Issue: White blank page after build
**Symptom**: Production build shows blank page
**Cause**: Incorrect base path or routing issue
**Solution**:
```javascript
// In vite.config.js:
export default defineConfig({
  base: '/',  // Ensure this is correct
  // ...
})

// Check browser console for errors
// Open DevTools (F12) → Console tab
```

### Issue: Images not loading
**Symptom**: Broken image icons
**Cause**: Images not in public folder or incorrect paths
**Solution**:
```powershell
# Verify images exist
Get-ChildItem frontend\public\

# Correct image paths:
# Should be: /logo.png (not src/assets/logo.png)

# In Vue components:
<img src="/logo.png" alt="Logo" />
```

### Issue: "Module not found" errors
**Symptom**: Import errors in console
**Cause**: Missing dependencies or incorrect imports
**Solution**:
```powershell
# Reinstall dependencies
cd frontend
npm install

# Check import paths are correct
# Use @/ for src folder: import { ref } from 'vue'
```

### Issue: Styles not applying
**Symptom**: Page looks unstyled
**Cause**: TailwindCSS not working
**Solution**:
```powershell
# Verify postcss.config.js exists
Get-Content frontend\postcss.config.js

# Verify tailwind.config.js exists
Get-Content frontend\tailwind.config.js

# Restart dev server
npm run dev
```

---

## 🔒 Authentication Issues

### Issue: Cannot login to admin panel
**Symptom**: "Invalid credentials" error
**Cause**: Database not seeded or wrong credentials
**Solution**:
```powershell
# Re-run seed script
cd backend
npm run seed

# Note the credentials displayed
# Default: admin@gsscollege.edu.in / admin123

# Or check .env file
Get-Content .env | Select-String "ADMIN"
```

### Issue: Logged out unexpectedly
**Symptom**: Redirected to login after being authenticated
**Cause**: Token expired or localStorage cleared
**Solution**:
```javascript
// JWT tokens expire after 24 hours by default
// Login again to get new token

// Or adjust expiration in backend/routes/auth.js:
const token = jwt.sign({ id: user._id }, secret, {
  expiresIn: '7d'  // Change from 24h to 7 days
});
```

### Issue: "Token invalid" after login
**Symptom**: Login succeeds but API calls fail
**Cause**: Token not stored or not sent in requests
**Solution**:
```javascript
// Check localStorage in browser:
// F12 → Application → Local Storage → adminToken

// Verify api.js sends token:
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---

## 📤 File Upload Issues

### Issue: File upload fails
**Symptom**: "File too large" or upload errors
**Cause**: File size exceeds limit or wrong file type
**Solution**:
```javascript
// Check limits in backend/middleware/upload.js:
const storage = multer.diskStorage({
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB
});

// Allowed file types:
// Images: JPEG, PNG, GIF
// Documents: PDF

// Increase limit if needed (in bytes):
limits: { fileSize: 10 * 1024 * 1024 }  // 10MB
```

### Issue: Uploaded files not accessible
**Symptom**: 404 when accessing uploaded files
**Cause**: uploads directory not served or wrong path
**Solution**:
```javascript
// Verify in backend/server.js:
app.use('/uploads', express.static('uploads'));

// Check uploads directory exists
mkdir backend\uploads -Force

// File URLs should be:
// http://localhost:5000/uploads/filename.jpg
```

### Issue: Image upload shows in admin but not on website
**Symptom**: Upload succeeds but image doesn't display
**Cause**: Incorrect image path in database
**Solution**:
```javascript
// In backend routes, ensure full URL is saved:
const imageUrl = `/uploads/${req.file.filename}`;

// Not relative path like: ./uploads/file.jpg
```

---

## ⚡ Performance Issues

### Issue: Slow page load times
**Symptom**: Pages take > 5 seconds to load
**Cause**: Large images, slow API, or network issues
**Solution**:
```powershell
# Optimize images (use tools like TinyPNG)
# Enable lazy loading (already implemented)

# Check API response times:
# Open DevTools → Network tab → Look for slow requests

# Enable production build optimizations:
cd frontend
npm run build
```

### Issue: High memory usage
**Symptom**: Application slows down over time
**Cause**: Memory leaks or large data sets
**Solution**:
```javascript
// Add pagination to API calls
// Limit results returned

// In backend routes:
const limit = parseInt(req.query.limit) || 10;
const page = parseInt(req.query.page) || 1;
const skip = (page - 1) * limit;

const items = await Model.find().limit(limit).skip(skip);
```

### Issue: Slow database queries
**Symptom**: API calls take > 1 second
**Cause**: Missing database indexes
**Solution**:
```javascript
// Add indexes to frequently queried fields
// In backend/models/*.js:

schema.index({ createdAt: -1 });
schema.index({ isActive: 1 });
schema.index({ email: 1 }, { unique: true });
```

---

## 🌐 Browser Issues

### Issue: Website works in Chrome but not in Firefox/Safari
**Symptom**: Layout broken or features not working
**Cause**: Browser compatibility issues
**Solution**:
```javascript
// Check CSS for browser-specific prefixes
// Use autoprefixer (already configured)

// Test in different browsers:
// Chrome, Firefox, Edge, Safari

// Check browser console for errors
// F12 → Console tab
```

### Issue: Layout broken on mobile
**Symptom**: Elements overlap or overflow
**Cause**: Non-responsive CSS
**Solution**:
```javascript
// Use TailwindCSS responsive classes:
// sm: md: lg: xl: 2xl:

// Example:
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Test with Chrome DevTools mobile emulator:
// F12 → Toggle device toolbar (Ctrl+Shift+M)
```

### Issue: Forms not submitting
**Symptom**: Click submit but nothing happens
**Cause**: JavaScript errors or validation issues
**Solution**:
```javascript
// Check browser console for errors
// F12 → Console tab

// Verify form has @submit.prevent:
<form @submit.prevent="handleSubmit">

// Check validation rules
// Ensure required fields are filled
```

---

## 🚀 Deployment Issues

### Issue: Build succeeds but deployment fails
**Symptom**: npm run build works, but deployment errors
**Cause**: Environment variables not set on hosting
**Solution**:
```bash
# Set environment variables on your hosting platform
# Netlify: Site settings → Build & deploy → Environment
# Vercel: Project settings → Environment Variables

# Required variables:
VITE_API_URL=https://your-api-domain.com
```

### Issue: API calls fail after deployment
**Symptom**: Works locally but not in production
**Cause**: Incorrect API URL or CORS issues
**Solution**:
```javascript
// In frontend, set production API URL:
// Create .env.production:
VITE_API_URL=https://your-backend-domain.com

// In backend, update CORS:
origin: ['https://your-frontend-domain.com'],
```

### Issue: SSL certificate errors
**Symptom**: "Not secure" warning or mixed content
**Cause**: HTTP resources on HTTPS site
**Solution**:
```bash
# Ensure all resources use HTTPS
# Check image URLs, API calls, external scripts

# Use Let's Encrypt for free SSL:
sudo certbot --nginx -d your-domain.com
```

---

## 💾 Database Issues

### Issue: Data not persisting
**Symptom**: Data disappears after restart
**Cause**: Not using persistent storage
**Solution**:
```bash
# Ensure MongoDB uses persistent data directory
mongod --dbpath C:\data\db

# Or configure in mongod.conf:
storage:
  dbPath: C:\data\db
```

### Issue: Seed script fails
**Symptom**: Error running npm run seed
**Cause**: MongoDB not connected or schema errors
**Solution**:
```powershell
# Ensure MongoDB is running
net start MongoDB

# Check connection string in .env
Get-Content backend\.env | Select-String "MONGODB"

# Run with detailed output
cd backend
node seed.js
```

### Issue: Duplicate key error
**Symptom**: Error inserting documents
**Cause**: Unique constraint violation
**Solution**:
```javascript
// Drop indexes if needed:
db.collection.dropIndex("email_1")

// Or clear collection before seeding:
await User.deleteMany({});
```

---

## 🔍 Debugging Tips

### Enable Detailed Logging

**Backend**:
```javascript
// In server.js, add:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

**Frontend**:
```javascript
// In api.js, add:
axios.interceptors.request.use(config => {
  console.log('Request:', config);
  return config;
});
```

### Check Environment Variables

```powershell
# Backend
cd backend
Get-Content .env

# Verify all required variables are set:
# PORT, MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
```

### Verify Service Status

```powershell
# Check if MongoDB is running
Get-Service MongoDB

# Check ports in use
Get-NetTCPConnection -LocalPort 5000
Get-NetTCPConnection -LocalPort 5173
```

### Browser DevTools

```
F12 → Console: JavaScript errors
F12 → Network: API calls and responses
F12 → Application: LocalStorage, cookies
F12 → Elements: Inspect HTML/CSS
```

---

## 🆘 Still Having Issues?

### Before Asking for Help

1. ✅ Check error messages carefully
2. ✅ Search this troubleshooting guide
3. ✅ Check browser console for errors
4. ✅ Verify all services are running
5. ✅ Review relevant documentation
6. ✅ Try clearing cache and restarting

### Getting Support

**Provide This Information**:
- Error message (full text)
- Steps to reproduce
- Environment (Windows version, Node version)
- What you've already tried
- Relevant code snippets
- Browser console logs

**Contact**:
- Email: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

### Documentation Resources

- [QUICKSTART.md](QUICKSTART.md) - Setup guide
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [FEATURES.md](FEATURES.md) - Feature documentation
- [INDEX.md](INDEX.md) - Documentation index

---

## 📝 Quick Command Reference

```powershell
# Start MongoDB
net start MongoDB

# Install dependencies
npm run install:all

# Seed database
cd backend; npm run seed

# Start development
npm run dev

# Check for errors
# Backend logs in terminal
# Frontend errors in browser console (F12)

# Restart everything
# Press Ctrl+C in terminals
# Start MongoDB
# Run npm run dev
```

---

**Remember**: Most issues are caused by:
1. MongoDB not running
2. Missing environment variables
3. Wrong file paths
4. Port conflicts
5. Missing dependencies

Check these first! 🎯

---

**Developed by Karmath Consultants**  
**Copyright © 2025 GSS College, Chirawa**
