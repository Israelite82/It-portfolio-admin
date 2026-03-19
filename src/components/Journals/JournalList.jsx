import DataTable from "../shared/DataTable";

export default function JournalList({ journals, loading, onEdit, onDelete, onAdd }) {
  const columns = ["Title", "Year", "Status", "Actions"];

  const renderRow = (journal) => (
    <>
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
    </>
  );

  const renderMobileCard = (journal, onEdit, onDelete) => (
    <div
      key={journal.id}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-semibold text-gray-700 flex-1">
          {journal.title}
        </h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 ${
            journal.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {journal.status || "Draft"}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Year: {journal.publication_year || "N/A"}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(journal)}
          className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium rounded-lg border border-blue-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(journal.id)}
          className="flex-1 py-2 text-sm text-red-500 hover:bg-red-50 font-medium rounded-lg border border-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <DataTable
      title="Journals"
      items={journals}
      loading={loading}
      columns={columns}
      renderRow={renderRow}
      renderMobileCard={renderMobileCard}
      onEdit={onEdit}
      onDelete={onDelete}
      onAdd={onAdd}
      addButtonText="Add Journal"
    />
  );
}