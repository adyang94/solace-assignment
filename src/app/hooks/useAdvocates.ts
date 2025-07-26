import { useQuery } from "@tanstack/react-query";
import { fetchAdvocates } from "../query/advocates";
import { Advocates } from "@/db/schema";

export function useAdvocatesQuery() {
  return useQuery<Advocates[], Error>({
    queryKey: ["advocates"],
    queryFn: fetchAdvocates,
  });
}
