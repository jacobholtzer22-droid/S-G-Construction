/**
 * Visual theme. This is the one file where the agent has real freedom: pick a
 * palette, a font pairing, and a hero layout so two client sites do not look
 * like the same site with different words. No business facts belong here.
 *
 * Fonts are Google Fonts family names with the weights to load; app/layout.tsx
 * builds the stylesheet link from them, so list only weights the family
 * actually ships or Google rejects the whole request. Colors are hex. Keep
 * contrast in mind: `onPrimary` sits on `primary`, `onAccent` on `accent`,
 * `ink` on `bg` and `surface`.
 */
export type HeroVariant = 'split' | 'full-bleed' | 'centered'

export interface FontChoice {
  family: string
  weights: number[]
}

export interface Theme {
  palette: {
    primary: string
    primaryDark: string
    primarySoft: string
    accent: string
    accentDark: string
    bg: string
    surface: string
    ink: string
    muted: string
    line: string
    onPrimary: string
    onAccent: string
  }
  fonts: {
    heading: FontChoice
    body: FontChoice
  }
  heroVariant: HeroVariant
  /** Corner radius for cards and buttons, in rem. */
  radius: number
}

const theme: Theme = {
  palette: {
    primary: '#1F5A3C',
    primaryDark: '#153F2A',
    primarySoft: '#E7F0EA',
    accent: '#D9822B',
    accentDark: '#B7691C',
    bg: '#F8F7F3',
    surface: '#FFFFFF',
    ink: '#1B1F1C',
    muted: '#5B6660',
    line: '#DDE1DC',
    onPrimary: '#FFFFFF',
    onAccent: '#1B1F1C',
  },
  fonts: {
    heading: { family: 'Outfit', weights: [500, 700] },
    body: { family: 'Source Sans 3', weights: [400, 600] },
  },
  heroVariant: 'split',
  radius: 0.75,
}

export default theme
