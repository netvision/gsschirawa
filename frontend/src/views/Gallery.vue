<template>
  <div class="gallery">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('gallery.pageTitle') }}</h1>
        <p class="text-xl text-primary-100">
          {{ $t('gallery.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Category Filters -->
    <section class="py-8 bg-gray-50">
      <div class="container-custom">
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            @click="selectedCategory = ''"
            :class="selectedCategory === '' ? 'btn-primary' : 'btn-outline'"
            class="btn"
          >
            All
          </button>
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="selectedCategory === category ? 'btn-primary' : 'btn-outline'"
            class="btn"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-16">
      <div class="container-custom">
        <LoadingSpinner v-if="loading" />

        <div v-else-if="filteredImages.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="image in filteredImages"
            :key="image._id"
            class="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            @click="openLightbox(image)"
          >
            <div class="relative aspect-square">
              <img
                :src="image.image"
                :alt="image.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 class="font-semibold mb-1">{{ image.title }}</h3>
                  <p v-if="image.description" class="text-sm text-gray-200">
                    {{ image.description }}
                  </p>
                  <span class="text-xs bg-white/20 px-2 py-1 rounded mt-2 inline-block">
                    {{ image.category }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">No images found in this category.</p>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        @click="closeLightbox"
      >
        <button
          class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          @click="closeLightbox"
        >
          &times;
        </button>
        <div class="max-w-5xl max-h-full" @click.stop>
          <img
            :src="selectedImage.image"
            :alt="selectedImage.title"
            class="max-w-full max-h-[80vh] object-contain mx-auto"
          />
          <div class="text-white text-center mt-4">
            <h3 class="text-2xl font-semibold mb-2">{{ selectedImage.title }}</h3>
            <p v-if="selectedImage.description" class="text-gray-300">
              {{ selectedImage.description }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const images = ref([])
const loading = ref(true)
const selectedCategory = ref('')
const selectedImage = ref(null)

const categories = ['Campus', 'Events', 'Cultural', 'Sports', 'Academic', 'Other']

const filteredImages = computed(() => {
  if (!selectedCategory.value) return images.value
  return images.value.filter(img => img.category === selectedCategory.value)
})

const openLightbox = (image) => {
  selectedImage.value = image
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}

onMounted(async () => {
  try {
    const response = await api.getGallery()
    images.value = response.data.data
  } catch (error) {
    console.error('Error loading gallery:', error)
  } finally {
    loading.value = false
  }
})
</script>
