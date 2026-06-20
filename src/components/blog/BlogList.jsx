export default function BlogList({ 
  blogs, 
  loading, 
  onEdit, 
  onDelete, 
  onAdd,
  currentPage = 1,
  lastPage = 1,
  total = 0,
  perPage = 15,
  onPageChange 
}) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // Number of pages to show on each side of current page
    
    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 || // First page
        i === lastPage || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - delta - 1 && i > 1) ||
        (i === currentPage + delta + 1 && i < lastPage)
      ) {
        pages.push('...');
      }
    }
    
    // Remove duplicates and clean up
    const uniquePages = [];
    let lastAdded = null;
    for (const page of pages) {
      if (page !== lastAdded) {
        uniquePages.push(page);
        lastAdded = page;
      }
    }
    
    return uniquePages;
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">Blog Posts</p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
              All Blog Posts
            </p>
            {!loading && total > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Showing {startItem}-{endItem} of {total} posts
              </p>
            )}
          </div>
          <button
            onClick={onAdd}
            className="bg-[#6366F1] hover:bg-[#6a5dbf] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all w-full sm:w-auto"
          >
            + Add Blog Post
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading blog posts...</div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">
                      Author
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
                  {blogs.length > 0 ? (
                    blogs.map((blog, i) => (
                      <tr
                        key={blog.id || i}
                        className={`border-b border-gray-50 hover:bg-gray-50 ${
                          i === blogs.length - 1 ? "border-0" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {blog.post_title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {blog.author || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              blog.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {blog.status || "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onEdit(blog)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(blog.id)}
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
                        No blog posts yet. Click "+ Add Blog Post" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-4">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 flex-1">
                        {blog.post_title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status || "Draft"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      By: {blog.author || "N/A"}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(blog)}
                        className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium rounded-lg border border-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(blog.id)}
                        className="flex-1 py-2 text-sm text-red-500 hover:bg-red-50 font-medium rounded-lg border border-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-sm text-gray-400">
                  No blog posts yet. Click "+ Add Blog Post" to create one.
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {total > perPage && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 order-2 sm:order-1">
                  Page {currentPage} of {lastPage}
                </div>
                
                <div className="flex items-center gap-1 order-1 sm:order-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-[#6366F1] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === lastPage
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}