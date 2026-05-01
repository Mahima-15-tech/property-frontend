import axios from "axios";

const instance = axios.create({
  baseURL: "https://property-platform.onrender.com",
});

// 🔥 ADD THIS
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;