import type { Metadata } from 'next'
import CtaBand from '@/components/CtaBand'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import PhotoSplit from '@/components/PhotoSplit'
import ServiceGrid from '@/components/ServiceGrid'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'services.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'services', path: '/services', description: fm.description, image: fm.image }).metadata
}

export default async function ServicesIndexPage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader title={`Services in ${config.primaryCity}, ${config.primaryState}`} crumbs={CRUMBS} />
      <article className="mx-auto max-w-page px-4 pt-6 sm:px-6 [&>*]:max-w-prose">{content}</article>
      <ServiceGrid heading="Everything We Offer" />
      <PhotoSplit
        image={config.images.servicesIndex}
        heading="Recent work"
        href="/gallery"
        linkLabel="See all our work"
        tone="surface"
      />
      <CtaBand />
    </>
  )
}
