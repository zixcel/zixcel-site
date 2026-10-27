---
path: "/tools/azure"
title: "zix azure"
summary: "Read a selected Azure subscription or subscriptions visible to the supplied credential. Official version 0.2.0."
label: "zix azure"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with azure alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with azure
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect azure --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-azure/releases/tag/native/azure/v0.2.0" title="Official package"}
::

## 2. Supported operations

Read a selected Azure subscription or subscriptions visible to the supplied credential. Official version 0.2.0.

```
account.read [read] — AZURE SUBSCRIPTION READ: read selected azure subscription
accounts.list [read] — AZURE SUBSCRIPTION READ: list visible azure subscriptions
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace azure --compact --format json
zix describe azure --operation account.read --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-azure/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

