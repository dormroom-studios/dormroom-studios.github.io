<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGamesStore } from '../stores/games'

import FeaturedGameCard from '../components/FeaturedGameCard.vue'
import GameCard from '../components/GameCard.vue'
import NewsCard from '../components/NewsCard.vue'

const gamesStore = useGamesStore()

// Hero animation references
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroCta = ref(null)
const heroImage = ref(null)

// Fetch featured game (would typically come from an API)
const featuredGame = gamesStore.getFeaturedGame

// Get latest games (excluding featured)
const latestGames = gamesStore.getLatestGames(3)

// Get latest news
const latestNews = ref([
  {
    id: 1,
    title: 'Cosmic Odyssey Expansion Pack Coming Soon',
    excerpt: 'Explore new galaxies and encounter mysterious alien species in our upcoming expansion.',
    date: '2025-03-15',
    image: 'https://images.pexels.com/photos/1632039/pexels-photo-1632039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Join Our Community Game Jam Next Month',
    excerpt: 'Put your game development skills to the test in our 48-hour community game jam event.',
    date: '2025-02-28',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
])

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
              Crafting <span class="text-gradient">Immersive</span> Gaming Experiences
            </h1>
            <p 
              ref="heroSubtitle" 
              class="text-lg md:text-xl text-white/80 mb-8 max-w-lg"
            >
              An independent game studio creating captivating worlds and unforgettable adventures for players worldwide.
            </p>
            <div ref="heroCta" class="flex flex-wrap gap-4">
              <router-link to="/games" class="btn btn-primary">
                Explore Our Games
              </router-link>
              <router-link to="/about" class="btn btn-outline">
                About Us
              </router-link>
            </div>
          </div>
          <div ref="heroImage" class="relative">
            <div class="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                :src="featuredGame.coverImage" 
                :alt="featuredGame.title" 
                class="w-full h-auto rounded-lg object-cover" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-2xl font-bold mb-2">{{ featuredGame.title }}</h3>
                <p class="text-white/80 mb-4">{{ featuredGame.shortDescription }}</p>
                <router-link 
                  :to="`/games/${featuredGame.id}`" 
                  class="btn btn-accent"
                >
                  Learn More
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Game Section -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">
            Featured Release
          </h2>
          <p class="text-white/70 max-w-2xl mx-auto">
            Dive into our latest game and experience a new world of adventure.
          </p>
        </div>
        
        <FeaturedGameCard :game="featuredGame" />
      </div>
    </section>
    
    <!-- Latest Games Section -->
    <section class="section">
      <div class="container">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-display">
            Our Games
          </h2>
          <router-link to="/games" class="btn btn-outline">
            View All
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GameCard 
            v-for="game in latestGames" 
            :key="game.id" 
            :game="game" 
          />
        </div>
      </div>
    </section>
    
    <!-- Latest News Section -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-display">
            Latest News
          </h2>
          <router-link to="/news" class="btn btn-outline">
            View All
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NewsCard 
            v-for="news in latestNews" 
            :key="news.id" 
            :news="news" 
          />
        </div>
      </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-primary-900/40 backdrop-blur-sm"></div>
        <img 
          src="https://images.pexels.com/photos/7915264/pexels-photo-7915264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Background" 
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div class="container relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">
            Join Our Community
          </h2>
          <p class="text-white/80 mb-8">
            Subscribe to our newsletter to receive updates on new releases, behind-the-scenes content, and exclusive offers.
          </p>
          
          <form class="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="flex-1 px-4 py-3 rounded-md bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="submit" class="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
