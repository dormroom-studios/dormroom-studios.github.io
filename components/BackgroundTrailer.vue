<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <!-- Video Background -->
    <div v-if="showVideo" class="absolute inset-0 w-full h-full">
      <iframe
        :src="embedUrl"
        class="absolute inset-0 w-full h-full scale-150"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style="pointer-events: none;"
      ></iframe>
    </div>
    
    <!-- Fallback Image Background -->
    <div v-else class="absolute inset-0 w-full h-full">
      <img 
        :src="fallbackImage" 
        :alt="alt"
        class="w-full h-full object-cover"
      />
    </div>
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900 z-10"></div>
    
    <!-- Video Controls (optional) -->
    <div v-if="showControls" class="absolute bottom-4 right-4 z-20 flex gap-2">
      <button 
        @click="toggleVideo"
        class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
        :aria-label="showVideo ? 'Pause video' : 'Play video'"
      >
        <svg v-if="showVideo" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
        <svg v-else class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
      
      <button 
        @click="toggleMute"
        class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
        :aria-label="isMuted ? 'Unmute video' : 'Mute video'"
      >
        <svg v-if="isMuted" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  youtubeUrl: {
    type: String,
    required: true
  },
  fallbackImage: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Background video'
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  showControls: {
    type: Boolean,
    default: true
  },
  opacity: {
    type: Number,
    default: 0.4
  }
})

const showVideo = ref(false)
const isMuted = ref(true)

// Extract YouTube video ID from URL
const videoId = computed(() => {
  const match = props.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
})

// Create embed URL with autoplay parameters for background video
const embedUrl = computed(() => {
  if (!videoId.value) return ''
  
  const params = new URLSearchParams({
    autoplay: '1',
    mute: isMuted.value ? '1' : '0',
    loop: '1',
    playlist: videoId.value, // Required for loop to work
    controls: '0', // Hide controls for background video
    showinfo: '0',
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    cc_load_policy: '0',
    start: '0',
    enablejsapi: '1',
    origin: window.location.origin
  })
  
  return `https://www.youtube.com/embed/${videoId.value}?${params.toString()}`
})

const toggleVideo = () => {
  showVideo.value = !showVideo.value
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  // Note: Mute toggle requires YouTube API for runtime control
}

onMounted(() => {
  if (props.autoplay) {
    // Small delay to ensure proper loading
    setTimeout(() => {
      showVideo.value = true
    }, 1000)
  }
})
</script>

<style scoped>
/* Ensure video covers properly and is not interactive */
iframe {
  pointer-events: none;
  transform-origin: center center;
}

/* Scale video to cover container properly */
.scale-150 {
  transform: scale(1.5);
}
</style>