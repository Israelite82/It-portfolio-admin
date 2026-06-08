import { useState, useEffect, useRef } from "react";
import { homepageAPI } from "../lib/apiService";
import toast from "react-hot-toast";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  Plus: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  ChevronUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ),
  Image: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  Spinner: () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  ),
};

// ─── Section type registry ────────────────────────────────────────────────────
const SECTION_TYPES = [
  { type: "hero",      label: "Hero / Banner",     icon: "🖼️", color: "bg-purple-50 border-purple-200" },
  { type: "slides",    label: "Image Slideshow",   icon: "🎞️", color: "bg-blue-50 border-blue-200"   },
  { type: "biography", label: "Biography / About", icon: "👤", color: "bg-amber-50 border-amber-200" },
  { type: "media",     label: "Media / YouTube",   icon: "▶️", color: "bg-red-50 border-red-200"     },
  { type: "text",      label: "Rich Text Block",   icon: "📝", color: "bg-green-50 border-green-200" },
  { type: "cta",       label: "Call to Action",    icon: "🚀", color: "bg-orange-50 border-orange-200"},
];
const sectionMeta = (type) => SECTION_TYPES.find((s) => s.type === type) ?? SECTION_TYPES[4];

// ─── LOCAL shape factories (what editors always work with) ────────────────────
// These include _pendingFile / *_url fields that only live in the browser.
// The API shape uses `image`, `background_image` etc. (storage paths).
// hydrateSectionFromAPI() converts API → local; handlePublish() converts local → FormData.

const localDefaults = {
  hero: (api = {}) => ({
    headline:              api.headline           ?? "Welcome",
    subtext:               api.subtext            ?? "",
    background_image_url:  api.background_image_url ?? api.background_image_url ?? null,
    _pendingFile:          null,
    _removeImage:          false,
  }),

  slides: (api = {}) => ({
    items: (api.items ?? []).length
      ? api.items.map((s) => ({
          id:           s.id           ?? null,
          title:        s.title        ?? "",
          subtitle:     s.subtitle     ?? "",
          has_text:     s.has_text     ?? false,
          button_text:  s.button_text  ?? "",
          button_link:  s.button_link  ?? "",
          // API returns image_url (resolved URL) after formatSection()
          image_url:    s.image_url    ?? null,
          _pendingFile: null,
        }))
      : [0, 1, 2, 3].map((i) => ({
          id: null,
          title:       i === 0 ? "Dr. Osaren Emokpae" : "",
          subtitle:    i === 0 ? "Scholar▫️Teacher▫️Christian Leader▫️Writer▫️Entrepreneur" : "",
          has_text:    i < 2,
          button_text: i < 2 ? "Read Full Bio" : "",
          button_link: i < 2 ? "/about" : "",
          image_url:   null,
          _pendingFile: null,
        })),
  }),

  biography: (api = {}) => ({
    image_url:    api.image_url ?? null,
    content:      api.content   ?? "",
    button_text:  api.button_text ?? "Read Full Bio",
    button_link:  api.button_link ?? "/about",
    _pendingFile: null,
    _removeImage: false,
  }),

  media: (api = {}) => ({
    title:            api.title            ?? "Click the image below to watch our teachings on YouTube",
    youtube_url:      api.youtube_url      ?? "https://www.youtube.com/@theanchor1079",
    button_text:      api.button_text      ?? "YouTube Channel",
    background_color: api.background_color ?? "#dc2626",
    icon_color:       api.icon_color       ?? "#ffffff",
  }),

  text: (api = {}) => ({
    heading:   api.heading   ?? "",
    body:      api.body      ?? "",
    alignment: api.alignment ?? "left",
  }),

  cta: (api = {}) => ({
    heading:          api.heading          ?? "",
    subtext:          api.subtext          ?? "",
    button_text:      api.button_text      ?? "Get Started",
    button_link:      api.button_link      ?? "/",
    background_color: api.background_color ?? "#1a1612",
    text_color:       api.text_color       ?? "#ffffff",
  }),
};

