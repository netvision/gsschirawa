# 🚀 Quick Start Guide for Windows

## Step-by-Step Instructions for Beginners

### Prerequisites Check

Before starting, you need these installed:

1. **Node.js** - Check if installed:
   ```powershell
   node --version
   ```
   If not installed, download from: https://nodejs.org/ (Choose LTS version)

2. **MongoDB** - Check if installed:
   ```powershell
   mongod --version
   ```
   If not installed, download from: https://www.mongodb.com/try/download/community

---

## Installation Steps

### Step 1: Open PowerShell

1. Press `Windows + X`
2. Select "Windows PowerShell" or "Terminal"
3. Navigate to the project folder:
   ```powershell
   cd d:\dev\gsscollege
   ```

### Step 2: Install All Dependencies

Run this command and wait (it might take 5-10 minutes):

```powershell
npm run install:all
```

You should see:
- ✅ Installing root dependencies
- ✅ Installing frontend dependencies
- ✅ Installing backend dependencies

### Step 3: Setup Environment Variables

```powershell
# Copy the example environment file
Copy-Item backend\.env.example backend\.env

# Open the file to edit
notepad backend\.env
```

In the file, you can keep the defaults or update:
- Change `admin@gsschirawa.in` to your email
- Change `admin123` to a strong password
- Keep other settings as-is for now

Save and close Notepad.

### Step 4: Start MongoDB

#### Option A: MongoDB as Windows Service
```powershell
net start MongoDB
```

#### Option B: MongoDB Manual Start
```powershell
# Create data directory if it doesn't exist
mkdir C:\data\db -Force

# Start MongoDB
mongod --dbpath C:\data\db
```

Keep this window open! MongoDB needs to run in the background.

### Step 5: Setup Database

Open a **NEW** PowerShell window:

```powershell
cd d:\dev\gsscollege\backend
npm run seed
```

You should see:
- ✅ Connected to MongoDB
- ✅ Cleared existing data
- ✅ Admin user created
- ✅ Sample courses created
- ✅ Sample notices created
- ✅ Sample testimonials created

**IMPORTANT**: Write down the admin email and password shown!

### Step 6: Start the Application

From the main project folder:

```powershell
cd d:\dev\gsscollege
npm run dev
```

Wait for both servers to start. You'll see:
- ✅ Frontend running on http://localhost:5173
- ✅ Backend running on http://localhost:5000

### Step 7: Open in Browser

Open your web browser and go to:
- **Main Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login

---

## Using the Admin Panel

### Login
1. Go to http://localhost:5173/admin/login
2. Enter email: `admin@gsschirawa.in`
3. Enter password: `admin123` (or what you set in .env)
4. Click "Sign In"

### Dashboard
You'll see:
- Statistics cards (Courses, Events, Gallery, Contacts)
- Recent contact submissions
- Management buttons

### Managing Content

Click on any management button:
- **Courses**: Add/edit/delete courses
- **Events**: Create events with images
- **Notices**: Post announcements
- **Gallery**: Upload photos
- **Testimonials**: Add student feedback
- **Contacts**: View form submissions

---

## Testing the Website

### Public Pages to Check
1. **Home** - Hero section, stats, notices
2. **About** - College information, mission, vision
3. **Courses** - Filter and view all courses
4. **Gallery** - View photos (empty initially)
5. **Testimonials** - Read student feedback
6. **Contact** - Submit a test message

### Try the Contact Form
1. Go to Contact page
2. Fill in all fields
3. Click "Send Message"
4. Check admin panel to see your submission!

---

## Common Issues & Solutions

### Issue 1: "npm is not recognized"
**Problem**: Node.js not installed or not in PATH
**Solution**: 
1. Download and install Node.js from https://nodejs.org/
2. Restart PowerShell
3. Try again

### Issue 2: "MongoDB not found"
**Problem**: MongoDB not running
**Solution**:
```powershell
net start MongoDB
# Or manually:
mongod --dbpath C:\data\db
```

