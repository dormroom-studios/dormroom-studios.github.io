<script setup>
const canvasRef = ref(null)
const particles = ref([])
const animationFrameId = ref(null)
const route = useRoute()

const createParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150)
  particles.value = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.1
    })
  }
}

const updateCanvasSize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  createParticles()
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  particles.value.forEach(particle => {
    particle.x += particle.speedX
    particle.y += particle.speedY
    
    // Wrap around edges
    if (particle.x < 0) particle.x = canvas.width
    if (particle.x > canvas.width) particle.x = 0
    if (particle.y < 0) particle.y = canvas.height
    if (particle.y > canvas.height) particle.y = 0
    
    // Draw particle
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(138, 43, 226, ${particle.opacity})`
    ctx.fill()
  })
  
  // Connect nearby particles
  connectParticles(ctx)
  
  animationFrameId.value = requestAnimationFrame(animate)
}

const connectParticles = (ctx) => {
  const maxDistance = 100
  
  for (let i = 0; i < particles.value.length; i++) {
    for (let j = i + 1; j < particles.value.length; j++) {
      const dx = particles.value[i].x - particles.value[j].x
      const dy = particles.value[i].y - particles.value[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < maxDistance) {
        // Calculate opacity based on distance
        const opacity = 1 - (distance / maxDistance)
        
        ctx.beginPath()
        ctx.strokeStyle = `rgba(138, 43, 226, ${opacity * 0.2})`
        ctx.lineWidth = 0.5
        ctx.moveTo(particles.value[i].x, particles.value[i].y)
        ctx.lineTo(particles.value[j].x, particles.value[j].y)
        ctx.stroke()
      }
    }
  }
}

// Initialize canvas and animation
onMounted(() => {
  updateCanvasSize()
  
  window.addEventListener('resize', updateCanvasSize)
  
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasSize)
  
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})

// Reset particles on route change for a subtle transition effect
watch(() => route.path, () => {
  createParticles()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60 z-0"
  ></canvas>
</template>