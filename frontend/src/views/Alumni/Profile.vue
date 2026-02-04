<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <LoadingSpinner v-if="loading" />

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-16">
      <div class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Alumni Not Found</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <router-link 
          to="/alumni" 
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back to Directory
        </router-link>
      </div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="alumni" class="max-w-6xl mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
        <div class="px-8 pb-8">
          <div class="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
            <!-- Profile Image -->
            <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img 
                :src="getImageUrl(alumni.profileImage)" 
                :alt="alumni.firstName + ' ' + alumni.lastName"
                class="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                @error="handleImageError"
              />
            </div>
            
            <!-- Name and Title -->
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ alumni.firstName }} {{ alumni.lastName }}
              </h1>
              <p class="text-xl text-gray-700 mb-2">
                {{ alumni.currentDesignation }}
              </p>
              <p class="text-lg text-gray-600 flex items-center">
                <i class="fas fa-building mr-2"></i>
                {{ alumni.currentCompany }}
              </p>
            </div>

            <!-- Featured Badge -->
            <div v-if="alumni.isFeatured" class="flex-shrink-0">
              <span class="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                <i class="fas fa-star mr-2"></i>
                Featured Alumni
              </span>
            </div>
          </div>

          <!-- Quick Info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center text-gray-700">
              <i class="fas fa-graduation-cap text-blue-600 mr-3 text-xl"></i>
              <div>
                <p class="text-sm text-gray-500">Course</p>
                <p class="font-semibold">{{ alumni.courseName }}</p>
              </div>
            </div>
            <div class="flex items-center text-gray-700">
              <i class="fas fa-calendar text-blue-600 mr-3 text-xl"></i>
              <div>
                <p class="text-sm text-gray-500">Batch</p>
                <p class="font-semibold">{{ alumni.batch }} ({{ alumni.passoutYear }})</p>
              </div>
            </div>
            <div class="flex items-center text-gray-700">
              <i class="fas fa-industry text-blue-600 mr-3 text-xl"></i>
              <div>
                <p class="text-sm text-gray-500">Industry</p>
                <p class="font-semibold">{{ alumni.industry || 'Not specified' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Success Story -->
          <div v-if="alumni.story" class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <i class="fas fa-book-open text-blue-600 mr-3"></i>
              Success Story
            </h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ alumni.story }}</p>
          </div>

          <!-- Achievements -->
          <div v-if="alumni.achievements && alumni.achievements.length > 0" class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <i class="fas fa-trophy text-yellow-600 mr-3"></i>
              Achievements
            </h2>
            <ul class="space-y-3">
              <li 
                v-for="(achievement, index) in alumni.achievements" 
                :key="index"
                class="flex items-start text-gray-700"
              >
                <i class="fas fa-check-circle text-green-600 mr-3 mt-1 flex-shrink-0"></i>
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>

          <!-- Success Tips -->
          <div v-if="alumni.successTips" class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <i class="fas fa-lightbulb text-yellow-500 mr-3"></i>
              Advice for Students
            </h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ alumni.successTips }}</p>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Contact Information -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <div class="space-y-3">
              <a 
                v-if="alumni.email" 
                :href="'mailto:' + alumni.email"
                class="flex items-center text-gray-700 hover:text-blue-600 transition"
              >
                <i class="fas fa-envelope text-blue-600 mr-3 w-5"></i>
                <span class="text-sm">{{ alumni.email }}</span>
              </a>
              <a 
                v-if="alumni.phone" 
                :href="'tel:' + alumni.phone"
                class="flex items-center text-gray-700 hover:text-blue-600 transition"
              >
                <i class="fas fa-phone text-blue-600 mr-3 w-5"></i>
                <span class="text-sm">{{ alumni.phone }}</span>
              </a>
              <a 
                v-if="alumni.linkedinProfile" 
                :href="alumni.linkedinProfile"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center text-gray-700 hover:text-blue-600 transition"
              >
                <i class="fab fa-linkedin text-blue-600 mr-3 w-5"></i>
                <span class="text-sm">LinkedIn Profile</span>
              </a>
            </div>
          </div>

          <!-- Professional Details -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Professional Details</h3>
            <div class="space-y-4">
              <div v-if="alumni.yearsOfExperience">
                <p class="text-sm text-gray-500 mb-1">Experience</p>
                <p class="font-semibold text-gray-900">{{ alumni.yearsOfExperience }} years</p>
              </div>
              <div v-if="alumni.specialization">
                <p class="text-sm text-gray-500 mb-1">Specialization</p>
                <p class="font-semibold text-gray-900">{{ alumni.specialization }}</p>
              </div>
              <div v-if="alumni.currentLocation">
                <p class="text-sm text-gray-500 mb-1">Location</p>
                <p class="font-semibold text-gray-900 flex items-center">
                  <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>
                  {{ alumni.currentLocation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Academic Details -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Academic Details</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500 mb-1">Course</p>
                <p class="font-semibold text-gray-900">{{ alumni.courseName }}</p>
              </div>
              <div v-if="alumni.specialization">
                <p class="text-sm text-gray-500 mb-1">Specialization</p>
                <p class="font-semibold text-gray-900">{{ alumni.specialization }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Passout Year</p>
                <p class="font-semibold text-gray-900">{{ alumni.passoutYear }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Batch</p>
                <p class="font-semibold text-gray-900">{{ alumni.batch }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Directory -->
      <div class="mt-12 text-center">
        <router-link 
          to="/alumni" 
          class="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back to Alumni Directory
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const route = useRoute();
const alumni = ref(null);
const loading = ref(true);
const error = ref(null);

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/150?text=No+Image';
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imagePath}`;
};

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/150?text=No+Image';
};

const fetchAlumniProfile = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.getAlumniById(route.params.id);
    alumni.value = response.data;
  } catch (err) {
    console.error('Error fetching alumni profile:', err);
    error.value = err.response?.data?.message || 'Failed to load alumni profile. Please try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAlumniProfile();
});
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
