import { useQuery } from "@tanstack/react-query";
import { BoinApi } from "./api";

const useBoins = () => {
  const queryResult = useQuery({
    queryKey: ["get-all-boins"],
    queryFn: () => BoinApi.getBoins(),
  });
  return queryResult;
};
const useGetBoin = (id: number) => {
  const queryResult = useQuery({
    queryKey: ["get-boin", id],
    queryFn: () => BoinApi.getBoin(id),
    enabled: id > 0,
  });
  return queryResult;
};
export default useBoins;
export const boinQueries = { useGetBoin };
