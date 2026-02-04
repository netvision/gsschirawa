# GSS College Portal - Setup Guide

## 🖥️ Server Information

**Production Environment**
- **Live Server**: Linode Instance at 172.104.207.144
- **SSH Access**: `ssh root@172.104.207.144`

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Installation Steps

### 1. Clone or Extract the Project

If you received this as a zip file, extract it to your desired location.

### 2. Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
npm run install:all
```

This will install dependencies for the main project, frontend, and backend.

### 3. Configure Environment Variables

1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item backend\.env.example backend\.env
   ```
3. Edit `backend\.env` and update the following:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `ADMIN_EMAIL`: Admin email address
   - `ADMIN_PASSWORD`: Admin password (change this!)

### 4. Start MongoDB

Ensure MongoDB is running on your system:

```powershell
# If MongoDB is installed as a service
net start MongoDB

# Or start manually
mongod --dbpath C:\data\db
```

### 5. Seed the Database

Initialize the database with sample data:

```powershell
cd backend
node seed.js
cd ..
```

This will create:
- Admin user account
- Sample courses
- Sample notices
- Sample testimonials

**Important**: Note the admin credentials displayed after seeding!

### 6. Start the Development Servers

From the project root directory:

```powershell
npm run dev
```

This will start both:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Accessing the Portal

### Public Website
Open your browser and navigate to: **http://localhost:5173**

### Admin Panel
1. Navigate to: **http://localhost:5173/admin/login**
2. Use the admin credentials from the seed script
3. **Important**: Change the admin password immediately after first login!

## Project Structure

```
gsscollege/
├── frontend/              # Vue 3 Frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── views/        # Page components
│   │   ├── router/       # Vue Router configuration
│   │   └── services/     # API service layer
│   └── public/           # Static assets
│
├── backend/              # Node.js Backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Express server
│
└── package.json         # Root package file
```

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install:all` - Install all dependencies

### Frontend (in `frontend/` directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend (in `backend/` directory)
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start normally
- `node seed.js` - Seed database

## Building for Production

### 1. Build Frontend
```powershell
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

### 2. Configure Backend for Production
Update `backend/.env`:
```
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

### 3. Deploy
- Upload backend files to your server
- Upload frontend `dist/` files to your web server
- Ensure MongoDB is running and accessible
- Start the backend server:
  ```powershell
  cd backend
  npm start
  ```

## Common Issues & Solutions

### MongoDB Connection Error
**Problem**: Cannot connect to MongoDB
**Solution**: 
- Ensure MongoDB is running: `net start MongoDB`
- Check the connection string in `.env`

### Port Already in Use
**Problem**: Port 5000 or 5173 is already in use
**Solution**: 
- Change the port in `backend/.env` or `frontend/vite.config.js`
- Or stop the process using that port

### Admin Login Not Working
**Problem**: Cannot login to admin panel
**Solution**: 
- Ensure you've run the seed script: `node backend/seed.js`
- Use the exact credentials displayed after seeding
- Check browser console for errors

### Images Not Loading
**Problem**: Uploaded images don't appear
**Solution**: 
- Ensure `backend/uploads/` directory exists
- Check file permissions
- Verify the proxy configuration in `frontend/vite.config.js`

## Adding Content

### Adding Logo and Images

1. Replace `frontend/public/logo.png` with your college logo
2. Add images to `frontend/public/`:
   - `hero-image.jpg` - Homepage hero section
   - `about-college.jpg` - About page
   - `favicon.png` - Browser favicon

### Managing Content via Admin Panel

After logging in to the admin panel, you can:

1. **Courses**: Add, edit, or remove course offerings
2. **Events**: Manage upcoming and past events
3. **Notices**: Post important announcements
4. **Gallery**: Upload campus and event photos
5. **Testimonials**: Add alumni testimonials
6. **Contacts**: View and manage contact form submissions

## Security Considerations

### Before Going Live:

1. **Change Admin Password**: Use a strong, unique password
2. **Update JWT Secret**: Generate a random, complex secret key
3. **Enable HTTPS**: Use SSL certificates for secure communication
4. **Configure CORS**: Limit CORS to your domain only
5. **Rate Limiting**: Already configured, but adjust as needed
6. **Environment Variables**: Never commit `.env` files to version control
7. **MongoDB**: Enable authentication and use strong credentials

## Support

For technical support or questions:
- Email: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

## Credits

**Developed by**: Karmath Consultants
**Copyright**: © 2025 GSS College, Chirawa

---

## Quick Reference Commands

```powershell
# Install everything
npm run install:all

# Start development (from root)
npm run dev

# Seed database (from backend/)
node seed.js

# Build for production (from frontend/)
npm run build

# Start backend in production (from backend/)
npm start
```

Happy coding! 🚀
