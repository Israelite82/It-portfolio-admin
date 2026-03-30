import DataTable from "../shared/DataTable";

export default function BookList({ books, loading, onEdit, onDelete, onAdd }) {
  const columns = ["Title", "Year", "Status", "Actions"];

  const renderRow = (book) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
        {book.title}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {book.pub_year || "N/A"}
      </td>
      <td className="px-6 py-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            book.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {book.status || "Draft"}
        </span>
      </td>
    </>
  );

  const renderMobileCard = (book, onEdit, onDelete) => (
    <div
      key={book.id}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-semibold text-gray-700 flex-1">
          {book.title}
        </h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 ${
            book.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {book.status || "Draft"}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Year: {book.pub_year || "N/A"}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium rounded-lg border border-blue-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 py-2 text-sm text-red-500 hover:bg-red-50 font-medium rounded-lg border border-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <DataTable
      title="Books"
      items={books}
      loading={loading}
      columns={columns}
      renderRow={renderRow}
      renderMobileCard={renderMobileCard}
      onEdit={onEdit}
      onDelete={onDelete}
      onAdd={onAdd}
      addButtonText="Add Book"
    />
  );
}