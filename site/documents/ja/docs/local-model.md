---
path: "/docs/local-model"
title: "ローカル0.5Bで操作IDを選ぶ"
summary: "GitHubの読み取りに範囲を限定した再現用サンプル。"
kind: "page"
status: "published"
---

## 1. CLI・拡張・モデルを導入

基盤のOS依存を準備し、インストーラーの --local-model を指定します。モデルの保存先や共有ライブラリのパスは補助コマンドが設定するため、開発用ビルドや手動のパス置換は不要です。

```
mkdir -p "$HOME/.local/share/zix/bootstrap"
chmod 700 "$HOME/.local/share/zix/bootstrap"
cd "$HOME/.local/share/zix/bootstrap"
curl --fail --location https://zixcel.com/install.sh -o install.sh
curl --fail --location https://zixcel.com/SHA256SUMS.installer -o SHA256SUMS.installer
sha256sum --check SHA256SUMS.installer
# Inspect install.sh before running.
bash install.sh install --with github --local-model
export PATH="$HOME/.local/bin:$PATH"
zix-setup doctor
zix-local-model --version
```

::document-link{href="/docs/setup" title="OS要件と導入・更新"}
::

## 2. 候補を取得してローカル推論

以下をそのまま実行できます。候補2件、CPU 2スレッド、温度0、回答32トークンに限定した例です。モデルがIDを返す段階までを示します。

```
zix capabilities --namespace github --compact --format json
prompt='<|im_start|>system
Match the final request to one listed ID. Return only the matching identifier.<|im_end|>
<|im_start|>user
CHOICES AND MEANINGS:
user.read: GITHUB IDENTITY READ
repository.read: GITHUB REPOSITORY READ
REQUEST: Read GitHub repository metadata.<|im_end|>
<|im_start|>assistant
'
zix-local-model --no-conversation --no-display-prompt --no-warmup --no-perf --grammar 'root ::= "user.read" | "repository.read"' -p "$prompt" -n 32 -c 4096 -t 2 -tb 2 -ngl 0 --temp 0 --seed 42
```

## 3. 回答を検証する

期待する回答は repository.read。呼び出し側は許可されたID・対象リポジトリを照合します。モデルの回答をシェルへ渡さず、登録済み定義のコマンドと利用者が指定した入力を使います。認証情報の登録と実際の読み取りは次のガイドへ進んでください。

```
zix describe github --operation repository.read --compact --format json
```

::document-link{href="/docs/credentials" title="認証して読み取る"}
::

::document-link{href="https://github.com/zixcel/cli/blob/main/docs/llm_view.py" title="Caller validation reference"}
::

## 確認済みの範囲

0.5Bの既存試験ではGitHubのリポジトリ操作選択は成功しましたが、サービス横断の選択は13問中7問でした。このページは限定した使い方のサンプルで、0.5Bによる全操作の自律実行を保証しません。別途1.5Bでは通常の選択15問が成功しました。入力不足・認証・権限・結果不明はモデルではなくコードで停止判定します。

::document-link{href="/docs/llm" title="設計と停止条件"}
::

