import axios from "axios";

const api = axios.create({
  baseURL: "https://invy-backend-ols7.onrender.com",
  withCredentials: true,
});

export default api;

// baseURL: "http://localhost:3000",
// timeout: 5000,