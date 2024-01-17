import { useQuery } from '@tanstack/react-query';
import { cityApi } from './api';

const useCities = () => {
  const queryResult = useQuery({
    queryKey: ['get-all-countries'],
    queryFn: () => cityApi.getCities(),
  });
  return queryResult;
};
const useGetCity = (id: number) => {
  const queryResult = useQuery({
    queryKey: ['get-country', id],
    queryFn: () => cityApi.getCity(id),
    enabled: id > 0,
  });
  return queryResult;
};

export default useCities;

export const cityQueries = { useGetCity };
