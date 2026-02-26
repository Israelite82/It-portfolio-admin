import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/books"; // We'll create this backend later

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // "list" | "add" | "edit"
  const [editingBook, setEditingBook] = useState(null);
  
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    isbn: "",
    publicationYear: "",
    publisher: "",
    edition: "",
    amazon: "",
    otherStore: "",
    visibility: "",
    categories: "",
    featureOnHomepage: false,
  });

  // FETCH ALL BOOKS when component loads
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      // For now, use fake data if API doesn't exist
      setBooks([
        { id: 1, title: "Economic and Governance", status: "Published", year: "2023" },
        { id: 2, title: "The Kingdom Mandate", status: "Published", year: "2022" },
      ]);
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
      subtitle: "",
      description: "",
      isbn: "",
      publicationYear: "",
      publisher: "",
      edition: "",
      amazon: "",
      otherStore: "",
      visibility: "",
      categories: "",
      featureOnHomepage: false,
    });
    setEditingBook(null);
    setView("add");
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title || "",
      subtitle: book.subtitle || "",
      description: book.description || "",
      isbn: book.isbn || "",
      publicationYear: book.publicationYear || book.year || "",
      publisher: book.publisher || "",
      edition: book.edition || "",
      amazon: book.amazon || "",
      otherStore: book.otherStore || "",
      visibility: book.visibility || "",
      categories: book.categories || "",
      featureOnHomepage: book.featureOnHomepage || false,
    });
    setEditingBook(book);
    setView("edit");
  };

  const handleSaveDraft = async () => {
    try {
      if (view === "add") {
        // CREATE new book
        const response = await axios.post(API_URL, { ...form, status: "Draft" });
        setBooks([...books, response.data]);
        alert("Draft saved!");
      } else {
        // UPDATE existing book
        const response = await axios.put(`${API_URL}/${editingBook.id}`, { ...form, status: "Draft" });
        setBooks(books.map((b) => (b.id === editingBook.id ? response.data : b)));
        alert("Draft updated!");
      }
      setView("list");
    } catch (error) {
      console.error("Error saving draft:", error);
      // Fallback for testing without backend
      if (view === "add") {
        const newBook = { id: Date.now(), ...form, status: "Draft" };
        setBooks([...books, newBook]);
      } else {
        setBooks(books.map((b) => (b.id === editingBook.id ? { ...b, ...form, status: "Draft" } : b)));
      }
      alert("Draft saved locally (no backend connected yet)");
      setView("list");
    }
  };

  const handlePublish = async () => {
    try {
      if (view === "add") {
        const response = await axios.post(API_URL, { ...form, status: "Published" });
        setBooks([...books, response.data]);
        alert("Book published!");
      } else {
        const response = await axios.put(`${API_URL}/${editingBook.id}`, { ...form, status: "Published" });
        setBooks(books.map((b) => (b.id === editingBook.id ? response.data : b)));
        alert("Book published!");
      }
      setView("list");
    } catch (error) {
      console.error("Error publishing book:", error);
      // Fallback
      if (view === "add") {
        const newBook = { id: Date.now(), ...form, status: "Published" };
        setBooks([...books, newBook]);
      } else {
        setBooks(books.map((b) => (b.id === editingBook.id ? { ...b, ...form, status: "Published" } : b)));
      }
      alert("Book published locally (no backend connected yet)");
      setView("list");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(books.filter((b) => b.id !== id));
      alert("Book deleted!");
    } catch (error) {
      console.error("Error deleting book:", error);
      // Fallback
      setBooks(books.filter((b) => b.id !== id));
      alert("Book deleted locally (no backend connected yet)");
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  // ADD/EDIT VIEW
  if (view === "add" || view === "edit") {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <p className="text-[13px] text-gray-400 font-medium">
            Books <span className="text-gray-300 mx-1">/</span>
            <span className="text-[#1a1612] font-semibold">{view === "add" ? "Add New" : "Edit"}</span>
          </p>
        </div>

        <div className="px-8 py-6">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-5">
            {view === "add" ? "Add New Book" : `Edit: ${editingBook?.title}`}
          </p>

          <div className="flex gap-6 items-start">
            <div className="flex-1 space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Book Title</label>
                  <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subtitle</label>
                  <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Book Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={7} className={`${inputClass} resize-none`} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-3">Publication Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 font-medium mb-1.5">ISBN</label>
                      <input type="text" name="isbn" value={form.isbn} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 font-medium mb-1.5">Publication Year</label>
                      <input type="text" name="publicationYear" value={form.publicationYear} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 font-medium mb-1.5">Publisher</label>
                      <input type="text" name="publisher" value={form.publisher} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 font-medium mb-1.5">Edition</label>
                      <input type="text" name="edition" value={form.edition} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Book File</label>
                  <div className="w-full h-[80px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors">
                    <p className="text-sm text-[#7c7fc4] font-medium">Upload PDF or EPUB</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-3">Purchase Links</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 font-medium mb-1.5">Amazon</label>
                      <input type="text" name="amazon" value={form.amazon} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 font-medium mb-1.5">Other Store</label>
                      <input type="text" name="otherStore" value={form.otherStore} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[200px] flex-shrink-0 space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5 space-y-4">
                <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Publish</p>
                <button onClick={handleSaveDraft} className="w-full py-2.5 rounded-lg text-sm font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                  Save Draft
                </button>
                <button onClick={handlePublish} className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#7c6fcf] text-white hover:bg-[#6a5dbf] transition-colors">
                  Publish
                </button>
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5">Visibility</label>
                  <input type="text" name="visibility" value={form.visibility} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Feature on Homepage</span>
                  <button onClick={() => setForm((prev) => ({ ...prev, featureOnHomepage: !prev.featureOnHomepage }))}
                    className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${form.featureOnHomepage ? "bg-blue-500" : "bg-gray-300"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.featureOnHomepage ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5">Categories</label>
                  <textarea name="categories" value={form.categories} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] transition-all resize-none" />
                </div>
                <button onClick={() => setView("list")} className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-5">
                <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3">Book Cover</p>
                <div className="w-full h-[160px] bg-[#fef9e7] border border-[#f0e0a0] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#fef3c7] transition-colors">
                  <p className="text-sm text-[#b48557] font-medium">Upload Cover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">Books</p>
      </div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">All Books</p>
          <button onClick={handleAdd} className="bg-[#7c6fcf] hover:bg-[#6a5dbf] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all">
            + Add Book
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading books...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">Year</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, i) => (
                    <tr key={book.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i === books.length - 1 ? "border-0" : ""}`}>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{book.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{book.publicationYear || book.year || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${book.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {book.status || "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleEdit(book)} className="text-sm text-blue-600 hover:text-blue-800 font-medium mr-4">Edit</button>
                        <button onClick={() => handleDelete(book.id)} className="text-sm text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-400">No books yet. Click "+ Add Book" to create one.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}