---
path: "/tools/cloudflare"
title: "zix cloudflare"
summary: "Account and DNS reads with explicitly scoped configuration observations. DNS audit does not enumerate Workers or Pages. Official version 0.3.1."
label: "zix cloudflare"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with cloudflare alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with cloudflare
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect cloudflare --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-cloudflare/releases/tag/native/cloudflare/v0.3.1" title="Official package"}
::

## 2. Supported operations

Account and DNS reads with explicitly scoped configuration observations. DNS audit does not enumerate Workers or Pages. Official version 0.3.1.

```
account.read [read] — CLOUDFLARE ACCOUNT READ: read selected cloudflare account
accounts.list [read] — CLOUDFLARE ACCOUNT READ: list credential visible cloudflare accounts
lifecycle.observe [read] — CLOUDFLARE LIFECYCLE READ: read cloudflare lifecycle
dns.audit [read] — CLOUDFLARE DNS READ: audit cloudflare dns zone
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace cloudflare --compact --format json
zix describe cloudflare --operation account.read --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-cloudflare/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

