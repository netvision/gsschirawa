<template>
  <div class="admin-dashboard min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container-custom py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p class="text-sm text-gray-600">GSS College Portal</p>
          </div>
          <div class="flex items-center gap-4">
            <RouterLink to="/" class="text-sm text-primary-600 hover:text-primary-700">
              View Website
            </RouterLink>
            <button @click="handleLogout" class="btn btn-outline text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container-custom py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Courses</p>
              <p class="text-3xl font-bold text-primary-600">{{ stats.courses }}</p>
            </div>
            <div class="text-4xl">📚</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Active Events</p>
              <p class="text-3xl font-bold text-secondary-600">{{ stats.events }}</p>
            </div>
            <div class="text-4xl">📅</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Gallery Images</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.gallery }}</p>
            </div>
            <div class="text-4xl">🖼️</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">New Messages</p>
              <p class="text-3xl font-bold text-orange-600">{{ stats.contacts }}</p>
            </div>
            <div class="text-4xl">✉️</div>
          </div>
        </div>
      </div>

      <!-- Management Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Contacts -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-900">Recent Contact Submissions</h2>
          </div>
          <div class="p-6">
            <div v-if="recentContacts.length > 0" class="space-y-4">
              <div
                v-for="contact in recentContacts.slice(0, 5)"
                :key="contact._id"
                class="border-b pb-4 last:border-0"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-semibold">{{ contact.name }}</h3>
                    <p class="text-sm text-gray-600">{{ contact.email }}</p>
                  </div>
                  <span
                    class="text-xs px-2 py-1 rounded"
                    :class="{
                      'bg-green-100 text-green-700': contact.status === 'New',
                      'bg-blue-100 text-blue-700': contact.status === 'Read',
                      'bg-gray-100 text-gray-700': contact.status === 'Replied'
                    }"
                  >
                    {{ contact.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-700">
                  <strong>{{ contact.subject }}</strong>
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ new Date(contact.createdAt).toLocaleString() }}
                </p>
              </div>
            </div>
            <p v-else class="text-gray-500 text-center py-4">No contacts yet</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
              <button @click="activeTab = 'courses'" class="btn btn-primary text-sm">
                📚 Manage Courses
              </button>
              <button @click="activeTab = 'events'" class="btn btn-secondary text-sm">
                📅 Manage Events
              </button>
              <button @click="activeTab = 'notices'" class="btn btn-outline text-sm">
                📢 Manage Notices
              </button>
              <button @click="activeTab = 'gallery'" class="btn btn-outline text-sm">
                🖼️ Manage Gallery
              </button>
              <button @click="activeTab = 'testimonials'" class="btn btn-outline text-sm">
                ⭐ Manage Testimonials
              </button>
              <button @click="activeTab = 'faculty'" class="btn btn-outline text-sm">
                👩‍🏫 Manage Faculty
              </button>
              <button @click="activeTab = 'alumnae'" class="btn btn-outline text-sm">
                👩‍🎓 Manage Alumnae
              </button>
              <button @click="activeTab = 'contacts'" class="btn btn-outline text-sm">
                ✉️ View All Messages
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Management Tabs -->
      <div class="mt-8 bg-white rounded-lg shadow">
        <div class="border-b">
          <div class="flex flex-wrap gap-2 p-4">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
              :class="activeTab === tab.key 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Courses Management -->
          <div v-if="activeTab === 'courses'">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">Manage Courses</h3>
              <button @click="showCourseForm = true; editingCourse = null" class="btn btn-primary">
                + Add New Course
              </button>
            </div>

            <!-- Course Form Modal -->
            <div v-if="showCourseForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                  <h4 class="text-xl font-bold mb-4">{{ editingCourse ? 'Edit Course' : 'Add New Course' }}</h4>
                  <form @submit.prevent="saveCourse" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Course Title *</label>
                      <input v-model="courseForm.title" type="text" required class="input w-full" placeholder="e.g., Bachelor of Arts (B.A.)" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-1">Level *</label>
                        <select v-model="courseForm.level" required class="input w-full">
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Degree *</label>
                        <input v-model="courseForm.degree" type="text" required class="input w-full" placeholder="e.g., B.A., M.A." />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Duration *</label>
                      <input v-model="courseForm.duration" type="text" required class="input w-full" placeholder="e.g., 3 Years" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Description *</label>
                      <textarea v-model="courseForm.description" required rows="3" class="input w-full"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Eligibility *</label>
                      <input v-model="courseForm.eligibility" type="text" required class="input w-full" placeholder="e.g., 10+2 or equivalent" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Seats Available *</label>
                      <input v-model.number="courseForm.seats" type="number" required class="input w-full" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Subjects (comma-separated)</label>
                      <input v-model="courseForm.subjectsText" type="text" class="input w-full" placeholder="e.g., Hindi, English, Economics" />
                    </div>
                    <div class="flex items-center gap-2">
                      <input v-model="courseForm.isActive" type="checkbox" id="courseActive" />
                      <label for="courseActive" class="text-sm">Course Active</label>
                    </div>
                    <div class="flex gap-3 justify-end pt-4">
                      <button type="button" @click="showCourseForm = false" class="btn btn-outline">Cancel</button>
                      <button type="submit" class="btn btn-primary">{{ editingCourse ? 'Update' : 'Add' }} Course</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Courses List -->
            <div class="space-y-4">
              <div v-for="course in courses" :key="course._id" class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="text-lg font-semibold">{{ course.title }}</h4>
                      <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{{ course.degree }}</span>
                      <span class="text-xs px-2 py-1 rounded" :class="course.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                        {{ course.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                      <span>📚 {{ course.level }}</span>
                      <span>⏱️ {{ course.duration }}</span>
                      <span>👥 {{ course.seats }} seats</span>
                      <span v-if="course.subjects?.length">📖 {{ course.subjects.length }} subjects</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ course.description }}</p>
                  </div>
                  <div class="flex gap-2 ml-4">
                    <button @click="editCourse(course)" class="text-sm btn btn-outline py-1 px-3">Edit</button>
                    <button @click="deleteCourseItem(course._id)" class="text-sm bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded">Delete</button>
                  </div>
                </div>
              </div>
              <p v-if="courses.length === 0" class="text-center text-gray-500 py-8">No courses yet</p>
            </div>
          </div>

          <!-- Events Management -->
          <div v-else-if="activeTab === 'events'">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">Manage Events</h3>
              <button @click="showEventForm = true; editingEvent = null" class="btn btn-primary">
                + Add New Event
              </button>
            </div>

            <!-- Event Form Modal -->
            <div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                  <h4 class="text-xl font-bold mb-4">{{ editingEvent ? 'Edit Event' : 'Add New Event' }}</h4>
                  <form @submit.prevent="saveEvent" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Event Title *</label>
                      <input v-model="eventForm.title" type="text" required class="input w-full" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Description *</label>
                      <textarea v-model="eventForm.description" required rows="3" class="input w-full"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-1">Event Date *</label>
                        <input v-model="eventForm.eventDate" type="date" required class="input w-full" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Event Time</label>
                        <input v-model="eventForm.eventTime" type="time" class="input w-full" />
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-1">Location</label>
                        <input v-model="eventForm.location" type="text" class="input w-full" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Category *</label>
                        <select v-model="eventForm.category" required class="input w-full">
                          <option value="Cultural">Cultural</option>
                          <option value="Academic">Academic</option>
                          <option value="Sports">Sports</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Event Image</label>
                      <input @change="handleEventImageChange" type="file" accept="image/*" class="input w-full" />
                      <p v-if="editingEvent?.image" class="text-xs text-gray-500 mt-1">Current image will be replaced if new one is uploaded</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <input v-model="eventForm.isActive" type="checkbox" id="eventActive" />
                      <label for="eventActive" class="text-sm">Event Active</label>
                    </div>
                    <div class="flex gap-3 justify-end pt-4">
                      <button type="button" @click="showEventForm = false" class="btn btn-outline">Cancel</button>
                      <button type="submit" class="btn btn-primary">{{ editingEvent ? 'Update' : 'Add' }} Event</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Events List -->
            <div class="space-y-4">
              <div v-for="event in events" :key="event._id" class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex gap-4">
                  <img v-if="event.image" :src="getAssetUrl(event.image)" alt="" class="w-24 h-24 object-cover rounded" />
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="text-lg font-semibold">{{ event.title }}</h4>
                      <span class="text-xs px-2 py-1 rounded" :class="event.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                        {{ event.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">{{ event.description }}</p>
                    <div class="text-sm text-gray-600">
                      <span>📅 {{ new Date(event.eventDate).toLocaleDateString() }}</span>
                      <span v-if="event.eventTime" class="mx-2">• ⏰ {{ event.eventTime }}</span>
                      <span v-if="event.location" class="mx-2">• 📍 {{ event.location }}</span>
                      <span class="mx-2">• 🏷️ {{ event.category }}</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button @click="editEvent(event)" class="text-sm btn btn-outline py-1 px-3">Edit</button>
                    <button @click="deleteEventItem(event._id)" class="text-sm bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded">Delete</button>
                  </div>
                </div>
              </div>
              <p v-if="events.length === 0" class="text-center text-gray-500 py-8">No events yet</p>
            </div>
          </div>

          <!-- Notices Management -->
          <div v-else-if="activeTab === 'notices'">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">Manage Notices</h3>
              <button @click="showNoticeForm = true; editingNotice = null" class="btn btn-primary">
                + Add New Notice
              </button>
            </div>

            <!-- Notice Form Modal -->
            <div v-if="showNoticeForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                  <h4 class="text-xl font-bold mb-4">{{ editingNotice ? 'Edit Notice' : 'Add New Notice' }}</h4>
                  <form @submit.prevent="saveNotice" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Title *</label>
                      <input v-model="noticeForm.title" type="text" required class="input w-full" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Content *</label>
                      <textarea v-model="noticeForm.content" required rows="4" class="input w-full"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Priority *</label>
                      <select v-model="noticeForm.priority" required class="input w-full">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Expiry Date (Optional)</label>
                      <input v-model="noticeForm.expiryDate" type="date" class="input w-full" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">File Attachment (PDF/Image)</label>
                      <input @change="handleNoticeFileChange" type="file" accept=".pdf,image/*" class="input w-full" />
                      <p v-if="editingNotice?.file" class="text-xs text-gray-500 mt-1">Current file will be replaced if new one is uploaded</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <input v-model="noticeForm.isActive" type="checkbox" id="noticeActive" />
                      <label for="noticeActive" class="text-sm">Notice Active</label>
                    </div>
                    <div class="flex gap-3 justify-end pt-4">
                      <button type="button" @click="showNoticeForm = false" class="btn btn-outline">Cancel</button>
                      <button type="submit" class="btn btn-primary">{{ editingNotice ? 'Update' : 'Add' }} Notice</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Notices List -->
            <div class="space-y-4">
              <div v-for="notice in notices" :key="notice._id" class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="text-lg font-semibold">{{ notice.title }}</h4>
                      <span v-if="notice.priority === 'Urgent'" class="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Urgent</span>
                      <span v-else-if="notice.priority === 'High'" class="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700">High</span>
                      <span v-else-if="notice.priority === 'Medium'" class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">Medium</span>
                      <span v-else class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Low</span>
                      <span class="text-xs px-2 py-1 rounded" :class="notice.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                        {{ notice.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">{{ notice.content }}</p>
                    <div class="text-xs text-gray-500">
                      Posted: {{ new Date(notice.createdAt).toLocaleString() }}
                      <span v-if="notice.file" class="ml-3">📎 File attached</span>
                      <span v-if="notice.expiryDate" class="ml-3">⏰ Expires: {{ new Date(notice.expiryDate).toLocaleDateString() }}</span>
                    </div>
                  </div>
                  <div class="flex gap-2 ml-4">
                    <button @click="editNotice(notice)" class="text-sm btn btn-outline py-1 px-3">Edit</button>
                    <button @click="deleteNoticeItem(notice._id)" class="text-sm bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded">Delete</button>
                  </div>
                </div>
              </div>
              <p v-if="notices.length === 0" class="text-center text-gray-500 py-8">No notices yet</p>
            </div>
          </div>

          <!-- Gallery Management -->
          <div v-else-if="activeTab === 'gallery'">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">Manage Gallery</h3>
              <button @click="showGalleryForm = true" class="btn btn-primary">
                + Upload New Image
              </button>
            </div>

            <!-- Gallery Upload Modal -->
            <div v-if="showGalleryForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white rounded-lg max-w-md w-full">
                <div class="p-6">
                  <h4 class="text-xl font-bold mb-4">Upload Gallery Image</h4>
                  <form @submit.prevent="saveGalleryImage" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Image Title *</label>
                      <input v-model="galleryForm.title" type="text" required class="input w-full" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Category *</label>
                      <select v-model="galleryForm.category" required class="input w-full">
                        <option value="Campus">Campus</option>
                        <option value="Events">Events</option>
                        <option value="Sports">Sports</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Academic">Academic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Description (Optional)</label>
                      <textarea v-model="galleryForm.description" rows="2" class="input w-full"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Image File *</label>
                      <input @change="handleGalleryImageChange" type="file" accept="image/*" required class="input w-full" />
                    </div>
                    <div class="flex gap-3 justify-end pt-4">
                      <button type="button" @click="showGalleryForm = false" class="btn btn-outline">Cancel</button>
                      <button type="submit" class="btn btn-primary">Upload Image</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Gallery Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="image in galleryImages" :key="image._id" class="relative group">
                <img :src="getAssetUrl(image.image)" :alt="image.title" class="w-full h-48 object-cover rounded-lg" />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                    <p class="text-white text-sm font-semibold text-center px-2">{{ image.title }}</p>
                    <p class="text-white text-xs text-center">{{ image.category }}</p>
                    <div class="flex gap-2 justify-center mt-2">
                      <button @click="deleteGalleryImageItem(image._id)" class="text-xs bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="galleryImages.length === 0" class="text-center text-gray-500 py-8">No gallery images yet</p>
          </div>

          <!-- Testimonials Management -->
          <div v-else-if="activeTab === 'testimonials'">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">Manage Testimonials</h3>
              <button @click="showTestimonialForm = true; editingTestimonial = null" class="btn btn-primary">
                + Add New Testimonial
              </button>
            </div>

            <!-- Testimonial Form Modal -->
            <div v-if="showTestimonialForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                  <h4 class="text-xl font-bold mb-4">{{ editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial' }}</h4>
                  <form @submit.prevent="saveTestimonial" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Student Name *</label>
                      <input v-model="testimonialForm.name" type="text" required class="input w-full" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-1">Course *</label>
                        <input v-model="testimonialForm.course" type="text" required class="input w-full" placeholder="e.g., B.A. English" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Batch *</label>
                        <input v-model="testimonialForm.batch" type="text" required class="input w-full" placeholder="e.g., 2020-2023" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Testimonial Message *</label>
                      <textarea v-model="testimonialForm.message" required rows="4" class="input w-full"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Rating *</label>
                      <select v-model.number="testimonialForm.rating" required class="input w-full">
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Student Photo</label>
                      <input @change="handleTestimonialPhotoChange" type="file" accept="image/*" class="input w-full" />
                      <p v-if="editingTestimonial?.image" class="text-xs text-gray-500 mt-1">Current photo will be replaced if new one is uploaded</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <input v-model="testimonialForm.isActive" type="checkbox" id="testimonialActive" />
                      <label for="testimonialActive" class="text-sm">Testimonial Active</label>
                    </div>
                    <div class="flex gap-3 justify-end pt-4">
                      <button type="button" @click="showTestimonialForm = false" class="btn btn-outline">Cancel</button>
                      <button type="submit" class="btn btn-primary">{{ editingTestimonial ? 'Update' : 'Add' }} Testimonial</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Testimonials List -->
            <div class="space-y-4">
              <div v-for="testimonial in testimonials" :key="testimonial._id" class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex gap-4">
                  <img v-if="testimonial.image" :src="getAssetUrl(testimonial.image)" alt="" class="w-16 h-16 object-cover rounded-full" />
                  <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl" v-else>👤</div>
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="text-lg font-semibold">{{ testimonial.name }}</h4>
                      <span class="text-xs px-2 py-1 rounded" :class="testimonial.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                        {{ testimonial.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ testimonial.course }} • {{ testimonial.batch }}</p>
                    <div class="flex items-center gap-1 mb-2">
                      <span v-for="n in 5" :key="n" class="text-yellow-500">{{ n <= testimonial.rating ? '⭐' : '☆' }}</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ testimonial.message }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button @click="editTestimonial(testimonial)" class="text-sm btn btn-outline py-1 px-3">Edit</button>
                    <button @click="deleteTestimonialItem(testimonial._id)" class="text-sm bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded">Delete</button>
                  </div>
                </div>
              </div>
              <p v-if="testimonials.length === 0" class="text-center text-gray-500 py-8">No testimonials yet</p>
            </div>
          </div>

          <!-- Faculty Management -->
          <div v-else-if="activeTab === 'faculty'">
            <div class="mb-6">
              <p class="text-gray-600">Faculty management coming soon. For now, use seed script to populate faculty data.</p>
            </div>
          </div>

          <!-- Alumnae Management -->
          <div v-else-if="activeTab === 'alumnae'">
            <AlumnaeManagement />
          </div>

          <!-- Contacts Management -->
          <div v-else-if="activeTab === 'contacts'">
            <h3 class="text-xl font-bold mb-4">All Contact Submissions</h3>
            <div v-if="recentContacts.length > 0" class="space-y-4">
              <div
                v-for="contact in recentContacts"
                :key="contact._id"
                class="border rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-semibold text-lg">{{ contact.name }}</h4>
                    <p class="text-sm text-gray-600">{{ contact.email }} | {{ contact.phone }}</p>
                  </div>
                  <span
                    class="text-xs px-3 py-1 rounded"
                    :class="{
                      'bg-green-100 text-green-700': contact.status === 'New',
                      'bg-blue-100 text-blue-700': contact.status === 'Read',
                      'bg-gray-100 text-gray-700': contact.status === 'Replied'
                    }"
                  >
                    {{ contact.status }}
                  </span>
                </div>
                <p class="text-sm font-semibold mb-2">{{ contact.subject }}</p>
                <p class="text-sm text-gray-700 mb-3">{{ contact.message }}</p>
                <div class="flex items-center justify-between">
                  <p class="text-xs text-gray-500">
                    {{ new Date(contact.createdAt).toLocaleString() }}
                  </p>
                  <div class="flex gap-2">
                    <button
                      v-if="contact.status !== 'Read'"
                      @click="markAsRead(contact._id)"
                      class="text-xs btn btn-outline py-1 px-3"
                    >
                      Mark as Read
                    </button>
                    <button
                      @click="deleteContact(contact._id)"
                      class="text-xs bg-red-100 text-red-700 hover:bg-red-200 py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500 text-center py-8">No contact submissions</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api, { getAssetUrl } from '../../services/api'
