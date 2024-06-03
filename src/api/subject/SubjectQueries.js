import { useQuery } from "@tanstack/react-query";
import SubjectApi from "./SubjectApi.js";

export function useGetSubjectsQuery(search, enabled) {
  const getSubjectsQueryKey = "courses/get";
  const { isLoading, data } = useQuery({
    queryKey: [getSubjectsQueryKey, search],
    queryFn: () => SubjectApi.getSubjects(search).then((res) => res.data),
    keepPreviousData: true,
    enabled,
  });

  return {
    getSubjectsQueryKey,
    isLoadingSubjects: isLoading,
    subjects: data,
  };
}
