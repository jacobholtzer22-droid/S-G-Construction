import { config } from '@/lib/config'
import Reveal from './Reveal'

/**
 * The service area, as text on the page's full-dark band. Not links: there are
 * no per-area pages on this site (see lib/routes.ts). Renders nothing when
 * config.serviceAreas is empty.
 */
export default function AreaList({ heading = 'Where We Work' }: { heading?: string }) {
  const areas = config.serviceAreas
  if (areas.length === 0) return null
  return (
    <section id="areas" className="bg-primary-dark text-on-primary">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">{heading}</h2>
        <ol className="mt-10 border-t border-white/15">
          {areas.map((area, i) => (
            <Reveal as="li" key={area.slug} delay={i * 60} className="border-b border-white/15 py-5">
              <span className="font-heading text-2xl font-semibold md:text-3xl">
                {area.name}, {config.primaryState}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
