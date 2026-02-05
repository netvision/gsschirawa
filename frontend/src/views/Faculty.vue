<template>
  <div class="faculty-page min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
        <p class="text-xl text-primary-100">
          Dedicated educators committed to women's empowerment through education
        </p>
      </div>
    </section>

    <!-- Department Filter -->
    <section class="py-8 bg-white border-b">
      <div class="container-custom">
        <div class="flex flex-wrap gap-3">
          <button
            @click="selectedDepartment = ''"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              selectedDepartment === '' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            All Faculty
          </button>
          <button
            v-for="dept in departments"
            :key="dept"
            @click="selectedDepartment = dept"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              selectedDepartment === dept ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ dept }}
          </button>
        </div>
      </div>
    </section>

    <!-- Faculty Grid -->
    <section class="py-16">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="mt-4 text-gray-600">Loading faculty...</p>
        </div>

        <div v-else-if="filteredFaculty.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg">No faculty members found.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            v-for="member in filteredFaculty"
            :key="member._id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div class="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100">
              <img
                v-if="member.photo"
                :src="getAssetUrl(member.photo)"
                :alt="member.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div v-else class="flex items-center justify-center h-full text-6xl">
                👩‍🏫
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">
                {{ member.name }}
              </h3>
              <p class="text-primary-600 font-semibold text-sm mb-2">{{ member.designation }}</p>
              <p class="text-gray-600 text-sm mb-3">{{ member.department }}</p>
              <p v-if="member.experience" class="text-gray-500 text-xs mb-3">
                <i class="fas fa-briefcase mr-1"></i>{{ member.experience }}
              </p>
              <p v-if="member.description" class="text-gray-700 text-sm line-clamp-3">
                {{ member.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api, { getAssetUrl } from '../services/api'

const faculty = ref([])
const loading = ref(false)
const selectedDepartment = ref('')

const departments = [
  'Hindi Literature',
  'History',
  'Political Science',
  'Geography',
  'Economics',
  'English Literature',
  'Home Science',
  'Sociology',
  'Commerce',
  'Business Administration',
  'Computer Science',
  'Physical Education',
  'Library'
]

const filteredFaculty = computed(() => {
  if (!selectedDepartment.value) return faculty.value
  return faculty.value.filter(f => f.department === selectedDepartment.value)
})

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Faculty'
}

const fetchFaculty = async () => {
  loading.value = true
  try {
    const response = await api.getFaculty()
    faculty.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching faculty:', error)
    faculty.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFaculty()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
