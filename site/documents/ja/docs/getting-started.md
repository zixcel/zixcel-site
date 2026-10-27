---
path: "/docs/getting-started"
title: "zix を使い始める"
summary: "Linux / WSL 向け正式パッケージを導入し、最初の操作を確認します。"
label: "zix を使い始める"
kind: "page"
category: ""
status: "published"
---

## 1. 基盤を導入する

基盤インストーラーが検証用gh・正式版zix・選択した拡張を導入します。対応OSとPython・libsecretの準備を確認し、まず共通手順から始めてください。任意で0.5B環境も導入できます。

::document-link{href="/docs/setup" title="基盤のインストールと更新"}
::

::document-link{href="https://github.com/zixcel/cli" title="CLIの公開ソース"}
::

## 2. 拡張を１つ登録する

zix 本体はサービス別コマンドを一括内蔵しません。使う拡張の正式パッケージを取得し、extensions add で登録します。最初は GitHub の読み取り拡張を例に進められます。

::document-link{href="/docs/extensions" title="GitHub 拡張を登録する"}
::

::document-link{href="/tools" title="ほかの拡張を選ぶ"}
::

## 3. まずローカルで要件を確認する

下記は拡張の登録後に使えます。サービスへの通信も資格情報の読み取りも行いません。missing\_arguments に残る入力と、必要な認証先・権限を確認します。

```
zix capabilities --compact --format json
zix capabilities --namespace github --compact --format json
zix describe github --operation repository.read --compact --format json
```

## 4. 認証情報を保管し、１操作を実行する

必要な権限を持つ認証情報をローカル端末から登録します。秘密値をチャットへ渡す必要はありません。登録情報に結び付いた credential run の例へ進んでください。

::document-link{href="/docs/credentials" title="認証情報の登録と読み取り例"}
::

::document-link{href="/docs/troubleshooting" title="停止したときの確認"}
::

