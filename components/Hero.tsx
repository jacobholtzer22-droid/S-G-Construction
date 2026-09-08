import Link from 'next/link'
import { config } from '@/lib/config'
import theme from '@/theme'
import Img from './Img'
import Phone from './Phone'

/**
 * Homepage hero. Owns the page's single <h1>. Layout comes from
 * theme.heroVariant; every word comes from config.
 */
export default function Hero() {
  const h1 = `${config.primaryService.name} in ${config.primaryCity}, ${config.primaryState}`
  const hero = config.images.hero

  const ctas = (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Link
        href="/contact"
        className="rounded-[var(--radius)] bg-accent px-6 py-3 text-base font-semibold text-on-accent hover:bg-accent-dark"
      >
        Request a Free Quote
      </Link>
      <span className="text-base">
        or call <Phone />
      </span>
    </div>
  )

  if (theme.heroVariant === 'full-bleed' && hero) {
    return (
      <section className="relative isolate overflow-hidden bg-primary-dark text-on-primary">
        <Img name={hero} priority sizes="100vw" className="absolute inset-0 z-0 h-full w-full object-cover opacity-40" />
        <div className="relative z-10 mx-auto max-w-page px-4 py-28 sm:px-6 md:py-40">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">{config.displayName}</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-6xl">{h1}</h1>
          <p className="mt-5 max-w-2xl text-lg opacity-90">{config.tagline}</p>
          {ctas}
        </div>
      </section>
    )
  }

  if (theme.heroVariant === 'centered') {
    return (
      <section className="bg-primary-soft">
        <div className="mx-auto max-w-page px-4 py-20 text-center sm:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{config.displayName}</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-primary-dark md:text-6xl">{h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{config.tagline}</p>
          <div className="flex justify-center">{ctas}</div>
          {hero && (
            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[var(--radius)]">
              <Img name={hero} priority sizes="(min-width: 1024px) 896px, 100vw" className="h-auto w-full" />
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto grid max-w-page items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{config.displayName}</p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-primary-dark md:text-5xl">{h1}</h1>
          <p className="mt-5 text-lg text-muted">{config.tagline}</p>
          {ctas}
        </div>
        {hero && (
          <div className="overflow-hidden rounded-[var(--radius)] shadow-sm">
            <Img name={hero} priority className="h-auto w-full" />
          </div>
        )}
      </div>
    </section>
  )
}
