import type { Metadata } from 'next'
import CtaBand from '@/components/CtaBand'
import Img from '@/components/Img'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { config } from '@/lib/config'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

/**
 * Photographs of finished and in-progress work, grouped by what they show.
 *
 * Everything comes from config.galleryGroups, so adding a photo is a config
 * edit: drop the file in public/images/originals/, run `npm run images`, write
 * the alt in the manifest, and name it in a group. There is no code to change.
 *
 * No lightbox and no captions on purpose. The alt text carries the description,
 * and a photograph of a finished room does not need a caption inventing facts
 * about the job that produced it.
 */

const TITLE = 'ADU and Remodel Work'
const DESCRIPTION =
  'Photographs of ADU construction, bathroom remodels and exterior work by S&G Construction, a licensed residential general contractor in Orange County, CA.'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Our Work', path: '/gallery' },
]

export function generateMetadata(): Metadata {
  return buildMetadata({ kind: 'other', title: TITLE, path: '/gallery', description: DESCRIPTION }).metadata
}

export default function GalleryPage() {
  const groups = config.galleryGroups.filter((g) => g.images.length > 0)

  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader
        title={`${TITLE} in ${config.primaryCity}, ${config.primaryState}`}
        intro="Photographs of our own projects, finished and in progress."
        crumbs={CRUMBS}
      />

      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24">
        {groups.map((group, i) => (
          <section key={group.heading} className={i === 0 ? '' : 'mt-20'}>
            <Reveal>
              <h2 className="font-heading text-3xl font-bold text-primary-dark md:text-4xl">{group.heading}</h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.images.map((name, j) => (
                <Reveal key={name} delay={j * 60}>
                  <figure className="aspect-[4/3] overflow-hidden bg-surface">
                    <Img
                      name={name}
                      focus={config.imageFocus[name] ?? null}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  )
}
