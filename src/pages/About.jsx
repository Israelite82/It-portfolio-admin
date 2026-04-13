import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { aboutAPI } from "../lib/apiService";

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
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    headline: "",
    subtitle: "",
    brandStory: "",
    academicBiography: "",
    apostleBiography: "",
    mainContent: "",
    additionalContent: ""
  });

  const [heroImage, setHeroImage] = useState(null);
  const [apostleImage, setApostleImage] = useState(null);
  const [existingHeroImage, setExistingHeroImage] = useState("");
  const [existingApostleImage, setExistingApostleImage] = useState("");

  // Fetch existing data on load
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await aboutAPI.getAbout();
        const data = response.data.data || response.data;
        
        if (data) {
          setForm({
            headline: data.hero_headline || "",
            subtitle: data.hero_subtext || "",
            brandStory: data.brand_story || "",
            academicBiography: data.academic_biography || "",
            apostleBiography: data.apostle_content || "",
            mainContent: data.track_record_content || "",
            additionalContent: data.additional_content || ""
          });
          
          setExistingHeroImage(data.hero_background_image || "");
          setExistingApostleImage(data.apostle_image || "");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        toast.error("Failed to load about data");
      } finally {
        setFetching(false);
      }
    };
    
    fetchAboutData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
  setLoading(true);
  try {
    const formData = new FormData();
    
    formData.append("hero_headline", form.headline);
    formData.append("hero_subtext", form.subtitle);
    formData.append("brand_story", form.brandStory);
    formData.append("academic_biography", form.academicBiography);
    
    // Fix: Send apostle content correctly
    formData.append("apostle_content", form.apostleBiography);
    
    // Fix: Send track record content correctly  
    formData.append("track_record_content", form.mainContent);
    
    if (form.additionalContent) {
      formData.append("additional_content", form.additionalContent);
    }
    
    if (heroImage) {
      formData.append("hero_background_image", heroImage);
    }
    if (apostleImage) {
      formData.append("apostle_image", apostleImage);
    }
    
    // Log what you're sending
    console.log("Sending apostle_content:", form.apostleBiography);
    console.log("Sending track_record_content:", form.mainContent);
    
    await aboutAPI.updateAbout(formData);
    
    toast.success("About page published successfully!");
    
    // Refresh after publish
    const response = await aboutAPI.getAbout();
    const data = response.data.data || response.data;
    
    console.log("After publish - Apostle:", data.brand_story?.apostle);
    console.log("After publish - Track record:", data.missions?.track_record);
    
    // ... rest of refresh code
  } catch (error) {
    console.error("Error publishing about:", error);
    toast.error(error.response?.data?.message || "Failed to publish about page");
  } finally {
    setLoading(false);
  }
};

  const handleReset = async () => {
    if (!window.confirm("Reset about page to default settings?")) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("hero_headline", "");
      formData.append("hero_subtext", "");
      formData.append("brand_story", "");
      formData.append("academic_biography", "");
      formData.append("apostle_content", "");
      formData.append("track_record_content", "");
      
      await aboutAPI.updateAbout(formData);
      
      setForm({
        headline: "",
        subtitle: "",
        brandStory: "",
        academicBiography: "",
        apostleBiography: "",
        mainContent: "",
        additionalContent: ""
      });
      setHeroImage(null);
      setApostleImage(null);
      setExistingHeroImage("");
      setExistingApostleImage("");
      
      toast.success("About page reset to default!");
    } catch (error) {
      console.error("Error resetting about:", error);
      toast.error("Failed to reset about page");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";
  const textareaClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none";

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading about page data...</div>
      </div>
    );
  }

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
            <ImageUpload 
              label="Hero background Image" 
              onImageChange={setHeroImage}
              existingImage={existingHeroImage}
            />

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
            <ImageUpload 
              label="Apostle Osaren Emokpae Image" 
              onImageChange={setApostleImage}
              existingImage={existingApostleImage}
            />

            {/* Track Record Content */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Track Record of Excellence
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
                  placeholder="Enter track record content here..."
                />
              </div>
            </div>

            {/* Additional Content */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Additional Content (Optional)
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
          <div className="w-full lg:w-[240px] flex-shrink-0 space-y-6">
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
                  onClick={handleReset}
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