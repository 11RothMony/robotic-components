export type Category = "ALL" | "WEB" | "MOBILE" | "ROBOTIC";

export interface Lesson {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  data?: ComponentData[] | any;
}
// export interface ComponentSection {
//   title: string;
//   text: string;
//   img?: string;
//   link?: string[];
// }

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
