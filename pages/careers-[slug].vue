<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

// Get route params
const route = useRoute()
const router = useRouter()
const jobSlug = computed(() => route.params.slug)

// Get email addresses from environment
const config = useRuntimeConfig()
const careersEmail = config.public.careersEmail

// Page meta
useHead({
  title: 'Job Details',
  meta: [
    { name: 'description', content: 'Detailed information about this career opportunity at DormRoom Studios.' }
  ]
})

// Extended job data with detailed information
const jobsData = ref([
  {
    id: 1,
    slug: 'senior-game-developer',
    title: 'Senior Game Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    salary: '$80,000 - $120,000',
    description: 'We\'re looking for an experienced game developer to help bring our next ambitious project to life. You\'ll work closely with our small team to implement core gameplay mechanics and systems.',
    briefDescription: 'Experienced game developer to implement core gameplay mechanics and systems.',
    responsibilities: [
      'Design and implement core gameplay systems and mechanics',
      'Collaborate with artists and designers to bring creative visions to life',
      'Optimize game performance for mobile platforms',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and technical discussions',
      'Debug and resolve technical issues throughout development',
      'Contribute to technical design decisions and architecture planning'
    ],
    requirements: [
      '5+ years of game development experience',
      'Strong proficiency in Unity or Unreal Engine',
      'Experience with mobile game optimization',
      'Passion for narrative-driven games',
      'Excellent problem-solving skills',
      'Experience with version control systems (Git)',
      'Strong communication and collaboration skills'
    ],
    niceToHave: [
      'Experience with multiplayer networking',
      'Knowledge of shader programming',
      'Previous work on published mobile games',
      'Understanding of game analytics and monetization',
      'Experience with CI/CD pipelines'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work hours and remote-first culture',
      'Professional development budget',
      'Top-tier equipment and software licenses',
      'Paid time off and sabbatical opportunities'
    ]
  },
  {
    id: 2,
    slug: '3d-environment-artist',
    title: '3D Environment Artist',
    type: 'Contract',
    location: 'Remote',
    department: 'Art',
    salary: '$60,000 - $85,000',
    description: 'Join us to create stunning, atmospheric environments for our upcoming title. You\'ll be responsible for modeling, texturing, and lighting game environments that support our storytelling.',
    briefDescription: 'Create stunning, atmospheric environments that support our storytelling.',
    responsibilities: [
      'Create high-quality 3D environments from concept to final implementation',
      'Model, texture, and light game environments using industry-standard tools',
      'Collaborate with the art director to maintain visual consistency',
      'Optimize assets for mobile platforms while maintaining visual quality',
      'Create modular environment pieces for efficient level construction',
      'Work with level designers to ensure gameplay functionality',
      'Maintain and organize art assets and documentation'
    ],
    requirements: [
      '3+ years of experience in game environment art',
      'Proficiency in Blender, Maya, or similar 3D software',
      'Strong understanding of PBR workflows',
      'Experience with Unity or Unreal Engine',
      'Portfolio demonstrating environmental storytelling',
      'Understanding of mobile optimization techniques',
      'Strong artistic eye for composition and lighting'
    ],
    niceToHave: [
      'Experience with procedural generation tools',
      'Knowledge of substance painting workflows',
      'Understanding of real-time VFX',
      'Experience with version control for art assets',
      'Background in traditional art or photography'
    ],
    benefits: [
      'Competitive contract rates',
      'Flexible scheduling and remote work',
      'Credit and portfolio building opportunities',
      'Potential for full-time conversion',
      'Access to latest software and hardware'
    ]
  },
  {
    id: 3,
    slug: 'narrative-designer',
    title: 'Narrative Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    salary: '$65,000 - $90,000',
    description: 'Help us craft compelling stories and memorable characters. You\'ll work on dialogue, quest design, and narrative systems that create emotional connections with players.',
    briefDescription: 'Craft compelling stories and memorable characters through dialogue and quest design.',
    responsibilities: [
      'Write engaging dialogue and character interactions',
      'Design and implement branching narrative systems',
      'Create compelling quest lines and story arcs',
      'Collaborate with designers to integrate story with gameplay',
      'Develop character backstories and world-building elements',
      'Work with voice actors and audio team during recording sessions',
      'Playtest and iterate on narrative content based on feedback'
    ],
    requirements: [
      'Proven experience in game narrative design',
      'Strong writing skills with published work',
      'Understanding of interactive storytelling',
      'Experience with branching narratives',
      'Collaborative mindset and communication skills',
      'Familiarity with narrative design tools',
      'Portfolio of narrative work (games, interactive fiction, etc.)'
    ],
    niceToHave: [
      'Experience with dialogue system implementation',
      'Background in screenwriting or creative writing',
      'Understanding of player psychology and engagement',
      'Experience with localization processes',
      'Knowledge of accessibility in narrative design'
    ],
    benefits: [
      'Competitive salary and creative freedom',
      'Health and wellness benefits',
      'Professional development opportunities',
      'Flexible work arrangements',
      'Creative input on company projects',
      'Conference and workshop attendance support'
    ]
  }
])

