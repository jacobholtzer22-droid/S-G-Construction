import Link from 'next/link'
import { config } from '@/lib/config'
import Img from './Img'
import Reveal from './Reveal'

/**
 * A strip of real photographs linking to /gallery. Deliberately asymmetric:
 * the first photo takes two columns and two rows on desktop so the row does
 * not read as a tidy grid of equal tiles.
 *
 * Used on the homepage, and on a service page that has no photo of its own,
 * where the neutral heading is the point: it says this is S&G's work, not that
 * it is a kitchen or a whole-house remodel.
 */
export default function RecentWork({
  images,
  heading = 'Recent work',
  tone = 'surface',
}: {
  images: readonly string[]
  heading?: string
  tone?: 'surface' | 'bg'
}) {
  if (images.length === 0) return null
  return (
    <section className={`border-t border-line ${tone === 'surface' ? 'bg-surface' : 'bg-bg'}`}>
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-bold text-primary-dark md:text-4xl">{heading}</h2>
            <Link
              href="/gallery"
              className="text-sm font-semibold uppercase tracking-[0.08em] text-accent-dark underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
            >
              See all our work
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid auto-rows-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((name, i) => {
            // Four photos fill a three-column grid exactly when the first takes
            // 2x2 and the last takes the full width: 4 + 1 + 1 + 3 = 9 cells.
            const lead = i === 0
            const wide = i === 3 && images.length === 4
            const span = lead ? 'sm:col-span-2 sm:row-span-2' : wide ? 'sm:col-span-2 lg:col-span-3' : ''
            return (
            <Reveal key={name} delay={i * 70} className={span}>
              <Link
                href="/gallery"
                className="group block h-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div
                  className={
                    lead
                      ? 'aspect-[4/3] h-full sm:aspect-auto'
                      : wide
                        ? 'aspect-[16/7]'
                        : // stretch to the row height so the narrow column has
                          // no gaps beside the 2x2 lead tile
                          'aspect-[4/3] h-full sm:aspect-auto'
                  }
                >
                  <Img
                    name={name}
                    focus={config.imageFocus[name] ?? null}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </Link>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
