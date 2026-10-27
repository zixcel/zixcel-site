# Released setup mirror

The implementation owner is `zixcel/cli`, `install/install.sh`. This site mirrors
an **already published** `installer/v<version>` artifact; do not edit the mirror
or ship a development checkout as an installer.

For an update:

1. Require successful owner main CI and `release-installer.yml` for the exact
   installer source/tag. Obtain `install.sh` and `SHA256SUMS.installer` from that
   release, verify their digest and GitHub provenance (owner `zixcel/cli`, signer
   `.github/workflows/release-installer.yml`, exact source digest and tag).
2. Copy the verified bytes unchanged into `sites/zixcel/public/`. Preserve owner
   license/notice as `installer.LICENSE` and `installer.NOTICE`. Update
   `installer-provenance.json` with version, source, tag, SHA256 and source URL.
   Initial HTTPS bootstrap trust is documented; the checksum is not an
   independent publisher identity proof.
3. Update the shared setup guide and affected provider/model pages. Keep OS
   prerequisites, private verification helper, Secret Service provisioning,
   PATH and optional pinned-model behavior explicit. The native CLI package
   version is independent from the installer version.
4. Run the repository's content, type and build checks. Compare the generated
   `/install.sh` digest to the accepted release and test download/install/update
   with a clean HOME, no global gh, no GitHub login and no provider credentials.
5. Advance the site release contract and use the existing owner publication
   workflow. Verify public script/checksum/provenance bytes and page routes.

`zix-setup update` discovers installer releases by their own tag family and exact
asset. A core binary or library release is never treated as an installer release.
The website does not mint tokens, provision keyring passwords or run installations
inside the browser.
