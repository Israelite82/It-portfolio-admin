import { useEffect, useRef } from "react";
import FileUpload from "../books/FileUpload";

function QuillEditor({ value, onChange }) {
  const wrapperRef  = useRef(null);   // outer div we control
  const quillRef    = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Strict Mode runs effects twice — bail if already initialised
    if (quillRef.current) return;

    // Create a fresh inner div each time so the toolbar never duplicates
    const editorDiv = document.createElement("div");
    wrapper.innerHTML = "";
    wrapper.appendChild(editorDiv);

    let quill;

    async function init() {
      // Inject Snow CSS once
      if (!document.getElementById("quill-snow-css")) {
        const link  = document.createElement("link");
        link.id     = "quill-snow-css";
        link.rel    = "stylesheet";
        link.href   = "https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css";
        document.head.appendChild(link);
      }

      const { default: Quill } = await import("quill");

      // Guard: component may have unmounted during the async import
      if (!wrapperRef.current) return;

      quill = new Quill(editorDiv, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            ["link", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      quillRef.current = quill;

      if (value) quill.clipboard.dangerouslyPasteHTML(value);

      quill.on("text-change", () => {
        onChangeRef.current(quill.root.innerHTML);
      });
    }

    init();

    return () => {
      // Full teardown: remove everything Quill injected
      if (wrapper) wrapper.innerHTML = "";
      quillRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync when switching to a different post
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const incoming = value || "";
    if (quill.root.innerHTML !== incoming) {
      quill.clipboard.dangerouslyPasteHTML(incoming);
    }
  }, [value]);

  return (
    <div
      ref={wrapperRef}
      className="[&_.ql-toolbar]:bg-[#F1F5F9] [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-sm [&_.ql-editor]:text-gray-700 [&_.ql-editor]:px-4 [&_.ql-editor]:py-3"
    />
  );
}

export default function BlogForm({
  form,
  onChange,
  onCancel,
  onSaveDraft,
  onPublish,
  loading,
  view,
  editingBlog,
  featuredImage,
  setFeaturedImage,
}) {
  const handleContentChange = (html) => {
    onChange({ target: { name: "content", value: html, type: "text" } });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  const sideInputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[13px] text-gray-600 font-medium">
          Blog <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">
            {view === "add" ? "Add New" : "Edit"}
          </span>
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <p className="text-sm font-semibold text-gray-800 tracking-tight uppercase mb-4">
          {view === "add" ? "Add New Blog Post" : `Edit: ${editingBlog?.post_title}`}
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT */}
          <div className="flex-1 w-full space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-5">

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Post Title</label>
                <input type="text" name="postTitle" value={form.postTitle} onChange={onChange} className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Excerpt</label>
                <textarea name="excerpt" value={form.excerpt} onChange={onChange} rows={4} className={`${inputClass} resize-none`} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Content</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                 
                  <QuillEditor
                    key={view === "edit" ? (editingBlog?.id ?? "edit") : "add"}
                    value={form.content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-5">
              <p className="text-sm font-semibold text-gray-900 tracking-tight uppercase">SEO Settings</p>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Meta Title</label>
                <input type="text" name="metaTitle" value={form.metaTitle} onChange={onChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Meta Description</label>
                <textarea name="metaDescription" value={form.metaDescription} onChange={onChange} rows={4} className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[240px] flex-shrink-0 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-4">
              <p className="text-sm font-semibold text-gray-900 tracking-tight uppercase">Publish</p>

              <button onClick={onSaveDraft} disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-black hover:bg-green-200 transition-colors disabled:opacity-50">
                {loading ? "Saving…" : "Save Draft"}
              </button>

              <button onClick={onPublish} disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#6366F1] text-white hover:bg-[#4f46e5] transition-colors disabled:opacity-50">
                {loading ? "Publishing…" : "Publish"}
              </button>

              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">Author</label>
                <input type="text" name="author" value={form.author} onChange={onChange} className={sideInputClass} />
              </div>

              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Categories <span className="text-gray-400 font-normal">(comma-separated)</span>
                </label>
                <textarea name="categories" value={form.categories} onChange={onChange} rows={3}
                  placeholder="Technology, Programming"
                  className={`${sideInputClass} resize-none`} />
              </div>

              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">
                  Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
                </label>
                <input type="text" name="tags" value={form.tags} onChange={onChange}
                  placeholder="laravel, php, web" className={sideInputClass} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-600 font-medium">Featured</span>
                <button type="button"
                  onClick={() => onChange({ target: { name: "featured", type: "checkbox", checked: !form.featured } })}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${form.featured ? "bg-blue-500" : "bg-gray-300"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.featured ? "left-5" : "left-0.5"}`} />
                </button>
              </div>

              <button onClick={onCancel}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-gray-900 tracking-tight mb-3">Featured Image</p>
              <FileUpload file={featuredImage} onFileChange={setFeaturedImage} accept="image/*" id="featuredImageInput" type="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}