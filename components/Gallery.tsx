import { config } from '@/lib/config'
import Img from './Img'

/** Renders config.images.gallery. Nothing renders when the list is empty. */
export default function Gallery({ heading = 'Recent Work' }: { heading?: string }) {
  const images = config.images.gallery
  if (images.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-14 sm:px-6">
      <h2 className="font-heading text-3xl font-bold text-primary-dark">{heading}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((name) => (
          <figure key={name} className="overflow-hidden rounded-[var(--radius)] bg-surface">
            <Img name={name} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] h-auto w-full object-cover" />
          </figure>
        ))}
      </div>
    </section>
  )
}
