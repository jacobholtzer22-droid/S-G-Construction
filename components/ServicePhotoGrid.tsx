import { config } from '@/lib/config'
import Img from './Img'
import Reveal from './Reveal'

/**
 * Photographs of one kind of work, partway down its service page. Only a photo
 * that unmistakably shows that service is ever passed in; the config field is
 * empty for a service we have no photo of.
 */
export default function ServicePhotoGrid({ images, heading }: { images: readonly string[]; heading: string }) {
  if (images.length === 0) return null
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold text-primary-dark md:text-3xl">{heading}</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((name, i) => (
            <Reveal key={name} delay={i * 70}>
              <div className="aspect-[4/3] overflow-hidden">
                <Img
                  name={name}
                  focus={config.imageFocus[name] ?? null}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
