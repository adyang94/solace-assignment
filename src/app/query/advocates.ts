import { Advocates } from "@/db/schema";

export async function fetchAdvocates(): Promise<Advocates[]> {
  const response = await fetch("/api/advocates", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch advocates");
  }

  const json = await response.json();
  return json.data;
}
