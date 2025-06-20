# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語設定 (Language Configuration)

このプロジェクトは日本語環境での動作を前提としています。

- **コミュニケーション**: 日本語で対応してください
- **コメント**: コードコメントは日本語で記述
- **ドキュメント**: 技術文書は日本語で作成
- **エラーメッセージ**: 可能な限り日本語で表示
- **変数名・関数名**: 英語を使用（国際的な慣例に従う）

## プロジェクト概要
GeoGuessr向け国旗当てクイズ。このプロジェクトは、ゲームGeoGuessrのための国旗を当てるためのクイズWebアプリケーションです。


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

バージョンが記載されてないものは開発が行いやすいバージョンを指定して利用してください。
また他にも必要なライブラリやツールがあれば、適宜追加してください。

## 非機能要件

- Cloudflare Pagesへのデプロイに対応
- スマートフォンでもプレイしやすいタッチ操作対応
- PCとスマホのレスポンシブ対応
- README.mdに開発環境のセットアップ手順を記載
- README.mdにwranglerを利用したCloudflare Workersへのデプロイ手順を記載
- .gitignoreファイルを作成し、Gitで構成管理できるようにする
- ヨーロッパの言語の文字がわかりやすいフォントの利用

## 機能要件

- ページは以下の構成
  - ゲームモード選択画面
  - 問題画面
  - 結果表示画面
  - 暗記モード画面
- ゲームモード選択画面では 国旗10問モード、ISOコード10問モード、全国旗モード、暗記モードの4種が選択可能
- スタートボタンを押すとゲーム開始と同時にタイマー起動
- 問題はランダムで出題、問題形式は以下の2種類
  - 国旗10問モード・全国旗モード：国旗が表示され4つの選択肢から正解の国名を選ぶ
  - GeoGuessr向けモード: GeoGuessrに対応している国旗が表示され、4つの選択肢から正解の国名を選ぶ
  - ISOコード10問モード：ISO 3166-1 コード(国際ドメイン)が表示され、選択肢には国旗と国名が表示され、正解の国を選ぶ
- 選択肢の表示形式：
  - 国旗10問モード・全国旗モード："ISO 3166-1 コード"と"国または地域"を表示
  - ISOコード10問モード：国旗と"国または地域"を表示、GioGuessr対応国のみも表示可能
- 4つの選択肢は登録されている国よりランダムに表示され、正解が一つある
- 問題画面には現在何問中何問目かと現在の経過時刻も表示
- 回答をした瞬間に、それが○×と正解が何だったか表示
- 全ての問題を回答し終えると結果表示ページが表示され得点とタイマーが表示
- 結果表示画面には、過去そのブラウザでやった時の得点とタイマーが表示され、得点 > タイマーで表示され、過去の10個のランキングと得点日時が表示
- これらの過去の記憶はWeb Strageに保存
- 結果表示ページには、それまでに答えた問題の正誤表が表示され、またゲーム選択画面に戻るボタンともう一度挑戦するボタンが表示
- 暗記モード画面では地域ごとに分類された国旗とISOコード、国名を一覧表示
- 国旗情報に関しては、[Flags API & CDN](https://flagcdn.com/) を利用する
- ogpタグを設定し、ゲームのタイトルと説明文を設定
- ファビコンを設定、日本の旗を希望

## データについて

このアプリケーションで使用している国/地域データは、2025/05/22時点の Google Maps がサポートしている国/地域リスト（[Google ビジネス プロフィール - サポートされている国/地域](https://support.google.com/business/answer/6270107?hl=ja)）をもとに作成しています。

## データ一覧

ISO 3166-1 コード・国／地域名・国旗 URLの一覧は `src/data/flags.ts` および追加のフラグファイルに保存されています。
地域情報は `src/data/regionFlags.ts` に保存されています。
国旗の画像は [flagcdn.com](https://flagcdn.com) から取得しています。

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
