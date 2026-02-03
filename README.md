# GSS College Portal

Modern, responsive college website for **Ginni Devi Satyanarayan Sekhsaria Girls P.G. College, Chirawa**

## 🎓 Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern Stack**: Vue 3 + Node.js + MongoDB
- **SEO Optimized**: Meta tags, structured data, accessibility
- **Admin Panel**: Manage courses, events, and notices
- **Dynamic Content**: Real-time updates from backend
- **Performance**: Lazy loading, caching, and optimizations

## 📚 Documentation

We've created comprehensive documentation to help you get started:

- **[📖 INDEX.md](INDEX.md)** - Documentation index and navigation
- **[🚀 QUICKSTART.md](QUICKSTART.md)** - ⭐ **START HERE** - Beginner-friendly Windows guide
- **[⚙️ SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[📋 CHECKLIST.md](CHECKLIST.md)** - Complete setup and launch checklist
- **[✨ FEATURES.md](FEATURES.md)** - Comprehensive features documentation
- **[🚀 DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[📊 PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB installed and running

### Installation (5 Steps)

1. **Install all dependencies:**
   ```powershell
   npm run install:all
   ```

2. **Configure environment variables:**
   ```powershell
   Copy-Item backend\.env.example backend\.env
   # Edit backend\.env with your settings
   ```

3. **Start MongoDB:**
   ```powershell
   net start MongoDB
   ```

4. **Seed the database:**
   ```powershell
   cd backend
   npm run seed
   cd ..
   ```

5. **Start development servers:**
   ```powershell
   npm run dev
   ```

### Access the Portal
- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login
- **Default Admin**: admin@gsscollege.edu.in / admin123

⚠️ **Change the admin password immediately after first login!**

For detailed instructions, see [QUICKSTART.md](QUICKSTART.md)

## 📁 Project Structure

```
gsscollege/
├── frontend/          # Vue 3 + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   └── assets/
│   └── public/
├── backend/           # Node.js + Express + MongoDB
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
└── package.json
```

## 🎨 Pages

- **Home**: Hero section with accreditation badge
- **About**: Mission, vision, and college information
- **Courses**: UG/PG programs with filtering
- **Gallery**: Campus and event photos
- **Testimonials**: Alumni experiences
- **Contact**: Form and location map
- **Admin**: Content management panel

## 🛠 Technologies

- **Frontend**: Vue 3, Vite, TailwindCSS, Vue Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Dev Tools**: ESLint, Prettier, Concurrently

## 📞 Contact

**Ginni Devi Satyanarayan Sekhsaria Girls P.G. College**
- Tel: +91 7878306013, +91 01596-220289
- Email: gsscollege1987@yahoo.co.in
- Address: Chirawa, Jhunjhunu, Rajasthan – 333026

---

**Powered by Karmath Consultants** | Copyright © 2025 GSS College
