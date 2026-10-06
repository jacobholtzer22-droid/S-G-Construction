import fs from 'node:fs'
import path from 'node:path'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { ReactElement } from 'react'
import { mdxComponents } from '@/components/mdx-components'
import { config } from './config'
import type { Service, ServiceArea } from './config-schema'

export const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface Frontmatter {
  /** Meta description override, 140 to 160 characters. */
  description?: string
  /** Manifest filename for this page's lead image (also used for og:image). */
  image?: string
}

export interface LoadedContent {
  content: ReactElement
  frontmatter: Frontmatter
}

export function contentExists(relPath: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, relPath))
}

export function readFrontmatter(relPath: string): Frontmatter {
  const file = path.join(CONTENT_DIR, relPath)
  if (!fs.existsSync(file)) return {}
  const raw = fs.readFileSync(file, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match?.[1]) return {}
  const fm: Frontmatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    const key = m[1] as keyof Frontmatter
    const value = (m[2] ?? '').trim().replace(/^["']|["']$/g, '')
    if (key === 'description' || key === 'image') fm[key] = value
  }
  return fm
}

/**
 * Compile one MDX file from content/ with the fixed component library and the
 * config in scope, so prose can write {config.displayName} and <Phone /> but
 * never a bare fact.
 */
export async function loadContent(
  relPath: string,
  scope: { service?: Service; area?: ServiceArea } = {},
): Promise<LoadedContent> {
  const file = path.join(CONTENT_DIR, relPath)
  if (!fs.existsSync(file)) {
    throw new Error(`Missing content file: content/${relPath}. Every route in config needs a matching MDX file.`)
  }
  const source = fs.readFileSync(file, 'utf8')
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      scope: { config, ...scope },
      /**
       * next-mdx-remote 6 blocks JavaScript expressions in MDX by default
       * (blockJS defaults to true), and it does it by REMOVING them rather than
       * erroring. Left on, every {config.*} in content/ would silently render as
       * nothing, which would quietly drop the license number from six pages.
       * California requires that number in contractor advertising, so a silent
       * blank is the worst possible failure here.
       *
       * The content in content/ is written by us, lives in this repo, and is
       * compiled at build time. No user input reaches it: the only runtime input
       * on this site is the contact form, which POSTs to the platform and is
       * never rendered back.
       *
       * blockDangerousJS stays on (it is also the default, set explicitly so the
       * security posture is visible here and survives a future default change).
       * It blocks eval, Function, process, require and other globals that could
       * lead to RCE if an expression ever did come from somewhere untrusted.
       */
      blockJS: false,
      blockDangerousJS: true,
    },
  })
  return { content, frontmatter: frontmatter ?? {} }
}
