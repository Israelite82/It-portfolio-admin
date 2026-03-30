import FileUpload from "../books/FileUpload";

export default function TeachingForm({
  form,
  onChange,
  onCancel,
  onSaveDraft,
  onPublish,
  loading,
  view,
  editingTeaching,
  audioFile,
  setAudioFile,
  thumbnail,
  setThumbnail,
}) {
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[14px] text-gray-600 font-medium">
          Teachings{" "}
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-[#1a1612] font-semibold">
            {view === "add" ? "Add New" : "Edit"}
          </span>
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <p className="text-sm font-semibold text-gray-600 tracking-tight uppercase mb-4">
          {view === "add" ? "Add New Teaching" : `Edit: ${editingTeaching?.teaching_title}`}
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT MAIN PANEL */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 sm:px-8 py-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Teaching Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Series
                </label>
                <input
                  type="text"
                  name="series"
                  value={form.series}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Scripture Reference
                </label>
                <input
                  type="text"
                  name="scriptureReference"
                  value={form.scriptureReference}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <FileUpload
                file={audioFile}
                onFileChange={setAudioFile}
                accept="audio/*"
                label="Media - Upload Audio (MP3)"
                id="audioFileInput"
                type="file"
              />

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Video Embed URL (YouTube/Vimeo)
                </label>
                <input
                  type="text"
                  name="videoEmbedUrl"
                  value={form.videoEmbedUrl}
                  onChange={onChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Transcript
                </label>
                <textarea
                  name="transcript"
                  value={form.transcript}
                  onChange={onChange}
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={onChange}
                  placeholder="45:30"
                  className={inputClass}
                  style={{ maxWidth: "240px" }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={onChange}
                  placeholder="faith, bible-study, foundations"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[240px] flex-shrink-0 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-5">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                Publish
              </p>

              <button
                onClick={onSaveDraft}
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-black hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Draft"}
              </button>

              <button
                onClick={onPublish}
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#6366F1] text-white hover:bg-[#6a5dbf] transition-colors disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>

              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-gray-500 font-medium">
                  Featured
                </span>
                <button
                  onClick={() =>
                    onChange({
                      target: {
                        name: "featured",
                        type: "checkbox",
                        checked: !form.featured,
                      },
                    })
                  }
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                    form.featured ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                      form.featured ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">
                  Series Category
                </label>
                <textarea
                  name="seriesCategory"
                  value={form.seriesCategory}
                  onChange={onChange}
                  rows={3}
                  placeholder="New Testament"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all resize-none"
                />
              </div>

              <button
                onClick={onCancel}
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3">
                Thumbnail
              </p>
              <FileUpload
                file={thumbnail}
                onFileChange={setThumbnail}
                accept="image/*"
                id="thumbnailInput"
                type="image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}