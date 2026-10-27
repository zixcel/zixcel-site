---
path: "/docs/extensions"
title: "Register provider extensions"
summary: "Install only the provider packages you need and register their verified executable and manifest."
label: "Register provider extensions"
kind: "page"
category: ""
status: "published"
---

## Install the GitHub extension

Run after foundation setup. The helper downloads, verifies and registers the package using the existing integrity checks and state-preserving extensions add / replace interface.

```
zix-setup install --with github
zix extensions inspect github --format json
```

::document-link{href="/docs/setup" title="Prepare the foundation"}
::

::document-link{href="/tools/github" title="GitHub features"}
::

## Registration, updates and enablement

Use extensions add for first registration and extensions replace for an update. Replacement checks both new and currently registered hashes and preserves enablement. Registration does not grant provider access or change service settings.

```
zix extensions inspect github --format json
zix extensions --help
```

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/operation-guidance.md" title="Extension and guidance contract"}
::

## Choose packages for your task

Features, release versions and OS requirements vary by provider. Use capabilities and describe on the installed extension as the actual operation interface.

::document-link{href="/tools" title="Providers and supported operations"}
::

::document-link{href="/docs/credentials" title="Configure credentials"}
::

