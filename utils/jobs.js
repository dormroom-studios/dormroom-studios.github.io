import { marked } from 'marked'
import { parseFrontmatter } from './markdownParser.js'

// Import all markdown files from the jobs directory
const jobFiles = import.meta.glob('../content/jobs/*.md', { query: '?raw', import: 'default', eager: true })

// Parse markdown files and extract metadata
export function getAllJobs() {
  const jobs = []
  
  for (const path in jobFiles) {
    const content = jobFiles[path]
    const { data, content: markdownContent } = parseFrontmatter(content)
    
    jobs.push({
      ...data,
      content: markdownContent,
      html: parseMarkdown(markdownContent),
      slug: data.slug || path.split('/').pop().replace('.md', '')
    })
  }
  
  // Sort by publishedAt date (newest first)
  return jobs.sort((a, b) => {
    const dateA = new Date(a.publishedAt)
    const dateB = new Date(b.publishedAt)
    return dateB - dateA
  })
}

// Get a single job by slug
export function getJobBySlug(slug) {
  const jobs = getAllJobs()
  return jobs.find(job => job.slug === slug)
}

// Get featured jobs
export function getFeaturedJobs() {
  const jobs = getAllJobs()
  return jobs.filter(job => job.featured)
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