// ─── Shared UI pieces ─────────────────────────────────────────────────────────
function ImageUploadBox({ url, pendingFile, onFileChange, onRemove, height = "h-[120px]", label = "Click to upload image" }) {
  const inputRef = useRef();
  const preview  = pendingFile ? URL.createObjectURL(pendingFile) : url;

  return (
    <div className="flex gap-3 items-start">
      <div className="flex-1">
        <input
          ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files[0] && onFileChange(e.target.files[0])}
        />
        <div
          onClick={() => inputRef.current.click()}
          className={`w-full ${height} bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden`}
        >
          {preview
            ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
            : (
              <div className="text-center pointer-events-none">
                <div className="text-[#7c7fc4] flex justify-center mb-1"><Icon.Image /></div>
                <p className="text-xs text-[#7c7fc4] font-medium">{label}</p>
              </div>
            )
          }
        </div>
      </div>
      {preview && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="mt-2 px-3 py-1 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg transition-colors"
        >
          Remove
        </button>
      )}
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-700 font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls    = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";
const textareaCls = `${inputCls} resize-none`;

// ─── Section editors ──────────────────────────────────────────────────────────

function HeroEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <FieldRow label="Headline">
        <input className={inputCls} value={data.headline ?? ""} onChange={(e) => set("headline", e.target.value)} placeholder="Welcome" />
      </FieldRow>
      <FieldRow label="Subtext">
        <textarea className={textareaCls} rows={3} value={data.subtext ?? ""} onChange={(e) => set("subtext", e.target.value)} placeholder="Enter subtext..." />
      </FieldRow>
      <FieldRow label="Background Image">
        <ImageUploadBox
          url={data.background_image_url}
          pendingFile={data._pendingFile}
          onFileChange={(f) => set("_pendingFile", f)}
          onRemove={() => onChange({ ...data, _pendingFile: null, background_image_url: null, _removeImage: true })}
        />
      </FieldRow>
    </div>
  );
}

function SlideItemEditor({ slide, index, onChange, onRemove, canRemove }) {
  const set = (k, v) => onChange({ ...slide, [k]: v });
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50/60 relative">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Slide {index + 1}</p>
      {canRemove && (
        <button type="button" onClick={onRemove} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
          <Icon.Trash />
        </button>
      )}

      <FieldRow label="Image">
        <ImageUploadBox
          url={slide.image_url}
          pendingFile={slide._pendingFile}
          height="h-[90px]"
          onFileChange={(f) => set("_pendingFile", f)}
          onRemove={() => onChange({ ...slide, _pendingFile: null, image_url: null })}
        />
      </FieldRow>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id={`slide-hastext-${index}`}
          checked={slide.has_text ?? false}
          onChange={(e) => set("has_text", e.target.checked)}
          className="w-4 h-4 accent-[#c5a355]"
        />
        <label htmlFor={`slide-hastext-${index}`} className="text-sm text-gray-600 cursor-pointer">
          Show text overlay on this slide
        </label>
      </div>

      {slide.has_text && (
        <>
          <FieldRow label="Title">
            <input className={inputCls} value={slide.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="Slide title" />
          </FieldRow>
          <FieldRow label="Subtitle">
            <textarea className={textareaCls} rows={2} value={slide.subtitle ?? ""} onChange={(e) => set("subtitle", e.target.value)} placeholder="Slide subtitle" />
          </FieldRow>
          <div className="grid grid-cols-2 gap-3">
            <FieldRow label="Button Text">
              <input className={inputCls} value={slide.button_text ?? ""} onChange={(e) => set("button_text", e.target.value)} placeholder="e.g. Read More" />
            </FieldRow>
            <FieldRow label="Button Link">
              <input className={inputCls} value={slide.button_link ?? ""} onChange={(e) => set("button_link", e.target.value)} placeholder="/about" />
            </FieldRow>
          </div>
        </>
      )}
    </div>
  );
}

function SlidesEditor({ data, onChange }) {
  const items = data.items ?? [];

  const updateSlide = (i, updated) => {
    const next = [...items];
    next[i] = updated;
    onChange({ ...data, items: next });
  };

  const addSlide = () => onChange({
    ...data,
    items: [...items, { id: null, title: "", subtitle: "", has_text: false, button_text: "", button_link: "", image_url: null, _pendingFile: null }],
  });

  const removeSlide = (i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) });

  return (
    <div>
      {items.map((slide, i) => (
        <SlideItemEditor
          key={i}
          slide={slide}
          index={i}
          onChange={(updated) => updateSlide(i, updated)}
          onRemove={() => removeSlide(i)}
          canRemove={items.length > 1}
        />
      ))}
      <button
        type="button"
        onClick={addSlide}
        className="flex items-center gap-2 text-sm text-[#c5a355] hover:text-[#a8883d] font-semibold mt-1 transition-colors"
      >
        <Icon.Plus /> Add Slide
      </button>
    </div>
  );
}

function BiographyEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <FieldRow label="Biography Image">
        <ImageUploadBox
          url={data.image_url}
          pendingFile={data._pendingFile}
          onFileChange={(f) => set("_pendingFile", f)}
          onRemove={() => onChange({ ...data, _pendingFile: null, image_url: null, _removeImage: true })}
        />
      </FieldRow>
      <FieldRow label="Content">
        <textarea className={textareaCls} rows={7} value={data.content ?? ""} onChange={(e) => set("content", e.target.value)} placeholder="Biography text..." />
      </FieldRow>
      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Button Text">
          <input className={inputCls} value={data.button_text ?? ""} onChange={(e) => set("button_text", e.target.value)} />
        </FieldRow>
        <FieldRow label="Button Link">
          <input className={inputCls} value={data.button_link ?? ""} onChange={(e) => set("button_link", e.target.value)} />
        </FieldRow>
      </div>
    </div>
  );
}

function MediaEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <FieldRow label="Section Title">
        <input className={inputCls} value={data.title ?? ""} onChange={(e) => set("title", e.target.value)} />
      </FieldRow>
      <FieldRow label="YouTube Channel URL">
        <input className={inputCls} type="url" value={data.youtube_url ?? ""} onChange={(e) => set("youtube_url", e.target.value)} />
      </FieldRow>
      <FieldRow label="Button Text">
        <input className={inputCls} value={data.button_text ?? ""} onChange={(e) => set("button_text", e.target.value)} />
      </FieldRow>
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Background Color">
          <div className="flex items-center gap-2">
            <input type="color" value={data.background_color ?? "#dc2626"} onChange={(e) => set("background_color", e.target.value)} className="w-10 h-10 border border-gray-200 rounded cursor-pointer" />
            <span className="text-sm text-gray-500">{data.background_color}</span>
          </div>
        </FieldRow>
        <FieldRow label="Icon Color">
          <div className="flex items-center gap-2">
            <input type="color" value={data.icon_color ?? "#ffffff"} onChange={(e) => set("icon_color", e.target.value)} className="w-10 h-10 border border-gray-200 rounded cursor-pointer" />
            <span className="text-sm text-gray-500">{data.icon_color}</span>
          </div>
        </FieldRow>
      </div>
    </div>
  );
}

function TextEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <FieldRow label="Heading">
        <input className={inputCls} value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} placeholder="Section heading" />
      </FieldRow>
      <FieldRow label="Body Text">
        <textarea className={textareaCls} rows={6} value={data.body ?? ""} onChange={(e) => set("body", e.target.value)} placeholder="Enter text content..." />
      </FieldRow>
      <FieldRow label="Text Alignment">
        <select className={inputCls} value={data.alignment ?? "left"} onChange={(e) => set("alignment", e.target.value)}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </FieldRow>
    </div>
  );
}

function CtaEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <FieldRow label="Heading">
        <input className={inputCls} value={data.heading ?? ""} onChange={(e) => set("heading", e.target.value)} placeholder="Call to action heading" />
      </FieldRow>
      <FieldRow label="Subtext">
        <textarea className={textareaCls} rows={3} value={data.subtext ?? ""} onChange={(e) => set("subtext", e.target.value)} placeholder="Supporting text..." />
      </FieldRow>
      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Button Text">
          <input className={inputCls} value={data.button_text ?? ""} onChange={(e) => set("button_text", e.target.value)} />
        </FieldRow>
        <FieldRow label="Button Link">
          <input className={inputCls} value={data.button_link ?? ""} onChange={(e) => set("button_link", e.target.value)} />
        </FieldRow>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Background Color">
          <div className="flex items-center gap-2">
            <input type="color" value={data.background_color ?? "#1a1612"} onChange={(e) => set("background_color", e.target.value)} className="w-10 h-10 border border-gray-200 rounded cursor-pointer" />
            <span className="text-sm text-gray-500">{data.background_color}</span>
          </div>
        </FieldRow>
        <FieldRow label="Text Color">
          <div className="flex items-center gap-2">
            <input type="color" value={data.text_color ?? "#ffffff"} onChange={(e) => set("text_color", e.target.value)} className="w-10 h-10 border border-gray-200 rounded cursor-pointer" />
            <span className="text-sm text-gray-500">{data.text_color}</span>
          </div>
        </FieldRow>
      </div>
    </div>
  );
}

