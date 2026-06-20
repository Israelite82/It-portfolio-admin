import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { blogAPI } from "../lib/apiService";
import BlogList from "../components/blog/BlogList";
import BlogForm from "../components/blog/BlogForm";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [editingBlog, setEditingBlog] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(15);

  const [form, setForm] = useState({
    postTitle: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    author: "",
    categories: "",
    tags: "",
    featured: false,
  });

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll(page);
      
      // Access the response structure correctly
      const responseData = response.data || response;
      const blogsData = responseData.data || [];
      const meta = responseData.meta || {};
      const links = responseData.links || {};
      
      setBlogs(Array.isArray(blogsData) ? blogsData : []);
      setCurrentPage(meta.current_page || 1);
      setLastPage(meta.last_page || 1);
      setTotal(meta.total || 0);
      setPerPage(meta.per_page || 15);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
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
      postTitle: "",
      excerpt: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      author: "",
      categories: "",
      tags: "",
      featured: false,
    });
    setEditingBlog(null);
    setFeaturedImage(null);
    setView("add");
  };

  const handleEdit = (blog) => {
    setForm({
      postTitle: blog.post_title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      metaTitle: blog.meta_title || "",
      metaDescription: blog.meta_description || "",
      author: blog.author || "",
      categories: Array.isArray(blog.categories) ? blog.categories.join(", ") : "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      featured: blog.featured || false,
    });
    setEditingBlog(blog);
    setView("edit");
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      if (!form.postTitle) {
        toast.error("Please fill in the post title");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("post_title", form.postTitle);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("meta_title", form.metaTitle);
      formData.append("meta_description", form.metaDescription);
      formData.append("author", form.author);
      formData.append("status", "draft");
      
      const categoriesArray = form.categories.split(",").map(c => c.trim()).filter(Boolean);
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      
      formData.append("categories", JSON.stringify(categoriesArray));
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("featured", form.featured ? 1 : 0);
      if (featuredImage) {
        formData.append("featured_image", featuredImage);
      }

      if (view === "add") {
        await blogAPI.create(formData);
        toast.success("Draft saved!");
      } else {
        formData.append("_method", "PUT");
        await blogAPI.update(editingBlog.id, formData);
        toast.success("Draft updated!");
      }

      await fetchBlogs(currentPage);
      setView("list");
      setFeaturedImage(null);
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
      if (!form.postTitle) {
        toast.error("Please fill in the post title");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("post_title", form.postTitle);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("meta_title", form.metaTitle);
      formData.append("meta_description", form.metaDescription);
      formData.append("author", form.author);
      formData.append("status", "published");
      
      const categoriesArray = form.categories.split(",").map(c => c.trim()).filter(Boolean);
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      
      formData.append("categories", JSON.stringify(categoriesArray));
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("featured", form.featured ? 1 : 0);
      if (featuredImage) {
        formData.append("featured_image", featuredImage);
      }

      if (view === "add") {
        await blogAPI.create(formData);
        toast.success("Blog post published!");
      } else {
        formData.append("_method", "PUT");
        await blogAPI.update(editingBlog.id, formData);
        toast.success("Blog post updated!");
      }

      await fetchBlogs(currentPage);
      setView("list");
      setFeaturedImage(null);
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error(error.response?.data?.message || "Failed to publish blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await blogAPI.delete(blogId);
      toast.success("Blog post deleted!");
      await fetchBlogs(currentPage);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog post");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <BlogForm
        form={form}
        onChange={handleChange}
        onCancel={() => setView("list")}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        loading={loading}
        view={view}
        editingBlog={editingBlog}
        featuredImage={featuredImage}
        setFeaturedImage={setFeaturedImage}
      />
    );
  }

  return (
    <BlogList
      blogs={blogs}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      currentPage={currentPage}
      lastPage={lastPage}
      total={total}
      perPage={perPage}
      onPageChange={handlePageChange}
    />
  );
}