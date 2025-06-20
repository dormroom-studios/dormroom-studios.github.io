<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const activeScreenshot = ref(props.game.trailerUrl ? -1 : 0) // Start with trailer if available
const carouselOffset = ref(0)

const totalItems = computed(() => {
  return props.game.screenshots.length + (props.game.trailerUrl ? 1 : 0)
})

// Update carousel offset when image changes
const updateCarouselOffset = (index) => {
  const thumbnailWidth = 96 + 8 // 24 * 4 (w-24 = 6rem = 96px) + gap (0.5rem = 8px)
  const containerWidth = 400 // Approximate container width
  const maxItems = Math.floor(containerWidth / thumbnailWidth)
  
  if (index === -1) {
    carouselOffset.value = 0
  } else {
    const actualIndex = props.game.trailerUrl ? index + 1 : index
    if (actualIndex >= maxItems - 1) {
      carouselOffset.value = Math.max(0, (actualIndex - maxItems + 2) * thumbnailWidth)
    } else {
      carouselOffset.value = 0
    }
  }
}

const showImage = (index) => {
  activeScreenshot.value = index
  updateCarouselOffset(index)
}

const nextScreenshot = () => {
  let nextIndex
  if (props.game.trailerUrl) {
    if (activeScreenshot.value === -1) {
      nextIndex = 0
    } else {
      nextIndex = (activeScreenshot.value + 1) % props.game.screenshots.length
      if (nextIndex === 0) nextIndex = -1
    }
  } else {
    nextIndex = (activeScreenshot.value + 1) % props.game.screenshots.length
  }
  showImage(nextIndex)
}

const prevScreenshot = () => {
  let prevIndex
  if (props.game.trailerUrl) {
    if (activeScreenshot.value === -1) {
      prevIndex = props.game.screenshots.length - 1
    } else if (activeScreenshot.value === 0) {
      prevIndex = -1
    } else {
      prevIndex = activeScreenshot.value - 1
    }
  } else {
    prevIndex = (activeScreenshot.value - 1 + props.game.screenshots.length) % props.game.screenshots.length
  }
  showImage(prevIndex)
}

const navigateToGame = () => {
  navigateTo(`/games/${props.game.id}`)
}
</script>

<template>
  <div class="overflow-hidden bg-neutral-800/50 backdrop-blur-md border border-white/10 rounded-lg">
    <div class="grid grid-cols-1 lg:grid-cols-2 items-stretch">
      <!-- Game trailer and screenshots -->
      <div class="relative overflow-hidden">
        <!-- Main display area with aspect ratio -->
        <div class="relative aspect-video bg-neutral-900">
          <!-- Trailer (if available) -->
          <div v-if="game.trailerUrl && activeScreenshot === -1" class="absolute inset-0">
            <TrailerPlayer 
              :youtube-url="game.trailerUrl"
              :thumbnail-image="game.coverImage"
            />
          </div>
          
          <!-- Screenshots -->
          <div v-else class="absolute inset-0">
            <transition-group name="fade">
              <img 
                v-for="(screenshot, index) in game.screenshots" 
                :key="index"
                :src="screenshot" 
                :alt="`${game.title} screenshot ${index + 1}`"
                class="absolute inset-0 w-full h-full object-cover"
                v-show="index === activeScreenshot"
              />
            </transition-group>
          </div>
          
          <!-- Thumbnail Carousel - Moved inside the aspect-video container -->
          <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <div class="relative">
              <div class="overflow-hidden">
                <div 
                  class="flex gap-2 transition-transform duration-300"
                  :style="{ transform: `translateX(-${carouselOffset}px)` }"
                >
                  <!-- Trailer thumbnail -->
                  <div 
                    v-if="game.trailerUrl"
                    class="flex-shrink-0 w-16 h-10 cursor-pointer overflow-hidden rounded relative"
                    :class="{ 'ring-2 ring-accent-400': activeScreenshot === -1 }"
                    @click="showImage(-1)"
                  >
                    <img 
                      :src="game.coverImage" 
                      alt="Game trailer"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div class="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center">
                        <svg class="w-2 h-2 text-neutral-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Screenshot thumbnails -->
                  <div 
                    v-for="(screenshot, index) in game.screenshots" 
                    :key="index"
                    class="flex-shrink-0 w-16 h-10 cursor-pointer overflow-hidden rounded transition-all"
                    :class="{ 'ring-2 ring-primary-500': index === activeScreenshot }"
                    @click="showImage(index)"
                  >
                    <img 
                      :src="screenshot" 
                      :alt="`${game.title} thumbnail ${index + 1}`"
                      class="w-full h-full object-cover hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation arrows -->
        <button 
          @click.stop="prevScreenshot" 
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Previous screenshot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button 
          @click.stop="nextScreenshot" 
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Next screenshot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        
      </div>
      
      <!-- Game info -->
      <div class="p-6 lg:p-8 flex flex-col justify-center">
        <h3 class="text-2xl md:text-3xl font-bold font-display mb-4">{{ game.title }}</h3>
        
        <p class="text-white/80 mb-6">{{ game.description }}</p>
        
        <!-- Game features -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-3">Key Features</h4>
          <ul class="space-y-2">
            <li 
              v-for="(feature, index) in game.features" 
              :key="index"
              class="flex items-start"
            >
              <span class="text-primary-500 mr-2">✦</span>
              <span class="text-white/80">{{ feature }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Game metadata -->
        <div class="flex flex-wrap gap-3 mb-6">
          <div 
            v-for="platform in game.platforms" 
            :key="platform"
            class="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm"
          >
            {{ platform }}
          </div>
          
          <div class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm backdrop-blur-sm">
            {{ new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }}
          </div>
        </div>
        
        <!-- CTA -->
        <div class="mt-auto">
          <a :href="game.playLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full inline-block text-center">
            Play Now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>