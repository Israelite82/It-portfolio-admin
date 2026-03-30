import FileUpload from "./FileUpload";

export default function BookForm({
  form,
  onChange,
  onCancel,
  onSaveDraft,
  onPublish,
  loading,
  view,
  editingBook,
  bookFile,
  setBookFile,
  bookCover,
  setBookCover,
}) {
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[14px] text-gray-600 font-medium">
          Books{" "}
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">
            {view === "add" ? "Add New" : "Edit"}
          </span>
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-tight uppercase mb-3">
          {view === "add" ? "Add New Book" : `Edit: ${editingBook?.title}`}
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT PANEL */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={6}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1.5">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={form.isbn}
                    onChange={onChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1.5">
                    Publication Year
                  </label>
                  <input
                    type="text"
                    name="publicationYear"
                    value={form.publicationYear}
                    onChange={onChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1.5">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={form.publisher}
                    onChange={onChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1.5">
                    Edition
                  </label>
                  <input
                    type="text"
                    name="edition"
                    value={form.edition}
                    onChange={onChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Amazon Link
                </label>
                <input
                  type="text"
                  name="amazon"
                  value={form.amazon}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Other Store Link
                </label>
                <input
                  type="text"
                  name="otherStore"
                  value={form.otherStore}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <FileUpload
                file={bookFile}
                onFileChange={setBookFile}
                accept=".pdf,.epub"
                label="Book File - Upload PDF or EPUB"
                id="bookFileInput"
                type="file"
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[240px] flex-shrink-0 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-4">
              <p className="text-xs font-semibold text-gray-900 tracking-widest uppercase">
                Publish
              </p>

              <button
                onClick={onSaveDraft}
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-black hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Draft"}
              </button>

              <button
                onClick={onPublish}
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#6366F1] text-white hover:bg-[#6a5dbf] transition-colors disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>

              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-gray-800 font-medium">
                  Feature on Homepage
                </span>
                <button
                  onClick={() =>
                    onChange({
                      target: {
                        name: "featureOnHomepage",
                        type: "checkbox",
                        checked: !form.featureOnHomepage,
                      },
                    })
                  }
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                    form.featureOnHomepage ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                      form.featureOnHomepage ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={onCancel}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-gray-800 tracking-widest uppercase mb-3">
                Cover Image
              </p>
              <FileUpload
                file={bookCover}
                onFileChange={setBookCover}
                accept="image/*"
                id="bookCoverInput"
                type="image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}