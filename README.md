# Zixcel site content

## Regional scope

- Global service: English at `/`, Japanese at `/ja/`.
- The public surface describes contracts, connectors and adoption decisions only. It performs no provider authentication, API connections, credential acquisition or external operations.

## English

- Audience: global. English is served at `/`; Japanese is served at `/ja/`.
- Publication boundary: contracts, connectors, and adoption guidance only; no provider authentication, API connection, credential collection, or external action.

## Local verification

```bash
pnpm install --offline --frozen-lockfile
pnpm validate:content
pnpm typecheck
pnpm test
pnpm build
```

Run `pnpm dev` only as a foreground loopback preview and stop it with Ctrl+C.

## Package integration

The package is an independently consumable unit. Callers reference its documented
interface through a versioned dependency and own application-specific composition
and integration.
