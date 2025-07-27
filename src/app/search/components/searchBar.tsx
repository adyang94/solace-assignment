export function SearchBar({
  searchTerm,
  onChange,
  onReset,
  onSearch,
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onSearch: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <input
          id="search"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={onChange}
          value={searchTerm}
          placeholder="Search advocates..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onReset}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Reset
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2">
        Searching for: <span className="font-semibold">{searchTerm}</span>
      </p>
    </section>
  );
}
