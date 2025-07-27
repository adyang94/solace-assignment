import { useQuery } from "@tanstack/react-query";
import { fetchAdvocates } from "../query/advocates";
import { ResponseOutput } from "../api/api-models/v1/advocates/get";

export function useAdvocatesQuery(
  page: number = 1,
  limit: number = 10,
  search?: string
) {
  return useQuery<ResponseOutput, Error>({
    queryKey: ["advocates", page, limit, search],
    queryFn: () => fetchAdvocates({ page, limit, search }),
  });
}
