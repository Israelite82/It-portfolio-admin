import { useState } from "react";

export default function Homepage() {
  const [headline, setHeadline] = useState("");
  const [subtext, setSubtext] = useState("");
  const [featuredTeaching, setFeaturedTeaching] = useState("");
  const [featuredBlog, setFeaturedBlog] = useState("");
  const [featuredBook, setFeaturedBook] = useState("");
  const [journalSpotlight, setJournalSpotlight] = useState("");

  const [visibility, setVisibility] = useState({
    Hero: true,
    Teaching: true,
    Blog: true,
    Books: true,
  });

  const [sections, setSections] = useState([
    "Hero",
    "Featured Teaching",
    "Featured Blog",
    "Featured Book",
    "Journal Spotlight",
  ]);

  const [dragIndex, setDragIndex] = useState(null);

  const toggleVisibility = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...sections];
    const dragged = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, dragged);
    setSections(updated);
    setDragIndex(index);
  };

  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          Homepage Settings
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-widest uppercase mb-5">
          Homepage Layout Manager
        </p>

        <div className="flex gap-6 items-start">

          {/* ── LEFT MAIN PANEL ── */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 space-y-6">

            {/* Hero Section */}
            <div>
              <h3 className="text-sm font-semibold text-[#1a1612] mb-4">
                Hero Section
              </h3>

              {/* Headline */}
              <div className="mb-4">
                <label className="block text-xs text-gray-9s00 font-medium mb-1.5">
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
                />
              </div>

              {/* Subtext */}
              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Subtext
                </label>
                <textarea
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
                />
              </div>

              {/* Hero Background Image */}
              <div>
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Hero Background Image
                </label>
                <div className="w-full h-[120px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-[#7c7fc4] mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                    <p className="text-xs text-[#7c7fc4] font-medium">
                      Click to upload image
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Featured Teaching */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                Featured Teaching
              </label>
              <input
                type="text"
                value={featuredTeaching}
                onChange={(e) => setFeaturedTeaching(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
              />
            </div>

            {/* Featured Blog Post */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                Featured Blog Post
              </label>
              <input
                type="text"
                value={featuredBlog}
                onChange={(e) => setFeaturedBlog(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
              />
            </div>

            {/* Featured Book */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                Featured Book
              </label>
              <input
                type="text"
                value={featuredBook}
                onChange={(e) => setFeaturedBook(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
              />
            </div>

            {/* Journal Spotlight */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                Journal Spotlight
              </label>
              <input
                type="text"
                value={journalSpotlight}
                onChange={(e) => setJournalSpotlight(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all"
              />
            </div>

            <hr className="border-gray-100" />

            {/* Section Order */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Section Order
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                {sections.map((section, index) => (
                  <div
                    key={section}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 px-5 py-3 text-sm text-gray-900 cursor-grab border-b border-gray-100 last:border-0 transition-colors ${
                      dragIndex === index ? "bg-blue-50" : "hover:bg-gray-100"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 flex-shrink-0">
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <line x1="3" y1="12" x2="21" y2="12"/>
                      <line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                    {section}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-[200px] flex-shrink-0 space-y-6">

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-black tracking-widest uppercase mb-4">
                Actions
              </p>
              <div className="space-y-2.5">
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-gray-700 hover:bg-green-200 transition-colors">
                  Publish Homepage
                </button>
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#E5E7EB] text-gray-700 hover:bg-gray-200 transition-colors">
                  Preview
                </button>
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#FECACA] text-gray-700 hover:bg-red-200 transition-colors">
                  Reset to Default
                </button>
              </div>
            </div>

            {/* Section Visibility */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-sm font-semibold text-black tracking-tight  mb-4">
                Section Visibility
              </p>
              <div className="space-y-5">
                {Object.keys(visibility).map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{key}</span>
                    <button
                      onClick={() => toggleVisibility(key)}
                      className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                        visibility[key] ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                          visibility[key] ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}