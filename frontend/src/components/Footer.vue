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
            <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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
              <span>📍</span>
              <span>Chirawa, Jhunjhunu<br />Rajasthan – 333026</span>
            </li>
            <li class="flex items-start gap-2">
              <span>📞</span>
              <div>
                <a href="tel:+917878306013" class="hover:text-white block">+91 7878306013</a>
                <a href="tel:+911596220289" class="hover:text-white block">+91 01596-220289</a>
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span>✉️</span>
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
// Footer component
</script>
