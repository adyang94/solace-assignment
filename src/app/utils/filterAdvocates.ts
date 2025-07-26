import { Advocates } from "@/db/schema";

export function filterAdvocatesBySearchTerm(
  advocates: Advocates[],
  searchTerm: string
): Advocates[] {
  const term = searchTerm.toLowerCase().trim();

  // assume that if the search term is numeric, we are filtering by years of experience
  const parsedExperience = Number(term);
  const isNumericSearch = !isNaN(parsedExperience);

  return advocates.filter((advocate) => {
    const matchesText =
      advocate.firstName.toLowerCase().includes(term) ||
      advocate.lastName.toLowerCase().includes(term) ||
      advocate.city.toLowerCase().includes(term) ||
      advocate.degree.toLowerCase().includes(term) ||
      advocate.specialties.some((s) => s.toLowerCase().includes(term));

    // filter by years of experience for exact match or greater than
    const matchesExperience =
      isNumericSearch && advocate.yearsOfExperience >= parsedExperience;

    return matchesText || matchesExperience;
  });
}