import AlumnaeManagement from './AlumnaeManagement.vue'

const router = useRouter()

const stats = ref({
  courses: 0,
  events: 0,
  gallery: 0,
  contacts: 0
})

const recentContacts = ref([])
const activeTab = ref('overview')

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'courses', label: 'Courses' },
  { key: 'events', label: 'Events' },
  { key: 'notices', label: 'Notices' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'faculty', label: 'Faculty' },
  { key: 'alumnae', label: 'Alumnae' },
  { key: 'contacts', label: 'Contacts' }
]

// Courses
const courses = ref([])
const showCourseForm = ref(false)
const editingCourse = ref(null)
const courseForm = ref({
  title: '',
  level: 'Undergraduate',
  degree: '',
  duration: '',
  description: '',
  eligibility: '',
  seats: '',
  subjectsText: '',
  isActive: true
})

// Events
const events = ref([])
const showEventForm = ref(false)
const editingEvent = ref(null)
const eventForm = ref({
  title: '',
  description: '',
  eventDate: '',
  eventTime: '',
  location: '',
  category: 'Other',
  image: null,
  isActive: true
})

// Notices
const notices = ref([])
const showNoticeForm = ref(false)
const editingNotice = ref(null)
const noticeForm = ref({
  title: '',
  content: '',
  priority: 'Medium',
  expiryDate: '',
  file: null,
  isActive: true
})

