import { DB } from "@/db";
import { advocates } from "@/db/schema";

export async function getPaginatedAdvocates(
  dbClient: DB,
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  const data = await dbClient
    .select()
    .from(advocates)
    .limit(limit)
    .offset(offset)
    .execute();

  return data;
}