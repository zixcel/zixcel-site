---
path: "/docs/local-model"
title: "Choose an operation with local 0.5B"
summary: "A reproducible example scoped to GitHub read operations."
kind: "page"
status: "published"
---

## 1. Install CLI, extension and model

Prepare the foundation prerequisites and use --local-model. The helper supplies the downloaded model and shared-library paths; no development build or manual path replacement is needed.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with github --local-model
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix-local-model --version
```

::document-link{href="/docs/setup" title="Host requirements, installation and updates"}
::

## 2. Inspect candidates and run local inference

Run the following directly. This scoped example uses two candidates, two CPU threads, temperature 0 and 32 output tokens, and ends at model selection.

```
zix capabilities --namespace github --compact --format json
prompt='<|im_start|>system
Match the final request to one listed ID. Return only the matching identifier.<|im_end|>
<|im_start|>user
CHOICES AND MEANINGS:
user.read: GITHUB IDENTITY READ
repository.read: GITHUB REPOSITORY READ
REQUEST: Read GitHub repository metadata.<|im_end|>
<|im_start|>assistant
'
zix-local-model --no-conversation --no-display-prompt --no-warmup --no-perf --grammar 'root ::= "user.read" | "repository.read"' -p "$prompt" -n 32 -c 4096 -t 2 -tb 2 -ngl 0 --temp 0 --seed 42
```

## 3. Validate the answer

The expected choice is repository.read. Validate it against the authorized operation and repository. Never pass model output to a shell; use registered command definitions and user-supplied inputs. Continue to the credential guide for the actual read.

```
zix describe github --operation repository.read --compact --format json
```

::document-link{href="/docs/credentials" title="Authenticate and read"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm_view.py" title="Caller validation reference"}
::

## Qualification limits

An earlier 0.5B test selected the GitHub repository operation correctly, but broader routing passed only 7 of 13 cases. This is a scoped example, not qualification for autonomous operation across providers. A separate 1.5B configuration passed 15 ordinary routing cases. Code handles missing input, authentication, access and unknown outcomes.

::document-link{href="/docs/llm" title="Design and stop conditions"}
::

