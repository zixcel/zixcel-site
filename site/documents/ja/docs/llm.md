---
path: "/docs/llm"
title: "LLM から zix を使う"
summary: "小さなコンテキストでも、選択・要件確認・実行を分けて進めます。"
label: "LLM から zix を使う"
kind: "page"
category: ""
status: "published"
---

## ３段階で必要な定義だけ読む

最初は拡張の一覧、次に１拡張の操作一覧、最後に１操作の compact 表示を使います。全カタログを毎回モデルへ渡す必要はありません。

```
zix capabilities --compact --format json
zix capabilities --namespace github --compact --format json
zix describe github --operation repository.read --compact --format json
```

## 小型モデルにはIDとキーワードを渡す

JSON全体は連携ホストに保持し、モデルには選択した一覧のID・キーワード・短い意味だけを渡します。依頼はデータの後ろに置き、応答は候補IDに制約します。モデルの選択は、利用者が許可した対象・操作の範囲と照合します。

```
CHOICES AND MEANINGS:
github: REPOSITORY, READ
microsoft: GRAPH, EXCHANGE, AUTH
REQUEST: Read GitHub repository metadata.
```

## 停止条件はプログラムで処理する

入力不足、認証・権限の問題、部分観測、変更結果の不明は、モデルの判断で解除しません。参照実装は停止条件と候補IDの検証を分け、コマンドを自動実行しません。小さなモデルの精度はモデル・量子化・指示によって変わるため、実際の構成で選択試験を行います。

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm_view.py" title="連携側の参照コード（Python標準ライブラリ）"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm-operations.md" title="入力形式と実行側の確認事項"}
::

## 入力と次の操作を構造で確認する

command は実際のコマンド語、arguments は受け付ける引数、missing\_arguments は不足入力です。selector\_choices で対象リソースを選び直すと、その条件に合う要件を取得できます。next の runnable は入力形と未確認条件の状態であり、権限や実行承認の証明ではありません。

## 確認と実行を分ける

モデルに与えるのは必要なメタデータと、利用者が許可した対象・目的です。資格情報の値をモデルへ渡さず、既存の許可範囲で１操作ずつ実行します。変更は計画を確認し、対話の y/yes または明示的な -y/--yes を使います。

## 失敗時は同じ要求を繰り返さない

CONTEXT MISSING は入力、AUTH REJECTED は認証先・期限・主体、ACCESS DENIED はスコープ・同意・ロール・対象を確認します。OUTCOME UNKNOWN は元の操作を読み取りで照合してから判断します。HTTP 403 だけで不足権限を断定せず、権限を自動追加しません。

::document-link{href="/docs/troubleshooting" title="診断キーワードから確認する"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm-operations.md" title="LLM 向け操作仕様"}
::

