import { config } from '@/lib/config'

/**
 * Trust line built only from facts that exist. Renders nothing at all when
 * every credential is null, so there is never an empty slot asking to be filled.
 *
 * licenseNumber renders exactly as it is stored, because a license is a legal
 * string and prefixing it with a word of our own can misstate it. Store the
 * display form ("CSLB Lic. #1113089") in config.
 */
export default function Credentials({ className = '' }: { className?: string }) {
  const items: string[] = []
  if (config.licenseNumber) items.push(config.licenseNumber)
  if (config.establishedYear !== null) items.push(`Since ${config.establishedYear}`)
  else if (config.yearsInBusiness !== null) items.push(`${config.yearsInBusiness} years in business`)
  for (const d of config.differentiators) items.push(d)
  if (config.insured === true) items.push('Insured')
  if (items.length === 0) return null
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary-dark ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}
