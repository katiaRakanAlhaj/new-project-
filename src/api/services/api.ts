import axios from 'axios';
import { IAddService, IService, IUpdateService } from './interfaces';
import { SERVICES_ROUTE } from './route';

const postService = async ({ data }: IAddService) => {
  const { data: responseData } = await axios.post<IService>(
    SERVICES_ROUTE.SERVICES,
    data
  );
  return responseData;
};

const getServices = async () => {
  const { data } = await axios.get<IService[]>(SERVICES_ROUTE.SERVICES);
  return data;
};
const getService = async (id: number) => {
  const { data } = await axios.get<IService>(
    `${SERVICES_ROUTE.SERVICES}/${id}`
  );
  return data;
};
const updateService = async ({ data, id }: IUpdateService) => {
  const { data: responseData } = await axios.put<IService>(
    `${SERVICES_ROUTE.SERVICES}/${id}`,
    data
  );
  return responseData;
};

const deleteService = async (id: number) => {
  await axios.delete(`${SERVICES_ROUTE.SERVICES}/${id}`);
};

export const serviceApi = {
  getServices,
  getService,
  postService,
  updateService,
  deleteService,
};