// Gallery
const galleryImages = ref([])
const showGalleryForm = ref(false)
const galleryForm = ref({
  title: '',
  description: '',
  category: 'Campus',
  image: null
})

// Testimonials
const testimonials = ref([])
const showTestimonialForm = ref(false)
const editingTestimonial = ref(null)
const testimonialForm = ref({
  name: '',
  course: '',
  batch: '',
  message: '',
  rating: 5,
  image: null,
  isActive: true
})

const loadData = async () => {
  try {
    const [coursesRes, eventsRes, galleryRes, contactsRes, noticesRes, testimonialsRes] = await Promise.all([
      api.getCourses(),
      api.getEvents(),
      api.getGallery(),
      api.getContacts({ status: 'New' }),
      api.getAllNotices(),
      api.getAllTestimonials()
    ])

    stats.value = {
      courses: coursesRes.data.count,
      events: eventsRes.data.count,
      gallery: galleryRes.data.count,
      contacts: contactsRes.data.count
    }

    courses.value = coursesRes.data.data
    events.value = eventsRes.data.data
    galleryImages.value = galleryRes.data.data
    recentContacts.value = contactsRes.data.data
    notices.value = noticesRes.data.data
    testimonials.value = testimonialsRes.data.data
  } catch (error) {
    console.error('Error loading data:', error)
    alert('Error loading data. Please refresh the page.')
  }
}

