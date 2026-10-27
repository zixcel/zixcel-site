---
path: "/use-cases/github"
title: "Read GitHub metadata"
summary: "Register an extension and inspect repository metadata without exposing credentials."
label: "Read GitHub metadata"
kind: "page"
category: ""
status: "published"
---

## Inspect the extension and inputs

repository.read requires owner and repo. user.read takes the expected login and checks that the response matches.

```
zix capabilities --compact --format json
zix capabilities --namespace github --compact --format json
zix describe github --operation repository.read --compact --format json
```

::document-link{href="/docs/extensions" title="Register GitHub"}
::

## Run from local custody

Use a credential scoped to the selected resources and bind execution to the registration hashes. A hidden repository returning 404 is not proof of absence; check target visibility and organization approval.

```
zix extensions inspect github --format json > github.registration.json
zix credential run --collection default --reference local/github/token/github/default --host api.github.com --environment ZIX_GITHUB_ACCESS_TOKEN --manifest-sha256 "$(jq -r '.entry.manifest_sha256' github.registration.json)" --executable-sha256 "$(jq -r '.entry.executable_sha256' github.registration.json)" -- github repositories get --owner zixcel --repo cli
```

::document-link{href="/docs/credentials" title="Enroll a credential first"}
::

::document-link{href="/docs/troubleshooting" title="Resolve a stopped read"}
::

