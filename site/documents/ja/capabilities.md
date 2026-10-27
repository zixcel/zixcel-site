---
path: "/capabilities"
title: "機能から探す"
summary: "目的から機能を選び、対応するリポジトリと導入手順へ進めます。"
kind: "page"
label: "機能から探す"
category: ""
status: "published"
---

## データと文書

表示データの構築と、文書の解析・構造化・変換。

::document-link{title="対応ライブラリと使い方" href="/capabilities/data-documents"}
::

::document-link{title="data-presentation" href="https://github.com/zixcel/data-presentation" summary="表示データの構築・更新・配信を機能単位で利用する基盤。"}
::

::document-link{title="document-processing" href="https://github.com/zixcel/document-processing" summary="文書の解析・構造化・変換を扱う汎用モノレポ。"}
::

## 状態と情報構造

グラフ、変更履歴、ドメイン名の階層を扱う基盤。

::document-link{title="対応ライブラリと使い方" href="/capabilities/state-history"}
::

::document-link{title="zixcel-graph" href="https://github.com/zixcel/zixcel-graph" summary="データ間の関係をスナップショットで保存し、変更の競合を検出する。"}
::

::document-link{title="zixcel-revision" href="https://github.com/zixcel/zixcel-revision" summary="不変の変更履歴を保持し、更新や再試行の整合性を確認する。"}
::

## 外部サービス連携

クラウド、GitHub、ドメイン、メールの操作要求と接続設定を扱う。

::document-link{title="対応ライブラリと使い方" href="/capabilities/integrations"}
::

::document-link{title="zixcel-domain" href="https://github.com/zixcel/zixcel-domain" summary="ValueDomainのドメイン一覧、DNSの確認とCloudflareへの変更計画を扱うライブラリ・CLI。"}
::

::document-link{title="zixcel-cloudflare" href="https://github.com/zixcel/zixcel-cloudflare" summary="Cloudflare向けの操作要求を、対象・権限・入力を明示して組み立てる。"}
::

## 認証とアカウント

認証フロー、WebAuthn、アカウント復旧を利用アプリに組み込む。

::document-link{title="対応ライブラリと使い方" href="/capabilities/identity"}
::

::document-link{title="zixcel-github-auth" href="https://github.com/zixcel/zixcel-github-auth" summary="GitHub Device Flowを、明示したクライアント登録に沿って組み込む。"}
::

::document-link{title="zixcel-openai-auth" href="https://github.com/zixcel/zixcel-openai-auth" summary="外部から渡した通信手段で、OpenAIの認証フローを組み立てる。"}
::

## ローカルAI

推論環境の確認、モデルの準備、変換の実験と費用見積もり。

::document-link{title="対応ライブラリと使い方" href="/capabilities/local-ai"}
::

::document-link{title="zixcel-local-inference" href="https://github.com/zixcel/zixcel-local-inference" summary="利用側が推論を開始する前に、ローカルモデルの配布物を準備・検査する。"}
::

::document-link{title="devino" href="https://github.com/zixcel/devino" summary="モデル変換やローカル推論の構成を試すための実験用ツール。"}
::

## アプリ連携の基盤

操作やサービスの関係、公開メタデータを構造化してアプリへ渡す。

::document-link{title="対応ライブラリと使い方" href="/capabilities/interaction"}
::

::document-link{title="zixcel-contracts" href="https://github.com/zixcel/zixcel-contracts" summary="要求・結果・サービス境界を検査するための共通の型を提供する。"}
::

::document-link{title="zixcel-interaction" href="https://github.com/zixcel/zixcel-interaction" summary="リソースの読取・操作・状態変更を、型付きの要求と結果で表す。"}
::

## 開発と配布の道具

ソースの証跡、変更確認、公開前検査と配布物の管理。

::document-link{title="対応ライブラリと使い方" href="/capabilities/developer-tools"}
::

::document-link{title="zixcel-source-evidence" href="https://github.com/zixcel/zixcel-source-evidence" summary="ソースの観測情報をリビジョンと結び付け、根拠を検索する。"}
::

::document-link{title="zixcel-version-control" href="https://github.com/zixcel/zixcel-version-control" summary="ローカルのバージョン管理状態を読み取り、変更の根拠を得る。"}
::

