import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "./api";

const useCategories = () => {
  const queryResult = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => CategoryApi.getCategories(),
  });
  return queryResult;
};
const useGetCategory = (id: number) => {
  const queryResult = useQuery({
    queryKey: ["get-category", id],
    queryFn: () => CategoryApi.getCategory(id),
    enabled: id > 0,
  });
  return queryResult;
};
export const categoryQueries = { useGetCategory, useCategories };
