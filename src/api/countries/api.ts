import axios from "axios";
import { IAddCountry, ICountry, IUpdateCountry } from "./interfaces";
import { COUNTRIES_ROUTE } from "./route";

const postCountry = async ({ data }: IAddCountry) => {
  const { data: responseData } = await axios.post<ICountry>(
    COUNTRIES_ROUTE.COUNTRY,
    data
  );
  return responseData;
};

const getCountries = async () => {
  const { data } = await axios.get<ICountry[]>(COUNTRIES_ROUTE.COUNTRY);
  return data;
};
const getCountry = async (id: number) => {
  const { data } = await axios.get<ICountry>(
    `${COUNTRIES_ROUTE.COUNTRY}/${id}`
  );
  return data;
};
const updateCountry = async ({ data, id }: IUpdateCountry) => {
  const { data: responseData } = await axios.put<ICountry>(
    `${COUNTRIES_ROUTE.COUNTRY}/${id}`,
    data
  );
  return responseData;
};

const deleteCountry = async (id: number) => {
  await axios.delete(`${COUNTRIES_ROUTE.COUNTRY}/${id}`);
};

export const countryApi = {
  postCountry,
  getCountries,
  updateCountry,
  deleteCountry,
  getCountry,
};
