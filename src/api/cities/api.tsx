import axios from 'axios';
import { CITY_ROUTE } from './route';
import { IAddCity, ICity, IUpdateCity } from './interfaces';

const postCity = async ({ data }: IAddCity) => {
  const { data: responseData } = await axios.post<ICity>(CITY_ROUTE.CITY, data);
  return responseData;
};

const getCities = async () => {
  const { data } = await axios.get<ICity[]>(CITY_ROUTE.CITY);
  return data;
};
const getCity = async (id: number) => {
  const { data } = await axios.get<ICity>(`${CITY_ROUTE.CITY}/${id}`);
  return data;
};
const updateCity = async ({ data, id }: IUpdateCity) => {
  const { data: responseData } = await axios.put<ICity>(
    `${CITY_ROUTE.CITY}/${id}`,
    data
  );
  return responseData;
};

const deleteCity = async (id: number) => {
  await axios.delete(`${CITY_ROUTE.CITY}/${id}`);
};

export const cityApi = {
  postCity,
  getCities,
  getCity,
  updateCity,
  deleteCity,
};
