<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { getGameById, getGameBySlug } from '~/utils/games'

const route = useRoute()
const router = useRouter()

// Get game slug from route params
const gameSlug = computed(() => route.params.slug)

// Get game details by slug
const game = ref(null)

onMounted(() => {
  // Get game by slug
  game.value = getGameBySlug(gameSlug.value)
  
  if (!game.value) {
    // Redirect to games page if game not found
    router.push('/games')
  }
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
    <!-- Breadcrumb - positioned over the video -->
    <section class="absolute top-32 left-0 right-0 z-20 pt-8 pb-8">
      <div class="container">
        <nav class="flex items-center gap-2 text-sm text-white/80 backdrop-blur-sm bg-black/20 rounded-full px-4 py-2 w-fit">
          <NuxtLink to="/" class="hover:text-primary-400 transition-colors">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/games" class="hover:text-primary-400 transition-colors">Games</NuxtLink>
          <span>/</span>
          <span class="text-white">{{ game.title }}</span>
        </nav>
      </div>
    </section>

    <!-- Hero banner -->
    <section 
      class="relative pt-0 pb-20 bg-gradient-to-b from-neutral-950/80 to-neutral-900 overflow-hidden min-h-screen flex items-center"
      ref="gameHeader"
    >
      <!-- Background video/image - extends behind header -->
      <div v-if="game.trailerUrl" class="absolute inset-0 -top-32 z-0">
        <BackgroundTrailer 
          :youtube-url="game.trailerUrl"
          :fallback-image="game.coverImage"
          :alt="game.title"
          :autoplay="true"
          :show-controls="true"
          :opacity="0.4"
          class="w-full h-full object-cover"
        />
        <!-- Top gradient overlay for header readability -->
        <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent"></div>
      </div>
      
      <!-- Fallback background image if no trailer - extends behind header -->
      <div v-else class="absolute inset-0 -top-32 z-0">
        <img 
          :src="game.coverImage" 
          :alt="game.title" 
          class="w-full h-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-900/80 to-neutral-900"></div>
        <!-- Top gradient overlay for header readability -->
        <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent"></div>
      </div>
      
      <div class="container relative z-10 pt-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Game info -->
          <div class="max-w-2xl">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {{ game.title }}
            </h1>
            <p class="text-xl text-white/80 mb-8 leading-relaxed">
              {{ game.shortDescription }}
            </p>
            
            <!-- Game metadata -->
            <div class="flex flex-wrap gap-3 mb-8">
              <div 
                v-for="platform in game.platforms" 
                :key="platform"
                class="px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium border border-primary-500/30"
              >
                {{ platform }}
              </div>
              
              <div class="px-4 py-2 rounded-full bg-accent-500/20 text-accent-300 text-sm font-medium border border-accent-500/30">
                {{ new Date(game.releaseDate).getFullYear() }}
              </div>
            </div>
            
            <!-- Call to action -->
            <div class="flex flex-wrap gap-4">
              <a 
                v-if="game.playLink" 
                :href="game.playLink" 
                target="_blank"
                class="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 group shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                Play Now
              </a>
              
              <button 
                v-if="game.trailerUrl"
                @click="showImage(-1)"
                class="btn btn-outline text-lg px-8 py-4 inline-flex items-center gap-3 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Watch Trailer
              </button>
            </div>
          </div>

          <!-- Game cover/logo -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl"></div>
              <img 
                :src="game.coverImage" 
                :alt="game.title"
                class="relative w-80 md:w-96 rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Game content -->
    <section class="section" ref="gameContent">
      <div class="container">
        <div class="max-w-6xl mx-auto space-y-12">
          <!-- Game screenshots gallery -->
          <div ref="gameGallery">
            <div class="card p-8">
              <h2 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-accent-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                Media Gallery
              </h2>
            
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
          </div>
          
          <!-- About section -->
          <div ref="gameInfo">
            <div class="card p-8">
              <h2 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                About the Game
              </h2>
              <!-- Render markdown content -->
              <div class="game-content prose prose-invert prose-lg max-w-none" v-html="game.html"></div>
            </div>
          </div>
          
          <!-- Game Information Card -->
          <div class="card p-8">
            <h3 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-secondary-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              Game Information
            </h3>
              
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-secondary-400 mb-2">Platforms:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="platform in game.platforms" 
                      :key="platform"
                      class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium"
                    >
                      {{ platform }}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-semibold text-secondary-400 mb-2">Release Date:</h4>
                  <p class="text-white/80">{{ new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-secondary-400 mb-2">Developer:</h4>
                  <p class="text-white/80">DormRoom Studios</p>
                </div>
              </div>

              <div class="space-y-4">
                <div v-if="game.features && game.features.length > 0">
                  <h4 class="font-semibold text-secondary-400 mb-2">Key Features:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="feature in game.features.slice(0, 4)" 
                      :key="feature"
                      class="px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-sm"
                    >
                      {{ feature }}
                    </span>
                  </div>
                </div>
                
                <div class="pt-4">
                  <a 
                    v-if="game.playLink"
                    :href="game.playLink" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn btn-primary w-full text-center inline-flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Now
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

<style scoped>
/* Custom styles for game content */
:deep(.game-content h2) {
  @apply text-2xl font-bold text-white mb-6 font-display;
}

:deep(.game-content h3) {
  @apply text-xl font-semibold text-primary-400 mb-4 mt-8;
}

:deep(.game-content p) {
  @apply text-white/80 leading-relaxed mb-6;
}

:deep(.game-content ul) {
  @apply space-y-3 mb-6;
}

:deep(.game-content li) {
  @apply flex items-start gap-3 text-white/80;
}

:deep(.game-content li::before) {
  content: '✦';
  @apply text-primary-500 flex-shrink-0 mt-1;
}

:deep(.game-content strong) {
  @apply text-white font-semibold;
}

/* Enhanced card styling */
.card {
  @apply bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-xl;
}

/* Improve media gallery styling */
:deep(.media-gallery) {
  @apply card p-6;
}

:deep(.media-gallery h2) {
  @apply flex items-center gap-3 mb-6;
}

:deep(.media-gallery h2::before) {
  content: '';
  @apply w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z' /%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>