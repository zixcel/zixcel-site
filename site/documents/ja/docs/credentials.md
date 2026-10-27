---
path: "/docs/credentials"
title: "認証情報をローカルに保管する"
summary: "Crowsi の OS 認証ストアを使い、秘密値ではなく参照を操作に結び付けます。"
label: "認証情報をローカルに保管する"
kind: "page"
category: ""
status: "published"
---

## GitHub トークンを登録する

GNU 版 zix と既存の永続 Secret Service コレクションを用意します。必要な対象だけを読めるトークンを取得し、次の非表示入力へ貼り付けます。これはストアへの登録であり、GitHub の権限付与ではありません。

```
zix credential set --collection default --reference local/github/token/github/default --host api.github.com
```

## 登録した拡張に結び付けて読み取る

GitHub 拡張を登録済みとして、zixcel/cli の基本情報を取得する例です。jq で現在の登録ハッシュを渡します。認証情報は宣言された環境変数だけへ渡され、コマンドラインや JSON ファイルに秘密値を書き出しません。

```
zix extensions inspect github --format json > github.registration.json
zix credential run --collection default --reference local/github/token/github/default --host api.github.com --environment ZIX_GITHUB_ACCESS_TOKEN --manifest-sha256 "$(jq -r '.entry.manifest_sha256' github.registration.json)" --executable-sha256 "$(jq -r '.entry.executable_sha256' github.registration.json)" -- github repositories get --owner zixcel --repo cli
```

## サービスと認証先を一致させる

Graph と Exchange、Docker Hub とレジストリ、WordPress の別オリジンは、それぞれ別の認証条件です。WordPress のオリジン拘束など、拡張固有の保管手順がある場合は、その正式ガイドに従います。

::document-link{href="/tools" title="拡張ごとのガイド"}
::

::document-link{href="/docs/troubleshooting" title="認証・権限の切り分け"}
::

