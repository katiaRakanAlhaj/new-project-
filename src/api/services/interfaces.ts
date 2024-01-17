export interface IService {
  id?: number;
  title: string;
  description: string;
}
export interface IAddService {
  data: IService;
}
export interface IUpdateService {
  id: number;
  data: IService;
}
