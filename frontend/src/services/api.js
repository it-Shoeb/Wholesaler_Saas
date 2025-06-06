import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://invy-backend-ols7.onrender.com",
  withCredentials: true,
});

export default api;
