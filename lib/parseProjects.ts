import fs from 'fs'
import path from 'path'

export type Project = {
  title: string
  tag: string
  media: string
  mediaType: 'video' | 'image'
  slug: string
  description: string
}

export function parseProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'content', 'projects.md')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const blocks = raw
    .split('---project---')
    .map((block: string) => block.trim())
    .filter((block: string) => block.length > 0)

  return blocks.map((block: string) => {
    const lines = block.split('\n')
    const meta: Record<string, string> = {}
    let contentStart = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line === '') {
        contentStart = i + 1
        break
      }
      const [key, ...rest] = line.split(':')
      meta[key.trim()] = rest.join(':').trim()
    }

    const description = lines.slice(contentStart).join('\n').trim()

    return {
      title: meta.title,
      tag: meta.tag,
      media: meta.media,
      mediaType: meta.mediaType as 'video' | 'image',
      slug: meta.slug,
      description,
    }
  })
}