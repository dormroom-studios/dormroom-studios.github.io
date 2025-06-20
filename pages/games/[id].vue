<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useGamesStore } from '~/stores/games'

const route = useRoute()
const router = useRouter()
const gamesStore = useGamesStore()

// Get game id from route params
const gameId = computed(() => {
  const id = parseInt(route.params.id)
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

// Dynamic page meta based on game data
watch(game, (newGame) => {
  if (newGame) {
    useHead({
      title: newGame.title,
      meta: [
        { name: 'description', content: newGame.shortDescription },
        { property: 'og:title', content: `${newGame.title} - DormRoom Studios` },
        { property: 'og:description', content: newGame.shortDescription },
        { property: 'og:image', content: newGame.coverImage }
      ]
    })
  }
}, { immediate: true })

// Image gallery
const activeImage = ref(0)
const thumbnailContainer = ref(null)
const thumbnailScroll = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const showImage = (index) => {
  activeImage.value = index
}

// Thumbnail scrolling
const scrollThumbnails = (direction) => {
  const scrollAmount = 160 // Width of thumbnail + gap
  const container = thumbnailContainer.value
  
  if (!container) return
  
  const maxScroll = container.scrollWidth - container.parentElement.offsetWidth
  
  if (direction === 'left') {
    thumbnailScroll.value = Math.max(0, thumbnailScroll.value - scrollAmount)
  } else {
    thumbnailScroll.value = Math.min(maxScroll, thumbnailScroll.value + scrollAmount)
  }
  
  // Update button visibility
  canScrollLeft.value = thumbnailScroll.value > 0
  canScrollRight.value = thumbnailScroll.value < maxScroll
}

// Check scroll buttons visibility on mount and resize
const checkScrollButtons = () => {
  if (!thumbnailContainer.value) return
  
  const container = thumbnailContainer.value
  const maxScroll = container.scrollWidth - container.parentElement.offsetWidth
  
  canScrollLeft.value = thumbnailScroll.value > 0
  canScrollRight.value = thumbnailScroll.value < maxScroll && maxScroll > 0
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
  
  // Check scroll buttons after DOM is ready
  setTimeout(checkScrollButtons, 100)
  
  // Add resize listener
  window.addEventListener('resize', checkScrollButtons)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', checkScrollButtons)
})
</script>

<template>
  <div v-if="game">
    <!-- Hero banner -->
    <section 
      class="relative pt-32 pb-20 bg-neutral-900 overflow-hidden"
      ref="gameHeader"
    >
      <!-- Background video/image -->
      <BackgroundTrailer 
        v-if="game.trailerUrl"
        :youtube-url="game.trailerUrl"
        :fallback-image="game.coverImage"
        :alt="game.title"
        :autoplay="true"
        :show-controls="true"
        :opacity="0.4"
      />
      
      <!-- Fallback background image if no trailer -->
      <div v-else class="absolute inset-0 z-0">
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
          
          <a 
            :href="game.playLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
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
            <h2 class="text-2xl font-bold font-display mb-6">Media Gallery</h2>
            
            <!-- Main media display -->
            <div class="relative aspect-video rounded-lg overflow-hidden mb-4">
              <!-- Show trailer if selected and available -->
              <div v-if="activeImage === -1 && game.trailerUrl" class="w-full h-full">
                <TrailerPlayer 
                  :youtube-url="game.trailerUrl"
                  :thumbnail-image="game.coverImage"
                />
              </div>
              
              <!-- Show screenshot -->
              <img 
                v-else
                :src="game.screenshots[activeImage]" 
                :alt="`${game.title} screenshot ${activeImage + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnails Carousel -->
            <div class="relative">
              <!-- Scroll Container -->
              <div class="relative overflow-hidden">
                <div 
                  ref="thumbnailContainer"
                  class="flex gap-4 transition-transform duration-300 ease-in-out"
                  :style="{ transform: `translateX(-${thumbnailScroll}px)` }"
                >
                  <!-- Trailer thumbnail -->
                  <div 
                    v-if="game.trailerUrl"
                    class="flex-shrink-0 w-40 aspect-video cursor-pointer overflow-hidden rounded-md relative"
                    :class="{ 'ring-2 ring-accent-400': activeImage === -1 }"
                    @click="showImage(-1)"
                  >
                    <img 
                      :src="game.coverImage" 
                      alt="Game trailer"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-neutral-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="absolute top-1 left-1 bg-accent-500 text-white text-xs px-1 rounded">
                      🎬
                    </div>
                  </div>
                  
                  <!-- Screenshot thumbnails -->
                  <div 
                    v-for="(screenshot, index) in game.screenshots" 
                    :key="index"
                    class="flex-shrink-0 w-40 aspect-video cursor-pointer overflow-hidden rounded-md"
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
              
              <!-- Navigation Arrows -->
              <button 
                v-if="canScrollLeft"
                @click="scrollThumbnails('left')"
                class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              <button 
                v-if="canScrollRight"
                @click="scrollThumbnails('right')"
                class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
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
              <h3 class="text-xl font-bold mb-4">Game Information</h3>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-primary-400 mb-2">Platform:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="platform in game.platforms" 
                      :key="platform"
                      class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm"
                    >
                      {{ platform }}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-semibold text-primary-400 mb-2">Release Date:</h4>
                  <p class="text-white/80">{{ new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-primary-400 mb-2">Developer:</h4>
                  <p class="text-white/80">DormRoom Studios</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-primary-400 mb-2">Genre:</h4>
                  <p class="text-white/80">Adventure, Story-Driven, Post-Apocalyptic</p>
                </div>
                
                <div class="pt-4 border-t border-white/10">
                  <a 
                    :href="game.playLink" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn btn-primary w-full text-center"
                  >
                    Download on Google Play
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>