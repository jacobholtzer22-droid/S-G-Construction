import { config } from '@/lib/config'
import Img from './Img'
import Reveal from './Reveal'

/**
 * A full-width photograph. With `heading` it carries text over a dark scrim;
 * without one it is a plain band of work and gets no overlay at all, because
 * an overlay with nothing on it only dulls the photo.
 */
export default function PhotoBand({
  image,
  heading,
  children,
  height = 'tall',
}: {
  image: string | null
  heading?: string
  children?: React.ReactNode
  height?: 'tall' | 'short'
}) {
  if (!image) return null
  const focus = config.imageFocus[image] ?? null
  const box = height === 'tall' ? 'h-[52vh] min-h-[320px] md:h-[60vh]' : 'h-[34vh] min-h-[220px] md:h-[40vh]'
  return (
    <section className={`relative isolate overflow-hidden bg-primary-dark ${box}`}>
      <Img name={image} focus={focus} sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
      {heading && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgb(0 0 0 / 0.72) 0%, rgb(0 0 0 / 0.45) 50%, rgb(0 0 0 / 0.15) 100%)' }}
          />
          <div className="relative z-10 flex h-full items-end">
            <Reveal className="mx-auto w-full max-w-page px-4 pb-10 sm:px-6 md:pb-14">
              <h2 className="font-heading text-3xl font-bold text-on-primary md:text-4xl">{heading}</h2>
              {children && <div className="mt-3 max-w-xl text-base text-on-primary opacity-90">{children}</div>}
            </Reveal>
          </div>
        </>
      )}
    </section>
  )
}
