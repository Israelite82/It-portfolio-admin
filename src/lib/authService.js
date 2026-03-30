import axios from "axios";
import { API_BASE_URL } from "./config";

// Login function
export const login = async (email, password) => {
  try {
   const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    
    // Save token and user info to localStorage
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Invalid email or password";
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
};

// Get current token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Get current user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!getToken();
};