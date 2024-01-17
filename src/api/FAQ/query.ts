import { useQuery } from '@tanstack/react-query';
import { FaqApi } from './api';

const useFAQS = () => {
  const queryResult = useQuery({
    queryKey: ['get-all-FAQS'],
    queryFn: () => FaqApi.getFAQS(),
  });
  return queryResult;
};
const useGetFAQ = (id: number) => {
  const queryResult = useQuery({
    queryKey: ['get-FAQ', id],
    queryFn: () => FaqApi.getFAQ(id),
    enabled: id > 0,
  });
  return queryResult;
};
export default useFAQS;
export const faqQueries = { useGetFAQ };
