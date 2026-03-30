export default function DataTable({
  title,
  items,
  loading,
  columns,
  renderRow,
  renderMobileCard,
  onEdit,
  onDelete,
  onAdd,
  addButtonText = "Add New"
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">{title}</p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            All {title}
          </p>
          <button
            onClick={onAdd}
            className="bg-[#6366F1] hover:bg-[#6a5dbf] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all w-full sm:w-auto"
          >
            + {addButtonText}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading {title.toLowerCase()}...</div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {columns.map((column) => (
                      <th
                        key={column}
                        className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item, i) => (
                      <tr
                        key={item.id || i}
                        className={`border-b border-gray-50 hover:bg-gray-50 ${
                          i === items.length - 1 ? "border-0" : ""
                        }`}
                      >
                        {renderRow(item)}
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onEdit(item)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
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
                        colSpan={columns.length}
                        className="px-6 py-12 text-center text-sm text-gray-400"
                      >
                        No {title.toLowerCase()} yet. Click "+ {addButtonText}" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-4">
              {items.length > 0 ? (
                items.map((item) => renderMobileCard(item, onEdit, onDelete))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-sm text-gray-400">
                  No {title.toLowerCase()} yet. Click "+ {addButtonText}" to create one.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}