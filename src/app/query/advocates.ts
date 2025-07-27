import { Advocates } from "@/db/schema";
import { ResponseOutput } from "../api/api-models/v1/advocates/get";

export async function fetchAdvocates(params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<ResponseOutput> {
  const query = new URLSearchParams();

  if (params.page !== undefined) {
    query.append("page", params.page.toString());
  }

  if (params.limit !== undefined) {
    query.append("limit", params.limit.toString());
  }

  if (params.search !== undefined && params.search.trim() !== "") {
    query.append("search", params.search.trim());
  }

  const response = await fetch(`/api/v1/advocates?${query.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch advocates");
  }

  const json = await response.json();
  return json;
}
