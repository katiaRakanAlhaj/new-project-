import { useQuery } from "@tanstack/react-query";
import { ArticleApi } from "./api";

const useArticles = () => {
  const queryResult = useQuery({
    queryKey: ["get-all-articles"],
    queryFn: () => ArticleApi.getArticles(),
  });
  return queryResult;
};
const useGetArticle = (id: number) => {
  const queryResult = useQuery({
    queryKey: ["get-article", id],
    queryFn: () => ArticleApi.getArticle(id),
    enabled: id > 0,
  });
  return queryResult;
};
export default useArticles;
export const articleQueries = { useGetArticle };
