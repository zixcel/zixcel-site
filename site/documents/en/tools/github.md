---
path: "/tools/github"
title: "zix github"
summary: "Read the expected authenticated user and selected repository metadata. This native extension does not expose issue or pull request writes. Official version 0.2.0."
label: "zix github"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with github alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with github
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect github --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-github/releases/tag/native/github/v0.2.0" title="Official package"}
::

## 2. Supported operations

Read the expected authenticated user and selected repository metadata. This native extension does not expose issue or pull request writes. Official version 0.2.0.

```
user.read [read] — GITHUB IDENTITY READ: read expected github identity
repository.read [read] — GITHUB REPOSITORY READ: read selected repository metadata
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace github --compact --format json
zix describe github --operation user.read --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-github/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

