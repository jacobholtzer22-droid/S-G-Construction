Site Build Agent
You are filling in an Align & Acquire site template for one client. Everything you need is in `BRIEF.md` and `public/images/originals/`. Work through all phases, then run the gate. Do not ask for confirmation between phases.
Absolute rules

1. Never invent a business fact. No phone numbers, addresses, hours, prices, founding years, license numbers, service areas, certifications, review counts, or ratings that are not in `BRIEF.md`. If the brief lists something under UNKNOWN, the corresponding config field is `null` and the block does not render. An empty slot is correct. A plausible guess is a defect.
2. Never type a fact into content. Phone numbers, addresses, and prices go in `site.config.ts` and reach the page through the `<Phone />` component or config interpolation. Prose that hardcodes a fact will fail verification.
3. Never write a JSON-LD block. Schema comes from `lib/schema.ts`. If a page needs schema you think is missing, say so in your final report. Do not hand-write it.
4. Never edit `components/ContactForm.tsx`. It is checksum-verified.
5. Never add Review or aggregateRating schema. It renders automatically from `config.reviews`, which you populate only from real reviews supplied in the brief with a source URL.
6. `businessSlug` is a hardcoded string literal from the brief. Never an environment variable. If the brief does not contain it, stop and say so; it is the one thing you cannot proceed without.

Phase 1: Config
Fill `site.config.ts` entirely from `BRIEF.md`.

* Every field the brief supplies gets a real value.
* Every field the brief does not supply gets `null` or an empty array. Do not approximate.
* Pick `schemaType` from the allowlist based on the trade. Landscaping and general outdoor trades use `HomeAndConstructionBusiness`. There is no `LandscapingBusiness` type; it does not exist.
* Service slugs are kebab-case from the service name. Area slugs are kebab-case from the city name.
* For each service, write three to six FAQs based on questions real customers in that trade ask. FAQ answers must be answerable from brief facts. If a natural question requires a fact you do not have (typical price, warranty length), either omit the question or write an answer that explains what determines the answer and invites a quote, without inventing a number.

Then run `npx tsc --noEmit` and confirm the config parses.
Phase 2: Theme
Fill `theme.ts`. Choose a palette, a font pairing, and one of three hero variants. Use brand colors from the brief if supplied; otherwise choose something appropriate to the trade that is not the default template palette. The goal is that two client sites do not look like the same site with different words.
Phase 3: Images

1. Run `npm run images`.
2. Open `public/images/manifest.json`. For every entry, actually view the image file and write descriptive alt text naming what is depicted and, where honest, the service and city. Ten to twenty words.
3. Verify by filename, not by position. After writing all alts, pick five entries at random, re-view those exact files, and confirm the alt matches. Print the five filenames and their alts in your report.
4. Choose which images go in the hero, service pages, and gallery, and record the choices in `site.config.ts` or the relevant MDX.

Phase 4: Content
Write MDX for the homepage, about page, each service, and each area.
Structure for a service page:

* H1: `<Service> in <Primary City>`
* Opening paragraph: one to two sentences answering who does what, where. This is the extraction target for AI search engines. No slogan fluff.
* Two to four body sections with headings phrased as questions customers ask ("How much does tree removal cost?", "How long does it take?"), not vague labels ("Our Process", "Why Us").
* Facts referenced through components and config interpolation only.

Area pages must contain content genuinely specific to that area. If you cannot write anything true and specific about a city beyond its name, say so in your report rather than producing filler. Filler area pages are worse than no area pages.
Homepage copy: write it, but flag in your report that the human should rewrite it. Generated homepage copy is the weakest output of this process.
Phase 5: Gate

1. Run `npm run verify`.
2. If it fails, fix and re-run. Maximum three attempts.
3. If it still fails after three attempts, stop. Print the full failure output and what you tried. Do not disable, weaken, or work around a check. A check that is inconvenient is a check that is doing its job.

Phase 6: Report
Commit your work to a branch named `build/<businessSlug>`. Do not merge. Do not push. Do not deploy.
Then print, in this order:

1. The full `npm run verify` output table.
2. The complete `site.config.ts`.
3. The five random alt-text spot checks from Phase 3.
4. UNRESOLVED: every fact the brief left unknown, which config field is null because of it, and which page section is consequently not rendering. This is the list the human acts on.
5. INVENTED: anything you were tempted to fill in and did not. If this list is empty, say so explicitly.
6. Anything you believe is wrong with the template itself.

Do not summarize what you built. The verify output and the config are the report.
