import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { footerAPI } from "../lib/apiService";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    // Brand
    brand_title: "",
    brand_subtitle: "",
    
    // Quick Links
    quick_links: [
      { name: "Home", link: "/" },
      { name: "Teachings", link: "/teaching" },
      { name: "Research", link: "/research" }
    ],
    
    // Social Links
    social_facebook: "",
    social_twitter: "",
    social_instagram: "",
    social_linkedin: "",
    social_youtube: "",
    
    // Copyright
    copyright_text: "",
    
    // CTA
    cta_title: "",
    cta_button_text: "",
    cta_button_link: ""
  });

  // Fetch footer data on load
  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await footerAPI.getFooter();
      const data = response.data.data || response.data;
      
      if (data) {
        setForm({
          // Brand
          brand_title: data.brand?.title || "",
          brand_subtitle: data.brand?.subtitle || "",
          
          // Quick Links
          quick_links: data.quick_links || [
            { name: "Home", link: "/" },
            { name: "Teachings", link: "/teaching" },
            { name: "Research", link: "/research" }
          ],
          
          // Social Links
          social_facebook: data.social_links?.facebook || "",
          social_twitter: data.social_links?.twitter || "",
          social_instagram: data.social_links?.instagram || "",
          social_linkedin: data.social_links?.linkedin || "",
          social_youtube: data.social_links?.youtube || "",
          
          // Copyright
          copyright_text: data.copyright || "",
          
          // CTA
          cta_title: data.cta?.title || "",
          cta_button_text: data.cta?.button_text || "",
          cta_button_link: data.cta?.button_link || ""
        });
      }
    } catch (error) {
      console.error("Error fetching footer data:", error);
      toast.error("Failed to load footer data");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickLinkChange = (index, field, value) => {
    const updatedLinks = [...form.quick_links];
    updatedLinks[index][field] = value;
    setForm((prev) => ({ ...prev, quick_links: updatedLinks }));
  };

  const addQuickLink = () => {
    setForm((prev) => ({
      ...prev,
      quick_links: [...prev.quick_links, { name: "", link: "" }]
    }));
  };

  const removeQuickLink = (index) => {
    const updatedLinks = form.quick_links.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, quick_links: updatedLinks }));
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const payload = {
        brand_title: form.brand_title,
        brand_subtitle: form.brand_subtitle,
        quick_links: form.quick_links,
        social_facebook: form.social_facebook,
        social_twitter: form.social_twitter,
        social_instagram: form.social_instagram,
        social_linkedin: form.social_linkedin,
        social_youtube: form.social_youtube,
        copyright_text: form.copyright_text,
        cta_title: form.cta_title,
        cta_button_text: form.cta_button_text,
        cta_button_link: form.cta_button_link
      };
      
      await footerAPI.updateFooter(payload);
      toast.success("Footer published successfully!");
      
      // Refresh data
      await fetchFooterData();
    } catch (error) {
      console.error("Error publishing footer:", error);
      toast.error(error.response?.data?.message || "Failed to publish footer");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading footer settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans mb-14">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">Footer Settings</p>
      </div>

      {/* RIGHT SIDEBAR - Publish Button */}
      <div className="w-full px-4 sm:px-8 py-4 flex justify-end">
        <button
          onClick={handlePublish}
          disabled={loading}
          className="w-32 py-2.5 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#6366F1] transition-colors disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      {/* Footer Branding Section */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700 text-lg">Footer Branding</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Title
                </label>
                <input
                  type="text"
                  name="brand_title"
                  value={form.brand_title}
                  onChange={handleChange}
                  placeholder="e.g., Dr. Osaren Emokpae"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Subtitle
                </label>
                <input
                  type="text"
                  name="brand_subtitle"
                  value={form.brand_subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Scholar • Apostle • Entrepreneur"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation (Quick Links) */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700 text-lg">Quick Links</p>
              <button
                onClick={addQuickLink}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Link
              </button>
            </div>
            
            {form.quick_links.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border-b border-gray-100 pb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Name
                  </label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => handleQuickLinkChange(index, "name", e.target.value)}
                    placeholder="e.g., Home"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={link.link}
                    onChange={(e) => handleQuickLinkChange(index, "link", e.target.value)}
                    placeholder="e.g., /"
                    className={inputClass}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => removeQuickLink(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            {form.quick_links.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No quick links added. Click "Add Link" to create one.</p>
            )}
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700 text-lg">Social Media Links</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={form.social_facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter / X
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  value={form.social_twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  name="social_instagram"
                  value={form.social_instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="social_linkedin"
                  value={form.social_linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube
                </label>
                <input
                  type="url"
                  name="social_youtube"
                  value={form.social_youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/@..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Text */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700 text-lg">Copyright</p>
            <div>
              <input
                type="text"
                name="copyright_text"
                value={form.copyright_text}
                onChange={handleChange}
                placeholder="© 2026 Dr. Osaren Emokpae All rights reserved."
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <p className="font-semibold text-gray-700 text-lg">Call to Action (Optional)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Title
                </label>
                <input
                  type="text"
                  name="cta_title"
                  value={form.cta_title}
                  onChange={handleChange}
                  placeholder="Subscribe to our newsletter"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  name="cta_button_text"
                  value={form.cta_button_text}
                  onChange={handleChange}
                  placeholder="Subscribe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  name="cta_button_link"
                  value={form.cta_button_link}
                  onChange={handleChange}
                  placeholder="/subscribe"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}