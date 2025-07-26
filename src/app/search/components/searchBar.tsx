// =========================
// SearchBar Component
// =========================
export function SearchBar({
  searchTerm,
  onChange,
  onReset,
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}) {
  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label htmlFor="search" className="font-medium text-gray-700">
          Search
        </label>
        <input
          id="search"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={onChange}
          value={searchTerm}
          placeholder="Search advocates..."
        />
        <button
          onClick={onReset}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Reset
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Searching for: <span className="font-semibold">{searchTerm}</span>
      </p>
    </section>
  );
}
