# S&G Construction: what the site still needs

Everything here is a fact or an asset the build did not have. Nothing in this
list was guessed. Where a fact was missing, the config field is null and the
block it feeds does not render, which is why the site looks finished rather than
half filled in.

Build date: 2026-10-05. Branch: `initial-build`.

---

## 1. Blockers (the site cannot be built or launched until these are done)

### Business slug

DONE. `site.config.ts` -> `businessSlug` is `s-g-construction-inc-1791227378131`.

`npm run verify` check 2 passes. Check 3 still fails, because
`GET https://www.alignandacquire.com/api/verify-slug` answers 404 for every
slug, so nothing has actually confirmed this slug against the platform yet.
Send one real test submission through the contact form before the first ad runs
and confirm the lead lands on the right Business row.

### Domain

`site.config.ts` -> `domain` is `https://domain-not-set.invalid`. `.invalid` is
the reserved TLD for placeholders, so it can never resolve.

Canonicals, `sitemap.xml`, `robots.txt`, `llms.txt` and every schema URL are all
built from this one value, so they are currently consistent and all obviously
unset. Replace it with the real origin including `https://` and, if www is the
primary host, the `www.`. No trailing slash, no path.

---

## 2. Photos

Nine photographs are live. Sources in `public/images/originals/`, renditions in
`public/images/processed/`, alt text in `public/images/manifest.json`.

Where they are used:

| Image | Used on |
|---|---|
| adu-exterior-finished.jpg | homepage hero, /gallery |
| adu-interior-finished.jpg | /services/adu-construction, /gallery |
| adu-interior-framing.jpg | /about, /gallery |
| bathroom-walk-in-shower.jpg | /services/bathroom-remodels, /gallery |
| adu-bathroom-finished.jpg | /gallery |
| adu-roof-sheathing.jpg | /gallery |
| adu-exterior-sheathing.jpg | /gallery |
| adu-lath-before-stucco.jpg | /gallery |
| home-exterior-new-stucco.jpg | /gallery |

### What to ask the client for

1. **The original photos behind three screenshots.** `HB ADU roof framing.png`,
   `HB ADU wall framing.png` and `bathroom #5.png` are phone screenshots of
   photos, with black letterbox bars and the home-indicator bar baked in. The
   third one is the single best bathroom in the whole set, a finished bathroom
   with a freestanding tub and a walk-in shower, and it is worth chasing. Ask
   for the originals from the camera roll.
2. **Photos of a kitchen remodel.** There is not one, so
   /services/kitchen-remodels has no photo and the homepage service list stays
   a numbered list rather than photo cards.
3. **Photos of a full home remodel.** Same situation for
   /services/full-home-remodels.
4. **Ramiro on a job site, and the truck.** Still missing. The About page uses
   an interior framing shot instead.
5. **Before and after pairs.** None of the current photos are the same room
   from the same angle, so no before and after is claimed anywhere. If the
   client has a matched pair, that is the strongest thing a remodeler can show.

### Four videos were not used

`completed HB ADU_.mov`, `bathroom #1.mov`, `bathroom #2.mov`, `bathroom#3.mov`.
The site has no video support, and adding it is a separate decision. The
bathroom videos may well contain the best still frames in the set.

### Turning more photos on

Drop files in `public/images/originals/`, run `npm run images`, write the alt
in `public/images/manifest.json` (the build fails on a missing alt, on
purpose), then name the file in `site.config.ts`:

| What it turns on | Config key |
|---|---|
| Homepage hero | `images.hero` |
| About page photo | `images.about` |
| Full-dark photo band on the homepage | `images.gallery`, currently empty on purpose, because /gallery covers it and the homepage already has a full-dark band |
| Photo on a service page | `services[n].image` |
| /gallery | `galleryGroups[n].images` |

### Raw media

The client's original drop is in `SandG Construction Website/` at the repo
root. It is gitignored: it is 162 MB, most of it video, and the pipeline input
is `public/images/originals/`. It stays on the local machine, so keep a copy
somewhere else.

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
