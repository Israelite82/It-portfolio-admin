import { booksAPI } from "../lib/apiService";
import { useState, useEffect } from "react";
import BookList from "../components/books/BookList";
import BookForm from "../components/books/BookForm";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [editingBook, setEditingBook] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [bookCover, setBookCover] = useState(null);

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

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getAll();
      const booksData = response.data.data?.data || response.data.data || response.data;
      setBooks(Array.isArray(booksData) ? booksData : []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
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
    setBookFile(null);
    setBookCover(null);
    setView("add");
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title || "",
      subtitle: book.subtitle || "",
      description: book.description || "",
      isbn: book.isbn || "",
      publicationYear: book.pub_year || book.publicationYear || "",
      publisher: book.publisher || "",
      edition: book.edition || "",
      amazon: book.amazon || "",
      otherStore: book.other_store || "",
      visibility: book.visibility || "",
      categories: book.categories || "",
      featureOnHomepage: book.feature_homepage || false,
    });
    setEditingBook(book);
    setView("edit");
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
     if (!form.title || (!bookFile && view === "add")) {
  alert("Please fill in the title and upload a book file");
  setLoading(false);
  return;
}

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("isbn", form.isbn);
      formData.append("pub_year", form.publicationYear);
      formData.append("publisher", form.publisher);
      formData.append("edition", form.edition);
      formData.append("amazon", form.amazon);
      formData.append("other_store", form.otherStore);
      formData.append("feature_homepage", form.featureOnHomepage ? 1 : 0);
      formData.append("status", "DRAFT");

      if (bookFile) formData.append("book_file", bookFile);
      if (bookCover) formData.append("book_cover", bookCover);

      if (view === "add") {
        await booksAPI.create(formData);
        alert("Draft saved!");
      } else {
        await booksAPI.update(editingBook.id, formData);
        alert("Draft updated!");
      }

      await fetchBooks();
      setView("list");
      setBookFile(null);
      setBookCover(null);
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
     if (!form.title || (!bookFile && view === "add")) {
  alert("Please fill in the title and upload a book file");
  setLoading(false);
  return;
}

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("isbn", form.isbn);
      formData.append("pub_year", form.publicationYear);
      formData.append("publisher", form.publisher);
      formData.append("edition", form.edition);
      formData.append("amazon", form.amazon);
      formData.append("other_store", form.otherStore);
      formData.append("feature_homepage", form.featureOnHomepage ? 1 : 0);
      formData.append("status", "ACTIVE");

      if (bookFile) formData.append("book_file", bookFile);
      if (bookCover) formData.append("book_cover", bookCover);

      if (view === "add") {
        await booksAPI.create(formData);
        alert("Book published!");
      } else {
        const res = await booksAPI.update(editingBook.id, formData);
        console.log("Update response:", res);
        alert("Book updated!");
      }

      await fetchBooks();
      setView("list");
      setBookFile(null);
      setBookCover(null);
    } catch (error) {
      console.error("Error publishing book:", error);
      alert(error.response?.data?.message || "Failed to publish book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      await booksAPI.delete(bookId);
      alert("Book deleted successfully!");
      await fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <BookForm
        form={form}
        onChange={handleChange}
        onCancel={() => setView("list")}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        loading={loading}
        view={view}
        editingBook={editingBook}
        bookFile={bookFile}
        setBookFile={setBookFile}
        bookCover={bookCover}
        setBookCover={setBookCover}
      />
    );
  }

  return (
    <BookList
      books={books}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}