<template>
  <div class="min-h-screen bg-gray-50">
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-14 md:py-20 text-white">
      <div class="container-custom">
        <h1 class="text-3xl font-bold md:text-5xl">{{ $t('documents.title') }}</h1>
        <p class="mt-4 max-w-2xl text-lg text-primary-100">{{ $t('documents.intro') }}</p>
      </div>
    </section>

    <section class="container-custom py-12 md:py-16">
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="document in documents"
          :key="document.file"
          class="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p class="text-sm font-semibold uppercase tracking-wide text-primary-700">{{ $t('documents.pdf') }}</p>
          <h2 class="mt-3 text-xl font-bold text-gray-900 md:text-2xl">{{ $t(document.titleKey) }}</h2>
          <a
            :href="document.href"
            :download="document.file"
            type="application/pdf"
            class="btn btn-primary mt-8 self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            {{ $t('documents.download') }}
          </a>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
const documents = [
  {
    titleKey: 'documents.buildingSafety',
    file: 'Building Safety New.pdf',
    href: '/documents/Building%20Safety%20New.pdf'
  },
  {
    titleKey: 'documents.noc',
    file: 'NOC DIRECT.pdf',
    href: '/documents/NOC%20DIRECT.pdf'
  }
]
</script>