// Course Management
const editCourse = (course) => {
  editingCourse.value = course
  courseForm.value = {
    title: course.title,
    level: course.level,
    degree: course.degree,
    duration: course.duration,
    description: course.description,
    eligibility: course.eligibility,
    seats: course.seats,
    subjectsText: course.subjects?.join(', ') || '',
    isActive: course.isActive
  }
  showCourseForm.value = true
}

const saveCourse = async () => {
  try {
    const data = {
      ...courseForm.value,
      subjects: courseForm.value.subjectsText.split(',').map(f => f.trim()).filter(f => f)
    }
    delete data.subjectsText

    if (editingCourse.value) {
      await api.updateCourse(editingCourse.value._id, data)
    } else {
      await api.createCourse(data)
    }

    showCourseForm.value = false
    courseForm.value = { title: '', level: 'Undergraduate', degree: '', duration: '', description: '', eligibility: '', seats: '', subjectsText: '', isActive: true }
    editingCourse.value = null
    await loadData()
    alert('Course saved successfully!')
  } catch (error) {
    console.error('Error saving course:', error)
    alert(error.response?.data?.message || 'Error saving course')
  }
}

const deleteCourseItem = async (id) => {
  if (confirm('Are you sure you want to delete this course?')) {
    try {
      await api.deleteCourse(id)
      await loadData()
      alert('Course deleted successfully!')
    } catch (error) {
      console.error('Error deleting course:', error)
      alert('Error deleting course')
    }
  }
}

