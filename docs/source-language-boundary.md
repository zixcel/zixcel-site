# Site verification source languages

The first-party content decoder and verifier are strict TypeScript (`.mts`),
including the Nuxt module import and direct CLI. Untrusted JSON is decoded into
the real site contract before navigation/content checks; no untyped declaration
file is used to pretend that a JavaScript implementation is checked.

The only retained JavaScript is `scripts/dependency-security.check.cjs`, an
unchanged verification fixture adopted from NuxtJP site-builder. Its exact source
commit, classification and SHA256 are recorded in `site/source-languages.json`.
This file is not rewritten or exempted through an extension-wide wildcard.
Owner CI checks its bytes, refuses unclassified JS entrypoints and stale entries,
and runs the actual dependency security regressions. Future generated/third-party
code must be explicitly classified rather than mistaken for first-party source.

Content bytes, route meaning, dependencies and deployed site version are not
changed by this refactor. Run strict decoder/validator types, malformed-input and
navigation refusal cases, then both managed-site builds through the normal owner
CI. A build is not a new production deployment.
