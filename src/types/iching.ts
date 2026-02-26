export interface Hexagram {
  number: number;
  name: string;
  heart: string;
  ancient: {
    chinese: string;
    rendering: string;
  };
  judgment: string;
  image: string;
  lines: string[];
  trigrams: {
    lower: {
      name: string;
      nature: string;
    };
    upper: {
      name: string;
      nature: string;
    };
    description: string;
  };
  taoist_reflection: string;
}

export interface IChingData {
  hexagrams: Hexagram[];
}