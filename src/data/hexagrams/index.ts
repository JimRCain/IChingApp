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
import { hexagram33 } from "./hexagram-33";
import { hexagram34 } from "./hexagram-34";
import { hexagram35 } from "./hexagram-35";
import { hexagram36 } from "./hexagram-36";
import { hexagram37 } from "./hexagram-37";
import { hexagram38 } from "./hexagram-38";
import { hexagram39 } from "./hexagram-39";
import { hexagram40 } from "./hexagram-40";
import { hexagram41 } from "./hexagram-41";
import { hexagram42 } from "./hexagram-42";
import { hexagram43 } from "./hexagram-43";
import { hexagram44 } from "./hexagram-44";
import { hexagram45 } from "./hexagram-45";
import { hexagram46 } from "./hexagram-46";
import { hexagram47 } from "./hexagram-47";
import { hexagram48 } from "./hexagram-48";
import { hexagram49 } from "./hexagram-49";
import { hexagram50 } from "./hexagram-50";
import { hexagram51 } from "./hexagram-51";
import { hexagram52 } from "./hexagram-52";
import { hexagram53 } from "./hexagram-53";
import { hexagram54 } from "./hexagram-54";
import { hexagram55 } from "./hexagram-55";
import { hexagram56 } from "./hexagram-56";
import { hexagram57 } from "./hexagram-57";
import { hexagram58 } from "./hexagram-58";
import { hexagram59 } from "./hexagram-59";

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
  hexagram33,
  hexagram34,
  hexagram35,
  hexagram36,
  hexagram37,
  hexagram38,
  hexagram39,
  hexagram40,
  hexagram41,
  hexagram42,
  hexagram43,
  hexagram44,
  hexagram45,
  hexagram46,
  hexagram47,
  hexagram48,
  hexagram49,
  hexagram50,
  hexagram51,
  hexagram52,
  hexagram53,
  hexagram54,
  hexagram55,
  hexagram56,
  hexagram57,
  hexagram58,
  hexagram59,
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
  hexagram33,
  hexagram34,
  hexagram35,
  hexagram36,
  hexagram37,
  hexagram38,
  hexagram39,
  hexagram40,
  hexagram41,
  hexagram42,
  hexagram43,
  hexagram44,
  hexagram45,
  hexagram46,
  hexagram47,
  hexagram48,
  hexagram49,
  hexagram50,
  hexagram51,
  hexagram52,
  hexagram53,
  hexagram54,
  hexagram55,
  hexagram56,
  hexagram57,
  hexagram58,
  hexagram59,
];

export const getHexagramByNumber = (number: number) => {
  return hexagrams.find(h => h.number === number);
};

export const getHexagramByBinary = (binary: string) => {
  return hexagrams.find(h => h.binary === binary);
};