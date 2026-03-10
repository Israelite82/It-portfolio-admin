import { useState, useEffect } from "react";
import { journalsAPI, api } from "../lib/apiService";
import JournalList from "../components/Journals/JournalList";
import JournalForm from "../components/Journals/JournalForm";

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [editingJournal, setEditingJournal] = useState(null);
  const [journalFile, setJournalFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    authors: "",
    abstract: "",
    keywords: "",
    doi: "",
    publicationYear: "",
    volume: "",
    issue: "",
    citationFormat: "",
    visibility: "",
    researchCategory: "",
    featureOnHomepage: false,
  });

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const response = await journalsAPI.getAll();
      const journalsData = response.data.data?.data || response.data.data || response.data;
      setJournals(Array.isArray(journalsData) ? journalsData : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      setJournals([]);
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
      authors: "",
      abstract: "",
      keywords: "",
      doi: "",
      publicationYear: "",
      volume: "",
      issue: "",
      citationFormat: "",
      visibility: "",
      researchCategory: "",
      featureOnHomepage: false,
    });
    setEditingJournal(null);
    setJournalFile(null);
    setCoverImage(null);
    setView("add");
  };

  const handleEdit = (journal) => {
    setForm({
      title: journal.title || "",
      authors: journal.authors || "",
      abstract: journal.abstract || journal.description || "",
      keywords: journal.keywords || "",
      doi: journal.doi || "",
      publicationYear: journal.publication_year || "",
      volume: journal.volume || "",
      issue: journal.issue || "",
      citationFormat: journal.citation_format || "",
      visibility: journal.visibility || "",
      researchCategory: journal.researchCategory || "",
      featureOnHomepage: journal.feature_homepage || false,
    });
    setEditingJournal(journal);
    setView("edit");
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      if (!form.title || (!journalFile && view === "add")) {
        alert("Please fill in title and upload a journal file");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.abstract);
      formData.append("doi", form.doi);
      formData.append("volume", form.volume);
      formData.append("issue", form.issue);
      formData.append("publication_year", form.publicationYear);
      formData.append("citation_format", form.citationFormat);
      formData.append("status", "draft");

      if (journalFile) formData.append("journal_file", journalFile);
      if (coverImage) formData.append("cover_image", coverImage);

      if (view === "add") {
        await journalsAPI.create(formData);
        alert("Draft saved!");
      } else {
        await journalsAPI.update(editingJournal.id, formData);
        alert("Draft updated!");
      }

      await fetchJournals();
      setView("list");
      setJournalFile(null);
      setCoverImage(null);
    } catch (error) {
      console.error("Error saving draft:", error);
      alert(error.response?.data?.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

 const handlePublish = async () => {
  setLoading(true);
  try {
    if (!form.title || (!journalFile && view === "add")) {
      alert("Please fill in title and upload a journal file");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.abstract);
    formData.append("doi", form.doi);
    formData.append("volume", form.volume);
    formData.append("issue", form.issue);
    formData.append("publication_year", form.publicationYear);
    formData.append("citation_format", form.citationFormat);
    formData.append("status", "published");

    if (journalFile) formData.append("journal_file", journalFile);
    if (coverImage) formData.append("cover_image", coverImage);

    if (view === "add") {
      await journalsAPI.create(formData);
      alert("Journal published!");
    } else {
      // WORKAROUND: Add _method for Laravel
      formData.append("_method", "PUT");
      await api.post(`/journals/${editingJournal.id}`, formData);
      alert("Journal updated!");
    }

    // Add delay before fetching to ensure Laravel has updated
    await new Promise(resolve => setTimeout(resolve, 500));

    await fetchJournals();
    setView("list");
    setJournalFile(null);
    setCoverImage(null);
  } catch (error) {
    console.error("Error publishing journal:", error);
    console.error("❌ Response:", error.response?.data);
    alert(error.response?.data?.message || "Failed to publish journal");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (journalId) => {
    if (!confirm("Delete this journal?")) return;
    try {
      await journalsAPI.delete(journalId);
      alert("Journal deleted!");
      await fetchJournals();
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert(error.response?.data?.message || "Failed to delete journal");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <JournalForm
        form={form}
        onChange={handleChange}
        onCancel={() => setView("list")}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        loading={loading}
        view={view}
        editingJournal={editingJournal}
        journalFile={journalFile}
        setJournalFile={setJournalFile}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
      />
    );
  }

  return (
    <JournalList
      journals={journals}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
