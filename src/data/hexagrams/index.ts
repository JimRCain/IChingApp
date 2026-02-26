import { hexagram1 } from "./hexagram-1";
import { hexagram2 } from "./hexagram-2";
import { hexagram3 } from "./hexagram-3";
import { hexagram4 } from "./hexagram-4";
import { hexagram5 } from "./hexagram-5";
import { hexagram6 } from "./hexagram-6";
import { hexagram7 } from "./hexagram-7";
import { hexagram8 } from "./hexagram-8";
import { hexagram9 } from "./hexagram-9";
import { hexagram10 } from "./hexagram-10";
import { hexagram11 } from "./hexagram-11";
import { hexagram12 } from "./hexagram-12";
import { hexagram13 } from "./hexagram-13";
import { hexagram14 } from "./hexagram-14";
import { hexagram15 } from "./hexagram-15";
import { hexagram16 } from "./hexagram-16";
import { hexagram17 } from "./hexagram-17";
import { hexagram18 } from "./hexagram-18";
import { hexagram19 } from "./hexagram-19";
import { hexagram20 } from "./hexagram-20";
import { hexagram21 } from "./hexagram-21";
import { hexagram22 } from "./hexagram-22";
import { hexagram23 } from "./hexagram-23";
import { hexagram24 } from "./hexagram-24";
import { hexagram25 } from "./hexagram-25";
import { hexagram26 } from "./hexagram-26";
import { hexagram27 } from "./hexagram-27";
import { hexagram28 } from "./hexagram-28";
import { hexagram29 } from "./hexagram-29";
import { hexagram30 } from "./hexagram-30";
import { hexagram31 } from "./hexagram-31";
import { hexagram32 } from "./hexagram-32";

export {
  hexagram1,
  hexagram2,
  hexagram3,
  hexagram4,
  hexagram5,
  hexagram6,
  hexagram7,
  hexagram8,
  hexagram9,
  hexagram10,
  hexagram11,
  hexagram12,
  hexagram13,
  hexagram14,
  hexagram15,
  hexagram16,
  hexagram17,
  hexagram18,
  hexagram19,
  hexagram20,
  hexagram21,
  hexagram22,
  hexagram23,
  hexagram24,
  hexagram25,
  hexagram26,
  hexagram27,
  hexagram28,
  hexagram29,
  hexagram30,
  hexagram31,
  hexagram32,
};

export const hexagrams = [
  hexagram1,
  hexagram2,
  hexagram3,
  hexagram4,
  hexagram5,
  hexagram6,
  hexagram7,
  hexagram8,
  hexagram9,
  hexagram10,
  hexagram11,
  hexagram12,
  hexagram13,
  hexagram14,
  hexagram15,
  hexagram16,
  hexagram17,
  hexagram18,
  hexagram19,
  hexagram20,
  hexagram21,
  hexagram22,
  hexagram23,
  hexagram24,
  hexagram25,
  hexagram26,
  hexagram27,
  hexagram28,
  hexagram29,
  hexagram30,
  hexagram31,
  hexagram32,
];

export const getHexagramByNumber = (number: number) => {
  return hexagrams.find(h => h.number === number);
};

export const getHexagramByBinary = (binary: string) => {
  return hexagrams.find(h => h.binary === binary);
};