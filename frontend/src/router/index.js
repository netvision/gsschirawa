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
    path: '/notices/:id',
    name: 'NoticeDetail',
    component: () => import('../views/NoticeDetail.vue'),
    meta: { title: "Notice - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/faculty',
    name: 'Faculty',
    component: () => import('../views/Faculty.vue'),
    meta: { title: "Our Faculty - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/facilities',
    name: 'Facilities',
    component: () => import('../views/Facilities.vue'),
    meta: { title: "Facilities and Infrastructure - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/alumnae',
    name: 'AlumnaeDirectory',
    component: () => import('../views/Alumnae/Directory.vue'),
    meta: { title: "Alumnae Directory - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/alumnae/:id',
    name: 'AlumnaeProfile',
    component: () => import('../views/Alumnae/Profile.vue'),
    meta: { title: "Alumna Profile - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
  },
  {
    path: '/alumnae/register',
    name: 'AlumnaeRegister',
    component: () => import('../views/Alumnae/Register.vue'),
    meta: { title: "Register as Alumna - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College" }
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
