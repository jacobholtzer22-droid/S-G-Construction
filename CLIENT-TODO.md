# S&G Construction: what the site still needs

Everything here is a fact or an asset the build did not have. Nothing in this
list was guessed. Where a fact was missing, the config field is null and the
block it feeds does not render, which is why the site looks finished rather than
half filled in.

Build date: 2026-10-05. Branch: `initial-build`.

---

## 1. Blockers (the site cannot be built or launched until these are done)

### Business slug

`site.config.ts` -> `businessSlug` is the literal string
`__PASTE_EXACT_SLUG_FROM_NEON_BUSINESS_ROW__`.

Paste the exact slug from the platform Business row. It is deliberately not a
valid slug right now, so `npm run build` fails with
`site.config.ts failed validation: businessSlug: must be kebab-case`. That is
the intended behaviour: a wrong slug makes `/api/contact` answer 200 while every
lead is dropped, and nobody finds out until the client asks why the phone stopped
ringing. A build that refuses to run is the cheaper failure.

After pasting it, run `npm run verify` and confirm check 2 and check 3 both pass.

### Domain

`site.config.ts` -> `domain` is `https://domain-not-set.invalid`. `.invalid` is
the reserved TLD for placeholders, so it can never resolve.

Canonicals, `sitemap.xml`, `robots.txt`, `llms.txt` and every schema URL are all
built from this one value, so they are currently consistent and all obviously
unset. Replace it with the real origin including `https://` and, if www is the
primary host, the `www.`. No trailing slash, no path.

---

## 2. Photos

There are none. Every demo photo that shipped with the template was deleted from
`public/` so it cannot reach a client site, and `public/images/manifest.json` is
`{}`.

The photo slots are wired and config-driven. Adding photos needs no code change.

### How to turn photos on

1. Drop the original files into `public/images/originals/`.
2. Run `npm run images`. That writes the WebP renditions into
   `public/images/processed/` and adds an entry per file to
   `public/images/manifest.json`, keyed by the original filename.
3. Open `public/images/manifest.json` and write the `alt` for each entry: ten to
   twenty words naming what is actually in the photo. The build throws on a
   missing alt, on purpose.
4. Name the files in `site.config.ts`:

| What it turns on | Config key | Value |
|---|---|---|
| Full-bleed photo hero on the homepage | `images.hero` | one filename |
| Photo on the About page | `images.about` | one filename |
| Full-dark gallery band on the homepage | `images.gallery` | array of filenames, first one renders large |
| Photo in each service page sidebar | `services[n].image` | one filename |

The hero swaps itself from the type-led layout to the photographic one the moment
`images.hero` is set. `theme.heroVariant` is already `full-bleed`; set it to
`split` instead if the photo cannot carry a full bleed.

### Shot list

- Kitchen: before and after, same angle, both shots.
- Bathroom: before and after, same angle, both shots.
- ADU: before and after. The before should show the lot or the garage as it
  started.
- One wide shot of a finished ADU exterior for the homepage hero. Landscape,
  shot with room above and to the left, because the headline sits over it.
- Ramiro on a job site, working rather than posed.
- The truck.

Phone photos are fine if they are sharp and shot in daylight. What matters is
that they are S&G's own work: no stock, no AI images, no borrowed photos.

---

## 3. Facts still needed

| Fact | Where it would go | What renders today |
|---|---|---|
| Days of the week for the 8am to 5pm hours | `hours` | `hoursNote` renders the text "8am to 5pm" with no days. `openingHoursSpecification` is omitted from schema entirely, because schema needs days and guessing them would publish hours the business never gave |
| General liability insurance: carried, yes or no | `insured` | nothing. The word "insured" appears nowhere on the site |
| Whether the business is bonded, and whether it may be stated | no field yet | nothing |
| Ramiro's last name, and whether to publish his name at all | About page copy | the About page names him by first name only, as supplied |
| Which Inland Empire cities to name | `serviceAreas` | "Inland Empire" is named as a region. No Inland Empire city is named anywhere |
| Whether any pricing may be published | `services[n].priceFrom` / `priceNote` | no figure anywhere. Cost questions are answered with what drives the price |
| Logo and brand colours | `theme.ts`, header | the wordmark is "S&G Construction" set in type. The palette was chosen for the trade, not from a brand |
| Favicon | `app/` | none. Browsers show their default tab icon. A favicon needs either a logo or a decision to set the initials in type |
| Google Business Profile URL | `profiles.gbp` | no profile links, no social row in the footer |
| Facebook / Instagram / Yelp | `profiles.*` | same |
| Reviews, with the source URL for each | `reviews` | no reviews section, and no Review or aggregateRating schema. Both switch on together when real reviews with URLs are added |
| An email address, if one should be published | `email` | no email appears anywhere on the site |

---

## 4. Things to check on the platform side

- The lead email is configured platform-side, not in this repo. Confirm it is
  pointed at the right inbox before the first ad runs.
- `GET https://www.alignandacquire.com/api/verify-slug` currently answers 404 for
  every slug, so verify check 3 fails even once the correct slug is pasted in.
  Either the endpoint is not deployed yet or it is at a different path. Worth
  settling, because that check is the only automated proof the slug is real.
- No tracking IDs are installed. The Google Ads account does not exist yet, and
  no tag was invented. The privacy policy already says that if tags are added
  later the policy will be updated to describe them.

---

## 5. Copy the human should rewrite

The homepage body copy is generated. It is accurate and it says nothing that was
not in the brief, but it is the weakest writing on the site and it should be
replaced with Ramiro's own words once there is a conversation to draw from. The
About page is already close to verbatim and does not need this.
