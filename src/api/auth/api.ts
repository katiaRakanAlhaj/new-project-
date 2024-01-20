import axios from 'axios';
import { IAddUser, IResetPassword, TUser } from './interfaces';
import { USER_ROUTE } from './route';

const getUsers = async () => {
  const { data } = await axios.get<TUser[]>(USER_ROUTE.GET_ALL_USERS);
  return data;
};

const postUsers = async ({ data }: IAddUser) => {
  const { data: responseData } = await axios.post<TUser>(
    USER_ROUTE.GET_ALL_USERS,
    data
  );
  return responseData;
};

const resetPassword = async (payload: IResetPassword) => {
  const { data } = await axios.put(
    `${USER_ROUTE.POST_USER}/${payload.id}`,
    payload
  );
  return data;
};

const getUser = async (id: number) => {
  const { data } = await axios.get<TUser>(`${USER_ROUTE.GET_ALL_USERS}/${id}`);
  return data;
};

const deleteUser = async (id: number) => {
  await axios.delete(`${USER_ROUTE.GET_ALL_USERS}/${id}`);
};

export const userApi = {
  getUsers,
  postUsers,
  resetPassword,
  getUser,
  deleteUser,
};
