# Backend - GSS College Portal API

Node.js + Express + MongoDB backend for the GSS College Portal.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB installed and running

### Installation

```powershell
npm install
```

### Environment Setup

1. Copy environment template:
```powershell
Copy-Item .env.example .env
```

2. Edit `.env` and configure:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gsscollege
JWT_SECRET=your_secret_key_change_this
ADMIN_EMAIL=admin@gsscollege.edu.in
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

### Database Seeding

Initialize database with sample data:
```powershell
npm run seed
```

This creates:
- Admin user
- 8 sample courses
- 2 notices
- 3 testimonials

### Running the Server

**Development** (with auto-restart):
```powershell
npm run dev
```

**Production**:
```powershell
npm start
```

Server will start on: http://localhost:5000

## 📁 Project Structure

```
backend/
├── models/          # Mongoose models
│   ├── User.js
│   ├── Course.js
│   ├── Event.js
│   ├── Contact.js
│   ├── Notice.js
│   ├── Gallery.js
│   └── Testimonial.js
├── routes/          # API routes
│   ├── auth.js
│   ├── courses.js
│   ├── events.js
│   ├── contact.js
│   ├── notices.js
│   ├── gallery.js
│   └── testimonials.js
├── middleware/      # Custom middleware
│   ├── auth.js
│   └── upload.js
├── uploads/         # File uploads (created automatically)
├── server.js        # Express server
├── seed.js          # Database seeding
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Courses (Public)
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get single course

### Courses (Protected)
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event (with file)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List contacts (admin)
- `PUT /api/contact/:id` - Update status
- `DELETE /api/contact/:id` - Delete contact

### Notices
- `GET /api/notices` - List active notices
- `GET /api/notices/all` - List all (admin)
- `POST /api/notices` - Create notice
- `PUT /api/notices/:id` - Update notice
- `DELETE /api/notices/:id` - Delete notice

### Gallery
- `GET /api/gallery` - List images
- `POST /api/gallery` - Upload image
- `PUT /api/gallery/:id` - Update info
- `DELETE /api/gallery/:id` - Delete image

### Testimonials
- `GET /api/testimonials` - List active
- `GET /api/testimonials/all` - List all (admin)
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

## 🔐 Authentication

Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## 📤 File Uploads

Supported endpoints for file uploads:
- `/api/events` - Image uploads
- `/api/notices` - PDF attachments
- `/api/gallery` - Image uploads
- `/api/testimonials` - Profile images

**Restrictions**:
- Max file size: 5MB
- Allowed types: Images (JPEG, PNG, GIF) and PDFs

## 🔧 Scripts

```powershell
# Start server (production)
npm start

# Start with auto-restart (development)
npm run dev

# Seed database
npm run seed
```

## 🛡️ Security Features

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting (100 requests/15min)
- CORS protection
- Helmet security headers
- Input validation
- File upload restrictions

## 📊 Database Models

### User
- email, password, role, isActive, lastLogin

### Course
- title, level, degree, duration, description, subjects, eligibility, seats

### Event
- title, description, eventDate, eventTime, location, category, image

### Contact
- name, email, phone, subject, message, status

### Notice
- title, content, priority, file, isActive, expiryDate

### Gallery
- title, description, image, category, isActive

### Testimonial
- name, batch, course, message, image, rating, isActive

## 🐛 Troubleshooting

### MongoDB Connection Error
```powershell
# Check MongoDB is running
net start MongoDB

# Or start manually
mongod --dbpath C:\data\db
```

### Port Already in Use
Change PORT in `.env` file or kill process:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Admin Login Issues
Re-run seed script:
```powershell
npm run seed
```

## 🚀 Production Deployment

1. Set environment variables:
```env
NODE_ENV=production
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<strong_random_string>
```

2. Use process manager (PM2):
```bash
npm install -g pm2
pm2 start server.js --name gsscollege-api
pm2 save
pm2 startup
```

3. Configure reverse proxy (Nginx/Apache)

4. Enable SSL certificate

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## 📞 Support

- Email: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

## 📄 License

Copyright © 2025 GSS College, Chirawa
