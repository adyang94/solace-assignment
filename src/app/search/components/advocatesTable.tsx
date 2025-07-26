import { Advocates } from "@/db/schema";

export function AdvocatesTable({ advocates }: { advocates: Advocates[] }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-600">
              First Name
            </th>
            <th className="px-4 py-2 font-semibold text-gray-600">Last Name</th>
            <th className="px-4 py-2 font-semibold text-gray-600">City</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Degree</th>
            <th className="px-4 py-2 font-semibold text-gray-600">
              Specialties
            </th>
            <th className="px-4 py-2 font-semibold text-gray-600">
              Experience
            </th>
            <th className="px-4 py-2 font-semibold text-gray-600">Phone</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {advocates.map((advocate) => (
            <tr key={advocate.id}>
              <td className="px-4 py-2">{advocate.firstName}</td>
              <td className="px-4 py-2">{advocate.lastName}</td>
              <td className="px-4 py-2">{advocate.city}</td>
              <td className="px-4 py-2">{advocate.degree}</td>
              <td className="px-4 py-2">
                <ul className="list-disc list-inside space-y-1">
                  {advocate.specialties.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">{advocate.yearsOfExperience} yrs</td>
              <td className="px-4 py-2">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
