import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { aboutAPI } from "../lib/apiService";

// Menu Bar component for rich text formatting
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Strike"
      >
        <s>S</s>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Heading 3"
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Numbered List"
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('blockquote') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Quote"
      >
        " Quote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-100"
        title="Divider"
      >
        —
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-100"
        title="Undo"
      >
        ↶
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-100"
        title="Redo"
      >
        ↷
      </button>
    </div>
  );
};

// Rich Text Editor component using TipTap
const RichTextEditor = ({ value, onChange, placeholder, height = 300 }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: placeholder || 'Write your content here...',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        style={{ minHeight: `${height}px` }}
        className="rich-text-editor"
      />
    </div>
  );
};

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
          <img src={`https://api.osarenemokpae.com/storage/${preview}`} alt="Preview" className="w-full h-full object-cover" />
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
    hero_headline: "",
    hero_subtext: "",
    brand_story: "",
    youtube_link: "",
    linkedin_link: "",
    apostle_name: "",
    academic_biography: "",
    apostle_biography: "",
    mission_statement_1: "",
    mission_statement_2: "",
    mission_statement_3: "",
    track_record_title: "",
    track_record_description: ""
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
            hero_headline: data.hero_section?.headline || "",
            hero_subtext: data.hero_section?.subtext || "",
            brand_story: data.brand_story.brand_story || "",
            youtube_link: data.youtube_link || "",        
            linkedin_link: data.linkedin_link || "", 
            apostle_name: data.apostle_name || "",
            academic_biography: data.brand_story.academic_biography || "",
            apostle_biography: data.brand_story.apostle_biography || "",
            mission_statement_1: data.missions?.mission_statement_1 || "",
            mission_statement_2: data.missions?.mission_statement_2 || "",
            mission_statement_3: data.missions?.mission_statement_3 || "",
            track_record_title: data.missions?.track_record?.title || "",
            track_record_description: data.missions?.track_record?.description || ""
          });
          
          setExistingHeroImage(data.hero_section?.background_image_path || "");
          setExistingApostleImage(data.brand_story?.apostle?.image_path || "");
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

  

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      formData.append("hero_headline", form.hero_headline);
      formData.append("hero_subtext", form.hero_subtext);
      formData.append("brand_story", form.brand_story);
      formData.append("youtube_link", form.youtube_link);        
      formData.append("linkedin_link", form.linkedin_link);
      formData.append("apostle_name", form.apostle_name);
      formData.append("academic_biography", form.academic_biography);
      formData.append("apostle_biography", form.apostle_biography);
      formData.append("mission_statement_1", form.mission_statement_1);
      formData.append("mission_statement_2", form.mission_statement_2);
      formData.append("mission_statement_3", form.mission_statement_3);
      formData.append("track_record_title", form.track_record_title);
      formData.append("track_record_description", form.track_record_description);
      
      if (heroImage) {
        formData.append("hero_background_image", heroImage);
      }
      if (apostleImage) {
        formData.append("apostle_image", apostleImage);
      }

      // console.log(formData.values());
      
      await aboutAPI.updateAbout(formData);
      toast.success("About page published successfully!");
      
      // Refresh data
      const response = await aboutAPI.getAbout();
      const data = response.data.data || response.data;
      
      
      if (data) {
        setForm({
          hero_headline: data.hero_section?.headline || "",
          hero_subtext: data.hero_section?.subtext || "",
          brand_story: data.brand_story || "",
          youtube_link: data.youtube_link || "",        
          linkedin_link: data.linkedin_link || "", 
          apostle_name: data.apostle_name || "",
          academic_biography: data.academic_biography || "",
          apostle_biography: data.apostle_biography || "",
          mission_statement_1: data.missions?.mission_statement_1 || "",
          mission_statement_2: data.missions?.mission_statement_2 || "",
          mission_statement_3: data.missions?.mission_statement_3 || "",
          track_record_title: data.missions?.track_record?.title || "",
          track_record_description: data.missions?.track_record?.description || ""
        });
        
        setExistingHeroImage(data.hero_section?.background_image_path || "");
        setExistingApostleImage(data.brand_story?.apostle?.image_path || "");
      }
      
      setHeroImage(null);
      setApostleImage(null);
      
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
      formData.append("youtube_link", "");        
      formData.append("linkedin_link", ""); 
      formData.append("apostle_name", "");
      formData.append("academic_biography", "");
      formData.append("apostle_biography", "");
      formData.append("mission_statement_1", "");
      formData.append("mission_statement_2", "");
      formData.append("mission_statement_3", "");
      formData.append("track_record_title", "");
      formData.append("track_record_description", "");
      
      await aboutAPI.updateAbout(formData);
      
      setForm({
        hero_headline: "",
        hero_subtext: "",
        brand_story: "",
        youtubeLink: "",
        linkedinLink: "",
        apostle_name: "",
        academic_biography: "",
        apostle_biography: "",
        mission_statement_1: "",
        mission_statement_2: "",
        mission_statement_3: "",
        track_record_title: "",
        track_record_description: ""
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

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading about page data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          About Page Setting
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6 pb-16">
            {/* Hero Section */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Hero Section</p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Headline</label>
              <input
                type="text"
                value={form.hero_headline}
                onChange={(e) => handleChange("hero_headline", e.target.value)}
                placeholder="Enter hero headline"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Subtext</label>
              <textarea
                value={form.hero_subtext}
                onChange={(e) => handleChange("hero_subtext", e.target.value)}
                rows={4}
                placeholder="Enter hero subtext"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
              />
            </div>
            {/* Brand story */}
             <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Brand Story</label>
              <RichTextEditor
                value={form.brand_story}
                onChange={(value) => handleChange("brand_story", value)}
                placeholder="Write the brand story here..."
                height={200}
              />
            </div>


            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">Button Text</label>
                <input
                  type="text"
                  value={form.hero_button_text}
                  onChange={(e) => handleChange("hero_button_text", e.target.value)}
                  placeholder="e.g., Get Involved"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">Button Link</label>
                <input
                  type="text"
                  value={form.hero_button_link}
                  onChange={(e) => handleChange("hero_button_link", e.target.value)}
                  placeholder="e.g., /volunteer"
                  className={inputClass}
                />
              </div>
            </div> */}

              {/* Social Media Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 font-medium mb-1.5">
              YouTube Link
            </label>
            <input
              type="text"
              value={form.youtube_link}
              onChange={(e) => handleChange("youtube_link", e.target.value)}
              placeholder="https://www.youtube.com/..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 font-medium mb-1.5">
              LinkedIn Link
            </label>
            <input
              type="text"
              value={form.linkedin_link}
              onChange={(e) => handleChange("linkedin_link", e.target.value)}
              placeholder="https://www.linkedin.com/..."
              className={inputClass}
            />
          </div>
        </div>
            <ImageUpload 
              label="Hero Background Image" 
              onImageChange={setHeroImage}
              existingImage={existingHeroImage}
            />

            {/* Apostle Section */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Apostle Information</p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Apostle Name</label>
              <input
                type="text"
                value={form.apostle_name}
                onChange={(e) => handleChange("apostle_name", e.target.value)}
                placeholder="Enter apostle name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Academic Biography</label>
              <RichTextEditor
                value={form.academic_biography}
                onChange={(value) => handleChange("academic_biography", value)}
                placeholder="Write the academic biography here..."
                height={300}
              />
            </div>

             {/* Apostle biography */}
             <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Apostle Biography</label>
              <RichTextEditor
                value={form.apostle_biography}
                onChange={(value) => handleChange("apostle_biography", value)}
                placeholder="Write the apostle biography here..."
                height={300}
              />
            </div>


            <ImageUpload 
              label="Apostle Image" 
              onImageChange={setApostleImage}
              existingImage={existingApostleImage}
            />

            {/* Mission Statements */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Mission Statements</p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Mission Statement 1</label>
              <RichTextEditor
                value={form.mission_statement_1}
                onChange={(value) => handleChange("mission_statement_1", value)}
                placeholder="Enter first mission statement..."
                height={250}
              />
            </div>
       
              {/* New Mission Statement 2 */}
            {/* <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Mission Statement 2</label>
              <RichTextEditor
                value={form.mission_statement_2}
                onChange={(value) => handleChange("mission_statement_2", value)}
                placeholder="Enter second mission statement..."
                height={250}
              />
            </div> */}
             
             {/* New Mission Statement 3 */}
            {/* <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Mission Statement 3</label>
              <RichTextEditor
                value={form.mission_statement_3}
                onChange={(value) => handleChange("mission_statement_3", value)}
                placeholder="Enter third mission statement..."
                height={250}
              />
            </div> */}

            {/* Track Record Section */}
            <div>
              <p className="text-md font-semibold text-gray-900 mb-4">Track Record</p>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Track Record Title</label>
              <input
                type="text"
                value={form.track_record_title}
                onChange={(e) => handleChange("track_record_title", e.target.value)}
                placeholder="Enter track record title"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Track Record Description</label>
              <RichTextEditor
                value={form.track_record_description}
                onChange={(value) => handleChange("track_record_description", value)}
                placeholder="Enter track record description with bullet points, etc..."
                height={300}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-semibold text-black tracking-widest uppercase mb-4">Actions</p>
              <div className="space-y-3">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-gray-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish Changes"}
                </button>
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold bg-[#FECACA] text-gray-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset to Default"}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-5">
              <p className="text-xs font-semibold text-blue-900 uppercase mb-3">Tips</p>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>• Use the toolbar to format your content</li>
                <li>• Create bullet or numbered lists easily</li>
                <li>• Add headings, quotes, and more</li>
                <li>• All formatting is saved as clean HTML</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rich-text-editor :global(.ProseMirror) {
          min-height: 200px;
          padding: 1rem;
          outline: none;
        }
        .rich-text-editor :global(.ProseMirror p) {
          margin-bottom: 0.75rem;
        }
        .rich-text-editor :global(.ProseMirror ul),
        .rich-text-editor :global(.ProseMirror ol) {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-editor :global(.ProseMirror h2) {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .rich-text-editor :global(.ProseMirror h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .rich-text-editor :global(.ProseMirror blockquote) {
          border-left: 3px solid #c5a355;
          padding-left: 1rem;
          font-style: italic;
          color: #666;
        }
      `}</style>
    </div>
  );
}