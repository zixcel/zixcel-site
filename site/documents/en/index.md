---
path: "/"
title: "Small local AI.\nYour own tools."
summary: "Let a 0.5B model choose a short operation ID while Zix describes inputs and prerequisites. Start with a scoped GitHub read workflow on your own machine."
kind: "home"
label: "Zixcel"
category: ""
status: "published"
---

## 1. Install the GitHub extension

Prepare the OS prerequisites, then use the shared installer for the released CLI, GitHub extension and optional 0.5B environment. No existing gh or development environment is needed.

::document-link{href="/docs/setup" title="Install the foundation"}
::

::document-link{href="/tools/github" title="Install GitHub"}
::

## 2. Give 0.5B a short choice

Example: inspect a public repository. Pass IDs and meanings from the definitions, without full JSON or secret values.

```
CHOICES AND MEANINGS:
user.read: GITHUB IDENTITY READ
repository.read: GITHUB REPOSITORY READ
REQUEST: Read GitHub repository metadata.

# Example answer: repository.read
```

::document-link{href="/docs/local-model" title="Local 0.5B walkthrough and limits"}
::

## 3. Inspect before executing

The caller validates the ID and authorized target, then inspects Zix inputs and access requirements. Retry and permission decisions remain deterministic.

```
zix describe github --operation repository.read --compact --format json
```

::document-link{href="/docs/llm" title="Caller implementation"}
::