const EDITORS = {
  hero: HeroEditor, slides: SlidesEditor, biography: BiographyEditor,
  media: MediaEditor, text: TextEditor, cta: CtaEditor,
};

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ section, index, total, onChange, onDelete, onMove, onToggleVisible }) {
  const [expanded, setExpanded] = useState(true);
  const meta   = sectionMeta(section.type);
  const Editor = EDITORS[section.type];

  return (
    <div className={`rounded-xl border-2 ${meta.color} bg-white shadow-sm overflow-hidden`}>

      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded((p) => !p)}
      >
        <span className="text-lg leading-none">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{section.label || meta.label}</p>
          <p className="text-xs text-gray-400">{meta.label}</p>
        </div>

        {/* action buttons — stop propagation so clicks don't toggle collapse */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            title={section.visible ? "Hide section" : "Show section"}
            onClick={() => onToggleVisible()}
            className={`p-1.5 rounded-lg transition-colors ${section.visible ? "text-gray-400 hover:text-gray-600" : "text-gray-300 hover:text-gray-500"}`}
          >
            {section.visible ? <Icon.Eye /> : <Icon.EyeOff />}
          </button>
          <button type="button" disabled={index === 0} onClick={() => onMove(-1)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors">
            <Icon.ChevronUp />
          </button>
          <button type="button" disabled={index === total - 1} onClick={() => onMove(1)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors">
            <Icon.ChevronDown />
          </button>
          <button type="button" onClick={() => onDelete()} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 transition-colors">
            <Icon.Trash />
          </button>
        </div>

        <span className="p-1.5 text-gray-400 pointer-events-none">
          {expanded ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
        </span>
      </div>

      {/* ── Label input ── */}
      {expanded && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/40">
          <input
            className="w-full text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-600 outline-none focus:border-[#c5a355] transition-all"
            value={section.label ?? ""}
            onChange={(e) => onChange({ ...section, label: e.target.value })}
            placeholder={`Section label (e.g. "${meta.label}")`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Editor body ── */}
      {expanded && (
        <div className="px-4 py-4 border-t border-gray-100">
          {Editor
            ? <Editor data={section.data} onChange={(data) => onChange({ ...section, data })} />
            : <p className="text-sm text-gray-400">No editor available for type "{section.type}"</p>
          }
        </div>
      )}
    </div>
  );
}

// ─── Add Section Modal ────────────────────────────────────────────────────────
function AddSectionModal({ onAdd, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="font-semibold text-gray-800">Add a New Section</p>
          <p className="text-xs text-gray-400 mt-0.5">Choose a section type to add to the homepage</p>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {SECTION_TYPES.map((s) => (
            <button
              key={s.type}
              type="button"
              onClick={() => { onAdd(s.type); onClose(); }}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${s.color}`}
            >
              <span className="text-xl">{s.icon}</span>
              <p className="text-sm font-semibold text-gray-800">{s.label}</p>
            </button>
          ))}
        </div>
        <div className="px-6 pb-4">
          <button type="button" onClick={onClose} className="w-full py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Homepage() {
  const [sections,   setSections]   = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [fetching,   setFetching]   = useState(true);
  const [showModal,  setShowModal]  = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => { fetchSections(); }, []);

  // ── Convert one API section → local editor shape ──────────────────────────
  const hydrateSectionFromAPI = (s) => {
    const factory = localDefaults[s.type];
    return {
      id:      s.id,
      type:    s.type,
      label:   s.label   ?? "",
      visible: s.visible !== false,
      order:   s.order   ?? 0,
      // Pass the API data blob into the factory so existing values are preserved
      data:    factory ? factory(s.data ?? {}) : (s.data ?? {}),
    };
  };

  const fetchSections = async () => {
    setFetching(true);
    try {
      const res = await homepageAPI.getHomePage();
      const raw = res.data?.data ?? res.data;

      if (Array.isArray(raw?.sections) && raw.sections.length) {
        setSections(raw.sections.map(hydrateSectionFromAPI));
      } else {
        // Legacy flat response — seed four default sections
        setSections(buildLegacySections(raw));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load homepage data");
      setSections(buildLegacySections(null));
    } finally {
      setFetching(false);
    }
  };

  const buildLegacySections = (raw) => [
    {
      id: null, type: "hero", label: "Hero Banner", visible: true, order: 0,
      data: localDefaults.hero({
        headline:            raw?.hero?.headline,
        subtext:             raw?.hero?.subtext,
        background_image_url: raw?.hero?.background_image ?? null,
      }),
    },
    {
      id: null, type: "slides", label: "Image Slideshow", visible: true, order: 1,
      data: localDefaults.slides({
        items: (raw?.slides ?? []).map((s) => ({
          id:          s.id        ?? null,
          title:       s.title     ?? "",
          subtitle:    s.subtitle  ?? "",
          has_text:    s.has_text  ?? false,
          button_text: s.button_text ?? "",
          button_link: s.button_link ?? "",
          image_url:   s.image     ?? s.image_url ?? null,
        })),
      }),
    },
    {
      id: null, type: "biography", label: "Biography Section", visible: true, order: 2,
      data: localDefaults.biography({
        image_url:   raw?.biography?.image   ?? null,
        content:     raw?.biography?.content ?? "",
        button_text: raw?.biography?.button_text ?? "Read Full Bio",
        button_link: raw?.biography?.button_link ?? "/about",
      }),
    },
    {
      id: null, type: "media", label: "Media / YouTube", visible: true, order: 3,
      data: localDefaults.media(raw?.media ?? {}),
    },
  ];

  // ── Section state helpers ─────────────────────────────────────────────────
  const updateSection  = (i, updated)  => setSections((p) => { const n = [...p]; n[i] = updated; return n; });
  const deleteSection  = (i)           => { if (!window.confirm("Remove this section?")) return; setSections((p) => p.filter((_, idx) => idx !== i)); };
  const toggleVisible  = (i)           => setSections((p) => { const n = [...p]; n[i] = { ...n[i], visible: !n[i].visible }; return n; });

  const moveSection = (i, dir) => {
    setSections((p) => {
      const n = [...p];
      const t = i + dir;
      if (t < 0 || t >= n.length) return n;
      [n[i], n[t]] = [n[t], n[i]];
      return n.map((s, idx) => ({ ...s, order: idx }));
    });
  };

  const addSection = (type) => {
    const factory = localDefaults[type];
    setSections((p) => [
      ...p,
      {
        id:      null,
        type,
        label:   sectionMeta(type).label,
        visible: true,
        order:   p.length,
        data:    factory ? factory() : {},   // ← always call with no args for a blank section
      },
    ]);
  };

  // ── Publish ───────────────────────────────────────────────────────────────
  const handlePublish = async () => {
    setLoading(true);
    setSaveStatus("saving");
    try {
      const fd = new FormData();

      sections.forEach((section, sIdx) => {
        const p = `sections[${sIdx}]`;
        fd.append(`${p}[id]`,      section.id      ?? "");
        fd.append(`${p}[type]`,    section.type);
        fd.append(`${p}[label]`,   section.label   ?? "");
        fd.append(`${p}[visible]`, section.visible ? "1" : "0");
        fd.append(`${p}[order]`,   sIdx);

        const d = section.data;

        if (section.type === "hero") {
          fd.append(`${p}[data][headline]`, d.headline ?? "");
          fd.append(`${p}[data][subtext]`,  d.subtext  ?? "");
          if (d._pendingFile) fd.append(`${p}[data][background_image]`, d._pendingFile);
          if (d._removeImage) fd.append(`${p}[data][remove_background_image]`, "1");
        }

        if (section.type === "slides") {
          (d.items ?? []).forEach((slide, iIdx) => {
            const sp = `${p}[data][items][${iIdx}]`;
            fd.append(`${sp}[id]`,          slide.id          ?? "");
            fd.append(`${sp}[title]`,        slide.title        ?? "");
            fd.append(`${sp}[subtitle]`,     slide.subtitle     ?? "");
            fd.append(`${sp}[has_text]`,     slide.has_text ? "1" : "0");
            fd.append(`${sp}[button_text]`,  slide.button_text  ?? "");
            fd.append(`${sp}[button_link]`,  slide.button_link  ?? "");
            fd.append(`${sp}[order]`,        iIdx);
            if (slide._pendingFile) fd.append(`${sp}[image]`, slide._pendingFile);
          });
        }

        if (section.type === "biography") {
          fd.append(`${p}[data][content]`,     d.content     ?? "");
          fd.append(`${p}[data][button_text]`, d.button_text ?? "");
          fd.append(`${p}[data][button_link]`, d.button_link ?? "");
          if (d._pendingFile) fd.append(`${p}[data][image]`, d._pendingFile);
          if (d._removeImage) fd.append(`${p}[data][remove_image]`, "1");
        }

        if (section.type === "media") {
          fd.append(`${p}[data][title]`,            d.title            ?? "");
          fd.append(`${p}[data][youtube_url]`,      d.youtube_url      ?? "");
          fd.append(`${p}[data][button_text]`,      d.button_text      ?? "");
          fd.append(`${p}[data][background_color]`, d.background_color ?? "");
          fd.append(`${p}[data][icon_color]`,       d.icon_color       ?? "");
        }

        if (section.type === "text") {
          fd.append(`${p}[data][heading]`,   d.heading   ?? "");
          fd.append(`${p}[data][body]`,      d.body      ?? "");
          fd.append(`${p}[data][alignment]`, d.alignment ?? "left");
        }

        if (section.type === "cta") {
          fd.append(`${p}[data][heading]`,          d.heading          ?? "");
          fd.append(`${p}[data][subtext]`,          d.subtext          ?? "");
          fd.append(`${p}[data][button_text]`,      d.button_text      ?? "");
          fd.append(`${p}[data][button_link]`,      d.button_link      ?? "");
          fd.append(`${p}[data][background_color]`, d.background_color ?? "");
          fd.append(`${p}[data][text_color]`,       d.text_color       ?? "");
        }
      });

      await homepageAPI.updateHomepage(fd);
      toast.success("Homepage published successfully!");
      setSaveStatus("saved");
      await fetchSections();
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to publish homepage");
      setSaveStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // ── Loading screen ────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#c5a355] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading homepage layout…</p>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-semibold text-[#1a1612]">Homepage Builder</p>
          <p className="text-xs text-gray-400">Arrange and configure homepage sections</p>
        </div>
        <div className="flex items-center gap-2">
          {saveStatus === "saved" && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Saved
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Icon.Plus /> Add Section
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#1a1612] text-white hover:bg-[#2d261f] transition-colors disabled:opacity-60"
          >
            {loading ? <><Icon.Spinner />&nbsp;Saving…</> : <><Icon.Save />&nbsp;Publish</>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex gap-6">

        {/* Sections list */}
        <div className="flex-1 min-w-0 space-y-4">
          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🏗️</p>
              <p className="text-gray-600 font-medium">No sections yet</p>
              <p className="text-sm text-gray-400 mt-1 mb-6">Add your first section to start building the homepage</p>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#1a1612] text-white hover:bg-[#2d261f] transition-colors"
              >
                <Icon.Plus /> Add First Section
              </button>
            </div>
          ) : (
            <>
              {sections.map((section, index) => (
                <div key={`${section.id ?? "new"}-${index}`} className={!section.visible ? "opacity-50 transition-opacity" : "transition-opacity"}>
                  <SectionCard
                    section={section}
                    index={index}
                    total={sections.length}
                    onChange={(updated) => updateSection(index, updated)}
                    onDelete={() => deleteSection(index)}
                    onMove={(dir) => moveSection(index, dir)}
                    onToggleVisible={() => toggleVisible(index)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-[#c5a355] hover:text-[#c5a355] transition-colors flex items-center justify-center gap-2"
              >
                <Icon.Plus /> Add Section
              </button>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <div className="sticky top-[73px] space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Page Sections</p>
              <div className="space-y-1">
                {sections.length === 0
                  ? <p className="text-xs text-gray-300 py-2 text-center">No sections</p>
                  : sections.map((s, i) => {
                      const meta = sectionMeta(s.type);
                      return (
                        <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${s.visible ? "text-gray-700" : "text-gray-400"}`}>
                          <span>{meta.icon}</span>
                          <span className="truncate">{s.label || meta.label}</span>
                          {!s.visible && <span className="ml-auto text-[10px] text-gray-300">hidden</span>}
                        </div>
                      );
                    })
                }
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Actions</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={loading}
                  className="w-full py-2 rounded-lg text-xs font-semibold bg-[#1a1612] text-white hover:bg-[#2d261f] transition-colors disabled:opacity-60"
                >
                  {loading ? "Publishing…" : "Publish Homepage"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  + Add Section
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <AddSectionModal onAdd={addSection} onClose={() => setShowModal(false)} />}
    </div>
  );
}