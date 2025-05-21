import type { Flag } from './flags';

export interface RegionFlag {
  regionName: string;
  flags: string[]; // ISO alpha-2 codes
}

export const regions: RegionFlag[] = [
  {
    regionName: "北ヨーロッパ",
    flags: ["IS", "IE", "AX", "GB", "DK", "NO", "SJ", "SE", "FI", "FO", "GL"]
  },
  {
    regionName: "西ヨーロッパ",
    flags: ["AD", "BE", "FR", "DE", "GG", "IE", "IM", "IT", "JE", "LI", "LU", "MC", "NL", "PT", "SM", "ES", "CH", "GB", "VA", "GI"]
  },
  {
    regionName: "東ヨーロッパ",
    flags: ["AL", "AM", "AZ", "BY", "BA", "BG", "HR", "CZ", "EE", "GE", "HU", "LV", "LT", "MK", "MD", "ME", "PL", "RO", "RS", "SK", "SI", "UA", "AT"]
  },
  {
    regionName: "中央ヨーロッパ",
    flags: ["HU"]
  },
  {
    regionName: "地中海地域",
    flags: ["CY", "MT"]
  },
  {
    regionName: "中東",
    flags: ["AF", "AE", "BH", "IL", "IQ", "IR", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"]
  },
  {
    regionName: "北アフリカ",
    flags: ["DZ", "EG", "LY", "MA", "TN"]
  },
  {
    regionName: "西アフリカ",
    flags: ["BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG", "EH"]
  },
  {
    regionName: "中央アフリカ",
    flags: ["AO", "CM", "CF", "TD", "CG", "CD", "GQ", "GA", "ST", "RW", "BI", "UG"]
  },
  {
    regionName: "東アフリカ",
    flags: ["DJ", "ER", "ET", "KE", "SO", "SD", "SS", "TZ"]
  },
  {
    regionName: "南アフリカ",
    flags: ["BW", "LS", "MW", "MZ", "NA", "ZA", "SZ", "ZM", "ZW"]
  },
  {
    regionName: "北アメリカ",
    flags: ["CA", "US", "PM", "BM"]
  },
  {
    regionName: "中央アメリカ",
    flags: ["AG", "AI", "AW", "BB", "BL", "VG", "KY", "CU", "CW", "DM", "DO", "SV", "GP", "GD", "GT", "HT", "HN", "JM", "MF", "MQ", "MX", "MS", "NI", "PA", "PR", "KN", "LC", "VC", "SX", "BS", "TC", "TT", "VG", "VI", "BQ", "BZ"]
  },
  {
    regionName: "南アメリカ",
    flags: ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PY", "PE", "GS", "SR", "UY", "VE"]
  },
  {
    regionName: "中央アジア",
    flags: ["KZ", "KG", "TJ", "TM", "UZ"]
  },
  {
    regionName: "南アジア",
    flags: ["BD", "BT", "IN", "LK", "MV", "NP", "PK"]
  },
  {
    regionName: "東アジア",
    flags: ["CN", "HK", "JP", "KP", "KR", "MO", "MN", "TW"]
  },
  {
    regionName: "東南アジア",
    flags: ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"]
  },
  {
    regionName: "オセアニア",
    flags: ["AS", "AU", "CK", "FJ", "PF", "GU", "KI", "MH", "FM", "NR", "NC", "NZ", "NU", "NF", "MP", "PW", "PG", "PN", "WS", "SB", "TK", "TO", "TV", "UM", "VU", "WF", "CX", "HM"]
  },
  {
    regionName: "インド洋地域",
    flags: ["IO", "CC", "KM", "MG", "MU", "YT", "RE", "SC", "TF"]
  },
  {
    regionName: "ロシア",
    flags: ["RU"]
  },
  {
    regionName: "南極",
    flags: ["AQ", "BV"]
  }
];

// コードから地域名を引くためのマップを作成
export const codeToRegionMap: Record<string, string> = {};

regions.forEach(region => {
  region.flags.forEach(code => {
    codeToRegionMap[code] = region.regionName;
  });
});

// 地域名でフラグをグループ化する関数
export const groupFlagsByRegion = (flags: Flag[]): Record<string, Flag[]> => {
  const groupedFlags: Record<string, Flag[]> = {};
  
  // 初期化
  regions.forEach(region => {
    groupedFlags[region.regionName] = [];
  });
  
  // フラグを地域ごとに分類
  flags.forEach(flag => {
    const region = codeToRegionMap[flag.code] || "その他";
    if (!groupedFlags[region]) {
      groupedFlags[region] = [];
    }
    groupedFlags[region].push(flag);
  });
  
  return groupedFlags;
}; 