import axios from 'axios'

// Get API base URL from environment variable or use relative path
const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5002'

// Asset URL helper (uploads, images)
const assetBaseURL = apiBaseURL
const getAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${assetBaseURL}${path}`
}

const api = axios.create({
  baseURL: `${apiBaseURL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export { assetBaseURL, getAssetUrl }

export default {
  // Courses
  getCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),

  // Events
  getEvents: (params) => api.get('/events', { params }),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post('/events', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateEvent: (id, data) => api.put(`/events/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteEvent: (id) => api.delete(`/events/${id}`),

  // Contact
  submitContact: (data) => api.post('/contact', data),
  getContacts: (params) => api.get('/contact', { params }),
  updateContactStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  deleteContact: (id) => api.delete(`/contact/${id}`),

  // Notices
  getNotices: () => api.get('/notices'),
  getAllNotices: () => api.get('/notices/all'),
  createNotice: (data) => api.post('/notices', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateNotice: (id, data) => api.put(`/notices/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteNotice: (id) => api.delete(`/notices/${id}`),

  // Gallery
  getGallery: (params) => api.get('/gallery', { params }),
  uploadGalleryImage: (data) => api.post('/gallery', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateGalleryImage: (id, data) => api.put(`/gallery/${id}`, data),
  deleteGalleryImage: (id) => api.delete(`/gallery/${id}`),

  // Testimonials
  getTestimonials: () => api.get('/testimonials'),
  getAllTestimonials: () => api.get('/testimonials/all'),
  createTestimonial: (data) => api.post('/testimonials', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),

  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data)
}
