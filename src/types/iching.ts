export interface Trigram {
  name: string;
  nature: string;
}

export interface Trigrams {
  lower: Trigram;
  upper: Trigram;
  description: string;
}

export interface Ancient {
  chinese: string;
  rendering: string;
}

export interface Hexagram {
  number: number;
  name: string;
  heart: string;
  ancient: Ancient;
  judgment: string;
  image: string;
  lines: string[];
  trigrams: Trigrams;
  taoist_reflection: string;
}

export interface IChingData {
  hexagrams: Hexagram[];
}