# aa-site-template

Next.js 14 static site template for Align & Acquire client sites. Facts live in `site.config.ts` (validated by Zod), prose in `content/*.mdx`, schema is derived in `lib/schema.ts`, and `scripts/verify.ts` refuses to pass a build that could lose leads or ship fabricated content.

## New site

1. Use this repo as a GitHub template. Clone the new repo, `npm install`.
2. Copy `BRIEF.template.md` to `BRIEF.md` and fill it from what the client supplied. Get `businessSlug` from the platform admin; never guess it.
3. Delete the `sample-*.jpg` files from `public/images/originals/`, drop the client photos there.
4. Open Claude Code in the repo and run: `Read AGENT.md and BRIEF.md, then build the site.`
5. Review the agent's report: the verify table, `site.config.ts`, the UNRESOLVED list. Rewrite the homepage copy.
6. `npm run verify` must print `All checks passed.` before the branch is merged or deployed. Checks 2 and 3 fail on the shipped sample by design.
7. Deploy `main` to Vercel. Build command `npm run build`, output directory `out`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run images` | WebP renditions + `public/images/manifest.json` (alt text preserved on re-run; new files get `alt: null` and block the build until written) |
| `npm run build` | Static export to `out/` |
| `npm run verify` | `next build` then the 17-check gate; non-zero exit on any failure |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run seal-contact-form` | Re-baseline the ContactForm checksum. Template repo only, after a deliberate contract change. |

## Rules the tooling enforces

- Facts only in `site.config.ts`; content reaches them via `<Phone />`, `{config.*}`, `{service.*}`, `{area.*}`. Bare phone/address/email/price in `content/` fails check 7.
- Content files start at `##`. Page templates own the single `<h1>`; an `#` in MDX throws at build.
- `components/ContactForm.tsx` is sealed (check 4). Endpoint, payload, honeypot, and consent checkbox are fixed.
- Reviews render (visibly and in schema) only from `config.reviews`, which must be real reviews with source URLs.
- One page per service area, all services listed, with content specific to the area. Never a service-by-area matrix.
- A `null` config field renders nothing. There is no empty slot to fill, so there is nothing to invent.
