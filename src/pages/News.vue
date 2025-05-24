<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

import NewsCard from '../components/NewsCard.vue'

// News items
const newsItems = ref([
  {
    id: 1,
    title: 'Cosmic Odyssey Expansion Pack Coming Soon',
    excerpt: 'Explore new galaxies and encounter mysterious alien species in our upcoming expansion. With over 20 new planets to discover and a brand new storyline, this is our biggest update yet.',
    date: '2025-03-15',
    image: 'https://images.pexels.com/photos/1632039/pexels-photo-1632039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Join Our Community Game Jam Next Month',
    excerpt: 'Put your game development skills to the test in our 48-hour community game jam event. Winners will receive exclusive prizes and potential internship opportunities at our studio.',
    date: '2025-02-28',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Neon Shadows Patch 2.3 Release Notes',
    excerpt: 'Our latest patch brings balance improvements, new side quests, and fixes several reported bugs. Check out the full changelog to see all the updates and improvements.',
    date: '2025-02-15',
    image: 'https://images.pexels.com/photos/1634278/pexels-photo-1634278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'PixelForge at GDC 2025: Meet the Team',
    excerpt: 'We\'re excited to announce that our team will be attending GDC 2025! Stop by our booth to play demos of upcoming games and chat with our developers.',
    date: '2025-01-30',
    image: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    title: 'Mythic Legends: New Character Spotlight',
    excerpt: 'Meet Seraphina, the newest addition to the Mythic Legends roster. With powerful celestial abilities and a compelling backstory, she\'s sure to become a fan favorite.',
    date: '2025-01-15',
    image: 'https://images.pexels.com/photos/5865634/pexels-photo-5865634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    title: 'Behind the Scenes: The Art of Velocity Rush',
    excerpt: 'In this developer diary, our art team discusses the process of creating the futuristic world of Velocity Rush, from concept art to final implementation.',
    date: '2024-12-20',
    image: 'https://images.pexels.com/photos/3894818/pexels-photo-3894818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
])

// Animation references
const pageTitle = ref(null)
const pageDescription = ref(null)
const newsList = ref(null)

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
  .from(newsList.value.children, { 
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
          News & Updates
        </h1>
        <p 
          ref="pageDescription" 
          class="text-lg text-white/80 max-w-2xl mx-auto text-center"
        >
          Stay up to date with the latest news, game updates, and events from PixelForge Studios.
        </p>
      </div>
    </section>
    
    <!-- News grid -->
    <section class="section">
      <div class="container">
        <div 
          ref="newsList" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <NewsCard 
            v-for="news in newsItems" 
            :key="news.id" 
            :news="news" 
          />
        </div>
      </div>
    </section>
  </div>
</template>