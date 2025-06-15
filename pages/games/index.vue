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
  .from(gamesList.value.children, { 
    y: 20, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.6 
  }, '-=0.5')
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
          Our Games
        </h1>
        <p 
          ref="pageDescription" 
          class="text-lg text-white/80 max-w-2xl mx-auto text-center mb-8"
        >
          Discover our collection of immersive games designed to transport you to new worlds and adventures.
        </p>
      </div>
    </section>
    
    <!-- Games grid -->
    <section class="section">
      <div class="container">
        <div 
          ref="gamesList" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <GameCard 
            v-for="game in games" 
            :key="game.id" 
            :game="game" 
          />
        </div>
      </div>
    </section>
  </div>
</template>