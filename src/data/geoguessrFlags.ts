import type { Flag } from './flags';
import { allFlags } from './allFlags';

// GeoGuessr対応国のISOコードリスト（2025年6月20日時点）
// https://www.geometas.com/learn/geoguessr_country_coverage より
const GEOGUESSR_COUNTRY_CODES = [
  // 西ヨーロッパ (17カ国)
  'AD', // アンドラ
  'AT', // オーストリア
  'BE', // ベルギー
  'FR', // フランス
  'DE', // ドイツ
  'GR', // ギリシャ
  'IE', // アイルランド
  'IM', // マン島
  'IT', // イタリア
  'LU', // ルクセンブルク
  'MT', // マルタ
  'MC', // モナコ
  'NL', // オランダ
  'PT', // ポルトガル
  'ES', // スペイン
  'CH', // スイス
  'GB', // イギリス

  // 東ヨーロッパ (14カ国)
  'AL', // アルバニア
  'BG', // ブルガリア
  'HR', // クロアチア
  'CZ', // チェコ共和国  
  'HU', // ハンガリー
  'ME', // モンテネグロ
  'MK', // 北マケドニア
  'PL', // ポーランド
  'RO', // ルーマニア
  'RU', // ロシア
  'RS', // セルビア
  'SK', // スロバキア
  'SI', // スロベニア
  'UA', // ウクライナ

  // 北欧 (7カ国)
  'DK', // デンマーク
  'FO', // フェロー諸島
  'FI', // フィンランド
  'GL', // グリーンランド
  'IS', // アイスランド
  'NO', // ノルウェー
  'SE', // スウェーデン

  // バルト三国 (3カ国)
  'EE', // エストニア
  'LV', // ラトビア
  'LT', // リトアニア

  // ラテンアメリカ (16カ国)
  'AR', // アルゼンチン
  'BO', // ボリビア
  'BR', // ブラジル
  'CL', // チリ
  'CO', // コロンビア
  'CR', // コスタリカ
  'CW', // キュラソー
  'DO', // ドミニカ共和国
  'EC', // エクアドル
  'GT', // グアテマラ
  'MX', // メキシコ
  'PA', // パナマ
  'PE', // ペルー
  'PR', // プエルトリコ
  'UY', // ウルグアイ
  'VI', // アメリカ領ヴァージン諸島

  // 北米 (3カ国)
  'BM', // バミューダ
  'CA', // カナダ
  'US', // アメリカ合衆国

  // 南・東南アジア (14カ国)
  'BD', // バングラデシュ
  'BT', // ブータン
  'KH', // カンボジア
  'CX', // クリスマス島
  'IN', // インド
  'ID', // インドネシア
  'LA', // ラオス
  'MY', // マレーシア
  'PK', // パキスタン
  'PH', // フィリピン
  'SG', // シンガポール
  'LK', // スリランカ
  'TH', // タイ
  'VN', // ベトナム

  // その他のアジア (8カ国)
  'CN', // 中国
  'HK', // 香港
  'JP', // 日本
  'KZ', // カザフスタン
  'KG', // キルギスタン
  'MN', // モンゴル
  'KR', // 韓国
  'TW', // 台湾

  // オセアニア (6カ国)
  'AS', // アメリカ領サモア
  'AU', // オーストラリア
  'GU', // グアム
  'NZ', // ニュージーランド
  'MP', // 北マリアナ諸島
  'UM', // アメリカ合衆国小離島

  // アフリカ (12カ国)
  'BW', // ボツワナ
  'SZ', // エスワティニ
  'GH', // ガーナ
  'KE', // ケニア
  'LS', // レソト
  'MG', // マダガスカル
  'NG', // ナイジェリア
  'RE', // レユニオン
  'RW', // ルワンダ
  'SN', // セネガル
  'ZA', // 南アフリカ
  'UG', // ウガンダ

  // 中東 (7カ国)
  'IL', // イスラエル
  'JO', // ヨルダン
  'PS', // パレスチナ
  'QA', // カタール
  'TN', // チュニジア
  'TR', // トルコ
  'AE', // アラブ首長国連邦
];

// GeoGuessr対応国の国旗データを抽出
export const geoguessrFlags: Flag[] = allFlags.filter(flag => 
  GEOGUESSR_COUNTRY_CODES.includes(flag.code)
);

// 地域別のGeoGuessr対応国フラグ
export const geoguessrFlagsByRegion = {
  '西ヨーロッパ': allFlags.filter(flag => ['AD', 'AT', 'BE', 'FR', 'DE', 'GR', 'IE', 'IM', 'IT', 'LU', 'MT', 'MC', 'NL', 'PT', 'ES', 'CH', 'GB'].includes(flag.code)),
  '東ヨーロッパ': allFlags.filter(flag => ['AL', 'BG', 'HR', 'CZ', 'HU', 'ME', 'MK', 'PL', 'RO', 'RU', 'RS', 'SK', 'SI', 'UA'].includes(flag.code)),
  '北欧': allFlags.filter(flag => ['DK', 'FO', 'FI', 'GL', 'IS', 'NO', 'SE'].includes(flag.code)),
  'バルト三国': allFlags.filter(flag => ['EE', 'LV', 'LT'].includes(flag.code)),
  'ラテンアメリカ': allFlags.filter(flag => ['AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CW', 'DO', 'EC', 'GT', 'MX', 'PA', 'PE', 'PR', 'UY', 'VI'].includes(flag.code)),
  '北米': allFlags.filter(flag => ['BM', 'CA', 'US'].includes(flag.code)),
  '南・東南アジア': allFlags.filter(flag => ['BD', 'BT', 'KH', 'CX', 'IN', 'ID', 'LA', 'MY', 'PK', 'PH', 'SG', 'LK', 'TH', 'VN'].includes(flag.code)),
  'その他のアジア': allFlags.filter(flag => ['CN', 'HK', 'JP', 'KZ', 'KG', 'MN', 'KR', 'TW'].includes(flag.code)),
  'オセアニア': allFlags.filter(flag => ['AS', 'AU', 'GU', 'NZ', 'MP', 'UM'].includes(flag.code)),
  'アフリカ': allFlags.filter(flag => ['BW', 'SZ', 'GH', 'KE', 'LS', 'MG', 'NG', 'RE', 'RW', 'SN', 'ZA', 'UG'].includes(flag.code)),
  '中東': allFlags.filter(flag => ['IL', 'JO', 'PS', 'QA', 'TN', 'TR', 'AE'].includes(flag.code)),
};

console.log(`GeoGuessr対応国数: ${geoguessrFlags.length} / 107期待数`);
console.log('地域別対応国数:', Object.entries(geoguessrFlagsByRegion).map(([region, flags]) => `${region}: ${flags.length}`));