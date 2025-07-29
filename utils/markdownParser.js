// Simple frontmatter parser for browser environment
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content }
  }
  
  const [, frontmatter, markdownContent] = match
  const data = {}
  
  // Parse YAML-like frontmatter
  const lines = frontmatter.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    // Handle key-value pairs
    if (trimmed.includes(':')) {
      const [key, ...valueParts] = trimmed.split(':')
      const keyName = key.trim()
      let value = valueParts.join(':').trim()
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '')
      
      // Handle boolean values
      if (value === 'true') {
        data[keyName] = true
      } else if (value === 'false') {
        data[keyName] = false
      } else if (!isNaN(value) && value !== '') {
        data[keyName] = Number(value)
      } else {
        data[keyName] = value
      }
    }
  }
  
  return { data, content: markdownContent.trim() }
}