// Event Management
const handleEventImageChange = (e) => {
  eventForm.value.image = e.target.files[0]
}

const editEvent = (event) => {
  editingEvent.value = event
  const eventDate = new Date(event.eventDate)
  const formattedDate = eventDate.toISOString().slice(0, 10)
  
  eventForm.value = {
    title: event.title,
    description: event.description,
    eventDate: formattedDate,
    eventTime: event.eventTime || '',
    location: event.location || '',
    category: event.category || 'Other',
    image: null,
    isActive: event.isActive
  }
  showEventForm.value = true
}

const saveEvent = async () => {
  try {
    const formData = new FormData()
    formData.append('title', eventForm.value.title)
    formData.append('description', eventForm.value.description)
    formData.append('eventDate', eventForm.value.eventDate)
    if (eventForm.value.eventTime) formData.append('eventTime', eventForm.value.eventTime)
    if (eventForm.value.location) formData.append('location', eventForm.value.location)
    formData.append('category', eventForm.value.category)
    formData.append('isActive', eventForm.value.isActive)
    if (eventForm.value.image) {
      formData.append('image', eventForm.value.image)
    }

    if (editingEvent.value) {
      await api.updateEvent(editingEvent.value._id, formData)
    } else {
      await api.createEvent(formData)
    }

    showEventForm.value = false
    eventForm.value = { title: '', description: '', eventDate: '', eventTime: '', location: '', category: 'Other', image: null, isActive: true }
    editingEvent.value = null
    await loadData()
    alert('Event saved successfully!')
  } catch (error) {
    console.error('Error saving event:', error)
    alert(error.response?.data?.message || 'Error saving event')
  }
}

