import { useState } from "react";

export default function Teachings() {
  const [form, setForm] = useState({
    title: "",
    series: "",
    scriptureReference: "",
    description: "",
    videoEmbedUrl: "",
    transcript: "",
    duration: "",
    tags: "",
    schedule: "",
    seriesCategory: "",
    featured: false,
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
          Teachings{" "}
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">Add New</span>
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-6">
        <p className="text-sm font-semibold text-gray-600 tracking-tight uppercase mb-4">
          Add New Teaching
        </p>

        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN PANEL ── */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 space-y-5">

              {/* Teaching Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Teaching Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Series */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Series
                </label>
                <input
                  type="text"
                  name="series"
                  value={form.series}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Scripture Reference */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Scripture Reference
                </label>
                <input
                  type="text"
                  name="scriptureReference"
                  value={form.scriptureReference}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
                />
              </div>

              {/* Media */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Media
                </label>
                <div className="w-full h-[80px] bg-[#e8eaf6] border border-[#E0E7FF] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors">
                  <p className="text-sm text-[#0f0f11] font-medium">
                    Upload Audio (MP3)
                  </p>
                </div>
              </div>

              {/* Video Embed URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Video Embed URL (YouTube/Vimeo)
                </label>
                <input
                  type="text"
                  name="videoEmbedUrl"
                  value={form.videoEmbedUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Transcript */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Transcript
                </label>
                <textarea
                  name="transcript"
                  value={form.transcript}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                  style={{ maxWidth: "240px" }}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border mb-16 border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-[200px] flex-shrink-0 space-y-5">

            {/* Publish Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-5">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
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
                <label className="block text-xs text-gray-500 font-medium mb-1.5">
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

              {/* Featured */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
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

              {/* Series Category */}
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">
                  Series Category
                </label>
                <textarea
                  name="seriesCategory"
                  value={form.seriesCategory}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all resize-none mb-16"
                />
              </div>
            </div>

            {/* Thumbnail Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3">
                Thumbnail
              </p>
              <div className="w-full h-[160px] bg-[#FEF3C7]  rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#fef3c7] transition-colors">
                <p className="text-sm text-[#0a0a09] font-medium">
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