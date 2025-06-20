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

// Team members - keeping it simple and authentic to small indie studio
const team = ref([])

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
          We craft immersive single-player mobile games where stories come first.
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
              Dormroom Studios began with one mission: to create meaningful, story-driven mobile experiences that resonate with players. We're passionate creators who believe in the power of immersive storytelling.
            </p>
            
            <p class="text-white/80 mb-4">
              Our debut game, "The Last Adventurer," represents our vision of what mobile gaming can be—a cinematic, first-person journey through a post-apocalyptic world where every step tells a story.
            </p>
            
            <p class="text-white/80">
              We're just getting started, and we're excited to share more adventures with you. Thank you for being part of our journey from the very beginning.
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
          class="text-center"
        >
          <p class="text-white/80 max-w-2xl mx-auto">
            We're a small team of passionate creators who believe in the power of storytelling through interactive experiences. Every member of our team contributes to crafting games that leave a lasting emotional impact.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Contact us -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold font-display mb-6">
            Get In Touch
          </h2>
          <p class="text-white/80 mb-8">
            We'd love to hear from you—whether you're a player with feedback, a fellow dev, or someone who just wants to say hi.
          </p>
          
          <a href="mailto:hello@dormroom.in" class="btn btn-primary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            hello@dormroom.in
          </a>
        </div>
      </div>
    </section>
  </div>
</template>