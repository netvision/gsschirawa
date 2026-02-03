<template>
  <div class="testimonials">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('testimonials.pageTitle') }}</h1>
        <p class="text-xl text-primary-100">
          {{ $t('testimonials.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Testimonials Grid -->
    <section class="py-16">
      <div class="container-custom">
        <LoadingSpinner v-if="loading" />

        <div v-else-if="testimonials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial._id"
            class="card"
          >
            <div class="flex items-center gap-4 mb-4">
              <div v-if="testimonial.image" class="flex-shrink-0">
                <img
                  :src="getAssetUrl(testimonial.image)"
                  :alt="testimonial.name"
                  class="w-20 h-20 rounded-full object-cover border-4 border-primary-100"
                />
              </div>
              <div v-else class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl border-4 border-primary-200">
                  👩‍🎓
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h3>
                <p class="text-sm text-gray-600">{{ testimonial.course }}</p>
                <p class="text-xs text-gray-500">Batch: {{ testimonial.batch }}</p>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex gap-1 mb-2">
                <span v-for="i in 5" :key="i" class="text-lg">
                  {{ i <= testimonial.rating ? '⭐' : '☆' }}
                </span>
              </div>
              <p class="text-gray-700 italic leading-relaxed">
                "{{ testimonial.message }}"
              </p>
            </div>

            <div class="text-xs text-gray-500 pt-3 border-t">
              {{ new Date(testimonial.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) }}
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">No testimonials available.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-50">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Join Our Success Stories
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Be a part of the GSS College legacy. Start your journey with us today!
        </p>
        <RouterLink to="/contact" class="btn btn-primary">
          Apply for Admission
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api, { getAssetUrl } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const testimonials = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.getTestimonials()
    testimonials.value = response.data.data || []
  } catch (error) {
    console.error('Error loading testimonials:', error)
    testimonials.value = []
  } finally {
    loading.value = false
  }
})
</script>
