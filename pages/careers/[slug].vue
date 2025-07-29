<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { getJobBySlug } from '~/utils/jobs'

// Get route params
const route = useRoute()
const slug = computed(() => route.params.slug)

// Get email addresses from environment
const config = useRuntimeConfig()
const careersEmail = config.public.careersEmail

// Load job content immediately
const job = computed(() => getJobBySlug(slug.value))

// Page meta
useHead({
  title: computed(() => `${job.value?.title || 'Job'} - Careers`),
  meta: [
    { name: 'description', content: computed(() => job.value?.description || '') },
    { property: 'og:title', content: computed(() => `${job.value?.title || 'Job'} at DormRoom Studios`) },
    { property: 'og:description', content: computed(() => job.value?.description || '') }
  ]
})

// Animation references
const pageTitle = ref(null)
const jobHeader = ref(null)
const jobContent = ref(null)

onMounted(() => {
  // Animate page elements
  if (job.value) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from(pageTitle.value, { 
      y: 30, 
      opacity: 0, 
      duration: 0.8 
    })
    .from(jobHeader.value, { 
      y: 20, 
      opacity: 0, 
      duration: 0.8 
    }, '-=0.5')
    
    if (jobContent.value && jobContent.value.children) {
      tl.from(jobContent.value.children, { 
        y: 20, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.6 
      }, '-=0.3')
    }
  }
})
</script>

<template>
  <div>
    <div v-if="job">
      <!-- Breadcrumb -->
      <section class="pt-32 pb-8">
        <div class="container">
          <nav class="flex items-center gap-2 text-sm text-white/60">
            <NuxtLink to="/" class="hover:text-primary-400 transition-colors">Home</NuxtLink>
            <span>/</span>
            <NuxtLink to="/careers" class="hover:text-primary-400 transition-colors">Careers</NuxtLink>
            <span>/</span>
            <span class="text-white/80">{{ job.title }}</span>
          </nav>
        </div>
      </section>

    <!-- Job header -->
    <section class="py-16 bg-neutral-950/70">
      <div class="container">
        <div ref="jobHeader" class="max-w-4xl mx-auto">
          <h1 
            ref="pageTitle" 
            class="text-4xl md:text-5xl font-bold font-display mb-6"
          >
            {{ job.title }}
          </h1>
          
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 font-medium">
              {{ job.department }}
            </span>
            <span class="px-4 py-2 rounded-full bg-secondary-500/20 text-secondary-300 font-medium">
              {{ job.type }}
            </span>
            <span class="px-4 py-2 rounded-full bg-accent-500/20 text-accent-300 font-medium">
              {{ job.location }}
            </span>
            <span class="px-4 py-2 rounded-full bg-neutral-700/50 text-white/80 font-medium">
              {{ job.salary }}
            </span>
          </div>
          
          <p class="text-xl text-white/80 leading-relaxed">
            {{ job.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Job details -->
    <section class="section">
      <div class="container">
        <div ref="jobContent" class="max-w-4xl mx-auto">
          <!-- Render HTML content with proper styling -->
          <div class="job-content prose prose-invert prose-lg max-w-none" v-html="job.html"></div>
        </div>
      </div>
    </section>

    <!-- Apply section -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold font-display mb-6">
            Ready to Join Us?
          </h2>
          <p class="text-white/80 mb-8">
            Send us your resume, portfolio, and a brief note about why you're excited about this role. We'd love to hear from you!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              :href="`mailto:${careersEmail}?subject=Application for ${job.title}&body=Hi DormRoom Studios team,%0D%0A%0D%0AI'm interested in the ${job.title} position. Please find my resume and portfolio attached.%0D%0A%0D%0ABest regards`"
              class="btn btn-primary inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Apply Now
            </a>
            <NuxtLink to="/careers" class="btn btn-outline">
              View All Positions
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    </div>
    
    <!-- Loading state -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Loading job details...</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Job content sections as cards */
:deep(.job-content) {
  @apply space-y-12;
}

:deep(.job-content h2) {
  @apply text-2xl font-bold text-white mb-6 font-display bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex items-center gap-3;
}

:deep(.job-content h2:nth-of-type(1)) {
  @apply relative;
}

:deep(.job-content h2:nth-of-type(1)::before) {
  content: '';
  @apply w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%238a2be2' class='w-5 h-5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}

:deep(.job-content h2:nth-of-type(2)::before) {
  content: '';
  @apply w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%2314b8a6' class='w-5 h-5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' /%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}

:deep(.job-content h2:nth-of-type(3)::before) {
  content: '';
  @apply w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23f97316' class='w-5 h-5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' /%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}

:deep(.job-content h2:nth-of-type(4)::before) {
  content: '';
  @apply w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%238a2be2' class='w-5 h-5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' /%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}

:deep(.job-content h2 + ul) {
  @apply bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 -mt-6;
}

:deep(.job-content ul) {
  @apply space-y-3;
}

:deep(.job-content li) {
  @apply flex items-start gap-3 text-white/80;
}

:deep(.job-content li::marker) {
  @apply hidden;
}

:deep(.job-content ul:nth-of-type(1) li::before),
:deep(.job-content ul:nth-of-type(4) li::before) {
  content: '';
  @apply w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0;
}

:deep(.job-content ul:nth-of-type(2) li::before) {
  content: '✓';
  @apply text-secondary-400 font-bold;
}

:deep(.job-content ul:nth-of-type(3) li::before) {
  content: '';
  @apply w-2 h-2 rounded-full bg-accent-400 mt-2 flex-shrink-0;
}

:deep(.job-content p) {
  @apply text-white/80 leading-relaxed;
}
</style>