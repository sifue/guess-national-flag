import { flags } from './flags';
import { additionalFlags1 } from './additionalFlags1';
import { additionalFlags2 } from './additionalFlags2';
import { additionalFlags3 } from './additionalFlags3';
import { additionalFlags4 } from './additionalFlags4';
import { additionalFlags5 } from './additionalFlags5';
import { additionalFlags6 } from './additionalFlags6';

// データが正しく読み込まれたか確認
console.log('Flags loaded:', {
  flags: flags.length,
  additionalFlags1: additionalFlags1.length,
  additionalFlags2: additionalFlags2.length,
  additionalFlags3: additionalFlags3.length,
  additionalFlags4: additionalFlags4.length,
  additionalFlags5: additionalFlags5.length,
  additionalFlags6: additionalFlags6.length
});

// 重複チェック用のコード
const allCodes = new Set();
let duplicates = 0;

// すべての国旗データを統合
export const allFlags = [
  ...flags,
  ...additionalFlags1,
  ...additionalFlags2,
  ...additionalFlags3,
  ...additionalFlags4,
  ...additionalFlags5,
  ...additionalFlags6
];

// 重複チェック
allFlags.forEach(flag => {
  if (allCodes.has(flag.code)) {
    duplicates++;
    console.warn(`Duplicate flag code: ${flag.code} - ${flag.name}`);
  } else {
    allCodes.add(flag.code);
  }
});

console.log(`Total flags: ${allFlags.length}, unique codes: ${allCodes.size}, duplicates: ${duplicates}`); 