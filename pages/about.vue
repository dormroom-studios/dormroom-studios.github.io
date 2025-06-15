<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// Page meta
useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Learn about DormRoom Studios, our story, values, and the passionate team behind our immersive gaming experiences.' },
    { property: 'og:title', content: 'About DormRoom Studios' },
    { property: 'og:description', content: 'Learn about our story, values, and the passionate team behind our immersive gaming experiences.' }
  ]
})

// Team members
const team = ref([
  {
    name: 'Alex Chen',
    role: 'Founder & Creative Director',
    bio: 'Former lead designer at major studios with over 15 years of experience crafting award-winning games.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Samantha Wong',
    role: 'Lead Developer',
    bio: 'Programming virtuoso with expertise in game engine architecture and performance optimization.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Marcus Johnson',
    role: 'Art Director',
    bio: 'Award-winning digital artist who brings worlds to life with a distinctive visual style and attention to detail.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Lead Game Designer',
    bio: 'Passionate about creating memorable player experiences with innovative gameplay mechanics.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
])

// Animation references
const pageTitle = ref(null)
const pageIntro = ref(null)
const storySection = ref(null)
const teamSection = ref(null)
const values = ref(null)

onMounted(() => {
  // Animate page elements
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from(pageTitle.value, { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  })
  .from(pageIntro.value, { 
    y: 20, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.5')
  .from(storySection.value, { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.3')
  .from(values.value.children, { 
    y: 20, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.6 
  }, '-=0.5')
  .from(teamSection.value.children, { 
    y: 20, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.6 
  }, '-=0.3')
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
          About DormRoom
        </h1>
        <p 
          ref="pageIntro" 
          class="text-lg text-white/80 max-w-2xl mx-auto text-center"
        >
          We are a passionate indie game studio dedicated to creating immersive, innovative gaming experiences.
        </p>
      </div>
    </section>
    
    <!-- Our story -->
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref="storySection">
            <h2 class="text-3xl font-bold font-display mb-6">Our Story</h2>
            
            <p class="text-white/80 mb-4">
              Founded in 2021, DormRoom Studios began as a collaboration between four industry veterans who shared a vision: to create games that push boundaries while maintaining the soul and creativity of indie development.
            </p>
            
            <p class="text-white/80 mb-4">
              After years of working at larger studios, we wanted to build a company where creative freedom and player experience would always come first. Our small but mighty team brings together decades of combined experience in game design, art, programming, and storytelling.
            </p>
            
            <p class="text-white/80">
              Today, we're proud to have released several acclaimed titles that reflect our commitment to quality, innovation, and delivering unforgettable experiences to players worldwide.
            </p>
          </div>
          
          <div class="relative">
            <div class="relative aspect-video overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.pexels.com/photos/7915575/pexels-photo-7915575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our studio" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>
            </div>
            
            <!-- Decorative element -->
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-500/20 rounded-lg backdrop-blur-sm z-0"></div>
            <div class="absolute -top-6 -left-6 w-16 h-16 bg-accent-500/20 rounded-lg backdrop-blur-sm z-0"></div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Our values -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <h2 class="text-3xl font-bold font-display mb-12 text-center">
          Our Values
        </h2>
        
        <div 
          ref="values" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <!-- Innovation -->
          <div class="card p-6 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-primary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-3">Innovation</h3>
            
            <p class="text-white/80">
              We constantly push boundaries and explore new ideas to create fresh, exciting gameplay experiences that surprise and delight players.
            </p>
          </div>
          
          <!-- Player-Centric -->
          <div class="card p-6 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-secondary-500/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-secondary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-3">Player-Centric</h3>
            
            <p class="text-white/80">
              Every decision we make is guided by what will create the best possible experience for our players. Your enjoyment is our priority.
            </p>
          </div>
          
          <!-- Quality -->
          <div class="card p-6 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-accent-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-3">Quality</h3>
            
            <p class="text-white/80">
              We believe in releasing games when they're ready, not when they're due. Our commitment to quality means we never compromise on the final experience.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Team -->
    <section class="section">
      <div class="container">
        <h2 class="text-3xl font-bold font-display mb-12 text-center">
          Meet Our Team
        </h2>
        
        <div 
          ref="teamSection" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div 
            v-for="(member, index) in team" 
            :key="index"
            class="card overflow-hidden group"
          >
            <div class="aspect-square overflow-hidden">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div class="p-5">
              <h3 class="text-xl font-bold mb-1">{{ member.name }}</h3>
              <p class="text-primary-400 text-sm mb-3">{{ member.role }}</p>
              <p class="text-white/80 text-sm">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Join us -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold font-display mb-6">
            Join Our Team
          </h2>
          <p class="text-white/80 mb-8">
            We're always looking for talented individuals who are passionate about creating amazing games. If you think you'd be a good fit for our studio, we'd love to hear from you.
          </p>
          
          <a href="#" class="btn btn-primary">
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  </div>
</template>