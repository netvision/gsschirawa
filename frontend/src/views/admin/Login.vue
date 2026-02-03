<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          GSS
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Admin Login
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          GSS College Portal Administration
        </p>
      </div>

      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {{ errorMessage }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input"
              placeholder="admin@gsscollege.edu.in"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="btn btn-primary w-full"
          :class="{ 'opacity-50 cursor-not-allowed': loading }"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="text-center">
        <RouterLink to="/" class="text-sm text-primary-600 hover:text-primary-700">
          ← Back to Website
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.login({
      email: email.value,
      password: password.value
    })

    // Store token
    localStorage.setItem('adminToken', response.data.token)
    
    // Redirect to dashboard
    router.push('/admin')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
