import FileUpload from "../books/FileUpload";

export default function BlogForm({
  form,
  onChange,
  onCancel,
  onSaveDraft,
  onPublish,
  loading,
  view,
  editingBlog,
  featuredImage,
  setFeaturedImage,
}) {
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[13px] text-gray-600 font-medium">
          Blog{" "}
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">
            {view === "add" ? "Add New" : "Edit"}
          </span>
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-tight uppercase mb-4">
          {view === "add" ? "Add New Blog Post" : `Edit: ${editingBlog?.post_title}`}
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT MAIN PANEL */}
          <div className="flex-1 w-full space-y-5">
            {/* Main Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Post Title
                </label>
                <input
                  type="text"
                  name="postTitle"
                  value={form.postTitle}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={onChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Content
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F5F9] border-b border-gray-300">
                    {["Bold", "Italic", "Link", "Quote", "H2", "H3", "List"].map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        className="text-xs text-gray-500 hover:text-[#1a1612] font-medium transition-colors"
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={onChange}
                    rows={12}
                    className="w-full px-4 py-3 text-sm text-gray-700 bg-white outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SEO Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-5">
              <p className="text-sm font-semibold text-gray-900 tracking-tight uppercase">
                SEO Settings
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={form.metaDescription}
                  onChange={onChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[240px] flex-shrink-0 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-4">
              <p className="text-sm font-semibold text-gray-900 tracking-tight uppercase">
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

              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Categories
                </label>
                <textarea
                  name="categories"
                  value={form.categories}
                  onChange={onChange}
                  rows={3}
                  placeholder="Technology, Programming"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={onChange}
                  placeholder="laravel, php, web"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-gray-600 font-medium">
                  Featured
                </span>
                <button
                  onClick={() =>
                    onChange({
                      target: {
                        name: "featured",
                        type: "checkbox",
                        checked: !form.featured,
                      },
                    })
                  }
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                    form.featured ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                      form.featured ? "left-5" : "left-0.5"
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
              <p className="text-xs font-semibold text-gray-900 tracking-tight mb-3">
                Featured Image
              </p>
              <FileUpload
                file={featuredImage}
                onFileChange={setFeaturedImage}
                accept="image/*"
                id="featuredImageInput"
                type="image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}