const deleteEventItem = async (id) => {
  if (confirm('Are you sure you want to delete this event?')) {
    try {
      await api.deleteEvent(id)
      await loadData()
      alert('Event deleted successfully!')
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event')
    }
  }
}

// Notice Management
const handleNoticeFileChange = (e) => {
  noticeForm.value.file = e.target.files[0]
}

const editNotice = (notice) => {
  editingNotice.value = notice
  const expiryDate = notice.expiryDate ? new Date(notice.expiryDate).toISOString().slice(0, 10) : ''
  noticeForm.value = {
    title: notice.title,
    content: notice.content,
    priority: notice.priority,
    expiryDate: expiryDate,
    file: null,
    isActive: notice.isActive
  }
  showNoticeForm.value = true
}

const saveNotice = async () => {
  try {
    const formData = new FormData()
    formData.append('title', noticeForm.value.title)
    formData.append('content', noticeForm.value.content)
    formData.append('priority', noticeForm.value.priority)
    if (noticeForm.value.expiryDate) formData.append('expiryDate', noticeForm.value.expiryDate)
    formData.append('isActive', noticeForm.value.isActive)
    if (noticeForm.value.file) {
      formData.append('file', noticeForm.value.file)
    }

    if (editingNotice.value) {
      await api.updateNotice(editingNotice.value._id, formData)
    } else {
      await api.createNotice(formData)
    }

    showNoticeForm.value = false
    noticeForm.value = { title: '', content: '', priority: 'Medium', expiryDate: '', file: null, isActive: true }
    editingNotice.value = null
    await loadData()
    alert('Notice saved successfully!')
  } catch (error) {
    console.error('Error saving notice:', error)
    alert(error.response?.data?.message || 'Error saving notice')
  }
}

