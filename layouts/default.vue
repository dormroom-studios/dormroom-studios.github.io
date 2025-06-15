<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- Particle background -->
    <ParticleBackground />
    
    <!-- Header -->
    <TheHeader />
    
    <!-- Main content -->
    <main class="flex-1 relative z-10">
      <!-- Page content -->
      <slot />
      
      <!-- Scroll to top button -->
      <Transition name="fade">
        <button
          v-if="showScrollTop"
          @click="scrollToTop"
          class="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2" 
            stroke="currentColor" 
            class="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </Transition>
    </main>
    
    <!-- Footer -->
    <TheFooter />
    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Scroll to top functionality
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Page meta defaults that can be overridden by individual pages
useHead({
  titleTemplate: '%s | DormRoom Studios',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#8a2be2' }
  ]
})
</script>

<style scoped>
/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* Page transition for route changes */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>