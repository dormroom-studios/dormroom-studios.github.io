<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { getAllGames, getFeaturedGames, getOurGames } from '~/utils/games'

// Components are auto-imported by Nuxt

// Page meta
useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'We craft immersive single-player mobile games where stories come first. At Dormroom Studios, we believe games should feel like novels you can\'t put down.' },
    { property: 'og:title', content: 'Dormroom Studios - Story-Driven Mobile Games' },
    { property: 'og:description', content: 'We craft immersive single-player mobile games where stories come first. At Dormroom Studios, we believe games should feel like novels you can\'t put down.' }
  ]
})

// Hero animation references
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroCta = ref(null)
const heroImage = ref(null)

// Games data
const games = ref([])
const ourGames = ref([])
const featuredGame = ref(null)

onMounted(() => {
  // Load games from markdown
  games.value = getAllGames()
  ourGames.value = getOurGames()
  
  // Get featured game or first game
  const featuredGames = getFeaturedGames()
  featuredGame.value = featuredGames.length > 0 ? featuredGames[0] : games.value[0]

  // Animate hero section
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from(heroTitle.value, { 
    y: 50, 
    opacity: 0, 
    duration: 0.8 
  })
  .from(heroSubtitle.value, { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.5')
  .from(heroCta.value, { 
    y: 20, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.5')
  .from(heroImage.value, { 
    scale: 0.9, 
    opacity: 0, 
    duration: 1 
  }, '-=0.7')
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center">
      <div class="container relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div>
            <h1 
              ref="heroTitle" 
              class="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6"
            >
              Dormroom <span class="text-gradient">Studios</span>
            </h1>
            <p 
              ref="heroSubtitle" 
              class="text-lg md:text-xl text-white/80 mb-8 max-w-lg"
            >
              We craft immersive story-driven mobile experiences. Our debut game takes you on a cinematic journey through a post-apocalyptic world as the last adventurer.
            </p>
            <div ref="heroCta" class="flex flex-wrap gap-4">
              <NuxtLink to="/games" class="btn btn-primary">
                Play Our Game
              </NuxtLink>
              <NuxtLink to="/about" class="btn btn-outline">
                About Us
              </NuxtLink>
            </div>
          </div>
          <div ref="heroImage" class="relative">
            <div v-if="featuredGame">
              <!-- Game Image -->
              <div class="relative rounded-lg overflow-hidden shadow-xl mb-6">
                <img 
                  :src="featuredGame.coverImage" 
                  :alt="featuredGame.title" 
                  class="w-full h-full object-cover aspect-video"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>
              </div>
              
              <!-- Game info below image -->
              <div class="text-center">
                <h3 class="text-2xl font-bold mb-2">{{ featuredGame.title }}</h3>
                <p class="text-white/80 mb-4">{{ featuredGame.shortDescription }}</p>
                <div class="flex flex-wrap gap-3 justify-center">
                  <a 
                    :href="featuredGame.playLink" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn btn-primary"
                  >
                    Play Now
                  </a>
                  <NuxtLink 
                    :to="`/games/${featuredGame.slug}`" 
                    class="btn btn-outline"
                  >
                    Learn More
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- Loading placeholder -->
            <div v-else class="animate-pulse">
              <div class="bg-neutral-700 rounded-lg aspect-video mb-6"></div>
              <div class="text-center space-y-4">
                <div class="h-8 bg-neutral-700 rounded mx-auto w-48"></div>
                <div class="h-4 bg-neutral-700 rounded mx-auto w-64"></div>
                <div class="flex gap-3 justify-center">
                  <div class="h-12 bg-neutral-700 rounded w-24"></div>
                  <div class="h-12 bg-neutral-700 rounded w-28"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Our Games Section -->
    <section class="section bg-neutral-950/50">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">
            Our Games
          </h2>
          <p class="text-white/70 max-w-2xl mx-auto">
            Explore our collection of immersive story-driven games that put narrative first.
          </p>
        </div>
        
        <div v-if="ourGames.length > 0" class="flex justify-center">
          <div 
            class="grid gap-8 max-w-sm"
            :class="{
              'grid-cols-1': ourGames.length === 1,
              'grid-cols-1 md:grid-cols-2 max-w-2xl': ourGames.length === 2,
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl': ourGames.length >= 3
            }"
          >
            <GameCard 
              v-for="game in ourGames" 
              :key="game.id" 
              :game="game" 
            />
          </div>
        </div>
        
        <!-- Fallback if no games -->
        <div v-else class="text-center text-white/60">
          <p>No games available at the moment.</p>
        </div>
      </div>
    </section>
    
    
    <!-- Contact Section -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold font-display mb-6">
            Get In Touch
          </h2>
          <p class="text-white/80 mb-8 max-w-2xl mx-auto">
            We'd love to hear from you—whether you're a player with feedback, a fellow dev, or someone who just wants to say hi.
          </p>
          <NuxtLink to="/contact" class="btn btn-primary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Get in Touch
          </NuxtLink>
        </div>
      </div>
    </section>
    
  </div>
</template>