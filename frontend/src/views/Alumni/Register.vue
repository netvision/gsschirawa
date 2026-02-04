<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">Alumni Registration</h1>
        <p class="text-lg text-gray-600">Join our alumni community and stay connected!</p>
      </div>

      <!-- Progress Indicator -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="flex items-center"
            :class="{ 'flex-1': index < steps.length - 1 }"
          >
            <div class="flex flex-col items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition"
                :class="currentStep > index ? 'bg-green-500 text-white' : currentStep === index ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
              >
                <i v-if="currentStep > index" class="fas fa-check"></i>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span class="text-xs mt-2 font-medium" :class="currentStep >= index ? 'text-blue-600' : 'text-gray-500'">
                {{ step }}
              </span>
            </div>
            <div 
              v-if="index < steps.length - 1" 
              class="flex-1 h-1 mx-4"
              :class="currentStep > index ? 'bg-green-500' : 'bg-gray-300'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="submitted" class="bg-white rounded-lg shadow-lg p-8 text-center">
        <i class="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Registration Submitted Successfully!</h2>
        <p class="text-gray-600 mb-6">
          Thank you for registering. Your profile is under review and will be published once verified by the admin.
          You will receive an email notification once your profile is approved.
        </p>
        <div class="flex justify-center space-x-4">
          <router-link 
            to="/alumni" 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Alumni Directory
          </router-link>
          <router-link 
            to="/" 
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Go to Home
          </router-link>
        </div>
      </div>

      <!-- Registration Form -->
      <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-8">
        <!-- Step 1: Personal Information -->
        <div v-if="currentStep === 0" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                First Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.firstName" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.lastName" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.email" 
                type="email" 
                required
                @blur="checkEmailExists"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
              <p v-if="emailExists" class="text-red-500 text-sm mt-1">This email is already registered</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Phone <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.phone" 
                type="tel" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 1234567890"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Current Location
              </label>
              <input 
                v-model="formData.currentLocation" 
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State, Country"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <input 
                type="file" 
                @change="handleFileChange"
                accept="image/*"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p class="text-sm text-gray-500 mt-1">Recommended: Square image, max 2MB</p>
              <!-- Image Preview -->
              <div v-if="imagePreview" class="mt-4">
                <img :src="imagePreview" alt="Preview" class="w-32 h-32 rounded-full object-cover border-4 border-gray-200" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Academic Details -->
        <div v-if="currentStep === 1" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Academic Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Course <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="formData.courseName" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Course</option>
                <option value="B.A.">B.A.</option>
                <option value="B.Sc.">B.Sc.</option>
                <option value="B.Com.">B.Com.</option>
                <option value="M.A.">M.A.</option>
                <option value="M.Sc.">M.Sc.</option>
                <option value="M.Com.">M.Com.</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <input 
                v-model="formData.specialization" 
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Physics, English, Accounts"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Passout Year <span class="text-red-500">*</span>
              </label>
              <select 
                v-model.number="formData.passoutYear" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Batch <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.batch" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1987-1990"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Professional Details -->
        <div v-if="currentStep === 2" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Professional Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Current Designation <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.currentDesignation" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Software Engineer, Teacher"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Current Company <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.currentCompany" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select 
                v-model="formData.industry"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Industry</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance & Banking">Finance & Banking</option>
                <option value="Government & Public Sector">Government & Public Sector</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Media & Entertainment">Media & Entertainment</option>
                <option value="Consulting">Consulting</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input 
                v-model.number="formData.yearsOfExperience" 
                type="number" 
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input 
                v-model="formData.linkedinProfile" 
                type="url"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>
        </div>

        <!-- Step 4: Additional Information -->
        <div v-if="currentStep === 3" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Your Success Story
              </label>
              <textarea 
                v-model="formData.story" 
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your journey and success story..."
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">Share your journey after college and any notable achievements</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements
              </label>
              <div class="space-y-3">
                <div 
                  v-for="(achievement, index) in formData.achievements" 
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <input 
                    v-model="formData.achievements[index]" 
                    type="text"
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :placeholder="'Achievement ' + (index + 1)"
                  />
                  <button 
                    v-if="formData.achievements.length > 1"
                    type="button"
                    @click="removeAchievement(index)"
                    class="p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button 
                  type="button"
                  @click="addAchievement"
                  class="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <i class="fas fa-plus mr-2"></i>
                  Add Another Achievement
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Advice for Current Students
              </label>
              <textarea 
                v-model="formData.successTips" 
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share tips and advice for current students..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-800">{{ error }}</p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button 
            v-if="currentStep > 0"
            type="button"
            @click="currentStep--"
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Previous
          </button>
          <div v-else></div>

          <button 
            v-if="currentStep < steps.length - 1"
            type="button"
            @click="nextStep"
            :disabled="!canProceed"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
            <i class="fas fa-arrow-right ml-2"></i>
          </button>

          <button 
            v-else
            type="submit"
            :disabled="submitting || !canProceed"
            class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <i class="fas fa-check mr-2"></i>
            {{ submitting ? 'Submitting...' : 'Submit Registration' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '@/services/api';

const steps = ['Personal', 'Academic', 'Professional', 'Additional'];
const currentStep = ref(0);
const submitting = ref(false);
const submitted = ref(false);
const error = ref(null);
const emailExists = ref(false);
const imagePreview = ref(null);

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  currentLocation: '',
  profileImage: null,
  courseName: '',
  specialization: '',
  passoutYear: '',
  batch: '',
  currentDesignation: '',
  currentCompany: '',
  industry: '',
  yearsOfExperience: 0,
  linkedinProfile: '',
  story: '',
  achievements: [''],
  successTips: ''
});

// Generate years from 1987 to current year
const years = computed(() => {
  const currentYear = new Date().getFullYear();
  const yearsList = [];
  for (let year = currentYear; year >= 1987; year--) {
    yearsList.push(year);
  }
  return yearsList;
});

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return formData.value.firstName && formData.value.lastName && 
           formData.value.email && formData.value.phone && !emailExists.value;
  } else if (currentStep.value === 1) {
    return formData.value.courseName && formData.value.passoutYear && formData.value.batch;
  } else if (currentStep.value === 2) {
    return formData.value.currentDesignation && formData.value.currentCompany;
  }
  return true;
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.profileImage = file;
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const checkEmailExists = async () => {
  if (formData.value.email) {
    try {
      const response = await api.checkAlumniEmail(formData.value.email);
      emailExists.value = response.data.exists;
    } catch (err) {
      console.error('Error checking email:', err);
    }
  }
};

const addAchievement = () => {
  formData.value.achievements.push('');
};

const removeAchievement = (index) => {
  formData.value.achievements.splice(index, 1);
};

const nextStep = () => {
  if (canProceed.value && currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const handleSubmit = async () => {
  if (!canProceed.value) return;

  try {
    submitting.value = true;
    error.value = null;

    // Create FormData for file upload
    const submitData = new FormData();
    
    // Append all form fields
    Object.keys(formData.value).forEach(key => {
      if (key === 'achievements') {
        // Filter out empty achievements
        const validAchievements = formData.value[key].filter(a => a.trim() !== '');
        submitData.append(key, JSON.stringify(validAchievements));
      } else if (key === 'profileImage' && formData.value[key]) {
        submitData.append('profileImage', formData.value[key]);
      } else if (formData.value[key]) {
        submitData.append(key, formData.value[key]);
      }
    });

    await api.registerAlumni(submitData);
    submitted.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Error submitting registration:', err);
    error.value = err.response?.data?.message || 'Failed to submit registration. Please try again.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
