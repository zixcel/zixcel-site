---
path: "/tools/wordpress"
title: "zix wordpress"
summary: "Use origin-bound OS custody for post/page/media reads and explicitly reviewed WordPress changes. Official version 0.4.1."
label: "zix wordpress"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with wordpress alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with wordpress
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect wordpress --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-wordpress/releases/tag/v0.4.1" title="Official package"}
::

## 2. Supported operations

Use origin-bound OS custody for post/page/media reads and explicitly reviewed WordPress changes. Official version 0.4.1.

```
wordpress.login [read] — WORDPRESS IDENTITY READ: login selected wordpress profile
wordpress.posts-list [read] — WORDPRESS CONTENT READ: posts list selected wordpress profile
wordpress.pages-list [read] — WORDPRESS CONTENT READ: pages list selected wordpress profile
wordpress.posts-get [read] — WORDPRESS CONTENT READ: posts get selected wordpress profile
wordpress.pages-get [read] — WORDPRESS CONTENT READ: pages get selected wordpress profile
wordpress.media-list [read] — WORDPRESS CONTENT READ: media list selected wordpress profile
wordpress.media-get [read] — WORDPRESS CONTENT READ: media get selected wordpress profile
wordpress.auth-status [read] — WORDPRESS IDENTITY READ: auth status selected wordpress profile
wordpress.draft-plan [read] — WORDPRESS CONTENT PLAN: draft plan selected wordpress profile
wordpress.content-plan [read] — WORDPRESS CONTENT PLAN: content plan selected wordpress profile
wordpress.media-plan [read] — WORDPRESS CONTENT PLAN: media plan selected wordpress profile
wordpress.revoke-plan [read] — WORDPRESS IDENTITY PLAN: revoke plan selected wordpress profile
wordpress.content-reconcile [read] — WORDPRESS CONTENT READ: content reconcile selected wordpress profile
wordpress.draft-apply [operator-write] — WORDPRESS CONTENT APPLY: draft apply selected wordpress profile
wordpress.content-apply [operator-write] — WORDPRESS CONTENT APPLY: content apply selected wordpress profile
wordpress.media-apply [operator-write] — WORDPRESS CONTENT APPLY: media apply selected wordpress profile
wordpress.revoke-apply [operator-write] — WORDPRESS IDENTITY APPLY: revoke apply selected wordpress profile
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution. Use the packaged zix-wordpress credential-import PROFILE ORIGIN COLLECTION for origin-bound custody, rather than generic zix credential set.

```
zix capabilities --namespace wordpress --compact --format json
zix describe wordpress --operation wordpress.login --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-wordpress/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

