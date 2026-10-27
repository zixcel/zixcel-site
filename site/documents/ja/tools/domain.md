---
path: "/tools/domain"
title: "zix domain"
summary: "ValueDomain のドメイン参照、公開 DNS、委任確認、DNS 変更計画と実行。レジストラと DNS 管理先を確認して選びます。 正式版 0.4.1。"
label: "zix domain"
kind: "page"
category: ""
status: "published"
---

## 1. インストールと有効化

初回はUbuntu 24.04以降相当のOS依存を準備してから、以下を実行します。ghの事前導入・GitHubログインは不要です。既に基盤がある場合は zix-setup install --with domain だけで追加できます。機能一覧は記載バージョン時点で、導入時には最新安定版を選びます。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with domain
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect domain --format json
```

::document-link{href="/docs/setup" title="対応OS・依存関係を先に準備"}
::

::document-link{href="https://github.com/zixcel/zixcel-domain/releases/tag/native/domain/v0.4.1" title="正式版を取得"}
::

## 2. 具体的な機能一覧

ValueDomain のドメイン参照、公開 DNS、委任確認、DNS 変更計画と実行。レジストラと DNS 管理先を確認して選びます。 正式版 0.4.1。

```
valuedomain.domains.list [read] — REGISTRAR VALUEDOMAIN READ: read registrar visible domains
dns.audit [read] — DNS AUTHORITY READ: read public dns evidence
registrar.inspect [read] — REGISTRAR VALUEDOMAIN READ: read registrar registration
dns.reconcile [read] — DNS AUTHORITY READ: compare dns observations
dns.inspect [read] — DNS AUTHORITY READ: read public dns records
dns.delegation [read] — DNS AUTHORITY READ: read parent delegation
dns.export [read] — DNS PROVIDER READ: read selected dns provider
dns.records.plan [read] — DNS PROVIDER PLAN: plan selected dns records
dns.records.resolve.plan [read] — DNS PROVIDER PLAN: plan unresolved dns reconciliation
dns.records.resolve.apply [operator-write] — DNS PROVIDER APPLY: record reviewed dns reconciliation
dns.records.apply [operator-write] — DNS PROVIDER APPLY: apply reviewed dns plan
nameservers.inspect [read] — REGISTRAR DELEGATION: nameservers inspect
nameservers.plan [read] — REGISTRAR DELEGATION: nameservers plan
nameservers.apply [operator-write] — REGISTRAR DELEGATION: nameservers apply
```

## 3. 入力と必要権限を確認

この確認は認証情報を読み取らず、外部APIも呼びません。1操作を選び、必須入力・対象・認証先・権限を確認してから実行します。

```
zix capabilities --namespace domain --compact --format json
zix describe domain --operation valuedomain.domains.list --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-domain/blob/main/docs/operation-guidance.md" title="操作と必要条件"}
::

::document-link{href="/docs/credentials" title="認証情報の登録"}
::

## 4. 更新とエラー対応

更新には extensions replace を使い、新旧ハッシュを照合します。登録と有効化はサービス側の権限付与を意味しません。不足入力・権限拒否・結果不明の場合は、診断に示された確認を行ってから進みます。

::document-link{href="/docs/extensions" title="登録・更新の手順"}
::

::document-link{href="/docs/troubleshooting" title="診断の読み方"}
::

