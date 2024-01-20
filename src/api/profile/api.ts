import axios from 'axios';
import {
  IAddProfileUser,
  IUpdateProfileUser,
  TProfileUser,
} from './interfaces';
import { PROFILE_ROUTE } from './route';

const getUsers = async () => {
  const { data } = await axios.get<TProfileUser[]>(PROFILE_ROUTE.profile);
  return data;
};
const getUser = async (id: number) => {
  const { data } = await axios.get<TProfileUser>(
    `${PROFILE_ROUTE.profile}/${id}`
  );
  return data;
};
const postUser = async ({ data }: IAddProfileUser) => {
  const { data: responseData } = await axios.post<TProfileUser>(
    PROFILE_ROUTE.profile,
    data
  );
  return responseData;
};
const deleteUser = async (id: number) => {
  await axios.delete(`${PROFILE_ROUTE.profile}/${id}`);
};
const updateUser = async ({ data, id }: IUpdateProfileUser) => {
  const { data: responseData } = await axios.put<TProfileUser>(
    `${PROFILE_ROUTE.profile}/${id}`,
    data
  );
  return responseData;
};
export const userProfileApi = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  postUser,
};
