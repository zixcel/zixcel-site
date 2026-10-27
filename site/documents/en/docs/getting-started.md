---
path: "/docs/getting-started"
title: "Get started with Zix"
summary: "Install an official Linux/WSL package and inspect your first operation."
label: "Get started with Zix"
kind: "page"
category: ""
status: "published"
---

## 1. Install the foundation

The foundation installer manages verification gh, official Zix and selected extensions. Start with the shared guide to prepare the supported OS, Python and libsecret. The local 0.5B environment is optional.

::document-link{href="/docs/setup" title="Foundation installation and updates"}
::

::document-link{href="https://github.com/zixcel/cli" title="CLI public source"}
::

## 2. Register an extension

Provider commands are independent packages. Download a selected official extension and register it using extensions add. The extension guide uses GitHub reads as a concrete first example.

::document-link{href="/docs/extensions" title="Register the GitHub extension"}
::

::document-link{href="/tools" title="Choose another extension"}
::

## 3. Inspect requirements locally

After registration, these commands make no provider requests and read no credentials. Resolve missing\_arguments and inspect the credential audience and required access.

```
zix capabilities --compact --format json
zix capabilities --namespace github --compact --format json
zix describe github --operation repository.read --compact --format json
```

## 4. Enroll credentials and execute once

Enroll an appropriately scoped credential locally without posting its value into a chat. Continue to the credential run example bound to the installed extension.

::document-link{href="/docs/credentials" title="Credential enrollment and read example"}
::

::document-link{href="/docs/troubleshooting" title="Resolve a stopped operation"}
::

