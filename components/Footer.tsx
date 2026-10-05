import Link from 'next/link'
import { config, formatTime } from '@/lib/config'
import Phone from './Phone'

const PROFILE_LABELS: Record<string, string> = {
  gbp: 'Google',
  facebook: 'Facebook',
  instagram: 'Instagram',
  yelp: 'Yelp',
}

/**
 * The license number sits in the bottom bar, so it appears on every page of the
 * site. California requires a licensed contractor to carry the license number
 * in its advertising, and a website is advertising. Do not move it to one page.
 *
 * Service areas are text, not links: this site has no per-area pages. Social
 * links render only for profiles that exist, so an empty row never ships.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  const profiles = Object.entries(config.profiles).filter((e): e is [string, string] => typeof e[1] === 'string')
  const a = config.address

  return (
    <footer className="mt-auto border-t-2 border-accent bg-primary-dark text-on-primary">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 md:py-16">
        <div>
          <p className="font-heading text-xl font-bold tracking-tight">{config.displayName}</p>
          <p className="mt-3 text-sm leading-relaxed opacity-75">{config.tagline}</p>
          <p className="mt-5 text-base">
            <Phone className="text-on-primary" />
          </p>
          {config.email && (
            <p className="mt-1 text-sm">
              <a href={`mailto:${config.email}`} className="underline-offset-2 hover:underline">
                {config.email}
              </a>
            </p>
          )}
          {a && (
            <address className="mt-3 text-sm not-italic opacity-75">
              {a.street && (
                <>
                  {a.street}
                  <br />
                </>
              )}
              {a.city}, {a.state} {a.zip}
            </address>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {config.services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="underline-offset-4 hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Service Areas</p>
          <ul className="mt-4 space-y-2.5 text-sm opacity-90">
            {config.serviceAreas.map((area) => (
              <li key={area.slug}>
                {area.name}, {config.primaryState}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {(config.hours || config.hoursNote) && (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Hours</p>
              {config.hours ? (
                <ul className="mt-4 space-y-1.5 text-sm opacity-90">
                  {config.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span>
                        {formatTime(h.open)} to {formatTime(h.close)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm opacity-90">{config.hoursNote}</p>
              )}
            </>
          )}
          {profiles.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4 text-sm">
              {profiles.map(([key, url]) => (
                <li key={key}>
                  <a href={url} rel="noopener" target="_blank" className="underline-offset-4 hover:underline">
                    {PROFILE_LABELS[key] ?? key}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5 text-xs opacity-70 sm:px-6">
          <p>
            &copy; {year} {config.legalName}
            {config.licenseNumber ? ` | ${config.licenseNumber}` : ''}
          </p>
          <p className="flex gap-5">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <a href="https://www.alignandacquire.com" rel="noopener" target="_blank" className="hover:underline">
              Site by Align and Acquire
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
