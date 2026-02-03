<template>
  <div class="contact">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('contact.pageTitle') }}</h1>
        <p class="text-xl text-primary-100">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-16">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('contact.getInTouch') }}</h2>
            
            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="input"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="input"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="input"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="btn btn-primary w-full"
                :class="{ 'opacity-50 cursor-not-allowed': submitting }"
              >
                {{ submitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('contact.contactInfo') }}</h2>

            <div class="space-y-6">
              <!-- Address -->
              <div class="card">
                <div class="flex items-start gap-4">
                  <div class="text-3xl">📍</div>
                  <div>
                    <h3 class="font-semibold text-lg mb-2">Address</h3>
                    <p class="text-gray-600">
                      Ginnidevi Satyanarayan Sekhsaria<br />
                      Girls' (PG) College<br />
                      Chirawa, Jhunjhunu<br />
                      Rajasthan – 333026
                    </p>
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="card">
                <div class="flex items-start gap-4">
                  <div class="text-3xl">📞</div>
                  <div>
                    <h3 class="font-semibold text-lg mb-2">Phone</h3>
                    <p class="text-gray-600">
                      <a href="tel:+917878306013" class="hover:text-primary-600 block">
                        +91 7878306013
                      </a>
                      <a href="tel:+911596220289" class="hover:text-primary-600 block">
                        +91 01596-220289
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="card">
                <div class="flex items-start gap-4">
                  <div class="text-3xl">✉️</div>
                  <div>
                    <h3 class="font-semibold text-lg mb-2">Email</h3>
                    <p class="text-gray-600">
                      <a href="mailto:gsscollege1987@yahoo.co.in" class="hover:text-primary-600">
                        gsscollege1987@yahoo.co.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Working Hours -->
              <div class="card">
                <div class="flex items-start gap-4">
                  <div class="text-3xl">🕒</div>
                  <div>
                    <h3 class="font-semibold text-lg mb-2">Office Hours</h3>
                    <p class="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="mt-8">
              <h3 class="font-semibold text-lg mb-4">Location Map</h3>
              <div class="rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4888.073983373554!2d75.646902!3d28.237088000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391321a05db6594b%3A0x88c4330cc8aa6bd4!2sGinnidevi%20Satyanarayan%20Sekhsaria%20Girls&#39;%20(P.G.)%20College%2C%20Chirawa!5e1!3m2!1sen!2sus!4v1769501246775!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '../services/api'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await api.submitContact(form)
    successMessage.value = 'Thank you for contacting us! We will get back to you soon.'
    
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to send message. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
