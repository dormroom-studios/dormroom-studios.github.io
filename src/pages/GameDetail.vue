<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useGamesStore } from '../stores/games'

const route = useRoute()
const router = useRouter()
const gamesStore = useGamesStore()

// Get game id from route params
const gameId = computed(() => {
  const id = parseInt(route.params.id as string)
  return isNaN(id) ? 0 : id
})

// Get game details
const game = computed(() => {
  const foundGame = gamesStore.getGameById(gameId.value)
  if (!foundGame) {
    // Redirect to games page if game not found
    router.push('/games')
  }
  return foundGame
})

// Image gallery
const activeImage = ref(0)

const showImage = (index: number) => {
  activeImage.value = index
}

// Animation references
const gameHeader = ref(null)
const gameContent = ref(null)
const gameGallery = ref(null)
const gameInfo = ref(null)

onMounted(() => {
  if (!game.value) return
  
  // Animate page elements
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from(gameHeader.value, { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  })
  .from(gameGallery.value, { 
    y: 20, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.5')
  .from(gameInfo.value, { 
    y: 20, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.6')
})
</script>

<template>
  <div v-if="game">
    <!-- Hero banner -->
    <section 
      class="relative pt-32 pb-20 bg-neutral-900 overflow-hidden"
      ref="gameHeader"
    >
      <!-- Background image with overlay -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900"></div>
        <img 
          :src="game.coverImage" 
          :alt="game.title" 
          class="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div class="container relative z-10">
        <div class="max-w-4xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            {{ game.title }}
          </h1>
          <p class="text-xl text-white/80 mb-8 max-w-3xl">
            {{ game.shortDescription }}
          </p>
          
          <!-- Game metadata -->
          <div class="flex flex-wrap gap-3 mb-8">
            <div 
              v-for="platform in game.platforms" 
              :key="platform"
              class="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm"
            >
              {{ platform }}
            </div>
            
            <div class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm backdrop-blur-sm">
              {{ new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
            </div>
          </div>
          
          <a href="#" class="btn btn-primary">
            Play Now
          </a>
        </div>
      </div>
    </section>
    
    <!-- Game content -->
    <section class="section" ref="gameContent">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Game screenshots gallery -->
          <div class="lg:col-span-2" ref="gameGallery">
            <h2 class="text-2xl font-bold font-display mb-6">Gallery</h2>
            
            <!-- Main image -->
            <div class="relative aspect-video rounded-lg overflow-hidden mb-4">
              <img 
                :src="game.screenshots[activeImage]" 
                :alt="`${game.title} screenshot ${activeImage + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnails -->
            <div class="grid grid-cols-3 gap-4">
              <div 
                v-for="(screenshot, index) in game.screenshots" 
                :key="index"
                class="aspect-video cursor-pointer overflow-hidden rounded-md"
                :class="{ 'ring-2 ring-primary-500': index === activeImage }"
                @click="showImage(index)"
              >
                <img 
                  :src="screenshot" 
                  :alt="`${game.title} thumbnail ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <!-- Game details -->
          <div ref="gameInfo">
            <h2 class="text-2xl font-bold font-display mb-6">About the Game</h2>
            
            <p class="text-white/80 mb-8">
              {{ game.description }}
            </p>
            
            <div class="mb-8">
              <h3 class="text-xl font-bold mb-4">Key Features</h3>
              <ul class="space-y-3">
                <li 
                  v-for="(feature, index) in game.features" 
                  :key="index"
                  class="flex"
                >
                  <span class="text-primary-500 mr-2">✦</span>
                  <span class="text-white/80">{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <div class="p-6 bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-white/10">
              <h3 class="text-xl font-bold mb-4">System Requirements</h3>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-primary-400 mb-2">Minimum:</h4>
                  <ul class="space-y-2 text-white/80">
                    <li><span class="font-medium">OS:</span> Windows 10 64-bit</li>
                    <li><span class="font-medium">Processor:</span> Intel Core i5-6600K / AMD Ryzen 5 1600</li>
                    <li><span class="font-medium">Memory:</span> 8 GB RAM</li>
                    <li><span class="font-medium">Graphics:</span> NVIDIA GTX 1060 / AMD RX 580</li>
                    <li><span class="font-medium">Storage:</span> 50 GB available space</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="font-semibold text-primary-400 mb-2">Recommended:</h4>
                  <ul class="space-y-2 text-white/80">
                    <li><span class="font-medium">OS:</span> Windows 10/11 64-bit</li>
                    <li><span class="font-medium">Processor:</span> Intel Core i7-8700K / AMD Ryzen 7 3700X</li>
                    <li><span class="font-medium">Memory:</span> 16 GB RAM</li>
                    <li><span class="font-medium">Graphics:</span> NVIDIA RTX 2070 / AMD RX 6700 XT</li>
                    <li><span class="font-medium">Storage:</span> 50 GB SSD</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>