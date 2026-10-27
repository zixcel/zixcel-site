---
path: "/docs/llm"
title: "Use Zix from an LLM"
summary: "Use staged discovery to separate selection, prerequisites and execution in a small context."
label: "Use Zix from an LLM"
kind: "page"
category: ""
status: "published"
---

## Read only the definition needed

Start with the provider index, then one provider operation index, then one compact operation brief. The model does not need the full catalog for every request.

```
zix capabilities --compact --format json
zix capabilities --namespace github --compact --format json
zix describe github --operation repository.read --compact --format json
```

## Give small models IDs and keywords

Keep full JSON in the caller. Give the model only IDs, keywords and short meanings from the selected index. Put the request after the data and constrain the answer to candidate IDs. Validate its choice against the targets and operations authorized for the workflow.

```
CHOICES AND MEANINGS:
github: REPOSITORY, READ
microsoft: GRAPH, EXCHANGE, AUTH
REQUEST: Read GitHub repository metadata.
```

## Enforce stop conditions in code

Missing input, credential or access problems, partial evidence and unknown writes remain blocked independently of model output. The reference formatter separates stop conditions from candidate validation and executes no commands. Routing accuracy depends on model, quantization and prompt; qualify the actual configuration.

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm_view.py" title="Caller reference code (Python standard library)"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm-operations.md" title="Prompt format and execution checks"}
::

## Use structured inputs and next actions

command contains actual command words; arguments lists accepted inputs; missing\_arguments names missing context. Use selector\_choices to inspect the correct resource. A next action marked runnable has a usable shape and no declared unresolved context; it is not permission or approval proof.

## Keep inspection separate from execution

Give the model needed metadata and the authorized target and goal. Keep secret values out of prompts and execute one scoped operation at a time. Review write plans, then confirm with y/yes or explicit -y/--yes.

## Do not repeat an unchanged failed request

Resolve inputs for CONTEXT MISSING, audience/expiry/identity for AUTH REJECTED, and scope/consent/role/target for ACCESS DENIED. Read back the original attempt for OUTCOME UNKNOWN. A 403 alone does not identify a missing grant, and no permission is added automatically.

::document-link{href="/docs/troubleshooting" title="Follow diagnostic keywords"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm-operations.md" title="LLM operation contract"}
::

