<template>
  <div class="min-h-screen bg-gray-50">
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-14">
      <div class="container-custom">
        <RouterLink to="/" class="inline-flex items-center text-sm text-white/90 hover:text-white mb-5">
          <PurchasedIcon name="arrow-up" class="mr-2 -rotate-90" />
          Back to Home
        </RouterLink>
        <p class="text-sm font-semibold text-white/80 mb-3">Notice</p>
        <h1 class="text-3xl md:text-4xl font-bold leading-tight max-w-4xl">
          {{ notice?.title || 'Notice' }}
        </h1>
      </div>
    </section>

    <section class="py-12">
      <div class="container-custom max-w-4xl">
        <LoadingSpinner v-if="loading" />

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <PurchasedIcon name="exclamation-circle" class="text-4xl text-red-500 mb-4" />
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Notice Not Found</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <RouterLink to="/" class="btn btn-primary">Return Home</RouterLink>
        </div>

        <article v-else-if="notice" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="p-6 md:p-8 border-b border-gray-100">
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <span
                class="font-semibold px-3 py-1 rounded-full"
                :class="priorityClass"
              >
                {{ notice.priority }}
              </span>
              <span class="text-gray-500">
                Posted {{ new Date(notice.createdAt).toLocaleDateString() }}
              </span>
              <span v-if="notice.expiryDate" class="text-gray-500">
                Expires {{ new Date(notice.expiryDate).toLocaleDateString() }}
              </span>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <div class="prose max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
              {{ notice.content }}
            </div>

            <div v-if="notice.file" class="mt-8 pt-6 border-t border-gray-100">
              <a
                :href="getAssetUrl(notice.file)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary inline-flex items-center"
              >
                <PurchasedIcon name="link" class="mr-2" />
                Open Notice Attachment
              </a>
              <p class="text-sm text-gray-500 mt-3">
                Opens the uploaded notice file in a new tab.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api, { getAssetUrl } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PurchasedIcon from '@/components/PurchasedIcon.vue'

const route = useRoute()
const notice = ref(null)
const loading = ref(true)
const error = ref('')

const priorityClass = computed(() => ({
  'bg-red-100 text-red-700': notice.value?.priority === 'Urgent',
  'bg-orange-100 text-orange-700': notice.value?.priority === 'High',
  'bg-blue-100 text-blue-700': notice.value?.priority === 'Medium',
  'bg-gray-100 text-gray-700': notice.value?.priority === 'Low'
}))

onMounted(async () => {
  try {
    loading.value = true
    const response = await api.getNotice(route.params.id)
    notice.value = response.data.data
    document.title = `${notice.value.title} - Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College`
  } catch (err) {
    error.value = err.response?.data?.message || 'This notice is unavailable or has expired.'
  } finally {
    loading.value = false
  }
})
</script>
