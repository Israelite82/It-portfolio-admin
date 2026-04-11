import React, { useState } from "react";
import toast from "react-hot-toast";

function ImageUpload({ label, onImageChange, existingImage }) {
  const [preview, setPreview] = useState(existingImage || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageChange?.(file);
    }
  };

  return (
    <div>
      <label className="block text-xs text-gray-900 font-medium mb-1.5">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id={label.replace(/\s/g, '')}
      />
      <label
        htmlFor={label.replace(/\s/g, '')}
        className="w-full h-[220px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <svg className="w-8 h-8 text-[#7c7fc4] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-xs text-[#7c7fc4] font-medium">Click to upload {label.toLowerCase()}</p>
          </div>
        )}
      </label>
    </div>
  );
}

export default function AboutPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    headline: "",
    subtitle: "",
    brandStory: "",
    mainContent: "",
    additionalContent: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Saved successfully!");
    } catch (error) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Published successfully!");
    } catch (error) {
      toast.error("Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Deleted successfully!");
      setForm({
        headline: "", subtitle: "", brandStory: "", mainContent: "", additionalContent: ""
      });
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";
  const textareaClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          About Page Setting
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT MAIN PANEL */}
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6 pb-16">
            {/* About Hero Section */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">
                About Hero Section
              </p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">
                Headline
              </label>
              <textarea
                name="headline"
                value={form.headline}
                onChange={handleChange}
                rows={4}
                placeholder="Heading text here"
                className={textareaClass}
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">
                Subtitle
              </label>
              <textarea
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                rows={6}
                placeholder="Enter subtitle"
                className={textareaClass}
              />
            </div>

            {/* Hero background Image */}
            <ImageUpload label="Hero background Image" />

            {/* Brand Story */}
            <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">
                Brand Story
              </label>
              <textarea
                name="brandStory"
                value={form.brandStory}
                onChange={handleChange}
                rows={6}
                placeholder="Brand story here..."
                className={textareaClass}
              />
            </div>

             {/* Academic Biography */}
            <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">
                Academic Biography
              </label>
              <textarea
                name="academicBiography"
                value={form.academicBiography}
                onChange={handleChange}
                rows={6}
                placeholder="Academic biography here..."
                className={textareaClass}
              />
            </div>

             {/* Apostle Osaren Emokpae */}
            <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">
                Apostle Osaren Emokpae
              </label>
              <textarea
                name="apostleBiography"
                value={form.apostleBiography}
                onChange={handleChange}
                rows={6}
                placeholder="Apostle biography here..."
                className={textareaClass}
              />
            </div>

            {/* Apostle Osaren Emokpae Image */}
            <ImageUpload label="Apostle Osaren Emokpae Image" />

            {/* Main Content with Toolbar */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Main Content
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
                  name="mainContent"
                  value={form.mainContent}
                  onChange={handleChange}
                  rows={18}
                  className="w-full px-4 py-3 text-sm text-gray-700 bg-white outline-none resize-none"
                  placeholder="Enter main content here..."
                />
              </div>
            </div>

            {/* Additional Content with Toolbar */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Additional Content
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
                  name="additionalContent"
                  value={form.additionalContent}
                  onChange={handleChange}
                  rows={15}
                  className="w-full px-4 py-3 text-sm text-gray-700 bg-white outline-none resize-none"
                  placeholder="Enter additional content here..."
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - Actions */}
          <div className="w-full lg:w-[240px] flex-shrink-0 space-y-6  ">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 pb-16">
              <p className="text-xs font-semibold text-black tracking-widest uppercase mb-4">
                Actions
              </p>
              <div className="space-y-10">
               
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="w-full py-8 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-gray-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="w-full py-8 rounded-lg text-sm font-semibold bg-[#FECACA] text-gray-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset to Default"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}