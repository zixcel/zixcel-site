---
path: "/docs/setup"
title: "Install and update your local foundation"
summary: "Prepare dependencies, Zix, extensions and an optional 0.5B environment from official distributions."
kind: "page"
status: "published"
---

## 1. Host and OS prerequisites

Use Linux x86\_64 with glibc 2.39+ (Ubuntu 24.04+, including WSL2), Bash, Python 3.12+, curl, CA certificates and libsecret. The following prepares Ubuntu 24.04. A global gh, GitHub login, Rust and Node are not required.

```
sudo apt-get update
sudo apt-get install -y --no-install-recommends python3 curl ca-certificates libsecret-1-0 gnome-keyring dbus-user-session
```

## 2. Inspect and run setup

Run as your login user without sudo. Setup manages a private gh verifier and installs the newest stable Zix and selected extensions after checking checksums, signed provenance, source, tag and contents. The initial script is an HTTPS bootstrap trust input; its same-origin checksum is not independent publisher authentication.

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with github
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
```

::document-link{href="https://github.com/zixcel/cli/releases/tag/installer/v0.1.0" title="Installer release and provenance"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/setup.md" title="Implementation, storage and trust boundaries"}
::

## 3. Update and add extensions

Update refreshes setup, the private verifier, Zix and supported registered extensions. New registrations are enabled; existing enablement is preserved. Unknown third-party extensions are unchanged. Updates commit per package; a later failure retains completed updates and receipts. No automatic downgrade.

```
zix-setup update
zix-setup install --with domain,microsoft
zix extensions list --format json
```

::document-link{href="/tools" title="Features and install guides"}
::

## 4. Optionally install the 0.5B environment

--local-model obtains the tested llama.cpp b11913 and Qwen2.5-0.5B q8\_0 from official distributions with pinned SHA256 checks. Allow about 2 GB free during installation; a machine with 4 GB RAM or more is recommended. zix-local-model is an external helper that supplies model and library paths. This tested pair stays pinned rather than silently changing to untested latest models.

```
zix-setup install --with github --local-model
zix-local-model --version
```

::document-link{href="/docs/local-model" title="Run the 0.5B example"}
::

## 5. Check PATH and credential custody

Doctor observes PATH, versions, D-Bus and Secret Service without network or secret reads. Service ownership does not prove a collection is unlocked or authentication will succeed. WSL/headless hosts need a separately configured login-session Secret Service; installing OS packages alone does not provision it. Export PATH in the current shell and add it to your shell configuration if desired. On a desktop, use Passwords and Keys (Seahorse; install with sudo apt-get install seahorse if absent) to configure and unlock a password-protected persistent default keyring. Before enrollment, inspect it with zix credential status --collection default.

```
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
```

::document-link{href="/docs/credentials" title="Enroll service credentials"}
::

## 6. Storage, recovery and stopped updates

Packages live under \~/.local/share/zix/packages; helpers, optional models and receipts under \~/.local/share/zix/setup. Temporary downloads are removed, previous versions retained for rollback. Inspect download/access/rate-limit failures rather than changing provider settings or repeatedly retrying.

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/setup.md" title="Pinning, rollback and removal"}
::

