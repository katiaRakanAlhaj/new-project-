import { useQuery } from '@tanstack/react-query';
import { userProfileApi } from './api';

const useUsers = () => {
  const queryResult = useQuery({
    queryKey: ['get-all-users'],
    queryFn: () => userProfileApi.getUsers(),
  });
  return queryResult;
};
const useGetUser = (id: number) => {
  const queryResult = useQuery({
    queryKey: ['get-user', id],
    queryFn: () => userProfileApi.getUser(id),
    enabled: id > 0,
  });
  return queryResult;
};

export default useUsers;

export const userQueries = { useGetUser };
