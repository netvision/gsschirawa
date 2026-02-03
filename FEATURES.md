# GSS College Portal - Features & Technical Documentation

## 🎯 Overview

A modern, full-stack college portal for Ginni Devi Satyanarayan Sekhsaria Girls P.G. College, Chirawa. Built with Vue 3 and Node.js, featuring a responsive design, admin panel, and comprehensive content management system.

---

## 🌟 Key Features

### Public Website

#### 1. **Homepage**
- Hero section with college branding and NAAC badge
- Quick stats (Years of Excellence, Students, Faculty, NAAC Grade)
- Important notices section with priority indicators
- Why Choose Us section with 6 key benefits
- Course highlights (UG and PG programs)
- Testimonials preview carousel
- Call-to-action sections for admissions

#### 2. **About Page**
- College history and introduction
- Mission and Vision statements
- Motto in Hindi and English
- Key features and facilities (8 highlights)
- Contact information cards
- Responsive grid layouts

#### 3. **Courses Page**
- Filter by level (All, Undergraduate, Postgraduate)
- Course cards with:
  - Degree and duration
  - Description and subjects
  - Eligibility requirements
  - Available seats
- Separate sections for UG and PG programs
- Hover effects and smooth transitions

#### 4. **Gallery Page**
- Category-based filtering (Campus, Events, Cultural, Sports, Academic)
- Responsive grid layout (1-4 columns based on screen size)
- Image lightbox/modal for full-size viewing
- Lazy loading for performance
- Hover effects with image details

#### 5. **Testimonials Page**
- Alumni testimonials with ratings
- Student information (name, course, batch)
- Star ratings (1-5)
- Profile images or placeholder icons
- Responsive grid layout

#### 6. **Contact Page**
- Contact form with validation:
  - Name, Email, Phone, Subject, Message
  - Success/error notifications
- Contact information cards:
  - Address with icon
  - Phone numbers (2 lines)
  - Email address
  - Office hours
- Google Maps integration
- Responsive two-column layout

### Admin Panel

#### 1. **Authentication**
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes with middleware
- Session management
- Logout functionality

#### 2. **Dashboard**
- Statistics overview (Courses, Events, Gallery, Contacts)
- Recent contact submissions
- Quick action buttons
- Tabbed management interface

#### 3. **Content Management**
- **Courses**: Full CRUD operations
- **Events**: Create/edit with image upload
- **Notices**: Priority-based announcements with file attachments
- **Gallery**: Image uploads with categories
- **Testimonials**: Add/edit alumni feedback
- **Contacts**: View, mark as read, delete submissions

#### 4. **File Upload**
- Multer integration for image/PDF uploads
- File size limits (5MB default)
- Automatic file naming with timestamps
- Storage in `/uploads` directory

---

## 🛠 Technical Stack

### Frontend
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3.4
- **Routing**: Vue Router 4
- **State Management**: Pinia 2
- **HTTP Client**: Axios
- **Fonts**: Inter, Noto Sans Devanagari (Google Fonts)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator
- **Security**: 
  - Helmet (HTTP headers)
  - CORS
  - Rate limiting (express-rate-limit)
- **Compression**: Response compression
- **Logging**: Morgan

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: ≥ 1280px

### Mobile-First Approach
- All layouts designed for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interfaces
- Optimized navigation for small screens
- Hamburger menu on mobile

---

## 🎨 Design System

### Color Palette

#### Primary (Red)
- 50: #fef3f2
- 600: #d53a31 (Main brand color)
- 700: #b32f27 (Hover states)

#### Secondary (Blue)
- 50: #f0f9ff
- 600: #0180c9
- 700: #0266a3

