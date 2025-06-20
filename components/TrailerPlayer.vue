<template>
  <div class="relative w-full aspect-video bg-neutral-900 rounded-lg overflow-hidden shadow-xl">
    <!-- YouTube Embed with autoplay -->
    <iframe
      v-if="showVideo"
      :src="embedUrl"
      class="w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
    ></iframe>
    
    <!-- Thumbnail with play button -->
    <div 
      v-else 
      class="relative w-full h-full bg-cover bg-center cursor-pointer group"
      :style="{ backgroundImage: `url(${thumbnailUrl})` }"
      @click="playVideo"
    >
      <div class="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
      
      <!-- Play button -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
          <svg class="w-8 h-8 text-neutral-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      <!-- Trailer label -->
      <div class="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-sm font-medium">
        🎬 Trailer
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  youtubeUrl: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  thumbnailImage: {
    type: String,
    default: null
  }
})

const showVideo = ref(props.autoplay)

// Extract YouTube video ID from URL
const videoId = computed(() => {
  const match = props.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
})

// Create embed URL with autoplay parameters
const embedUrl = computed(() => {
  if (!videoId.value) return ''
  
  const params = new URLSearchParams({
    autoplay: showVideo.value ? '1' : '0',
    mute: '1', // Required for autoplay
    rel: '0', // Don't show related videos
    modestbranding: '1', // Minimal YouTube branding
    controls: '1',
    fs: '1', // Allow fullscreen
    cc_load_policy: '0', // Don't show captions by default
    iv_load_policy: '3' // Don't show annotations
  })
  
  return `https://www.youtube.com/embed/${videoId.value}?${params.toString()}`
})

// YouTube thumbnail URL
const thumbnailUrl = computed(() => {
  if (props.thumbnailImage) return props.thumbnailImage
  if (!videoId.value) return ''
  return `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg`
})

const playVideo = () => {
  showVideo.value = true
}
</script>