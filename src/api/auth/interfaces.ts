export interface TUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TLogin {
  name: string;
  email: string;
  password: string;
  id?: number;
}
export interface TEmail {
  email: string;
}
export interface TPassword {
  password: string;
  newpassword: string;
}
export interface IUpdateUserName {
  id?: number;
  data: TUser;
}
export interface IUpdateUserInfo {
  data: TUser;
  id?: number;
}
export interface IAddUser {
  data: TUser;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  id?: number;
  name?: string;
}
