"use client";

import { useState, useEffect } from "react";
import { useAdvocatesQuery } from "../hooks/useAdvocates";
import { AdvocatesTable } from "./components/advocatesTable";
import { PageLoader } from "../components/molecules/pageLoader";
import { ErrorMessage } from "../components/molecules/errorMessage";
import { SearchBar } from "./components/searchBar";
import { useDebouncedValue } from "../hooks/useDebounce";

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");
  const debouncedSearchInput = useDebouncedValue(searchInput, 500);
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const { data, isFetching, isError } = useAdvocatesQuery(
    page,
    limit,
    searchQuery
  );

  const advocates = data?.data || [];
  const hasNextPage = data?.hasNextPage ?? false;

  useEffect(() => {
    const trimmed = debouncedSearchInput.trim();
    if (trimmed !== searchQuery) {
      setSearchQuery(trimmed);
      setPage(1);
    }
  }, [debouncedSearchInput]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchClick = () => {
    const trimmed = searchInput.trim();
    if (trimmed !== searchQuery) {
      setSearchQuery(trimmed);
      setPage(1);
    }
  };

  const onReset = () => {
    setSearchInput("");
    setSearchQuery("");
    setPage(1);
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (!isFetching && advocates.length === 0 && !isError) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <SearchBar
          searchTerm={searchInput}
          onChange={onChange}
          onSearch={onSearchClick}
          onReset={onReset}
        />
        <p className="text-gray-600 mt-4">
          No advocates found for "{searchQuery}".
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <ErrorMessage message="Failed to load advocates. Try again later." />
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Solace Advocates
      </h1>

      <SearchBar
        searchTerm={searchInput}
        onChange={onChange}
        onSearch={onSearchClick}
        onReset={onReset}
      />

      {isFetching && (
        <p className="text-sm text-gray-500 mb-2 animate-pulse">
          Updating results...
        </p>
      )}

      <AdvocatesTable advocates={advocates} />

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={page === 1 || isFetching}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page}</span>
        <button
          onClick={handleNext}
          disabled={!hasNextPage || isFetching}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
