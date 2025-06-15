export default defineNuxtConfig({
  ssr: false,
  
  // Generate static files to dist directory for GitHub Pages
  nitro: {
    output: {
      dir: 'dist',
      publicDir: 'dist'
    },
    prerender: {
      routes: ['/']
    }
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  // App configuration
  app: {
    head: {
      title: 'DormRoom Studios',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  // Build configuration
  build: {
    transpile: ['gsap']
  },

  // Development server
  devtools: { enabled: true }
})