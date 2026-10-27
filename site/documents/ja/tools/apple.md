---
path: "/tools/apple"
title: "zix apple"
summary: "App Store Connect のアプリ情報と、API キーから見えるアプリ一覧の参照。 正式版 0.2.0。"
label: "zix apple"
kind: "page"
category: ""
status: "published"
---

## 1. インストールと有効化

初回はUbuntu 24.04以降相当のOS依存を準備してから、以下を実行します。ghの事前導入・GitHubログインは不要です。既に基盤がある場合は zix-setup install --with apple だけで追加できます。機能一覧は記載バージョン時点で、導入時には最新安定版を選びます。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with apple
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect apple --format json
```

::document-link{href="/docs/setup" title="対応OS・依存関係を先に準備"}
::

::document-link{href="https://github.com/zixcel/zixcel-apple/releases/tag/native/apple/v0.2.0" title="正式版を取得"}
::

## 2. 具体的な機能一覧

App Store Connect のアプリ情報と、API キーから見えるアプリ一覧の参照。 正式版 0.2.0。

```
app.read [read] — APPLE APPSTORE READ: read selected app store app
apps.list [read] — APPLE APPSTORE READ: list visible app store apps
```

## 3. 入力と必要権限を確認

この確認は認証情報を読み取らず、外部APIも呼びません。1操作を選び、必須入力・対象・認証先・権限を確認してから実行します。

```
zix capabilities --namespace apple --compact --format json
zix describe apple --operation app.read --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-apple/blob/main/docs/operation-guidance.md" title="操作と必要条件"}
::

::document-link{href="/docs/credentials" title="認証情報の登録"}
::

## 4. 更新とエラー対応

更新には extensions replace を使い、新旧ハッシュを照合します。登録と有効化はサービス側の権限付与を意味しません。不足入力・権限拒否・結果不明の場合は、診断に示された確認を行ってから進みます。

::document-link{href="/docs/extensions" title="登録・更新の手順"}
::

::document-link{href="/docs/troubleshooting" title="診断の読み方"}
::

