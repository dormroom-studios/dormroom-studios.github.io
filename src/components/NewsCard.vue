<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  news: {
    id: number
    title: string
    excerpt: string
    date: string
    image: string
  }
}>()

const formattedDate = computed(() => {
  return new Date(props.news.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="card flex flex-col h-full group">
    <!-- News image -->
    <div class="relative aspect-video overflow-hidden">
      <img 
        :src="news.image" 
        :alt="news.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    
    <!-- News content -->
    <div class="p-6 flex flex-col flex-1">
      <span class="text-sm text-white/60 mb-2">{{ formattedDate }}</span>
      
      <h3 class="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
        {{ news.title }}
      </h3>
      
      <p class="text-white/80 mb-6">
        {{ news.excerpt }}
      </p>
      
      <router-link 
        :to="`/news/${news.id}`" 
        class="mt-auto inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
      >
        Read More
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </router-link>
    </div>
  </div>
</template>