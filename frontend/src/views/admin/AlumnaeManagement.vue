<template>
  <div class="alumnae-management">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Alumnae Management</h1>
      <p class="text-gray-600">Review, verify, and manage alumna registrations</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Pending</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <i class="fas fa-clock text-yellow-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Verified</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.verified }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="fas fa-check-circle text-green-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Featured</p>
            <p class="text-2xl font-bold text-blue-600">{{ stats.featured }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="fas fa-star text-blue-600 text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <i class="fas fa-users text-gray-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="border-b">
        <div class="flex space-x-8 px-6">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="py-4 px-2 border-b-2 font-medium text-sm transition"
            :class="activeTab === tab.key 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.label }}
            <span 
              v-if="tab.key === 'pending' && stats.pending > 0"
              class="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
            >
              {{ stats.pending }}
            </span>
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="p-6 border-b">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email, or company..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            @click="showAddModal = true"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <i class="fas fa-plus mr-2"></i>
            Add Alumna
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-12 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Loading alumnae...</p>
      </div>

      <!-- Alumnae List -->
      <div v-else-if="filteredAlumnae.length > 0" class="divide-y">
        <div
          v-for="alumna in filteredAlumnae"
          :key="alumna._id"
          class="p-6 hover:bg-gray-50 transition"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <!-- Profile Image -->
              <img
                v-if="alumna.profileImage"
                :src="getImageUrl(alumna.profileImage)"
                :alt="alumna.firstName + ' ' + alumna.lastName"
                class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                @error="handleImageError"
              />
              <div v-else class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {{ alumna.firstName.charAt(0) }}{{ alumna.lastName.charAt(0) }}
              </div>

              <!-- Details -->
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ alumna.firstName }} {{ alumna.lastName }}
                  </h3>
                  <span
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-800': alumna.status === 'pending',
                      'bg-green-100 text-green-800': alumna.status === 'verified',
                      'bg-red-100 text-red-800': alumna.status === 'rejected'
                    }"
                  >
                    {{ alumna.status }}
                  </span>
                  <span
                    v-if="alumna.isFeatured"
                    class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    <i class="fas fa-star mr-1"></i>Featured
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div class="flex items-center">
                    <i class="fas fa-briefcase mr-2 text-gray-400 w-4"></i>
                    {{ alumna.currentDesignation }} at {{ alumna.currentCompany }}
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-graduation-cap mr-2 text-gray-400 w-4"></i>
                    {{ alumna.courseName }} ({{ alumna.passoutYear }})
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-envelope mr-2 text-gray-400 w-4"></i>
                    {{ alumna.email }}
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-phone mr-2 text-gray-400 w-4"></i>
                    {{ alumna.phone }}
                  </div>
                </div>

                <div v-if="alumna.verificationNotes" class="text-sm bg-gray-100 rounded p-2 mt-2">
                  <strong>Notes:</strong> {{ alumna.verificationNotes }}
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2 ml-4">
              <button
                @click="viewDetails(alumna)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                title="View Details"
              >
                <i class="fas fa-eye"></i>
              </button>

              <button
                v-if="alumna.status === 'pending'"
                @click="verifyAlumna(alumna)"
                class="p-2 text-green-600 hover:bg-green-50 rounded transition"
                title="Verify"
              >
                <i class="fas fa-check"></i>
              </button>

              <button
                v-if="alumna.status === 'pending'"
                @click="rejectAlumna(alumna)"
                class="p-2 text-red-600 hover:bg-red-50 rounded transition"
                title="Reject"
              >
                <i class="fas fa-times"></i>
              </button>

              <button
                v-if="alumna.status === 'verified'"
                @click="toggleFeature(alumna)"
                class="p-2 hover:bg-yellow-50 rounded transition"
                :class="alumna.isFeatured ? 'text-yellow-600' : 'text-gray-400'"
                :title="alumna.isFeatured ? 'Remove from Featured' : 'Add to Featured'"
              >
                <i class="fas fa-star"></i>
              </button>

              <button
                @click="deleteAlumna(alumna)"
                class="p-2 text-red-600 hover:bg-red-50 rounded transition"
                title="Delete"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center">
        <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-600">No alumnae found</p>
      </div>
    </div>

    <!-- Details Modal -->
    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showDetailsModal = false"
    >
      <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 class="text-2xl font-bold">Alumna Details</h2>
          <button @click="showDetailsModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div v-if="selectedAlumna" class="p-6 space-y-6">
          <!-- Profile Section -->
          <div class="flex items-start space-x-6">
            <img
              v-if="selectedAlumna.profileImage"
              :src="getImageUrl(selectedAlumna.profileImage)"
              class="w-32 h-32 rounded-lg object-cover"
              @error="handleImageError"
            />
            <div class="flex-1">
              <h3 class="text-2xl font-bold mb-2">
                {{ selectedAlumna.firstName }} {{ selectedAlumna.lastName }}
              </h3>
              <p class="text-lg text-gray-700 mb-1">{{ selectedAlumna.currentDesignation }}</p>
              <p class="text-gray-600">{{ selectedAlumna.currentCompany }}</p>
            </div>
          </div>

          <!-- Story -->
          <div v-if="selectedAlumna.story">
            <h4 class="font-semibold text-gray-900 mb-2">Success Story</h4>
            <p class="text-gray-700 whitespace-pre-wrap">{{ selectedAlumna.story }}</p>
          </div>

          <!-- Achievements -->
          <div v-if="selectedAlumna.achievements && selectedAlumna.achievements.length > 0">
            <h4 class="font-semibold text-gray-900 mb-2">Achievements</h4>
            <ul class="list-disc list-inside space-y-1">
              <li v-for="(achievement, index) in selectedAlumna.achievements" :key="index" class="text-gray-700">
                {{ achievement }}
              </li>
            </ul>
          </div>

          <!-- Success Tips -->
          <div v-if="selectedAlumna.successTips">
            <h4 class="font-semibold text-gray-900 mb-2">Advice for Students</h4>
            <p class="text-gray-700 whitespace-pre-wrap">{{ selectedAlumna.successTips }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4 border-t">
            <button
              v-if="selectedAlumna.status === 'pending'"
              @click="verifyAlumna(selectedAlumna)"
              class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <i class="fas fa-check mr-2"></i>
              Verify
            </button>
            <button
              v-if="selectedAlumna.status === 'pending'"
              @click="rejectAlumna(selectedAlumna)"
              class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <i class="fas fa-times mr-2"></i>
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Alumna Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showAddModal = false"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 class="text-2xl font-bold">Add New Alumna</h2>
          <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="p-6">
          <p class="text-gray-600 mb-4">Use the <RouterLink to="/alumnae/register" class="text-blue-600 hover:underline">registration form</RouterLink> for detailed alumna addition, or manually add basic details here.</p>
          <p class="text-sm text-gray-500">Feature coming soon...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const loading = ref(false)
const alumnae = ref([])
const activeTab = ref('pending')
const searchQuery = ref('')
const showDetailsModal = ref(false)
const showAddModal = ref(false)
const selectedAlumna = ref(null)

const tabs = [
  { key: 'pending', label: 'Pending Verification' },
  { key: 'verified', label: 'Verified' },
  { key: 'all', label: 'All' }
]

const stats = computed(() => ({
  pending: alumnae.value.filter(a => a.status === 'pending').length,
  verified: alumnae.value.filter(a => a.status === 'verified').length,
  featured: alumnae.value.filter(a => a.isFeatured).length,
  total: alumnae.value.length
}))

const filteredAlumnae = computed(() => {
  let filtered = alumnae.value

  // Filter by tab
  if (activeTab.value === 'pending') {
    filtered = filtered.filter(a => a.status === 'pending')
  } else if (activeTab.value === 'verified') {
    filtered = filtered.filter(a => a.status === 'verified')
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.firstName.toLowerCase().includes(query) ||
      a.lastName.toLowerCase().includes(query) ||
      a.email.toLowerCase().includes(query) ||
      a.currentCompany.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/150?text=No+Image'
}

const fetchAlumnae = async () => {
  try {
    loading.value = true
    const response = await api.getAlumnae({ limit: 1000 })
    alumnae.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching alumnae:', error)
  } finally {
    loading.value = false
  }
}

const viewDetails = (alumna) => {
  selectedAlumna.value = alumna
  showDetailsModal.value = true
}

const verifyAlumna = async (alumna) => {
  const notes = prompt('Add verification notes (optional):')
  if (notes === null) return

  try {
    await api.verifyAlumna(alumna._id, notes)
    alumna.status = 'verified'
    alumna.verificationNotes = notes
    showDetailsModal.value = false
  } catch (error) {
    alert('Error verifying alumna: ' + (error.response?.data?.message || error.message))
  }
}

const rejectAlumna = async (alumna) => {
  const notes = prompt('Add rejection reason:')
  if (!notes) return

  try {
    await api.rejectAlumna(alumna._id, notes)
    alumna.status = 'rejected'
    alumna.verificationNotes = notes
    showDetailsModal.value = false
  } catch (error) {
    alert('Error rejecting alumna: ' + (error.response?.data?.message || error.message))
  }
}

const toggleFeature = async (alumna) => {
  try {
    await api.featureAlumna(alumna._id, !alumna.isFeatured)
    alumna.isFeatured = !alumna.isFeatured
  } catch (error) {
    alert('Error toggling feature: ' + (error.response?.data?.message || error.message))
  }
}

const deleteAlumna = async (alumna) => {
  if (!confirm(`Are you sure you want to delete ${alumna.firstName} ${alumna.lastName}? This action cannot be undone.`)) {
    return
  }

  try {
    await api.deleteAlumna(alumna._id)
    alumnae.value = alumnae.value.filter(a => a._id !== alumna._id)
    showDetailsModal.value = false
  } catch (error) {
    alert('Error deleting alumna: ' + (error.response?.data?.message || error.message))
  }
}

onMounted(() => {
  fetchAlumnae()
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
