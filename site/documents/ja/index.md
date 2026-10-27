---
path: "/"
title: "小さなローカルAIから、\n手元の道具を使う。"
summary: "0.5Bモデルには短い操作IDだけを選ばせ、zixが入力と必要条件を示す。GitHubの読み取りを題材に、ローカルで始める手順を紹介します。"
kind: "home"
label: "Zixcel"
category: ""
status: "published"
---

## 1. GitHub拡張を導入する

まずOS依存を準備し、共通インストーラーで正式版CLI・GitHub拡張・任意の0.5B環境を導入します。既存のghや開発環境は不要です。

::document-link{href="/docs/setup" title="基盤をまとめて導入"}
::

::document-link{href="/tools/github" title="GitHubのインストール"}
::

## 2. 0.5Bには短い候補を渡す

例：公開リポジトリの情報を確認したい。JSON全体や秘密値を渡さず、定義から抽出したIDと意味を入力します。

```
CHOICES AND MEANINGS:
user.read: GITHUB IDENTITY READ
repository.read: GITHUB REPOSITORY READ
REQUEST: Read GitHub repository metadata.

# Example answer: repository.read
```

::document-link{href="/docs/local-model" title="ローカル0.5Bの実行手順と制限"}
::

## 3. zixで確かめてから操作する

呼び出し側が候補IDと許可済み対象を照合し、zixの操作定義で入力・認証・権限を確認します。失敗時の再試行や権限追加はモデルに任せません。

```
zix describe github --operation repository.read --compact --format json
```

::document-link{href="/docs/llm" title="呼び出し側の実装"}
::

