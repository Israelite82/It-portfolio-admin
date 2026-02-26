import { useState } from "react";

export default function Blog() {
  const [form, setForm] = useState({
    postTitle: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    schedule: "",
    author: "",
    categories: "",
    tags: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[13px] text-gray-600 font-medium">
          Blog{" "}
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">Add New</span>
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-tight uppercase mb-4">
          Add New Blog Post
        </p>

        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN PANEL ── */}
          <div className="flex-1 space-y-5">

            {/* Main Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 space-y-5">

              {/* Post Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Post Title
                </label>
                <input
                  type="text"
                  name="postTitle"
                  value={form.postTitle}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Content — Rich Text Editor */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Content
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Toolbar */}
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
                  {/* Editor Area */}
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows={12}
                    className="w-full px-4 py-3 text-sm text-gray-700 bg-white outline-none resize-none"
                  />
                </div>
              </div>

            </div>

            {/* SEO Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 space-y-5 pb-16">
              <p className="text-sm font-semibold text-gray-900 tracking-tight uppercase">
                SEO Settings
              </p>

              {/* Meta Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={form.metaDescription}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-[200px] flex-shrink-0 space-y-5">

            {/* Publish Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-4">
              <p className="text-sm font-semibold text-gray-900 tracking-tight uppercase">
                Publish
              </p>

              <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-black hover:bg-green-200 transition-colors">
                Save Draft
              </button>

              <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#6366F1] text-black hover:bg-[#6a5dbf] transition-colors">
                Publish
              </button>

              {/* Schedule */}
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Schedule
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={form.schedule}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Categories
                </label>
                <textarea
                  name="categories"
                  value={form.categories}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center justify-between pb-16">
                <span className="text-xs text-gray-600 font-medium">
                  Featured
                </span>
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      featured: !prev.featured,
                    }))
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
            </div>

            {/* Featured Image Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 mt-4">
              <p className="text-xs font-semibold text-gray-900 tracking-tight mb-3">
                Featured Image
              </p>
              <div className="w-full h-[160px] bg-[#FEF3C7] border  rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#fef3c7] transition-colors">
                <p className="text-sm text-[#0c0b0b] font-medium">
                  Upload Image
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}