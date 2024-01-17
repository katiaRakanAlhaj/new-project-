import { IAddBoin, IBoins, IUpdateBoin } from './interfaces';
import axios from 'axios';
import { BOINS_ROUTE } from './route';

const getBoins = async () => {
  const { data } = await axios.get<IBoins[]>(BOINS_ROUTE.BOINS);
  return data;
};
const getBoin = async (id: number) => {
  const { data } = await axios.get<IBoins>(`${BOINS_ROUTE.BOINS}/${id}`);
  return data;
};
const postBoins = async ({ data }: IAddBoin) => {
  const { data: responseData } = await axios.post<IBoins>(
    BOINS_ROUTE.BOINS,
    data
  );
  return responseData;
};
const deleteBoins = async (id: number) => {
  await axios.delete(`${BOINS_ROUTE.BOINS}/${id}`);
};
const updateBoins = async ({ data, id }: IUpdateBoin) => {
  const { data: responseData } = await axios.put<IBoins>(
    `${BOINS_ROUTE.BOINS}/${id}`,
    data
  );
  return responseData;
};
export const BoinApi = {
  getBoins,
  postBoins,
  deleteBoins,
  updateBoins,
  getBoin,
};
