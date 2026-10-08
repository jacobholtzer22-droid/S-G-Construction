import Link from 'next/link'
import { config } from '@/lib/config'
import Img from './Img'
import Reveal from './Reveal'

/**
 * A photo beside text, with the side alternating per instance. Breaks the
 * centred-heading-over-paragraph rhythm without introducing a second layout
 * language: same page grid, same type, same square corners.
 */
export default function PhotoSplit({
  image,
  heading,
  href,
  linkLabel,
  flip = false,
  tone = 'bg',
}: {
  image: string | null
  heading: string
  /** Optional link out. A link label is UI, not copy. */
  href?: string
  linkLabel?: string
  /** Photo on the right instead of the left. */
  flip?: boolean
  tone?: 'bg' | 'surface'
}) {
  if (!image) return null
  const focus = config.imageFocus[image] ?? null
  return (
    <section className={`border-t border-line ${tone === 'surface' ? 'bg-surface' : 'bg-bg'}`}>
      <div className="mx-auto grid max-w-page items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-14 md:py-24">
        <Reveal className={flip ? 'md:order-2' : ''}>
          <div className="aspect-[4/3] overflow-hidden">
            <Img
              name={image}
              focus={focus}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-heading text-3xl font-bold text-primary-dark md:text-4xl">{heading}</h2>
          {href && linkLabel && (
            <Link
              href={href}
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.08em] text-accent-dark underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
            >
              {linkLabel}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
