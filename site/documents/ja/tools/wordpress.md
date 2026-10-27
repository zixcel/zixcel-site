---
path: "/tools/wordpress"
title: "zix wordpress"
summary: "HTTPS オリジンに結び付いた OS 認証ストアを使い、記事・固定ページ・メディアの参照と、確認付きの変更を扱います。 正式版 0.4.1。"
label: "zix wordpress"
kind: "page"
category: ""
status: "published"
---

## 1. インストールと有効化

初回はUbuntu 24.04以降相当のOS依存を準備してから、以下を実行します。ghの事前導入・GitHubログインは不要です。既に基盤がある場合は zix-setup install --with wordpress だけで追加できます。機能一覧は記載バージョン時点で、導入時には最新安定版を選びます。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with wordpress
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix extensions inspect wordpress --format json
```

::document-link{href="/docs/setup" title="対応OS・依存関係を先に準備"}
::

::document-link{href="https://github.com/zixcel/zixcel-wordpress/releases/tag/v0.4.1" title="正式版を取得"}
::

## 2. 具体的な機能一覧

HTTPS オリジンに結び付いた OS 認証ストアを使い、記事・固定ページ・メディアの参照と、確認付きの変更を扱います。 正式版 0.4.1。

```
wordpress.login [read] — WORDPRESS IDENTITY READ: login selected wordpress profile
wordpress.posts-list [read] — WORDPRESS CONTENT READ: posts list selected wordpress profile
wordpress.pages-list [read] — WORDPRESS CONTENT READ: pages list selected wordpress profile
wordpress.posts-get [read] — WORDPRESS CONTENT READ: posts get selected wordpress profile
wordpress.pages-get [read] — WORDPRESS CONTENT READ: pages get selected wordpress profile
wordpress.media-list [read] — WORDPRESS CONTENT READ: media list selected wordpress profile
wordpress.media-get [read] — WORDPRESS CONTENT READ: media get selected wordpress profile
wordpress.auth-status [read] — WORDPRESS IDENTITY READ: auth status selected wordpress profile
wordpress.draft-plan [read] — WORDPRESS CONTENT PLAN: draft plan selected wordpress profile
wordpress.content-plan [read] — WORDPRESS CONTENT PLAN: content plan selected wordpress profile
wordpress.media-plan [read] — WORDPRESS CONTENT PLAN: media plan selected wordpress profile
wordpress.revoke-plan [read] — WORDPRESS IDENTITY PLAN: revoke plan selected wordpress profile
wordpress.content-reconcile [read] — WORDPRESS CONTENT READ: content reconcile selected wordpress profile
wordpress.draft-apply [operator-write] — WORDPRESS CONTENT APPLY: draft apply selected wordpress profile
wordpress.content-apply [operator-write] — WORDPRESS CONTENT APPLY: content apply selected wordpress profile
wordpress.media-apply [operator-write] — WORDPRESS CONTENT APPLY: media apply selected wordpress profile
wordpress.revoke-apply [operator-write] — WORDPRESS IDENTITY APPLY: revoke apply selected wordpress profile
```

## 3. 入力と必要権限を確認

この確認は認証情報を読み取らず、外部APIも呼びません。1操作を選び、必須入力・対象・認証先・権限を確認してから実行します。 認証は同梱の zix-wordpress credential-import PROFILE ORIGIN COLLECTION を使い、WordPressのオリジンに束縛します。一般の zix credential set とは異なります。

```
zix capabilities --namespace wordpress --compact --format json
zix describe wordpress --operation wordpress.login --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-wordpress/blob/main/docs/operation-guidance.md" title="操作と必要条件"}
::

::document-link{href="/docs/credentials" title="認証情報の登録"}
::

## 4. 更新とエラー対応

更新には extensions replace を使い、新旧ハッシュを照合します。登録と有効化はサービス側の権限付与を意味しません。不足入力・権限拒否・結果不明の場合は、診断に示された確認を行ってから進みます。

::document-link{href="/docs/extensions" title="登録・更新の手順"}
::

::document-link{href="/docs/troubleshooting" title="診断の読み方"}
::

