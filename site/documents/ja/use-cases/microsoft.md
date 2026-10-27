---
path: "/use-cases/microsoft"
title: "Microsoft 365 と Exchange を整理する"
summary: "Graph・Exchange・DNS の操作境界を確認して進めます。"
label: "Microsoft 365 と Exchange を整理する"
kind: "page"
category: ""
status: "published"
---

## 対象の操作と認証先を選ぶ

Graph 用トークンと Exchange Online 用トークンを区別します。Graph Explorer で取得したトークンの状態を、別の OAuth プロファイルのキャッシュで判断しません。

```
zix capabilities --namespace microsoft --compact --format json
zix describe microsoft --operation admin.organization --argument resource=security_defaults --compact --format json
```

## メール設定の前提を確認する

ドメインの所有確認、メール用 DNS、共有メールボックス、委任権限、DKIM はそれぞれ対象と必要条件を確認します。DNS の変更先は Domain で確認します。

```
zix describe microsoft --operation admin.domain-verification --compact --format json
zix describe microsoft --operation exchange.snapshot --argument resource=inbox_rules --compact --format json
zix describe domain --operation dns.records.plan --compact --format json
```

## 現在値を読み、必要な変更だけ計画する

実データの参照には対象テナント・主体・メールボックスと適切な認証情報が必要です。取得できない設定を成功や空一覧として扱わず、必要な変更を計画・確認・適用の順に進めます。

::document-link{href="https://github.com/zixcel/zixcel-microsoft/blob/main/docs/mail-administration.md" title="メール管理の操作例"}
::

::document-link{href="https://github.com/zixcel/zixcel-microsoft/blob/main/docs/microsoft-administration.md" title="組織とポリシーの操作例"}
::

::document-link{href="/docs/credentials" title="認証情報の扱い"}
::

