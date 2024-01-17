import axios from 'axios';
import { IAddArticle, IArticle, IUpdateArticle } from './interfaces';
import { ARTICLES_ROUTE } from './route';

const getArticles = async () => {
  const { data } = await axios.get<IArticle[]>(ARTICLES_ROUTE.ARTICLES);
  return data;
};
const getArticle = async (id: number) => {
  const { data } = await axios.get<IArticle>(
    `${ARTICLES_ROUTE.ARTICLES}/${id}`
  );
  return data;
};
const postArticles = async ({ data }: IAddArticle) => {
  const { data: responseData } = await axios.post<IArticle>(
    ARTICLES_ROUTE.ARTICLES,
    data
  );
  return responseData;
};
const deleteArticles = async (id: number) => {
  await axios.delete(`${ARTICLES_ROUTE.ARTICLES}/${id}`);
};
const updateArticles = async ({ data, id }: IUpdateArticle) => {
  const { data: responseData } = await axios.put<IArticle>(
    `${ARTICLES_ROUTE.ARTICLES}/${id}`,
    data
  );
  return responseData;
};
export const ArticleApi = {
  getArticle,
  getArticles,
  postArticles,
  updateArticles,
  deleteArticles,
};
