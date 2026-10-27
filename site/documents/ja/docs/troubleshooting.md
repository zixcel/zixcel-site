---
path: "/docs/troubleshooting"
title: "操作が止まったとき"
summary: "エラーと不足情報を区別して、必要な確認へ進みます。"
label: "操作が止まったとき"
kind: "page"
category: ""
status: "published"
---

## CONTEXT MISSING

missing\_arguments、対象、プロファイル、認証情報の登録先を確認します。権限追加では解決しない入力不足を先に埋めます。

## AUTH REJECTED / ACCESS DENIED

前者は認証先・期限・主体を確認します。後者は対象範囲、スコープ、管理者同意、ロールを必要条件と照合します。関連コマンドの required\_context が未確認なら先に解決してください。

## EVIDENCE INCOMPLETE

部分取得の result は残ります。終了コード 2 を空データや全体の成功に読み替えず、未取得の範囲を確認します。

## OUTCOME UNKNOWN

元の受領結果・計画・ジャーナルを保持し、案内された読み取りで現在値を照合します。応答が不明だからといって apply や削除を繰り返しません。

## 詳しい定義へ戻る

diagnostic.inspect\_argv をそのまま使うと、選択したリソースを維持した詳細定義を確認できます。秘密値や通信ヘッダーを公開の問い合わせに貼り付ける必要はありません。

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/operation-guidance.md" title="共通診断の仕様"}
::

::document-link{href="/tools" title="対象拡張のガイドへ"}
::