#### Neutral
- Gray scale from 50 to 900
- Background: White (#ffffff)
- Text: Gray-900 (#111827)

### Typography
- **Primary Font**: Inter (300-800 weights)
- **Hindi Font**: Noto Sans Devanagari (400-700 weights)
- **Headings**: Semibold weight
- **Body**: Regular weight (400)

### Components
- **Buttons**: .btn, .btn-primary, .btn-secondary, .btn-outline
- **Cards**: .card with hover effects
- **Inputs**: .input with focus states
- **Container**: .container-custom (max-width with padding)

---

## 🔒 Security Features

### 1. **Authentication & Authorization**
- JWT-based authentication
- Token expiration (24 hours)
- Password hashing with salt rounds
- Protected admin routes
- Role-based access control (admin/editor)

### 2. **Input Validation**
- express-validator for API inputs
- Client-side form validation
- XSS protection via Helmet
- CORS configuration
- Rate limiting on API endpoints

### 3. **File Upload Security**
- File type validation (images and PDFs only)
- File size limits
- Unique file naming
- Secure storage path

### 4. **Database Security**
- Mongoose schema validation
- Input sanitization
- No SQL injection vulnerabilities
- Connection string in environment variables

---

## 📊 API Endpoints

### Public Endpoints (No Auth Required)

#### Courses
- `GET /api/courses` - List all active courses
- `GET /api/courses/:id` - Get single course

#### Events
- `GET /api/events` - List events (filter: category, upcoming)
- `GET /api/events/:id` - Get single event

#### Notices
- `GET /api/notices` - List active notices

#### Gallery
- `GET /api/gallery` - List images (filter: category)

#### Testimonials
- `GET /api/testimonials` - List active testimonials

#### Contact
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Auth Required)

#### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

#### Courses (Admin)
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

#### Events (Admin)
- `POST /api/events` - Create event (with file upload)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

#### Notices (Admin)
- `GET /api/notices/all` - List all notices
- `POST /api/notices` - Create notice (with file upload)
- `PUT /api/notices/:id` - Update notice
- `DELETE /api/notices/:id` - Delete notice

#### Gallery (Admin)
- `POST /api/gallery` - Upload image
- `PUT /api/gallery/:id` - Update image info
- `DELETE /api/gallery/:id` - Delete image

#### Testimonials (Admin)
- `GET /api/testimonials/all` - List all testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

#### Contacts (Admin)
- `GET /api/contact` - List all contacts
- `PUT /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

---

## ⚡ Performance Optimizations

### Frontend
1. **Lazy Loading**
   - Route-based code splitting
   - Image lazy loading with `loading="lazy"`
   - Dynamic imports for views

2. **Caching**
   - Browser caching for static assets
   - Service worker potential (future enhancement)

3. **Optimization**
   - Minified CSS and JavaScript
   - Tree-shaking with Vite
   - Optimized images
   - Critical CSS inlining

### Backend
1. **Response Compression**
   - Gzip compression for API responses
   - Reduced payload sizes

2. **Database Optimization**
   - Indexed fields for faster queries
   - Efficient query patterns
   - Pagination support (ready to implement)

3. **Static File Serving**
   - Express static middleware
   - Efficient file serving from `/uploads`

---

## ♿ Accessibility Features

### WCAG 2.1 Compliance
1. **Color Contrast**: All text meets AA standards
2. **Keyboard Navigation**: Full keyboard support
3. **Screen Reader Support**: Semantic HTML and ARIA labels
4. **Focus Indicators**: Visible focus states on interactive elements
5. **Alt Text**: All images have descriptive alt attributes
6. **Form Labels**: Proper label association

### Semantic HTML
- Proper heading hierarchy (h1-h6)
- Semantic tags (nav, main, footer, section, article)
- Accessible form controls
- ARIA landmarks where appropriate

---

## 🔄 State Management

### Pinia Stores (Ready for Expansion)
- Centralized state management
- Composition API style
- Easy to add stores for:
  - User authentication state
  - Cart functionality (future)
  - Notification system
  - Theme preferences

---

## 📧 Email Integration (Future Enhancement)

### Suggested Implementation
- **Contact Form**: Email notifications to admin
- **Admission Inquiries**: Auto-response emails
- **Newsletter**: Email subscription system
- **Libraries**: Nodemailer or SendGrid

---

## 🚀 Deployment Guide

### Frontend Deployment (Netlify/Vercel)
1. Build: `npm run build` in frontend/
2. Deploy `dist/` folder
3. Configure environment variables
4. Set up redirects for SPA routing

### Backend Deployment (Heroku/DigitalOcean)
1. Set environment variables
2. Ensure MongoDB is accessible
3. Configure CORS for frontend domain
4. Set up file storage (local or cloud)
5. Configure SSL certificate

### Database Deployment (MongoDB Atlas)
1. Create cluster
2. Configure network access
3. Create database user
4. Update connection string in .env

---

## 📱 PWA Potential (Future Enhancement)

### Progressive Web App Features
- Service worker for offline functionality
- Web app manifest
- Push notifications
- Install prompts
- Offline-first architecture

---

## 🧪 Testing (Recommended Setup)

### Frontend Testing
- **Unit Tests**: Vitest
- **Component Tests**: Vue Test Utils
- **E2E Tests**: Playwright or Cypress

### Backend Testing
- **Unit Tests**: Jest
- **Integration Tests**: Supertest
- **API Tests**: Postman collections

---

## 📈 Analytics Integration (Future)

### Recommended Services
- **Google Analytics 4**: User behavior tracking
- **Hotjar**: Heatmaps and user recordings
- **Plausible**: Privacy-friendly analytics

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gsscollege
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@gsscollege.edu.in
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

---

## 🎓 Educational Value

This project demonstrates:
1. Full-stack development with modern technologies
2. RESTful API design
3. Authentication and authorization
4. File upload handling
5. Responsive web design
6. Component-based architecture
7. State management
8. Database modeling
9. Security best practices
10. Performance optimization

---

## 📝 License

This project is proprietary software developed for GSS College, Chirawa.

**Copyright © 2025 GSS College, Chirawa**  
**Developed by Karmath Consultants**

---

## 🤝 Contributing

For internal development:
1. Create feature branches
2. Follow code style guidelines
3. Write meaningful commit messages
4. Test thoroughly before merging
5. Update documentation as needed

---

## 📞 Support & Maintenance

**Technical Support:**
- Karmath Consultants
- Email: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

**Recommended Maintenance:**
- Weekly database backups
- Monthly dependency updates
- Quarterly security audits
- Annual feature reviews

---

**Last Updated**: December 2025  
**Version**: 1.0.0
