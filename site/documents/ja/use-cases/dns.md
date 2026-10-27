---
path: "/use-cases/dns"
title: "ドメインと DNS を確認する"
summary: "レジストラと DNS 管理先を確認し、変更前に計画を作ります。"
label: "ドメインと DNS を確認する"
kind: "page"
category: ""
status: "published"
---

## 登録先と DNS の権威を確認する

ドメインの登録先と、実際に DNS を配信するサービスは異なる場合があります。まず Domain で委任の確認方法を調べます。example.net は説明用なので、自分の対象へ置き換えてください。

```
zix describe domain --operation dns.delegation --compact --format json
zix domain dns delegation --domain example.net
```

## 選択した管理先へ進む

Cloudflare が管理先と確認できた場合に、そのアカウント・ゾーンを指定して DNS を調べます。ValueDomain 側の認証に失敗したことだけを理由に、管理先を切り替えません。

```
zix describe cloudflare --operation dns.audit --compact --format json
zix describe domain --operation dns.records.plan --compact --format json
```

::document-link{href="https://github.com/zixcel/zixcel-domain/blob/main/docs/record-cli.md" title="プロファイル・変更ファイルの作り方"}
::

## 計画を確認してから変更する

対象レコード、現在値、保持するレコードと差分を確認し、その計画だけを実行します。適用後の provider 確認と公開 DNS の反映は別に確認します。

::document-link{href="/docs/credentials" title="認証情報の保管"}
::

::document-link{href="/docs/troubleshooting" title="結果が不明な場合"}
::

