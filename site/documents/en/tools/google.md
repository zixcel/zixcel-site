---
path: "/tools/google"
title: "zix google"
summary: "Read projects, IAM key metadata, scoped resource inventory and existing billing exports, without enabling APIs or creating SQL jobs. Official version 0.7.0."
label: "zix google"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with google alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with google
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect google --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-google/releases/tag/google/v0.7.0" title="Official package"}
::

## 2. Supported operations

Read projects, IAM key metadata, scoped resource inventory and existing billing exports, without enabling APIs or creating SQL jobs. Official version 0.7.0.

```
projects.list [read] — GOOGLE INVENTORY READ: list visible google projects
projects.inspect [read] — GOOGLE INVENTORY READ: inspect selected google project
billing.accounts.list [read] — GOOGLE BILLING READ: list visible billing accounts
billing.projects.list [read] — GOOGLE BILLING READ: list selected billing account projects
billing.project.inspect [read] — GOOGLE BILLING READ: inspect selected project billing link
services.list [read] — GOOGLE INVENTORY READ: list selected project services
iam.accounts.list [read] — GOOGLE IAM READ: list selected project service accounts
assets.search [read] — GOOGLE INVENTORY READ: search selected project assets
compute.instances.list [read] — GOOGLE INVENTORY READ: list selected project instances
compute.disks.list [read] — GOOGLE INVENTORY READ: list selected project disks
compute.snapshots.list [read] — GOOGLE INVENTORY READ: list selected project snapshots
compute.commitments.list [read] — GOOGLE INVENTORY READ: list selected project commitments
sql.instances.list [read] — GOOGLE INVENTORY READ: list selected project sql instances
storage.buckets.list [read] — GOOGLE INVENTORY READ: list selected project buckets
run.services.list [read] — GOOGLE INVENTORY READ: list selected project run services
compute.addresses.list [read] — GOOGLE INVENTORY READ: list selected project addresses
overview.accessible [read] — GOOGLE INVENTORY READ: summarize accessible project visibility
overview.project [read] — GOOGLE INVENTORY READ: summarize explicit project inventory
billing.exports.discover [read] — GOOGLE BILLING READ: discover existing billing exports
billing.exports.read [read] — GOOGLE BILLING READ: read existing billing export page
iam.keys.inspect [read] — GOOGLE IAM READ: inspect one service account key
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace google --compact --format json
zix describe google --operation projects.list --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-google/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

