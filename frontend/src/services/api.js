import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://invy-backend-3077.onrender.com",
  timeout: 3000,
  withCredentials: true,
});

export default api;
