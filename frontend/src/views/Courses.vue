<template>
  <div class="courses">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('courses.pageTitle') }}</h1>
        <p class="text-xl text-secondary-100">
          {{ $t('courses.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-8 bg-gray-50">
      <div class="container-custom">
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            @click="filterLevel = ''"
            :class="filterLevel === '' ? 'btn-primary' : 'btn-outline'"
            class="btn"
          >
            All Courses
          </button>
          <button
            @click="filterLevel = 'Undergraduate'"
            :class="filterLevel === 'Undergraduate' ? 'btn-primary' : 'btn-outline'"
            class="btn"
          >
            Undergraduate
          </button>
          <button
            @click="filterLevel = 'Postgraduate'"
            :class="filterLevel === 'Postgraduate' ? 'btn-secondary' : 'btn-outline'"
            class="btn"
          >
            Postgraduate
          </button>
        </div>
      </div>
    </section>

    <!-- Courses List -->
    <section class="py-16">
      <div class="container-custom">
        <LoadingSpinner v-if="loading" />

        <div v-else-if="filteredCourses.length > 0" class="space-y-12">
          <!-- Undergraduate Courses -->
          <div v-if="ugCourses.length > 0">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Undergraduate Programs
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="course in ugCourses"
                :key="course._id"
                class="card hover:scale-105"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <span class="bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {{ course.degree }}
                    </span>
                  </div>
                  <span class="text-gray-600 text-sm">{{ course.duration }}</span>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                  {{ course.title }}
                </h3>

                <p class="text-gray-600 mb-4 leading-relaxed">
                  {{ course.description }}
                </p>

                <div v-if="course.subjects && course.subjects.length > 0" class="mb-4">
                  <h4 class="font-semibold text-sm text-gray-700 mb-2">Subjects:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="subject in course.subjects"
                      :key="subject"
                      class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {{ subject }}
                    </span>
                  </div>
                </div>

                <div class="border-t pt-4 mt-4">
                  <div class="flex items-center justify-between text-sm">
                    <div>
                      <span class="text-gray-600">Eligibility:</span>
                      <span class="font-semibold text-gray-900 ml-1">
                        {{ course.eligibility }}
                      </span>
                    </div>
                    <div v-if="course.seats">
                      <span class="text-gray-600">Seats:</span>
                      <span class="font-semibold text-primary-600 ml-1">
                        {{ course.seats }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Postgraduate Courses -->
          <div v-if="pgCourses.length > 0">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Postgraduate Programs
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="course in pgCourses"
                :key="course._id"
                class="card hover:scale-105"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <span class="bg-secondary-100 text-secondary-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {{ course.degree }}
                    </span>
                  </div>
                  <span class="text-gray-600 text-sm">{{ course.duration }}</span>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                  {{ course.title }}
                </h3>

                <p class="text-gray-600 mb-4 leading-relaxed">
                  {{ course.description }}
                </p>

                <div v-if="course.subjects && course.subjects.length > 0" class="mb-4">
                  <h4 class="font-semibold text-sm text-gray-700 mb-2">Subjects:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="subject in course.subjects"
                      :key="subject"
                      class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {{ subject }}
                    </span>
                  </div>
                </div>

                <div class="border-t pt-4 mt-4">
                  <div class="flex items-center justify-between text-sm">
                    <div>
                      <span class="text-gray-600">Eligibility:</span>
                      <span class="font-semibold text-gray-900 ml-1">
                        {{ course.eligibility }}
                      </span>
                    </div>
                    <div v-if="course.seats">
                      <span class="text-gray-600">Seats:</span>
                      <span class="font-semibold text-secondary-600 ml-1">
                        {{ course.seats }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">No courses found.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-secondary-50">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Your Academic Journey?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact us to learn more about admissions, fee structure, and course details
        </p>
        <RouterLink to="/contact" class="btn btn-secondary">
          Apply for Admission
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const courses = ref([])
const loading = ref(true)
const filterLevel = ref('')

const filteredCourses = computed(() => {
  if (!filterLevel.value) return courses.value
  return courses.value.filter(course => course.level === filterLevel.value)
})

const ugCourses = computed(() => {
  return filteredCourses.value.filter(course => course.level === 'Undergraduate')
})

const pgCourses = computed(() => {
  return filteredCourses.value.filter(course => course.level === 'Postgraduate')
})

onMounted(async () => {
  try {
    const response = await api.getCourses({ isActive: true })
    courses.value = response.data.data
  } catch (error) {
    console.error('Error loading courses:', error)
  } finally {
    loading.value = false
  }
})
</script>
