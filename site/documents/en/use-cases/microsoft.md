---
path: "/use-cases/microsoft"
title: "Work with Microsoft 365 and Exchange"
summary: "Inspect the boundaries between Graph, Exchange and DNS operations."
label: "Work with Microsoft 365 and Exchange"
kind: "page"
category: ""
status: "published"
---

## Select the operation and audience

Keep Graph and Exchange Online tokens separate. A Graph Explorer token is not verified by inspecting a different OAuth profile cache.

```
zix capabilities --namespace microsoft --compact --format json
zix describe microsoft --operation admin.organization --argument resource=security_defaults --compact --format json
```

## Inspect mail setup prerequisites

Review domain ownership, mail DNS, shared mailboxes, delegation and DKIM as distinct scoped operations. Establish the DNS change target through Domain.

```
zix describe microsoft --operation admin.domain-verification --compact --format json
zix describe microsoft --operation exchange.snapshot --argument resource=inbox_rules --compact --format json
zix describe domain --operation dns.records.plan --compact --format json
```

## Read current state, then plan only needed changes

Live reads need the selected tenant, subject, mailbox and appropriate credentials. Keep unavailable settings unresolved and follow plan, review and apply for actual changes.

::document-link{href="https://github.com/zixcel/zixcel-microsoft/blob/main/docs/mail-administration.md" title="Mail administration examples"}
::

::document-link{href="https://github.com/zixcel/zixcel-microsoft/blob/main/docs/microsoft-administration.md" title="Organization and policy examples"}
::

::document-link{href="/docs/credentials" title="Credential handling"}
::

