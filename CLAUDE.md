# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run generate` - Generate static files for deployment
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages using gh-pages

## Architecture Overview

This is a Nuxt 3 gaming website for DormRoom Studios with SSR disabled for static generation. The application showcases game information with a modern, responsive design.

### Core Technologies
- **Nuxt 3** with Vue 3 Composition API and `<script setup>` syntax
- **JavaScript** (no TypeScript)
- **File-based routing** with Nuxt's automatic routing
- **Pinia** for state management with @pinia/nuxt module
- **TailwindCSS** for styling with custom color scheme via @nuxtjs/tailwindcss
- **GSAP** for animations
- **Static generation** for GitHub Pages deployment

### Key Architectural Patterns

**State Management**: Centralized game data in `stores/games.js` using Pinia store with getters for featured games, latest games, and game lookup by ID.

**Routing Structure**: 
- `/` - Home page with featured content (pages/index.vue)
- `/games` - Games listing (pages/games/index.vue)
- `/games/:id` - Individual game details (pages/games/[id].vue)
- `/about` - About page (pages/about.vue)
- `/news` - News page (pages/news.vue)
- Error handling with error.vue

**Component Organization**:
- `pages/` - File-based routing with Nuxt
- `components/` - Auto-imported reusable UI components
- `layouts/` - Layout components with default.vue
- Core components: `TheHeader.vue`, `TheFooter.vue`, `ParticleBackground.vue`

**Styling System**: 
- Custom TailwindCSS configuration with gaming-themed color palette
- Primary: Purple (#8a2be2), Secondary: Teal (#14b8a6), Accent: Orange (#f97316)
- Custom animations: float, pulse-slow, glow effects
- Responsive design with mobile-first approach

**Data Structure**: Game objects contain comprehensive metadata including screenshots, platforms, release dates, and feature lists. All game data is currently stored as static data in the Pinia store.

### Special Features
- Animated particle background using HTML5 Canvas
- Loading screen with spinner animation  
- Page transitions with fade effects
- Smooth scrolling behavior on route changes
- GitHub Pages deployment workflow