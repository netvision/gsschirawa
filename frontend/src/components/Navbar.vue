<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <!-- Top bar with contact info -->
    <div class="bg-primary-600 text-white py-2">
      <div class="container-custom">
        <div class="flex flex-wrap justify-between items-center text-sm">
          <div class="flex flex-wrap gap-4">
            <a href="tel:+917878306013" class="hover:text-primary-100">
              📞 +91 7878306013
            </a>
            <a href="mailto:gsscollege1987@yahoo.co.in" class="hover:text-primary-100">
              ✉️ gsscollege1987@yahoo.co.in
            </a>
          </div>
          <div class="hidden md:block">
            <span class="font-hindi">{{ $t('nav.motto') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="switchLanguage"
              class="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              :title="currentLocale === 'en' ? 'Switch to Hindi' : 'Switch to English'"
            >
              {{ currentLocale === 'en' ? 'हिन्दी' : 'English' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main navbar -->
    <div class="container-custom py-4">
      <div class="flex justify-between items-center">
        <!-- Logo and college name -->
        <RouterLink to="/" class="flex items-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="GSS College Logo" 
            class="h-16 w-16 object-contain rounded-lg shadow-lg"
          />
          <div>
            <h1 class="text-xl font-bold text-gray-900 leading-tight">
              {{ $t('college.fullName') }}
            </h1>
            <p class="text-sm text-primary-600">NAAC Accredited 'B++' Grade</p>
          </div>
        </RouterLink>

        <!-- Desktop menu -->
        <div class="hidden lg:flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            active-class="text-primary-600"
          >
            {{ $t(link.i18nKey) }}
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-primary">
            {{ $t('nav.applyNow') }}
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <transition name="slide">
        <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pb-4">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block py-2 text-gray-700 hover:text-primary-600 font-medium"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            {{ $t(link.i18nKey) }}
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn btn-primary w-full mt-4"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.applyNow') }}
          </RouterLink>
          <button
            @click="switchLanguage"
            class="w-full mt-2 px-4 py-2 rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors text-sm font-medium"
          >
            {{ currentLocale === 'en' ? 'हिन्दी में पढ़ें' : 'Read in English' }}
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const mobileMenuOpen = ref(false)

const currentLocale = computed(() => locale.value)

const navLinks = [
  { i18nKey: 'nav.home', path: '/' },
  { i18nKey: 'nav.about', path: '/about' },
  { i18nKey: 'nav.courses', path: '/courses' },
  { i18nKey: 'nav.alumnae', path: '/alumnae' },
  { i18nKey: 'nav.gallery', path: '/gallery' },
  { i18nKey: 'nav.testimonials', path: '/testimonials' },
  { i18nKey: 'nav.contact', path: '/contact' }
]

const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'hi' : 'en'
  localStorage.setItem('language', locale.value)
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
