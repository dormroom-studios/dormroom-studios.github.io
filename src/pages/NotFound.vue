<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center px-4">
      <h1 class="text-9xl font-bold text-primary-500 mb-4">404</h1>
      <h2 class="text-3xl font-bold font-display mb-6">Page Not Found</h2>
      <p class="text-white/80 max-w-md mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved to another URL.
      </p>
      <button @click="goHome" class="btn btn-primary">
        Return to Home
      </button>
    </div>
  </div>
</template>