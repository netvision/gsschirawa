<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <!-- Top bar with contact info -->
    <div class="bg-primary-600 text-white py-2">
      <div class="container-custom">
        <div class="flex flex-wrap justify-between items-center text-sm">
          <div class="flex flex-wrap gap-4">
            <a href="tel:+917878306013" class="hover:text-primary-100">
              <PurchasedIcon name="phone" class="mr-1" /> +91 7878306013
            </a>
            <a href="mailto:gsscollege1987@yahoo.co.in" class="hover:text-primary-100">
              <PurchasedIcon name="envelope" class="mr-1" /> gsscollege1987@yahoo.co.in
            </a>
          </div>
          <div class="hidden md:block">
            <span class="font-hindi">{{ $t('nav.motto') }}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="hidden sm:flex items-center gap-3">
              <a
                href="https://www.instagram.com/gsschirawa?igsh=MXAwaHF0c3JuYjltYw=="
                class="text-white/90 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1017.5 13 5.506 5.506 0 0012 7.5zm0 2A3.5 3.5 0 1115.5 13 3.504 3.504 0 0112 9.5zm5.25-.75a1 1 0 10.001 2.001A1 1 0 0017.25 8.75z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/gsschirawa/"
                class="text-white/90 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@gsschirawa7456"
                class="text-white/90 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.004 3.004 0 00-2.116-2.126C19.59 3.5 12 3.5 12 3.5s-7.59 0-9.382.56A3.004 3.004 0 00.502 6.186C0 7.98 0 11.5 0 11.5s0 3.52.502 5.314a3.004 3.004 0 002.116 2.126C4.41 19.5 12 19.5 12 19.5s7.59 0 9.382-.56a3.004 3.004 0 002.116-2.126C24 15.02 24 11.5 24 11.5s0-3.52-.502-5.314zM9.75 14.97V8.03l6.2 3.47-6.2 3.47z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/917878306013"
                class="text-white/90 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.16 6.42 2.16 11.88c0 1.95.5 3.85 1.45 5.53L2 22l4.77-1.25a9.81 9.81 0 005.27 1.52h.01c5.46 0 9.88-4.42 9.88-9.88C21.93 6.42 17.5 2 12.04 2zm5.68 14.09c-.24.68-1.4 1.3-1.94 1.37-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.04-1.31-5.02-4.52-5.17-4.73-.15-.21-1.24-1.65-1.24-3.14s.78-2.22 1.05-2.52c.28-.3.6-.37.8-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.57.82 1.98.89 2.12.07.14.11.31.02.5-.09.19-.13.31-.27.48-.14.17-.29.38-.42.51-.14.14-.29.29-.12.58.17.29.74 1.22 1.59 1.97 1.09.96 2.01 1.26 2.3 1.4.29.14.46.12.63-.07.17-.19.72-.83.92-1.11.19-.28.38-.23.64-.14.26.09 1.66.78 1.94.92.28.14.47.21.54.33.06.12.06.69-.18 1.37z"/>
                </svg>
              </a>
            </div>
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
import PurchasedIcon from '@/components/PurchasedIcon.vue'

const { locale } = useI18n()
const mobileMenuOpen = ref(false)

const currentLocale = computed(() => locale.value)

const navLinks = [
  { i18nKey: 'nav.home', path: '/' },
  { i18nKey: 'nav.about', path: '/about' },
  { i18nKey: 'nav.facilities', path: '/facilities' },
  { i18nKey: 'nav.courses', path: '/courses' },
  { i18nKey: 'nav.faculty', path: '/faculty' },
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
