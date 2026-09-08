import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { config } from '@/lib/config'
import { buildTitle, renderTitle, TITLE_TEMPLATE } from '@/lib/seo'
import theme from '@/theme'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(config.domain),
  title: {
    default: renderTitle(buildTitle({ kind: 'home' })),
    template: TITLE_TEMPLATE,
  },
  applicationName: config.displayName,
  robots: { index: true, follow: true },
}

function googleFontsHref(): string {
  const families = [theme.fonts.heading, theme.fonts.body].map((f) => {
    const name = f.family.trim().replace(/\s+/g, '+')
    const weights = [...new Set(f.weights)].sort((a, b) => a - b).join(';')
    return `family=${name}:wght@${weights}`
  })
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
}

const cssVars = {
  '--c-primary': theme.palette.primary,
  '--c-primary-dark': theme.palette.primaryDark,
  '--c-primary-soft': theme.palette.primarySoft,
  '--c-accent': theme.palette.accent,
  '--c-accent-dark': theme.palette.accentDark,
  '--c-bg': theme.palette.bg,
  '--c-surface': theme.palette.surface,
  '--c-ink': theme.palette.ink,
  '--c-muted': theme.palette.muted,
  '--c-line': theme.palette.line,
  '--c-on-primary': theme.palette.onPrimary,
  '--c-on-accent': theme.palette.onAccent,
  '--font-heading': `'${theme.fonts.heading.family}'`,
  '--font-body': `'${theme.fonts.body.family}'`,
  '--radius': `${theme.radius}rem`,
} as React.CSSProperties

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={cssVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={googleFontsHref()} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
