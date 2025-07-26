import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Solace 👋</h1>
      <p className="text-gray-600 mb-8">
        This is your starting point. Navigate to the advocate search to get started.
      </p>
      <Link
        href="/search"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Go to Advocate Search
      </Link>
    </div>
  );
}
