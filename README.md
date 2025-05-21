# GeoGuessr向け国旗当てクイズ

このプロジェクトは、ゲームGeoGuessrのための国旗を当てるためのクイズWebアプリケーションです。

## プロジェクト名

guess-national-flag

## アプリケーション名

GeoGuessr向け国旗当てクイズ

## 技術構成

- Node.js v22.14.0
- TypeScript v5.8
- Vite
- React.js
- Tailwind CSS

## 非機能要件

- Cloudflare Pagesへのデプロイに対応
- スマートフォンでもプレイしやすいタッチ操作対応
- PCとスマホのレスポンシブ対応

## 機能要件

- ページは以下の構成
  - ゲームモード選択画面
  - 問題画面
  - 結果表示画面
  - 暗記モード画面
- ゲームモード選択画面では 10問モード、全国旗モード、暗記モードの3種が選択可能
- スタートボタンを押すとゲーム開始と同時にタイマー起動
- 問題はランダムで出題、問題形式は国旗が表示され4つの選択肢から正解を選ぶもの
- 問題は国旗が表示されて、4つの選択肢の、"ISO 3166-1 コード"と"国または地域"から選択
- 4つの選択肢は登録されている国よりランダムに表示され、正解が一つある
- 問題画面には現在何問中何問目かと現在の経過時刻も表示
- 回答をした瞬間に、それが○×と正解が何だったか表示
- 全ての問題を回答し終えると結果表示ページが表示され得点とタイマーが表示
- 結果表示画面には、過去そのブラウザでやった時の得点とタイマーが表示され、得点 > タイマーで表示され、過去の10個のランキングと得点日時が表示
- これらの過去の記憶はWeb Strageに保存
- 結果表示ページには、それまでに答えた問題の正誤表が表示され、またゲーム選択画面に戻るボタンともう一度挑戦するボタンが表示
- 暗記モード画面では地域ごとに分類された国旗とISOコード、国名を一覧表示

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## デプロイ方法

```bash
# ビルド
npm run build

# Cloudflare Pagesへのデプロイ（基本コマンド）
npx wrangler pages deploy dist

# 特定のプロジェクト名でデプロイする場合
npx wrangler pages deploy dist --project-name=guess-national-flag

# カスタムドメインへのデプロイ（main ブランチ）
npx wrangler pages deploy dist --project-name=guess-national-flag --branch=main

# プロダクション環境への直接デプロイ（メインドメインに反映）
npx wrangler pages deploy dist --project-name=guess-national-flag --branch=production

# 開発環境などへのデプロイ
npx wrangler pages deploy dist --project-name=guess-national-flag --branch=dev

# Windows環境でのデプロイ（パスの問題を解決）
npx wrangler pages deploy ./dist
# または
npx wrangler pages deploy "%CD%\dist"
```

### Windowsでのデプロイ時の注意点

Windows環境で `ENOENT: no such file or directory, scandir 'C:\dist'` のようなエラーが発生する場合は、以下の方法を試してください：

1. 相対パスの前にドットを追加する: `npx wrangler pages deploy ./dist`
2. フルパスを使用する: `npx wrangler pages deploy "%CD%\dist"`
3. PowerShellを使用している場合: `npx wrangler pages deploy "$PWD\dist"`

### 初回デプロイ時の手順

初めてデプロイを実行する場合、以下のように対話形式でプロジェクト設定を行います：

1. `npx wrangler pages deploy ./dist` を実行
2. 「新しいプロジェクトを作成するか、既存のプロジェクトを使用するか」と聞かれたら、新規の場合は `Create a new project` を選択
3. プロジェクト名を入力（例：`guess-national-flag`）
4. デプロイが完了すると、公開URLが表示されます

次回以降のデプロイでは、プロジェクト名を指定することでこの対話をスキップできます：
```bash
npx wrangler pages deploy ./dist --project-name=guess-national-flag
```

### デプロイ時の注意点

1. 初回デプロイ後、メインURL（https://guess-national-flag.pages.dev/）に反映されるまで数分かかる場合があります。
2. デプロイ後は以下のURLで確認できます：
   - プロダクションURL: `https://guess-national-flag.pages.dev/`
   - デプロイ固有URL: `https://[hash].guess-national-flag.pages.dev`
   - ブランチURL: `https://main.guess-national-flag.pages.dev`

### プロダクションURLに更新が反映されない場合

ブランチURL（main.guess-national-flag.pages.dev）には更新が反映されているのに、プロダクションURL（guess-national-flag.pages.dev）に反映されない場合の対処法：

1. **productionブランチに直接デプロイする**（推奨）：
   ```bash
   npx wrangler pages deploy dist --project-name=guess-national-flag --branch=production
   ```
   このコマンドで直接プロダクション環境にデプロイされ、メインドメイン（guess-national-flag.pages.dev）に反映されます。

2. **手動でプロダクションに昇格させる**：
   - Cloudflare ダッシュボード（https://dash.cloudflare.com/）にログイン
   - 「Pages」→「guess-national-flag」プロジェクトを選択
   - 「Deployments」タブで最新のデプロイを見つけ、「...」メニューから「Promote to production」を選択

3. **キャッシュをクリアする**：
   - ブラウザの強制リフレッシュ（Ctrl+Shift+R または Ctrl+F5）を試す
   - プライベートブラウジングウィンドウで開いてみる
   - Cloudflare ダッシュボードから「Caching」→「Purge Cache」でキャッシュをクリア

3. **時間を置く**：
   - Cloudflare のキャッシュ更新やDNS伝播には時間がかかる場合があります（最大1時間程度）

### wrangler.tomlの設定

wrangler.toml の正しい設定例：
```toml
name = "guess-national-flag"
compatibility_date = "2023-11-21"

# Pages向けの設定
pages_build_output_dir = "dist"
```

Cloudflare Dashboardにログインして、ドメイン設定やビルド設定を確認・変更することができます：
https://dash.cloudflare.com/ → Pages → guess-national-flag

## データ一覧

ISO 3166-1 コード・国／地域名・国旗 URLの一覧は `src/data/flags.ts` および追加のフラグファイルに保存されています。
地域情報は `src/data/regionFlags.ts` に保存されています。
国旗の画像は [flagcdn.com](https://flagcdn.com) から取得しています。