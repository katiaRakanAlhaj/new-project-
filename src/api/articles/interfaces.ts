export interface IArticle {
  id?: number;
  title: string;
  description: string;
  category: {
    name: string;
    id: number;
  }[];
}

export interface IUpdateArticle {
  id: number;
  data: IArticle;
}
export interface IAddArticle {
  data: IArticle;
}
