---
path: "/tools/microsoft"
title: "zix microsoft"
summary: "Microsoft Graph と Exchange Online の管理。認証先、必要なスコープ、同意、RBAC、対象を操作ごとに確認します。 正式版 0.5.1。"
label: "zix microsoft"
kind: "page"
category: ""
status: "published"
---

## 1. インストールと有効化

初回はUbuntu 24.04以降相当のOS依存を準備してから、以下を実行します。ghの事前導入・GitHubログインは不要です。既に基盤がある場合は zix-setup install --with microsoft だけで追加できます。機能一覧は記載バージョン時点で、導入時には最新安定版を選びます。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with microsoft
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect microsoft --format json
```

::document-link{href="/docs/setup" title="対応OS・依存関係を先に準備"}
::

::document-link{href="https://github.com/zixcel/zixcel-microsoft/releases/tag/native/microsoft/v0.5.1" title="正式版を取得"}
::

## 2. 具体的な機能一覧

Microsoft Graph と Exchange Online の管理。認証先、必要なスコープ、同意、RBAC、対象を操作ごとに確認します。 正式版 0.5.1。

```
users.read [read] — GRAPH USER READ: read selected graph user
admin.organization [read] — GRAPH DIRECTORY READ: read tenant identity
admin.licenses [read] — GRAPH DIRECTORY READ: read subscribed licenses
admin.domains [read] — GRAPH DOMAIN READ: read verified domains
admin.domain-verification [read] — GRAPH DOMAIN READ: read domain verification records
admin.users [read] — GRAPH DIRECTORY READ: read directory users
admin.user [read] — GRAPH DIRECTORY READ: read selected directory user
admin.domain-dns [read] — GRAPH DOMAIN READ: read service dns requirements
exchange.snapshot [read] — EXCHANGE CONFIGURATION: read exchange configuration
exchange.plan [read] — EXCHANGE CONFIGURATION: plan exchange change
exchange.apply [operator-write] — EXCHANGE CONFIGURATION: apply reviewed exchange plan
admin.doctor [read] — LOCAL SETUP CHECK: inspect local admin prerequisites
management.domains.plan [read] — GRAPH DOMAINS PLAN: plan domains change
management.domains.apply [operator-write] — GRAPH DOMAINS APPLY: apply domains change
management.users.plan [read] — GRAPH USERS PLAN: plan users change
management.users.apply [operator-write] — GRAPH USERS APPLY: apply users change
management.licenses.plan [read] — GRAPH LICENSES PLAN: plan licenses change
management.licenses.apply [operator-write] — GRAPH LICENSES APPLY: apply licenses change
management.dkim.plan [read] — EXCHANGE DKIM: plan dkim change
management.dkim.apply [operator-write] — EXCHANGE DKIM: apply reviewed dkim plan
management.mail.plan [read] — GRAPH MAIL PLAN: plan mail change
management.mail.apply [operator-write] — GRAPH MAIL APPLY: apply mail change
management.dkim.inspect [read] — EXCHANGE DKIM: read dkim state
management.mail.inspect [read] — GRAPH MAIL READ: read correlated mail probe
auth.configure [read] — LOCAL OAUTH CONFIGURE: write local oauth profile
auth.start [read] — AUTH: start resource auth
auth.poll [read] — AUTH: poll resource auth
auth.refresh [read] — AUTH: refresh resource auth
auth.status [read] — AUTH: status resource auth
auth.logout [read] — AUTH: logout resource auth
runtime.configure [read] — LOCAL EXCHANGE CONFIGURE: bind local exchange runtime
runtime.inspect [read] — LOCAL EXCHANGE CHECK: inspect pinned exchange runtime
```

## 3. 入力と必要権限を確認

この確認は認証情報を読み取らず、外部APIも呼びません。1操作を選び、必須入力・対象・認証先・権限を確認してから実行します。

```
zix capabilities --namespace microsoft --compact --format json
zix describe microsoft --operation users.read --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-microsoft/blob/main/docs/operation-guidance.md" title="操作と必要条件"}
::

::document-link{href="/docs/credentials" title="認証情報の登録"}
::

## 4. 更新とエラー対応

更新には extensions replace を使い、新旧ハッシュを照合します。登録と有効化はサービス側の権限付与を意味しません。不足入力・権限拒否・結果不明の場合は、診断に示された確認を行ってから進みます。

::document-link{href="/docs/extensions" title="登録・更新の手順"}
::

::document-link{href="/docs/troubleshooting" title="診断の読み方"}
::

