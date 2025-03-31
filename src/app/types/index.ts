// types.ts
export type Category =
  | "ALL"
  | "Components"
  | "Basic"
  | "Arduino"
  | "Micro:Bit"
  | "Circuit Assemblies";

export interface Lesson {
  id: string;
  title: string;
  thumbnail: string;
  category: Category;
  data: ComponentData[];
}

export interface ComponentData {
  cover?: string;
  title_cover?: string;
  title: string;
  text?: string;
  video?: string;
  img?: string;
  link?: LinkItem[];
  url?: string;
}

export interface LinkItem {
  url: string;
  titleyoutube?: string;
}

export interface ComponentProps {
  data: ComponentData[];
}
