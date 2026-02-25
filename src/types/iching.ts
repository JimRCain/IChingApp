export interface Hexagram {
  number: number;
  nameEn: string;
  nameCn: string;
  judgment: string;
  image: string;
  lines: string[];
  binary: string;
}

export interface IChingData {
  hexagrams: Hexagram[];
}