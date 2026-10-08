import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CtaBand from '@/components/CtaBand'
import EstimateCard from '@/components/EstimateCard'
import FaqAccordion from '@/components/FaqAccordion'
import Img from '@/components/Img'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import PhotoBand from '@/components/PhotoBand'
import RecentWork from '@/components/RecentWork'
import ServicePhotoGrid from '@/components/ServicePhotoGrid'
import ServiceGrid from '@/components/ServiceGrid'
import { config, getService } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { breadcrumbList, faqPage, service as serviceSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

// No `dynamicParams = false` here: with output: 'export' the static build only
// ever serves these params anyway, and the flag makes `next dev` refuse the route.
export function generateStaticParams() {
  return config.services.map((s) => ({ slug: s.slug }))
}

function crumbsFor(name: string, slug: string) {
  return [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name, path: `/services/${slug}` },
  ]
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug)
  if (!service) return {}
  const fm = readFrontmatter(`services/${service.slug}.mdx`)
  return buildMetadata({
    kind: 'service',
    service,
    path: `/services/${service.slug}`,
    description: fm.description,
    image: fm.image ?? service.image,
  }).metadata
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  if (!service) notFound()
  const { content } = await loadContent(`services/${service.slug}.mdx`, { service })
  const crumbs = crumbsFor(service.name, service.slug)

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqPage(service.faqs)} />
      <JsonLd data={breadcrumbList(crumbs)} />

      <PageHeader
        title={`${service.name} in ${config.primaryCity}, ${config.primaryState}`}
        intro={service.shortDescription}
        crumbs={crumbs}
      />

      {/* Lead photo, below the H1 so the headline, phone and estimate button
          are never pushed off a phone screen. Only set for a service we have a
          photo of. */}
      <PhotoBand image={service.banner} height="short" />

      <div className="mx-auto grid max-w-page gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-3">
        <article className="lg:col-span-2">{content}</article>
        <aside className="space-y-6">
          {service.image && (
            <div className="overflow-hidden rounded-site">
              <Img name={service.image} sizes="(min-width: 1024px) 33vw, 100vw" className="h-auto w-full" />
            </div>
          )}
          {service.priceFrom !== null && (
            <div className="border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">Pricing</p>
              <p className="mt-2 font-heading text-3xl font-bold text-primary-dark">From ${service.priceFrom}</p>
              {service.priceNote && <p className="mt-1 text-sm text-muted">{service.priceNote}</p>}
            </div>
          )}
          {/* With no price, the pricing note rides inside the estimate card
              instead of getting a box of its own: two boxes saying the same
              thing is how a sidebar reads as filler. */}
          <EstimateCard note={service.priceFrom === null ? service.priceNote : null} />
        </aside>
      </div>

      <ServicePhotoGrid images={service.photos} heading={`${service.name} photos`} />

      {/* A service with no photo of its own gets real S&G work under a neutral
          heading. Nothing here claims to be this service. */}
      {service.recentWorkBand && (
        <RecentWork images={[service.recentWorkBand]} heading="Recent work from S&G Construction" />
      )}

      <FaqAccordion faqs={service.faqs} heading={`${service.name} Questions`} />
      <ServiceGrid heading="Other Services" exclude={service.slug} />
      {/* Not toLowerCase(): it renders "ADU Construction" as "adu construction". */}
      <CtaBand heading={`Need ${service.name} in ${config.primaryCity}?`} />
    </>
  )
}
