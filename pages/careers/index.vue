<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { getAllJobs } from '~/utils/jobs'


// Get email addresses from environment
const config = useRuntimeConfig()
const careersEmail = config.public.careersEmail

// Page meta
useHead({
  title: 'Careers',
  meta: [
    { name: 'description', content: 'Join DormRoom Studios and help us create immersive gaming experiences. Explore career opportunities with our passionate indie game development team.' },
    { property: 'og:title', content: 'Careers at DormRoom Studios' },
    { property: 'og:description', content: 'Join our team and help us create immersive gaming experiences.' }
  ]
})

// Load jobs from markdown files
const jobs = ref([])

onMounted(() => {
  jobs.value = getAllJobs()
})

// Animation references
const pageTitle = ref(null)
const pageIntro = ref(null)
const jobsSection = ref(null)
const valuesSection = ref(null)
const ctaSection = ref(null)

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
  .from(valuesSection.value.children, { 
    y: 20, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.6 
  }, '-=0.3')
  // Only animate jobs if they exist
  if (jobsSection.value && jobsSection.value.children.length > 0) {
    tl.from(jobsSection.value.children, { 
      y: 20, 
      stagger: 0.1, 
      duration: 0.6 
    }, '-=0.3')
  }
  
  tl.from(ctaSection.value, { 
    y: 20, 
    opacity: 0, 
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
          Join Our Team
        </h1>
        <p 
          ref="pageIntro" 
          class="text-lg text-white/80 max-w-2xl mx-auto text-center"
        >
          Help us create unforgettable gaming experiences. We're always looking for passionate individuals who share our vision.
        </p>
      </div>
    </section>
    
    <!-- Why work with us -->
    <section class="section">
      <div class="container">
        <h2 class="text-3xl font-bold font-display mb-12 text-center">
          Why DormRoom Studios?
        </h2>
        
        <div ref="valuesSection" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <!-- Remote First -->
          <div class="card p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Remote First</h3>
            <p class="text-white/70 text-sm">Work from anywhere in the world</p>
          </div>
          
          <!-- Creative Freedom -->
          <div class="card p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-secondary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Creative Freedom</h3>
            <p class="text-white/70 text-sm">Shape the games you're passionate about</p>
          </div>
          
          <!-- Growth -->
          <div class="card p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Growth Opportunities</h3>
            <p class="text-white/70 text-sm">Learn and develop with a talented team</p>
          </div>
          
          <!-- Impact -->
          <div class="card p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2">Make an Impact</h3>
            <p class="text-white/70 text-sm">Your work reaches players worldwide</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Open positions -->
    <section class="section bg-neutral-900/50">
      <div class="container">
        <h2 class="text-3xl font-bold font-display mb-12 text-center">
          Open Positions
        </h2>
        
        <div ref="jobsSection" class="space-y-6 max-w-4xl mx-auto">
          <div 
            v-if="jobs && jobs.length > 0"
            v-for="job in jobs" 
            :key="job._id || job.slug"
            class="bg-neutral-800/90 border border-white/20 rounded-lg p-6 hover:shadow-glow transition-all duration-300"
          >
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2">{{ job.title }}</h3>
                <div class="flex flex-wrap gap-2 text-sm mb-3">
                  <span class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300">
                    {{ job.department }}
                  </span>
                  <span class="px-3 py-1 rounded-full bg-secondary-500/20 text-secondary-300">
                    {{ job.type }}
                  </span>
                  <span class="px-3 py-1 rounded-full bg-accent-500/20 text-accent-300">
                    {{ job.location }}
                  </span>
                  <span class="px-3 py-1 rounded-full bg-neutral-700/50 text-white/80">
                    {{ job.salary }}
                  </span>
                </div>
                <p class="text-white/80">{{ job.briefDescription }}</p>
              </div>
              <div>
                <NuxtLink 
                  :to="`/careers/${job.slug}`"
                  class="btn btn-primary text-sm"
                >
                  View Details
                </NuxtLink>
              </div>
            </div>
            
          </div>
          
          <!-- No jobs message -->
          <div v-else class="text-center py-12">
            <div class="card p-8">
              <h3 class="text-xl font-bold mb-4">No Open Positions Currently</h3>
              <p class="text-white/80 mb-6">
                We don't have any specific openings right now, but we're always interested in connecting with talented individuals who are passionate about creating great games.
              </p>
              <a :href="`mailto:${careersEmail}`" class="btn btn-primary">
                Send Us Your Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA section -->
    <section ref="ctaSection" class="section">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold font-display mb-6">
            Don't See Your Role?
          </h2>
          <p class="text-white/80 mb-8">
            We're always interested in meeting talented individuals who are passionate about games. Send us your portfolio and tell us how you'd contribute to our team.
          </p>
          
          <a :href="`mailto:${careersEmail}`" class="btn btn-primary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  </div>
</template>