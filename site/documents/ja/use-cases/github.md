---
path: "/use-cases/github"
title: "GitHub の情報を読み取る"
summary: "拡張を登録し、認証情報を露出せずにリポジトリを確認します。"
label: "GitHub の情報を読み取る"
kind: "page"
category: ""
status: "published"
---

## 拡張と入力を確認する

repository.read は owner と repo を指定する読み取りです。user.read は期待する認証ユーザーの login を指定し、応答との一致を確認します。

```
zix capabilities --compact --format json
zix capabilities --namespace github --compact --format json
zix describe github --operation repository.read --compact --format json
```

::document-link{href="/docs/extensions" title="GitHub 拡張の登録"}
::

## ローカルの保管先から実行する

必要な対象に限定した認証情報を保管し、登録ハッシュに結び付けて実行します。非公開リポジトリの 404 を存在しない証拠として扱わず、対象範囲や組織の承認も確認します。

```
zix extensions inspect github --format json > github.registration.json
zix credential run --collection default --reference local/github/token/github/default --host api.github.com --environment ZIX_GITHUB_ACCESS_TOKEN --manifest-sha256 "$(jq -r '.entry.manifest_sha256' github.registration.json)" --executable-sha256 "$(jq -r '.entry.executable_sha256' github.registration.json)" -- github repositories get --owner zixcel --repo cli
```

::document-link{href="/docs/credentials" title="最初に認証情報を登録する"}
::

::document-link{href="/docs/troubleshooting" title="停止した場合の確認"}
::

