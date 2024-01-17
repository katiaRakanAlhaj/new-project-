import axios from 'axios';
import { FAQ_ROUTES } from './route';
import { IAddFAQ, IFAQ, IUpdateFAQ } from './interfaces';

const getFAQS = async () => {
  const { data } = await axios.get<IFAQ[]>(FAQ_ROUTES.FAQ);
  return data;
};
const getFAQ = async (id: number) => {
  const { data } = await axios.get<IFAQ>(`${FAQ_ROUTES.FAQ}/${id}`);
  return data;
};
const postFAQ = async ({ data }: IAddFAQ) => {
  const { data: responseData } = await axios.post<IFAQ>(FAQ_ROUTES.FAQ, data);
  return responseData;
};
const deleteFAQ = async (id: number) => {
  await axios.delete(`${FAQ_ROUTES.FAQ}/${id}`);
};
const updateFAQ = async ({ data, id }: IUpdateFAQ) => {
  const { data: responseData } = await axios.put<IFAQ>(
    `${FAQ_ROUTES.FAQ}/${id}`,
    data
  );
  return responseData;
};
export const FaqApi = {
  getFAQ,
  getFAQS,
  postFAQ,
  deleteFAQ,
  updateFAQ,
};
