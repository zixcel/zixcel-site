---
path: "/docs/setup"
title: "ローカル基盤を導入・更新する"
summary: "依存ツール、zix、拡張、任意の0.5B環境までを正式配布から準備します。"
kind: "page"
status: "published"
---

## 1. 対応環境とOSの準備

Linux x86\_64・glibc 2.39以降（Ubuntu 24.04以降、WSL2を含む）、Bash、Python 3.12以降、curl、CA証明書、libsecretが必要です。以下はUbuntu 24.04の例です。既存のgh、GitHubログイン、Rust、Nodeは不要です。

```
sudo apt-get update
sudo apt-get install -y --no-install-recommends python3 curl ca-certificates libsecret-1-0 gnome-keyring dbus-user-session
```

## 2. インストーラーを確認して実行

ログインユーザーとして、sudoを付けずに実行します。検証用ghを専用領域へ導入し、最新安定版のzixと指定した拡張を取得します。チェックサム・配布元の署名付き来歴・ソース・タグ・内容を検証してから有効化します。最初のスクリプトはこのHTTPSサイトを信頼して取得する入口で、同じ配布元のチェックサムだけでは独立した真正性の証明にはなりません。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with github
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
```

::document-link{href="https://github.com/zixcel/cli/releases/tag/installer/v0.1.0" title="インストーラー正式配布・来歴"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/setup.md" title="実装・保存先・信頼境界"}
::

## 3. 最新版への更新と拡張追加

updateはインストーラー・検証用gh・zixと登録済みの対応拡張を更新します。新規導入は有効、既存拡張の有効／無効は維持します。未知の第三者拡張は変更しません。各パッケージ単位の更新であり、途中停止時は完了した更新と記録を保持します。自動的なダウングレードは行いません。

```
zix-setup update
zix-setup install --with domain,microsoft
zix extensions list --format json
```

::document-link{href="/tools" title="拡張ごとの機能・導入手順"}
::

## 4. 任意で0.5Bサンプル環境も導入

--local-modelを指定すると、検証済みのllama.cpp b11913とQwen2.5-0.5B q8\_0も公式配布から取得し、SHA256を照合します。作業中は約2GBの空き容量を用意し、メモリー4GB以上の端末を推奨します。zix-local-modelはモデルとライブラリのパスを設定する外部補助コマンドです。モデルとランタイムは検証済みの組み合わせに固定し、未試験の最新版へ自動置換しません。

```
zix-setup install --with github --local-model
zix-local-model --version
```

::document-link{href="/docs/local-model" title="0.5Bサンプルを実行"}
::

## 5. PATHと認証ストアを確認

doctorは外部通信や秘密値の参照をせず、PATH・バージョン・D-Bus・Secret Serviceの稼働状況を確認します。Secret Serviceの存在はコレクションの解錠や認証成功を保証しません。WSLやヘッドレス環境ではログインセッションの認証ストアを別途準備してください。OSパッケージの導入だけでは準備完了になりません。PATHは現在のシェルに設定し、必要に応じて自身のシェル設定へ追加します。 デスクトップでは「パスワードと鍵」（Seahorse。未導入なら sudo apt-get install seahorse）で、パスワード付きの永続キーリングを既定に設定し、解錠してください。認証登録の前に zix credential status --collection default で確認できます。

```
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
```

::document-link{href="/docs/credentials" title="サービス認証を登録"}
::

## 6. 保存・復旧・停止時の扱い

パッケージは \~/.local/share/zix/packages、補助ツール・任意モデル・導入記録は \~/.local/share/zix/setup に保存します。一時ダウンロードは終了時に削除し、以前の版はロールバック用に保持します。権限不足やAPI制限は診断に従って確認し、設定を推測して変えたり失敗要求を連続再試行したりしません。

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/setup.md" title="固定バージョン・ロールバック・削除"}
::

