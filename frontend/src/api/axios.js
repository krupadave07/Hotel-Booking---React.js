import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token to every request (both user and admin)
instance.interceptors.request.use(
  (config) => {
    // Check for user token first, then admin token
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    const token = userToken || adminToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
