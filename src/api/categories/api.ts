import { CATEGORY_ROUTES } from './route';
import axios from 'axios';
import { IAddCategory, ICategory, IUpdateCategory } from './interfaces';

const getCategories = async () => {
  const { data } = await axios.get<ICategory[]>(CATEGORY_ROUTES.CATEGORY);
  return data;
};
const getCategory = async (id: number) => {
  const { data } = await axios.get<ICategory>(
    `${CATEGORY_ROUTES.CATEGORY}/${id}`
  );
  return data;
};
const postCategories = async ({ data }: IAddCategory) => {
  const { data: responseData } = await axios.post<ICategory>(
    CATEGORY_ROUTES.CATEGORY,
    data
  );
  return responseData;
};
const deleteCategories = async (id: number) => {
  await axios.delete(`${CATEGORY_ROUTES.CATEGORY}/${id}`);
};
const updateCategories = async ({ data, id }: IUpdateCategory) => {
  const { data: responseData } = await axios.put<ICategory>(
    `${CATEGORY_ROUTES.CATEGORY}/${id}`,
    data
  );
  return responseData;
};
export const CategoryApi = {
  getCategory,
  getCategories,
  postCategories,
  updateCategories,
  deleteCategories,
};
