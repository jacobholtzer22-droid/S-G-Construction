import Link from 'next/link'
import { config } from '@/lib/config'
import theme from '@/theme'
import Img from './Img'
import Phone from './Phone'

/**
 * Homepage hero. Owns the page's single <h1>, which names the trade and the
 * market, not the first service: a general contractor's homepage should not
 * read as a single-service page.
 *
 * Three layouts, and which one runs is decided by whether a hero photo exists,
 * not by editing this file:
 *
 * - config.images.hero set, theme.heroVariant 'full-bleed': the photograph
 *   under a dark scrim, headline and phone CTA left-aligned in the lower third.
 * - config.images.hero set, theme.heroVariant 'split': large photo one side,
 *   oversized type the other, for photography that cannot carry a full bleed.
 * - config.images.hero null: the type-led variant below. A near-black ground
 *   with a subtle gradient, an accent rule, and the headline at hero scale.
 *   Deliberately not a centered headline with stacked buttons on flat color.
 *
 * Adding a hero photo to config promotes the hero to theme.heroVariant with no
 * code change here.
 */
export default function Hero() {
  const h1 = `${config.tradeLabel} in ${config.primaryCity}, ${config.primaryState}`
  const hero = config.images.hero

  const cta = (dark: boolean) => (
    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
      <Link
        href="/contact"
        className="rounded-site bg-accent px-7 py-4 text-base font-semibold uppercase tracking-[0.08em] text-on-accent hover:bg-accent-dark"
      >
        Request a Free Estimate
      </Link>
      <span className={`text-base ${dark ? 'text-on-primary' : 'text-ink'}`}>
        or call <Phone className={dark ? 'text-on-primary' : 'text-primary-dark'} />
      </span>
    </div>
  )

  const eyebrow = (className: string) => (
    <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${className}`}>
      {config.displayName}
      {config.licenseNumber ? ` | ${config.licenseNumber}` : ''}
    </p>
  )

  if (hero && theme.heroVariant === 'full-bleed') {
    return (
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-primary-dark text-on-primary">
        {/* object-position favours the left of the frame. On a phone the box is
            portrait, so cover crops horizontally and a centred crop lands on
            whatever happens to be mid-frame. On desktop the crop is vertical
            only and this value has no effect. */}
        <Img name={hero} priority sizes="100vw" className="absolute inset-0 z-0 h-full w-full object-cover object-[30%_50%]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(180deg, rgb(0 0 0 / 0.15) 0%, rgb(0 0 0 / 0.45) 45%, rgb(0 0 0 / 0.78) 100%)' }}
        />
        {/* Second scrim across the text column only, so the headline keeps its
            contrast over whatever the photograph puts behind it (a white door,
            a bright sky) without flattening the whole image. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{ background: 'linear-gradient(90deg, rgb(0 0 0 / 0.55) 0%, rgb(0 0 0 / 0.30) 45%, rgb(0 0 0 / 0) 75%)' }}
        />
        {/* pb-24 on mobile keeps the phone line clear of the fixed tap-to-call
            bar, which covers the bottom 56px of the viewport. */}
        <div className="relative z-10 mx-auto w-full max-w-page px-4 pb-24 pt-28 sm:px-6 md:pb-24 md:pt-40">
          {eyebrow('opacity-85')}
          <h1 className="mt-5 max-w-4xl font-heading text-hero font-extrabold">{h1}</h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">{config.tagline}</p>
          {cta(true)}
        </div>
      </section>
    )
  }

  if (hero) {
    return (
      <section className="bg-bg">
        <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-5 md:py-28">
          <div className="md:col-span-3">
            {eyebrow('text-accent-dark')}
            <h1 className="mt-5 font-heading text-hero font-extrabold text-primary-dark">{h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{config.tagline}</p>
            {cta(false)}
          </div>
          <div className="overflow-hidden rounded-site md:col-span-2">
            <Img name={hero} priority sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] h-auto w-full object-cover" />
          </div>
        </div>
      </section>
    )
  }

  // No photograph. Type carries it.
  return (
    <section
      className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-primary-dark text-on-primary md:min-h-[78vh]"
      style={{ backgroundImage: 'linear-gradient(162deg, var(--c-primary) 0%, var(--c-primary-dark) 72%)' }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="relative z-10 mx-auto w-full max-w-page px-4 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-40">
        {eyebrow('opacity-70')}
        <h1 className="mt-6 max-w-4xl font-heading text-hero font-extrabold">{h1}</h1>
        <div aria-hidden="true" className="mt-8 h-1 w-20 bg-accent" />
        <p className="mt-7 max-w-2xl text-lg leading-relaxed opacity-85 md:text-xl">{config.tagline}</p>
        {cta(true)}
      </div>
    </section>
  )
}
