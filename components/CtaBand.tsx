import Link from 'next/link'
import { config } from '@/lib/config'
import Phone from './Phone'

export default function CtaBand({ heading }: { heading?: string }) {
  return (
    <section className="bg-primary text-on-primary">
      <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold">{heading ?? `Ready to get started in ${config.primaryCity}?`}</h2>
          <p className="mt-2 text-base opacity-90">
            Call <Phone className="text-on-primary" /> or send a message and we will get back to you with a quote.
          </p>
        </div>
        <Link
          href="/contact"
          className="rounded-[var(--radius)] bg-accent px-6 py-3 text-base font-semibold text-on-accent hover:bg-accent-dark"
        >
          Request a Free Quote
        </Link>
      </div>
    </section>
  )
}
