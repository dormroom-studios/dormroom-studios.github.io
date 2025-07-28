<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// Get email addresses from environment
const config = useRuntimeConfig()
const contactEmail = config.public.contactEmail
const careersEmail = config.public.careersEmail

// Page meta
useHead({
  title: 'Contact Us',
  meta: [
    { name: 'description', content: 'Get in touch with DormRoom Studios. We\'d love to hear from you about our games, feedback, or any questions you might have.' },
    { property: 'og:title', content: 'Contact DormRoom Studios' },
    { property: 'og:description', content: 'Get in touch with us about our games, feedback, or any questions you might have.' }
  ]
})

// Animation references
const pageTitle = ref(null)
const pageIntro = ref(null)
const contactCards = ref(null)

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
  // Only animate contact cards if they exist
  if (contactCards.value && contactCards.value.children.length > 0) {
    tl.from(contactCards.value.children, { 
      y: 20, 
      stagger: 0.1, 
      duration: 0.6 
    }, '-=0.3')
  }
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
          Get In Touch
        </h1>
        <p 
          ref="pageIntro" 
          class="text-lg text-white/80 max-w-2xl mx-auto text-center"
        >
          We'd love to hear from you. Whether you have questions about our games, feedback, or just want to say hello.
        </p>
      </div>
    </section>
    
    <!-- Contact options -->
    <section class="section">
      <div class="container">
        <div ref="contactCards" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <!-- General Contact -->
          <div class="card p-8 text-center hover:shadow-glow transition-all duration-300">
            <div class="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-primary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-4">General Inquiries</h3>
            
            <p class="text-white/80 mb-6">
              Questions about our games, feedback, partnerships, or just want to chat? We're here to help.
            </p>
            
            <a 
              :href="`mailto:${contactEmail}`" 
              class="btn btn-primary inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {{ contactEmail }}
            </a>
          </div>
          
          <!-- Careers -->
          <div class="card p-8 text-center hover:shadow-glow transition-all duration-300">
            <div class="w-16 h-16 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-secondary-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-4">Join Our Team</h3>
            
            <p class="text-white/80 mb-6">
              Interested in working with us? Send us your portfolio and let's create amazing games together.
            </p>
            
            <div class="flex flex-col gap-3">
              <a 
                :href="`mailto:${careersEmail}`" 
                class="btn btn-secondary inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {{ careersEmail }}
              </a>
              <NuxtLink to="/careers" class="btn btn-outline text-sm">
                View Open Positions
              </NuxtLink>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
    <!-- Additional info -->
    <section class="section bg-neutral-950/70">
      <div class="container">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold font-display mb-6">
            Let's Create Something Amazing
          </h2>
          <p class="text-white/80 mb-8">
            We're a small but passionate team committed to creating meaningful gaming experiences. Every message matters to us, and we'll get back to you as soon as possible.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 class="font-bold mb-2">Quick Response</h4>
              <p class="text-white/70 text-sm">We typically respond within 24-48 hours</p>
            </div>
            
            <div>
              <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h4 class="font-bold mb-2">Personal Touch</h4>
              <p class="text-white/70 text-sm">Every email is read and replied to personally</p>
            </div>
            
            <div>
              <div class="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-secondary-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h4 class="font-bold mb-2">We Care</h4>
              <p class="text-white/70 text-sm">Your feedback helps us improve and grow</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>