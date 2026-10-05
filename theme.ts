/**
 * Visual theme. This is the one file (with app/fonts.ts) where the agent has
 * real freedom: pick a direction, a palette, and a hero layout so two client
 * sites do not look like the same site with different words. No business facts
 * belong here.
 *
 * Rules the palette must satisfy (AGENT.md Phase 2c): one dark neutral, one
 * warm or cool off-white, exactly one accent used on under 5% of any page. No
 * pure #000000 or #FFFFFF. `onPrimary` sits on `primary`, `onAccent` on
 * `accent`, `ink` on `bg` and `surface`. One radius and one shadow for the
 * whole site; components read them as CSS variables and nothing else.
 */
export type HeroVariant = 'full-bleed' | 'split'

export interface Theme {
  palette: {
    /** The dark neutral. Also the full-dark section background. */
    primary: string
    primaryDark: string
    primarySoft: string
    /** The single accent. Buttons, the call bar, small marks. Under 5% of any page. */
    accent: string
    accentDark: string
    /** The off-white page ground. */
    bg: string
    surface: string
    /** Body text. Never pure black. */
    ink: string
    muted: string
    line: string
    onPrimary: string
    onAccent: string
  }
  /**
   * 'full-bleed': client photo behind a dark scrim, headline and phone CTA
   * left-aligned in the lower third. Needs a photo that can carry it.
   * 'split': large photo one side, oversized type the other. For weaker photos.
   *
   * With config.images.hero null, neither can run and Hero falls back to its
   * type-led variant on its own. This value is what the hero becomes the moment
   * a hero photo is added to config, with no code change.
   */
  heroVariant: HeroVariant
  /** The ONE corner radius for the site, in rem. 0 for hard edges. */
  radius: number
  /** The ONE shadow for the site, as a CSS box-shadow value. 'none' is valid. */
  shadow: string
}

/**
 * Direction: Showroom, built to run with no photography.
 *
 * Remodeling and ADU work is the Showroom direction in AGENT.md, where the
 * photographs normally do all the work. This client has none yet, so the weight
 * moves to type, hard edges, and a near-black ground: squared corners, no
 * shadows, heavy rules between sections, and one burnt-orange accent that reads
 * as construction without using safety orange. Nothing here is waiting for an
 * image to make sense of it.
 */
const theme: Theme = {
  palette: {
    primary: '#262522',
    primaryDark: '#151412',
    primarySoft: '#EAE5DC',
    accent: '#B2541C',
    accentDark: '#8E4215',
    bg: '#F5F2EB',
    surface: '#FCFAF5',
    ink: '#1E1D1A',
    muted: '#625D55',
    line: '#DAD3C7',
    onPrimary: '#F5F2EB',
    onAccent: '#FCFAF5',
  },
  heroVariant: 'full-bleed',
  radius: 0,
  shadow: 'none',
}

export default theme
