import { useState, useEffect } from "react";
import { homepageAPI } from "../lib/apiService";
import toast from "react-hot-toast";

export default function Homepage() {
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState(null);
  const [biographyImage, setBiographyImage] = useState(null);
  const [currentHeroImageUrl, setCurrentHeroImageUrl] = useState(null);
  const [currentBiographyImageUrl, setCurrentBiographyImageUrl] = useState(null);
  
  const [form, setForm] = useState({
    // Hero section
    headline: "",
    subtext: "",
    // Biography section
    biographyContent: "",
    // Media section
    mediaTitle: "Click the image below to watch our teachings on YouTube",
    youtubeUrl: "https://www.youtube.com/@theanchor1079",
    mediaButtonText: "YouTube Channel",
    mediaBackgroundColor: "#dc2626",
    mediaIconColor: "#ffffff",
  });

  const [slides, setSlides] = useState([
    { id: null, image: null, title: "Dr. Osaren Emokpae", subtitle: "Scholar▫️Teacher▫️Christian Leader▫️Writer▫️Entrepreneur", has_text: true, button_text: "Read Full Bio", button_link: "/about" },
    { id: null, image: null, title: "", subtitle: "", has_text: true, button_text: "Read Full Bio", button_link: "/about" },
    { id: null, image: null, title: "", subtitle: "", has_text: false, button_text: null, button_link: null },
    { id: null, image: null, title: "", subtitle: "", has_text: false, button_text: null, button_link: null },
  ]);

  const [slideImages, setSlideImages] = useState({});
  const [currentSlideImages, setCurrentSlideImages] = useState({});

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const res = await homepageAPI.getHomePage();
      console.log("Homepage data:", res.data);
      
      const data = res.data.data || res.data;
      
      // Update hero section
      if (data.hero) {
        setForm(prev => ({
          ...prev,
          headline: data.hero.headline || "",
          subtext: data.hero.subtext || "",
        }));
        setCurrentHeroImageUrl(data.hero.background_image);
      }
      
      // Update biography section
      if (data.biography) {
        setForm(prev => ({
          ...prev,
          biographyContent: data.biography.content || "",
        }));
        setCurrentBiographyImageUrl(data.biography.image);
      }
      
      // Update media section
      if (data.media) {
        setForm(prev => ({
          ...prev,
          mediaTitle: data.media.title || "Click the image below to watch our teachings on YouTube",
          youtubeUrl: data.media.youtube_url || "https://www.youtube.com/@theanchor1079",
          mediaButtonText: data.media.button_text || "YouTube Channel",
          mediaBackgroundColor: data.media.background_color || "#dc2626",
          mediaIconColor: data.media.icon_color || "#ffffff",
        }));
      }
      
      // Update slides
      if (data.slides && data.slides.length === 4) {
        const updatedSlides = slides.map((slide, index) => ({
          ...slide,
          id: data.slides[index].id,
          title: data.slides[index].title || slide.title,
          subtitle: data.slides[index].subtitle || slide.subtitle,
          has_text: data.slides[index].has_text ?? slide.has_text,
          button_text: data.slides[index].button_text || slide.button_text,
          button_link: data.slides[index].button_link || slide.button_link,
        }));
        setSlides(updatedSlides);
        
        // Store current image URLs
        const imageUrls = {};
        data.slides.forEach((slide, index) => {
          if (slide.image) {
            imageUrls[index] = slide.image;
          }
        });
        setCurrentSlideImages(imageUrls);
      }
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      toast.error("Failed to load homepage data");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  const handleSlideImageChange = (index, file) => {
    setSlideImages(prev => ({ ...prev, [index]: file }));
  };

  const handleRemoveSlideImage = (index) => {
    setSlideImages(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
    setCurrentSlideImages(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const handleRemoveHeroImage = async () => {
    if (!window.confirm("Remove hero background image?")) return;
    try {
      await homepageAPI.deleteHeroImage();
      setCurrentHeroImageUrl(null);
      setHeroImage(null);
      toast.success("Hero image removed");
    } catch (error) {
      console.error("Error removing hero image:", error);
      toast.error("Failed to remove hero image");
    }
  };

  const handleRemoveBiographyImage = async () => {
    if (!window.confirm("Remove biography image?")) return;
    try {
      await homepageAPI.deleteBiographyImage();
      setCurrentBiographyImageUrl(null);
      setBiographyImage(null);
      toast.success("Biography image removed");
    } catch (error) {
      console.error("Error removing biography image:", error);
      toast.error("Failed to remove biography image");
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Hero section
      formData.append("hero_headline", form.headline);
      formData.append("hero_subtext", form.subtext);
      if (heroImage) {
        formData.append("hero_background_image", heroImage);
      }
      
      // Biography section
      formData.append("biography_content", form.biographyContent);
      if (biographyImage) {
        formData.append("biography_image", biographyImage);
      }
      
      // Media section
      formData.append("media_title", form.mediaTitle);
      formData.append("media_youtube_url", form.youtubeUrl);
      formData.append("media_button_text", form.mediaButtonText);
      formData.append("media_background_color", form.mediaBackgroundColor);
      formData.append("media_icon_color", form.mediaIconColor);
      
      // Slides
      slides.forEach((slide, index) => {
        formData.append(`slides[${index}][id]`, slide.id || "");
        formData.append(`slides[${index}][title]`, slide.title || "");
        formData.append(`slides[${index}][subtitle]`, slide.subtitle || "");
        formData.append(`slides[${index}][has_text]`, slide.has_text ? "1" : "0");
        formData.append(`slides[${index}][button_text]`, slide.button_text || "");
        formData.append(`slides[${index}][button_link]`, slide.button_link || "");
        formData.append(`slides[${index}][order]`, index);
        
        if (slideImages[index]) {
          formData.append(`slides[${index}][image]`, slideImages[index]);
        }
      });
      
      console.log("Sending to API...");
      await homepageAPI.updateHomepage(formData);
      toast.success("Homepage published successfully!");
      
      // Refresh data
      await fetchHomepageData();
      setHeroImage(null);
      setBiographyImage(null);
      setSlideImages({});
      
    } catch (error) {
      console.error("Error publishing homepage:", error);
      toast.error(error.response?.data?.message || "Failed to publish homepage");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset homepage to default settings?")) return;
    
    setForm({
      headline: "",
      subtext: "",
      biographyContent: "",
      mediaTitle: "Click the image below to watch our teachings on YouTube",
      youtubeUrl: "https://www.youtube.com/@theanchor1079",
      mediaButtonText: "YouTube Channel",
      mediaBackgroundColor: "#dc2626",
      mediaIconColor: "#ffffff",
    });
    
    setSlides([
      { id: null, image: null, title: "Dr. Osaren Emokpae", subtitle: "Scholar▫️Teacher▫️Christian Leader▫️Writer▫️Entrepreneur", has_text: true, button_text: "Read Full Bio", button_link: "/about" },
      { id: null, image: null, title: "", subtitle: "", has_text: true, button_text: "Read Full Bio", button_link: "/about" },
      { id: null, image: null, title: "", subtitle: "", has_text: false, button_text: null, button_link: null },
      { id: null, image: null, title: "", subtitle: "", has_text: false, button_text: null, button_link: null },
    ]);
    
    setHeroImage(null);
    setBiographyImage(null);
    setSlideImages({});
    setCurrentHeroImageUrl(null);
    setCurrentBiographyImageUrl(null);
    setCurrentSlideImages({});
    
    toast.success("Form reset to default!");
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          Homepage Settings
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-widest uppercase mb-5">
          Homepage Layout Manager
        </p>

        <div className="flex flex-col gap-6">
          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-6">
            
            {/* Hero Section */}
            <div>
              <h3 className="text-sm font-semibold text-[#1a1612] mb-4">
                Hero Section (Slide 2)
              </h3>

              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  value={form.headline}
                  onChange={handleFormChange}
                  className={inputClass}
                  placeholder="Welcome"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Subtext
                </label>
                <textarea
                  name="subtext"
                  value={form.subtext}
                  onChange={handleFormChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Enter subtext here..."
                />
              </div>

              <div>
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Background Image
                </label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setHeroImage(e.target.files[0])}
                      className="hidden"
                      id="heroImageInput"
                    />
                    <label
                      htmlFor="heroImageInput"
                      className="w-full h-[120px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden"
                    >
                      {(heroImage || currentHeroImageUrl) ? (
                        <img
                          src={heroImage ? URL.createObjectURL(heroImage) : currentHeroImageUrl}
                          alt="Hero preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <svg className="w-8 h-8 text-[#7c7fc4] mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <p className="text-xs text-[#7c7fc4] font-medium">Click to upload image</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {currentHeroImageUrl && (
                    <button
                      onClick={handleRemoveHeroImage}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Slides 1, 3, 4 Management */}
            <div>
              <h3 className="text-sm font-semibold text-[#1a1612] mb-4">
                Slides Management
              </h3>
              
              {slides.map((slide, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Slide {index + 1}</h4>
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-900 font-medium mb-1.5">
                      Image
                    </label>
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlideImageChange(index, e.target.files[0])}
                          className="hidden"
                          id={`slideImageInput${index}`}
                        />
                        <label
                          htmlFor={`slideImageInput${index}`}
                          className="w-full h-[100px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden"
                        >
                          {(slideImages[index] || currentSlideImages[index]) ? (
                            <img
                              src={slideImages[index] ? URL.createObjectURL(slideImages[index]) : currentSlideImages[index]}
                              alt={`Slide ${index + 1} preview`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <svg className="w-6 h-6 text-[#7c7fc4] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                              </svg>
                              <p className="text-xs text-[#7c7fc4] font-medium mt-1">Upload image</p>
                            </div>
                          )}
                        </label>
                      </div>
                      {currentSlideImages[index] && !slideImages[index] && (
                        <button
                          onClick={() => handleRemoveSlideImage(index)}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-900 font-medium mb-1.5">
                      Has Text Overlay?
                    </label>
                    <input
                      type="checkbox"
                      checked={slide.has_text}
                      onChange={(e) => handleSlideChange(index, "has_text", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Show text on this slide</span>
                  </div>
                  
                  {slide.has_text && (
                    <>
                      <div className="mb-3">
                        <label className="block text-xs text-gray-900 font-medium mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={slide.title || ""}
                          onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                          className={inputClass}
                          placeholder="Slide title"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="block text-xs text-gray-900 font-medium mb-1.5">
                          Subtitle
                        </label>
                        <textarea
                          value={slide.subtitle || ""}
                          onChange={(e) => handleSlideChange(index, "subtitle", e.target.value)}
                          rows={2}
                          className={`${inputClass} resize-none`}
                          placeholder="Slide subtitle"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="block text-xs text-gray-900 font-medium mb-1.5">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={slide.button_text || ""}
                          onChange={(e) => handleSlideChange(index, "button_text", e.target.value)}
                          className={inputClass}
                          placeholder="e.g., Read More"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-900 font-medium mb-1.5">
                          Button Link
                        </label>
                        <input
                          type="text"
                          value={slide.button_link || ""}
                          onChange={(e) => handleSlideChange(index, "button_link", e.target.value)}
                          className={inputClass}
                          placeholder="e.g., /about"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            {/* Biography Section */}
            <div>
              <h3 className="text-sm font-semibold text-[#1a1612] mb-4">
                Biography Section
              </h3>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Biography Image
                </label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBiographyImage(e.target.files[0])}
                      className="hidden"
                      id="biographyImageInput"
                    />
                    <label
                      htmlFor="biographyImageInput"
                      className="w-full h-[120px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden"
                    >
                      {(biographyImage || currentBiographyImageUrl) ? (
                        <img
                          src={biographyImage ? URL.createObjectURL(biographyImage) : currentBiographyImageUrl}
                          alt="Biography preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <svg className="w-8 h-8 text-[#7c7fc4] mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <p className="text-xs text-[#7c7fc4] font-medium">Click to upload image</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {currentBiographyImageUrl && (
                    <button
                      onClick={handleRemoveBiographyImage}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Biography Content
                </label>
                <textarea
                  name="biographyContent"
                  value={form.biographyContent}
                  onChange={handleFormChange}
                  rows={8}
                  className={`${inputClass} resize-none`}
                  placeholder="Enter biography text here..."
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Media Section */}
            <div>
              <h3 className="text-sm font-semibold text-[#1a1612] mb-4">
                Media Section (YouTube)
              </h3>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  name="mediaTitle"
                  value={form.mediaTitle}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={form.youtubeUrl}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-900 font-medium mb-1.5">
                  Button Text
                </label>
                <input
                  type="text"
                  name="mediaButtonText"
                  value={form.mediaButtonText}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-900 font-medium mb-1.5">
                    Background Color (Hex)
                  </label>
                  <input
                    type="color"
                    name="mediaBackgroundColor"
                    value={form.mediaBackgroundColor}
                    onChange={handleFormChange}
                    className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-900 font-medium mb-1.5">
                    Icon Color (Hex)
                  </label>
                  <input
                    type="color"
                    name="mediaIconColor"
                    value={form.mediaIconColor}
                    onChange={handleFormChange}
                    className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - ACTIONS */}
          <div className="w-full lg:w-[300px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-black tracking-widest uppercase mb-4">
                Actions
              </p>
              <div className="space-y-3">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-green-100 text-gray-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish Homepage"}
                </button>
          
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-red-100 text-gray-700 hover:bg-red-200 transition-colors"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}