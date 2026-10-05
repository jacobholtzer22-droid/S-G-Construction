import { config } from './config'

/**
 * Every public route on the site, derived from the same config arrays that
 * drive generateStaticParams. sitemap.ts and llms.txt read this, so the
 * sitemap cannot list a route that does not exist or miss one that does.
 *
 * There are no per-area routes on this site. The areas in config.serviceAreas
 * reach schema (areaServed) and the visible service-area list, but they do not
 * each get a page: the brief contains nothing true and specific to say about
 * Long Beach or Lakewood beyond the name, and a page per city that only repeats
 * the name is a doorway page. If genuinely area-specific copy ever exists,
 * restore app/areas/[slug]/page.tsx with content/areas/<slug>.mdx and add
 * areaRoutes() back to allRoutes(). Note that an area page titled with the
 * primary market would collide with a service page title, which the gate
 * rejects as a duplicate.
 */
export const STATIC_ROUTES = ['/', '/services', '/gallery', '/about', '/contact', '/privacy-policy'] as const

export function serviceRoutes(): string[] {
  return config.services.map((s) => `/services/${s.slug}`)
}

export function allRoutes(): string[] {
  return [...STATIC_ROUTES, ...serviceRoutes()]
}
