export interface ICity {
  id?: number;
  name: string;
  description: string;
}
export interface IUpdateCity {
  id: number;
  data: ICity;
}
export interface IAddCity {
  data: ICity;
}
