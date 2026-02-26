import { useState } from "react";

export default function Journals() {
  const [form, setForm] = useState({
    title: "",
    authors: "",
    abstract: "",
    keywords: "",
    doi: "",
    publicationYear: "",
    volume: "",
    issue: "",
    citationFormat: "",
    visibility: "",
    researchCategory: "",
    featureOnHomepage: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[14px] text-gray-600 font-medium">
          Journals{" "}
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">Add New</span>
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-tight uppercase mb-3">
          Add New Journal Entry
        </p>

        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN PANEL ── */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 space-y-5">

              {/* Journal Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Journal Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Author(s) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Author(s)
                </label>
                <input
                  type="text"
                  name="authors"
                  value={form.authors}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Abstract */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Abstract
                </label>
                <textarea
                  name="abstract"
                  value={form.abstract}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={form.keywords}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Publication Metadata */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-5">
                  Publication Metadata
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-medium mb-1.5">
                      DOI
                    </label>
                    <input
                      type="text"
                      name="doi"
                      value={form.doi}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
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
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-medium mb-1.5">
                      Volume
                    </label>
                    <input
                      type="text"
                      name="volume"
                      value={form.volume}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-medium mb-1.5">
                      Issue
                    </label>
                    <input
                      type="text"
                      name="issue"
                      value={form.issue}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Citation Format */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Citation Format
                </label>
                <textarea
                  name="citationFormat"
                  value={form.citationFormat}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
                />
              </div>

              {/* Journal File */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Journal File
                </label>
                <div className="w-full h-[80px] mb-16 bg-[#E0E7FF]  rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors">
                  <p className="text-sm text-[#0f0f11] font-medium">
                    Upload PDF
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-[200px] flex-shrink-0 space-y-5">

            {/* Publish Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-4">
              <p className="text-xs font-semibold text-gray-900 tracking-widest uppercase">
                Publish
              </p>

              <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-black hover:bg-green-200 transition-colors">
                Save Draft
              </button>

              <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#6366F1] text-black hover:bg-[#6a5dbf] transition-colors">
                Publish
              </button>

              {/* Visibility */}
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">
                  Visibility
                </label>
                <input
                  type="text"
                  name="visibility"
                  value={form.visibility}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all"
                />
              </div>

              {/* Research Category */}
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">
                  Research Category
                </label>
                <textarea
                  name="researchCategory"
                  value={form.researchCategory}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all resize-none"
                />
              </div>

              {/* Feature on Homepage */}
              <div className="flex items-center justify-between pb-16">
                <span className="text-xs text-gray-800 font-medium">
                  Feature on Homepage
                </span>
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      featureOnHomepage: !prev.featureOnHomepage,
                    }))
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
            </div>

            {/* Cover Image Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-gray-800 tracking-widest uppercase mb-3">
                Cover Image
              </p>
              <div className="w-full h-[160px] bg-[#FEF3C7]  rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#fef3c7] transition-colors">
                <p className="text-sm text-[#181716] font-medium">
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