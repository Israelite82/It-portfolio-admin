import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { teachingsAPI } from "../lib/apiService";
import TeachingList from "../components/teachings/TeachingList";
import TeachingForm from "../components/teachings/TeachingForm";

export default function Teachings() {
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [editingTeaching, setEditingTeaching] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [form, setForm] = useState({
    title: "",
    series: "",
    scriptureReference: "",
    description: "",
    videoEmbedUrl: "",
    transcript: "",
    duration: "",
    tags: "",
    seriesCategory: "",
    featured: false,
  });

  useEffect(() => {
    fetchTeachings();
  }, []);

  const fetchTeachings = async () => {
    try {
      setLoading(true);
      const response = await teachingsAPI.getAll();
      const teachingsData = response.data.data?.data || response.data.data || response.data;
      setTeachings(Array.isArray(teachingsData) ? teachingsData : []);
    } catch (error) {
      console.error("Error fetching teachings:", error);
      setTeachings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    setForm({
      title: "",
      series: "",
      scriptureReference: "",
      description: "",
      videoEmbedUrl: "",
      transcript: "",
      duration: "",
      tags: "",
      seriesCategory: "",
      featured: false,
    });
    setEditingTeaching(null);
    setAudioFile(null);
    setThumbnail(null);
    setView("add");
  };

  const handleEdit = (teaching) => {
    setForm({
      title: teaching.teaching_title || "",
      series: teaching.series || "",
      scriptureReference: teaching.scripture_reference || "",
      description: teaching.description || "",
      videoEmbedUrl: teaching.video_embed_url || "",
      transcript: teaching.transcript || "",
      duration: teaching.duration || "",
      tags: Array.isArray(teaching.tags) ? teaching.tags.join(", ") : "",
      seriesCategory: teaching.series_category || "",
      featured: teaching.featured || false,
    });
    setEditingTeaching(teaching);
    setView("edit");
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      if (!form.title) {
        toast.error("Please fill in the teaching title");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("teaching_title", form.title);
      formData.append("series", form.series);
      formData.append("scripture_reference", form.scriptureReference);
      formData.append("description", form.description);
      formData.append("video_embed_url", form.videoEmbedUrl);
      formData.append("transcript", form.transcript);
      formData.append("duration", form.duration);
      formData.append("series_category", form.seriesCategory);
      formData.append("status", "draft");
      
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("featured", form.featured ? 1 : 0);

      if (audioFile) formData.append("audio_file", audioFile);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      if (view === "add") {
        await teachingsAPI.create(formData);
        toast.success("Draft saved!");
      } else {
        await teachingsAPI.update(editingTeaching.id, formData);
        toast.success("Draft updated!");
      }

      await fetchTeachings();
      setView("list");
      setAudioFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error(error.response?.data?.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      if (!form.title) {
        toast.error("Please fill in the teaching title");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("teaching_title", form.title);
      formData.append("series", form.series);
      formData.append("scripture_reference", form.scriptureReference);
      formData.append("description", form.description);
      formData.append("video_embed_url", form.videoEmbedUrl);
      formData.append("transcript", form.transcript);
      formData.append("duration", form.duration);
      formData.append("series_category", form.seriesCategory);
      formData.append("status", "published");
      
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("featured", form.featured ? 1 : 0);

      if (audioFile) formData.append("audio_file", audioFile);
      if (thumbnail) formData.append("thumbnail", thumbnail);
       
     if (view === "add") {
  console.log("📤 Creating teaching with POST /api/teachings");
  await teachingsAPI.create(formData);
  toast.success("Teaching published!");
} else {
  console.log("📤 Updating teaching with POST /api/teachings/" + editingTeaching.id);
  formData.append("_method", "PUT");
  await teachingsAPI.update(editingTeaching.id, formData);
  toast.success("Teaching updated!");
}

      await fetchTeachings();
      setView("list");
      setAudioFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error("Error publishing teaching:", error);
      toast.error(error.response?.data?.message || "Failed to publish teaching");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teachingId) => {
    if (!confirm("Delete this teaching?")) return;
    try {
      await teachingsAPI.delete(teachingId);
      toast.success("Teaching deleted!");
      await fetchTeachings();
    } catch (error) {
      console.error("Error deleting teaching:", error);
      toast.error(error.response?.data?.message || "Failed to delete teaching");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <TeachingForm
        form={form}
        onChange={handleChange}
        onCancel={() => setView("list")}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        loading={loading}
        view={view}
        editingTeaching={editingTeaching}
        audioFile={audioFile}
        setAudioFile={setAudioFile}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />
    );
  }

  return (
    <TeachingList
      teachings={teachings}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}