---
path: "/docs/credentials"
title: "Keep credentials local"
summary: "Use Crowsi OS custody and bind operations to credential references rather than secret values."
label: "Keep credentials local"
kind: "page"
category: ""
status: "published"
---

## Enroll a GitHub token

Use the GNU custody build and an existing persistent Secret Service collection. Obtain a token scoped to the intended resources and paste it only into the hidden terminal prompt. Storage does not grant GitHub permissions.

```
zix credential set --collection default --reference local/github/token/github/default --host api.github.com
```

## Run a bound read

With the GitHub extension registered, read basic metadata for zixcel/cli. jq supplies the current registration hashes. The secret is forwarded only to the declared environment variable, never written to command arguments or the JSON file.

```
zix extensions inspect github --format json > github.registration.json
zix credential run --collection default --reference local/github/token/github/default --host api.github.com --environment ZIX_GITHUB_ACCESS_TOKEN --manifest-sha256 "$(jq -r '.entry.manifest_sha256' github.registration.json)" --executable-sha256 "$(jq -r '.entry.executable_sha256' github.registration.json)" -- github repositories get --owner zixcel --repo cli
```

## Match the service and credential audience

Graph and Exchange, Docker Hub and registry endpoints, and distinct WordPress origins have different credential conditions. Follow the owner guide for provider-specific custody such as origin-bound WordPress profiles.

::document-link{href="/tools" title="Provider-specific guides"}
::

::document-link{href="/docs/troubleshooting" title="Authentication and permission troubleshooting"}
::

