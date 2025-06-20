<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGamesStore } from '~/stores/games'
// Components are auto-imported by Nuxt

// Page meta
useHead({
  title: 'Our Games',
  meta: [
    { name: 'description', content: 'Discover our collection of immersive games designed to transport you to new worlds and adventures.' },
    { property: 'og:title', content: 'Our Games - DormRoom Studios' },
    { property: 'og:description', content: 'Discover our collection of immersive games designed to transport you to new worlds and adventures.' }
  ]
})

const gamesStore = useGamesStore()
const games = computed(() => gamesStore.getAllGames)

// Animation references
const pageTitle = ref(null)
const pageDescription = ref(null)
const gamesList = ref(null)

onMounted(() => {
  // Animate page elements
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from(pageTitle.value, { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  })
  .from(pageDescription.value, { 
    y: 20, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.5')
  
  // Only animate games list if it exists and has children
  if (gamesList.value && gamesList.value.children.length > 0) {
    tl.from(gamesList.value.children, { 
      y: 20, 
      opacity: 0, 
      stagger: 0.1, 
      duration: 0.6 
    }, '-=0.5')
  }
})
</script>

<template>
  <div>
    <!-- Page header -->
    <section class="pt-32 pb-16 bg-neutral-950/70">
      <div class="container">
        <h1 
          ref="pageTitle" 
          class="text-4xl md:text-5xl font-bold font-display mb-4 text-center"
        >
          Our Game
        </h1>
        <p 
          ref="pageDescription" 
          class="text-lg text-white/80 max-w-2xl mx-auto text-center mb-8"
        >
          Experience our debut title - a cinematic journey through a post-apocalyptic world.
        </p>
      </div>
    </section>
    
    <!-- Games grid -->
    <section class="section">
      <div class="container">
        <ClientOnly>
          <div 
            ref="gamesList" 
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            v-if="games && games.length > 0"
          >
            <GameCard 
              v-for="game in games" 
              :key="game.id" 
              :game="game" 
            />
          </div>
          
          <!-- Show our featured game directly if store has issues -->
          <div v-else class="max-w-4xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold mb-4">Our Featured Game</h2>
            </div>
            <FeaturedGameCard :game="gamesStore.getFeaturedGame" />
          </div>
          
          <template #fallback>
            <div class="text-center py-16">
              <div class="animate-pulse">
                <div class="h-8 bg-neutral-700 rounded w-48 mx-auto mb-4"></div>
                <div class="h-4 bg-neutral-700 rounded w-64 mx-auto"></div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>