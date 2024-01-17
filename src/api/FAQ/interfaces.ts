export interface IFAQ {
  id?: number;
  title: string;
  description: string;
  category: {
    name: string;
    id: number;
  }[];
}
export interface IUpdateFAQ {
  id: number;
  data: IFAQ;
}
export interface IAddFAQ {
  data: IFAQ;
}
