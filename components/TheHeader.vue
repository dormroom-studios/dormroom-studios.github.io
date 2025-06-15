<script setup>
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false
    document.body.style.overflow = ''
  }
}

// Close menu on route change
watch(() => route.path, closeMenu)

// Update header style on scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      isScrolled ? 'bg-neutral-900/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="container">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center" @click="closeMenu">
          <span class="text-2xl font-bold font-display tracking-tight uppercase">
            dorm<span class="text-primary-500">studios</span>
          </span>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:block">
          <ul class="flex space-x-8">
            <li>
              <NuxtLink 
                to="/" 
                class="text-white/80 hover:text-white transition-colors font-medium"
                :class="{ 'text-white': route.path === '/' }"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/games" 
                class="text-white/80 hover:text-white transition-colors font-medium"
                :class="{ 'text-white': route.path.startsWith('/games') }"
              >
                Games
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/about" 
                class="text-white/80 hover:text-white transition-colors font-medium"
                :class="{ 'text-white': route.path === '/about' }"
              >
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/news" 
                class="text-white/80 hover:text-white transition-colors font-medium"
                :class="{ 'text-white': route.path === '/news' }"
              >
                News
              </NuxtLink>
            </li>
          </ul>
        </nav>
        
        <!-- Mobile Menu Toggle -->
        <button 
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span 
            :class="[
              'block w-6 h-0.5 bg-white transition-transform duration-300',
              isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
            ]"
          ></span>
          <span 
            :class="[
              'block w-6 h-0.5 bg-white transition-opacity duration-300',
              isMenuOpen ? 'opacity-0' : ''
            ]"
          ></span>
          <span 
            :class="[
              'block w-6 h-0.5 bg-white transition-transform duration-300',
              isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
            ]"
          ></span>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation Menu -->
    <div 
      :class="[
        'fixed inset-0 bg-neutral-900/95 backdrop-blur-lg z-40 transition-transform duration-300 flex flex-col justify-center items-center md:hidden',
        isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      ]"
    >
      <nav>
        <ul class="flex flex-col space-y-8 text-center">
          <li>
            <NuxtLink 
              to="/" 
              class="text-2xl font-medium hover:text-primary-500 transition-colors"
              :class="{ 'text-primary-500': route.path === '/' }"
              @click="closeMenu"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/games" 
              class="text-2xl font-medium hover:text-primary-500 transition-colors"
              :class="{ 'text-primary-500': route.path.startsWith('/games') }"
              @click="closeMenu"
            >
              Games
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/about" 
              class="text-2xl font-medium hover:text-primary-500 transition-colors"
              :class="{ 'text-primary-500': route.path === '/about' }"
              @click="closeMenu"
            >
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/news" 
              class="text-2xl font-medium hover:text-primary-500 transition-colors"
              :class="{ 'text-primary-500': route.path === '/news' }"
              @click="closeMenu"
            >
              News
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>