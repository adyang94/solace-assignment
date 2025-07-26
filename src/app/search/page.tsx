"use client";

import { useEffect, useState } from "react";
import { Advocates } from "@/db/schema";
import { useAdvocatesQuery } from "../hooks/useAdvocates";
import { filterAdvocatesBySearchTerm } from "../utils/filterAdvocates";
import { useDebouncedValue } from "../hooks/useDebounce";
import { AdvocatesTable } from "./components/advocatesTable";
import { PageLoader } from "../components/molecules/pageLoader";
import { ErrorMessage } from "../components/molecules/errorMessage";
import { SearchBar } from "./components/searchBar";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocates[]>([]);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const { data: advocates = [], isLoading, isError } = useAdvocatesQuery();

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = filterAdvocatesBySearchTerm(
        advocates,
        debouncedSearchTerm
      );
      setFilteredAdvocates(filtered);
    } else {
      setFilteredAdvocates(advocates);
    }
  }, [debouncedSearchTerm, advocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onReset = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  const displayAdvocates = searchTerm ? filteredAdvocates : advocates;

  if (isLoading) return <PageLoader message="Loading advocates..." />;

  if (isError)
    return (
      <ErrorMessage message="Failed to load advocates. Try again later." />
    );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Solace Advocates
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        onChange={onChange}
        onReset={onReset}
      />
      <AdvocatesTable advocates={displayAdvocates} />
    </main>
  );
}
