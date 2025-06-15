<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center px-4">
      <h1 class="text-9xl font-bold text-primary-500 mb-4">{{ error?.statusCode || '404' }}</h1>
      <h2 class="text-3xl font-bold font-display mb-6">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
      </h2>
      <p class="text-white/80 max-w-md mx-auto mb-8">
        {{ error?.statusMessage || 'The page you\'re looking for doesn\'t exist or has been moved to another URL.' }}
      </p>
      <button @click="handleError" class="btn btn-primary">
        Return to Home
      </button>
    </div>
  </div>
</template>