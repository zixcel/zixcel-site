---
path: "/tools"
title: "対応サービスと拡張"
summary: "サービス別の機能を選び、正式配布・操作ガイドへ進みます。"
label: "対応サービスと拡張"
kind: "page"
category: ""
status: "published"
---

## zix domain

ValueDomain のドメイン参照、公開 DNS、委任確認、DNS 変更計画と実行。レジストラと DNS 管理先を確認して選びます。 正式版 0.4.1。

::document-link{href="/tools/domain" title="インストール・機能一覧・使い方"}
::

## zix cloudflare

アカウント・DNS の読み取りと、明示した範囲の構成観測。DNS 専用操作は Workers や Pages の一覧を取得しません。 正式版 0.3.1。

::document-link{href="/tools/cloudflare" title="インストール・機能一覧・使い方"}
::

## zix microsoft

Microsoft Graph と Exchange Online の管理。認証先、必要なスコープ、同意、RBAC、対象を操作ごとに確認します。 正式版 0.5.1。

::document-link{href="/tools/microsoft" title="インストール・機能一覧・使い方"}
::

## zix github

認証ユーザーと、選択したリポジトリの基本情報を読み取ります。Issue や PR の更新機能としては案内していません。 正式版 0.2.0。

::document-link{href="/tools/github" title="インストール・機能一覧・使い方"}
::

## zix docker

Docker Hub のリポジトリ・タグ、公的一覧の観測と、確認した対象だけの削除計画。削除結果が不明なら読み取りで再確認します。 正式版 0.3.0。

::document-link{href="/tools/docker" title="インストール・機能一覧・使い方"}
::

## zix azure

選択した Azure サブスクリプションと、認証情報から見えるサブスクリプション一覧の参照。 正式版 0.2.0。

::document-link{href="/tools/azure" title="インストール・機能一覧・使い方"}
::

## zix apple

App Store Connect のアプリ情報と、API キーから見えるアプリ一覧の参照。 正式版 0.2.0。

::document-link{href="/tools/apple" title="インストール・機能一覧・使い方"}
::

## zix google

プロジェクト、IAM キー、リソース一覧、既存の請求エクスポートの読み取り。API 有効化や SQL ジョブの作成は行いません。 正式版 0.7.0。

::document-link{href="/tools/google" title="インストール・機能一覧・使い方"}
::

## zix wordpress

HTTPS オリジンに結び付いた OS 認証ストアを使い、記事・固定ページ・メディアの参照と、確認付きの変更を扱います。 正式版 0.4.1。

::document-link{href="/tools/wordpress" title="インストール・機能一覧・使い方"}
::

## 利用口を確かめる

上記は公開した Zix 拡張の範囲です。AWS、LINE、メール処理などのライブラリは別の利用口を持ち、zix のコマンドがあるものとして扱いません。

::document-link{href="/docs/extensions" title="拡張の導入"}
::

::document-link{href="/oss" title="その他のライブラリ"}
::

