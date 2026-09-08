import Link from 'next/link'
import { config } from '@/lib/config'

interface Props {
  heading?: string
  /** Hide one service (used on service pages to show "other services"). */
  exclude?: string
}

export default function ServiceGrid({ heading = 'Our Services', exclude }: Props) {
  const services = config.services.filter((s) => s.slug !== exclude)
  if (services.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-14 sm:px-6">
      <h2 className="font-heading text-3xl font-bold text-primary-dark">{heading}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col rounded-[var(--radius)] border border-line bg-surface p-6 transition hover:border-primary"
          >
            <h3 className="font-heading text-xl font-semibold text-primary-dark group-hover:text-primary">{s.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
            {s.priceFrom !== null && (
              <p className="mt-4 text-sm font-semibold text-ink">
                From ${s.priceFrom}
                {s.priceNote ? <span className="font-normal text-muted"> {s.priceNote}</span> : null}
              </p>
            )}
            <span className="mt-4 text-sm font-semibold text-primary">Learn more</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
