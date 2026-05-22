<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Main footer content -->
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About section -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">{{ $t('footer.aboutTitle') }}</h3>
          <p class="text-sm leading-relaxed mb-4">
            {{ $t('footer.aboutText') }}
          </p>
          <div class="flex gap-3">
            <a
              href="https://www.instagram.com/gsschirawa?igsh=MXAwaHF0c3JuYjltYw=="
              class="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1017.5 13 5.506 5.506 0 0012 7.5zm0 2A3.5 3.5 0 1115.5 13 3.504 3.504 0 0112 9.5zm5.25-.75a1 1 0 10.001 2.001A1 1 0 0017.25 8.75z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/gsschirawa/"
              class="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@gsschirawa7456"
              class="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.004 3.004 0 00-2.116-2.126C19.59 3.5 12 3.5 12 3.5s-7.59 0-9.382.56A3.004 3.004 0 00.502 6.186C0 7.98 0 11.5 0 11.5s0 3.52.502 5.314a3.004 3.004 0 002.116 2.126C4.41 19.5 12 19.5 12 19.5s7.59 0 9.382-.56a3.004 3.004 0 002.116-2.126C24 15.02 24 11.5 24 11.5s0-3.52-.502-5.314zM9.75 14.97V8.03l6.2 3.47-6.2 3.47z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/917878306013"
              class="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.16 6.42 2.16 11.88c0 1.95.5 3.85 1.45 5.53L2 22l4.77-1.25a9.81 9.81 0 005.27 1.52h.01c5.46 0 9.88-4.42 9.88-9.88C21.93 6.42 17.5 2 12.04 2zm5.68 14.09c-.24.68-1.4 1.3-1.94 1.37-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.04-1.31-5.02-4.52-5.17-4.73-.15-.21-1.24-1.65-1.24-3.14s.78-2.22 1.05-2.52c.28-.3.6-.37.8-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.57.82 1.98.89 2.12.07.14.11.31.02.5-.09.19-.13.31-.27.48-.14.17-.29.38-.42.51-.14.14-.29.29-.12.58.17.29.74 1.22 1.59 1.97 1.09.96 2.01 1.26 2.3 1.4.29.14.46.12.63-.07.17-.19.72-.83.92-1.11.19-.28.38-.23.64-.14.26.09 1.66.78 1.94.92.28.14.47.21.54.33.06.12.06.69-.18 1.37z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">{{ $t('footer.quickLinks') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/" class="hover:text-white transition-colors">{{ $t('nav.home') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="hover:text-white transition-colors">{{ $t('nav.about') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/courses" class="hover:text-white transition-colors">{{ $t('nav.courses') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/gallery" class="hover:text-white transition-colors">{{ $t('nav.gallery') }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-white transition-colors">{{ $t('nav.contact') }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Courses -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">{{ $t('footer.popularCourses') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>B.A. (Bachelor of Arts)</li>
            <li>B.Com (Bachelor of Commerce)</li>
            <li>M.A. Hindi</li>
            <li>M.A. English</li>
            <li>M.A. Economics</li>
          </ul>
        </div>

        <!-- Contact info -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">{{ $t('footer.contactInfo') }}</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-2">
              <PurchasedIcon name="map-marker" class="mt-0.5" />
              <span>Chirawa, Jhunjhunu<br />Rajasthan – 333026</span>
            </li>
            <li class="flex items-start gap-2">
              <PurchasedIcon name="phone" class="mt-0.5" />
              <div>
                <a href="tel:+917878306013" class="hover:text-white block">+91 7878306013</a>
                <a href="tel:+911596220289" class="hover:text-white block">+91 01596-220289</a>
              </div>
            </li>
            <li class="flex items-start gap-2">
              <PurchasedIcon name="envelope" class="mt-0.5" />
              <a href="mailto:gsscollege1987@yahoo.co.in" class="hover:text-white">
                gsscollege1987@yahoo.co.in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-800">
      <div class="container-custom py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            {{ $t('footer.copyright') }}
          </p>
          <p>
            {{ $t('footer.poweredBy') }} <span class="text-primary-500 font-semibold">Netvision</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import PurchasedIcon from '@/components/PurchasedIcon.vue'
</script>
