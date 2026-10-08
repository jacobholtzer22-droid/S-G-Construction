import type { SiteConfigInput } from './lib/config-schema'

/**
 * Every business fact for this site lives here and nowhere else.
 *
 * Unknown facts are null. A null field renders nothing. A guessed value is a defect.
 *
 * S&G Construction Inc., Westminster, CA. Built from the client brief of
 * 2026-10-05. Everything the brief did not state is null or an empty array, and
 * each one of those is listed in the client follow-up file at the repo root.
 */
const siteConfig = {
  /**
   * The platform Business row this site's leads are filed against. A hardcoded
   * literal, never an environment variable: a wrong slug returns HTTP 200 while
   * every lead is dropped, which is invisible until the client asks why nobody
   * is calling. verify.ts check 3 confirms it against the platform.
   */
  businessSlug: 's-g-construction-inc-1791227378131',

  legalName: 'S&G Construction Inc.',
  displayName: 'S&G Construction',
  tagline: 'Residential general contractor serving Orange County, Long Beach, Lakewood, and the Inland Empire.',

  schemaType: 'GeneralContractor',

  phone: '+16575274538',
  // The client takes leads by phone and through the form. No email address is published.
  email: null,

  address: {
    // The street address is not public. The business runs out of Westminster and
    // visits the customer's property; there is no storefront to send anyone to.
    street: null,
    city: 'Westminster',
    state: 'CA',
    zip: '92683',
    lat: null,
    lng: null,
  },

  tradeLabel: 'Residential General Contractor',
  tradeLabelShort: 'General Contractor',
  servicesLabel: 'ADUs and Remodels',

  // The market this site is written for. The Westminster home base is in `address`.
  primaryCity: 'Orange County',
  primaryState: 'CA',

  serviceAreas: [
    { slug: 'orange-county', name: 'Orange County', county: null, kind: 'AdministrativeArea' },
    { slug: 'long-beach', name: 'Long Beach', county: null, kind: 'City' },
    { slug: 'lakewood', name: 'Lakewood', county: null, kind: 'City' },
    { slug: 'inland-empire', name: 'Inland Empire', county: null, kind: 'Place' },
  ],

  services: [
    {
      slug: 'adu-construction',
      name: 'ADU Construction',
      shortDescription:
        'Accessory dwelling units built on residential property, from a detached new build to a garage or interior conversion.',
      priceFrom: null,
      priceNote: 'quoted after a free estimate',
      image: 'adu-interior-finished.jpg',
      banner: 'adu-exterior-finished.jpg',
      photos: ['adu-roof-sheathing.jpg', 'adu-exterior-sheathing.jpg', 'adu-lath-before-stucco.jpg'],
      recentWorkBand: null,
      faqs: [
        {
          q: 'What is an ADU?',
          a: 'An accessory dwelling unit is a second, self-contained home on a lot that already has a house on it. It has its own kitchen, bathroom, and entrance. In California an ADU can be a detached new build, an addition to the existing house, or a conversion of space you already have, such as a garage.',
        },
        {
          q: 'What does an ADU cost to build?',
          a: 'It depends on the size of the unit, whether it is a new build or a conversion, how far it sits from existing water, sewer, and electrical service, what the site access is like, and the finishes you choose. Those are the things worth walking through in person, so call for a free estimate and you will get a number for your actual property rather than an average.',
        },
        {
          q: 'Can a garage be converted into an ADU?',
          a: 'A garage conversion is one of the common ways an ADU gets built, because the slab, walls, and roof already exist. What it takes depends on the condition of the structure and how the plumbing and electrical need to be run. We look at the garage before saying what is realistic.',
        },
        {
          q: 'Do you build ADUs outside Orange County?',
          a: 'Yes. S&G Construction works anywhere in Orange County and also takes projects in Long Beach, Lakewood, and the Inland Empire.',
        },
      ],
    },
    {
      slug: 'full-home-remodels',
      name: 'Full Home Remodels',
      shortDescription:
        'Whole-house residential remodels, where most or all of the rooms in the home are reworked as one project rather than one at a time.',
      priceFrom: null,
      priceNote: 'quoted after a free estimate',
      image: null,
      banner: null,
      photos: [],
      // No photo shows a whole-house remodel, so this is a neutral band of real
      // S&G work. It does not claim to be a full home remodel.
      recentWorkBand: 'adu-lath-before-stucco.jpg',
      faqs: [
        {
          q: 'What counts as a full home remodel?',
          a: 'A full remodel is one project that covers most or all of the house rather than a single room. It usually means kitchen and bathrooms together with flooring, paint, and finishes throughout, and often changes to how the rooms are laid out.',
        },
        {
          q: 'How much does a full home remodel cost?',
          a: 'The size of the house is the starting point, and then it comes down to how much of the layout changes, how much of the kitchen and bathrooms are included, the level of finish you want, and what the existing structure and systems turn out to need. S&G Construction gives free estimates, so the honest answer is to have it looked at.',
        },
        {
          q: 'Is it better to remodel room by room or all at once?',
          a: 'Both approaches are normal. Doing it as one project means the trades are coordinated once and the finishes match across the house. Doing it room by room spreads the work out and lets you keep living in more of the home. Which one fits depends on your house and how you want to live through it.',
        },
        {
          q: 'Do you only work on houses?',
          a: 'Yes. S&G Construction is a residential general contractor and takes residential projects only. We do not do commercial work.',
        },
      ],
    },
    {
      slug: 'kitchen-remodels',
      name: 'Kitchen Remodels',
      shortDescription:
        'Kitchen remodels for homes, from replacing cabinets, counters, and finishes to opening the room up and moving the layout.',
      priceFrom: null,
      priceNote: 'quoted after a free estimate',
      image: null,
      banner: null,
      photos: [],
      // Same: no kitchen photo exists yet, so this is neutral real work.
      recentWorkBand: 'adu-interior-framing.jpg',
      faqs: [
        {
          q: 'What does a kitchen remodel usually involve?',
          a: 'At a minimum it means new cabinets, counters, and finishes. Beyond that it can mean new appliances, lighting, and flooring, and if the layout changes, moving plumbing and electrical and sometimes taking out a wall. The further the layout moves from the original, the more trades are involved.',
        },
        {
          q: 'How much does a kitchen remodel cost?',
          a: 'The main drivers are the size of the kitchen, whether the layout stays where it is or moves, the cabinets and counters you pick, and what is found once the old kitchen comes out. A free estimate at the house is the only way to put a real number on it.',
        },
        {
          q: 'Do I have to move out during a kitchen remodel?',
          a: 'Most people stay in the house and set up a temporary place to cook, since the work is contained to one room. Whether that is comfortable depends on the layout of your home and how much of the surrounding space the work touches.',
        },
        {
          q: 'Can you move a wall to open up the kitchen?',
          a: 'Opening a kitchen up is a common part of the job, but whether a specific wall can come out depends on what it is carrying. That gets confirmed on site before anything is promised.',
        },
      ],
    },
    {
      slug: 'bathroom-remodels',
      name: 'Bathroom Remodels',
      shortDescription:
        'Bathroom remodels for homes, including tile, vanities, tubs and showers, and reworking a layout that no longer fits the room.',
      priceFrom: null,
      priceNote: 'quoted after a free estimate',
      image: 'adu-bathroom-finished.jpg',
      banner: 'bathroom-walk-in-shower.jpg',
      photos: [],
      recentWorkBand: null,
      faqs: [
        {
          q: 'What does a bathroom remodel include?',
          a: 'Usually tile, a vanity, fixtures, and either a tub or a shower, plus waterproofing behind what you can see. If the layout changes, or a tub becomes a walk-in shower, the plumbing moves too, which is the part that drives the schedule.',
        },
        {
          q: 'How much does a bathroom remodel cost?',
          a: 'Size matters less here than what you are changing. Keeping the fixtures where they are costs less than moving them, tile and vanity choices move the number a lot, and older homes sometimes need plumbing or framing work once the walls are open. S&G Construction gives free estimates, so ask and you will get a figure for your bathroom.',
        },
        {
          q: 'Can a tub be replaced with a walk-in shower?',
          a: 'That is a common request and usually workable. It means new waterproofing, a different drain position in many cases, and tile work across the whole wet area, so it is more than a swap of the fixture.',
        },
        {
          q: 'Do you do small bathroom repairs?',
          a: 'No. S&G Construction focuses on full-scope residential projects and does not take on handyman work, small repairs, or basic installations. A bathroom remodel is a project we take; replacing a single fixture is not.',
        },
      ],
    },
  ],

  /**
   * null because the DAYS are not confirmed. The brief gave 8am to 5pm and
   * nothing about which days, so there is no honest openingHoursSpecification
   * to emit. The known part is in `hoursNote` and renders as text.
   */
  hours: null,
  hoursNote: '8am to 5pm',

  establishedYear: 2023,
  yearsInBusiness: null,
  licenseNumber: 'CSLB Lic. #1113089',
  /** Not stated in the brief. Nothing on this site may say insured or bonded. */
  insured: null,

  differentiators: ['Free estimates', 'Family operated'],

  /** No reviews exist yet. No Review or aggregateRating schema can render. */
  reviews: [],

  /** No Google Business Profile and no social pages exist yet. */
  profiles: {
    gbp: null,
    facebook: null,
    instagram: null,
    yelp: null,
  },

  faqs: [
    {
      q: 'What areas do you serve?',
      a: 'S&G Construction works anywhere in Orange County, and also takes projects in Long Beach, Lakewood, and the Inland Empire. In Orange County that includes Westminster, Huntington Beach, Garden Grove, Fountain Valley, Santa Ana, Anaheim, Irvine, Costa Mesa, Orange, Fullerton, and Newport Beach.',
    },
    {
      q: 'Is S&G Construction licensed?',
      a: 'Yes. S&G Construction Inc. holds CSLB Lic. #1113089, a Class B General Building Contractor license, and has been licensed and operating since 2023. California contractors are required to carry that number in their advertising, which is why it appears in the footer of every page here.',
    },
    {
      q: 'Do you offer free estimates?',
      a: 'Yes, estimates are free. Call and we will set up a time to look at the project and put a number to it.',
    },
    {
      q: 'What kinds of projects do you take on?',
      a: 'Four: ADU construction, full home remodels, kitchen remodels, and bathroom remodels. All of it is residential work.',
    },
    {
      q: 'Do you do handyman work or small repairs?',
      a: 'No. S&G Construction focuses on full-scope residential projects. We do not take on handyman work, small repairs, or basic installations.',
    },
    {
      q: 'Do you do commercial work?',
      a: 'No. S&G Construction is a residential general contractor and takes residential projects only.',
    },
  ],

  /**
   * The /gallery page. Finished work leads each group; progress shots follow.
   * Every filename is a key in public/images/manifest.json.
   */
  galleryGroups: [
    {
      heading: 'ADU Construction',
      images: [
        'adu-exterior-finished.jpg',
        'adu-interior-finished.jpg',
        'adu-roof-sheathing.jpg',
        'adu-exterior-sheathing.jpg',
        'adu-lath-before-stucco.jpg',
        'adu-interior-framing.jpg',
      ],
    },
    {
      heading: 'Bathrooms',
      images: ['bathroom-walk-in-shower.jpg', 'adu-bathroom-finished.jpg'],
    },
    {
      heading: 'Exterior Work',
      images: ['home-exterior-new-stucco.jpg'],
    },
  ],

  /**
   * Filenames are keys in public/images/manifest.json, which is written by
   * `npm run images` from public/images/originals/ and holds the alt text.
   *
   * `gallery` drives the full-dark band on the homepage and is deliberately
   * empty: the work lives on /gallery instead, and the homepage already has a
   * full-dark band in the service-area section. Naming files here turns the
   * homepage band on with no code change.
   */
  /**
   * object-position per photo, picked by looking at each file: it keeps the
   * subject in frame when a wide crop or a tall crop throws away the edges.
   */
  imageFocus: {
    'adu-exterior-finished.jpg': '30% 50%',
    'adu-interior-finished.jpg': '55% 50%',
    'adu-roof-sheathing.jpg': '50% 45%',
    'adu-exterior-sheathing.jpg': '40% 55%',
    'adu-lath-before-stucco.jpg': '45% 50%',
    'adu-interior-framing.jpg': '50% 45%',
    'bathroom-walk-in-shower.jpg': '50% 40%',
    'adu-bathroom-finished.jpg': '50% 45%',
    'home-exterior-new-stucco.jpg': '50% 32%',
  },

  images: {
    hero: 'adu-exterior-finished.jpg',
    about: 'adu-interior-framing.jpg',
    gallery: [],
    homeSplit: 'adu-interior-finished.jpg',
    // Order matters: tile 1 is the big 2x2, tiles 2 and 3 are the narrow right
    // column (so the two portrait photos go there), tile 4 spans the full width
    // and wants a landscape.
    homeStrip: [
      'adu-roof-sheathing.jpg',
      'bathroom-walk-in-shower.jpg',
      'adu-bathroom-finished.jpg',
      'adu-exterior-sheathing.jpg',
    ],
    servicesIndex: 'home-exterior-new-stucco.jpg',
    contact: 'home-exterior-new-stucco.jpg',
  },

  /**
   * The canonical origin. www is the primary host and the apex 308s to it, so
   * this carries the www. Origin only: no path, no trailing slash.
   *
   * Canonicals, the sitemap, robots.txt, llms.txt, the OG url and every schema
   * url are all built from this one value, so there is exactly one place a host
   * is written down and they cannot drift apart.
   */
  domain: 'https://www.sandgconstruction.com',
} satisfies SiteConfigInput

export default siteConfig
