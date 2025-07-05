import type { Flag } from './flags';
import { allFlags } from './allFlags';

// GeoGuessr対応国のISOコードリスト（2025年7月6日時点）
// https://www.plonkit.net/guide より
const GEOGUESSR_COUNTRY_CODES = [
  // アフリカ (18カ国)
  'BW', // ボツワナ
  'EG', // エジプト
  'SZ', // エスワティニ
  'GH', // ガーナ
  'KE', // ケニア
  'LS', // レソト
  'MG', // マダガスカル
  'ML', // マリ
  'NA', // ナミビア
  'NG', // ナイジェリア
  'RE', // レユニオン
  'RW', // ルワンダ
  'ST', // サントメ・プリンシペ
  'SN', // セネガル
  'ZA', // 南アフリカ
  'TZ', // タンザニア
  'TN', // チュニジア
  'UG', // ウガンダ

  // 南極 (2カ国)
  'AQ', // 南極
  'GS', // サウスジョージア・サウスサンドウィッチ諸島

  // アジア (23カ国)
  'BD', // バングラデシュ
  'BT', // ブータン
  'IO', // イギリス領インド洋地域
  'KH', // カンボジア
  'CN', // 中国
  'HK', // 香港
  'IN', // インド
  'ID', // インドネシア
  'JP', // 日本
  'KZ', // カザフスタン
  'KG', // キルギスタン
  'LA', // ラオス
  'MO', // マカオ
  'MY', // マレーシア
  'MN', // モンゴル
  'NP', // ネパール
  'PK', // パキスタン
  'PH', // フィリピン
  'SG', // シンガポール
  'KR', // 韓国
  'LK', // スリランカ
  'TW', // 台湾
  'TH', // タイ

  // 中東 (8カ国)
  'IQ', // イラク
  'IL', // イスラエル・西岸地区
  'JO', // ヨルダン
  'LB', // レバノン
  'OM', // オマーン
  'QA', // カタール
  'TR', // トルコ
  'AE', // アラブ首長国連邦

  // ヨーロッパ (38カ国)
  'AL', // アルバニア
  'AD', // アンドラ
  'AT', // オーストリア
  'BY', // ベラルーシ
  'BE', // ベルギー
  'BG', // ブルガリア
  'HR', // クロアチア
  'CY', // キプロス
  'CZ', // チェコ
  'DK', // デンマーク
  'EE', // エストニア
  'FO', // フェロー諸島
  'FI', // フィンランド
  'FR', // フランス
  'DE', // ドイツ
  'GI', // ジブラルタル
  'GR', // ギリシャ
  'HU', // ハンガリー
  'IS', // アイスランド
  'IE', // アイルランド
  'IM', // マン島
  'IT', // イタリア
  'JE', // ジャージー
  'LV', // ラトビア
  'LI', // リヒテンシュタイン
  'LT', // リトアニア
  'LU', // ルクセンブルク
  'MT', // マルタ
  'MC', // モナコ
  'ME', // モンテネグロ
  'NL', // オランダ
  'MK', // 北マケドニア
  'NO', // ノルウェー
  'PL', // ポーランド
  'PT', // ポルトガル（アゾレス・マデイラ含む）
  'RO', // ルーマニア
  'RU', // ロシア
  'SM', // サンマリノ
  'RS', // セルビア
  'SK', // スロバキア
  'SI', // スロベニア
  'ES', // スペイン
  'SJ', // スバールバル諸島
  'SE', // スウェーデン
  'CH', // スイス
  'UA', // ウクライナ
  'GB', // イギリス

  // 北アメリカ (12カ国)
  'BM', // バミューダ
  'CA', // カナダ
  'CR', // コスタリカ
  'DO', // ドミニカ共和国
  'GL', // グリーンランド
  'GT', // グアテマラ
  'MQ', // マルティニーク
  'MX', // メキシコ
  'PA', // パナマ
  'PR', // プエルトリコ
  'PM', // サンピエール・ミクロン
  'US', // アメリカ合衆国（アラスカ・ハワイ含む）
  'UM', // アメリカ合衆国小離島
  'VI', // アメリカ領ヴァージン諸島

  // オセアニア (9カ国)
  'AS', // アメリカ領サモア
  'AU', // オーストラリア
  'CX', // クリスマス島
  'CC', // ココス諸島
  'GU', // グアム
  'NZ', // ニュージーランド
  'MP', // 北マリアナ諸島
  'PN', // ピトケアン諸島
  'VU', // バヌアツ

  // 南アメリカ (10カ国)
  'AR', // アルゼンチン
  'BO', // ボリビア
  'BR', // ブラジル
  'CL', // チリ
  'CO', // コロンビア
  'CW', // キュラソー
  'EC', // エクアドル
  'FK', // フォークランド諸島
  'PE', // ペルー
  'UY', // ウルグアイ
];

// GeoGuessr対応国の国旗データを抽出
export const geoguessrFlags: Flag[] = allFlags.filter(flag => 
  GEOGUESSR_COUNTRY_CODES.includes(flag.code)
);

// 地域別のGeoGuessr対応国フラグ
export const geoguessrFlagsByRegion = {
  'アフリカ': allFlags.filter(flag => ['BW', 'EG', 'SZ', 'GH', 'KE', 'LS', 'MG', 'ML', 'NA', 'NG', 'RE', 'RW', 'ST', 'SN', 'ZA', 'TZ', 'TN', 'UG'].includes(flag.code)),
  '南極': allFlags.filter(flag => ['AQ', 'GS'].includes(flag.code)),
  'アジア': allFlags.filter(flag => ['BD', 'BT', 'IO', 'KH', 'CN', 'HK', 'IN', 'ID', 'JP', 'KZ', 'KG', 'LA', 'MO', 'MY', 'MN', 'NP', 'PK', 'PH', 'SG', 'KR', 'LK', 'TW', 'TH'].includes(flag.code)),
  '中東': allFlags.filter(flag => ['IQ', 'IL', 'JO', 'LB', 'OM', 'QA', 'TR', 'AE'].includes(flag.code)),
  'ヨーロッパ': allFlags.filter(flag => ['AL', 'AD', 'AT', 'BY', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FO', 'FI', 'FR', 'DE', 'GI', 'GR', 'HU', 'IS', 'IE', 'IM', 'IT', 'JE', 'LV', 'LI', 'LT', 'LU', 'MT', 'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SJ', 'SE', 'CH', 'UA', 'GB'].includes(flag.code)),
  '北アメリカ': allFlags.filter(flag => ['BM', 'CA', 'CR', 'DO', 'GL', 'GT', 'MQ', 'MX', 'PA', 'PR', 'PM', 'US', 'UM', 'VI'].includes(flag.code)),
  'オセアニア': allFlags.filter(flag => ['AS', 'AU', 'CX', 'CC', 'GU', 'NZ', 'MP', 'PN', 'VU'].includes(flag.code)),
  '南アメリカ': allFlags.filter(flag => ['AR', 'BO', 'BR', 'CL', 'CO', 'CW', 'EC', 'FK', 'PE', 'UY'].includes(flag.code)),
};

console.log(`GeoGuessr対応国数: ${geoguessrFlags.length} / 131期待数`);
console.log('地域別対応国数:', Object.entries(geoguessrFlagsByRegion).map(([region, flags]) => `${region}: ${flags.length}`));