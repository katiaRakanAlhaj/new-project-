import { useQuery } from '@tanstack/react-query';
import { userApi } from './api';

const useUsers = () => {
  const queryResult = useQuery({
    queryKey: ['get-all-users'],
    queryFn: () => userApi.getUsers(),
  });
  return queryResult;
};
const useGetUser = (id: number) => {
  const queryResult = useQuery({
    queryKey: ['get-user', id],
    queryFn: () => userApi.getUser(id),
    enabled: id > 0,
  });
  return queryResult;
};

export default useUsers;

export const userQueries = { useGetUser };
