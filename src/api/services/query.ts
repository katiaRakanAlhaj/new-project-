import { useQuery } from '@tanstack/react-query';
import { serviceApi } from './api';

const useServices = () => {
  const queryResult = useQuery({
    queryKey: ['get-all-services'],
    queryFn: () => serviceApi.getServices(),
  });
  return queryResult;
};
const useGetService = (id: number) => {
  const queryResult = useQuery({
    queryKey: ['get-service', id],
    queryFn: () => serviceApi.getService(id),
    enabled: id > 0,
  });
  return queryResult;
};
export default useServices;
export const serviceQueries = { useGetService };
