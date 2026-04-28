import { useState } from "react";
import toast from "react-hot-toast";

export default function FooterSettings() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    brand1: "",
    brand2: "",
    navigation: "",
    navigation2: "",
    navigation3: "",
    navigation4: "",
    navigation5: "",
    navigation6: "",
    media_link1: "",
    media_link2: "",
    copyright: "",
    cta: "",
    cta2: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Footer published successfully!");
    } catch (error) {
      toast.error("Failed to publish footer");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans mb-14">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">Footer</p>
      </div>

      {/* RIGHT SIDEBAR - Publish Button */}
      <div className="w-full lg:w-[240px] flex-shrink-0 mt-6 ml-auto">
        <button
          onClick={handlePublish}
          disabled={loading}
          className="w-28 py-2.5 rounded-lg text-sm font-semibold bg-[#4F46E5] text-gray-200 hover:bg-[#8a86d4] transition-colors disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      {/* Footer Branding Section */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-[#E5E7EB] rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700">Footer Branding</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="brand1"
                  value={form.brand1}
                  onChange={handleChange}
                  placeholder="branding 1"
                  className={`${inputClass} max-w-sm`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="brand2"
                  value={form.brand2}
                  onChange={handleChange}
                  placeholder="branding 2"
                  className={`${inputClass} max-w-md`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-[#E5E7EB] rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700">Footer Navigation</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="navigation"
                  value={form.navigation}
                  onChange={handleChange}
                  placeholder="link 1"
                  className={`${inputClass} max-w-xs bg-[#EEF2FF]`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="navigation2"
                  value={form.navigation2}
                  onChange={handleChange}
                  placeholder="link 2"
                  className={`${inputClass} max-w-xs bg-[#EEF2FF]`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="navigation3"
                  value={form.navigation3}
                  onChange={handleChange}
                  placeholder="link 3"
                  className={`${inputClass} max-w-xs bg-[#EEF2FF]`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="navigation4"
                  value={form.navigation4}
                  onChange={handleChange}
                  placeholder="link 4"
                  className={`${inputClass} max-w-xs bg-[#EEF2FF]`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="navigation5"
                  value={form.navigation5}
                  onChange={handleChange}
                  placeholder="link 5"
                  className={`${inputClass} max-w-xs bg-[#EEF2FF]`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="navigation6"
                  value={form.navigation6}
                  onChange={handleChange}
                  placeholder="link 6"
                  className={`${inputClass} max-w-xs bg-[#EEF2FF]`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-[#E5E7EB] rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700">Social Media Link</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="media_link1"
                  value={form.media_link1}
                  onChange={handleChange}
                  placeholder="media link 1"
                  className={`${inputClass} max-w-sm`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="media_link2"
                  value={form.media_link2}
                  onChange={handleChange}
                  placeholder="media link 2"
                  className={`${inputClass} max-w-md`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright text */}
      <section className="px-4 sm:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Copyright
            </label>
            <input
              type="text"
              name="copyright"
              value={form.copyright}
              onChange={handleChange}
              placeholder="copyright text"
              className="w-full bg-[#E5E7EB] rounded-xl border border-gray-200 shadow-sm p-4 text-gray-700 outline-none focus:border-[#c5a355] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Footer subscriber CTA */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-[#E5E7EB] rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700">Footer subscriber CTA</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="cta"
                  value={form.cta}
                  onChange={handleChange}
                  placeholder="CTA 1"
                  className={`${inputClass} max-w-lg bg-[#f8e0ee]`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                <input
                  type="text"
                  name="cta2"
                  value={form.cta2}
                  onChange={handleChange}
                  placeholder="CTA 2"
                  className={`${inputClass} max-w-xs`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}