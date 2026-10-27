---
path: "/docs/extensions"
title: "拡張パッケージを登録する"
summary: "必要なサービスだけを選び、正式な実行ファイルと定義を登録します。"
label: "拡張パッケージを登録する"
kind: "page"
category: ""
status: "published"
---

## GitHub拡張を導入する

基盤導入後に実行します。パッケージの取得・来歴検証・登録は補助ツールが行い、低水準の extensions add / replace の検証と状態維持を利用します。

```
zix-setup install --with github
zix extensions inspect github --format json
```

::document-link{href="/docs/setup" title="基盤の準備"}
::

::document-link{href="/tools/github" title="GitHubの機能一覧"}
::

## 登録・更新・有効化を分ける

extensions add は初回登録、extensions replace は更新です。更新には新しいハッシュと現在登録されているハッシュを指定し、有効・無効の状態を維持します。資格情報への権限付与やプロバイダーの設定変更は登録時には行いません。

```
zix extensions inspect github --format json
zix extensions --help
```

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/operation-guidance.md" title="拡張と案内の仕様"}
::

## 自分の目的に合わせて選ぶ

拡張ごとに機能・配布版・OS 条件が異なります。導入した拡張の capabilities と describe を実際の利用口として確認してください。

::document-link{href="/tools" title="対応サービスと機能"}
::

::document-link{href="/docs/credentials" title="認証情報を設定する"}
::

