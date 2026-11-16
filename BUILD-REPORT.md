# BUILD-REPORT: s-g-construction-inc-1791227378131 (site_update: tracking install)

Run kind: `site_update`, from `INSTRUCTIONS.md`. The repo's template is older than tracking support, so this run did two things: (1) added tracking support copied from AA-Template, and (2) wrote the client's `tracking` block. No content, design, images, other config fields or `launch` settings were touched.

## 1. `npm run verify` output

```
#   check                                                                            result  detail
--- -------------------------------------------------------------------------------  ------  ------
1   site.config.ts parses against schema                                             PASS    
2   businessSlug and identity are filled in (not the template sample)                PASS    slug "s-g-construction-inc-1791227378131"
3   businessSlug exists in the live platform database                                PASS    platform confirmed slug "s-g-construction-inc-1791227378131"
4   components/ContactForm.tsx matches sealed checksum                               PASS    1fb815af450d
5   built HTML posts to the www contact endpoint, never the bare apex                PASS    endpoint on /contact
6   honeypot hp_7d3a_ref inside hidden wrapper, no "company" field                   PASS    
7   content/ contains no bare phone, address, email, or price                        PASS    
8   no placeholder tokens in content/ or site.config.ts                              PASS    
9   every JSON-LD block parses, has @context/@type, all types on allowlist           PASS    
10  Review/aggregateRating only with real, visible reviews                           PASS    
11  every image has a 15+ char alt; no two images share an alt                       PASS    
12  exactly one <h1> per page                                                        PASS    
13  titles unique, 30 to 60 chars as rendered                                        PASS    
14  meta descriptions present, unique, 140 to 160 chars                              PASS    
15  canonical present on every page and matches config.domain                        PASS    
16  sitemap lists every built route and nothing else                                 PASS    
17  every internal link resolves to a built route                                    PASS    
22  Google tag AW-18496348664 on every page, form conversion where the form renders  PASS    

18/18 checks passed across 10 pages.
All checks passed.
```

Built HTML checked by hand as well: `/` and `/contact` each carry the gtag loader for `AW-18496348664`, the form label `AW-18496348664/amooCJ3joJMdEPjD3_NE` and the call label `AW-18496348664/E_IOCIr3oJMdEPjD3_NE`.

## 2. `site.config.ts`

The only change to config is the new `tracking` key, written exactly as given:

```ts
  tracking: {
    googleAdsId: 'AW-18496348664',
    conversions: { form: 'AW-18496348664/amooCJ3joJMdEPjD3_NE', call: 'AW-18496348664/E_IOCIr3oJMdEPjD3_NE' },
  },
```

The rest of the file is the same as on `main`.

## Files changed

- `components/GoogleTag.tsx`: new, verbatim from INSTRUCTIONS.md.
- `app/layout.tsx`: imports GoogleTag and renders it after `<Footer />` next to `<MobileCallBar />` when `config.tracking?.googleAdsId` is set. No other layout lines changed.
- `lib/config-schema.ts`: optional `tracking` zod field added before `domain`, verbatim.
- `scripts/verify.ts`: check 22 added after the last existing check (17; this repo has no checks 18 to 21).
- `site.config.ts`: the `tracking` block.

## 3 to 5. Alt-text spot checks, design direction, templated-look fixes

Not applicable. This run touched no images, content or design.

## 6. UNRESOLVED

Nothing new. This run added no facts.

## 7. INVENTED

Nothing. The ids and labels are copied exactly from INSTRUCTIONS.md.

## 8. Notes for the template / the human

- **Forbidden files were edited because INSTRUCTIONS.md asked for it.** The AGENT.md CI section forbids editing `lib/config-schema.ts` and `scripts/verify.ts` "without exception". This run's INSTRUCTIONS.md explicitly said to add the `tracking` schema field and verify check 22 to those files, so I followed it. Both changes only add things: one new optional schema field, one new check. No existing check or constant was changed or weakened. Please confirm in review that this is what you meant.
- **The check 22 snippet in INSTRUCTIONS.md was cut off** after the `for` loop over form pages. I closed the open blocks and added the `record(22, ...)` call in this file's existing style. Nothing else was added. The GoogleTag comment says check 22 also fails the build if any source file other than ContactForm uses `role="status"`. That part was not in the snippet, so it is not in this repo. I grepped and found no other `role="status"` in `components/` or `app/` right now.
- The check 22 comment, copied verbatim, says a site without tracking "stays at 21/21". This repo has 17 checks, so the gate now reads 18/18.
- This repo predates the CI-era template in other ways too: no checks 18 to 21, no `launch.indexable` flag, and `app/layout.tsx` hardcodes `robots: { index: true, follow: true }`. A future `go_live` run will find no flag to set. Worth syncing this repo with AA-Template.
- `CLIENT-TODO.md` showed up as deleted in the working tree before this run started. I did not do that and did not commit the deletion. It stays tracked on the branch as it was.
