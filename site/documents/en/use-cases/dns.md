---
path: "/use-cases/dns"
title: "Inspect domains and DNS"
summary: "Establish registrar and DNS authority before preparing a change."
label: "Inspect domains and DNS"
kind: "page"
category: ""
status: "published"
---

## Establish registration and DNS authority

A registrar and the authoritative DNS service can differ. Start with Domain delegation inspection. Replace the reserved example.net with your selected domain.

```
zix describe domain --operation dns.delegation --compact --format json
zix domain dns delegation --domain example.net
```

## Continue to the selected DNS provider

Inspect the exact Cloudflare account and zone only after establishing Cloudflare authority. A registrar credential failure alone is not evidence to switch DNS providers.

```
zix describe cloudflare --operation dns.audit --compact --format json
zix describe domain --operation dns.records.plan --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-domain/blob/main/docs/record-cli.md" title="DNS profiles and change files"}
::

## Review a plan before changing DNS

Review target records, current values, retained records and changes, then execute only that plan. Verify provider state and public DNS propagation separately.

::document-link{href="/docs/credentials" title="Credential custody"}
::

::document-link{href="/docs/troubleshooting" title="Handle uncertain outcomes"}
::

