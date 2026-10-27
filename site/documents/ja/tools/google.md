---
path: "/tools/google"
title: "zix google"
summary: "プロジェクト、IAM キー、リソース一覧、既存の請求エクスポートの読み取り。API 有効化や SQL ジョブの作成は行いません。 正式版 0.7.0。"
label: "zix google"
kind: "page"
category: ""
status: "published"
---

## 1. インストールと有効化

初回はUbuntu 24.04以降相当のOS依存を準備してから、以下を実行します。ghの事前導入・GitHubログインは不要です。既に基盤がある場合は zix-setup install --with google だけで追加できます。機能一覧は記載バージョン時点で、導入時には最新安定版を選びます。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with google
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect google --format json
```

::document-link{href="/docs/setup" title="対応OS・依存関係を先に準備"}
::

::document-link{href="https://github.com/zixcel/zixcel-google/releases/tag/google/v0.7.0" title="正式版を取得"}
::

## 2. 具体的な機能一覧

プロジェクト、IAM キー、リソース一覧、既存の請求エクスポートの読み取り。API 有効化や SQL ジョブの作成は行いません。 正式版 0.7.0。

```
projects.list [read] — GOOGLE INVENTORY READ: list visible google projects
projects.inspect [read] — GOOGLE INVENTORY READ: inspect selected google project
billing.accounts.list [read] — GOOGLE BILLING READ: list visible billing accounts
billing.projects.list [read] — GOOGLE BILLING READ: list selected billing account projects
billing.project.inspect [read] — GOOGLE BILLING READ: inspect selected project billing link
services.list [read] — GOOGLE INVENTORY READ: list selected project services
iam.accounts.list [read] — GOOGLE IAM READ: list selected project service accounts
assets.search [read] — GOOGLE INVENTORY READ: search selected project assets
compute.instances.list [read] — GOOGLE INVENTORY READ: list selected project instances
compute.disks.list [read] — GOOGLE INVENTORY READ: list selected project disks
compute.snapshots.list [read] — GOOGLE INVENTORY READ: list selected project snapshots
compute.commitments.list [read] — GOOGLE INVENTORY READ: list selected project commitments
sql.instances.list [read] — GOOGLE INVENTORY READ: list selected project sql instances
storage.buckets.list [read] — GOOGLE INVENTORY READ: list selected project buckets
run.services.list [read] — GOOGLE INVENTORY READ: list selected project run services
compute.addresses.list [read] — GOOGLE INVENTORY READ: list selected project addresses
overview.accessible [read] — GOOGLE INVENTORY READ: summarize accessible project visibility
overview.project [read] — GOOGLE INVENTORY READ: summarize explicit project inventory
billing.exports.discover [read] — GOOGLE BILLING READ: discover existing billing exports
billing.exports.read [read] — GOOGLE BILLING READ: read existing billing export page
iam.keys.inspect [read] — GOOGLE IAM READ: inspect one service account key
```

## 3. 入力と必要権限を確認

この確認は認証情報を読み取らず、外部APIも呼びません。1操作を選び、必須入力・対象・認証先・権限を確認してから実行します。

```
zix capabilities --namespace google --compact --format json
zix describe google --operation projects.list --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-google/blob/main/docs/operation-guidance.md" title="操作と必要条件"}
::

::document-link{href="/docs/credentials" title="認証情報の登録"}
::

## 4. 更新とエラー対応

更新には extensions replace を使い、新旧ハッシュを照合します。登録と有効化はサービス側の権限付与を意味しません。不足入力・権限拒否・結果不明の場合は、診断に示された確認を行ってから進みます。

::document-link{href="/docs/extensions" title="登録・更新の手順"}
::

::document-link{href="/docs/troubleshooting" title="診断の読み方"}
::

