---
path: "/tools/domain"
title: "zix domain"
summary: "ValueDomain reads, public DNS and delegation inspection, plus reviewed DNS plans and writes. Establish the authoritative provider first. Official version 0.4.1."
label: "zix domain"
kind: "page"
category: ""
status: "published"
---

## 1. Install and enable

First prepare the OS prerequisites on Ubuntu 24.04+ or equivalent, then run below. No preinstalled gh or GitHub login is needed. With setup already installed, use zix-setup install --with domain alone. The feature list describes the stated release; installation selects the newest stable native package.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with domain
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect domain --format json
```

::document-link{href="/docs/setup" title="Prepare host prerequisites first"}
::

::document-link{href="https://github.com/zixcel/zixcel-domain/releases/tag/native/domain/v0.4.1" title="Official package"}
::

## 2. Supported operations

ValueDomain reads, public DNS and delegation inspection, plus reviewed DNS plans and writes. Establish the authoritative provider first. Official version 0.4.1.

```
valuedomain.domains.list [read] — REGISTRAR VALUEDOMAIN READ: read registrar visible domains
dns.audit [read] — DNS AUTHORITY READ: read public dns evidence
registrar.inspect [read] — REGISTRAR VALUEDOMAIN READ: read registrar registration
dns.reconcile [read] — DNS AUTHORITY READ: compare dns observations
dns.inspect [read] — DNS AUTHORITY READ: read public dns records
dns.delegation [read] — DNS AUTHORITY READ: read parent delegation
dns.export [read] — DNS PROVIDER READ: read selected dns provider
dns.records.plan [read] — DNS PROVIDER PLAN: plan selected dns records
dns.records.resolve.plan [read] — DNS PROVIDER PLAN: plan unresolved dns reconciliation
dns.records.resolve.apply [operator-write] — DNS PROVIDER APPLY: record reviewed dns reconciliation
dns.records.apply [operator-write] — DNS PROVIDER APPLY: apply reviewed dns plan
nameservers.inspect [read] — REGISTRAR DELEGATION: nameservers inspect
nameservers.plan [read] — REGISTRAR DELEGATION: nameservers plan
nameservers.apply [operator-write] — REGISTRAR DELEGATION: nameservers apply
```

## 3. Inspect inputs and access requirements

These commands read no credentials and make no provider requests. Select an operation, then resolve its required inputs, target, credential audience and access before execution.

```
zix capabilities --namespace domain --compact --format json
zix describe domain --operation valuedomain.domains.list --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-domain/blob/main/docs/operation-guidance.md" title="Operations and prerequisites"}
::

::document-link{href="/docs/credentials" title="Credential setup"}
::

## 4. Updates and diagnostics

Use extensions replace for updates with both current and new hashes. Registration and enablement do not grant provider access. Resolve diagnostic input, access and unknown-outcome states before continuing.

::document-link{href="/docs/extensions" title="Registration and updates"}
::

::document-link{href="/docs/troubleshooting" title="Diagnostic keywords"}
::