### Issue 3: "Port 5000 already in use"
**Problem**: Another app using port 5000
**Solution**:
1. Find what's using the port:
   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
   ```
2. Close that application or change port in `backend\.env`

### Issue 4: "Cannot connect to database"
**Problem**: MongoDB not running or wrong connection string
**Solution**:
1. Check MongoDB is running: `net start MongoDB`
2. Check `backend\.env` has correct `MONGODB_URI`

### Issue 5: Admin login not working
**Problem**: Database not seeded or wrong credentials
**Solution**:
```powershell
cd backend
npm run seed
```
Use the credentials shown after seeding.

---

## Stopping the Application

### Stop Development Servers
In the PowerShell window running `npm run dev`:
- Press `Ctrl + C`
- Type `Y` and press Enter

### Stop MongoDB (if running manually)
In the window running `mongod`:
- Press `Ctrl + C`

---

## Restarting the Application

1. Start MongoDB (if not running as service):
   ```powershell
   net start MongoDB
   ```

2. Start application:
   ```powershell
   cd d:\dev\gsscollege
   npm run dev
   ```

3. Open browser to http://localhost:5173

---

## Adding Your Own Content

### Add College Logo
1. Find your logo image file
2. Rename it to `logo.png`
3. Copy to: `frontend\public\logo.png`
4. Refresh browser

### Add Campus Images
1. Prepare your images:
   - `hero-image.jpg` - Homepage banner
   - `about-college.jpg` - About page
   - `favicon.png` - Browser icon (16x16 or 32x32)
2. Copy to: `frontend\public\`
3. Refresh browser

### Change Colors
1. Open: `frontend\tailwind.config.js`
2. Find the `colors` section
3. Change values to your preferred colors
4. Restart dev server

### Edit Content
Use the admin panel at http://localhost:5173/admin to:
- Update course information
- Add new events
- Post notices
- Upload gallery photos
- Add more testimonials

---

## Building for Production

When ready to deploy:

### Build Frontend
```powershell
cd frontend
npm run build
```
Files will be in `frontend\dist\` folder

### Prepare Backend
1. Update `backend\.env` with production settings
2. Change `NODE_ENV=production`
3. Use strong passwords
4. Configure production MongoDB URL

See `DEPLOYMENT.md` for complete deployment instructions.

---

## Getting Help

### Check Documentation
1. **README.md** - Project overview
2. **SETUP_GUIDE.md** - Detailed setup
3. **FEATURES.md** - All features explained
4. **DEPLOYMENT.md** - Production deployment
5. **PROJECT_SUMMARY.md** - Complete summary

### Error Messages
- Read the error message carefully
- Check if MongoDB is running
- Verify all environment variables
- Ensure all dependencies are installed

### Browser Console
Press `F12` in browser to see errors:
- Red messages = errors
- Yellow messages = warnings
- Console tab shows JavaScript errors

---

## Quick Command Reference

```powershell
# Install everything
npm run install:all

# Start MongoDB
net start MongoDB

# Seed database
cd backend
npm run seed
cd ..

# Start development
npm run dev

# Stop servers
# Press Ctrl+C

# Build for production
cd frontend
npm run build
```

---

## Video Tutorial (Recommended)

For visual learners, search YouTube for:
- "Node.js installation Windows"
- "MongoDB installation Windows"
- "Vue.js getting started"

---

## Success Checklist

After following this guide, you should have:
- ✅ Node.js and MongoDB installed
- ✅ All dependencies installed
- ✅ Database seeded with sample data
- ✅ Website running on http://localhost:5173
- ✅ Admin panel accessible
- ✅ Able to login to admin panel
- ✅ Contact form working
- ✅ Can add/edit content

---

## What's Next?

Now that everything is running:

1. **Explore the Website**
   - Click through all pages
   - Try the contact form
   - View on mobile (resize browser)

2. **Use Admin Panel**
   - Add your courses
   - Post some events
   - Upload gallery photos
   - Add more testimonials

3. **Customize**
   - Replace logo and images
   - Change colors if needed
   - Update contact information
   - Modify content

4. **Prepare for Launch**
   - Get a domain name
   - Choose hosting provider
   - Follow DEPLOYMENT.md
   - Go live!

---

## Contact Support

**GSS College**
- Email: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

**Technical Questions**
- Check documentation first
- Review error messages
- Verify all steps completed

---

## 🎉 Congratulations!

You've successfully set up your college portal!

**Enjoy your new website! 🚀**

---

**Powered by Karmath Consultants**  
**Copyright © 2025 GSS College, Chirawa**
