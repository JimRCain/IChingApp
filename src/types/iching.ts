export interface Hexagram {
  number: number;
  name: string;
  nameCn: string;
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
  binary: string;
}