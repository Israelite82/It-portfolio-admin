export default function JournalList({ journals, loading, onEdit, onDelete, onAdd }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">Journals</p>
      </div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            All Journals
          </p>
          <button
            onClick={onAdd}
            className="bg-[#6366F1] hover:bg-[#6a5dbf] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
          >
            + Add Journal
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading journals...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">
                    Year
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {journals.length > 0 ? (
                  journals.map((journal, i) => (
                    <tr
                      key={journal.id || i}
                      className={`border-b border-gray-50 hover:bg-gray-50 ${
                        i === journals.length - 1 ? "border-0" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {journal.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {journal.publication_year || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            journal.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {journal.status || "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onEdit(journal)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(journal.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-gray-400"
                    >
                      No journals yet. Click "+ Add Journal" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}