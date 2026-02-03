<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fadeIn">
            <div class="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-4">
              ⭐ NAAC Accredited 'B++' Grade
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ginni Devi Satyanarayan Sekhsaria Girls P.G. College
            </h1>
            <p class="text-xl mb-4 text-primary-100">Chirawa, Jhunjhunu, Rajasthan</p>
            <p class="text-lg mb-8 font-hindi text-yellow-300">
              {{ $t('nav.motto') }}
            </p>
            <p class="text-lg mb-8 leading-relaxed">
              {{ $t('home.heroSubtitle') }}
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink to="/courses" class="btn bg-white text-primary-600 hover:bg-gray-100">
                {{ $t('home.exploreButton') }}
              </RouterLink>
              <RouterLink to="/contact" class="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                {{ $t('home.contactButton') }}
              </RouterLink>
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="rounded-2xl shadow-2xl bg-gradient-to-br from-primary-700 to-secondary-600 p-12 text-center">
              <div class="text-6xl mb-4">🎓</div>
              <p class="text-2xl font-bold mb-2">GSS College</p>
              <p class="text-lg opacity-90">Add hero-image.jpg to frontend/public/</p>
              <p class="text-sm opacity-75 mt-4">Recommended size: 1920x600px</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-50 py-16">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">35+</div>
            <div class="text-gray-600">{{ $t('home.statsYears') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">2000+</div>
            <div class="text-gray-600">{{ $t('home.statsStudents') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div class="text-gray-600">{{ $t('home.statsFaculty') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ courses.length }}+</div>
            <div class="text-gray-600">{{ $t('home.statsCourses') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Important Notices -->
    <section v-if="notices.length > 0" class="py-12 bg-yellow-50">
      <div class="container-custom">
        <div class="flex items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-900">📢 {{ $t('home.noticesTitle') }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="notice in notices.slice(0, 3)"
            :key="notice._id"
            class="bg-white p-6 rounded-lg shadow-md border-l-4"
            :class="{
              'border-red-500': notice.priority === 'Urgent',
              'border-orange-500': notice.priority === 'High',
              'border-blue-500': notice.priority === 'Medium',
              'border-gray-500': notice.priority === 'Low'
            }"
          >
            <div class="flex items-start justify-between mb-2">
              <span
                class="text-xs font-semibold px-2 py-1 rounded"
                :class="{
                  'bg-red-100 text-red-700': notice.priority === 'Urgent',
                  'bg-orange-100 text-orange-700': notice.priority === 'High',
                  'bg-blue-100 text-blue-700': notice.priority === 'Medium',
                  'bg-gray-100 text-gray-700': notice.priority === 'Low'
                }"
              >
                {{ notice.priority }}
              </span>
            </div>
            <h3 class="font-semibold text-lg mb-2">{{ notice.title }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ notice.content.substring(0, 100) }}...</p>
            <div class="text-xs text-gray-500">
              {{ new Date(notice.createdAt).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-16">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose GSS College?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Excellence in education, empowerment through knowledge
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="text-5xl mb-4">🎓</div>
            <h3 class="text-xl font-semibold mb-3">Quality Education</h3>
            <p class="text-gray-600">
              Comprehensive curriculum designed to meet modern educational standards
              and prepare students for successful careers.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-4">👩‍🏫</div>
            <h3 class="text-xl font-semibold mb-3">Expert Faculty</h3>
            <p class="text-gray-600">
              Dedicated and experienced teachers committed to student success
              and holistic development.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-4">🏛️</div>
            <h3 class="text-xl font-semibold mb-3">Modern Infrastructure</h3>
            <p class="text-gray-600">
              Well-equipped classrooms, library, and laboratories providing
              excellent learning environment.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-4">🎭</div>
            <h3 class="text-xl font-semibold mb-3">Extra-Curricular Activities</h3>
            <p class="text-gray-600">
              NSS, Drama clubs, sports, and cultural events for overall personality development.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-4">💰</div>
            <h3 class="text-xl font-semibold mb-3">Affordable Fees</h3>
            <p class="text-gray-600">
              Quality education at reasonable costs with scholarships
              available for deserving students.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-4">🌟</div>
            <h3 class="text-xl font-semibold mb-3">NAAC Accredited</h3>
            <p class="text-gray-600">
              B++ Grade accreditation recognizing our commitment to
              educational excellence and quality.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Highlight -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.coursesTitle') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of undergraduate and postgraduate programs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Undergraduate -->
          <div class="card">
            <h3 class="text-2xl font-bold text-primary-600 mb-4">
              Undergraduate Programs
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <div>
                  <strong>B.A. (Bachelor of Arts)</strong>
                  <p class="text-sm text-gray-600">Multiple specialization options available</p>
                </div>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <div>
                  <strong>B.Com (Bachelor of Commerce)</strong>
                  <p class="text-sm text-gray-600">Comprehensive commerce education</p>
                </div>
              </li>
            </ul>
            <RouterLink to="/courses" class="btn btn-primary mt-6 w-full">
              View All UG Courses
            </RouterLink>
          </div>

          <!-- Postgraduate -->
          <div class="card">
            <h3 class="text-2xl font-bold text-secondary-600 mb-4">
              Postgraduate Programs
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <strong>M.A. Hindi, English, Economics, Political Science, History</strong>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <strong>M.A./M.Sc. Geography</strong>
              </li>
            </ul>
            <RouterLink to="/courses" class="btn btn-secondary mt-6 w-full">
              View All PG Courses
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Preview -->
    <section v-if="testimonials.length > 0" class="py-16">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.testimonialsTitle') }}
          </h2>
          <p class="text-xl text-gray-600">
            Hear from our successful alumni
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials.slice(0, 3)"
            :key="testimonial._id"
            class="card"
          >
            <div class="flex items-center gap-4 mb-4">
              <img
                v-if="testimonial.image"
                :src="testimonial.image"
                :alt="testimonial.name"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div v-else class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                👩‍🎓
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-600">{{ testimonial.course }}</p>
                <p class="text-xs text-gray-500">Batch: {{ testimonial.batch }}</p>
              </div>
            </div>
            <p class="text-gray-600 italic">"{{ testimonial.message }}"</p>
            <div class="flex gap-1 mt-3">
              <span v-for="i in testimonial.rating" :key="i" class="text-yellow-500">⭐</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <RouterLink to="/testimonials" class="btn btn-outline">
            Read More Testimonials
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 text-white py-16">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p class="text-xl mb-8 text-primary-100">
          Join us in the pursuit of knowledge and excellence
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink to="/contact" class="btn bg-white text-primary-600 hover:bg-gray-100">
            Apply for Admission
          </RouterLink>
          <RouterLink to="/about" class="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
            Learn More About Us
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const courses = ref([])
const notices = ref([])
const testimonials = ref([])

onMounted(async () => {
  try {
    const [coursesRes, noticesRes, testimonialsRes] = await Promise.all([
      api.getCourses(),
      api.getNotices(),
      api.getTestimonials()
    ])
    courses.value = coursesRes.data.data || []
    notices.value = noticesRes.data.data || []
    testimonials.value = testimonialsRes.data.data || []
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>
