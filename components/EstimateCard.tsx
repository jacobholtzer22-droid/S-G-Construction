import Link from 'next/link'
import { config } from '@/lib/config'
import Phone from './Phone'

/**
 * The service page sidebar. It carries the call to action, and the pricing note
 * when there is a note but no price, so the column never holds two boxes saying
 * the same thing.
 *
 * Every word comes from config: the heading is the client's own differentiator
 * wording and the license renders exactly as stored.
 */
export default function EstimateCard({ note }: { note?: string | null }) {
  const offer = config.differentiators[0] ?? null
  return (
    <div className="border-t-2 border-primary-dark bg-primary-soft p-6">
      {offer && <p className="font-heading text-2xl font-bold text-primary-dark">{offer}</p>}
      <p className="mt-3 text-base leading-relaxed text-ink">
        Call <Phone className="text-primary-dark" /> to talk through the project and set up an estimate, or send the form and
        we will get back to you.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-block rounded-site bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-on-accent hover:bg-accent-dark"
      >
        Request an Estimate
      </Link>
      {(note || config.licenseNumber) && (
        <div className="mt-6 space-y-2 border-t border-line pt-4 text-xs text-muted">
          {note && <p>Pricing is {note}.</p>}
          {config.licenseNumber && <p className="font-semibold uppercase tracking-[0.08em]">{config.licenseNumber}</p>}
        </div>
      )}
    </div>
  )
}
