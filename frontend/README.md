# Frontend - GSS College Portal

Vue 3 + Vite + TailwindCSS frontend for the GSS College Portal.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+

### Installation

```powershell
npm install
```

### Development

```powershell
npm run dev
```

Opens at: http://localhost:5173

### Production Build

```powershell
npm run build
```

Output folder: `dist/`

### Preview Production Build

```powershell
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.vue
│   │   ├── Footer.vue
│   │   ├── ScrollToTop.vue
│   │   └── LoadingSpinner.vue
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Courses.vue
│   │   ├── Gallery.vue
│   │   ├── Testimonials.vue
│   │   ├── Contact.vue
│   │   └── admin/
│   │       ├── Login.vue
│   │       └── Dashboard.vue
│   ├── router/
│   │   └── index.js     # Route configuration
│   ├── services/
│   │   └── api.js       # API service layer
│   ├── App.vue          # Root component
│   ├── main.js          # App entry point
│   └── style.css        # Global styles
├── public/              # Static assets
│   ├── logo.png         # College logo
│   ├── hero-image.jpg   # Homepage hero
│   └── favicon.png      # Browser icon
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#d53a31',  // Main brand color
        700: '#b32f27',  // Hover color
      },
      secondary: {
        600: '#0180c9',
        700: '#0266a3',
      }
    }
  }
}
```

### Add Images

1. Place images in `public/` folder:
   - `logo.png` - College logo (used in navbar and footer)
   - `hero-image.jpg` - Homepage banner
   - `about-college.jpg` - About page
   - `favicon.png` - Browser tab icon

2. Images are automatically accessible at `/filename.ext`

### Modify Content

**Homepage Hero**:
- Edit `src/views/Home.vue`
- Look for the hero section

**Contact Information**:
- Edit `src/components/Footer.vue`
- Update phone, email, address

**Navigation Links**:
- Edit `src/components/Navbar.vue`
- Modify `navLinks` array

## 🧩 Components

### Navbar.vue
- Responsive navigation
- Mobile hamburger menu
- Active route highlighting
- Contact info banner

### Footer.vue
- Quick links
- Contact information
- Social media icons
- Copyright notice

### ScrollToTop.vue
- Appears after scrolling 300px
- Smooth scroll to top
- Fixed position button

### LoadingSpinner.vue
- Reusable loading indicator
- Centered display
- Used across pages

## 📄 Pages

### Public Pages

**Home** (`/`)
- Hero section
- Statistics
- Notices
- Features
- Courses preview
- Testimonials
- CTAs

**About** (`/about`)
- College information
- Mission & Vision
- Key features
- Contact cards

**Courses** (`/courses`)
- Filterable course list
- UG and PG sections
- Detailed course cards

**Gallery** (`/gallery`)
- Category filter
- Responsive grid
- Lightbox view

**Testimonials** (`/testimonials`)
- Student feedback
- Ratings display
- Alumni information

**Contact** (`/contact`)
- Contact form
- Contact information
- Google Maps
- Office hours

### Admin Pages

**Login** (`/admin/login`)
- Secure login form
- JWT authentication
- Redirect to dashboard

**Dashboard** (`/admin`)
- Statistics overview
- Content management
- Recent submissions
- Quick actions

## 🔌 API Integration

API calls are centralized in `src/services/api.js`:

```javascript
import api from '@/services/api'

// Example usage
const courses = await api.getCourses()
const response = await api.submitContact(formData)
```

All API calls go through Vite proxy to backend (http://localhost:5000).

## 🎯 Routing

Routes defined in `src/router/index.js`:

```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // ... more routes
]
```

Protected routes use `requiresAuth` meta:
```javascript
{
  path: '/admin',
  component: Dashboard,
  meta: { requiresAuth: true }
}
```

## 🔒 Authentication

Admin authentication stored in localStorage:
- Key: `adminToken`
- Value: JWT token from backend

Automatic redirect to login if:
- Token missing
- Token expired
- Invalid token

## 📱 Responsive Breakpoints

Using TailwindCSS breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Example:
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Responsive grid -->
</div>
```

## 🎨 TailwindCSS Classes

Custom utility classes in `style.css`:

```css
.btn { /* Base button */ }
.btn-primary { /* Primary button */ }
.btn-secondary { /* Secondary button */ }
.btn-outline { /* Outlined button */ }
.card { /* Card component */ }
.input { /* Form input */ }
.container-custom { /* Constrained container */ }
```

## 🚀 Performance

### Optimizations
- Route-based code splitting
- Lazy loading components
- Image lazy loading
- Tree-shaking (Vite)
- Minification (production)

### Build Analysis
```powershell
npm run build -- --mode analyze
```

## 🐛 Troubleshooting

### Port 5173 in Use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3000  // or any other port
}
```

### API Calls Failing
Check backend is running on port 5000.

Verify proxy config in `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

### Images Not Loading
- Check images exist in `public/` folder
- Verify correct file names (case-sensitive)
- Clear browser cache

## 📦 Dependencies

### Core
- **vue**: ^3.4.15
- **vue-router**: ^4.2.5
- **pinia**: ^2.1.7
- **axios**: ^1.6.5

### Dev Dependencies
- **vite**: ^5.0.11
- **@vitejs/plugin-vue**: ^5.0.3
- **tailwindcss**: ^3.4.1
- **postcss**: ^8.4.33
- **autoprefixer**: ^10.4.17

## 🚀 Deployment

### Build for Production
```powershell
npm run build
```

### Deploy to Netlify
```powershell
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```powershell
npm install -g vercel
vercel --prod
```

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## 📞 Support

- Email: gsscollege1987@yahoo.co.in
- Phone: +91 7878306013

## 📄 License

Copyright © 2025 GSS College, Chirawa
