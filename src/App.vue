<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import ParticleBackground from './components/ParticleBackground.vue'

const isLoading = ref(true)
const router = useRouter()

onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
  
  // Add route change event for page transitions
  router.beforeEach(() => {
    window.scrollTo(0, 0)
  })
})
</script>

<template>
  <div class="site-wrapper">
    <!-- Loading screen -->
    <div 
      v-if="isLoading" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
    >
      <div class="flex flex-col items-center">
        <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="mt-4 text-lg font-medium">Loading...</span>
      </div>
    </div>
    
    <!-- Main content -->
    <div v-else class="relative">
      <ParticleBackground />
      <TheHeader />
      
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <TheFooter />
    </div>
  </div>
</template>

<style>
.site-wrapper {
  @apply min-h-screen flex flex-col;
}

main {
  @apply flex-1;
}
</style>