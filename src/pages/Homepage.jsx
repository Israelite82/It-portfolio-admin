import { useState, useEffect, useRef } from "react";
import { homepageAPI } from "../lib/apiService";
import toast from "react-hot-toast";

// ─────────────────────────────────────────────────────────────────────────────
//  BLOCK-BASED HOMEPAGE BUILDER
//
//  A "section" is a row on the page.  Each section has a label, visibility
//  toggle, and an ordered list of "blocks".  Each block has a "type" that
//  controls what fields appear and how the frontend renders it.
//
//  Block types (the user can mix freely inside any section):
//    text        – heading + body + alignment
//    image       – upload + alt text + link
//    button      – label + url + colours
//    youtube     – video ID / embed URL
//    html        – raw HTML snippet (advanced)
//    slideshow   – array of slide sub-blocks
//
//  Layouts per section (controls how blocks sit side by side):
//    full        – single column (100%)
//    two-col     – two equal columns (50 / 50)
//    left-heavy  – 66 / 33
//    right-heavy – 33 / 66
//    three-col   – three equal columns
// ─────────────────────────────────────────────────────────────────────────────

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  ChevronDown: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
  ChevronUp: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  EyeOff: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>,
  Save: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
  Spinner: () => <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>,
  Img: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>,
  Grip: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
};

// ── Block type catalogue ──────────────────────────────────────────────────────
// The user picks from these when adding a block inside a section.
const BLOCK_TYPES = [
  { type: "text",      label: "Text",          icon: "📝", desc: "Heading + body paragraph" },
  { type: "image",     label: "Image",         icon: "🖼️", desc: "Upload any image" },
  { type: "button",    label: "Button",        icon: "🔘", desc: "Clickable call-to-action button" },
  { type: "youtube",   label: "YouTube Video", icon: "▶️", desc: "Embed any YouTube video" },
  { type: "slideshow", label: "Slideshow",     icon: "🎞️", desc: "Multiple slides with optional text" },
  { type: "html",      label: "HTML / Embed",  icon: "🧩", desc: "Raw HTML or third-party embed code" },
];

// ── Layout options ────────────────────────────────────────────────────────────
const LAYOUTS = [
  { value: "full",        label: "Full Width",    preview: "█" },
  { value: "two-col",     label: "Two Columns",   preview: "█▌█" },
  { value: "left-heavy",  label: "Left Heavy",    preview: "██▌█" },
  { value: "right-heavy", label: "Right Heavy",   preview: "█▌██" },
  { value: "three-col",   label: "Three Columns", preview: "█▌█▌█" },
];

