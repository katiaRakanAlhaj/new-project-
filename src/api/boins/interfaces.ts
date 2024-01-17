export interface IBoins {
  id?: number;
  name: string;
  details: string;
  price: number;
}
export interface IUpdateBoin {
  id: number;
  data: IBoins;
}
export interface IAddBoin {
  data: IBoins;
}
