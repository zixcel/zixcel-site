# Site verification source languages

The first-party content decoder and verifier are strict TypeScript (`.mts`),
including the Nuxt module import and direct CLI. Untrusted JSON is decoded into
the real site contract before navigation/content checks; no untyped declaration
file is used to pretend that a JavaScript implementation is checked.

Dependency security regressions now run through the published
`@nuxtjp/dependency-security` package. The copied JavaScript fixture has been
removed, and `site/source-languages.json` has no retained local JavaScript.
Owner CI still refuses unclassified JS entrypoints and stale inventory entries.
Future generated/third-party code must be explicitly classified rather than
mistaken for first-party source.

Content bytes and route meaning are preserved by the dependency update. Run strict decoder/validator types, malformed-input and
navigation refusal cases, then both managed-site builds through the normal owner
CI. A build is not a new production deployment.