// ── Default block factories ───────────────────────────────────────────────────
const newBlock = (type) => {
  const id = `blk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  switch (type) {
    case "text":      return { id, type, heading: "", body: "", alignment: "left", heading_size: "h2", text_color: "#111827", background_color: "" };
    case "image":     return { id, type, image_url: null, alt: "", link_url: "", object_fit: "cover", _pendingFile: null };
    case "button":    return { id, type, label: "Click Here", url: "/", target: "_self", bg_color: "#c5a355", text_color: "#ffffff", size: "md", align: "left" };
    case "youtube":   return { id, type, video_id: "", autoplay: false, caption: "" };
    case "slideshow": return { id, type, slides: [newSlide()] };
    case "html":      return { id, type, code: "" };
    default:          return { id, type };
  }
};

const newSlide = () => ({
  id: null,
  image_url:    null,
  title:        "",
  subtitle:     "",
  has_text:     false,
  button_text:  "",
  button_link:  "",
  _pendingFile: null,
});

// ── Default section factory ───────────────────────────────────────────────────
const newSection = () => ({
  id:               null,
  label:            "New Section",
  visible:          true,
  layout:           "full",
  background_color: "",
  padding:          "md",
  blocks:           [],
});

// ── Hydrate section from API ──────────────────────────────────────────────────
// The API stores blocks as plain JSON; we just need to make sure every block
// has _pendingFile = null so the image uploader doesn't crash.
const hydrateSection = (s) => ({
  id:               s.id      ?? null,
  label:            s.label   ?? "Section",
  visible:          s.visible !== false,
  layout:           s.data?.layout           ?? "full",
  background_color: s.data?.background_color ?? "",
  padding:          s.data?.padding          ?? "md",
  blocks:           (s.data?.blocks ?? []).map(hydrateBlock),
});

const hydrateBlock = (b) => {
  const base = { ...b, _pendingFile: b._pendingFile ?? null };
  if (b.type === "slideshow") {
    base.slides = (b.slides ?? []).map((sl) => ({ ...sl, _pendingFile: sl._pendingFile ?? null }));
  }
  return base;
};

// ── Shared form atoms ─────────────────────────────────────────────────────────
const inputCls    = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";
const textareaCls = `${inputCls} resize-none`;

function Field({ label, children, hint }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function ImageBox({ url, pending, onChange, onRemove, height = "h-[110px]" }) {
  const ref = useRef();
  const preview = pending ? URL.createObjectURL(pending) : url;
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1">
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && onChange(e.target.files[0])} />
        <div onClick={() => ref.current.click()} className={`${height} w-full bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden`}>
          {preview
            ? <img src={preview} alt="" className="w-full h-full object-cover" />
            : <div className="text-center"><div className="flex justify-center text-[#7c7fc4] mb-1"><Icon.Img /></div><p className="text-xs text-[#7c7fc4] font-medium">Click to upload</p></div>
          }
        </div>
      </div>
      {preview && <button type="button" onClick={onRemove} className="mt-1 px-2 py-1 text-xs text-red-500 border border-red-200 rounded-lg hover:text-red-700 transition-colors">Remove</button>}
    </div>
  );
}

// ── Block Editors ─────────────────────────────────────────────────────────────

function TextBlockEditor({ block, onChange }) {
  const s = (k, v) => onChange({ ...block, [k]: v });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Field label="Heading Tag">
          <select className={inputCls} value={block.heading_size ?? "h2"} onChange={(e) => s("heading_size", e.target.value)}>
            {["h1","h2","h3","h4","p"].map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
          </select>
        </Field>
        <Field label="Alignment">
          <select className={inputCls} value={block.alignment ?? "left"} onChange={(e) => s("alignment", e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </Field>
      </div>
      <Field label="Heading">
        <input className={inputCls} value={block.heading ?? ""} onChange={(e) => s("heading", e.target.value)} placeholder="Section heading (optional)" />
      </Field>
      <Field label="Body Text">
        <textarea className={textareaCls} rows={5} value={block.body ?? ""} onChange={(e) => s("body", e.target.value)} placeholder="Enter text content…" />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Text Colour">
          <div className="flex items-center gap-2">
            <input type="color" value={block.text_color ?? "#111827"} onChange={(e) => s("text_color", e.target.value)} className="w-9 h-9 border border-gray-200 rounded cursor-pointer" />
            <span className="text-xs text-gray-400">{block.text_color}</span>
          </div>
        </Field>
        <Field label="Background Colour">
          <div className="flex items-center gap-2">
            <input type="color" value={block.background_color || "#ffffff"} onChange={(e) => s("background_color", e.target.value)} className="w-9 h-9 border border-gray-200 rounded cursor-pointer" />
            <span className="text-xs text-gray-400">{block.background_color || "none"}</span>
          </div>
        </Field>
      </div>
    </div>
  );
}

function ImageBlockEditor({ block, onChange }) {
  const s = (k, v) => onChange({ ...block, [k]: v });
  return (
    <div className="space-y-3">
      <Field label="Image">
        <ImageBox
          url={block.image_url}
          pending={block._pendingFile}
          onChange={(f) => s("_pendingFile", f)}
          onRemove={() => onChange({ ...block, _pendingFile: null, image_url: null })}
          height="h-[130px]"
        />
      </Field>
      <Field label="Alt Text (accessibility)">
        <input className={inputCls} value={block.alt ?? ""} onChange={(e) => s("alt", e.target.value)} placeholder="Describe the image" />
      </Field>
      <Field label="Link URL (optional — wraps image in a link)">
        <input className={inputCls} value={block.link_url ?? ""} onChange={(e) => s("link_url", e.target.value)} placeholder="https://…" />
      </Field>
      <Field label="Image Fit">
        <select className={inputCls} value={block.object_fit ?? "cover"} onChange={(e) => s("object_fit", e.target.value)}>
          <option value="cover">Cover (crop to fill)</option>
          <option value="contain">Contain (show whole image)</option>
          <option value="fill">Stretch</option>
        </select>
      </Field>
    </div>
  );
}

function ButtonBlockEditor({ block, onChange }) {
  const s = (k, v) => onChange({ ...block, [k]: v });
  return (
    <div className="space-y-3">
      <Field label="Button Label">
        <input className={inputCls} value={block.label ?? ""} onChange={(e) => s("label", e.target.value)} placeholder="Click Here" />
      </Field>
      <Field label="URL">
        <input className={inputCls} value={block.url ?? ""} onChange={(e) => s("url", e.target.value)} placeholder="/about  or  https://…" />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Open In">
          <select className={inputCls} value={block.target ?? "_self"} onChange={(e) => s("target", e.target.value)}>
            <option value="_self">Same Tab</option>
            <option value="_blank">New Tab</option>
          </select>
        </Field>
        <Field label="Size">
          <select className={inputCls} value={block.size ?? "md"} onChange={(e) => s("size", e.target.value)}>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Background">
          <div className="flex items-center gap-2">
            <input type="color" value={block.bg_color ?? "#c5a355"} onChange={(e) => s("bg_color", e.target.value)} className="w-9 h-9 border border-gray-200 rounded cursor-pointer" />
            <span className="text-xs text-gray-400">{block.bg_color}</span>
          </div>
        </Field>
        <Field label="Text Colour">
          <div className="flex items-center gap-2">
            <input type="color" value={block.text_color ?? "#ffffff"} onChange={(e) => s("text_color", e.target.value)} className="w-9 h-9 border border-gray-200 rounded cursor-pointer" />
            <span className="text-xs text-gray-400">{block.text_color}</span>
          </div>
        </Field>
      </div>
      <Field label="Alignment">
        <select className={inputCls} value={block.align ?? "left"} onChange={(e) => s("align", e.target.value)}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </Field>
      {/* Live preview */}
      <div className={`pt-2 text-${block.align ?? "left"}`}>
        <span style={{ background: block.bg_color ?? "#c5a355", color: block.text_color ?? "#fff", padding: block.size === "lg" ? "12px 32px" : block.size === "sm" ? "6px 14px" : "9px 22px", borderRadius: 6, fontSize: block.size === "lg" ? 16 : block.size === "sm" ? 12 : 14, fontWeight: 600, display: "inline-block" }}>
          {block.label || "Button"}
        </span>
      </div>
    </div>
  );
}

function YoutubeBlockEditor({ block, onChange }) {
  const s = (k, v) => onChange({ ...block, [k]: v });
  // Extract video ID from any YouTube URL format
  const parseId = (raw) => {
    const m = raw.match(/(?:v=|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : raw.trim();
  };
  const videoId = parseId(block.video_id ?? "");
  return (
    <div className="space-y-3">
      <Field label="YouTube URL or Video ID" hint="Paste the full URL or just the video ID (e.g. lAdRXIGoAQc)">
        <input className={inputCls} value={block.video_id ?? ""} onChange={(e) => s("video_id", e.target.value)} placeholder="https://www.youtube.com/watch?v=… or lAdRXIGoAQc" />
      </Field>
      <Field label="Caption (optional)">
        <input className={inputCls} value={block.caption ?? ""} onChange={(e) => s("caption", e.target.value)} placeholder="Caption shown below the video" />
      </Field>
      <div className="flex items-center gap-2">
        <input type="checkbox" id={`yt-auto-${block.id}`} checked={block.autoplay ?? false} onChange={(e) => s("autoplay", e.target.checked)} className="w-4 h-4 accent-[#c5a355]" />
        <label htmlFor={`yt-auto-${block.id}`} className="text-sm text-gray-600 cursor-pointer">Autoplay (muted)</label>
      </div>
      {videoId && (
        <div className="rounded-lg overflow-hidden aspect-video bg-black mt-2">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}${block.autoplay ? "?autoplay=1&mute=1" : ""}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="preview" />
        </div>
      )}
    </div>
  );
}

function HtmlBlockEditor({ block, onChange }) {
  const s = (k, v) => onChange({ ...block, [k]: v });
  return (
    <div className="space-y-3">
      <Field label="HTML / Embed Code" hint="Paste raw HTML, an iframe embed, or any third-party widget code.">
        <textarea className={`${textareaCls} font-mono text-xs`} rows={8} value={block.code ?? ""} onChange={(e) => s("code", e.target.value)} placeholder={'<iframe src="…" />\n<!-- or any HTML -->'} />
      </Field>
    </div>
  );
}

// ── Slideshow block editor ────────────────────────────────────────────────────
function SlideEditor({ slide, index, onChange, onRemove, canRemove }) {
  const s = (k, v) => onChange({ ...slide, [k]: v });
  return (
    <div className="border border-gray-200 rounded-lg p-3 mb-3 bg-white relative">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Slide {index + 1}</p>
      {canRemove && (
        <button type="button" onClick={onRemove} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Icon.Trash /></button>
      )}
      <Field label="Image">
        <ImageBox url={slide.image_url} pending={slide._pendingFile} height="h-[80px]"
          onChange={(f) => s("_pendingFile", f)}
          onRemove={() => onChange({ ...slide, _pendingFile: null, image_url: null })}
        />
      </Field>
      <div className="flex items-center gap-2 mb-2">
        <input type="checkbox" id={`sl-txt-${index}`} checked={slide.has_text ?? false} onChange={(e) => s("has_text", e.target.checked)} className="w-4 h-4 accent-[#c5a355]" />
        <label htmlFor={`sl-txt-${index}`} className="text-sm text-gray-600 cursor-pointer">Show text overlay</label>
      </div>
      {slide.has_text && (
        <>
          <Field label="Title"><input className={inputCls} value={slide.title ?? ""} onChange={(e) => s("title", e.target.value)} placeholder="Slide title" /></Field>
          <Field label="Subtitle"><textarea className={textareaCls} rows={2} value={slide.subtitle ?? ""} onChange={(e) => s("subtitle", e.target.value)} placeholder="Slide subtitle" /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Button Text"><input className={inputCls} value={slide.button_text ?? ""} onChange={(e) => s("button_text", e.target.value)} placeholder="Read More" /></Field>
            <Field label="Button Link"><input className={inputCls} value={slide.button_link ?? ""} onChange={(e) => s("button_link", e.target.value)} placeholder="/about" /></Field>
          </div>
        </>
      )}
    </div>
  );
}

function SlideshowBlockEditor({ block, onChange }) {
  const slides = block.slides ?? [];
  const updateSlide = (i, updated) => { const n = [...slides]; n[i] = updated; onChange({ ...block, slides: n }); };
  const addSlide    = () => onChange({ ...block, slides: [...slides, newSlide()] });
  const removeSlide = (i) => onChange({ ...block, slides: slides.filter((_, idx) => idx !== i) });
  return (
    <div>
      {slides.map((sl, i) => (
        <SlideEditor key={i} slide={sl} index={i} onChange={(u) => updateSlide(i, u)} onRemove={() => removeSlide(i)} canRemove={slides.length > 1} />
      ))}
      <button type="button" onClick={addSlide} className="flex items-center gap-1.5 text-sm text-[#c5a355] hover:text-[#a8883d] font-semibold transition-colors">
        <Icon.Plus /> Add Slide
      </button>
    </div>
  );
}

// ── Block card (wrapper around any editor) ────────────────────────────────────
const BLOCK_EDITORS = {
  text:      TextBlockEditor,
  image:     ImageBlockEditor,
  button:    ButtonBlockEditor,
  youtube:   YoutubeBlockEditor,
  html:      HtmlBlockEditor,
  slideshow: SlideshowBlockEditor,
};

const blockMeta = (type) => BLOCK_TYPES.find((b) => b.type === type) ?? { icon: "🧩", label: type };

function BlockCard({ block, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  const [open, setOpen] = useState(true);
  const meta   = blockMeta(block.type);
  const Editor = BLOCK_EDITORS[block.type];

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden mb-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 cursor-pointer select-none" onClick={() => setOpen((p) => !p)}>
        <span className="text-base">{meta.icon}</span>
        <span className="text-xs font-semibold text-gray-700 flex-1">{meta.label}</span>
        <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
          <button type="button" disabled={!canMoveUp}   onClick={onMoveUp}   className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-25"><Icon.ChevronUp /></button>
          <button type="button" disabled={!canMoveDown} onClick={onMoveDown} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-25"><Icon.ChevronDown /></button>
          <button type="button" onClick={onRemove} className="p-1 text-red-400 hover:text-red-600"><Icon.Trash /></button>
        </div>
        <span className="p-1 text-gray-400 pointer-events-none">{open ? <Icon.ChevronUp /> : <Icon.ChevronDown />}</span>
      </div>
      {open && (
        <div className="p-3">
          {Editor
            ? <Editor block={block} onChange={onChange} />
            : <p className="text-xs text-gray-400">No editor for block type "{block.type}"</p>
          }
        </div>
      )}
    </div>
  );
}

// ── Add Block picker ──────────────────────────────────────────────────────────
function AddBlockPicker({ onAdd, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="font-semibold text-gray-800">Add a Block</p>
          <p className="text-xs text-gray-400 mt-0.5">Choose what content to add inside this section</p>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {BLOCK_TYPES.map((b) => (
            <button key={b.type} type="button"
              onClick={() => { onAdd(b.type); onClose(); }}
              className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 text-left hover:border-[#c5a355] hover:bg-amber-50 transition-all"
            >
              <span className="text-2xl leading-none mt-0.5">{b.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{b.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{b.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="px-6 pb-4">
          <button type="button" onClick={onClose} className="w-full py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ section, index, total, onChange, onDelete, onMoveUp, onMoveDown }) {
  const [expanded, setExpanded]   = useState(true);
  const [addBlock, setAddBlock]   = useState(false);

  const updateBlock = (i, updated) => {
    const blocks = [...section.blocks];
    blocks[i] = updated;
    onChange({ ...section, blocks });
  };
  const removeBlock   = (i) => onChange({ ...section, blocks: section.blocks.filter((_, idx) => idx !== i) });
  const moveBlock     = (i, dir) => {
    const b = [...section.blocks];
    const t = i + dir;
    if (t < 0 || t >= b.length) return;
    [b[i], b[t]] = [b[t], b[i]];
    onChange({ ...section, blocks: b });
  };

  const headerColor = section.visible
    ? "border-[#c5a355] bg-amber-50"
    : "border-gray-200 bg-gray-50 opacity-60";

  return (
    <div className={`rounded-xl border-2 ${headerColor} overflow-hidden shadow-sm`}>
      {/* ── Section header ── */}
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none" onClick={() => setExpanded((p) => !p)}>
        <Icon.Grip />
        <div className="flex-1 min-w-0">
          <input
            className="text-sm font-semibold text-gray-800 bg-transparent outline-none w-full truncate cursor-text"
            value={section.label ?? ""}
            onChange={(e) => { e.stopPropagation(); onChange({ ...section, label: e.target.value }); }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Section name…"
          />
          <p className="text-xs text-gray-400">{section.blocks.length} block{section.blocks.length !== 1 ? "s" : ""} · {LAYOUTS.find(l => l.value === section.layout)?.label ?? "Full Width"}</p>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => onChange({ ...section, visible: !section.visible })}
            title={section.visible ? "Hide" : "Show"}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
            {section.visible ? <Icon.Eye /> : <Icon.EyeOff />}
          </button>
          <button type="button" disabled={index === 0}         onClick={onMoveUp}   className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-25 transition-colors"><Icon.ChevronUp /></button>
          <button type="button" disabled={index === total - 1} onClick={onMoveDown} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-25 transition-colors"><Icon.ChevronDown /></button>
          <button type="button" onClick={onDelete} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 transition-colors"><Icon.Trash /></button>
        </div>
        <span className="p-1.5 text-gray-400 pointer-events-none">{expanded ? <Icon.ChevronUp /> : <Icon.ChevronDown />}</span>
      </div>

      {/* ── Section settings ── */}
      {expanded && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 space-y-3">

          {/* Layout picker */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Column Layout</p>
            <div className="flex flex-wrap gap-2">
              {LAYOUTS.map((l) => (
                <button key={l.value} type="button"
                  onClick={() => onChange({ ...section, layout: l.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${section.layout === l.value ? "border-[#c5a355] bg-amber-50 text-[#a8883d]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section styling */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Section Background">
              <div className="flex items-center gap-2">
                <input type="color" value={section.background_color || "#ffffff"} onChange={(e) => onChange({ ...section, background_color: e.target.value })} className="w-9 h-9 border border-gray-200 rounded cursor-pointer" />
                <input className={inputCls} value={section.background_color ?? ""} onChange={(e) => onChange({ ...section, background_color: e.target.value })} placeholder="transparent" />
              </div>
            </Field>
            <Field label="Padding">
              <select className={inputCls} value={section.padding ?? "md"} onChange={(e) => onChange({ ...section, padding: e.target.value })}>
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </Field>
          </div>

          {/* Blocks */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Blocks {section.layout !== "full" && <span className="font-normal normal-case text-gray-400">— blocks fill columns left-to-right</span>}
            </p>

            {section.blocks.length === 0 && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-6 text-center text-sm text-gray-400">
                No blocks yet — click "Add Block" to add content
              </div>
            )}

            {section.blocks.map((block, i) => (
              <BlockCard
                key={block.id ?? i}
                block={block}
                onChange={(updated) => updateBlock(i, updated)}
                onRemove={() => removeBlock(i)}
                onMoveUp={() => moveBlock(i, -1)}
                onMoveDown={() => moveBlock(i, 1)}
                canMoveUp={i > 0}
                canMoveDown={i < section.blocks.length - 1}
              />
            ))}

            <button type="button" onClick={() => setAddBlock(true)}
              className="w-full mt-1 py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-[#c5a355] hover:text-[#c5a355] flex items-center justify-center gap-2 transition-colors">
              <Icon.Plus /> Add Block
            </button>
          </div>
        </div>
      )}

      {addBlock && (
        <AddBlockPicker
          onAdd={(type) => onChange({ ...section, blocks: [...section.blocks, newBlock(type)] })}
          onClose={() => setAddBlock(false)}
        />
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Homepage() {
  const [sections,   setSections]   = useState([]);
  const [fetching,   setFetching]   = useState(true);
  const [loading,    setLoading]    = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setFetching(true);
    try {
      const res  = await homepageAPI.getHomePage();
      const raw  = res.data?.data ?? res.data ?? {};
      const list = Array.isArray(raw.sections) ? raw.sections : [];
      setSections(list.length ? list.map(hydrateSection) : []);
    } catch {
      toast.error("Failed to load homepage");
    } finally {
      setFetching(false);
    }
  };

  // ── Section helpers ─────────────────────────────────────────────────────────
  const update  = (i, s) => setSections((p) => { const n = [...p]; n[i] = s; return n; });
  const remove  = (i) => { if (!window.confirm("Delete this section?")) return; setSections((p) => p.filter((_, idx) => idx !== i)); };
  const moveUp  = (i) => setSections((p) => { const n=[...p]; [n[i-1],n[i]]=[n[i],n[i-1]]; return n; });
  const moveDown= (i) => setSections((p) => { const n=[...p]; [n[i],n[i+1]]=[n[i+1],n[i]]; return n; });
  const addSection = () => setSections((p) => [...p, newSection()]);

  // ── Publish ─────────────────────────────────────────────────────────────────
  const publish = async () => {
    setLoading(true);
    setSaveStatus("saving");
    try {
      const fd = new FormData();

      sections.forEach((sec, si) => {
        const sp = `sections[${si}]`;
        fd.append(`${sp}[id]`,      sec.id      ?? "");
        fd.append(`${sp}[label]`,   sec.label   ?? "");
        fd.append(`${sp}[visible]`, sec.visible ? "1" : "0");
        fd.append(`${sp}[order]`,   si);

        // Section-level layout/style stored in data
        fd.append(`${sp}[data][layout]`,           sec.layout           ?? "full");
        fd.append(`${sp}[data][background_color]`, sec.background_color ?? "");
        fd.append(`${sp}[data][padding]`,          sec.padding          ?? "md");

        (sec.blocks ?? []).forEach((blk, bi) => {
          const bp = `${sp}[data][blocks][${bi}]`;
          fd.append(`${bp}[id]`,   blk.id   ?? "");
          fd.append(`${bp}[type]`, blk.type);

          if (blk.type === "text") {
            fd.append(`${bp}[heading]`,          blk.heading          ?? "");
            fd.append(`${bp}[body]`,             blk.body             ?? "");
            fd.append(`${bp}[alignment]`,        blk.alignment        ?? "left");
            fd.append(`${bp}[heading_size]`,     blk.heading_size     ?? "h2");
            fd.append(`${bp}[text_color]`,       blk.text_color       ?? "");
            fd.append(`${bp}[background_color]`, blk.background_color ?? "");
          }

          if (blk.type === "image") {
            fd.append(`${bp}[alt]`,        blk.alt        ?? "");
            fd.append(`${bp}[link_url]`,   blk.link_url   ?? "");
            fd.append(`${bp}[object_fit]`, blk.object_fit ?? "cover");
            if (blk._pendingFile) fd.append(`${bp}[image]`, blk._pendingFile);
            else if (!blk.image_url) fd.append(`${bp}[remove_image]`, "1");
          }

          if (blk.type === "button") {
            fd.append(`${bp}[label]`,      blk.label      ?? "");
            fd.append(`${bp}[url]`,        blk.url        ?? "");
            fd.append(`${bp}[target]`,     blk.target     ?? "_self");
            fd.append(`${bp}[bg_color]`,   blk.bg_color   ?? "");
            fd.append(`${bp}[text_color]`, blk.text_color ?? "");
            fd.append(`${bp}[size]`,       blk.size       ?? "md");
            fd.append(`${bp}[align]`,      blk.align      ?? "left");
          }

          if (blk.type === "youtube") {
            fd.append(`${bp}[video_id]`, blk.video_id ?? "");
            fd.append(`${bp}[caption]`,  blk.caption  ?? "");
            fd.append(`${bp}[autoplay]`, blk.autoplay ? "1" : "0");
          }

          if (blk.type === "html") {
            fd.append(`${bp}[code]`, blk.code ?? "");
          }

          if (blk.type === "slideshow") {
            (blk.slides ?? []).forEach((sl, sli) => {
              const slp = `${bp}[slides][${sli}]`;
              fd.append(`${slp}[id]`,          sl.id          ?? "");
              fd.append(`${slp}[title]`,        sl.title        ?? "");
              fd.append(`${slp}[subtitle]`,     sl.subtitle     ?? "");
              fd.append(`${slp}[has_text]`,     sl.has_text ? "1" : "0");
              fd.append(`${slp}[button_text]`,  sl.button_text  ?? "");
              fd.append(`${slp}[button_link]`,  sl.button_link  ?? "");
              if (sl._pendingFile) fd.append(`${slp}[image]`, sl._pendingFile);
            });
          }
        });
      });

      await homepageAPI.updateHomepage(fd);
      toast.success("Homepage saved!");
      setSaveStatus("saved");
      await load();
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
      setSaveStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (fetching) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-[#c5a355] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading page layout…</p>
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-semibold text-[#1a1612]">Homepage Builder</p>
          <p className="text-xs text-gray-400">Add sections, pick a layout, drop in any blocks you want</p>
        </div>
        <div className="flex items-center gap-2">
          {saveStatus === "saved" && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Saved
            </span>
          )}
          <button type="button" onClick={addSection}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <Icon.Plus /> Add Section
          </button>
          <button type="button" onClick={publish} disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#1a1612] text-white hover:bg-[#2d261f] transition-colors disabled:opacity-60">
            {loading ? <><Icon.Spinner />&nbsp;Saving…</> : <><Icon.Save />&nbsp;Publish</>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-4">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-5xl mb-4">🏗️</p>
            <p className="text-gray-600 font-semibold text-lg">Start building your homepage</p>
            <p className="text-sm text-gray-400 mt-2 mb-8 max-w-md">
              Click "Add Section" to create a row. Inside each section, pick a layout then add any blocks — text, images, videos, buttons — in any order.
            </p>
            <button type="button" onClick={addSection}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#1a1612] text-white hover:bg-[#2d261f] transition-colors">
              <Icon.Plus /> Add First Section
            </button>
          </div>
        ) : (
          <>
            {sections.map((sec, i) => (
              <SectionCard
                key={sec.id ?? i}
                section={sec}
                index={i}
                total={sections.length}
                onChange={(updated) => update(i, updated)}
                onDelete={() => remove(i)}
                onMoveUp={() => moveUp(i)}
                onMoveDown={() => moveDown(i)}
              />
            ))}
            <button type="button" onClick={addSection}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-[#c5a355] hover:text-[#c5a355] flex items-center justify-center gap-2 transition-colors">
              <Icon.Plus /> Add Section
            </button>
          </>
        )}
      </div>
    </div>
  );
}