import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: "Home - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: "About Us - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue'),
    meta: { title: "Courses - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
    meta: { title: "Gallery - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: () => import('../views/Testimonials.vue'),
    meta: { title: "Testimonials - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: "Contact Us - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/alumni',
    name: 'AlumniDirectory',
    component: () => import('../views/Alumni/Directory.vue'),
    meta: { title: "Alumni Directory - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/alumni/:id',
    name: 'AlumniProfile',
    component: () => import('../views/Alumni/Profile.vue'),
    meta: { title: "Alumni Profile - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/alumni/register',
    name: 'AlumniRegister',
    component: () => import('../views/Alumni/Register.vue'),
    meta: { title: "Register as Alumni - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { title: 'Admin Dashboard', requiresAuth: true }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/Login.vue'),
    meta: { title: 'Admin Login' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || "Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College"

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
