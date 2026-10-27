---
path: "/tools/microsoft"
title: "zix microsoft"
summary: "Microsoft Graph and Exchange Online administration, with operation-specific credential audiences, scopes, consent, RBAC and target requirements. Official version 0.5.1."
label: "zix microsoft"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with microsoft alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with microsoft
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect microsoft --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-microsoft/releases/tag/native/microsoft/v0.5.1" title="Official package"}
::

## 2. Supported operations

Microsoft Graph and Exchange Online administration, with operation-specific credential audiences, scopes, consent, RBAC and target requirements. Official version 0.5.1.

```
users.read [read] — GRAPH USER READ: read selected graph user
admin.organization [read] — GRAPH DIRECTORY READ: read tenant identity
admin.licenses [read] — GRAPH DIRECTORY READ: read subscribed licenses
admin.domains [read] — GRAPH DOMAIN READ: read verified domains
admin.domain-verification [read] — GRAPH DOMAIN READ: read domain verification records
admin.users [read] — GRAPH DIRECTORY READ: read directory users
admin.user [read] — GRAPH DIRECTORY READ: read selected directory user
admin.domain-dns [read] — GRAPH DOMAIN READ: read service dns requirements
exchange.snapshot [read] — EXCHANGE CONFIGURATION: read exchange configuration
exchange.plan [read] — EXCHANGE CONFIGURATION: plan exchange change
exchange.apply [operator-write] — EXCHANGE CONFIGURATION: apply reviewed exchange plan
admin.doctor [read] — LOCAL SETUP CHECK: inspect local admin prerequisites
management.domains.plan [read] — GRAPH DOMAINS PLAN: plan domains change
management.domains.apply [operator-write] — GRAPH DOMAINS APPLY: apply domains change
management.users.plan [read] — GRAPH USERS PLAN: plan users change
management.users.apply [operator-write] — GRAPH USERS APPLY: apply users change
management.licenses.plan [read] — GRAPH LICENSES PLAN: plan licenses change
management.licenses.apply [operator-write] — GRAPH LICENSES APPLY: apply licenses change
management.dkim.plan [read] — EXCHANGE DKIM: plan dkim change
management.dkim.apply [operator-write] — EXCHANGE DKIM: apply reviewed dkim plan
management.mail.plan [read] — GRAPH MAIL PLAN: plan mail change
management.mail.apply [operator-write] — GRAPH MAIL APPLY: apply mail change
management.dkim.inspect [read] — EXCHANGE DKIM: read dkim state
management.mail.inspect [read] — GRAPH MAIL READ: read correlated mail probe
auth.configure [read] — LOCAL OAUTH CONFIGURE: write local oauth profile
auth.start [read] — AUTH: start resource auth
auth.poll [read] — AUTH: poll resource auth
auth.refresh [read] — AUTH: refresh resource auth
auth.status [read] — AUTH: status resource auth
auth.logout [read] — AUTH: logout resource auth
runtime.configure [read] — LOCAL EXCHANGE CONFIGURE: bind local exchange runtime
runtime.inspect [read] — LOCAL EXCHANGE CHECK: inspect pinned exchange runtime
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace microsoft --compact --format json
zix describe microsoft --operation users.read --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-microsoft/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

