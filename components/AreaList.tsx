import { config } from '@/lib/config'

/**
 * The service area, as text. Not links: there are no per-area pages on this
 * site (see lib/routes.ts). Renders nothing when config.serviceAreas is empty.
 */
export default function AreaList({ heading = 'Areas We Serve' }: { heading?: string }) {
  const areas = config.serviceAreas
  if (areas.length === 0) return null
  return (
    <section id="areas" className="mx-auto max-w-page px-4 py-16 md:py-24 sm:px-6">
      <h2 className="font-heading text-3xl font-bold text-primary-dark">{heading}</h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {areas.map((a) => (
          <li key={a.slug}>
            <span className="inline-block rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">
              {a.name}, {config.primaryState}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
