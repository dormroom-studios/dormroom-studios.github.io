import { marked } from 'marked'
import { parseFrontmatter } from './markdownParser.js'

// Import all markdown files from the games directory
const gameFiles = import.meta.glob('../content/games/*.md', { query: '?raw', import: 'default', eager: true })

// Parse markdown files and extract metadata
export function getAllGames() {
  const games = []
  
  for (const path in gameFiles) {
    const content = gameFiles[path]
    const { data, content: markdownContent } = parseFrontmatter(content)
    
    // Generate ID from slug or filename
    const slug = data.slug || path.split('/').pop().replace('.md', '')
    const id = data.id || slug
    
    games.push({
      ...data,
      id,
      slug,
      content: markdownContent,
      html: parseMarkdown(markdownContent),
      // Parse arrays from frontmatter
      screenshots: data.screenshots ? data.screenshots.split(',').map(s => s.trim()) : [],
      platforms: data.platforms ? data.platforms.split(',').map(p => p.trim()) : [],
      features: data.features ? data.features.split(',').map(f => f.trim()) : []
    })
  }
  
  // Sort by releaseDate (newest first)
  return games.sort((a, b) => {
    const dateA = new Date(a.releaseDate)
    const dateB = new Date(b.releaseDate)
    return dateB - dateA
  })
}

// Get a single game by ID
export function getGameById(id) {
  const games = getAllGames()
  return games.find(game => game.id === id || game.id === parseInt(id))
}

// Get a single game by slug
export function getGameBySlug(slug) {
  const games = getAllGames()
  return games.find(game => game.slug === slug)
}

// Get featured games
export function getFeaturedGames() {
  const games = getAllGames()
  return games.filter(game => game.featured)
}

// Get latest games
export function getLatestGames(limit = 3) {
  const games = getAllGames()
  return games.slice(0, limit)
}

// Get games for our-games section on homepage
export function getOurGames() {
  const games = getAllGames()
  return games.filter(game => game['our-games'] === true || game['our-games'] === 'true')
}

// Convert markdown to HTML
export function parseMarkdown(content) {
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  })
  
  return marked(content)
}