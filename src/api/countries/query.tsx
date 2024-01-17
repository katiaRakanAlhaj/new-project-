import { useQuery } from '@tanstack/react-query';
import { countryApi } from './api';

const useCountries = () => {
  const queryResult = useQuery({
    queryKey: ['get-all-countries'],
    queryFn: () => countryApi.getCountries(),
  });
  return queryResult;
};
const useGetCountry = (id: number) => {
  const queryResult = useQuery({
    queryKey: ['get-country', id],
    queryFn: () => countryApi.getCountry(id),
    enabled: id > 0,
  });
  return queryResult;
};

export default useCountries;

export const countryQueries = { useGetCountry };
