<script setup>
import { ref } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)

const navigateToGame = () => {
  navigateTo(`/games/${props.game.id}`)
}
</script>

<template>
  <div 
    class="game-card group cursor-pointer"
    @click="navigateToGame"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="relative aspect-[3/4] overflow-hidden">
      <!-- Game image -->
      <img 
        :src="game.coverImage" 
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <!-- Overlay gradient -->
      <div 
        class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"
      ></div>
      
      <!-- Game info -->
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <h3 class="text-xl font-bold font-display mb-2 group-hover:text-primary-400 transition-colors">
          {{ game.title }}
        </h3>
        
        <p 
          class="text-white/80 text-sm mb-3 line-clamp-2 transform transition-all duration-300"
          :class="{ 'scale-y-0 h-0 mb-0 opacity-0': isHovered }"
        >
          {{ game.shortDescription }}
        </p>
        
        <!-- Platforms -->
        <div class="flex items-center gap-2 mb-3">
          <span 
            v-for="platform in game.platforms" 
            :key="platform"
            class="px-2 py-1 text-xs rounded-md bg-white/10 backdrop-blur-sm"
          >
            {{ platform }}
          </span>
        </div>
        
        <!-- Play Now button (only visible on hover) -->
        <a 
          :href="game.playLink" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-primary btn-sm w-full transform transition-all duration-300 inline-block text-center"
          :class="{ 'translate-y-0 opacity-100': isHovered, 'translate-y-4 opacity-0': !isHovered }"
          @click.stop
        >
          Play Now
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-sm {
  @apply px-4 py-2 text-sm;
}
</style>