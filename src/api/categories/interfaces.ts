export interface ICategory {
  id?: number;
  name: string;
}
export interface IUpdateCategory {
  id: number;
  data: ICategory;
}
export interface IAddCategory {
  data: ICategory;
}
