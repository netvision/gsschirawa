<template>
  <div v-if="loading" class="flex justify-center items-center py-12">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
