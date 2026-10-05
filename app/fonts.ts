import { Archivo, Work_Sans } from 'next/font/google'

/**
 * The two typefaces for this site, loaded through next/font so they are
 * self-hosted and subset at build time. This is the ONE file to edit to change
 * fonts: swap the imports and the two exports, keep the `variable` names, and
 * list only weights the family actually ships.
 *
 * Archivo at 800 for display: a grotesque with enough width and weight to carry
 * a headline with no photograph behind it, which is the whole design problem on
 * this site. Work Sans for body, at a lighter weight than the headings so the
 * contrast between the two is doing work. Two weights per face, no more.
 */
export const headingFont = Archivo({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-heading',
  display: 'swap',
})

export const bodyFont = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})
