# zixcel-site

Organization-managed public sites built with Nuxt. All application/layout/page/CSS/SEO implementation is supplied by `@nuxtjp/localized-site`; `sites/` contains site content, static assets, legal notices and Cloudflare configuration. Site-specific Nuxt applications or layouts are rejected.

```sh
pnpm install --frozen-lockfile
pnpm site list
pnpm validate:content
pnpm test
pnpm site typecheck SITE_ID
pnpm site build SITE_ID
```

Build output is isolated at `.output/SITE_ID/public`; generated Nuxt types are at `.nuxt/SITE_ID`. Cloudflare Workers builds each site separately from this repository root using the explicit site key and its Wrangler configuration. Shared package/lock changes require all sites to be checked. Site-only content changes require that site to be checked.

The organization runner uses `@nuxtjp/localized-site@0.1.4` from the official npm registry. A frozen install uses the committed lockfile and needs no neighboring repositories or local archives. Cloudflare connections, domains and deployment settings are managed separately. Existing domains and service IDs are retained.

Software LICENSE and each site's LICENSE-ASSETS/NOTICE remain applicable; repository consolidation does not relicense content.
