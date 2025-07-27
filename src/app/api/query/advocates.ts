import { DB } from "@/db";
import { advocates } from "@/db/schema";
import { ilike, gte, or, sql } from "drizzle-orm";

export async function getPaginatedAdvocates(
  dbClient: DB,
  page: number,
  limit: number,
  searchTerm?: string
) {
  const offset = (page - 1) * limit;

  const query = dbClient
    .select()
    .from(advocates)
    .limit(limit + 1)
    .offset(offset);

  if (searchTerm && searchTerm.trim() !== "") {
    const term = `%${searchTerm.trim().toLowerCase()}%`;
    const parsedExperience = Number(searchTerm);
    const isNumericSearch = !isNaN(parsedExperience);

    const conditions = [
      ilike(advocates.firstName, term),
      ilike(advocates.lastName, term),
      ilike(advocates.city, term),
      ilike(advocates.degree, term),
      sql`${advocates.specialties}::text ILIKE ${term}`,
    ];

    if (isNumericSearch) {
      conditions.push(gte(advocates.yearsOfExperience, parsedExperience));
    }

    query.where(or(...conditions));
  }

  const rawData = await query.execute();
  const hasNextPage = rawData.length > limit;
  const data = rawData.slice(0, limit);

  return {
    data,
    hasNextPage,
  };
}
