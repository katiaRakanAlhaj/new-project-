export interface TProfileUser {
  id?: number;
  name: string;
  email: string;
  phone: string;
  location: string;
}
export interface IUpdateProfileUser {
  id?: number;
  data: TProfileUser;
}
export interface IAddProfileUser {
  data: TProfileUser;
}