const deleteNoticeItem = async (id) => {
  if (confirm('Are you sure you want to delete this notice?')) {
    try {
      await api.deleteNotice(id)
      await loadData()
      alert('Notice deleted successfully!')
    } catch (error) {
      console.error('Error deleting notice:', error)
      alert('Error deleting notice')
    }
  }
}

// Gallery Management
const handleGalleryImageChange = (e) => {
  galleryForm.value.image = e.target.files[0]
}

const saveGalleryImage = async () => {
  try {
    const formData = new FormData()
    formData.append('title', galleryForm.value.title)
    if (galleryForm.value.description) formData.append('description', galleryForm.value.description)
    formData.append('category', galleryForm.value.category)
    formData.append('image', galleryForm.value.image)

    await api.uploadGalleryImage(formData)

    showGalleryForm.value = false
    galleryForm.value = { title: '', description: '', category: 'Campus', image: null }
    await loadData()
    alert('Image uploaded successfully!')
  } catch (error) {
    console.error('Error uploading image:', error)
    alert(error.response?.data?.message || 'Error uploading image')
  }
}

const deleteGalleryImageItem = async (id) => {
  if (confirm('Are you sure you want to delete this image?')) {
    try {
      await api.deleteGalleryImage(id)
      await loadData()
      alert('Image deleted successfully!')
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Error deleting image')
    }
  }
}

// Testimonial Management
const handleTestimonialPhotoChange = (e) => {
  testimonialForm.value.image = e.target.files[0]
}

const editTestimonial = (testimonial) => {
  editingTestimonial.value = testimonial
  testimonialForm.value = {
    name: testimonial.name,
    course: testimonial.course,
    batch: testimonial.batch,
    message: testimonial.message,
    rating: testimonial.rating,
    image: null,
    isActive: testimonial.isActive
  }
  showTestimonialForm.value = true
}

const saveTestimonial = async () => {
  try {
    const formData = new FormData()
    formData.append('name', testimonialForm.value.name)
    formData.append('course', testimonialForm.value.course)
    formData.append('batch', testimonialForm.value.batch)
    formData.append('message', testimonialForm.value.message)
    formData.append('rating', testimonialForm.value.rating)
    formData.append('isActive', testimonialForm.value.isActive)
    if (testimonialForm.value.image) {
      formData.append('image', testimonialForm.value.image)
    }

    if (editingTestimonial.value) {
      await api.updateTestimonial(editingTestimonial.value._id, formData)
    } else {
      await api.createTestimonial(formData)
    }

    showTestimonialForm.value = false
    testimonialForm.value = { name: '', course: '', batch: '', message: '', rating: 5, image: null, isActive: true }
    editingTestimonial.value = null
    await loadData()
    alert('Testimonial saved successfully!')
  } catch (error) {
    console.error('Error saving testimonial:', error)
    alert(error.response?.data?.message || 'Error saving testimonial')
  }
}

const deleteTestimonialItem = async (id) => {
  if (confirm('Are you sure you want to delete this testimonial?')) {
    try {
      await api.deleteTestimonial(id)
      await loadData()
      alert('Testimonial deleted successfully!')
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Error deleting testimonial')
    }
  }
}

// Contact Management
const markAsRead = async (id) => {
  try {
    await api.updateContactStatus(id, 'Read')
    await loadData()
  } catch (error) {
    console.error('Error updating contact:', error)
  }
}

const deleteContact = async (id) => {
  if (confirm('Are you sure you want to delete this contact?')) {
    try {
      await api.deleteContact(id)
      await loadData()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }
}

const handleLogout = () => {
  localStorage.removeItem('adminToken')
  router.push('/admin/login')
}

onMounted(() => {
  loadData()
})
</script>
