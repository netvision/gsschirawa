<template>
  <div class="alumni-directory">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Alumnae Directory</h1>
        <p class="text-xl text-primary-100">
          Meet our successful graduates making a difference worldwide
        </p>
      </div>
    </section>

    <!-- Search & Filters -->
    <section class="py-8 bg-gray-50 border-b">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search by name or company..."
            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            @input="handleSearch"
          />
          <select
            v-model="filters.year"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            @change="fetchAlumni"
          >
            <option value="">All Years</option>
            <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
          </select>
          <select
            v-model="filters.industry"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            @change="fetchAlumni"
          >
            <option value="">All Industries</option>
            <option value="IT & Technology">IT & Technology</option>
            <option value="Banking & Finance">Banking & Finance</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Government">Government</option>
            <option value="NGO/Social Work">NGO/Social Work</option>
            <option value="Business/Entrepreneurship">Business/Entrepreneurship</option>
            <option value="Other">Other</option>
          </select>
          <button
            @click="clearFilters"
            class="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Alumni Grid -->
    <section class="py-16">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="mt-4 text-gray-600">Loading alumni...</p>
        </div>

        <div v-else-if="alumni.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg">No alumni found.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="alumnus in alumni"
            :key="alumnus._id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            @click="viewProfile(alumnus._id)"
          >
            <div class="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100">
              <img
                v-if="alumnus.profileImage"
                :src="getAssetUrl(alumnus.profileImage)"
                :alt="alumnus.firstName + ' ' + alumnus.lastName"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="flex items-center justify-center h-full text-6xl">
                👩‍🎓
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">
                {{ alumnus.firstName }} {{ alumnus.lastName }}
              </h3>
              <p class="text-primary-600 font-semibold mb-2">{{ alumnus.currentDesignation }}</p>
              <p class="text-gray-600 mb-3">{{ alumnus.currentCompany }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ alumnus.courseName }}</span>
                <span>{{ alumnus.passoutYear }}</span>
              </div>
              <div v-if="alumnus.industry" class="mt-3">
                <span class="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {{ alumnus.industry }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="mt-12 flex justify-center gap-2">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page === 1"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            v-for="page in paginationPages"
            :key="page"
            @click="changePage(page)"
            :class="[
              'px-4 py-2 rounded-lg transition',
              page === pagination.page
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page === pagination.pages"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div class="container-custom text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Are you an alumna?</h2>
        <p class="text-xl mb-8 text-white/90">
          Join our alumni network and inspire current students
        </p>
        <RouterLink
          to="/alumnae/register"
          class="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Register as Alumni
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api, { getAssetUrl } from '../../services/api'

const router = useRouter()

const alumnae = ref([])
const loading = ref(false)
const searchTerm = ref('')
const filters = ref({
  year: '',
  industry: ''
})
const pagination = ref({
  page: 1,
  pages: 1,
  total: 0
})

// Generate year options (1987 to current year)
const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= 1987; year--) {
    years.push(year)
  }
  return years
})

// Pagination display
const paginationPages = computed(() => {
  const pages = []
  const total = pagination.value.pages
  const current = pagination.value.page
  
  // Show max 5 pages
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  
  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const fetchAlumni = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.value.page,
      limit: 20,
      ...(searchTerm.value && { search: searchTerm.value }),
      ...(filters.value.year && { year: filters.value.year }),
      ...(filters.value.industry && { industry: filters.value.industry })
    }
    
    const response = await api.getAlumnae(params)
    alumnae.value = response.data.data
    pagination.value = response.data.pagination
  } catch (error) {
    console.error('Error fetching alumni:', error)
  } finally {
    loading.value = false
  }
}

let searchTimeout
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    fetchAlumni()
  }, 500)
}

const clearFilters = () => {
  searchTerm.value = ''
  filters.value = {
    year: '',
    industry: ''
  }
  pagination.value.page = 1
  fetchAlumni()
}

const changePage = (page) => {
  if (page < 1 || page > pagination.value.pages) return
  pagination.value.page = page
  fetchAlumni()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const viewProfile = (id) => {
  router.push(`/alumnae/${id}`)
}

onMounted(() => {
  fetchAlumni()
})
</script>


