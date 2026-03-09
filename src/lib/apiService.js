import axios from "axios";
import { API_BASE_URL } from "./config";

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, 
  headers: {
    Accept: "application/json",
  },
});

// Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // If 401 error (unauthorized)
    if (error.response?.status === 401) {
      // Clear all auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      
      // Dispatch custom event for logout
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("unauthorized"));
      }
      
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== BOOKS API =====
export const booksAPI = {
  getAll: () => api.get("/books"),
  getOne: (id) => api.get(`/books/${id}`),
  create: (data) => api.post("/books/create", data),
  update: (id, data) => api.post(`/books/${id}`, data), 
  delete: (id) => api.delete(`/books/${id}`),           
};

// ===== JOURNALS API =====
export const journalsAPI = {
  getAll: (params) => api.get("/journals", { params }), // Supports filters: page, per_page, status, year, search, sort_by, sort_order
  getOne: (id) => api.get(`/journals/${id}`),
  create: (data) => api.post("/journals", data),
  update: (id, data) => api.put(`/journals/${id}`, data),
  delete: (id) => api.delete(`/journals/${id}`),
  restore: (id) => api.post(`/journals/${id}/restore`), // Restore deleted journal
};

// ===== TEACHINGS API =====
export const teachingsAPI = {
  getAll: () => api.get("/api/teachings"),
  getOne: (id) => api.get(`/api/teachings/${id}`),
  create: (data) => api.post("/api/teachings", data),
  update: (id, data) => api.put(`/api/teachings/${id}`, data),
  delete: (id) => api.delete(`/api/teachings/${id}`),
};

// ===== BLOG API =====
export const blogAPI = {
  getAll: () => api.get("/api/blog"),
  getOne: (id) => api.get(`/api/blog/${id}`),
  create: (data) => api.post("/api/blog", data),
  update: (id, data) => api.put(`/api/blog/${id}`, data),
  delete: (id) => api.delete(`/api/blog/${id}`),
};

// ===== SUBSCRIBERS API =====
export const subscribersAPI = {
  getAll: () => api.get("/api/subscribers"),
  create: (data) => api.post("/api/subscribers", data),
  delete: (id) => api.delete(`/api/subscribers/${id}`),
  export: () => api.get("/api/subscribers/export"),
};

// ===== HOMEPAGE API =====
export const homepageAPI = {
  // Get all homepage data
  getAll: () => api.get("/homepage"),
  
  // Update hero section
  updateHero: (data) => api.put("/homepage/hero", data),
  
  // Delete hero background image
  deleteHeroImage: () => api.delete("/homepage/hero/image"),
  
  // Update section order
  updateSectionOrder: (sections) => api.put("/homepage/section-order", { sections }),
  
  // Toggle section visibility
  toggleSection: (section) => api.patch(`/homepage/sections/${section}/toggle`),
  
  // Set featured item
  setFeaturedItem: (data) => api.post("/homepage/featured-items", data),
  
  // Get featured items
  getFeaturedItems: () => api.get("/homepage/featured-items"),
};

// ===== ANALYTICS API =====
export const analyticsAPI = {
  get: () => api.get("/api/analytics"),
};

export default api;