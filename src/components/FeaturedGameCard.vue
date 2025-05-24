<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  game: {
    id: number
    title: string
    description: string
    shortDescription: string
    coverImage: string
    screenshots: string[]
    platforms: string[]
    releaseDate: string
    features: string[]
  }
}>()

const router = useRouter()

const activeScreenshot = ref(0)

const nextScreenshot = () => {
  activeScreenshot.value = (activeScreenshot.value + 1) % props.game.screenshots.length
}

const prevScreenshot = () => {
  activeScreenshot.value = (activeScreenshot.value - 1 + props.game.screenshots.length) % props.game.screenshots.length
}

const navigateToGame = () => {
  router.push(`/games/${props.game.id}`)
}
</script>

<template>
  <div class="card overflow-hidden bg-neutral-800/50 backdrop-blur-md border border-white/10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Game screenshots carousel -->
      <div class="relative aspect-video overflow-hidden">
        <div class="relative h-full">
          <!-- Screenshots -->
          <transition-group name="fade">
            <img 
              v-for="(screenshot, index) in game.screenshots" 
              :key="index"
              :src="screenshot" 
              :alt="`${game.title} screenshot ${index + 1}`"
              class="absolute inset-0 w-full h-full object-cover"
              v-show="index === activeScreenshot"
            />
          </transition-group>
          
          <!-- Navigation arrows -->
          <button 
            @click.stop="prevScreenshot" 
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Previous screenshot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            @click.stop="nextScreenshot" 
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Next screenshot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          <!-- Screenshot indicators -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            <button 
              v-for="(_, index) in game.screenshots" 
              :key="index"
              @click.stop="activeScreenshot = index"
              :class="[
                'w-2 h-2 rounded-full transition-all',
                index === activeScreenshot ? 'bg-white w-4' : 'bg-white/50'
              ]"
              :aria-label="`View screenshot ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
      
      <!-- Game info -->
      <div class="p-6 lg:p-8 flex flex-col">
        <h3 class="text-2xl md:text-3xl font-bold font-display mb-4">{{ game.title }}</h3>
        
        <p class="text-white/80 mb-6">{{ game.description }}</p>
        
        <!-- Game features -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-3">Key Features</h4>
          <ul class="space-y-2">
            <li 
              v-for="(feature, index) in game.features" 
              :key="index"
              class="flex items-start"
            >
              <span class="text-primary-500 mr-2">✦</span>
              <span class="text-white/80">{{ feature }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Game metadata -->
        <div class="flex flex-wrap gap-3 mb-6">
          <div 
            v-for="platform in game.platforms" 
            :key="platform"
            class="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm"
          >
            {{ platform }}
          </div>
          
          <div class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm backdrop-blur-sm">
            {{ new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }}
          </div>
        </div>
        
        <!-- CTA -->
        <div class="mt-auto">
          <button @click="navigateToGame" class="btn btn-primary w-full">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>