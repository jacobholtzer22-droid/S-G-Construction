import { config, formatTime } from '@/lib/config'
import Phone from './Phone'

/**
 * Phone always. Email, locality, hours, and the license only when known.
 *
 * The address block prints the street line only when config.address.street is
 * set. A service-area business that works out of a home publishes its city and
 * ZIP, not its door.
 */
export default function ContactDetails() {
  const a = config.address
  return (
    <div className="border border-line bg-surface p-6 text-sm">
      <h2 className="font-heading text-xl font-bold text-primary-dark">Reach {config.displayName}</h2>
      <dl className="mt-5 space-y-4">
        <div>
          <dt className="font-semibold uppercase tracking-[0.08em] text-muted">Phone</dt>
          <dd className="mt-1 text-base">
            <Phone className="text-primary-dark" />
          </dd>
        </div>
        {config.email && (
          <div>
            <dt className="font-semibold uppercase tracking-[0.08em] text-muted">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${config.email}`} className="text-primary underline-offset-2 hover:underline">
                {config.email}
              </a>
            </dd>
          </div>
        )}
        {a && (
          <div>
            <dt className="font-semibold uppercase tracking-[0.08em] text-muted">Based in</dt>
            <dd className="mt-1">
              <address className="not-italic text-ink">
                {a.street && (
                  <>
                    {a.street}
                    <br />
                  </>
                )}
                {a.city}, {a.state} {a.zip}
              </address>
            </dd>
          </div>
        )}
        {(config.hours || config.hoursNote) && (
          <div>
            <dt className="font-semibold uppercase tracking-[0.08em] text-muted">Hours</dt>
            <dd className="mt-1 text-ink">
              {config.hours ? (
                <ul>
                  {config.hours.map((h) => (
                    <li key={h.day}>
                      {h.day}: {formatTime(h.open)} to {formatTime(h.close)}
                    </li>
                  ))}
                </ul>
              ) : (
                config.hoursNote
              )}
            </dd>
          </div>
        )}
        {config.licenseNumber && (
          <div>
            <dt className="font-semibold uppercase tracking-[0.08em] text-muted">License</dt>
            <dd className="mt-1 text-ink">{config.licenseNumber}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}
