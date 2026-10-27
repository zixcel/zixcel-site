---
path: "/docs/troubleshooting"
title: "When an operation stops"
summary: "Distinguish errors from missing evidence and choose the relevant inspection."
label: "When an operation stops"
kind: "page"
category: ""
status: "published"
---

## CONTEXT MISSING

Check missing\_arguments, target, profile and credential source. Fill input gaps before considering permissions.

## AUTH REJECTED / ACCESS DENIED

Check audience, expiry and identity for authentication rejection. For denied access, compare target scope, token scopes, consent and role evidence with declared conditions. Resolve a related action’s required\_context first.

## EVIDENCE INCOMPLETE

Partial result evidence is retained. Exit code 2 does not mean an empty inventory or complete success; inspect the unresolved part.

## OUTCOME UNKNOWN

Preserve the original receipt, plan and journal and perform the indicated readback. An uncertain response is not a reason to repeat apply or deletion.

## Return to the detailed definition

Follow diagnostic.inspect\_argv to retain the selected resource when opening full requirements. Public reports need no secret values or transport headers.

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/operation-guidance.md" title="Shared diagnostic contract"}
::

::document-link{href="/tools" title="Open the provider guide"}
::

