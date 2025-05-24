import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

// Import pages
import Home from './pages/Home.vue'
import Games from './pages/Games.vue'
import GameDetail from './pages/GameDetail.vue'
import About from './pages/About.vue'
import News from './pages/News.vue'
import NotFound from './pages/NotFound.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/games', component: Games },
    { path: '/games/:id', component: GameDetail },
    { path: '/about', component: About },
    { path: '/news', component: News },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Create pinia store
const pinia = createPinia()

// Create app
const app = createApp(App)

// Use plugins
app.use(router)
app.use(pinia)

// Mount app
app.mount('#app')