// Find the current job
const currentJob = computed(() => {
  return jobsData.value.find(job => job.slug === jobSlug.value)
})

// Handle job not found
if (!currentJob.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Job not found'
  })
}

// Animation references
const pageTitle = ref(null)
const jobHeader = ref(null)
const jobContent = ref(null)

onMounted(() => {
  // Animate page elements
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
  .from(jobContent.value.children, { 
    y: 20, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.6 
  }, '-=0.3')
})
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <section class="pt-32 pb-8">
      <div class="container">
        <nav class="flex items-center gap-2 text-sm text-white/60">
          <NuxtLink to="/" class="hover:text-primary-400 transition-colors">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/careers" class="hover:text-primary-400 transition-colors">Careers</NuxtLink>
          <span>/</span>
          <span class="text-white/80">{{ currentJob.title }}</span>
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
            {{ currentJob.title }}
          </h1>
          
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 font-medium">
              {{ currentJob.department }}
            </span>
            <span class="px-4 py-2 rounded-full bg-secondary-500/20 text-secondary-300 font-medium">
              {{ currentJob.type }}
            </span>
            <span class="px-4 py-2 rounded-full bg-accent-500/20 text-accent-300 font-medium">
              {{ currentJob.location }}
            </span>
            <span class="px-4 py-2 rounded-full bg-neutral-700/50 text-white/80 font-medium">
              {{ currentJob.salary }}
            </span>
          </div>
          
          <p class="text-xl text-white/80 leading-relaxed">
            {{ currentJob.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Job details -->
    <section class="section">
      <div class="container">
        <div ref="jobContent" class="max-w-4xl mx-auto space-y-12">
          
          <!-- What You'll Do -->
          <div class="card p-8">
            <h2 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              What You'll Do
            </h2>
            <ul class="space-y-3">
              <li 
                v-for="(responsibility, index) in currentJob.responsibilities" 
                :key="index"
                class="flex items-start gap-3 text-white/80"
              >
                <div class="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0"></div>
                {{ responsibility }}
              </li>
            </ul>
          </div>

          <!-- What We're Looking For -->
          <div class="card p-8">
            <h2 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-secondary-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              What We're Looking For
            </h2>
            <ul class="space-y-3">
              <li 
                v-for="(requirement, index) in currentJob.requirements" 
                :key="index"
                class="flex items-start gap-3 text-white/80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-secondary-400 mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {{ requirement }}
              </li>
            </ul>
          </div>

          <!-- Nice to Have -->
          <div class="card p-8">
            <h2 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-accent-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              Nice to Have
            </h2>
            <ul class="space-y-3">
              <li 
                v-for="(item, index) in currentJob.niceToHave" 
                :key="index"
                class="flex items-start gap-3 text-white/80"
              >
                <div class="w-2 h-2 rounded-full bg-accent-400 mt-2 flex-shrink-0"></div>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Benefits -->
          <div class="card p-8">
            <h2 class="text-2xl font-bold font-display mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              What We Offer
            </h2>
            <ul class="space-y-3">
              <li 
                v-for="(benefit, index) in currentJob.benefits" 
                :key="index"
                class="flex items-start gap-3 text-white/80"
              >
                <div class="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0"></div>
                {{ benefit }}
              </li>
            </ul>
          </div>

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
              :href="`mailto:${careersEmail}?subject=Application for ${currentJob.title}&body=Hi DormRoom Studios team,%0D%0A%0D%0AI'm interested in the ${currentJob.title} position. Please find my resume and portfolio attached.%0D%0A%0D%0ABest regards`"
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
</template>
