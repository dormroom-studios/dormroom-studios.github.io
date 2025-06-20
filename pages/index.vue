<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGamesStore } from '~/stores/games'

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

const gamesStore = useGamesStore()

// Hero animation references
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroCta = ref(null)
const heroImage = ref(null)

// Fetch featured game
const featuredGame = gamesStore.getFeaturedGame

// Get latest games (excluding featured)
const latestGames = gamesStore.getLatestGames(3)

// No news section needed - keeping it simple like the React site

onMounted(() => {
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
                  :to="`/games/${featuredGame.id}`" 
                  class="btn btn-outline"
                >
                  Learn More
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Game Section -->
    <section class="section bg-neutral-950/50">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">
            Our Game
          </h2>
          <p class="text-white/70 max-w-2xl mx-auto">
            Dive into our post-apocalyptic adventure and find your purpose as the Last Man on Earth.
          </p>
        </div>
        
        <FeaturedGameCard :game="featuredGame" />
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
          <a href="mailto:hello@dormroomstudios.com" class="btn btn-primary">
            📧 hello@dormroomstudios.com
          </a>
        </div>
      </div>
    </section>
    
  </div>
</template>