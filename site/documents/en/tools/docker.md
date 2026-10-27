---
path: "/tools/docker"
title: "zix docker"
summary: "Docker Hub repository/tag reads, bounded public snapshots and reviewed retirement plans. Uncertain deletes require readback. Official version 0.3.0."
label: "zix docker"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with docker alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with docker
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect docker --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-container-registry/releases/tag/v0.3.0" title="Official package"}
::

## 2. Supported operations

Docker Hub repository/tag reads, bounded public snapshots and reviewed retirement plans. Uncertain deletes require readback. Official version 0.3.0.

```
docker.list [read] — DOCKER REGISTRY READ: list selected namespace repositories
docker.get [read] — DOCKER REGISTRY READ: read selected repository metadata
docker.tags [read] — DOCKER REGISTRY READ: read selected repository tags
docker.verify-absent [read] — DOCKER REGISTRY READ: observe original targets absence
docker.delete-plan [read] — DOCKER REGISTRY PLAN: plan explicit repository retirement
docker.delete-apply [operator-write] — DOCKER RETIREMENT APPLY: apply reviewed one use retirement
docker.snapshot-collect [read] — DOCKER PUBLIC READ: collect bounded public registry snapshot
docker.snapshot-show [read] — DOCKER PUBLIC READ: read local public snapshot
docker.snapshot-diff [read] — DOCKER PUBLIC READ: compare local public snapshots
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace docker --compact --format json
zix describe docker --operation docker.list --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-container-registry/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

