export default defineNuxtConfig({
  ssr: false,
  
  // Generate static files to dist directory for GitHub Pages
  nitro: {
    preset: 'static',
    output: {
      publicDir: 'dist/public'
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
    // Set base URL for GitHub Pages (update with your repo name if not using custom domain)
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
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